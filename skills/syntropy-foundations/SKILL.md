---
name: syntropy-foundations
description: Teaches agents to apply Syntropy (the Safqah design system) foundation tokens correctly by role. Use whenever a Safqah screen, component, mockup, Flutter widget, CSS or Figma frame needs a colour, text style, spacing, radius, shadow, theme, dark-mode value or motion timing, or when reviewing UI for token misuse. Covers semantic colour tokens (bg/*, text/*, border/*, icon/*), the surface elevation ladder, brand green bg/brand/primary (#4daa57) and brand yellow, status tones (success, caution, warning, error, info, progress), the 37 IBM Plex Sans Arabic text styles, space/* and radius/* scales, the five two-layer shadows, Light and Dark modes, Locked vs Themable tokens, contrast pairs and an intent-to-token cheat sheet with a token search script. Triggers: "which token", "what colour for", "card background", "muted text", "divider colour", "dark mode", "font size", "line height", "padding", "spacing", "radius", "shadow", "elevation", "theme", "Founding Day", "hex", "brand green", Safqah, Syntropy, صفقة.
---

# Syntropy Foundations

## Purpose
Pick the right Syntropy foundation token for every visual decision on a Safqah screen: colour by role, type by text style, space, radius, elevation and theme. Every answer names exact token names from `references/data/tokens-resolved.json`, works in Light and Dark, and passes the contrast pairs in `references/data/contrast-pairs.md`.

## Hard rules
1. Use semantic tokens only (`bg/*`, `text/*`, `border/*`, `icon/*`, `space/*`, `radius/*`, `font/*`, text styles, `Shadow / *` styles). Never put a primitive (`Color/Primary/LightGreen/500`, `Spacing/16`, `Radius/12`) or a raw hex or px value in product UI.
   Why: only semantic tokens carry Light/Dark modes and future themes; primitives never change.
2. Brand green is `bg/brand/primary` (Light #4daa57, Dark #77c27f). `#02AD4C` and `#0E849E` are wrong for UI; refuse them and offer the token.
   Why: old documents and a logo file colour leaked into product work and caused three different greens.
3. Pick colour by meaning, not by look: status meaning uses status tokens, brand emphasis uses brand tokens, neutral UI uses neutral tokens. Never use `text/success` for "positive in general" or brand green for "success".
   Why: users learn the meaning of each hue; mixing meanings erodes trust in alerts about money.
4. Red (`*/error`) is for errors, destructive actions and the extreme deal states only (defaulted, critical failure). Warnings, pending items and "needs attention" use the warning tone (`bg/warning-subtle` + `text/warning` + `icon/warning`).
   Why: red everywhere desensitises investors to the one state that really matters.
5. Pair status surfaces with their own family: `bg/{status}-subtle` + `text/{status}` + `icon/{status}` + optional `border/{status}` (error subtle border is `border/error-error`). Never put white text on `bg/success` or `bg/warning` (fail both modes).
   Why: the subtle pairs are the ones tuned to pass AA in Light and Dark.
6. Text uses a named text style (`body / 14 / regular`, `heading / 20 / semibold`, ...), never hand-set size, weight or line height. Use the style's explicit line height; never bind the four broken aliases `font/line-height/heading`, `font/line-height/body`, `font/line-height/reading`, `font/line-height/arabic`.
   Why: those four aliases point at primitives that do not exist in Figma; the text styles carry the correct 1.5x line height.
7. One family: `font/family` = IBM Plex Sans Arabic for Arabic and English. Product UI weights are Regular, Medium, SemiBold, Bold only. No italics, no letter spacing on Arabic.
   Why: one family keeps bilingual screens coherent; italics and tracking break Arabic letterforms.
8. Normal copy is at least 12px (`caption / 12 / regular`). `caption / 9 / regular (fine-print only)` is for legal or compliance footnotes only. Body copy users must read is 13px or more.
   Why: amounts and terms must be read exactly; 9 to 11px fails comfortable reading.
9. Every foreground/background pair must pass in both Light and Dark (text 4.5:1, large text 3:1, meaningful icons and control edges 3:1). Check `references/data/contrast-pairs.md` before shipping a pair.
   Why: Safqah ships both modes and users switch at night; a pair that passes in one mode only is a bug.
10. `text/brand/primary` is for brand accents as the components build them (amounts, selected labels, links, toggles), never body paragraphs. Brand green as built is accepted at 2.92:1 in Light (decided 19 Oct 2026); do not swap it for a darker green.
    Why: brand green text fails AA Normal on white.
11. On `bg/brand/yellow` use a fixed dark foreground only in Light and prefer `bg/brand/yellow-subtle` + `text/default` (passes both modes). Never green text on yellow.
    Why: `text/default` on `bg/brand/yellow` is 1.02:1 in Dark and green on yellow fails WCAG.
12. Spacing and radius come from the scales: `space/none` to `space/5xl` (0 to 64), `radius/none` to `radius/full`. No 6, 10, 14, 15px values. `radius/default` (20) is the v2 component default; one radius per visual unit.
    Why: off-scale values create drift that engineers cannot map to tokens.
13. Shadows only through the five effect styles `Shadow / xs` to `Shadow / xl` (or `Shadow / none`). Never a raw drop shadow, never a third layer, never a hex shadow colour. In Dark, elevate with `bg/elevated` + `border/subtle`, not shadow.
    Why: shadows disappear on near-black; raw shadows are untracked drift.
14. Only Light and Dark exist today. Themes (Founding Day, Ramadan, partners) swap only the 24 `[Themable]` tokens and are not built yet. Never hard-code a seasonal palette and never recolour `[Locked]` tokens.
    Why: status and neutral meaning must survive any theme.
15. Gradients are for marketing and illustration only: the primary ramp #008150 to #00B224 to #FBE900 (diagonal) and the subtle fade #00B224 to transparent white (vertical). Never on buttons, cards, text or status UI.
    Why: product UI must stay flat, legible and themable.
16. Never use the em dash character in any output; never describe or link work-in-progress areas of the Figma file.
    Why: repo writing rules.

## Workflow
1. Identify the role of each visual element: surface, text, border, icon, status, brand, spacing, shape, elevation, motion. If the person gave a hex or px value, translate it to a role first.
2. For a quick answer, open `references/token-lookup.md` (intent to token). If the intent is unusual, run `node scripts/find-token.mjs "<intent words>"` and read the top matches with their Light/Dark values and tag.
3. For colour, open `references/color.md` to confirm the pair, the elevation tier and Dark behaviour. For brand or marketing colour, open `references/brand.md`.
4. For text, open `references/typography.md`, pick the style by role (caption, body, heading, display) and size, and read the line height from the style.
5. For layout, open `references/spacing-layout.md` (space tokens, screen margins, compact vs regular) and `references/radius.md`.
6. For floating or raised surfaces, open `references/elevation.md` and pick the shadow by role, then the Dark fallback.
7. For themes or a request to "change the brand colour for an occasion", open `references/themes.md`.
8. For animation, open `references/motion.md`.
9. Check every pair you chose in `references/data/contrast-pairs.md` (both modes). If a pair fails, switch to the documented alternative.
10. Answer with exact token names (backticked), Light/Dark values only when they help, the reason in one line, and an Arabic example first when copy is involved.

## Decision tables

### Surfaces (elevation ladder, back to front)
| Need | Use | Not |
|---|---|---|
| Page canvas behind everything | `bg/surface` | `bg/base` for the canvas, Neutral/50 primitive |
| Main content area, list background, sheet body | `bg/base` | `#ffffff` |
| Card, modal, popover, raised tile | `bg/elevated` (+ `border/subtle` in Dark) | a shadow alone in Dark |
| Tooltip, dark snippet on light page | `bg/inverse` + `text/inverse` | `bg/elevated` |
| Modal scrim | `bg/overlay` | Black 50% primitive |
| Light frosted scrim over imagery | `bg/reverse-overlay` | custom alpha |
| Disabled control fill | `bg/disabled` + `text/disabled` | lowering opacity |

Dark mode: `bg/surface` and `bg/base` are the same (#121614). Only `bg/elevated` (#1c1d1c) is a distinct tier, so borders carry the edge.

### Brand
| Need | Use | Not |
|---|---|---|
| Primary CTA fill | `Button` `Variant=primary` (uses `bg/brand/primary`, hover `bg/brand/primary-hover`, pressed `bg/brand/primary-pressed`) | a custom green rectangle, `#02AD4C` |
| Green text on neutral surface | `text/brand/darkest` | `text/brand/primary` for body |
| Soft brand callout background | `bg/brand/primary-subtle` or `bg/brand/accent-50` + `text/default` | `bg/brand/lightest` with green text (fails) |
| Selected row / chip border | `border/brand/primary` + a second cue (check icon or tint) | colour alone |
| Hero / marketing block | `bg/brand/darkest` + `text/on-brand` (Light only; check Dark) | a gradient behind product text |
| Secondary accent highlight | `bg/brand/yellow-subtle` + `text/default` | green text on yellow |

### Status
| Meaning | Surface + text + icon + border | Example |
|---|---|---|
| Success, completed, paid | `bg/success-subtle`, `text/success`, `icon/success`, `border/success-subtle` | «تم استلام التوزيع» |
| Warning, pending, needs attention, late | `bg/warning-subtle`, `text/warning`, `icon/warning`, `border/warning-subtle` | «الدفعة متأخرة» |
| Error, failed, destructive, defaulted | `bg/error-subtle`, `text/error`, `icon/error`, `border/error-error` | «تعثرت الصفقة» |
| Info, neutral notice | `bg/info-subtle`, `text/info`, `icon/info`, `border/info-subtle` | «سيبدأ الطرح غدا» |
| In progress, milestone | `bg/progress-subtle`, `text/progress` (large only on subtle in Light), `icon/progress`, `border/progress-subtle` | «جار التحقق» |
| Caution (muted, earthy attention) | `bg/caution-subtle`, `text/caution` (large only on subtle), `icon/caution`, `border/caution-subtle` | schedule highlight, in recovery |

### Text colour
| Need | Use |
|---|---|
| Primary copy, amounts, titles | `text/default` |
| Secondary copy, helper text, captions | `text/muted` |
| Placeholder, low-priority meta (never decision info) | `text/subtle` |
| Disabled | `text/disabled` |
| On brand or status filled surface | `text/on-brand` (check pair) |
| On `bg/inverse` | `text/inverse` |

### Type role
| Need | Style |
|---|---|
| Screen title (mobile) | `heading / 24 / bold` or `heading / 22 / semibold` |
| Section title | `heading / 18 / semibold` or `heading / 20 / semibold` |
| Body (default product) | `body / 14 / regular`; long reading `body / 16 / regular` |
| Emphasis inside body | same size `medium` or `semibold` |
| Helper text, timestamps | `caption / 12 / regular` |
| Hero amount (portfolio total) | `display / 32 / bold` |
| Legal fine print | `caption / 9 / regular (fine-print only)` |

### Spacing
| Need | Token |
|---|---|
| Icon to label | `space/xs` (4) |
| Chip padding, dense row gap | `space/sm` (8) |
| List item padding, related items | `space/md` (12) |
| Component padding, screen side margin (mobile) | `space/lg` (16) |
| Card padding | `space/xl` (20) |
| Gap between sections | `space/2xl` (24) |
| Major section break | `space/3xl` (32) |

## Self-check before answering
- [ ] Every colour, size, space, radius and shadow is a named Syntropy token or text style, backticked, spelled exactly as in the data.
- [ ] No primitive names, no raw hex or px in the recommendation (hex only when explaining a value).
- [ ] No `#02AD4C`, `#0E849E` or any other non-token green.
- [ ] Each foreground/background pair checked in both Light and Dark; no `fail-*` pair, and `large-only` pairs only at 24px regular or 18.66px bold and above.
- [ ] Red only for error, destructive or extreme states; warnings in the warning tone.
- [ ] Text styles named in full (`body / 14 / regular`), line height from the style, nothing at 9 to 11px except fine print or dense meta.
- [ ] Dark mode answered: what changes, and whether a border replaces a shadow.
- [ ] Gradients only for marketing or illustration.
- [ ] Arabic example first when copy appears, Western digits, currency after the amount.
- [ ] No em dash character; no work-in-progress Figma areas mentioned.

## References
| File | Open it when |
|---|---|
| `references/color.md` | choosing any colour token, checking pairs, Light vs Dark behaviour |
| `references/brand.md` | brand green, brand yellow, the two gradients, logo-colour confusion |
| `references/typography.md` | choosing a text style, line heights, Arabic rules, numbers |
| `references/spacing-layout.md` | padding, gaps, screen margins, breakpoints, grid, compact vs regular |
| `references/radius.md` | corner radius for a surface or control |
| `references/elevation.md` | shadows, raised surfaces, Dark elevation |
| `references/themes.md` | Light/Dark, Locked vs Themable, seasonal or partner themes |
| `references/motion.md` | durations, easing, reduced motion |
| `references/token-lookup.md` | fast intent to token answers (50+ intents) |
| `scripts/find-token.mjs` | searching tokens by intent words: `node scripts/find-token.mjs "muted text on card"` |
| `references/data/tokens-resolved.json` | generated: every token with Light/Dark values, tag and description |
| `references/data/text-styles.json` | generated: the 37 text styles with size, weight, line height |
| `references/data/foundations/*.md` | generated: the Figma foundation pages (colors, typography, layout, effects, ...) |
| `references/data/contrast-pairs.md` | generated: WCAG ratios for every semantic pair in Light and Dark |

For components (which component carries which tokens) see syntropy-components; for copy see syntropy-content; for icons and illustrations see syntropy-icons-illustration.
