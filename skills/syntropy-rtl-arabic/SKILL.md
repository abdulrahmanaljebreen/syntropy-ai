---
name: syntropy-rtl-arabic
description: Applies Syntropy's Arabic-first, right-to-left rules to Safqah screens, components, copy and code, treating RTL as the default rather than a mirror of English. Use whenever an agent designs, builds, reviews or tests anything in Arabic or RTL for Safqah or Syntropy: mirroring layouts and icons, what must never mirror (numbers, phone numbers, IBANs, date digits, media controls, checkmarks, clocks, logos, chart time axes), mixed Arabic and English names, amounts, emails and URLs (bidi, Unicode isolates FSI, LRI, PDI, LRM, RLM), Western digits, Hijri and Gregorian dates, IBM Plex Sans Arabic typography, logical start and end properties in Flutter and CSS or Tailwind, Figma Direction variants, and RTL QA with screen readers. Ships check-rtl.mjs, a zero-dependency scanner for physical left/right usage and Eastern Arabic digits. Triggers: RTL, Arabic, عربي, right to left, mirror, flip, bidi, LTR twin, Direction variant, Hijri, IBAN display, EdgeInsets, text-align left, ml- mr-.
---

# Syntropy RTL and Arabic

## Purpose
Make every Safqah surface correct in Arabic first: layout flows from the right, directional things mirror, numbers and LTR data never do, and mixed Arabic and Latin text renders in the right order. Produce Figma frames, Flutter and web code, and reviews that pass in Arabic before anyone checks the English twin.

## Hard rules
1. **RTL is the default, LTR is the twin.** Design and build the Arabic RTL screen first; derive English LTR from it. RTL bugs are first-class defects.
   Why: most Safqah users are Arabic readers; v1 directional bugs only surfaced late because RTL was treated as a localisation pass.
2. **Direction follows the locale, never a per-component code parameter.** In code, set direction once at the app or document root from the locale (`MaterialApp` locale, `<html dir>`). In Figma, set each instance's direction variant to match the screen, using the exact property and value from `references/data/components-index.json`: input and control family `Direction=rtl` (lowercase); most display components `Direction=RTL`; `Header` `Language=Arabic`; `Issuance Row` `Language=RTL`.
   Why: a hand-set direction drifts from the locale; a wrong value case silently falls back to the default LTR variant.
3. **Think start and end, never left and right.** Use logical properties everywhere: `EdgeInsetsDirectional`, `AlignmentDirectional`, `PositionedDirectional`, `BorderRadiusDirectional`, `TextAlign.start`; CSS `margin-inline-start`, `inset-inline-end`, `text-align: start`; Tailwind `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`.
   Why: physical values stay on the same side in both directions and break one of them.
4. **Mirror what has direction**: layout and reading order, back and forward arrows, chevrons, breadcrumbs, progress and slider fill, stepper order, tab order, carousels and swipe, screen push transitions, leading and trailing slots.
   Why: direction-bearing elements follow the reading flow.
5. **Never mirror what has no reading direction**: digits and the order inside numbers, phone numbers, IBANs, card numbers, OTP code values, date digits, clocks and timers, media play and pause, checkmarks, plus and close icons, search and currency icons, logos and brand marks (`SafqahLogo`, `MadaLogo`, `AbshirLogo`), and the time axis of charts, which runs left to right in Arabic too.
   Why: mirroring these produces a wrong number, a wrong logo or a backwards timeline.
6. **Mirror icons by swapping the glyph, not by flipping the vector.** Back in RTL is `Icon / arrow-right`; next is `Icon / chevron-left`. Never scale an icon by -1 in Figma.
   Why: flipped vectors render wrong in code and break the icon contract.
7. **Western digits (0-9), currency after the amount**, comma thousands, full-stop decimals, in Arabic UI too: `1,250.50 ر.س`.
   Why: Saudi banking convention; one digit system prevents misreads.
8. **Isolate every LTR run inside Arabic text**: IBAN, phone, email, URL, English deal or brand names, reference codes, negative numbers, ranges. Use Unicode isolates (LRI U+2066 or FSI U+2068 ... PDI U+2069), `<bdi>` or `dir="ltr"` on web, and a `Directionality` or `textDirection: TextDirection.ltr` on the value widget in Flutter. Never reverse a string to make it look right.
   Why: the bidi algorithm reorders neutral characters and number groups and scrambles both the visual and spoken order.
