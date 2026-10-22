# Day 1: Repo + Figma Sync Implementation Plan

> **For agentic workers:** execute task by task; each task ends with tests passing and a commit. Steps use checkbox (`- [ ]`) syntax.

**Goal:** A private repo whose scripts turn the Syntropy Figma files into machine-readable knowledge: a component manifest, an icons manifest, example images, DTCG tokens, and a links hub.

**Architecture:** Zero-dependency Node ESM scripts. `scripts/lib/*` holds pure functions (page classification, component extraction, DTCG conversion, link validation) tested with `node:test` against trimmed fixtures. `scripts/*.mjs` are thin CLIs that fetch from the Figma REST API (token from `FIGMA_TOKEN` or `~/.config/syntropy/figma-token`), cache raw JSON in `.cache/` (gitignored) and write to `knowledge/`. Variables are not reachable over REST for this token (403), so they are exported through the Figma plugin connection into `.cache/variables.json`, then converted by `scripts/build-tokens.mjs`.

**Tech stack:** Node 20+ (built-in `fetch`, `node:test`), GitHub Actions.

## Global constraints

- Brand green is `#4daa57` (`Color/Primary/LightGreen/500`).
- Never read, extract, link or mention the private page `69:977`; also exclude `69:976` (Library Internals), governance pages and dividers.
- Figma names are kept verbatim (`name`, `props`); normalized names live beside them (`canonical`), never instead of them.
- No em dash character anywhere in generated text.
- The Figma token is never printed, logged or committed.

## File map

| File | Responsibility |
|---|---|
| `scripts/lib/figma.mjs` | REST client: token lookup, retry on 5xx/429, JSON cache |
| `scripts/lib/pages.mjs` | `classifyPages(pages)` → foundations, component pages with family, guides, excluded |
| `scripts/lib/components.mjs` | `extractComponents(pageNode, page)` → sets + standalone components with props, variant count, doc/reference frame ids; `canonicalize(props)` |
| `scripts/lib/tokens.mjs` | `toDTCG(variablesExport)` → `{ primitive, semantic, typography }` DTCG objects |
| `scripts/lib/links.mjs` | `validateLinks(links)` → list of problems |
| `scripts/sync-figma.mjs` | Writes `knowledge/components/index.json` |
| `scripts/sync-icons.mjs` | Writes `knowledge/icons/icons.json`, `illustrations.json` |
| `scripts/export-images.mjs` | Writes `knowledge/examples/components/<slug>.png` |
| `scripts/build-tokens.mjs` | Writes `knowledge/tokens/*.json` |
| `scripts/validate-links.mjs` | Checks `knowledge/links/links.json` |
| `.github/workflows/figma-sync.yml` | Nightly + manual sync, opens a PR when knowledge changes |

## Tasks

### Task 1: REST client + page classification
- [ ] Test `classifyPages` with a fixture of real page ids/names: `69:977` and `69:976` excluded, `69:889` → family `02 Actions`, slug `button`, code `02a`.
- [ ] Implement `figma.mjs` (`getJSON(path, {cacheKey})`, 4 attempts, backoff 2s/4s/8s) and `pages.mjs`.
- [ ] Tests pass, commit.

### Task 2: Component manifest
- [ ] Test `extractComponents` on a trimmed Button page fixture: finds set `417:2` named `Button`, its property definitions, variant count, doc frame `465:2`, reference frame `616:2383`.
- [ ] Test `canonicalize`: `ltr` → `LTR`, `Has icon leading` / `showLabel` / `HasIcon` → `hasIconLeading` / `showLabel` / `hasIcon`, `Property 1` flagged `unnamed`.
- [ ] Implement, run `npm run sync:figma`, check counts against the inventory (320 sets).
- [ ] Commit `knowledge/components/index.json`.

### Task 3: Icons + illustrations manifest
- [ ] Test icon record building: `Icon / voice-mail` in frame `Communication` → `{ slug: "voice-mail", category: "Communication", size: 24, published }`.
- [ ] Implement, run, expect 636 icons with a published flag (292 published today).
- [ ] Commit.

### Task 4: Example images
- [ ] Export every `Component Reference` frame at scale 1 (fallback 0.5 when over 4096px), save PNGs, record paths in the manifest.
- [ ] Commit.

### Task 5: Tokens (DTCG)
- [ ] Export variables + text/effect styles through the plugin connection to `.cache/variables.json`.
- [ ] Test `toDTCG`: an alias becomes `{ "$value": "{Color.Primary.LightGreen.500}" }`, a color becomes `$type: color` hex, modes land in `$extensions.figma.modes`.
- [ ] Implement, build, commit `knowledge/tokens/*.json`.

### Task 6: Links hub
- [ ] Test `validateLinks`: rejects missing fields, non-https, duplicates, unknown categories.
- [ ] Write `links.json` from the verified research (15 Oct), validate, commit.

### Task 7: Publish
- [ ] Create private GitHub repo `abdulrahmanaljebreen/syntropy-ai`, push.
- [ ] Store `FIGMA_TOKEN` as a repo secret straight from the token file.
- [ ] Add `figma-sync.yml` (nightly 01:00 Riyadh + manual), commit, push.

## End-of-day review for the owner
Token and manifest spot check: 5 components, 5 tokens, 5 icons, against Figma.
