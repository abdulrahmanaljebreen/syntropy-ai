# Contrast: picking pairs, the risk list, reading the data

How to choose a foreground and background that pass WCAG 2.2 AA in Light and Dark with Syntropy tokens, which pairs are known system risks, and how to read `data/contrast-pairs.md` and `data/ux/accessibility/contrast-pairs.json`. Open this before choosing any text, icon or border colour, and whenever someone proposes a colour.

## Rules
1. Body text needs 4.5:1, large text 3:1 (24px regular, or 18.66px bold), meaningful icons, focus rings and the only visible edge of a control 3:1. Why: SC 1.4.3 and 1.4.11.
2. A pair must meet its ratio in Light **and** Dark. Why: Safqah ships both themes; users switch at night.
3. Pick from the "Recommended pairs" tables in `data/contrast-pairs.md`. Never pick a pair from "Pairs that fail in either mode". Why: the table is computed from the real token values of both modes (226 pairs audited).
4. Never fix a failing pair by inventing a raw hex value, an opacity or a primitive. Switch to a passing semantic pair, or flag a known system issue to the DS team. Why: raw values break theming, drift from Figma and are lint errors (`no-raw-color`, `off-palette-color`).
5. A pair not in the tables is checked with `node scripts/contrast.mjs <fg> <bg>` before use, and the result (both ratios) is quoted in your answer. Why: evidence, not opinion.
6. Text over images, gradients or video is checked on the worst pixel area, and protected by a scrim (`bg/overlay`) or a solid surface. Why: automated checks miss text over media.
7. Disabled controls (`text/disabled`, `icon/disabled`, `border/disabled`) are exempt, but nothing the user needs to decide may be shown only in disabled styling. Why: WCAG exempts inactive components, not information.
8. Decorative borders (`border/default`, `border/subtle`, dividers) have no ratio requirement, but a control that relies on one as its only edge fails SC 1.4.11. Why: users must find the control.

## How to pick a pair (4 steps)
1. Name the role: body text, large text, icon, control edge, focus, decorative.
2. Name the surface the element sits on: `bg/base` (content), `bg/surface` (page canvas), `bg/elevated` (cards, sheets), a tint (`bg/*-subtle`), or a fill (`bg/brand/primary`, `bg/success`).
3. Look up the recommended table for that surface. Take the first token whose meaning fits (default, muted, status).
4. If you need anything else, run the script, quote both ratios, and only then use it.

## Fast answers

| Need | Use | Not |
| --- | --- | --- |
| Primary text on any neutral surface | `text/default` | primitives, `#111` |
| Secondary text, helper text, captions | `text/muted` (6.28 to 9.08) | `text/subtle` (large only) |
| Placeholder | `text/subtle`, never the label, never needed info | grey hex like `#ccc` |
| Green text, link colour | `text/brand/primary` as the components build it (brand green as built, accepted) | a raw green hex or a hand-darkened green |
| Status text on neutral | `text/success`, `text/warning`, `text/error`, `text/info`, `text/caution` | `text/progress` (large only) |
| Status chip | `StatusPill Variant=subtle` (status text on `bg/*-subtle`) | `Variant=solid` with white on `bg/success` or `bg/warning` |
| Soft brand callout | `bg/brand/primary-subtle` + `text/default` or `text/brand/darkest` | `bg/brand/lightest` + green text |
| Yellow highlight | `bg/brand/yellow-subtle` + `text/default` | `text/default` on `bg/brand/yellow` (1.02 Dark) |
| Warning surface | `bg/warning-subtle` + `text/warning` | `text/default` on `bg/warning` (1.67 Dark) |
| Meaningful icon | `icon/default`, `icon/muted` | `icon/subtle` (decorative only) |
| Focus ring | `border/focus` (14.64 to 18.65) | `border/brand/primary` |
| Control edge or selected edge | `border/brand/darkest`, or any border plus a second cue (label, fill, check) | `border/strong` alone (2.01 Light) |
| Tooltip or dark chip | `bg/inverse` + `text/inverse` | `bg/elevated` |
| Text on a modal scrim | not allowed at body size: `text/on-brand` on `bg/overlay` is 4.00 in Light (large only) | small white text on the scrim |

## Brand green as built (accepted, never flag)

Decided 19 Oct 2026. These pairs are below the WCAG ratio and used on purpose. Use the components exactly as built (the investment calculator is the reference) and never report them.

| Pair | Light | Dark | Where |
| --- | --- | --- | --- |
| `text/on-brand`, `icon/on-brand` on `bg/brand/primary` (and hover, pressed) | 2.92 | 2.14 | primary `Button`, FAB, filled badges such as «أفضل خيار», Timeline steps |
| `text/brand/primary`, `icon/brand/primary` on `bg/base`, `bg/surface`, `bg/elevated`, brand tints | 2.36 to 2.92 | 3.27 to 11.71 | selected tile labels, green amounts, inline links and toggles |
| `border/brand/primary` on `bg/base`, `bg/surface`, `bg/elevated` | 2.68 to 2.92 | 7.90 to 8.52 | selected tile and row borders |

