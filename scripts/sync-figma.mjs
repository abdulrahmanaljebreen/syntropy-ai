#!/usr/bin/env node
// Builds knowledge/components/index.json from the Syntropy design system file.
// Usage: node scripts/sync-figma.mjs [--refresh] [--if-changed]
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { getJSON, DS_FILE } from './lib/figma.mjs';
import { classifyPages } from './lib/pages.mjs';
import { extractComponents } from './lib/components.mjs';

const refresh = process.argv.includes('--refresh');
const ifChanged = process.argv.includes('--if-changed');
const CONCURRENCY = 2;

async function pool(items, n, fn) {
  const results = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }));
  return results;
}

const file = await getJSON(`files/${DS_FILE}?depth=1`, { cacheKey: 'ds-depth1', refresh });
if (ifChanged && existsSync('knowledge/components/index.json')) {
  const prev = JSON.parse(await readFile('knowledge/components/index.json', 'utf8'));
  if (prev.source?.lastModified === file.lastModified) {
    console.log(`No Figma changes since ${file.lastModified}`);
    process.exit(0);
  }
}
const pages = classifyPages(file.document.children.map(({ id, name }) => ({ id, name })));
const published = await getJSON(`files/${DS_FILE}/component_sets`, { cacheKey: 'ds-published-sets', refresh });
const publishedComps = await getJSON(`files/${DS_FILE}/components`, { cacheKey: 'ds-published-components', refresh });
const publishedIds = new Set([
  ...published.meta.component_sets.map((s) => s.node_id),
  ...publishedComps.meta.components.map((c) => c.node_id),
]);

// Foundations pages can hold components too (logos); treat them like component pages.
const targets = [
  ...pages.components,
  ...pages.foundations.map((p) => ({ ...p, code: 'f', family: '01 Foundations', status: 'stable' })),
];

let done = 0;
const perPage = await pool(targets, CONCURRENCY, async (page) => {
  const res = await getJSON(`files/${DS_FILE}/nodes?ids=${encodeURIComponent(page.id)}`, { cacheKey: `page-${page.id}`, refresh });
  const node = res.nodes[page.id];
  const comps = node ? extractComponents(node, page) : [];
  process.stdout.write(`\r${++done}/${targets.length} pages`);
  return comps.map((c) => ({ ...c, published: publishedIds.has(c.id) }));
});
process.stdout.write('\n');

const components = perPage.flat();
const sets = components.filter((c) => c.kind === 'set');
const index = {
  $schema: 'syntropy-component-index/1',
  source: { file: DS_FILE, name: file.name, lastModified: file.lastModified },
  counts: {
    pages: pages.components.length,
    sets: sets.length,
    standalone: components.length - sets.length,
    variants: components.reduce((n, c) => n + c.variantCount, 0),
    published: components.filter((c) => c.published).length,
    withDescription: components.filter((c) => c.description).length,
  },
  families: pages.families.map(({ code, name }) => ({ code, name })),
  pages: pages.components.map(({ id, code, name, slug, family, status }) => ({ id, code, name, slug, family, status })),
  foundations: pages.foundations,
  guides: pages.guides,
  components,
};
await mkdir('knowledge/components', { recursive: true });
await writeFile('knowledge/components/index.json', JSON.stringify(index, null, 1) + '\n');
console.log(index.counts);
