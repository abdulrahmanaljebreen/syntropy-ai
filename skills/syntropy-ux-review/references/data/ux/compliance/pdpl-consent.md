Design guidance only. Confirm wording with Safqah Compliance before release.

# PDPL: consent, notices, data rights and preferences

How the Saudi Personal Data Protection Law (PDPL) shapes onboarding, KYC, settings, notifications and OS permission prompts on Safqah. Read it for any screen that collects personal data, asks for consent, sends marketing, or asks for a device permission.

The implementing regulations issued by SDAIA add conditions on consent, withdrawal and notices. They were not reachable when this file was written, so rules below cite only the law text; Compliance confirms any extra regulation detail.

## What the law says (verified, PDPL as amended by Royal Decree M/148)

| Article | Point that shapes the UI |
| --- | --- |
| Art. 4 | Data-subject rights: to be informed of the legal basis and purpose of collection; to access their data; to obtain it «بصيغة مقروءة وواضحة»; to request correction, completion or update; to request destruction of data no longer needed. |
| Art. 5 | No processing or change of purpose without the owner's consent (the amendment replaced «كتابية» with «صريحة», explicit). «يجوز لصاحب البيانات الشخصية الرجوع عن الموافقة ... في أي وقت». |
| Art. 6 | Consent is not needed in listed cases, including processing under another law or to perform a prior agreement the person is party to, and (added by amendment) legitimate interests that do not harm the person's rights and do not involve sensitive data. |
| Art. 7 | Consent «لا يجوز أن تكون ... شرطاً لإسداء خدمة أو تقديم منفعة» unless the service relates to the processing consented to. |
| Art. 12 | A privacy policy available to people «عند جمع بياناتهم», stating purpose, data collected, method, storage, processing, destruction, rights and how to exercise them. |
| Art. 13 | When collecting directly, inform the person of: the legal basis; the purpose and «ما إذا كان جمعها كلها أو بعضها إلزاميًّا أم اختياريًّا»; who collects; who it is disclosed to and whether it leaves the Kingdom; the consequences of not providing it; their rights. |
| Art. 21 | Respond to rights requests within a period and through a channel set by the regulations. |
| Art. 24 | Credit data: explicit consent to collect, change purpose or disclose; notify the person when a disclosure request for their credit data arrives. |
| Art. 25 | Personal contact details may be used to send promotional or awareness material only with the recipient's consent and with «آلية واضحة» to stop it. |
| Art. 26 | Personal data (not sensitive data) may be processed for marketing if collected directly and the person consented. |
| Art. 28 | Official identity documents may not be photographed or copied except when a law requires it or a competent public body requests it. |

Related: SAMA Principle 6 requires data-protection mechanisms that "include all rights mentioned in the Personal Data Protection Law"; SAMA Advertising Rules Art. 11 require consent per preferred channel and an easy way to "permanently refuse" ads; CMI Regs Art. 34(b) requires consent or an existing relationship before direct securities communications.

## Rules

### Purpose notice and privacy policy
1. Before each data group is collected (identity, contact, financial profile, bank account, location), show a one-line purpose notice above the first field and a «سياسة الخصوصية» `Link`. Why: Art. 12, 13.
2. Mark each field mandatory or optional in the label or `Form Field Helper`. Why: Art. 13(2).
3. State the consequence of not providing mandatory data in one line: «لا يمكننا فتح حساب استثماري دون التحقق من هويتك». Why: Art. 13(5), CMI Art. 39(d).
4. If data is shared with third parties (identity verification, payment partners, credit bureau) or processed outside the Kingdom, name the category of recipient in the notice or the linked policy. Why: Art. 13(4).
5. Prefer digital identity verification (`AbshirLogo` flows) over photographing ID cards. Ask for an ID image only when Compliance confirms a legal requirement, and say which law requires it. Why: Art. 28.

### Consent capture
6. One consent, one purpose, one control. Each optional purpose (marketing by channel, analytics beyond service, sharing with partners for offers) gets its own unticked `Checkbox` or off-by-default `Switch`. Why: Art. 5 (explicit), deceptive pattern "Preselection".
7. Never bundle optional consent with terms acceptance or make it a condition to continue. The continue `Button` is enabled whether or not optional boxes are ticked. Why: Art. 7.
8. Processing needed for the service or required by law (KYC, AML checks, client classification, transaction records) is explained in the notice, not dressed up as a consent the user could refuse. Why: Art. 6; a fake choice misleads.
9. Credit-bureau checks, if any, ask explicit consent and tell the user when their credit data is requested. Why: Art. 24.
10. Log every consent and withdrawal: purpose, wording version, state, timestamp, channel. Back-office shows this log read-only. Why: proof of explicit consent; SAMA Rule 19(d) on records.

