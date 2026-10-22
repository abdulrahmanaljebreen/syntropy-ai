<!-- syntropy-lint-disable eastern-arabic-numerals, percent-label-nisba -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Testing RTL

How to prove a Safqah screen works in Arabic RTL before calling it done: automated scan, pseudo-locale and long-string pass, the visual checklist, and screen-reader order in Arabic. Open this at the end of any build or review, and paste the results in the handoff.

## Rules
1. **Test in Arabic first**, on a real device, with real Arabic copy and real data (long names, large amounts, IBANs).
   Why: most RTL bugs are invisible in English and in Figma.
2. **Scan code before review**: `node scripts/check-rtl.mjs <changed files or dirs>` must report 0 errors; every info line is reviewed.
   Why: physical left/right and Eastern digits are mechanical to find.
3. **Run a pseudo-locale or long-string pass** to catch hardcoded strings, truncation and direction leaks.
   Why: untranslated or clipped strings hide in normal test data.
4. **Test with VoiceOver and TalkBack in Arabic**: reading order starts top right and follows the visual order; values are read in full.
   Why: screen-reader order is the true reading order.
5. **Record what was tested** (devices, locale, text size, reader) in the handoff.
   Why: a claim without evidence is not a test.

## 1. Automated scan
```bash
# From the skill folder, or pass absolute paths
node scripts/check-rtl.mjs lib/ src/ assets/l10n/
node scripts/check-rtl.mjs --json lib/features/deal/ > rtl-report.json
git diff --name-only | xargs node scripts/check-rtl.mjs   # changed files only
```
What it finds:
| Rule id | Finds | Suggests |
|---|---|---|
| `dart-edgeinsets-only`, `dart-edgeinsets-ltrb` | `EdgeInsets.only(left/right)`, `fromLTRB` | `EdgeInsetsDirectional.only(start/end)`, `fromSTEB` |
| `dart-alignment` | `Alignment.centerLeft` and other physical alignments | `AlignmentDirectional.centerStart` |
| `dart-textalign` | `TextAlign.left/right` | `TextAlign.start/end` |
| `dart-positioned`, `dart-borderradius-only`, `dart-border` | `Positioned(left/right)`, physical corners and sides | Directional equivalents |
| `dart-textdirection-hardcoded` (info) | `TextDirection.ltr/rtl` in code | Locale direction; allowed around LTR data |
| `css-physical-property`, `css-text-align`, `css-float-clear`, `css-direction-hardcoded` | `margin-left`, `left:`, `text-align: left`, `float: right`, `direction: rtl` | Logical properties, `dir` on `<html>` |
| `js-physical-style`, `js-text-align`, `js-position-left-right` | `marginLeft`, `textAlign: 'left'`, `left: 0` in style objects | `marginInlineStart`, `'start'`, `insetInlineStart` |
| `tw-physical-spacing`, `tw-physical-border`, `tw-text-float`, `tw-space-x` | `ml-4`, `pr-2`, `left-0`, `rounded-l`, `border-l`, `text-left`, `space-x-2` | `ms-4`, `pe-2`, `start-0`, `rounded-s`, `border-s`, `text-start`, `gap-2` |
| `eastern-arabic-digits`, `arabic-number-signs` | ٠-٩, ۰-۹, «٫», «٬», «٪» in code and copy files (`.arb`, `.json`, `.md`, `.txt`) | The Western equivalent |
Silence a deliberate line with a trailing comment containing `check-rtl-ignore`, and explain why in the same comment. A whole file (for example a lookup table of physical values) is skipped with `check-rtl-ignore-file` in its first 5 lines. Exit code: 0 clean, 1 errors found, 2 usage error; `--json` gives machine-readable output and `--stdin --ext=dart` scans piped text.

## 2. Pseudo-locale and long-string pass
- **Pseudo-RTL**: wrap every string with RLM and a marker, for example `‏[[ نص تجريبي طويل جداً ]]‏`, or use an Arabic pseudo-locale generated from the English file with text expanded by about 30%. Any string that shows without markers is hardcoded.
- **Long strings**: the longest realistic deal name (Arabic and Latin), a full Arabic personal name of 4 parts, `500,000.00 ر.س`, a full IBAN, an email of 40 characters.
- **Text size 200%** (iOS Larger Text, Android font size) and browser zoom 200% and 400% on web.
- **Mixed data**: Latin user name in Arabic UI, Arabic deal name in English UI, negative percentage, a phone number with `+966`.
- **Flip test**: switch the device language between Arabic and English without restarting; nothing should keep the old direction.

