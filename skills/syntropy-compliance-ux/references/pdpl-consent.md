Design guidance only. Confirm wording with Safqah Compliance before release.

# PDPL: consent, notices, data rights, notification preferences, permission primers

How the Saudi Personal Data Protection Law shapes onboarding, KYC, settings, notifications and OS permission prompts. Open it for any screen that collects personal data, asks for consent, sends marketing or asks for a device permission.

The SDAIA implementing regulations add conditions on consent, withdrawal and notices. They were not reachable when the source was written (15 Oct 2026), so the rules below cite only the law text; Compliance confirms any extra regulation detail.

## What the law says (verified, PDPL as amended by Royal Decree M/148)

| Article | Point that shapes the UI |
| --- | --- |
| Art. 4 | Rights: to be informed of legal basis and purpose; to access data; to obtain it «بصيغة مقروءة وواضحة»; to request correction, completion or update; to request destruction of data no longer needed |
| Art. 5 | No processing or change of purpose without consent (amendment replaced «كتابية» with «صريحة», explicit). «يجوز لصاحب البيانات الشخصية الرجوع عن الموافقة ... في أي وقت» |
| Art. 6 | Consent not needed in listed cases: processing under another law, performing an agreement the person is party to, and (amendment) legitimate interests that do not harm rights and involve no sensitive data |
| Art. 7 | Consent «لا يجوز أن تكون ... شرطاً لإسداء خدمة أو تقديم منفعة» unless the service relates to that processing |
| Art. 12 | Privacy policy available «عند جمع بياناتهم»: purpose, data, method, storage, processing, destruction, rights and how to exercise them |
| Art. 13 | When collecting directly, inform of: legal basis; purpose and «ما إذا كان جمعها كلها أو بعضها إلزاميًّا أم اختياريًّا»; who collects; recipients and whether data leaves the Kingdom; consequences of not providing; rights |
| Art. 21 | Respond to rights requests within a period and channel set by the regulations |
| Art. 24 | Credit data: explicit consent to collect, change purpose or disclose; notify the person when a disclosure request arrives |
| Art. 25 | Contact details used for promotional or awareness material only with consent and «آلية واضحة» to stop it |
| Art. 26 | Personal (not sensitive) data processed for marketing if collected directly and consented |
| Art. 28 | Official identity documents not photographed or copied unless a law requires it or a competent public body requests it |

Related: SAMA Principle 6 (all PDPL rights); SAMA Advertising Art. 11 (consent per channel, easy permanent refusal); CMI Regs Art. 34(b) (consent or existing relationship before direct securities communications).

## Rules

### Purpose notice and privacy policy
1. Before each data group (identity, contact, financial profile, bank account, location): one-line purpose notice above the first field plus a «سياسة الخصوصية» `Link`. Why: Art. 12, 13.
2. Mark each field mandatory or optional in the label or `Form Field Helper`. Why: Art. 13(2).
3. State the consequence of not providing mandatory data in one line: «لا يمكننا فتح حساب استثماري دون التحقق من هويتك». Why: Art. 13(5), CMI Art. 39(d).
4. Name the category of third-party recipients (identity verification, payment partners, credit bureau) and any processing outside the Kingdom, in the notice or linked policy. Why: Art. 13(4).
5. Prefer digital identity verification (`AbshirLogo` flows) over ID photos. Ask for an ID image only when Compliance confirms a legal requirement, and say which law. Why: Art. 28.

### Consent capture
6. One consent, one purpose, one control. Each optional purpose (marketing per channel, analytics beyond service, sharing with partners for offers) gets its own unticked `Checkbox` (State=unchecked) or off-by-default `Switch` (State=off). Why: Art. 5, "Preselection".
7. Never bundle optional consent with terms acceptance or make it a condition to continue. The continue `Button` is enabled whether or not optional boxes are ticked. Why: Art. 7.
8. Processing needed for the service or required by law (KYC, AML checks, classification, transaction records) is explained in the notice, never dressed up as a consent the user could refuse. Why: Art. 6; a fake choice misleads.
9. Credit-bureau checks, if any: explicit consent, and tell the user when their credit data is requested. Why: Art. 24.
10. Log every consent and withdrawal: purpose, wording version, state, timestamp, channel. Back-office shows it read-only. Why: proof of explicit consent; SAMA Rule 19(d).

