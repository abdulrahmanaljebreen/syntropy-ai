# Design principles (P, V, M)

The operational design values of Syntropy (Safqah Design System v2): 7 foundational principles (P1-P7), 6 visual rules (V1-V6) and 6 meta-rules (M1-M6). Read this before choosing between two design options, adding a component, or changing tokens. Tone rules (T1-T6) live in `knowledge/content/voice-tone.md`; RTL rules (R1-R5) live in `knowledge/ux/rtl.md`.

Each principle keeps its Notion ID. Format: **Why** (the v1 failure it answers), **Rule**, **Looks like**, **Doesn't look like**. When a principle and the built Figma system disagree, the built value is the rule and a `Note: Notion said X` line records the difference.

## Rules

### Foundational principles

#### P1. No primitive carries meaning
- **Why:** In v1, `Color/Primary/LightGreen/500` resolved to brown in Founding Day mode. The token name lied. 31 primitives were overridden across modes; 8 tokens shipped broken values.
- **Rule:** Primitive tokens are inviolate raw values. They never change across modes, themes, surfaces or contexts. Meaning lives only in the semantic layer. Product UI uses semantic tokens only.
- **Looks like:** `Color/Primary/LightGreen/500` is `#4daa57` in every mode, forever. A seasonal brand change is done by re-aliasing `bg/brand/primary` in a semantic mode, never by editing the primitive.
- **Doesn't look like:** Renaming green to brown inside a theme. A `Color/Dark mode/*` set that resolves to white in one mode. Font sizes that collapse to 0. Decoration tokens that resolve to placeholder strings.
- Note: Notion wrote primitive and semantic names in kebab-case (`color-green-500`, `bg-brand-primary`). The built system uses slash paths: primitives `Color/Primary/LightGreen/500`, semantics `bg/brand/primary`. Use the built names.

#### P2. One component, one purpose
- **Why:** v1 had 17 card component sets, two parallel Inputs, 16 Goal Tracker components (including a literal duplicate `Goal-Card`), 5 Slider sub-components, 4 BottomSheet pieces, 4 TabBar pieces, 11 Header variants plus 4 siblings.
- **Rule:** Every concept gets one canonical component. Variations are properties, not separate components. A radically different layout or behaviour contract is a different concept and gets its own component, drawn deliberately.
- **Looks like:** One `Input` with `Size` and `State` variants. Currency entry is a separate `AmountInput` because its contract differs (suffix, decimals). OTP is a separate `OTPInput`. One canonical `BottomSheet` with header, content and footer slots.
- **Doesn't look like:** `_Input Field`, `Input`, `Input Placeholder`, `Input Error Message`, `Input/Default/Outline`, `Input label-Base` as six published components. `Card1` and `Card2`. `R-progressBar` and `R-progressBar-s`.

#### P3. Names tell the truth
- **Why:** v1 shipped 9+ typos (`Defualt`, `bg-disabeld`, `Palceholder`, `Has-Boarder`, `white-70opaacity`, `Iphone13&13`, `Headling`, `Raidal_progressBar`, `Reservation-Calculater`). `warning` was a State when it is intent; `Apple` was a Type on the generic Button; `Registration` was an Input state; `OTB` was a Size; `N94` was a component name.
- **Rule:** Every name describes what the thing is, in its layer's convention. Components are PascalCase (`ReservationTimer`, `SocialButton`). Booleans start with `Has` / `Is` / `Show` / `Can`. No typos, no unclear abbreviations, no domain exceptions buried in generic components.
- **Looks like:** `bg/brand/primary` is a brand background. `SocialButton` (variants Apple, Google) is separate from `Button`. `ReservationTimer`, not `Reservation-Calculater`.
- **Doesn't look like:** `Defualt`. `Apple` as a Type next to `Primary` and `Secondary`. A second `Button` on a keyboard page that differs from the global one. A grid style named after one iPhone model.
- Note: Notion said variables are kebab-case. Built variables use slash-separated lowercase paths (`text/muted`, `space/lg`, `radius/default`). Built boolean props appear both as `HasIcon` and as sentence case (`Has icon leading`); copy prop names verbatim from `knowledge/components/index.json`.

