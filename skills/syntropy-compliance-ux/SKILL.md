---
name: syntropy-compliance-ux
description: Tells any agent what Saudi fintech rules require of Safqah screens and copy, and applies it. Use whenever a Safqah or Syntropy screen, message or copy shows a deal, return, fee or limit, moves money (invest, reserve, pay, wallet, cash-out, payouts), collects personal data or consent (KYC, settings, notifications, OS permission prompts), states Sharia or CMA status, or markets the platform. Covers CMA rules (disclosure, retail vs qualified limits, suitability, 48-hour cancellation, no guaranteed returns, ads), SAMA consumer protection (fees with VAT before confirmation, receipts, complaints), PDPL consent, Sharia disclosure (ComplianceBadge, ShariaDisclosure), risk lines R1 to R8, net vs gross, 18 banned dark patterns, the six countdown conditions and the A to H checklist. Triggers: compliance, disclosure, risk, fee, VAT, net return, guaranteed, limit, consent, marketing opt-in, permission primer, Sharia seal, defaulted, countdown, complaint, إفصاح, مخاطر, رسوم, موافقة.
---

# Syntropy compliance UX

Design guidance, not legal advice. Confirm all regulated wording with Safqah Compliance before release.

## Purpose
Make every Safqah screen that touches money, personal data or a regulated claim do what the Saudi rules require: show it at the decision point, ask for it properly, record it, and let the user undo it. Map the screen to its obligations, apply the rules with real Syntropy components, draft Arabic-first copy from the templates (marked as drafts), run the A to H checklist, and hand Compliance a clear list of open items.

## Hard rules
1. **Say it is guidance, and route wording to Compliance.** Every answer that contains regulated copy or a compliance verdict ends with: «مسودة: يُعتمد النص من فريق الالتزام في صفقة قبل الإطلاق» / "Draft: confirm wording with Safqah Compliance before release." Mark Arabic risk lines as draft translations.
   Why: Compliance and Legal own the wording, limits and periods; they change.
2. **Disclosure sits at the decision point.** A risk line (R1) sits next to every commitment CTA: deal page near «استثمر الآن», amount step, directly above the confirm `Button` on the summary, reserve sheet. Same size and contrast as nearby body text (`text/default` or `text/muted`), never in a `Tooltip`, a `Toast` or below the fold.
   Why: CMI Regs Art. 42 (understand the risks); "Visual interference" when risk is smaller or greyer than the return.
3. **Fees, with VAT, before confirmation; no fee added later.** Each fee is its own line: name, basis, SAR amount, VAT, when taken, visible on the same screen as the confirm button. No fee appears for the first time on the payment page, receipt or statement.
   Why: CMI Art. 46 (fees disclosed in advance), SAMA Fees Guide Art. 3 and 4, SAMA Rule 8; "Hidden costs".
4. **Net is the headline.** Headline profit and rate are net of all fees; gross only as a secondary breakdown line, never larger or bolder. Every figure says net or gross in words.
   Why: IFR Art. 72(c)(1) benchmark; an unlabelled rate is read as net.
5. **Projected means «متوقع», never guaranteed.** Every pre-payment figure is labelled «متوقع» / "expected" with R2 «العائد متوقع وغير مضمون.» beside it and the assumptions stated (full on-time repayment, term, amount). Never «مضمون», «ثابت», «آمن», "guaranteed", "fixed", "secured", "safe", "risk-free" about returns. «ضمان» only for a legally enforceable guarantee Compliance confirmed, with its terms.
   Why: CMI Annex 5.1 items 3 and 6.
6. **Capital is not profit; received is not expected.** Payout rows split «رأس المال» and «الربح»; portfolio shows received to date and expected remaining in separate rows. `ReturnsDisplay` keeps a label that says it includes expected profit, or is split.
   Why: mixing them inflates earnings and presents projections as realised.
7. **Track-record stats are defined and dated.** Any platform stat shows its definition, period, as-of date and a «كيف نحسبها» method link; averages are net and include defaulted deals; past results carry R4 and cover at least one year; the 90+ day overdue rate is public with its as-of date.
   Why: CMI Annex 5.1 item 9; ROSCO 6(a)(11)(r), (s).
