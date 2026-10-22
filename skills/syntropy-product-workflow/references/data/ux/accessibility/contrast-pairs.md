# Contrast pairs

Generated WCAG 2.x contrast for Syntropy semantic colour tokens in Light and Dark. Use it to pick a foreground for a background, or to check a pair before you ship. Regenerate with `node scripts/contrast-pairs.mjs`; do not edit by hand. Machine-readable twin: `contrast-pairs.json`.

## Rules
1. Body text (under 24px regular, under 18.66px bold) needs 4.5:1 in both modes (SC 1.4.3). Why: Safqah screens carry amounts and terms that must be read exactly.
2. Large text needs 3:1 (SC 1.4.3). A `large-only` pair may only be used at 24px+ regular or 18.66px+ bold. Why: thin strokes of small Arabic glyphs disappear first.
3. Icons that carry meaning, focus rings and the only visible edge of a control need 3:1 (SC 1.4.11). Why: users must find the control and its state.
4. Decorative borders (dividers, card outlines with a fill change) and disabled states are not required to meet a ratio. They must not be the only cue. Why: WCAG exempts them, but meaning still has to reach the user.
5. A pair must pass in Light and Dark. Never pick a pair that passes in one mode only. Why: Safqah ships both themes and users switch at night.
6. Brand green is used as built (decided 19 Oct 2026). White on `bg/brand/primary` (primary Button, FAB, filled badges, Timeline steps) and brand green text, icons and borders on light surfaces (selected tiles, amounts, links, selected states) are accepted at their measured ratios. Use the components exactly as built: do not flag these pairs, recolour them, darken the green or add raw colours. Why: this is the Safqah brand, and every shipped screen (the investment calculator, the deal page CTA) uses it this way.

Summary: 226 pairs checked. 116 pass, 16 brand green as built (accepted), 18 large-text only, 14 fail Light only, 10 fail Dark only, 5 fail both, 36 decorative borders (informational), 11 disabled (exempt).

## Brand green as built (accepted)

These pairs are below the WCAG ratio and accepted by design-system decision. They are listed so you know they are intentional; never report them as issues.

| Foreground | Background | Light | Dark | Where |
| --- | --- | --- | --- | --- |
| `text/brand/primary` | `bg/base` | 2.92 | 11.71 | selected tile, amount, link, selected border |
| `border/brand/primary` | `bg/base` | 2.92 | 8.52 | selected tile, amount, link, selected border |
| `text/brand/primary` | `bg/surface` | 2.79 | 11.71 | selected tile, amount, link, selected border |
| `border/brand/primary` | `bg/surface` | 2.79 | 8.52 | selected tile, amount, link, selected border |
| `text/brand/primary` | `bg/elevated` | 2.68 | 10.85 | selected tile, amount, link, selected border |
| `border/brand/primary` | `bg/elevated` | 2.68 | 7.90 | selected tile, amount, link, selected border |
| `text/brand/primary` | `bg/brand/primary-subtle` | 2.85 | 7.66 | selected tile, amount, link, selected border |
| `text/brand/primary` | `bg/brand/accent-50` | 2.85 | 7.66 | selected tile, amount, link, selected border |
| `text/brand/primary` | `bg/brand/accent-100` | 2.53 | 4.98 | selected tile, amount, link, selected border |
| `text/brand/primary` | `bg/brand/lightest` | 2.36 | 3.27 | selected tile, amount, link, selected border |
| `icon/brand/primary` | `bg/brand/lightest` | 2.80 | 3.27 | selected tile, amount, link, selected border |
| `text/on-brand` | `bg/brand/primary` | 2.92 | 2.14 | primary Button, FAB, filled badge, Timeline step |
| `icon/on-brand` | `bg/brand/primary` | 2.92 | 2.14 | primary Button, FAB, filled badge, Timeline step |
| `text/on-brand` | `bg/brand/primary-hover` | 3.46 | 1.56 | primary Button, FAB, filled badge, Timeline step |
| `icon/on-brand` | `bg/brand/primary-hover` | 3.46 | 1.56 | primary Button, FAB, filled badge, Timeline step |
| `text/on-brand` | `bg/brand/primary-pressed` | 5.09 | 3.46 | primary Button, FAB, filled badge, Timeline step |