#### P4. Themable is the exception, not the default
- **Why:** v1's Founding Day mode rewrote primitives, opacity tokens, font sizes and decoration values, far beyond the brand surface.
- **Rule:** The themable set is small (about 15-25 semantic tokens), explicitly listed, and limited to brand-surface intent (`bg/brand/*`, `text/brand/*`, `border/brand/*`, `icon/brand/*`). Sizing, spacing, typography, alpha, success/error states and semantic neutrals are never themed. Adding a token to the themable set is a governance decision.
- **Looks like:** A seasonal theme overrides about 15 brand tokens and nothing else. Radii, type scale, success green and error red are constant across themes.
- **Doesn't look like:** A theme that changes border radius for a "festive feel", resizes captions, or recolours the success state.
- Built state: only `Light` and `Dark` semantic modes exist. There is no Founding Day (or other seasonal) mode yet. Do not reference a seasonal mode as if it exists.

#### P5. Architecture is for the surfaces you don't have yet
- **Why:** v1 was locked to mobile: Footer duplicated at 1082px and 390px, a grid style named `Iphone13&13`. Adding web meant a fork.
- **Rule:** Decide as if web, internal tools and seasonal themes will arrive. Token names are surface-agnostic. Component layout is parameterised, not baked. New modes (Breakpoint, themes) must not restructure existing tokens.
- **Looks like:** `bg/brand/primary`, not `mobile-bg-brand`. One `Footer` with layout props, ready for tablet/desktop. Grid styles named `grid-mobile`, with `grid-tablet` and `grid-desktop` addable later.
- **Doesn't look like:** `mobile-spacing-md`. Two Footers for two widths when one ships. Widths hard-coded to 390px in the root frame.

#### P6. The system is documented or it doesn't exist
- **Why:** v1 had 0 of 203 variables described, 0 of 70+ component sets described, 0 status tags, no Changelog, Getting Started, Contributing or Deprecated page.
- **Rule:** Every published component has a description and a Status tag. Every change ships with a Changelog entry. The library has Getting Started and Contributing docs. Replaced v1 components live on a Deprecated page during migration.
- **Looks like:** Hovering a `Stable` component shows a 1-2 sentence description. The Changelog lists every release. Deprecated components are clearly tagged. Lab work sits outside the production area.
- **Doesn't look like:** Designers reverse-engineering intent from names. A Lab page next to production with no signal. 51 local styles active beside variables with no documented relationship.
- Built state: `knowledge/components/index.json` reports 57 of 354 entries with a description and page status values `stable` / `wip`. Treat missing descriptions as a known gap, not permission to skip them.

#### P7. Production discipline beats migration speed
- **Why:** In the v1 product file about 21% of fills, 19% of strokes and 14% of text bypassed tokens (Portfolio page 72% raw text). One shortcut compounds into 8,487 raw hex fills.
- **Rule:** In product files, a raw hex value is a defect, not a shortcut. Variables are scoped so the wrong picker does not appear. The pre-publish self-audit (M5) is the safety net.
- **Looks like:** A designer reaching for a fill sees only colour tokens. v2 screens have 0% raw hex bypass. Onboarding's 26% bypass brought to 0 by a migration sweep.
- **Doesn't look like:** "I'll fix it later" as a working mode. Typing `#1c3e20` from memory instead of `bg/brand/darkest`.

### Visual direction

#### V1. Density: comfortable, not cramped
- **Why:** Users review financial information. Dense screens hide critical info; airy screens slow scanning. v1 had both.
- **Rule:** Use only the spacing scale: `space/none` 0, `space/2xs` 2, `space/xs` 4, `space/sm` 8, `space/md` 12, `space/lg` 16, `space/xl` 20, `space/2xl` 24, `space/3xl` 32, `space/4xl` 48, `space/5xl` 64. Primitives `Spacing/80` and `Spacing/96` exist for rare page-level gaps and have no semantic alias. Default component padding `space/lg`; tight stacks `space/sm`; section breaks `space/2xl`. Cards have at least `space/lg` internal padding. List items have `space/md` to `space/lg` vertical padding.
- **Looks like:** A `CardDeal` with 16 padding, 8 between rows, 12 between sections.
- **Doesn't look like:** Arbitrary px values. 7px padding on one button and 9px on another. A 4px gap between two financial figures.
- Note: Notion said the scale is 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64. Built adds 0 (`space/none`) and primitives 80 and 96.

#### V2. Hierarchy through size, not weight
- **Why:** v1 had a 12-step scale (9, 11, 12, 13, 14, 16, 18, 20, 28, 30, 35, 44) with 1px steps and 9px jumps, plus weight used as hierarchy.
- **Rule:** Hierarchy comes first from size, second from colour, rarely from weight. Use only the 37 built text styles, named `role / size / weight` (roles `caption`, `body`, `heading`, `display`; sizes 9 to 72). Default body: `body / 14 / regular`. Default heading: `heading / 18 / *` or `heading / 20 / *`. Display (`display / 32` and up) is used sparingly. `caption / 9 / regular` is fine print only. Bold emphasises words inside body text; it does not create headlines.
- **Looks like:** A deal page with a 32 display title, 16 body and 12 caption.
- **Doesn't look like:** A 16 bold "heading" next to 16 regular body. A 9px label that is not fine print.
- Note: Notion said an 8-step scale (12 / 14 / 16 / 18 / 20 / 24 / 32 / 40). Built sizes are 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 72. The later Notion copy (`3501a53e...4215`) marks V2 in orange, i.e. under revision.