9. **Arabic typography**: one family, IBM Plex Sans Arabic through `font/family`; the 37 text styles (line height 1.5 in Arabic); letter-spacing 0 on Arabic; no italics; no synthetic bold; nothing below the caption styles except legal fine print; tabular digits in tables.
   Why: Arabic needs taller line height, tracking breaks letter joining, and italics do not exist in Arabic typography.
10. **Calendar by context**: Gregorian for financial events (payouts, maturity, statements, schedules, deadlines), Hijri for religious dates (Ramadan, Eid, Zakah due). Format: day, month name, year, Western digits: `15 مارس 2026`, `26 رمضان 1447 هـ`.
    Why: Saudi users live with both; month names remove day and month ambiguity.
11. **Truncate at the end of reading order** (the left edge in RTL) and only secondary labels; never truncate amounts, deal names in confirmations or disclosures.
    Why: a cut number or disclosure misleads.
12. **Verify before calling it done**: run `scripts/check-rtl.mjs` on changed code and copy files, then the Arabic checklist in `references/testing-rtl.md` (screen reader in Arabic, long strings, mixed strings).
    Why: most RTL bugs are invisible in English and in static review.
13. **Never use the em dash character** in copy, comments, captions or docs.
    Why: Syntropy writing rule.

## Workflow
1. **Start in Arabic.** Draft the screen RTL with Arabic copy (copy rules: syntropy-content). Open `references/rtl-rules.md` for the R1 to R5 map.
2. **Pick components and their direction value.** Look up each component in `references/data/components-index.json` and copy the exact direction property and value (rule 2). Open `references/layout-rtl.md` for screen-level layout (app bars, lists, forms, sheets, tables, navigation).
3. **Decide mirroring element by element** with `references/mirroring.md`; pick mirrored glyphs from the directional icon list (slugs from `references/data/icons.json`).
4. **Format numbers, dates, phones and IBANs** with `references/numbers-dates.md`.
5. **Handle mixed strings** (names, emails, URLs, amounts, user input) with `references/bidi.md`, in Flutter, web and Figma.
6. **Set type** with `references/arabic-typography.md` (text styles, minimum sizes, truncation, tabular digits).
7. **In code, scan**: `node scripts/check-rtl.mjs <files or dirs>`; fix every error with the suggested logical equivalent; review every info line.
8. **Test** with `references/testing-rtl.md`: pseudo-locale and long-string pass, the RTL checklist, VoiceOver and TalkBack in Arabic.
9. **Derive the English LTR twin** last, by switching direction values and copy, never by redrawing.
10. **Report** what was checked, the script output, and any design system gap (for example Hijri picking).

## Decision tables

### Mirror or not
| Element | RTL behaviour | Why |
|---|---|---|
| Back button | Arrow points right (`Icon / arrow-right`), sits at the start (right) | Previous page is behind, to the right |
| List chevron, "see all" | Points left (`Icon / chevron-left`) at the end (left) | Forward is to the left |
| `ProgressBar`, `Slider`, `Stepper` | Fill and order start from the right | Progress follows reading |
| `TabBar`, `SegmentedControl_3`, `Tag Group` | First item on the right | Reading order |
| `Carousel`, swipe | The next slide sits to the left and enters from the left; the first `PageIndicator` dot is on the right | Follows reading direction |
| Charts | Y axis moves to the right; time still runs left to right | Time is universal |
| Numbers, IBAN, phone, OTP value | Never reversed | Data, not text |
| Clock, timer, play, pause | Never mirrored | Physical convention |
| Checkmark, plus, close, search | Never mirrored | Symmetric or universal |
| Logos | Never mirrored | Brand marks |
| `Icon / reply`, `Icon / forward`, `Icon / share` | Mirror `reply` and `forward` (they point along reading order); keep `share` | Case by case, see `mirroring.md` |

### Need X, use Y, not Z
| Need | Use | Not |
|---|---|---|
| Padding on one side (Flutter) | `EdgeInsetsDirectional.only(start: 16)` | `EdgeInsets.only(left: 16)` |
| Align to the reading start | `AlignmentDirectional.centerStart`, `TextAlign.start` | `Alignment.centerLeft`, `TextAlign.left` |
| Pin a badge to the end corner | `PositionedDirectional(end: 0)` | `Positioned(right: 0)` |
| Web side spacing | `margin-inline-start`, Tailwind `ms-4` | `margin-left`, `ml-4` |
| Horizontal gaps between items | `gap` (CSS) or `Row` with spacing | `space-x-*` without `rtl:space-x-reverse` |
| IBAN inside an Arabic label | Value in its own LTR-isolated span | One concatenated string |
| English deal name inside Arabic | FSI/RLI isolate around the name | Hoping the bidi algorithm guesses |
| A range in Arabic | «من 1,000 إلى 5,000 ر.س» | «1,000 - 5,000 ر.س» |
| Hijri date for Ramadan | `1 رمضان 1447` (with «هـ» when shown beside Gregorian) | Gregorian only |
| Arabic emphasis | `semibold` weight | Italics, letter-spacing |
| Back arrow in Figma RTL | Swap to `Icon / arrow-right` | Flip horizontal |

