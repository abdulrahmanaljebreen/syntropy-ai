# Elevation and shadows

The five two-layer shadow styles, when to use each, and how elevation works in Dark mode. Open this before lifting any surface (card, menu, sheet, modal, FAB).

## Rules
1. Apply shadows only through the effect styles `Shadow / none`, `Shadow / xs`, `Shadow / sm`, `Shadow / md`, `Shadow / lg`, `Shadow / xl`. Never a raw drop shadow, never a hex shadow colour.
   Why: each style is bound to `Shadow/Blur/*`, `Shadow/OffsetY/*` and `Color/Alpha/Black/*`; raw shadows are untracked drift.
2. Each style already has exactly two layers (ambient + key). Never add a third layer or stack two styles.
   Why: the pair is tuned to read as one light source above.
3. Match the shadow to conceptual elevation, not taste: same elevation, same style.
   Why: shadow depth tells users what sits on top of what.
4. In Dark mode, elevate with surface and border (`bg/elevated` + `border/subtle`), not shadow. Overlays (modals, sheets) keep their shadow because the scrim gives it contrast.
   Why: a dark shadow on a near-black surface is invisible.
5. Shadow is never the only cue for state, grouping or clickability. Focus uses `border/focus`, not a shadow.
   Why: screen-reader and low-vision users do not perceive shadows (WCAG 1.4.11, 2.4.7).
6. In Light, pick a border or a shadow for a card, not a strong version of both.
   Why: border plus heavy shadow looks over-defined.
7. On saturated surfaces (brand green fills), prefer a border over a shadow.
   Why: Syntropy has no brand-tinted shadow styles yet.

## The styles
| Style | Ambient layer | Key layer | Use for |
|---|---|---|---|
| `Shadow / none` | none | none | Page backgrounds, content embedded inside a card, anything flat |
| `Shadow / xs` | blur `Shadow/Blur/XS` (2), y 0, `Color/Alpha/Black/10` | y `Shadow/OffsetY/XS` (1), `Color/Alpha/Black/10` (see note) | Hovered list rows, very subtle separation |
| `Shadow / sm` | blur 2, y 0, Black/10 | blur `Shadow/Blur/SM` (4), y `Shadow/OffsetY/SM` (2), Black/10 | Cards and buttons at rest. The default card shadow |
| `Shadow / md` | blur 2, y 0, Black/10 | blur `Shadow/Blur/MD` (8), y `Shadow/OffsetY/MD` (4), Black/10 | Dropdowns, popovers, tooltips, menus, FAB, sticky elements, hovered cards |
| `Shadow / lg` | blur `Shadow/Blur/MD` (8), y 0, Black/10 | blur `Shadow/Blur/LG` (16), y `Shadow/OffsetY/LG` (8), `Color/Alpha/Black/30` | Drawers, bottom sheets, sticky bars |
| `Shadow / xl` | blur 8, y 0, Black/10 | blur `Shadow/Blur/XL` (32), y `Shadow/OffsetY/XL` (16), Black/30 | Modals, full-screen dialogs, hero overlays |

Model: key blur = n, key offset = n / 2 (Fluent two-layer model). Low ramp (xs, sm, md) uses a 2 px ambient and Black/10 on both layers; high ramp (lg, xl) uses an 8 px ambient and a Black/30 key.

Note on `Shadow / xs`: its description says the key layer blur is `Shadow/Blur/XS`, while the exported style binds the key blur to `Shadow/Blur/MD` (8). Apply the style by name and do not rebuild it by hand; flag the mismatch to the DS team if exact values matter.

## Role map
| Surface | Light | Dark |
|---|---|---|
| Page, section | `Shadow / none` | `Shadow / none` |
| Card at rest | `bg/elevated` + `Shadow / sm` | `bg/elevated` + `border/subtle` (shadow optional) |
| Hovered or dragged card | `Shadow / md` | `border/default` or `border/strong` |
| Menu, Popover, Tooltip, Select dropdown | `Shadow / md` | `bg/elevated` + `border/subtle` + `Shadow / md` |
| FAB | `Shadow / md` | `Shadow / md` + surface contrast |
| BottomSheet, Drawer, sticky bottom bar | `Shadow / lg` | `Shadow / lg` over `bg/overlay` |
| Modal, Dialog | `Shadow / xl` | `Shadow / xl` over `bg/overlay` |

## Dark mode elevation
- Light has three surface tiers (`bg/surface`, `bg/base`, `bg/elevated`); Dark has two (`bg/surface` = `bg/base` = #121614, `bg/elevated` = #1c1d1c).
- Dark borders are lighter than the surface (`border/subtle` #2b2d2c, `border/default` #303230), which is what draws the edge.
- Never use a white or light shadow to fake elevation in Dark.

## Examples
| Do | Don't |
|---|---|
| Deal card: `bg/elevated` + `Shadow / sm` in Light, + `border/subtle` in Dark | Custom `0 4px 12px rgba(0,0,0,.15)` |
| BottomSheet with `Shadow / lg` over `bg/overlay` | BottomSheet with `Shadow / sm` and no scrim |
| Selected card shown by `border/brand/primary` + check icon | Selected card shown only by a bigger shadow |

## Sources
- Shadow styles export (`shadow.xs` to `shadow.xl`, `shadow.none`) and `data/tokens-resolved.json` (`Shadow/Blur/*`, `Shadow/OffsetY/*`, `Color/Alpha/Black/*`).
- Figma foundation page Effects 69:883 (`data/foundations/effects.md`).