## Known risks

| Pair | Light | Dark | Verdict | What to do |
| --- | --- | --- | --- | --- |
| `text/subtle on bg/base` | 3.2 | 5.71 | large-only | text/subtle is placeholder and tertiary meta only. Never put information the user needs to decide on in it. |
| `text/subtle on bg/surface` | 3.05 | 5.71 | large-only | Same as above on page background. |
| `icon/subtle on bg/base` | 3.2 | 5.71 | pass | Decorative or redundant icons only (an icon next to a label that says the same thing). |
| `border/default on bg/base` | 1.28 | 1.41 | decorative | Divider. Fine as decoration; a control that relies on it as its only edge fails SC 1.4.11. |
| `border/strong on bg/base` | 2.01 | 5.71 | fail-light | Strongest neutral border is still under 3:1 in Light. An Input or Checkbox edge drawn only with it fails SC 1.4.11; keep the visible label above the field and a filled or underlined field shape, and flag to the DS team. |
| `text/default on bg/brand/yellow` | 15.45 | 1.02 | fail-dark | text/default flips to light in Dark while the yellow stays bright (1.02:1). On yellow, use a fixed dark foreground or bg/brand/yellow-subtle. |
| `text/default on bg/warning` | 8.48 | 1.67 | fail-dark | Same flip problem in Dark. Use bg/warning-subtle with text/warning for warning surfaces. |
| `text/on-brand on bg/success` | 2.22 | 1.94 | fail-both | StatusPill Variant=solid Tone=success. Prefer Variant=subtle. |
| `text/on-brand on bg/warning` | 2.2 | 1.93 | fail-both | Never put white on warning orange. Use text/default on bg/warning or the subtle variant. |

## Pairs that fail in either mode

Sorted worst first. `Needs` is the ratio the role requires (text 4.5, icon and control border 3). `large-only` text passes 3:1 in both modes, so it is allowed only at large sizes.

