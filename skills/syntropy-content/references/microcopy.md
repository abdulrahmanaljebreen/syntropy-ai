<!-- syntropy-lint-disable fake-urgency -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Microcopy by type

Patterns, limits and Arabic/English do and don't for every kind of UI string in Safqah. Open the section for the slot you are filling. Limits are words unless stated; size slots for the Arabic string. Arabic is always written first.

## Limits at a glance
| Type | Limit (AR and EN) | Shape | Component slot |
|---|---|---|---|
| Button | 1-3 words (up to 4 when the amount is in the label) | Verb first, names the result | `Button` `Label`, `SheetFooter` |
| Link | 1-4 words | Names the destination | `Link` |
| Field label | 1-3 words | Noun phrase | `Input Label`, `Form Field Label` |
| Placeholder | 1-4 words or a format example | Example or action, never the only label | `Input Value` |
| Helper text | 8-15 words, one sentence | What to enter and why | `Input Helper Text`, `Form Field Helper` |
| Error | 8-20 words | What happened + what to do | `Input Helper Text` `State=error`, `Alert` |
| Empty state | 5-20 words (title + one line) | What the state is + what happens next | `EmptyState` |
| Success | 5-15 words | Confirms the result, names the thing | Success screen, `Toast` |
| Toast title | 2-5 words, optional one-line description | Result | `Toast` |
| Alert / Banner title | 2-6 words, optional one sentence | State + action | `Alert`, `Banner` |
| Dialog / sheet title | 2-6 words | The decision as a question or action | `Dialog`, `SheetHeader` |
| Tooltip / popover | 1-2 short sentences | Definition | `Tooltip`, `Popover` |
| Status label | 1-2 words | Canonical status | `StatusPill`, `IssuanceStatusBadge (Investor)` |
| Push title | about 30 characters | The event | see `notifications.md` |
| Push body | about 90 characters | Amount, deal, next step | see `notifications.md` |

If a message does not fit, the pattern is wrong: move detail to a `BottomSheet`, a help article or a `ShariaDisclosure`, not into a longer string.

## Buttons
Rules: verb first; say what happens; the primary action on a commitment names the commitment (and the amount where the pattern does); secondary actions are equally clear; one primary per screen.

| Do (AR / EN) | Don't (AR / EN) | Why |
|---|---|---|
| «استثمر الآن» / "Invest now" | «اضغط هنا للاستثمار في هذه الصفقة» / "Click here to invest in this deal" | Verb, short |
| «تأكيد الاستثمار» / "Confirm investment" | «موافق» / "OK" | Names the commitment |
| «ادفع 5,000.00 ر.س» / "Pay 5,000.00 SAR" | «متابعة» on the final payment step | Consent to an exact amount |
| «أودع 2,000 ر.س وأكمل» / "Deposit 2,000 SAR and continue" | «إيداع» when the user was investing | Says both steps |
| «إلغاء الاكتتاب» / "Cancel subscription" | «لا أريد» / "Nah" | Neutral, specific |
| «تعديل المبلغ» / "Edit amount" | «رجوع» on a review sheet | Says what changes |
| «إعادة المحاولة» / "Try again" | «حاول مرة أخرى يا صديقي» | Neutral |
| «السماح» / «ليس الآن» ("Allow" / "Not now") | «نعم، أريد الأرباح!» / «لا شكراً، لا أهتم» | Equal weight, no confirmshaming |
| «نبهني بصفقات مشابهة» / "Notify me of similar deals" | «لا تفوّت الفرصة القادمة!» | No pressure |

Edge cases:
- Disabled button labels describe the state when the action is impossible: «اكتمل التمويل» / "Fully funded".
- Destructive actions name the object: «حذف الحساب البنكي» / "Remove bank account", styled per the `Button` guide, never only colour.
- Icon-only buttons still need an accessible label: «رجوع», «مشاركة», «حفظ», «إغلاق».
- Arabic verb form: use the established imperative for primary CTAs («استثمر», «أودع», «ادفع») and verbal nouns for neutral actions («حفظ», «متابعة», «إلغاء», «تعديل»). See `arabic-writing.md`.

## Links
| Do | Don't |
|---|---|
| «كيف نحسبها» / "How we calculate this" | «اضغط هنا» / "Click here" |
| «ما هو المستثمر المؤهل؟» / "What is a qualified investor?" | «المزيد» on its own for a regulated topic |
| «سياسة الخصوصية» / "Privacy policy" at the point of collection | A privacy link only in the footer |
| «عرض الكل» / "See all" in a `Section` header when more items exist | «عرض الكل» when everything is already visible |

