# Refero

Refero (refero.design) is a curated library of real product screens, multi-step flows and web visual styles, searchable by meaning through an MCP server. Use it when you need well-described references with structured metadata (UX patterns, UI elements, layout notes) that an agent can reason about without opening every image.

## What it is

| Item | Detail |
|---|---|
| Content | iOS app screens, web app and site screens, user flows with per-step goals, curated web styles with full token and layout write-ups |
| Strength | Every screen has a written description, functions, layout, UX pattern tags and UI element tags, so text results are already useful |
| Weakness | No Android; styles cover marketing pages only, not in-app UI; few Saudi or Arabic apps |
| Access | Paid subscription; MCP at `https://refero.design/mcp` |
| Companion skill | `refero-design` (install only with the person's explicit approval: `npx skills add https://github.com/referodesign/refero_skill --skill refero-design`) |

## Best for at Safqah

- Invest and reserve flow structure: amount, review, confirm, success (Acorns, Wise, Wealthfront are well covered).
- KYC and identity flows: Refero flows describe each step's goal and system response, which is ideal for mapping to `KYCStep` and `Stepper`.
- Web visual direction for safqah.co marketing pages (`refero_search_styles`).
- Back-office web screens: tables, filters, settings (`platform: "web"`).
- Expanding one good find into a set (`refero_get_similar_screens`).

## Agent tools

All tools accept `response_format: "md"` (default) or `"json"`. Use `json` when you will post-process results, `md` when you will read them.

### `mcp__refero__refero_search_screens`
Semantic search over single screens.

| Parameter | Type | Required | Notes |
|---|---|---|---|
| `query` | string | yes | What is literally on the screen: screen type, component, state, company, on-screen text. Minimum 2 characters |
| `platform` | `"ios"` or `"web"` | yes | Mobile app patterns use `ios` |
| `page` | number 1 to 30 | no | Later pages surface less obvious results |
| `response_format` | `"md"` or `"json"` | no | |

```json
{"query": "investment order confirmation with amount summary and confirm button", "platform": "ios"}
```

### `mcp__refero__refero_search_flows`
Search multi-step journeys. Same parameters as `refero_search_screens`.

```json
{"query": "fintech KYC onboarding with identity verification", "platform": "ios"}
```

### `mcp__refero__refero_get_flow`
Full detail of a flow: every screen with goal, action and system response, plus the user problem. Pass exactly one of:

| Parameter | Type | Notes |
|---|---|---|
| `flow_id` | number | From `refero_search_flows` |
| `flow_ids` | number[] | Batch, maximum 10 |

```json
{"flow_id": 6419}
```

### `mcp__refero__refero_get_screen`
Full metadata for known screens. Pass `screen_id` (UUID) or `screen_ids` (maximum 10).

```json
{"screen_ids": ["e93df1d8-5791-47c5-91ec-b3d65ca6747c", "2ffb15d4-b589-4310-81ad-be313716cd21"]}
```

### `mcp__refero__refero_get_screen_image`
Returns the image itself so you can look at it.

| Parameter | Type | Required | Notes |
|---|---|---|---|
| `screen_id` | string | yes | UUID |
| `image_size` | `"thumbnail"` or `"full"` | no | Default `thumbnail`; use `full` only to inspect fine detail |

```json
{"screen_id": "e93df1d8-5791-47c5-91ec-b3d65ca6747c", "image_size": "thumbnail"}
```

### `mcp__refero__refero_get_similar_screens`
Visually and functionally similar screens to one UUID.

| Parameter | Type | Required | Notes |
|---|---|---|---|
| `screen_id` | string | yes | UUID |
| `limit` | number 1 to 20 | no | Default 10 |

```json
{"screen_id": "2ffb15d4-b589-4310-81ad-be313716cd21", "limit": 8}
```

### `mcp__refero__refero_search_styles`
Semantic search over curated web styles (marketing and product pages). Returns UUID, title, source URL, preview image and a long description.

| Parameter | Type | Required |
|---|---|---|
| `query` | string | yes |
| `page` | number 1 to 30 | no |

```json
{"query": "premium fintech investing website with restrained typography and trust"}
```

### `mcp__refero__refero_get_style`
Full style reference: colors, type scale, spacing, radius, elevation, components, imagery, do and don't. Pass `style_id` or `style_ids` (keep batches to 3 or 4; each style is 10k to 15k characters).

```json
{"style_ids": ["b501d608-f10c-490c-8e88-a48a557603db", "59911817-9d14-445a-9f1b-617418001061"]}
```

### `mcp__refero__refero_search_apps` and `mcp__refero__refero_search_sites`
Find an iOS app or a website by name, domain or category, to learn its ID before scoped searches.

```json
{"query": "fintech apps"}
```
```json
{"query": "wise.com"}
```

## Example queries for Safqah

| Topic | Tool and platform | Query |
|---|---|---|
| Deal page | screens, ios | `investment opportunity detail page with target return, funding progress bar and invest button` |
| Invest flow | flows, ios | `buy investment with amount entry, review and confirmation` |
| Reserve flow | screens, ios | `reservation hold countdown timer before payment` |
| KYC | flows, ios | `fintech KYC onboarding with identity verification` |
| KYC document | screens, ios | `upload proof of address document with file list and progress` |
| Wallet and cash-out | flows, ios | `withdraw money to bank account with review and estimated arrival` |
| Portfolio | screens, ios | `investment portfolio overview with total value, returns and holdings list` |
| Payouts | screens, ios | `dividend payout history list with dates and amounts` |
| Goals | screens, ios | `savings goal progress with target amount and monthly contribution` |
| Empty states | screens, ios | `empty state no investments yet with call to action` |
| Notifications | screens, ios | `notification settings with channel toggles grouped by category` |
| Back-office tables | screens, web | `admin data table with filters, status badges and bulk actions` |
| Marketing style | styles | `premium fintech investing website with restrained typography and trust` |

## Example output and learnings (real run, 2026-10-15)

Query `investment order confirmation with amount summary and confirm button`, `platform: "ios"`, returned 1000 results, top 10 mostly Acorns, Wise, Copilot, Coinbase. Useful findings:

- Acorns `e93df1d8-...`: large amount, bank selector, then a review BottomSheet with details and a full-width invest button. Maps to `Input Amount` + `BottomSheet` with `Sheet Content / Summary` + `KeyValue` + `Button` (`Variant=primary`, `Size=lg`).
- Wise `2ffb15d4-...`: full "Review details" screen with Change links per section and one Confirm button. Maps to `Header` + `ActionList` of `KeyValue` rows + `Link` + `Button`.
- Acorns `e442af68-...`: success screen with estimated arrival date and Done. Maps to a success state built from `EmptyState` layout + `Illustrations` + `Button`.
- Acorns `45f17d8b-...`: cancel-pending confirmation dialog with No and Yes. Maps to `Dialog`; at Safqah the destructive action uses `Button` `Variant=destructive`.

Query `fintech KYC onboarding with identity verification` (flows, ios) returned Fuse (24 steps, with a retryable failure screen), Airbnb ID capture (6 steps: capture front, review, flip, capture back, review, confirm extracted name) and Airbnb selfie capture (4 steps). Learning: the strongest flows end with "confirm the extracted data" and have an explicit retry path; both belong in `KYCStep` and `KYCChecklist`.

Query `premium fintech investing website with restrained typography and trust` (styles) returned N26, Public, Titan, Monarch, Munro Partners. Learning: trust comes from one accent color used sparingly, hairline borders, generous space. At Safqah the one accent is `bg/brand/primary`; never take N26 teal or Monarch orange.

## Watch-outs

- Results are deterministic and broad (1000 hits). Page 1 is dominated by a few well-covered apps; use `page: 2` or `3` for diversity.
- Descriptions are machine-written. Open the image (`refero_get_screen_image`) before you claim a screen does something.
- No Android and almost no Arabic apps. Pair with `benchmarks.md` for RTL evidence.
- Styles are marketing pages only. Never use a style as the in-app look; Syntropy tokens are the look.
- Respect token roles in a style ("CTA-only color"), then swap the value for the matching Syntropy token, never the source hex.
- Do not average several styles into a bland middle; pick one direction and say what you borrowed.

## Cost and access

- Paid seat. Each search is one call; `refero_get_style` responses are large, so batch at most 4.
- A typical screen question costs 2 to 4 calls; a flow question 2 to 3 (`search_flows` then `get_flow`).

## Setup

| Client | How |
|---|---|
| Claude Code | `claude mcp add --transport http refero https://refero.design/mcp`, then sign in when prompted |
| Cursor | Settings, MCP, add server: `{"refero": {"url": "https://refero.design/mcp"}}` |
| Claude.ai | Settings, Connectors, add custom connector with URL `https://refero.design/mcp` |

Tool names appear as `mcp__refero__refero_*` in Claude Code.

## Sources
- Refero MCP tool schemas, loaded 2026-10-15
- Real queries run 2026-10-15 (screens, flows, styles) listed above
- https://refero.design/mcp