| Foreground | Background | Role | Needs | Light | Dark | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| `text/default` | `bg/brand/yellow` | text | 4.5 | 15.45 | 1.02 | fail-dark |
| `icon/default` | `bg/brand/yellow` | icon | 3 | 15.45 | 1.02 | fail-dark |
| `text/default` | `bg/warning` | text | 4.5 | 8.48 | 1.67 | fail-dark |
| `text/muted` | `bg/brand/yellow` | text | 4.5 | 5.66 | 1.71 | fail-dark |
| `border/strong` | `bg/elevated` | border-control | 3 | 1.85 | 5.29 | fail-light |
| `border/strong` | `bg/surface` | border-control | 3 | 1.92 | 5.71 | fail-light |
| `text/on-brand` | `bg/warning` | text | 4.5 | 2.20 | 1.93 | fail-both |
| `icon/on-brand` | `bg/warning` | icon | 3 | 2.20 | 1.93 | fail-both |
| `text/on-brand` | `bg/success` | text | 4.5 | 2.22 | 1.94 | fail-both |
| `icon/on-brand` | `bg/success` | icon | 3 | 2.22 | 1.94 | fail-both |
| `border/strong` | `bg/base` | border-control | 3 | 2.01 | 5.71 | fail-light |
| `border/warning` | `bg/elevated` | border-control | 3 | 2.02 | 8.77 | fail-light |
| `border/success` | `bg/elevated` | border-control | 3 | 2.04 | 8.73 | fail-light |
| `border/warning` | `bg/surface` | border-control | 3 | 2.10 | 9.47 | fail-light |
| `border/success` | `bg/surface` | border-control | 3 | 2.12 | 9.43 | fail-light |
| `text/on-brand` | `bg/brand/darkest-hover` | text | 4.5 | 7.76 | 2.14 | fail-dark |
| `icon/on-brand` | `bg/brand/darkest-hover` | icon | 3 | 7.76 | 2.14 | fail-dark |
| `border/warning` | `bg/base` | border-control | 3 | 2.20 | 9.47 | fail-light |
| `border/success` | `bg/base` | border-control | 3 | 2.22 | 9.43 | fail-light |
| `text/brand/darkest` | `bg/brand/lightest` | text | 4.5 | 4.12 | 2.38 | fail-both |
| `icon/brand/darkest` | `bg/brand/lightest` | icon | 3 | 4.12 | 2.38 | fail-dark |
| `text/muted` | `bg/brand/lightest` | text | 4.5 | 5.52 | 2.54 | fail-dark |
| `text/on-brand` | `bg/brand/darkest` | text | 4.5 | 5.09 | 2.92 | fail-dark |
| `icon/on-brand` | `bg/brand/darkest` | icon | 3 | 5.09 | 2.92 | fail-dark |
| `text/subtle` | `bg/elevated` | text | 4.5 | 2.94 | 5.29 | fail-light |
| `icon/subtle` | `bg/elevated` | icon | 3 | 2.94 | 5.29 | fail-light |
| `icon/warning` | `bg/elevated` | icon | 3 | 2.97 | 8.77 | fail-light |
| `icon/success` | `bg/elevated` | icon | 3 | 3.00 | 8.73 | fail-light |
| `icon/warning` | `bg/warning-subtle` | icon | 3 | 3.00 | 4.24 | fail-light |
| `text/subtle` | `bg/surface` | text | 4.5 | 3.05 | 5.71 | large-only |
| `text/on-brand` | `bg/error` | text | 4.5 | 5.23 | 3.12 | large-only |
| `text/on-brand` | `bg/info` | text | 4.5 | 4.02 | 3.15 | large-only |
| `text/on-brand` | `bg/progress` | text | 4.5 | 4.13 | 3.15 | large-only |
| `text/subtle` | `bg/base` | text | 4.5 | 3.20 | 5.71 | large-only |
| `text/on-brand` | `bg/caution` | text | 4.5 | 4.49 | 3.35 | large-only |
| `text/on-brand` | `bg/brand/darkest-pressed` | text | 4.5 | 11.94 | 3.46 | large-only |
| `text/brand/darkest` | `bg/brand/accent-100` | text | 4.5 | 4.43 | 3.63 | large-only |
| `text/progress` | `bg/progress-subtle` | text | 4.5 | 3.69 | 5.02 | large-only |
| `text/progress` | `bg/elevated` | text | 4.5 | 3.80 | 7.09 | large-only |
| `text/muted` | `bg/brand/accent-100` | text | 4.5 | 5.94 | 3.86 | large-only |
| `text/progress` | `bg/surface` | text | 4.5 | 3.95 | 7.65 | large-only |
| `text/on-brand` | `bg/overlay` over `bg/base` | text | 4.5 | 4.00 | 6.74 | large-only |
| `text/muted` | `bg/warning-subtle` | text | 4.5 | 6.34 | 4.07 | large-only |
| `text/progress` | `bg/base` | text | 4.5 | 4.13 | 7.65 | large-only |
| `text/muted` | `bg/success-subtle` | text | 4.5 | 6.41 | 4.13 | large-only |
| `text/default` | `bg/brand/lightest` | text | 4.5 | 15.08 | 4.41 | large-only |
| `text/caution` | `bg/caution-subtle` | text | 4.5 | 6.45 | 4.42 | large-only |

## Recommended pairs

Every pair below meets its required ratio in both Light and Dark. Prefer these.

### Text on neutral surfaces

