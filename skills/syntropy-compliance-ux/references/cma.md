Design guidance only. Confirm wording with Safqah Compliance before release.

# CMA rules on deal, invest and marketing screens

What the Capital Market Authority's rules mean for screens that present or sell a debt instrument (sukuk) on Safqah: deal page, invest flow, qualified-investor upgrade, portfolio, marketing. Open it for any of these.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| ROSCO Art. 6(a)(11)(f) | Each **retail** client's subscriptions "shall not exceed (SR 25,000)" across outstanding issuances of one issuer (or sponsor) on the platform, "with a maximum of one hundred thousand Saudi riyals within twelve months" across all debt issuances on the platform |
| ROSCO Art. 6(a)(11)(g) | Retail clients may not subscribe to asset-backed debt instruments through the platform |
| ROSCO Art. 6(a)(11)(h) | Offering document (Annex 1(A)) available to registered clients on the website at least five days before the offering starts |
| ROSCO Art. 6(a)(11)(j), (k) | Evaluation procedures and policies available to clients, updates notified immediately, client's declaration that they reviewed them obtained **before** subscribing |
| ROSCO Art. 6(a)(11)(n) | Offering period at most 45 days; if not completed, subscriptions returned "without imposing any fees" within 5 days of the end of the offering period |
| ROSCO Art. 6(a)(11)(o) | A retail client may cancel "within (48) hours from the time of submitting the subscription application or until the end of the offering period (whichever comes first)", and is told immediately when the offering completes or is cancelled |
| ROSCO Art. 6(a)(11)(p) | After a material change to the offering document, subscribers are notified immediately and may cancel or amend before the offering ends |
| ROSCO Art. 6(a)(11)(q), (r), (s) | Website discloses each issuance's status and payment status against schedule, and the percentage of payments overdue 90 consecutive days with actions taken, updated at least monthly |
| ROSCO Annex 1(A) | Offering document fair and not misleading, opens with a disclaimer, covers offer summary, use of proceeds, minimum, breach events and remedies, early redemption, repayment dates, guarantees (if any), pricing, audited financials (if any), issuer background, expenses, related parties, risks and lawsuits, planning approvals, two accredited valuation reports, and a closing statement that the investment "entails high risks" and may lead to "loss of entire investment amount" |
| CMI Regs Art. 5(b)(8), (9), (11) | Communicate "in a way, which is clear, fair and not misleading"; treat clients fairly; reasonable care on suitability |
| CMI Regs Art. 36 | Classify each client as retail, qualified or institutional (one only) and keep a supporting record |
| CMI Regs Art. 39 | Collect financial situation, experience and objectives before services; if refused, no business |
| CMI Regs Art. 42, 43 | Client understands the nature of the risks; transactions suitable; a client insisting on an unsuitable transaction is told and acknowledges it |
| CMI Regs Art. 46 | "Fees and commission ... must be fully disclosed in advance of providing any services" |
| CMI Regs Art. 34(d) | Avoid "undue pressure" and misleading statements |
| CMI Regs Annex 5.1 | Ads: clear purpose; forecasts fair with assumptions stated; no false statements; name, address and "authorised by the Authority"; never "guaranteed" unless a legally enforceable third-party guarantee exists (with details); fair comparisons; past performance fair, not cherry-picked, sourced, verifiable, with "not necessarily a guide to future performance"; zakat assumptions stated; cancellation rights stated; value may fall and the investor "may get back less than he invested" |

## Rules

### Offering disclosure on the deal page
1. Above the fold or in the first scroll: issuer name, instrument type, total offering size, use of proceeds, term, payment schedule, minimum subscription, offering period and close date. Use `KeyValue` rows. Why: Annex 1(A) section 1.
2. A persistent "Offering document" entry (`Link`, or `ListItem` with a document icon) on the deal page and the invest summary, opening the full PDF plus valuation reports. Never gated behind starting an investment. Why: ROSCO 6(a)(11)(h).
3. Issuer information as a section, not a `Tooltip`: legal name, CR number, incorporation date, nature of business. Why: Annex 1(A) section 4.
4. Guarantees and collateral only with real terms (type, guarantor, coverage basis, valuation date). «ضمان» / "guarantee" only for a legally enforceable arrangement Compliance confirmed. Why: CMI Annex 5.1 item 6.
5. Main risks before the CTA (see [risk-statements.md](risk-statements.md)). Why: Annex 1(A) section 9, CMI Art. 42.
6. Issuance-status and 90-day overdue disclosure reachable (deal page footer link, landing, portfolio). Why: ROSCO 6(a)(11)(q), (r).

