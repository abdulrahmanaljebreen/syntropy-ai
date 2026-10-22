# Color tokens by role

Every semantic colour token in Syntropy, grouped by role, with Light and Dark values, what to pair it with, and the traps. Open this before choosing any colour for a Safqah screen. Values are copied from `data/tokens-resolved.json`; if they ever differ, the data file wins.

## Rules
1. Use semantic tokens only. Primitives (`Color/Primary/LightGreen/500`, `Color/Neutral/900`, `Color/Alpha/Black/50`) are never referenced in product UI.
   Why: semantic tokens carry Light/Dark and themes; primitives are single-mode and never change.
2. Choose the token whose name describes the intent (surface, text, border, icon, status, brand), then check the pair in `data/contrast-pairs.md` in both modes.
   Why: intent-named tokens stay correct when values change; pairs are only verified per mode.
3. Status colours mean status. Success green is not brand green; brand green is not success.
   Why: investors read colour as meaning before they read words.
4. Red (`bg/error`, `text/error`, `icon/error`, `border/error`) only for errors, destructive actions, and extreme deal states (defaulted, critical failure). Use the warning tone for late, pending, attention.
   Why: overusing red makes the defaulted state lose its weight.
5. Never convey meaning by colour alone: pair with an icon, a label or a sign (`+2.5%`, `-1.2%`).
   Why: WCAG 1.4.1 and colour-blind users.
6. Disabled colours (`*/disabled`) are exempt from contrast but must never be the only cue that something is unavailable.
   Why: WCAG exempts them, meaning still has to reach the user.

## 1. Surfaces: the elevation ladder
Back to front: `bg/surface` (canvas) < `bg/base` (content) < `bg/elevated` (raised). All Locked.

| Token | Light | Dark | Use for |
|---|---|---|---|
| `bg/surface` | #f9faf9 | #121614 | The canvas behind everything: app background, page behind cards |
| `bg/base` | #ffffff | #121614 | Main content area: list background, sheet and modal body, form area |
| `bg/elevated` | #f4f6f2 | #1c1d1c | Anything that must lift: cards, modals, popovers, menus, floating tiles |
| `bg/inverse` | #111312 | #ffffff | Tooltips, dark snippets on light pages (pair `text/inverse`, `icon/inverse`) |
| `bg/overlay` | #00000080 | #ffffff4d | Modal and BottomSheet scrim |
| `bg/reverse-overlay` | #ffffffb2 | #00000080 | Light frosted scrim over imagery |
| `bg/disabled` | #e1e4e3 | #2b2d2c | Disabled control fill (pair `text/disabled`, `border/disabled`) |

Light vs Dark:
- Light has three readable tiers. A card on the page reads by `bg/elevated` (off-white) on `bg/base` (white), plus `Shadow / sm`.
- Dark has two tiers: `bg/surface` = `bg/base` = #121614. Only `bg/elevated` (#1c1d1c) differs, so elevated surfaces in Dark need `border/subtle` (or `border/default`) to show their edge. Shadows barely register.
- Never design something that relies on telling `bg/surface` from `bg/base` in Dark.

## 2. Brand surfaces (Themable)
| Token | Light | Dark | Use for |
|---|---|---|---|
| `bg/brand/primary` | #4daa57 | #77c27f | Primary CTA fill and brand surfaces. The brand green |
| `bg/brand/primary-hover` | #469b4f | #aedab2 | Hover of a primary fill (interactive only) |
| `bg/brand/primary-pressed` | #387c3f | #469b4f | Pressed of a primary fill (interactive only) |
| `bg/brand/primary-subtle` | #fafdfb | #1c3e20 | Soft brand callout, inline highlight |
| `bg/brand/accent-50` | #fafdfb | #1c3e20 | Lightest brand tint on neutral backgrounds |
| `bg/brand/accent-100` | #e4f3e5 | #2a5d2f | Very light brand presence (selected chip tint) |
| `bg/brand/lightest` | #d6edd9 | #387c3f | Light brand fill, selected list item |
| `bg/brand/lightest-hover` | #aedab2 | #469b4f | Hover of a lightest fill |
| `bg/brand/lightest-pressed` | #77c27f | #4daa57 | Pressed of a lightest fill |
| `bg/brand/darkest` | #387c3f | #4daa57 | Strongest brand surface: hero header, emphasised callout |
| `bg/brand/darkest-hover` | #2a5d2f | #77c27f | Hover of a darkest fill |
| `bg/brand/darkest-pressed` | #1c3e20 | #469b4f | Pressed of a darkest fill |
| `bg/brand/yellow` | #fcee21 | #fdf149 | Secondary brand accent surface, sparingly |
| `bg/brand/yellow-subtle` | #fffdeb | #333001 | Soft secondary-brand callout |

