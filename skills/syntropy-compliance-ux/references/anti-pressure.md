Design guidance only. Confirm wording with Safqah Compliance before release.

# Anti-pressure: 18 banned patterns, the six countdown conditions

Patterns that push people into investing, staying, sharing data or skipping information, mapped to the deceptive.design taxonomy, each with the Safqah-safe way to meet the same goal. Open it before adding urgency, scarcity, social proof, defaults, reminders or exit friction to any screen, and whenever someone asks for one.

## Why this is a compliance topic (verified)

| Source | Point |
| --- | --- |
| CMI Regs Art. 34(d) | "avoid using any undue pressure or making any misleading statements" |
| CMI Regs Art. 5(b)(8), (9) | Clear, fair, not misleading; treat clients fairly and with due regard to their interests |
| CMI Regs Annex 5.1 items 4, 9 | No false or misleading statements; past performance not selected to exaggerate |
| SAMA Advertising Art. 1, 4, 5.1 | No "tempting, misleading or inaccurate methods", no exaggeration; promotions state start and end; no false offers |
| SAMA Fees Guide Art. 4; Rule 8 | Prior approval of all fees; no fee increase after contract |
| PDPL Art. 5, 7, 25 | Explicit withdrawable consent; consent not a condition for unrelated service; clear stop mechanism for marketing |
| ROSCO Art. 6(a)(11)(o) | Retail may cancel within 48 hours or until the offering ends |
| deceptive.design/types | Sneaking, Forced action, Hard to cancel, Preselection, Obstruction, Hidden subscription, Hidden costs, Trick wording, Visual interference, Fake social proof, Fake urgency, Nagging, Fake scarcity, Disguised ads, Confirmshaming, Comparison prevention, Addictive design, Currency confusion |

## The 18 banned patterns

| # | Banned on Safqah | deceptive.design type | Safqah-safe alternative |
| --- | --- | --- | --- |
| B1 | Countdown on a deal CTA or deal card not tied to a real server-side close time | Fake urgency | Real close date as text: «يغلق الطرح 30 أكتوبر 2026». No ticking seconds |
| B2 | Timer that resets on reload, or a "today only" rate | Fake urgency | Rates are fixed by the offering document; never time-boxed in UI |
| B3 | "Only 3 units left", "selling fast", "12 people are viewing" unless computed live from real data | Fake scarcity, Fake social proof | Funded % from the backend: `ProgressBar` Label «نسبة التمويل» Value `78%`, plus «المتبقي 440,000.00 ر.س» |
| B4 | Invented or unverifiable testimonials, investor counts or "X earned Y" tickers | Fake social proof | Defined, dated platform stats with method link (cma.md rule 18). Testimonials only if real, consented and Compliance approved; never about returns |
| B5 | Decline buttons that shame: «لا، لا أريد زيادة أرباحي» | Confirmshaming | Neutral pairs: «ليس الآن» / «السماح», «إلغاء» / «متابعة» |
| B6 | Pre-ticked consents, auto-enrolled auto-invest or auto-reinvest, default amount at the user's maximum limit | Preselection, Hidden subscription | Optional boxes unticked; auto-invest only after an explicit opt-in screen; amount empty or at the minimum |
| B7 | A fee first shown at payment or after | Hidden costs, Sneaking | All fees on the summary before confirm ([fees-and-returns.md](fees-and-returns.md)) |
| B8 | Cash-out harder than deposit: extra screens, retention offers, "are you sure you want to lose your profit?" | Hard to cancel, Obstruction, Confirmshaming | Cash-out in as many steps as deposit; one neutral confirmation with amount, fee and arrival time |
| B9 | Cancelling a subscription only via chat or support | Hard to cancel | In-app «إلغاء الاكتتاب» until the 48-hour or offering-end deadline |
| B10 | Repeated prompts to enable notifications, upgrade to qualified, or invest again after a no | Nagging | At most one re-ask after a meaningful event; the setting lives in settings |
| B11 | Gross large and bold, net small; risk in light grey; "Learn more" styled as plain text | Visual interference | Net is the headline; risk at body size and contrast ([risk-statements.md](risk-statements.md)) |
| B12 | Double negatives or ambiguous toggles («لا تمنعني من استلام العروض») | Trick wording | Positive single-meaning labels: «أرغب في استلام العروض» |
| B13 | Upgrade to qualified framed as unlocking "bigger returns" or VIP status | Trick wording, undue pressure | Factual: what changes (limits, eligible products) and what risk exposure increases |
| B14 | Sponsored deal or partner promotion styled as a neutral recommendation | Disguised ads | Label «إعلان» / «عرض ترويجي»; recommendations say why they match («يناسب المدة التي اخترتها») |
| B15 | Hiding term, fee or risk so deals cannot be compared | Comparison prevention | Every deal card shows the same fields in the same order: rate (annual, net basis stated), term, minimum, funded %, status |
| B16 | Streaks, confetti or gamified rewards for investing more often | Addictive design | Celebrate task completion (KYC done, payout received) quietly; no rewards for frequency |
| B17 | Points, coins or "Safqah credits" that hide the SAR value | Currency confusion | Always show SAR; any credit shows its SAR value beside it |
| B18 | Forcing marketing consent, contacts access, or a referral to proceed | Forced action | Optional means optional; continue works without it (PDPL Art. 7) |

