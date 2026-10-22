# Back-office tables

Data tables for Safqah's internal back-office on web: finding, filtering, sorting, selecting and acting on many records (investors, deals, transactions, payouts, AML cases), in LTR and RTL. Read this before building any back-office list, queue or report table.

## Job of the screen
Let an operator get from "thousands of records" to "the right few" quickly, understand each row at a glance, act on one or many safely, and always know how many results there are and where they are in them.

## When to use
- Back-office queues and lists (web, desktop breakpoint, 1200px container).
- Not on the mobile app: on phones use the mobile table style or rows-as-cards (`ListItem`, `Payouts cell`), never a desktop table.
- For a handful of facts about one record use `KeyValue` in a detail panel.

## Flow steps
1. **Land** on the list: default sort (newest first or most urgent), default filters stated in chips.
2. **Search / filter**: toolbar search, filter menu, date range; active filters become removable chips; result count updates.
3. **Sort** by a column header.
4. **Open a row**: detail in a `Drawer` (keeps list context) or a detail page with `Breadcrumb`.
5. **Select rows**: toolbar switches to selection mode with bulk actions and the selected count.
6. **Bulk action**: confirm with a `Dialog` when destructive or financial; show progress and result.
7. **Paginate**: page size and range readout in the table footer.

## Layout recipe (top to bottom; RTL shown, LTR mirrors)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Shell | `NavigationRail` `Variant=Standard` `Mode=Expanded` `Direction=RTL` (or `AppSidebar (shadcn-style)`), with `NavRailItem` `State=active` for the current section | Sidebar on the start edge (right in RTL) |
| 2 | Page header | `Breadcrumb` `Type=full` + page title heading/24/semibold + one primary `Button` `Size=md` (for example «إضافة صفقة») at the end edge | Padding `space/2xl` |
| 3 | Toolbar | `Table / Toolbar` `Mode=Default` `Direction=RTL`: `Search Input` `Size=md`, filter trigger opening `Filter menu`, `Date Range Field` `Size=md`, `Sort menu` (optional), result count body/13 `text/muted` («1,248 نتيجة») | Gap `space/md` |
| 4 | Active filters | `Tag Group` `Layout=wrap` of `Tag Removable` `Tone=neutral` `Size=sm` + `Link` «مسح الكل» | Only when filters are active |
| 5 | Header row | `Table / HeaderCell` per column `Density=Default` `Direction=RTL`, `Sort=None/Asc/Desc` on sortable columns (numeric default `Desc`), first column `Has select-all=true` | Exactly one sorted column shows the arrow |
| 6 | Rows | `Table / Cell` per column with `Type` by data: `Text` (names, IDs), `Numeric` (amounts, end-aligned, tabular), `Avatar` (person), `Tag`, `Status` (use `IssuanceStatusBadge (Internal)` / `(Developer)` for lifecycle), `Select` (row checkbox), `Trend`, `Progress` (funding) | Zebra or plain via table surface: White · Subtle · Brown (caution, schedules) · Elevated |
| 7 | Row actions | `Table / ActionCell` `Has inline actions=false` with one `MenuTrigger` `Glyph=kebab` opening `Menu` of `MenuItem` (destructive items `State=destructive`, last) | One overflow menu per row; at most one inline action |
| 8 | Footer | `Pagination` `Type=table` `Direction=RTL` with page-size `Select` (10 · 25 · 50 · 100) and range «1-25 من 1,248» | Western digits |
| 9 | Selection mode | `Table / Toolbar` `Mode=Selection`: «تم تحديد 12» + bulk `Button`s (`Variant=secondary` `Size=sm`; destructive as `Variant=destructive`) + «إلغاء التحديد» | Replaces the default toolbar |
| 10 | Detail | `Drawer` `Side=left` in RTL (end edge) `showHeader` `showFooter`, `KeyValue` rows, `DealTimeline` / `TimelineRow`, actions in the footer | Or a full page with `Breadcrumb` |

Choose `Density=Compact` for dense operational queues; keep `Default` for review screens where reading matters. Two sets are named `Table / ActionCell` in the manifest (3320:262 and 3351:197): use 3320:262 and flag the duplicate.

