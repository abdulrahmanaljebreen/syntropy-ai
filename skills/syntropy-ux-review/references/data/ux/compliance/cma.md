Design guidance only. Confirm wording with Safqah Compliance before release.

# CMA rules on deal, invest and marketing screens

What the Capital Market Authority's rules mean for screens that present or sell a debt instrument (sukuk) on Safqah: the deal page, the invest flow, the qualified-investor upgrade, the portfolio and any marketing surface. Read it before you design or write copy for any of them.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| ROSCO Art. 6(a)(11)(f) | Each **retail** client's subscriptions "shall not exceed (SR 25,000)" for all outstanding issuances of one issuer (or sponsor) on the platform, "with a maximum of one hundred thousand Saudi riyals within twelve months" for all debt issuances on the platform. |
| ROSCO Art. 6(a)(11)(g) | Retail clients may not subscribe to asset-backed debt instruments through the platform. |
| ROSCO Art. 6(a)(11)(h) | The offering document (Annex 1(A)) must be available to registered clients on the platform's website at least five days before the offering starts. |
| ROSCO Art. 6(a)(11)(j), (k) | The platform's procedures and policies for evaluating the offered instruments must be available to clients, updates notified immediately, and the platform must obtain the client's declaration that they reviewed them **before** subscribing. |
| ROSCO Art. 6(a)(11)(n) | Offering period at most 45 days; if the offering is not completed, subscriptions are returned "without imposing any fees" within 5 days of the end of the offering period. |
| ROSCO Art. 6(a)(11)(o) | A retail client may cancel a subscription "within (48) hours from the time of submitting the subscription application or until the end of the offering period (whichever comes first)", and must be told immediately when the offering completes or is cancelled. |
| ROSCO Art. 6(a)(11)(p) | After a material change to the offering document, subscribers are notified immediately and may cancel or amend before the offering ends. |
| ROSCO Art. 6(a)(11)(q), (r), (s) | The platform discloses on its website the status of each issuance and its payment status against the schedule, and the percentage of payments overdue 90 consecutive days relative to all offerings, with actions taken, updated at least monthly. |
| ROSCO Annex 1(A) | The offering document is fair and not misleading, opens with a disclaimer on the importance of reading it, and covers: offer summary, use of proceeds, minimum subscription, breach events and remedies, early redemption, repayment dates, guarantees (if any), pricing mechanism, audited financials (if any), issuer background, expenses, related parties and conflicts, investment risks and lawsuits, planning approvals, two accredited valuation reports, and a closing statement that the investment "entails high risks" and may lead to "loss of entire investment amount". |
| CMI Regs Art. 5(b)(8), (9), (11) | Communicate "in a way, which is clear, fair and not misleading"; treat clients fairly; take reasonable care on suitability. |
| CMI Regs Art. 36 | Classify each client as retail, qualified or institutional (one category only) and keep a record that supports it. |
| CMI Regs Art. 39 | Collect financial situation, investment experience and objectives before providing services; if the client refuses, no business. |
| CMI Regs Art. 42, 43 | Take reasonable steps so the client understands the nature of the risks; transactions must be suitable; a client who insists on an unsuitable transaction must be told and must acknowledge it. |
| CMI Regs Art. 46 | "Fees and commission ... must be fully disclosed in advance of providing any services." |
| CMI Regs Art. 34(d) | Avoid "undue pressure" and misleading statements in direct communications. |
| CMI Regs Annex 5.1 | Advertisements: clear purpose; forecasts fair with assumptions stated; no false statements about size or resources; name, address and "authorised by the Authority"; never call a security "guaranteed" unless a legally enforceable third-party guarantee exists (with details); comparisons fair and verified; past performance fair, not cherry-picked, sourced, verifiable, with a warning that it "is not necessarily a guide to future performance"; zakat assumptions stated; cancellation rights and their period stated; value may fall and investor "may get back less than he invested". |

## Rules

