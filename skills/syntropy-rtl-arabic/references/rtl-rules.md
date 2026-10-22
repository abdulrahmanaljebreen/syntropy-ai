<!-- syntropy-lint-disable eastern-arabic-numerals -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# RTL rules R1 to R5

The five Syntropy RTL rules with what they mean for Safqah screens, code and Figma. Open this first when starting any Arabic screen or reviewing one.

## R1. RTL is the canonical layout; LTR is the mirror
- **Rule:** design RTL first; every directional component documents both directions; in Figma the direction variant matches the screen locale; in code direction comes from the locale, never set by hand per component.
- **Looks like:** `BackButton` arrow pointing right in Arabic; `Breadcrumb` separator ‹ in RTL; `Slider` and `ProgressBar` filling from the right; Arabic screens reviewed before English.
- **Doesn't look like:** an English screen "flipped" at the end; a back arrow pointing left in both; `textDirection: TextDirection.rtl` sprinkled on individual widgets.
- **Code:** `MaterialApp(locale: ..., supportedLocales: [Locale('ar'), Locale('en')], localizationsDelegates: [...])` sets `Directionality` for the whole tree. Web: `<html lang="ar" dir="rtl">`.
- **Figma:** use the exact variant value from the component index (`Direction=rtl`, `Direction=RTL`, `Language=Arabic`, `Language=RTL`). A wrong case silently gives the default LTR variant.

## R2. Numerals don't flip; text does
- **Rule:** Western digits (0-9) keep their left-to-right order inside Arabic text; currency follows the number; phones, dates, percentages and IBANs never reverse.
- **Looks like:** «نسبة العائد المتوقع 8.5%»; `1,250.50 ر.س`; `0541234567`.
- **Doesn't look like:** «5.8%»; `7654321450`; Eastern digits (٠-٩) on a transactional amount; `%8.5`.
- Details: `numbers-dates.md`.

## R3. Mixed-language strings have explicit direction
- **Rule:** isolate embedded LTR spans (English names, IBANs, emails, URLs, codes) or use direction marks where order is ambiguous; handle direction at the text-node level; never reverse a string.
- **Looks like:** «صفقة جديدة: Riyadh Tower Project» with the English name intact.
- **Doesn't look like:** «صفقة جديدة: tcejorP rewoT hdayiR»; a phone number whose groups appear in reverse order; «SAR» drifting to the start of an Arabic line.
- Details and fixes: `bidi.md`.

## R4. Typography respects Arabic vertical metrics
- **Rule:** one family (`font/family` = IBM Plex Sans Arabic), the 37 built text styles with 1.5 line height, letter-spacing 0 on Arabic, no italics.
- **Looks like:** `body / 16 / regular` = 16/24 in Arabic.
- **Doesn't look like:** 14 Arabic body on a 16 line height; tracking applied to Arabic; a slanted "italic" Arabic word.
- Details: `arabic-typography.md`.

## R5. Hijri and Gregorian: both supported, neither default
- **Rule:** choose by context: financial events Gregorian; religious and cultural dates Hijri; the user's preferred default is a setting.
- **Looks like:** distribution schedule «15 مارس 2026»; Ramadan campaign «1 رمضان 1447».
- **Doesn't look like:** a calendar locked to Gregorian; Ramadan shown only in Gregorian.
- **Gap:** the built `Date Calendar Picker` has `Mode` and `Direction` only, no Hijri calendar system. Flag Hijri picking as a design system gap rather than faking it.

## Where RTL is checked in the lifecycle
| Stage | Check |
|---|---|
| Brief and design | Every screen exists RTL first; LTR twin derived |
| Design review | Lens "RTL behaviour: anything broken?" |
| Build | `check-rtl.mjs` on changed files: 0 errors |
| QA | `testing-rtl.md` on a real device in Arabic, including VoiceOver and TalkBack |

## Common anti-patterns
| Anti-pattern | Fix |
|---|---|
| Designing in English, "trusting the flip" | Start the frame in Arabic with real Arabic copy |
| `EdgeInsets.only(left: 16)` | `EdgeInsetsDirectional.only(start: 16)` |
| Icons flipped with negative scale in Figma | Swap to the mirrored glyph |
| Mirrored chart time axis | Keep time left to right; move only the y-axis |
| Eastern digits "to feel Arabic" | Western digits; the Arabic voice is in the words |
| Hardcoded `dir="rtl"` on components | Set `dir` once on `<html>` from the locale |
| Truncating the start of an Arabic label | Truncate at the end of reading order (left edge) |
| Concatenating «لديك» + n + «صفقات» | One ICU message with a placeholder |

## Sources
- Syntropy RTL rules R1 to R5 (Notion Stage 1-3 Principles section 4, `3501a53e-1a6b-802c-92b6-c0b2381d4215`).
- `references/data/content/numbers-currency.md`; component index (`Direction` variants, `Date Calendar Picker`).