8. **Limits and classification come from the backend, never hardcoded.** Show the signed-in user's classification and remaining limit from the API; never print 25,000, 100,000 or 500,000 in copy. Over-limit errors state the limit, the reason and one path forward. Open question for Compliance: CMA retail caps (25,000 SAR per issuer, 100,000 SAR per 12 months, ROSCO 6(a)(11)(f)) vs the 500,000 SAR product cap for non-qualified investors depend on the licence (open item O1).
   Why: limits differ by classification and regime and change with regulation.
9. **Consent per purpose, never pre-ticked, withdrawal as easy as giving.** One purpose, one unticked `Checkbox` (State=unchecked) or off `Switch` (State=off). Continue works without optional consents. Withdrawal in settings in no more steps, effective immediately with a `Toast`. Legal-basis processing (KYC, AML) is explained, not faked as a choice. Every consent is logged with wording version and timestamp.
   Why: PDPL Art. 5, 6, 7; "Preselection", "Forced action".
10. **Service and marketing notifications are split.** Per channel (push, SMS, email, WhatsApp); required service messages explained in a `Form Field Helper`, not a silent disabled switch; preferences honoured in every campaign; every marketing message has a one-tap stop.
    Why: PDPL Art. 25; SAMA Advertising Art. 11.
11. **OS permission prompts sit behind a primer.** A primer (`BottomSheet` or screen) at the moment of need, with what it enables, a concrete benefit and equal «السماح» / «ليس الآن». Never on first launch, never a repeat in the same session, at most one later re-ask.
    Why: informed consent (PDPL Art. 13); "Nagging".
12. **Sharia seal only on approved deals; «إعرف أكثر» opens the decision.** `ShariaDisclosure` once on the deal page; `ComplianceBadge` Type=Shariah and Type=CMA on summaries. Every «إعرف أكثر» opens the committee decision (`{committee_name}`, `{decision_ref}`, `{decision_date}`) or the licence (`{licence_no}`). Pending, withdrawn or draft deal: seal hidden, `StatusPill` Tone=warning. Approved strings verbatim.
    Why: CMA Shariah Governance Instructions Art. 2(c)(1), 3, 8; a seal is a legal claim.
13. **No interest wording.** Never «فائدة», "interest", "APR", "loan", "borrower", "lender", "bond", and no «حلال» as a marketing adjective. Use «نسبة الربح», «العائد المتوقع», «صكوك», «مرابحة», «مستثمر».
    Why: glossary rule 2; conventional-lending words imply riba and undermine the Sharia claim.
14. **Warnings in warning tone; red only for the critical.** Late, Repayment Due, Partially Repaid: Tone=warning (`bg/warning-subtle`, `text/warning`, `icon/warning`). Red (Tone=error) only for Defaulted, Written Off, or a failed payment the user must act on. Never colour alone; status words from `IssuanceStatusBadge (Investor)` verbatim.
    Why: Safqah colour rule; WCAG 1.4.1; softened status names mislead.
15. **No dark patterns.** None of the 18 banned patterns B1 to B18 (fake urgency, fake scarcity, fake social proof, confirmshaming, preselection, hidden costs, hard to cancel, nagging, visual interference, trick wording, disguised ads, comparison prevention, addictive design, currency confusion, forced action).
    Why: CMI Art. 34(d) undue pressure; SAMA Advertising Art. 1; PDPL Art. 7.
16. **Countdowns only when all six conditions hold.** Real server hold; backend end time that survives reload; honest copy about zero; cancel as visible as pay; ReservationTimer components in neutral or warning tone, never red, never animating the CTA; no timer on deal cards, deal lists or the Invest entry button. Otherwise show a plain date.
    Why: "Fake urgency"; CMI Art. 34(d).
17. **Complaints are reachable and traceable.** "Help and complaints" one tap from every money screen and the receipt; submission returns a reference number and `{complaint_period}`; detail shows status, history and escalation to the regulator; a human route one tap from any bot.
    Why: SAMA Principle 7, Rules 17 to 19; CMI Art. 63.
18. **Cancellation and refunds are real.** After a retail subscription show `{cancel_deadline}` as a date and time on success and on the portfolio row, with in-app «إلغاء الاكتتاب». Failed offering: full amount, no fees, within the period.
    Why: ROSCO 6(a)(11)(n), (o).
19. **Offering document before commitment.** A persistent entry to the offering document and valuation reports on the deal page and summary, never gated behind starting to invest; separate unticked acknowledgements for the offering document and the evaluation policy (and unsuitability if flagged).
    Why: ROSCO 6(a)(11)(h), (k); CMI Art. 43(e).
