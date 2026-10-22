import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseHex, composite, relativeLuminance, contrastRatio, buildReport, renderMarkdown,
} from '../scripts/contrast-pairs.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const resolved = JSON.parse(readFileSync(resolve(ROOT, 'knowledge/tokens/resolved.json'), 'utf8'));
const report = buildReport(resolved);

test('parseHex reads 3, 6 and 8 digit hex', () => {
  assert.deepEqual(parseHex('#fff'), { r: 255, g: 255, b: 255, a: 1 });
  assert.deepEqual(parseHex('#4daa57'), { r: 77, g: 170, b: 87, a: 1 });
  const a = parseHex('#00000080');
  assert.equal(a.r, 0);
  assert.ok(Math.abs(a.a - 128 / 255) < 1e-9);
  assert.throws(() => parseHex('green'));
});

test('relative luminance of black and white', () => {
  assert.equal(relativeLuminance('#000000'), 0);
  assert.ok(Math.abs(relativeLuminance('#ffffff') - 1) < 1e-12);
});

test('black on white is 21:1 and symmetric', () => {
  assert.ok(Math.abs(contrastRatio('#000000', '#ffffff') - 21) < 1e-9);
  assert.equal(contrastRatio('#000', '#fff'), contrastRatio('#fff', '#000'));
});

test('#777 on white is about 4.48:1 (just under AA)', () => {
  const r = contrastRatio('#777777', '#ffffff');
  assert.ok(Math.abs(r - 4.48) < 0.01, `got ${r}`);
  assert.ok(r < 4.5);
});

test('same colour is 1:1', () => {
  assert.equal(contrastRatio('#4daa57', '#4daa57'), 1);
});

test('composite blends alpha over an opaque backdrop', () => {
  assert.equal(composite('#00000080', '#ffffff'), '#7f7f7f');
  assert.equal(composite('#4daa57', '#000000'), '#4daa57');
});

test('text/default on bg/base passes AA normal in Light and Dark', () => {
  const p = report.pairs.find((x) => x.id === 'text/default on bg/base');
  assert.ok(p, 'pair present');
  assert.equal(p.verdict, 'pass');
  assert.equal(p.modes.Light.aaNormal, true);
  assert.equal(p.modes.Dark.aaNormal, true);
});

test('every pair has both modes and numeric ratios', () => {
  assert.ok(report.pairs.length > 100);
  for (const p of report.pairs) {
    for (const m of ['Light', 'Dark']) {
      assert.equal(typeof p.modes[m].ratio, 'number', p.id);
      assert.ok(p.modes[m].ratio >= 1 && p.modes[m].ratio <= 21, p.id);
    }
  }
});

test('known risks are present in the report', () => {
  for (const id of ['text/subtle on bg/base', 'text/on-brand on bg/success']) {
    const k = report.knownRisks.find((x) => x.id === id);
    assert.ok(k && k.verdict !== 'missing', id);
  }
});

test('generated files match the report and contain no em dash', () => {
  const json = JSON.parse(readFileSync(resolve(ROOT, 'knowledge/ux/accessibility/contrast-pairs.json'), 'utf8'));
  assert.deepEqual(json.summary, report.summary, 'run node scripts/contrast-pairs.mjs to regenerate');
  const md = readFileSync(resolve(ROOT, 'knowledge/ux/accessibility/contrast-pairs.md'), 'utf8');
  assert.equal(md, renderMarkdown(report));
  assert.ok(md.includes('text/default'));
  const EM_DASH = String.fromCharCode(0x2014);
  assert.ok(!md.includes(EM_DASH) && !JSON.stringify(json).includes(EM_DASH));
});

test('brand green pairs are accepted as built, not failures', () => {
  for (const id of ['text/on-brand on bg/brand/primary', 'icon/on-brand on bg/brand/primary', 'text/brand/primary on bg/base', 'border/brand/primary on bg/base']) {
    const p = report.pairs.find((x) => x.id === id);
    assert.ok(p, id);
    assert.equal(p.verdict, 'brand-as-built', id);
  }
  assert.equal(report.pairs.find((x) => x.id === 'text/on-brand on bg/success').verdict, 'fail-both');
  assert.ok(!report.knownRisks.some((k) => k.id.includes('brand/primary')));
});
