# Portfolio

The investor's home for what they own: greeting, wallet, total returns, holdings grouped by status, allocation, and the next money moment. Read this before building the Portfolio tab or any holdings summary.

## Job of the screen
Answer three questions at a glance: how much do I have and earn, where is my money (by deal and status), and what happens next (next payout, maturity, anything that needs me).

## When to use
- The Portfolio tab (top-level) and its sub-views (active, completed, a status group).
- Not for: the payout list itself (`payouts.md`), the wallet and withdrawals (`wallet-and-cash-out.md`).

## Flow steps
1. **Open the tab**: header with balance (maskable), returns, invested amount; one link to the payouts list.
2. **Scan holdings** grouped by status (Reserved, Confirmed, Funded, Active, Matured, Late, Defaulted, Completed). Each group shows count and total.
3. **Expand a group** to see its investments; tap one to open the investment detail (deal page in Invested state, `deal-page.md`).
4. **Switch view** Active vs Completed with `SegmentedTabs`.
5. **Optional analysis**: allocation and returns charts (`charts-and-dashboards.md`).
6. **Act on attention items**: Late/Defaulted rows lead to the explanation; Matured leads to the payout and reinvest choice.

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Header | `PortfolioHeader` `Direction=RTL` `Balance=Shown` (or `Masked`), `Show wallet=true`, `Show returns=true`, `Show payouts table=true`. Contains `UserGreeting` (`Show qualified badge` for qualified users, `Show eye`), `WalletChip`, `ReturnsDisplay` (returns label + `MoneyAmount` `Size=lg` `Tone=brand`, invested on the opposite side), payouts `Button` | Once per page, at the very top. Padding `space/lg` |
| 2 | Attention (only if needed) | One `Alert` `Tone=warning` `Style=Outlined` («تأخر سداد في صفقة واحدة») or `Banner` for a matured payout awaiting a choice | Never more than one |
| 3 | View switch | `SegmentedTabs` `Active=1` `Direction=RTL`: «استثماراتي النشطة» · «المكتملة» | Directly under the header |
| 4 | Holdings by status | `Section` `Size=Md` «حسب الحالة» + `Issuance List` `Direction=RTL` of `Issuance Row` (`Language=RTL`, props Status, Count, Amount; `State=Open` to expand); status icon from `Issuance Status Icon` | Only the icon carries status colour; label and amount stay neutral |
| 5 | Expanded rows | Inside an open row: `CardDeal` `Layout=Row` `State=Invested` per investment, with a secondary line by status (see table) | Gap `space/sm` |
| 6 | Allocation (optional) | `Section` `Size=Md` «توزيع استثماراتك» + `Chart / Donut · Mobile` `Direction=RTL` (≤6 slices) with `Chart / Legend` and a text list | Semantic palette only |
| 7 | Next money moment | `Section` `Size=Md` «الدفعة القادمة» + one `Payouts cell` `Property 1=Upcoming` | Links to `payouts.md` |
| 8 | Bottom nav | `TabBar` `Active=` Portfolio `Direction=RTL` | |

Alternative header for the top-level screen: `Header` (06a) `Show Qualified?` with `Header Info` `Show Payouts list?`; pick one header per screen, never both.

### Secondary line per status (CardDeal Row, from SAF-2937)
| Status (`IssuanceStatusBadge (Investor)`) | Arabic | English |
|---|---|---|
| Reserved | «متبقي 3 أيام» | "3 days left" |
| Confirmed / Funded | «يبدأ ~20 مايو 2026» | "Starts ~20 May 2026" |
| Active | «يستحق 3 يناير 2027» | "Matures 3 January 2027" |
| Matured | «متوقع ~18 يناير 2027» (maturity + 15 days) | "Expected ~18 January 2027" |
| Late | «متأخر 5 أيام» (counted from the window end) | "5 days late" |
| Defaulted | «متعثرة · بدأت إجراءات التحصيل» | "Defaulted · recovery started" |

## Required states

| State | Treatment |
|---|---|
| Loading | Header: `SkeletonLine` `Size=Large` `Width=Half` (greeting), `SkeletonBlock` `Radius=Medium` for wallet chip, `SkeletonLine` `Size=XLarge` for returns, `SkeletonBlock` for the button. Holdings: 4 `Issuance Row` skeletons (`SkeletonCircle` `Size=L` + 2 lines + amount line) |
| Empty | First-time investor: header with zeros, holdings region `EmptyState` `Tone=default` `Size=Default` «لم تستثمر بعد» + «تصفح الصفقات». Completed tab empty: `EmptyState` `Size=Compact` «لا توجد استثمارات مكتملة بعد» (no button) |
| Error | Header loads but holdings fail: `EmptyState` `Tone=error` `Size=Compact` in the holdings region + retry; header stays. Full failure: full-area `EmptyState` `Tone=error` |
| Success | After a new investment: the row appears in Reserved/Confirmed with no toast if the user came from the success screen |
| Disabled | Masked balance: amounts replaced by ••••• in header and rows; charts hide values (show shapes only) |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Returns label | «إجمالي العوائد والأرباح المتوقعة» | "Total returns and expected profit" |
| Invested | «المبلغ المستثمر» | "Amount invested" |
| Payouts button | «اطلع على جدول التوزيعات» | "View payouts list" |
| Tabs | «النشطة» · «المكتملة» | "Active" · "Completed" |
| Empty | «لم تستثمر بعد» | "You haven't invested yet" |

## Compliance notes
- Separate realised returns from expected profit in labels; expected is «متوقع» and never presented as earned. Confirm the label wording with Compliance.
- Late and Defaulted are stated plainly with what Safqah is doing; no softening that hides risk, no alarmism (warning for late, error only for defaulted).
- Allocation charts describe the user's own holdings; no suitability advice.

## Accessibility notes
- `BalanceToggle` labelled; masking applies to screen readers too.
- `Issuance Row` reads status, count and amount, and its expanded state («موسّع»).
- Donut has a text alternative: the legend list with percentages, and the chart is hidden from the reader if the list carries the same data.
- `ReturnsDisplay` large green amount passes contrast only at large size; keep it large.

## Benchmarks
| App (benchmarks, see syntropy-inspiration) | What to learn |
|---|---|
| Fundrise | Portfolio by status with plain-language next events |
| Wahed / Sarwa (GCC) | Calm returns header with invested vs value |
| Derayah (Saudi) | Arabic portfolio with Western digits and currency after the amount |
| Wealthsimple | Hide-balance toggle and restrained charts |

## Anti-patterns
- Several hero numbers competing in the header (one returns number, one invested).
- Colouring the amount or label per status (only the icon carries colour).
- A payout date shown as a range or without «متوقع».
- Late shown in red; defaulted shown in warning orange (swapped meanings).
- Charts with more than 6 donut slices or a mirrored time axis.

## Sources
- `knowledge/components/portfolio-header.md` (PortfolioHeader 4243:1823), `issuance-row.md` (4059:117428, 4093:2406), `tab-bar.md` (SegmentedTabs 2523:90), `status-issuance-badge.md`, `card-deal.md`, `chart.md`, `app-bar.md` (Header 4844:107612).
- Image: `knowledge/examples/components/portfolio-header/portfolio-header.png`.
- Payout window and status secondary lines: Linear SAF-2937.
- Warning vs error rule: `knowledge/content/voice-tone.md` rule 8.
