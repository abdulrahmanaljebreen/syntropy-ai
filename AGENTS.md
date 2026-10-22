# Syntropy: instructions for AI agents

You are working with **Syntropy**, the design system of **Safqah** (صفقة, "a deal"), a Saudi, Sharia-compliant investment platform. Its products are Arabic-first and right-to-left: a Flutter app (compact phones and regular tablets), web, and a back-office. Everything you design, build or review for Safqah follows this file.

## Start with `syntropy:` or `/syntropy`
When the person's message starts with `syntropy:` (or `/syntropy` in Claude Code), or asks for any Safqah screen, flow or UI:

1. **Interview, one question per message**, skipping anything already answered:
   1. What are you making? A new screen · a new flow · a change to something live · a review · an explanation
   2. Who is it for? Retail investor · qualified investor · developer or issuer · internal team
   3. Where does it live? App, compact · app, regular · web · back-office
   4. What job does it do, and how will we know it worked? (metric or Mixpanel event)
   5. What exists already? Figma link · screenshot · ticket · nothing
   6. What's at stake? Money movement · personal data · regulated disclosure · deadline · none
2. **Restate the brief** in five lines and ask the person to confirm.
3. **Research** real references (Lazyweb, Refero, Mobbin; Saudi and GCC first), show two or three approaches mapped to Syntropy, recommend one.
4. **Design** in the medium the person wants, using only Syntropy.
5. **Self-review** (heuristics, states, accessibility, copy, compliance, lint), fix, then hand off.

Modes: `syntropy: research <topic>`, `syntropy: review <link|image|code>`, `syntropy: explain <component|token>`. A quick question gets a direct answer, no interview.

## Non-negotiables
1. **Components:** only those in `knowledge/components/index.json`, with exact Figma names and variant values. Never invent one; if nothing fits, say so and suggest the closest composition.
2. **Tokens:** only semantic tokens from `knowledge/tokens/resolved.json` for color, spacing, radius and type. No raw hex or pixel values. Brand green is `bg/brand/primary` (#4daa57).
3. **RTL first:** design in Arabic and right-to-left. Direction follows the locale and is never a component parameter in code. Charts keep time running left to right.
4. **Numbers:** Western digits (0-9). Currency after the amount (`1,250.00 ر.س`). Two decimals for money, one for percentages. Arabic percentage labels start with «نسبة».
5. **Copy:** minimal (a label, the control, at most one short hint). Clear Arabic first. Never use the em dash character. No flattery, no fake urgency. Errors say what happened and what to do next.
6. **Accessibility:** WCAG 2.2 AA. Pick token pairs that pass in `knowledge/ux/accessibility/contrast-pairs.md`; 48 point touch targets in the app; every icon-only control has a label. Brand green is used as built: the primary Button (white on `bg/brand/primary`) and brand green amounts, selected tiles and links stay exactly as the components build them, and are never flagged.
7. **Money and disclosure:** risk next to every commitment action; fees (with VAT) before confirmation; net returns as the headline, projections labelled as expected, never guaranteed; limits come from the backend, never hardcoded. Confirm regulated wording with Safqah Compliance.
8. **No dark patterns:** no countdowns used as pressure, no pre-ticked consent, no hidden costs, no confirmshaming.
9. **States:** every screen designs empty, loading (Skeleton), error, success and disabled.
10. **One primary action** per screen. Warnings use the warning tone; red only for critical or defaulted.

## Where the knowledge lives
| Need | Open |
|---|---|
| Which component, and how to use it | `knowledge/components/<page>.md` (85 guides), `knowledge/components/descriptions.json` |
| What a component looks like | `knowledge/examples/components/<page>/reference.png` |
| Tokens and values | `knowledge/tokens/resolved.json`, DTCG files in `knowledge/tokens/` |
| Icons and illustrations | `knowledge/icons/icons.json`, `illustrations.json` |
| Screen patterns (deal page, invest, KYC, wallet...) | `knowledge/patterns/` |
| Voice, copy, numbers, glossary | `knowledge/content/` |
| Principles, RTL, accessibility, heuristics, compliance | `knowledge/ux/` |
| Research tools and benchmarks | `knowledge/research/`, `knowledge/links/links.json` |
| Foundations from Figma | `knowledge/foundations/figma/` |

Skills with the full detail are in `skills/` (start with `skills/syntropy/SKILL.md`).

## Tools
- **Syntropy MCP server** (if connected): `start_intake`, `search_components`, `get_component`, `find_tokens`, `search_icons`, `get_pattern`, `get_guideline`, `find_links`, `research_plan`, `lint_ui`. Setup: `mcp/README.md`.
- **Lint** before handing over code or copy: `node lint/cli.mjs <files>` (13 rules: raw colors, off-scale spacing, physical left/right, em dash, Eastern digits, currency position, unknown components, fake urgency, contrast and more).
- **Figma**: the Syntropy design system file `a7Z956YZy9n6f9uz5DK16Y` and Icons file `DDI9ObV7rOP82XQ3OJzogv`. This repo reads both every night, published and unpublished components alike, so `knowledge/` is current; open the files directly only for something newer. Read design system pages only. A component that is not published is still used by its exact name; only in another Figma file does it need its published route or a copy from the Syntropy file (`skills/syntropy-components/references/unpublished.md`).

## Working in a Safqah code repo
Branch `feat/<area>-<thing>`, keep PRs small, put the design checklist and Figma link in the PR body, run the lint, and never merge your own PR.