### Classification, limits and suitability
7. Show the user's classification and remaining limit on the amount step, from the backend: «المتبقي من حدك الاستثماري 15,000.00 ر.س». Never hardcode 25,000, 100,000 or 500,000 in copy. Why: limits depend on classification and regime; ROSCO sets retail limits and Safqah also applies a 500,000 SAR product payment cap for non-qualified investors. Which applies to whom is an open item ([open-items.md](open-items.md)).
8. Over a limit: block with an inline `Input Helper Text` error that states the limit and the reason, plus one path forward (lower the amount, or learn about the qualified upgrade). Never a dead end. Why: fair treatment and clarity.
9. Deals a retail user may not buy (asset-backed for retail): hide or disable with a short reason, never a silent disappearance. Why: ROSCO 6(a)(11)(g).
10. The qualified upgrade states what changes (limits, eligible products) and that the user takes on more risk exposure. Never a reward. Why: suitability, CMI Art. 34(d).
11. Backend flags unsuitable: show the reason and require an explicit acknowledgement before continuing. Why: CMI Art. 43(e).
12. Before the first subscription: evaluation-policy acknowledgement as an unticked `Checkbox` with a link, recorded with a timestamp. Why: ROSCO 6(a)(11)(k).

### Cancellation and changes
13. After a retail subscription: the cancellation deadline as a real date and time on the success screen and portfolio row, with «إلغاء الاكتتاب» until it passes: «يمكنك إلغاء الاكتتاب حتى 17 أكتوبر 2026، 14:30». Why: ROSCO 6(a)(11)(o).
14. Offering completes, fails or is cancelled: notify immediately. Failed offering: amount returns in full, no fees, within the stated period. Why: ROSCO 6(a)(11)(n), (o).
15. Material change to the offering document: notify subscribers and show a `Banner` Tone=info on deal and portfolio with what changed and the right to cancel or amend. Why: ROSCO 6(a)(11)(p).

### Returns and claims
16. A deal rate is «متوقع» / "expected" until paid. Never "guaranteed", "fixed", "secured", «مضمون», «ثابت» for returns. Why: CMI Annex 5.1 items 3, 6; REIF Annex 1 item 7(b) benchmark.
17. Realised and expected separate on portfolio and payouts ([fees-and-returns.md](fees-and-returns.md)). Why: clear, fair, not misleading.
18. Any platform stat (total funded, investors, average return, repayment rate) shows definition, period, as-of date and a method link. Average returns net of fees and including defaulted deals. Why: CMI Annex 5.1 item 9.
19. Past performance carries «الأداء السابق لا يعد بالضرورة مؤشراً على الأداء المستقبلي». Why: Annex 5.1 item 9(5).
20. Marketing states Safqah's name and CMA authorisation with `{licence_no}`. Why: Annex 5.1 item 5.
21. Zakat impact copy states the assumed rate and that it may change. Why: Annex 5.1 item 10.

## Examples

| Do | Don't |
| --- | --- |
| «نسبة العائد المتوقع 16.0% سنوياً» | «عائد مضمون 16%» |
| «صافي الربح المتوقع 21,120.00 ر.س بعد الرسوم» | «اربح 21,333 ر.س» (gross, rounded, no "expected") |
| "Expected annual return 16.0%" / "Net expected profit 21,120.00 SAR after fees" | "Fixed 16% return" / "Earn 21,333 SAR" |
| «تجاوزت حدك الاستثماري لهذه الصفقة. الحد المتاح 10,000.00 ر.س» | «لا يمكن إتمام العملية» (no reason) |
| "This exceeds your limit for this deal. Available: 10,000.00 SAR" | "Upgrade now to unlock bigger returns!" |
| «تم تمويل 1.2 مليار ر.س منذ 2020 حتى 30 سبتمبر 2026 · نسبة التعثر 2.1%» + «كيف نحسبها» | «أكثر من مليار ريال أرباح للمستثمرين» (undefined, undated) |
| "SAR 1.2bn funded, 2020 to 30 Sep 2026 · Overdue 90+ days: 2.1%" | "Zero defaults!" when defaulted deals were excluded |
| «تم الاكتتاب. يمكنك الإلغاء حتى 17 أكتوبر 2026، 14:30» + `Button` Variant=secondary «إلغاء الاكتتاب» | Cancellation only via a support chat; deadline hidden in terms |

Values in examples (15,000.00, 10,000.00, 1.2 مليار, 2.1%, dates) are illustrations; real values come from the backend.

## Open items (see open-items.md)
- Which limits apply under Safqah's current licence (ROSCO retail limits vs the 500,000 SAR product cap) and how they combine.
- Licence number and the exact regulatory status line.
- Whether any asset-backed issuance is offered to retail users.

## Sources

- CMA, ROSCO (unofficial English translation; Arabic is official), Resolution 3-123-2017, amended by Resolution 1-94-2025 dated 1/9/2025, Art. 6(a)(11), Annex 1(A): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- CMA news, 8/9/2025: https://cma.gov.sa/en/MediaCenter/NEWS/Pages/CMA_N_3862.aspx
- CMA, CMI Regs, amended 1/9/2025, Art. 5, 34, 36, 39, 42, 43, 46, Annex 5.1: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, Real Estate Investment Funds Regulations, Resolution 1-54-2025 dated 21/5/2025, Annex 1 item 7(b): https://cma.gov.sa/en/RulesRegulations/Regulations/Documents/Real_Estate_Investment_Funds_Regulations_2025_EN.pdf
- CMA, Investment Funds Regulations, amended 21/5/2025, Art. 72: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/Investment_Funds_Regulations_2025_EN.pdf
- Safqah product rule: 500,000 SAR payment cap for non-qualified investors; qualified-investor upgrade flow.
- Full source file: `references/data/ux/compliance/cma.md`.
