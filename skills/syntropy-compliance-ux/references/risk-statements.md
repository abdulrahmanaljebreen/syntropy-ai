Design guidance only. Confirm wording with Safqah Compliance before release.

# Risk statements and honest deal states

Where risk appears, how prominent it is, the standard lines R1 to R8, and how to show late, defaulted and in-recovery deals truthfully. Open it for deal pages, invest and reserve flows, portfolio, payouts and marketing.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| ROSCO Annex 1(A), closing statement | "Investment in the offered debt instruments entails high risks, and may only suit investors capable of assessing the benefits and risks of this investment and bear any losses that may result therefrom, which may extend to the loss of entire investment amount." Also: "If the contents of this document is not understandable, an authorised financial advisor must be consulted." |
| ROSCO Annex 1(A) items 1(j), 9 | Breach events and procedures; investment risks and fundamental lawsuits |
| ROSCO Art. 6(a)(11)(q), (r), (s) | Each issuance's payment status and the platform's 90-day overdue percentage with actions taken, updated at least monthly |
| CMI Regs Art. 42 | Reasonable steps so the client understands "the nature of the risks involved" |
| CMI Regs Annex 5.1 items 13, 14 | Where value can fall: "prices, values or income may fall", investor "may get back less than he invested"; recommendations "may not be suitable for all recipients" |
| SAMA Principle 2, Rule 3 | "types of major risks and benefits"; warning statements on potential risks |
| REIF Regs Annex 1 item 7(b) (benchmark) | "investment in the Fund does not guarantee profits and does not protect from losses." |

## Rules

### Placement and prominence
1. A short risk line on every screen that leads to a commitment: deal page (near the CTA), amount step, invest summary (directly above the confirm `Button`), reserve sheet. Why: CMI Art. 42.
2. The risk line is body text in `text/default` or `text/muted`, the same size as nearby body copy. Never smaller, lighter or lower contrast than the return figure next to it. Why: "Visual interference".
3. Pair every return figure with risk on the same screen: if it shows «نسبة العائد المتوقع», it also shows a risk line or a visible link to the deal's risks. Why: SAMA Principle 2.
4. The deal page has a «المخاطر» section listing the main risks from the offering document (developer, completion, collateral, liquidity, early redemption), one line each, linking to the full text. Use `Accordion` or `List`; never one collapsed "Disclaimer" at the page bottom. Why: Annex 1(A) item 9.
5. Never put risk text in a `Tooltip` or a dismissible `Toast`. Why: must be readable without discovery and stay on screen.
6. One sentence per line. Progressive disclosure is fine; omission is not. Why: minimal copy without losing the warning.

### Tone and colour for states
7. Warnings use the warning tone: `Alert` or `Banner` Tone=warning, `StatusPill` Tone=warning, tokens `bg/warning-subtle`, `text/warning`, `icon/warning`. Why: Safqah colour rule.
8. Red (Tone=error, `bg/error-subtle`, `text/error`) only for the critical: Defaulted, Written Off, a failed payment the user must act on. Late, Partially Repaid and Repayment Due use warning. Why: overusing red numbs users to the real emergency.
9. Never colour alone: pair with the status word and an icon. Why: WCAG 1.4.1.
10. Use `IssuanceStatusBadge (Investor)` Status values verbatim (Late, Defaulted, Partially Repaid, Written Off, Funding Failed, Cancelled, Repayment Due). Never soften («متأخرة قليلاً», "slight delay") or invent positive names. Why: clear, fair, not misleading.

### Late, defaulted and in-recovery deals
11. Portfolio and deal page show: status, days overdue, amount due vs received, what Safqah is doing (recovery step), and when the user will hear next. Why: ROSCO 6(a)(11)(q), (r).
12. On a late or defaulted deal, stop showing "expected profit". Show received and outstanding. Why: the original projection implies it will still arrive.
13. Never hide defaulted deals from portfolio totals, platform stats or track-record figures. Why: CMI Annex 5.1 item 9(2).
14. Recovery updates are dated and factual: «تم تقديم المطالبة للتنفيذ في 3 أكتوبر 2026». No reassurance («لا داعي للقلق», "your money is safe"). Why: no outcome is guaranteed.
15. The platform 90+ day overdue rate is visible on the landing page or a public performance page with its as-of date. Why: ROSCO 6(a)(11)(r), (s).

## Status to tone map

| Status (`IssuanceStatusBadge (Investor)` / `Payouts cell`) | Tone | Surface |
| --- | --- | --- |
| Repayment Due | warning | `StatusPill` Tone=warning or the badge; no `Banner` unless the user must act |
| Late (any number of days) | warning | Badge + `Alert` Tone=warning with days overdue, due vs received, recovery step, next update date |
| Partially Repaid | warning | Badge + received vs outstanding rows |
| Defaulted | error | Badge + `Banner` or `Alert` Tone=error with received vs due, recovery step and date |
| Written Off | error | Badge + final received amount and loss |
| Funding Failed / Cancelled | the badge's locked colours; any `Alert` neutral or info (agent guidance, not from the rule files), never success | Refund amount in full, no fees, period (cma.md rule 14) |
| Failed payment the user must act on | error | `Alert` Tone=error with the action |