### Which direction property in Figma
| Component family (examples) | Property and RTL value |
|---|---|
| `Button`, `Input`, `Input Phone`, `OTP Input`, `Input Amount`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Search Input`, `Date Input`, `Tag` and most controls | `Direction=rtl` |
| `StatusPill`, `Stat`, `KeyValue`, `ProgressBar`, `Tooltip`, `TimelineRow`, `Chart / *` organisms, `CardDeal`, `NewsCard`, `Calculator / *` | `Direction=RTL` |
| `Header Info`, `Payouts cell` | `Direction=rtl` |
| `Header` | `Language=Arabic` |
| `Issuance Row` | `Language=RTL` |
| `PaginationArrow` | `Direction=left` / `right` is the arrow, not the locale: pick by meaning (previous in RTL points right) |
| `Chart / Gridlines` | `Direction=horizontal` / `vertical` is orientation, not locale |
Always confirm in `references/data/components-index.json`; values are case-sensitive.

## Self-check before answering
- [ ] Arabic RTL version designed or written first; LTR derived.
- [ ] No hand-set direction in code except an LTR isolate around a data value, and it is commented.
- [ ] Every component instance uses the exact direction property and value from the index.
- [ ] No physical left or right in code; `check-rtl.mjs` reports 0 errors (paste the summary line).
- [ ] Directional icons swapped to their mirrored glyphs; nothing flipped with a negative scale.
- [ ] Numbers, phones, IBANs, OTP values, dates, clocks, logos, media controls and chart time axes not mirrored.
- [ ] Western digits only; currency after the amount; percent sign `%` after the number.
- [ ] Every LTR run inside Arabic (IBAN, phone, email, URL, English names, negative numbers, ranges) is isolated.
- [ ] IBM Plex Sans Arabic via text styles; no letter-spacing, no italics on Arabic.
- [ ] Gregorian for money dates, Hijri for religious dates, both with month names.
- [ ] Truncation at the end of reading order and never on amounts or disclosures.
- [ ] Screen-reader order in Arabic starts at the top right and follows the visual order.
- [ ] No em dash anywhere.

## References
| File | Open when |
|---|---|
| `references/rtl-rules.md` | The R1 to R5 rules with Safqah examples and anti-patterns |
| `references/mirroring.md` | Deciding whether an element or icon mirrors; directional icon slugs from the icon library |
| `references/numbers-dates.md` | Digits, amounts, percentages, Hijri and Gregorian formats, phone and IBAN display and isolation |
| `references/bidi.md` | Mixed Arabic and Latin strings, Unicode isolates and marks, broken examples and fixes in Flutter, web and Figma |
| `references/arabic-typography.md` | Font, line height, letter-spacing, italics, minimum sizes, tabular digits, truncation |
| `references/layout-rtl.md` | Start and end thinking, logical properties, icons with text, lists, tables, forms, sheets, navigation |
| `references/testing-rtl.md` | Pseudo-locale, RTL QA checklist, Arabic screen-reader order, running `check-rtl.mjs` |
| `scripts/check-rtl.mjs` | Scan code or copy files for physical left/right and Eastern Arabic digits; prints fixes |
| `references/data/content/numbers-currency.md` | Source rules for numbers, currency and dates |
| `references/data/icons.json` | Icon slugs, names (`Icon / <slug>`), sizes, keys |
| `references/data/links.json` | External references; filter `category: "arabic-rtl"` (Material 3 bidirectionality, Apple HIG right to left, W3C inline bidi markup, RTL Styling, Flutter internationalization, DGA Platforms Code) |
| `references/data/content/` | Voice, glossary and copy rules used in RTL copy |

Related skills: syntropy-content (Arabic copy, numbers in copy), syntropy-figma (building RTL frames and LTR twins), syntropy-code-adapters (Flutter and web implementation, lint), syntropy-foundations (type and layout tokens), syntropy-icons-illustration (icon catalog), syntropy-accessibility (screen readers, dynamic type).