20. **Never invent regulatory facts.** No made-up licence numbers, decision references, article numbers, periods or regulator URLs. Use the placeholders in `references/open-items.md`.
    Why: a wrong citation is itself misleading.
21. **Push back on violations, then offer the Syntropy way.** When asked for a banned pattern or claim, say in one or two sentences which rule it breaks, offer the compliant alternative that meets the same goal, and do not build the violating version. Insistence needs written Compliance approval.
    Why: refusing outright stalls the work; complying silently ships regulatory risk.
22. **Write to Syntropy conventions.** Exact component names and variant values from `references/data/components-index.json`, semantic tokens only, Arabic first, Western digits, currency after the amount (`1,250.00 ر.س`), two decimals for money, one for percentages, «نسبة» on percentage labels, no em dash character, no reference to work-in-progress areas of the Figma file.
    Why: agents and engineers copy names and strings verbatim.

## Workflow

1. **Identify the obligations.** Classify the screen with `references/obligation-map.md` (deal page, invest/reserve, payment, KYC, qualified upgrade, wallet/cash-out, portfolio, payouts, notifications/permissions, marketing, complaints, terms/My data, back-office). A screen can match several rows. Write the list of obligations that apply in one short table.
2. **Open the rule files for those rows.** Deal and invest: `cma.md`, `risk-statements.md`, `fees-and-returns.md`, `sharia.md`, `anti-pressure.md`. Money movement: `sama.md`. Data and messages: `pdpl-consent.md`. Use `references/data/ux/compliance/*.md` only when the condensed file is not enough.
3. **Apply the rules.** Place each disclosure where the decision happens; pick components from the decision tables below (check names and variants in `references/data/components-index.json`); bind every limit, rate, fee, period and status to backend fields; design the honest states (over limit, late, defaulted, failed offering, pending Sharia approval, consent withdrawn, permission denied).
4. **Fill the copy from the templates.** Use the copy templates below and R1 to R8 in `risk-statements.md`. Arabic first, English beside. Keep placeholders (`{licence_no}`, `{decision_ref}`, `{decision_date}`, `{complaint_period}`, `{cancel_deadline}`, `{remaining}`). Label the block «مسودة للاعتماد» / "Draft for Compliance".
5. **Run the review checklist.** `references/review-checklist.md`: section A always, plus B to H as they apply. Record fails with id, screen and fix; fix what you can before answering.
6. **List open items for Compliance.** From `references/open-items.md` pick every placeholder and pending decision the design depends on (limits regime, fee basis, VAT, fee label, complaint period, licence, decision refs). End with the guidance line from hard rule 1.

### Output shape for a design or copy request
1. Obligations that apply (table: obligation, rule source, where on screen).
2. Layout with components top to bottom (exact names and variants), RTL first.
3. Copy table: element, العربية, English (draft).
4. Checklist result: fails fixed, items N/A.
5. Open items for Compliance.
6. The guidance line.

## Decision tables

### Need X, use Y, not Z
| Need | Use | Not |
| --- | --- | --- |
| Sharia statement on the deal page | `ShariaDisclosure` once, near the summary | A seal on every card, button and sheet |
| Sharia and CMA status on a summary or calculator | `ComplianceBadge` Type=Shariah + Type=CMA side by side, below the numbers, above R1 | `ShariaDisclosure` squeezed into a sheet; a redrawn seal |
| Deal with pending or withdrawn Sharia approval | Seal hidden + `StatusPill` Tone=warning «بانتظار اعتماد اللجنة الشرعية» | Seal shown "because the platform is Sharia compliant" |
| Confirm an investment on mobile | `BottomSheet` + `Sheet Content / Summary` with `KeyValue` rows, fees, net, R1 above one primary `Button` | `Dialog` with two primaries; fees on the next screen |
| Show the money breakdown | `KeyValue` (Emphasis=strong on net rows) or `Calculator / Results card` (check library availability) | One large gross number |
| Show a deal's risks | «المخاطر» section with `Accordion` or `List`, one line each, link to full text | One collapsed "Disclaimer" at the bottom; `Tooltip` |
| A reservation or payment hold | `Countdown` or `Small Timer` (Property 1=Black, Yellow near the end) + absolute end time, only if all six conditions hold | Any timer on `CardDeal`, a deal list or «استثمر الآن» |
| Scarcity | `ProgressBar` Label «نسبة التمويل» + remaining amount + close date as text | "Only 3 left", viewer counts, «سارع» |
| Over-limit amount | `Input Helper Text` error with limit, reason, one path forward | Disabled CTA with no reason; "Upgrade to unlock bigger returns" |
| Optional consent | Separate unticked `Checkbox`, own sentence, continue enabled without it | One box for terms + privacy + marketing; pre-ticked |
| Notification preferences | `ActionList` groups: service (explained, required), deal alerts (opt-in), marketing per channel (`Switch` State=off) | One master switch; marketing hidden inside "service" |
| OS permission | Primer `BottomSheet` with equal «السماح» / «ليس الآن», at the moment of need | OS prompt on first launch; shaming decline |
| Late payout | `IssuanceStatusBadge (Investor)` Status=Late, `Alert` Tone=warning with days overdue, due vs received, recovery step, next update | Tone=error; «تأخير بسيط» |
| Defaulted deal | Status=Defaulted, `Banner` or `Alert` Tone=error, received vs due, dated recovery step, no expected profit | «قيد المعالجة»; hiding it from totals; "your money is safe" |
| Terms change | `Banner` Tone=info + message at least 30 days ahead with what changed and how to object or exit | Silent update; acceptance forced on next login |
| Material change to the offering document | `Banner` Tone=info on deal and portfolio with what changed and the right to cancel or amend | A footnote |
| Complaint submitted | Screen + message with reference number and `{complaint_period}` | «شكراً لتواصلك» |

