<!-- syntropy-lint-disable percent-label-nisba -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Bidirectional text (bidi)

How mixed Arabic and Latin strings behave, why they break, and how to fix them in Flutter, on the web and in Figma. Open this for any string that mixes scripts or carries data: English deal or brand names, user names, emails, URLs, IBANs, phones, amounts with currency, signed numbers, ranges, codes.

## How the bidi algorithm sees a string
Every character has a bidi type. What matters in practice:
| Type | Characters | Behaviour |
|---|---|---|
| Strong RTL | Arabic letters | Set direction to RTL |
| Strong LTR | Latin letters | Set direction to LTR |
| Numbers | 0-9 | Laid out left to right internally, but take their position from the surrounding run |
| Weak separators | `+ - / : , .` `%` | Attach to numbers when between or next to digits, otherwise act neutral |
| Neutral | spaces, most punctuation, brackets, quotes | Take the direction of their neighbours; at a boundary they take the paragraph direction |

The paragraph direction (RTL in Arabic UI) decides where neutrals at the edges go and in which order separate runs are placed. Problems appear when an LTR run (or a number sequence) touches neutrals or sits at the start or end of an RTL paragraph.

## Unicode controls
| Name | Code point | Use |
|---|---|---|
| LRI (left-to-right isolate) | U+2066 | Start an isolated LTR span (IBAN, phone, email, URL, English name) |
| RLI (right-to-left isolate) | U+2067 | Start an isolated RTL span inside LTR text (Arabic name in English UI) |
| FSI (first-strong isolate) | U+2068 | Start an isolated span whose direction comes from its first strong character; best for user-generated text |
| PDI (pop directional isolate) | U+2069 | Close any isolate; always pair one PDI per LRI, RLI or FSI |
| LRM (left-to-right mark) | U+200E | Invisible strong LTR character; nudges a neutral (for example trailing punctuation after a Latin span) |
| RLM (right-to-left mark) | U+200F | Invisible strong RTL character; same in the other direction |
| ALM (Arabic letter mark) | U+061C | Like RLM, for Arabic contexts |
| LRE, RLE, PDF, LRO, RLO | U+202A, U+202B, U+202C, U+202D, U+202E | Older embeddings and overrides; do not use in new code (overrides can spoof text) |

Prefer isolates (FSI, LRI, RLI + PDI) over marks: isolates protect both sides of the span. Use marks only for small neutral fixes.

## Examples that break, and the fix
| # | String | Context | What goes wrong | Fix |
|---|---|---|---|---|
| 1 | `+966 54 123 4567` | Arabic line «رقم الجوال +966 54 123 4567» | Groups render in reverse order and `+` jumps to the right: `4567 123 54 966+` | Isolate LTR: `«رقم الجوال ⁦+966 54 123 4567⁩»` |
| 2 | `-2.5%` | «التغير -2.5%» | Minus lands on the right: `2.5%-` | Isolate: `⁦-2.5%⁩`, or show the sign with an arrow and words |
| 3 | `1,000 - 5,000 ر.س` | Arabic range | Order reverses visually | Words: «من 1,000 إلى 5,000 ر.س» |
| 4 | `09:00 - 17:00` | Arabic hours | Shows `17:00 - 09:00` | «من 09:00 إلى 17:00» |
| 5 | Deal name `الريم 46` | English UI "Invested in الريم 46." | Digits attach to the Arabic run: "Invested in 46 الريم." | `"Invested in ⁧الريم 46⁩."` (RLI ... PDI) or FSI for unknown names |
| 6 | `Riyadh Tower Project.` | Arabic «صفقة جديدة: Riyadh Tower Project.» | Usually fine; trailing punctuation can stick to the wrong side when the name ends the paragraph | FSI around the name: `«صفقة جديدة: ⁨Riyadh Tower Project⁩.»` |
| 7 | Email `name@example.com` | «أرسلنا الرمز إلى name@example.com.» | Full stop and `@` parts can reorder at the paragraph edge | `⁦name@example.com⁩` |
| 8 | URL `safqah.co/deals/46` | Arabic sentence | Slashes and digits reorder | `⁦safqah.co/deals/46⁩` or a link with Arabic text («صفحة الصفقة») |
| 9 | User name typed in Latin in an Arabic list | «مرحباً، Sarah» style greetings | Comma and name swap places | FSI around any user-generated text |
| 10 | Arabic user name in English back-office | "Owner: عبدالله الحربي (KYC)" | Parenthesis attaches to the Arabic run | FSI around the name |
| 11 | Reference `C-20261015-0042` | Arabic sentence | Hyphen-separated parts reorder | `⁦C-20261015-0042⁩` |
| 12 | `SAR 1,250.50` (code first) | Arabic sentence | Code drifts to the start of the line | Do not write code-first; write `1,250.50 ر.س` in Arabic copy |
| 13 | String built by concatenation | `"لديك " + n + " صفقات"` | Order and grammar both break, screen reader reads fragments | One ICU message with a placeholder, isolates applied to the value |