Pairs that work in both modes:
- `bg/brand/primary-subtle` or `bg/brand/accent-50` with `text/default`, `text/muted`, `text/brand/darkest`, `icon/brand/primary`.
- `bg/brand/yellow-subtle` with `text/default`, `text/muted`, `icon/default` (18.21 / 11.63).

Brand green as built (accepted, decided 19 Oct 2026):
- `text/on-brand` on `bg/brand/primary`: 2.92 Light, 2.14 Dark. The primary `Button`, FAB, filled badges and Timeline steps use it exactly as built. Never put white body paragraphs on brand green elsewhere.
- `text/brand/primary`, `icon/brand/primary`, `border/brand/primary` on light surfaces (2.36 to 2.92 Light): amounts, selected tiles, links, as built.

Pairs that fail (do not use):
- `text/brand/darkest` on `bg/brand/lightest`: fails both.
- Anything on `bg/brand/yellow` in Dark (`text/default` 1.02). Green text on yellow in any mode.
- `text/on-brand` on `bg/brand/darkest`: passes Light (5.09), fails Dark (2.92). Use only on marketing surfaces you can verify in both modes, or use large text.

Interactive states (`-hover`, `-pressed`) only on elements that respond to input. A static card with a hover colour is a usability lie.

## 3. Status (Locked)
Six families. Each has a filled background, a subtle background, text, icon, a border and a subtle border.

| Family | Filled bg | Subtle bg | Text | Icon | Border | Subtle border |
|---|---|---|---|---|---|---|
| Success | `bg/success` #34c759 / #54d274 | `bg/success-subtle` #eefbf1 / #185a28 | `text/success` #217f39 / #76db90 | `icon/success` #2ba349 / #54d274 | `border/success` | `border/success-subtle` |
| Warning | `bg/warning` #ff9500 / #ffa82e | `bg/warning-subtle` #fff5e8 / #744400 | `text/warning` #a25f00 / #ffb246 | `icon/warning` #d17a00 / #ffa82e | `border/warning` | `border/warning-subtle` |
| Error | `bg/error` #da002a / #ff5374 | `bg/error-subtle` #ffecf0 / #6d0015 | `text/error` #da002a / #ffa0b2 | `icon/error` #f5002f / #ff5374 | `border/error` | `border/error-error` |
| Info | `bg/info` #007aff / #2e92ff | `bg/info-subtle` #e8f3ff / #00438b | `text/info` #0059b9 / #8bc3ff | `icon/info` #006fe8 / #2e92ff | `border/info` | `border/info-subtle` |
| Progress | `bg/progress` #af52de / #be71e4 | `bg/progress-subtle` #f8effc / #551674 | `text/progress` #af52de / #cc91ea | `icon/progress` #9828d1 / #be71e4 | `border/progress` | `border/progress-subtle` |
| Caution | `bg/caution` #996c61 / #ae8278 | `bg/caution-subtle` #ebe0dc / #5c2e1f | `text/caution` #704234 / #c49890 | `icon/caution` #85574a / #ae8278 | `border/caution` | `border/caution-subtle` |

(Values are Light / Dark.)