| Foreground | Background | Light | Dark | AA normal both |
| --- | --- | --- | --- | --- |
| `text/default` | `bg/base` | 18.65 | 15.80 | yes |
| `text/default` | `bg/surface` | 17.83 | 15.80 | yes |
| `text/default` | `bg/elevated` | 17.15 | 14.64 | yes |
| `text/caution` | `bg/base` | 8.34 | 7.16 | yes |
| `text/caution` | `bg/surface` | 7.97 | 7.16 | yes |
| `text/muted` | `bg/base` | 6.83 | 9.08 | yes |
| `text/info` | `bg/base` | 6.71 | 9.86 | yes |
| `text/caution` | `bg/elevated` | 7.67 | 6.64 | yes |
| `text/muted` | `bg/surface` | 6.53 | 9.08 | yes |
| `text/info` | `bg/surface` | 6.41 | 9.86 | yes |
| `text/muted` | `bg/elevated` | 6.28 | 8.42 | yes |
| `text/info` | `bg/elevated` | 6.17 | 9.14 | yes |
| `text/error` | `bg/base` | 5.23 | 9.49 | yes |
| `text/brand/darkest` | `bg/base` | 5.09 | 8.52 | yes |
| `text/success` | `bg/base` | 5.05 | 10.70 | yes |
| `text/warning` | `bg/base` | 5.03 | 10.18 | yes |
| `text/error` | `bg/surface` | 5.00 | 9.49 | yes |
| `text/brand/darkest` | `bg/surface` | 4.87 | 8.52 | yes |
| `text/success` | `bg/surface` | 4.83 | 10.70 | yes |
| `text/warning` | `bg/surface` | 4.81 | 10.18 | yes |
| `text/error` | `bg/elevated` | 4.81 | 8.80 | yes |
| `text/brand/darkest` | `bg/elevated` | 4.68 | 7.90 | yes |
| `text/success` | `bg/elevated` | 4.64 | 9.91 | yes |
| `text/warning` | `bg/elevated` | 4.63 | 9.43 | yes |

### Text on tints and fills

| Foreground | Background | Light | Dark | AA normal both |
| --- | --- | --- | --- | --- |
| `text/inverse` | `bg/inverse` | 18.65 | 18.65 | yes |
| `text/default` | `bg/reverse-overlay` | 18.65 | 17.09 | yes |
| `text/default` | `bg/brand/yellow-subtle` | 18.21 | 11.63 | yes |
| `text/default` | `bg/error-subtle` | 16.44 | 10.95 | yes |
| `text/default` | `bg/progress-subtle` | 16.65 | 10.37 | yes |
| `text/default` | `bg/brand/primary-subtle` | 18.22 | 10.33 | yes |
| `text/default` | `bg/brand/accent-50` | 18.22 | 10.33 | yes |
| `text/default` | `bg/caution-subtle` | 14.42 | 9.75 | yes |
| `text/default` | `bg/info-subtle` | 16.61 | 8.36 | yes |
| `text/default` | `bg/success-subtle` | 17.50 | 7.18 | yes |
| `text/default` | `bg/warning-subtle` | 17.30 | 7.08 | yes |
| `text/default` | `bg/brand/accent-100` | 16.21 | 6.72 | yes |
| `text/muted` | `bg/brand/yellow-subtle` | 6.67 | 6.68 | yes |
| `text/muted` | `bg/error-subtle` | 6.02 | 6.29 | yes |
| `text/muted` | `bg/progress-subtle` | 6.10 | 5.96 | yes |
| `text/muted` | `bg/brand/primary-subtle` | 6.67 | 5.94 | yes |
| `text/muted` | `bg/brand/accent-50` | 6.67 | 5.94 | yes |
| `text/muted` | `bg/caution-subtle` | 5.28 | 5.60 | yes |
| `text/info` | `bg/info-subtle` | 5.97 | 5.22 | yes |
| `text/brand/darkest` | `bg/brand/primary-subtle` | 4.97 | 5.57 | yes |
| `text/brand/darkest` | `bg/brand/accent-50` | 4.97 | 5.57 | yes |
| `text/muted` | `bg/info-subtle` | 6.08 | 4.80 | yes |
| `text/success` | `bg/success-subtle` | 4.74 | 4.86 | yes |
| `text/error` | `bg/error-subtle` | 4.61 | 6.58 | yes |
| `text/warning` | `bg/warning-subtle` | 4.67 | 4.56 | yes |