## 3. RTL visual checklist
Layout and direction
- [ ] The screen starts at the right: titles, first field, first tab, first column.
- [ ] Back arrow at the start pointing right; chevrons at the end pointing left.
- [ ] Progress bars, sliders and steppers fill and count from the right.
- [ ] Carousels: next slide on the left, first page dot on the right.
- [ ] Sheets: title at the right, close at the left; primary button at the start in side-by-side footers.
- [ ] Every component instance uses its RTL variant (no LTR variant with Arabic text).

What must not mirror
- [ ] Digits, phones, IBANs, OTP values, dates and times read correctly, not reversed.
- [ ] Clocks, timers, media controls, checkmarks and logos unchanged.
- [ ] Chart time axis runs left to right; y-axis on the right.
- [ ] Icons swapped, not flipped (no mirrored text inside icons).

Text and numbers
- [ ] Western digits only; `%` after the number; currency after the amount.
- [ ] Mixed strings (names, emails, IBANs, negative numbers, ranges) render in the right order.
- [ ] Arabic text uses IBM Plex Sans Arabic text styles, line height intact, no letter-spacing, no italics.
- [ ] Ellipsis on the left (end of reading order) and never on amounts, rates, dates or disclosures.
- [ ] Gregorian dates on money events, Hijri on religious dates, month names in Arabic.

Interaction
- [ ] Swipe gestures follow reading direction (back gesture from the right edge on Arabic).
- [ ] Focus order (keyboard, switch control) moves right to left, top to bottom.
- [ ] Copying an IBAN or reference yields the clean value (no invisible marks, no spaces).

## 4. Screen-reader order in Arabic
Setup: device language Arabic, app locale Arabic.
- **VoiceOver (iOS)**: Settings > Accessibility > VoiceOver, Arabic voice. Swipe right to move forward: focus should start at the top right (back button, then title) and follow the visual RTL order.
- **TalkBack (Android)**: Arabic text-to-speech; use reading controls > headings to jump between `Section` titles.
- **Web**: VoiceOver for macOS or NVDA with `<html lang="ar" dir="rtl">`; check landmarks and the headings list.

Listen for:
| Content | Should be read as | Common failure |
|---|---|---|
| `1,250.00 ر.س` | «1,250.00 ريال سعودي» (semantics label) | «ر نقطة س» letter by letter |
| `8.5%` | «8.5 بالمئة» | Percent dropped |
| `-2.5%` | «انخفاض 2.5 بالمئة» | Minus skipped |
| `15 مارس 2026` | Day, month, year | Slash dates read as fractions |
| IBAN | In groups, as LTR data | One huge number |
| `•••• 1234` | «ينتهي بـ 1234» | «نقطة نقطة نقطة» |
| Back button | «رجوع» | «يمين» or unlabeled «زر» |
| Stat or KeyValue | Label then value as one phrase: «نسبة العائد المتوقع، 8.5 بالمئة» | Value read before label |

Flutter: set `MaterialApp.locale` so the reader picks the Arabic voice; `SemanticsService.announce(message, TextDirection.rtl)` for live messages; merge label and value with `MergeSemantics` where they are one phrase.

## 5. Handoff evidence
Paste into the PR or handoff:
```
RTL check
- check-rtl.mjs: <N> file(s), 0 error(s), <M> info (reviewed: <why each info is intended>)
- Devices: <iPhone model / iOS>, <Android model / version>; locale ar; text size 100% and 200%
- VoiceOver ar: order OK / issues: ...
- TalkBack ar: order OK / issues: ...
- Long-string and mixed-data pass: OK / issues: ...
```

## Sources
- Syntropy accessibility guidance: screen readers (Arabic notes, numbers and currency table), testing, dynamic type; Widgetbook parity checklist RTL block.
- RTL rules R1 to R5; `references/data/links.json` category `arabic-rtl` (Apple HIG Right to left, Android supporting languages, Flutter internationalization).