When to use which:
- Success: completed payout, verified account, investment confirmed.
- Warning: late payment, pending review, document expiring, action needed soon. This is the default "attention" tone.
- Error: failed payment, validation error, destructive confirmation, defaulted deal. Nothing else.
- Info: neutral notices, procedural state ("الطرح يبدأ غدا").
- Progress: something happening now (verification running, a milestone in a journey). Not for static info.
- Caution: a muted, earthy tone for notable states that are not warnings (for example a schedule highlight or a deal in recovery). In Figma its descriptions are copied from Success; confirm a new caution meaning with the DS team before using it.

Pairing rules:
- Subtle background + same-family text + same-family icon. This is the Alert, Banner and StatusPill `Variant=subtle` recipe.
- Filled background takes `text/on-brand` only where the pair passes: `bg/error` (5.23 Light, 3.12 Dark: large text only), `bg/info`, `bg/caution`, `bg/progress` (large only). Never white on `bg/success` (2.22 / 1.94) or `bg/warning` (2.20 / 1.93). Prefer `Variant=subtle`.
- `text/progress` and `text/caution` on their own subtle background are large-text only in Light. Use `text/default` for body copy on those surfaces and keep the tone in the icon and title.
- `icon/warning` on `bg/warning-subtle` is exactly 3.0 in Light; acceptable for an icon beside a label, not as the only signal.
- On `bg/elevated` in Light, `icon/success` and `icon/warning` fall under 3:1. Put status icons on their subtle background or next to a text label.

## 4. Text (Locked except brand)
| Token | Light | Dark | Use for |
|---|---|---|---|
| `text/default` | #111312 | #edefee | Primary copy, titles, amounts |
| `text/muted` | #535d58 | #b0b9b5 | Secondary copy, helper text, captions, descriptions |
| `text/subtle` | #86938d | #86938d | Placeholders, tertiary meta. Large-only on `bg/base` (3.2 Light); never decision-critical info |
| `text/disabled` | #c3c9c6 | #535d58 | Disabled labels and values |
| `text/inverse` | #ffffff | #111312 | Text on `bg/inverse` |
| `text/on-brand` | #ffffff | #ffffff | Labels on filled brand or status surfaces (check pair) |
| `text/brand/primary` (Themable) | #4daa57 | #aedab2 | Brand emphasis with a non-colour affordance (border, underline, icon) or large text. Fails AA Normal on white |
| `text/brand/darkest` (Themable) | #387c3f | #77c27f | Green text on neutral surfaces, high-emphasis brand copy. Passes on `bg/base`, `bg/surface`, `bg/elevated` |
| `text/success`, `text/warning`, `text/error`, `text/info`, `text/progress`, `text/caution` | see status table | | Status copy on neutral or subtle status surfaces |

Hierarchy on one screen: `text/default` for what the user decides on, `text/muted` for support, `text/subtle` for the least important. Do not combine colour emphasis with weight emphasis unless the text truly matters.

## 5. Borders
| Token | Light | Dark | Use for |
|---|---|---|---|
| `border/subtle` | #edefee | #2b2d2c | Default separation: dividers, table rows, section breaks; card edge in Dark |
| `border/default` | #e1e4e3 | #303230 | Cards, inputs at rest, modals that need more presence |
| `border/strong` | #b0b9b5 | #86938d | Emphasis, hovered card. Under 3:1 in Light (2.01): never the only edge of a control |
| `border/darkmode-divider` | #ffffff | #303230 | Divider that should vanish in Light and show in Dark |
| `border/inverse` | #ffffff | #111312 | Borders on `bg/inverse` |
| `border/disabled` | #e1e4e3 | #2b2d2c | Disabled control edge |
| `border/focus` (Themable) | #111312 | #edefee | Keyboard focus ring on every interactive element |
| `border/brand/primary` (Themable) | #4daa57 | #77c27f | Selected state, brand-aligned containers. 2.92 in Light: pair with a second cue |
| `border/brand/subtle` | #d6edd9 | #387c3f | Hint of brand on a card or input |
| `border/brand/muted` | #aedab2 | #469b4f | Grouped section with brand affinity |
| `border/brand/accent` | #77c27f | #4daa57 | Clearly brand edge that does not compete with a CTA |
| `border/brand/darkest` | #387c3f | #aedab2 | High-emphasis edge on hero or marketing surfaces |
| Status borders | see status table | | Inputs in a validation state, status containers. Never decoration |

