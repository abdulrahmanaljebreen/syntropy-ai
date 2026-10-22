# Layout in RTL

How to lay out Safqah screens with start and end instead of left and right, in Figma, Flutter and web: logical properties, icons with text, lists, tables, forms, bottom sheets and navigation. Open this when building or reviewing any screen structure.

## Rules
1. **Think in start and end.** Start = where reading begins (right in Arabic, left in English); end = where it finishes. Every padding, margin, alignment, position and corner is expressed as start or end.
   Why: logical values flip with the locale; physical values stay put and break one direction.
2. **Spacing tokens do not flip; only the side they apply to does.** `space/lg` is 16 in both directions.
   Why: one scale, logical application.
3. **Let the framework mirror rows**: a Flutter `Row` and a CSS flex row already lay children from the start; do not reverse children manually per locale.
   Why: manual reversal double-flips when direction changes.
4. **Use component direction variants** rather than rebuilding mirrored versions of components.
   Why: the variant already handles icon side, fill and order.
5. **Keep hardware-fixed regions where the hardware is** (status bar, camera cut-outs, system bars on foldables); mirror only the content.
   Why: hardware does not mirror.

## Logical property map
| Need | Flutter | CSS | Tailwind |
|---|---|---|---|
| Padding one side | `EdgeInsetsDirectional.only(start: 16)` | `padding-inline-start: 16px` | `ps-4` |
| Margin one side | `EdgeInsetsDirectional.only(end: 8)` (as margin) | `margin-inline-end: 8px` | `me-2` |
| Asymmetric all sides | `EdgeInsetsDirectional.fromSTEB(16, 8, 12, 8)` | `padding-block: 8px; padding-inline: 16px 12px` | `py-2 ps-4 pe-3` |
| Align to start | `AlignmentDirectional.centerStart` | `justify-content: flex-start` in a row | `justify-start` |
| Text alignment | `TextAlign.start` / `TextAlign.end` | `text-align: start` / `end` | `text-start` / `text-end` |
| Position in a corner | `PositionedDirectional(end: 0, top: 0)` | `inset-inline-end: 0; top: 0` | `end-0 top-0` |
| Corner radius on start side | `BorderRadiusDirectional.only(topStart: r, bottomStart: r)` | `border-start-start-radius`, `border-end-start-radius` | `rounded-s-lg` |
| Border on one side | `BorderDirectional(start: BorderSide(...))` | `border-inline-start` | `border-s` |
| Float | n/a | `float: inline-start` | `float-start` |
| Gaps between items | `Row` with `spacing` or `SizedBox` | `gap` | `gap-2` (avoid `space-x-*`) |
| Read the current direction | `Directionality.of(context)` | `:dir(rtl)` | `rtl:` variant |

Scan code with `scripts/check-rtl.mjs` to catch the physical versions.

## Icons with text
- A leading icon sits at the start (right in Arabic) of its label; a trailing icon at the end.
- `Button` with `Has icon leading` places the icon on the right in `Direction=rtl`.
- Directional glyphs swap (see `mirroring.md`); non-directional glyphs (riyal, check, clock) only change position, not shape.
- Currency follows the number in reading order: in Arabic text the suffix renders to the left of the digits.

## App bars and navigation
| Element | RTL placement |
|---|---|
| Back button | Start (right), arrow pointing right |
| Title | Start-aligned or centred per `AppBar` `Type`; Arabic title right-aligned when start-aligned |
| Trailing actions (share, more) | End (left) |
| Bottom `TabBar` | First tab on the right; order mirrors, icons do not change shape |
| `SegmentedTabs`, `SegmentedControl_3` | First segment on the right |
| `Drawer`, `NavigationRail` | Anchored at the start (right) |
| `Breadcrumb` | Starts at the right, separator ‹ |
| Push transition | New screen slides in from the left; back gesture swipes from the right edge |

## Lists and rows
- `ListItem`: leading slot (avatar, icon) at the right, label next to it, value and chevron at the left; chevron is `Icon / chevron-left`.
- Values (amounts, dates) sit at the end; they keep their internal LTR order.
- Swipe-to-reveal actions come from the end edge (left in RTL).
- Dividers inset from the start: `EdgeInsetsDirectional.only(start: ...)`.
- `ActionList` and `SelectionList`: selection indicator (radio, check) per the component's direction variant.

## Tables
- Column order mirrors: the first (identifier) column is on the right.
- Numbers keep their internal order and use tabular digits; align numeric columns consistently (the `Table / Cell` type decides).
- Sort and filter icons sit at the end of the header label.
- Horizontal scrolling starts at the right edge in RTL; the scrollbar sits per `ScrollContainer` (left in RTL).
- Back-office tables in Arabic follow the same rules; IBANs and IDs stay LTR inside cells.

## Forms
- Labels right-aligned above the field (`Form Field Label`); required asterisk at the end of the label.
- Input text starts at the right; LTR data fields (phone, IBAN, email) keep the value LTR while the field sits in the RTL flow (`Input Phone` keeps digits LTR).
- Helper and error text right-aligned under the field; the error icon follows the component's RTL variant.
- Field order follows reading: first field top-right; two-column forms place the first column on the right.
- Date range: «من» on the right, «إلى» on the left (`Date Range Field` `Direction=rtl`).
- Amount entry: use `Input Amount` with `Direction=rtl` as built; digits stay LTR.

## Bottom sheets, dialogs and modals
- `SheetHeader` title at the start (right), close button at the end (left).
- `SheetFooter` stacked buttons: primary on top; side-by-side buttons place the primary at the start (right) in RTL, mirroring the LTR order.
- Sheets slide up from the bottom in both directions (vertical motion does not mirror).

## Cards and media
- `CardDeal`, `NewsCard`, `Base card` (deal-page header card): use `Direction=RTL`; image position and text alignment follow the variant.
- Tags inside cards flow from the right (`Tag Group`).
- Overlay buttons on hero images (back, share, favourite) follow the app bar placement.

## Charts and data visualisation
- Use the `Chart / *` organism with `Direction=RTL`: y-axis on the right, legend from the right, tooltip anchored where there is room.
- Time axis runs left to right (oldest left, newest right) in Arabic too.
- Axis labels use Western digits; compact units in Arabic words («30 مليون»).

## Responsive and multi-column
- Multi-column layouts reverse column order (primary column at the start, right).
- Split views (list and detail): list at the start (right), detail at the end.
- Breakpoint grids do not change with direction; only the order of placement does.

## Sources
- Syntropy layout foundations (RTL implications, logical properties, foldable bar rules); RTL rules R1.
- Component guides: `app-bar.md`, `tab-bar.md`, `list-item.md`, `table.md`, `form-field.md`, `input.md`, `date-picker-time-picker.md`, `bottom-sheet.md`, `chart.md`, `scroll-container.md`, `breadcrumb.md`.
- `references/data/links.json` category `arabic-rtl`: RTL Styling (CSS logical properties), Material 3 bidirectionality, Apple HIG right to left.
