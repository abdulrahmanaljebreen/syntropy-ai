# Voice and tone (T1-T6)

How Safqah sounds in product copy and microcopy. Read this before writing or reviewing any user-facing string: labels, errors, empty states, notifications, disclosures. Arabic is canonical; English is a translation guide. When the two diverge, the Arabic decision wins.

## The voice in one paragraph
Safqah is a Sharia-compliant investment platform serving investors who make real financial decisions. Copy is **clear, calm, confident and respectful**: a knowledgeable advisor, not a salesperson and not a friend. Plain Arabic that does not talk down. Precise financial language without hiding behind jargon. Risk acknowledged honestly. Never flatter, never pressure with urgency, never minimise compliance disclosures.

## Rules

1. **T1. Clarity over cleverness.** Plain Arabic. No buzzwords, no marketing flourish in functional copy.
   Why: investors scan for facts; flourish hides them.
2. **T2. Precise on numbers, transparent on risk.** State profit projections, return percentages and risk ratings exactly. Never round up; never bury a risk disclosure. Percent labels in Arabic start with «نسبة» (see `numbers-currency.md`).
   Why: a rounded-up return or a hidden risk is a broken promise, and a CMA problem.
3. **T3. Respect, not flattery.** No «صديقي» / "buddy". No "you're amazing for investing!". Address investors as adults making financial decisions. No celebration emojis on financial events.
   Why: flattery reads as manipulation in a financial context.
4. **T4. Sharia disclosures are first-class copy, not legal noise.** Compliance text meets the same clarity standard as everything else: 2-4 short sentences, readable size, explains the structure.
   Why: a disclosure nobody reads protects nobody.
5. **T5. Errors explain what to do, not what went wrong.** Every error gives the next action.
   Why: the user should fix it without reading twice.
6. **T6. No fake urgency.** Timers reflect real deadlines. Empty states don't pressure. Notifications don't manufacture FOMO.
   Why: pressure tactics are a dark pattern and erode trust.
7. **Minimal copy.** A label, the control, at most one short hint. No explanatory paragraphs on screen. Few alerts and toasts.
   Why: matches the restraint of shipped Safqah screens; every extra line competes with the numbers.
8. **Warnings are not errors.** Copy for a warning state uses the warning tone (`Tone=warning`); reserve error/red wording and styling for critical or defaulted states.
   Why: alarm fatigue; red must still mean something.
9. **Name the thing.** Success and status copy names the specific deal, amount or step, not "it" or "your request" when the specific name is known.
   Why: confirms exactly what happened.

## Examples

### Paired tone examples (T1-T6)
| Rule | Do (Arabic / English) | Don't (Arabic / English) |
|---|---|---|
| T1 | «صفقة جديدة متاحة» / "New deal available" | «فرصة العمر بانتظارك» / "The opportunity of a lifetime awaits" |
| T2 | «نسبة العائد المتوقع 8.5%، تصنيف المخاطر: متوسط» / "Expected return 8.5%, risk rating: medium" | «عائد ممتاز» / "Excellent returns" with the risk rating in fine print |
| T3 | «تم استلام طلبك» / "Your request has been received" | «رائع! 🎉 أنت بطل!» / "Awesome! 🎉 You're a champion!" |
| T4 | A `ShariaDisclosure` explaining the structure (Murabaha, Ijara) in 2-3 sentences | A wall of legal Arabic at 9px that users skip |
| T5 | «رقم الجوال يجب أن يبدأ بـ 05» / "Phone number must start with 05" | «خطأ: قيمة غير صالحة» / "Error: invalid value" |
| T6 | «الصفقة تغلق خلال 3 أيام» / "Deal closes in 3 days" (when it really does) | «اشترك الآن!! العرض ينتهي قريباً!!!» / "Sign up now!! Offer ending soon!!!" |

### Copy types, what good looks like
Length limits per type: `copy-lengths.md`.