### Banned wording and its replacement
| Banned | Use instead |
| --- | --- |
| «عائد مضمون 16%» / "Guaranteed 16% return" | «نسبة العائد المتوقع 16.0% سنوياً» + R2 |
| «ثابت»، «آمن»، "fixed", "safe", "risk-free" | «متوقع» + R1 near the CTA |
| «نسبة الفائدة» / "interest rate", "APR" | «نسبة الربح المتوقعة» / "expected profit rate" |
| «قرض»، «مقترض» / "loan", "borrower" | «صكوك»، «المصدر» / "sukuk", "issuer" |
| «استثمار حلال 100%» | «متوافق مع الشريعة الإسلامية» + «إعرف أكثر» to the decision |
| «اربح 21,333 ر.س» (gross, rounded) | «صافي الربح المتوقع 21,120.00 ر.س» |
| «أرباحك 21,120 ر.س» before any payout | «المستلم 4,800.00 ر.س · المتوقع المتبقي 16,320.00 ر.س» |
| «لا، لا أريد زيادة أرباحي» | «ليس الآن» |
| «سارع! الفرصة على وشك الانتهاء» | «يغلق الطرح 30 أكتوبر 2026» |
| «لا داعي للقلق» on a defaulted deal | Dated fact: «تم تقديم المطالبة للتنفيذ في 3 أكتوبر 2026» |

