<!-- syntropy-lint-disable percent-label-nisba: violation examples quote raw % values on purpose -->
# Safqah fintech heuristics F1 to F12

Twelve heuristics for a regulated, Sharia-compliant investment product, on top of Nielsen's 10. Open during step 4 of a full review for any screen that shows money, a deal, a transaction, KYC or a decision with financial consequences. Long form: `data/ux/review/fintech-heuristics.md`.

## Rules
1. Score every money screen against F1 to F12 (Pass, Finding with severity, or N/A with a reason). Why: coverage must be visible.
2. A violation of F2, F3, F4 or F7 on a money action is severity 3 minimum. Why: these cause financial loss, complaints and regulatory exposure.
3. Fixes use Syntropy components and tokens, never one-off UI. Why: consistency is a trust signal.
4. Numbers in findings and fixes follow Safqah format: Western digits, two decimals for SAR, currency after the amount, «نسبة» on Arabic percentage labels. Why: the review itself must model the rules.
5. Limits, rates, fees and periods in copy come from the backend for the signed-in user; a hardcoded number is a finding. Why: limits differ by investor classification and change.

## The twelve

| ID | Heuristic | Check | Typical violation | Syntropy fix |
| --- | --- | --- | --- | --- |
| F1 | Trust signals at the right moment | CMA and Sharia statements where users hesitate (deal page, checkout, first deposit), linked to evidence | badges as decoration, or only on the landing page | `ComplianceBadge Type=CMA` and `Type=Shariah`, `ShariaDisclosure`, `Guarantees` / `GuaranteeBar` with the source document; «اعرف المزيد عن الترخيص» |
| F2 | Money clarity: amount, fee, net, date | gross, every fee (with VAT), net, date, in that order, before commit | fee in a collapsed accordion or tiny `text/subtle` | `KeyValue` rows المبلغ، الرسوم، صافي العائد المتوقع، التاريخ in `text/default`; net is the headline |
| F3 | Reversibility and confirmation | review step, explicit confirm with the amount, cancellation window stated, fire on release, double submit blocked | «استثمر» on a card commits; auto-submit on last OTP digit | amount entry > `Checkout` or `Sheet Content / Summary` > «تأكيد استثمار 100,000.00 ر.س»; `Button State=loading`; `Dialog Tone=destructive` for destructive non-money actions |
| F4 | Transaction status visibility | fixed status set, timestamps, next step | «جارٍ المعالجة» for days with no estimate | `StatusPill` with text and icon; «15/10/2026، 2:30 م» Riyadh time; reference number copyable |
| F5 | Disclosure at the decision point | risk line, Sharia structure, fees, lock-up where the decision is made; legal text linked | disclosure only in onboarding or a footer | one or two risk sentences next to the confirm button; unticked `Checkbox` «قرأت ملخص المخاطر»; link to the offering document |
| F6 | Honest scarcity and time | funding %, remaining amount and timers from real data | «بقي 3 مقاعد», resetting countdowns, red urgency on neutral facts | `ProgressBar` from real commitments; `Countdown` / `Timer` only for a real hold, with what happens at zero |
| F7 | Numeric consistency | same value, decimals, grouping, rounding everywhere: card, deal page, calculator, summary, receipt, notification | card 16%, deal page 15.8%, calculator 16.2% unexplained; confirm amount differs from input | one formatter; SAR 2 decimals; percentages 1 decimal; gross vs net labelled |
| F8 | Error recovery for payments and KYC | says whether money moved, when a refund arrives, fix only the failing step | generic «حدث خطأ» and back to home | `Alert Tone=error` with cause, money status, retry; IBAN mismatch both paths; `KYCStep` for the failed field; «تواصل معنا» with reference prefilled |
| F9 | Progressive disclosure of complex terms | 3 to 4 decision metrics first, mechanics on demand | Murabaha mechanics dumped on the card; or fees hidden behind disclosure | `Accordion` / `AccordionItem`, `Popover`, `BottomSheet` explainer for mechanics only; never for costs or risks |
| F10 | Accessible financial data | tables, charts and numbers work with screen readers, at 200%, without colour | chart with colour-only series; truncated amounts | `Table / HeaderCell` headers; chart summary and table alternative; «ريال سعودي» labels (see syntropy-accessibility) |
| F11 | Privacy of money on screen | balances hideable, sensitive data masked | full balance in push text; full IBAN on screen | `BalanceToggle` on `PortfolioHeader` hides all amounts; «ينتهي بـ 1234» with explicit reveal |
| F12 | Time clarity | calendar, timezone, business days, absolute dates for money events | «خلال يومي عمل» unexplained; «بعد 3 أيام» alone | «خلال يومي عمل، باستثناء الجمعة والسبت»; relative time paired with an absolute date |

## Worked numbers (use when checking F2 and F7)
- 100,000.00 ر.س for 16 months at 16% annual expected, fee taken from profit: صافي العائد المتوقع 18,333.33 ر.س, نسبة صافي العائد السنوي 13.75%.
- Every screen that shows this deal must show the same three values in the same format.

## Statuses (F4)

| Status | AR label | Must show |
| --- | --- | --- |
| Pending | بانتظار الدفع | deadline and how to pay |
| Processing | قيد المعالجة | started at, typical duration |
| Settled | مكتمل | settled at, reference number (copyable) |
| Failed | فشل | reason in plain words, what to do, whether money was taken |
| Refunded | مسترد | amount, date, destination |

## Severity guide for fintech findings
- 4: double charge possible, money committed without review, hidden fee, pre-ticked acknowledgement, fake urgency or scarcity.
- 3: fee or net missing before confirm, status without time, inconsistent amounts, missing risk line, missing cancellation statement.
- 2: unclear term without explanation, relative date without absolute date on a non-money event.

## Sources
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data
- https://www.deceptive.design/types
- `data/ux/review/fintech-heuristics.md`, `data/ux/compliance/README.md`
