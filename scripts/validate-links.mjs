#!/usr/bin/env node
// Validates knowledge/links/links.json. With --live, also checks every URL responds.
import { readFile } from 'node:fs/promises';
import { validateLinks } from './lib/links.mjs';

const doc = JSON.parse(await readFile('knowledge/links/links.json', 'utf8'));
const problems = validateLinks(doc);
if (process.argv.includes('--live')) {
  for (const l of doc.links.filter((x) => x.access !== 'internal')) {
    try {
      const res = await fetch(l.url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 syntropy-link-check' }, signal: AbortSignal.timeout(15000) });
      if (res.status >= 400 && ![401, 403, 405, 429].includes(res.status)) problems.push(`${l.id}: HTTP ${res.status}`);
    } catch (e) { problems.push(`${l.id}: ${e.name}`); }
  }
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`${doc.links.length} links OK`);
