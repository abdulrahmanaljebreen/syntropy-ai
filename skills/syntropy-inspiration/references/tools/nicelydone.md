# Nicelydone playbook

Nicelydone (nicelydone.club) is a library of SaaS and web-app screens and flows: dashboards, tables, settings, permissions, B2B onboarding. Open this for Safqah's back-office and web app, where density, filters and admin workflows matter more than mobile polish.

## At a glance
| Item | Detail |
|---|---|
| Content | Web-app pages and recorded flows from SaaS products, tagged by page type and component |
| Strength | Admin patterns: tables, bulk actions, filters, detail drawers, audit logs, roles and permissions, settings |
| Weakness | Web only; no consumer mobile; English LTR only |
| Access | Paid (person's own account) |
| MCP | `https://nicelydone.club/mcp` |
| Tool names | Not verified (not connected when written, 2026-10-15). Discover at runtime |

## Discover the tools first
1. Claude Code: `ToolSearch` query `+nicelydone`. Claude.ai: the connector's tool list.
2. Read each tool's description; note names and required parameters.
3. Never call a tool you have not loaded.

Call shape once discovered (replace with the real tool name):
```json
{"query": "admin table with filters, status badges and bulk actions"}
```

## Best for at Safqah
- Back-office tables: investors, deals, transactions, payouts, AML alerts (`Table / Cell`, `Table / HeaderCell`, `Table / ActionCell`, `Table / Toolbar`, `Pagination`).
- Review and approval queues: KYC review, banner approval, payout batches.
- One-record detail views: investor profile, deal record, as `Drawer` or a full page with `SegmentedTabs`.
- Filters, saved views, search: `Filter menu`, `Sort menu`, `Search Input`, `Command palette`.
- Settings and roles: `ActionList`, `Switch`, `Select`.
- Empty and loading data views: `EmptyState`, `SkeletonLine`, `SkeletonBlock`.

## Example queries for Safqah
| Topic | Query |
|---|---|
| Investors table | `customer list table with status, search and row actions` |
| Transactions | `payments table with amount column, status pills and date filter` |
| Payout batches | `batch payout review with approve and reject actions` |
| KYC review queue | `verification review queue with document preview side panel` |
| AML alerts | `risk alerts list with severity and assignee` |
| Investor profile | `customer profile page with tabs and sticky header` |
| Audit log | `activity log with actor, action and timestamp` |
| Roles | `team roles and permissions matrix settings` |
| Banners | `announcement banner editor with live preview and audience targeting` |
| Segment builder | `audience segment builder with AND OR conditions` |
| Dashboard | `operations dashboard with KPI cards and charts` |
| Empty data | `empty table state with create first item button` |

## Translate findings
- Table chrome stays Syntropy: `Table / Toolbar` on top, `Table / HeaderCell` with sort, `Table / Cell` types, `Pagination` below.
- Status always via `StatusPill` (or `IssuanceStatusBadge (Internal)`), Syntropy tones; warnings use the warning tone, red only for critical.
- Back-office is often Arabic too: mirror column order; keep numbers and IBANs LTR inside cells.
- Copy minimal: column labels and at most one hint, no explanatory paragraphs.
- Navigation: `NavigationRail` or `AppSidebar (shadcn-style)`, never the source product's sidebar brand or color.

## Watch-outs
- SaaS products use playful empty states and illustrations; the Safqah back-office is calm and dense.
- Many SaaS tables hide row actions behind hover; keep a visible `Table / ActionCell` for accessibility.

## Fallback when not connected
In order: Refero `refero_search_screens` with `platform: "web"`, Mobbin `search_screens` with `platform: "web"`, then SaaSFrame in the browser (`browser-only.md`). Stripe, Mercury and Ramp public pages help for finance operations.

## Cost
Paid plan for the MCP. Budget 2 to 4 calls per question.

## Sources
- Team link list entries `nicelydone`, `saasframe` (checked 2026-10-15)
- Syntropy component index (table, menu and navigation components)
