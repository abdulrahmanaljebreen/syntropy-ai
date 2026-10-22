<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# RTL and Arabic-first rules (R1-R5)

How Syntropy handles right-to-left layout, bidirectional text, Arabic typography and calendars. Read this before laying out any screen, choosing an icon direction, or rendering numbers, names or dates inside Arabic text. Arabic (RTL) is canonical; English (LTR) is the mirror.

## Rules

### R1. RTL is the canonical layout, LTR is the mirror
- **Why:** v1 directional bugs (BackButton arrow, Slider thumb, Breadcrumb separator) only surfaced when LTR was enabled. RTL bugs are first-class quality issues.
- **Rule:** Design RTL first. Every directional component documents both directions. In Figma, the `Direction` variant (`RTL` / `LTR`, or `rtl` / `ltr` on some sets; copy the exact value from `knowledge/components/index.json`) must match the screen locale; in code, direction follows the locale and is never set by hand per component.
- **Looks like:** `BackButton` arrow points right in RTL (toward the previous page in reading order) and left in LTR. `Breadcrumb` separator flips (‹ in RTL, › in LTR). `Slider` and `ProgressBar` fill from the right in RTL.
- **Doesn't look like:** A back arrow pointing left in both directions.

#### What mirrors and what does not
| Mirrors in RTL | Does not mirror |
|---|---|
| Back / forward arrows, chevrons in `ListItem`, `Breadcrumb` separators | Logos (`SafqahLogo`, `MadaLogo`, `AbshirLogo`) |
| Progress fill direction (`ProgressBar`, `Slider`, `Stepper`) | Clocks, timers, media play/pause |
| Text alignment (start = right) | Digits and the order inside a number |
| Leading/trailing slots (leading icon sits on the right) | Charts: time axis runs left to right in both languages |
| Screen transitions (push enters from the left in RTL) | Checkmarks, plus, close (x) icons |

### R2. Numerals don't flip; text does
- **Why:** Mixing Arabic text with Western digits is standard in Saudi banking and fintech, but v1 had no rule.
- **Rule:** Western digits (0-9) keep their natural left-to-right order inside Arabic text. The currency follows the number. Phone numbers, dates, percentages and IBANs never reverse. Full number rules: `knowledge/content/numbers-currency.md`.
- **Looks like:** «نسبة العائد المتوقع 8.5%» with 8.5% reading left to right. A balance «1,250.50 ر.س»: number in natural order, «ر.س» after it.
- **Doesn't look like:** «5.8%». A phone number 0541234567 rendered as 7654321450. Eastern Arabic digits (٠-٩) on a transactional amount.

### R3. Mixed-language strings have explicit direction
- **Why:** Arabic UI with embedded English (deal names, brand names) breaks bidirectional layout in browsers and Figma when unhandled.
- **Rule:** Use Unicode direction marks (RLM U+200F, LRM U+200E) where order is ambiguous, or isolate the embedded span. Text props document their expected language and direction. English names inside Arabic render LTR within their own span. Handle direction at the text-node level, never by reversing the string.
- **Looks like:** «صفقة جديدة: Riyadh Tower Project», the English name LTR inside an RTL line.
- **Doesn't look like:** «صفقة جديدة: tcejorP rewoT hdayiR».
- Common traps: trailing punctuation after an English span jumping to the wrong side; a percentage sign landing before the number; «SAR» drifting to the start of an Arabic line. Fix with an LRM after the LTR span or by isolating it.

### R4. Typography respects Arabic vertical metrics
- **Why:** IBM Plex Sans Arabic has taller glyphs and longer descenders than Latin; Latin-tuned line heights cramp Arabic.
- **Rule:** One family for both languages: `font/family` = IBM Plex Sans Arabic. Every built text style uses a 1.5 line-height ratio (for example `body / 16 / regular` = 16/24, `body / 14 / regular` = 14/21, `heading / 20 / bold` = 20/30). Use the text styles; never set line height by hand. Letter spacing in Arabic is always 0 (the `Font/LetterSpacing/*` primitives resolve to 0 in the Arabic mode).
- **Looks like:** 16 body with 24 line height: comfortable in Arabic, acceptable in English.
- **Doesn't look like:** 14 Arabic body on a 16 line height, descenders crashing into the next line. Tracking applied to Arabic text (breaks letter joining).
- Note: Notion said 1.5 for body and 1.3 for headings. Built headings and display styles also use 1.5.
- Note: the Widgetbook parity template in Notion said "Arabic: Noto Kufi or brand equivalent". The built font for both languages is IBM Plex Sans Arabic.

### R5. Hijri and Gregorian: both supported, neither default
- **Why:** Saudi users use both calendars. Distribution schedules follow Gregorian (financial reporting); religious dates use Hijri.
- **Rule:** Pick the calendar by context: financial (payouts, maturity, statements, schedules) uses Gregorian; religious or cultural (Ramadan, Eid, Zakah due date) uses Hijri. The user's preferred default is a setting. Display formats: `knowledge/content/numbers-currency.md`.
- **Looks like:** A distribution schedule «15 مارس 2026» / "15 Mar 2026". A Ramadan campaign «1 رمضان 1447». A setting to flip the default.
- **Doesn't look like:** A calendar locked to Gregorian. Ramadan dates shown only in Gregorian.
- Gap: the built `Date Calendar Picker` has `Mode` (single / range / multi) and `Direction` only; there is no calendar-system (Hijri / Gregorian) variant yet. Flag Hijri picking as a design system gap rather than faking it.

### RTL checkpoints in the lifecycle
- Design: every screen exists in RTL and LTR from the start; RTL is not a final localisation pass (`knowledge/ux/lifecycle/README.md`).
- Review: lens 5 of the design review is "RTL behaviour: anything broken?" (`knowledge/ux/lifecycle/design-review.md`).
- QA: the RTL block of `knowledge/ux/checklists/widgetbook-parity.md` on a real device in Arabic.

## Examples

| Do (Arabic first) | Don't |
|---|---|
| «نسبة العائد المتوقع 8.5%» | «نسبة العائد المتوقع %8.5» or «٨٫٥٪» |
| «1,250.50 ر.س» | «ر.س 1,250.50» |
| «صفقة جديدة: Riyadh Tower Project» | Reversed English letters |
| RTL `BackButton` arrow pointing right | Same left arrow in both locales |
| RTL `ProgressBar` filling right to left | LTR fill inside an Arabic screen |
| Line chart with time running left to right in Arabic too | Mirrored time axis |
| `SafqahLogo` identical in both locales | Mirrored logo |

