Design guidance only. Confirm wording with Safqah Compliance before release.

# Compliance review checklist (A to H)

Run on any Safqah screen or flow that shows a deal, moves money, collects personal data, asks for consent or sends a message. Each item is pass / fail / not applicable. Any fail on a money or data screen blocks handoff until fixed or signed off by Compliance.

## How to run it
1. Identify the screen type in [obligation-map.md](obligation-map.md).
2. Run section A (always) and every section that applies.
3. Record each fail with the item id, the screen and the fix, linking the rule file.
4. Report in the format at the end; never tick the sign-off line yourself.

## A. Always
- [ ] A1 No em dash, Western digits, currency after the amount (`1,250.00 ر.س`), Arabic first.
- [ ] A2 No hardcoded limit, rate, fee or period in copy; values come from the backend.
- [ ] A3 No invented licence numbers, Sharia decision references or article numbers; placeholders where Compliance must supply them.
- [ ] A4 Real Syntropy components with exact names and variant values.
- [ ] A5 Clear, fair and not misleading: nothing a reasonable user would read as a promise ([cma.md](cma.md)).
- [ ] A6 Help and complaints reachable in one tap from any money screen ([sama.md](sama.md)).

## B. Deal page
- [ ] B1 Offer summary visible: issuer, instrument, size, use of proceeds, term, schedule, minimum, close date.
- [ ] B2 Offering document and valuation reports reachable without starting an investment.
- [ ] B3 Issuer information section present.
- [ ] B4 Guarantee wording only for a Compliance-confirmed enforceable guarantee, with its terms.
- [ ] B5 «المخاطر» section with the deal's main risks; risk line near the CTA ([risk-statements.md](risk-statements.md)).
- [ ] B6 Rate labelled expected, annual, net or gross; «نسبة» on percentage labels.
- [ ] B7 One `ShariaDisclosure`; its «إعرف أكثر» opens the real decision ([sharia.md](sharia.md)).
- [ ] B8 Scarcity only as funded % and remaining amount; close date as text; no countdown ([anti-pressure.md](anti-pressure.md)).

## C. Invest, reserve, payment
- [ ] C1 Remaining limit shown for the user's classification; over-limit error states the limit and one path forward.
- [ ] C2 Every fee, with basis and VAT, visible on the summary before the confirm button.
- [ ] C3 Headline profit and rate are net; gross only secondary; breakdown shows the derivation ([fees-and-returns.md](fees-and-returns.md)).
- [ ] C4 Money at 2 decimals, percentages at 1 decimal, computed from unrounded values.
- [ ] C5 Risk line directly above the confirm `Button`, same size and contrast as body text.
- [ ] C6 Acknowledgements (offering document, evaluation policy, unsuitability if flagged) separate, unticked, each linked.
- [ ] C7 Confirm button names the commitment and amount.
- [ ] C8 Cancellation right and real deadline on success and on the portfolio row, with an in-app cancel action.
- [ ] C9 Any timer meets all six conditions in [anti-pressure.md](anti-pressure.md); otherwise removed.
- [ ] C10 Receipt with reference number, amount, date and next step; matching message sent.
- [ ] C11 No fee appears for the first time on the payment provider page or the receipt.

## D. KYC, onboarding, qualified upgrade
- [ ] D1 Purpose notice and «سياسة الخصوصية» link before each data group ([pdpl-consent.md](pdpl-consent.md)).
- [ ] D2 Mandatory and optional fields marked; consequence of not providing mandatory data stated.
- [ ] D3 Third-party recipients and processing outside the Kingdom disclosed in the notice or policy.
- [ ] D4 ID images only where a law requires it; digital verification preferred.
- [ ] D5 Classification result explained; upgrade screen factual, states what changes and the added risk exposure.
- [ ] D6 Legal-basis processing (KYC, AML) explained, not presented as optional consent.

## E. Consent, notifications, permissions
- [ ] E1 One consent per purpose; nothing pre-ticked; continue works without optional consents.
- [ ] E2 Every consent withdrawable in settings in no more steps than giving it; effect confirmed on screen.
- [ ] E3 Service separated from marketing, per channel; marketing preferences honoured across all campaigns.
- [ ] E4 Every marketing message has a one-tap stop route.
- [ ] E5 Primer before every OS permission prompt, at the moment of need, with equal «السماح» / «ليس الآن».
- [ ] E6 "Not now" respected: no repeat in the session, at most one later re-ask.
- [ ] E7 OTP messages and screens state the purpose.
- [ ] E8 Consent and acceptance events logged with wording version and timestamp.

## F. Wallet, cash-out, portfolio, payouts
- [ ] F1 Cash-out takes no more steps than deposit; one neutral confirmation with amount, fee, arrival time.
- [ ] F2 No retention offers, shaming or extra walls on cash-out or cancel.
- [ ] F3 Realised and expected separate; capital separate from profit.
- [ ] F4 Late and partially repaid in warning tone; defaulted and written off in error tone; status words verbatim; never colour alone.
- [ ] F5 Late or defaulted deals show due vs received, the recovery step and its date; no original projection shown as expected profit.
- [ ] F6 Defaulted deals included in totals and stats.

## G. Marketing and landing
- [ ] G1 Safqah name and CMA authorisation line with licence number (`{licence_no}` until supplied).
- [ ] G2 No "guaranteed", "fixed", "safe", «مضمون», «آمن» about returns.
- [ ] G3 Stats defined, dated, sourced, with method link; averages net and including defaults.
- [ ] G4 Past performance carries R4 and covers at least one year.
- [ ] G5 Platform 90-day overdue rate reachable with as-of date.
- [ ] G6 Promotions state start and end dates and how to benefit; "free" only when truly free, for whom.
- [ ] G7 No fake scarcity, fake social proof, disguised ads, or testimonials about returns.

## H. Terms, changes, complaints, records
- [ ] H1 Arabic terms in plain language; key terms summarised before acknowledgement; legal text one tap away; body text at least 14 px equivalent.
- [ ] H2 Terms changes announced at least 30 days ahead with what changed and how to object or exit.
- [ ] H3 Material offering-document changes notified with the right to cancel or amend.
- [ ] H4 Complaint submission returns a reference number and handling period; detail shows status, history and escalation to the regulator.
- [ ] H5 "My data": view, download, correct, delete, manage consents; each request gets a reference and period.
- [ ] H6 Back-office shows classification record, consent log, acceptance records and complaint history read-only, with every staff change logged.

## Report format

```
Compliance pre-check (design guidance, not legal advice)
Screen: <name> · Type: <row in obligation map> · Sections run: A, C, ...
Fails:
- C5 Risk line is 12 px text/subtle under the fold → move R1 directly above the confirm Button at body size, text/muted. (risk-statements.md rule 1-2)
Passes: <ids> · N/A: <ids>
Open items for Compliance: <ids from open-items.md>
Compliance review: {reviewer} · {date} · items failed: {ids} · approved strings version: {version}
```

## Sources

- Rule files in this folder: [cma.md](cma.md), [sama.md](sama.md), [pdpl-consent.md](pdpl-consent.md), [sharia.md](sharia.md), [risk-statements.md](risk-statements.md), [fees-and-returns.md](fees-and-returns.md), [anti-pressure.md](anti-pressure.md).
- CMA regulations library: https://cma.gov.sa/en/RulesRegulations/Regulations/Pages/default.aspx
- SAMA Rulebook: https://rulebook.sama.gov.sa/en/entiresection/1375
- PDPL: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1
- Deceptive Patterns: https://deceptive.design/types
- Full source file: `references/data/ux/compliance/review-checklist.md`.
