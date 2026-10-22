Design guidance only. Confirm wording with Safqah Compliance before release.

# Compliance UX for Safqah

What a Safqah screen and its copy must do so that it respects the Saudi rules that govern an investment platform: CMA capital-market rules, SAMA consumer-protection rules at payment touchpoints, the Personal Data Protection Law (PDPL), and Sharia governance. Read this folder before you design, write copy for, or review any screen that shows a deal, takes money, collects personal data, or sends a notification.

This is design guidance, not legal advice. It tells you what the interface must make possible (show, ask, record, let the user undo). The exact legal wording, limits and periods are owned by Safqah Compliance and Legal and can change; the backend is the source of truth for every limit and rate.

## How the rules reach Safqah (scope, read once)

| Regime | Who it binds | What it means for the UI |
| --- | --- | --- |
| CMA, Rules on the Offer of Securities and Continuing Obligations (ROSCO), Article 6(a)(11): debt instruments offered through a securities crowdfunding platform by a capital market institution licensed for "arranging" | The platform (capital market institution) and the issuer | Offering document access, retail subscription limits, 48-hour cancellation, refund if the offering fails, issuance status and overdue disclosure. See [cma.md](cma.md). |
| CMA, Capital Market Institutions Regulations (CMI Regs) | The platform as a capital market institution | Clear, fair and not misleading communication, client classification (retail / qualified / institutional), know-your-client, understanding risk, suitability, fees disclosed in advance, complaints, advertisement content (Annex 5.1). |
| CMA, Instructions for Shariah Governance in Capital Market Institutions | Institutions that offer Sharia-compliant products | What "Sharia compliant" means (decisions of the institution's Sharia committee) and what is disclosed. See [sharia-disclosure.md](sharia-disclosure.md). |
| SAMA, Financial Consumer Protection Principles and Rules; Guide to Financial Institutions Services Fees; Rules for Advertising | SAMA-supervised institutions (banks, payment and finance companies). Safqah's payment partners are in scope; Safqah is a CMA-licensed institution | Use as the Saudi benchmark for fair treatment, fee consent, plain Arabic terms, complaint access and records. See [sama-consumer-protection.md](sama-consumer-protection.md). Which SAMA rules bind Safqah directly is a Compliance call. |
| PDPL (Royal Decree M/19, amended by M/148) and its implementing regulations | Safqah as a data controller | Purpose notice, privacy policy at collection, explicit consent that can be withdrawn, consent never a condition for unrelated service, marketing opt-in and opt-out. See [pdpl-consent.md](pdpl-consent.md). |
| CMA Investment Funds Regulations and Real Estate Investment Funds Regulations | Fund managers | Only if Safqah shows a fund product. Useful benchmark for performance and "no guaranteed profit" wording. |

## Obligation map: screen by screen

Each row lists what the screen must do. Follow the link for the rule, the copy and the components.

| Screen | Must do | Files |
| --- | --- | --- |
| Deal page | Offering summary, issuer identity, use of proceeds, term, payment schedule, guarantees (only if real), main risks visible before the CTA, link to the full offering document and valuation reports, Sharia and CMA statements with a working "Learn more", projected (not promised) return labelled net or gross, funded % as fact | [cma.md](cma.md), [risk-statements.md](risk-statements.md), [fees-returns.md](fees-returns.md), [sharia-disclosure.md](sharia-disclosure.md), [anti-pressure.md](anti-pressure.md) |
| Invest / reserve (amount, summary, confirm) | Show the user's remaining limit for their classification, fees before commitment, net projected result, risk line next to the confirm button, unticked acknowledgements for offering document and evaluation policy, the 48-hour cancellation right, honest reservation timer only when a real hold exists | [cma.md](cma.md), [fees-returns.md](fees-returns.md), [risk-statements.md](risk-statements.md), [anti-pressure.md](anti-pressure.md), [sama-consumer-protection.md](sama-consumer-protection.md) |
| Payment | Exact amount and every fee (with VAT) before the user authorises, no fee added after, receipt with reference number, failed-offering refund promise in plain words | [sama-consumer-protection.md](sama-consumer-protection.md), [fees-returns.md](fees-returns.md) |
| KYC and onboarding | Purpose notice before collecting each data group, privacy policy link at the point of collection, mandatory vs optional marked, separate consents, classification result explained (retail / qualified) and how to upgrade, refusal consequences stated | [pdpl-consent.md](pdpl-consent.md), [cma.md](cma.md) |
| Qualified-investor upgrade | Explain what changes (limits, products) and what protections change, evidence requested and why, no pressure to upgrade to invest more | [cma.md](cma.md), [anti-pressure.md](anti-pressure.md), [pdpl-consent.md](pdpl-consent.md) |
| Wallet and cash-out | Cash-out as easy as deposit, any cash-out fee shown before confirm, no confirmshaming or "are you sure" walls, timeline to the bank stated | [anti-pressure.md](anti-pressure.md), [sama-consumer-protection.md](sama-consumer-protection.md), [fees-returns.md](fees-returns.md) |
| Portfolio | Realised vs expected split, net of fees, statuses shown honestly (late, defaulted, in recovery) with the right tone, cancellation window visible on fresh subscriptions | [fees-returns.md](fees-returns.md), [risk-statements.md](risk-statements.md), [cma.md](cma.md) |
| Payouts | Actual amount received vs scheduled, fee line, late or partial payments named plainly, no "profit" wording on returned capital | [fees-returns.md](fees-returns.md), [risk-statements.md](risk-statements.md) |
| Notifications and permissions | Primer before the OS prompt, marketing separate from service messages, per-channel opt-out that is honoured, purpose of every OTP message | [pdpl-consent.md](pdpl-consent.md), [sama-consumer-protection.md](sama-consumer-protection.md), [anti-pressure.md](anti-pressure.md) |
| Marketing / landing | Name and regulatory status, no guaranteed returns, past performance only with source, period and the "past performance" warning, platform stats defined and dated, platform overdue rate, no fake scarcity | [cma.md](cma.md), [anti-pressure.md](anti-pressure.md), [risk-statements.md](risk-statements.md) |
| Complaints and help | Entry point reachable from every money screen, reference number on submission, escalation path to the regulator | [sama-consumer-protection.md](sama-consumer-protection.md) |
| Back-office | Show the evidence trail: classification record, consent log with timestamp and version, acceptance records, complaint reference and history; never let staff edit a user's consent on their behalf without a logged request | [pdpl-consent.md](pdpl-consent.md), [sama-consumer-protection.md](sama-consumer-protection.md), [cma.md](cma.md) |

## Rules

1. Every limit, rate, fee and period on screen comes from the backend for the signed-in user, never a hardcoded number in copy. Why: limits differ by client classification and change with regulation.
2. When a rule in this folder and a Compliance-approved string disagree, use the Compliance string and flag the difference. Why: Compliance owns the wording.
3. Run [review-checklist.md](review-checklist.md) on every money or data screen before handoff. Why: one pass catches most misses.
4. Do not invent article numbers, licence numbers, Sharia decision numbers or regulator names in copy. Use placeholders such as `{licence_no}` until Compliance supplies them. Why: a wrong citation is itself misleading.

## Files

| File | Covers |
| --- | --- |
| [cma.md](cma.md) | Offering disclosure, retail vs qualified limits, suitability, no guarantee language, projected vs realised, claims and stats |
| [sama-consumer-protection.md](sama-consumer-protection.md) | Fair treatment, fee disclosure and consent, plain Arabic terms, complaints, cancellation, records |
| [pdpl-consent.md](pdpl-consent.md) | Consent capture and withdrawal, purpose notice, privacy policy, data rights, notification preferences, permission primers |
| [sharia-disclosure.md](sharia-disclosure.md) | Sharia statement placement, `ComplianceBadge` and `ShariaDisclosure`, wording limits |
| [risk-statements.md](risk-statements.md) | Placement of risk, standard risk lines, defaulted and in-recovery states, tone rules |
| [fees-returns.md](fees-returns.md) | Net vs gross, projected vs realised, worked fee example, annualised vs total, rounding |
| [anti-pressure.md](anti-pressure.md) | Banned deceptive patterns mapped to deceptive.design types, safe alternatives |
| [review-checklist.md](review-checklist.md) | The checklist to run |

## Sources

- CMA, Rules on the Offer of Securities and Continuing Obligations, amended by Board Resolution 1-94-2025 dated 1/9/2025: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- CMA news, "The CMA Allows Crowdfunding of Debt Instruments through Capital Market Institutions Licensed for Arranging Activities", 8/9/2025: https://cma.gov.sa/en/MediaCenter/NEWS/Pages/CMA_N_3862.aspx
- CMA, Capital Market Institutions Regulations, amended 1/9/2025: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, Instructions for Shariah Governance in Capital Market Institutions, Resolution 3-77-2022: https://cma.gov.sa/en/RulesRegulations/Regulations/Documents/The_Instructions_for_Shariah_Governance_in_Capital_Market_InstitutionsEN.pdf
- CMA regulations library: https://cma.gov.sa/en/RulesRegulations/Regulations/Pages/default.aspx
- SAMA Rulebook, Consumer Protection and Financial Conduct: https://rulebook.sama.gov.sa/en/entiresection/1375
- PDPL, Bureau of Experts: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1
- Deceptive Patterns taxonomy: https://deceptive.design/types
- Syntropy components: `knowledge/components/index.json`, `knowledge/components/sharia-cma-disclosure.md`