### Withdrawal and preferences
11. Every consent can be withdrawn in settings in no more steps than it took to give, with immediate on-screen effect («تم إيقاف الرسائل التسويقية عبر البريد الإلكتروني»). Why: Art. 5(2); "Hard to cancel".
12. Notification settings separate service messages (transaction, security, payout, regulatory notices) from marketing, per channel (push, SMS, email, WhatsApp). Service messages required by law or contract cannot be turned off: say so in a `Form Field Helper` instead of a disabled switch with no reason. Why: Art. 25, SAMA Advertising Art. 11.
13. Honour the preference everywhere: marketing push off means no promotional push, including "new deal" campaigns, unless the user opted in to deal alerts as a separate service. Why: Art. 25.
14. Every marketing message carries a one-tap stop route (link, reply keyword or in-app toggle). Why: Art. 25(2).

### Data-subject rights
15. Settings has «بياناتي» / "My data" with: view my data, download a copy (readable format), correct or update, request deletion of data no longer needed, manage consents. Why: Art. 4.
16. Each request shows a reference and the expected response period. Deletion requests explain what must be kept by law (for example transaction records) and for how long. Why: Art. 4(5) with Art. 18, Art. 21.

### OS permission primers
17. Before any OS prompt (notifications, camera, contacts, location, biometrics): a primer screen or `BottomSheet` with what it enables, a concrete benefit, and two equal choices «السماح» / «ليس الآن». Trigger at the moment of need, never on first launch. Why: informed consent (Art. 13 purpose).
18. "Not now" is never punished: no repeat in the same session, at most one re-ask after a meaningful event, and a path in settings. Why: "Nagging".
19. Never ask for a permission the feature does not need (contacts for a referral link, location for a deal list). Why: purpose limitation, Art. 4(1), 13.

## Notification settings recipe

| Group | Rows | Control | Note |
| --- | --- | --- | --- |
| «إشعارات الخدمة» (service) | Transactions, security, payouts, regulatory notices | No switch where required; `Form Field Helper` «هذه الرسائل مطلوبة لحماية حسابك ولا يمكن إيقافها» | Explain, never a silent disabled switch |
| «تنبيهات الصفقات» (deal alerts, optional service) | New deals matching my preferences | `Switch` State=off by default, per channel | Separate from marketing; still opt-in |
| «الرسائل التسويقية» (marketing) | Offers and news: push, SMS, email, WhatsApp | One `Switch` per channel, State=off by default | Effect confirmed with a `Toast` «تم الإيقاف» |

Build with `ActionList` and `ListItem` (toggle slot). Whether "new deal" alerts count as service or marketing is an open item.

## Examples

| Do | Don't |
| --- | --- |
| «نطلب بيانات دخلك لتحديد تصنيفك الاستثماري وحدودك وفق أنظمة هيئة السوق المالية. إلزامي.» + «سياسة الخصوصية» | A form with no explanation |
| "We ask for your income to set your investor classification and limits under CMA rules. Required." | "Help us know you better!" |
| ☐ «أرغب في استلام عروض وأخبار الصفقات عبر البريد الإلكتروني» | ☑ pre-ticked «أوافق على الشروط وعلى استلام العروض» |
| ☐ "Email me news and deal offers" | Marketing consent required to finish sign-up |
| Primer title «تنبيهات التوزيعات والصفقات» · body «نخبرك عند إيداع أرباحك وعند طرح صفقة تناسب أهدافك» · `Button` Variant=primary «السماح» · `Button` Variant=secondary «ليس الآن» | OS prompt on first launch with no context |
| "Payout and deal alerts" · "We'll tell you when profit lands and when a matching deal opens" · "Allow" · "Not now" | «لا، لا أريد معرفة أرباحي» (confirmshaming) |
| `Switch` State=on «الرسائل التسويقية عبر SMS» to off, then `Toast` «تم الإيقاف» | "Call support to unsubscribe" |

Note: «السماح» / «ليس الآن» are equal choices; the primary/secondary styling is visual hierarchy only, and "Not now" must stay the same size and fully visible.

## Sources

- PDPL, Royal Decree M/19 dated 9/2/1443H, amended by Royal Decree M/148 dated 5/9/1444H, Art. 4, 5, 6, 7, 12, 13, 21, 24, 25, 26, 28: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1
- SDAIA implementing regulations: not reachable on 15 Oct 2026; nothing cited from them.
- SAMA Rulebook, Principle 6, Rule 19(d), Advertising Art. 11: https://rulebook.sama.gov.sa/en/entiresection/1375
- CMA, CMI Regs, Art. 34(b), 39(d): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- Deceptive Patterns, "Preselection", "Nagging", "Hard to cancel", "Confirmshaming": https://deceptive.design/types
- Safqah context: notification settings design (per-channel toggles) and notification permission flow (primer before the OS prompt).
- Full source file: `references/data/ux/compliance/pdpl-consent.md`.
