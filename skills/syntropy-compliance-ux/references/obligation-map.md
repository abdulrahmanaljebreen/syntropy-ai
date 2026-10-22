Design guidance only. Confirm wording with Safqah Compliance before release.

# Obligation map: which rules apply to which screen

Open this first. Find the screen type, read its row, then open the rule files it names. A screen can match several rows (an invest summary inside a `BottomSheet` is both "Invest" and "Payment" if it authorises money).

## How the rules reach Safqah (scope)

| Regime | Who it binds | What it means for the UI | File |
| --- | --- | --- | --- |
| CMA, Rules on the Offer of Securities and Continuing Obligations (ROSCO), Art. 6(a)(11): debt instruments offered through a securities crowdfunding platform by a capital market institution licensed for "arranging" | The platform and the issuer | Offering document access, retail subscription limits, 48-hour cancellation, refund if the offering fails, issuance status and overdue disclosure | [cma.md](cma.md) |
| CMA, Capital Market Institutions Regulations (CMI Regs) | The platform as a capital market institution | Clear, fair and not misleading communication; client classification (retail / qualified / institutional); know-your-client; understanding risk; suitability; fees disclosed in advance; complaints; advertisement content (Annex 5.1) | [cma.md](cma.md) |
| CMA, Instructions for Shariah Governance in Capital Market Institutions | Institutions offering Sharia-compliant products | "Sharia compliant" means compliant with the institution's Sharia committee decisions; what is disclosed | [sharia.md](sharia.md) |
| SAMA, Financial Consumer Protection Principles and Rules; Guide to Financial Institutions Services Fees; Rules for Advertising | SAMA-supervised institutions (banks, payment and finance companies). Safqah's payment partners are in scope; Safqah is CMA-licensed | Saudi benchmark for fair treatment, fee consent, plain Arabic terms, complaints, records. Which SAMA rules bind Safqah directly is a Compliance call | [sama.md](sama.md) |
| PDPL (Royal Decree M/19, amended by M/148) and its implementing regulations | Safqah as data controller | Purpose notice, privacy policy at collection, explicit withdrawable consent, consent never a condition for unrelated service, marketing opt-in and opt-out | [pdpl-consent.md](pdpl-consent.md) |
| CMA Investment Funds Regulations and Real Estate Investment Funds Regulations | Fund managers | Only if Safqah shows a fund product. Benchmark for net performance and "no guaranteed profit" wording | [fees-and-returns.md](fees-and-returns.md), [risk-statements.md](risk-statements.md) |

## Screen by screen