#### V3. Colour carries meaning, not decoration
- **Why:** v1 product files used raw colours outside the tokens (cyan `#6ab0bb`, deep green `#123d26`) chosen by feel.
- **Rule:** Every colour is intentional. Brand green (`bg/brand/primary`, `#4daa57`) for brand identity and primary CTAs. Status colours (success / warning / error / info) only for status. Neutrals for everything else. No ad-hoc accents.
- **Warning vs error:** Warnings use the warning tone (`Tone=warning`, `bg/warning`, `text/warning`; yellow/orange). Red (`Tone=error`, `bg/error`) is reserved for critical or extreme states such as a defaulted deal or a blocking failure.
- **Looks like:** A success state in `bg/success-subtle` + `text/success`. A primary `Button` in `bg/brand/primary`. A `CardDeal` in neutrals with a `StatusPill` carrying the intent.
- **Doesn't look like:** A cyan accent because "it looks fresh". A brand-green border on something unrelated to the brand. A late payment shown in red.
- Note: Notion named the v1 family `Color/Label/Green/Main`. Built semantic tokens are `bg/success`, `text/success`, `border/success` etc.

#### V4. Motion is functional, never decorative
- **Why:** v1's Timer page had 359 variants of digits, frame-by-frame animation as a band-aid for missing motion primitives.
- **Rule:** Motion does three jobs only: (1) state change (tap, focus, switch), (2) spatial relationship (a sheet slides up from below), (3) system status (loader, progress). No "delight" animation on financial actions. No bouncing buttons. No confetti on investment confirmations.
- **Looks like:** `BottomSheet` slides up in 250ms. `Switch` toggles in 150ms. `Skeleton` during a request. A `ReservationTimer` that ticks without 359 frames.
- **Doesn't look like:** A 2-second celebration when a user invests 50,000 SAR. A button that bounces on hover.

#### V5. Iconography: one style, one weight
- **Why:** v1 had 561 icon variants in a flat namespace, 16 orphans, a duplicate (`LinkedIn Logo Ultimate (1)`), and mixed packs (Streamline, Sharp Line, Block).
- **Rule:** One icon style: outlined by default, filled for active/selected. One consistent stroke weight. Use only `Icon / <name>` components from `knowledge/icons/icons.json`. Icons are drawn on a 24 grid (602 icons), with a 12 set (34 icons) for small inline use. Pick by the 15 built categories (Core UI, Status & Feedback, Financial / Fintech, Navigation & Wayfinding, and so on).
- **Looks like:** An icon picker filtered by category. Outlined icons, filled only for the active tab.
- **Doesn't look like:** A LinkedIn logo from one pack beside a Twitter logo from another.
- Note: Notion said a 1.5px stroke, a 16 / 20 / 24 / 32 size grid and 6 categories (action / commerce / content / device / nav / status). Built library: 636 icons, sizes 24 and 12, 15 categories.

#### V6. Illustration: restrained, not whimsical
- **Why:** Whimsy undermines financial seriousness; v1 mixed flat, gradient and character styles.
- **Rule:** Illustration is used sparingly (onboarding, empty states) in one style: flat, geometric, brand-green primary, no mascots, no whimsical metaphors. Illustrations support the message; the copy does the explaining. Use the built set in `knowledge/icons/illustrations.json` (39 concepts).
- **Looks like:** A simple geometric chart on the empty Portfolio state, with the text explaining.
- **Doesn't look like:** A mascot celebrating an investment. A cartoon of "your money working hard".

### Minimal UI copy and feedback (built practice)
- A field or setting shows a label, the control, and at most one short hint. No explanatory paragraphs on screen.
- Use few alerts and toasts. Prefer inline state over a `Toast`; prefer one `Banner` or `Alert` per screen at most.
- Warnings use `Tone=warning`; red `Tone=error` only for critical or defaulted states.
- Why: matches the restraint of the shipped Safqah screens and T1 (clarity over cleverness).

### Meta-rules: how the system decides

