# Charts and dashboards

How Safqah shows numbers over time, composition and comparison: picking a chart family, the semantic palette, time running left to right even in RTL, Western numerals, and text alternatives. Read this before adding any chart, KPI strip or dashboard to the app, web or back-office.

## Job of the screen
Make one quantitative point obvious and honest: the shape matches the data, the reader can get the exact number, and nothing decorative competes with it.

## When to use
- Portfolio allocation and returns over time (app), deal funding and repayment analytics (web), operational dashboards (back-office).
- Not for: a single number (use `Stat`), a lookup fact (use `KeyValue`), a categorical status (use `StatusPill` / `IssuanceStatusBadge (Investor)`).

## Picking the chart

| Question | Family (desktop / mobile) | Notes |
|---|---|---|
| How did a value change over time? | `Chart / Line` · `Chart / Line · Mobile` | Trend; one or a few series |
| How big is it over time, or cumulative? | `Chart / Area` · `Chart / Area · Mobile` | Magnitude, cumulative profit |
| Compare categories | `Chart / Bar` · `Chart / Bar · Mobile` | Sorted bars; horizontal for long Arabic labels |
| Composition per group | `Chart / Stacked` · `Chart / Stacked · Mobile` | Few segments |
| Share of a whole | `Chart / Donut` · `Chart / Donut · Mobile` | ≤6 slices; a labelled list beats the ring for exact values |
| Running total by contribution | `Chart / Waterfall` · `Chart / Waterfall · Mobile` | Invested → profit → fees → net |
| Gains and losses by period | `Chart / Bar-PnL` | Status colours for sign, plus the sign |
| Relationship between two measures | `Chart / Scatter` · `Chart / Scatter · Mobile` | Risk vs return (internal) |
| Two related series, one honest axis | `Chart / Combo` · `Chart / Combo · Mobile` | Never two y-axes that fake correlation |
| Headline numbers with tiny trends | `Chart / KPI strip` · `Chart / KPI list · Mobile`, `Chart / Sparkline` | Mobile becomes a single-column list |
| Minimal editorial chart | `Chart / Template-Tufte-Bar`, `Chart / Template-Tufte-Sparkline` | Reports and summaries |

## Flow steps
1. Region loads: `Chart / States` `State=loading`.
2. Data returns: render the family in `Chart / ChartContainer`; headline states the takeaway.
3. User touches or hovers a point: `State=Hover` with `Chart / ChartTooltip` `Mode=single`; a group: `State=Group hover` with `Mode=multi-series` `ShowTotal=true`.
4. User switches the range (1M / 6M / 1Y / All) with `SegmentedControl_4`.
5. No data or error: `Chart / States` `State=empty` / `State=error`.

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Title | `Section` `Size=Md` with the takeaway as the title («أرباحك المستلمة في 2026») and `Has description` for the unit/period | |
| 2 | Headline number (optional) | `Stat` `Size=md` (value + delta only if a real prior period exists) | Or `Chart / KPI strip` |
| 3 | Range control (optional) | `SegmentedControl_4` `Style=pill-thumb` `Size=sm` «شهر» · «6 أشهر» · «سنة» · «الكل» | Filters the same view |
| 4 | Chart | `Chart / ChartContainer` `Direction=RTL` `Density=comfortable` (app) / `compact` (back-office), `showGrid`, `showAxis`, `showLegend` only for 2+ series, `showTooltip`, `showDataLabels` for ≤6 bars; family inside (for example `Chart / Line · Mobile` `Direction=RTL` `State=Default`) | Container card `bg/elevated` (plot fill as built in `Chart / ChartContainer`); grid `border/subtle`; axis `border/default`; labels `text/muted` |
| 5 | Axes | `Chart / Axis` `Orientation=x` (time, always left to right) and `Orientation=y` (moves to the right side in RTL) `LabelBehavior=abbreviated` on mobile (three labels) | Western digits |
| 6 | Reference | `Chart / ReferenceLine` `Style=dashed` for a target or average, labelled | Only when it adds meaning |
| 7 | Legend | `Chart / Legend` `Orientation=horizontal` `Direction=RTL` under the chart | Direct labels preferred for ≤3 series |
| 8 | Text alternative | A `List` `Style=Description` (`List / DescriptionRow`) or a small table (`Table / Cell` rows) with the plotted values, collapsible under «عرض البيانات» (`AccordionItem`) | Required for every chart |