`Payouts cell` states include Upcoming, Done - Captial (layer name as in Figma), Done - Payout, Early paid, Disabled Early paid, Late, Defaulted, Partially repaid, Partially repaid closed, Partial principal. Its compliance note: show defaulted and late honestly (`text/error` for Defaulted only), keep skipped rows visible, explain early repayment profit was settled.

## Standard risk lines R1 to R8 (templates)

English R1 and R4 follow verified wording in ROSCO Annex 1(A) and CMI Annex 5.1. Arabic lines are draft translations: replace them with the official Arabic text of the CMA rules (Arabic is official) before release.

| # | Where | العربية (draft) | English |
| --- | --- | --- | --- |
| R1 | Near every invest CTA | «الاستثمار في أدوات الدين ينطوي على مخاطر عالية وقد يؤدي إلى خسارة كامل المبلغ المستثمر.» | "Investing in debt instruments carries high risk and may lead to the loss of the entire amount invested." |
| R2 | Next to any expected return | «العائد متوقع وغير مضمون.» | "Returns are expected, not guaranteed." |
| R3 | Deal page, summary | «قد تتأخر التوزيعات أو تتغير مواعيدها حسب أداء المصدر.» | "Payouts may be late or rescheduled depending on the issuer's performance." |
| R4 | Wherever past results appear | «الأداء السابق لا يعد بالضرورة مؤشراً على الأداء المستقبلي.» | "Past performance is not necessarily a guide to future performance." |
| R5 | Invest summary | «قد تسترد مبلغاً أقل مما استثمرت.» | "You may get back less than you invested." |
| R6 | Deal page, liquidity | «لا يمكن عادةً استرداد المبلغ قبل تاريخ الاستحقاق.» | "You usually cannot withdraw before maturity." (confirm whether any early exit exists) |
| R7 | Offering document entry | «إذا لم يكن محتوى نشرة الطرح واضحاً، استشر مستشاراً مالياً مرخصاً.» | "If the offering document is unclear, consult an authorised financial advisor." |
| R8 | Marketing with a specific deal | «قد لا يناسب هذا الاستثمار جميع المستثمرين.» | "This investment may not suit every investor." |

Which line where, minimum set:

| Screen | Lines |
| --- | --- |
| Deal page | R1 near CTA, R2 beside the rate, R3 in summary, R6 in liquidity, R7 at the offering document entry, «المخاطر» section |
| Amount step | R1 (or R2 beside the projection plus R1 on the summary) |
| Invest summary / confirm sheet | R1 directly above the confirm `Button`, R2 beside expected figures, R5 |
| Reserve sheet | R1 |
| Portfolio / track record | R4 wherever past results show |
| Marketing with a deal | R2, R4 if past results, R8 |

## Examples

| Do | Don't |
| --- | --- |
| R1 directly above `Button` «تأكيد الاستثمار 100,000.00 ر.س», same size as body | Risk in 10 px grey under the fold |
| `StatusPill` Tone=warning «متأخرة 12 يوماً» | Tone=error for a 12-day delay |
| `IssuanceStatusBadge (Investor)` Status=Defaulted «متعثرة» + «المستلم 40,000.00 ر.س من 100,000.00 ر.س» + recovery step | «قيد المعالجة» for a defaulted deal |
| "Defaulted · Received 40,000.00 of 100,000.00 SAR · Claim filed 3 Oct 2026" | "Don't worry, your capital is protected" |
| «سجل المنصة: نسبة التعثر لأكثر من 90 يوماً 2.1% حتى 30 سبتمبر 2026» | Track record that excludes defaulted deals |

## Sources

- CMA, ROSCO, amended 1/9/2025, Art. 6(a)(11)(q) to (s), Annex 1(A): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- CMA, CMI Regs, Art. 42, Annex 5.1 items 9, 13, 14: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, Real Estate Investment Funds Regulations 2025, Annex 1 item 7(b): https://cma.gov.sa/en/RulesRegulations/Regulations/Documents/Real_Estate_Investment_Funds_Regulations_2025_EN.pdf
- SAMA Rulebook, Principle 2, Rule 3: https://rulebook.sama.gov.sa/en/entiresection/1375
- Deceptive Patterns, "Visual interference": https://deceptive.design/types
- Safqah colour rule: warnings use the warning yellow tone; red only for defaulted or critical.
- Syntropy: `IssuanceStatusBadge (Investor)` 1485:151, `Payouts cell` 3618:122684, `StatusPill` 1654:178, `Alert` 1950:212, `Banner` 1993:212.
- Full source file: `references/data/ux/compliance/risk-statements.md`.
