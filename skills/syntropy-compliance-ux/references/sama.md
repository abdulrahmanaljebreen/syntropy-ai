Design guidance only. Confirm wording with Safqah Compliance before release.

# SAMA consumer protection: fees, terms, receipts, complaints

How SAMA's consumer-protection rules translate into Safqah screens wherever money moves (invest, payment, wallet, cash-out) and in help and complaint flows.

Scope: SAMA rules bind SAMA-supervised institutions, including Safqah's banking and payment partners. Safqah is a CMA-licensed capital market institution; the CMA rules on the same topics (fees in advance, complaints, records) are in [cma.md](cma.md). Use SAMA as the Saudi benchmark for consumer UX. Compliance decides which provisions bind Safqah directly.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| Principle 1 | Treat consumers "equitably, honestly and fairly at all stages", with special attention to "low-income and less educated people, older people and those with special needs" |
| Principle 2 | Information "clear, concise, accurate, not misleading, and easy to access especially the key terms and features", including prices, commissions, taxes, fines, "types of major risks and benefits", "the mechanism and consequences of terminating the relationship" |
| Principle 6 | Data protection mechanisms that include all PDPL rights |
| Principle 7 | A complaint mechanism that is "clear and effective" |
| Rule 1 | Encourage reading contracts and terms; "verify consumers' knowledge of the content" |
| Rule 3 | Terms "drafted in Arabic in a simple, clear and direct language"; English on request; warning statements on potential risks |
| Rule 4 | Changes to terms notified "at least 30 days before the change comes into effect", with a way to object |
| Rule 5 | Initial disclosure form in "easy, clear and simple language" with "details of calculating fees and commissions", and acknowledgement the consumer "read and understood such information and agree to its content" |
| Rule 6 | Minimum font size 14 in contracts, disclosure forms and terms; never ask for a signature on an empty or incomplete document |
| Rule 7 | Documents (contract, terms, fee schedule) in paper or electronic form per preference, immediately |
| Rule 8 | Fees must not rise after the contract is signed |
| Rule 10(a) | After an application, a message with subject, "the reference number, expected implementation date", and a toll-free number |
| Rule 12(b) | State the purpose of every OTP message |
| Rules 17, 18, 19 | Multiple complaint channels including apps; publish the mechanism in the app; reference number and handling period; records "for a minimum of five years"; escalation "to a higher level ... or be directed to the competent authority" |
| Rule 21 | Copies of forms, terms and contracts within 5 working days on request |
| Fees Guide Art. 3, 4 | Clarify all fees "upon providing the service"; "prior approval through Authenticated Channels for all fees and costs"; SMS when deducted |
| Advertising Rules Art. 1, 3, 5.1, 7, 11, 12 | No tempting, misleading or exaggerated methods; ads show name, conditions, target customer and "All related fees and commissions ... including VAT"; no false claims; "free" explicit and for whom; consent per channel and easy permanent opt-out; advertised benefits binding |
| CMA ROSCO Art. 6(a)(11)(o) | Retail may cancel within 48 hours or until the offering ends, whichever first |
| CMA CMI Regs Art. 46, 49, 63 | Fees disclosed in advance; records; written complaint procedures investigated by someone not involved |

## Rules

### Fees before commitment
1. Every fee, with VAT, on the summary step before the confirm button: name, basis (percentage of what), amount in SAR, when taken (at payment, from profit, at cash-out). Why: Principle 2, Fees Guide Art. 3, CMI Art. 46.
2. The confirm action is the approval of those fees. The `Button` label names the commitment («تأكيد الاستثمار 100,000.00 ر.س») and fees are visible on the same screen without scrolling past the button. Why: Fees Guide Art. 4.
3. No fee appears for the first time on the payment provider page, a receipt or a statement. Why: Rule 8, "Hidden costs".
4. Fee schedule reachable in one tap from settings and the help centre. Why: Rule 9 applied to the app.
5. «بدون رسوم» / "Free" only when no fee of any kind applies, saying for whom and until when. Why: Advertising Art. 7.

