# Payouts and distribution schedule

Every distribution an investor receives or expects: the payouts list grouped by year, per-deal distribution schedules, and the expected payout window at maturity. Read this before building the payouts list, a deal's «التوزيعات» section, or any screen that shows a payout date.

## Job of the screen
Tell the investor exactly how much comes back, from which deal, of which kind (periodic profit or capital), when, and what state it is in, with numbers that add up.

## When to use
- Payouts list from the portfolio header button.
- Distribution schedule on the deal page and inside the calculator.
- Wallet activity for received payouts.
- Not for: lifecycle of a deal (use `DealTimeline`, `deal-page.md`).

## The payout window rule
- Expected payout date = maturity date + 15 days, written as one approximate date with a tilde, never a range: «متوقع ~7 يناير 2027» / "Expected ~7 January 2027".
- Lateness counts from the end of the window: maturity + 16 days is day 1 late. The window never extends.
- Financial dates are Gregorian (syntropy-rtl-arabic, rule R5).

## Flow steps
1. **Open payouts list**: tabs for upcoming, received, all; grouped by year with a running total.
2. **Scan states** (Upcoming, Done, Early paid, Late, Defaulted, Partial).
3. **Expand a partial group** to see sub-payouts.
4. **Open a row** to the investment detail.
5. **On a deal page**: collapsed schedule summary («4 توزيعات · التفاصيل»), expand to the list with the final capital row.
6. **At maturity**: the final row shows the window date; when paid, the payout moment offers the reinvest or keep choice (`wallet-and-cash-out.md`).

## Layout recipe: payouts list (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` «جدول التوزيعات» | |
| 2 | Filter | `SegmentedControl_3` `Style=pill-thumb` `Size=md`: «القادمة» · «المستلمة» · «الكل» | Choice control |
| 3 | Summary (optional) | 2 `Stat` `Size=sm` `Layout=horizontal`: «المستلم» and «المتوقع» totals | `HasDelta=false` |
| 4 | Year group | `Section` `Size=Sm` title «2026» with the running total in `Has action` slot styled as value (or a `KeyValue` row) | Totals equal the sum of rows |
| 5 | Rows | `Payouts cell` `Direction=rtl` with `Property 1=` state; `Show Subtitle=true`; `Show alert=true` only for `Disabled Early paid` and partial groups that need an explanation. Rows separated by `Divider` `Tone=subtle` inside one container | One grouped list, never a card per row. Container `bg/elevated`, `radius/lg` |
| 6 | Bottom | nothing; no CTA on this screen | |

`Payouts cell` states and when to use them:

| `Property 1` | Use when | Copy suffix |
|---|---|---|
| `Upcoming` | Scheduled, not yet paid | «متوقع ~7 يناير 2027» |
| `Done - Payout` | Periodic profit received | «توزيعات دورية • تم الاستلام» |
| `Done - Captial` | Capital returned (value spelled as in the set) | «رأس المال • تم الاستلام» |
| `Early paid` | Paid ahead of schedule (both dates shown) | «سداد مبكر» |
| `Disabled Early paid` | Scheduled payout skipped because the deal was repaid early; `Show alert=true` explains | «تم التخطي • اكتمل الاستثمار مبكراً» |
| `Late` | Past the window end | «متأخر 5 أيام» (warning, not red) |
| `Defaulted` | In default | «متعثرة» (the only red state) |
| `Partially repaid` / `Partially repaid closed` | Instalment group, open or collapsed | «1 من 3 دفعات» |
| `Partial principal` | Capital repaid in parts | «سداد جزئي لرأس المال» |

## Layout recipe: distribution schedule on the deal page

