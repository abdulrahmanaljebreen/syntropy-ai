Design guidance only. Confirm wording with Safqah Compliance before release.

# Anti-pressure: banned patterns and safe alternatives

Patterns that push people into investing, staying, sharing data or skipping information, mapped to the deceptive.design taxonomy, with the Safqah-safe way to meet the same goal. Read it before you add urgency, scarcity, social proof, defaults, reminders or exit friction to any screen.

## Why this is a compliance topic (verified)

| Source | Point |
| --- | --- |
| CMI Regs Art. 34(d) | Individuals seeking business must "avoid using any undue pressure or making any misleading statements". |
| CMI Regs Art. 5(b)(8), (9) | Communicate clearly, fairly and not misleadingly; treat clients fairly and pay due regard to their interests. |
| CMI Regs Annex 5.1 items 4, 9 | No false or misleading statements; past performance not selected to exaggerate. |
| SAMA Advertising Rules Art. 1, 4, 5.1 | Avoid "tempting, misleading or inaccurate methods", no exaggeration; promotions state the start and end of the offer; no false or misleading offers. |
| SAMA Fees Guide Art. 4; Rule 8 | Prior approval of all fees; no fee increase after contract. |
| PDPL Art. 5, 7, 25 | Explicit consent, withdrawable at any time; consent not a condition for unrelated service; clear stop mechanism for marketing. |
| ROSCO Art. 6(a)(11)(o) | Retail subscribers may cancel within 48 hours or until the offering ends. |
| deceptive.design/types | Taxonomy used below: Sneaking, Forced action, Hard to cancel, Preselection, Obstruction, Hidden subscription, Hidden costs, Trick wording, Visual interference, Fake social proof, Fake urgency, Nagging, Fake scarcity, Disguised ads, Confirmshaming, Comparison prevention, Addictive design, Currency confusion. |

## Banned patterns

| # | Banned on Safqah | deceptive.design type | Safqah-safe alternative |
| --- | --- | --- | --- |
| B1 | Countdown on a deal CTA or deal card that is not tied to a real, server-side close time | Fake urgency | Show the real close date as text: «يغلق الطرح 30 أكتوبر 2026». No ticking seconds. |
| B2 | Timer that resets on reload, or a "today only" rate | Fake urgency | Rates are fixed by the offering document; never time-boxed in UI. |
| B3 | "Only 3 units left", "selling fast", "12 people are viewing" unless computed live from real data | Fake scarcity, Fake social proof | Funded percentage from the backend: `ProgressBar` Label «نسبة التمويل» Value `78%`, plus remaining amount «المتبقي 440,000.00 ر.س». |
| B4 | Invented or unverifiable testimonials, investor counts or "X earned Y" tickers | Fake social proof | Defined, dated platform stats with method link ([cma.md](cma.md) rule 18). Testimonials only if real, consented, and Compliance approved; never about returns. |
| B5 | Decline buttons that shame: «لا، لا أريد زيادة أرباحي» | Confirmshaming | Neutral pair: «ليس الآن» / «السماح», «إلغاء» / «متابعة». |
| B6 | Pre-ticked consents, auto-enrolled auto-invest or auto-reinvest, default amount set to the user's maximum limit | Preselection, Hidden subscription | All optional boxes unticked; auto-invest only after an explicit opt-in screen; amount field empty or at the minimum. |
| B7 | A fee first shown at payment or after | Hidden costs, Sneaking | All fees on the summary before confirm ([fees-returns.md](fees-returns.md)). |
| B8 | Cash-out harder than deposit: extra screens, retention offers, "are you sure you want to lose your profit?" | Hard to cancel, Obstruction, Confirmshaming | Cash-out in as many steps as deposit; one neutral confirmation showing amount, fee and arrival time. |
| B9 | Cancelling a subscription only via chat or support | Hard to cancel | In-app «إلغاء الاكتتاب» until the 48-hour or offering-end deadline. |
| B10 | Repeated prompts to enable notifications, upgrade to qualified, or invest again after the user said no | Nagging | One re-ask after a meaningful event at most; the setting lives in settings. |
| B11 | Gross return large and bold, net small; risk in light grey; "Learn more" styled as plain text | Visual interference | Net is the headline; risk at body size and contrast ([risk-statements.md](risk-statements.md)). |
| B12 | Double negatives or ambiguous toggles («لا تمنعني من استلام العروض») | Trick wording | Positive, single-meaning labels: «أرغب في استلام العروض». |
| B13 | Upgrade to qualified framed as unlocking "bigger returns" or VIP status | Trick wording, undue pressure | Factual: what changes (limits, eligible products), what risk exposure increases. |
| B14 | Sponsored deal or partner promotion styled as a neutral recommendation | Disguised ads | Label promotions «إعلان» / «عرض ترويجي»; recommendations show why they match («يناسب المدة التي اخترتها»). |
| B15 | Hiding term, fee or risk so deals cannot be compared | Comparison prevention | Every deal card shows the same fields in the same order: rate (annual, net basis stated), term, minimum, funded %, status. |
| B16 | Streaks, confetti or gamified rewards for investing more often | Addictive design | Celebrate completion of a task (KYC done, payout received) quietly; no rewards for frequency. |
| B17 | Points, coins or "Safqah credits" that hide the SAR value | Currency confusion | Always show SAR amounts; any credit shows its SAR value beside it. |
| B18 | Forcing marketing consent, contacts access, or a referral to proceed | Forced action | Optional means optional; continue works without it (PDPL Art. 7). |

