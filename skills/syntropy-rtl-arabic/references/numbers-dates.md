<!-- syntropy-lint-disable eastern-arabic-numerals, percent-label-nisba -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Numbers, dates, phones and IBANs in RTL

How numeric data is written and rendered inside Arabic RTL screens: digits, separators, amounts, percentages, signs, Hijri and Gregorian dates, times, phone numbers and IBANs, with the isolation each one needs. Open this whenever a screen shows a number. Copy wording (labels such as «نسبة») lives in the syntropy-content skill.

## Rules
1. **Western digits (0-9) everywhere**, including Arabic UI, inputs, tables, charts and notifications. Never ٠-٩ (Arabic-Indic) or ۰-۹ (Extended Arabic-Indic).
   Why: Saudi banking convention; one digit system; screen readers read Western digits as Arabic number words.
2. **Normalise input**: accept Eastern digits typed by the user and convert them to Western before validation, search and storage.
   Why: Arabic keyboards can produce Eastern digits; rejecting them is hostile, storing them breaks matching.
3. **Comma thousands, full-stop decimal**: `1,250.50`. Never «٬» or «٫», never the Arabic percent «٪».
   Why: locale defaults in ICU and `intl` produce these for `ar`; override them.
4. **Currency after the amount** in both directions: `1,250.50 ر.س`, `1,250.50 SAR`. In RTL the suffix renders on the left of the number, which is "after" in reading order.
   Why: one rule for both locales.
5. **A number never reverses**; groups inside a number (phone, IBAN) never reorder. Isolate them when they sit inside Arabic text.
   Why: the bidi algorithm reorders space-separated digit groups in an RTL paragraph.
6. **Signs and ranges need care**: a leading minus or plus can jump to the wrong side in RTL; ranges with a hyphen can reverse. Isolate signed numbers; write Arabic ranges with words.
   Why: `-` and `+` are bidi-weak characters.
7. **Calendar by context**: Gregorian for money events, Hijri for religious dates; when both appear together, suffix the year with «م» and «هـ».
   Why: R5; the suffix removes ambiguity.
8. **Dates use month names, never numeric dates in UI**: `15 مارس 2026`, `15 Mar 2026`.
   Why: `15/03/2026` is ambiguous and is read as a fraction by screen readers.
9. **Force formatting, do not trust locale defaults.** `Intl.NumberFormat('ar-SA')` and `NumberFormat(..., 'ar')` may output Eastern digits, «٫» and «٪». Format digits with a Latin numbering system and add the Arabic suffix yourself.
   Why: defaults vary by platform and library version.

## Amounts and percentages
| Value | Arabic UI | English UI | Notes |
|---|---|---|---|
| Transaction | `1,250.50 ر.س` | `1,250.50 SAR` | Two decimals |
| Projection or goal | `100,000 ر.س` | `100,000 SAR` | Whole number allowed |
| Amount component | number + riyal symbol after it in reading order | same | Use `MoneyAmount`, `Stat`, `Input Amount` as built |
| Percentage | `8.5%` | `8.5%` | `%` right after the number, no space; never `٪` |
| Change up | `+4.2%` | `+4.2%` | Isolate in Arabic text; spoken «ارتفاع 4.2 بالمئة» |
| Change down | `-2.5%` | `-2.5%` | Isolate; spoken «انخفاض 2.5 بالمئة» |
| Compact | `1.2 مليون ر.س` | `1.2M SAR` | Displays and axes only, never transactions |
| Range | «من 1,000 إلى 5,000 ر.س» | "1,000 to 5,000 SAR" | Words avoid reversal |

Component note: the `Input Amount` RTL variant positions its riyal symbol as built; use it unchanged. For text and display amounts the suffix rule above applies.

## Dates
| Calendar | Arabic | English | Use for |
|---|---|---|---|
| Gregorian | `15 مارس 2026` | `15 Mar 2026` or `15 March 2026` | Payouts, maturity, statements, distribution schedules, cancellation and reservation deadlines |
| Hijri | `1 رمضان 1447` | `1 Ramadan 1447` | Ramadan, Eid, Zakah due dates |
| Both together | `15 مارس 2026 م (26 رمضان 1447 هـ)` | `15 Mar 2026 (26 Ramadan 1447 AH)` | Where a religious date meets a financial one (Zakah statements) |
| Date and time | `15 أكتوبر 2026، 18:00` | `15 Oct 2026, 18:00` | Deadlines; always absolute next to any countdown |
| Expected | «متوقع 7 يناير 2027» | "Expected 7 January 2027" | Projected payouts |

Gregorian month names in Arabic UI (long form, never abbreviated): يناير، فبراير، مارس، أبريل، مايو، يونيو، يوليو، أغسطس، سبتمبر، أكتوبر، نوفمبر، ديسمبر. (The date picker guide spells April «إبريل»; keep one spelling per product.)
Hijri months: محرم، صفر، ربيع الأول، ربيع الآخر، جمادى الأولى، جمادى الآخرة، رجب، شعبان، رمضان، شوال، ذو القعدة، ذو الحجة.

