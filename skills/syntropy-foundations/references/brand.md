# Brand colour, yellow and gradients

How the Safqah brand shows up through Syntropy tokens: the one brand green, the secondary yellow, the two allowed gradients and where each is banned. Open this when someone mentions "brand colour", a specific green hex, a gradient, or a campaign look.

## Rules
1. The brand green is `#4daa57`, used through `bg/brand/primary` (and its family `text/brand/*`, `border/brand/*`, `icon/brand/*`). In Dark it resolves to #77c27f.
   Why: one green across every screen; the token adapts per mode and per future theme.
2. `#02AD4C`, `#0E849E` and any other green hex are wrong for product UI. Politely refuse and map the intent to a token (`bg/brand/primary` for a CTA, `text/brand/darkest` for green text).
   Why: these came from old documents and logo files and produced three greens in v1.
3. The secondary brand colour is yellow: `bg/brand/yellow` (Light #fcee21, Dark #fdf149) and `bg/brand/yellow-subtle`. Use it sparingly for accents and highlights. Content on yellow uses `text/default` (Light) and never green text.
   Why: yellow is a highlight, not a second primary; green on yellow fails WCAG.
4. Gradients exist only in marketing and illustration. Product UI (buttons, cards, inputs, status, text, charts) is flat tokens.
   Why: gradients cannot be tokenised or themed and they hurt legibility of amounts.
5. Brand green is not success green. Success uses `*/success`; brand uses `*/brand/*`.
   Why: a "brand-positive" message in success green reads as a system confirmation.
6. Logo colours are logo colours. Pigment Green (#02AD4C), Royal Green (#277D57), Off-White (#F6F3EF) and the other logo fills apply only to the `SafqahLogo` component, never to UI elements.
   Why: the logo is a trademarked asset with its own palette; UI uses tokens.

## Brand token family
| Role | Token | Light | Dark |
|---|---|---|---|
| CTA fill | `bg/brand/primary` | #4daa57 | #77c27f |
| CTA hover | `bg/brand/primary-hover` | #469b4f | #aedab2 |
| CTA pressed | `bg/brand/primary-pressed` | #387c3f | #469b4f |
| Strongest brand surface | `bg/brand/darkest` | #387c3f | #4daa57 |
| Light brand fill | `bg/brand/lightest` | #d6edd9 | #387c3f |
| Soft callout | `bg/brand/primary-subtle` / `bg/brand/accent-50` | #fafdfb | #1c3e20 |
| Very light tint | `bg/brand/accent-100` | #e4f3e5 | #2a5d2f |
| Green text | `text/brand/darkest` | #387c3f | #77c27f |
| Green text with affordance / large | `text/brand/primary` | #4daa57 | #aedab2 |
| Brand icon | `icon/brand/primary` | #469b4f | #aedab2 |
| Selected / brand border | `border/brand/primary` | #4daa57 | #77c27f |
| Yellow accent surface | `bg/brand/yellow` | #fcee21 | #fdf149 |
| Yellow soft callout | `bg/brand/yellow-subtle` | #fffdeb | #333001 |

All 24 brand tokens (plus `border/focus`) are `[Themable]`: a future theme may swap them. Never hard-code their values.

## The two allowed gradients (marketing and illustration only)
| Gradient | Stops | Direction | Use |
|---|---|---|---|
| Primary ramp | #008150 → #00B224 → #FBE900 | Diagonal 45° or 135° (occasionally vertical 90°) | Hero illustrations, isometric tiles, large decorative shapes, marketing heroes |
| Subtle fade | #00B224 → transparent white | Vertical | Small spot graphics (light bulb, rocket, ascending arrows), soft glow |

Gradient rules (from the Illustrations foundation page):
- Never horizontal (0° or 180°).
- Two or three stops, never four or more.
- Dark end is always a saturated green (#008150 or #00B224), never grey.
- Light end is either yellow (#FBE900 / #FFEB00) or transparent white, never both in one gradient.
- Shadows inside illustrations use dark teal #004348 at 30 to 50 percent, never black.
- These hex values are illustration palette values, not UI tokens. Do not reuse them for UI fills.

For the full illustration palette and bans see syntropy-icons-illustration.

## Bans
| Never | Instead |
|---|---|
| Gradient on a `Button`, card, input, banner or chart | flat `bg/brand/primary`, `bg/elevated`, status subtle surfaces |
| Gradient behind body text or amounts | flat `bg/brand/darkest` + `text/on-brand` (verify both modes) or a neutral surface |
| A new green for a campaign | a future theme mode on the Semantic collection (see `themes.md`) |
| `#02AD4C` "because the logo uses it" | `bg/brand/primary` in UI; Pigment Green only inside `SafqahLogo` |
| Green text on `bg/brand/yellow` | `text/default` on `bg/brand/yellow-subtle` |
| Brand green for success messages | `bg/success-subtle` + `text/success` |
| Yellow as a warning colour | `bg/warning-subtle` + `text/warning` |
| Blue or red brand accents | brand green and yellow only; blue is `info`, red is `error` |

## Examples
| Do | Don't |
|---|---|
| «استثمر الآن» on `Button` `Variant=primary` (uses `bg/brand/primary`) | A custom button filled `#02AD4C` |
| Marketing hero illustration with the primary ramp at 135° | The same ramp as a background behind the «رصيد المحفظة» amount |
| A "new" highlight chip on `bg/brand/yellow-subtle` with `text/default` | Green «جديد» text on `bg/brand/yellow` |
| Brand emphasis «صفقة مميزة» in `text/brand/darkest` | Brand emphasis in `text/success` |

## Sources
- `data/tokens-resolved.json` (`brandGreen`, `bg/brand/*`, `text/brand/*`, `border/brand/*`, `icon/brand/*`).
- Figma foundation pages: Colors 69:879, Illustrations 69:886 (`data/foundations/illustrations.md`), Logos 69:881 (`data/foundations/logos.md`).
- Repo writing conventions (brand green rule).
