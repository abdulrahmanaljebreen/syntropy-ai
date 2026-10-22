<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# Typography

All 37 Syntropy text styles, when to use each role, the single font family, Arabic line heights and number rules. Open this before setting any text on a Safqah screen. Style names are written exactly as in Figma (`body / 14 / regular`); the data lives in `data/text-styles.json`.

## Rules
1. Apply a named text style. Never hand-set font size, weight, line height or letter spacing.
   Why: one style name encodes all five properties and maps 1:1 to code.
2. One family: `font/family` = IBM Plex Sans Arabic for Arabic and English (`Font/Family/Base` resolves to IBM Plex Sans Arabic in both language modes). Never add a second family, even for accents.
   Why: one family keeps bilingual screens coherent and Arabic glyphs correct.
3. Product UI uses four weights: Regular 400, Medium 500, SemiBold 600, Bold 700. Thin, ExtraLight, Light, ExtraBold and Black are not for product UI.
   Why: light weights fail contrast; heavy weights shout.
4. Line height comes from the style: every style is 1.5x its size (14/21, 16/24, 20/30, 32/48). Never bind `font/line-height/heading`, `font/line-height/body`, `font/line-height/reading` or `font/line-height/arabic`.
   Why: those four aliases are broken in Figma (their primitive targets are missing). The per-size tokens `font/line-height/<size>` and the text styles carry the correct values.
5. Minimum size for normal copy is 12px (`caption / 12 / regular`). Body copy the user must read is 13px or more, by default 14. Sizes 10 and 11 are for dense meta (table footnotes, compact badges). 9px is legal fine print only.
   Why: Safqah copy is amounts and terms; small Arabic glyphs lose their dots first.
6. No italics, no ALL CAPS body, no letter spacing on Arabic (the `Font/LetterSpacing/*` primitives are 0 in Arabic mode). Emphasise with Medium or SemiBold.
   Why: Arabic has no italic tradition and tracking breaks letter joining.
7. Numbers use Western digits (0-9), keep left-to-right order inside Arabic, put the currency after the amount (`1,250.00 ر.س` / `SAR 1,250.00` per the locale rule), and keep the sign before the digits (`+2.5%`). In columns of amounts, align figures by using tabular (fixed-width) digits where the platform supports it (`fontFeatures: [FontFeature.tabularFigures()]` in Flutter, `font-variant-numeric: tabular-nums` on web) and align to the end edge.
   Why: misread digits on money are the worst error a fintech can make.
8. Use 3 to 4 size tiers per screen (title, section, body, meta). Change weight before size.
   Why: more tiers fragment hierarchy.
9. White labels on filled brand or status backgrounds use the built `Button` and badge text styles; never invent label sizes.
   Why: brand green is used as built (decided 19 Oct 2026), and the components already carry the agreed label style.

## The 37 text styles

### Caption (5): metadata, helper text, badges, fine print
| Style | Size / line height | Weight | Use |
|---|---|---|---|
| `caption / 9 / regular (fine-print only)` | 9 / 13.5 | 400 | Legal disclosures, compliance footnotes. Never content the user must read |
| `caption / 10 / regular` | 10 / 15 | 400 | Compliance text, dense metadata |
| `caption / 11 / regular` | 11 / 16.5 | 400 | Dense tables, footnotes, chart axis labels |
| `caption / 12 / regular` | 12 / 18 | 400 | Default helper text, captions, timestamps |
| `caption / 12 / medium` | 12 / 18 | 500 | Small labels with emphasis: tags, pill labels, overlines |

### Body (11): reading sizes
| Style | Size / line height | Weight | Use |
|---|---|---|---|
| `body / 13 / regular` | 13 / 19.5 | 400 | Table cells, tight UI chrome, secondary metadata |
| `body / 13 / medium` | 13 / 19.5 | 500 | Emphasised table values, compact labels |
| `body / 13 / semibold` | 13 / 19.5 | 600 | Compact link text, small section labels |
| `body / 14 / regular` | 14 / 21 | 400 | Default product body, list descriptions, form values |
| `body / 14 / medium` | 14 / 21 | 500 | Inline numbers, list titles, labels |
| `body / 14 / semibold` | 14 / 21 | 600 | Row titles, emphasised values |
| `body / 14 / bold` | 14 / 21 | 700 | Button labels (`Size=md`/`sm`), strong affordances |
| `body / 16 / regular` | 16 / 24 | 400 | Long reading (deal descriptions, terms), onboarding copy |
| `body / 16 / medium` | 16 / 24 | 500 | Input text in prominent forms, emphasised body |
| `body / 16 / semibold` | 16 / 24 | 600 | Card titles, sheet titles on compact screens |
| `body / 16 / bold` | 16 / 24 | 700 | Large button labels, key values |

