---
name: syntropy-code-adapters
description: Turns Syntropy (the Safqah design system) into code for Flutter mobile, web React or Next.js, and the Angular back office and developer portal. Use whenever an engineer or agent writes, reviews or refactors Safqah UI code, wires design tokens, themes, dark mode, RTL or Arabic, builds a widget or component from a Figma node, sets up Tailwind, CSS variables, Style Dictionary or a Flutter ThemeExtension, runs syntropy-lint, or opens a UI pull request. Encodes the bridge rules: R1 Direction is never a parameter, R2 variant count is not story count, R3 names transfer verbatim (bg/brand/primary to colors.bgBrandPrimary, --bg-brand-primary, bg-brand-primary), R4 no raw values, R5 Figma readiness gate, R6 dependency direction. Ships generated syntropy.css, tailwind.preset.cjs and Dart token files plus their generator. Triggers: Flutter widget, Dart theme, React, Next.js, Angular, Tailwind, CSS variables, design tokens, dark mode, RTL, hex color, margin-left, PR, lint, Widgetbook, Safqah, Syntropy.
---

# Syntropy in code

## Purpose
Write Safqah UI code that consumes Syntropy tokens and component APIs exactly as Figma names them, on every platform, with Arabic RTL working by construction. Every value comes from a token, every component API mirrors its Figma props minus Direction, and every change passes syntropy-lint before review.

## Hard rules
1. **R1. Direction is never a widget or component parameter.** It comes from `Directionality` (Flutter), `dir` on `<html>` (web) or the active locale (Angular `Language` service).
   Why: a `direction` parameter creates two code paths per component and guaranteed drift; Arabic carries RTL automatically.
2. **R2. Figma variant count is not story count.** One story or test case per state a reviewer would argue about; everything else is an arg or control.
   Why: `Button` has 216 variants; half are Direction, most of the rest are interaction states.
3. **R3. Names transfer verbatim, only the separator changes.** `bg/brand/primary` becomes `colors.bgBrandPrimary` (Dart), `--bg-brand-primary` (CSS), `bg-brand-primary` (Tailwind). Figma `Variant=primary` becomes `SafqahButtonVariant.primary` / `variant="primary"`.
   Why: if Figma says `Elevated` and code says `raised`, every review becomes translation.
4. **R4. No raw values in component code.** No hex, `Color(0x...)`, `Colors.*`, `rgb()`, magic px, bare `TextStyle(...)`, physical `left`/`right`. Use tokens, text styles and logical properties. Enforced by syntropy-lint.
   Why: raw values have no Dark mode and drift on the next token change.
5. **R5. Figma readiness gate.** Before implementing a component, check: axes named to convention, all paints bound to Semantic tokens, props named as the code API will be, no orphan variants, `status: "stable"`. A failing component goes back to design, labelled `figma-blocked`.
   Why: implementing a broken design bakes its debt into code.
6. **R6. Dependency direction: tokens <- components <- patterns <- screens.** Components import tokens, never screens; stories, Widgetbook and demos never live inside the app's `lib/` or `src/app`.
   Why: reverse imports make the system impossible to version.
7. **Window size class (compact, regular) is never a component parameter.** Layouts read it from the window (`MediaQuery`, CSS media or container queries); components adapt internally or the screen picks a layout.
   Why: same drift problem as Direction.
