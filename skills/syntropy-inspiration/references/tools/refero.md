# Refero playbook

Refero (refero.design) is a curated library of real product screens, multi-step flows and web visual styles, searchable by meaning through an MCP server. Open this when you need references with structured written metadata (UX patterns, UI elements, layout notes, per-step goals) that you can reason about before opening every image, or when you need a web visual direction.

## At a glance
| Item | Detail |
|---|---|
| Content | iOS app screens, web app and site screens, user flows with per-step goals, curated web styles with full token and layout write-ups |
| Strength | Every screen has a description, functions, layout, UX pattern tags and UI element tags |
| Weakness | No Android; styles cover marketing pages only, not in-app UI; very few Saudi or Arabic apps |
| Access | Paid subscription (person's own account) |
| MCP | `https://refero.design/mcp`; tools appear as `mcp__refero__refero_*` in Claude Code |
| Companion skill | `refero-design`. Offer it once; install only after the person explicitly approves: `npx skills add https://github.com/referodesign/refero_skill --skill refero-design` |

## Best for at Safqah
- Invest and reserve flow structure: amount, review, confirm, success (Acorns, Wise, Wealthfront are well covered).
- KYC and identity flows: each step's goal and system response map well to `KYCStep` and `Stepper`.
- Web visual direction for safqah.co marketing pages (`refero_search_styles`).
- Back-office web screens: tables, filters, settings (`platform: "web"`).
- Expanding one good find into a set (`refero_get_similar_screens`).

## Tools
All tools accept `response_format: "md"` (default, for reading) or `"json"` (for post-processing).

### `mcp__refero__refero_search_screens`
| Parameter | Type | Required | Notes |
|---|---|---|---|
| `query` | string, min 2 chars | yes | What is literally on the screen: type, component, state, company, on-screen text |
| `platform` | `"ios"` or `"web"` | yes | Mobile app patterns use `ios` |
| `page` | 1 to 30 | no | Page 2 or 3 surfaces less obvious, more diverse results |
| `response_format` | `"md"` or `"json"` | no | |

```json
{"query": "investment order confirmation with amount summary and confirm button", "platform": "ios"}
```

### `mcp__refero__refero_search_flows`
Same parameters as `refero_search_screens`.
```json
{"query": "fintech KYC onboarding with identity verification", "platform": "ios"}
```

### `mcp__refero__refero_get_flow`
Every screen of a flow with goal, action and system response, plus the user problem. Pass exactly one of `flow_id` (number) or `flow_ids` (number[], max 10).
```json
{"flow_id": 6419}
```

### `mcp__refero__refero_get_screen`
Full metadata for known screens: `screen_id` (UUID) or `screen_ids` (max 10).
```json
{"screen_ids": ["e93df1d8-5791-47c5-91ec-b3d65ca6747c", "2ffb15d4-b589-4310-81ad-be313716cd21"]}
```

### `mcp__refero__refero_get_screen_image`
| Parameter | Type | Required | Notes |
|---|---|---|---|
| `screen_id` | UUID | yes | |
| `image_size` | `"thumbnail"` or `"full"` | no | Default `thumbnail`; `full` only to inspect fine detail or to present |
```json
{"screen_id": "e93df1d8-5791-47c5-91ec-b3d65ca6747c", "image_size": "thumbnail"}
```

### `mcp__refero__refero_get_similar_screens`
| Parameter | Type | Required | Notes |
|---|---|---|---|
| `screen_id` | UUID | yes | |
| `limit` | 1 to 20 | no | Default 10 |
```json
{"screen_id": "2ffb15d4-b589-4310-81ad-be313716cd21", "limit": 8}
```

### `mcp__refero__refero_search_styles`
Curated web styles: UUID, title, source URL, preview image, long description. Parameters `query` (required), `page` (1 to 30).
```json
{"query": "premium fintech investing website with restrained typography and trust"}
```

### `mcp__refero__refero_get_style`
Full style reference: colors, type scale, spacing, radius, elevation, components, imagery, do and don't. Pass `style_id` or `style_ids`; keep batches to 3 or 4 (each style is 10k to 15k characters).
```json
{"style_ids": ["b501d608-f10c-490c-8e88-a48a557603db", "59911817-9d14-445a-9f1b-617418001061"]}
```

### `mcp__refero__refero_search_apps` and `mcp__refero__refero_search_sites`
Find an iOS app or a website by name, domain or category before scoped searches.
```json
{"query": "fintech apps"}
```
```json
{"query": "wise.com"}
```

## Example queries for Safqah
| Topic | Tool, platform | Query |
|---|---|---|
| Deal page | screens, ios | `investment opportunity detail page with target return, funding progress bar and invest button` |
| Invest flow | flows, ios | `buy investment with amount entry, review and confirmation` |
| Reserve | screens, ios | `reservation hold countdown timer before payment` |
| KYC | flows, ios | `fintech KYC onboarding with identity verification` |
| KYC document | screens, ios | `upload proof of address document with file list and progress` |
| Wallet and cash-out | flows, ios | `withdraw money to bank account with review and estimated arrival` |
| Portfolio | screens, ios | `investment portfolio overview with total value, returns and holdings list` |
| Payouts | screens, ios | `dividend payout history list with dates and amounts` |
| Goals | screens, ios | `savings goal progress with target amount and monthly contribution` |
| Empty states | screens, ios | `empty state no investments yet with call to action` |
| Notifications | screens, ios | `notification settings with channel toggles grouped by category` |
| Disclosure | screens, ios | `investment risk disclosure before purchase` |
| Back-office tables | screens, web | `admin data table with filters, status badges and bulk actions` |
| Marketing style | styles | `premium fintech investing website with restrained typography and trust` |

## Real runs and learnings (2026-10-15)
Screens, `investment order confirmation with amount summary and confirm button`, ios: about 1000 hits, top 10 mostly Acorns, Wise, Copilot, Coinbase.
- Acorns `e93df1d8-...`: large amount, bank selector, review BottomSheet, full-width invest button. Maps to `Input Amount` + `BottomSheet` with `Sheet Content / Summary` + `KeyValue` + `Button` `Variant=primary` `Size=lg`.
- Wise `2ffb15d4-...`: full "Review details" screen with Change links per section and one Confirm. Maps to `Header` + `ActionList` of `KeyValue` rows + `Link` + `Button`.
- Acorns `e442af68-...`: success with estimated arrival date and Done. Maps to `EmptyState` layout + `Illustrations` + `Button`.
- Acorns `45f17d8b-...`: cancel-pending dialog. Maps to `Dialog` with `Button` `Variant=destructive`.

Flows, `fintech KYC onboarding with identity verification`, ios: Fuse (24 steps, retryable failure screen), Airbnb ID capture (6 steps: front, review, flip, back, review, confirm extracted name), Airbnb selfie (4 steps). Learning: the strongest flows end with "confirm the extracted data" and have an explicit retry path; both belong in `KYCStep` and `KYCChecklist`.

Styles, `premium fintech investing website with restrained typography and trust`: N26, Public, Titan, Monarch, Munro Partners. Learning: trust comes from one accent used sparingly, hairline borders and generous space. At Safqah the one accent is `bg/brand/primary`; never take N26 teal or Monarch orange.

## Watch-outs
- Page 1 is dominated by a few well-covered apps; use `page: 2` or `3` for diversity.
- Descriptions are machine-written; open the image before claiming behaviour.
- No Android, almost no Arabic apps; pair with Saudi and GCC benchmarks for RTL evidence.
- Styles are marketing pages only; never use a style as the in-app look. Keep its token roles ("CTA-only color"), swap values for Syntropy tokens.
- Do not average several styles into a bland middle; pick one direction and name what you borrowed.

## Cost
Paid seat. A screen question costs 2 to 4 calls; a flow question 2 to 3 (`search_flows` then `get_flow`); batch `get_style` at most 4.

## Sources
- Refero MCP tool schemas and real queries, 2026-10-15
- https://refero.design/mcp
