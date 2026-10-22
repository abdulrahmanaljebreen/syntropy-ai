import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { tools, createTools, createBundleStore, DEFAULT_ROOT } from '../core.mjs';

const text = async (name, args) => {
  const r = await tools[name].handler(args);
  assert.ok(r?.content?.[0]?.text, `${name} returned text`);
  return r.content[0].text;
};

test('exposes the 10 tools', () => {
  assert.deepEqual(Object.keys(tools).sort(), [
    'find_links', 'find_tokens', 'get_component', 'get_guideline', 'get_pattern',
    'lint_ui', 'research_plan', 'search_components', 'search_icons', 'start_intake',
  ]);
});

test('search_components("button") returns Button 417:2 first', async () => {
  const out = await text('search_components', { query: 'button' });
  const firstRow = out.split('\n').find((l) => l.startsWith('| ') && !l.startsWith('| Name'));
  assert.match(firstRow, /\| Button \| `417:2` \|/);
});

test('search_components filters by family', async () => {
  const out = await text('search_components', { query: 'button', family: '06' });
  assert.match(out, /BackButton/);
  assert.doesNotMatch(out, /\| Button \| `417:2`/);
});

test('get_component resolves name, page slug and fuzzy typo', async () => {
  const a = await text('get_component', { name: 'Button' });
  assert.match(a, /node-id=417-2/);
  assert.match(a, /\| Variant \| `variant` \| VARIANT \|/);
  assert.match(a, /knowledge\/examples\/components\/button\//);
  const b = await text('get_component', { name: 'bottom-sheet' });
  assert.match(b, /# BottomSheet/);
  const c = await text('get_component', { name: 'Buton' });
  assert.match(c, /# Button/);
});

test('find_tokens("brand button background") includes bg/brand/primary', async () => {
  const out = await text('find_tokens', { intent: 'brand button background' });
  assert.match(out, /`bg\/brand\/primary`/);
  const firstRow = out.split('\n').find((l) => l.startsWith('| `'));
  assert.match(firstRow, /`bg\/brand\/primary`/);
});

test('find_tokens understands common intents', async () => {
  assert.match((await text('find_tokens', { intent: 'muted text' })).split('\n').find((l) => l.startsWith('| `')), /text\/muted/);
  assert.match((await text('find_tokens', { intent: 'error border' })).split('\n').find((l) => l.startsWith('| `')), /border\/error/);
  assert.match(await text('find_tokens', { intent: 'spacing between sections' }), /space\/2xl/);
  assert.doesNotMatch(await text('find_tokens', { intent: 'brand background' }), /Color\/Primary/);
});

test('search_icons("wallet") returns wallet icons, Arabic works', async () => {
  const out = await text('search_icons', { meaning: 'wallet' });
  assert.match(out, /`wallet`/);
  const ar = await text('search_icons', { meaning: 'محفظة' });
  assert.match(ar, /wallet/);
  const del = await text('search_icons', { meaning: 'delete' });
  assert.match(del, /trash|delete|bin/);
});

test('start_intake with no answers returns question 1', async () => {
  const out = await text('start_intake', {});
  assert.match(out, /question 1 of 6/);
  assert.match(out, /What are you making\?/);
});

test('start_intake skips questions answered by the request', async () => {
  const out = await text('start_intake', { request: 'Redesign the withdraw screen in the mobile app for retail investors' });
  assert.doesNotMatch(out, /question 1 of 6/);
  assert.match(out, /question 4 of 6/);
});

test('start_intake with all answers returns a brief', async () => {
  const out = await text('start_intake', {
    answers: {
      kind: 'new-screen', audience: 'retail-investor', surface: 'app-compact',
      job: 'Help investors withdraw; success = withdraw_completed', existing: 'none', stakes: ['money-movement'],
    },
  });
  assert.match(out, /Syntropy brief/);
  assert.match(out, /research_plan/);
  assert.match(out, /search_components/);
});

test('find_links groups by category', async () => {
  const out = await text('find_links', { topic: 'saudi investing' });
  assert.match(out, /### saudi-investing/);
});

test('research_plan lists tools with queries and KSA benchmarks', async () => {
  const out = await text('research_plan', { task: 'withdraw to bank', region: 'KSA' });
  assert.match(out, /### Lazyweb/);
  assert.match(out, /- "withdraw to bank/);
  assert.match(out, /## Benchmark apps/);
  assert.match(out, /\(KSA|\(GCC/);
});

test('get_guideline and get_pattern answer or degrade cleanly', async () => {
  const g = await text('get_guideline', { topic: 'contrast' });
  assert.ok(g.length > 20);
  const p = await text('get_pattern', {});
  assert.ok(/Patterns|not available yet/.test(p));
});

test('outputs are capped near 6k chars', async () => {
  const out = await text('get_component', { name: 'Button' });
  assert.ok(out.length <= 6200, `length ${out.length}`);
});

test('missing knowledge degrades with "not available yet"', async () => {
  const { tools: empty } = createTools({ store: createBundleStore({}) });
  for (const [name, args] of [['search_components', { query: 'x' }], ['find_tokens', { intent: 'x' }], ['search_icons', { meaning: 'x' }], ['get_pattern', {}], ['lint_ui', { source: 'a{}' }]]) {
    const r = await empty[name].handler(args);
    assert.match(r.content[0].text, /not available yet/, name);
  }
});

const lintExists = fs.existsSync(path.join(DEFAULT_ROOT, 'lint/index.mjs'));
test('lint_ui flags #4daa57 as no-raw-color', { skip: lintExists ? false : 'lint/index.mjs not written yet' }, async () => {
  const out = await text('lint_ui', { source: '.cta { background: #4daa57; }\n', filename: 'styles.css' });
  assert.match(out, /no-raw-color/);
});

test('lint_ui formats findings from any lintSource implementation', async () => {
  const fake = { lintSource: (src) => [{ rule: 'no-raw-color', severity: 'error', line: 1, column: 20, message: 'Raw color #4daa57', fix: 'var(--bg-brand-primary)' }] };
  const { tools: t } = createTools({ store: createBundleStore({}, { lint: fake }) });
  const r = await t.lint_ui.handler({ source: '.a { background: #4daa57 }', filename: 'a.css' });
  assert.match(r.content[0].text, /\| 1:20 \| error \| `no-raw-color` \|/);
});
