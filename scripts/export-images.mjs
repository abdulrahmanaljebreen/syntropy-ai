#!/usr/bin/env node
// Exports example images for agents to look at:
//   knowledge/examples/components/<page>/reference.png   the labelled variant matrix
//   knowledge/examples/components/<page>/<component>.png each component set
// and records the paths in knowledge/examples/components/index.json.
// Usage: node scripts/export-images.mjs [--page button] [--format png|jpg] [--force]
// Existing images are kept unless --force; failed batches are reported, not fatal.
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { getJSON, download, DS_FILE } from './lib/figma.mjs';
import { slugify } from './lib/pages.mjs';

const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const onlyPage = arg('--page');
const format = arg('--format') || 'png';
const force = process.argv.includes('--force');
const MAX_SIDE = 1600; // component sets are scaled down to this longest side
const BATCH = 15;

const index = JSON.parse(await readFile('knowledge/components/index.json', 'utf8'));
const comps = index.components.filter((c) => !c.hidden && (!onlyPage || c.page === onlyPage));

// Sizes from the cached page trees, so we can pick a scale per node.
const boxes = {};
for (const page of new Set(comps.map((c) => c.page))) {
  const p = index.pages.find((x) => x.slug === page) || index.foundations.find((x) => x.slug === page);
  const cache = `.cache/figma/page-${p.id.replace(/:/g, '_')}.json`;
  if (!existsSync(cache)) continue;
  const d = JSON.parse(await readFile(cache, 'utf8'));
  const walk = (n) => {
    boxes[n.id] = n.absoluteBoundingBox;
    if (n.type === 'COMPONENT_SET' || n.type === 'INSTANCE') return;
    (n.children || []).forEach(walk);
  };
  walk(d.nodes[p.id].document);
}

const jobs = [];
const seenRef = new Set();
for (const c of comps) {
  if (c.frames.reference && !seenRef.has(c.frames.reference)) {
    seenRef.add(c.frames.reference);
    jobs.push({ id: c.frames.reference, page: c.page, file: `${c.page}/reference.${format}`, scale: 1, kind: 'reference' });
  }
  const b = boxes[c.id];
  const side = b ? Math.max(b.width, b.height) : MAX_SIDE;
  const scale = Math.min(2, Math.max(0.25, +(MAX_SIDE / side).toFixed(2)));
  jobs.push({ id: c.id, page: c.page, file: `${c.page}/${slugify(c.name) || c.id.replace(':', '-')}.${format}`, scale, kind: c.kind, name: c.name });
}

const outDir = 'knowledge/examples/components';
const results = [];
// Group by scale so one request serves a batch.
const byScale = Object.groupBy(jobs, (j) => j.scale);
for (const [scale, group] of Object.entries(byScale)) {
  for (let i = 0; i < group.length; i += BATCH) {
    const all = group.slice(i, i + BATCH);
    const batch = all.filter((j) => force || !existsSync(`${outDir}/${j.file}`));
    for (const j of all.filter((x) => !batch.includes(x))) {
      results.push({ id: j.id, page: j.page, kind: j.kind, name: j.name, path: `${outDir}/${j.file}`, bytes: (await stat(`${outDir}/${j.file}`)).size });
    }
    if (!batch.length) continue;
    const ids = batch.map((j) => j.id).join(',');
    let res;
    try {
      res = await getJSON(`images/${DS_FILE}?ids=${encodeURIComponent(ids)}&format=${format}&scale=${scale}`);
    } catch (e) {
      console.error(`\nbatch failed (${e.message}): ${ids}`);
      batch.forEach((j) => results.push({ ...j, error: e.message }));
      continue;
    }
    for (const j of batch) {
      const url = res.images?.[j.id];
      if (!url) {
        const ref = `${outDir}/${j.page}/reference.${format}`;
        results.push({ id: j.id, page: j.page, kind: j.kind, name: j.name, error: 'Figma renders no image for this set; see the page reference image', ...(existsSync(ref) ? { fallback: ref } : {}) });
        continue;
      }
      const path = `${outDir}/${j.file}`;
      try { await download(url, path); } catch (e) { results.push({ ...j, error: e.message }); continue; }
      results.push({ id: j.id, page: j.page, kind: j.kind, name: j.name, path, bytes: (await stat(path)).size });
    }
    process.stdout.write(`\r${results.length}/${jobs.length} images`);
  }
}
process.stdout.write('\n');

if (!onlyPage) {
  await mkdir(outDir, { recursive: true });
  await writeFile(`${outDir}/index.json`, JSON.stringify(results.map(({ bytes, ...r }) => r), null, 1) + '\n');
}
const total = results.reduce((n, r) => n + (r.bytes || 0), 0);
console.log({ images: results.filter((r) => r.bytes).length, failed: results.filter((r) => r.error).length, totalMB: +(total / 1e6).toFixed(1) });