## When a timer is allowed: all six conditions

A countdown is allowed only when **all six** hold. If any fails, use a plain date.

1. It shows a real hold that exists on the server (a reservation that releases units back to the pool, or a payment window that expires).
2. The end time comes from the backend and survives reload and device change.
3. The copy says what happens at zero, honestly: «تنتهي مهلة الدفع خلال 14:59. بعدها يُلغى الحجز ويعود المبلغ المتاح للصفقة». Nothing is lost except the hold.
4. The user can leave or cancel without penalty, and the cancel control is as visible as the pay control.
5. It uses the ReservationTimer components (page 08b: `Countdown`, `Timer`, `Small Timer`, `Collapsed-Reservation`) in a neutral or warning tone, never error red, and never animates the CTA itself.
6. There is no timer on the deal card, the deal list, or the "Invest" entry button.

### ReservationTimer components (page 08b)

| Component | Node | Props | Use within the six conditions |
| --- | --- | --- | --- |
| `Countdown` | 3481:3031 | Has Lable (boolean, spelled as in Figma), Direction=RTL/LTR | Multi-unit days/hours/minutes window, for priority or reservation windows; always add the absolute end time as text («ينتهي الحجز في 15 أكتوبر 2026، 18:00») |
| `Timer` | 3448:8467 | Type=Day/hr/min/sec | One unit inside `Countdown`; group units into one live region |
| `Small Timer` | 3448:8480 | Description (text), Has Icon, Property 1=Black/Yellow/Green | MM:SS chip in checkout or a sticky footer of an active hold; Black normally, Yellow near the end; never red unless the hold failed. Not on deal cards (condition 6) even though the description lists them |
| `Collapsed-Reservation` | 3448:8514 | Headline, Description, Has Multi-deals, Property 1=Default/Variant2 | Sticky bar that keeps an active hold visible; announce release at 00:00 with a next step |
| `Reservation-Calculater` | 3481:3102 | Direction | Hold summary before payment; return read as expected, net beside gross |

All four timer descriptions carry the same compliance note: show only a real reservation window from the server expiry, never fake or reset urgency, and say what happens at 00:00. Accessibility: polite live region, announce at minute granularity.

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

## How to push back on a request for a banned pattern
1. Name the pattern and the one risk in one or two sentences (the rule it breaks, for example CMI Art. 34(d) undue pressure).
2. Offer the Safqah-safe alternative from the table that meets the same goal (conversion, urgency, opt-in).
3. Offer to measure the alternative (funded % visibility, opt-in rate with a good primer) instead of the pressure tactic.
4. If the person insists, do not build it; say it needs written Compliance approval.

## Sources

- Deceptive Patterns, Types of deceptive pattern: https://deceptive.design/types
- CMA, CMI Regs, Art. 5, 34(d), Annex 5.1: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, ROSCO, Art. 6(a)(11)(o): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- SAMA Rulebook, Advertising Art. 1, 4, 5; Fees Guide Art. 4; Rule 8: https://rulebook.sama.gov.sa/en/entiresection/1375
- PDPL Art. 5, 7, 25: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1
- Syntropy page 08b ReservationTimer (`Countdown` 3481:3031, `Timer` 3448:8467, `Small Timer` 3448:8480, `Collapsed-Reservation` 3448:8514, `Reservation-Calculater` 3481:3102); `ProgressBar` 1873:2; `IssuanceStatusBadge (Investor)` 1485:151.
- Full source file: `references/data/ux/compliance/anti-pressure.md`.