| Type | Arabic | English | Notes |
|---|---|---|---|
| Labels and buttons | «استثمر الآن» · «حفظ» · «متابعة» · «إلغاء» | "Invest now" · "Save" · "Continue" · "Cancel" | Verb first for actions; single noun for destinations. Never «اضغط هنا» / "Click here". |
| Helper text | «يرجى إدخال رقم الجوال السعودي المسجل لديك» | "Enter your registered Saudi phone number" | What to enter and why. No condescension, no essay. |
| Error | «كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل رقماً» | "Password must be at least 8 characters and include a number" | Next action is obvious on first read. |
| Success | «تم استثمارك بنجاح في صفقة [اسم الصفقة]» | "Your investment in [Deal Name] has been confirmed" | Confirms the action, names the thing, no emoji. |
| Compliance and disclosure | «تستثمر صفقة في عقود مرابحة متوافقة مع أحكام الشريعة الإسلامية، تحت إشراف هيئة شرعية مستقلة. الاستثمار ينطوي على مخاطر، وقد تخسر جزءاً من رأس المال.» | "Safqah invests through Sharia-compliant Murabaha contracts, supervised by an independent Sharia board. Investment carries risk; you may lose part of your capital." | Explained, not just stated. Risk named, not minimised. |
| Empty state | «لا توجد صفقات مفتوحة حالياً. سنخبرك عند توفر صفقة جديدة.» | "No open deals right now. We'll notify you when a new deal is available." | Explains the state and what happens next. Doesn't apologise. |
| Onboarding and education | «صفقة تتيح لك الاستثمار في عقود مرابحة بدءاً من 1,000 ر.س» | "Safqah lets you invest in Murabaha contracts starting from 1,000 SAR" | Value in concrete terms, a specific number, no fluff. |

### Vocabulary do / don't
| Use | Avoid | Why |
|---|---|---|
| «الربح» / profit, «نسبة الربح» / profit rate | «فائدة» / interest, APR | Interest implies riba; Safqah products are riba-free |
| «صكوك» / Sukuk | «سندات» / bonds | Sukuk represent entitlement under Murabaha, not bonds |
| «المطور العقاري» / Developer | «المقترض» / borrower | Borrower implies conventional lending |
| «مستثمر مؤهل» / Qualified Investor | "accredited" / "sophisticated" investor | CMA term; the others are foreign or different legal terms |
| «هيئة الرقابة الشرعية» / Sharia Board | "religious board", "fatwa board" | Formal name |
| «ثلاث ضمانات» / Three Guarantees, listing all three | «ضمانات» alone | Always list land pledge + company PN + personal PNs |
Full term list: `glossary.md`.

### Warning vs error copy
| State | Tone | Arabic | English |
|---|---|---|---|
| Payment 30 days late | `warning` | «السداد متأخر. نتابع مع المطور.» | "Payment is late. We're following up with the developer." |
| Defaulted | `error` | «الصفقة متعثرة. بدأت إجراءات التحصيل.» | "This deal has defaulted. Recovery has started." |


<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# Numbers, currency, percentages and dates

How to write numerals, SAR amounts, separators, decimals, percentages and dates in Arabic and English UI. Read this whenever a string contains a number. These rules are the "locale rule" that `docs/CONVENTIONS.md` refers to.

## Rules

### Numerals
1. Use Western digits (0-9) in both Arabic and English UI. Eastern Arabic digits (٠-٩) only when an editorial or branding context explicitly requires them, and never for amounts users transact with.
   Why: matches Saudi banking apps; one digit system avoids misreads on money.
2. Digits keep their natural left-to-right order inside Arabic text. Phone numbers, IBANs, dates and percentages never reverse (see `knowledge/ux/rtl.md` R2).
   Why: a reversed number is a wrong number.

### Currency (SAR)
3. The currency always comes **after** the amount, in both languages.
   - Arabic text: `1,250.50 ر.س`
   - English text: `1,250.50 SAR`
   - Where the UI renders the Saudi Riyal symbol (amount atoms that use `Icon / riyal`), the symbol follows the number the same way, never before it.
   Why: one placement rule for both locales; matches the Notion currency rule and `AGENTS.md`.
4. Never abbreviate SAR as "SR". Do not mix «ريال» in running UI amounts; use «ر.س» or the riyal symbol. «ريال» is acceptable in long-form sentences only.
   Why: consistent, scannable amounts.