## When a timer is allowed

A countdown is allowed only when **all** of these hold. Otherwise use a plain date.

1. It shows a real hold that exists on the server (a reservation that releases units back to the pool, or a payment window that expires).
2. The end time comes from the backend and survives reload and device change.
3. The copy says what happens at zero, honestly: «تنتهي مهلة الدفع خلال 14:59. بعدها يُلغى الحجز ويعود المبلغ المتاح للصفقة». Nothing is lost except the hold.
4. The user can leave or cancel without penalty, and the cancel control is as visible as the pay control.
5. It uses the `Countdown` or `Timer` components from page 08b in a neutral or warning tone, never error red, and never animates the CTA itself.
6. There is no timer on the deal card, the deal list, or the "Invest" entry button.

## Real scarcity, stated as fact

| Do | Don't |
| --- | --- |
| `ProgressBar` «نسبة التمويل 78%» + «المتبقي 440,000.00 ر.س» | «سارع! الفرصة على وشك الانتهاء» |
| «يغلق الطرح 30 أكتوبر 2026» | A ticking `Countdown` on the deal card |
| «اكتمل التمويل» with `IssuanceStatusBadge (Investor)` Status=Fully Funded | «فاتتك الفرصة! لا تكررها» |
| "78% funded · 440,000.00 SAR remaining" | "Hurry, only a few spots left!" |
| "Payment window ends in 14:59. Your reservation will be released, nothing is charged." | "Pay now or lose your profit" |

## Neutral choices

| Do | Don't |
| --- | --- |
| «ليس الآن» / «السماح» | «لا، أفضّل تفويت الأرباح» |
| «إلغاء» / «تأكيد السحب» | «هل أنت متأكد أنك تريد خسارة أرباحك المستقبلية؟» |
| "Not now" / "Allow" | "No thanks, I don't like money" |

## Sources

- Deceptive Patterns, Types of deceptive pattern (taxonomy and definitions): https://deceptive.design/types
- CMA, Capital Market Institutions Regulations, Art. 5, 34(d), Annex 5.1: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, Rules on the Offer of Securities and Continuing Obligations, Art. 6(a)(11)(o): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- SAMA Rulebook, Rules for Advertising (Art. 1, 4, 5), Guide to Financial Institutions Services Fees (Art. 4), Financial Consumer Protection Rules (Rule 8): https://rulebook.sama.gov.sa/en/entiresection/1375
- PDPL Art. 5, 7, 25: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1
- Syntropy: `knowledge/components/index.json` (`ProgressBar`, `Countdown`, `Timer`, `IssuanceStatusBadge (Investor)`); `AGENTS.md` rule 7.