### Heading (12): titles within a screen
| Style | Size / line height | Weight | Use |
|---|---|---|---|
| `heading / 18 / regular` | 18 / 27 | 400 | Quiet subsection title |
| `heading / 18 / semibold` | 18 / 27 | 600 | Subsection title, `Section` `Size=Md` |
| `heading / 18 / bold` | 18 / 27 | 700 | Emphasised subsection |
| `heading / 20 / regular` | 20 / 30 | 400 | Quiet section title |
| `heading / 20 / semibold` | 20 / 30 | 600 | Section title, EmptyState title |
| `heading / 20 / bold` | 20 / 30 | 700 | Emphasised section title, amount in a card |
| `heading / 22 / semibold` | 22 / 33 | 600 | Section titles on roomy screens |
| `heading / 22 / bold` | 22 / 33 | 700 | Key figure in a summary card |
| `heading / 24 / semibold` | 24 / 36 | 600 | Page title (mobile) |
| `heading / 24 / bold` | 24 / 36 | 700 | Page title with emphasis |
| `heading / 28 / semibold` | 28 / 42 | 600 | Largest page header |
| `heading / 28 / bold` | 28 / 42 | 700 | Largest page header with emphasis |

### Display (9): heroes and hero numbers
| Style | Size / line height | Weight | Use |
|---|---|---|---|
| `display / 32 / regular` | 32 / 48 | 400 | Quiet hero |
| `display/32/semibold` | 32 / 48 | 600 | Hero number (note: Figma name has no spaces) |
| `display / 32 / bold` | 32 / 48 | 700 | Portfolio total, investment amount entry |
| `display / 36 / bold` | 36 / 54 | 700 | Large hero figure |
| `display / 40 / bold` | 40 / 60 | 700 | Marketing hero |
| `display / 48 / bold` | 48 / 72 | 700 | Onboarding / landing only |
| `display / 56 / bold` | 56 / 84 | 700 | Extra-large hero, sparingly |
| `display / 64 / bold` | 64 / 96 | 700 | Marketing hero, sparingly |
| `display / 72 / bold` | 72 / 108 | 700 | Splash / marketing only |

Never use display styles for in-page headings; display is for heroes and hero numbers.

## Choosing a style
| Need | Style | Colour |
|---|---|---|
| Mobile screen title | `heading / 24 / bold` (or `heading / 22 / semibold` on dense screens) | `text/default` |
| Section title | `heading / 18 / semibold` or `heading / 20 / semibold` | `text/default` |
| Card title | `body / 16 / semibold` | `text/default` |
| Default body | `body / 14 / regular` | `text/default` |
| Secondary description | `body / 14 / regular` or `body / 13 / regular` | `text/muted` |
| Helper text under an input | `caption / 12 / regular` | `text/muted` (error: `text/error`) |
| Timestamp, meta | `caption / 12 / regular` | `text/muted` or `text/subtle` (non-critical only) |
| Amount in a list row | `body / 14 / medium` or `body / 14 / semibold` | `text/default` |
| Hero amount | `display / 32 / bold` | `text/default` |
| Tag / pill label | `caption / 12 / medium` | per tone |
| Legal footnote | `caption / 9 / regular (fine-print only)` or `caption / 10 / regular` | `text/muted` |

When unsure between two sizes, pick the smaller one and add space around it.

## Arabic specifics
- Design Arabic first. Same style names in both languages; only direction and content change.
- 1.5x line height prevents clipping of dots and descenders (ج ح خ ع غ). The English line-height primitives use about 1.43x, but the built text styles use 1.5x for both languages.
- Arabic text is at least as long as English; leave room and never truncate amounts.
- Emphasis: `medium` or `semibold`, never italic.
- Mixed strings: English names inside Arabic render LTR inside their own span («صفقة جديدة: Riyadh Tower Project»).

## Numbers
| Do | Don't |
|---|---|
| «1,250.50 ر.س» | «ر.س 1,250.50», «١٬٢٥٠٫٥٠» |
| «نسبة العائد المتوقع 8.5%» | «%8.5», «٨٫٥٪» |
| `+2.5%` in `text/success` with the sign | Green colour alone for a gain |
| Tabular digits, end-aligned in amount columns | Proportional digits jittering in a column |
| `display / 32 / bold` for «48,750.00 ر.س» portfolio total | A custom 30px bold |

Number formatting rules in full: see syntropy-content.

## Token map (for code)
| Property | Tokens |
|---|---|
| Family | `font/family` |
| Size | `font/size/9` ... `font/size/72` (9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 72) |
| Line height | `font/line-height/<size>` (1.5x: `font/line-height/14` = 21) |
| Weight | `font/weight/regular`, `font/weight/medium`, `font/weight/semibold`, `font/weight/bold` |
| Broken (never bind) | `font/line-height/heading`, `font/line-height/body`, `font/line-height/reading`, `font/line-height/arabic` |

## Examples
| Do | Don't |
|---|---|
| «محفظتي» title in `heading / 24 / bold` | 26px custom bold |
| Helper «الحد الأدنى للاستثمار 1,000 ر.س» in `caption / 12 / regular` `text/muted` | The same hint in 10px `text/subtle` |
| Terms footnote in `caption / 9 / regular (fine-print only)` | Fee disclosure in 9px (fees must be readable, use 12+) |
| `body / 16 / semibold` for emphasis in a paragraph | Italic emphasis |

## Sources
- `data/text-styles.json` (37 styles, explicit line heights), `data/tokens-resolved.json` (`font/*`, `Font/*`), Syntropy token issues report (four broken line-height aliases in the Semantic collection).
- Figma foundation page Typography 69:880 (`data/foundations/typography.md`).
- RTL rules R2 and R4 (Notion Stage 1-3 Principles, 3501a53e-1a6b-802c-92b6-c0b2381d4215).