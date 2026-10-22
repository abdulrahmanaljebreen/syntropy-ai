Design guidance only. Confirm wording with Safqah Compliance before release.

# Risk statements and honest deal states

Where risk appears on Safqah screens, how prominent it is, the standard lines to start from, and how to show late, defaulted and in-recovery deals truthfully. Read it for deal pages, invest and reserve flows, portfolio, payouts and marketing.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| ROSCO Annex 1(A), closing statement | "Investment in the offered debt instruments entails high risks, and may only suit investors capable of assessing the benefits and risks of this investment and bear any losses that may result therefrom, which may extend to the loss of entire investment amount." Also: "If the contents of this document is not understandable, an authorised financial advisor must be consulted." |
| ROSCO Annex 1(A) items 1(j), 9 | The offering document describes breach events and the procedures taken, and the investment risks and fundamental lawsuits. |
| ROSCO Art. 6(a)(11)(q), (r), (s) | Disclose each issuance's payment status and the platform's 90-day overdue percentage with actions taken, updated at least monthly. |
| CMI Regs Art. 42 | Take reasonable steps so the client understands "the nature of the risks involved". |
| CMI Regs Annex 5.1 items 13, 14 | Where value can fall, state that "prices, values or income may fall" and that the investor "may get back less than he invested"; recommendations carry a warning that they "may not be suitable for all recipients". |
| SAMA Principle 2, Rule 3 | Information includes "types of major risks and benefits"; terms include warning statements on potential risks. |
| REIF Regs Annex 1 item 7(b) (benchmark) | "investment in the Fund does not guarantee profits and does not protect from losses." |

## Rules

### Placement and prominence
1. Show a short risk line on every screen that leads to a commitment: deal page (near the CTA), amount step, invest summary (directly above the confirm `Button`), reserve sheet. Why: CMI Art. 42; risk is part of the decision, not an appendix.
2. The risk line uses body text in `text/default` or `text/muted` at the same size as nearby body copy. Never smaller, lighter, or lower contrast than the return figure next to it. Why: deceptive pattern "Visual interference".
3. Pair every return figure with risk on the same screen. If a screen shows «نسبة العائد المتوقع», it also shows the risk line or a visible link to the deal's risks. Why: SAMA Principle 2 (risks and benefits together).
4. The deal page has a dedicated «المخاطر» section listing the deal's main risks from the offering document (developer, completion, collateral, liquidity, early redemption), each one line, with a link to the full text. Use `Accordion` Style=Plain or `List`; never a single collapsed "Disclaimer" at the page bottom. Why: Annex 1(A) item 9.
5. Do not put risk text inside a `Tooltip` or a dismissible `Toast`. Why: it must be readable without discovery and stay on screen.
6. Keep each line short (one sentence). Progressive disclosure is fine; omission is not. Why: AGENTS.md minimal copy rule and Syntropy's restraint, without losing the warning.

### Tone and colour for states
7. Warnings use the warning tone: `Alert` or `Banner` Tone=warning, `StatusPill` Tone=warning, tokens `bg/warning-subtle`, `text/warning`, `icon/warning`. Why: Safqah colour rule, warnings are yellow.
8. Red (Tone=error, `bg/error-subtle`, `text/error`) is reserved for the critical: Defaulted, Written Off, a failed payment the user must act on. Late, Partially Repaid, Repayment Due use warning. Why: Safqah colour rule; overusing red numbs users to the real emergency.
9. Never use colour alone; pair it with the status word and an icon. Why: accessibility, WCAG 1.4.1.
10. Use `IssuanceStatusBadge (Investor)` status values verbatim (Late, Defaulted, Partially Repaid, Written Off, Funding Failed, Cancelled). Do not soften names («متأخرة قليلاً», "slight delay") or invent positive ones. Why: clear, fair and not misleading.

### Late, defaulted and in-recovery deals
11. A late or defaulted deal shows on the portfolio and deal page: status, days overdue, amount due vs received, what Safqah is doing (recovery step), and when the user will hear next. Why: ROSCO 6(a)(11)(q), (r).
12. Expected return on a late or defaulted deal is no longer shown as "expected profit". Show what has been received and what is outstanding. Why: showing the original projection implies it will still arrive.
13. Never hide defaulted deals from portfolio totals, platform stats or "track record" figures. Why: CMI Annex 5.1 item 9(2) (not selected to exaggerate).
14. Recovery updates are dated and factual: «تم تقديم المطالبة للتنفيذ في 3 أكتوبر 2026». No reassurance language («لا داعي للقلق», "your money is safe"). Why: no guarantee of outcome exists.
15. The platform-wide overdue rate (90+ days) is visible on the landing page or a public "performance" page with its as-of date. Why: ROSCO 6(a)(11)(r), (s).

