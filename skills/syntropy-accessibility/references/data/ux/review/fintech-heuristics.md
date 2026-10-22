# Safqah fintech heuristics

Twelve heuristics specific to a regulated, Sharia-compliant investment product. They sit on top of Nielsen's 10 (`heuristics.md`) and are scored the same way (`review-format.md`). Use for any screen that shows money, a deal, a transaction, KYC or a decision with financial consequences.

## Rules
1. Score every money screen against F1 to F12. A violation of F2, F3, F4 or F7 on a money action is severity 3 minimum. Why: these cause financial loss, complaints and regulatory exposure.
2. Fixes use Syntropy components and tokens, never one-off UI. Why: consistency is itself a trust signal (F1, F7).
3. Numbers in examples follow `knowledge/content/numbers-currency.md`: Western digits, two decimals for SAR, currency after the amount. Why: CONVENTIONS.

## F1 Trust signals at the right moment
Show who regulates, who checked the deal and how money is protected, where the user hesitates (deal page, checkout, first deposit), not only on the landing page.
- Check: CMA licence and Sharia approval visible on the deal page (`ComplianceBadge Type=CMA`, `Type=Shariah`, `ShariaDisclosure`).
- Check: guarantees and collateral shown with `Guarantees` / `GuaranteeBar`, with the source document linked.
- Check: real developer identity (`NewsCard / Developer Logo`, name), no stock photos posing as projects.
- Don't: trust badges as decoration with no link to evidence.
- Example: «مرخّصة من هيئة السوق المالية» + «اعرف المزيد عن الترخيص» on checkout.

## F2 Money clarity: amount, fee, net, date
Every money screen shows the gross amount, every fee, the net result and when it happens, in that order, before the user commits.
- Check: summary shows `KeyValue` rows: المبلغ، الرسوم، صافي المبلغ / صافي العائد المتوقع، التاريخ.
- Check: fees are named and quantified, never «قد تُطبّق رسوم».
- Check: returns show gross and net, and say if net is after fees (for example 100,000.00 ر.س for 16 months at 16% annual: صافي العائد المتوقع 18,333.33 ر.س, نسبة صافي العائد السنوي 13.75%).
- Check: percentage labels start with «نسبة» (نسبة العائد المتوقع); SAR amounts do not.
- Don't: show the gross return large and the fee in a collapsed accordion.

## F3 Reversibility and confirmation of money actions
Every action that moves or commits money has a review step and an explicit confirm; where the business allows, a cancellation window, stated in advance.
- Check: «استثمر» on a card never commits; it opens amount entry, then a summary (`Checkout`, `Sheet Content / Summary`), then «تأكيد الاستثمار ... ر.س» with the amount in the label.
- Check: cancellation rules visible before confirm («يمكنك إلغاء الحجز خلال 30 دقيقة»).
- Check: destructive non-money actions use `Dialog Tone=destructive` naming the object.
- Check: confirm actions fire on release (WCAG 2.5.2) and are protected from double submit (`Button State=loading`).
- Don't: auto-submit on the last OTP digit for a money action.

## F4 Transaction status visibility
Every transaction has a visible status from a fixed set, with timestamps and the next expected step.

| Status | AR label | Must show |
| --- | --- | --- |
| Pending | بانتظار الدفع | deadline and how to pay |
| Processing | قيد المعالجة | started at, typical duration |
| Settled | مكتمل | settled at, reference number (copyable) |
| Failed | فشل | reason in plain words, what to do, whether money was taken |
| Reversed / refunded | مسترد | amount, date, destination |

- Check: `StatusPill` with text and icon (`../accessibility/color-not-alone.md`), date and time «15/10/2026، 2:30 م» in Riyadh time.
- Check: payouts show the expected window (maturity plus the payout window) before the date, not only after.
- Check: push and in-app history agree.
- Don't: «جارٍ المعالجة» with no time estimate for days.

