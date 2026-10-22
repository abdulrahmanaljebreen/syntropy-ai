# Nicelydone

Nicelydone (nicelydone.club) is a library of SaaS and web-app screens and flows: dashboards, tables, settings, permissions, onboarding of B2B tools. Use it for Safqah's back-office and the web app, where density, filters and admin workflows matter more than mobile polish.

## What it is

| Item | Detail |
|---|---|
| Content | Web-app pages and recorded flows from SaaS products, tagged by page type and component |
| Strength | Admin patterns: tables, bulk actions, filters, detail drawers, audit logs, roles and permissions, settings |
| Weakness | Web only; no consumer mobile; English LTR only |
| Access | Paid; MCP at `https://nicelydone.club/mcp` (from `links.json`) |
| Status in this repo | The MCP was not connected in the session that wrote this guide (2026-10-15). Discover tool names at runtime |

## Best for at Safqah

- Back-office tables: investors, deals, transactions, payouts, AML alerts (Syntropy `Table / Cell`, `Table / HeaderCell`, `Table / ActionCell`, `Table / Toolbar`).
- Review and approval queues (KYC review, banner approval, payout batches).
- Detail panels for one record (investor profile, deal record) using `Drawer` or a full page with `SegmentedTabs`.
- Filters, saved views, search (`Filter menu`, `Sort menu`, `Search Input`, `Command palette`).
- Settings and roles pages (`ActionList`, `Switch`, `Select`).
- Empty and loading states for data views (`EmptyState`, `SkeletonLine`, `SkeletonBlock`).

## Agent tools

1. Load the schemas: `ToolSearch` query `nicelydone`.
2. Read each tool's description; note names and required parameters.
3. Never call a tool you have not loaded.

Example call shape once discovered (replace with the real tool name):
```json
{"query": "admin table with filters, status badges and bulk actions"}
```

When the MCP is unavailable, use the closest substitutes in this order: Refero `refero_search_screens` with `platform: "web"`, Mobbin `search_screens` with `platform: "web"`, then SaaSFrame in the browser (`browser-only.md`).

## Example queries for Safqah

| Topic | Query |
|---|---|
| Back-office investors table | `customer list table with status, search and row actions` |
| Transactions | `payments table with amount column, status pills and date filter` |
| Payout batches | `batch payout review with approve and reject actions` |
| KYC review queue | `verification review queue with document preview side panel` |
| AML alerts | `risk alerts list with severity and assignee` |
| Investor profile | `customer profile page with tabs and sticky header` |
| Audit log | `activity log with actor, action and timestamp` |
| Roles | `team roles and permissions matrix settings` |
| Banners and content | `announcement banner editor with live preview and audience targeting` |
| Segment builder | `audience segment builder with AND OR conditions` |
| Dashboards | `operations dashboard with KPI cards and charts` |
| Empty data | `empty table state with create first item button` |

## How to use findings at Safqah

- Keep table chrome Syntropy: `Table / Toolbar` on top, `Table / HeaderCell` with sort, `Table / Cell` types, `Pagination` below.
- Status always via `StatusPill` or `IssuanceStatusBadge (Internal)`, tones from Syntropy, warnings in warning yellow, red only for critical.
- Back-office is often Arabic too: mirror column order, keep numbers and IBANs LTR inside cells.
- Copy stays minimal: column labels and at most one hint, no explanatory paragraphs.

## Watch-outs

- SaaS products show playful empty states and illustrations; Safqah back-office is calm and dense.
- Many SaaS tables rely on hover-only actions; keep a visible row action (`Table / ActionCell`) for accessibility.
- Never copy a product's sidebar brand or color; use `NavigationRail` and `AppSidebar (shadcn-style)`.

## Cost and access

- Paid plan for MCP. Budget 2 to 4 calls per question.

## Setup

| Client | How |
|---|---|
| Claude Code | `claude mcp add --transport http nicelydone https://nicelydone.club/mcp` |
| Cursor | Settings, MCP: `{"nicelydone": {"url": "https://nicelydone.club/mcp"}}` |
| Claude.ai | Settings, Connectors, add custom connector `https://nicelydone.club/mcp` |

## Sources
- `knowledge/links/links.json` entries `nicelydone`, `saasframe` (checked 2026-10-15)
- `knowledge/components/index.json` (table, menu and navigation components)