Dashboards (web, back-office): a 12-column grid inside the 1200px container; a top row of `Chart / KPI strip` or 3-4 `Stat` `Size=md`, on the `bg/base` content area, then charts in cards (`bg/elevated`, `border/subtle`, `radius/lg`, padding `space/lg`), gaps `space/2xl`. One question per card.

## Palette and encoding rules
1. Semantic tokens only; no primitives, no new variables. Series and sequential ramp = the brand-green steps from `bg/brand/lightest-hover` through `bg/brand/primary` to `bg/brand/darkest-pressed`.
   Why: one green-first visual language; tokens keep Light/Dark correct.
2. Status colours (`bg/success`, `bg/warning`, `bg/error`) only when the data is a status or sign (Bar-PnL, late vs on time), always paired with a sign or label.
   Why: V3, colour carries meaning; colour alone fails colour-blind users.
3. Time runs left to right in both languages; only the y-axis, legend and lists mirror in RTL.
   Why: `knowledge/ux/rtl.md`; a mirrored time axis inverts the trend.
4. Western digits, thousands comma, one decimal for percentages, currency after the amount; the Riyal symbol in tooltips and axes where the component renders it.
   Why: `numbers-currency.md`.
5. Bars start at zero; no 3D, no gradients on data marks, no dual axes that imply correlation.
   Why: honest shape (Tufte data-ink).
6. Projections are drawn differently from actuals (dashed line or lighter step) and labelled «متوقع».
   Why: expected is not earned.

## Required states

| State | Treatment |
|---|---|
| Loading | `Chart / States` `State=loading` at the final chart size (or `SkeletonBlock` `Radius=Large`) |
| Empty | `Chart / States` `State=empty` with one line («لا توجد بيانات لهذه الفترة»); no axes with nothing on them |
| Error | `Chart / States` `State=error` + retry link |
| Success | `State=Default`; hover/selection via `State=Hover` / `Group hover` |
| Disabled | Masked balance (portfolio): show shape without values, tooltips off |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Title as takeaway | «أرباحك المستلمة في 2026» | "Profit received in 2026" |
| Tooltip total | «الإجمالي» | "Total" |
| Projection label | «متوقع» | "Expected" |
| Empty | «لا توجد بيانات لهذه الفترة» | "No data for this period" |
| Data toggle | «عرض البيانات» | "Show data" |

Labels with a percentage start with «نسبة» («نسبة العائد»); SAR amounts do not.

## Compliance notes
- Past performance charts carry the required past-performance line where Compliance asks for it; projections are labelled expected, with the assumption. Confirm with Compliance.
- Do not chart other investors' data in the investor app; aggregate platform statistics must be accurate and dated.
- Back-office charts with personal data follow the same masking rules as tables.

## Accessibility notes
- Every chart has a text alternative: a one-sentence summary (accessible name) plus the data list or table.
- Tooltips are reachable by keyboard and touch (tap a point), not hover only; the selected point is announced.
- Series are distinguishable without colour (direct labels, markers or patterns); contrast of marks against the plot and card background (`bg/elevated`) at least 3:1 for meaningful lines and bars.
- Respect reduced motion: no animated draw-in.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Wealthsimple | Restrained single-series performance chart with range switch |
| Robinhood | Touch scrubbing with a value flag and time label |
| Stripe | Dashboard cards answering one question each |
| Groww | Mobile charts with few axis labels and clear tooltips |

## Anti-patterns
- Mirrored time axis in Arabic; Eastern Arabic digits on axes.
- A rainbow palette or primitive colours; red/green without signs.
- Donut with more than 6 slices; pie for things that are not parts of a whole.
- Dual y-axes, truncated bar baselines, 3D.
- A chart with no text alternative or no stated unit.
- A delta on a `Stat` with no prior period.

## Sources
- `knowledge/components/chart.md` (ChartContainer 4105:1306, States 4107:1314, Axis 4102:1138, Legend 4104:1068, ChartTooltip 4104:1128, families 4153-4165), `stat.md`, `segmented-control.md`, `list.md`, `accordion.md`.
- RTL and numbers: `knowledge/ux/rtl.md`, `knowledge/content/numbers-currency.md`.
- Principles: `knowledge/ux/principles.md` (V3 colour carries meaning).