Notes:
- `border/focus` resolves to the neutral ink colour (not green) in the current data, giving a high-contrast ring in both modes. The Figma colors page text still describes a green focus ring; the variable value wins.
- Do not pair a visible border with a strong shadow on the same card; pick one in Light. In Dark the border is structural.

## 6. Icons
| Token | Light | Dark | Use for |
|---|---|---|---|
| `icon/default` | #111312 | #edefee | Default icon colour, matches `text/default` |
| `icon/muted` | #535d58 | #b0b9b5 | Icons next to muted text |
| `icon/subtle` | #86938d | #86938d | Decorative or redundant icons only; fails 3:1 on `bg/elevated` in Light |
| `icon/disabled` | #c3c9c6 | #535d58 | Disabled icons |
| `icon/inverse` | #ffffff | #111312 | Icons on `bg/inverse` |
| `icon/on-brand` | #ffffff | #ffffff | Icons on filled brand surfaces (check pair) |
| `icon/brand/primary` (Themable) | #469b4f | #aedab2 | Brand-coloured icons; passes 3:1 on neutral surfaces |
| `icon/brand/darkest` (Themable) | #387c3f | #77c27f | High-emphasis brand icons |
| Status icons | see status table | | Same hue as the status text so they read as one unit |

## 7. Combining: recipes
| Element | Recipe |
|---|---|
| Card on a screen (Light) | page `bg/surface`, content `bg/base`, card `bg/elevated` + `Shadow / sm` |
| Card on a screen (Dark) | same tokens; card gets `border/subtle`, shadow optional |
| Error banner | `Banner` or `Alert` `Tone=error`: `bg/error-subtle`, `text/error` title, `text/default` body, `icon/error`, `border/error-error` |
| Warning notice (late payout) | `Alert` `Tone=warning`: `bg/warning-subtle`, `text/warning`, `icon/warning` |
| Selected option row | `bg/brand/accent-50` tint + `border/brand/primary` + check icon `icon/brand/primary` |
| Input error state | `border/error` + `Input Helper Text` `Tone=error` (`text/error`) + `icon/error` |
| Link in body copy | `text/default` underlined, or `text/brand/darkest` |
| Gain / loss figure | `text/success` with `+` sign / `text/error` with `-` sign (only for real losses), never colour alone |

## 8. Examples
| Do | Don't |
|---|---|
| `bg/brand/primary` for the «استثمر الآن» button (via `Button` `Variant=primary`) | `#02AD4C` or `Color/Primary/LightGreen/500` |
| «الدفعة متأخرة 3 أيام» in `text/warning` on `bg/warning-subtle` | Late payment in red |
| «تعثرت الصفقة» in `text/error` on `bg/error-subtle` | Defaulted shown in warning orange |
| Green emphasis «نسبة العائد المتوقع 12.0%» in `text/brand/darkest` | `text/brand/primary` as body text on white |
| Yellow highlight with `bg/brand/yellow-subtle` + `text/default` | `text/brand/primary` on `bg/brand/yellow` |
| Dark-mode card: `bg/elevated` + `border/subtle` | Dark-mode card relying on `Shadow / md` |
| Purple only for in-progress states | Purple to make an error banner "softer" |

## Sources
- Generated data: `data/tokens-resolved.json` (Semantic collection, Light/Dark), `data/contrast-pairs.md`.
- Figma foundation page Colors 69:879 (`data/foundations/colors.md`), Effects 69:883 (`data/foundations/effects.md`).