| Slot | Component + key props | Notes |
|---|---|---|
| Collapsed | `Distribution-schedule` `Property 1=Less-list` (summary line «4 توزيعات · التفاصيل») | Count must equal the rows in the full list |
| Expanded | `Distribution-schedule` `Property 1=Full list`, or `Calculator / Distributions accordion` `State=Open` with `Calculator / Installment row` `Type=Profit` rows and one `Type=Final` row (capital + last profit) | Final row date = maturity + 15 days |
| No periodic payouts | `Distribution-schedule` `Property 1=No-Schedule` with «توزيع الأرباح: نهاية المدة» | |
| Timeline form (target design) | `TimelineRow` `HasAmount=true` `HasDate=true` per payout with `TimelineNode` `State=completed/active/upcoming`; capital as the last node | Expected vs confirmed dates distinguished in text |

## Required states

| State | Treatment |
|---|---|
| Loading | 2 year-header skeletons (`SkeletonLine` `Width=Quarter`) and 5 row skeletons (two lines on each side) |
| Empty | No investments: `EmptyState` `Tone=default` `Size=Default` «لا توجد توزيعات بعد» + «تصفح الصفقات». Received tab empty: `EmptyState` `Size=Compact` «ستظهر التوزيعات المستلمة هنا» |
| Error | `EmptyState` `Tone=error` + retry; deal-page schedule failure: `Alert` `Tone=warning` `Style=Plain` «تعذر تحميل جدول التوزيعات» inside the region |
| Success | Received payout: row moves to `Done - Payout`; push notification names amount and deal |
| Disabled | `Disabled Early paid` row (muted, struck) with its `Alert` |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Title | «جدول التوزيعات» | "Payouts schedule" |
| Expected date | «متوقع ~7 يناير 2027» | "Expected ~7 January 2027" |
| Periodic | «توزيعات دورية» | "Periodic distribution" |
| Capital | «رأس المال» | "Capital" |
| Late | «السداد متأخر. نتابع مع المطور.» | "Payment is late. We're following up with the developer." |
| Defaulted | «الصفقة متعثرة. بدأت إجراءات التحصيل.» | "This deal has defaulted. Recovery has started." |

## Compliance notes
- Upcoming amounts are expected, not guaranteed; label with «متوقع». Confirm with Compliance.
- Schedule maths must reconcile: the label count equals the rows, the sum of profit rows equals the stated profit, net vs gross is labelled, no past dates shown as upcoming. A schedule that does not add up is a disclosure error.
- Late and defaulted wording states facts and the action taken; no reassurance that recovery will succeed.

## Accessibility notes
- Each row reads amount, deal, type and state in one phrase; the state icon is redundant with the text.
- Partial groups expose expanded/collapsed state; the chevron mirrors in RTL.
- Struck-through `Disabled Early paid` text is also explained in words (the alert), not by the strike alone.

## Benchmarks
| App (benchmarks, see syntropy-inspiration) | What to learn |
|---|---|
| Fundrise | Distribution history grouped by period with totals |
| Lendo / Raqamyah (Saudi debt crowdfunding) | Arabic repayment schedules with late states |
| Arrived | Expected vs paid dividends clearly separated |
| Mercury | Clean grouped transaction lists with running totals |

## Anti-patterns
- A payout shown as a range («3 إلى 18 يناير») or without «متوقع».
- «4 توزيعات» above a list of 6 rows; totals that do not add up.
- A card around every payout row.
- Late in red; extending the window to avoid showing lateness.
- Colour alone for received vs pending.

## Sources
- `knowledge/components/payouts-list.md` (Payouts cell 3618:122684), `investment-calculator.md` (Distribution-schedule 3442:5172, Distributions accordion 5996:6893, Installment row 5996:6441), `timeline.md` (TimelineRow 1836:306, TimelineNode 1823:18), `segmented-control.md`.
- Payout window rule: Linear SAF-2937.
- Distribution schedule study: Notion `3e81a53e-1a6b-814d-8f0c-e5ff69fd730b` (reach gap, maths errors, verdict enhance).
- Copy: `knowledge/content/voice-tone.md` (warning vs error table).