## Known system risks (flag, do not fix locally)

These are defects in the token set itself. When you meet one, keep the Syntropy component, report it as a finding with owner `ds`, and never override it with raw hex. Use the safe alternative for anything new.

| Pair | Light | Dark | Where it shows up | What to do |
| --- | --- | --- | --- | --- |
| `text/on-brand` on `bg/success` | 2.22 | 1.94 | `StatusPill Variant=solid Tone=success` | use `Variant=subtle` |
| `text/on-brand` on `bg/warning` | 2.20 | 1.93 | solid warning chips, badges | use `Variant=subtle`; never white on warning |
| `border/strong` on `bg/base` / `bg/surface` / `bg/elevated` | 2.01 / 1.92 / 1.85 | 5.71 / 5.71 / 5.29 | `Input`, `Checkbox` edges | never the only cue: visible label above the field, filled or underlined shape, `State=focus` ring; flag to DS |
| `border/brand/primary`, `border/success`, `border/warning` on neutrals | 2.02 to 2.92 | 7.90 to 9.47 | selected rows, chips | pair with a check icon, tint fill or weight |
| `text/default` on `bg/brand/yellow` | 15.45 | 1.02 | yellow highlight blocks | `bg/brand/yellow-subtle` + `text/default` |
| `text/default` on `bg/warning` | 8.48 | 1.67 | warning fills | `bg/warning-subtle` + `text/warning` |
| `text/subtle` on neutrals | 2.94 to 3.20 | 5.29 to 5.71 | placeholders, tertiary meta | large-only; never information the user needs |

Rounded ratios. Exact values: `data/ux/accessibility/contrast-pairs.json` or the script.

## Reading `data/contrast-pairs.md`
- **Summary line**: 226 pairs; 116 pass, 19 large-text only, 24 fail Light only, 11 fail Dark only, 9 fail both, 36 decorative, 11 disabled.
- **Known risks** table: the pairs above, with the "what to do" line.
- **Pairs that fail in either mode**: sorted worst first; `Needs` is the required ratio for the role.
- **Recommended pairs**: grouped by text on neutral, text on tints and fills, icons, control borders. Only rows with "yes" in the last column pass in both modes; the icon and border groups also list "no" rows for reference: do not use those for meaning.
- **Decorative and disabled**: informational only.

## Reading `contrast-pairs.json`
Each item in `pairs`:

```json
{ "id": "text/muted on bg/elevated", "fg": "text/muted", "bg": "bg/elevated",
  "role": "text", "required": 4.5, "verdict": "pass", "minRatio": 6.28,
  "modes": { "Light": { "ratio": 6.28, "meetsRequired": true }, "Dark": { "ratio": 8.42, "meetsRequired": true } } }
```

- `verdict`: `pass`, `large-only`, `fail-light`, `fail-dark`, `fail-both`, `decorative`, `exempt`.
- Composited pairs have `over` (for example `text/on-brand on bg/overlay over bg/base`).
- Quote `modes.Light.ratio` and `modes.Dark.ratio` as evidence in reviews.

## The script
```bash
node scripts/contrast.mjs text/muted bg/elevated          # tokens
node scripts/contrast.mjs "#cccccc" bg/base               # evaluate a requested hex
node scripts/contrast.mjs --text-muted "var(--bg-surface)" # CSS variable names work
node scripts/contrast.mjs text/on-brand bg/overlay --over bg/elevated
node scripts/contrast.mjs text/subtle bg/base --large     # large text threshold
node scripts/contrast.mjs icon/muted bg/base --json       # machine output
```
- Prints Light and Dark hex, ratio, pass or fail at 4.5 and 3, and the role's required ratio.
- Translucent backgrounds are composited over `bg/base` (or `--over`); translucent foregrounds over the background.
- `icon/*` and `border/*` tokens are judged at 3:1; text at 4.5:1 unless `--large`.
- Exit 0 when the required ratio is met in both modes, 1 otherwise: usable in CI.
- Prints a "Known system risk" note for the pairs above.

## Examples
- Do: helper text «الحد الأدنى 1,000.00 ر.س» in `text/muted` on `bg/elevated` (6.28 / 8.42). Don't: the same hint in `text/subtle` (2.94 Light).
- Do: link «اعرف المزيد عن الرسوم» in `text/brand/primary`, as the `Link` component builds it. Don't: a raw green hex.
- Do: a request for `#ccc` placeholder text: run the script (1.61 on `bg/base` in Light), decline, offer `text/muted` for hints and `text/subtle` for placeholder only with a persistent label.
- Do: use the primary Button exactly as built, no finding. Don't: ship a hand-made darker green button or report it.

## Sources
- `data/contrast-pairs.md`, `data/ux/accessibility/contrast-pairs.json` (generated from the resolved tokens)
- https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum
- https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast
- https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
