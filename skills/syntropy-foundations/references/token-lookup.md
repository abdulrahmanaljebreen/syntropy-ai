# Token lookup: intent to token

Fast answers: what a person asks for, and the exact Syntropy token. Open this first; open `color.md`, `typography.md` or `spacing-layout.md` when the intent is not listed or needs a pair check. For anything else run `node scripts/find-token.mjs "<intent>"`.

## Rules
1. Answer with the token name, not the hex. Give Light/Dark values only when the person asks or when Dark changes the answer.
   Why: values change; names do not.
2. If an intent maps to a component (primary button, error banner), name the component and variant first, then the token it uses.
   Why: components carry the correct pairs and states.

## Surfaces
| Intent | Token |
|---|---|
| Page / app background | `bg/surface` |
| Main content area, list background | `bg/base` |
| Card background (Light and Dark) | `bg/elevated` (Dark: add `border/subtle`) |
| Modal / dialog / bottom sheet body | `bg/base` or `bg/elevated` (match the component) |
| Popover, menu, dropdown panel | `bg/elevated` + `Shadow / md` |
| Tooltip background | `bg/inverse` (text `text/inverse`) |
| Modal scrim / backdrop | `bg/overlay` |
| Frosted light scrim on a photo | `bg/reverse-overlay` |
| Disabled button / input background | `bg/disabled` |
| Selected list row background | `bg/brand/accent-50` (or `bg/brand/lightest` with `text/default`) |
| Hover background of a neutral row | `bg/elevated` |
| Skeleton placeholder fill | `bg/disabled` (follow `Skeleton`) |

## Brand
| Intent | Token |
|---|---|
| Brand button / primary CTA | `Button` `Variant=primary` → `bg/brand/primary`, label `text/on-brand` |
| Primary CTA hover / pressed | `bg/brand/primary-hover` / `bg/brand/primary-pressed` |
| Brand callout background | `bg/brand/primary-subtle` |
| Hero / marketing header fill | `bg/brand/darkest` |
| Green text on white | `text/brand/darkest` |
| Brand link with underline or icon | `text/brand/primary` (large or with affordance only) |
| Brand icon | `icon/brand/primary` |
| Brand border (selected card) | `border/brand/primary` + second cue |
| Subtle brand outline | `border/brand/subtle` |
| Yellow highlight / "new" accent | `bg/brand/yellow-subtle` + `text/default` |
| Strong yellow accent surface | `bg/brand/yellow` (Light only with `text/default`; check Dark) |

## Text
| Intent | Token |
|---|---|
| Body text / primary text | `text/default` |
| Secondary text, description | `text/muted` |
| Muted text on a card | `text/muted` (passes on `bg/elevated` 6.6 Light) |
| Helper text under an input | `text/muted` |
| Placeholder text | `text/subtle` |
| Timestamp / low-priority meta | `text/muted` (or `text/subtle` if non-critical) |
| Disabled text | `text/disabled` |
| Text on dark tooltip | `text/inverse` |
| Text on a green button | `text/on-brand` |
| Error message text | `text/error` |
| Warning message text | `text/warning` |
| Success message text | `text/success` |
| Info message text | `text/info` |
| In-progress label | `text/progress` (large only on `bg/progress-subtle`) |
| Link in a paragraph | `text/default` underlined or `text/brand/darkest` |
| Gain amount | `text/success` + `+` sign |
| Loss amount | `text/error` + `-` sign (real losses only) |

## Borders and dividers
| Intent | Token |
|---|---|
| Divider / separator line | `border/subtle` (via `Divider`) |
| Card border | `border/default` (Light optional, Dark `border/subtle` required) |
| Input border at rest | `border/default` |
| Input border, hover or emphasis | `border/strong` |
| Input border, error | `border/error` |
| Input border, success | `border/success` |
| Selected row / option border | `border/brand/primary` |
| Focus ring | `border/focus` |
| Disabled input border | `border/disabled` |
| Border on dark surface | `border/inverse` |
| Divider visible only in Dark | `border/darkmode-divider` |
| Error banner border | `border/error-error` |
| Warning banner border | `border/warning-subtle` |
| Info banner border | `border/info-subtle` |

## Icons
| Intent | Token |
|---|---|
| Default icon | `icon/default` |
| Icon next to muted text | `icon/muted` |
| Decorative icon | `icon/subtle` |
| Disabled icon | `icon/disabled` |
| Icon on a green button | `icon/on-brand` |
| Icon on dark surface | `icon/inverse` |
| Error / warning / success / info icon | `icon/error` / `icon/warning` / `icon/success` / `icon/info` |
| Brand accent icon | `icon/brand/primary` |

## Status surfaces
| Intent | Token |
|---|---|
| Error banner background | `bg/error-subtle` (via `Alert` or `Banner` `Tone=error`) |
| Warning banner background | `bg/warning-subtle` |
| Success banner background | `bg/success-subtle` |
| Info banner background | `bg/info-subtle` |
| Progress / milestone background | `bg/progress-subtle` |
| Solid status badge | `StatusPill` `Variant=solid` (`bg/error`, `bg/info`...), prefer `Variant=subtle` |
| Destructive button | `Button` `Variant=destructive` (uses error family) |

## Type
| Intent | Text style |
|---|---|
| Screen title | `heading / 24 / bold` |
| Section title | `heading / 18 / semibold` |
| Card title | `body / 16 / semibold` |
| Body | `body / 14 / regular` |
| Long reading | `body / 16 / regular` |
| Caption / helper | `caption / 12 / regular` |
| Tag label | `caption / 12 / medium` |
| Big balance / hero number | `display / 32 / bold` |
| Legal fine print | `caption / 9 / regular (fine-print only)` |
| Font family | `font/family` |

## Spacing, radius, elevation
| Intent | Token |
|---|---|
| Gap between icon and label | `space/xs` |
| Chip padding | `space/sm` |
| List item padding | `space/md` |
| Component padding / screen side margin | `space/lg` |
| Card padding | `space/xl` |
| Gap between sections | `space/2xl` |
| Card radius (featured) | `radius/default` |
| Button / standard card radius | `radius/lg` |
| Input radius | `radius/md` |
| Tag radius | `radius/sm` |
| Avatar / pill radius | `radius/full` |
| Bottom sheet top radius | `radius/2xl` |
| Card shadow | `Shadow / sm` |
| Menu / popover shadow | `Shadow / md` |
| Bottom sheet shadow | `Shadow / lg` |
| Modal shadow | `Shadow / xl` |

## Sources
- `data/tokens-resolved.json`, `data/text-styles.json`, `data/contrast-pairs.md`.
- Figma foundation pages Colors 69:879, Typography 69:880, Effects 69:883, Layout 69:884.
