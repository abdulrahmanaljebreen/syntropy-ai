---
name: syntropy-content
description: Writes, translates and reviews Safqah product copy in Arabic and English the way Syntropy speaks: Arabic first, minimal, calm and Sharia-correct. Use whenever an agent writes, shortens, translates or audits any user-facing string for Safqah or Syntropy: button labels, field labels, placeholders, helper text, errors, empty states, confirmations, success screens, toasts, alerts, push notifications, SMS, email subjects, deal cards, amounts, percentages, dates, or screen captions in design files. Covers voice and tone (T1 to T6), length limits, SAR and number formatting (Western digits, currency after the amount, 2 decimals for money, 1 for percentages, «نسبة» on Arabic percentage labels), approved and banned Islamic-finance terms (no loan, interest, bonds, borrower), the error formula, anti-pressure wording, warning versus error tone, and gender-neutral Modern Standard Arabic. Triggers: copy, microcopy, UX writing, wording, نص, صياغة, translate to Arabic, error message, CTA, notification text.
---
<!-- syntropy-lint-disable fake-urgency, percent-label-nisba (red-team requests are quoted on purpose) -->

# Syntropy content: how Safqah speaks

## Purpose
Write every Safqah string so an investor understands it on first read, in Arabic first, with exact numbers, correct Sharia vocabulary and no pressure. Produce copy that drops straight into Syntropy components (`Button`, `Input Helper Text`, `Alert`, `Toast`, `EmptyState`, `BottomSheet`) within their length limits, in both languages.

## Hard rules
1. **Write Arabic first; English is the translation.** Draft, measure and approve the Arabic string, then translate. When the two disagree, the Arabic decision wins.
   Why: most Safqah users read Arabic; a translated-from-English string reads foreign.
2. **Minimal copy.** A label, the control, at most one short hint. No explanatory paragraphs on screens, at most one `Alert` or `Banner` per screen, and prefer inline state over a `Toast`.
   Why: matches the restraint of shipped Safqah screens; every extra line competes with the numbers.
3. **Never use the em dash character** (U+2014) in any language, file, caption or code comment. Use a comma, a colon, a full stop, parentheses or «·».
   Why: Syntropy writing rule; the lint fails on it.
4. **Western digits (0-9) only**, in Arabic and English. Never Eastern Arabic digits (U+0660 to U+0669, U+06F0 to U+06F9), never the Arabic decimal, thousands or percent signs (U+066B, U+066C, U+066A).
   Why: matches Saudi banking apps; one digit system prevents misread money.
5. **Currency after the amount.** The riyal symbol inside amount components (`Icon / riyal`, `MoneyAmount`, `Stat`); «ر.س» or "SAR" as a text suffix everywhere else: `1,250.50 ر.س`, `1,250.50 SAR`. Never «SR», never «ريال» in a UI amount (long-form sentences only).
   Why: one placement rule in both locales.
6. **Decimals:** two for transactional money (`5,000.00 ر.س`), whole numbers allowed for projections and goals (`100,000 ر.س`), one for percentages (`8.5%`). Never round a rate up.
   Why: transactions are exact to the halala; rounded-up returns are a broken promise.
7. **Arabic percentage labels start with «نسبة»**: «نسبة صافي العائد», «نسبة العائد المتوقع», «نسبة الربح», «نسبة الإنجاز». Not for SAR amounts («صافي العائد 18,333 ر.س»), not for IRR («معدل العائد الداخلي»), not for coverage status labels.
   Why: tells the reader the value is a ratio before they reach the number.
8. **Banned vocabulary:** loan «قرض», interest «فائدة» (and any riba framing of a product), APR, bonds «سندات», borrower «المقترض», lender «المُقرض», "Islamic bond", "dividend". Use the approved term from `references/terminology.md`: profit «الربح», profit rate «نسبة الربح», sukuk «صكوك», developer «المطور العقاري», investor «مستثمر», distributions «التوزيعات».
   Why: Safqah products are riba-free by structure; conventional-lending words misstate the product and create a Sharia and CMA problem.
9. **Returns are expected, never promised.** Label projections «متوقع» / "expected". Never «مضمون», «ثابت», «بدون مخاطر», "guaranteed", "fixed return", "risk-free".
   Why: CMA treats a guarantee claim on returns as misleading.
10. **No flattery, no fake urgency, no emoji on financial events.** No «صديقي», "you're amazing", «فرصة لا تعوض», "Hurry", "only 3 left" unless it is a live, true number shown neutrally. Never «مناسبة لك» / "recommended for you".
    Why: T3 and T6; pressure and suitability claims are dark patterns and a CMA risk.
11. **Errors say what happened and what to do next.** No blame («أدخلت رقماً خاطئاً»), no apology filler («عذراً», "Oops", "Sorry"), no error codes as the message, never «خطأ» alone.
    Why: T5; the user should fix it without reading twice.