8. **Brand green is `#4daa57` through `bg/brand/primary`, never typed.** `#02AD4C` (hard-coded in the developer portal's current `tailwind.config.js`), `#0E849E` and `#00AF3D` are wrong.
   Why: old documents carry stale greens; only the token is right.
9. **One font: IBM Plex Sans Arabic for Arabic and English** through `font/family`, line height 1.5, letter spacing 0 in Arabic.
   Why: matches Figma; Latin-tuned metrics cramp Arabic.
10. **Use the generated files, never hand-edit them.** Regenerate with `node scripts/generate-snippets.mjs` after a token sync.
    Why: a hand edit is overwritten and silently diverges until then.
11. **Arabic first, Western digits, currency after the amount** (`1,250.00 ر.س` / `1,250.00 SAR`), every string in both locale files, no em dash.
    Why: Safqah locale rules; the lint checks digits, currency position and em dashes.
12. **Run syntropy-lint and fix every error before opening a PR; never merge your own PR.**
    Why: review is for judgment, the lint is for the rules.

## Workflow
1. **Identify the surface**: Flutter app, web React or Next.js, or Angular (portal, back office). Open the matching reference: `references/flutter.md`, `references/web-css.md` + `references/tailwind-preset.md`, or `references/angular.md`.
2. **Install tokens once**: copy the generated files from `assets/` (see table below) or wire the pipeline in `references/tokens-pipeline.md`. Never retype a value.
3. **Pick the component in Figma terms**: look it up in `references/data/components-index.json` (name, `status`, `props` with `name` and `canonical`). Run the R5 gate on its Figma node.
4. **Map the API** with the decision table below: VARIANT axes to enums (minus Direction and interaction states), TEXT to strings, BOOLEAN to optional slots, INSTANCE_SWAP to icon slots.
5. **Build with tokens only**: semantic colors via `context.colors` / `var(--...)` / Tailwind semantic classes, spacing and radius tokens, the 37 text styles, logical start and end.
6. **Test both directions and both themes**: Arabic RTL and English LTR, Light and Dark, long Arabic string, long English string, large number, empty, loading, disabled.
7. **Lint**: `node lint/cli.mjs <changed files>` from the syntropy-ai repo, or the `lint_ui` MCP tool (`references/lint.md`). Fix every error.
8. **Open the PR** per `references/git-pr.md`: branch `feat/<area>-<thing>`, design checklist, Figma node link, screenshots in both directions.

## Decision tables

### Figma prop to code API
| Figma prop | Example (`Button` 417:2) | Flutter | React / Angular |
|---|---|---|---|
| VARIANT, visual axis | `Variant=primary` | `variant: SafqahButtonVariant.primary` | `variant="primary"` |
| VARIANT, size axis | `Size=md` | `size: SafqahButtonSize.md` | `size="md"` |
| VARIANT `Direction` | `Direction=rtl` | none: `Directionality` | none: `dir` |
| VARIANT `State` hover, pressed, focused | `State=hover` | none: runtime interaction | none: `:hover`, `:focus-visible` |
| VARIANT `State=disabled` | | `onPressed: null` | `disabled` |
| VARIANT `State=loading` | | `isLoading: true` | `loading` |
| TEXT | `Label` | `label` (String, required) | `label` or children |
| BOOLEAN `Has icon leading` + INSTANCE_SWAP `Icon leading` | | `IconData? iconLeading` (null = hidden) | `iconLeading?: IconName` |

### Token to platform name (R3)
| Figma token | Dart | CSS | Tailwind |
|---|---|---|---|
| `bg/brand/primary` | `context.colors.bgBrandPrimary` | `var(--bg-brand-primary)` | `bg-brand-primary` |
| `text/muted` | `context.colors.textMuted` | `var(--text-muted)` | `text-muted` |
| `border/default` | `context.colors.borderDefault` | `var(--border-default)` | `border` or `border-default` |
| `icon/brand/primary` | `context.colors.iconBrandPrimary` | `var(--icon-brand-primary)` | `text-icon-brand-primary`, `fill-icon-brand-primary` |
| `space/lg` | `SyntropySpace.spaceLg` | `var(--space-lg)` | `p-lg`, `gap-lg`, `ms-lg` |
| `radius/default` | `SyntropyRadius.radiusDefault` | `var(--radius-default)` | `rounded` |
| `body / 14 / regular` | `SyntropyTextStyles.body14Regular` | `.text-body-14-regular` | `text-body-14-regular` |
| `shadow/md` | `SyntropyElevation.shadowMd` | `var(--shadow-md)` | `shadow-md` |

### Need X, use Y, not Z
| Need | Use | Not |
|---|---|---|
| Padding on the reading-start side | `EdgeInsetsDirectional.only(start:)`, `padding-inline-start`, `ps-lg` | `EdgeInsets.only(left:)`, `padding-left`, `pl-4` |
| Align to start | `AlignmentDirectional.centerStart`, `text-align: start`, `text-start` | `Alignment.centerLeft`, `text-left` |
| Primary button color | `bgBrandPrimary` / `bg-brand-primary` | `Color(0xFF4DAA57)`, `#4daa57`, `bg-green-500` |
| Muted text | `textMuted` | `Colors.grey`, `opacity: 0.6` |
| Dark mode | the token's Dark value (ThemeExtension, `[data-theme="dark"]`) | `isDark ? a : b` with raw colors |
| Card corner | `radius/lg` or the component's documented radius | `BorderRadius.circular(13)` |
| A number in Arabic text | Western digits, `1,250.00 ر.س` | `١٬٢٥٠`, `ر.س 1,250` | <!-- syntropy-lint-disable-line: intentional example -->
| RTL arrow | mirrored icon chosen by direction or `matchTextDirection: true` | a `direction` param, `Transform.scale(-1)` everywhere |

## Copy-paste files (generated)
| File | What it is |
|---|---|
| `assets/syntropy.css` | All 85 semantic colors (Light in `:root`, Dark in `[data-theme="dark"]` and `prefers-color-scheme: dark`), space, radius, type, shadows, 37 text-style classes |
| `assets/tailwind.preset.cjs` | Tailwind 3.4 preset pointing at those variables; replaces the default palette, spacing and radius scales |
| `assets/syntropy_colors.dart` | `SyntropyColors` ThemeExtension with `light` and `dark`, plus `context.colors` |
| `assets/syntropy_tokens.dart` | `SyntropySpace`, `SyntropyRadius`, `SyntropyElevation`, `SyntropyTextStyles` (37) |
| `scripts/generate-snippets.mjs` | Regenerates all four from `references/data/tokens-resolved.json` and `references/data/text-styles.json`; `--check` fails when stale |

## Self-check before answering
- [ ] No `direction`, `dir`, `isRtl` or `sizeClass` parameter on any component (R1, rule 7).
- [ ] Every color, spacing, radius, shadow and text style comes from a token or a generated file; no hex, no `Colors.*`, no magic px (R4).
- [ ] Token and variant names match Figma verbatim after the separator transform (R3).
- [ ] Only logical properties: `start` / `end`, `inline-start`, `ps-*` / `pe-*` / `ms-*` / `me-*`, `text-start`.
- [ ] Component is `status: "stable"` and passed the readiness gate (R5); imports flow tokens to components to patterns to screens (R6).
- [ ] Checked in Arabic RTL and English LTR, Light and Dark, with long Arabic text and a large number.
- [ ] Strings in both locale files, Western digits, currency after the amount, no em dash.
- [ ] syntropy-lint run on the changed files with zero errors; PR follows the template and links the Figma node.
- [ ] No hand edits to generated files.

## References
| File | Open it when |
|---|---|
| `references/flutter.md` | Writing Flutter widgets: ThemeExtension, text styles, directional geometry, Semantics, `SafqahButton` example |
| `references/web-css.md` | Plain CSS, React or Next.js: custom properties, dark mode, logical properties, `dir` and `lang` |
| `references/tailwind-preset.md` | Any Tailwind project: installing the preset, class names, logical utilities, `rtl:` variant, migrating raw configs |
| `references/angular.md` | The developer portal or back office: Angular 20 rules, ngx-translate, the `Language` service, replacing `#02AD4C` |
| `references/tokens-pipeline.md` | Wiring DTCG tokens through Style Dictionary v4 into Dart, CSS and Tailwind in an app repo |
| `references/git-pr.md` | Branching, the PR template with the design checklist, review rules |
| `references/lint.md` | Running syntropy-lint and reading each rule |
| `references/data/tokens-resolved.json` | Generated: every token with Light and Dark values |
| `references/data/text-styles.json` | Generated: the 37 text styles |
| `references/data/components-index.json` | Generated: components with Figma names (`name`) and code names (`canonical`) |

For building the Figma side see syntropy-figma; for picking a token by role see syntropy-foundations.
