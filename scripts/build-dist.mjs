#!/usr/bin/env node
// Builds everything people install outside Claude Code, from the same sources:
//   dist/skills/<name>.zip              upload in Claude.ai (Settings > Capabilities > Skills)
//   dist/project-kit/INSTRUCTIONS.md    paste into a ChatGPT Project, Gemini Gem or Claude Project
//   dist/project-kit/syntropy-knowledge.md   upload as the project's knowledge file
//   dist/figma-make/guidelines/*.md     Figma Make guidelines folder
// Run after scripts/build-skills.mjs.
import { readFile, writeFile, mkdir, rm, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const read = async (p) => (existsSync(p) ? readFile(p, 'utf8') : '');
const stripFrontmatter = (md) => md.replace(/^---\n[\s\S]*?\n---\n/, '');
const stripSources = (md) => md.replace(/\n## Sources[\s\S]*$/, '\n');
const section = (title, body) => (body.trim() ? `\n\n---\n\n# ${title}\n\n${body.trim()}\n` : '');

await rm('dist', { recursive: true, force: true });
await mkdir('dist/skills', { recursive: true });

// 1. Skill zips (images excluded to stay small; Claude Code users get them through the plugin).
const skills = (await readdir('skills', { withFileTypes: true })).filter((d) => d.isDirectory() && existsSync(join('skills', d.name, 'SKILL.md'))).map((d) => d.name);
for (const name of skills) {
  execFileSync('zip', ['-qr', join('..', 'dist', 'skills', `${name}.zip`), name, '-x', '*.png', '-x', '*/evals/*', '-x', '.DS_Store'], { cwd: 'skills' });
}

// 2. Project kit.
const agents = await read('AGENTS.md');
const nonNeg = agents.match(/## Non-negotiables[\s\S]*?(?=\n## Where)/)?.[0] || '';
const intake = agents.match(/## Start with[\s\S]*?(?=\n## Non-negotiables)/)?.[0] || '';
const instructions = `# Syntropy assistant (Safqah design system)

You design and review Safqah product UI with Syntropy, the Safqah design system. Safqah (صفقة) is a Saudi, Sharia-compliant investment platform; its products are Arabic-first and right-to-left. The attached file syntropy-knowledge.md is your source of truth: components, tokens, patterns, copy, RTL, accessibility and compliance. Look things up there before answering; never invent components, tokens or rules.

${intake.replace('## Start with `syntropy:` or `/syntropy`', '## How to start').replace(/\(or `\/syntropy` in Claude Code\), /, '')}
${nonNeg}
When you need exact details (variant names, token values, component guides), search syntropy-knowledge.md by name.
`;
await mkdir('dist/project-kit', { recursive: true });
await writeFile('dist/project-kit/INSTRUCTIONS.md', instructions);

const parts = [];
parts.push(section('Syntropy entry point', stripFrontmatter(await read('skills/syntropy/SKILL.md'))));
for (const [title, path] of [
  ['Tokens: intent lookup', 'skills/syntropy-foundations/references/token-lookup.md'],
  ['Tokens: color roles', 'skills/syntropy-foundations/references/color.md'],
  ['Typography', 'skills/syntropy-foundations/references/typography.md'],
  ['Spacing and layout', 'skills/syntropy-foundations/references/spacing-layout.md'],
  ['Components: decision trees', 'skills/syntropy-components/references/decision-trees.md'],
  ['Components: confusables', 'skills/syntropy-components/references/confusables.md'],
  ['Components: catalog', 'skills/syntropy-components/references/catalog.md'],
  ['Components: recipes', 'skills/syntropy-components/references/composition-recipes.md'],
  ['Voice and tone', 'knowledge/content/voice-tone.md'],
  ['Numbers and currency', 'knowledge/content/numbers-currency.md'],
  ['Glossary', 'knowledge/content/glossary.md'],
  ['RTL rules', 'knowledge/ux/rtl.md'],
  ['Principles', 'knowledge/ux/principles.md'],
  ['Accessibility: contrast pairs', 'knowledge/ux/accessibility/contrast-pairs.md'],
  ['Review: Safqah fintech heuristics', 'knowledge/ux/review/fintech-heuristics.md'],
  ['Review: states', 'knowledge/ux/review/states.md'],
  ['Compliance: obligation map', 'knowledge/ux/compliance/README.md'],
  ['Compliance: review checklist', 'knowledge/ux/compliance/review-checklist.md'],
  ['Compliance: anti-pressure', 'knowledge/ux/compliance/anti-pressure.md'],
  ['Research: how to research', 'knowledge/research/README.md'],
  ['Research: benchmarks', 'knowledge/research/benchmarks.md'],
]) parts.push(section(title, stripSources(await read(path))));
if (existsSync('knowledge/patterns')) {
  for (const f of (await readdir('knowledge/patterns')).filter((x) => x.endsWith('.md')).sort()) {
    parts.push(section(`Pattern: ${f.replace('.md', '')}`, stripSources(await read(`knowledge/patterns/${f}`))));
  }
}
// Compact token table: name, Light, Dark.
const resolved = JSON.parse(await read('knowledge/tokens/resolved.json')).tokens;
const rows = Object.entries(resolved).filter(([, t]) => t.collection === 'Semantic')
  .map(([n, t]) => `| \`${n}\` | ${JSON.stringify(t.value.Light)} | ${JSON.stringify(t.value.Dark)} | ${t.tag || ''} |`);
parts.push(section('Semantic tokens (all)', ['| Token | Light | Dark | Tag |', '| --- | --- | --- | --- |', ...rows].join('\n')));
await writeFile('dist/project-kit/syntropy-knowledge.md', `# Syntropy knowledge pack\n\nGenerated from the Syntropy repo. Search by component, token or topic name.${parts.join('')}`);

// 3. Figma Make guidelines.
await mkdir('dist/figma-make/guidelines', { recursive: true });
await writeFile('dist/figma-make/guidelines/Guidelines.md', `# Syntropy guidelines for Figma Make

Build Safqah UI with the Syntropy design system: Arabic-first, right-to-left, semantic tokens only, real Syntropy components only.

Read these files before generating:
- tokens.md: every semantic token with Light and Dark values; use them as CSS variables (bg/brand/primary becomes --bg-brand-primary).
- components.md: which component to use for what.
- copy.md: voice, numbers and currency.
- rtl.md: right-to-left rules.
- accessibility.md: contrast pairs and touch targets.

${nonNeg}
`);
await writeFile('dist/figma-make/guidelines/tokens.md', `# Tokens\n\n${['| Token | Light | Dark |', '| --- | --- | --- |', ...Object.entries(resolved).filter(([, t]) => t.collection === 'Semantic').map(([n, t]) => `| \`--${n.replace(/\//g, '-')}\` | ${JSON.stringify(t.value.Light)} | ${JSON.stringify(t.value.Dark)} |`)].join('\n')}\n`);
await writeFile('dist/figma-make/guidelines/components.md', stripSources(await read('skills/syntropy-components/references/decision-trees.md')) || '# Components\n');
await writeFile('dist/figma-make/guidelines/copy.md', stripSources(await read('knowledge/content/voice-tone.md')) + '\n' + stripSources(await read('knowledge/content/numbers-currency.md')));
await writeFile('dist/figma-make/guidelines/rtl.md', stripSources(await read('knowledge/ux/rtl.md')));
await writeFile('dist/figma-make/guidelines/accessibility.md', stripSources(await read('knowledge/ux/accessibility/contrast-pairs.md')));

// 4. Snippet for product repos (AGENTS.md section).
await writeFile('dist/agents-snippet.md', `## Design: Syntropy

This repo's UI follows Syntropy, the Safqah design system. For any screen, component, copy or UI change:
- Start with \`/syntropy\` (Claude Code) or a message beginning with \`syntropy:\`; the Syntropy skills are installed from abdulrahmanaljebreen/syntropy-ai.
- Use only Syntropy components and semantic tokens; Arabic and RTL first; Western digits; currency after the amount; minimal copy; no em dash.
- Run \`syntropy-lint\` on changed UI files before opening a PR, and include the design checklist and Figma link in the PR body.
`);

const size = (p) => Number(execFileSync('du', ['-sk', p]).toString().split('\t')[0]);
console.log({ skills: skills.length, zipsKB: size('dist/skills'), instructionsChars: instructions.length, knowledgePackKB: size('dist/project-kit/syntropy-knowledge.md') });