| Screen | Must do | Rule files | Checklist sections | Typical components |
| --- | --- | --- | --- | --- |
| Deal page | Offer summary (issuer, instrument, size, use of proceeds, term, schedule, minimum, close date); issuer section; guarantees only if real; main risks visible before the CTA and a «المخاطر» section; offering document and valuation reports reachable without starting to invest; one `ShariaDisclosure` with a working «إعرف أكثر»; return labelled expected, annual, net or gross; funded % and remaining amount as fact; close date as text, no countdown on the card or entry CTA; platform overdue disclosure link | cma, risk-statements, fees-and-returns, sharia, anti-pressure | A, B | `ShariaDisclosure`, `KeyValue`, `ProgressBar`, `Accordion`, `ListItem`, `Link`, `IssuanceStatusBadge (Investor)`, `Button` |
| Invest / reserve (amount, summary, confirm) | User's remaining limit for their classification (backend); over-limit error with the limit, reason and one path forward; every fee with basis and VAT before confirm; net expected result as headline; R1 directly above the confirm `Button`; separate unticked acknowledgements (offering document, evaluation policy, unsuitability if flagged); confirm label names commitment and amount; 48-hour cancellation right; reservation timer only when a real hold exists (six conditions) | cma, fees-and-returns, risk-statements, anti-pressure, sama | A, C | `BottomSheet`, `Sheet Content / Summary`, `KeyValue`, `Calculator / Results card`, `Checkbox`, `ComplianceBadge`, `Countdown`, `Small Timer`, `Collapsed-Reservation`, `Input Helper Text`, `Button` |
| Payment | Exact amount and every fee (with VAT) before authorising; no fee added after; purpose-stated OTP; receipt with reference number, amount, date, next step; failed-offering refund promise in plain words | sama, fees-and-returns | A, C (C10, C11), E7 | `KeyValue`, `OTPInput`, `Alert`, `Button` |
| KYC and onboarding | Purpose notice and «سياسة الخصوصية» before each data group; mandatory vs optional marked; consequence of refusing stated; separate optional consents; legal-basis processing explained, not a fake choice; digital verification preferred over ID photos; classification result explained and how to upgrade | pdpl-consent, cma | A, D, E | `Form Field Helper`, `Link`, `Checkbox`, `Switch`, `AbshirLogo`, `KYCChecklist` |
| Qualified-investor upgrade | What changes (limits, eligible products) and the added risk exposure; evidence requested and why; never a reward or "bigger returns"; no nagging after a no | cma, anti-pressure, pdpl-consent | A, D (D5) | `KeyValue`, `List`, `Button` |
| Wallet and cash-out | Cash-out in no more steps than deposit; any cash-out fee before confirm; one neutral confirmation (amount, fee, arrival time); no retention offers or confirmshaming | anti-pressure, sama, fees-and-returns | A, F (F1, F2) | `BottomSheet`, `KeyValue`, `Button` |
| Portfolio | Received vs expected separated, net of fees; capital vs profit separated; late, defaulted, in recovery shown honestly with the right tone; defaulted deals included in totals; cancellation window and in-app cancel on fresh subscriptions | fees-and-returns, risk-statements, cma | A, F | `ReturnsDisplay` (relabel), `IssuanceStatusBadge (Investor)`, `StatusPill`, `Banner`, `Button` |
| Payouts | Actual received vs scheduled; fee line; late or partial named plainly; returned capital never called profit | fees-and-returns, risk-statements | A, F | `Payouts cell`, `KeyValue`, `Alert` |
| Notifications and permissions | Primer before every OS prompt, at the moment of need, equal «السماح» / «ليس الآن»; marketing separate from service messages per channel; preferences honoured everywhere; one-tap stop on every marketing message; OTP purpose | pdpl-consent, sama, anti-pressure | A, E | `BottomSheet`, `Switch`, `ActionList`, `ListItem`, `Form Field Helper`, `Toast`, `Button` |
| Marketing / landing | Safqah name and CMA authorisation line with `{licence_no}`; no guaranteed returns; past performance only with source, period, R4 and at least one year; stats defined and dated, net, including defaults; platform 90-day overdue rate with as-of date; promotions with start and end; no fake scarcity, fake social proof, disguised ads | cma, anti-pressure, risk-statements | A, G | `ComplianceBadge` Type=CMA, `Stat`, `Link` |
| Complaints and help | Entry point reachable in one tap from every money screen and the receipt; reference number and handling period on submit; status, history and escalation to the regulator; human route one tap from any bot | sama | A6, H4 | `Menu`, `ListItem`, `KeyValue`, `Alert` |
| Terms, documents, "My data" | Plain Arabic terms, key terms summarised before acknowledgement; changes announced 30 days ahead; documents-accepted list; view, download, correct, delete data, manage consents, each with reference and period | sama, pdpl-consent | H | `Accordion`, `KeyValue`, `Banner`, `ActionList`, `ListItem` |
| Back-office | Evidence trail read-only: classification record, consent log (purpose, wording version, timestamp, channel), acceptance records, complaint reference and history; staff cannot change a user's consent without a logged request | pdpl-consent, sama, cma | H6 | `Table / Cell`, `KeyValue`, `Tag` |

## Rules that apply on every row

1. Every limit, rate, fee and period on screen comes from the backend for the signed-in user, never a number typed into copy. Why: limits differ by classification and change with regulation.
2. When a rule here and a Compliance-approved string disagree, use the Compliance string and flag the difference. Why: Compliance owns the wording.
3. Run [review-checklist.md](review-checklist.md) on every money or data screen before handoff. Why: one pass catches most misses.
4. Never invent article numbers, licence numbers, Sharia decision numbers or regulator names in copy. Use placeholders (`{licence_no}`, `{decision_ref}`, `{decision_date}`) and list them in [open-items.md](open-items.md). Why: a wrong citation is itself misleading.

## Sources

- CMA, ROSCO, amended by Board Resolution 1-94-2025 dated 1/9/2025: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- CMA news, debt-instrument crowdfunding through institutions licensed for arranging, 8/9/2025: https://cma.gov.sa/en/MediaCenter/NEWS/Pages/CMA_N_3862.aspx
- CMA, Capital Market Institutions Regulations, amended 1/9/2025: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, Instructions for Shariah Governance in Capital Market Institutions, Resolution 3-77-2022: https://cma.gov.sa/en/RulesRegulations/Regulations/Documents/The_Instructions_for_Shariah_Governance_in_Capital_Market_InstitutionsEN.pdf
- SAMA Rulebook, Consumer Protection and Financial Conduct: https://rulebook.sama.gov.sa/en/entiresection/1375
- PDPL, Bureau of Experts: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1
- Deceptive Patterns taxonomy: https://deceptive.design/types
- Full source file: `references/data/ux/compliance/README.md`. Components: `references/data/components-index.json`.
