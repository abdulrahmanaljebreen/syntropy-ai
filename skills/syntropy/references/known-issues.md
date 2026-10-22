<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# Known issues

Open findings in the Syntropy system that agents must know about, and exactly how to behave for each until the design system team resolves them. Open this before any handoff, and whenever a request touches the primary button, contrast, unpublished components or icons, line-height tokens, prop names, digits in component guides, limits or fees.

## Rules
1. Never fix a system issue inside one screen (no new hex, no rebuilt component, no renamed prop). Why: one-off fixes fork the system and hide the problem.
2. Flag the issue in one line in the output ("Known issue: ...") and carry it into the handoff. Why: reviewers and engineers need to see it.
3. Where the rule and a component guide disagree, the rule in this skill wins and you say so. Why: guides drift; the rules are the decision.
4. Never present an open item as decided. Why: Product and Compliance decisions are pending.

## 1. Contrast
- **Decided (19 Oct 2026), not an issue:** brand green is used as built. White on `bg/brand/primary` (primary `Button`, FAB, filled badges, Timeline steps) and brand green text, icons and borders on light surfaces (selected tiles, amounts, links) measure 2.92:1 in Light and 2.14:1 in Dark for white on green. Use the components exactly as built, as in the investment calculator. Never flag, recolour, darken or enlarge them.
- **Still open:** `text/on-brand` on `bg/success` and `bg/warning` (solid `StatusPill`, about 2.2:1), `border/strong` in Light (2.01:1, needs 3:1 for control edges), `text/default` on `bg/brand/yellow` and `bg/warning` in Dark (1.02:1 and 1.67:1).
- **Behave:** prefer `StatusPill` `Variant=subtle` over `solid` for success and warning. Do not put white on warning. Never propose a hex.

## 2. Components not in the published library (64 sets): handled, no publishing needed
- **Issue:** these exist in the Syntropy file but are not published, so library users cannot reach them. Notable: `Tag`, `Tag Removable`, `Input`, `Input Amount`, `Input Phone`, `Input Underline`, `OTP Input`, `Select`, `Select Underline`, `Search Input`, `TextArea`, `Radio Group`, `Form Field`, `Form Field Label`, `Slider Field`, `Link`, `SocialButton`, `Badge Count`, `AppBar`, `Header`, `NavigationRail`, `Base card`, the `NewsCard / Poster` family, the `Calculator / ...` and `Keypad / ...` parts, `QualifiedCalculator`, `UserGreeting`, `Goal-Card`, `Reinvest / RecommendationRow`, `Reinvest / RecommendationCard`, `Reinvest / MaturityRecap`, `Reinvest / ComparedTo`. Full list: the `published` flag in the component index (syntropy-components).
- **Behave:** use the right component by its exact name; the repo reads the Syntropy file directly, so it is fully known. In code, specs and reviews say nothing about publishing. Inside the Syntropy file, instance the local set by node id. In another Figma file, take the published route or copy it from the Syntropy file (`unpublished.md` in syntropy-components). Never rebuild it, never substitute a lookalike, never import a stale published copy.

## 3. Icons
- **Issue:** 344 of 636 icons are unpublished (mostly Misc Utility, Financial / Fintech, Places & Travel, Core UI). 34 core icons (plus, minus, x, check, chevrons, arrows, search, filter, settings, trash, upload, download and more) exist only at 12px with no 24px version. There is no undo, redo or dedicated back icon (back uses `arrow-right-2` / `arrow-left-2`).
- **Behave:** pick icons from the Syntropy Icons file by slug (syntropy-icons-illustration); flag unpublished ones; scale 12px icons inside a 24px frame and note it; mirror directional icons in RTL; never pull icons from another set without flagging it as a proposal.

## 4. Broken line-height tokens
- **Issue:** `font/line-height/heading`, `font/line-height/body`, `font/line-height/reading` and `font/line-height/arabic` point at deleted variables and are left out of the token files.
- **Behave:** never cite those four tokens. Use the text styles (for example `body / 14 / regular`), which carry their own line height. If code needs a line height, take it from the text style.

