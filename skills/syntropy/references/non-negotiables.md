<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# The 15 non-negotiables

The rules every Syntropy answer obeys, whatever the mode or medium. Open this when applying a rule, explaining it to a person, or pushing back on a request that breaks one. Each rule: the rule, why, what it looks like, what it does not look like, and the skill with the detail.

## Rules

### 1. Components: Syntropy only, exact names
- **Rule:** use only components in the Syntropy library, with exact Figma names, property names and values (`Button` `Variant=primary` `Size=lg`; `CardDeal` `Layout=Row` `State=Closed`). Never invent one. If nothing fits, say "Syntropy has no X", propose the closest composition of existing components, and flag the gap.
- **Why:** the library is the contract between Figma and Flutter; a made-up component has no code.
- **Looks like:** "Use `BottomSheet` with `KeyValue` rows and a `Button` `Variant=primary` in the sheet footer."
- **Not:** "Add a `ConfirmCard` component", "use a Material `Snackbar`", "a custom pill".
- **Detail:** syntropy-components.

### 2. Tokens: semantic only
- **Rule:** color, spacing, radius, type and shadow come from semantic tokens (`text/muted`, `bg/elevated`, `space/lg`, `radius/default`, text styles like `body / 14 / regular`). No raw hex, rgb or px in output; never restate a value unless explaining it.
- **Why:** semantic tokens carry Light and Dark and let values change without renaming.
- **Looks like:** "Helper text: `text/muted`. Gap between rows: `space/md`."
- **Not:** "#535d58", "padding: 13px", "use Primitive `Color/Neutral/600` directly".
- **Detail:** syntropy-foundations.

### 3. Brand green through `bg/brand/primary`
- **Rule:** the brand green is `#4daa57` (`Color/Primary/LightGreen/500`), used only through `bg/brand/primary` and its semantic siblings (`text/brand/primary`, `border/brand/primary`, `icon/brand/primary`). Never introduce another brand hue, gradient or palette (purple, blue, gold) in product UI. `#02AD4C` and `#0E849E` from old documents are wrong.
- **Why:** one brand, recognisable and tested for contrast.
- **Looks like:** "Selected state uses `bg/brand/primary` per `SegmentedControl_3`."
- **Not:** "make it purple and fancy", "a teal gradient header".
- **Detail:** syntropy-foundations.

### 4. RTL first
- **Rule:** design in Arabic, right-to-left, first; produce the English LTR twin second. Direction follows the locale (`Directionality` in Flutter, `dir` on web), never a component parameter in code (the Figma `Direction` variant is for design files only). Use start and end, never left and right. Mirror directional icons (arrows, chevrons, back); never mirror the riyal symbol, checkmarks, media controls, logos or numbers. Charts keep time running left to right.
- **Why:** most Safqah users read Arabic; mirrored layouts built from English read wrong.
- **Looks like:** `Direction=RTL` frames first; `padding-inline-start`; back arrow pointing right in Arabic.
- **Not:** `margin-left: 16px`, a chart whose time axis runs right to left, an LTR-only mock.
- **Detail:** syntropy-rtl-arabic.

### 5. Numbers
- **Rule:** Western digits 0-9 in both languages; currency after the amount (`1,250.00 ر.س`, `1,250.00 SAR`, or `Icon / riyal` inside amount components); two decimals for transactional money, one for percentages; Arabic percentage labels start with «نسبة» (not SAR amounts, not IRR «معدل», not coverage status). Financial dates are Gregorian; religious dates (zakah) show Hijri with Gregorian.
- **Why:** one unambiguous way to read money in an Arabic interface.
- **Looks like:** «نسبة صافي العائد 13.8%», «5,000.00 ر.س».
- **Not:** «٥٬٠٠٠ ر.س», "SAR 5,000", "16.00%", «صافي العائد 13.8%».
- **Detail:** syntropy-content, `references/data/content/numbers-currency.md`.

### 6. Minimal copy, Arabic first
- **Rule:** a label, the control, at most one short hint. At most one `Alert` or `Banner` per screen; prefer inline state over a `Toast`. Clear Modern Standard Arabic first, then English. No flattery, no emoji on money events. Errors say what happened and what to do next. Buttons are verbs naming the commitment.
- **Why:** every extra line competes with the numbers.
- **Looks like:** «تأكيد الاستثمار»; «رقم الآيبان غير مكتمل. أدخل 24 خانة.»
- **Not:** «عذراً! حدث خطأ ما»; an explanatory paragraph under every field; "Awesome! 🎉".
- **Detail:** syntropy-content.

### 7. No em dash character
- **Rule:** never write the em dash character (U+2014) in any language or output, including chat. Use a comma, colon, full stop, parentheses or «·».
- **Why:** house rule; the lint rule `no-em-dash` fails on it.
- **Looks like:** "Payout details: 3 states."
- **Not:** the long dash between two clauses.

### 8. Contrast: AA, with brand green as built
- **Rule:** use token pairs that pass WCAG 2.2 AA (4.5:1 text, 3:1 large text, icons and control edges). Accepted exception (decided 19 Oct 2026): brand green as built. White `text/on-brand` and `icon/on-brand` on `bg/brand/primary` (primary `Button`, FAB, filled badges such as «أفضل خيار», Timeline steps) and `text/brand/primary`, `icon/brand/primary`, `border/brand/primary` on light surfaces (selected tiles, amounts, inline links and toggles) are used exactly as the components build them. They measure 2.92:1 in Light; that is intentional.
- **Why:** it is the Safqah brand and every shipped screen uses it this way (the investment calculator CTA, selected duration tile and green amounts). Changing it per screen forks the brand.
- **Looks like:** `Button` `Variant=primary` `Size=lg` «استثمر الآن», as built, with no contrast note.
- **Not:** "I darkened the button to #387c3f", a bolder or bigger label than the component, dark text on the green, or a review finding about it.
- **Detail:** syntropy-accessibility, `known-issues.md`.

