<!-- syntropy-lint-disable percent-label-nisba -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Mirroring: what flips in RTL and what never does

How to decide, element by element, whether something mirrors in the Arabic RTL layout, and which Syntropy icon glyph to use. Open this when placing arrows, chevrons, progress, charts, media controls or any icon with a direction.

## Rules
1. Mirror an element when its direction expresses **reading order or navigation through content** (back, next, progress, sequence).
   Why: these follow the reader's flow, which starts at the right in Arabic.
2. Never mirror an element whose direction comes from **the physical world, time, or a fixed convention** (clocks, media, charts' time axis, checkmarks, logos, numbers).
   Why: these mean the same thing in every language.
3. Mirror icons by **swapping to the opposite glyph** from Syntropy Icons (`Icon / <slug>`), never by flipping the vector (`scale -1`, `Transform.flip`, `rotateY(180deg)`), except where code mirroring is built into the component (`BackButton` and other components with a direction variant already show the right glyph).
   Why: flipped vectors misrender in code, flip text inside icons, and break the icon contract.
4. When a component has a direction variant, set the variant; do not mirror its parts manually.
   Why: the variant already places icons, fills and slots.
5. If you cannot decide, ask: "Does this point at earlier or later content?" If yes, mirror. "Does it depict time, a physical motion or a brand?" If yes, keep.
   Why: one testable question settles most cases.

## Mirrors in RTL
| Element | LTR | RTL | Syntropy component or glyph |
|---|---|---|---|
| Overall layout, reading order | Starts left | Starts right | Every frame, `Directionality` |
| Text alignment | Left | Right (start) | `TextAlign.start` |
| Leading and trailing slots | Leading icon on the left | Leading icon on the right | `ListItem`, `Input`, `Button` with `Has icon leading` |
| Back button | Arrow points left | Arrow points right | `BackButton` (direction variant); glyph `Icon / arrow-right` in RTL |
| Forward, next, "see all" chevron | Points right | Points left | `Icon / chevron-left` in RTL, `Icon / chevron-right` in LTR |
| Breadcrumb separator | › | ‹ | `Breadcrumb` direction variant |
| Progress fill | Left to right | Right to left | `ProgressBar` `Direction=RTL`, `MilestoneProgress` |
| Slider fill and min/max | Min on the left | Min on the right, max on the left | `Slider` `Direction=rtl` |
| Stepper and timeline order | First step on the left | First step on the right | `Stepper`, `KYCStep`, `TimelineRow` |
| Tabs and segments | First tab on the left | First tab on the right | `TabBar`, `SegmentedControl_3`, `Tag Group` |
| Carousel and page indicator | Next slide on the right | Next slide on the left; first dot on the right | `Carousel`, `PageIndicator` |
| Swipe actions on list rows | Reveal from the right edge | Reveal from the left edge | `ListItem` patterns |
| Screen push transition | New screen enters from the right | New screen enters from the left | Navigation |
| Drawer, side sheet | Opens from the left (start) | Opens from the right (start) | `Drawer` |
| Text field caret and clear button | Clear on the right (end) | Clear on the left (end) | `Search Input` `Direction=rtl` |
| OTP boxes focus order | First box on the left | First box on the right, focus moves left | `OTP Input` `Direction=rtl` |
| Pagination previous and next | Previous arrow on the left | Previous arrow on the right | `PaginationArrow` (`Direction=left` / `right` describes the arrow; choose by meaning) |
| Corner radius on start/end shapes | Start corners on the left | Start corners on the right | `BorderRadiusDirectional` |
| Directional illustrations (arrows, ascending sequences) | As drawn | Flipped only if the meaning is directional | Illustration set; most are symmetric |

## Never mirrors
| Element | Why | Notes |
|---|---|---|
| Digits and the order inside any number | A reversed number is a wrong number | `8.5%`, `1,250.50 ر.س` |
| Phone numbers | Data, read left to right | `+966 54 123 4567` |
| IBANs, card numbers, reference codes | Data | `SA03 8000 0000 6080 1016 7519` |
| The OTP code value | Data | Box order follows the component; the code string is not reversed |
| Date and time digits | Data | `15 مارس 2026`, `18:00` |
| Clocks, timers, countdowns | Clockwise is universal | `Countdown`, `Timer`, `Icon / clock` |
| Media controls (play, pause, skip, repeat) | Refer to tape direction, not reading | `Icon / play`, `play-pause`, `pause`, `skip-next`, `repeat` |
| Chart time axis | Time runs left to right in both languages | `Chart / *` `Direction=RTL` moves the y-axis to the right, keeps time left to right |
| Trend glyphs | Depict a time series | `Icon / trending-up`, `trending-down`, `chart-up`, `graph-decrease` |
| Checkmarks | Universal | `Icon / check`, `check-circle`, `check-double` |
| Plus, minus, close, search, settings | Symmetric or universal | `Icon / plus`, `minus`, `x`, `search` |
| Currency and riyal symbol | Glyph, not direction | `Icon / riyal` keeps its shape (position follows the number) |
| Logos and brand marks | Brand integrity | `SafqahLogo`, `MadaLogo`, `AbshirLogo`, provider logos in `SocialButton` |
| Upload and download | Vertical | `Icon / upload`, `download` |
| Vertical arrows and carets | Vertical | `Icon / arrow-up`, `arrow-down`, `chevron-up`, `chevron-down`, `arrow-head-up`, `arrow-head-down` |
| Help question mark | A Latin "?" glyph in the icon; keep | `Icon / help-circle` |
| Hardware-fixed system bars | Aligned to hardware | Device bars and camera regions stay where the hardware is |

## Directional icon slugs (Syntropy Icons)
Use `Icon / <slug>`. Sizes as in `references/data/icons.json` (12 = small inline set, 24 = main grid). Pick the RTL glyph from the table; never flip.

| Meaning | LTR glyph | RTL glyph | Size |
|---|---|---|---|
| Back, previous | `arrow-left` | `arrow-right` | 12 |
| Back, previous (24 grid) | `arrow-left-2` | `arrow-right-2` | 24 |
| Next, open, see all | `chevron-right` | `chevron-left` | 12 |
| Jump to first or last | `chevrons-left` / `chevrons-right` | `chevrons-right` / `chevrons-left` | 24 |
| Move item along the row | `move-right` / `move-left` | swapped | 24 |
| Diagonal external or "go" arrows | `arrow-up-right`, `arrow-diagonal-up-right` | `arrow-up-left`, `arrow-diagonal-up-left` | 24, 12 |
| Diagonal down arrows | `arrow-down-right` | `arrow-down-left` | 24 |
| First page | `page-first` | mirror equivalent not in the library: use `chevrons-right` or report the gap | 24 |
| Forward (message, step) | `forward`, `step-forward` | no mirrored glyph in the library: report the gap, or use `arrow-left-2` where the meaning is "next" | 24 |
| Enter, go into | `enter`, `arrow-square-right` | no mirrored glyph: report the gap | 24 |
| Reply | `reply`, `mail-reply`, `reply-typing` | no mirrored glyph: report the gap before flipping in code | 24 |
| Send | `comment-send`, `mail-send` | no mirrored glyph: report the gap | 24 |
| Side panels | `sidebar-left` / `sidebar-right` | swapped (start panel is on the right) | 24 |
| Export, import | `export`, `import` | check the drawing; mirror only if the arrow is horizontal | 12 |
| Expand horizontally | `expand-horizontal` | symmetric, keep | 12 |
| List with bullets or lines | `list-view`, `notepad-list`, `text-file` | keep (decorative lines) | 24 |
| Navigation pointer | `navigation-arrow` | keep (map heading) | 24 |
| Swap | `swap` | keep (bidirectional) | 24 |

When the library has no mirrored glyph for a directional meaning, say so as a design system gap. In code, a component may mirror an icon with `Icon(..., textDirection:)` only if the icon has `matchTextDirection` semantics and the design system team approves; never improvise in Figma.

## Edge cases
- **Text inside icons or illustrations** (letters, numbers, a "$" or "?") must not be mirrored even when the shape is.
- **Progress with a number label**: the bar fills from the right, the percentage stays `72%`.
- **Slider scale labels**: min on the right, max on the left, digits not reversed.
- **Charts in RTL**: legend order mirrors (first series on the right), the y-axis sits on the right, the x time axis still runs from oldest on the left to newest on the right; tooltips anchor on the side with room.
- **Rating scales** (NPS 0-10): follow the `RatingScale` direction variant; anchors («غير محتمل إطلاقاً» / «محتمل جداً») follow reading order, numbers are not reversed.
- **Funnel or before/after comparisons**: keep the reading order for steps; keep time left to right when the axis is time.

## Sources
- `references/data/content/numbers-currency.md`; Syntropy RTL rules R1 and R2 (Notion Stage 1-3 Principles section 4; Widgetbook parity checklist mirror rules).
- Component guides: `back-button.md`, `slider.md`, `progress-bar.md`, `tab-bar.md`, `otp-input.md`, `chart.md`, `search.md`, `breadcrumb.md`.
- `references/data/icons.json` (slugs, sizes); `references/data/links.json` category `arabic-rtl`: Material 3 Bidirectionality and RTL, Apple HIG Right to left.