5. Prefer the riyal symbol (`Icon / riyal`) in amount displays where the component supports it; use «ر.س» / "SAR" in plain text strings, notifications and anywhere an icon cannot render.
   Why: the later Notion revision asks for the riyal logo when referring to SAR.
- Note: the earlier Notion copy said "«ر.س» in Arabic, «SAR» in English, always after the amount"; the later copy (`...4215`) says "use the riyal logo when referring to SAR". Both are kept: symbol in amount components, text suffix elsewhere.
- Note: some built component defaults show the code first (`SAR 1,200`, `Minimum investment: SAR 1,000`), and `docs/CONVENTIONS.md` shows `SAR 1,250.00`. These conflict with rule 3; treat them as defaults to override, and write `1,200 SAR`.

### Separators and decimals
6. Thousands separator is a comma, even in Arabic UI: `1,000`. Decimal separator is a full stop: `1,250.50`. Never the Arabic decimal sign (٫) or thousands sign (٬).
   Why: consistency with Saudi banking displays.
7. Transactional amounts (balances, payments, investment amounts, fees, payouts) show two decimals: `1,250.50 ر.س`, `50,000.00 SAR`.
   Why: transactions are exact to the halala.
8. Projections and goals may use whole numbers: `100,000 ر.س`.
   Why: false precision on a projection implies a guarantee.

### Percentages
9. Percentages show one decimal place: `8.5%`. Never round to `8%` when the real rate has decimal precision. The `%` sign follows the number with no space, in both languages.
   Why: T2, precise on numbers.
   - Note: one built default shows `16.00%` (two decimals). Use one decimal unless a regulatory document requires more.
10. **Arabic labels for a percentage value start with «نسبة».** Examples: «نسبة صافي العائد», «نسبة العائد المتوقع», «نسبة الربح», «نسبة الإنجاز». Exceptions:
    - Not for SAR amounts: «صافي العائد» when the value is `18,333 ر.س`.
    - Not for IRR: use «معدل العائد الداخلي» (the «معدل» form).
    - Not for coverage status labels (for example a guarantee coverage state); those keep their status wording.
    Why: tells the reader the value is a ratio, not money, before they reach the number.
11. Signs stay before the digits: `+100%`, `-2.5%`. Do not use colour alone to show positive/negative; pair it with the sign.
    Why: digits and signs never reorder in RTL; colour is not accessible on its own.

### Dates and calendars
12. Choose the calendar by context (R5): financial events (payouts, maturity, statements, distribution schedules) use Gregorian; religious or cultural dates (Ramadan, Eid, Zakah due dates) use Hijri. The user's preferred default is a setting.
    Why: Saudi users live with both calendars.
13. Write dates as day, month name, year, with Western digits:
    | Calendar | Arabic | English |
    |---|---|---|
    | Gregorian | `15 مارس 2026` | `15 Mar 2026` |
    | Hijri | `1 رمضان 1447` | `1 Ramadan 1447` |
    Why: month names avoid the DD/MM vs MM/DD ambiguity. The two Notion examples are `15 Mar 2026` and `1 رمضان 1447`; the other cells follow the same pattern.
14. Phone numbers are written as entered, unspaced or in natural groups, never reversed: `0541234567`.
    Why: R2.

## Examples

| Do | Don't |
|---|---|
| `1,250.50 ر.س` | `ر.س 1,250.50`, `١٬٢٥٠٫٥٠ ر.س` |
| `1,250.50 SAR` | `SR 1,250.5`, `SAR1250.50` |
| «نسبة صافي العائد 13.8%» | «صافي العائد 13.8%» |
| «صافي العائد 18,333 ر.س» | «نسبة صافي العائد 18,333 ر.س» |
| «معدل العائد الداخلي 15.2%» | «نسبة العائد الداخلي 15.2%» |
| «نسبة العائد المتوقع 8.5%» | «عائد يصل إلى 9%» (rounded up) |
| Goal: `100,000 ر.س` | Goal: `100,000.00 ر.س` |
| Payout on `15 مارس 2026` | Payout on `15/03/2026` |
| Ramadan banner `1 رمضان 1447` | Ramadan banner `1 Mar 2026` only |
| «يبدأ الاستثمار من 1,000 ر.س» | «يبدأ الاستثمار من ١٠٠٠ ريال» |

