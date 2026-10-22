# Themes: Light, Dark, Locked and Themable

What modes exist today, what the `[Locked]` and `[Themable]` tags mean, and how to answer requests for seasonal or partner themes. Open this when someone asks for Dark mode, a theme, or "a different colour for Founding Day / Ramadan / a partner".

## Rules
1. Only two modes exist today: Light and Dark, on the Semantic collection. Every semantic token has a value in both.
   Why: Safqah ships both and users switch at night.
2. Design and review every screen in both modes. A token pair must pass contrast in both.
   Why: several pairs pass in Light and fail in Dark (`text/default` on `bg/brand/yellow`, `text/on-brand` on `bg/brand/darkest`).
3. `[Locked]` tokens (105 semantic tokens: neutrals, surfaces, status, spacing, radius, type) never change per theme. `[Themable]` tokens (24: the brand family plus `border/focus`) are the only ones a theme may swap.
   Why: status and neutral meaning must survive any campaign; an error must still look like an error.
4. Themes beyond Light and Dark (Founding Day, Ramadan, partner co-branding) are not built yet. Do not invent a theme palette in product UI; describe the request as a theme mode for the DS team.
   Why: v1 broke when Founding Day overwrote a primitive and silently recoloured every component.
5. Never modify primitives or add modes to Primitive Core or Primitive / Typography to create a theme.
   Why: primitives are locked by architecture; modes belong on the Semantic collection.
6. Never hard-code Light values (for example #ffffff for a card) in code; bind tokens so Dark resolves automatically.
   Why: hard-coded Light values produce white boxes in Dark mode.

## Light vs Dark at a glance
| Token | Light | Dark | Watch out |
|---|---|---|---|
| `bg/surface` | #f9faf9 | #121614 | Same as `bg/base` in Dark |
| `bg/base` | #ffffff | #121614 | |
| `bg/elevated` | #f4f6f2 | #1c1d1c | Add `border/subtle` in Dark |
| `text/default` | #111312 | #edefee | Flips light in Dark: fails on `bg/brand/yellow` and `bg/warning` |
| `bg/brand/primary` | #4daa57 | #77c27f | Lighter in Dark; white labels get weaker |
| `bg/overlay` | Black 50% | White 30% | Scrim lightens in Dark |
| `text/subtle` | #86938d | #86938d | Same in both |

Dark-mode checklist:
- Elevated surfaces have a border.
- No pair from the "fail-dark" list in `data/contrast-pairs.md`.
- Illustrations and logos have a variant for dark backgrounds (logos: Off-White or White; see syntropy-icons-illustration).
- No shadow carries meaning.

## The 24 Themable tokens
`bg/brand/primary`, `bg/brand/primary-hover`, `bg/brand/primary-pressed`, `bg/brand/primary-subtle`, `bg/brand/lightest`, `bg/brand/lightest-hover`, `bg/brand/lightest-pressed`, `bg/brand/darkest`, `bg/brand/darkest-hover`, `bg/brand/darkest-pressed`, `bg/brand/accent-50`, `bg/brand/accent-100`, `bg/brand/yellow`, `bg/brand/yellow-subtle`, `text/brand/primary`, `text/brand/darkest`, `border/brand/primary`, `border/brand/subtle`, `border/brand/muted`, `border/brand/accent`, `border/brand/darkest`, `border/focus`, `icon/brand/primary`, `icon/brand/darkest`.

Practical meaning: if you use these tokens for brand expression, a future theme re-skins your screen for free. If you hard-code a green, it will not.

## How a theme would be added (for context, not for agents to do)
1. Add a mode to the Semantic collection (for example "Founding Day").
2. Add a new primitive family for the theme ramp; existing primitives stay untouched.
3. Point the 24 Themable tokens at the new ramp for that mode.
4. Verify: no primitive changed, aliases resolve, contrast passes, changelog entry.

## Answering theme requests
| Request | Answer |
|---|---|
| "Make the app purple for a campaign" | Not possible in UI today. Brand expression goes through the Themable tokens; propose a theme mode to the DS team. Purple is the progress status colour and cannot become brand |
| "Founding Day colours on the home screen" | Founding Day is not built. Use the existing tokens; seasonal art can live in marketing illustration within the brand palette |
| "Dark mode version of this screen" | Same tokens; check every pair in Dark, add borders to elevated surfaces, swap logo to a dark-surface variant |
| "Can errors be gold in the gold theme?" | No. Status tokens are Locked in every theme |

## Sources
- `data/tokens-resolved.json` (`tag`: locked / themable; Light / Dark values).
- Figma foundation page Colors 69:879 ("Adding a theme", anti-patterns), `data/contrast-pairs.md`.
