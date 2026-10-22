# Writing Arabic for Safqah

How to write clear, natural Arabic UI copy: register, gender-neutral phrasing, avoiding literal translation, punctuation, plurals and mixed Latin names. Open this when drafting Arabic, reviewing a translation, or when a string "reads translated".

## Rules
1. **Clear Modern Standard Arabic (فصحى مبسطة).** Short sentences, common words, no classical flourish, no Saudi or other dialect in product copy.
   Why: MSA reads correctly for every Arabic speaker and matches Saudi banking apps; dialect reads unserious in a financial context.
2. **Write the Arabic, do not translate the English.** Start from the meaning and the moment; English follows.
   Why: literal translations produce long, foreign sentences.
3. **Default to gender-neutral phrasing** with the strategies below; when a conventional imperative is the established pattern (primary CTA), keep it.
   Why: Safqah serves men and women; neutral forms avoid excluding either.
4. **Arabic punctuation**: «،» comma, «؛» semicolon, «؟» question mark, «» quotation marks; full stop «.» is shared. No exclamation marks in UI.
   Why: correct pauses for readers and screen readers.
5. **Plurals through ICU plural rules**, never by string concatenation.
   Why: Arabic has six plural categories; concatenation breaks grammar.
6. **Latin brand and product names stay Latin when they have no official Arabic form** (Apple Pay, Face ID, PDF); use the official Arabic name when one exists (نفاذ، أبشر، مدى، صفقة).
   Why: users recognise the official form; transliteration invents spellings.

## Register: MSA, not dialect
| Do (MSA) | Don't (dialect or colloquial) |
|---|---|
| «ماذا تريد أن تستثمر؟» or better a label: «مبلغ الاستثمار» | «وش تبغى تستثمر؟» |
| «أرغب في استلام العروض» | «أبغى توصلني العروض» |
| «حسابك» | «حسابك حقك» |
| «لاحقاً» | «بعدين» |
| «تم» | «خلاص» |
Avoid heavy classical forms too: «يُرجى التكرم بإدخال» → «أدخل» or «يرجى إدخال».

## Gender-neutral strategies
Arabic second-person forms are gendered. Use these, in order of preference:

| Strategy | How | Example |
|---|---|---|
| Verbal noun (مصدر) for buttons and labels | Name the action, not the actor | «حفظ»، «متابعة»، «إلغاء»، «تأكيد الاستثمار»، «تعديل المبلغ»، «إعادة المحاولة» |
| Impersonal or passive for results | Say what happened | «تم استلام طلبك»، «تم توثيق الحساب»، «أُودع 1,240.00 ر.س في محفظتك» |
| First-person plural for Safqah's actions | Safqah is the actor | «سنخبرك عند توفر صفقة جديدة»، «نتابع مع المطور» |
| Possessive suffix without diacritics | Undiacritised «ـك» reads for both genders | «حسابك»، «محفظتك»، «طلبك» |
| Nouns for general statements | Talk about the role | «يمكن للمستثمر المؤهل ...» rather than «إذا كنتَ ...» |
| Avoid gendered adjectives about the user | No «جاهز/جاهزة», «متأكد/متأكدة» | «إلغاء الاكتتاب؟» instead of «هل أنت متأكد من الإلغاء؟» |
| Established imperative for primary CTAs | Accepted convention in Saudi apps | «استثمر الآن»، «أودع»، «ادفع 5,000.00 ر.س» |

Never add diacritics that fix a gender («حسابكَ»، «حسابكِ»). When the product knows the user's gender and Product decides to personalise, keep it to greetings, never to money or legal copy.