## Standard risk lines (templates)

English lines 1 and 4 follow the verified wording in ROSCO Annex 1(A) and CMI Annex 5.1. Arabic lines are draft translations: replace them with the official Arabic text of the CMA rules (the Arabic text is the official one) before release.

| # | Where | العربية (draft) | English |
| --- | --- | --- | --- |
| R1 | Near every invest CTA | «الاستثمار في أدوات الدين ينطوي على مخاطر عالية وقد يؤدي إلى خسارة كامل المبلغ المستثمر.» | "Investing in debt instruments carries high risk and may lead to the loss of the entire amount invested." |
| R2 | Next to any expected return | «العائد متوقع وغير مضمون.» | "Returns are expected, not guaranteed." |
| R3 | Deal page, summary | «قد تتأخر التوزيعات أو تتغير مواعيدها حسب أداء المصدر.» | "Payouts may be late or rescheduled depending on the issuer's performance." |
| R4 | Wherever past results appear | «الأداء السابق لا يعد بالضرورة مؤشراً على الأداء المستقبلي.» | "Past performance is not necessarily a guide to future performance." |
| R5 | Invest summary | «قد تسترد مبلغاً أقل مما استثمرت.» | "You may get back less than you invested." |
| R6 | Deal page, liquidity | «لا يمكن عادةً استرداد المبلغ قبل تاريخ الاستحقاق.» | "You usually cannot withdraw before maturity." (confirm with Compliance whether any early exit exists) |
| R7 | Offering document entry | «إذا لم يكن محتوى نشرة الطرح واضحاً، استشر مستشاراً مالياً مرخصاً.» | "If the offering document is unclear, consult an authorised financial advisor." |
| R8 | Marketing with a specific deal | «قد لا يناسب هذا الاستثمار جميع المستثمرين.» | "This investment may not suit every investor." |

## Examples

| Do | Don't |
| --- | --- |
| R1 directly above `Button` «تأكيد الاستثمار 100,000.00 ر.س», same size as body | Risk in 10 px grey under the fold |
| `StatusPill` Tone=warning «متأخرة 12 يوماً» | `StatusPill` Tone=error for a 12-day delay |
| `StatusPill` Tone=error «متعثرة» + «المستلم 40,000.00 ر.س من 100,000.00 ر.س» + recovery step | «قيد المعالجة» for a defaulted deal |
| "Defaulted · Received 40,000.00 of 100,000.00 SAR · Claim filed 3 Oct 2026" | "Don't worry, your capital is protected" |
| «سجل المنصة: نسبة التعثر لأكثر من 90 يوماً 2.1% حتى 30 سبتمبر 2026» | Track record that excludes defaulted deals |

## Sources

- CMA, Rules on the Offer of Securities and Continuing Obligations, amended 1/9/2025, Art. 6(a)(11)(q) to (s), Annex 1(A): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- CMA, Capital Market Institutions Regulations, Art. 42 and Annex 5.1 items 9, 13, 14: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, Real Estate Investment Funds Regulations 2025, Annex 1 item 7(b): https://cma.gov.sa/en/RulesRegulations/Regulations/Documents/Real_Estate_Investment_Funds_Regulations_2025_EN.pdf
- SAMA Rulebook, Financial Consumer Protection Principles and Rules, Principle 2, Rule 3: https://rulebook.sama.gov.sa/en/entiresection/1375
- Deceptive Patterns, "Visual interference": https://deceptive.design/types
- Safqah colour rule: warnings use the warning yellow tone; red only for defaulted or critical.
- Syntropy: `knowledge/components/index.json` (`IssuanceStatusBadge (Investor)`, `StatusPill`, `Alert`, `Banner`, `Accordion`, `List`, `Button`); tokens `bg/warning-subtle`, `text/warning`, `icon/warning`, `bg/error-subtle`, `text/error` in `knowledge/tokens/resolved.json`.