### Copy templates (drafts, confirm with Compliance)
| Element | العربية | English |
| --- | --- | --- |
| Risk near CTA (R1) | «الاستثمار في أدوات الدين ينطوي على مخاطر عالية وقد يؤدي إلى خسارة كامل المبلغ المستثمر.» | "Investing in debt instruments carries high risk and may lead to the loss of the entire amount invested." |
| Beside expected return (R2) | «العائد متوقع وغير مضمون.» | "Returns are expected, not guaranteed." |
| Summary (R5) | «قد تسترد مبلغاً أقل مما استثمرت.» | "You may get back less than you invested." |
| Fee line | «رسوم الإدارة: 1% من الربح المتوقع · 213.33 ر.س · تُخصم عند التوزيع» | "Management fee: 1% of expected profit · 213.33 SAR · deducted at payout" |
| Net headline | «صافي الربح المتوقع 21,120.00 ر.س» · «نسبة صافي العائد 15.8% سنوياً» | "Net expected profit 21,120.00 SAR" · "Net annual return 15.8%" |
| Remaining limit | «المتبقي من حدك الاستثماري {remaining}» | "Remaining investment limit: {remaining}" |
| Over-limit error | «تجاوزت حدك الاستثماري لهذه الصفقة. الحد المتاح {remaining}» | "This exceeds your limit for this deal. Available: {remaining}" |
| Confirm button | «تأكيد الاستثمار 100,000.00 ر.س» | "Confirm investment 100,000.00 SAR" |
| Acknowledgements | ☐ «اطلعت على نشرة الطرح» · ☐ «اطلعت على سياسة تقييم أدوات الدين» | ☐ "I have read the offering document" · ☐ "I have read the debt instrument evaluation policy" |
| Cancellation | «تم الاكتتاب. يمكنك الإلغاء حتى {cancel_deadline}» + «إلغاء الاكتتاب» | "Subscribed. You can cancel until {cancel_deadline}" + "Cancel subscription" |
| Failed offering | «لم يكتمل الطرح. سيُعاد مبلغك {amount} كاملاً دون أي رسوم خلال {refund_days}» | "The offering did not complete. Your {amount} will be returned in full, with no fees, within {refund_days}" |
| Payment hold | «تنتهي مهلة الدفع خلال 14:59. بعدها يُلغى الحجز ويعود المبلغ المتاح للصفقة» | "Payment window ends in 14:59. Your reservation will then be released, nothing is charged." |
| Close date | «يغلق الطرح 30 أكتوبر 2026» | "Offering closes 30 Oct 2026" |
| Purpose notice | «نطلب بيانات دخلك لتحديد تصنيفك الاستثماري وحدودك وفق أنظمة هيئة السوق المالية. إلزامي.» | "We ask for your income to set your investor classification and limits under CMA rules. Required." |
| Marketing consent | ☐ «أرغب في استلام عروض وأخبار الصفقات عبر البريد الإلكتروني» | ☐ "Email me news and deal offers" |
| Required service messages | «هذه الرسائل مطلوبة لحماية حسابك ولا يمكن إيقافها» | "These messages protect your account and can't be turned off" |
| Withdrawal confirmed | «تم إيقاف الرسائل التسويقية عبر البريد الإلكتروني» | "Marketing emails turned off" |
| Permission primer | «تنبيهات التوزيعات والصفقات» · «نخبرك عند إيداع أرباحك وعند طرح صفقة تناسب أهدافك» · «السماح» / «ليس الآن» | "Payout and deal alerts" · "We'll tell you when profit lands and when a matching deal opens" · "Allow" / "Not now" |
| OTP | «رمز التحقق لتأكيد سحب 5,000.00 ر.س. لا تشاركه مع أحد» | "Code to confirm withdrawing 5,000.00 SAR. Never share it" |
| Complaint received | «تم استلام الشكوى رقم C-20261015-0042. نرد خلال {complaint_period}» | "Complaint C-20261015-0042 received. We reply within {complaint_period}" |
| Defaulted row | «متعثرة · المستلم 40,000.00 ر.س من 100,000.00 ر.س · تم تقديم المطالبة للتنفيذ في 3 أكتوبر 2026» | "Defaulted · Received 40,000.00 of 100,000.00 SAR · Claim filed 3 Oct 2026" |
| Platform stat | «تم تمويل 1.2 مليار ر.س منذ 2020 حتى 30 سبتمبر 2026 · نسبة التعثر 2.1%» + «كيف نحسبها» | "SAR 1.2bn funded, 2020 to 30 Sep 2026 · Overdue 90+ days: 2.1%" + "How we calculate" |
| Past performance (R4) | «الأداء السابق لا يعد بالضرورة مؤشراً على الأداء المستقبلي.» | "Past performance is not necessarily a guide to future performance." |
| CMA line | «مصرحة من هيئة السوق المالية · ترخيص رقم {licence_no}» | "Authorised by the Capital Market Authority · Licence {licence_no}" |

Amounts and dates in templates are illustrations from the worked example; real values come from the backend.

### Worked fee example (summary; full derivation and rounding in `references/fees-and-returns.md`)
100,000.00 SAR, 16 months, 16.0% a year simple, fee 1% of profit: gross 21,333.33 · fee 213.33 · **net 21,120.00** · total 121,120.00 · term return 21.1% · **net annual 15.8%** (simple) or 15.5% (compounded). If 15% VAT applies to the fee: fee 245.33, net 21,088.00. Compute rates from unrounded values (flat 3,000.00 fee case: 13.75% exactly, displays 13.8%, not 13.7%).

### Edge cases
| Case | Do |
| --- | --- |
| Retail user opens an asset-backed deal | Disable invest with a short reason; never silently hide it (ROSCO 6(a)(11)(g)) |
| Backend flags unsuitable | Show the reason and require an explicit acknowledgement (CMI Art. 43(e)) |
| Qualified upgrade | State what changes (limits, products) and the added risk exposure; no "bigger returns", no VIP framing (B13) |
| Late or defaulted deal in portfolio | Replace expected profit with received and outstanding; keep it in totals |
| Zakat figure | Only with the assumed rate stated and that it may change (CMI Annex 5.1 item 10) |
| "Free" promotion | Only if no fee of any kind applies; say for whom and until when; state start and end dates |
| ID upload requested | Prefer `AbshirLogo` digital verification; ask Compliance which law requires an image (PDPL Art. 28) |
| Account deletion | Reference number, period, and what must be kept by law and for how long |
| Testimonials | Only real, consented, Compliance approved, never about returns |

