# Spacing and layout

The `space/*` scale, how to pad components and separate sections, screen margins, breakpoints, grid, and compact vs regular layouts. Open this whenever you set padding, gaps, margins or column structure on a Safqah screen.

## Rules
1. Use `space/*` tokens for every gap and padding. No raw px, no off-scale values (6, 10, 14, 15). If a value is "between", pick the nearest token and adjust the design.
   Why: off-scale values cannot be mapped to tokens in Flutter and drift across screens.
2. The base unit is 4. Everything is a multiple of 4 (with `space/2xs` = 2 as the only hairline exception).
   Why: predictable rhythm on all densities.
3. Related items sit closer than unrelated ones: label to input `space/xs`, field to field `space/lg`, section to section `space/2xl`.
   Why: spacing communicates grouping before the user reads.
4. Mobile screens keep 16 on each side (`space/lg`) and never let content touch the screen edge.
   Why: edge content collides with gesture zones and looks broken.
5. Use logical (start/end) padding, never left/right. Values never flip in RTL; only the side they apply to does.
   Why: Arabic is canonical; physical padding breaks the mirror.
6. Tap targets are 48 x 48 in the app (never under 44 x 44 anywhere) with `space/sm` (8) between neighbours, even when the visual control is smaller.
   Why: Safqah accessibility rule and WCAG 2.5.8; motor accessibility.
7. Respect safe areas through the platform (`SafeArea` in Flutter). Never hard-code status bar or home indicator padding.
   Why: device insets change across hardware.
8. Component heights come from the component variant (`Button` `Size=lg`), not from manual height.
   Why: sizes are baked into components and match code.

## The scale
| Token | Value | Use |
|---|---|---|
| `space/none` | 0 | Joined elements: segmented controls, toolbars, ButtonGroup seams |
| `space/2xs` | 2 | Hairline: between visually tight elements, inside dense controls |
| `space/xs` | 4 | Icon to its label, status dot to text, label to its input |
| `space/sm` | 8 | Chip padding, dense list row gap, between tap targets, button to adjacent item |
| `space/md` | 12 | List item vertical padding, related items, most internal padding. The default when unsure |
| `space/lg` | 16 | Standard component padding, mobile screen side margin, field to field |
| `space/xl` | 20 | Card padding, distinct content blocks |
| `space/2xl` | 24 | Gap between sections on a screen, top padding of a screen body |
| `space/3xl` | 32 | Major section breaks, padding around heroes |
| `space/4xl` | 48 | Page-level vertical padding, unrelated sections, onboarding |
| `space/5xl` | 64 | Hero margins, marketing layouts |

Primitive mirror (never reference in UI): `Spacing/0` to `Spacing/96`. 80 and 96 have no semantic token and are reserved for desktop or large marketing surfaces.

## Common recipes
| Element | Padding / gap |
|---|---|
| Card | `space/xl` padding (or `space/lg` on dense lists), `space/md` between rows inside |
| List row | `space/md` vertical, `space/lg` horizontal, `space/md` between leading icon and text |
| Form | label to input `space/xs`, input to helper `space/xs`, field to field `space/lg` |
| Button row | `space/sm` between buttons, `space/lg` above the row |
| Screen | `space/lg` side margins, `space/2xl` top padding, `space/2xl` between sections |
| Section header to its content | `space/md` |
| Chip / tag | `space/sm` horizontal, `space/xs` vertical |
| Bottom sheet | `space/lg` sides, `space/2xl` top below the handle, CTA above the home indicator inset |
| Hero amount block | `space/3xl` around it |

## Density
| Context | Density | Typical values |
|---|---|---|
| Investor product default (deal list, portfolio) | Medium | `space/md` gaps, `body / 14 / regular`, `Button` `Size=md` |
| Data-heavy (transactions, schedules, tables) | High | `space/sm` between rows, `space/xs` within a row, `body / 13 / regular` |
| First-time and high-stakes (onboarding, KYC, payment) | Low | `space/lg` to `space/2xl` gaps, `body / 16 / regular`, `Button` `Size=lg` |

Do not ship a density toggle; pick the density for the dominant task.

## Breakpoints and grid
| Breakpoint | Width | Container | Side padding / gutter | Columns |
|---|---|---|---|---|
| mobile (default, primary) | 0 to 599 | fluid | 16 | 4 |
| tablet | 600 to 1023 | max 720, centred | 24 | 8 |
| foldable inner | 669 to 951 | 2 x 390 columns | 16 | 8 (even counts only) |
| desktop | 1024 to 1439 | max 1200, centred | 32 | 12 |
| wide | 1440 + | max 1400, centred | 32 | 12 |

These follow Material 3 window size classes. Safqah is Flutter mobile-first; desktop is for web admin and back-office tools.

## Compact vs regular layouts
- **Compact width** (phones, the closed foldable outer display, split view): one column, the production phone layout. Content column on the phone canvas is 390 minus 2 x 16.
- **Regular width** (tablet, foldable inner display): rearrange, never stretch. Use split view (list + detail), reflow (one stack becomes two even columns) or a right column that holds the form while the other half stays free. Keep the same content, functionality and hierarchy as compact.
- Prefer even column counts on foldables and never place interactive elements on the fold line.
- Foldable measurements on the Layout foundation page (outer 466 x 678, inner 951 x 669, table pose 669 x 951, 84 pt vertical system bar on the right that does not mirror in Arabic) are placeholders to verify before final specs.

## Stack vs grid
| Use a Stack (auto layout, one axis) for | Use a Grid (equal cells) for |
|---|---|
| Forms, lists, page sections, icon + text | KPI tiles, deal card galleries, option pickers, 2x2 stat quadrants |

If cells are not equal weight, use a wrapping stack instead of a grid.

## Sizing reference (from components, not tokens)
| Element | Compact | Default | Comfortable |
|---|---|---|---|
| Button | 32 | 40 | 48 (primary mobile CTA) |
| Input | 40 | 48 | 56 (financial inputs) |
| App bar | 48 | 56 | 64 |
| Tab bar | 56 | 64 | 80 |
| List item, 1 line | 44 | 56 | 64 |
| List item, 2 lines | 56 | 72 | 80 |
| IconButton | 32 | 40 | 48 (keep a 48 tap area in the app) |

## Examples
| Do | Don't |
|---|---|
| Deal card with `space/xl` padding and `space/md` between rows | `padding: 14px` |
| Arabic form with `space/lg` start padding (right side in RTL) | `paddingLeft: 16` that stays left in Arabic |
| Tablet: list on one side, deal detail on the other | Phone layout stretched to 900 wide |
| Two 32 px icon buttons with 48 tap areas and space between | Two 24 px icons touching each other |

## Sources
- `data/tokens-resolved.json` (`space/*`, `Spacing/*` with descriptions).
- Figma foundation page Layout 69:884 (`data/foundations/layout.md`).