### Icons

| Foreground | Background | Light | Dark | AA normal both |
| --- | --- | --- | --- | --- |
| `icon/inverse` | `bg/inverse` | 18.65 | 18.65 | yes |
| `icon/default` | `bg/base` | 18.65 | 15.80 | yes |
| `icon/default` | `bg/surface` | 17.83 | 15.80 | yes |
| `icon/default` | `bg/elevated` | 17.15 | 14.64 | yes |
| `icon/default` | `bg/brand/yellow-subtle` | 18.21 | 11.63 | yes |
| `icon/muted` | `bg/base` | 6.83 | 9.08 | yes |
| `icon/muted` | `bg/surface` | 6.53 | 9.08 | yes |
| `icon/muted` | `bg/elevated` | 6.28 | 8.42 | yes |
| `icon/progress` | `bg/base` | 5.90 | 5.80 | yes |
| `icon/progress` | `bg/surface` | 5.64 | 5.80 | yes |
| `icon/caution` | `bg/base` | 6.07 | 5.44 | yes |
| `icon/caution` | `bg/surface` | 5.80 | 5.44 | yes |
| `icon/progress` | `bg/elevated` | 5.43 | 5.37 | yes |
| `icon/brand/darkest` | `bg/base` | 5.09 | 8.52 | yes |
| `icon/caution` | `bg/elevated` | 5.58 | 5.04 | yes |
| `icon/brand/darkest` | `bg/brand/primary-subtle` | 4.97 | 5.57 | yes |
| `icon/brand/darkest` | `bg/brand/accent-50` | 4.97 | 5.57 | yes |
| `icon/brand/darkest` | `bg/surface` | 4.87 | 8.52 | yes |
| `icon/info` | `bg/base` | 4.73 | 5.80 | yes |
| `icon/brand/darkest` | `bg/elevated` | 4.68 | 7.90 | yes |
| `icon/info` | `bg/surface` | 4.52 | 5.80 | yes |
| `icon/info` | `bg/elevated` | 4.35 | 5.37 | no |
| `icon/error` | `bg/base` | 4.27 | 5.86 | no |
| `icon/error` | `bg/surface` | 4.08 | 5.86 | no |
| `icon/error` | `bg/elevated` | 3.92 | 5.43 | no |
| `icon/progress` | `bg/progress-subtle` | 5.27 | 3.81 | no |
| `icon/error` | `bg/error-subtle` | 3.76 | 4.06 | no |
| `icon/brand/darkest` | `bg/brand/accent-100` | 4.43 | 3.63 | no |
| `icon/brand/primary` | `bg/base` | 3.46 | 11.71 | no |
| `icon/on-brand` | `bg/brand/primary-pressed` | 5.09 | 3.46 | no |
| `icon/on-brand` | `bg/brand/darkest-pressed` | 11.94 | 3.46 | no |
| `icon/brand/primary` | `bg/brand/primary-subtle` | 3.38 | 7.66 | no |
| `icon/brand/primary` | `bg/brand/accent-50` | 3.38 | 7.66 | no |
| `icon/caution` | `bg/caution-subtle` | 4.69 | 3.36 | no |
| `icon/on-brand` | `bg/caution` | 4.49 | 3.35 | no |
| `icon/brand/primary` | `bg/surface` | 3.31 | 11.71 | no |
| `icon/success` | `bg/base` | 3.26 | 9.43 | no |
| `icon/warning` | `bg/base` | 3.23 | 9.47 | no |
| `icon/subtle` | `bg/base` | 3.20 | 5.71 | no |
| `icon/brand/primary` | `bg/elevated` | 3.19 | 10.85 | no |
| `icon/on-brand` | `bg/info` | 4.02 | 3.15 | no |
| `icon/on-brand` | `bg/progress` | 4.13 | 3.15 | no |
| `icon/success` | `bg/surface` | 3.12 | 9.43 | no |
| `icon/on-brand` | `bg/error` | 5.23 | 3.12 | no |
| `icon/warning` | `bg/surface` | 3.09 | 9.47 | no |
| `icon/info` | `bg/info-subtle` | 4.21 | 3.07 | no |
| `icon/success` | `bg/success-subtle` | 3.06 | 4.28 | no |
| `icon/subtle` | `bg/surface` | 3.05 | 5.71 | no |
| `icon/brand/primary` | `bg/brand/accent-100` | 3.01 | 4.98 | no |