Never "fix" a string by reversing it or by moving characters manually: it breaks the other direction, copy-paste, search and screen readers.

## Flutter
```dart
// 1. Direction comes from the locale for the whole app.
MaterialApp(
  locale: const Locale('ar'),
  supportedLocales: const [Locale('ar'), Locale('en')],
  localizationsDelegates: GlobalMaterialLocalizations.delegates,
);

// 2. A standalone LTR value (IBAN, phone, code) inside an RTL layout:
Text(iban, textDirection: TextDirection.ltr); // intended: the value is LTR data

// Or a whole sub-tree:
Directionality(textDirection: TextDirection.ltr, child: Text(phone));

// 3. An LTR value inside an Arabic sentence: isolate it in the string.
String ltr(String s) => '⁦$s⁩';      // LRI ... PDI
String auto(String s) => '⁨$s⁩';     // FSI ... PDI for user input
final line = 'رقم الجوال ${ltr(phone)}';

// 4. Detect direction of user-generated text (package:intl).
final isRtl = Bidi.detectRtlDirectionality(name);
Text(name, textDirection: isRtl ? TextDirection.rtl : TextDirection.ltr);

// 5. Text fields for LTR data: keep the value LTR, align to the reading start.
TextField(
  keyboardType: TextInputType.phone,
  textDirection: TextDirection.ltr,
  textAlign: Directionality.of(context) == TextDirection.rtl ? TextAlign.end : TextAlign.start,
);

// 6. Screen reader announcements carry a direction.
SemanticsService.announce('تم نسخ الآيبان', TextDirection.rtl);
```
Notes:
- `TextDirection.ltr` hardcoded is allowed only around an LTR data value and should carry a comment; `check-rtl.mjs` reports it as info so a reviewer confirms it.
- `BidiFormatter` in `package:intl` wraps with older embedding marks; prefer explicit isolates.
- Strip isolates and marks before copying to the clipboard or sending to an API: `s.replaceAll(RegExp('[‎‏؜⁦-⁩]'), '')`.

## Web
```html
<html lang="ar" dir="rtl">  <!-- once, from the locale -->

<!-- User-generated or unknown-direction text: <bdi> isolates and auto-detects -->
<p>المستثمر: <bdi>{{ userName }}</bdi></p>

<!-- Known LTR data -->
<p>الآيبان: <span dir="ltr">SA03 8000 0000 6080 1016 7519</span></p>

<!-- Inputs for user text: dir="auto" picks direction from the first strong character -->
<input type="text" dir="auto" name="fullName">
<input type="tel" dir="ltr" inputmode="tel" name="phone" style="text-align: end">
```
- `unicode-bidi: isolate` is what `<bdi>` and `dir` attributes apply; prefer markup over CSS `direction`.
- Never set `direction: rtl` on components in CSS; set `dir` on `<html>`.
- In JS strings use the same `⁦ ... ⁩` isolates when markup is not available (for example `title` attributes, notifications, `aria-label`).

## Figma
- Build Arabic screens with RTL variants (`Direction=rtl`, `Direction=RTL`, `Language=Arabic`, `Language=RTL`, exactly as the component index lists them); do not type Arabic into LTR variants.
- Text layers: set the paragraph alignment to the reading start (right for Arabic). Figma lays out mixed text with the bidi algorithm, so the breaks above show up in Figma too.
- For IBANs, phones and codes inside Arabic text, put the value in its own text layer or component slot (`KeyValue` value, `Input Phone` value) instead of one mixed paragraph; this mirrors how code isolates the value.
- Never type reversed text to make a mock look right; it ships as a wrong string spec.
- Review mixed strings at 100% zoom with real data (long English deal names, Latin user names, IBANs).

## Checklist for a mixed string
- [ ] Is the paragraph direction right (from the locale)?
- [ ] Is every LTR run (IBAN, phone, email, URL, code, Latin name) isolated?
- [ ] Is every user-generated value wrapped in FSI or `<bdi>`?
- [ ] Are signed numbers and ranges isolated or written with words?
- [ ] Is the sentence one ICU message, not concatenated fragments?
- [ ] Are marks stripped before copy and submit?
- [ ] Does the screen reader read it in the visual order?

## Sources
- Syntropy RTL rule R3 (Notion Stage 1-3 Principles section 4); Syntropy accessibility guidance on mixed-direction strings.
- `references/data/links.json` category `arabic-rtl`: W3C inline bidi markup, MDN dir attribute, Microsoft text directionality, Flutter internationalization, RTL Styling.
- Unicode Bidirectional Algorithm (UAX #9) for character types and isolates.