## F5 Disclosure at the decision point
Risk, Sharia structure, fees and lock-up are shown where the decision is made, in plain words, before commitment. Legal text is linked, not dumped.
- Check: risk summary (one or two sentences) on the summary step, with a link to the full offering document.
- Check: acknowledgements use an unticked `Checkbox` with a specific statement («قرأت ملخص المخاطر»), never pre-ticked.
- Check: lock-up and early exit terms visible next to duration.
- Don't: disclosures only in onboarding or a footer.

## F6 Honest scarcity and time
Funding progress, remaining amount, countdowns and "few left" messages reflect real data and real deadlines.
- Check: `ProgressBar` / funding percentage computed from real commitments; reservation timers (`ReservationTimer`, `Countdown`) reflect real holds.
- Check: when a deal closes, say so and offer alternatives, do not fake a waitlist.
- Don't: countdowns that reset, «بقي 3 مقاعد» without data, red urgency colours on neutral facts. See `dark-patterns.md`.

## F7 Numeric consistency
The same number appears in the same format everywhere: card, deal page, calculator, summary, receipt, statement, notification.
- Check: same decimals (SAR always 2), same grouping, same rounding rule, same unit labels.
- Check: the confirm amount equals the entered amount exactly; receipts match the summary to the halala.
- Check: percentages show the same precision on card and deal page (16% vs 16.00% is a finding).
- Check: Western digits everywhere, currency after the amount (`1,250.00 ر.س` / `SAR 1,250.00`).
- Don't: card says «عائد 16%», deal page «15.8%», calculator «16.2%» without explaining which is gross, net or annualised.

## F8 Error recovery for payments and KYC
Failures in payment, bank verification and KYC say what happened, whether money moved, and offer the next step without starting over.
- Check: payment failure states whether the account was debited, and when a refund arrives.
- Check: IBAN name mismatch offers both recovery paths (account in own name, IBAN certificate upload).
- Check: KYC rejection names the field and lets the user fix only that step (`KYCStep`).
- Check: support entry («تواصل معنا») on every failure screen, with the reference number prefilled.
- Don't: generic «حدث خطأ» and a return to home.

## F9 Progressive disclosure of complex terms
Show the decision essentials first; reveal mechanics (Murabaha, Ijara, IRR, distribution schedule) on demand.
- Check: first level: 3 to 4 decision metrics; second level: `Accordion` / `AccordionItem`, `Popover` or a `BottomSheet` explainer; third: full documents.
- Check: every technical term has a one-sentence plain explanation in place.
- Don't: hide fees or risks behind disclosure; progressive disclosure is for mechanics, never for costs (F2, F5).

## F10 Accessible financial data
Tables, charts and numbers are usable by screen readers, at large text, and without colour.
- Check: `Table / HeaderCell` exposes headers; payout schedules readable row by row.
- Check: every `Chart / *` has a text summary and a table alternative; gain or loss uses sign and arrow.
- Check: amounts labelled in words for the currency («ريال سعودي»); never truncated at 200% text.
- See `../accessibility/` (screen-readers, dynamic-type, color-not-alone).

## F11 Privacy of money on screen
Balances and personal financial data can be hidden and are masked by default where others may see them.
- Check: `BalanceToggle` on `PortfolioHeader` hides all amounts consistently (including notifications preview and app switcher snapshot).
- Check: IBAN, national ID and card numbers masked («ينتهي بـ 1234») with explicit reveal.
- Don't: show full balances in push notification text by default.

## F12 Time clarity
Dates and times are unambiguous: calendar, timezone, business days.
- Check: dates state the calendar when it matters (Gregorian by default; Hijri where the context expects it) and use the Riyadh timezone label for deadlines.
- Check: "business days" are explained («خلال يومي عمل، باستثناء الجمعة والسبت»).
- Check: relative times («بعد 3 أيام») are paired with an absolute date for money events.

## Quick scoring
For each screen, mark F1 to F12 as Pass, Finding (with severity) or N/A with a reason, in the summary table from `review-format.md`.

## Sources
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data
- https://www.deceptive.design/types
- knowledge/components/index.json (`ComplianceBadge`, `ShariaDisclosure`, `Guarantees`, `StatusPill`, `KeyValue`, `Checkout`, `BalanceToggle`)
