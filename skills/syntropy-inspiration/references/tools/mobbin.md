# Mobbin playbook

Mobbin (mobbin.com) is the largest library of real iOS, Android and web screens and flows. Its MCP server returns screens and flows with inline images, so you see the actual UI. Open this when you need many real versions of one screen or one journey, a specific app by name, or web landing sections.

## At a glance
| Item | Detail |
|---|---|
| Content | iOS and web app screens, multi-step flows, website sections (hero, pricing, footer) |
| Strength | Breadth (banking and investing apps such as Lloyds, Revolut, Wealthfront, Cash App, Acorns), inline images, canonical `mobbin_url` per screen |
| Weakness | Little structured text, so you must read the images; few Saudi apps |
| Access | Paid subscription (person's own account) |
| MCP | `https://mobbin.com/mcp`; tools appear as `mcp__mobbin__*` |
| Browser fallback | Finance category `https://mobbin.com/explore/mobile/app-categories/finance` (needs the person's login) |

## Best for at Safqah
- Many versions of one mobile screen fast: amount entry, review, success, KYC capture, portfolio home.
- Withdraw and transfer flows of banks and brokers (wallet and cash-out).
- Web landing sections for safqah.co (`search_sections`).
- One named app ("Revolut withdraw money screen").

## Shared optional parameters (all three tools)
| Parameter | Values | Notes |
|---|---|---|
| `output_destination` | `code`, `design_tool`, `doc`, `reference_library`, `chat`, `other` | What you will do with results; keep it the same across one task. Figma build is `design_tool`; research write-up is `doc`; `reference_library` only when the person asks to save to a collection |
| `output_tool` | string | Product the results go into next, e.g. `Figma`, `Notion` |
| `task_intent` | string | One English sentence about the task, no personal data; identical across calls |
| `image_format` | `webp` (default) or `jpg` | `jpg` if your client cannot show webp |

## Tools

### `mcp__mobbin__search_screens`
| Parameter | Type | Required | Notes |
|---|---|---|---|
| `query` | string, max 500 | yes | Describe one screen: elements and how they relate. Name an app to filter to it. No platform words, no negations, no style adjectives |
| `platform` | `ios` or `web` | yes | |
| `limit` | 1 to 30 | no | Default 20; use 4 to 8 to save context |
| `mode` | `deep` (default) or `standard` | no | `deep` = AI relevance scoring, slower, for nuanced queries; `standard` = fast sweep |
| `exclude_screen_ids` | uuid[] | no | Skip already-seen screens when paging |

```json
{"query": "KYC identity document upload screen with photo capture instructions", "platform": "ios", "limit": 6, "mode": "standard", "output_destination": "doc", "task_intent": "Research a KYC document capture step for a Saudi investment app."}
```

### `mcp__mobbin__search_flows`
| Parameter | Type | Required | Notes |
|---|---|---|---|
| `query` | string, max 500 | yes | One journey and its steps |
| `platform` | `ios` or `web` | yes | |
| `limit` | 1 to 10 | no | Default 5; 3 is usually enough (each flow returns several images) |
| `page` | 1 to 20 | no | |

```json
{"query": "withdraw money from investment account to bank", "platform": "ios", "limit": 3, "output_destination": "doc", "task_intent": "Research cash-out flows for a Saudi investment app."}
```

### `mcp__mobbin__search_sections`
Website sections only (no `platform`). Parameters `query` (required, max 500), `limit` (1 to 30, default 20), `page`.
```json
{"query": "fintech hero section with app screenshot and download buttons", "limit": 8, "output_destination": "design_tool", "output_tool": "Figma", "task_intent": "Redesign the safqah.co landing hero."}
```

## Result handling (required by Mobbin)
- Look at the images; never describe a screen from metadata alone.
- Cite every screen you mention as a markdown link to its `mobbin_url`.
- Inline images are low-res previews for you. To place in Figma, Notion or slides, download from `image_url`; it expires after 30 days, so download, never link it as the citation.
- If a result contains `ai_usage_notice`, show its `text` to the person word for word as its own block.

## Example queries for Safqah
| Topic | Tool | Query |
|---|---|---|
| Deal page | screens, ios | `investment product detail with expected return, minimum amount and invest button` |
| Invest flow | flows, ios | `buying an investment with amount keypad, review and confirmation` |
| Reserve | screens, ios | `booking hold with countdown timer and complete payment button` |
| KYC | screens, ios | `KYC identity document upload screen with photo capture instructions` |
| KYC selfie | flows, ios | `identity verification with ID scan and selfie liveness check` |
| Wallet and cash-out | flows, ios | `withdraw money from investment account to bank` |
| Portfolio | screens, ios | `investment portfolio dashboard with total balance, returns and holdings list` |
| Payouts | screens, ios | `transaction history list grouped by month with incoming payments` |
| Goals | screens, ios | `savings goal detail with progress ring and target date` |
| Empty states | screens, ios | `empty portfolio screen prompting first investment` |
| Notifications | screens, ios | `notification inbox with unread markers and filter tabs` |
| Errors | screens, ios | `amount field error state with inline validation message` |
| Back-office tables | screens, web | `admin users table with status badges, filters and row actions` |
| Landing | sections | `real estate investment platform hero with stats` |
| Named app | screens, ios | `Revolut withdraw money screen` |

## Real runs and learnings (2026-10-15)
Screens, `KYC identity document upload screen with photo capture instructions` (ios, 6, standard): LinkedIn, Fly Delta, Lloyds, Cash App, CLEAR, Noom.
- Lloyds ([screen](https://mobbin.com/screens/8c68fd6e-e333-4626-9899-c996c2d1e0f8)): icon, title "Take a photo of your ID", 2 tips, primary "Open camera", secondary link "I don't have my ID with me". Pattern: an exit for users without the document.
- Cash App ([screen](https://mobbin.com/screens/3a43e2de-8bd1-448b-b547-d80ebea051c0)): live frame with "All photos are encrypted".
- Fly Delta ([screen](https://mobbin.com/screens/863dac0b-3b71-44c2-9eb7-0968c4d9f0c3)): camera view with a "Scanning Tips" sheet.
- Syntropy: `Header` + `Illustrations` + `List` (tips) + `Button` `Variant=primary` + `Link`; tips sheet = `BottomSheet` with `Sheet Content / List`.

Flows, `withdraw money from investment account to bank` (ios, 3): Acorns (5 screens), Wealthfront (6), Revolut (5).
- All three: amount first, destination bank on the same screen, review, then processing with an estimated arrival date.
- Wealthfront adds "Withdraw entire balance" and an `INITIATED` chip on success.
- Syntropy: `Input Amount` + `WalletChip` or `ListItem` (bank row) + `Link` + `Button`; success with `StatusPill` and `KeyValue`.

Screens, `investment portfolio dashboard with total balance, returns and holdings list` (ios, 4): Copilot, Public, Perplexity, Lloyds.
- Lloyds: donut with total in the center, grouped lists below. Maps to `Chart / Donut · Mobile` + `ActionList`.
- Copilot: total, change, range tabs (1W, 1M, YTD). Maps to `PortfolioHeader` + `SegmentedControl_5` + `Chart / Area · Mobile`.

## Watch-outs
- `deep` is slower; `standard` for broad sweeps, `deep` for nuanced single queries.
- Images fill context fast; keep `limit` small (4 to 8 screens, 3 flows).
- Screens may show blurred personal data; never reproduce it.
- Western apps show currency before the amount and LTR layout; always flip and apply the Safqah number rule (`1,250.00 ر.س`).

## Cost
Paid seat. One call per search; images cost context, not money. Screen question: 2 to 3 calls. Flow question: 1 to 2 calls.

## Sources
- Mobbin MCP tool schemas and real queries, 2026-10-15
- https://mobbin.com/mcp