## Avoid literal translation
| English source | Literal (don't) | Natural (do) |
|---|---|---|
| "You're all set!" | «أنت جاهز تماماً!» | «تم توثيق حسابك» |
| "Oops, something went wrong" | «عفواً، حدث خطأ ما» | «تعذر تحميل الصفقة» + «إعادة المحاولة» |
| "Your investment is on its way" | «استثمارك في طريقه» | «جارٍ تأكيد الدفع» |
| "Get started" | «احصل على البدء» | «ابدأ الآن» or «ابدأ الاستثمار» |
| "Learn more" (generic) | «تعلم المزيد» | A specific link: «كيف نحسبها»، «ما هو المستثمر المؤهل؟» |
| "Tap to copy" | «انقر للنسخ» | Copy icon with label «نسخ» |
| "Are you sure?" | «هل أنت متأكد؟» | State the decision: «إلغاء الاكتتاب؟» |
| "No worries!" | «لا تقلق!» | Remove; state the fact |
| "Funds will be credited" | «سيتم ائتمان الأموال» | «سنضيف المبلغ إلى محفظتك» |
| "Please be advised that..." | «يرجى العلم بأن...» | Remove; state the fact |
| "Submit" | «إرسال» on every form | The result: «إرسال الطلب»، «حفظ الحساب البنكي» |

Overused construction: «سيتم + مصدر» («سيتم إرسال الرمز»). Prefer an active verb with Safqah as subject: «سنرسل الرمز إلى 05XXXXXXXX». Keep «تم + مصدر» for confirmations, where it is the natural Saudi UI form.

## Punctuation and typography in copy
| Item | Do | Don't |
|---|---|---|
| Comma | «المبلغ، المدة، العائد» | "المبلغ, المدة, العائد" |
| Question | «هل أنت المستفيد الحقيقي من الحساب؟» | «...الحساب?» |
| Quotes | «استثمر الآن» | "استثمر الآن" in Arabic prose |
| Separator in compact lines | «بطاقة مدى · فوري» | «بطاقة مدى - فوري» (hyphen can reorder in RTL) |
| Percent sign | `8.5%` | `8.5٪` |
| Ellipsis | «جارٍ التحميل…» (single character) | «جارٍ التحميل...» mixed |
| Tatweel (ـ) | Only for an attached preposition before a digit or Latin: «بـ 05»، «ينتهي بـ 1234» | Stretching words for justification |
| Em dash | Never | Never |
| Spaces | One space after «،» and «.»; none before | Space before «؟» |

## Spelling that matters
- Hamza on «إ / أ» and hamzat wasl: «استثمار»، «إيداع»، «إلغاء»، «أودع». Imperatives of hamzat-wasl verbs start with «ا»: «اعرف»، «استثمر».
- «ى» versus «ي» at word end: «على»، «إلى»، «مستوى».
- «ة» versus «ه»: «صفقة»، «محفظة».
- Keep «الآيبان» (with madda) consistently.
- Note: built compliance components ship a learn-more label in their own spelling; keep component copy as built and flag spelling issues to the design system team rather than editing instances.

## Numbers inside Arabic sentences
- Western digits; the number keeps its left-to-right order; currency after it: «استثمرت 10,000.00 ر.س في الريم 46».
- Counted nouns (ICU plural categories for Arabic):
| Category | Count | Example |
|---|---|---|
| zero | 0 | «لا توجد صفقات» |
| one | 1 | «صفقة واحدة» |
| two | 2 | «صفقتان» |
| few | 3-10 | «3 صفقات» |
| many | 11-99 | «11 صفقة» |
| other | 100+ and decimals | «100 صفقة» |
ICU example: `{count, plural, zero {لا توجد صفقات} one {صفقة واحدة} two {صفقتان} few {# صفقات} many {# صفقة} other {# صفقة}}`.
- Never build a sentence from fragments around a number («لديك» + n + «صفقات»); use one message with a placeholder so grammar and screen-reader output stay correct.

## Mixed Latin and Arabic
- Brand names without an Arabic form stay Latin: «ادفع عبر Apple Pay»، «تفعيل Face ID»، «تدعم الصيغ التالية (PDF, JPEG, JPG, PNG)».
- Official Arabic names win: «تسجيل دخول عبر نفاذ» (not «Nafath»), «بطاقة مدى».
- Deal names keep the form the issuer registered (Arabic or Latin); never translate a proper noun.
- Do not put «الـ» before a Latin word («الـ IBAN»); use the Arabic term «الآيبان».
- Mixed strings need bidi isolation in code and Figma: see the syntropy-rtl-arabic skill (`bidi.md`).

## Sources
- `references/data/content/voice-tone.md` (Arabic canonical, T1, T3), `references/data/content/numbers-currency.md`.
- Syntropy accessibility guidance on Arabic screen readers (Arabic comma, ICU messages, spoken amounts).
- `references/data/components/social-button.md` («تسجيل دخول عبر نفاذ»), `file-upload.md` (Latin format names), `date-picker-time-picker.md` (Arabic month names).