12. **Buttons are verbs that say what happens.** «استثمر الآن», «تأكيد الاستثمار», «ادفع 5,000.00 ر.س», «أودع 2,000 ر.س وأكمل». Never «موافق» / "OK" or «اضغط هنا» / "Click here" for a commitment.
    Why: the label is the user's consent; it must name the commitment.
13. **Success confirms the result and names the thing**: «تم استثمار 5,000.00 ر.س في الحجاز ريفيرا». Not «تم!» / "Done!", no confetti.
    Why: confirms exactly what happened, in the words of the action.
14. **Warning tone for warnings; red only for critical or defaulted.** Late payment is `Tone=warning` («السداد متأخر. نتابع مع المطور.»); defaulted is `Tone=error` («الصفقة متعثرة. بدأت إجراءات التحصيل.»).
    Why: alarm fatigue; red must still mean something.
15. **Design-file captions read "This is the screen when the user ..."** (Arabic: «هذه الشاشة عندما ...»). Never number screens or flows.
    Why: numbers go stale the moment a flow changes; captions describe the state.
16. **Never invent figures, limits or citations.** Limits, fees, rates and deadlines come from the backend: write `{remaining_limit}`, `{fee}`, `{deadline}` placeholders, and real values only when the person supplies them.
    Why: limits differ by investor classification; a hardcoded number becomes a false statement.

## Workflow
1. **Identify the copy type and the component slot** (button, helper, error, empty, toast, push). Open `references/microcopy.md` for the pattern and limit; open the component guide in `references/data/components/<page>.md` (for example `toast.md`, `alert.md`, `empty-state.md`, `button.md`) to see its text props and defaults.
2. **Identify the moment and the tone** (onboarding, investing, payout, late, error, security). Open `references/voice-tone.md`.
3. **Check every term** against `references/terminology.md`. Replace banned words.
4. **Format every number** with `references/numbers-and-money.md`: digits, currency position, decimals, «نسبة», dates.
5. **Draft the Arabic** in clear Modern Standard Arabic, gender-neutral where possible (`references/arabic-writing.md`). Measure it against the limit.
6. **If it is an error**, apply the formula in `references/error-messages.md` and reuse the closest of its real examples.
7. **If it is a notification, SMS or email subject**, use `references/notifications.md` (service versus marketing, opt-in, purpose in OTP messages).
8. **If the copy touches money, risk, fees, returns, consent or the Sharia statement**, apply the syntropy-compliance-ux skill rules (fees and returns, risk statements, anti-pressure) and keep regulated wording as Compliance supplies it.
9. **Translate to English** after the Arabic is final. Translate meaning, not words.
10. **Run `references/copy-checklist.md`** on both languages and fix every fail before answering.
11. **Deliver** as a table: slot or key, Arabic, English, component and variant, notes. Arabic column first.

## Decision tables

### Which pattern carries the message
| Need | Use | Not |
|---|---|---|
| Field is invalid | Inline `Input Helper Text` error under the field, with the fix | A `Toast` or a `Dialog` |
| Action failed, user can retry here | `Alert` `Tone=error` inside the sheet or screen, with «إعادة المحاولة» | A full error screen |
| Screen could not load | `EmptyState` `Tone=error` + «إعادة المحاولة» | A blank screen, «حدث خطأ ما» |
| Something needs attention soon but is not broken | `Alert` or `Banner` `Tone=warning` | Red error styling |
| Quick, reversible confirmation after an action | `Toast` `Tone=success`, title 2 to 5 words | A modal the user must close |
| Irreversible or money-moving confirmation | `BottomSheet` summary with a verb button naming the amount | `Dialog` with «موافق» / «إلغاء» |
| Nothing to show yet | `EmptyState`: what the state is + what happens next + one action | An apology or a sad emoji |
| Offline | `Toast` `Tone=warning` `Size=Small` «لا يوجد اتصال» | `Tone=error` |
| Completed money action | Success screen naming amount, deal and reference | A toast alone |

### Which label for a number
| Value | Arabic label | English label |
|---|---|---|
| Expected return as % | «نسبة العائد المتوقع» `8.5%` | "Expected return" `8.5%` |
| Net return as % | «نسبة صافي العائد» `13.8%` | "Net return" `13.8%` |
| Net return in SAR | «صافي العائد» `18,333.00 ر.س` | "Net return" `18,333.00 SAR` |
| Profit rate | «نسبة الربح» `16.0%` | "Profit rate" `16.0%` |
| IRR | «معدل العائد الداخلي» `15.2%` | "IRR" `15.2%` |
| Funding progress | «نسبة التمويل» `72%` | "Funded" `72%` |
| Construction progress | «نسبة الإنجاز» `40.5%` | "Completion" `40.5%` |
| Guarantee coverage state | Status wording, no «نسبة» | Status wording |

