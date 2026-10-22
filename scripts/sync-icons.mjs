#!/usr/bin/env node
// Builds knowledge/icons/icons.json and illustrations.json from the Syntropy Icons file.
// Usage: node scripts/sync-icons.mjs [--refresh]
import { writeFile, mkdir } from 'node:fs/promises';
import { getJSON, ICONS_FILE } from './lib/figma.mjs';
import { buildIconRecords, buildIllustrationRecords } from './lib/icons.mjs';

const refresh = process.argv.includes('--refresh');
const ICONS_PAGE = '9:2';
const ISO_PAGE = '227:34';

const meta = await getJSON(`files/${ICONS_FILE}/meta`, { cacheKey: 'icons-meta', refresh });
const published = await getJSON(`files/${ICONS_FILE}/components`, { cacheKey: 'icons-published', refresh });
const publishedIds = new Set(published.meta.components.map((c) => c.node_id));
const res = await getJSON(`files/${ICONS_FILE}/nodes?ids=${ICONS_PAGE},${ISO_PAGE}`, { cacheKey: 'icons-pages', refresh });

const icons = buildIconRecords(res.nodes[ICONS_PAGE], publishedIds);
const illustrations = buildIllustrationRecords(res.nodes[ISO_PAGE]);
const source = { file: ICONS_FILE, name: meta.file?.name, lastModified: meta.file?.last_touched_at };
const bySize = icons.reduce((m, i) => ({ ...m, [i.size]: (m[i.size] || 0) + 1 }), {});

await mkdir('knowledge/icons', { recursive: true });
await writeFile('knowledge/icons/icons.json', JSON.stringify({
  $schema: 'syntropy-icons/1', source,
  counts: { icons: icons.length, published: icons.filter((i) => i.published).length, bySize },
  categories: [...new Set(icons.map((i) => i.category))],
  icons,
}, null, 1) + '\n');
await writeFile('knowledge/icons/illustrations.json', JSON.stringify({
  $schema: 'syntropy-illustrations/1', source, count: illustrations.length, illustrations,
}, null, 1) + '\n');
console.log({ icons: icons.length, published: icons.filter((i) => i.published).length, bySize, illustrations: illustrations.length });
