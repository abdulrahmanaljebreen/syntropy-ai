# Mobbin

Mobbin (mobbin.com) is the largest library of real iOS, Android and web screens and flows. Its MCP server returns screens and flows with inline images, so the agent sees the actual UI. Use it when you need to look at how many real apps solve one screen or one journey.

## What it is

| Item | Detail |
|---|---|
| Content | iOS and web app screens, multi-step flows, website sections (hero, pricing, footer) |
| Strength | Breadth (including banking apps such as Lloyds, Revolut, Wealthfront, Cash App), inline images, canonical `mobbin_url` per screen |
| Weakness | Little structured text; you must read the images. Few Saudi apps |
| Access | Paid subscription; MCP at `https://mobbin.com/mcp`. Web browsing of the finance category: `https://mobbin.com/explore/mobile/app-categories/finance` |

## Best for at Safqah

- Seeing many versions of one mobile screen fast: amount entry, review, success, KYC capture, portfolio home.
- Withdraw and transfer flows of banks and brokers (wallet and cash-out).
- Web landing sections for safqah.co (`search_sections`).
- Checking a specific app by name in the query ("Revolut withdraw money screen").

## Agent tools

Shared optional parameters on all three tools:

| Parameter | Values | Notes |
|---|---|---|
| `output_destination` | `code`, `design_tool`, `doc`, `reference_library`, `chat`, `other` | What you will do with results. Keep the same value across one task. A Figma build is `design_tool`; a research write-up is `doc` |
| `output_tool` | string | Product the results go into next, e.g. `Figma`, `Notion` |
| `task_intent` | string | One English sentence about the overall task, no personal data. Keep identical across calls |
| `image_format` | `webp` (default) or `jpg` | Use `jpg` if your client cannot show webp |

### `mcp__mobbin__search_screens`

| Parameter | Type | Required | Notes |
|---|---|---|---|
| `query` | string, max 500 | yes | Describe one screen: the elements and how they relate. Name an app to filter to it. No platform words, no negations, no style adjectives |
| `platform` | `ios` or `web` | yes | |
| `limit` | 1 to 30 | no | Default 20. Use 4 to 8 to save context |
| `mode` | `deep` (default) or `standard` | no | `deep` scores relevance with AI (slower, better for nuanced queries); `standard` is fast |
| `exclude_screen_ids` | uuid[] | no | Skip screens already seen when paging |

```json
{"query": "KYC identity document upload screen with photo capture instructions", "platform": "ios", "limit": 6, "mode": "standard", "output_destination": "design_tool", "output_tool": "Figma", "task_intent": "Design a KYC document capture step for a Saudi investment app."}
```

### `mcp__mobbin__search_flows`

| Parameter | Type | Required | Notes |
|---|---|---|---|
| `query` | string, max 500 | yes | Describe one journey and its steps |
| `platform` | `ios` or `web` | yes | |
| `limit` | 1 to 10 | no | Default 5; each flow returns several images, so 3 is often enough |
| `page` | 1 to 20 | no | |

```json
{"query": "withdraw money from investment account to bank", "platform": "ios", "limit": 3, "output_destination": "doc", "task_intent": "Research cash-out flows for a Saudi investment app."}
```

### `mcp__mobbin__search_sections`
Website sections only (no `platform`).

| Parameter | Type | Required | Notes |
|---|---|---|---|
| `query` | string, max 500 | yes | One section: "pricing page with plan comparison table", "hero section with signup form" |
| `limit` | 1 to 30 | no | Default 20 |
| `page` | integer | no | |

```json
{"query": "fintech hero section with app screenshot and download buttons", "limit": 8, "output_destination": "design_tool", "output_tool": "Figma", "task_intent": "Redesign the safqah.co landing hero."}
```

## Result handling (required by Mobbin)

- Look at the images; never describe a screen from metadata alone.
- Cite every screen you mention as a markdown link to its `mobbin_url`.
- Inline images are low-res previews for you. To save or paste into Figma, Notion or slides, download from `image_url` (it expires after 30 days, so download, do not link it).
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
| Back-office tables | screens, web | `admin users table with status badges, filters and row actions` |
| Landing | sections | `real estate investment platform hero with stats` |

## Example output and learnings (real runs, 2026-10-15)

`search_screens` "KYC identity document upload screen with photo capture instructions" (ios, 6, standard) returned LinkedIn, Fly Delta, Lloyds Mobile Banking, Cash App, CLEAR, Noom.
- Lloyds ([screen](https://mobbin.com/screens/8c68fd6e-e333-4626-9899-c996c2d1e0f8)): icon, title "Take a photo of your ID", 2 checklist tips, primary "Open camera", secondary link "I don't have my ID with me". Strong pattern: give an exit for users without the document.
- Cash App ([screen](https://mobbin.com/screens/3a43e2de-8bd1-448b-b547-d80ebea051c0)): live frame with "All photos are encrypted" reassurance line.
- Fly Delta ([screen](https://mobbin.com/screens/863dac0b-3b71-44c2-9eb7-0968c4d9f0c3)): camera view with a "Scanning Tips" BottomSheet.
- Syntropy mapping: `Header` + `Illustrations` + `List` (tips) + `Button` `Variant=primary` + `Link`; tips sheet = `BottomSheet` with `Sheet Content / List`.

`search_flows` "withdraw money from investment account to bank" (ios, 3) returned Acorns (5 screens), Wealthfront (6), Revolut (5).
- All three: amount first, destination bank visible on the same screen, review, then a processing state with an estimated arrival date.
- Wealthfront adds "Withdraw entire balance" as a one-tap link and an `INITIATED` status chip on the success screen.
- Syntropy mapping: `Input Amount` + `WalletChip` or `ListItem` (bank row) + `Link` + `Button`; success with `StatusPill` and `KeyValue`.

`search_screens` "investment portfolio dashboard with total balance, returns and holdings list" (ios, 4) returned Copilot, Public, Perplexity, Lloyds.
- Lloyds summary: donut ring with total in the center and grouped lists below. Maps to `Chart / Donut · Mobile` + `ActionList`.
- Copilot: total, change, range tabs (1W, 1M, YTD). Maps to `PortfolioHeader` + `SegmentedControl_5` + `Chart / Area · Mobile`.

## Watch-outs

- `deep` mode is slower; use `standard` for broad sweeps, `deep` for nuanced single queries.
- Image-heavy responses fill context quickly. Keep `limit` small (4 to 8 screens, 3 flows).
- Screens can show real personal data blurred; never reproduce it.
- Western apps show currency before the amount and LTR layout; always flip and apply the Safqah number rule.
- Keep `output_destination` and `task_intent` identical across one task.

## Cost and access

- Paid seat. One call per search; images count against your context, not money.
- Typical screen question: 2 to 3 calls. Typical flow question: 1 to 2 calls.

## Setup

| Client | How |
|---|---|
| Claude Code | `claude mcp add --transport http mobbin https://mobbin.com/mcp`, then sign in |
| Cursor | Settings, MCP: `{"mobbin": {"url": "https://mobbin.com/mcp"}}` |
| Claude.ai | Settings, Connectors, add custom connector `https://mobbin.com/mcp` (Mobbin renders an interactive gallery on hosts that support MCP Apps) |

## Sources
- Mobbin MCP tool schemas, loaded 2026-10-15
- Real queries run 2026-10-15, screens cited above
- https://mobbin.com/mcp
