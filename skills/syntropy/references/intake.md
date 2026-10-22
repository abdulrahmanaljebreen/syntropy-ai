# Intake interview

How to run the `/syntropy` interview: six questions, one per message, skipping anything the request already answers, then a five-line brief the person confirms. Open this whenever new work starts (a screen, a flow, a change) and the Syntropy MCP `start_intake` tool is not available, or to check its output.

## Rules
1. Ask **one question per message**, never two. Why: batched questions get half-answered and feel like a form.
2. Before asking, **auto-answer** every question the request already covers, using the keyword cues below. Ask only the first unanswered one. Why: re-asking known facts wastes the person's time.
3. Offer **numbered choices** for questions 1, 2, 3 and 6 and accept a number, the word, or Arabic. Why: one tap or one digit is the fastest answer.
4. Ask in the person's language. If they write Arabic, ask in Arabic. Why: the interview is part of the experience.
5. Confirm inferences silently in the brief, not with extra questions ("Surface: app, compact (assumed from 'app')"). Why: the brief is where the person corrects you.
6. If the person says "skip", "just design it" or «بدون أسئلة», stop the interview, ask only a truly blocking question if one remains (usually the surface), assume the rest and list assumptions in the brief. Why: respect their time without guessing what cannot be guessed.
7. Never skip the brief confirmation for money movement, personal data or regulated disclosure. Why: these are the cases where a wrong assumption costs the most.
8. Keep each question to one line plus choices. No preamble, no praise. Why: minimal copy applies to the agent too.

## The six questions

| # | Question (English) | Arabic | Choices |
|---|---|---|---|
| 1 | What are you making? | ماذا تريد أن تصنع؟ | 1 A new screen · 2 A new flow · 3 A change to something live · 4 A review · 5 An explanation |
| 2 | Who is it for? | لمن هذا؟ | 1 Retail investor · 2 Qualified investor · 3 Developer or issuer · 4 Internal team |
| 3 | Where does it live? | أين سيظهر؟ | 1 App, compact (phone) · 2 App, regular (tablet or foldable inner) · 3 Web · 4 Back-office |
| 4 | What job does it do, and how will we know it worked? Name a Mixpanel event or metric if you have one. | ما المهمة التي يؤديها، وكيف نعرف أنه نجح؟ اذكر حدثاً في Mixpanel أو مؤشراً إن وجد. | Free text. Offer two example metrics for the area (see follow-ups) |
| 5 | What exists already? Share a Figma link, a screenshot or a ticket, or say none. | ما الموجود حالياً؟ رابط Figma أو لقطة شاشة أو تذكرة، أو لا شيء. | Free text or attachment |
| 6 | What is at stake? Pick all that apply. | ما الذي على المحك؟ اختر كل ما ينطبق. | 1 Money movement · 2 Personal data · 3 Regulated disclosure · 4 A deadline · 5 None |

Choice 4 or 5 in question 1 switches mode: a review goes to review mode, an explanation to explain mode (`modes.md`). Stop the interview there.

## Keyword cues (auto-answer)

| Question | Answer | Cues in the request (English, Arabic) |
|---|---|---|
| 1 | New screen | new screen, screen, page, شاشة, صفحة |
| 1 | New flow | flow, journey, onboarding, wizard, steps, رحلة, تدفق |
| 1 | Change to something live | change, update, redesign, improve, fix, tweak, existing, تعديل, تحسين, تحديث |
| 1 | Review | review, audit, critique, check, lint, feedback on, مراجعة, تدقيق |
| 1 | Explanation | explain, how does, what is, why, اشرح, ما هو, كيف |
| 2 | Retail investor | retail, investor, investors, user, customer, مستثمر, عميل, أفراد |
| 2 | Qualified investor | qualified, accredited, مؤهل, محترف |
| 2 | Developer or issuer | developer, issuer, fundraiser, developer portal, مطور, مصدر |
| 2 | Internal team | internal, back-office, admin, ops, compliance team, داخلي, الإدارة |
| 3 | App, compact | mobile, app, ios, android, phone, تطبيق, جوال |
| 3 | App, regular | tablet, ipad, foldable, regular, duo, لوحي |
| 3 | Web | web, website, browser, desktop, landing, موقع, ويب |
| 3 | Back-office | back-office, backoffice, admin, console, dashboard, لوحة التحكم |
| 4 | Answered | so that, in order to, to help, metric, mixpanel, event, conversion, لكي, حتى, مؤشر, نسبة التحويل |
| 5 | Answered | figma.com link, linear.app link, `SAF-123`, screenshot, .png, .jpg, ticket, لقطة, تذكرة |
| 6 | Money movement | payment, pay, invest, withdraw, cash-out, deposit, transfer, payout, wallet, refund, zakah payment, دفع, سحب, إيداع, تحويل, محفظة, استثمار |
| 6 | Personal data | kyc, identity, national id, iban, phone number, address, nafath, نفاذ, هوية, آيبان, بيانات شخصية |
| 6 | Regulated disclosure | disclosure, cma, sharia, risk, prospectus, offering, terms, إفصاح, هيئة السوق, شرعي, مخاطر, نشرة |
| 6 | Deadline | deadline, urgent, asap, by Friday, this week, موعد, عاجل |

### Inference by product (use with care, confirm in the brief)
| Product named | Likely user | Likely stakes |
|---|---|---|
| Payout, distributions, التوزيعات | Retail investor | Money movement |
| Invest, reserve, استثمر, احجز | Retail investor (qualified if "qualified deal") | Money movement, regulated disclosure |
| Wallet, cash-out, سحب | Retail investor | Money movement, personal data (IBAN) |
| KYC, onboarding, Nafath | Retail investor | Personal data, regulated disclosure |
| Zakah, الزكاة | Retail investor | Money movement (calculation), regulated disclosure (Sharia method) |
| Back-office, ops table | Internal team, back-office | Depends: ask question 6 |
| Developer portal, application | Developer, web | Personal data, regulated disclosure |
Product cues never answer question 4 (the job and metric) or question 5. Ask them.