### Terms, plain language and acknowledgement
6. Arabic is the primary language of terms. Glossary terms, short sentences, no legal jargon on screen; full legal text one tap away. Why: Rule 3.
7. Summarise key terms in `KeyValue` or `Accordion` before acknowledgement: what you buy, term, expected return basis, fees, risks, how to cancel, what happens on late payment. Why: Rule 5, Principle 2.
8. Each acknowledgement is an unticked `Checkbox` with one statement and a link to its document. Never bundle terms, privacy and marketing in one box. Why: Rule 5, PDPL.
9. Body text in terms and disclosure views at least the token equivalent of 14 px. Why: Rule 6.
10. Record each acceptance (user id, document id and version, timestamp, channel, app version). Show a "documents you accepted" list in settings with download. Why: Rules 7, 21; CMI Art. 49.
11. Terms change: `Banner` Tone=info plus a message at least 30 days before the effective date, with what changed and how to object or exit. Why: Rule 4.

### Cancellation and refunds
12. Cancellation right and deadline shown before and after subscribing (cma.md rule 13). Cancelling takes no more steps than subscribing. Why: ROSCO 6(a)(11)(o); "Hard to cancel".
13. Failed or cancelled offering: refund message states the full amount, no fees, and the period. Why: ROSCO 6(a)(11)(n).

### Messages and receipts
14. After any money action, a receipt screen and a message with reference number, amount, date and next step. Why: Rule 10(a).
15. Every OTP message and screen states the purpose: «رمز التحقق لتأكيد سحب 5,000.00 ر.س». Why: Rule 12(b).

### Complaints and help
16. "Help and complaints" reachable from every money screen (overflow `Menu` or a `ListItem` in settings) and from the receipt. Why: Rules 17, 18.
17. Submitting a complaint returns a reference number and handling period on screen and by message. Why: Rule 19(b).
18. Complaint detail shows status, history and escalation, including the regulator's complaint channel. Why: Rule 19(g).
19. Never trap complaints in a chatbot loop. A human route is one tap from the bot. Why: Principle 7.

### Fair treatment and accessibility
20. Design for older and less experienced users: no time-boxed decisions except real holds, readable type, labelled icons, full screen-reader support. Why: Principle 1.

## Examples

| Do | Don't |
| --- | --- |
| «رسوم الإدارة: 1% من الربح المتوقع · 213.33 ر.س · تُخصم عند التوزيع» | «رسوم رمزية» |
| "Management fee: 1% of expected profit · 213.33 SAR · deducted at payout" | Fee only visible in the PDF |
| «رمز التحقق لإضافة حساب بنكي جديد. لا تشاركه مع أحد» | «رمز التحقق: 4821» |
| "Code to add a new bank account. Never share it" | "Your code is 4821" |
| «تم استلام الشكوى رقم C-20261015-0042. نرد خلال {complaint_period}» | «شكراً لتواصلك» (no reference, no period) |
| "Complaint C-20261015-0042 received. We reply within {complaint_period}" | "Thanks for reaching out!" |
| ☐ «اطلعت على نشرة الطرح» (link) · ☐ «اطلعت على سياسة تقييم أدوات الدين» (link) | ☑ pre-ticked «أوافق على جميع الشروط والأحكام» |

The knowledge base illustrates the complaint period as "5 working days"; it is a placeholder. Use the period in Safqah's approved complaint policy (`{complaint_period}`, see [open-items.md](open-items.md)). The fee label wording is also open.

## Sources

- SAMA Rulebook, Consumer Protection and Financial Conduct: https://rulebook.sama.gov.sa/en/entiresection/1375
  - Financial Consumer Protection Principles and Rules, No. 44006639, 23/8/2022: Principles 1, 2, 6, 7; Rules 1, 3 to 10, 12, 17 to 19, 21.
  - Guide to Financial Institutions Services Fees, circular 472038000 dated 22/12/2025: Art. 3, 4.
  - Rules for Advertising Products and Services Provided by Financial Institutions: Art. 1, 3, 5, 7, 11, 12.
- CMA, ROSCO, amended 1/9/2025, Art. 6(a)(11)(n), (o): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- CMA, CMI Regs, Art. 46, 49, 63: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- Full source file: `references/data/ux/compliance/sama-consumer-protection.md`.