## Self-check before answering
- [ ] I mapped the screen to its obligation-map rows and listed what applies.
- [ ] R1 is next to every commitment CTA at body size and contrast; R2 beside every expected figure.
- [ ] Every fee (with VAT and basis) is on the screen before confirm; nothing appears later.
- [ ] Net is the headline; gross secondary; every figure says net or gross and «متوقع» or «مستلم».
- [ ] Capital and profit separate; received and expected separate.
- [ ] No hardcoded limit, rate, fee or period; placeholders for licence, decision, periods.
- [ ] Consents separate, unticked, withdrawable as easily; service vs marketing split per channel; primer before any OS prompt.
- [ ] Sharia seal only where approved; «إعرف أكثر» opens the real decision; no «فائدة», interest, APR, loan.
- [ ] Late in warning tone, red only for Defaulted, Written Off or an action-required failure; status words verbatim; never colour alone.
- [ ] None of B1 to B18; any timer passes all six conditions.
- [ ] Complaints and help one tap from money screens, with reference number and period.
- [ ] Exact component names and variants; Arabic first; Western digits; currency after the amount; «نسبة» on percentages; no em dash character.
- [ ] If asked for a violation, I pushed back in one or two sentences and offered the compliant alternative.
- [ ] I ran the A to H checklist, listed open items, and ended with the Compliance line.

## References

| File | Open when |
| --- | --- |
| `references/obligation-map.md` | Step 1: which obligations apply to this screen type; regime scope |
| `references/cma.md` | Deal page disclosure, limits and classification, suitability, cancellation, return claims, stats, marketing licence line |
| `references/sama.md` | Fees before commitment, plain Arabic terms, acknowledgements, receipts, OTP purpose, complaints |
| `references/pdpl-consent.md` | Purpose notices, consent capture and withdrawal, notification settings recipe, data rights, permission primers |
| `references/sharia.md` | `ShariaDisclosure` and `ComplianceBadge` placement, «إعرف أكثر» destination, Sharia wording limits |
| `references/risk-statements.md` | R1 to R8 lines and where each goes, status-to-tone map, late and defaulted states |
| `references/fees-and-returns.md` | Net vs gross, projected vs realised, the worked fee example, annualising, rounding, money components |
| `references/anti-pressure.md` | The 18 banned patterns with alternatives, the six countdown conditions, ReservationTimer components, how to push back |
| `references/review-checklist.md` | Step 5: checklist A to H and the report format |
| `references/open-items.md` | Step 6: placeholders and pending Compliance decisions (limits regime, fee basis, VAT, fee label, complaint period) |
| `references/data/ux/compliance/*.md` | Full source files with every citation, when a condensed file is not enough |
| `references/data/content/glossary.md`, `numbers-currency.md`, `voice-tone.md` | Canonical terms, number and currency format, tone |
| `references/data/components-index.json` | Exact component names, props and variant values |

Related skills: syntropy-content (voice, glossary, numbers), syntropy-ux-review (heuristics and dark-pattern review), syntropy-product-workflow (Define gate for money flows), syntropy-figma and syntropy-code-adapters (building it).

## Sources
- `knowledge/ux/compliance/` (README obligation map, cma, sama-consumer-protection, pdpl-consent, sharia-disclosure, risk-statements, fees-returns, anti-pressure, review-checklist), each citing CMA ROSCO and CMI Regs (amended 1/9/2025), CMA Shariah Governance Instructions (3-77-2022), SAMA Rulebook consumer protection, PDPL (M/19 amended by M/148), deceptive.design.
- Syntropy component index and descriptions: `ComplianceBadge` 3673:2408, `ShariaDisclosure` 3681:2658, `Banner` 1993:212, `Alert` 1950:212, `BottomSheet` 2634:273, ReservationTimer page 08b (`Countdown` 3481:3031, `Small Timer` 3448:8480, `Collapsed-Reservation` 3448:8514), Calculator parts on page 08a (`Calculator / Results card` 5998:7821, `Calculator / Metric row` 5996:5988).
