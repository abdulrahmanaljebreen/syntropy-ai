#!/usr/bin/env node
// Fills skills/<name>/references/data/ with the repo data each skill declares in data.json,
// merges component descriptions, and checks every skill against the standard.
// Usage: node scripts/build-skills.mjs [--check]   (--check: validate only, write nothing)
import { readFile, writeFile, mkdir, rm, cp, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const checkOnly = process.argv.includes('--check');
const K = 'knowledge';

// key -> list of [source, destination inside references/data]
export const DATA_MAP = {
  tokens: [[`${K}/tokens/resolved.json`, 'tokens-resolved.json']],
  'text-styles': [[`${K}/tokens/text-styles.json`, 'text-styles.json']],
  components: [[`${K}/components/index.json`, 'components-index.json']],
  'component-guides': [[`${K}/components`, 'components', (f) => f.endsWith('.md')]],
  descriptions: [[`${K}/components/descriptions.json`, 'components-descriptions.json']],
  icons: [[`${K}/icons/icons.json`, 'icons.json'], [`${K}/icons/illustrations.json`, 'illustrations.json']],
  links: [[`${K}/links/links.json`, 'links.json']],
  foundations: [[`${K}/foundations/figma`, 'foundations']],
  contrast: [[`${K}/ux/accessibility/contrast-pairs.md`, 'contrast-pairs.md']],
  ux: [[`${K}/ux`, 'ux']],
  content: [[`${K}/content`, 'content']],
  research: [[`${K}/research`, 'research']],
  patterns: [[`${K}/patterns`, 'patterns']],
  examples: [[`${K}/examples/components`, 'examples', (f, rel) => rel.endsWith('/reference.png') || f === 'reference.png']],
};

async function copyDir(src, dest, filter) {
  const entries = await readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = join(src, e.name);
    const d = join(dest, e.name);
    if (e.isDirectory()) { await copyDir(s, d, filter); continue; }
    if (filter && !filter(e.name, s)) continue;
    await mkdir(dirname(d), { recursive: true });
    await cp(s, d);
  }
}

async function mergeDescriptions() {
  const dir = `${K}/components/descriptions`;
  if (!existsSync(dir)) return null;
  const merged = {};
  for (const f of (await readdir(dir)).filter((x) => x.endsWith('.json')).sort()) {
    Object.assign(merged, JSON.parse(await readFile(join(dir, f), 'utf8')));
  }
  const index = JSON.parse(await readFile(`${K}/components/index.json`, 'utf8'));
  const missing = index.components.filter((c) => !merged[c.id]).map((c) => `${c.name} (${c.id})`);
  if (!checkOnly) await writeFile(`${K}/components/descriptions.json`, JSON.stringify(merged, null, 1) + '\n');
  return { count: Object.keys(merged).length, missing };
}

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  let key = null;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) { key = kv[1]; fm[key] = kv[2]; } else if (key) fm[key] += ' ' + line.trim();
  }
  return fm;
}

export function checkSkill(name, md, evals) {
  const problems = [];
  const fm = parseFrontmatter(md);
  if (!fm) problems.push('missing frontmatter');
  else {
    if (fm.name !== name) problems.push(`frontmatter name "${fm.name}" must equal folder "${name}"`);
    if (!/^[a-z0-9-]{1,64}$/.test(fm.name || '')) problems.push('name must be lowercase-hyphen, max 64');
    const desc = (fm.description || '').replace(/^["'>|]\s*/, '');
    if (!desc) problems.push('missing description');
    if (desc.length > 1024) problems.push(`description is ${desc.length} chars (max 1024)`);
  }
  const bodyLines = md.split('\n').length;
  if (bodyLines > 560) problems.push(`SKILL.md has ${bodyLines} lines (target <= 500)`);
  if (/—/.test(md)) problems.push('em dash in SKILL.md');
  if (/69:977/.test(md)) problems.push('mentions a private Figma page');
  if (!evals) problems.push('missing evals/evals.json');
  else {
    if (evals.skill_name !== name) problems.push('evals skill_name mismatch');
    if ((evals.evals || []).length < 12) problems.push(`only ${(evals.evals || []).length} evals (min 12)`);
  }
  return problems;
}

async function main() {
  const report = { skills: {}, descriptions: await mergeDescriptions() };
  const skillsDir = 'skills';
  for (const name of (await readdir(skillsDir)).sort()) {
    const root = join(skillsDir, name);
    if (!(await stat(root)).isDirectory() || !existsSync(join(root, 'SKILL.md'))) continue;
    const md = await readFile(join(root, 'SKILL.md'), 'utf8');
    const evalsPath = join(root, 'evals', 'evals.json');
    const evals = existsSync(evalsPath) ? JSON.parse(await readFile(evalsPath, 'utf8')) : null;
    const problems = checkSkill(name, md, evals);
    const keys = existsSync(join(root, 'data.json')) ? JSON.parse(await readFile(join(root, 'data.json'), 'utf8')) : [];
    if (!checkOnly) {
      const dataDir = join(root, 'references', 'data');
      await rm(dataDir, { recursive: true, force: true });
      for (const key of keys) {
        const entries = DATA_MAP[key];
        if (!entries) { problems.push(`unknown data key ${key}`); continue; }
        for (const [src, dest, filter] of entries) {
          if (!existsSync(src)) { problems.push(`data source missing: ${src}`); continue; }
          if ((await stat(src)).isDirectory()) await copyDir(src, join(dataDir, dest), filter);
          else { await mkdir(dataDir, { recursive: true }); await cp(src, join(dataDir, dest)); }
        }
      }
      if (keys.length) await writeFile(join(dataDir, 'README.md'), '# Generated data\n\nCopied from the Syntropy knowledge base by scripts/build-skills.mjs. Do not edit; edit the source in the repo.\n');
    }
    report.skills[name] = { evals: evals?.evals?.length || 0, data: keys, problems };
  }
  console.log(JSON.stringify(report, null, 1));
  if (Object.values(report.skills).some((s) => s.problems.length)) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