### Offering disclosure on the deal page
1. Show, above the fold or in the first scroll, the offer summary: issuer name, instrument type, total offering size, use of proceeds, term, payment schedule, minimum subscription, offering period and close date. Why: Annex 1(A) section 1 is the minimum an investor needs.
2. Put a persistent "Offering document" entry (`Link` or a `ListItem` row with a document icon) on the deal page and on the invest summary, opening the full PDF plus valuation reports. Do not gate it behind starting an investment. Why: ROSCO 6(a)(11)(h) makes it available before the offering.
3. Show issuer information as a section, not a tooltip: legal name, CR number, incorporation date, nature of business. Why: Annex 1(A) section 4.
4. Show guarantees and collateral only with their real terms (type, guarantor, coverage basis, date of valuation). Use the word «ضمان» / "guarantee" only for a legally enforceable arrangement Compliance has confirmed. Why: CMI Annex 5.1 item 6.
5. Show the main risks before the CTA. See [risk-statements.md](risk-statements.md). Why: Annex 1(A) section 9 and CMI Art. 42.
6. Show the platform's issuance-status and 90-day overdue disclosure in a reachable place (deal page footer link, landing page, portfolio). Why: ROSCO 6(a)(11)(q), (r).

### Classification, limits and suitability
7. Show the user's classification and their remaining limit on the amount step, sourced from the backend: «المتبقي من حدك الاستثماري 15,000.00 ر.س». Never hardcode 25,000, 100,000 or 500,000 in copy. Why: limits depend on classification and regime; ROSCO 6(a)(11)(f) sets retail limits and Safqah also applies a product payment cap for non-qualified investors (500,000 SAR, confirmed product rule). Compliance confirms which limit applies to which user.
8. When an amount exceeds a limit, block with an inline `Input Helper Text` error that states the limit and the reason, plus one path forward (lower the amount, or learn about the qualified-investor upgrade). Never a dead end with no reason. Why: fair treatment and clarity.
9. Hide or disable deals a retail user may not buy (asset-backed issuances for retail) with a short reason, never a silent disappearance from portfolio-like lists. Why: ROSCO 6(a)(11)(g).
10. The qualified-investor upgrade screen states what changes (limits, eligible products) and that the user takes on more risk exposure. It never frames the upgrade as a reward. Why: suitability and CMI Art. 34(d) on undue pressure.
11. If the backend flags an investment as unsuitable for the user's profile, show the reason and require an explicit acknowledgement before continuing. Why: CMI Art. 43(e).
12. Before the first subscription, ask the evaluation-policy acknowledgement as an unticked `Checkbox` with a link to the policy. Record it with a timestamp. Why: ROSCO 6(a)(11)(k).

### Cancellation and changes
13. After a retail subscription, show the cancellation deadline as a real date and time on the success screen and on the portfolio row, with a «إلغاء الاكتتاب» action until it passes: «يمكنك إلغاء الاكتتاب حتى 17 أكتوبر 2026، 14:30». Why: ROSCO 6(a)(11)(o).
14. When the offering completes, fails or is cancelled, notify immediately. For a failed offering, say the amount returns in full, no fees, within the stated period. Why: ROSCO 6(a)(11)(n), (o).
15. When the offering document changes materially, notify subscribers and show a `Banner` (Tone=info) on the deal and portfolio with "what changed" and the right to cancel or amend. Why: ROSCO 6(a)(11)(p).

### Returns and claims
16. A rate on a deal is always «متوقع» / "expected" until paid. Never "guaranteed", "fixed", "secured", «مضمون», «ثابت» for returns. Why: CMI Annex 5.1 items 3 and 6, REIF Regs Annex 1 item 7(b) (benchmark: investment "does not guarantee profits and does not protect from losses").
17. Show realised and expected separately on portfolio and payouts. See [fees-returns.md](fees-returns.md). Why: clear, fair and not misleading.
18. Any platform stat (total funded, number of investors, average return, repayment rate) shows its definition, period and "as of" date, and links to the method. Average returns are net of fees and include defaulted deals. Why: CMI Annex 5.1 item 9 (fair, not selected to exaggerate, sourced, verifiable).
19. Past performance of any deal or of Safqah carries: «الأداء السابق لا يعد بالضرورة مؤشراً على الأداء المستقبلي». Why: CMI Annex 5.1 item 9(5).
20. Marketing surfaces state Safqah's name and that it is authorised by the CMA, with the licence number placeholder `{licence_no}` filled by Compliance. Why: CMI Annex 5.1 item 5.
21. If copy mentions zakat impact, state the assumed rate and that it may change. Why: CMI Annex 5.1 item 10.