The built `ShariaDisclosure` and `ComplianceBadge` carry their own learn-more label; keep it as built and make sure it opens the real document.

## Field labels
- A noun phrase, no colon, no question unless the pattern is a question (KYC UBO: «هل أنت المستفيد الحقيقي من الحساب؟»).
- Mark the optional fields, not the required ones, when most are required: «(اختياري)» / "(optional)".

| Do | Don't |
|---|---|
| «رقم الجوال» / "Phone number" | «الرجاء إدخال رقم الجوال الخاص بك هنا:» |
| «مبلغ الاستثمار» / "Investment amount" | «المبلغ الذي ترغب في استثماره» |
| «الآيبان» / "IBAN" | «رقم الحساب البنكي الدولي (IBAN)» in the label (put the explanation in a tooltip if needed) |
| «رقم الهوية» / "ID number" | «رقم الهوية الوطنية أو الإقامة أو جواز السفر» |

## Placeholders
- Never the only label (it disappears on typing and fails accessibility).
- Use a format example or a short action: «5X XXX XXXX», «SA00 0000 0000 0000 0000 0000», «بحث» / "Search", «اختر فئة» / "Select a category".
- No instructions in placeholders («أدخل المبلغ هنا بالريال السعودي فقط»).

## Helper text
One sentence, 8-15 words, says what to enter or why. One hint per field: never helper + description + tooltip stacked.

| Do (AR / EN) | Don't |
|---|---|
| «يرجى إدخال رقم الجوال السعودي المسجل لديك» / "Enter your registered Saudi phone number" | A three-sentence paragraph about why phone numbers matter |
| «يجب أن يكون الحساب باسمك كما في الهوية» / "The account must be in your name, as on your ID" (shown before entry) | The same rule shown only after a rejection |
| «بمضاعفات 1,000 ر.س، حتى 500,000 ر.س للدفعة» / "In multiples of 1,000 SAR, up to 500,000 SAR per payment" | «الحد الأدنى: 1,000 ريال» (word «ريال» in a UI amount) |
| «تدعم الصيغ التالية (PDF, JPEG, JPG, PNG)» / "Supported formats: PDF, JPEG, JPG, PNG" | Formats revealed only by an error |

Built defaults to override: `Input Amount` ships a helper in the form "Minimum investment: SAR 1,000"; rewrite as «الحد الأدنى للاستثمار 1,000 ر.س» / "Minimum investment 1,000 SAR".

## Empty states
Formula: **what the state is** + **what happens next** + at most one action. No apology, no emoji, no blame. Filter-empty never borrows the supply-empty copy.

| Situation | Arabic | English | Action |
|---|---|---|---|
| No open deals (supply) | «لا توجد صفقات مفتوحة حالياً. سنخبرك عند توفر صفقة جديدة.» | "No open deals right now. We'll notify you when a new deal is available." | «أنشئ تنبيهاً» / "Create alert" |
| Filters match nothing | «لا توجد صفقات بهذه الفلاتر» | "No deals match these filters" | «مسح الفلاتر» / "Clear filters" |
| No goal yet | «لم تحدد أي هدف بعد» | "No goal set yet" | «أنشئ هدفاً» / "Create goal" |
| Empty portfolio | «لا توجد استثمارات بعد. تظهر هنا استثماراتك وتوزيعاتها.» | "No investments yet. Your investments and their distributions appear here." | «تصفح الصفقات» / "Browse deals" |
| Search no results | «لا نتائج مطابقة» | "No matching results" | none |
| Under review | «طلبك قيد المراجعة» + expected time | "Your application is under review" + expected time | «تصفح الصفقات» |

Don't: «عذراً! لا يوجد شيء هنا 😔» / "Sorry! Nothing here 😔"; «لا توجد صفقات، سارع قبل أن تفوتك الصفقة القادمة!».

## Errors
Formula and 27 real examples: `error-messages.md`. Short form:
- Inline field error: the rule or the fix, not the error name: «أدخل رقم الهوية» / "Enter your ID number", not «هذا الحقل مطلوب» / "This field is required" (acceptable only when the label is directly above and the field is obvious).
- Never «خطأ» / "Error" alone, never a code alone, never «حدث خطأ ما» / "Something went wrong" without the next step.