## Follow-ups (only when the answer is vague)
- Question 4 vague ("make it better"): offer two metrics for the area. Payout detail: "share of viewers who reinvest within 7 days" or "cash-out tickets per 1,000 payouts". KYC: "KYC completion rate" or "drop-off at bank account step". Deal page: "deal page to invest-start rate".
- Question 5 "there's a live screen": ask for a screenshot or Figma link once. If none, design from the pattern.
- Question 6 "money movement": confirm whether fees apply and who provides limits (backend). Do not ask for numbers; use placeholders.
- Surface "app" with no size class: assume compact, design regular only if asked.

## Brief template (five lines, then ask to confirm)
```
Brief
1. Making: <a new screen | flow | change> for <product area>: <one-line description>
2. For: <user> on <surface>
3. Job and signal: <job>. Success = <metric or Mixpanel event, or "to define with syntropy-product-workflow">
4. Starting from: <link | screenshot | ticket | nothing, built from the <pattern> pattern>
5. At stake: <stakes>, so: <the non-negotiables that bite, e.g. fees before confirm, risk by the CTA, backend limits>
Assumed: <anything inferred>. Size: <Quick | Feature | Flow>.
Confirm, or tell me what to change.
```
Arabic version:
```
الملخص
1. المطلوب: <شاشة جديدة | رحلة | تعديل> في <المجال>: <وصف في سطر>
2. لمن: <المستخدم> على <المنصة>
3. المهمة ومؤشر النجاح: <المهمة>. النجاح = <المؤشر أو الحدث>
4. نقطة البداية: <رابط | لقطة | تذكرة | لا شيء، من نمط <النمط>>
5. ما على المحك: <...>، لذلك: <القواعد الملزمة>
افتراضات: <...>. الحجم: <سريع | ميزة | رحلة>.
أكّد أو أخبرني بما تريد تغييره.
```
After "yes": Quick continues in syntropy (research, options, design). Feature or Flow, or any money, personal-data or regulated work beyond one screen, goes to syntropy-product-workflow with the brief.

## Examples

### English, request answers three questions
> **Person:** /syntropy a payout details screen for retail investors in the app
>
> (Auto-answered: 1 new screen, 2 retail investor, 3 app compact, 6 money movement. Unanswered: 4, 5.)
>
> **Agent:** What job should the payout details screen do, and how will we know it worked? A Mixpanel event or metric helps, for example "fewer payout tickets" or "reinvest within 7 days".
>
> **Person:** Explain where the money came from and what to do next. Metric: payout support tickets go down.
>
> **Agent:** What exists already? Share a Figma link, a screenshot or a ticket, or say none.
>
> **Person:** none
>
> **Agent:**
> Brief
> 1. Making: a new screen for payouts: the detail of one distribution.
> 2. For: retail investor on the app, compact (assumed from "app").
> 3. Job and signal: explain the source and next step of a payout. Success = payout tickets per 1,000 payouts go down.
> 4. Starting from: nothing, built from the payouts pattern.
> 5. At stake: money movement, so: net amount as headline, fees with VAT shown, Gregorian dates, no pressure to reinvest, cash-out as easy as reinvest.
> Assumed: compact only. Size: Quick.
> Confirm, or tell me what to change.

### Arabic, bare command
> **الشخص:** /syntropy
>
> **الوكيل:** ماذا تريد أن تصنع؟
> 1 شاشة جديدة · 2 رحلة جديدة · 3 تعديل على شيء قائم · 4 مراجعة · 5 شرح
>
> **الشخص:** 2
>
> **الوكيل:** لمن هذا؟
> 1 مستثمر فرد · 2 مستثمر مؤهل · 3 مطور أو مُصدر · 4 فريق داخلي
>
> **الشخص:** مستثمر فرد، في التطبيق
>
> (المنصة أُجيبت: التطبيق، جوال.)
>
> **الوكيل:** ما المهمة التي تؤديها الرحلة، وكيف نعرف أنها نجحت؟ مثلاً: نسبة إكمال التحقق، أو حدث في Mixpanel.
>
> **الشخص:** رفع مستندات التحقق بدون أخطاء، المؤشر نسبة الإكمال
>
> **الوكيل:** ما الموجود حالياً؟ رابط Figma أو لقطة شاشة أو تذكرة، أو لا شيء.
>
> **الشخص:** SAF-1234
>
> **الوكيل:** ما الذي على المحك؟ اختر كل ما ينطبق.
> 1 تحريك أموال · 2 بيانات شخصية · 3 إفصاح تنظيمي · 4 موعد نهائي · 5 لا شيء
>
> **الشخص:** 2
>
> **الوكيل:** (الملخص بخمسة أسطر، ثم) الحجم: رحلة، لذلك سأنتقل إلى syntropy-product-workflow بعد تأكيدك. أكّد أو أخبرني بما تريد تغييره.

### Skip request
> **Person:** /syntropy just design a zakah screen, skip the questions
>
> **Agent:** Understood, I will assume the rest. One blocker: where does it live? 1 App, compact · 2 App, regular · 3 Web · 4 Back-office
>
> (Then a brief with assumptions: retail investor, money movement and regulated disclosure (Sharia method), metric to define. Because zakah touches money and Sharia wording, ask for a one-word confirmation of the brief before designing.)

## Sources
- AGENTS.md (intake)
- mcp/intake.json (questions, choices, keyword cues)
- knowledge/ux/lifecycle/brief.md, research-intake.md
