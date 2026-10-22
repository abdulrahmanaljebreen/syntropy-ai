#!/usr/bin/env node
// Builds knowledge/tokens/*.json (DTCG) and resolved.json from the Figma snapshot in
// knowledge/tokens/source/. The snapshot is refreshed through the Figma plugin connection
// (the REST variables endpoint needs an Enterprise-scoped token), verified by checksum.
import { readFile, writeFile } from 'node:fs/promises';
import { buildTokens } from './lib/tokens.mjs';

const SRC = 'knowledge/tokens/source';
const OUT = 'knowledge/tokens';
const read = async (f) => JSON.parse(await readFile(`${SRC}/${f}`, 'utf8'));

const collections = await Promise.all(['primitive-core.json', 'semantic.json', 'typography.json'].map(read));
const styles = await read('styles.json');
const { files, resolved, issues } = buildTokens({ collections, styles });

for (const [name, data] of Object.entries(files)) {
  await writeFile(`${OUT}/${name}`, JSON.stringify(data, null, 1) + '\n');
}
await writeFile(`${OUT}/resolved.json`, JSON.stringify({
  $schema: 'syntropy-resolved-tokens/1',
  note: 'Every token with its final value per mode. Semantic tokens are the ones to use in product UI; primitives are never used directly.',
  brandGreen: '#4daa57',
  tokens: resolved,
}, null, 1) + '\n');
await writeFile(`${OUT}/issues.json`, JSON.stringify(issues, null, 1) + '\n');
console.log({ files: Object.keys(files), resolved: Object.keys(resolved).length, issues: issues.length });
