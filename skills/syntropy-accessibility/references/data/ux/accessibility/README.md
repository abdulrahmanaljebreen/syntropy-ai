# Accessibility knowledge

How an agent makes a Safqah screen (Flutter app, web, back-office) meet WCAG 2.2 AA with Syntropy tokens and components, and how to prove it. Read this file first, then open only the file your task needs.

## Rules
1. Target is WCAG 2.2 Level A and AA on every surface, in Arabic (RTL) and English (LTR), in Light and Dark. Why: Safqah is a regulated investment product; a screen that fails AA is a defect, not a polish item.
2. Pick colour pairs from `contrast-pairs.md` (recommended section). Never pick a pair listed under "fail in either mode". Why: the table is computed from the real token values in both modes.
3. Never edit `contrast-pairs.json` or `contrast-pairs.md` by hand. Run `node scripts/contrast-pairs.mjs` after tokens change. Why: they are generated and tested (`tests/contrast.test.mjs`).
4. Before you hand off a screen, run the checks in `testing.md` and report findings with `../review/review-format.md`. Why: an unchecked claim of "accessible" is worth nothing.
5. Use Syntropy components with their real states (`State=focused`, `State=disabled`, `State=error`) instead of re-drawing states. Why: the components already carry focus, error and disabled treatments.

## Files

| File | Use it when | Key output |
| --- | --- | --- |
| `contrast-pairs.md` / `.json` | choosing any text, icon or border colour | ratio per mode, pass flags, verdict |
| `wcag22-aa.md` | you need the full list of success criteria and the Syntropy way to meet each | per-SC meaning, Syntropy method, quick test |
| `touch-targets.md` | sizing any tappable thing (IconButton, Tag Removable, chips, table actions) | 44 / 48 / 24 minimums, spacing exception |
| `focus-keyboard.md` | web, back-office, Flutter with hardware keyboard or switch access | `border/focus` ring, focus order in RTL, traps |
| `screen-readers.md` | labelling widgets, live updates, numbers and currency in Arabic | Flutter `Semantics` recipes, ARIA via APG |
| `forms.md` | any input, OTP, amount, KYC step | label, hint, error formula, redundant entry |
| `motion.md` | animation, Spinner*, carousels, countdowns | reduced motion, no flashing, pause controls |
| `dynamic-type.md` | text styles, layouts that must grow | 200% text, Arabic line height 1.5, no money truncation |
| `color-not-alone.md` | status, charts, validation, selection | second cue rules for StatusPill, Tag, charts |
| `testing.md` | before hand-off, in CI | Flutter guideline tests, axe-core tags, manual Arabic VoiceOver/TalkBack scripts |

## Quick path for a new screen
1. Colours: every foreground/background pair is in the recommended tables of `contrast-pairs.md`.
2. Targets: every tappable element is at least 44x44 (iOS) / 48x48 dp (Android), 24x24 CSS px on web (`touch-targets.md`).
3. Names: every interactive element has an accessible name in Arabic and English; icon-only controls carry a label (`screen-readers.md`).
4. Order: reading and focus order follow the visual order in RTL (`focus-keyboard.md`).
5. States: errors are announced, status uses icon plus text, not colour alone (`forms.md`, `color-not-alone.md`).
6. Scale: the screen works at 200% text with no clipped amounts (`dynamic-type.md`).
7. Motion: respects reduced motion; nothing flashes (`motion.md`).
8. Prove it: `testing.md` automated plus one manual screen-reader pass.

## Known system-level risks (from `contrast-pairs.md`)
- Brand green is used as built (decided 19 Oct 2026): white on `bg/brand/primary` (primary Button, FAB, filled badges) and brand green text, icons and borders on light surfaces (selected tiles, amounts, links) are accepted at their measured ratios. Never flag or recolour them.
- `text/subtle` is large-text only. Never for information the user needs.
- `border/strong`, `border/brand/primary`, `border/success`, `border/warning` are under 3:1 in Light. A control edge or selection must not rely on them alone.
- `text/default` on `bg/brand/yellow` or `bg/warning` collapses in Dark.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/
- knowledge/tokens/resolved.json
- knowledge/components/index.json