## 5. Token text issues
- **Issue:** caution tokens (`bg/caution`, `bg/caution-subtle`, `text/caution`, `border/caution*`, `icon/caution`) have descriptions copied from "Success"; `border/error-error` probably means `border/error-subtle`; `border/focus` resolves to neutral ink while the Colors page describes a green focus ring; `radius/default` is 20 although an older page text says 8.
- **Behave:** trust token names and resolved values, not descriptions. Use `border/error-error` verbatim if needed and note the likely intent. Use `border/focus` as resolved. Use `radius/default` (20).

## 6. Figma property typos (copy verbatim)
- **Issue:** prop names with typos or odd names: "Has Headling", "Qualifide", "Not-adedd", "Has Lable", "Wight", "Done - Captial", trailing spaces in "Has Multi-deals " and "Description " (`Collapsed-Reservation`), and 9 sets with a property called `Property 1` (`Collapsed-Reservation`, `Distribution-schedule`, `Goal card`, `GoalPlan`, `Header Info`, two `Illustrations` sets, `Payouts cell`, `Small Timer`).
- **Behave:** copy the names exactly, typos and trailing spaces included, in Figma calls and specs; in code use the canonical camelCase name from the component guide. Never "correct" them in output, since a corrected name will not match.

## 7. Digit and number conflicts in some guides
- **Issue:** the `Tag` guide says "+N" uses Arabic-Indic numerals in RTL; the `Stat` guide leaves digits to locale; the ChartTooltip RTL image shows ٢٠٢٥. Some component defaults put "SAR" before the amount (`SAR 1,200`, `Minimum investment: SAR 1,000`) and one shows `16.00%`.
- **Behave:** always Western digits, currency after the amount, one decimal for percentages. When the guide or a default disagrees, override the text in the instance and note "Rule overrides component default".

## 8. Other guide drift
- `ProgressBar` guide says there is no indeterminate variant; `ProgressBar_Indeterminate` exists: use it.
- `IssuanceStatusBadge (Investor)` image labels differ from its Status option names: use the option names and the investor labels from the glossary.
- The date picker has no Hijri option: for zakah and religious dates show Hijri with Gregorian in text, and flag the gap.
- The `Header` AppBar set renders no image through the API: use the AppBar page reference image.
- Calculator v2: whether the selected term's rate is green or neutral is unconfirmed: follow the component as built and flag.
- `SafqahLogo` default color differs between pages: use the component default and flag if brand matters.
- No motion tokens yet: use durations from the component guides and call them interim.

## 9. Open Product and Compliance items
- **Investment limits:** CMA crowdfunding rules and the product rule differ, and the regime depends on Safqah's licence. Behave: never hardcode a limit; use `{remaining_limit}` and similar placeholders.
- **Fee basis and VAT:** older notes and the current rule disagree. Behave: show `{fee}` with "incl. VAT" as a placeholder label, mark "to be confirmed by Product".
- **Compliance placeholders:** licence number, Sharia decision reference and date, complaint handling period, and the Arabic risk lines are drafts. Behave: keep them as placeholders, mark "to be confirmed by Safqah Compliance".
- **Glossary Arabic to confirm:** Portfolio, Absher, Hijri and Gregorian, DGA, Ijara, Zakah, Distributions. Behave: use the glossary terms and do not invent alternatives.

## Precedence when sources disagree
1. The rules in this skill and in AGENTS.md.
2. Measured data (resolved tokens, contrast pairs, component index).
3. Component guides and descriptions.
4. Older Notion pages (kebab-case tokens, a 12-40 type scale, Noto Kufi for Arabic, 1.5px icon strokes, WCAG 2.1): treat as history.

## Sources
- docs/reviews/2026-10-15-day1.md (findings 1-27, contrast decision)
- knowledge/ux/accessibility/contrast-pairs.md
- knowledge/components/index.json (`published` flags)
- knowledge/tokens/issues.json