### Withdrawal and preferences
11. Every consent can be withdrawn in settings in no more steps than it took to give, with immediate effect on screen («تم إيقاف الرسائل التسويقية عبر البريد الإلكتروني»). Why: Art. 5(2); "Hard to cancel".
12. Notification settings separate service messages (transaction, security, payout, regulatory notices) from marketing, per channel (push, SMS, email, WhatsApp). Service messages that the law or contract requires cannot be turned off; say so in a `Form Field Helper` instead of showing a disabled switch with no reason. Why: Art. 25, SAMA Advertising Art. 11.
13. Honour the preference everywhere: if marketing push is off, no promotional push, including "new deal" campaigns, unless the user opted in to deal alerts as a separate service. Why: Art. 25; the existing notification settings design treats channels as independent toggles.
14. Every marketing message carries a one-tap stop route (link, reply keyword or in-app toggle). Why: Art. 25(2).

### Data-subject rights
15. Settings has a «بياناتي» / "My data" section with entry points to: view my data, download a copy (readable format), correct or update, request deletion of data no longer needed, and manage consents. Why: Art. 4.
16. Each request shows a reference and the expected response period on submission. Deletion requests explain what must be kept by law (for example transaction records) and for how long. Why: Art. 4(5) with Art. 18 limits, Art. 21.

### OS permission primers
17. Before any OS prompt (notifications, camera, contacts, location, biometrics), show a primer screen or `BottomSheet` with: what the permission enables, a concrete benefit, and two equal choices («السماح» / «ليس الآن»). Trigger it at the moment of need, not on first launch. Why: informed consent (Art. 13 purpose), respects the user's choice.
18. "Not now" is never punished: no repeated prompts in the same session, at most one re-ask after a meaningful event, and a path in settings. Why: deceptive pattern "Nagging".
19. Never ask for a permission the feature does not need (contacts for a referral link, location for a deal list). Why: purpose limitation in Art. 4(1) and Art. 13.

## Examples

### Purpose notice
| Do | Don't |
| --- | --- |
| «نطلب بيانات دخلك لتحديد تصنيفك الاستثماري وحدودك وفق أنظمة هيئة السوق المالية. إلزامي.» + «سياسة الخصوصية» | A form with no explanation |
| "We ask for your income to set your investor classification and limits under CMA rules. Required." + "Privacy policy" | "Help us know you better!" |

### Marketing consent
| Do | Don't |
| --- | --- |
| ☐ «أرغب في استلام عروض وأخبار الصفقات عبر البريد الإلكتروني» | ☑ pre-ticked «أوافق على الشروط وعلى استلام العروض» |
| ☐ "Email me news and deal offers" | Marketing consent required to finish sign-up |

### Permission primer (notifications)
| Do | Don't |
| --- | --- |
| Title «تنبيهات التوزيعات والصفقات» · body «نخبرك عند إيداع أرباحك وعند طرح صفقة تناسب أهدافك» · `Button` Variant=primary «السماح» · `Button` Variant=secondary «ليس الآن» | OS prompt on first launch with no context |
| "Payout and deal alerts" · "We'll tell you when profit lands and when a matching deal opens" · "Allow" · "Not now" | «لا، لا أريد معرفة أرباحي» (confirmshaming) |

### Withdrawal
| Do | Don't |
| --- | --- |
| `Switch` State=on «الرسائل التسويقية عبر SMS» → off → `Toast` «تم الإيقاف» | "Call support to unsubscribe" |

## Sources

- Personal Data Protection Law, Royal Decree M/19 dated 9/2/1443H, amended by Royal Decree M/148 dated 5/9/1444H, Articles 4, 5, 6, 7, 12, 13, 21, 24, 25, 26, 28 (Arabic official text): https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1
- SDAIA implementing regulations: not reachable on 15 Oct 2026 (sdaia.gov.sa timed out); no article from them is cited here.
- SAMA Rulebook, Financial Consumer Protection Principles and Rules (Principle 6, Rule 19(d)) and Rules for Advertising (Art. 11): https://rulebook.sama.gov.sa/en/entiresection/1375
- CMA, Capital Market Institutions Regulations, Art. 34(b), 39(d): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- Deceptive Patterns, "Preselection", "Nagging", "Hard to cancel", "Confirmshaming": https://deceptive.design/types
- Safqah context: notification settings redesign (per-channel toggles) and notification permission flow (primer before OS prompt).
- Syntropy: `knowledge/components/index.json` (`Checkbox`, `Switch`, `Link`, `Form Field Helper`, `BottomSheet`, `Button`, `Toast`, `AbshirLogo`).
