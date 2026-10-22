Design guidance only. Confirm wording with Safqah Compliance before release.

# Open items for Safqah Compliance

Values and decisions the agent must not invent. Use the placeholder in copy, list the item in the handoff under "Open items for Compliance", and keep the default only as a labelled assumption. Owner is Safqah Compliance unless stated.

## Placeholders in copy

| Placeholder | Meaning | Where it appears | Never write instead |
| --- | --- | --- | --- |
| `{licence_no}` | Safqah's CMA licence number | `ComplianceBadge` Type=CMA destination, marketing and landing licence line, footer | A made-up number such as "21-12345" |
| `{committee_name}` | Name of Safqah's Sharia committee | Sharia disclosure view | A scholar's name or "senior scholars" |
| `{decision_ref}` | Sharia committee decision reference for the deal or platform | `ShariaDisclosure` and `ComplianceBadge` Type=Shariah destination | An invented fatwa number |
| `{decision_date}` | Date of that decision | Same | Today's date |
| `{complaint_period}` | Handling period from Safqah's approved complaint policy | Complaint submitted screen and message | "5 working days" (illustration only in the source) |
| `{refund_days}` | Refund period for a failed or cancelled offering | Failed-offering message | A number from memory (ROSCO sets "within 5 days of the end of the offering period"; the backend supplies the date) |
| `{cancel_deadline}` | Exact cancellation date and time for this subscription | Success screen, portfolio row | "within 48 hours" without the real timestamp |
| `{rights_request_period}` | Response period for PDPL data requests | "My data" request confirmation | A guessed period (SDAIA regulations not yet confirmed) |
| `{regulator_complaint_channel}` | Regulator escalation route | Complaint detail view | A URL from memory |

## Decisions pending

| # | Item | Current state in the knowledge base | What the design does meanwhile |
| --- | --- | --- | --- |
| O1 | **Limits regime**: which subscription limits apply under Safqah's current licence | ROSCO Art. 6(a)(11)(f): retail 25,000 SAR per issuer (or sponsor) across outstanding issuances, 100,000 SAR per 12 months across the platform. Safqah product rule: 500,000 SAR payment cap for non-qualified investors, multiples of 1,000. Which applies to whom, and how they combine, depends on the licence | Show the backend-supplied remaining limit and its reason; never print 25,000, 100,000 or 500,000 in copy; design the over-limit error generically («تجاوزت حدك الاستثماري. الحد المتاح {remaining}») |
| O2 | **Fee basis** | 1% of profit (product rule corrected 30 Sep 2026); earlier mock-up flat 3,000.00 SAR incl. VAT | Render the fee line from backend fields: name, basis, amount, VAT, when taken |
| O3 | **VAT on the fee** | Unconfirmed; if 15% applies, Example A becomes fee 245.33, net 21,088.00 | Reserve a VAT line in the breakdown; hide only if the backend says VAT is 0 or included |
| O4 | **Fee label** | Knowledge files: «رسوم الإدارة (1% من الربح)». Calculator component descriptions: «رسوم الوكالة (1% من الربح)» (agency fee) | Use one label app-wide once confirmed; flag the mismatch |
| O5 | **Annualisation method** | Simple (term × 12 ÷ months) gives 15.8%, compounded gives 15.5% for Example A | Pick one with Finance; state it in the breakdown |
| O6 | **Official Arabic risk lines** | R1 to R8 Arabic are draft translations; English R1, R4 follow verified wording | Mark Arabic risk copy as draft |
| O7 | **Early exit** | R6 says you usually cannot withdraw before maturity | Confirm whether any early exit or secondary transfer exists |
| O8 | **Asset-backed issuances for retail** | ROSCO 6(a)(11)(g) forbids; unknown whether Safqah lists any | Design the disabled-with-reason state |
| O9 | **SAMA scope** | Which SAMA provisions bind Safqah directly vs benchmark | Apply as benchmark |
| O10 | **SDAIA implementing regulations** | Not reachable on 15 Oct 2026 | Cite only the PDPL text |
| O11 | **Deal alerts: service or marketing** | Separate opt-in recommended | Own `Switch`, off by default, separate from marketing |
| O12 | **ID images** | PDPL Art. 28 restricts copying ID documents | Use digital verification; ask Compliance which law requires any image |
| O13 | **Credit-bureau checks** | Unknown if used | If used, explicit consent and notification (Art. 24) |
| O14 | **Data retention periods** | Needed to explain deletion limits | Placeholder in the deletion request screen |
| O15 | **Cash-out fee** | Glossary: 2% on amounts deposited by electronic payment | Show from backend before confirm; confirm current rule |
| O16 | **Zakat assumptions** | Any zakat copy must state the assumed rate | Do not show zakat figures without an approved rate and source |
| O17 | **Testimonials policy** | Only real, consented, Compliance approved, never about returns | Leave out until approved |
| O18 | **numbers-currency example** | Shows Example B as «13.75%»; one-decimal rule displays 13.8% | Use 13.8%; flag to the content owner |

## How to list them in a handoff

```
Open items for Compliance
- O1 limits regime: amount step shows backend remaining limit; confirm which caps apply to retail vs qualified.
- O3 VAT on fee: summary has a VAT row; confirm rate and whether included.
- {licence_no}, {decision_ref}, {decision_date}: placeholders in ComplianceBadge destinations.
```

## Sources

- `references/data/ux/compliance/cma.md` (open items, limits), `fees-returns.md` (fee basis, VAT, method, rounding note), `risk-statements.md` (draft Arabic, R6), `sama-consumer-protection.md` (complaint period, scope), `pdpl-consent.md` (SDAIA, Art. 24, 28), `sharia-disclosure.md` (placeholders).
- `references/data/components-index.json` and component descriptions (Calculator fee label).
- `references/data/content/glossary.md` (cash-out fee), `references/data/content/numbers-currency.md`.