### Tone by state
| State | Tone | Example (Arabic / English) |
|---|---|---|
| Info, neutral fact | `Tone=info` or neutral | «يجب أن يكون الحساب باسمك كما في الهوية» / "The account must be in your name, as on your ID" |
| Needs action, not broken | `Tone=warning` | «مطلوب تحديث شهادة الآيبان» / "Please update your IBAN certificate" |
| Late payment (30 days) | `Tone=warning` | «السداد متأخر. نتابع مع المطور.» / "Payment is late. We're following up with the developer." |
| Blocking failure | `Tone=error` | «لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ.» / "Payment didn't go through. No amount was charged." |
| Defaulted | `Tone=error` | «الصفقة متعثرة. بدأت إجراءات التحصيل.» / "This deal has defaulted. Recovery has started." |
| Done | `Tone=success` | «تم إنشاء التنبيه» / "Alert created" |

### Request that breaks the rules
| The person asks for | Do instead |
|---|---|
| "Hurry, only 3 slots left!" | Show the real figure neutrally: «المتبقي لإكمال التمويل 300,000 ر.س»; a real closing date: «تغلق الصفقة في 20 أكتوبر 2026» |
| "Guaranteed 16% return" | «نسبة العائد المتوقع 16.0% سنوياً» + the risk line |
| "Call it a loan with 16% interest" | «صكوك مرابحة بنسبة ربح متوقعة 16.0%»; developer, not borrower |
| "Sorry! Something went wrong 😔" | «تعذر تحميل الصفقة» + «إعادة المحاولة» |
| "Make the CTA say OK" on the invest step | «تأكيد الاستثمار» or «استثمر 5,000 ر.س» |
| A paragraph explaining the screen | One hint line; move the rest to a help article or `BottomSheet` |
| "Recommended for you" | Behavioural reason: «لأنها تشبه استثمارك في مدماك» |

Push back politely in one sentence, name the rule, and give the Syntropy version in both languages.

## Self-check before answering
- [ ] Arabic column exists, comes first, and was written first.
- [ ] Every string is within its limit (`references/microcopy.md`); at most one hint per field.
- [ ] No em dash anywhere in the answer, including notes.
- [ ] Digits are 0-9; no Eastern Arabic digits or Arabic decimal, thousands or percent signs.
- [ ] Currency follows every amount; two decimals on transactions; one decimal on percentages.
- [ ] Every Arabic percentage label starts with «نسبة» (except IRR, SAR amounts, coverage status).
- [ ] No banned term (loan, interest, فائدة, قرض, سندات, مقترض, bonds, borrower, APR, guaranteed, مضمون).
- [ ] Returns marked «متوقع» / expected.
- [ ] No flattery, no exclamation marks, no emoji on money, no invented urgency or scarcity.
- [ ] Errors: what happened + next action; no blame; no «عذراً» / "Oops".
- [ ] Buttons are verbs that name the result; commitment buttons name the amount where the pattern does.
- [ ] Success copy names the amount, deal or item.
- [ ] Warning versus error tone is correct; red only for blocking failures and defaulted states.
- [ ] Limits, fees, dates are real values supplied by the person or `{placeholders}`.
- [ ] Captions read "This is the screen when the user ..."; no screen numbers.
- [ ] Arabic punctuation «،» «؟» «؛» and guillemets «» used; no Eastern digits slipped in from a translator.

## References
| File | Open when |
|---|---|
| `references/voice-tone.md` | Choosing tone for a moment; T1 to T6 with Safqah examples; words that set the wrong tone |
| `references/microcopy.md` | Writing any UI string: buttons, links, labels, placeholders, helper text, empty states, confirmations, success, toasts, alerts, tooltips, captions, with AR/EN do and don't and limits |
| `references/numbers-and-money.md` | Any string with a number: SAR, decimals, percentages, «نسبة», signs, ranges, compact numbers, durations, dates |
| `references/terminology.md` | Naming a financial, Sharia, regulatory or status concept; the approved and banned table |
| `references/error-messages.md` | Writing an error: the formula plus 27 real Safqah examples (OTP, IBAN, payment, KYC, limits, offline, session) |
| `references/notifications.md` | Push, in-app notification, SMS and email copy; service versus marketing; OTP purpose |
| `references/copy-checklist.md` | The pass or fail checklist before handing copy over |
| `references/arabic-writing.md` | MSA versus dialect, gender-neutral phrasing, avoiding literal translation, punctuation, plurals, Latin brand names |
| `references/data/content/voice-tone.md` | Source tone rules (T1 to T6) from the knowledge base |
| `references/data/content/copy-lengths.md` | Source length limits per copy type |
| `references/data/content/numbers-currency.md` | Source number, currency and date rules |
| `references/data/content/glossary.md` | Full glossary: products, statuses, regulators, design system vocabulary |
| `references/data/content/quality-checklist.md` | Marketing and campaign content checklist |
| `references/data/components/<page>.md` | Text props, defaults and real copy of a component (for example `toast.md`, `alert.md`, `empty-state.md`, `otp-input.md`, `button.md`, `sharia-cma-disclosure.md`) |

Related skills: syntropy-rtl-arabic (bidi, mirroring, dates and digits in layout), syntropy-compliance-ux (fees and returns, risk statements, anti-pressure, consent), syntropy-patterns (screen-level copy in context), syntropy-accessibility (spoken labels), syntropy-figma (putting copy into Figma text properties).
