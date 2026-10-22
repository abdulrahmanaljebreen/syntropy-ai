# Skill standard

Every skill in `skills/` follows this standard. Skills are installed on their own (Claude.ai zip upload, `npx skills add`, plugin), so each skill folder must work without the rest of the repo.

## Folder
```
skills/<name>/
├─ SKILL.md              frontmatter + body, at most ~500 lines
├─ references/           hand-written topic files, one topic per file
│  └─ data/              GENERATED copies of repo data (never edit by hand)
├─ scripts/              optional zero-dependency Node scripts (node >= 20)
└─ evals/evals.json      at least 12 evals, skill-creator schema
```
`references/data/` is filled by `scripts/build-skills.mjs` from `knowledge/`. When writing a skill, refer to data with these exact paths (only the ones your skill needs; list them in `skills/<name>/data.json` as an array of the keys below):

| Key | Path inside the skill | Source |
|---|---|---|
| `tokens` | `references/data/tokens-resolved.json` | knowledge/tokens/resolved.json |
| `text-styles` | `references/data/text-styles.json` | knowledge/tokens/text-styles.json |
| `components` | `references/data/components-index.json` | knowledge/components/index.json |
| `component-guides` | `references/data/components/<page-slug>.md` | knowledge/components/*.md |
| `descriptions` | `references/data/components-descriptions.json` | knowledge/components/descriptions.json |
| `icons` | `references/data/icons.json`, `references/data/illustrations.json` | knowledge/icons/ |
| `links` | `references/data/links.json` | knowledge/links/links.json |
| `foundations` | `references/data/foundations/<slug>.md` | knowledge/foundations/figma/ |
| `contrast` | `references/data/contrast-pairs.md` | knowledge/ux/accessibility/contrast-pairs.md |
| `ux` | `references/data/ux/**` | knowledge/ux/ |
| `content` | `references/data/content/**` | knowledge/content/ |
| `research` | `references/data/research/**` | knowledge/research/ |
| `patterns` | `references/data/patterns/**` | knowledge/patterns/ |
| `examples` | `references/data/examples/<page>/reference.png` | knowledge/examples/components/*/reference.png |

## Frontmatter
```yaml
---
name: syntropy-<topic>          # lowercase, hyphens, matches the folder
description: <what it does + exactly when to use it, max 1024 chars, third person,
  name the triggers: Safqah, Syntropy, the topics, the words a person would type>
---
```

## Body sections, in this order
1. **Purpose**: two sentences.
2. **Hard rules**: numbered, testable, each with a one-line why.
3. **Workflow**: the steps the agent follows, in order, with which reference to open at each step.
4. **Decision trees / tables**: "need X → use Y, not Z".
5. **Self-check before answering**: a checklist the agent runs on its own output.
6. **References**: a table of every file in `references/` with one line on when to open it.

## Writing rules
- Follow `docs/CONVENTIONS.md` (no em dash, exact token and component names, Arabic first, Western digits).
- Very detailed: real Safqah examples, Arabic and English copy, Do/Don't, anti-patterns, edge cases. The body is the map; depth goes in references.
- Imperative voice to the agent ("Use", "Never", "Open").
- Never mention or link work-in-progress areas of the Figma file.
- Cross-skill pointers by skill name (e.g. "see syntropy-content"), never by repo path.

## Evals (`evals/evals.json`)
```json
{ "skill_name": "syntropy-<topic>", "evals": [
  { "id": 1, "prompt": "...", "expected_output": "...", "expectations": ["verifiable statement", "..."] }
] }
```
At least 12 per skill. Include at least 3 red-team prompts (the person asks for something that breaks Syntropy or good UX, e.g. "make the button blue", "add a countdown to push them to invest", "hide the fee"); the expectation is that the agent pushes back politely and offers the Syntropy way.