#### M1. Adding a component requires three answers
1. Could this be a property on an existing component? If yes, extend that one.
2. Will it be used in 3+ places? If no, it is a screen composition, not a library component.
3. Does it have a documented contract (props, states, slots)? If no, document first, build second.
- Why: v1 grew by accretion into 17 card sets and 16 goal-tracker components.

#### M2. Adding a theme follows the documented process
1. Add a new mode to the Semantic collection (never Primitive).
2. Override only the listed themable brand tokens (about 15-25).
3. Run the pre-publish checklist: 0 primitive changes, 0 broken aliases.
4. Add a Changelog entry.
5. Bump the minor version (v2.1.0, v2.2.0).
- Why: v1 added Founding Day by overriding primitives; this process makes that impossible.

#### M3. Deprecation is named and dated
1. The old component is not deleted during migration: rename to `[Deprecated v1] ComponentName`, set Status=Deprecated, move to the `Deprecated v1` page.
2. A Changelog entry names the replacement.
3. Its description reads: "Use `NewComponentName` instead. To be removed in v2.x.0 (date)."
4. After 2-3 minor versions it is deleted.
- Why: without a path, old components linger forever.

#### M4. Every release has a version, a date and a changelog
- Patch (v2.0.x): bug fixes, no behaviour change.
- Minor (v2.x.0): new components, new theme modes, new properties.
- Major (v3.0.0): breaking changes: renamed tokens, removed components, changed contracts.
- Why: designers must know which version their file uses. The built library is `Syntropy - Safqah Design System 2.0.0`.

#### M5. The pre-publish self-audit is mandatory
Before any publish (patch, minor or major):
- All new components have descriptions and Status tags.
- No new typos in published names.
- No new primitive overrides per theme.
- No new broken aliases.
- New variables are scoped correctly.
- Changelog entry added.
- Why: v1's chaos accumulated without a checkpoint.

#### M6. Stakeholder review uses canonical screens
Stakeholders review the `Stakeholder Review` page: canonical flows (deal browse, deal detail, investment, KYC, goal tracking, portfolio), not individual variants.
- Why: v1 reviews were subjective; concrete screens anchor them in the system.

### Principle to KR map
| Principle | KRs | Measure |
|---|---|---|
| P1 | KR1.1, KR2.4 | 0 primitive overrides per theme |
| P2 | KR1.3 | 0 duplicate components |
| P3 | KR1.2 | 0 typos in published names |
| P4 | KR1.1, KR2.4 | about 15-25 themable tokens listed |
| P5 | KR3.1, KR3.2 | 0 mobile-specific terms; 0 hard-coded mobile widths |
| P6 | KR1.4 | 100% Stable components described |
| P7 | KR2.2, KR1.1 | 0 raw hex bypass in v2 screens |
| T1-T6 | KR1.4 | documented copy patterns |
| V1-V6 | KR1.1, KR1.3 | token-driven, scaled, restrained |
| R1-R5 | KR1.3, KR3.2 | RTL verified on directional components |
| M1-M6 | KR1.4 | versioning, deprecation, changelog |

## Examples

| Do | Don't |
|---|---|
| Fill a card with `bg/surface`, pad with `space/lg` | Fill with `#ffffff`, pad 15px |
| Add `Size=sm` to `Button` for a compact toolbar | Publish `ButtonSmall` as a new component |
| `StatusPill` `Tone=warning` for "Late" (متأخرة) | Red `Tone=error` for "Late" |
| `StatusPill` `Tone=error` for "Defaulted" (متعثرة) | Warning yellow for a defaulted deal |
| Title in `heading / 20 / semibold`, body `body / 14 / regular` | Title as `body / 14 / bold` beside regular body |
| `Skeleton` while deals load | A spinning brand logo animation |
| Empty portfolio: one geometric illustration + one line of copy | Mascot plus three paragraphs of explanation |

## Sources
- Notion: Stage 1-3 Principles, `3501a53e-1a6b-802c-92b6-c0b2381d4215` (latest edit 2026-04-28 11:49; used as primary) and `3501a53e-1a6b-8190-ba9e-ce891190bef9` (earlier copy, 09:57). Differences: the later copy changes the currency rule to "use the riyal logo" and marks V2 for revision; otherwise identical.
- Notion: Design System v2.0 Initiative, `34f1a53e-1a6b-8149-bcfb-e82855242f0a` (glossary, phases).
- Built system: `knowledge/tokens/resolved.json` (spacing, font sizes, modes), `knowledge/tokens/text-styles.json` (37 styles), `knowledge/icons/icons.json`, `knowledge/components/index.json` (file `a7Z956YZy9n6f9uz5DK16Y`).