### 9. Targets and labels
- **Rule:** 48 x 48 hit area in the Flutter app (expand the hit area, not the visual); web 24 x 24 CSS px floor and 44 x 44 on touch breakpoints; `space/sm` between adjacent targets. Every icon-only control (`IconButton`, `BackButton`, close) has an accessible label in Arabic and English.
- **Why:** thumbs, tremor, one-handed use, screen readers.
- **Looks like:** `IconButton` `Size=sm` wrapped in a 48 x 48 area, label «إغلاق».
- **Not:** a 24 px close icon with no label next to the confirm button.
- **Detail:** syntropy-accessibility.

### 10. Every state
- **Rule:** design empty, loading (`SkeletonLine`, `SkeletonBlock`), error, success and disabled for every screen, plus offline when data is remote, and partial data where lists can be long or short.
- **Why:** the happy path is a minority of real sessions.
- **Looks like:** payout list with no payouts yet (`EmptyState`), skeleton rows, retry error, disabled CTA with a reason.
- **Not:** one perfect mock with ten rows of data.
- **Detail:** syntropy-ux-review, syntropy-patterns.

### 11. One primary action; tone discipline
- **Rule:** one `Button` `Variant=primary` per screen or sheet; others are secondary, tertiary or links. Warnings use the warning tone (`Tone=warning`); red (`Tone=error`) only for critical, destructive or defaulted.
- **Why:** one clear next step; red keeps its meaning.
- **Looks like:** late payment `StatusPill` `Tone=warning`; defaulted `Tone=error`.
- **Not:** two green buttons side by side; a red banner for "complete your profile".
- **Detail:** syntropy-patterns, syntropy-components.

### 12. Money and disclosure
- **Rule:** risk statement next to every commitment action; fees, with VAT, shown before confirmation; net return as the headline and gross as detail; projections labelled expected (متوقع), never guaranteed (مضمون); limits, fees, rates and deadlines come from the backend (`{remaining_limit}`, `{fee}`, `{deadline}`). Regulated wording is drafted, then confirmed by Safqah Compliance.
- **Why:** CMA disclosure duties, Sharia accuracy and trust.
- **Looks like:** review sheet with amount, fee incl. VAT, expected net return, risk line, then «تأكيد الاستثمار».
- **Not:** fee shown on the receipt only; "guaranteed 16%"; "max 500,000 SAR" typed into the design.
- **Detail:** syntropy-compliance-ux.

### 13. No dark patterns
- **Rule:** no countdowns or scarcity used as pressure (a real reservation window shown neutrally is fine), no pre-ticked consent, no hidden costs, no confirmshaming, no nagging, no "recommended for you" or «مناسبة لك» suitability claims, no making cash-out harder than investing.
- **Why:** CMA conduct expectations and long-term trust.
- **Looks like:** the reservation `Timer` showing the real window in neutral tone with the end time.
- **Not:** "Only 2 hours left! Invest now before it's gone", red pulsing timer, «لا، لا أريد أرباحاً».
- **Detail:** syntropy-compliance-ux, syntropy-ux-review.

### 14. Figma: design-system pages only
- **Rule:** read, instance and cite only the Syntropy design-system pages (file `a7Z956YZy9n6f9uz5DK16Y`, Icons file `DDI9ObV7rOP82XQ3OJzogv`). Never open, describe, link or borrow from other areas of the file, even when the person asks for "ideas". Reference images come from the component pages.
- **Why:** only system pages are reviewed and approved; other areas change without notice.
- **Looks like:** "From the CardDeal page (07a): `CardDeal` 3013:95390."
- **Not:** "I looked at a draft frame elsewhere in the file for inspiration."
- **Detail:** syntropy-figma.

### 15. Lint and self-review before handoff
- **Rule:** run `lint_ui` (Syntropy MCP) or `node lint/cli.mjs <files>` on code, CSS and copy (raw colors, off-scale spacing and radius, physical direction, em dash, Eastern digits, currency position, «نسبة», fake urgency, unknown components and variants, contrast). Run the syntropy-ux-review self-review on designs. Fix every finding or list it as a known issue.
- **Why:** automated checks are cheaper than design QA rework.
- **Looks like:** "Lint: 0 findings. Self-review: states complete, contrast flag carried."
- **Not:** "Looks good to me" with no check.

## Pushback script (red-team requests)
1. Acknowledge the goal in one line ("You want it to stand out").
2. Name the rule in one line ("Syntropy has one brand green").
3. Offer the Syntropy way that serves the goal ("Use `Base card` (the deal-page hero) with the brand surface and a larger heading text style").
4. Proceed with the Syntropy way unless the person is the DS owner changing the system, in which case route to a DS change request.

## Sources
- AGENTS.md (non-negotiables 1-10)
- knowledge/ux/accessibility/contrast-pairs.md, touch-targets.md
- knowledge/content/numbers-currency.md, voice-tone.md
- knowledge/ux/compliance/anti-pressure.md, fees-returns.md
- lint/rules.mjs
- docs/reviews/2026-10-15-day1.md