Computing Hijri: use the Umm al-Qura calendar (`islamic-umalqura`), the official Saudi calendar. Example conversions: 18 Feb 2026 = 1 رمضان 1447; 15 Mar 2026 = 26 رمضان 1447; 15 Oct 2026 = 4 جمادى الأولى 1448. Never hardcode conversions; compute them.

```js
// Web: Western digits, Arabic month names, Umm al-Qura
const hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn',
  { day: 'numeric', month: 'long', year: 'numeric' }).format(date);   // "26 رمضان 1447 هـ"
const greg = new Intl.DateTimeFormat('ar-SA-u-ca-gregory-nu-latn',
  { day: 'numeric', month: 'long', year: 'numeric' }).format(date);   // "15 مارس 2026"
```
```dart
// Flutter: format Gregorian with Arabic month names, then force Western digits.
String toWestern(String s) => s.replaceAllMapped(RegExp('[٠-٩]'),
    (m) => String.fromCharCode(m[0]!.codeUnitAt(0) - 0x0660 + 0x30));
final greg = toWestern(DateFormat('d MMMM y', 'ar').format(date)); // 15 مارس 2026
// Hijri: use a Umm al-Qura package approved by the team; do not hand-roll conversions.
```
The date picker has no Hijri mode yet: flag it as a gap, do not fake a Hijri picker.

## Times and durations
- 24-hour (`18:00`) or 12-hour with «ص» / «م» (`6:00 م`); pick one per product and keep it.
- Time ranges in Arabic: «من 09:00 إلى 17:00», not «09:00 - 17:00» (reverses in RTL).
- Durations: «12 شهراً» in sentences, «12 شهر» in compact metrics; «خلال 3 أيام».

## Phone numbers
| Form | Display | Notes |
|---|---|---|
| Local mobile | `0541234567` or `054 123 4567` | Grouped only if isolated |
| International | `+966 54 123 4567` | `+` stays on the left; isolate the whole run |
| Input hint | `5X XXX XXXX` | `Input Phone` with the country code part `+966` |
| Masked | `05X XXX 4567` | Spoken «ينتهي بـ 4567» |

Why isolation is needed: in an RTL paragraph, digit groups separated by spaces are laid out right to left, so `+966 54 123 4567` can render as `4567 123 54 966+`. Wrap the number: `"⁦+966 54 123 4567⁩"` (LRI ... PDI) in a string, `<bdi dir="ltr">` or `<span dir="ltr">` on web, `Directionality(textDirection: TextDirection.ltr, child: Text(phone))` or `Text(phone, textDirection: TextDirection.ltr)` in Flutter. Phone inputs use a phone keyboard and keep the value LTR inside the RTL field (`Input Phone` guide).

## IBAN
| Rule | Example |
|---|---|
| Groups of four, uppercase | `SA03 8000 0000 6080 1016 7519` |
| Saudi IBAN = `SA` + 22 digits (24 characters) | validation hint: «الآيبان يبدأ بـ SA ويتكون من 24 خانة» |
| Always isolated LTR | `⁦SA03 8000 0000 6080 1016 7519⁩` |
| Fully visible on transfer screens, with copy | `KeyValue` `Layout=stacked` `Emphasis=strong`, copy icon |
| Masked in lists | `SA•• •••• •••• •••• •••• 7519`, spoken «ينتهي بـ 7519» |
| Copy action copies without spaces or marks | `SA0380000000608010167519` |

Strip isolates, LRM and spaces when copying or submitting: invisible marks inside a copied IBAN break bank transfers.

## Card numbers, references, codes
- Card: `•••• 1234`; isolate if inside Arabic text.
- References: `C-20261015-0042` isolated (the hyphens are weak characters).
- OTP value: digits in typed order; the `OTP Input` component handles box order in RTL; never reverse the code string.

## Tables and alignment
- Numeric columns use tabular (fixed-width) digits so decimals line up.
- In RTL tables, column order mirrors (first column on the right) but each number keeps its internal order.
- Align amounts consistently per column; the `Table / Cell` component sets alignment per its type.

## Sources
- `references/data/content/numbers-currency.md`; RTL rule R2 and R5.
- Component guides in the knowledge base: `input.md` (Input Phone), `amount-input.md`, `stat.md`, `date-picker-time-picker.md`, `otp-input.md`, `table.md`, `search.md` (normalise Eastern digits); Syntropy payment pattern (IBAN display).
- Syntropy accessibility guidance: Arabic screen-reader table (amounts, percentages, IBAN, masked values).
- `references/data/links.json` category `arabic-rtl`: W3C inline bidi markup, Flutter internationalization.
