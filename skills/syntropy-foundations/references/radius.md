# Radius

The `radius/*` scale and which corner radius each Safqah surface takes. Open this before rounding any card, control, sheet or avatar.

## Rules
1. Use `radius/*` tokens only. Never 6, 10, 14 or any off-scale value.
   Why: the scale is 0, 2, 4, 8, 12, 16, 20, 24, 32, full; anything else is drift.
2. `radius/default` (20) is the default corner radius across v2 components. Reach for it unless a component documents a different radius.
   Why: the Safqah brand corner is 20 and v2 components are built on it.
3. Components carry their own radius. When you instance a Syntropy component, do not override its corners.
   Why: overrides break the component's token binding.
4. One radius per visual unit. Nested elements use the same or a smaller radius: inner radius = outer radius minus the padding between them, rounded to the nearest token.
   Why: mixed corners inside one unit look broken.
5. `radius/full` only for circles (avatars, circular icon buttons) and intentional pills (StatusPill, chips). On a rectangle it becomes a pill, which is a different visual choice.
   Why: full on wide shapes changes the component's character.
6. Radius never flips in RTL; asymmetric corners (a bubble tail, a segmented end) mirror with the layout.
   Why: logical corners follow reading direction.

## The scale
| Token | Value | Use |
|---|---|---|
| `radius/none` | 0 | Tables, dividers, full-bleed media, hard edges |
| `radius/xs` | 2 | Hairline rounding: progress tracks, tiny markers |
| `radius/sm` | 4 | Tags, small badges, dense controls |
| `radius/md` | 8 | Inputs, small components, chips, menu items, thumbnails |
| `radius/lg` | 12 | Buttons and standard cards (the "default" of the primitive scale) |
| `radius/xl` | 16 | Large containers, list groups (ActionList card) |
| `radius/brand` | 20 | Safqah brand-aligned featured cards |
| `radius/default` | 20 | Default v2 component radius (same value as `radius/brand`) |
| `radius/2xl` | 24 | Large modals, BottomSheet top corners, prominent cards |
| `radius/3xl` | 32 | Hero containers |
| `radius/full` | 9999 | Avatars, pills, circular buttons |

## Choosing: lg 12 vs md 8 vs default 20
| Surface | Token |
|---|---|
| Featured or brand card (deal card, hero card, goal card) | `radius/default` |
| Standard card in a dense list, button-sized controls | `radius/lg` |
| Input field, select, small component, chip, menu item | `radius/md` |
| Tag, small badge | `radius/sm` |
| Bottom sheet, large modal | `radius/2xl` (top corners only on sheets) |
| Avatar, circular icon button, pill | `radius/full` |
| Table, divider, full-width image | `radius/none` |

Rule of thumb: the larger and more prominent the surface, the larger the radius; small controls inside a card step down (card `radius/default` with 16 padding holds inner tiles at `radius/sm` or `radius/md`).

## Note on older docs
The Effects foundation page text still lists an older mapping (md 8 as "default", 2xl as 20). The variable values in `data/tokens-resolved.json` win: `radius/2xl` = 24, `radius/brand` = `radius/default` = 20, `radius/lg` = 12.

## Examples
| Do | Don't |
|---|---|
| `CardDeal` as built (no corner override) | Re-rounding an instance to 14 |
| Input `radius/md` inside a card `radius/default` | Input `radius/2xl` inside a card `radius/md` |
| Avatar `radius/full` | `radius/full` on a full-width banner |

## Sources
- `data/tokens-resolved.json` (`radius/*`, `Radius/*` descriptions).
- Figma foundation page Effects 69:883 (`data/foundations/effects.md`).