## Confirmations (dialogs and review sheets)
- Title states the decision: «إلغاء الاكتتاب؟» / "Cancel this subscription?", «مراجعة الاستثمار» / "Review investment".
- Body (if any) states the consequence in one sentence with the real number or date: «سيُعاد 5,000.00 ر.س إلى محفظتك.» / "5,000.00 SAR returns to your wallet."
- Buttons name both outcomes: «إلغاء الاكتتاب» / «الإبقاء على الاكتتاب» ("Cancel subscription" / "Keep subscription"), never «نعم» / «لا».
- No "are you sure" walls on leaving, cash-out or unsubscribing (confirmshaming and hard-to-cancel are dark patterns).

## Success
Confirm the result, name the thing, give the next step if there is one. No emoji, no confetti, no exclamation mark.

| Do | Don't |
|---|---|
| «تم استثمار 5,000.00 ر.س في الحجاز ريفيرا» / "5,000.00 SAR invested in Hijaz Riviera" | «تم!» / "Done!" |
| «تم إيداع 5,000.00 ر.س في محفظتك» / "5,000.00 SAR added to your wallet" | «عملية ناجحة 🎉» |
| «تم توثيق حسابك» + «ابدأ الاستثمار» / "Your account is verified" + "Start investing" | «أهلاً بك في عائلة صفقة! أنت الآن جاهز للانطلاق!» |
| «تم الاكتتاب. يمكنك الإلغاء حتى 17 أكتوبر 2026، 14:30» | Success screen that hides the cancellation right |

## Toasts
- Use sparingly; prefer an inline state change. Never for errors that need action and never for anything the user must read later.
- Title 2-5 words, optional one-line description. Tone matches the event.

| Do | Don't |
|---|---|
| `Tone=success` «تم إنشاء التنبيه» / "Alert created" | A toast plus a dialog for the same event |
| `Tone=success` «تم الإيقاف» after switching marketing SMS off | «تم تحديث تفضيلاتك بنجاح!! 👍» |
| `Tone=warning` `Size=Small` «لا يوجد اتصال» / "No connection" | `Tone=error` for offline |
| «تم نسخ الآيبان» / "IBAN copied" | A toast for every tap |

Built default to override: the Arabic `Toast` example ships «تم استثمار 5,000 ﷼.» Use two decimals on a transaction: «تم استثمار 5,000.00 ر.س» (or the riyal symbol through the amount component).

## Alerts and banners
- One per screen at most. Title 2-6 words, optional one sentence, optional one action.
- `Tone=info` for rules shown before an action, `Tone=warning` for needs-attention, `Tone=error` only for blocking failures and defaulted states.

| Do | Don't |
|---|---|
| `Tone=warning` «مطلوب تحديث شهادة الآيبان» + «تحديث» | Three stacked alerts on the KYC hub |
| `Tone=info` «يجب أن يكون الحساب باسمك كما في الهوية» before the IBAN field | The rule only after rejection |
| `Tone=warning` «اكتمل تمويل الصفقة» when the deal fills during entry | `Tone=error` «فشلت العملية» |

## Tooltips and popovers
Define a term in 1-2 sentences. Never hide fees, risks or limits in a tooltip.
- «نسبة صافي العائد: العائد بعد خصم الرسوم، محسوباً سنوياً.» / "Net return: the return after fees, annualised."

## Status labels
Use the canonical investor-facing labels from `terminology.md` («مجدولة», «جارٍ جمع الأموال», «مموّلة», «نشطة», «متأخرة», «متعثرة», «مسددة بالكامل»). Terse: 1-2 words. Tone by meaning, not by preference.

## Accessibility labels
- Read as one phrase: «نسبة العائد المتوقع، 8.5 بالمئة».
- Amounts spoken in full: «1,250.00 ريال سعودي» (the visible text keeps «ر.س»).
- Masked values: «ينتهي بـ 1234», «الرصيد مخفي».
- Mirrored icons keep their meaning: «رجوع», never «يمين».

## Screen captions in design files
- Format: "This is the screen when the user ..." / «هذه الشاشة عندما ...».
  - "This is the screen when the user enters an amount above their remaining limit."
  - «هذه الشاشة عندما يدخل المستخدم مبلغاً أكبر من حده المتبقي.»
- Never number screens or flows ("Screen 3", "Flow 2.1"); describe the state instead.
- Captions are for the team, not users: they may be in English or Arabic, following the team's lead.

## Sources
- `references/data/content/copy-lengths.md`, `references/data/content/voice-tone.md`.
- Component guides in `references/data/components/`: `button.md`, `toast.md`, `alert.md`, `banner.md`, `empty-state.md`, `input.md`, `amount-input.md`, `form-field.md`, `file-upload.md`, `sharia-cma-disclosure.md`.
- Syntropy patterns: deal list, deal page, invest and reserve, payment, KYC. Compliance guidance: PDPL consent, CMA, SAMA consumer protection.
