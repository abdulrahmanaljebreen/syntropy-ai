Design guidance only. Confirm wording with Safqah Compliance before release.

# Consumer protection: fair treatment, fees, terms, complaints

How SAMA's consumer-protection rules translate into Safqah screens: fee disclosure and consent before commitment, plain Arabic terms, acknowledgement records, cancellation, complaints and record-keeping. Read it for any screen where money moves (invest, payment, wallet, cash-out) and for help and complaint flows.

Scope: SAMA's rules bind SAMA-supervised institutions, which includes Safqah's banking and payment partners. Safqah itself is a CMA-licensed capital market institution, and the CMA rules on the same topics (fees disclosed in advance, complaints, records) are in [cma.md](cma.md). Use SAMA's rules as the Saudi benchmark for consumer UX; Compliance decides which provisions bind Safqah directly.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| SAMA Principle 1 | Treat consumers "equitably, honestly and fairly at all stages", with special attention to "low-income and less educated people, older people and those with special needs". |
| SAMA Principle 2 | Information must be "clear, concise, accurate, not misleading, and easy to access especially the key terms and features", including prices and commissions, taxes, fines, "types of major risks and benefits", and "the mechanism and consequences of terminating the relationship". |
| SAMA Principle 7 | A complaint mechanism that is "clear and effective". |
| SAMA Rule 1 | Encourage consumers to read contracts, the initial disclosure form and terms, and "verify consumers' knowledge of the content". |
| SAMA Rule 3 | Terms "drafted in Arabic in a simple, clear and direct language"; an English copy on request; warning statements include potential risks. |
| SAMA Rule 4 | Changes to terms notified "at least 30 days before the change comes into effect", with a way to object. |
| SAMA Rule 5 | An initial disclosure form in "easy, clear and simple language" with "details of calculating fees and commissions", and an acknowledgement that the consumer "read and understood such information and agree to its content". |
| SAMA Rule 6 | Minimum font size 14 in contracts, disclosure forms and terms; never ask for a signature on an empty or incomplete document. |
| SAMA Rule 7 | Provide documents (contract, terms, schedule of fees) in paper or electronic form per the consumer's preference, immediately. |
| SAMA Rule 8 | Fees must not rise after the contract is signed. |
| SAMA Rule 10(a) | After an application, send a message with the subject, "the reference number, expected implementation date", and a toll-free number. |
| SAMA Rule 12(b) | State the purpose of every OTP message (for example access to account, money transfer). |
| SAMA Rules 17, 18, 19 | Multiple complaint channels including apps; publish the complaint mechanism in the app; give a reference number and handling period; keep records "for a minimum of five years"; offer escalation "to a higher level ... or be directed to the competent authority". |
| SAMA Rule 21 | Provide copies of forms, current terms and contracts within 5 working days on request. |
| SAMA Fees Guide, Art. 3, 4 | Clarify all fees "upon providing the service"; obtain "prior approval through Authenticated Channels for all fees and costs" and notify by SMS when deducted. |
| SAMA Advertising Rules, Art. 1, 3, 5.1, 7, 11, 12 | No tempting, misleading or exaggerated methods; ads show name, conditions, target customer and "All related fees and commissions ... including VAT"; no false claims; "free" must be explicit and say for whom; consent to receive ads per channel and an easy permanent opt-out; advertised benefits are binding. |
| CMA ROSCO Art. 6(a)(11)(o) | Retail subscribers may cancel within 48 hours or until the offering period ends, whichever comes first (the cooling-off that applies to Safqah subscriptions). |
| CMA CMI Regs Art. 46, 63 | Fees fully disclosed in advance; written complaint procedures, investigated by someone not involved, records kept. |

## Rules

### Fees before commitment
1. Show every fee, with VAT, on the summary step before the confirm button: name, basis (what it is a percentage of), amount in SAR, and when it is taken (at payment, from profit, at cash-out). Why: SAMA Principle 2, Fees Guide Art. 3, CMI Art. 46.
2. The confirm action is the user's approval of those fees. The `Button` label names the commitment («تأكيد الاستثمار 100,000.00 ر.س»), and the fees are visible on the same screen without scrolling past the button. Why: Fees Guide Art. 4 (prior approval).
3. No fee appears for the first time on the payment provider page, a receipt or a later statement. Why: Rule 8 and the deceptive pattern "Hidden costs" ([anti-pressure.md](anti-pressure.md)).
4. Fee schedule reachable from settings and from the help centre in one tap. Why: Rule 9 (publish fees) applied to the app.
5. "Free" or «بدون رسوم» only when no fee of any kind applies, and say for whom and until when. Why: Advertising Rules Art. 7.

