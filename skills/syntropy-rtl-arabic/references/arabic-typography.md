<!-- syntropy-lint-disable percent-label-nisba -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Arabic typography

How Arabic text is set in Syntropy: font, text styles, line height, letter-spacing, emphasis, minimum sizes, numerals in tables, truncation and wrapping. Open this when choosing text styles for an Arabic screen, reviewing cramped or clipped Arabic, or implementing text in code.

## Rules
1. **One family for both languages: IBM Plex Sans Arabic**, bound through the semantic `font/family` variable (Figma) and the theme font in code. In the English mode the same token resolves to IBM Plex Sans. Never pick a font per text layer.
   Why: matching x-heights and proportions make the language switch seamless; one binding keeps code and Figma aligned.
2. **Use only the 37 built text styles** (`role / size / weight`, for example `body / 14 / regular`, `heading / 20 / bold`). Never set size or line height by hand.
   Why: the styles carry the Arabic metrics.
3. **Line height 1.5 for Arabic** (built into every style: 14/21, 16/24, 20/30). Do not tighten Arabic to Latin ratios.
   Why: Arabic has deep descenders (ج ح خ ع غ) and stacked marks; tight leading collides lines.
4. **Letter-spacing 0 on Arabic, always.** The `Font/LetterSpacing/*` primitives resolve to 0 in the Arabic mode; never apply tracking or `letterSpacing` to Arabic text, even for "spacious" headings.
   Why: tracking breaks the joins between connected letters.
5. **No italics, no oblique, no synthetic styles.** Emphasise with weight (`medium`, `semibold`); hierarchy comes from size first, colour second, weight third.
   Why: Arabic has no italic tradition; slanted Arabic looks broken; Syntropy ships no italic styles.
6. **No uppercase transforms or Latin-only tricks** on mixed strings (`textTransform: uppercase`, small caps). Arabic has no case.
   Why: the transform does nothing for Arabic and damages mixed strings.
7. **Minimum sizes:** meaningful UI text at 12 or larger (`caption / 12 / *`); Arabic body at 14 or larger (`body / 14 / regular` default); `caption / 9 / regular` is fine print only; 10 and 11 only for secondary metadata that is not essential.
   Why: Arabic glyphs read smaller than Latin at the same size; small Arabic loses its dots and marks.
8. **Tabular digits in tables and aligned figures** (amounts in lists, schedules, `Table / Cell`), proportional digits in running text.
   Why: aligned decimals let investors compare amounts.
9. **Truncate at the end of reading order**: in RTL the ellipsis sits on the left. Truncate only secondary labels (list subtitles, long deal names in rows); never amounts, rates, dates, deal names in confirmations, error text or disclosures.
   Why: a cut number misleads; a cut disclosure protects nobody.
10. **Let text scale** to at least 200% (iOS Larger Text, Android font size, browser zoom); never disable scaling. Wrap or stack instead of shrinking or cutting.
    Why: WCAG 1.4.4; older investors rely on larger text.
11. **Align Arabic text to the start (right)**; never justify Arabic UI text and never stretch words with tatweel (ـ).
    Why: justified Arabic creates rivers and uneven kashida; tatweel changes the word shape.

## Text styles in use
| Use | Style | Arabic size / line height |
|---|---|---|
| Default body | `body / 14 / regular` | 14 / 21 |
| Comfortable body (onboarding, KYC) | `body / 16 / regular` | 16 / 24 |
| Emphasised body | `body / 14 / medium` or `semibold` | 14 / 21 |
| Section heading | `heading / 18 / *`, `heading / 20 / *` | 18 / 27, 20 / 30 |
| Hero figure (balance, return) | `display / 32 / bold` and up, sparingly | 32 / 48 |
| Metadata, labels | `caption / 12 / regular` or `medium` | 12 / 18 |
| Fine print only | `caption / 9 / regular` | 9 / 13.5 |
Exact names and values: `references/data/content/` and the text-style tokens in the syntropy-foundations skill.

## Truncation and wrapping
| Case | Do | Don't |
|---|---|---|
| Long deal name in a list row | One line, ellipsis at the end of reading order (left in RTL), full name on the deal page | Ellipsis on the right in Arabic |
| Deal name on a confirmation | Wrap to two lines | Truncate |
| Amount in a `KeyValue` at 200% text | Label on one line, value on the next | «صافي العا…  18,333.…» |
| Button label too long | Rewrite shorter (1-3 words) | Shrink the font or truncate |
| Mixed Arabic and English name | Isolate the name, then truncate the whole label at the end | Truncate inside the isolated name |

Flutter: `Text(name, maxLines: 1, overflow: TextOverflow.ellipsis)` already places the ellipsis at the end of the text direction; it is correct in RTL as long as direction comes from the locale. Web: `text-overflow: ellipsis` with `dir` set on the document does the same.

## Numerals in type
- Western digits in Arabic text are set in the same family; IBM Plex Sans Arabic includes Latin digits designed to sit with Arabic.
- Tabular figures: Flutter `TextStyle(fontFeatures: [FontFeature.tabularFigures()])`; CSS `font-variant-numeric: tabular-nums`.
- Hero amounts may combine a large number with a smaller currency suffix or riyal symbol; keep the suffix after the number in reading order (`MoneyAmount`, `Stat`).

## Mixed Arabic and Latin in one line
- One family covers both scripts; do not switch fonts for the Latin part.
- Latin runs inside Arabic keep their own case and spelling (Apple Pay, Face ID, PDF).
- Isolate the Latin run for bidi (see `bidi.md`); typography alone does not fix order.

## Common mistakes
| Mistake | Fix |
|---|---|
| Arabic set at 14 on a 16 line height | Use `body / 14 / regular` (14/21) |
| Letter-spacing on an Arabic heading | Remove; use size or weight |
| Italic Arabic quote or note | Use `medium` weight or a muted colour |
| 10 px Arabic labels on cards | Move to `caption / 12 / *` or remove the label |
| Proportional digits in an amounts column | Tabular figures |
| `textScaleFactor: 1.0` to protect layout | Fix the layout to wrap; allow scaling |
| A second Arabic font "for headings" | One family, bound through `font/family` |

## Sources
- Syntropy RTL rule R4; Syntropy typography foundations (Arabic considerations, no italics, 1.5 Arabic line height, letter-spacing modes).
- Text-style tokens (37 styles; `caption / 9 / regular` marked fine-print only); Syntropy design principles V2 (hierarchy through size).
- Syntropy accessibility guidance: dynamic type (200% scaling, money never cut).
- `references/data/links.json` category `arabic-rtl`: Google Fonts Arabic (IBM Plex Sans Arabic), Dubai Design System (bilingual typography).