## Examples

### Return wording
| Do | Don't |
| --- | --- |
| «نسبة العائد المتوقع 16.0% سنوياً» | «عائد مضمون 16%» |
| «صافي الربح المتوقع 21,120.00 ر.س بعد الرسوم» | «اربح 21,333 ر.س» (gross, rounded, no "expected") |
| "Expected annual return 16.0%" | "Fixed 16% return" |
| "Net expected profit 21,120.00 SAR after fees" | "Earn 21,333 SAR" |

### Limits
| Do | Don't |
| --- | --- |
| «تجاوزت حدك الاستثماري لهذه الصفقة. الحد المتاح 10,000.00 ر.س» | «لا يمكن إتمام العملية» (no reason) |
| "This exceeds your limit for this deal. Available: 10,000.00 SAR" | "Upgrade now to unlock bigger returns!" |

### Stats
| Do | Don't |
| --- | --- |
| «تم تمويل 1.2 مليار ر.س منذ 2020 حتى 30 سبتمبر 2026 · نسبة التعثر 2.1%» with a link «كيف نحسبها» | «أكثر من مليار ريال أرباح للمستثمرين» (undefined, undated) |
| "SAR 1.2bn funded, 2020 to 30 Sep 2026 · Overdue 90+ days: 2.1%" | "Zero defaults!" when defaulted deals were excluded |

### Cancellation
| Do | Don't |
| --- | --- |
| «تم الاكتتاب. يمكنك الإلغاء حتى 17 أكتوبر 2026، 14:30» + `Button` Variant=secondary «إلغاء الاكتتاب» | Cancellation only via a support chat |
| "Subscribed. You can cancel until 17 Oct 2026, 14:30" | Hiding the deadline in terms and conditions |

## Open items for Compliance
- Which subscription limits apply to Safqah's current licence (ROSCO retail limits vs the 500,000 SAR product cap) and how they combine.
- The licence number and the exact regulatory status line.
- Whether Safqah offers any asset-backed issuance to retail users.

## Sources

- CMA, Rules on the Offer of Securities and Continuing Obligations (unofficial English translation; Arabic is official), Board Resolution 3-123-2017, amended by Resolution 1-94-2025 dated 1/9/2025, Art. 6(a)(11) and Annex 1(A): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- CMA news, debt-instrument crowdfunding framework, 8/9/2025: https://cma.gov.sa/en/MediaCenter/NEWS/Pages/CMA_N_3862.aspx
- CMA, Capital Market Institutions Regulations, amended 1/9/2025, Art. 5, 34, 36, 39, 42, 43, 46 and Annex 5.1: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, Real Estate Investment Funds Regulations, amended by Resolution 1-54-2025 dated 21/5/2025, Annex 1 item 7(b): https://cma.gov.sa/en/RulesRegulations/Regulations/Documents/Real_Estate_Investment_Funds_Regulations_2025_EN.pdf
- CMA, Investment Funds Regulations, amended 21/5/2025, Art. 72 (advertising benchmark): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/Investment_Funds_Regulations_2025_EN.pdf
- Product rules: 500,000 SAR payment cap for non-qualified investors; qualified-investor upgrade flow (Safqah product, Qualified Calculator research).
- Syntropy: `knowledge/components/index.json` (`Link`, `ListItem`, `Checkbox`, `Banner`, `Input Helper Text`, `Button`).