### Terms, plain language and acknowledgement
6. Arabic is the primary language of terms. Use the glossary terms (`knowledge/content/glossary.md`), short sentences, no legal jargon on the screen itself; put the full legal text one tap away. Why: Rule 3.
7. Summarise key terms in a `KeyValue` list or `Accordion` before the acknowledgement: what you buy, term, expected return basis, fees, risks, how to cancel, what happens on late payment. Why: Rule 5 and Principle 2.
8. Each acknowledgement is an unticked `Checkbox` with one statement and a link to the document it refers to. Do not bundle "I accept the terms, privacy policy and marketing" in one box. Why: Rule 5 and PDPL (see [pdpl-consent.md](pdpl-consent.md)).
9. Body text in terms and disclosure views is at least the token equivalent of 14 px. Why: Rule 6.
10. Record each acceptance: user id, document id and version, timestamp, channel, app version. Show the user a "documents you accepted" list in settings with download. Why: Rules 7 and 21, CMI Art. 49.
11. When terms change, show a `Banner` (Tone=info) and send a message at least 30 days before the effective date, with "what changed" and how to object or exit. Why: Rule 4.

### Cancellation and refunds
12. Show the cancellation right and deadline before and after subscribing (see [cma.md](cma.md) rule 13). Cancelling takes no more steps than subscribing. Why: ROSCO 6(a)(11)(o); "Hard to cancel" pattern.
13. If an offering fails or is cancelled, the refund message states the full amount, no fees, and the period. Why: ROSCO 6(a)(11)(n).

### Messages and receipts
14. After any money action, show a receipt screen and send a message with a reference number, amount, date and expected next step. Why: Rule 10(a).
15. Every OTP message and screen states the purpose: «رمز التحقق لتأكيد سحب 5,000.00 ر.س». Why: Rule 12(b).

### Complaints and help
16. "Help and complaints" is reachable from every money screen (overflow `Menu` or `ListItem` in settings) and from the receipt. Why: Rules 17 and 18.
17. Submitting a complaint returns a reference number and the expected handling period on screen and by message. Why: Rule 19(b).
18. The complaint detail view shows status, history and an escalation path, including the regulator's complaint channel. Why: Rule 19(g).
19. Never hide complaints behind a chatbot loop. A human route is one tap from the bot. Why: Principle 7 ("clear and effective").

### Fair treatment and accessibility
20. Design for older and less experienced users: no time-boxed decisions except real holds, readable type, labels on icons, and full screen-reader support. Why: Principle 1.

## Examples

### Fee line on the invest summary
| Do | Don't |
| --- | --- |
| «رسوم الإدارة: 1% من الربح المتوقع · 213.33 ر.س · تُخصم عند التوزيع» | «رسوم رمزية» |
| "Management fee: 1% of expected profit · 213.33 SAR · deducted at payout" | Fee only visible in the PDF |

### OTP
| Do | Don't |
| --- | --- |
| «رمز التحقق لإضافة حساب بنكي جديد. لا تشاركه مع أحد» | «رمز التحقق: 4821» |
| "Code to add a new bank account. Never share it" | "Your code is 4821" |

### Complaint submitted
| Do | Don't |
| --- | --- |
| «تم استلام الشكوى رقم C-20261015-0042. نرد خلال 5 أيام عمل» | «شكراً لتواصلك» (no reference, no period) |
| "Complaint C-20261015-0042 received. We reply within 5 working days" | "Thanks for reaching out!" |

The 5-day figure is a placeholder; use the period in Safqah's approved complaint policy.

### Acknowledgement
| Do | Don't |
| --- | --- |
| ☐ «اطلعت على نشرة الطرح» (link) · ☐ «اطلعت على سياسة تقييم أدوات الدين» (link) | ☑ pre-ticked «أوافق على جميع الشروط والأحكام» |

## Sources

- SAMA Rulebook, Consumer Protection and Financial Conduct: https://rulebook.sama.gov.sa/en/entiresection/1375
  - Financial Consumer Protection Principles and Rules, No. 44006639, 23/8/2022: Principles 1, 2, 6, 7; Section 3 Rules 1, 3 to 10, 12, 17 to 19, 21.
  - Guide to Financial Institutions Services Fees, circular 472038000 dated 22/12/2025: Articles 3 and 4.
  - Rules for Advertising Products and Services Provided by Financial Institutions: Articles 1, 3, 5, 7, 11, 12.
- CMA, Rules on the Offer of Securities and Continuing Obligations, amended 1/9/2025, Art. 6(a)(11)(n), (o): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/RULES_ON_THE_OFFER_OF_SECURITIES_AND_CONTINUING_OBLIGATIONS-en.pdf
- CMA, Capital Market Institutions Regulations, Art. 46, 49, 63: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- Syntropy: `knowledge/components/index.json` (`Button`, `KeyValue`, `Accordion`, `Checkbox`, `Banner`, `Menu`, `ListItem`), `knowledge/content/glossary.md`.
