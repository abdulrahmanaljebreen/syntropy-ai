# Syntropy for AI

Syntropy is the Safqah design system. This repo packages it for AI agents, so anyone in Product or Engineering can connect their own agent (Claude, Cursor, Codex, Copilot, ChatGPT, Gemini) and design and build inside Syntropy: the right components, semantic tokens, Arabic and RTL first, proper UX, accessibility and Saudi fintech rules.

Type **`/syntropy`** (or start a message with `syntropy:`) and your agent interviews you, researches, designs and reviews its own work.

## Always up to date with Figma
This repo reads the Syntropy Figma file (`a7Z956YZy9n6f9uz5DK16Y`) and the Icons file (`DDI9ObV7rOP82XQ3OJzogv`) itself, through the Figma API, every night at 01:00 Riyadh time. Nobody exports anything by hand.

- **What it reads:** every component set and variant, every icon, the doc page of each component, and example images. Published or not: unpublished components and icons are read too, so agents know all of them.
- **What it does:** rebuilds the knowledge and the skills, runs the tests, and opens a pull request only when something really changed in Figma. Merge it and every agent gets the update on its next plugin update.
- **What is not automatic yet:** tokens (Figma variables). The current Figma token has no variables access, so tokens are captured from Figma into `knowledge/tokens/source/` and rebuilt with `npm run tokens:build`.
- **Live reading:** agents connected to the Figma MCP can also open the Syntropy file directly for anything newer than last night.

Run it any time: GitHub › Actions › Figma sync › Run workflow.

## Install

**Claude Code** (recommended: skills, `/syntropy`, MCP server, updates)
```
/plugin marketplace add abdulrahmanaljebreen/syntropy-ai
/plugin install syntropy@syntropy-ai
```
Then `/plugin`, Marketplaces, `syntropy-ai`, Enable auto-update.

**Claude Desktop, Cursor, Codex, Gemini CLI, VS Code**: one command installs the Syntropy MCP server on your machine and sets up every one of these apps it finds:
```
curl -fsSL https://raw.githubusercontent.com/abdulrahmanaljebreen/syntropy-ai/main/mcp/install.mjs | node --input-type=module -
```
For the skills in Cursor, Codex, Copilot and Gemini CLI: `npx skills add abdulrahmanaljebreen/syntropy-ai`, then copy `dist/agents-snippet.md` into the `AGENTS.md` of the product repo you work in.

**Claude.ai** (Pro or Max): Settings › Capabilities › Skills › upload each zip from `dist/skills/` (start with `syntropy.zip`).

**ChatGPT, Gemini, Claude Projects**: create a project, paste `dist/project-kit/INSTRUCTIONS.md` as the instructions, and upload `dist/project-kit/syntropy-knowledge.md` as knowledge.

**Figma Make**: copy `dist/figma-make/guidelines/` into your Make file's `guidelines/` folder.

**Updates:** the MCP server pulls the latest from GitHub by itself (at start and every 6 hours), and the Claude Code plugin updates itself once auto-update is on. Details: `mcp/README.md`.

## Use
| Type | What happens |
|---|---|
| `/syntropy` | The agent interviews you, one question at a time, then designs |
| `/syntropy a payout details screen` | Same, skipping what you already said |
| `/syntropy research KYC document upload` | References from Lazyweb, Refero, Mobbin, mapped to Syntropy |
| `/syntropy review <Figma link, image, URL or file>` | Heuristics, states, accessibility, copy, compliance, lint |
| `/syntropy explain CardDeal` | What it is, when to use it, variants, tokens, example |

In agents without slash commands, write `syntropy:` instead of `/syntropy`.

## What's inside
| Path | What it holds |
|---|---|
| `skills/` | 14 Agent Skills: syntropy (entry point), components, foundations, patterns, content, rtl-arabic, accessibility, ux-review, compliance-ux, icons-illustration, inspiration, product-workflow, figma, code-adapters |
| `knowledge/components/` | Manifest of 320 sets and 34 components, 85 guides from the Figma doc pages, descriptions for all 354 |
| `knowledge/tokens/` | W3C DTCG tokens and `resolved.json` with final Light and Dark values |
| `knowledge/patterns/` | 17 Safqah screen patterns |
| `knowledge/content/`, `knowledge/ux/` | Voice, numbers, glossary, principles, RTL, accessibility, review, compliance |
| `knowledge/research/`, `knowledge/links/` | Research tool guides and 181 verified links |
| `knowledge/examples/` | 422 reference images |
| `mcp/` | Syntropy MCP server (10 tools) |
| `lint/` | syntropy-lint (13 rules): `node lint/cli.mjs <files>` |
| `dist/` | Claude.ai skill zips, project kit, Figma Make guidelines, product-repo snippet |
| `docs/reviews/` | Open findings and decisions for the design system team |

## Sources of truth
- Components, icons, doc pages and example images: the Syntropy Figma files, read directly every night by `.github/workflows/figma-sync.yml` (opens a PR when something changed).
- Tokens: captured from Figma into `knowledge/tokens/source/` (checksum-verified), built with `npm run tokens:build`.
- Rules, guidelines, patterns, links: this repo, changed through pull requests.

## Maintain
```
npm test               all tests (lint, MCP, builders)
npm run sync:figma     component manifest from Figma (--refresh bypasses the cache)
npm run sync:icons     icons and illustrations
npm run sync:images    example images
npm run docs:build     guides from the Figma doc pages
npm run tokens:build   DTCG tokens from the Figma snapshot
npm run dist           bundle data into skills, then build dist/
npm run mcp:bundle     rebuild the single-file MCP server
npm run links:check    validate the links hub (-- --live checks every URL)
```
The Figma token is read from `FIGMA_TOKEN` or `~/.config/syntropy/figma-token` and is never committed.

Report a gap or a wrong rule: open an issue with the label `knowledge-gap`.