### Control borders

| Foreground | Background | Light | Dark | AA normal both |
| --- | --- | --- | --- | --- |
| `border/focus` | `bg/base` | 18.65 | 15.80 | yes |
| `border/focus` | `bg/surface` | 17.83 | 15.80 | yes |
| `border/focus` | `bg/elevated` | 17.15 | 14.64 | yes |
| `border/brand/darkest` | `bg/base` | 5.09 | 11.71 | yes |
| `border/brand/darkest` | `bg/surface` | 4.87 | 11.71 | yes |
| `border/brand/darkest` | `bg/elevated` | 4.68 | 10.85 | yes |
| `border/caution` | `bg/base` | 4.49 | 5.44 | no |
| `border/caution` | `bg/surface` | 4.30 | 5.44 | no |
| `border/progress` | `bg/base` | 4.13 | 5.80 | no |
| `border/caution` | `bg/elevated` | 4.13 | 5.04 | no |
| `border/info` | `bg/base` | 4.02 | 5.80 | no |
| `border/progress` | `bg/surface` | 3.95 | 5.80 | no |
| `border/info` | `bg/surface` | 3.84 | 5.80 | no |
| `border/progress` | `bg/elevated` | 3.80 | 5.37 | no |
| `border/info` | `bg/elevated` | 3.69 | 5.37 | no |
| `border/error` | `bg/base` | 3.65 | 5.86 | no |
| `border/error` | `bg/surface` | 3.49 | 5.86 | no |
| `border/error` | `bg/elevated` | 3.35 | 5.43 | no |

## Decorative borders and disabled (informational)

| Foreground | Background | Light | Dark | Verdict |
| --- | --- | --- | --- | --- |
| `text/disabled` | `bg/base` | 1.68 | 2.67 | exempt |
| `icon/disabled` | `bg/base` | 1.68 | 2.67 | exempt |
| `border/default` | `bg/base` | 1.28 | 1.41 | decorative |
| `border/darkmode-divider` | `bg/base` | 1.00 | 1.41 | decorative |
| `border/subtle` | `bg/base` | 1.15 | 1.32 | decorative |
| `border/disabled` | `bg/base` | 1.28 | 1.32 | exempt |
| `border/success-subtle` | `bg/base` | 1.31 | 2.20 | decorative |
| `border/caution-subtle` | `bg/base` | 1.47 | 1.62 | decorative |
| `border/warning-subtle` | `bg/base` | 1.35 | 2.23 | decorative |
| `border/error-error` | `bg/base` | 1.47 | 2.26 | decorative |
| `border/info-subtle` | `bg/base` | 1.43 | 1.89 | decorative |
| `border/brand/subtle` | `bg/base` | 1.24 | 3.58 | decorative |
| `border/brand/muted` | `bg/base` | 1.56 | 5.27 | decorative |
| `border/brand/accent` | `bg/base` | 2.14 | 6.26 | decorative |
| `border/progress-subtle` | `bg/base` | 1.42 | 1.52 | decorative |
| `text/disabled` | `bg/disabled` | 1.31 | 2.03 | exempt |
| `icon/disabled` | `bg/disabled` | 1.31 | 2.03 | exempt |

Only `bg/base` and fill rows are shown here; `contrast-pairs.json` has every surface.

## Sources
- knowledge/tokens/resolved.json (Semantic collection, Light and Dark modes)
- https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
- https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum
- https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast
