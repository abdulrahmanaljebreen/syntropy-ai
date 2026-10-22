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

## Sources
- Notion: Stage 1-3 Principles, section 2 "Tone of voice", `3501a53e-1a6b-802c-92b6-c0b2381d4215` (primary) and `3501a53e-1a6b-8190-ba9e-ce891190bef9` (identical tone section).
- Notion: Safqah Business Glossary, `collection://94edbecc-48d1-4ba1-8ae4-bfa500eee94f` (usage notes: never "loan", "interest", "bonds", "borrower"; Qualified Investor; Three Guarantees).
- Built components: `ShariaDisclosure` (3681:2658), `StatusPill`, `Alert`, `Toast` `Tone` values in `knowledge/components/index.json`.