Numbers: Western digits everywhere, including `Pagination` (the pagination guide mentions Arabic-Indic numerals for RTL; Safqah's numbers rule overrides it). Amounts end-aligned with currency after the amount, two decimals.

## Required states

| State | Treatment |
|---|---|
| Loading | Keep header and toolbar; 10 rows of `SkeletonLine` per cell (widths vary by column type: `Half` text, `Quarter` numeric). Sorting/paging: keep old rows dimmed with a `ProgressBar_Indeterminate` `Size=sm` above the table, not a full skeleton |
| Empty (no data yet) | `EmptyState` `Tone=default` `Size=Compact` inside the table body («لا توجد سجلات بعد») + primary action if creation is possible |
| Empty (filters) | `EmptyState` `Tone=search` `Size=Compact` «لا توجد سجلات تطابق الفلاتر» + «مسح الفلاتر» |
| Error | `EmptyState` `Tone=error` in the body + retry; filters and toolbar stay. Bulk action partial failure: `Alert` `Tone=warning` «تمت معالجة 10 من 12» with a link to the failed rows |
| Success | Single action: `Toast` `Tone=success` `Size=Small` naming the record. Bulk: `Toast` with the count; rows update in place |
| Disabled | Actions the operator lacks permission for are hidden from the menu, not shown disabled without reason; locked records show `MenuItem` `State=disabled` with a `Tooltip` reason |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Count | «1,248 نتيجة» | "1,248 results" |
| Range | «1-25 من 1,248» | "1-25 of 1,248" |
| Selected | «تم تحديد 12» | "12 selected" |
| Clear | «مسح الكل» / «إلغاء التحديد» | "Clear all" / "Clear selection" |
| Filter empty | «لا توجد سجلات تطابق الفلاتر» | "No records match these filters" |

Column headers: nouns, 1-2 words, units in the header only when the cell cannot carry them.

## Compliance notes
- Personal data: mask national ID and IBAN by default (show last 4), reveal on explicit action with audit logging (PDPL). Confirm with Compliance.
- Financial or irreversible bulk actions (approve payouts, reject KYC, freeze accounts) need a `Dialog` that states the count and amount and a reason field where policy requires; log the operator.
- AML / risk statuses are internal only (`IssuanceStatusBadge (Internal)`); never reuse internal wording in investor-facing screens.
- Exports respect the same masking and permission rules.

## Accessibility notes
- Use real table semantics (header cells, `aria-sort` on the sorted column, row checkboxes labelled with the row name).
- Back-office targets are at least 24x24 (WCAG 2.5.8); compact density still meets it with spacing.
- Keyboard: tab into the table, arrow keys within, Enter opens the row, Escape closes the drawer and returns focus to the row.
- Status cells pair colour with the label; selected rows have more than a tint (checkbox state).
- In RTL the reading order, sort arrows and pagination arrows mirror; numbers do not.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Stripe | Filter chips, result counts and row detail drawers on payment tables |
| Mercury | Clean financial tables with end-aligned amounts and bulk actions |
| Ramp | Approval queues with clear selection mode |
| Carbon / Salesforce Lightning | Data table, toolbar and pagination specs |

## Anti-patterns
- A desktop table squeezed onto a phone.
- Several inline icon buttons per row instead of one overflow menu.
- Pagination without a total or page size; current page as a link.
- Amounts start-aligned or with mixed decimals; Arabic-Indic digits in RTL.
- Bulk delete with no confirmation or count.
- Filters applied but not visible as chips.

## Sources
- `knowledge/components/table.md` (Table / Cell 3316:115, HeaderCell 3317:127, ActionCell 3320:262 and 3351:197, Toolbar 3322:410), `pagination.md` (2736:120), `menu.md` (Filter menu 3970:2937, Sort menu 3969:2795, MenuTrigger 3955:1905), `navigation-rail-sidebar.md` (2855:175, 2956:4525), `breadcrumb.md`, `drawer.md` (2706:385), `search.md`, `tag.md`, `date-picker-time-picker.md`, `status-issuance-badge.md`, `progress-bar.md`.
- Touch targets: `knowledge/ux/accessibility/touch-targets.md` (web 24x24).
- Numbers: `knowledge/content/numbers-currency.md`.
