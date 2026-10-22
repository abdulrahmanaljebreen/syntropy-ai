# Syntropy knowledge pack

Generated from the Syntropy repo. Search by component, token or topic name.

---

# Syntropy entry point

# Syntropy: the entry point

## Purpose
Turn any Safqah design, UI, UX, copy or review request into work that uses only Syntropy, through one command: `/syntropy` (Claude Code) or a message starting with `syntropy:` (every other agent). Parse the mode, interview when the request is new work, enforce the 15 non-negotiables, and hand each part of the job to the right syntropy skill.

## Who Safqah is (one screen)
- **Safqah (صفقة, "a deal")**: a Saudi, Sharia-compliant investment platform. Investors buy sukuk that finance real-estate developers through murabaha structures; returns are profit, never interest. Regulated by the CMA; payments follow SAMA rules; personal data follows PDPL.
- **Users**: retail investor (مستثمر), qualified investor (مستثمر مؤهل), developer or issuer (مطور عقاري), internal teams (operations, compliance, finance on the back-office).
- **Surfaces**: Flutter app in two size classes (compact phone, regular tablet or foldable inner), web (investor web, developer portal), back-office (العمليات المساندة).
- **Products**: deals and the deal page, invest and reserve, wallet and cash-out, portfolio, payouts and distributions, goals (الهدف الاستثماري), KYC and onboarding, zakah, notifications.
Full map, regulators and glossary highlights: `references/safqah-context.md`.

## Hard rules: the 15 non-negotiables
Each rule with why, looks like and does not look like: `references/non-negotiables.md`.
1. **Components:** only Syntropy components, with exact Figma names and variant values (`Button`, `Variant=primary`, `Size=lg`). Never invent one; if nothing fits, say so and propose the closest composition. Why: the library is the contract between design and Flutter.
2. **Tokens:** only semantic tokens for color, spacing, radius, type and shadow (`text/muted`, `space/lg`, `radius/default`). No raw hex or pixel values in output. Why: tokens carry Light and Dark and survive rebrands.
3. **Brand green** is `#4daa57`, used only through `bg/brand/primary` (and its semantic siblings). Never introduce another brand color, gradient or hue, and never use the old greens `#02AD4C` or `#0E849E`. Why: one brand, one green.
4. **RTL first:** design in Arabic, right-to-left, then the English LTR twin. Direction follows the locale (never a parameter in code); use start and end, not left and right; mirror directional icons only; charts keep time running left to right. Why: most users read Arabic.
5. **Numbers:** Western digits 0-9 in both languages; currency after the amount (`1,250.00 ر.س`, `1,250.00 SAR`); two decimals for money, one for percentages; Arabic percentage labels start with «نسبة» (not for SAR amounts, not IRR «معدل»). Why: one unambiguous way to read money.
6. **Minimal copy:** a label, the control, at most one short hint. Arabic first, calm, no flattery, no emoji on money events. Errors say what happened and what to do next. Why: every extra line competes with the numbers.
7. **No em dash character** anywhere: copy, captions, specs, code comments, chat. Use a comma, colon, full stop, parentheses or «·». Why: house rule, and the lint fails on it.
8. **Contrast WCAG 2.2 AA** with token pairs that pass. One accepted exception: brand green as built. The primary `Button` (white `text/on-brand` on `bg/brand/primary`), FAB, filled badges and brand green labels, amounts, links and selected states on light surfaces are used exactly as the components build them, as in the investment calculator. Do not flag them, recolour them, darken the green or enlarge the label. Why: it is the Safqah brand, decided by the DS owner on 19 Oct 2026.
9. **Targets and labels:** 48 x 48 in the app (hit area, not visual), 24 x 24 CSS px floor on web and 44 on touch breakpoints; every icon-only control has an accessible label. Why: thumbs, tremor, screen readers.
10. **States:** every screen designs empty, loading (`SkeletonLine`, `SkeletonBlock`), error, success and disabled, plus offline where data is remote. Why: the happy path is a minority of real sessions.
11. **One primary action** per screen. Warnings use the warning tone; red only for critical or defaulted. Why: one clear next step; red keeps its meaning.
12. **Money and disclosure:** risk next to every commitment action; fees (with VAT) before confirmation; net return as the headline; projections labelled expected, never guaranteed; limits, fees, rates and deadlines come from the backend as placeholders (`{remaining_limit}`). Regulated wording is confirmed by Safqah Compliance. Why: CMA, Sharia and trust.
13. **No dark patterns:** no countdowns as pressure, no pre-ticked consent, no hidden costs, no confirmshaming, no "recommended for you" suitability claims. Why: CMA conduct rules and long-term trust.
14. **Figma:** read and build only from the Syntropy design-system pages (file `a7Z956YZy9n6f9uz5DK16Y`, Icons file `DDI9ObV7rOP82XQ3OJzogv`). Never open, cite, describe or borrow from any other area of the file, even when asked. Why: only published system pages are approved.
15. **Lint and self-review before handoff:** run `lint_ui` (Syntropy MCP) or `node lint/cli.mjs <files>` on code and copy, and the self-review in syntropy-ux-review on designs. Fix every finding or list it as known. Why: checks are cheaper than rework.

## Workflow

### Step 0. Parse the mode (first word after `/syntropy` or `syntropy:`)
| Input | Mode | Do |
|---|---|---|
| `/syntropy` (nothing) | Intake | Greet in one line, ask question 1 |
| `/syntropy <request>` or a design request with no command | Intake | Auto-answer from the request, ask the first unanswered question |
| `/syntropy research <topic>` | Research | Hand to syntropy-inspiration research mode |
| `/syntropy review <link, image or code>` | Review | Hand to syntropy-ux-review |
| `/syntropy explain <thing>` | Explain | Short exact answer (format below) |
| A quick question ("what token for muted text") | Direct | Answer from the right skill, no interview |
Arabic triggers count too: «ابحث» = research, «راجع» = review, «اشرح» = explain. Detail and example sessions: `references/modes.md`.

### Step 1. Intake (new work only): `references/intake.md`
1. If the Syntropy MCP is connected, call `start_intake` with the request and follow it.
2. Otherwise match the request against the keyword cues and mark answered questions.
3. Ask the **first unanswered** question, **one per message**, with numbered choices. Never batch questions. Accept a number, a word or Arabic.
   1. What are you making? A new screen · a new flow · a change to something live · a review · an explanation
   2. Who is it for? Retail investor · qualified investor · developer or issuer · internal team
   3. Where does it live? App, compact · app, regular · web · back-office
   4. What job does it do, and how will we know it worked? (metric or Mixpanel event)
   5. What exists already? Figma link · screenshot · ticket · nothing
   6. What is at stake? Money movement · personal data · regulated disclosure · deadline · none
4. If the person says "skip" or "just design", ask only what is truly blocking (usually surface), assume the rest, and state the assumptions in the brief.

### Step 2. Restate the brief (five lines) and wait for "yes"
Template in `references/intake.md`. Include the stakes and the matching non-negotiables.

### Step 3. Size the work
Quick (one screen, cosmetic, no money) continue here. Feature or Flow (new flow, money movement, regulated disclosure, personal data, more than three screens): hand over to syntropy-product-workflow, which never lets money or regulated work skip Define.

### Step 4. Research and options
syntropy-inspiration: real references (Lazyweb, Refero, Mobbin; Saudi and GCC first), two or three approaches, each mapped to a pattern (syntropy-patterns) and named components (syntropy-components). Recommend one with one line of why.

### Step 5. Design in the medium the person wants
Figma: syntropy-figma. Flutter, Angular or web code: syntropy-code-adapters. Spec or text: components, tokens, copy tables. Use syntropy-foundations for tokens, syntropy-content for copy, syntropy-rtl-arabic for mirroring and bidi, syntropy-icons-illustration for icons, syntropy-compliance-ux for money, risk, consent and Sharia.

### Step 6. Self-review, fix, hand off
syntropy-ux-review (heuristics, states, dark patterns), syntropy-accessibility (contrast, targets, labels), lint. Hand off with Figma links or code, components and variants, tokens, every state, Arabic and English copy, events, open questions and known issues from `references/known-issues.md`.

### Explain mode answer format
1. What it is (one line). 2. Use when, and the alternative to use instead when not. 3. Variants and props with exact Figma names and values. 4. Tokens it uses. 5. Accessibility and RTL notes. 6. Example image path or Figma link. Keep it under about 15 lines. Sources: `get_component` / `find_tokens` / `get_guideline` (MCP) or syntropy-components, syntropy-foundations, syntropy-patterns.

## Decision tables

### Routing: request type to skill (full table in `references/routing.md`)
| Request | Skill |
|---|---|
| Which component, props, variants, "is X in the library" | syntropy-components |
| Tokens, color, type, spacing, radius, shadow, dark mode | syntropy-foundations |
| Screen structure for a job (deal page, invest, KYC, wallet, payouts, goals, empty, errors, forms, back-office tables) | syntropy-patterns |
| Copy, labels, errors, numbers, currency, translation, glossary | syntropy-content |
| Mirroring, bidi, mixed strings, Hijri and Gregorian, Arabic type | syntropy-rtl-arabic |
| Contrast, targets, screen readers, focus, dynamic type | syntropy-accessibility |
| Critique, heuristics, states audit, dark patterns, review a link or image | syntropy-ux-review |
| Fees, returns, risk lines, CMA, SAMA, Sharia, PDPL consent, anti-pressure | syntropy-compliance-ux |
| Icons, illustrations, empty-state art | syntropy-icons-illustration |
| References, benchmarks, competitors, "how do others do X" | syntropy-inspiration |
| Feature or flow from idea to handoff, brief, metrics, events, tickets | syntropy-product-workflow |
| Build or edit in Figma | syntropy-figma |
| Flutter, Angular, CSS, Tailwind, tokens in code, PRs | syntropy-code-adapters |

### Need X, do Y, not Z
| Need | Do | Not |
|---|---|---|
| New screen request | Intake, one question at a time | Five questions in one message |
| Request already says "payout details screen for retail investors in the app" | Skip questions 1-3, ask question 4 | Re-ask what is already known |
| Quick fact ("token for muted text") | Answer: `text/muted` | Start an interview |
| Money or regulated flow | Hand to syntropy-product-workflow | Jump straight to pixels |
| Nothing in Syntropy fits | Say so, compose from existing components, flag the gap | Draw a custom component |
| Primary button contrast question | Quote 2.92:1 Light, 2.14:1 Dark, open DS decision | Pick a darker green |
| Unpublished set needed (Tag, Input, Select, AppBar) | Use it by name; in another Figma file take the published route or copy it from the Syntropy file (`unpublished.md`) | Rebuild it or swap for a lookalike |
| A skill is not installed | Use the Syntropy MCP, else give the install command | Guess from memory |

### Lookup order (detail in `references/lookup-order.md`)
1. **Syntropy MCP tools** if connected: `start_intake`, `search_components`, `get_component`, `find_tokens`, `search_icons`, `get_pattern`, `get_guideline`, `find_links`, `research_plan`, `lint_ui`.
2. **Skill references**: the routed skill's `references/` (and `references/data/` copies of the knowledge).
3. **Ask the person.** Never guess a component name, token, limit, fee or regulated sentence.

### When a skill is not installed
Use the matching MCP tool. If the MCP is not connected either, tell the person in one line how to install:
- Claude Code: `/plugin marketplace add abdulrahmanaljebreen/syntropy-ai` then `/plugin install syntropy@syntropy-ai`
- Other agents: `npx skills add abdulrahmanaljebreen/syntropy-ai`
- MCP server: `claude mcp add syntropy -- node /path/to/syntropy-ai/mcp/server.mjs`
Then continue with what this skill knows, and mark answers that need the missing skill as unverified.

## Self-check before answering
- [ ] Mode parsed correctly from the first word; quick questions answered without an interview.
- [ ] At most one intake question in this message, with choices, and none already answered by the request.
- [ ] Brief restated and confirmed before any design.
- [ ] Every component name and variant value exists in Syntropy; no invented components.
- [ ] Only semantic tokens; no raw hex or px; no new colors; brand green only via `bg/brand/primary`.
- [ ] Arabic RTL first, English LTR twin; logical start and end.
- [ ] Western digits, currency after the amount, 2 decimals money, 1 decimal percent, «نسبة» labels.
- [ ] Copy minimal; no em dash character anywhere in the answer.
- [ ] States covered: empty, loading, error, success, disabled (offline when remote).
- [ ] One primary action; warning tone for warnings, red only for critical.
- [ ] Money: risk by the action, fees before confirm, net headline, expected not guaranteed, backend placeholders for limits.
- [ ] No dark patterns; no pressure timers; no pre-ticked consent.
- [ ] Only Syntropy design-system pages referenced.
- [ ] Known issues flagged where they apply (contrast, prop typos); unpublished sets handled with their route in Figma output.
- [ ] Lint run, or the person told to run it, before handoff.

## References
| File | Open when |
|---|---|
| `references/safqah-context.md` | You need the product map, users, surfaces, regulators or key terms |
| `references/non-negotiables.md` | Applying or explaining any of the 15 rules, with do and don't examples |
| `references/intake.md` | Running the interview: questions, choices, keyword cues, follow-ups, brief template, sample interviews in Arabic and English |
| `references/modes.md` | Parsing a mode and seeing a full example session for each |
| `references/routing.md` | Deciding which skill handles a request, including mixed requests |
| `references/lookup-order.md` | Finding a fact: MCP first, then skill references, then ask |
| `references/known-issues.md` | Before handoff, or when a request touches contrast, unpublished sets or icons, line-height tokens, prop typos or digit conflicts |
| `references/data/links.json` | Any link: Figma files, Notion, research tools, regulators |
| `references/data/content/glossary.md` | Exact Arabic and English product, Sharia and regulatory terms |
| `references/data/content/numbers-currency.md` | Digits, currency, decimals and dates |
| `references/data/content/voice-tone.md` | Tone for a moment (investing, payout, late, error) |
| `references/data/content/copy-lengths.md` | Character limits per component slot |
| `references/data/content/quality-checklist.md` | Final copy check |


---

# Tokens: intent lookup

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


---

# Tokens: color roles

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


---

# Typography

<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# Typography

All 37 Syntropy text styles, when to use each role, the single font family, Arabic line heights and number rules. Open this before setting any text on a Safqah screen. Style names are written exactly as in Figma (`body / 14 / regular`); the data lives in `data/text-styles.json`.

## Rules
1. Apply a named text style. Never hand-set font size, weight, line height or letter spacing.
   Why: one style name encodes all five properties and maps 1:1 to code.
2. One family: `font/family` = IBM Plex Sans Arabic for Arabic and English (`Font/Family/Base` resolves to IBM Plex Sans Arabic in both language modes). Never add a second family, even for accents.
   Why: one family keeps bilingual screens coherent and Arabic glyphs correct.
3. Product UI uses four weights: Regular 400, Medium 500, SemiBold 600, Bold 700. Thin, ExtraLight, Light, ExtraBold and Black are not for product UI.
   Why: light weights fail contrast; heavy weights shout.
4. Line height comes from the style: every style is 1.5x its size (14/21, 16/24, 20/30, 32/48). Never bind `font/line-height/heading`, `font/line-height/body`, `font/line-height/reading` or `font/line-height/arabic`.
   Why: those four aliases are broken in Figma (their primitive targets are missing). The per-size tokens `font/line-height/<size>` and the text styles carry the correct values.
5. Minimum size for normal copy is 12px (`caption / 12 / regular`). Body copy the user must read is 13px or more, by default 14. Sizes 10 and 11 are for dense meta (table footnotes, compact badges). 9px is legal fine print only.
   Why: Safqah copy is amounts and terms; small Arabic glyphs lose their dots first.
6. No italics, no ALL CAPS body, no letter spacing on Arabic (the `Font/LetterSpacing/*` primitives are 0 in Arabic mode). Emphasise with Medium or SemiBold.
   Why: Arabic has no italic tradition and tracking breaks letter joining.
7. Numbers use Western digits (0-9), keep left-to-right order inside Arabic, put the currency after the amount (`1,250.00 ر.س` / `SAR 1,250.00` per the locale rule), and keep the sign before the digits (`+2.5%`). In columns of amounts, align figures by using tabular (fixed-width) digits where the platform supports it (`fontFeatures: [FontFeature.tabularFigures()]` in Flutter, `font-variant-numeric: tabular-nums` on web) and align to the end edge.
   Why: misread digits on money are the worst error a fintech can make.
8. Use 3 to 4 size tiers per screen (title, section, body, meta). Change weight before size.
   Why: more tiers fragment hierarchy.
9. White labels on filled brand or status backgrounds use the built `Button` and badge text styles; never invent label sizes.
   Why: brand green is used as built (decided 19 Oct 2026), and the components already carry the agreed label style.

## The 37 text styles

### Caption (5): metadata, helper text, badges, fine print
| Style | Size / line height | Weight | Use |
|---|---|---|---|
| `caption / 9 / regular (fine-print only)` | 9 / 13.5 | 400 | Legal disclosures, compliance footnotes. Never content the user must read |
| `caption / 10 / regular` | 10 / 15 | 400 | Compliance text, dense metadata |
| `caption / 11 / regular` | 11 / 16.5 | 400 | Dense tables, footnotes, chart axis labels |
| `caption / 12 / regular` | 12 / 18 | 400 | Default helper text, captions, timestamps |
| `caption / 12 / medium` | 12 / 18 | 500 | Small labels with emphasis: tags, pill labels, overlines |

### Body (11): reading sizes
| Style | Size / line height | Weight | Use |
|---|---|---|---|
| `body / 13 / regular` | 13 / 19.5 | 400 | Table cells, tight UI chrome, secondary metadata |
| `body / 13 / medium` | 13 / 19.5 | 500 | Emphasised table values, compact labels |
| `body / 13 / semibold` | 13 / 19.5 | 600 | Compact link text, small section labels |
| `body / 14 / regular` | 14 / 21 | 400 | Default product body, list descriptions, form values |
| `body / 14 / medium` | 14 / 21 | 500 | Inline numbers, list titles, labels |
| `body / 14 / semibold` | 14 / 21 | 600 | Row titles, emphasised values |
| `body / 14 / bold` | 14 / 21 | 700 | Button labels (`Size=md`/`sm`), strong affordances |
| `body / 16 / regular` | 16 / 24 | 400 | Long reading (deal descriptions, terms), onboarding copy |
| `body / 16 / medium` | 16 / 24 | 500 | Input text in prominent forms, emphasised body |
| `body / 16 / semibold` | 16 / 24 | 600 | Card titles, sheet titles on compact screens |
| `body / 16 / bold` | 16 / 24 | 700 | Large button labels, key values |

### Heading (12): titles within a screen
| Style | Size / line height | Weight | Use |
|---|---|---|---|
| `heading / 18 / regular` | 18 / 27 | 400 | Quiet subsection title |
| `heading / 18 / semibold` | 18 / 27 | 600 | Subsection title, `Section` `Size=Md` |
| `heading / 18 / bold` | 18 / 27 | 700 | Emphasised subsection |
| `heading / 20 / regular` | 20 / 30 | 400 | Quiet section title |
| `heading / 20 / semibold` | 20 / 30 | 600 | Section title, EmptyState title |
| `heading / 20 / bold` | 20 / 30 | 700 | Emphasised section title, amount in a card |
| `heading / 22 / semibold` | 22 / 33 | 600 | Section titles on roomy screens |
| `heading / 22 / bold` | 22 / 33 | 700 | Key figure in a summary card |
| `heading / 24 / semibold` | 24 / 36 | 600 | Page title (mobile) |
| `heading / 24 / bold` | 24 / 36 | 700 | Page title with emphasis |
| `heading / 28 / semibold` | 28 / 42 | 600 | Largest page header |
| `heading / 28 / bold` | 28 / 42 | 700 | Largest page header with emphasis |

### Display (9): heroes and hero numbers
| Style | Size / line height | Weight | Use |
|---|---|---|---|
| `display / 32 / regular` | 32 / 48 | 400 | Quiet hero |
| `display/32/semibold` | 32 / 48 | 600 | Hero number (note: Figma name has no spaces) |
| `display / 32 / bold` | 32 / 48 | 700 | Portfolio total, investment amount entry |
| `display / 36 / bold` | 36 / 54 | 700 | Large hero figure |
| `display / 40 / bold` | 40 / 60 | 700 | Marketing hero |
| `display / 48 / bold` | 48 / 72 | 700 | Onboarding / landing only |
| `display / 56 / bold` | 56 / 84 | 700 | Extra-large hero, sparingly |
| `display / 64 / bold` | 64 / 96 | 700 | Marketing hero, sparingly |
| `display / 72 / bold` | 72 / 108 | 700 | Splash / marketing only |

Never use display styles for in-page headings; display is for heroes and hero numbers.

## Choosing a style
| Need | Style | Colour |
|---|---|---|
| Mobile screen title | `heading / 24 / bold` (or `heading / 22 / semibold` on dense screens) | `text/default` |
| Section title | `heading / 18 / semibold` or `heading / 20 / semibold` | `text/default` |
| Card title | `body / 16 / semibold` | `text/default` |
| Default body | `body / 14 / regular` | `text/default` |
| Secondary description | `body / 14 / regular` or `body / 13 / regular` | `text/muted` |
| Helper text under an input | `caption / 12 / regular` | `text/muted` (error: `text/error`) |
| Timestamp, meta | `caption / 12 / regular` | `text/muted` or `text/subtle` (non-critical only) |
| Amount in a list row | `body / 14 / medium` or `body / 14 / semibold` | `text/default` |
| Hero amount | `display / 32 / bold` | `text/default` |
| Tag / pill label | `caption / 12 / medium` | per tone |
| Legal footnote | `caption / 9 / regular (fine-print only)` or `caption / 10 / regular` | `text/muted` |

When unsure between two sizes, pick the smaller one and add space around it.

## Arabic specifics
- Design Arabic first. Same style names in both languages; only direction and content change.
- 1.5x line height prevents clipping of dots and descenders (ج ح خ ع غ). The English line-height primitives use about 1.43x, but the built text styles use 1.5x for both languages.
- Arabic text is at least as long as English; leave room and never truncate amounts.
- Emphasis: `medium` or `semibold`, never italic.
- Mixed strings: English names inside Arabic render LTR inside their own span («صفقة جديدة: Riyadh Tower Project»).

## Numbers
| Do | Don't |
|---|---|
| «1,250.50 ر.س» | «ر.س 1,250.50», «١٬٢٥٠٫٥٠» |
| «نسبة العائد المتوقع 8.5%» | «%8.5», «٨٫٥٪» |
| `+2.5%` in `text/success` with the sign | Green colour alone for a gain |
| Tabular digits, end-aligned in amount columns | Proportional digits jittering in a column |
| `display / 32 / bold` for «48,750.00 ر.س» portfolio total | A custom 30px bold |

Number formatting rules in full: see syntropy-content.

## Token map (for code)
| Property | Tokens |
|---|---|
| Family | `font/family` |
| Size | `font/size/9` ... `font/size/72` (9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 72) |
| Line height | `font/line-height/<size>` (1.5x: `font/line-height/14` = 21) |
| Weight | `font/weight/regular`, `font/weight/medium`, `font/weight/semibold`, `font/weight/bold` |
| Broken (never bind) | `font/line-height/heading`, `font/line-height/body`, `font/line-height/reading`, `font/line-height/arabic` |

## Examples
| Do | Don't |
|---|---|
| «محفظتي» title in `heading / 24 / bold` | 26px custom bold |
| Helper «الحد الأدنى للاستثمار 1,000 ر.س» in `caption / 12 / regular` `text/muted` | The same hint in 10px `text/subtle` |
| Terms footnote in `caption / 9 / regular (fine-print only)` | Fee disclosure in 9px (fees must be readable, use 12+) |
| `body / 16 / semibold` for emphasis in a paragraph | Italic emphasis |


---

# Spacing and layout

# Spacing and layout

The `space/*` scale, how to pad components and separate sections, screen margins, breakpoints, grid, and compact vs regular layouts. Open this whenever you set padding, gaps, margins or column structure on a Safqah screen.

## Rules
1. Use `space/*` tokens for every gap and padding. No raw px, no off-scale values (6, 10, 14, 15). If a value is "between", pick the nearest token and adjust the design.
   Why: off-scale values cannot be mapped to tokens in Flutter and drift across screens.
2. The base unit is 4. Everything is a multiple of 4 (with `space/2xs` = 2 as the only hairline exception).
   Why: predictable rhythm on all densities.
3. Related items sit closer than unrelated ones: label to input `space/xs`, field to field `space/lg`, section to section `space/2xl`.
   Why: spacing communicates grouping before the user reads.
4. Mobile screens keep 16 on each side (`space/lg`) and never let content touch the screen edge.
   Why: edge content collides with gesture zones and looks broken.
5. Use logical (start/end) padding, never left/right. Values never flip in RTL; only the side they apply to does.
   Why: Arabic is canonical; physical padding breaks the mirror.
6. Tap targets are 48 x 48 in the app (never under 44 x 44 anywhere) with `space/sm` (8) between neighbours, even when the visual control is smaller.
   Why: Safqah accessibility rule and WCAG 2.5.8; motor accessibility.
7. Respect safe areas through the platform (`SafeArea` in Flutter). Never hard-code status bar or home indicator padding.
   Why: device insets change across hardware.
8. Component heights come from the component variant (`Button` `Size=lg`), not from manual height.
   Why: sizes are baked into components and match code.

## The scale
| Token | Value | Use |
|---|---|---|
| `space/none` | 0 | Joined elements: segmented controls, toolbars, ButtonGroup seams |
| `space/2xs` | 2 | Hairline: between visually tight elements, inside dense controls |
| `space/xs` | 4 | Icon to its label, status dot to text, label to its input |
| `space/sm` | 8 | Chip padding, dense list row gap, between tap targets, button to adjacent item |
| `space/md` | 12 | List item vertical padding, related items, most internal padding. The default when unsure |
| `space/lg` | 16 | Standard component padding, mobile screen side margin, field to field |
| `space/xl` | 20 | Card padding, distinct content blocks |
| `space/2xl` | 24 | Gap between sections on a screen, top padding of a screen body |
| `space/3xl` | 32 | Major section breaks, padding around heroes |
| `space/4xl` | 48 | Page-level vertical padding, unrelated sections, onboarding |
| `space/5xl` | 64 | Hero margins, marketing layouts |

Primitive mirror (never reference in UI): `Spacing/0` to `Spacing/96`. 80 and 96 have no semantic token and are reserved for desktop or large marketing surfaces.

## Common recipes
| Element | Padding / gap |
|---|---|
| Card | `space/xl` padding (or `space/lg` on dense lists), `space/md` between rows inside |
| List row | `space/md` vertical, `space/lg` horizontal, `space/md` between leading icon and text |
| Form | label to input `space/xs`, input to helper `space/xs`, field to field `space/lg` |
| Button row | `space/sm` between buttons, `space/lg` above the row |
| Screen | `space/lg` side margins, `space/2xl` top padding, `space/2xl` between sections |
| Section header to its content | `space/md` |
| Chip / tag | `space/sm` horizontal, `space/xs` vertical |
| Bottom sheet | `space/lg` sides, `space/2xl` top below the handle, CTA above the home indicator inset |
| Hero amount block | `space/3xl` around it |

## Density
| Context | Density | Typical values |
|---|---|---|
| Investor product default (deal list, portfolio) | Medium | `space/md` gaps, `body / 14 / regular`, `Button` `Size=md` |
| Data-heavy (transactions, schedules, tables) | High | `space/sm` between rows, `space/xs` within a row, `body / 13 / regular` |
| First-time and high-stakes (onboarding, KYC, payment) | Low | `space/lg` to `space/2xl` gaps, `body / 16 / regular`, `Button` `Size=lg` |

Do not ship a density toggle; pick the density for the dominant task.

## Breakpoints and grid
| Breakpoint | Width | Container | Side padding / gutter | Columns |
|---|---|---|---|---|
| mobile (default, primary) | 0 to 599 | fluid | 16 | 4 |
| tablet | 600 to 1023 | max 720, centred | 24 | 8 |
| foldable inner | 669 to 951 | 2 x 390 columns | 16 | 8 (even counts only) |
| desktop | 1024 to 1439 | max 1200, centred | 32 | 12 |
| wide | 1440 + | max 1400, centred | 32 | 12 |

These follow Material 3 window size classes. Safqah is Flutter mobile-first; desktop is for web admin and back-office tools.

## Compact vs regular layouts
- **Compact width** (phones, the closed foldable outer display, split view): one column, the production phone layout. Content column on the phone canvas is 390 minus 2 x 16.
- **Regular width** (tablet, foldable inner display): rearrange, never stretch. Use split view (list + detail), reflow (one stack becomes two even columns) or a right column that holds the form while the other half stays free. Keep the same content, functionality and hierarchy as compact.
- Prefer even column counts on foldables and never place interactive elements on the fold line.
- Foldable measurements on the Layout foundation page (outer 466 x 678, inner 951 x 669, table pose 669 x 951, 84 pt vertical system bar on the right that does not mirror in Arabic) are placeholders to verify before final specs.

## Stack vs grid
| Use a Stack (auto layout, one axis) for | Use a Grid (equal cells) for |
|---|---|
| Forms, lists, page sections, icon + text | KPI tiles, deal card galleries, option pickers, 2x2 stat quadrants |

If cells are not equal weight, use a wrapping stack instead of a grid.

## Sizing reference (from components, not tokens)
| Element | Compact | Default | Comfortable |
|---|---|---|---|
| Button | 32 | 40 | 48 (primary mobile CTA) |
| Input | 40 | 48 | 56 (financial inputs) |
| App bar | 48 | 56 | 64 |
| Tab bar | 56 | 64 | 80 |
| List item, 1 line | 44 | 56 | 64 |
| List item, 2 lines | 56 | 72 | 80 |
| IconButton | 32 | 40 | 48 (keep a 48 tap area in the app) |

## Examples
| Do | Don't |
|---|---|
| Deal card with `space/xl` padding and `space/md` between rows | `padding: 14px` |
| Arabic form with `space/lg` start padding (right side in RTL) | `paddingLeft: 16` that stays left in Arabic |
| Tablet: list on one side, deal detail on the other | Phone layout stretched to 900 wide |
| Two 32 px icon buttons with 48 tap areas and space between | Two 24 px icons touching each other |


---

# Components: decision trees

# Decision trees: which Syntropy component

The full trees behind the tables in SKILL.md, one per need family, with the reason for every branch and the edge cases. Walk a tree top to bottom and stop at the first question you answer "yes". "(np)" marks a component that is not in the published library (see `unpublished.md`).

## Rules
1. Start from the job, not from a widget you remember. "Show that the deal is Late" leads to a different answer than "show a red pill".
   Why: most wrong picks come from matching the look (a pill, a card) instead of the meaning.
2. Stop at the first "yes" and then confirm in the page guide (`references/data/components/<page>.md`).
   Why: the trees are ordered from most specific to most generic; a later branch is a fallback.
3. If two branches seem to fit, open `confusables.md` for the deciding question.
   Why: the confusable pairs are listed there with the one question that separates them.
4. If no branch fits, run `gap-check.md`. Never stretch a component beyond its documented use.
   Why: a stretched component misleads users and engineers alike.

## 1. Actions (02 Actions, plus BackButton and MenuTrigger)
1. Does the tap **go somewhere** (another route, a URL, a PDF) without changing anything here?
   - Yes, inline in text or as a quiet path («الشروط والأحكام», «نشرة الإصدار», «لاحقاً») → `Link` (np). `Variant=info` or `default` in body copy, `muted` for low-priority paths, leading document icon for downloads, trailing arrow for external sites.
   - Yes, a whole row that opens a detail screen → `ListItem` `Has chevron` (not `Link`).
   - Why: a `Link` never changes state; screen readers announce it as a link.
2. Is it a **back** to the previous screen or step? → `BackButton`. `Type=Icon only` in dense headers, `Emphasis=On-media` over a deal photo. One back affordance per screen: if `AppBar` already shows one, do not add another.
3. Is it **sign-in or identity with a provider** (Nafath, Apple, Google)? → `SocialButton` (np). Pair the Absher/Nafath entry with `AbshirLogo` as its icon.
   - Why: provider buttons stay neutral so the provider logo carries the brand.
4. Does it **open a menu of commands**? → `MenuTrigger` (`Glyph=kebab` or `meatball` for overflow, `split` for a primary action plus more).
5. Is it a **floating, persistent screen action** over scrolling content?
   - One action, icon is obvious → `FAB / Standard` `Variant=primary`, `Size=default`.
   - One action that needs a word («استثمار جديد») → `FAB / Extended`.
   - A few related create actions → `FAB speed-dial`.
   - Never for Invest or Confirm: those belong in the page or sheet footer as a `Button`.
6. Is it **one universally understood icon** with no label (close, copy IBAN, share, more)? → `IconButton`. `Variant=text` for close X, `tertiary` for copy or share, `destructive` for trash (then confirm). If the meaning is not universal (filter, sort, Sukuk, KYC) use `Button` with a label and a leading icon.
   - Why: unlabeled icons for finance concepts fail first-time investors.
7. Are **2 or 3 related actions** placed together? → `ButtonGroup` around `Button` instances (`Orientation=vertical` on narrow sheets, `Alignment=space-between` for Skip plus Continue). Four or more: keep one primary and move the rest into a `Menu`.
8. Otherwise → `Button`. Pick `Variant` by loudness and risk:
   | Situation | Variant | Notes |
   |---|---|---|
   | The single main action («استثمر الآن», «تأكيد الاستثمار») | `primary` | One per screen or sheet. `Size=lg` on mobile |
   | Alternative or escape (Cancel, Edit amount, Back) | `secondary` | Beside or under the primary |
   | Low emphasis in a busy area | `tertiary` | |
   | Inline-looking action that still changes state | `text` | Not for navigation (that is `Link`) |
   | Irreversible (withdraw early, cancel reservation, delete) | `destructive` | Always behind `Dialog` `Tone=destructive` |
   | Retry after failure, submit blocked by errors | `error` | |
   - `State=loading` while the request runs; it blocks repeat taps (duplicate investments).
   - `Size=sm` (32px) is below the touch target: keep `lg` or `md` in the app.

## 2. Text input (03 Form & Input)
1. Is it a **verification code**? → `OTP Input` (np). `Length=4` for SMS, `Length=6` for authenticator codes (`Size=md` on narrow phones). Not for passwords.
2. Is it a **mobile number**? → `Input Phone` (np), default country code +966; the value atom is `Input Phone Value` (`Show Country=false` when the market is fixed).
3. Is it **money in SAR**?
   - Typed freely (investment, top-up, withdrawal) → `Input Amount` (np) `Size=lg`, helper with the limit («الحد الأدنى للاستثمار 1,000 ر.س»). `State=disabled` to show a locked amount during confirmation.
   - Moves in fixed steps (each step 1,000) → `Amount Stepper` (`Show Actions=false` turns it into a read-only amount box).
   - Qualified investor, full-screen keypad with live rule checks → `Keypad / Amount input` (np); inside a sheet → `Sheet Content / Amount keypad` (np).
   - Inside an overlay with a min/max range → `Sheet Content / Amount` (Input Amount plus Slider).
   - Read-only amount, not a field → `MoneyAmount`.
   - Why: amounts are the hero of the screen; the amount atoms carry the Riyal symbol and the big-integer, small-decimals rhythm.
4. Is it a **small integer count** (units, installments)? → `NumericStepper` (`State=AtMin` / `AtMax` disable a side). Not for SAR.
5. Is it **multi-line**? → `TextArea` (np) with `Show Counter` only when there is a real limit; bare box `TextArea Field`; recessive back-office notes `TextArea Underline`.
6. Is it **search**?
   - Filtering the list already on screen → `Search Input` (np) alone.
   - Global search with suggestions, recent and empty states → `Search Dropdown` (`Search Input` on top, `Search Result Item` rows).
   - Search entry in a crowded header or table toolbar → `Compact Search Trigger`.
   - Back-office command search across actions and records → `Command palette` (never in the investor app).
7. Is it **choosing one value from a long list by typing** (bank when adding an IBAN, city, sector)? → `Combobox Field` with `Combobox Menu` (`State=No results` with «جرّب كلمة أخرى»), or `Autocomplete` when matches should be highlighted and loading shown.
8. Is it a **date**? → `Date Input` (one date), `Date Range Field` (من / إلى). The picker it opens: `Date Wheel Picker` on mobile (`Mode=single-date`, `time`, `datetime`), `Date Calendar Picker` on web (`Mode=single`, `range`). Never a typed date in `Input`. Preset periods (30 days, 3 months) are a `SegmentedControl_3` instead.
9. Is it a **file**? → `Upload Button` before a file is chosen, then `File Item with Progress` (`State=progress`, `complete`, `error`, `uploaded`); compact metadata inside another container `File Item`.
10. Otherwise, **single-line text**:
    - Standard bordered forms (KYC, bank details, settings) → `Input` (np).
    - Light sign-in or onboarding with one or two fields → `Input Underline` (np). Never mix the two styles in one form.
    - A control that is not an input but needs the same label and helper chrome (Switch, Slider, Checkbox in a mixed form) → `Form Field` (np) with `Form Field Label` (np, `Required`, `Tooltip`) and `Form Field Helper` (`Tone=neutral`, `error`, `success`, `info`).
    - Inline edit cell or table filter where the column header is the label → bare `Input Field` (`Icon=leading` or `trailing`).
    - Do not wrap `Input`, `Select`, `Slider Field` or `TextArea` in `Form Field`: they already include label and helper.

## 3. Choice
1. Is it **one yes or no consent** saved on submit («اطلعت على نشرة الإصدار وأوافق على الشروط»)? → `Checkbox`, unchecked by default.
2. Does the setting **apply instantly** with no submit (notifications, Face ID, 2FA)? → `Switch`. In a settings list the switch lives in `ListItem` `Has toggle`.
3. Is it **Saudi regions**? → `ProvinceSelector` (`Selection=Single` default, `Multi` when several apply), chips are `RegionChip`.
4. Is it the **NPS question**? → `RatingScale` (cells `RatingCell`).
5. Is it **exactly one option**?
   - 2 to 5 short options that change the same view (Day / Week / Month, Gross / Net, All / Active / Closed) → `SegmentedControl_2`, `_3`, `_4` or `_5`. The suffix is the number of options; set exactly one nested `Segment` to `State=selected`.
   - 2 to 6 options shown as a labelled question in a form → `Radio Group` (np) of `Radio`.
   - Rich options with description, on a full screen or sheet (payment method, bank account, plan) → `SelectionList` `Mode=Single` of `SelectRow` `Type=Radio`.
   - About 6 or more options from a closed list → `Select` (np) (`Select Underline` (np) when the form uses underline inputs).
   - Long list where typing helps → `Combobox Field`.
   - A tile among tiles → `ActionTile` `State=Selected`.
   - Investment term inside the calculator → `Calculator / Duration picker` (qualified) or the term step of `Investment Calculator` (retail).
6. Is it **several options**?
   - A few options, saved on submit → `Checkbox Group`.
   - Rich rows → `SelectionList` `Mode=Multi` of `SelectRow` `Type=Checkbox`.
   - Many options in a back-office form or filter → `Multi-select field` (`Value-display=chips`, `count` or `text`).
   - Compact filter menu on a list or table → `Filter menu`.
7. Is it an **approximate value along a range** (allocation, risk tolerance)? → `Slider Field` (np), bare `Slider` inside calculators. There is no range slider: use two linked sliders or `Date Range Field` for dates. Exact money is never a slider.
8. Is it a **small integer**? → `NumericStepper`.

## 4. Feedback (05 Feedback, plus loaders and progress)
1. Is it about **one field**? → the field's `State=error` plus its helper (`Input Helper Text` `Tone=error` or `Form Field Helper` `Tone=error`). Success on a field: `Form Field` `State=success`.
2. Does the user need to **decide before continuing**? → `Dialog`. `Tone=destructive` for irreversible actions (confirm label names the action: «إلغاء الحجز»), `showCancel=false` for acknowledgements, `showImage=true` for a celebratory confirmation. Never for marketing.
3. Is it **inside content or a form and should persist** until resolved? → `Alert`. `Tone=error` `Style=Filled` for submit failures at the top of a form, `Tone=warning` with an action chip for an expired ID, `Tone=success` for "documents received".
4. Is it **page or account level** with one call to action (KYC reminder, payout failed, maintenance)? → `Banner`. One per screen; demote the rest to `Alert` or `Toast`. `Style=Elevated` for announcements, `showClose=false` for maintenance.
5. Is it a **brief confirmation** of something that just happened («تم نسخ رقم الآيبان», investment confirmed when returning to a screen that already shows it)? → `Toast`. `Size=Small` for connection lost or restored. No links or buttons.
6. Is it an **explanation of a term, icon or number**?
   - Text only, supplementary → `Tooltip` (`Size=md` with `HasTitle=true` for a calculation explanation).
   - Needs a link or an action → `Popover`.
   - Rich explanation on mobile → `BottomSheet` with `Sheet Content / Text`.
   - Information the investor must see to decide (fees, risk, minimum) → never hidden: show inline.
7. Is the list or view **empty after loading**? → `EmptyState`: `Tone=default` (nothing yet, with a Browse deals button), `Tone=search` (filters returned nothing, Clear filters), `Tone=error` (failed to load, Retry). `Size=Compact` inside cards. Inside a sheet → `Sheet Content / Empty`. Inside a chart card → `Chart / States` `State=empty`.
8. Is it **still loading**?
   - Known layout (cards, rows, tiles) → Skeleton atoms: `SkeletonLine` (text, `Size` and `Width` to match), `SkeletonBlock` (images, charts, buttons, `Radius` to match), `SkeletonCircle` (icons), `SkeletonAvatar` (people `Shape=Circle`, companies `Square`).
   - Button submitting → `Button` `State=loading`.
   - Short wait with no layout → `SpinnerRing` (the default; 95% of waits). Scanning or polling → `SpinnerPulseRings`; chat → `SpinnerDotOrbit`; typing → `SpinnerBouncingDots`; slow processing → `SpinnerHourglass`; branded full-screen moments (boot, post-investment) → `SpinnerSafqahBrand`. One spinner style per surface.
   - Unknown duration but a bar fits (verification polling, background sync) → `ProgressBar_Indeterminate`.
   - Mobile refresh gesture → `Pull-to-refresh`.
9. Is it **measurable progress**?
   - A percentage (funded, profile completion, upload) → `ProgressBar` (`Tone=brand` for funded, `success` / `error` for upload outcome, `showLabel` with `Label` and `Value`).
   - Discrete steps (2 of 5, 5 of 7 documents) → several `ProgressSegment`.
   - Up to four named milestones ending in a reward → `MilestoneProgress`.
   - Steps with labels the user moves through → `Stepper`.

## 5. Overlays
1. Is it a **list of commands**?
   - Web or back-office, anchored to a button → `Dropdown menu` (`MenuTrigger` plus `Menu`, `Placement=bottom-end` etc.); second level → `Cascading submenu`.
   - Mobile, a few actions with Cancel → `Action sheet`; longer grouped menus → `Bottom-sheet menu`.
   - Sorting a list → `Sort menu`; filtering → `Filter menu`.
2. Is it **anchored, small and non-blocking** with text plus a link or action? → `Popover` (`Placement=top`, `right`, `bottom`, `left`).
3. Is it a **one-line confirm or acknowledgement**? → `Dialog`.
4. Is it a **focused task on mobile** (confirm investment, enter amount, explain a term, permission reminder)? → `BottomSheet`. Build it from its parts: `DragHandle` (`showHandle`, off for sheets that must not be dismissed), `SheetHeader` (`showSubtitle`, `showClose`), Content swap (`Sheet Content / Text`, `Sheet Content / Summary`, `Sheet Content / Form`, `Sheet Content / Amount`, `Sheet Content / List`, `Sheet Content / Empty`; never ship `Sheet Content / Blank`), `SheetFooter` `Layout=Stacked`.
5. Is it a **critical interruption or a focused form on web or back-office**? → `Modal` `Size=sm`, `md`, `lg` or `xl` (`xl` with `Sheet Content / Media` for video).
6. Is it a **side panel** (filters while results update, record detail, temporary navigation)? → `Drawer` (`Side=right` or `left`; trailing side in RTL is the left edge, set it by the layout's reading direction), `SheetFooter` `Layout=Row` for Apply and Reset.
7. Long, multi-step or legal content → a full screen, not an overlay.

## 6. Navigation
1. **Screen header** of an app screen → `AppBar` (np). Pick `Type`:
   | Screen | `Type` |
   |---|---|
   | Home with greeting and wallet balance | `main screens` (`main screens-green` on the green home) |
   | Inner screens, settings | `Inner screens` or `Small Title` |
   | Deal page, collapsing on scroll | `Deal page`, `Deal page-detail`, `Deal page-collapsing` |
   | Full-screen overlay with only a close | `Close Icon-Black` (or `Close Icon-white` on dark) |
   | Big icon actions | `Large Icons` |
   | Onboarding | `Onboarding` |
   - Home with returns and a payouts entry → `Header Info` (published) instead.
   - `Header` (np) is a product source part; prefer `AppBar` or `PortfolioHeader` for new screens.
2. **Moving between app sections** on mobile → `TabBar (3-tab)` for the shipping app (`Active=1`, `2`, `3`); `TabBar` (four tabs, `Active=1` to `4`) only in designs for the four-section IA. Hide the tab bar inside checkout and KYC.
3. **Switching sibling views** of one screen under the app bar (Active / Completed) → `SegmentedTabs` (`Active=1` or `2`); a delta on a tab → `SegmentedTabItem` `HasTrend=true`.
4. **Progress through an ordered task** (3 to 5 steps) → `Stepper` (`Orientation=horizontal` on wide layouts, `vertical` for long labels). KYC → `KYCStep` (already includes the Stepper).
5. **Location in a deep hierarchy** on web or back-office (3 or more levels) → `Breadcrumb` (`Type=collapsed` for long trails). Never on mobile, never the only navigation.
6. **Paged results** → `Pagination`: `Type=table` under tables (rows per page plus range), `numbered` for long ordered lists, `compact` on narrow layouts. Exploratory feeds use Load more instead.
7. **Desktop app shell** → `AppSidebar (shadcn-style)` (published; workspace switcher `NavRail / TeamSwitcher`, user `NavRail / NavUser`, items `NavRailItem`); a simpler rail → `NavigationRail` (np). Temporary navigation over content → `Drawer`.
8. **Carousel or snap position** → `PageIndicator` (`Style=Dots` or `Bars`, `Active=1` to `5`).
9. **Scrollable region** with edge fades, sticky header or visible scrollbar → `ScrollContainer` (`Axis`, `fadeStart`, `fadeEnd`, `stickyHeader`, `stickyFooter`, `showScrollbar`).

## 7. Data display
1. **What kind of label?**
   | Meaning | Component | Key values |
   |---|---|---|
   | Deal or issuance lifecycle, investor view | `IssuanceStatusBadge (Investor)` | `Status=Reserved`, `Funded`, `Active`, `Late`, `Defaulted`, `Repayment Due`, `Fully Funded`... |
   | Lifecycle, developer portal | `IssuanceStatusBadge (Developer)` | `Status=BookBuilding`, `PendingDrawdown`, `Reimbursed`... |
   | Lifecycle, admin only | `IssuanceStatusBadge (Internal)` | `Status=OnHold`, `Dispute`, `Rejected`... |
   | Attribute or state outside the lifecycle (Verified, KYC complete, Pending review, Expired) | `StatusPill` | `Tone`, `Variant=subtle` / `solid`, `HasIcon` |
   | Category or metadata (sector عقاري, document type) | `Tag` (np) | `Tone`, `Style=filled` (max one) / `subtle` |
   | Applied filter the user can remove | `Tag Removable` (np) | always subtle |
   | Tier or ribbon on a deal image (مضمونة برهن, فرصة حصرية للمؤهلين, مغلقة بنجاح) | `dealTags` | `Type=Premium`, `RIO/White`, `RIO/Black`, `Closed`, `ClosedWhite`, `Basic`, `pros` |
   | Unread or presence, no number | `Badge Dot` | |
   | How many need attention | `Badge Count` (np) | |
   | Percentage change | `TrendBadge` | `Tone=positive` / `negative` |
   - Why: lifecycle copy and colour are locked by the Issuance Status Copy spec; a generic pill drifts from what support and notifications say.
2. **Numbers**:
   - One headline KPI per tile (total invested, expected return) → `Stat` (`Size=lg` for a hero metric, `HasDelta=true` adds a `StatusPill` delta).
   - Lookup facts in a panel or receipt (profit rate, maturity, reference with copy icon) → `KeyValue` (`Emphasis=strong` for the one key figure).
   - Breakdown with a total line → `List` `Style=Description` (`List / DescriptionRow` `Emphasis=Total`).
   - Any SAR amount on display → `MoneyAmount` (`Tone=brand` only for profit or money received).
   - Portfolio KPIs with trends on web → `Chart / KPI strip`; on mobile `Chart / KPI list · Mobile`.
3. **People and entities** → `Avatar` (`Shape=Circle` people, `Rounded` companies; fallback `Type=Photo`, `Initials`, `Icon`, `Placeholder`); live presence `AvatarWithStatus`; social proof with a count label `AvatarStack`. Brand marks are logos, not avatars.
4. **Separation** → `Divider` (`Tone=subtle` between KeyValue rows, `Variant=dashed` before optional groups). Rows in `ListItem` and `ActionList` use their own divider boolean; never a divider at a card edge.
5. **Events over time** → `TimelineRow` stacked (node `TimelineNode`, `State=completed`, `active`, `upcoming`, `skipped`); the deal lifecycle module → `DealTimeline`; paid and late payouts → `Payouts cell`.
6. **Funded percentage** → `ProgressBar` `Tone=brand` with the real value (`CardDeal` already nests it); inside the qualified calculator `Calculator / Funded label` («78% ممول»). Never round up, never use it as urgency.
7. **Charts** (page 04k; semantic tokens, green-first, Western digits, time left to right even in RTL):
   | Need | Desktop | Phone |
   |---|---|---|
   | Value over time | `Chart / Line` (4153:3047) | `Chart / Line · Mobile` |
   | Magnitude or cumulative | `Chart / Area` (4154:3048) | `Chart / Area · Mobile` |
   | Compare categories or periods | `Chart / Bar` (4154:3047) | `Chart / Bar · Mobile` |
   | Composition per group | `Chart / Stacked` | `Chart / Stacked · Mobile` |
   | Share of a whole, 6 slices or fewer | `Chart / Donut` | `Chart / Donut · Mobile` |
   | Bridge from start to end | `Chart / Waterfall` (4160:3166) | `Chart / Waterfall · Mobile` |
   | Correlation | `Chart / Scatter` (4154:3051) | `Chart / Scatter · Mobile` |
   | Mixed bar plus line | `Chart / Combo` (4160:3165) | `Chart / Combo · Mobile` |
   | Several KPIs with trends | `Chart / KPI strip` | `Chart / KPI list · Mobile` |
   | Tiny trend beside a number | `Chart / Sparkline` | same |
   | Loading, empty, error | `Chart / States` | same |
   - The marks-only atoms with the same names (`Chart / Line` 4109:1337, `Chart / Bar` 4108:1351...) are building blocks for `Chart / ChartContainer`; cite ids.
   - Gains and losses are vivid green vs dark green, never red vs green.
8. **Many comparable records** (back-office, portfolio tables) → `Table / Toolbar` (`Mode=Default` / `Selection`), `Table / HeaderCell` (`Sort`, `Has select-all`), `Table / Cell` (one `Type` per column: `Text`, `Numeric` end-aligned, `Avatar`, `Tag`, `Status`, `Select`, `Trend`, `Progress`; `Density=Default` / `Compact`), `Table / ActionCell` (two sets with this name: 3320:262 and 3351:197; pick one and cite its id), `Pagination` `Type=table`.

## 8. Cards and lists
1. **Is it a deal?**
   - In a feed, home or list → `CardDeal` (`Layout=Hero` spotlight, `Row` dense; `State=Available`, `Reserved`, `Invested`, `Closed`; `Qualified` only for qualified users).
   - Top of the deal's own page → `Base card` (np, HeaderCard page; `Platform=Mobile` / `Web`, `State=Expanded` / `Collapsed`).
   - A recommended deal after maturity → `Reinvest / RecommendationRow` or `Reinvest / RecommendationCard`.
   - Why: the feed card sells a choice; the hero frames a page; mixing them confuses hierarchy.
2. **Is it an update about a deal or project?** → `NewsCard` (`Style=Plain` in feeds, `Boxed` standalone, `Media` with a photo); swipeable photo updates → `NewsCard / Poster Carousel` (np) of `NewsCard / Poster` (np).
3. **Is it guidance that taps through** (help, relationship manager, persistent note)? → `CardInfo` (`Type=Icon` or `Avatar`, `Tone`).
4. **Does it ask for one action with a button** (complete KYC, add bank account)? → `ActionPrompt` (`Tone=Warning` for must-do, `Brand` for nudges, `Success` after completion).
5. **Is it a shortcut** (Deposit, Withdraw, Statements)? → `ActionTile` (`Style=Vertical` in grids, `Horizontal` with info).
6. **Is it a row?**
   - Navigates, toggles or shows a value → `ListItem` (one trailing affordance: `Has chevron`, `Has toggle`, `Has value` or `Has action`).
   - Selectable → `SelectRow` inside `SelectionList`.
   - A KYC task → `KYCTaskRow` inside `KYCChecklist`.
   - A payout → `Payouts cell`. A status group in the portfolio → `Issuance Row`.
7. **Is it a group of rows?**
   - Settings or account menu with header, dividers, footer → `ActionList` (`Style=Grouped` card, `Plain` edge to edge).
   - Read-only content (bullets, numbered steps, breakdown with total) → `List` (`Style=Bulleted`, `Numbered`, `Description`, `Plain`, `Divided`, `Inset`).
   - Choice → `SelectionList`.
   - Floating commands → `Menu`.
8. **Is it a heading over a region** (deals carousel with «عرض الكل»)? → `Section` (`Size=Lg` for primary sections, `Md` / `Sm` below). Not the screen title (`AppBar`), not a group header inside a list (`ActionList` `Has header`).
9. **Is it optional detail** (FAQ, terms by topic)? → `Accordion` (`Style=Boxed` / `Plain`) of `AccordionItem`. Prices, fees, errors and key actions are never collapsed.
10. **Is it a browsable strip?** → `Carousel` (`Type=Cards` for featured content, `Hero` for one big promo or onboarding) with a `Section` above; a free horizontal rail with fades → `ScrollContainer` `Axis=horizontal`.

## 9. Safqah-specific (08 family)
1. **Amount and returns before investing**
   - Retail, deal page, slider up to 20,000 → `Investment Calculator` (`Value=1`, `4`, `20`, `Qualified-user`), with `Investment-amount`, `Distribution-schedule`, `Promo-code`, `Checkout`, `Payment-details`.
   - Qualified, deal page → Calculator v2: `Calculator / Duration picker` (or `Calculator / Duration picker · Underline`) → `Calculator / Amount card` → `Calculator / Results card` (all np).
   - Qualified, full-screen keypad → `Keypad / Amount input` (np); older `QualifiedCalculator` (np) with `QualifiedCalculator Header`.
   - Held reservation summary → `Reservation-Calculater`.
   - Compliance: projections «متوقع», net after the agency fee (1% of profit, never of capital) beside gross, no guaranteed returns.
2. **Reservation time** (only a real server expiry, always with the absolute time) → `Countdown` (days, `Has Lable`), `Small Timer` (MM:SS chip, `Property 1=Black`, `Yellow` near the end, `Green`), `Collapsed-Reservation` (sticky bar, `Has Multi-deals `).
3. **Portfolio top** → `PortfolioHeader` (`Balance=Shown` / `Masked`, `Show wallet`, `Show returns`, `Show payouts table`); parts `UserGreeting` (np), `WalletChip`, `ReturnsDisplay`, `MoneyAmount`, `BalanceToggle`. Returns include expected profit: say so.
4. **Payouts after investing** → `Payouts cell` (`Property 1=Upcoming`, `Done - Payout`, `Done - Captial`, `Early paid`, `Disabled Early paid`, `Late`, `Defaulted`, `Partially repaid`, `Partially repaid closed`, `Partial principal`; `Direction=rtl` / `ltr`). Stack with dividers, never one card per row.
5. **Where the deal is** → `DealTimeline` (exactly one active stage; future stages «متوقع»).
6. **Compliance marks** → `ShariaDisclosure` on deal pages and listings; `ComplianceBadge` (`Type=Shariah` / `CMA`) in compact summaries. Only for real approvals, exact legal wording, «إعرف أكثر» opens the real licence or fatwa.
7. **Portfolio by status** → `Issuance List` of `Issuance Row` (`State=Default` / `Open` / `Focus`, `Language=LTR` / `RTL`), icons `Issuance Status Icon`.
8. **KYC** → hub `KYCChecklist` (rows `KYCTaskRow` `State=Completed` / `Current` / `Upcoming`), each step screen `KYCStep`.
9. **Guarantee coverage** → `Guarantees` (`Coverage=Empty`, `Low`, `Mid`, `High`, `Full`); values from the offering file.
10. **Region preference** → `ProvinceSelector`. **NPS** → `RatingScale`.
11. **After the final payout** → `Reinvest / MaturityRecap` (np) in a `BottomSheet`, then `Reinvest / RecommendationList` (version A) or `Reinvest / RecommendationCarousel` (version B). Behavioural matches, never advice: no «مناسبة لك», keep the not-advice disclaimer, Reinvest and Keep equal.
12. **Goals** → `GoalActivate` and `GoalTracker` exist on a `wip` page: tell the person they are not stable; do not design new production screens on them.
13. **Logos** → `SafqahLogo` (`Form=Main` stacked, `Variant` inline; seven `Color` values only), `AbshirLogo` (Absher/Nafath only), `MadaLogo` (mada card payments only), `Brand / Safqah Wordmark (Dark)` in the sidebar header.


---

# Components: confusables

# Confusable components

Pairs and groups that agents mix up, each with the one question that decides between them. Open this when two components both look right.

## Rules
1. Ask the deciding question literally and answer it from the person's need, not from the visual.
   Why: confusables usually look alike; they differ in meaning, behaviour or platform.
2. When the answer is still unclear, open both page guides and their reference images.
   Why: the Don't use when lists name the alternative explicitly.

## Labels and chips
| Group | Deciding question | Answer |
|---|---|---|
| `Tag` vs `StatusPill` | Is it a category (what kind of thing) or a state or attribute (what condition it is in)? | Category (عقاري, document type, risk level) → `Tag`. State or attribute (Verified, Pending review, KYC complete, Expired) → `StatusPill` |
| `StatusPill` vs `IssuanceStatusBadge (Investor)` | Is it a stage of the deal or issuance lifecycle? | Yes (Reserved, Funded, Active, Late, Defaulted, Matured) → `IssuanceStatusBadge (Investor)`, locked copy and colours. No → `StatusPill` |
| `IssuanceStatusBadge (Investor)` vs `(Developer)` vs `(Internal)` | Who is looking? | Investor app → `(Investor)`; developer portal → `(Developer)`; admin or Monitoring dashboards → `(Internal)`. Never show `Reimbursed` or `PendingDrawdown` to investors |
| `Tag` vs `Tag Removable` | Can the user remove it? | Yes (applied filter) → `Tag Removable`; no → `Tag` |
| `Tag Removable` vs `RegionChip` | Is the user removing an applied value or picking an option? | Removing → `Tag Removable`. Picking a Saudi region → `RegionChip` inside `ProvinceSelector` |
| `Tag` vs `dealTags` | Is it a tier or ribbon on the deal image (مضمونة برهن, فرصة حصرية للمؤهلين, مغلقة بنجاح)? | Yes → `dealTags` (the TierBadge page); no → `Tag` |
| `Badge Dot` vs `Badge Count` vs `StatusPill` | Does the number matter? Are there words? | No number → `Badge Dot`; a number → `Badge Count`; words → `StatusPill` |
| `TrendBadge` vs `StatusPill` delta in `Stat` | Is the change beside a tab or table cell, or inside a KPI tile? | Tab, table, KeyValue → `TrendBadge`; inside `Stat` → `HasDelta=true` (nests `StatusPill`) |
| `Tag` vs `Segment` / `SegmentedControl_N` | Does tapping change a value on this view? | Yes → `SegmentedControl_2..5`. `Tag` is never interactive |

## Steppers and progress
| Group | Deciding question | Answer |
|---|---|---|
| `Stepper` vs `NumericStepper` vs `Amount Stepper` | Is the user moving through steps, or changing a number? | Steps of a flow → `Stepper`. Small integer (units) → `NumericStepper`. SAR in fixed steps → `Amount Stepper` |
| `ProgressBar` vs `ProgressSegment` vs `MilestoneProgress` | Continuous percentage, discrete count, or named milestones with a reward? | Percentage (78% funded) → `ProgressBar`; 2 of 5 → `ProgressSegment` row; profile journey with up to four milestones and a reward → `MilestoneProgress` |
| `ProgressBar` vs `ProgressBar_Indeterminate` vs `SpinnerRing` | Is progress measurable, and is the wait long or short? | Measurable → `ProgressBar`; not measurable, bar-shaped context → `ProgressBar_Indeterminate`; short wait → `SpinnerRing` |
| `ProgressBar` vs `GuaranteeBar` vs `Slider` | Is it task progress, guarantee coverage, or an input? | Progress → `ProgressBar`; coverage on a millions axis → `GuaranteeBar` inside `Guarantees`; user input → `Slider` |
| `Stepper` vs `KYCStep` vs `KYCChecklist` | Is it KYC? One step screen or the overview? | Non-KYC flow → `Stepper`. KYC step screen → `KYCStep` (includes Stepper). KYC overview hub → `KYCChecklist` |

## Tabs and segmented choices
| Group | Deciding question | Answer |
|---|---|---|
| `SegmentedTabs` vs `SegmentedControl_2` | Does it switch between two content views (navigation-like) or a value that filters the same view? | Views under the AppBar (Active / Completed) → `SegmentedTabs`; value (Monthly / Yearly, Gross / Net) → `SegmentedControl_2` |
| `TabBar` vs `TabBar (3-tab)` | Is it the shipping three-section app or a four-section IA design? | Shipping app → `TabBar (3-tab)`; four-section IA designs only → `TabBar` |
| `SegmentedControl_3` vs `Radio Group` vs `Select` | How many options, how long are the labels, is it a form question? | 2 to 5 short options on the same view → `SegmentedControl_N`; a labelled form question with 2 to 6 → `Radio Group`; 6 or more or long labels → `Select` |
| `SegmentedTabItem` vs `BottomNavTabItem` vs `Segment` vs `NavRailItem` | Which parent? | `SegmentedTabs` → `SegmentedTabItem`; `TabBar` → `BottomNavTabItem`; `SegmentedControl_N` → `Segment`; `NavigationRail` / `AppSidebar (shadcn-style)` → `NavRailItem`. Never standalone |

## Overlays and messages
| Group | Deciding question | Answer |
|---|---|---|
| `BottomSheet` vs `Modal` | Phone or web? | Phone → `BottomSheet`; web and desktop → `Modal`. Same header, footer and content parts |
| `Dialog` vs `Modal` | Is it one short decision or a focused form or media? | One decision (yes / no, acknowledge) → `Dialog`; form, summary, video on web → `Modal` |
| `Dialog` vs `Action sheet` | A decision with a message, or a choice among a few actions on mobile? | Message plus confirm → `Dialog`; list of actions with Cancel → `Action sheet` |
| `Drawer` vs `BottomSheet` vs `NavigationRail` | Side panel kept in context, mobile task, or persistent navigation? | Filters or record detail on web → `Drawer`; mobile task → `BottomSheet`; persistent desktop navigation → `AppSidebar (shadcn-style)` or `NavigationRail` |
| `Tooltip` vs `Popover` | Is there a link, button or close? | No, text only → `Tooltip`; yes → `Popover` |
| `Popover` vs `Menu` | Free content or a list of commands? | Content (title, text, link) → `Popover`; commands → `Menu` |
| `Alert` vs `Banner` | Inside a form or card, or page and account level? | Inside content → `Alert`; top of the page, one CTA, one per screen → `Banner` |
| `Alert` vs `Toast` | Must the user read or act later? | Yes → `Alert`; brief confirmation that auto-dismisses → `Toast` (no buttons) |
| `Banner` vs `ShariaDisclosure` | Generic notice or the Sharia approval statement? | Sharia approval on deal pages → `ShariaDisclosure`; anything else → `Banner` |
| `Alert` vs `CardInfo` vs `ActionPrompt` | Severity message, persistent guidance that taps through, or a nudge with a button? | Severity → `Alert`; guidance or advisor → `CardInfo`; one action button → `ActionPrompt` |
| `EmptyState` vs Skeleton vs `Chart / States` | Done loading with nothing, still loading, or a chart card? | Nothing after load → `EmptyState`; loading → Skeleton atoms; chart card → `Chart / States` |

## Rows, lists and headers
| Group | Deciding question | Answer |
|---|---|---|
| `ListItem` vs `ActionList` | One row or the grouped container? | Row → `ListItem`; container with header, dividers, footer → `ActionList` |
| `ActionList` vs `List` vs `SelectionList` | Do rows navigate or toggle, only display, or let the user choose? | Navigate or toggle → `ActionList`; display (bullets, numbered, breakdown) → `List`; choose → `SelectionList` |
| `ListItem` vs `SelectRow` | Does the row open or toggle, or is it one option of a choice? | Opens or toggles → `ListItem`; option with radio or checkbox → `SelectRow` |
| `MenuItem` vs `Dropdown Item` vs `ListItem` | Floating command, option of a form field, or persistent page row? | Command → `MenuItem`; field option → `Dropdown Item`; page row → `ListItem` |
| `Section` vs `SheetHeader` vs `AppBar` vs `ActionList` header vs `MenuSectionHeader` | What does it title? | A region of a page → `Section`; an overlay → `SheetHeader`; the screen → `AppBar`; a group of list rows → `ActionList` `Has header`; a group of menu items → `MenuSectionHeader` |
| `Accordion` vs `List` vs `Section` | Is the content hidden until opened? | Yes, optional detail → `Accordion`; always visible → `List`; only a heading → `Section` |
| `Content` vs `CardInfo / Content` vs `CardAction / Label` | Which parent? | Rows and slides → `Content`; `CardInfo` → `CardInfo / Content`; `ActionTile` / `ActionPrompt` → `CardAction / Label` |

## Cards and headers
| Group | Deciding question | Answer |
|---|---|---|
| `CardDeal` vs `Base card` | Many deals in a list, or the top of one deal's page? | List or feed → `CardDeal`; deal page hero → `Base card` (HeaderCard page) |
| `CardDeal` vs `NewsCard` | The deal itself, or news about it? | Deal → `CardDeal`; update or milestone → `NewsCard` |
| `NewsCard` vs `NewsCard / Poster` | Vertical feed of text updates, or swipeable photo posters? | Feed → `NewsCard` `Style=Plain`; posters → `NewsCard / Poster Carousel` |
| `Carousel / Slide` vs `CardDeal` vs `NewsCard / Poster` vs `Reinvest / RecommendationCard` | What is on the slide? | Tips, promos, onboarding → `Carousel / Slide`; deals → `CardDeal`; project updates → `NewsCard / Poster`; matched deals after maturity → `Reinvest / RecommendationCard` |
| `ActionTile` vs `ActionPrompt` | Shortcut, or a nudge with description and a button? | Shortcut → `ActionTile`; nudge → `ActionPrompt` |
| `AppBar` vs `Header` vs `Header Info` vs `PortfolioHeader` | Which screen? | Any app screen top bar → `AppBar`; home with returns and payouts entry → `Header Info`; top of Portfolio → `PortfolioHeader`; `Header` is an unpublished product source part, prefer the others |
| `AppSidebar (shadcn-style)` vs `NavigationRail` | Need workspace switcher, search and the published shell? | Yes → `AppSidebar (shadcn-style)` (published); a plain rail → `NavigationRail` (np) |

## Numbers and amounts
| Group | Deciding question | Answer |
|---|---|---|
| `Stat` vs `KeyValue` | Is it the hero number or a lookup fact? | Hero KPI → `Stat`; fact in a panel or receipt → `KeyValue` |
| `KeyValue` vs `List / DescriptionRow` vs `Sheet Content / Summary` | One pair, a breakdown with a total, or a breakdown inside an overlay? | Pair → `KeyValue`; page breakdown with total → `List` `Style=Description`; overlay → `Sheet Content / Summary` |
| `KeyValue` vs `CardDeal / Metric` vs `Calculator / Metric row` vs `Calculator-list-item` vs `Keypad / Summary row` | Which parent? | Generic → `KeyValue`; inside `CardDeal` → `CardDeal / Metric`; Calculator v2 → `Calculator / Metric row`; legacy calculator → `Calculator-list-item`; keypad → `Keypad / Summary row` |
| `Stat` vs `Calculator / Stat tile` vs `Reinvest / MatchStat` | Which parent? | Generic KPI → `Stat`; Calculator v2 strip → `Calculator / Stat tile`; reinvest card → `Reinvest / MatchStat` |
| `MoneyAmount` vs `Input Amount Value` vs `Goal / Amount` | Display, field, or goal card (wip)? | Display → `MoneyAmount`; inside an amount field → `Input Amount Value`; `Goal / Amount` only inside the wip goal cards |
| `Input Amount` vs `Amount Stepper` vs `Keypad / Amount input` vs `Slider Field` | Free, stepped, qualified keypad, or approximate? | Free typing → `Input Amount`; fixed steps → `Amount Stepper`; qualified full-screen keypad → `Keypad / Amount input`; approximate → `Slider Field` (never for the exact investment) |

## Calculators and timers
| Group | Deciding question | Answer |
|---|---|---|
| `Investment Calculator` vs Calculator v2 vs `QualifiedCalculator` vs `Keypad / Amount input` | Retail or qualified, inline or full screen? | Retail inline → `Investment Calculator`; qualified inline → `Calculator / Duration picker` + `Calculator / Amount card` + `Calculator / Results card`; qualified full screen → `Keypad / Amount input` (newer) or `QualifiedCalculator` (older) |
| `Distribution-schedule` vs `Calculator / Distributions accordion` vs `Payouts cell` vs `DealTimeline` | Before or after investing? Which calculator? | Expected, legacy calculator → `Distribution-schedule`; expected, Calculator v2 → `Calculator / Distributions accordion`; actual payouts → `Payouts cell`; the deal's stages → `DealTimeline` |
| `Countdown` vs `Small Timer` vs `Collapsed-Reservation` | Days, minutes, or a sticky bar? | Days and hours → `Countdown`; MM:SS chip → `Small Timer`; persistent bar while browsing → `Collapsed-Reservation` |
| `TimelineRow` vs `DealTimeline` vs `Stepper` | Generic dated events, the deal lifecycle module, or steps the user completes? | Generic → `TimelineRow`; deal page lifecycle → `DealTimeline`; user task → `Stepper` |

## Pickers and search
| Group | Deciding question | Answer |
|---|---|---|
| `Select` vs `Combobox Field` vs `Autocomplete` | Short closed list, long list where typing helps, or typed suggestions with highlighting and loading? | `Select` / `Combobox Field` / `Autocomplete` |
| `Search Input` vs `Combobox Field` | Searching content, or choosing a form value? | Content → `Search Input`; value → `Combobox Field` |
| `Search Dropdown` vs `Combobox Menu` vs `Command palette` | Global content search, a field's option list, or back-office command search? | `Search Dropdown` / `Combobox Menu` / `Command palette` |
| `Select` vs `Dropdown menu` | Choosing a value or firing a command? | Value → `Select`; command → `Dropdown menu` |
| `Multi-select field` vs `Checkbox Group` vs `Filter menu` | Many values in a back-office field, a few in a form, or a compact list filter? | `Multi-select field` / `Checkbox Group` / `Filter menu` |
| `Sort menu` vs `Table / HeaderCell` `Sort` | Sorting the whole list by a chosen field, or by one table column? | List → `Sort menu`; column → `Table / HeaderCell` |
| `Checkbox` vs `Switch` vs `Radio` | Saved on submit, applied instantly, or exclusive? | `Checkbox` / `Switch` / `Radio` (inside `Radio Group`) |
| `Input` vs `Input Field` vs `Form Field` | Full labelled field, bare box, or wrapper for any control? | `Input`; `Input Field` for inline cells and slots; `Form Field` for non-input controls needing label and helper |

## Actions
| Group | Deciding question | Answer |
|---|---|---|
| `Button` vs `Link` | Does it change something here, or go somewhere? | Change → `Button` (even `Variant=text`); go → `Link` |
| `Button` vs `IconButton` | Is the icon universally understood with no label? | Yes → `IconButton`; no → `Button` with a label |
| `IconButton` vs `BackButton` vs `Calculator / Swipe arrow` vs `PaginationArrow` | Back navigation, calculator term step, or page step? | Back → `BackButton`; calculator → `Calculator / Swipe arrow`; pagination → `PaginationArrow`; other icon actions → `IconButton` |
| `FAB / Standard` vs `FAB / Extended` vs `FAB speed-dial` | One clear icon, one action needing a label, or several actions? | `FAB / Standard` / `FAB / Extended` / `FAB speed-dial` |
| `ButtonGroup` vs `SheetFooter` | Page-level actions or an overlay footer? | Page → `ButtonGroup`; overlay → `SheetFooter` |

## Media, icons and logos
| Group | Deciding question | Answer |
|---|---|---|
| `illustrations` (04b, lowercase) vs `Illustrations` (05d) vs `Issuance Status Icon` vs `Empty Illustration / ...` | Badge glyph, large artwork, portfolio row icon, or the EmptyState slot? | Glyph inside a status badge → `illustrations`; empty state and feature artwork → `Illustrations`; `Issuance Row` icon → `Issuance Status Icon`; `Empty Illustration / <tone> / <size>` comes automatically inside `EmptyState` |
| `Avatar` vs `SafqahLogo` vs `Brand / Safqah Wordmark (Dark)` vs `NewsCard / Developer Logo` | Person or company picture, Safqah brand, sidebar header, or issuer logo on a poster? | `Avatar` / `SafqahLogo` / `Brand / Safqah Wordmark (Dark)` / `NewsCard / Developer Logo` |
| `CardDeal / Media` vs `NewsCard / Poster Media` vs `Sheet Content / Media` | Deal card image, poster background, or video in a web modal? | `CardDeal / Media` / `NewsCard / Poster Media` / `Sheet Content / Media` |
| `Carousel` vs `ScrollContainer` | Paged slides with an indicator, or a free scrolling rail? | `Carousel` / `ScrollContainer` `Axis=horizontal` |
| `Pagination` vs `PageIndicator` | Pages of data, or slide position? | `Pagination` / `PageIndicator` |

## Same name twice
| Name | Ids | Which |
|---|---|---|
| `Table / ActionCell` | 3320:262, 3351:197 | Identical props; 3320:262 sits in the reference container. Pick one per product and cite its id |
| `Chart / Line`, `Chart / Bar`, `Chart / Area`, `Chart / Scatter`, `Chart / Combo`, `Chart / Candlestick`, `Chart / Waterfall` | atom (marks only) and organism (full chart, `Direction` x `State`) | Full chart → the organism (4153:3047 Line, 4154:3047 Bar, 4154:3048 Area, 4154:3051 Scatter, 4160:3165 Combo, 4154:3049 Candlestick, 4160:3166 Waterfall). Marks for a custom `Chart / ChartContainer` → the atom |
| `Issuance Row` vs `Issuance Row · Arabic` | 4059:117428, 4089:2079 | New screens → `Issuance Row` `Language=RTL`; the standalone Arabic copy is for legacy screens |
| `Goal-Card`, `Goal card`, `GoalCard` | 08f, wip | Legacy goal sets on a wip page; not for new work |


---

# Components: catalog

<!-- syntropy-lint-disable eastern-arabic-numerals: variant values are copied verbatim from Figma -->
# Syntropy component catalog

Every component in the Syntropy library, grouped by family and page: exact name, Figma id, level, library status, variant properties (values verbatim, typos included), other properties and a one-line description. Open it to confirm a name or a variant value before you write it down.

> Generated by `scripts/build-catalog.mjs` from the component index and descriptions. Do not edit by hand; rerun the script.

Source: Syntropy - Safqah Design System 2.0.0 (file `a7Z956YZy9n6f9uz5DK16Y`), index updated 2026-10-15T15:57:03Z. 85 pages, 320 component sets, 34 standalone components. Not in the published library: 64 sets and 5 standalone components (marked **no**).

How to read a row:
- **Library**: `yes` = in the published Syntropy library; **no** = exists only inside the Syntropy file (see `unpublished.md`).
- **Level**: atom, molecule or organism (from the descriptions). Compose upward; never rebuild a lower level inline.
- **Variant properties**: Figma property name and its values exactly as Figma spells them. Copy them verbatim.
- **Other properties**: booleans, text and instance swaps by Figma name. Code names are in `references/data/components-index.json` (`canonical`).
- Names flagged *duplicate name* exist twice: always cite the id.

## 02 Actions

### 02a Button

Page status: stable · guide `references/data/components/button.md` · reference image `references/data/examples/button/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Button` | 417:2 | organism | yes | `Variant`=primary / secondary / tertiary / destructive / error / text<br>`Size`=lg / md / sm<br>`State`=default / hover / pressed / focused / disabled / loading<br>`Direction`=ltr / rtl | Label (text), Has icon leading (bool), Has icon trailing (bool), Icon leading (swap), Icon trailing (swap) | The labelled action control that every transactional moment in Safqah routes through (invest, reserve, withdraw, confirm, cancel). Six variants encode how loud and how risky the action is. |

### 02b IconButton

Page status: stable · guide `references/data/components/icon-button.md` · reference image `references/data/examples/icon-button/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `IconButton` | 502:729 | organism | yes | `Variant`=primary / secondary / tertiary / destructive / error / text<br>`Size`=lg / md / sm<br>`State`=default / hover / pressed / focused / disabled / loading | Icon (swap) | A square, label-less button carrying one centered icon, with the same six variants and states as Button. Used for compact, unambiguous actions such as closing a sheet, copying an IBAN or opening a more menu. |

### 02c Link

Page status: stable · guide `references/data/components/link.md` · reference image `references/data/examples/link/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Link` | 516:2 | organism | **no** | `Variant`=default / info / danger / inverse / primary / muted<br>`Size`=lg / md / sm<br>`State`=default / hover / pressed / focused / disabled | Label (text), Underline (bool), Has icon leading (bool), Has icon trailing (bool), Icon leading (swap), Icon trailing (swap), Href (text) | Inline underlined text that navigates to another route, URL or document. It moves the user somewhere else and never changes state in the current context. |

### 02d FAB

Page status: stable · guide `references/data/components/fab.md` · reference image `references/data/examples/fab/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `FAB / Standard` | 640:701 | organism | yes | `Variant`=primary / secondary / destructive<br>`Size`=small / default / large<br>`State`=default / hover / pressed / focused / disabled | Icon (swap) | A circular floating action button anchored to the bottom-trailing corner, above scroll content, holding the one most important action of a view as an icon. |
| `FAB / Extended` | 738:1944 | organism | yes | `Variant`=primary / secondary / destructive<br>`State`=default / hover / pressed / focused / disabled<br>`Direction`=ltr / rtl | Label (text), Icon (swap) | A pill-shaped floating action button with a leading icon and a label, used when the single floating screen action needs words to be clear. |

### 02e ButtonGroup

Page status: stable · guide `references/data/components/button-group.md` · reference image `references/data/examples/button-group/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `ButtonGroup` | 792:290 | organism | yes | `Orientation`=horizontal / vertical<br>`Spacing`=tight / default / loose<br>`Alignment`=start / center / end / space-between<br>`Direction`=ltr / rtl | Show Button 1 (bool), Show Button 2 (bool), Show Button 3 (bool), Button 1 (swap), Button 2 (swap), Button 3 (swap) | A chromeless layout container that places two or three Button instances with consistent orientation, spacing, alignment and reading-order direction. |

### 02f SocialButton

Page status: stable · guide `references/data/components/social-button.md` · reference image `references/data/examples/social-button/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `SocialButton` | 805:249 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / hover / pressed / focused / disabled / loading<br>`Direction`=ltr / rtl | Label (text), Icon (swap), Show Icon (bool) | A neutral, brand-agnostic button for third-party identity and sign-in providers, where the provider logo carries the brand. On Safqah it is mainly the «تسجيل الدخول عبر نفاذ» entry for Nafath identity verification. |

## 03 Form & Input

### 03a Input

Page status: stable · guide `references/data/components/input.md` · reference image `references/data/examples/input/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Input` | 828:705 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Show Helper (bool), Label text (text), Helper text (text) | The standard bordered single-line text field with label above and helper or error text below. Used across sign-up, KYC questionnaires, beneficiary details and settings. |
| `Input Underline` | 859:2214 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Label text (text), Helper text (text) | A minimal single-line text field with only a bottom line (and a leading accent on focus) instead of a full border. Used on registration, sign-in and onboarding screens. |
| `Input Label` | 821:17 | atom | yes | `Size`=lg / md / sm<br>`Required`=false / true | Label text (text) | The text label atom placed above input fields, with an optional red asterisk for required fields. |
| `Input Helper Text` | 822:6 | atom | yes | `Tone`=neutral / error | Text (text) | The small text atom under a field for a hint or a validation error message. |
| `Input Value` | 823:14 | atom | yes | `Size`=lg / md / sm<br>`State`=placeholder / value | Text (text) | The text atom inside a field that shows either the muted placeholder or the typed value. |
| `Input Phone Value` | 876:2229 | atom | yes | `Size`=lg / md / sm<br>`State`=placeholder / value<br>`Direction`=ltr / rtl | Country code (text), Phone text (text), Show Dropdown (bool), Show Country (bool) | The value atom for phone fields: a bold country code (default +966) with a chevron and separator, followed by the phone number area. |
| `Input Field` | 826:579 | molecule | yes | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Icon`=none / leading / trailing<br>`Direction`=ltr / rtl | Value (swap), Leading icon (swap), Trailing icon (swap) | The bare bordered input box (value plus optional leading or trailing icon) without label or helper. It is the default slot inside Form Field and the control for inline edit cells. |
| `Input Underline Field` | 857:2088 | molecule | yes | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Icon`=none / leading / trailing<br>`Direction`=ltr / rtl | Value (swap), Leading icon (swap), Trailing icon (swap) | The bare underline-style input box (bottom stroke, leading accent on focus) without label or helper, used inside Input Underline. |
| `Input Phone` | 878:2355 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Label text (text), Helper text (text) | A labelled phone number field with a country code prefix (default +966) and the number area. Used for sign-up, KYC, account recovery and beneficiary contacts. |

### 03b OTPInput

Page status: stable · guide `references/data/components/otp-input.md` · reference image `references/data/examples/otp-input/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `OTP Input` | 923:77 | organism | **no** | `Length`=4 / 6<br>`State`=empty / partial / complete / error / disabled<br>`Size`=lg / md<br>`Direction`=ltr / rtl | OTP code (text) | A row of 4 or 6 square digit boxes for one-time codes, with a clear focus ring on the active box. Used for SMS login OTP, Nafath, 2FA and confirming high-value investments or withdrawals. |

### 03c AmountInput

Page status: stable · guide `references/data/components/amount-input.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Input Amount Value` | 946:480 | atom | yes | `Size`=lg / md / sm<br>`State`=placeholder / value<br>`Direction`=ltr / rtl | Amount (text), Decimals (text) | The SAR amount display atom: Riyal symbol, a large bold integer and small muted decimals, so the figure reads first. |
| `Input Amount` | 952:636 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Label text (text), Helper text (text) | A labelled, taller bordered field for typing a free-form SAR amount, with the amount as the hero and a helper for limits. Used for investment amount, top-up, withdrawal and income fields. |
| `Amount Stepper` | 1010:1401 | organism | yes | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Direction`=ltr / rtl | Show Actions (bool) | A bordered SAR amount with minus and plus buttons on either side, for amounts that move in fixed steps. With Show Actions=false it becomes a read-only amount box. |

### 03d Select

Page status: stable · guide `references/data/components/select.md` · reference image `references/data/examples/select/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Select Underline` | 1065:1128 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Label text (text), Helper text (text) | A Select with only a bottom underline instead of a full border; same behavior and Dropdown Menu, lighter chrome for dense forms. |
| `Select Value` | 1022:57 | atom | yes | `Size`=lg / md / sm<br>`State`=placeholder / value<br>`Direction`=ltr / rtl | Text (text), Show Icon (bool) | The value atom inside a Select: placeholder or chosen value plus the trailing chevron. |
| `Dropdown Item` | 1026:183 | atom | yes | `Size`=lg / md / sm<br>`State`=default / hover / selected / disabled<br>`Direction`=ltr / rtl | Label (text) | One option row in a dropdown list, with a check mark when selected. Shared by Select and Combobox so options look identical. |
| `Dropdown Menu` | 1028:279 | organism | yes | `Size`=lg / md / sm<br>`Direction`=ltr / rtl |  | The floating list of Dropdown Item options that opens from a Select (rendered in an overlay at runtime). |
| `Select` | 1024:183 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / active / focus / error / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Label text (text), Helper text (text) | A bordered picker field that opens a Dropdown Menu to choose one value from a closed list. Used for country, region, payment method, contribution frequency and language. |

### 03e Checkbox

Page status: stable · guide `references/data/components/checkbox.md` · reference image `references/data/examples/checkbox/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Checkbox Indicator` | 1041:57 | atom | yes | `Size`=lg / md / sm<br>`State`=unchecked / hover / focus / checked / indeterminate / disabled-unchecked / disabled-checked |  | The square box atom of a checkbox with checked, indeterminate and disabled visuals. |
| `Checkbox` | 1043:93 | organism | yes | `Size`=lg / md / sm<br>`State`=unchecked / hover / focus / checked / indeterminate / disabled-unchecked / disabled-checked<br>`Direction`=ltr / rtl | Label text (text), Show Helper (bool), Helper text (text) | A labelled checkbox for independent yes or no choices applied on submit, such as accepting terms or multi-select filters. |
| `Checkbox Group` | 3921:241732 | organism | yes | `Size`=lg / md / sm<br>`Direction`=ltr / rtl |  | A group label, a vertical stack of Checkbox items and a helper line for multi-select questions. |

### 03f Radio

Page status: stable · guide `references/data/components/radio.md` · reference image `references/data/examples/radio/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Radio Group` | 1086:177 | organism | **no** | `Size`=lg / md / sm<br>`Direction`=ltr / rtl | Group label text (text), Show Helper (bool), Helper text (text) | A group label with 2 to 6 stacked Radio items where exactly one is selected. |
| `Radio Indicator` | 1081:57 | atom | yes | `Size`=lg / md / sm<br>`State`=unselected / hover / focus / selected / disabled-unselected / disabled-selected |  | The circle atom of a radio button with a green dot when selected. |
| `Radio` | 1083:69 | organism | yes | `Size`=lg / md / sm<br>`State`=unselected / hover / focus / selected / disabled-unselected / disabled-selected<br>`Direction`=ltr / rtl | Label text (text), Show Helper (bool), Helper text (text) | A single labelled radio option, always used inside a group of two or more mutually exclusive choices. |

### 03g Switch

Page status: stable · guide `references/data/components/switch.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Switch Indicator` | 1099:57 | atom | yes | `Size`=lg / md / sm<br>`State`=off / on / hover-off / hover-on / focus-off / focus-on / disabled-off / disabled-on |  | The pill track and sliding thumb atom of a switch (thumb right means on in both directions). |
| `Switch` | 1101:105 | organism | yes | `Size`=lg / md / sm<br>`State`=off / on / hover-off / hover-on / focus-off / focus-on / disabled-off / disabled-on<br>`Direction`=ltr / rtl | Label text (text), Show Helper (bool), Helper text (text) | A labelled on/off toggle that applies the setting immediately with no submit button. |

### 03h Slider

Page status: stable · guide `references/data/components/slider.md` · reference image `references/data/examples/slider/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Slider Field` | 1121:225 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / hover / focus / error / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Label text (text), Show Helper (bool), Helper text (text), Show Tooltip (bool) | A Slider wrapped with a label and helper for picking an approximate value within a range, with error messaging. |
| `Slider` | 1117:57 | molecule | yes | `Size`=lg / md / sm<br>`State`=default / hover / focus / error / disabled<br>`Direction`=ltr / rtl | Show Tooltip (bool), Value text (text) | The bare slider control (track, fill, thumb, optional value tooltip) for layouts that provide their own label. |

### 03i FileUpload

Page status: stable · guide `references/data/components/file-upload.md` · reference image `references/data/examples/file-upload/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `File Item` | 1138:63 | atom | yes | `State`=ready / error / uploaded<br>`Direction`=ltr / rtl | Filename (text), File size (text), Action text (text) | Bare file metadata: filename, size and one action link (View file or Retry), with no card chrome. |
| `Upload Button` | 1141:63 | molecule | yes | `State`=default / hover / focus / disabled<br>`Direction`=ltr / rtl | Button label (text), Hint text (text), Show hint (bool), Show Delete (bool) | A compact attach-file trigger with paperclip, label and a supported-formats hint that opens the file picker. |
| `File Item with Progress` | 1147:63 | organism | yes | `State`=progress / complete / error / uploaded<br>`Direction`=ltr / rtl | Filename (text), File size (text) | A file card showing upload progress, success, error with Retry, or the uploaded state with View file and remove actions. |

### 03j FormField

Page status: stable · guide `references/data/components/form-field.md` · reference image `references/data/examples/form-field/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Form Field Helper` | 1174:63 | atom | yes | `Tone`=neutral / error / success / info<br>`Size`=md / sm<br>`Direction`=ltr / rtl | Helper text (text) | Helper text with tone color and icon (neutral, error, success, info) shown under a form control. |
| `Form Field Label` | 1169:63 | atom | **no** | `Size`=lg / md / sm<br>`Required`=false / true<br>`Tooltip`=false / true<br>`Direction`=ltr / rtl | Label text (text), Show Required (bool), Show Tooltip (bool) | The direction-aware form label atom with optional required asterisk and info tooltip icon; supersedes Input Label for new layouts. |
| `Form Field` | 1177:453 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / error / success / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Label text (text), Show Helper (bool) | The layout wrapper that stacks Form Field Label, a swappable control slot and Form Field Helper so any input shares the same label and validation chrome. |

### 03k DatePicker & TimePicker

Page status: stable · guide `references/data/components/date-picker-time-picker.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Date Input` | 1217:63 | atom | yes | `Size`=lg / md / sm<br>`State`=default / filled / hover / focus / error / disabled<br>`Direction`=ltr / rtl | Value text (text) | A field with a calendar icon that shows a date and opens Date Wheel Picker on mobile or Date Calendar Picker on web. |
| `Date Wheel Picker` | 1219:87 | organism | yes | `Mode`=single-date / date-range / time / datetime<br>`Direction`=ltr / rtl |  | The mobile wheel picker opened as a sheet from Date Input, for dates, times or both, committed with an Apply button. |
| `Date Calendar Picker` | 1228:321 | organism | yes | `Mode`=single / range / multi<br>`Direction`=ltr / rtl |  | The web month-grid calendar popover opened from Date Input, for single, range or multi-date selection. |
| `Date Range Field` | 1230:801 | organism | yes | `Size`=lg / md / sm<br>`State`=default / filled / focus / error / disabled<br>`Direction`=ltr / rtl |  | Two Date Inputs side by side (من / إلى) for a start and end date, each opening its own picker. This is the Safqah range pattern on mobile and web. |

### 03m Search

Page status: stable · guide `references/data/components/search.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Search Input` | 1241:63 | atom | **no** | `Size`=lg / md / sm<br>`State`=default / filled / hover / focus / error / disabled<br>`Direction`=ltr / rtl | Value text (text) | A search field with a leading magnifier and a clear X when it has text. Used above lists to filter or as the top of Search Dropdown. |
| `Search Result Item` | 1244:63 | atom | yes | `Type`=default / with-meta / with-icon / recent<br>`State`=default / hover / selected<br>`Direction`=ltr / rtl |  | One result row in Search Dropdown: title only, with subtitle, with icon, or a recent search. |
| `Search Dropdown` | 1256:171 | organism | yes | `State`=results / empty / loading / recent<br>`Direction`=ltr / rtl |  | The floating search panel: Search Input on top with results, empty, loading or recent states below. Used for global search and typeahead. |
| `Compact Search Trigger` | 1264:171 | molecule | yes | `State`=collapsed / hover / expanded<br>`Direction`=ltr / rtl |  | An icon-only search trigger for headers that expands into a full search field (with a keyboard shortcut hint on desktop). |

### 03n TextArea

Page status: stable · guide `references/data/components/text-area.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `TextArea Field` | 1281:63 | atom | yes | `Size`=lg / md / sm<br>`State`=default / filled / hover / focus / error / disabled<br>`Direction`=ltr / rtl | Value text (text) | The bare bordered multi-line input box with auto-expand and a vertical resize handle, without label or helper. |
| `TextArea` | 1285:311 | organism | **no** | `Size`=lg / md / sm<br>`State`=default / filled / focus / error / disabled<br>`Direction`=ltr / rtl | Show Label (bool), Label text (text), Show Helper (bool), Show Counter (bool) | A labelled multi-line text field with helper and optional character counter, for descriptions and justifications. |
| `TextArea Underline` | 1287:311 | atom | yes | `Size`=lg / md / sm<br>`State`=default / filled / hover / focus / error / disabled<br>`Direction`=ltr / rtl | Value text (text) | A minimal multi-line input with only a bottom underline, for notes that should recede inside dense layouts. |

### 03o Combobox

Page status: stable · guide `references/data/components/combobox.md` · reference image `references/data/examples/combobox/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Combobox Field` | 3887:1126 | atom | yes | `Size`=lg / md / sm<br>`State`=Default / Focus / Filled<br>`Direction`=ltr / rtl | Text (text) | A typable picker field (editable text, clear X, chevron) that filters a long option list in Combobox Menu. |
| `Combobox Menu` | 3888:1186 | molecule | yes | `Size`=lg / md / sm<br>`State`=Results / No results<br>`Direction`=ltr / rtl |  | The open filtered list of Dropdown Item options under a Combobox Field, with a no-results state. |

### 03p NumericStepper

Page status: stable · guide `references/data/components/numeric-stepper.md` · reference image `references/data/examples/numeric-stepper/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `NumericStepper` | 3902:1186 | organism | yes | `Size`=lg / md / sm<br>`State`=Default / AtMin / AtMax / Disabled<br>`Direction`=ltr / rtl | Value (text) | A compact minus / value / plus control for small integer quantities with min and max clamping. It is not the process Stepper. |

## 04 Data Display

### 04a Tag

Page status: stable · guide `references/data/components/tag.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Tag` | 1306:63 | atom | **no** | `Tone`=neutral / info / success / warning / error / brand<br>`Size`=lg / md / sm<br>`Style`=filled / subtle<br>`Direction`=ltr / rtl | Label (text) | Small static pill that labels a category or short metadata with one of six semantic tones (sector, investor classification, document type, risk level). It is display-only and never interactive. |
| `Tag Removable` | 1311:63 | molecule | **no** | `Tone`=neutral / info / success / warning / error / brand<br>`Size`=lg / md / sm<br>`Direction`=ltr / rtl | Label (text) | Tag with a built-in close X for dismissible filter chips and applied selections, for example an applied sector filter above the deals list. Always subtle style so the X stays visible. |
| `Tag Group` | 1313:89 | molecule | yes | `Layout`=inline / wrap / overflow<br>`Direction`=ltr / rtl |  | Layout container that arranges two or more Tags inline, wrapped, or as the first three plus a +N overflow counter. Spacing between tags is fixed by the component. |

### 04b Status/issuance Badge

Page status: stable · guide `references/data/components/status-issuance-badge.md` · reference image `references/data/examples/status-issuance-badge/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Badge Dot` | 1322:63 | atom | yes | `Tone`=neutral / info / success / warning / error / brand<br>`Size`=md / sm |  | Tiny colored dot with no text that signals presence or unread state, such as an online indicator or a new-activity mark on a tab. |
| `Badge Count` | 1324:63 | atom | **no** | `Tone`=neutral / info / success / warning / error / brand<br>`Size`=lg / md / sm<br>`Direction`=ltr / rtl | Count (text) | Small numeric counter pill (3, 12, 99+) anchored to an icon or tab to show how many items need attention. Direction flips its anchor corner. |
| `IssuanceStatusBadge (Investor)` | 1485:151 | atom | yes | `Status`=Reserved / Confirmed / Funded / Active / Matured / Late / Defaulted / Funding Failed / ... +7 more<br>`Direction`=LTR / RTL |  | Locked-copy lifecycle badge that shows investors where a deal (issuance) sits: Reserved, Raising/Confirmed, Fully Funded, Active, Matured, Repayment Due, Late, Defaulted, Completed and so on. |
| `IssuanceStatusBadge (Developer)` | 1486:171 | atom | yes | `Status`=ListingPreparation / PendingLaunch / Scheduled / BookBuilding / Raising / Funded / PendingDrawdown / Active / ... +11 more<br>`Direction`=LTR / RTL |  | Lifecycle badge set for the developer portal, covering the 19 statuses developers see, including operational ones investors never see (ListingPreparation, PendingLaunch, PendingDrawdown "Transfer in progress", Repayme... |
| `IssuanceStatusBadge (Internal)` | 1487:107 | atom | yes | `Status`=ReadyForListing / PendingApproval / Rejected / ReservationsAllocated / OnHold / Dispute |  | Admin-only lifecycle badge for six internal states (ReadyForListing, PendingApproval, Rejected, ReservationsAllocated, OnHold, Dispute), English only and never user-facing. |
| `illustrations` | 1552:50025 | atom | yes | `Property 1`=Scheduled / Defaulted / In recovery / Repayment due / Matured / Active / Preparing / Raising<br>`Alignment`=Right / Left |  | Small isometric Isocon glyph set for deal lifecycle phases (Scheduled, Raising, Preparing, Active, Matured, Repayment due, In recovery, Defaulted), each with Right or Left alignment for RTL/LTR. |

### 04c Avatar

Page status: stable · guide `references/data/components/avatar.md` · reference image `references/data/examples/avatar/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AvatarWithStatus` | 1374:14 | molecule | yes | `Status`=online / away / busy / offline<br>`Size`=sm / md / lg |  | Avatar with a Badge Dot overlay showing online, away, busy or offline presence, at sm/md/lg only. |
| `AvatarStack` | 1382:53 | molecule | yes | `Count`=2 / 3 / 4 / 5+<br>`Size`=sm / md / lg |  | Overlapping group of 2 to 4 avatars with a +N counter for overflow, used to show social proof such as how many investors committed to a deal. |
| `Avatar` | 1372:2 | atom | yes | `Type`=Photo / Initials / Icon / Placeholder<br>`Size`=xs / sm / md / lg / xl<br>`Shape`=Circle / Rounded |  | Single user or organization picture with a fallback chain Photo, Initials, Icon, Placeholder. Circle means a person (investor, admin), Rounded means an entity (developer company, bank, Safqah). |

### 04d Tooltip

Page status: stable · guide `references/data/components/tooltip.md` · reference image `references/data/examples/tooltip/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Tooltip` | 1624:162 | molecule | yes | `Placement`=top / right / bottom / left<br>`Size`=sm / md<br>`HasTitle`=true / false<br>`HasIcon`=true / false<br>`Direction`=LTR / RTL | icon (swap) | Light bordered bubble with an arrow that appears on hover, focus or long-press to explain an icon, term or number. Supplementary only and never interactive. |

### 04e StatusPill

Page status: stable · guide `references/data/components/status-pill.md` · reference image `references/data/examples/status-pill/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `StatusPill` | 1654:178 | atom | yes | `Tone`=neutral / info / success / warning / error / brand<br>`Variant`=subtle / solid<br>`Size`=sm / md<br>`HasIcon`=true / false<br>`Direction`=LTR / RTL | icon (swap) | Read-only pill that labels an attribute or state outside the deal lifecycle (Verified, KYC complete, Pending review, Sharia-certified, Featured) with a semantic tone and optional leading icon. |

### 04f Stat

Page status: stable · guide `references/data/components/stat.md` · reference image `references/data/examples/stat/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Stat` | 1678:598 | molecule | yes | `Size`=sm / md / lg<br>`Layout`=vertical / horizontal<br>`HasIcon`=true / false<br>`HasDelta`=true / false<br>`HasHelperText`=true / false<br>`Direction`=LTR / RTL |  | One headline KPI with label, display-size value, optional icon, optional delta StatusPill and optional helper text, for example Total invested 1.2M with ↑ 12% vs last quarter. |

### 04g KeyValue

Page status: stable · guide `references/data/components/key-value.md` · reference image `references/data/examples/key-value/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `KeyValue` | 1739:122 | molecule | yes | `Layout`=horizontal / stacked<br>`Size`=sm / md / lg<br>`Emphasis`=default / strong<br>`HasIcon`=true / false<br>`Direction`=LTR / RTL | icon (swap), label (text), value (text) | Body-size label and value pair for lookup facts in detail panels and receipts: issuance ID, profit rate, maturity, trustee, transfer reference. Optional trailing icon for info, copy, link or chevron. |

### 04h Divider

Page status: stable · guide `references/data/components/divider.md` · reference image `references/data/examples/divider/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Divider` | 1767:2 | atom | yes | `Orientation`=horizontal / vertical<br>`Variant`=solid / dashed<br>`Tone`=subtle / default / strong |  | One-pixel line, horizontal or vertical, solid or dashed, in subtle/default/strong tone, that separates rows or sections when whitespace is not enough. |

### 04i Timeline

Page status: stable · guide `references/data/components/timeline.md` · reference image `references/data/examples/timeline/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `TimelineNode` | 1823:18 | atom | yes | `Orientation`=vertical / horizontal<br>`State`=completed / active / upcoming / skipped<br>`HasConnectorAbove`=true / false<br>`HasConnectorBelow`=true / false | icon (swap) | Timeline dot with optional connectors above and below, in completed, active, upcoming or skipped state, with a swappable inner glyph (check, Riyal, clock). |
| `TimelineRow` | 1836:306 | molecule | yes | `Orientation`=vertical / horizontal<br>`HasAmount`=true / false<br>`HasDescription`=true / false<br>`HasDate`=true / false<br>`Direction`=LTR / RTL | title (text), date (text), description (text), amount (text), node (swap) | One event in a timeline: a TimelineNode beside title, date, optional description and optional amount. Stack rows with zero spacing to build a payout schedule, KYC progress or audit trail. |

### 04j ProgressBar

Page status: stable · guide `references/data/components/progress-bar.md` · reference image `references/data/examples/progress-bar/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `ProgressBar` | 1873:2 | atom | yes | `Size`=sm / md / lg<br>`Tone`=brand / success / warning / error / neutral<br>`Direction`=LTR / RTL | Label (text), Value (text), showLabel (bool) | Linear bar that fills to a known percentage, with an optional label row (Label, Value). The core use is deal funding progress such as 78% funded, plus profile completion and uploads. |
| `MilestoneProgress` | 1919:434 | molecule | yes | `Size`=Small / Large<br>`Value`=0 / 25 / 50 / 75 / 100 / fullGift / fullParty<br>`Direction`=LTR / RTL | icon1 (swap), icon2 (swap), icon3 (swap), icon4 (swap) | Rich milestone bar with four swappable milestone icons, gradient fill, knob and a reward end-cap, built for profile completion journeys (profile, KYC, preferences, email) that end in a reward. |
| `ProgressBar_Indeterminate` | 2327:2 | atom | yes | `Size`=sm / md / lg<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate linear bar that sweeps continuously (Phase 0 to 3 loop) when an operation is running but progress cannot be measured. |

### 04k Chart

Page status: stable · guide `references/data/components/chart.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Chart / Gridlines` | 4102:1065 | atom | yes | `Direction`=horizontal / vertical<br>`Density`=sparse / default |  | Background gridlines for a plot area (horizontal or vertical, sparse or default density) drawn in the neutral border/subtle token so they recede behind data. |
| `Chart / Axis` | 4102:1138 | atom | yes | `Direction`=LTR / RTL<br>`Orientation`=x / y<br>`LabelBehavior`=full / abbreviated / rotated |  | X or Y axis with ticks and labels in neutral tokens, with full, abbreviated or rotated label behavior; in RTL the y-axis moves right while time still runs left to right. |
| `Chart / ReferenceLine` | 4103:1058 | atom | yes | `Direction`=LTR / RTL<br>`Orientation`=h / v<br>`Style`=solid / dashed |  | Horizontal or vertical solid or dashed line marking a meaningful value such as a target return, average, or today. Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / Crosshair` | 4103:1067 | atom | yes | `Direction`=LTR / RTL<br>`Axis`=x / y / both |  | Crosshair overlay on x, y or both axes showing the pointer position across the plot. Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / Legend` | 4104:1068 | molecule | yes | `Direction`=LTR / RTL<br>`Orientation`=horizontal / vertical |  | Series key with color swatches and labels, horizontal or vertical, mirrored in RTL; hidden series appear struck through. Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / ChartTooltip` | 4104:1128 | molecule | yes | `Direction`=LTR / RTL<br>`Mode`=single / multi-series<br>`ShowTotal`=true / false |  | Hover readout card for charts showing period, series swatch, value and Riyal icon, in single or multi-series mode with an optional Total (الإجمالي) row. |
| `Chart / ChartContainer` | 4105:1306 | molecule | yes | `Density`=comfortable / compact<br>`Direction`=LTR / RTL | showGrid (bool), showAxis (bool), showLegend (bool), showTooltip (bool), showDataLabels (bool) | Chart card shell with title, subtitle, period selector, plot area and legend, with booleans to toggle grid, axis, legend, tooltip and data labels; comfortable or compact density. |
| `Chart / States` | 4107:1314 | molecule | yes | `Direction`=LTR / RTL<br>`State`=default / loading / empty / error |  | Chart card states: default, loading (grey bars plus spinner), empty (no items yet with button) and error (couldn't load chart with Retry), in LTR and RTL. |
| `Chart / Bar` *(duplicate name)* | 4108:1351 | atom | yes | `Layout`=vertical / horizontal<br>`Grouping`=single / grouped / stacked / stacked100 |  | Plotted bar marks only (no chrome) in vertical or horizontal layout, single, grouped, stacked or 100% stacked, in green shades. |
| `Chart / Line` *(duplicate name)* | 4109:1337 | atom | yes | `Curve`=linear / smooth / stepped<br>`Series`=single / multi |  | Plotted line marks only (no chrome), linear, smooth or stepped, single or multi-series. |
| `Chart / Area` *(duplicate name)* | 4109:1351 | atom | yes | `Grouping`=single / stacked / stacked100 |  | Plotted area marks only (no chrome), single, stacked or 100% stacked, with tinted green fills. |
| `Chart / Pie` | 4110:1267 | atom | yes | `Type`=pie / donut |  | Pie or donut ring marks only, in green shades, for share of a whole with 6 slices or fewer. |
| `Chart / Scatter` *(duplicate name)* | 4110:1303 | atom | yes | `TrendLine`=false / true |  | Scatter dot marks with an optional trend line, for relationships such as risk vs return. |
| `Chart / Sparkline` | 4111:1265 | atom | yes | `Type`=line / bar |  | Tiny line or bar trend without axes, meant to sit next to a number to show direction over time. Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / Combo` *(standalone, duplicate name)* | 4111:1273 | atom | yes |  |  | Combo marks: green bars plus a dark-green line with dots on one shared axis, for two related series. |
| `Chart / Candlestick` *(standalone, duplicate name)* | 4112:1255 | atom | yes |  |  | Candlestick marks showing open, high, low, close per period in green shades. A plot-only building block; Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / Waterfall` *(standalone, duplicate name)* | 4112:1272 | atom | yes |  |  | Waterfall marks: start and end totals in dark green with vivid green increases and darker decreases, joined by connector lines. |
| `Chart / Bar-PnL` *(standalone)* | 4118:1777 | atom | yes |  |  | Gain and loss bar marks around a zero baseline with signed value labels: gains vivid green above, losses dark green below, never red. |
| `Chart / Template-Tufte-Bar` *(standalone)* | 4127:1712 | molecule | yes |  |  | Tufte-style template bar chart: a title that states the insight (Monthly return, March leads at 92%), bars sorted by value, one highlighted bar and the rest light green, minimal axis. |
| `Chart / Template-Tufte-Sparkline` *(standalone)* | 4127:1735 | molecule | yes |  |  | Tufte-style KPI template: label, big value with Riyal icon, area sparkline with end dot and a signed delta (Revenue 4.2M, +12%). |
| `Chart / HoverDot` | 4146:2491 | atom | yes | `State`=Active / Rest |  | Active or resting marker dot drawn on the hovered data point. Part of the chart hover-interaction spec; Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / CrosshairGuide` | 4146:2496 | atom | yes | `Orientation`=Vertical / Horizontal |  | Dashed vertical or horizontal guide line through the hovered point. Part of the chart hover-interaction spec; Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / ValueFlag` | 4146:2515 | atom | yes | `Pointer`=Down / Left |  | Green value flag (pointer down or left) that shows the hovered value with Riyal icon, such as 4.20M. |
| `Chart / HoverBand` *(standalone)* | 4146:2516 | atom | yes |  |  | Tinted vertical band highlighting a whole group or period on group hover. Part of the chart hover-interaction spec; Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / AxisTickActive` *(standalone)* | 4146:2517 | atom | yes |  |  | Highlighted axis tick label (green pill) for the hovered period, such as Aug. Part of the chart hover-interaction spec; Semantic tokens only, green-first palette, Western numerals, time axis left to right even in RTL. |
| `Chart / HoverIndicator` *(standalone)* | 4147:2491 | molecule | yes |  |  | Single-point hover assembly: dashed guide, active marker, value flag and active axis tick, as used in every chart Hover state. |
| `Chart / Line` *(duplicate name)* | 4153:3047 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full line chart organism: header, axes, grid, green line series and hover, for a value over time (multi-hue allowed for overlapping series). |
| `Chart / Bar` *(duplicate name)* | 4154:3047 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full bar chart organism for comparing categories or periods, with axes, grid, legend and hover. |
| `Chart / Area` *(duplicate name)* | 4154:3048 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full area chart organism for magnitude or cumulative value over time, tinted green fill under the line. |
| `Chart / Candlestick` *(duplicate name)* | 4154:3049 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full candlestick chart organism for open/high/low/close movement per period, in green shades. |
| `Chart / Donut` | 4154:3050 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full donut chart organism for share of a whole (6 slices or fewer) with legend and center total. |
| `Chart / Scatter` *(duplicate name)* | 4154:3051 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full scatter chart organism for the relationship between two measures. |
| `Chart / Combo` *(duplicate name)* | 4160:3165 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full combo chart organism: bars and a line sharing one honest axis. |
| `Chart / Waterfall` *(duplicate name)* | 4160:3166 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full waterfall chart organism showing a running total broken into positive and negative contributions. |
| `Chart / Stacked` | 4161:3193 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Full stacked bar chart organism for composition per group. |
| `Chart / KPI strip` | 4161:3194 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Dashboard KPI organism: a grid of headline numbers each with delta and sparkline (Platform overview), with hover readouts. |
| `Chart / Line · Mobile` | 4163:3178 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Line with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / Area · Mobile` | 4163:3179 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Area with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / Bar · Mobile` | 4163:3180 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Bar with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / Donut · Mobile` | 4164:3205 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Donut with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / Scatter · Mobile` | 4164:3206 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Scatter with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / Combo · Mobile` | 4164:3207 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Combo with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / Candlestick · Mobile` | 4165:3290 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Candlestick with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / Waterfall · Mobile` | 4165:3291 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Waterfall with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / Stacked · Mobile` | 4165:3292 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | 343-wide mobile version of Chart / Stacked with a real reflow (narrower plot, three axis labels, stacked header) and the same Direction x State matrix. |
| `Chart / KPI list · Mobile` | 4165:3293 | organism | yes | `Direction`=LTR / RTL<br>`State`=Default / Hover / Group hover |  | Mobile KPI organism: a single-column list of KPIs, each with label, value, delta and sparkline, the phone reflow of Chart / KPI strip. |

## 05 Feedback

### 05a Alert

Page status: stable · guide `references/data/components/alert.md` · reference image `references/data/examples/alert/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Alert` | 1950:212 | molecule | yes | `Tone`=info / success / warning / error / neutral<br>`Style`=Filled / Outlined / Plain<br>`Direction`=LTR / RTL | title (text), description (text), linkText (text), buttonLabel (text), showDescription (bool), showLink (bool), showButton (bool), showClose (bool), closeIcon (swap) | Inline in-page message with tone icon, title, optional description, link, action chip and close, in Filled, Outlined or Plain style. It sits inside content and persists until dismissed or resolved. |

### 05b Toast

Page status: stable · guide `references/data/components/toast.md` · reference image `references/data/examples/toast/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Toast` | 1964:142 | molecule | yes | `Tone`=info / success / warning / error / neutral<br>`Size`=Large / Small<br>`Direction`=LTR / RTL | title (text), description (text), showDescription (bool), showClose (bool), closeIcon (swap) | Floating pill that confirms something just happened and auto-dismisses after a few seconds; no links or buttons by design. |

### 05c Banner

Page status: stable · guide `references/data/components/banner.md` · reference image `references/data/examples/banner/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Banner` | 1993:212 | molecule | yes | `Tone`=info / success / warning / error / neutral<br>`Style`=Filled / Outlined / Elevated<br>`Direction`=LTR / RTL | title (text), description (text), linkText (text), buttonLabel (text), showDescription (bool), showLink (bool), showButton (bool), showClose (bool), closeIcon (swap), Show Title (bool) | Large page-level notification with icon circle, title, description, optional link, solid action pill and close, in Filled, Outlined or Elevated style. One per screen; also the preferred mobile RTL alert surface. |

### 05d EmptyState

Page status: stable · guide `references/data/components/empty-state.md` · reference image `references/data/examples/empty-state/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `EmptyState` | 2066:434 | organism | yes | `Tone`=default / search / error<br>`Size`=Default / Compact<br>`Direction`=LTR / RTL | title (text), description (text), linkText (text), showDescription (bool), showButton (bool), showLink (bool) | Centered placeholder that replaces content when a list or view has nothing to show after loading: illustration, title, description, optional primary Button and link. |
| `Illustrations` | 2071:38797 | atom | yes | `Property 1`=Scheduled / Defaulted / In recovery / Repayment due / Matured / Active / Preparing / Raising / ... +25 more<br>`Alignment`=Right / Left |  | Library of 33 isometric Safqah Isocon illustrations (lifecycle phases plus themes like Bank, Face ID, Light bulb, Diamond, Info), each with Right or Left alignment, used as artwork in empty states and feature moments. |
| `Empty Illustration / default / Default` *(standalone)* | 2083:647 | atom | yes |  |  | Source illustration slot for EmptyState Tone=default, Size=Default: the Scheduled camera Isocon on a concentric-circle backdrop (240px box, art scaled to 132px). Editing it updates every EmptyState variant that uses it. |
| `Empty Illustration / search / Default` *(standalone)* | 2083:659 | atom | yes |  |  | Source illustration slot for EmptyState Tone=search, Size=Default: the Preparing coin-grid Isocon on a concentric-circle backdrop (240px box, art scaled to 132px). |
| `Empty Illustration / error / Default` *(standalone)* | 2083:671 | atom | yes |  |  | Source illustration slot for EmptyState Tone=error, Size=Default: the Defaulted crossed-circle Isocon on a concentric-circle backdrop (240px box, art scaled to 132px). |
| `Empty Illustration / default / Compact` *(standalone)* | 2083:688 | atom | yes |  |  | Source illustration slot for EmptyState Tone=default, Size=Compact: the Scheduled camera Isocon on a concentric-circle backdrop (160px box, art scaled to 88px). Editing it updates every EmptyState variant that uses it. |
| `Empty Illustration / search / Compact` *(standalone)* | 2083:700 | atom | yes |  |  | Source illustration slot for EmptyState Tone=search, Size=Compact: the Preparing coin-grid Isocon on a concentric-circle backdrop (160px box, art scaled to 88px). Editing it updates every EmptyState variant that uses it. |
| `Empty Illustration / error / Compact` *(standalone)* | 2083:712 | atom | yes |  |  | Source illustration slot for EmptyState Tone=error, Size=Compact: the Defaulted crossed-circle Isocon on a concentric-circle backdrop (160px box, art scaled to 88px). |

### 05e Skeleton

Page status: stable · guide `references/data/components/skeleton.md` · reference image `references/data/examples/skeleton/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `SkeletonLine` | 2156:2 | atom | yes | `Size`=Small / MD / Large / XLarge<br>`Width`=Full / 3Q / Half / Quarter / Auto |  | Pill-shaped grey placeholder for a text line while data loads, sized to the text it replaces (Small 12 to XLarge 28) at Full, 3Q, Half, Quarter or Auto width. |
| `SkeletonBlock` | 2158:2 | atom | yes | `Radius`=None / Small / Medium / Large / XLarge |  | Rectangular placeholder for images, charts, cards or buttons during loading, with Radius None to XLarge matching the real element. |
| `SkeletonCircle` | 2158:3 | atom | yes | `Size`=XS / S / M / L / XL / XXL |  | Circular placeholder from 16 to 72px for icons, status dots or small round elements while loading. |
| `SkeletonAvatar` | 2158:4 | atom | yes | `Size`=S / M / L<br>`Shape`=Circle / Square |  | Avatar-shaped placeholder at S, M, L in Circle (people) or Square (organizations) while profile data loads. |

### 05f Loader (Spinner)

Page status: stable · guide `references/data/components/loader.md` · reference image `references/data/examples/loader/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `SpinnerRing` | 2188:2 | atom | yes | `Size`=XS / S / M / L / XL<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate loader: the canonical Syntropy spinner: a 270 degree brand-green arc that rotates. Use it for about 95% of indeterminate waits; pick one spinner style per surface and keep it consistent. |
| `SpinnerPulseRings` | 2188:6 | atom | yes | `Size`=XS / S / M / L / XL<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate loader: three concentric rings expanding and fading, reading as scanning or detecting. Reserve for scanning or polling contexts; pick one spinner style per surface and keep it consistent. |
| `SpinnerDotOrbit` | 2188:3 | atom | yes | `Size`=XS / S / M / L / XL<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate loader: three dots orbiting with fading trails. For chat and messaging contexts; pick one spinner style per surface and keep it consistent. |
| `SpinnerWaveBars` | 2188:4 | atom | yes | `Size`=XS / S / M / L / XL<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate loader: five bars in an equalizer wave. For audio or media contexts; pick one spinner style per surface and keep it consistent. |
| `SpinnerBouncingDots` | 2188:5 | atom | yes | `Size`=XS / S / M / L / XL<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate loader: three dots bouncing in sequence, a typing indicator. For typing or AI-response-pending states; pick one spinner style per surface and keep it consistent. |
| `SpinnerSquareMorph` | 2188:7 | atom | yes | `Size`=XS / S / M / L / XL<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate loader: a rotating rounded square, a non-circular alternative to Ring. When the surrounding UI is full of circles; pick one spinner style per surface and keep it consistent. |
| `SpinnerHourglass` | 2188:8 | atom | yes | `Size`=XS / S / M / L / XL<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate loader: a rotating hourglass that signals time passing. For deliberate, slower waits; pick one spinner style per surface and keep it consistent. |
| `SpinnerSafqahBrand` | 2188:9 | atom | yes | `Size`=XS / S / M / L / XL<br>`Phase`=0 / 1 / 2 / 3 |  | Indeterminate loader: three stacked coin discs with the top coin rising, the branded Safqah loader. Reserve for branded full-screen moments; pick one spinner style per surface and keep it consistent. |

### 05g Progress

Page status: stable · guide `references/data/components/progress.md` · reference image `references/data/examples/progress/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `ProgressSegment` | 1878:2 | atom | yes | `State`=filled / empty<br>`Size`=sm / md |  | One filled or empty segment; several in a row form the segmented Progress pattern for discrete steps like 5 of 7 documents uploaded. |

### 05h Dialog

Page status: stable · guide `references/data/components/dialog.md` · reference image `references/data/examples/dialog/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Dialog` | 2359:2 | organism | yes | `Size`=sm / md / lg<br>`Tone`=default / destructive<br>`Direction`=LTR / RTL | Title (text), Description (text), showIcon (bool), showClose (bool), showCancel (bool), showDescription (bool), showImage (bool), showContent (bool) | Centered modal card that pauses the screen for one considered decision: optional tone icon or hero image, title, description, optional content slot, Cancel and Confirm. |

### 05i Popover

Page status: stable · guide `references/data/components/popover.md` · reference image `references/data/examples/popover/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Popover` | 3927:1106 | molecule | yes | `Placement`=top / right / bottom / left<br>`Direction`=ltr / rtl |  | Click or tap anchored floating panel with title, close, body and an action or link, built on the Tooltip bubble and arrow. Non-blocking: dismiss on outside tap or Esc. |

## 06 Navigation

### 06a AppBar

Page status: stable · guide `references/data/components/app-bar.md` · reference image `references/data/examples/app-bar/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppBar` | 2447:2 | organism | **no** | `Type`=main screens / Inner screens / Small Title / Deal page-detail / Deal page / Large Icons / Deal page-collapsing / Close Icon-white / Close Icon-Black / main screens-green / Onboarding<br>`Direction`=LTR / RTL | Title (text), Subtitle (text), Balance (text), TrailingLabel (text), showSubtitle (bool), showLeading (bool), showTrailing (bool), showBalance (bool), showProfile (bool), showEyeButton (bool), hideBalance (bool), hasShade (bool), hasDivider (bool) | The top header of every Safqah app screen: page title, leading back/close control and trailing actions, with 11 legacy layout types (home greeting with wallet balance, inner screens, deal page, onboarding, modal close). |
| `Header Info` | 4844:107432 | organism | yes | `Property 1`=Default<br>`Direction`=rtl / ltr | Show Payouts list (bool) | Home header variant that extends the main-screens AppBar with a returns summary: greeting, masked wallet balance, total returns and expected profit, amount invested and a View payouts list button. |
| `Header` | 4844:107612 | organism | **no** | `State`=Default / Hide<br>`Language`=Arabic / English | Show Qualified (bool) | Product header set (not published to the library) used as the home greeting header and composed inside HeaderCard; State switches between visible and hidden balance and Show Qualified adds the qualified-investor badge. |

### 06b TabBar

Page status: stable · guide `references/data/components/tab-bar.md` · reference image `references/data/examples/tab-bar/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `TrendBadge` | 2517:30 | atom | yes | `Direction`=LTR / RTL<br>`Tone`=positive / negative | Value (text) | Small delta badge showing a percentage change with a green up or red down marker. Used beside a tab label, in portfolio table cells and anywhere a change value needs directional colour. |
| `SegmentedTabItem` | 2518:62 | atom | yes | `State`=active / inactive<br>`HasTrend`=false / true<br>`Direction`=LTR / RTL | Label (text) | One tab of SegmentedTabs: a 16px SemiBold label with an underline when active and an optional TrendBadge. Its state is driven by the parent organism. |
| `BottomNavTabItem` | 2522:26 | atom | yes | `State`=active / inactive<br>`Direction`=LTR / RTL | Label (text) | One destination of the bottom TabBar: 24px icon stacked over an 11px label, brand colour when active and muted when inactive. Also the DNA reused by NavRailItem. |
| `TabBar` | 2527:350 | organism | yes | `Active`=1 / 2 / 3 / 4<br>`Direction`=LTR / RTL |  | Fixed bottom navigation for the four-section Safqah app (Home, Investments, Wallet, Account) with exactly one active tab. The 4-tab IA is future: keep it in designs but do not wire into production until the IA ships. |
| `TabBar (3-tab)` | 2568:739 | organism | yes | `Active`=1 / 2 / 3<br>`Direction`=LTR / RTL |  | Bottom navigation for the current three-section Safqah app (Deals, Portfolio, Settings), one tab always active in brand colour. |
| `SegmentedTabs` | 2523:90 | organism | yes | `Active`=1 / 2<br>`Direction`=LTR / RTL |  | Underline tabs placed directly below the AppBar to switch between two content views of one screen, such as Active vs Completed investments. Navigation-like (changes the view), not a form control. |

### 06c BottomSheet

Page status: stable · guide `references/data/components/bottom-sheet.md` · reference image `references/data/examples/bottom-sheet/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `DragHandle` *(standalone)* | 2542:2 | atom | yes |  |  | The grabber pill at the top of a BottomSheet that signals the sheet can be dragged down to dismiss. |
| `SheetHeader` | 2615:13 | molecule | yes | `Direction`=LTR / RTL | showSubtitle (bool), showClose (bool) | Shared overlay header with title, optional subtitle and optional close X, reused by BottomSheet, Modal and Drawer. |
| `Sheet Content / Text` | 2628:14 | molecule | yes | `Direction`=LTR / RTL |  | Ready content block for overlay slots: heading, paragraphs and an inline link. The default Content of BottomSheet, used for explanatory sheets such as 'About the developer'. |
| `SheetFooter` | 2633:157 | molecule | yes | `Layout`=Stacked / Row<br>`Direction`=LTR / RTL | showSecondary (bool), showOverflow (bool) | Shared overlay action area: primary button with optional secondary and an optional overflow menu, stacked (mobile sheets, modals) or in a row (drawers). |
| `Sheet Content / Summary` | 2646:149 | molecule | yes | `Direction`=LTR / RTL |  | Overlay content block of KeyValue rows, a Divider and an emphasised total, for receipts and breakdowns. |
| `Sheet Content / Form` | 2649:137 | molecule | yes | `Direction`=LTR / RTL |  | Overlay content block with Input and TextArea fields for collecting a few structured values, or filters in a Drawer. |
| `Sheet Content / Amount` | 2650:98 | molecule | yes | `Direction`=LTR / RTL |  | Overlay content block with an Input Amount field and a Slider for entering an investment or transfer value. |
| `Sheet Content / Empty` | 2650:293 | molecule | yes | `Direction`=LTR / RTL |  | Overlay content block wrapping EmptyState for zero-data or first-run cases inside a sheet or modal. |
| `Sheet Content / List` | 2652:296 | molecule | yes | `Direction`=LTR / RTL |  | Overlay content block of rows with icon, title/subtitle and a Tag chip, for pickers, selection and navigation destinations in drawers. |
| `Sheet Content / Media` | 2686:22 | molecule | yes | `Direction`=LTR / RTL |  | Overlay content block with a 16:9 video or image and caption, built to pair with the Modal xl size. |
| `Sheet Content / Blank` *(standalone)* | 2699:12 | atom | yes |  |  | Empty placeholder for the overlay Content slot ('Your content here'), the default for Modal and Drawer, meant to be swapped for a real component. |
| `BottomSheet` | 2634:273 | organism | yes | `Direction`=LTR / RTL | showHandle (bool), showHeader (bool), showFooter (bool), Content (swap) | Mobile modal surface that slides up from the bottom over a scrim for one short, focused task without leaving the screen: drag handle, SheetHeader, swappable Content slot and SheetFooter. |

### 06d Modal

Page status: stable · guide `references/data/components/modal.md` · reference image `references/data/examples/modal/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Modal` | 2681:503 | organism | yes | `Size`=sm / md / lg / xl<br>`Direction`=LTR / RTL | showHeader (bool), showFooter (bool), Content (swap) | Centered overlay card on a dimmed scrim that blocks the page until the user acts; the web/desktop twin of BottomSheet sharing SheetHeader, SheetFooter and the content library, in four widths. |

### 06e Drawer

Page status: stable · guide `references/data/components/drawer.md` · reference image `references/data/examples/drawer/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Drawer` | 2706:385 | organism | yes | `Side`=left / right<br>`Direction`=LTR / RTL | showHeader (bool), showFooter (bool), Content (swap) | Full-height side panel that slides in from the leading or trailing edge for navigation, filters or contextual detail while the page stays in context. |

### 06f Breadcrumb

Page status: stable · guide `references/data/components/breadcrumb.md` · reference image `references/data/examples/breadcrumb/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `BreadcrumbItem` | 2723:50 | atom | yes | `State`=default / hover / current<br>`Direction`=LTR / RTL | showIcon (bool), Label (text) | One segment of a Breadcrumb trail: a muted link to an ancestor level, brand and underlined on hover, or the bold non-link current page. |
| `BreadcrumbSeparator` | 2725:20 | atom | yes | `Direction`=LTR / RTL |  | The chevron between breadcrumb items, pointing in the reading direction and mirroring in RTL. |
| `Breadcrumb` | 2726:168 | organism | yes | `Type`=full / collapsed<br>`Direction`=LTR / RTL |  | Single-line trail from the top of the hierarchy to the current page (Home > Investments > Active Deals > Deal #1024) for orientation in deep web and back-office structures. A secondary aid, never the primary navigation. |

### 06g Pagination

Page status: stable · guide `references/data/components/pagination.md` · reference image `references/data/examples/pagination/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `PaginationItem` | 2734:20 | atom | yes | `State`=default / hover / current / disabled | Label (text) | A 36px page number cell (or the ellipsis) used to build Pagination; current page gets the brand fill. |
| `PaginationArrow` | 2735:44 | atom | yes | `Direction`=left / right<br>`State`=default / hover / disabled |  | Previous or next 36px button in Pagination, disabled on the first and last page instead of hidden. |
| `Pagination` | 2736:120 | organism | yes | `Type`=numbered / compact / table<br>`Direction`=LTR / RTL |  | Splits long ordered result sets into pages with prev/next and page numbers, in numbered, compact (Page X of Y) and table footer (rows per page + range) layouts. |

### 06h Stepper

Page status: stable · guide `references/data/components/stepper.md` · reference image `references/data/examples/stepper/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `StepIndicator` | 2746:17 | atom | yes | `State`=completed / current / upcoming / error | Number (text) | 28px step circle of a Stepper: check when completed, brand number when current, outlined number when upcoming, error fill with ! when the step failed. |
| `StepConnector` | 2747:16 | atom | yes | `Orientation`=horizontal / vertical<br>`State`=complete / incomplete |  | Line between step indicators, brand when complete and muted when incomplete, horizontal or vertical, stretching to fill the gap. |
| `Stepper` | 2752:66 | organism | yes | `Orientation`=horizontal / vertical<br>`Direction`=LTR / RTL |  | Process stepper that shows an ordered multi-step flow (Account, Identity, Bank details, Review) with completed, current and upcoming steps. It shows progress through a task; it is not a numeric input. |

### 06i BackButton

Page status: stable · guide `references/data/components/back-button.md` · reference image `references/data/examples/back-button/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `BackButton` | 2772:154 | molecule | yes | `Emphasis`=Standard / On-media<br>`Type`=Label / Icon only<br>`Size`=md / lg / sm<br>`State`=default / hover / pressed / focused / disabled<br>`Direction`=LTR / RTL |  | Preset over Button/IconButton (Variant=tertiary) for returning to the previous screen or step, with a mirrored arrow (Back / رجوع) and an On-media white variant for hero images. |

### 06j NavigationRail/Sidebar

Page status: stable · guide `references/data/components/navigation-rail-sidebar.md` · reference image `references/data/examples/navigation-rail-sidebar/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `NavRailItem` | 2852:101 | molecule | yes | `Layout`=Stacked / Row<br>`State`=active / inactive / hover<br>`Direction`=LTR / RTL | Icon (swap), Show label (bool), Show badge (bool), Show chevron (bool), Show action (bool) | One destination in NavigationRail or AppSidebar: Stacked icon over label when collapsed or Row icon plus title when expanded, with active pill, badge, submenu chevron and overflow action options. |
| `Brand / Safqah Wordmark (Dark)` *(standalone)* | 2887:874 | atom | yes |  |  | The real Safqah wordmark (صفقة المالية), dark variant, pinned at the top of the navigation rail and sidebar. |
| `Icon / nav-toggle-menu` *(standalone)* | 2888:874 | atom | yes |  |  | Hamburger glyph that expands a collapsed NavigationRail. |
| `Icon / nav-toggle-chevron` *(standalone)* | 2888:878 | atom | yes |  |  | Chevron glyph that collapses an expanded NavigationRail; mirror it for RTL. |
| `Icon / chevron-down-sm` *(standalone)* | 2911:1119 | atom | yes |  |  | Small chevron-down affordance marking an expandable NavRailItem with a submenu. |
| `Icon / more-horizontal` *(standalone)* | 2938:3105 | atom | yes |  |  | Horizontal ellipsis glyph for an overflow action on navigation items (for example on project rows in the sidebar). |
| `AppSidebar (shadcn-style)` | 2956:4525 | organism | yes | `Variant`=Standard / Floating / Inset<br>`Mode`=Expanded / Collapsed<br>`Direction`=LTR / RTL |  | Published shadcn-style application sidebar for web: workspace switcher, search, grouped NavRailItems (Platform, Projects), pinned settings/help and a user footer, expanded or collapsed. |
| `NavRail / TeamSwitcher` | 2959:4538 | molecule | yes | `Direction`=LTR / RTL |  | Sidebar header block with the Safqah app mark, workspace name (Investor workspace) and a chevron to switch workspace. |
| `NavRail / NavUser` | 2959:4550 | molecule | yes | `Direction`=LTR / RTL |  | Sidebar footer block with the signed-in user's avatar, name and email and a chevron opening the account menu. |
| `NavigationRail` | 2855:175 | organism | **no** | `Variant`=Standard / Floating / Inset<br>`Mode`=Expanded / Collapsed<br>`Direction`=LTR / RTL | Show header (bool), Show group labels (bool), Show badges (bool), Submenu open (bool), Show footer (bool) | Persistent vertical navigation for tablet and desktop, the rail counterpart of the bottom TabBar: wordmark and toggle, grouped NavRailItems with badges and submenus, account pinned at the bottom; Expanded (about 240px... |

### 06k ScrollContainer

Page status: stable · guide `references/data/components/scroll-container.md` · reference image `references/data/examples/scroll-container/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Scrollbar` | 4011:1102 | atom | yes | `Orientation`=vertical / horizontal<br>`Thickness`=thin / default<br>`Model`=overlay / gutter<br>`State`=idle / hover / dragging |  | Track and thumb for scrollable areas, overlay or gutter model, thin or default, with idle, hover and dragging states. |
| `Fade` | 4012:1050 | atom | yes | `Edge`=start / end<br>`Surface`=surface / elevated |  | Edge gradient mask hinting that more content lies beyond the start or end of a scroll area; its stops are hardcoded from bg/surface and bg/elevated. |
| `Scroll shadow` | 4013:1046 | atom | yes | `Position`=top / bottom |  | Shadow divider shown under a sticky header or above a sticky footer once content scrolls beneath it; reuses the Shadow / sm style. |
| `Pull-to-refresh` | 4014:201382 | molecule | yes | `State`=idle / pulling / refreshing |  | Mobile pull-to-refresh indicator that swaps a spinner through idle, pulling and refreshing states at the top of a scroll area. |
| `Scroll content` *(standalone)* | 4015:1061 | atom | yes |  |  | Placeholder content for the ScrollContainer Content slot, to be swapped for the real list or rail. |
| `ScrollContainer` | 4015:1157 | organism | yes | `Axis`=vertical / horizontal<br>`Direction`=LTR / RTL | fadeStart (bool), fadeEnd (bool), stickyHeader (bool), stickyFooter (bool), showScrollbar (bool), Content (swap) | Clipped scrollable area that assembles Scrollbar, edge Fades and Scroll shadows around a swappable Content slot, vertical or horizontal, with RTL origin handling. |

### 06l SegmentedControl

Page status: stable · guide `references/data/components/segmented-control.md` · reference image `references/data/examples/segmented-control/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Segment` | 4256:1443 | atom | yes | `State`=unselected / selected / hover / pressed / focus / disabled / selected-disabled<br>`Size`=sm / md / lg | Icon (swap), Has icon (bool), Has label (bool), Label (text), Show count (bool), Count (text), Show Dot (bool), Show Dot right (bool) | One option inside a SegmentedControl: label, optional icon, count and dot, with selection shown by weight and colour while the parent's thumb provides the fill. |
| `SegmentedControl_3` | 4258:1461 | molecule | yes | `Style`=pill-thumb / solid / dark / minimal<br>`Direction`=LTR / RTL<br>`Size`=sm / md / lg |  | Three-option pill single-select control (Day / Week / Month) that filters or toggles the same view. A radio group in a pill, not navigation. |
| `SegmentedControl_2` | 4260:1202 | molecule | yes | `Style`=pill-thumb / solid / dark / minimal<br>`Direction`=LTR / RTL<br>`Size`=md / sm / lg |  | Two-option pill single-select control (Monthly / Yearly) for toggling a value on the same view. |
| `SegmentedControl_4` | 4260:1351 | molecule | yes | `Style`=pill-thumb / solid / dark / minimal<br>`Direction`=LTR / RTL<br>`Size`=md / sm / lg |  | Four-option pill single-select control (Day / Week / Month / Year) for range or filter choices on the same view. |
| `SegmentedControl_5` | 4260:1536 | molecule | yes | `Style`=pill-thumb / solid / dark / minimal<br>`Direction`=LTR / RTL<br>`Size`=md / sm / lg |  | Five-option pill single-select control with short labels (1D / 1W / 1M / 1Y / All), typically for chart time ranges. |

## 07 Cards & Lists

### 07a CardDeal

Page status: stable · guide `references/data/components/card-deal.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `CardDeal` | 3013:95390 | organism | yes | `Layout`=Hero / Row<br>`State`=Available / Reserved / Invested / Closed<br>`Direction`=RTL / LTR | Qualified (bool), Show media (bool), Show status (bool), Show highlights (bool), Show ROI (bool), Show arrow (bool), Media image (swap), Show success (bool), Show Upper left arrow (bool) | The investment deal card that lists or spotlights a Safqah opportunity: media, qualified badge, status, title, highlights, ROI and term, as a Hero card or a compact Row, across Available, Reserved, Invested and Closed... |
| `CardDeal / Metric` | 3019:148 | atom | yes | `Direction`=LTR / RTL | Label (text), Value (text) | Label plus value line on a deal card, such as ROI 12-29% or Term 6-12 months. |
| `CardDeal / Headline` | 3036:316 | atom | yes | `Direction`=LTR / RTL | Title (text) | Deal title text atom on CardDeal. |
| `CardDeal / Highlights` | 3040:332 | atom | yes | `Direction`=LTR / RTL | Text (text) | Muted one-line feature summary on a deal card (High yield, 14-yr track record, 3x collateral). |
| `CardDeal / Media` | 3048:330 | atom | yes | `Size`=Hero / Thumb |  | Deal image surface: Hero (16:9, large radius) or Thumb (square) used in Row layout. |

### 07b CardGoal

Page status: wip (not stable: do not use for new production work) · guide `references/data/components/card-goal.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Goal / Headline` *(status wip)* | 3085:61 | atom | yes | `Direction`=LTR / RTL | Title (text), Show icon (bool) | Goal card title atom with optional leading icon (Your investment goal / تتبع هدفك الاستثماري). Status wip. |
| `Goal / Illustration` *(standalone, status wip)* | 3086:57 | atom | yes |  |  | Placeholder network/map illustration for the goal CTA card; swap with the real localized KSA-map art before shipping. Status wip. |
| `Goal / Summary` *(status wip)* | 3090:97 | atom | yes | `Direction`=LTR / RTL |  | Goal total block: large radial ring, 'Total goal progress' label and the running total amount. Status wip. |
| `Goal / PhaseRow` *(status wip)* | 3103:1296 | molecule | yes | `Percent`=+100% / 100% / 50% / 0%<br>`Direction`=LTR / RTL |  | One milestone row in GoalTracker: ring with percent, month title, amount and chevron; green filled when achieved, light when pending. Status wip. |
| `Goal / Amount` *(status wip)* | 3113:2866 | atom | yes | `Size`=sm / md / lg<br>`Tone`=Default / Inverse / Brand | Value (text) | Number plus riyal symbol atom used in goal cards, in three sizes and Default, Inverse or Brand tone. Status wip. |
| `GoalActivate` *(status wip)* | 3091:392 | organism | yes | `Phase`=Begining / Started / Static<br>`Direction`=LTR / RTL |  | Pre-activation goal CTA card with illustration, headline, body and a Button inviting the investor to set an investment goal. Status wip. |
| `GoalTracker` *(status wip)* | 3104:1750 | organism | yes | `State`=Overachieved / Complete / Active / Early<br>`Direction`=LTR / RTL |  | Active goal card listing milestone phase rows and a total progress summary, in Overachieved, Complete, Active and Early states. Status wip. |

### 07c CardAction

Page status: stable · guide `references/data/components/card-action.md` · reference image `references/data/examples/card-action/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `CardAction / Label` | 3133:738 | atom | yes | `Size`=sm / md<br>`Direction`=LTR / RTL | Title (text), Info (text), Show info (bool) | Title plus optional supporting info text atom shared by ActionTile and ActionPrompt. |
| `ActionTile` | 3138:1144 | organism | yes | `Size`=Small / Default<br>`Style`=Vertical / Horizontal<br>`State`=Default / Selected / Disabled<br>`Direction`=LTR / RTL | Icon (swap) | Compact quick-action tile (icon plus short label) for dashboard shortcut grids or as a horizontal row with supporting info, with Default, Selected and Disabled states. |
| `ActionPrompt` | 3137:1171 | organism | yes | `Tone`=Neutral / Brand / Warning / Success<br>`Direction`=LTR / RTL | Icon (swap) | Larger CTA card with an icon badge, title, description and a Button that nudges the user to one action, such as completing verification, toned by priority. |

### 07d CardInfo

Page status: stable · guide `references/data/components/card-info.md` · reference image `references/data/examples/card-info/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `CardInfo / Content` | 3190:1178 | atom | yes | `Direction`=LTR / RTL | Title (text), Description (text), Show description (bool) | Title (SemiBold 13) plus description (Regular 13) text atom of CardInfo. |
| `CardInfo` | 3200:1066 | organism | yes | `Type`=Icon / Avatar<br>`Tone`=Brand / Info / Success / Warning / Error / Neutral<br>`Direction`=LTR / RTL | Icon (swap) | Standalone informational card with a circular icon or advisor avatar badge, title, description and chevron, themed by tone. Used for help prompts, relationship-manager cards, tips and status notes that tap through. |

### 07e ListItem

Page status: stable · guide `references/data/components/list-item.md` · reference image `references/data/examples/list-item/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Content` | 3210:738 | atom | yes | `Size`=Lg / Md / Sm<br>`Direction`=LTR / RTL | Title (text), Description (text), Show description (bool), Show overline (bool), Overline (text), Show badge (bool), Show value (bool), Show switch (bool), Show metadata (bool), Show rating (bool), Show tags (bool), Value (text), Metadata (text), Show top-left-item (bool), Show top-right-item (bool) | Shared text block for rows and cards (Material anatomy): overline, title, supporting description plus optional value, metadata, badge, switch, rating and tags. |
| `ListItem` | 3212:1071 | molecule | yes | `State`=Default / Hover / Pressed / Selected / Disabled<br>`Direction`=LTR / RTL | Has leading (bool), Has label (bool), Has value (bool), Has action (bool), Has toggle (bool), Has chevron (bool), Has divider (bool), Leading icon (swap) | The universal single row: leading icon, title with optional description and exactly one trailing affordance (chevron, Switch, value, Tag label or action Button). It is the row, not the list. |

### 07f ActionList

Page status: stable · guide `references/data/components/action-list.md` · reference image `references/data/examples/action-list/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `ActionList` | 3222:1092 | organism | yes | `Style`=Grouped / Plain<br>`Direction`=LTR / RTL | Has header (bool), Has footer (bool) | Grouped list container that stacks ListItem rows under a section header with dividers (last off) and an optional footer hint, as a rounded card or plain edge-to-edge. The settings-screen building block. |

### 07g List

Page status: stable · guide `references/data/components/list.md` · reference image `references/data/examples/list/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `List` | 3251:1525 | organism | yes | `Style`=Plain / Divided / Inset / Bulleted / Numbered / Description<br>`Direction`=LTR / RTL |  | Read-only content list in six display styles: Plain, Divided, Inset, Bulleted, Numbered and Description (key-value with total). For presenting information, not for navigation or choice. |
| `List / TextItem` | 3254:1602 | molecule | yes | `Marker`=None / Bullet / Number<br>`Direction`=LTR / RTL | Number (text) | A List text row: optional Bullet or Number marker plus the Content atom. |
| `List / DescriptionRow` | 3254:1615 | molecule | yes | `Emphasis`=Default / Total<br>`Direction`=LTR / RTL | Term (text), Value (text) | Key-value row of a Description list: term and value, with a Total emphasis for the bottom line. |
| `SelectRow` | 3241:876 | molecule | yes | `Type`=Radio / Checkbox<br>`State`=Unselected / Selected / Disabled<br>`Direction`=LTR / RTL | Has leading icon (bool), Has value (bool), Leading icon (swap) | Selectable row with a radio or checkbox, title and description; selected state adds a brand border and tint. |
| `SelectionList` | 3242:866 | organism | yes | `Mode`=Single / Multi<br>`Direction`=LTR / RTL | Has header (bool), Has footer (bool) | List for choosing among options: SelectRows in Single (radio, exactly one) or Multi (checkbox, any number) mode with group header and footer. |

### 07h Section

Page status: stable · guide `references/data/components/section.md` · reference image `references/data/examples/section/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Section` | 3262:834 | molecule | yes | `Size`=Lg / Md / Sm<br>`Direction`=LTR / RTL | Title (text), Description (text), Action (text), Has description (bool), Has action (bool), Has leading icon (bool), Has divider (bool), Leading icon (swap) | Section header that titles a region of a screen (above a carousel, card row or list) with optional description, leading icon, divider and a See all action. It is a heading, not a row and not a container. |

### 07i Accordion

Page status: stable · guide `references/data/components/accordion.md` · reference image `references/data/examples/accordion/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AccordionItem` | 3275:806 | molecule | yes | `State`=Collapsed / Expanded<br>`Direction`=LTR / RTL | Has leading icon (bool), Body (text), Leading icon (swap) | One collapsible disclosure row: header with title and down arrowhead, body revealed when Expanded. |
| `Accordion` | 3276:998 | organism | yes | `Style`=Boxed / Plain<br>`Direction`=LTR / RTL |  | Grouped collapsible disclosure (FAQ, terms, breakdowns) stacking AccordionItems with dividers, boxed in a card or plain. |

### 07j Carousel

Page status: stable · guide `references/data/components/carousel.md` · reference image `references/data/examples/carousel/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `PageIndicator` | 3297:1424 | atom | yes | `Style`=Dots / Bars<br>`Active`=1 / 2 / 3 / 4 / 5 |  | Carousel page control showing position among up to 5 slides as dots with a pill active or segmented bars. Also reused as the scroll-snap indicator. |
| `Carousel / Slide` | 3299:1436 | molecule | yes | `Size`=Sm / Md / Lg<br>`Type`=Standard / Hero<br>`Direction`=LTR / RTL |  | One carousel slide: Standard media-over-text card or Hero full-bleed media with overlaid text, in three sizes. |
| `Carousel` | 3301:1742 | organism | yes | `Type`=Cards / Hero<br>`Size`=Sm / Md / Lg<br>`Direction`=LTR / RTL |  | Horizontal peek strip of slides with a PageIndicator, for browsable featured content, promos and onboarding where the peek signals more. |

### 07k Table

Page status: stable · guide `references/data/components/table.md` · reference image `references/data/examples/table/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Table / Cell` | 3316:115 | molecule | yes | `Type`=Text / Numeric / Avatar / Tag / Status / Select / Trend / Progress<br>`Density`=Default / Compact<br>`Direction`=LTR / RTL | Text (text) | A transparent table cell typed by its data: Text, Numeric (end-aligned), Avatar, Tag, Status, Select, Trend and Progress, in two densities. |
| `Table / HeaderCell` | 3317:127 | molecule | yes | `Sort`=None / Asc / Desc<br>`Density`=Default / Compact<br>`Direction`=LTR / RTL | Label (text), Has select-all (bool) | Column header with label, optional select-all checkbox and sort state (brand arrowhead for ascending or descending). |
| `Table / ActionCell` *(duplicate name)* | 3320:262 | molecule | yes | `Density`=Default / Compact<br>`Direction`=LTR / RTL | Has inline actions (bool) | End-aligned row action cell: overflow IconButton plus optional inline ghost IconButtons. One of two identical sets with this name on the table page (this one sits in the reference container). |
| `Table / Toolbar` | 3322:410 | molecule | yes | `Mode`=Default / Selection<br>`Direction`=LTR / RTL |  | Bar above a table with search, filter and sort controls, switching to a selection mode with the selected count and bulk actions. |
| `Table / ActionCell` *(duplicate name)* | 3351:197 | molecule | yes | `Density`=Default / Compact<br>`Direction`=LTR / RTL | Has inline actions (bool) | Second set named Table / ActionCell (same overflow plus inline IconButtons, same props), placed in the doc frame. Behaves identically to 3320:262; prefer one consistently. |

### 07l HeaderCard

Page status: stable · guide `references/data/components/header-card.md` · reference image `references/data/examples/header-card/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Base card` | 3384:9012 | organism | **no** | `Platform`=Mobile / Web<br>`State`=Expanded / Collapsed<br>`Direction`=RTL / LTR | Has Subtitle (bool), Has Lable (bool), Has meta (bool), Has developer (bool) | HeaderCard: the deal page hero that tops a single deal or project detail screen with the photo gallery and overlay back, share and favorite controls, qualified medallion, title, developer, meta tags and developer row;... |

### 07m NewsCard

Page status: stable · guide `references/data/components/news-card.md` · reference image `references/data/examples/news-card/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `NewsCard` | 3430:1350 | organism | yes | `Style`=Plain / Boxed / Media<br>`Direction`=RTL / LTR | Has chevron (bool), Has content (bool) | Update card about a deal or project (status change, milestone, announcement): title and developer, update paragraph, StatusPill and last-updated date, in Plain feed, Boxed and Media (thumbnail) styles. |
| `NewsCard / Meta` | 3429:917 | molecule | yes | `Direction`=RTL / LTR |  | Footer line of NewsCard: StatusPill badge (for example Behind schedule) plus last-updated date. |
| `NewsCard / Developer Logo` *(standalone)* | 5291:746 | atom | **no** |  |  | 32x16 developer or issuer logo slot used in NewsCard / Poster Caption, single-colour glyphs. |
| `NewsCard / Poster Media` *(standalone)* | 5291:786 | atom | **no** |  |  | Full-bleed photo for NewsCard / Poster with the frost fade, scrim and progressive blur stack that keeps the caption readable. |
| `NewsCard / Poster Caption` | 5292:822 | molecule | **no** | `Direction`=RTL / LTR | Title (text), Description (text), Has description (bool), Has logo (bool), Logo (swap) | Text block over the poster media: optional issuer logo, title and description in inverse text. |
| `NewsCard / Poster Actions` | 5292:170000 | molecule | **no** | `Direction`=RTL / LTR | Has status (bool), Has action (bool) | Poster footer row: IssuanceStatusBadge (Investor) at the start (On track, Late, Construction completed) and a round open IconButton at the end. |
| `NewsCard / Poster` | 5293:963 | organism | **no** | `Direction`=RTL / LTR | Has tag (bool) | Portrait 280x479 visual update card about a deal or project: photo, last-updated tab, issuer logo, title, description, status and open action, meant to be swiped in a carousel. |
| `NewsCard / Poster Carousel` | 5293:1456 | organism | **no** | `Direction`=RTL / LTR |  | Horizontal peek carousel of NewsCard / Poster cards at mobile content width: one full poster plus a peek of the next. |

### 07n Menu

Page status: stable · guide `references/data/components/menu.md` · reference image `references/data/examples/menu/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `MenuItem` | 3946:1112 | atom | yes | `State`=default / hover / disabled / destructive<br>`Direction`=ltr / rtl | Label (text), Icon (swap), Has shortcut (bool), Has submenu (bool), Shortcut (text) | Action row of every menu: leading icon (or checkbox/radio indicator) and label, with optional submenu arrowhead and keyboard shortcut; destructive state in red. |
| `MenuSectionHeader` | 3948:1086 | atom | yes | `Direction`=ltr / rtl | Label (text) | Muted label that titles a group of menu items. |
| `Menu` | 3948:1177 | organism | yes | `Direction`=ltr / rtl |  | Floating surface listing commands (Edit, Share, Delete) with section headers and a divider before the destructive action; the base every anchored menu reuses. Menus fire commands, they do not pick form values. |
| `MenuTrigger` | 3955:1905 | atom | yes | `Glyph`=kebab / meatball / hamburger / bento / arrow / split<br>`Direction`=ltr / rtl |  | The button that opens a menu, in kebab, meatball, hamburger, bento, arrow or split glyphs; nests IconButton (split nests a Button plus an arrow IconButton). |
| `Dropdown menu` | 3966:2455 | organism | yes | `Placement`=bottom-start / bottom-end / top-start / top-end<br>`Direction`=ltr / rtl |  | MenuTrigger plus Menu anchored with a placement (bottom/top x start/end); also the preset for split-button, overflow and context menus. |
| `Cascading submenu` | 3968:2683 | organism | yes | `Open-direction`=end / start<br>`Direction`=ltr / rtl |  | A child Menu flowing off a MenuItem with a submenu arrowhead, opening toward the end or start edge. |
| `Sort menu` | 3969:2795 | organism | yes | `Order`=asc / desc<br>`Direction`=ltr / rtl |  | Selection menu of radio MenuItems for the sort field plus an ascending/descending order. |
| `Filter menu` | 3970:2937 | organism | yes | `Direction`=ltr / rtl |  | Selection menu of checkbox MenuItems with an Apply / Clear footer for filtering a list or table. |
| `Command palette` | 3972:2887 | organism | yes | `State`=results / no-results<br>`Direction`=ltr / rtl |  | Command-K search over commands: a Combobox field header with grouped MenuItem results and a no-results state. |
| `Multi-select field` | 3981:2871 | organism | yes | `Value-display`=chips / count / text<br>`Direction`=ltr / rtl |  | Form field that holds several selected values shown as chips, a count or text, paired with a checkbox menu with select-all and clear-all. |
| `Autocomplete` | 3983:2895 | organism | yes | `Loading`=idle / loading<br>`Direction`=ltr / rtl |  | Combobox field with a suggestions list that highlights the matching text, with a loading state. |
| `Action sheet` | 3984:3215 | organism | yes | `Direction`=ltr / rtl |  | Mobile bottom-anchored list of actions with a destructive option and Cancel; the phone form of a Menu. |
| `Bottom-sheet menu` | 3984:3216 | organism | yes | `Direction`=ltr / rtl |  | Mobile menu on the BottomSheet surface: grabber, section header and a MenuItem list. |
| `FAB speed-dial` | 3985:3145 | organism | yes | `State`=collapsed / expanded<br>`Direction`=ltr / rtl |  | Floating action button that expands into labelled action rows. |
| `Long-press preview` | 3989:3225 | organism | yes | `Direction`=ltr / rtl |  | Long-press context pattern: a content preview card with a contextual action list. |

## 08 Safqah-Specific

### 08a InvestmentCalculator

Page status: stable · guide `references/data/components/investment-calculator.md` · reference image `references/data/examples/investment-calculator/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `_ROI` *(hidden, internal only)* | 3442:5756 | atom | **no** | `Value`=20K / 4K / 1K / 10k / Value5 / 300k / 400k / 2M<br>`Direction`=LTR / RTL |  | Hidden figure atom that renders the large green expected-return amount at the top of the legacy Investment Calculator, with one variant per sample amount. |
| `_Gross-profit` *(hidden, internal only)* | 3442:6279 | atom | **no** | `value`=1k / 20k / 4k / 300K / 400K / 2M<br>`Direction`=LTR / RTL |  | Hidden figure atom for the gross profit amount in the legacy calculator breakdown, one variant per sample amount. Always shown alongside net profit so fees are visible. |
| `_Net-profit` *(hidden, internal only)* | 3442:6600 | atom | **no** | `Value`=1k / 20k / 4k<br>`Direction`=LTR / RTL |  | Hidden figure atom for net profit after the investment agency fee in the legacy calculator, one variant per sample amount. It is the figure investors actually receive as profit. |
| `Promo-code` | 3442:6739 | molecule | yes | `State`=Added / Not-added<br>`Direction`=LTR / RTL | Has Headling (bool) | Promo-code entry row in the invest flow: a grey «إضافة رمز ترويجي» add row, or once applied a green chip with the code, the discount it gives (for example 50% off the investment agency fee) and a remove ×. |
| `Distribution-schedule` | 3442:5172 | molecule | yes | `Property 1`=Full list / Less-list / No-Schedule<br>`Direction`=LTR / RTL |  | Collapsible payout schedule for the legacy calculator: a «جدول التوزيعات» header with a count and toggle that opens a list of expected distribution dates and amounts, or a single «توزيع الأرباح: نهاية المدة» line when... |
| `Checkout` | 3442:6812 | molecule | yes | `Method`=ApplePay / Bank-transfer / Credit-card<br>`Direction`=LTR / RTL |  | Payment-method picker at the end of the invest flow: three tiles (bank transfer, payment card, Apple Pay) with one selected and a «أفضل خيار» badge; card selection reveals card number, expiry and CVV fields. |
| `Investment-amount` | 3442:6746 | molecule | yes | `User`=Regular / Qualifide / Without-edit<br>`Promo`=Not-adedd / No-PROMO / Adedd<br>`Direction`=LTR / RTL | Has Content (bool) | The amount block of the legacy calculator: big editable riyal amount, then a breakdown of return on investment, gross profit, investment agency fee (incl. 15% VAT), optional fee discount from a promo, and net profit. |
| `Payment-details` *(standalone)* | 3448:7619 | molecule | yes |  |  | Payment summary rows before paying: total amount, wallet balance deducted (green), and the remaining amount to pay. |
| `Investment Calculator` | 3442:5240 | organism | yes | `Value`=1 / 4 / 20 / Qualified-user<br>`Direction`=LTR / RTL |  | Legacy deal-page calculator organism: expected return headline, gross/net breakdown and distribution schedule, then step 1 pick the term and annual return (closed terms marked fully funded), and step 2 set the amount ... |
| `Calculator-list-item` | 3456:9742 | molecule | yes | `Color`=Black / Green<br>`Wight`=Bold / Light<br>`Size`=Lg / Sm<br>`Type`=Default / with emoji<br>`Direction`=LTR / RTL | Has Description (bool), Title (text), Description (text), Number (text), Has Number (bool), Has Discount (bool), Discount value (text), emoji (text), Has Icon (bool), Percentage (text) | Single label-plus-amount row used in calculator breakdowns, with optional description (for example «Incl. 15% VAT»), strike-through original amount for discounts, a green highlighted form, and an emoji badge type. |
| `Calculator / Info label` | 5994:5888 | atom | **no** | `Size`=Sm / Md<br>`Direction`=RTL / LTR | Has info (bool) | Muted metric label with a trailing info icon (for example «نسبة العائد السنوي ⓘ», «إجمالي الربح ⓘ»), used for every metric name in Calculator v2. |
| `Calculator / Stat tile` | 5994:5949 | atom | **no** | `Tone`=Default / Success<br>`Direction`=RTL / LTR |  | Value over Info label tile, one third of the Stat strip; Tone=Success colours the value green for profit metrics such as ROI. |
| `Calculator / Duration option` | 5994:5976 | atom | **no** | `State`=Selected / Available / Closed<br>`Direction`=RTL / LTR |  | One term in the duration carousel: months on top with its annual rate below; Selected is large with a green rate, Available is muted, Closed shows «مكتمل». |
| `Calculator / Swipe arrow` | 5994:6001 | atom | **no** | `Point`=Left / Right<br>`State`=Default / Disabled |  | 20 px chevron that steps the duration carousel to the previous or next term; Disabled at the first and last term. |
| `Calculator / Funded label` | 5994:6008 | atom | **no** | `Type`=Default<br>`Direction`=RTL / LTR |  | Small «78% ممول» funded-percentage caption shown under the selected term. |
| `Calculator / Disclosure toggle` | 5994:6041 | atom | **no** | `State`=Closed / Open<br>`Direction`=RTL / LTR |  | «مؤشرات إضافية» row with a chevron that expands the extra indicators (IRR, agency fee) in the results card. |
| `Calculator / Date tile` | 5994:6048 | atom | **no** | `Type`=Default<br>`Direction`=RTL / LTR |  | Small green-tinted month plus approximate day tile («فبر ~15») marking when a distribution is expected. |
| `Calculator / Metric row` | 5996:5988 | molecule | **no** | `Value`=Money / Percent<br>`Tone`=Default / Muted<br>`Direction`=RTL / LTR |  | Info label on one side and a money or percent value on the other; used for total profit, net profit after fees, IRR and agency fee rows. |
| `Calculator / Stat strip` | 5996:6083 | molecule | **no** | `Type`=Default<br>`Direction`=RTL / LTR |  | Bordered strip of three Stat tiles split by vertical dividers: duration, annual rate and net return (ROI, green). |
| `Calculator / Duration carousel` | 5996:6300 | molecule | **no** | `Position`=First / Middle / Last<br>`Direction`=RTL / LTR |  | Swipeable row of Duration options with swipe arrows around the selected term, plus the funded caption and «اسحب لتغيير المدة» hint. |
| `Calculator / Amount display` | 5996:6364 | molecule | **no** | `Type`=Default<br>`Direction`=RTL / LTR |  | Large typed riyal amount with an IconButton that opens the amount keypad. |
| `Calculator / Installment row` | 5996:6441 | molecule | **no** | `Type`=Profit / Final<br>`Direction`=RTL / LTR |  | One expected distribution: date tile, «توزيع أرباح» or «التوزيع الأخير + رأس المال», payout index and year, and the amount. |
| `Calculator / Distributions header` | 5996:6558 | molecule | **no** | `State`=Closed / Open<br>`Direction`=RTL / LTR |  | Calendar icon, distribution count («4 توزيعات») with subtitle, total distributed amount and a chevron. |
| `Calculator / Distributions accordion` | 5996:6893 | molecule | **no** | `State`=Closed / Open<br>`Direction`=RTL / LTR |  | Distributions header that opens a stack of Installment rows showing the expected payout plan. |
| `Calculator / Duration picker` | 5998:6718 | organism | **no** | `Position`=First / Middle / Last<br>`Direction`=RTL / LTR |  | Step 1 organism of Calculator v2: title «1. اختر العائد والمدة المناسبة لاستثمارك» over the Duration carousel. |
| `Calculator / Amount card` | 5998:7155 | organism | **no** | `Distributions`=Closed / Open<br>`Direction`=RTL / LTR |  | Step 2 organism of Calculator v2: amount display with keypad button, divider, and the distributions accordion. |
| `Calculator / Results card` | 5998:7821 | organism | **no** | `Indicators`=Closed / Open<br>`Direction`=RTL / LTR |  | Step 3 organism of Calculator v2, «ناتج الاستثمار المتوقع»: what you receive after fees (large green amount), the stat strip, total and net profit rows, expandable indicators (IRR, agency fee) and the payout footer. |
| `Calculator / Underline option` | 6102:9914 | atom | **no** | `State`=Selected / Adjacent / Closed / Far<br>`Direction`=RTL / LTR |  | Term label for the underline-style picker: Selected is large with a green underline, Adjacent and Far fade with distance, Closed is lightest. |
| `Calculator / Underline carousel` | 6102:10044 | molecule | **no** | `Position`=First / Middle / Last<br>`Direction`=RTL / LTR |  | Underline-style term carousel: row of Underline options, green annual rate «16.00% سنوياً», funded caption and swipe hint. |
| `Calculator / Duration picker · Underline` | 6102:10234 | organism | **no** | `Position`=First / Middle / Last<br>`Direction`=RTL / LTR |  | Step 1 organism in the underline style: step title over the Underline carousel. |

### 08b ReservationTimer

Page status: stable · guide `references/data/components/reservation-timer.md` · reference image `references/data/examples/reservation-timer/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Numbers` | 3448:7623 | atom | yes | `Numbers`=00 / 01 / 02 / 03 / 04 / 05 / 06 / 07 / ... +53 more |  | Flip-digit two-digit atom (00 to 59) used inside each Timer unit of the reservation countdown. |
| `Small-Numbers` | 3448:7746 | atom | yes | `Numbers`=00:00 / 00:01 / 00:02 / 00:03 / 00:04 / 00:05 / 00:06 / 00:07 / ... +112 more<br>`Color`=White / Green / Yellow |  | Compact MM:SS readout (00:00 to 01:59) tinted by urgency, used in Small Timer and Collapsed-Reservation. |
| `Timer-type` *(standalone)* | 3448:8465 | atom | yes |  | Type (text) | Unit label under the flip digits (default «دقيقة»). |
| `Timer` | 3448:8467 | molecule | yes | `Type`=Day / hr / min / sec<br>`Direction`=LTR / RTL |  | One countdown unit: flip digits over a unit label (day, hr, min, sec). |
| `Small Timer` | 3448:8480 | molecule | yes | `Property 1`=Black / Yellow / Green<br>`Direction`=LTR / RTL | Description (text), Has Icon (bool) | Pill chip with alarm icon, MM:SS and «Deal reservation ends in:» description; Black default, Yellow when low, Green variant. |
| `Countdown` | 3481:3031 | organism | yes | `Direction`=RTL / LTR | Has Lable (bool) | Multi-unit countdown (days, hours, minutes) with an optional green label such as «أولوية الاستثمار تنتهي بعد», for a priority or reservation window measured in days. |
| `Collapsed-Reservation` | 3448:8514 | organism | yes | `Property 1`=Default / Variant2<br>`Direction`=LTR / RTL | Has Multi-deals (bool), Headline (text), Description (text) | Sticky collapsed reservation bar: headline and description with a Small Timer pill and expand chevron; one tone is brand green, the other orange for urgency, and it can represent several reserved deals. |
| `Reservation-Calculater` | 3481:3102 | organism | yes | `Direction`=RTL / LTR |  | Reservation summary: «عائد الاستثمار 12%» expected return amount, investment amount with a «عرض تفاصيل حاسبة الاستثمار» link, and wallet balance row. |

### 08c Payouts list

Page status: stable · guide `references/data/components/payouts-list.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Payouts cell` | 3618:122684 | molecule | yes | `Property 1`=Upcoming / Done - Captial / Done - Payout / Early paid / Disabled Early paid / Late / Defaulted / Partially repaid / Partially repaid closed / Partial principal<br>`Direction`=rtl / ltr | Show Subtitle (bool), Show alert (bool) | One distribution row in a payouts list: amount and date, project name and distribution type with status suffix, and a state icon; ten states cover upcoming, received, early paid, skipped, late, defaulted and partial r... |

### 08d PortfolioHeader

Page status: stable · guide `references/data/components/portfolio-header.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `BalanceToggle` | 4235:1681 | atom | yes | `State`=Show / Hide |  | 32 px circular eye button that shows or masks the wallet balance. |
| `MoneyAmount` | 4240:1642 | atom | yes | `Size`=sm / lg<br>`Tone`=default / brand / muted<br>`Direction`=LTR / RTL | Amount (text) | Number plus Saudi riyal symbol atom; the symbol trails in LTR and leads in RTL. Reused across the whole product for every riyal amount. |
| `UserGreeting` | 4241:1280 | molecule | **no** | `Direction`=LTR / RTL | Name (text), Show qualified badge (bool), Show eye (bool) | Qualified-investor badge, «Hello Abrar» greeting and BalanceToggle in one row. |
| `WalletChip` | 4241:1317 | molecule | yes | `Direction`=LTR / RTL | Wallet label (text) | Green «Wallet» label with icon over a chip showing the wallet balance. |
| `ReturnsDisplay` | 4241:1368 | molecule | yes | `Direction`=LTR / RTL | Returns label (text), Invested label (text), Show invested (bool) | «Total returns and expected profit» label with large green amount and, opposite, amount invested. |
| `PortfolioHeader` | 4243:1823 | organism | yes | `Direction`=LTR / RTL<br>`Balance`=Shown / Masked | Show wallet (bool), Show returns (bool), Show payouts table (bool) | Top of the Portfolio page: greeting, maskable wallet balance, total returns and expected profit vs amount invested, and a «View payouts list» button. |

### 08f GoalTracker

Page status: wip (not stable: do not use for new production work) · guide `references/data/components/goal-tracker.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Goal-Card` *(status wip)* | 3488:48634 | organism | **no** | `State`=No-goal / Property 210 / Property 211 / Property 212 / Goal start outline / No-goal - outline / Goal start<br>`Language`=Arabic / English | RIO (text), Currency (text), Message (text), Show CTA (bool) | Legacy investment-goal card (unpublished) with ROI, currency and progress message texts: covers no-goal CTA with map illustration, goal start, outline variants and in-progress plan states in Arabic and English. |
| `Goal card` *(status wip)* | 3488:49761 | organism | yes | `Property 1`=Begining / Started / Static<br>`Language`=Arabic / English |  | Legacy goal card with three phases: Begining (map illustration with «حدد هدفك الاستثماري» CTA), Started (investment plan chart, period chips and target), Static. |
| `GoalCard` *(status wip)* | 3519:2731 | organism | yes | `State`=Property 210 / No-goal / Property 211 / Property 212 / Goal start / No-goal - outline / Goal start outline<br>`Language`=English / Arabic |  | Published copy of the legacy Goal-Card state set (no-goal, goal start, outline, plan states) without editable text props. |
| `GoalChart` *(standalone, status wip)* | 3521:3470 | molecule | yes |  |  | Stepped area chart comparing growth with Safqah investment (green) against without investment (grey) over months. |
| `GoalPlan` *(status wip)* | 3569:2394 | organism | yes | `Property 1`=Started / Begining / Static<br>`Language`=English / Arabic |  | Legacy «خطتك الاستثمارية» plan card: chart, period selector (3M to 5Y), with and without investment legend, goal amount and progress chip, and target details link; also begining and static states. |

### 08h DealTimeline

Page status: stable · guide `references/data/components/deal-timeline.md` · reference image `references/data/examples/deal-timeline/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `DealTimeline` | 3663:2618 | organism | yes | `Direction`=LTR / RTL |  | Vertical deal lifecycle: funded, started, first distribution, settlement in progress, next distribution, final repayment plus profit; amounts only on money moments and exactly one active stage. |

### 08i Sharia & CMA Disclosure

Page status: stable · guide `references/data/components/sharia-cma-disclosure.md` · no reference image (use the Figma screenshot route in `images.md`)

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `ComplianceBadge` | 3673:2408 | atom | yes | `Type`=CMA / Shariah<br>`Direction`=RTL / LTR |  | Official seal with label and learn-more arrow: Shariah «متوافق مع الشريعة الإسلامية» or CMA «مصرحة من هيئة السوق المالية». |
| `ShariaDisclosure` | 3681:2658 | molecule | yes | `Direction`=RTL / LTR |  | Brand-green banner stating «جميع الصفقات المطروحة معتمدة من اللجنة الشرعية» with seal and learn-more. |

### 08j ProvinceSelector

Page status: stable · guide `references/data/components/province-selector.md` · reference image `references/data/examples/province-selector/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `ProvinceSelector` | 3719:232568 | organism | yes | `Selection`=Single / Multi<br>`Direction`=RTL / LTR |  | Titled group of wrapping RegionChips for the investor's preferred Saudi region (Western, Eastern, Northern, Southern, Central); single select by default. |
| `RegionChip` | 3718:190 | atom | yes | `State`=Selected / Default<br>`Direction`=RTL / LTR | Label (text) | 44 px selectable chip; Selected is brand-filled with inverse text, Default is outlined. |

### 08k RatingScale

Page status: stable · guide `references/data/components/rating-scale.md` · reference image `references/data/examples/rating-scale/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `RatingScale` | 3756:260 | organism | yes | `Direction`=RTL / LTR |  | 0 to 10 NPS question with zone-tinted cells and min/max anchors («غير محتمل إطلاقاً» / «محتمل جداً»). |
| `RatingCell` | 3755:216 | atom | yes | `Tone`=Detractor / Passive / Promoter<br>`State`=Default / Selected | Value (text) | One tappable NPS value tinted by zone: Detractor 0 to 6 red, Passive 7 to 8 warning, Promoter 9 to 10 green; Selected adds a border. |

### 08l TierBadge

Page status: stable · guide `references/data/components/tier-badge.md` · reference image `references/data/examples/tier-badge/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `dealTags` | 3023:39526 | atom | yes | `Type`=Premium / RIO/White / RIO/Black / Closed / Basic / pros / Type7 / Type8 / ClosedWhite |  | Deal image overlay pill (Deal_Tags, the TierBadge): guarantee tier «مضمونة برهن», qualified-only «فرصة حصرية للمؤهلين», ROI plus tenor, and «مغلقة بنجاح» closed status. |

### 08m KYCStep

Page status: stable · guide `references/data/components/kyc-step.md` · reference image `references/data/examples/kyc-step/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `KYCTaskRow` | 3786:470 | molecule | yes | `State`=Completed / Current / Upcoming<br>`Direction`=LTR / RTL |  | One verification task: step indicator, task name with hint, and StatusPill (Verified, Action needed, Waiting). |
| `KYCChecklist` | 3796:551 | organism | yes | `Direction`=LTR / RTL |  | Verification hub «أكمل توثيق حسابك» with progress line and a KYCTaskRow per requirement (ID via Nafath, documents, bank account, final review). |
| `KYCStep` | 3789:363 | organism | yes | `Direction`=LTR / RTL |  | One KYC screen: Stepper (Identity, Documents, Bank, Review), section title, the step input (IBAN), inline name-match Alert, Back and Continue. |

### 08p AbshirLogo

Page status: stable · guide `references/data/components/abshir-logo.md` · reference image `references/data/examples/abshir-logo/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AbshirLogo` | 3809:377 | atom | yes | `Size`=16 / 24 / 32 / 48 / 64<br>`Tone`=Brand / Mono / Inverse |  | Vector Absher mark (2:3, mark only) to signal Absher/Nafath identity verification. |

### 08q MadaLogo

Page status: stable · guide `references/data/components/mada-logo.md` · reference image `references/data/examples/mada-logo/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `MadaLogo` | 3822:332 | atom | yes | `Size`=16 / 24 / 32 / 48 / 64<br>`Tone`=Brand / Mono / Inverse |  | Official mada bilingual lockup for card payments. |

### 08r SafqahLogo

Page status: stable · guide `references/data/components/safqah-logo.md` · reference image `references/data/examples/safqah-logo/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `SafqahLogo` | 3831:301 | atom | yes | `Form`=Main / Variant<br>`Color`=Black / White / Dark / Offwhite / PigmentGreen / RoyalGreen / Yellow |  | Safqah master brand mark, stacked Main or inline Variant, in seven brand colours. |

### 08s QualifiedCalculator

Page status: stable · guide `references/data/components/qualified-calculator.md` · reference image `references/data/examples/qualified-calculator/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `QualifiedCalculator Header` | 3839:2274 | molecule | yes | `Value`=10K / 300K / 400K / 2M / regular user / qualified users / transaction<br>`Type`=wallet / Investment-cal | Has Icon (bool), Has fee (bool), Has button (bool) | Result header above the keypad: projected total with +% delta, net profit, duration and annual rate line, and the typed investment amount; wallet types show balance and annual top-up cap. |
| `QualifiedCalculator` | 3839:2910 | organism | **no** | `Value`=10K / 300K / 400K / 2M / Wallet | Has Alert (bool) | Full-screen qualified investor calculator: result header pinned over a numeric keypad, plus Wallet mode with remaining annual cap and quick-amount chips. |
| `Sheet Content / Amount keypad` *(standalone)* | 5548:94341 | organism | **no** |  |  | BottomSheet content slot with amount hero and the product keypad, used in qualified calculator flow J. |
| `Keypad / Hint` | 6035:901 | atom | **no** | `Tone`=Muted / Warning<br>`Direction`=RTL / LTR |  | Single-line rule hint under the amount: Muted «بمضاعفات 1,000 · حتى 500,000» or Warning when the amount breaks a rule. |
| `Keypad / Title row` | 6035:976 | molecule | **no** | `Type`=Default<br>`Direction`=RTL / LTR |  | «مبلغ الاستثمار» title with WalletChip balance on the opposite side. |
| `Keypad / Summary row` | 6035:1065 | molecule | **no** | `Type`=Profit / Rate / Available / Deposit<br>`Direction`=RTL / LTR |  | Label-value row: expected total profit with +%, APR · duration, available in wallet, deposit needed (warning). |
| `Keypad / Summary card` | 6035:1171 | molecule | **no** | `Type`=Projection / Ledger<br>`Direction`=RTL / LTR |  | Card under a valid amount: Projection (expected profit, APR and duration) or Ledger (wallet available vs deposit needed). |
| `Keypad / Presets` | 6035:1189 | molecule | **no** | `Type`=Default<br>`Direction`=RTL / LTR |  | Quick-amount pills «كامل المحفظة» and «المتبقي في الصفقة» with the rule hint. |
| `Keypad / Quick action` | 6035:1289 | molecule | **no** | `Type`=Pair / Single<br>`Direction`=RTL / LTR |  | Fix buttons: Pair of nearest valid amounts (100,000 / 101,000) or Single action (Go to deposit, invest the maximum). |
| `Keypad / Amount hero` | 6035:1605 | molecule | **no** | `State`=Empty / Valid / Invalid / Thousands<br>`Direction`=RTL / LTR |  | Title row, large typed amount with caret and hint; Invalid turns warning, Thousands greys auto-completed zeros. |
| `Keypad / Amount input` | 6036:3480 | organism | **no** | `State`=Empty / Valid / Not multiple / Snap / Above cap / Above remaining / Wallet shortfall / Thousands<br>`Direction`=RTL / LTR |  | Full amount keypad screen for qualified investors: hero, one context block (presets, projection, fixes, ledger), keypad and a CTA whose label tracks the amount. |

### 08t Guarantees

Page status: stable · guide `references/data/components/guarantees.md` · reference image `references/data/examples/guarantees/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Guarantees (legacy source)` | 3658:127481 | organism | yes | `Value`=Empty / Full |  | Original guarantee coverage component kept as the source for the rebuild (Empty and Full only). |
| `GuaranteeBar` | 3859:1071 | molecule | yes | `Coverage`=Empty / Low / Mid / High / Full<br>`Direction`=RTL / LTR | Value (text) | Track with brand-gradient fill whose width encodes guarantee value on a millions axis; value label inside at High/Full. |
| `Guarantees` | 3861:1216 | organism | yes | `Coverage`=Empty / Low / Mid / High / Full<br>`Direction`=RTL / LTR |  | Guarantee coverage chart: program funding size title with coverage % badge, GuaranteeBar and millions axis. |
| `AxisTick` *(standalone)* | 3859:1042 | atom | yes |  | Value (text) | One axis marker: tick plus value label («30 مليون»). |

### 08u Issuance Row

Page status: stable · guide `references/data/components/issuance-row.md` · reference image `references/data/examples/issuance-row/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Issuance Status Icon` | 4054:1147 | atom | yes | `Status`=Defaulted / Partially Repaid / Late / Repayment Due / Matured / Active / Funded / Raising / Reserved |  | 32 px colour-coded isometric icon per issuance status (nine statuses). |
| `Issuance Row` | 4059:117428 | molecule | yes | `State`=Default / Open / Focus<br>`Language`=LTR / RTL | Status (text), Count (text), Amount (text), Status Icon (swap) | Portfolio row grouping investments by status: icon, status with count, total amount and chevron; Open expands the underlying investments with amount and maturity and a see-all link. |
| `Issuance Row · Arabic` *(standalone)* | 4089:2079 | molecule | yes |  | Status Icon (swap), Status (text), Count (text), Amount (text) | Standalone Arabic collapsed Issuance Row (e.g. «مستحقة · ٤ استثمارات»). |
| `Issuance List` | 4093:2406 | organism | yes | `Direction`=LTR / RTL |  | Stack of Issuance Rows, one per status. |

### 08v Reinvest

Page status: stable · guide `references/data/components/reinvest.md` · reference image `references/data/examples/reinvest/reference.png`

| Component | Id | Level | Library | Variant properties | Other properties | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Reinvest / MatchStat` *(standalone)* | 6049:3 | atom | **no** |  | Value (text), Label (text) | Value-first green tile (duration, annual return, ROI) on bg/success-subtle. |
| `Reinvest / Illustration · Orbit` *(standalone)* | 5922:245709 | atom | **no** |  |  | 120 px isometric dashed-orbit illustration for capital recycling. |
| `Reinvest / RecommendationRow` | 6049:298 | molecule | **no** | `Direction`=RTL / LTR |  | Recommended deal row: thumb, title, because line, three-factor meta and chevron. |
| `Reinvest / RecommendationCard` | 6049:299 | molecule | **no** | `Direction`=RTL / LTR |  | Card with deal image, name and three MatchStat tiles. |
| `Reinvest / MaturityRecap` | 6054:1667 | organism | **no** | `Direction`=RTL / LTR | Show withdraw (bool) | BottomSheet content after the final payout: orbit, «اكتمل استثمارك في مدماك», returned amount, capital/profit/realised return breakdown, and equal Reinvest and Keep buttons (optional withdraw). |
| `Reinvest / RecommendationList` | 6054:1668 | organism | yes | `Direction`=RTL / LTR |  | BottomSheet content: compared-to deal, intro line, up to 3 RecommendationRows, not-advice disclaimer. |
| `Reinvest / RecommendationCarousel` | 6054:1669 | organism | yes | `State`=Card 1 / Card 2<br>`Direction`=RTL / LTR |  | Swipe version B: centred RecommendationCard, scaled neighbours, PageIndicator. |
| `Reinvest / ComparedTo` | 6255:7960 | molecule | **no** | `Direction`=LTR / RTL |  | The matured deal being compared: thumb, «استثمارك المكتمل» overline, name and its duration, annual and net. |

## A to Z

Every component name with its page code and id.

- `_Gross-profit` · 08a · 3442:6279 · not published
- `_Net-profit` · 08a · 3442:6600 · not published
- `_ROI` · 08a · 3442:5756 · not published
- `AbshirLogo` · 08p · 3809:377
- `Accordion` · 07i · 3276:998
- `AccordionItem` · 07i · 3275:806
- `Action sheet` · 07n · 3984:3215
- `ActionList` · 07f · 3222:1092
- `ActionPrompt` · 07c · 3137:1171
- `ActionTile` · 07c · 3138:1144
- `Alert` · 05a · 1950:212
- `Amount Stepper` · 03c · 1010:1401
- `AppBar` · 06a · 2447:2 · not published
- `AppSidebar (shadcn-style)` · 06j · 2956:4525
- `Autocomplete` · 07n · 3983:2895
- `Avatar` · 04c · 1372:2
- `AvatarStack` · 04c · 1382:53
- `AvatarWithStatus` · 04c · 1374:14
- `AxisTick` · 08t · 3859:1042
- `BackButton` · 06i · 2772:154
- `Badge Count` · 04b · 1324:63 · not published
- `Badge Dot` · 04b · 1322:63
- `BalanceToggle` · 08d · 4235:1681
- `Banner` · 05c · 1993:212
- `Base card` · 07l · 3384:9012 · not published
- `Bottom-sheet menu` · 07n · 3984:3216
- `BottomNavTabItem` · 06b · 2522:26
- `BottomSheet` · 06c · 2634:273
- `Brand / Safqah Wordmark (Dark)` · 06j · 2887:874
- `Breadcrumb` · 06f · 2726:168
- `BreadcrumbItem` · 06f · 2723:50
- `BreadcrumbSeparator` · 06f · 2725:20
- `Button` · 02a · 417:2
- `ButtonGroup` · 02e · 792:290
- `Calculator / Amount card` · 08a · 5998:7155 · not published
- `Calculator / Amount display` · 08a · 5996:6364 · not published
- `Calculator / Date tile` · 08a · 5994:6048 · not published
- `Calculator / Disclosure toggle` · 08a · 5994:6041 · not published
- `Calculator / Distributions accordion` · 08a · 5996:6893 · not published
- `Calculator / Distributions header` · 08a · 5996:6558 · not published
- `Calculator / Duration carousel` · 08a · 5996:6300 · not published
- `Calculator / Duration option` · 08a · 5994:5976 · not published
- `Calculator / Duration picker` · 08a · 5998:6718 · not published
- `Calculator / Duration picker · Underline` · 08a · 6102:10234 · not published
- `Calculator / Funded label` · 08a · 5994:6008 · not published
- `Calculator / Info label` · 08a · 5994:5888 · not published
- `Calculator / Installment row` · 08a · 5996:6441 · not published
- `Calculator / Metric row` · 08a · 5996:5988 · not published
- `Calculator / Results card` · 08a · 5998:7821 · not published
- `Calculator / Stat strip` · 08a · 5996:6083 · not published
- `Calculator / Stat tile` · 08a · 5994:5949 · not published
- `Calculator / Swipe arrow` · 08a · 5994:6001 · not published
- `Calculator / Underline carousel` · 08a · 6102:10044 · not published
- `Calculator / Underline option` · 08a · 6102:9914 · not published
- `Calculator-list-item` · 08a · 3456:9742
- `CardAction / Label` · 07c · 3133:738
- `CardDeal` · 07a · 3013:95390
- `CardDeal / Headline` · 07a · 3036:316
- `CardDeal / Highlights` · 07a · 3040:332
- `CardDeal / Media` · 07a · 3048:330
- `CardDeal / Metric` · 07a · 3019:148
- `CardInfo` · 07d · 3200:1066
- `CardInfo / Content` · 07d · 3190:1178
- `Carousel` · 07j · 3301:1742
- `Carousel / Slide` · 07j · 3299:1436
- `Cascading submenu` · 07n · 3968:2683
- `Chart / Area` · 04k · 4109:1351
- `Chart / Area` · 04k · 4154:3048
- `Chart / Area · Mobile` · 04k · 4163:3179
- `Chart / Axis` · 04k · 4102:1138
- `Chart / AxisTickActive` · 04k · 4146:2517
- `Chart / Bar` · 04k · 4108:1351
- `Chart / Bar` · 04k · 4154:3047
- `Chart / Bar · Mobile` · 04k · 4163:3180
- `Chart / Bar-PnL` · 04k · 4118:1777
- `Chart / Candlestick` · 04k · 4112:1255
- `Chart / Candlestick` · 04k · 4154:3049
- `Chart / Candlestick · Mobile` · 04k · 4165:3290
- `Chart / ChartContainer` · 04k · 4105:1306
- `Chart / ChartTooltip` · 04k · 4104:1128
- `Chart / Combo` · 04k · 4111:1273
- `Chart / Combo` · 04k · 4160:3165
- `Chart / Combo · Mobile` · 04k · 4164:3207
- `Chart / Crosshair` · 04k · 4103:1067
- `Chart / CrosshairGuide` · 04k · 4146:2496
- `Chart / Donut` · 04k · 4154:3050
- `Chart / Donut · Mobile` · 04k · 4164:3205
- `Chart / Gridlines` · 04k · 4102:1065
- `Chart / HoverBand` · 04k · 4146:2516
- `Chart / HoverDot` · 04k · 4146:2491
- `Chart / HoverIndicator` · 04k · 4147:2491
- `Chart / KPI list · Mobile` · 04k · 4165:3293
- `Chart / KPI strip` · 04k · 4161:3194
- `Chart / Legend` · 04k · 4104:1068
- `Chart / Line` · 04k · 4109:1337
- `Chart / Line` · 04k · 4153:3047
- `Chart / Line · Mobile` · 04k · 4163:3178
- `Chart / Pie` · 04k · 4110:1267
- `Chart / ReferenceLine` · 04k · 4103:1058
- `Chart / Scatter` · 04k · 4110:1303
- `Chart / Scatter` · 04k · 4154:3051
- `Chart / Scatter · Mobile` · 04k · 4164:3206
- `Chart / Sparkline` · 04k · 4111:1265
- `Chart / Stacked` · 04k · 4161:3193
- `Chart / Stacked · Mobile` · 04k · 4165:3292
- `Chart / States` · 04k · 4107:1314
- `Chart / Template-Tufte-Bar` · 04k · 4127:1712
- `Chart / Template-Tufte-Sparkline` · 04k · 4127:1735
- `Chart / ValueFlag` · 04k · 4146:2515
- `Chart / Waterfall` · 04k · 4112:1272
- `Chart / Waterfall` · 04k · 4160:3166
- `Chart / Waterfall · Mobile` · 04k · 4165:3291
- `Checkbox` · 03e · 1043:93
- `Checkbox Group` · 03e · 3921:241732
- `Checkbox Indicator` · 03e · 1041:57
- `Checkout` · 08a · 3442:6812
- `Collapsed-Reservation` · 08b · 3448:8514
- `Combobox Field` · 03o · 3887:1126
- `Combobox Menu` · 03o · 3888:1186
- `Command palette` · 07n · 3972:2887
- `Compact Search Trigger` · 03m · 1264:171
- `ComplianceBadge` · 08i · 3673:2408
- `Content` · 07e · 3210:738
- `Countdown` · 08b · 3481:3031
- `Date Calendar Picker` · 03k · 1228:321
- `Date Input` · 03k · 1217:63
- `Date Range Field` · 03k · 1230:801
- `Date Wheel Picker` · 03k · 1219:87
- `dealTags` · 08l · 3023:39526
- `DealTimeline` · 08h · 3663:2618
- `Dialog` · 05h · 2359:2
- `Distribution-schedule` · 08a · 3442:5172
- `Divider` · 04h · 1767:2
- `DragHandle` · 06c · 2542:2
- `Drawer` · 06e · 2706:385
- `Dropdown Item` · 03d · 1026:183
- `Dropdown Menu` · 03d · 1028:279
- `Dropdown menu` · 07n · 3966:2455
- `Empty Illustration / default / Compact` · 05d · 2083:688
- `Empty Illustration / default / Default` · 05d · 2083:647
- `Empty Illustration / error / Compact` · 05d · 2083:712
- `Empty Illustration / error / Default` · 05d · 2083:671
- `Empty Illustration / search / Compact` · 05d · 2083:700
- `Empty Illustration / search / Default` · 05d · 2083:659
- `EmptyState` · 05d · 2066:434
- `FAB / Extended` · 02d · 738:1944
- `FAB / Standard` · 02d · 640:701
- `FAB speed-dial` · 07n · 3985:3145
- `Fade` · 06k · 4012:1050
- `File Item` · 03i · 1138:63
- `File Item with Progress` · 03i · 1147:63
- `Filter menu` · 07n · 3970:2937
- `Form Field` · 03j · 1177:453 · not published
- `Form Field Helper` · 03j · 1174:63
- `Form Field Label` · 03j · 1169:63 · not published
- `Goal / Amount` · 07b · 3113:2866 · wip
- `Goal / Headline` · 07b · 3085:61 · wip
- `Goal / Illustration` · 07b · 3086:57 · wip
- `Goal / PhaseRow` · 07b · 3103:1296 · wip
- `Goal / Summary` · 07b · 3090:97 · wip
- `Goal card` · 08f · 3488:49761 · wip
- `Goal-Card` · 08f · 3488:48634 · not published · wip
- `GoalActivate` · 07b · 3091:392 · wip
- `GoalCard` · 08f · 3519:2731 · wip
- `GoalChart` · 08f · 3521:3470 · wip
- `GoalPlan` · 08f · 3569:2394 · wip
- `GoalTracker` · 07b · 3104:1750 · wip
- `GuaranteeBar` · 08t · 3859:1071
- `Guarantees` · 08t · 3861:1216
- `Guarantees (legacy source)` · 08t · 3658:127481
- `Header` · 06a · 4844:107612 · not published
- `Header Info` · 06a · 4844:107432
- `Icon / chevron-down-sm` · 06j · 2911:1119
- `Icon / more-horizontal` · 06j · 2938:3105
- `Icon / nav-toggle-chevron` · 06j · 2888:878
- `Icon / nav-toggle-menu` · 06j · 2888:874
- `IconButton` · 02b · 502:729
- `illustrations` · 04b · 1552:50025
- `Illustrations` · 05d · 2071:38797
- `Input` · 03a · 828:705 · not published
- `Input Amount` · 03c · 952:636 · not published
- `Input Amount Value` · 03c · 946:480
- `Input Field` · 03a · 826:579
- `Input Helper Text` · 03a · 822:6
- `Input Label` · 03a · 821:17
- `Input Phone` · 03a · 878:2355 · not published
- `Input Phone Value` · 03a · 876:2229
- `Input Underline` · 03a · 859:2214 · not published
- `Input Underline Field` · 03a · 857:2088
- `Input Value` · 03a · 823:14
- `Investment Calculator` · 08a · 3442:5240
- `Investment-amount` · 08a · 3442:6746
- `Issuance List` · 08u · 4093:2406
- `Issuance Row` · 08u · 4059:117428
- `Issuance Row · Arabic` · 08u · 4089:2079
- `Issuance Status Icon` · 08u · 4054:1147
- `IssuanceStatusBadge (Developer)` · 04b · 1486:171
- `IssuanceStatusBadge (Internal)` · 04b · 1487:107
- `IssuanceStatusBadge (Investor)` · 04b · 1485:151
- `Keypad / Amount hero` · 08s · 6035:1605 · not published
- `Keypad / Amount input` · 08s · 6036:3480 · not published
- `Keypad / Hint` · 08s · 6035:901 · not published
- `Keypad / Presets` · 08s · 6035:1189 · not published
- `Keypad / Quick action` · 08s · 6035:1289 · not published
- `Keypad / Summary card` · 08s · 6035:1171 · not published
- `Keypad / Summary row` · 08s · 6035:1065 · not published
- `Keypad / Title row` · 08s · 6035:976 · not published
- `KeyValue` · 04g · 1739:122
- `KYCChecklist` · 08m · 3796:551
- `KYCStep` · 08m · 3789:363
- `KYCTaskRow` · 08m · 3786:470
- `Link` · 02c · 516:2 · not published
- `List` · 07g · 3251:1525
- `List / DescriptionRow` · 07g · 3254:1615
- `List / TextItem` · 07g · 3254:1602
- `ListItem` · 07e · 3212:1071
- `Long-press preview` · 07n · 3989:3225
- `MadaLogo` · 08q · 3822:332
- `Menu` · 07n · 3948:1177
- `MenuItem` · 07n · 3946:1112
- `MenuSectionHeader` · 07n · 3948:1086
- `MenuTrigger` · 07n · 3955:1905
- `MilestoneProgress` · 04j · 1919:434
- `Modal` · 06d · 2681:503
- `MoneyAmount` · 08d · 4240:1642
- `Multi-select field` · 07n · 3981:2871
- `NavigationRail` · 06j · 2855:175 · not published
- `NavRail / NavUser` · 06j · 2959:4550
- `NavRail / TeamSwitcher` · 06j · 2959:4538
- `NavRailItem` · 06j · 2852:101
- `NewsCard` · 07m · 3430:1350
- `NewsCard / Developer Logo` · 07m · 5291:746 · not published
- `NewsCard / Meta` · 07m · 3429:917
- `NewsCard / Poster` · 07m · 5293:963 · not published
- `NewsCard / Poster Actions` · 07m · 5292:170000 · not published
- `NewsCard / Poster Caption` · 07m · 5292:822 · not published
- `NewsCard / Poster Carousel` · 07m · 5293:1456 · not published
- `NewsCard / Poster Media` · 07m · 5291:786 · not published
- `Numbers` · 08b · 3448:7623
- `NumericStepper` · 03p · 3902:1186
- `OTP Input` · 03b · 923:77 · not published
- `PageIndicator` · 07j · 3297:1424
- `Pagination` · 06g · 2736:120
- `PaginationArrow` · 06g · 2735:44
- `PaginationItem` · 06g · 2734:20
- `Payment-details` · 08a · 3448:7619
- `Payouts cell` · 08c · 3618:122684
- `Popover` · 05i · 3927:1106
- `PortfolioHeader` · 08d · 4243:1823
- `ProgressBar` · 04j · 1873:2
- `ProgressBar_Indeterminate` · 04j · 2327:2
- `ProgressSegment` · 05g · 1878:2
- `Promo-code` · 08a · 3442:6739
- `ProvinceSelector` · 08j · 3719:232568
- `Pull-to-refresh` · 06k · 4014:201382
- `QualifiedCalculator` · 08s · 3839:2910 · not published
- `QualifiedCalculator Header` · 08s · 3839:2274
- `Radio` · 03f · 1083:69
- `Radio Group` · 03f · 1086:177 · not published
- `Radio Indicator` · 03f · 1081:57
- `RatingCell` · 08k · 3755:216
- `RatingScale` · 08k · 3756:260
- `RegionChip` · 08j · 3718:190
- `Reinvest / ComparedTo` · 08v · 6255:7960 · not published
- `Reinvest / Illustration · Orbit` · 08v · 5922:245709 · not published
- `Reinvest / MatchStat` · 08v · 6049:3 · not published
- `Reinvest / MaturityRecap` · 08v · 6054:1667 · not published
- `Reinvest / RecommendationCard` · 08v · 6049:299 · not published
- `Reinvest / RecommendationCarousel` · 08v · 6054:1669
- `Reinvest / RecommendationList` · 08v · 6054:1668
- `Reinvest / RecommendationRow` · 08v · 6049:298 · not published
- `Reservation-Calculater` · 08b · 3481:3102
- `ReturnsDisplay` · 08d · 4241:1368
- `SafqahLogo` · 08r · 3831:301
- `Scroll content` · 06k · 4015:1061
- `Scroll shadow` · 06k · 4013:1046
- `Scrollbar` · 06k · 4011:1102
- `ScrollContainer` · 06k · 4015:1157
- `Search Dropdown` · 03m · 1256:171
- `Search Input` · 03m · 1241:63 · not published
- `Search Result Item` · 03m · 1244:63
- `Section` · 07h · 3262:834
- `Segment` · 06l · 4256:1443
- `SegmentedControl_2` · 06l · 4260:1202
- `SegmentedControl_3` · 06l · 4258:1461
- `SegmentedControl_4` · 06l · 4260:1351
- `SegmentedControl_5` · 06l · 4260:1536
- `SegmentedTabItem` · 06b · 2518:62
- `SegmentedTabs` · 06b · 2523:90
- `Select` · 03d · 1024:183 · not published
- `Select Underline` · 03d · 1065:1128 · not published
- `Select Value` · 03d · 1022:57
- `SelectionList` · 07g · 3242:866
- `SelectRow` · 07g · 3241:876
- `ShariaDisclosure` · 08i · 3681:2658
- `Sheet Content / Amount` · 06c · 2650:98
- `Sheet Content / Amount keypad` · 08s · 5548:94341 · not published
- `Sheet Content / Blank` · 06c · 2699:12
- `Sheet Content / Empty` · 06c · 2650:293
- `Sheet Content / Form` · 06c · 2649:137
- `Sheet Content / List` · 06c · 2652:296
- `Sheet Content / Media` · 06c · 2686:22
- `Sheet Content / Summary` · 06c · 2646:149
- `Sheet Content / Text` · 06c · 2628:14
- `SheetFooter` · 06c · 2633:157
- `SheetHeader` · 06c · 2615:13
- `SkeletonAvatar` · 05e · 2158:4
- `SkeletonBlock` · 05e · 2158:2
- `SkeletonCircle` · 05e · 2158:3
- `SkeletonLine` · 05e · 2156:2
- `Slider` · 03h · 1117:57
- `Slider Field` · 03h · 1121:225 · not published
- `Small Timer` · 08b · 3448:8480
- `Small-Numbers` · 08b · 3448:7746
- `SocialButton` · 02f · 805:249 · not published
- `Sort menu` · 07n · 3969:2795
- `SpinnerBouncingDots` · 05f · 2188:5
- `SpinnerDotOrbit` · 05f · 2188:3
- `SpinnerHourglass` · 05f · 2188:8
- `SpinnerPulseRings` · 05f · 2188:6
- `SpinnerRing` · 05f · 2188:2
- `SpinnerSafqahBrand` · 05f · 2188:9
- `SpinnerSquareMorph` · 05f · 2188:7
- `SpinnerWaveBars` · 05f · 2188:4
- `Stat` · 04f · 1678:598
- `StatusPill` · 04e · 1654:178
- `StepConnector` · 06h · 2747:16
- `StepIndicator` · 06h · 2746:17
- `Stepper` · 06h · 2752:66
- `Switch` · 03g · 1101:105
- `Switch Indicator` · 03g · 1099:57
- `TabBar` · 06b · 2527:350
- `TabBar (3-tab)` · 06b · 2568:739
- `Table / ActionCell` · 07k · 3320:262
- `Table / ActionCell` · 07k · 3351:197
- `Table / Cell` · 07k · 3316:115
- `Table / HeaderCell` · 07k · 3317:127
- `Table / Toolbar` · 07k · 3322:410
- `Tag` · 04a · 1306:63 · not published
- `Tag Group` · 04a · 1313:89
- `Tag Removable` · 04a · 1311:63 · not published
- `TextArea` · 03n · 1285:311 · not published
- `TextArea Field` · 03n · 1281:63
- `TextArea Underline` · 03n · 1287:311
- `TimelineNode` · 04i · 1823:18
- `TimelineRow` · 04i · 1836:306
- `Timer` · 08b · 3448:8467
- `Timer-type` · 08b · 3448:8465
- `Toast` · 05b · 1964:142
- `Tooltip` · 04d · 1624:162
- `TrendBadge` · 06b · 2517:30
- `Upload Button` · 03i · 1141:63
- `UserGreeting` · 08d · 4241:1280 · not published
- `WalletChip` · 08d · 4241:1317


---

# Components: recipes

# Composition recipes

Slot-by-slot recipes for the blocks and screens agents build most often, using only Syntropy components with exact variant values. Arabic RTL first: set the set's own RTL value (`Direction=RTL`, `Direction=rtl`, `Language=RTL`) in Figma; in code pass no direction. "(np)" = not in the published library (see `unpublished.md`). Tokens for the surrounding layout come from syntropy-foundations; copy rules from syntropy-content.

## Rules
1. Start from the closest recipe and change only what the need requires.
   Why: recipes encode the decisions already made (one primary, sheet on mobile, states).
2. Every recipe needs its five states: empty, loading, error, success, disabled. Each recipe names them.
   Why: a screen without states is half a design.
3. Copy in recipes is an example; keep the structure (label, control, at most one hint) and Western digits with currency after the amount.
   Why: minimal copy and number format are Safqah rules.

## Index
| # | Recipe | Main components |
|---|---|---|
| 1 | Investment confirmation sheet | BottomSheet, Sheet Content / Summary, ComplianceBadge, Checkbox, SheetFooter |
| 2 | Amount entry, retail form | Input Amount, Button |
| 3 | Amount entry, qualified keypad | Keypad / Amount input |
| 4 | Amount entry inside a sheet | BottomSheet, Sheet Content / Amount |
| 5 | Deals feed | Section, Carousel, CardDeal, SegmentedControl_3 |
| 6 | Deal list loading and empty | SkeletonBlock, SkeletonLine, EmptyState |
| 7 | Deal page | Base card, dealTags, IssuanceStatusBadge (Investor), Stat, ProgressBar, KeyValue, DealTimeline, Guarantees, ShariaDisclosure |
| 8 | Filter chips above a list | Tag Group, Tag Removable, Filter menu |
| 9 | KYC checklist hub | KYCChecklist, KYCTaskRow, ProgressBar |
| 10 | KYC bank step | KYCStep, Stepper, Input, Alert |
| 11 | Settings list | ActionList, ListItem, Switch |
| 12 | Notification settings | ActionList, ListItem Has toggle |
| 13 | Payouts list | Section, Payouts cell, Divider |
| 14 | Portfolio overview | PortfolioHeader, SegmentedTabs, Issuance List |
| 15 | Empty deals (no open deals) | EmptyState, ActionPrompt, CardDeal State=Closed |
| 16 | Error banner on a form | Alert, field error states |
| 17 | Destructive confirmation | Dialog Tone=destructive |
| 18 | Reservation hold | Countdown, Small Timer, Collapsed-Reservation |
| 19 | Sign in with phone and OTP | Input Phone, OTP Input, SocialButton, AbshirLogo |
| 20 | Document upload | Upload Button, File Item with Progress |
| 21 | Transaction receipt | KeyValue, List Style=Description, Toast |
| 22 | Back-office table with toolbar | Table / Toolbar, Table / HeaderCell, Table / Cell, Table / ActionCell, Pagination |
| 23 | Back-office app shell | AppSidebar (shadcn-style), Breadcrumb, Chart / KPI strip |
| 24 | Overflow actions on a card or row | MenuTrigger, Dropdown menu, Action sheet |
| 25 | Help and FAQ | Section, Accordion, CardInfo |
| 26 | NPS feedback sheet | BottomSheet, RatingScale, TextArea |
| 27 | Maturity and reinvest sheet | Reinvest / MaturityRecap, Reinvest / RecommendationList |
| 28 | Portfolio chart card on mobile | Chart / Line · Mobile, SegmentedControl_5, Chart / States |
| 29 | Payment method choice | SelectionList, SelectRow, MadaLogo |
| 30 | Home quick actions and nudge | ActionTile, ActionPrompt, Banner |

## 1. Investment confirmation sheet
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Shell | `BottomSheet` `showHandle=true` `showHeader=true` `showFooter=true` `Direction=RTL` | Mobile. On web use `Modal` `Size=md` with the same parts |
| 2 | Header | `SheetHeader` `showSubtitle=true` `showClose=true`: «مراجعة الاستثمار», subtitle = deal name | |
| 3 | Summary | Content = `Sheet Content / Summary`: `KeyValue` rows «المبلغ» `5,000.00 ر.س`, «رسوم الوكالة (1% من الربح)», «صافي الربح المتوقع» `612.50 ر.س`, «نسبة صافي العائد المتوقع» `12.3%`, «موعد التوزيع المتوقع»; `Divider`; total row «المبلغ المخصوم من المحفظة» `Emphasis=strong` | Fees with VAT shown before confirming; projections say «متوقع» |
| 4 | Compliance | `ComplianceBadge` `Type=Shariah` `Direction=RTL` | Real approval only |
| 5 | Consent | `Checkbox` `Size=lg` `State=unchecked` «اطلعت على نشرة الإصدار وأوافق على الشروط» with a `Link` (np) to the offering file | Never pre-ticked |
| 6 | Footer | `SheetFooter` `Layout=Stacked` `showSecondary=true`: primary `Button` `Variant=primary` `Size=lg` «تأكيد الاستثمار», secondary «تعديل المبلغ» | Primary `State=disabled` until consent; `State=loading` while submitting |
States: loading summary → `SkeletonLine` rows; submit failed → `Alert` `Tone=error` `Style=Filled` inside the sheet, amount kept, primary becomes «إعادة المحاولة»; success → confirmation screen (`Illustrations` `Property 1=Chosen checkmark`, `KeyValue` reference with copy icon, `Button` primary «عرض استثماري»).
Not: a full-page `Modal` on mobile, two primaries, the fee inside a `Tooltip`.

## 2. Amount entry, retail form
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` (np) `Type=Close Icon-Black` `Direction=RTL` «مبلغ الاستثمار» | |
| 2 | Wallet | `WalletChip` `Direction=RTL` | What is available before typing |
| 3 | Amount | `Input Amount` (np) `Size=lg` `Show Label=true` «المبلغ», helper «بمضاعفات 1,000 ر.س» | Fixed steps instead: `Amount Stepper` |
| 4 | Projection | `KeyValue` «صافي الربح المتوقع» with `MoneyAmount` | Label «متوقع» |
| 5 | Footer | `Button` `Variant=primary` `Size=lg` «متابعة» | Opens recipe 1 |
States: empty → CTA `State=disabled`; invalid → `Input Amount` `State=error` with the fix in the helper; deal filled meanwhile → `Alert` `Tone=warning` «اكتمل تمويل الصفقة» and CTA disabled.

## 3. Amount entry, qualified keypad
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` (np) `Type=Close Icon-Black` | |
| 2 | Body | `Keypad / Amount input` (np) `State=Empty` / `Valid` / `Not multiple` / `Snap` / `Above cap` / `Above remaining` / `Wallet shortfall` / `Thousands` `Direction=RTL` | Contains `Keypad / Amount hero`, one context block (`Keypad / Presets`, `Keypad / Summary card` `Type=Projection` or `Ledger`, `Keypad / Quick action`) |
| 3 | CTA | `Button` `Variant=primary` `Size=lg`: «استثمر 5,000 ر.س» when valid, «أودع 2,000 ر.س وأكمل» on shortfall | Label tracks the amount |
Rules: multiples of 1,000 up to 500,000 per payment; explain every rejection while typing.

## 4. Amount entry inside a sheet
`BottomSheet` (`showHandle`, `showHeader`, `showFooter`) → `SheetHeader` «كم تريد أن تستثمر؟» → Content `Sheet Content / Amount` (Input Amount plus Slider) or `Sheet Content / Amount keypad` (np) for the qualified keypad → `SheetFooter` `Layout=Stacked` with one primary «متابعة». Quantity of units instead of money → `NumericStepper` in `Sheet Content / Form`.

## 5. Deals feed
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` (np) `Type=main screens` `Direction=RTL` | |
| 2 | Filter | `SegmentedControl_3` `Style=pill-thumb` `Size=md` `Direction=RTL`: «متاحة» · «قادمة» · «مغلقة» | A value on the same view, not navigation |
| 3 | Featured | `Section` `Size=Lg` «صفقات متاحة الآن» `Has action=true` «عرض الكل»; `Carousel` `Type=Cards` `Size=Md` of `CardDeal` `Layout=Hero` `State=Available` + `PageIndicator` `Style=Dots` | |
| 4 | Rest | vertical stack of `CardDeal` `Layout=Row` | `Qualified=true` only for qualified users |
| 5 | Compliance | `ShariaDisclosure` `Direction=RTL` | |
| 6 | Bottom nav | `TabBar (3-tab)` `Active=1` `Direction=RTL` | |

## 6. Deal list loading and empty
Loading: per card `SkeletonBlock` `Radius=Large` (image), `SkeletonLine` `Size=Large` `Width=3Q` (title), `SkeletonLine` `Size=Small` `Width=Half` (metrics); same count as the real page. Empty after filters: `EmptyState` `Tone=search` with «مسح الفلاتر». Failed: `EmptyState` `Tone=error` with Retry. Nothing open at all: recipe 15.

## 7. Deal page
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Hero | `Base card` (np) `Platform=Mobile` `State=Expanded` `Direction=RTL`, `Has Subtitle`, `Has Lable`, `Has meta`, `Has developer` | Collapses to `State=Collapsed` on scroll |
| 2 | Badges | `dealTags` inside the hero (`Type=Type7` qualified only; at most one tier `Premium` / `Basic`) | Max two |
| 3 | Status | `IssuanceStatusBadge (Investor)` `Status=` live state `Direction=RTL` | Never a `StatusPill` for lifecycle |
| 4 | Headline numbers | 2 or 3 `Stat` `Size=md` `Layout=vertical` `HasDelta=false` | «نسبة العائد المتوقع» starts with نسبة |
| 5 | Funding | `ProgressBar` `Size=md` `Tone=brand` `showLabel=true` «نسبة التمويل» `72%` `Direction=RTL` | Live value only |
| 6 | Facts | `Section` `Size=Md` «تفاصيل الصفقة» + `KeyValue` rows with `Divider` `Tone=subtle`; one `Emphasis=strong` | |
| 7 | Calculator | Qualified: `Calculator / Duration picker` → `Calculator / Amount card` → `Calculator / Results card` (np). Retail: `Investment Calculator` | Projections «متوقع» |
| 8 | Lifecycle | `Section` «مراحل الصفقة» + `DealTimeline` `Direction=RTL` | One active stage |
| 9 | Guarantees | `Section` «الضمانات» + `Guarantees` `Coverage=` real level | Values from the offering file |
| 10 | Developer | `CardInfo` `Type=Avatar` `Tone=Neutral` | |
| 11 | Updates | `NewsCard / Poster Carousel` (np) or `NewsCard` `Style=Plain` | Only if updates exist |
| 12 | Compliance | `ShariaDisclosure` + `ComplianceBadge` `Type=CMA` | |
| 13 | FAQ | `Accordion` `Style=Plain` of `AccordionItem` `State=Collapsed` | Never fees or risk |
| 14 | Sticky CTA | `Button` `Variant=primary` `Size=lg` «استثمر الآن» with the risk line beside it | The only primary |

## 8. Filter chips above a list
`ScrollContainer` `Axis=horizontal` `fadeEnd=true` → `Tag Group` (published) `Layout=wrap` (or `overflow` in dense rows) holding applied filters as `Tag Removable` (np) `Tone=brand` `Size=md`, plus a `Button` `Variant=tertiary` `Size=md` «الفلاتر» with a leading filter icon (label required, the icon is not universal). The button opens `Filter menu` (web) or a `BottomSheet` with `SelectionList` `Mode=Multi` or `ProvinceSelector` `Selection=Multi` (mobile). Static, non-removable labels are `Tag`, never `Tag Removable`.

## 9. KYC checklist hub
`AppBar` (np) `Type=Inner screens` «توثيق الحساب» → `ProgressBar` `Size=sm` `Tone=brand` `showLabel=true` «اكتمل 3 من 5» → one `Alert` `Tone=warning` `Style=Filled` `showButton=true` only when an item was rejected → `KYCChecklist` `Direction=RTL` with `KYCTaskRow` `State=Completed` / `Current` / `Upcoming` (`AbshirLogo` `Size=24` `Tone=Brand` on the identity task) → `Button` `Variant=primary` `Size=lg` «متابعة».

## 10. KYC bank step
`KYCStep` `Direction=RTL` already composes `Stepper`, `Section`, `Input`, `Alert` and `Button`. Set: Stepper current = Bank; `Section` `Size=Lg` «الحساب البنكي» with one-line description; `Alert` `Tone=info` `Style=Outlined` «يجب أن يكون الحساب باسمك كما في الهوية» before the IBAN field; `Input` IBAN; bank picker `Combobox Field`; footer primary «متابعة», back `Variant=secondary`. IBAN certificate upload: recipe 20.

## 11. Settings list
`AppBar` (np) `Type=Inner screens` «الإعدادات» → per group `ActionList` `Style=Grouped` `Has header=true` (`Has footer=true` for one hint) of `ListItem` rows: navigation `Has leading=true` `Has chevron=true`; value rows `Has value=true` (language «العربية»); toggles `Has toggle=true` (Face ID). Last row's divider off (`Has divider=false`). Sign out: a `ListItem` in its own last group, confirmed by `Dialog` `Tone=destructive`. Not: `List` (read-only), `SelectionList` (choice).

## 12. Notification settings
One master `ListItem` `Has toggle=true` «الإشعارات» at the top, then `ActionList` `Style=Grouped` per topic (الصفقات الجديدة، التوزيعات، تحديثات الحساب) with `ListItem` `Has toggle=true` rows per channel. Switches apply instantly; no Save button. When system permission is off: one `Banner` `Tone=warning` with «فتح الإعدادات». Topics chosen together and saved on submit (onboarding) → `Checkbox Group` instead.

## 13. Payouts list
`AppBar` (np) `Type=Inner screens` «التوزيعات» → `SegmentedControl_2` «القادمة» · «المستلمة» (optional) → per year `Section` `Size=Sm` «2026» with the year total → stacked `Payouts cell` `Direction=rtl` (`Property 1=Upcoming`, `Done - Payout`, `Done - Captial`, `Late`, `Defaulted`, `Partially repaid`...) separated by `Divider`; never one card per row. `Late` and `Defaulted` shown honestly with day counts. Empty → `EmptyState` `Tone=default` «لا توجد توزيعات بعد». Loading → `SkeletonLine` rows.

## 14. Portfolio overview
`PortfolioHeader` `Direction=RTL` `Balance=Shown` / `Masked` (`Show wallet`, `Show returns`, `Show payouts table`) → at most one `Alert` `Tone=warning` `Style=Outlined` → `SegmentedTabs` `Active=1` «استثماراتي النشطة» · «المكتملة» → `Section` `Size=Md` «حسب الحالة» + `Issuance List` of `Issuance Row` `Language=RTL` (`State=Open` lists `CardDeal` `Layout=Row` `State=Invested`) → `Section` «الدفعة القادمة» + one `Payouts cell` `Property 1=Upcoming` → `TabBar (3-tab)`. Returns label says it includes expected profit.

## 15. Empty deals (no open deals right now)
Not an error and not blank: `EmptyState` `Tone=default` `Size=Default` with title «لا توجد صفقات متاحة حالياً» and one line that new deals are on the way; `showButton=true` «فعّل التنبيه» (notify me). Below: `ActionPrompt` `Tone=Brand` for deal alerts (only if the EmptyState button is not used; one CTA), then `Section` «من صفقاتنا الناجحة» + `Carousel` of `CardDeal` `State=Closed` with `dealTags` `Type=Closed` (real outcomes only). Never fake upcoming dates.

## 16. Error banner on a form
Submit failed for the form as a whole → one `Alert` `Tone=error` `Style=Filled` at the top of the form (`title` what happened, `description` what to do, `showButton` only for Retry). Field problems → each field `State=error` with its helper (`Input Helper Text` `Tone=error` or `Form Field Helper` `Tone=error`); focus the first invalid field. Account-wide failure (payout transfer failed) → `Banner` `Tone=error` on the page instead. Never `Toast` for an error the user must fix.

## 17. Destructive confirmation
`Dialog` `Size=sm` `Tone=destructive` `showIcon=true` `showCancel=true` `showDescription=true` `Direction=RTL`: title «إلغاء الحجز؟», description what is lost, confirm label names the action «إلغاء الحجز» (red confirm), cancel «تراجع». Triggered by `Button` `Variant=destructive` or a `MenuItem` `State=destructive`. Not for reversible actions. After success: `Toast` `Tone=success`.

## 18. Reservation hold
`BottomSheet` with `SheetHeader` «تم حجز 50,000 ر.س» and `Sheet Content / Summary` → `Countdown` `Has Lable=true` `Direction=RTL` for windows in days, plus the absolute time «ينتهي الحجز في 15 أكتوبر 2026، 18:00» → persistent `Collapsed-Reservation` `Direction=RTL` (`Has Multi-deals ` for several holds) on the deal page and portfolio → inline `Small Timer` `Property 1=Black` (`Yellow` near the end). Only a real server expiry; say what happens at 00:00; never reset.

## 19. Sign in with phone and OTP
Screen 1: `AppBar` (np) `Type=Onboarding` → title text style + one muted line → `Input Phone` (np) `Size=lg` `State=focus` `Direction=rtl` (+966) → `Button` `Variant=text` «فقدت رقم جوالي» → `Button` `Variant=primary` `Size=lg` «متابعة». Nafath option: `SocialButton` (np) «تسجيل الدخول عبر نفاذ» with `AbshirLogo`. Screen 2: `OTP Input` (np) `Length=4` `State=empty` → `partial` → `complete` / `error`; resend as `Link` (np) or `Button` `Variant=text`; verifying → `Button` `State=loading`. Light sign-in fields elsewhere: `Input Underline` (np).

## 20. Document upload (IBAN certificate, ID)
`Form Field Label` (np) «شهادة الآيبان» → `Upload Button` `State=default` (`Show hint=true` «PDF أو صورة، حتى 5 ميجابايت») → after picking, `File Item with Progress` `State=progress` → `complete` / `uploaded` (View file, remove) or `error` (Retry). Many files: one `File Item with Progress` per file, plus `ProgressSegment` row for «2 من 3».

## 21. Transaction receipt
`AppBar` (np) `Type=Close Icon-Black` → `Illustrations` `Property 1=Chosen checkmark` → title «تم التحويل» → `KeyValue` `Layout=horizontal` rows: «المبلغ» (`Emphasis=strong`), «التاريخ», «الرقم المرجعي» with `HasIcon=true` copy icon; copying confirms with `Toast` `Tone=success` `Size=Small` «تم النسخ». Breakdown with a total → `List` `Style=Description` with `List / DescriptionRow` `Emphasis=Total`. One primary «تم».

## 22. Back-office table with toolbar
| # | Slot | Component and values |
|---|---|---|
| 1 | Toolbar | `Table / Toolbar` `Mode=Default` (search, filter, sort, applied `Tag Removable`); `Mode=Selection` after rows are selected (count plus bulk actions) |
| 2 | Header row | `Table / HeaderCell` per column (`Sort=None` / `Asc` / `Desc`, first column `Has select-all=true`), `Density=Default` or `Compact` |
| 3 | Body | `Table / Cell` one `Type` per column: `Text`, `Numeric` (end-aligned amounts), `Avatar`, `Tag`, `Status` (`IssuanceStatusBadge (Internal)` or `StatusPill`), `Trend`, `Progress`, `Select` |
| 4 | Row actions | `Table / ActionCell` (cite 3320:262 or 3351:197) with overflow `Menu` |
| 5 | Footer | `Pagination` `Type=table` (rows per page plus «1-10 من 200») |
| 6 | Filters panel | `Drawer` `Side=` trailing edge, Content `Sheet Content / Form`, `SheetFooter` `Layout=Row` (Apply, Reset) |
| 7 | States | loading `SkeletonLine` rows; empty `EmptyState` `Size=Compact` `Tone=search`; error `Alert` `Tone=error` above the table |
Mobile instead of a table: rows as cards with `KeyValue`, filters in `Filter menu` or `Bottom-sheet menu`.

## 23. Back-office app shell
`AppSidebar (shadcn-style)` `Variant=Standard` `Mode=Expanded` (`Collapsed` on dense screens) `Direction=LTR` or `RTL` with `NavRail / TeamSwitcher`, search, `NavRailItem` groups, `NavRail / NavUser` → page header with `Breadcrumb` `Type=full` (3 or more levels) and title → `Chart / KPI strip` (or a grid of `Stat`) → content (recipe 22). Command search → `Command palette`. Plain rail without workspace or search → `NavigationRail` (np).

## 24. Overflow actions on a card or row
Trigger: `MenuTrigger` `Glyph=kebab` (vertical) or `meatball` with an accessible label. Web: `Dropdown menu` `Placement=bottom-end` `Direction=rtl` holding `Menu` of `MenuItem` (destructive item last, below a `Divider`, `State=destructive`). Mobile: `Action sheet` (a few actions plus Cancel) or `Bottom-sheet menu` (grouped). Long-press may add `Long-press preview`, never as the only path. Table rows: `Table / ActionCell`.

## 25. Help and FAQ
`AppBar` (np) `Type=Inner screens` «المساعدة» → `Search Input` (np) to filter questions → per topic `Section` `Size=Md` + `Accordion` `Style=Boxed` of `AccordionItem` `State=Collapsed` (max about 5 per group) → `CardInfo` `Type=Avatar` `Tone=Brand` «تحتاج مساعدة؟ تحدث مع مستشارك» → contact actions as `ListItem` `Has chevron`. No results → `EmptyState` `Tone=search`.

## 26. NPS feedback sheet
`BottomSheet` `showHandle=true` → `SheetHeader` «ما مدى احتمال أن توصي بصفقة لصديق؟» → `RatingScale` `Direction=RTL` (anchors «غير محتمل إطلاقاً» / «محتمل جداً») → optional `TextArea` (np) «ما السبب؟» with `Show Counter` only if limited → `SheetFooter` primary «إرسال», secondary «لاحقاً». After sending: `Toast` `Tone=success` «شكراً لملاحظاتك».

## 27. Maturity and reinvest sheet
`BottomSheet` → Content `Reinvest / MaturityRecap` (np) `Direction=RTL` (orbit, «اكتمل استثمارك في مدماك», returned amount with `MoneyAmount`, capital / profit / realised return `KeyValue`, equal Reinvest and Keep buttons, `Show withdraw` when relevant) → Reinvest opens `Reinvest / RecommendationList` (published, up to 3 `Reinvest / RecommendationRow` with `Reinvest / ComparedTo` and the not-advice disclaimer) or `Reinvest / RecommendationCarousel` (`State=Card 1` / `Card 2`). Never «مناسبة لك» or "recommended for you"; prefill with capital only; keep Reinvest and Keep at equal weight exactly as the organism ships them (never restyle one louder).

## 28. Portfolio chart card on mobile
`Section` `Size=Md` «أداء محفظتك» → `SegmentedControl_5` `Style=pill-thumb` `Size=sm` «شهر · 3 أشهر · 6 أشهر · سنة · الكل» → `Chart / Line · Mobile` `Direction=RTL` `State=Default` (time still runs left to right, Western digits, currency with the Riyal icon) → states `Chart / States` `State=loading` / `empty` / `error`. Desktop: `Chart / Line` (4153:3047) inside the same section. One KPI only → `Stat`.

## 29. Payment method choice
`AppBar` (np) `Type=Inner screens` «إيداع في المحفظة» → `Input Amount` (np) `Size=lg` → `SelectionList` `Mode=Single` `Has header=true` «طريقة الدفع» of `SelectRow` `Type=Radio` (mada with leading `MadaLogo` `Size=24` `Tone=Brand`, Apple Pay, bank transfer; `Has value=true` hint «فوري» / «1-2 يوم عمل») → `Form Field Helper` `Tone=info` for a limit → `Button` `Variant=primary` `Size=lg` «متابعة» disabled until a method is chosen. Inside the legacy invest flow the equivalent is `Checkout` (`Method=ApplePay` / `Bank-transfer` / `Credit-card`).

## 30. Home quick actions and nudge
`AppBar` (np) `Type=main screens` (or `Header Info` when the investor has returns) → at most one `Banner` (KYC or IBAN verification reminder with «توثيق») → `ActionTile` grid `Style=Vertical` `Size=Default` (إيداع، سحب، كشف الحساب) → one `ActionPrompt` `Tone=Warning` for a must-do task, or `MilestoneProgress` `Size=Large` for profile completion → `Section` + `Carousel` of `CardDeal` → `TabBar (3-tab)` `Active=1`. Never a Banner and an ActionPrompt for the same task.


---

# Voice and tone

# Voice and tone (T1-T6)

How Safqah sounds in product copy and microcopy. Read this before writing or reviewing any user-facing string: labels, errors, empty states, notifications, disclosures. Arabic is canonical; English is a translation guide. When the two diverge, the Arabic decision wins.

## The voice in one paragraph
Safqah is a Sharia-compliant investment platform serving investors who make real financial decisions. Copy is **clear, calm, confident and respectful**: a knowledgeable advisor, not a salesperson and not a friend. Plain Arabic that does not talk down. Precise financial language without hiding behind jargon. Risk acknowledged honestly. Never flatter, never pressure with urgency, never minimise compliance disclosures.

## Rules

1. **T1. Clarity over cleverness.** Plain Arabic. No buzzwords, no marketing flourish in functional copy.
   Why: investors scan for facts; flourish hides them.
2. **T2. Precise on numbers, transparent on risk.** State profit projections, return percentages and risk ratings exactly. Never round up; never bury a risk disclosure. Percent labels in Arabic start with «نسبة» (see `numbers-currency.md`).
   Why: a rounded-up return or a hidden risk is a broken promise, and a CMA problem.
3. **T3. Respect, not flattery.** No «صديقي» / "buddy". No "you're amazing for investing!". Address investors as adults making financial decisions. No celebration emojis on financial events.
   Why: flattery reads as manipulation in a financial context.
4. **T4. Sharia disclosures are first-class copy, not legal noise.** Compliance text meets the same clarity standard as everything else: 2-4 short sentences, readable size, explains the structure.
   Why: a disclosure nobody reads protects nobody.
5. **T5. Errors explain what to do, not what went wrong.** Every error gives the next action.
   Why: the user should fix it without reading twice.
6. **T6. No fake urgency.** Timers reflect real deadlines. Empty states don't pressure. Notifications don't manufacture FOMO.
   Why: pressure tactics are a dark pattern and erode trust.
7. **Minimal copy.** A label, the control, at most one short hint. No explanatory paragraphs on screen. Few alerts and toasts.
   Why: matches the restraint of shipped Safqah screens; every extra line competes with the numbers.
8. **Warnings are not errors.** Copy for a warning state uses the warning tone (`Tone=warning`); reserve error/red wording and styling for critical or defaulted states.
   Why: alarm fatigue; red must still mean something.
9. **Name the thing.** Success and status copy names the specific deal, amount or step, not "it" or "your request" when the specific name is known.
   Why: confirms exactly what happened.

## Examples

### Paired tone examples (T1-T6)
| Rule | Do (Arabic / English) | Don't (Arabic / English) |
|---|---|---|
| T1 | «صفقة جديدة متاحة» / "New deal available" | «فرصة العمر بانتظارك» / "The opportunity of a lifetime awaits" |
| T2 | «نسبة العائد المتوقع 8.5%، تصنيف المخاطر: متوسط» / "Expected return 8.5%, risk rating: medium" | «عائد ممتاز» / "Excellent returns" with the risk rating in fine print |
| T3 | «تم استلام طلبك» / "Your request has been received" | «رائع! 🎉 أنت بطل!» / "Awesome! 🎉 You're a champion!" |
| T4 | A `ShariaDisclosure` explaining the structure (Murabaha, Ijara) in 2-3 sentences | A wall of legal Arabic at 9px that users skip |
| T5 | «رقم الجوال يجب أن يبدأ بـ 05» / "Phone number must start with 05" | «خطأ: قيمة غير صالحة» / "Error: invalid value" |
| T6 | «الصفقة تغلق خلال 3 أيام» / "Deal closes in 3 days" (when it really does) | «اشترك الآن!! العرض ينتهي قريباً!!!» / "Sign up now!! Offer ending soon!!!" |

### Copy types, what good looks like
Length limits per type: `copy-lengths.md`.

| Type | Arabic | English | Notes |
|---|---|---|---|
| Labels and buttons | «استثمر الآن» · «حفظ» · «متابعة» · «إلغاء» | "Invest now" · "Save" · "Continue" · "Cancel" | Verb first for actions; single noun for destinations. Never «اضغط هنا» / "Click here". |
| Helper text | «يرجى إدخال رقم الجوال السعودي المسجل لديك» | "Enter your registered Saudi phone number" | What to enter and why. No condescension, no essay. |
| Error | «كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل رقماً» | "Password must be at least 8 characters and include a number" | Next action is obvious on first read. |
| Success | «تم استثمارك بنجاح في صفقة [اسم الصفقة]» | "Your investment in [Deal Name] has been confirmed" | Confirms the action, names the thing, no emoji. |
| Compliance and disclosure | «تستثمر صفقة في عقود مرابحة متوافقة مع أحكام الشريعة الإسلامية، تحت إشراف هيئة شرعية مستقلة. الاستثمار ينطوي على مخاطر، وقد تخسر جزءاً من رأس المال.» | "Safqah invests through Sharia-compliant Murabaha contracts, supervised by an independent Sharia board. Investment carries risk; you may lose part of your capital." | Explained, not just stated. Risk named, not minimised. |
| Empty state | «لا توجد صفقات مفتوحة حالياً. سنخبرك عند توفر صفقة جديدة.» | "No open deals right now. We'll notify you when a new deal is available." | Explains the state and what happens next. Doesn't apologise. |
| Onboarding and education | «صفقة تتيح لك الاستثمار في عقود مرابحة بدءاً من 1,000 ر.س» | "Safqah lets you invest in Murabaha contracts starting from 1,000 SAR" | Value in concrete terms, a specific number, no fluff. |

### Vocabulary do / don't
| Use | Avoid | Why |
|---|---|---|
| «الربح» / profit, «نسبة الربح» / profit rate | «فائدة» / interest, APR | Interest implies riba; Safqah products are riba-free |
| «صكوك» / Sukuk | «سندات» / bonds | Sukuk represent entitlement under Murabaha, not bonds |
| «المطور العقاري» / Developer | «المقترض» / borrower | Borrower implies conventional lending |
| «مستثمر مؤهل» / Qualified Investor | "accredited" / "sophisticated" investor | CMA term; the others are foreign or different legal terms |
| «هيئة الرقابة الشرعية» / Sharia Board | "religious board", "fatwa board" | Formal name |
| «ثلاث ضمانات» / Three Guarantees, listing all three | «ضمانات» alone | Always list land pledge + company PN + personal PNs |
Full term list: `glossary.md`.

### Warning vs error copy
| State | Tone | Arabic | English |
|---|---|---|---|
| Payment 30 days late | `warning` | «السداد متأخر. نتابع مع المطور.» | "Payment is late. We're following up with the developer." |
| Defaulted | `error` | «الصفقة متعثرة. بدأت إجراءات التحصيل.» | "This deal has defaulted. Recovery has started." |


---

# Numbers and currency

<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# Numbers, currency, percentages and dates

How to write numerals, SAR amounts, separators, decimals, percentages and dates in Arabic and English UI. Read this whenever a string contains a number. These rules are the "locale rule" that `docs/CONVENTIONS.md` refers to.

## Rules

### Numerals
1. Use Western digits (0-9) in both Arabic and English UI. Eastern Arabic digits (٠-٩) only when an editorial or branding context explicitly requires them, and never for amounts users transact with.
   Why: matches Saudi banking apps; one digit system avoids misreads on money.
2. Digits keep their natural left-to-right order inside Arabic text. Phone numbers, IBANs, dates and percentages never reverse (see `knowledge/ux/rtl.md` R2).
   Why: a reversed number is a wrong number.

### Currency (SAR)
3. The currency always comes **after** the amount, in both languages.
   - Arabic text: `1,250.50 ر.س`
   - English text: `1,250.50 SAR`
   - Where the UI renders the Saudi Riyal symbol (amount atoms that use `Icon / riyal`), the symbol follows the number the same way, never before it.
   Why: one placement rule for both locales; matches the Notion currency rule and `AGENTS.md`.
4. Never abbreviate SAR as "SR". Do not mix «ريال» in running UI amounts; use «ر.س» or the riyal symbol. «ريال» is acceptable in long-form sentences only.
   Why: consistent, scannable amounts.
5. Prefer the riyal symbol (`Icon / riyal`) in amount displays where the component supports it; use «ر.س» / "SAR" in plain text strings, notifications and anywhere an icon cannot render.
   Why: the later Notion revision asks for the riyal logo when referring to SAR.
- Note: the earlier Notion copy said "«ر.س» in Arabic, «SAR» in English, always after the amount"; the later copy (`...4215`) says "use the riyal logo when referring to SAR". Both are kept: symbol in amount components, text suffix elsewhere.
- Note: some built component defaults show the code first (`SAR 1,200`, `Minimum investment: SAR 1,000`), and `docs/CONVENTIONS.md` shows `SAR 1,250.00`. These conflict with rule 3; treat them as defaults to override, and write `1,200 SAR`.

### Separators and decimals
6. Thousands separator is a comma, even in Arabic UI: `1,000`. Decimal separator is a full stop: `1,250.50`. Never the Arabic decimal sign (٫) or thousands sign (٬).
   Why: consistency with Saudi banking displays.
7. Transactional amounts (balances, payments, investment amounts, fees, payouts) show two decimals: `1,250.50 ر.س`, `50,000.00 SAR`.
   Why: transactions are exact to the halala.
8. Projections and goals may use whole numbers: `100,000 ر.س`.
   Why: false precision on a projection implies a guarantee.

### Percentages
9. Percentages show one decimal place: `8.5%`. Never round to `8%` when the real rate has decimal precision. The `%` sign follows the number with no space, in both languages.
   Why: T2, precise on numbers.
   - Note: one built default shows `16.00%` (two decimals). Use one decimal unless a regulatory document requires more.
10. **Arabic labels for a percentage value start with «نسبة».** Examples: «نسبة صافي العائد», «نسبة العائد المتوقع», «نسبة الربح», «نسبة الإنجاز». Exceptions:
    - Not for SAR amounts: «صافي العائد» when the value is `18,333 ر.س`.
    - Not for IRR: use «معدل العائد الداخلي» (the «معدل» form).
    - Not for coverage status labels (for example a guarantee coverage state); those keep their status wording.
    Why: tells the reader the value is a ratio, not money, before they reach the number.
11. Signs stay before the digits: `+100%`, `-2.5%`. Do not use colour alone to show positive/negative; pair it with the sign.
    Why: digits and signs never reorder in RTL; colour is not accessible on its own.

### Dates and calendars
12. Choose the calendar by context (R5): financial events (payouts, maturity, statements, distribution schedules) use Gregorian; religious or cultural dates (Ramadan, Eid, Zakah due dates) use Hijri. The user's preferred default is a setting.
    Why: Saudi users live with both calendars.
13. Write dates as day, month name, year, with Western digits:
    | Calendar | Arabic | English |
    |---|---|---|
    | Gregorian | `15 مارس 2026` | `15 Mar 2026` |
    | Hijri | `1 رمضان 1447` | `1 Ramadan 1447` |
    Why: month names avoid the DD/MM vs MM/DD ambiguity. The two Notion examples are `15 Mar 2026` and `1 رمضان 1447`; the other cells follow the same pattern.
14. Phone numbers are written as entered, unspaced or in natural groups, never reversed: `0541234567`.
    Why: R2.

## Examples

| Do | Don't |
|---|---|
| `1,250.50 ر.س` | `ر.س 1,250.50`, `١٬٢٥٠٫٥٠ ر.س` |
| `1,250.50 SAR` | `SR 1,250.5`, `SAR1250.50` |
| «نسبة صافي العائد 13.8%» | «صافي العائد 13.8%» |
| «صافي العائد 18,333 ر.س» | «نسبة صافي العائد 18,333 ر.س» |
| «معدل العائد الداخلي 15.2%» | «نسبة العائد الداخلي 15.2%» |
| «نسبة العائد المتوقع 8.5%» | «عائد يصل إلى 9%» (rounded up) |
| Goal: `100,000 ر.س` | Goal: `100,000.00 ر.س` |
| Payout on `15 مارس 2026` | Payout on `15/03/2026` |
| Ramadan banner `1 رمضان 1447` | Ramadan banner `1 Mar 2026` only |
| «يبدأ الاستثمار من 1,000 ر.س» | «يبدأ الاستثمار من ١٠٠٠ ريال» |


---

# Glossary

# Glossary

Canonical terms for Safqah products, Saudi regulation and Islamic finance (Arabic and English), plus the design system and UX process vocabulary. Read this before writing copy that names a financial concept, a regulator, an issuance status, or a design system part. Use the canonical term; avoid the listed misuses.

## Rules

1. Use the canonical term exactly, in the language of the screen. Arabic UI uses the Arabic equivalent; do not mix the English term into Arabic copy unless it is a proper noun (Nafath, Lynk).
   Why: one name per concept keeps the product, legal docs and support aligned.
2. Never use conventional-lending words for Safqah products: no "loan", "interest", "APR", "bond", "borrower", "lender".
   Why: they imply riba, which Safqah products avoid by structure.
3. Spell out a regulator on first use in long-form copy, then abbreviate (Capital Market Authority, then CMA).
   Why: Business Glossary usage note.
4. Investor-facing status labels use the investor label, not the internal one (for example `Reimbursed` renders as Repaid).
   Why: internal statuses are not visible to investors.

## Product and Islamic finance terms

| English | Arabic | Meaning | Usage / avoid |
|---|---|---|---|
| Safqah | صفقة | The platform; the word means "a deal" | Brand name, not a generic noun for a deal in English copy |
| Deal (investor app) | صفقة | An investable issuance as shown to investors | Internally an "Issuance"; avoid "loan" |
| Issuance | الإصدار | A distinct financing release under a program, with its own status, amount and dates | Not the program as a whole |
| Program | برنامج | Financing structure linked to a project, one SPE, one or more issuances | Not "fund" |
| Project | مشروع | The real estate development being financed | Not "deal" internally |
| Investor | مستثمر | Provides capital by purchasing sukuk linked to financing projects | Never "lender"; "sukuk holder" only in legal docs |
| Qualified Investor | مستثمر مؤهل | CMA classification allowing investment above retail limits (SAR 20,000 per deal and SAR 100,000 annually) | Not "accredited" or "sophisticated" investor |
| Developer | مطور عقاري | SME real estate developer applying for financing | Capitalise in English; never "borrower" |
| Murabaha | مرابحة | Sharia-compliant cost-plus-profit financing: Safqah buys an asset and sells it at a disclosed margin with deferred payment | "Murabaha Facility" in formal docs; never "cost-plus loan" |
| Ijara | إجارة | Sharia-compliant lease structure (named as a disclosure example) | |
| Sukuk | صكوك | Sharia-compliant certificates representing proportional entitlement to the murabaha receivable | Never "bonds" or "Islamic bond" |
| Sharia Board | هيئة الرقابة الشرعية | Independent scholars who approve structures and contracts | Not "religious board"; not the board of directors |
| Riba | ربا | Usury/interest; prohibited | Never describe products with interest terms |
| Profit Rate | نسبة الربح | Disclosed return on a murabaha facility, fixed for the term | Never "interest rate", "APR" |
| Payment (periodic) | الدفعة / الدفعات الدورية | Periodic principal + fixed profit paid to sukuk holders | Never "interest payment" or "dividend" |
| Profit Payment | الربح الموزع | Profit-only amount paid to investors | Keep separate from principal |
| Principal Payment | أصل الدين المسدد | Principal-only amount repaid | |
| Distributions | التوزيعات | The schedule of payouts on a deal page | Gregorian dates (R5) |
| Expected return | العائد المتوقع | Projected return; as a percentage label: «نسبة العائد المتوقع» | Never rounded up (T2) |
| Net return (%) | نسبة صافي العائد | Net return as a percentage | «صافي العائد» when the value is SAR |
| IRR | معدل العائد الداخلي | Internal rate of return | Uses «معدل», not «نسبة» |
| Risk rating | تصنيف المخاطر | Deal risk grade shown to investors | Never in fine print |
| Three Guarantees (Mandatory Security Package) | ثلاث ضمانات | First-degree land pledge + company promissory note + personal promissory notes of all UBOs | Always list all three |
| First-Degree Land Pledge | الرهن العقاري من الدرجة الأولى (رهن الأرض) | First-ranking mortgage over the project land deed held for sukuk holders | "Land Pledge" in English copy |
| Promissory Note | سند لأمر | Enforceable written promise to pay; company and personal | Always say which |
| Commodities Wakala | وكالة السلع | Agency where Safqah executes commodity trades for the murabaha | Not "tawarruq" |
| Wallet | المحفظة | Investor cash balance in the app | Not the Portfolio |
| Portfolio | المحفظة الاستثمارية | Active investments view | Not the Wallet |
| Cashout | سحب الأموال | Investor withdraws funds from the wallet (2% fee on amounts deposited by electronic payment; AML screened) | One word in English |
| Investment Goal | الهدف الاستثماري | App feature: target return and horizon, tracked across deals | Capitalised feature name |
| Auto-Investor | المستثمر الآلي | Planned feature: preferences-based allocation; phase 1 is notifications with presets | Not "robo-advisor" |
| Early Repayment | سداد مبكر | Developer repays before the term; ROI by actual days | |
| Secondary Market | السوق الثانوية | Planned feature for selling positions before maturity; not live | Do not imply it exists |
| Segmented Access | وصول مخصص | Deal visible only to a chosen investor segment | Not "VIP" |
| Off-Plan | على الخارطة | Sale of units before construction completes, regulated by Wafi | |
| Percentage of Completion | نسبة الإنجاز | Consultant-evidenced project completion | Percentage label with «نسبة» |
| Zakah | الزكاة | Obligatory Islamic alms; Hijri due dates | |
| Investor App | تطبيق المستثمر | Investor mobile app | |
| Developer Portal | بوابة المطور | Developer web app | Not "the website" |
| Back-Office | العمليات المساندة | Internal operations system | Hyphenated |

## Issuance statuses (canonical labels)

| Status | Arabic | Visible to investors | Meaning |
|---|---|---|---|
| Scheduled | مجدولة | Yes | Offering scheduled; pre-bookings open in the five-day CMA window |
| Raising | جارٍ جمع الأموال | Yes | Live, accepting commitments |
| Funded | مموّلة | Yes | Minimum threshold met; commitments closed |
| FundingFailed | فشل التمويل | Yes | Threshold not met or offering period exceeded |
| Active | نشطة | Yes | Funds disbursed; financing period running |
| Matured | بلغ الأجل | Yes | Reached maturity; 15-day payment grace period |
| RepaymentDue | مستحق السداد | Yes | Grace period ended unpaid (day +15) |
| Late | متأخرة | Yes | 30 days late; formal follow-up (warning tone) |
| Defaulted | متعثرة | Yes | 91 days overdue; legal recovery (error tone) |
| PartiallyRepaid | مسددة جزئيًا | Yes | Part of principal recovered, paid pro rata |
| Repaid | مسددة بالكامل | Yes | Fully settled, closed |
| WrittenOff | مشطوبة | Yes | Recovery failed; closed as a loss |
| Cancelled | ملغاة | Yes | Stopped before Active, with a recorded reason |
| OnHold | معلّقة | Yes | Temporarily paused |
| Reimbursed | معوّضة | No (shows as Repaid) | Safqah covered the default |
| ListingPreparation, ReadyForListing, PendingApproval, Rejected, PendingLaunch, BookBuilding, ReservationsAllocated, PendingDrawdown, Dispute, RepaymentMonitoring | إعداد الإدراج، جاهزة للإدراج، بانتظار الموافقة، مرفوضة، بانتظار الإطلاق، بناء سجل الأوامر، تخصيص الحجوزات، بانتظار السحب، محل نزاع، مراقبة السداد | No (internal) | Pre-launch and operational states |

"Yes" means the source does not mark the status internal; Late uses `Tone=warning`, Defaulted and WrittenOff use `Tone=error`.

## Saudi regulatory and identity terms

| English | Arabic | Meaning | Avoid |
|---|---|---|---|
| CMA (Capital Market Authority) | هيئة السوق المالية | Saudi capital-markets regulator; Safqah's primary regulator | Confusing with SAMA |
| SAMA (Saudi Central Bank) | البنك المركزي السعودي | Banking, insurance and payments regulator; not Safqah's direct regulator | |
| Mada | مدى | Saudi national debit-card payment network (`MadaLogo`) | |
| KYC (Know Your Customer) | اعرف عميلك | Full regulatory verification of identity, suitability and risk | Using it for CR Verification only |
| eKYC | التحقق الإلكتروني من الهوية | Digital KYC via Absher/Yakeen at signup | |
| KYB (Know Your Business) | اعرف عميلك (شركات) | Corporate verification incl. UBOs | |
| AML/CFT | مكافحة غسل الأموال وتمويل الإرهاب | Anti-money laundering and counter-terrorism financing controls | Writing "AML" alone in formal docs |
| PEP | شخص معرض سياسيًا | Politically exposed person; triggers EDD | |
| UBO | المستفيد الفعلي | Ultimate beneficial owner | |
| Nafath | نفاذ | National digital identity authentication and signing (SDAIA) | Confusing with Nafith |
| Nafith | نافذ | National electronic promissory note system (under SAMA) | Confusing with Nafath |
| Absher | أبشر | Government services portal used for eKYC (`AbshirLogo`) | Calling it Nafath |
| SIMAH | سمة | Saudi credit bureau | |
| Wafi | وافي | Off-plan sales certification programme (REGA) | |
| REGA | الهيئة العامة للعقار | Real Estate General Authority | |
| PDPL | نظام حماية البيانات الشخصية | Saudi Personal Data Protection Law | "Saudi GDPR" |
| SDAIA | الهيئة السعودية للبيانات والذكاء الاصطناعي | Saudi Data and AI Authority; runs Nafath, PDPL guidance | |
| DGA | هيئة الحكومة الرقمية | Digital Government Authority; government digital design standards reference | |
| Hijri | التقويم الهجري | Islamic lunar calendar; used for religious/cultural dates | |
| Gregorian | التقويم الميلادي | Used for financial dates | |
| Founding Day | يوم التأسيس | Saudi national day on 22 Feb, commemorating the First Saudi State; planned seasonal theme, not built | |
- Note: the DS v2 Notion glossary wrote "SDGA / DGA: Saudi Data and AI Authority / Digital Government Authority". The Saudi Data and AI Authority is abbreviated SDAIA (per the Business Glossary); DGA is the Digital Government Authority.

## Design system vocabulary

### Naming
| Thing | Built convention | Example |
|---|---|---|
| Semantic tokens | lowercase slash path: `category/role[/variant]` | `bg/brand/primary`, `text/muted`, `space/lg`, `radius/default` |
| Primitive tokens | Title-case slash path | `Color/Primary/LightGreen/500`, `Spacing/16` |
| Text styles | `role / size / weight` | `body / 14 / regular`, `heading / 20 / bold` |
| Components | PascalCase | `CardDeal`, `BottomSheet`, `ReservationTimer` |
| Variant properties | Title case name, values verbatim | `Size=md`, `Tone=warning`, `Direction=RTL` |
| Boolean properties | Start with Has / Is / Show / Can | `HasIcon`, `showDescription`, `Has icon leading` |
| Icons | `Icon / <name>` | `Icon / riyal`, `Icon / x` |
- Note: Notion said variables use kebab-case (`bg-brand-primary`) and listed camelCase, snake_case and SCREAMING_SNAKE_CASE as "will not use". Built tokens use slash paths; some built boolean props are camelCase (`showDescription`). Copy names verbatim from the knowledge files. Mixpanel events are the one place snake_case is required (`deal_viewed`).

### Tokens
| Term | Meaning |
|---|---|
| Token | A named design value. The name is the contract; the value can change without renaming. |
| Primitive token | A raw value with no meaning (`Color/Primary/LightGreen/500`, `Spacing/16`). Never themed, never used directly in product UI. |
| Semantic token | A value with intent (`bg/brand/primary`, `text/error`). Aliases a primitive. Only semantic tokens are themed. |
| Alias | One variable pointing to another; change the primitive and every alias updates. |
| Mode | A switchable set of values for the same tokens inside a collection. Built semantic modes: `Light`, `Dark`. Typography primitives have `Arabic` / `English` modes. |
| Theme | A mode in the semantic collection. Seasonal themes (Founding Day, Ramadan, Eid, National Day) are planned, not built. |
| Themable token | A semantic token allowed to change between themes (brand surface only, about 15-25). |
| Scope | Where a variable may be applied in Figma (fills, text, stroke, gap). |

### Components
| Term | Meaning |
|---|---|
| Component set | Group of variants of one component (all `Button` sizes x variants x states). |
| Variant | One configuration within a set (`Variant=primary, Size=md, State=default`). |
| Property | A configurable input: Boolean, Text, Instance Swap or Variant. |
| Slot | A placeholder area for consumer content. |
| Atom / molecule / organism | Build order: small parts first, composed upward; never inline a big composition. |
| Detached instance | An instance broken from its master; no longer updates. Avoid. |
| Status tag | `Stable` / `Beta` / `Deprecated`: whether a component is safe to use. Built page status values are `stable` and `wip`. |

### Versioning (semver)
`MAJOR.MINOR.PATCH`, for example `2.1.3`:
- PATCH: bug fix, no behaviour change (fixed icon alignment in `CardDeal`).
- MINOR: something new, nothing broken (a new component or theme mode).
- MAJOR: breaking change; downstream files must update (renamed or removed tokens or components).
- `v2.0.0` first v2 release; `v2.0.1` a fix; `v2.1.0` an addition; `v3.0.0` the next breaking rebuild. Built library: `Syntropy - Safqah Design System 2.0.0`.

### Method and standards
| Term | Meaning |
|---|---|
| OKR / KR / KPI | Objective + measurable key results / one key result / ongoing metric |
| DoD | Definition of Done: the release-gate checklist |
| RACI | Responsible, Accountable, Consulted, Informed |
| ADR / RFC | Architecture Decision Record / Request For Comments |
| WCAG AA | Contrast 4.5:1 normal text, 3:1 large text. Repo target is WCAG 2.2 AA (`AGENTS.md`); Notion said 2.1 AA |
| WCAG AAA | 7:1 normal text; aspirational |
| a11y, ARIA | Accessibility; attributes screen readers use |
| RTL / LTR | Right-to-left (Arabic) / left-to-right (English) |

### UX process
| Term | Meaning |
|---|---|
| Discovery | Phase that decides whether the problem is understood well enough to design |
| Heuristic review | Expert walkthrough against usability principles; fast, designer-only, not a substitute for user research |
| Problem statement | One sentence: user, goal, obstacle, why it matters to Safqah |
| Success metrics | Quantitative signals (primary, guardrail, leading) used to judge a design after launch |
| Usability test | Watching real users attempt tasks on a prototype or live product |
| Widgetbook parity | Flutter components visually matching their Figma counterparts |
| Lexicon audit | Monthly review of the Mixpanel event/property dictionary |
| Cadence | How often a ritual happens |

## Examples
| Do | Don't |
|---|---|
| «الربح المتوقع» / "Expected profit" | «الفائدة المتوقعة» / "Expected interest" |
| «صكوك مرابحة» / "Murabaha sukuk" | «سندات» / "bonds" |
| "Verify with Nafath" | "Verify with Nafith" |
| `StatusPill` «متأخرة» `Tone=warning` | «متأخرة» in error red |
| "Repaid" shown for a reimbursed issuance | "Reimbursed" shown to investors |


---

# RTL rules

<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# RTL and Arabic-first rules (R1-R5)

How Syntropy handles right-to-left layout, bidirectional text, Arabic typography and calendars. Read this before laying out any screen, choosing an icon direction, or rendering numbers, names or dates inside Arabic text. Arabic (RTL) is canonical; English (LTR) is the mirror.

## Rules

### R1. RTL is the canonical layout, LTR is the mirror
- **Why:** v1 directional bugs (BackButton arrow, Slider thumb, Breadcrumb separator) only surfaced when LTR was enabled. RTL bugs are first-class quality issues.
- **Rule:** Design RTL first. Every directional component documents both directions. In Figma, the `Direction` variant (`RTL` / `LTR`, or `rtl` / `ltr` on some sets; copy the exact value from `knowledge/components/index.json`) must match the screen locale; in code, direction follows the locale and is never set by hand per component.
- **Looks like:** `BackButton` arrow points right in RTL (toward the previous page in reading order) and left in LTR. `Breadcrumb` separator flips (‹ in RTL, › in LTR). `Slider` and `ProgressBar` fill from the right in RTL.
- **Doesn't look like:** A back arrow pointing left in both directions.

#### What mirrors and what does not
| Mirrors in RTL | Does not mirror |
|---|---|
| Back / forward arrows, chevrons in `ListItem`, `Breadcrumb` separators | Logos (`SafqahLogo`, `MadaLogo`, `AbshirLogo`) |
| Progress fill direction (`ProgressBar`, `Slider`, `Stepper`) | Clocks, timers, media play/pause |
| Text alignment (start = right) | Digits and the order inside a number |
| Leading/trailing slots (leading icon sits on the right) | Charts: time axis runs left to right in both languages |
| Screen transitions (push enters from the left in RTL) | Checkmarks, plus, close (x) icons |

### R2. Numerals don't flip; text does
- **Why:** Mixing Arabic text with Western digits is standard in Saudi banking and fintech, but v1 had no rule.
- **Rule:** Western digits (0-9) keep their natural left-to-right order inside Arabic text. The currency follows the number. Phone numbers, dates, percentages and IBANs never reverse. Full number rules: `knowledge/content/numbers-currency.md`.
- **Looks like:** «نسبة العائد المتوقع 8.5%» with 8.5% reading left to right. A balance «1,250.50 ر.س»: number in natural order, «ر.س» after it.
- **Doesn't look like:** «5.8%». A phone number 0541234567 rendered as 7654321450. Eastern Arabic digits (٠-٩) on a transactional amount.

### R3. Mixed-language strings have explicit direction
- **Why:** Arabic UI with embedded English (deal names, brand names) breaks bidirectional layout in browsers and Figma when unhandled.
- **Rule:** Use Unicode direction marks (RLM U+200F, LRM U+200E) where order is ambiguous, or isolate the embedded span. Text props document their expected language and direction. English names inside Arabic render LTR within their own span. Handle direction at the text-node level, never by reversing the string.
- **Looks like:** «صفقة جديدة: Riyadh Tower Project», the English name LTR inside an RTL line.
- **Doesn't look like:** «صفقة جديدة: tcejorP rewoT hdayiR».
- Common traps: trailing punctuation after an English span jumping to the wrong side; a percentage sign landing before the number; «SAR» drifting to the start of an Arabic line. Fix with an LRM after the LTR span or by isolating it.

### R4. Typography respects Arabic vertical metrics
- **Why:** IBM Plex Sans Arabic has taller glyphs and longer descenders than Latin; Latin-tuned line heights cramp Arabic.
- **Rule:** One family for both languages: `font/family` = IBM Plex Sans Arabic. Every built text style uses a 1.5 line-height ratio (for example `body / 16 / regular` = 16/24, `body / 14 / regular` = 14/21, `heading / 20 / bold` = 20/30). Use the text styles; never set line height by hand. Letter spacing in Arabic is always 0 (the `Font/LetterSpacing/*` primitives resolve to 0 in the Arabic mode).
- **Looks like:** 16 body with 24 line height: comfortable in Arabic, acceptable in English.
- **Doesn't look like:** 14 Arabic body on a 16 line height, descenders crashing into the next line. Tracking applied to Arabic text (breaks letter joining).
- Note: Notion said 1.5 for body and 1.3 for headings. Built headings and display styles also use 1.5.
- Note: the Widgetbook parity template in Notion said "Arabic: Noto Kufi or brand equivalent". The built font for both languages is IBM Plex Sans Arabic.

### R5. Hijri and Gregorian: both supported, neither default
- **Why:** Saudi users use both calendars. Distribution schedules follow Gregorian (financial reporting); religious dates use Hijri.
- **Rule:** Pick the calendar by context: financial (payouts, maturity, statements, schedules) uses Gregorian; religious or cultural (Ramadan, Eid, Zakah due date) uses Hijri. The user's preferred default is a setting. Display formats: `knowledge/content/numbers-currency.md`.
- **Looks like:** A distribution schedule «15 مارس 2026» / "15 Mar 2026". A Ramadan campaign «1 رمضان 1447». A setting to flip the default.
- **Doesn't look like:** A calendar locked to Gregorian. Ramadan dates shown only in Gregorian.
- Gap: the built `Date Calendar Picker` has `Mode` (single / range / multi) and `Direction` only; there is no calendar-system (Hijri / Gregorian) variant yet. Flag Hijri picking as a design system gap rather than faking it.

### RTL checkpoints in the lifecycle
- Design: every screen exists in RTL and LTR from the start; RTL is not a final localisation pass (`knowledge/ux/lifecycle/README.md`).
- Review: lens 5 of the design review is "RTL behaviour: anything broken?" (`knowledge/ux/lifecycle/design-review.md`).
- QA: the RTL block of `knowledge/ux/checklists/widgetbook-parity.md` on a real device in Arabic.

## Examples

| Do (Arabic first) | Don't |
|---|---|
| «نسبة العائد المتوقع 8.5%» | «نسبة العائد المتوقع %8.5» or «٨٫٥٪» |
| «1,250.50 ر.س» | «ر.س 1,250.50» |
| «صفقة جديدة: Riyadh Tower Project» | Reversed English letters |
| RTL `BackButton` arrow pointing right | Same left arrow in both locales |
| RTL `ProgressBar` filling right to left | LTR fill inside an Arabic screen |
| Line chart with time running left to right in Arabic too | Mirrored time axis |
| `SafqahLogo` identical in both locales | Mirrored logo |


---

# Principles

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


---

# Accessibility: contrast pairs

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


---

# Review: Safqah fintech heuristics

# Safqah fintech heuristics

Twelve heuristics specific to a regulated, Sharia-compliant investment product. They sit on top of Nielsen's 10 (`heuristics.md`) and are scored the same way (`review-format.md`). Use for any screen that shows money, a deal, a transaction, KYC or a decision with financial consequences.

## Rules
1. Score every money screen against F1 to F12. A violation of F2, F3, F4 or F7 on a money action is severity 3 minimum. Why: these cause financial loss, complaints and regulatory exposure.
2. Fixes use Syntropy components and tokens, never one-off UI. Why: consistency is itself a trust signal (F1, F7).
3. Numbers in examples follow `knowledge/content/numbers-currency.md`: Western digits, two decimals for SAR, currency after the amount. Why: CONVENTIONS.

## F1 Trust signals at the right moment
Show who regulates, who checked the deal and how money is protected, where the user hesitates (deal page, checkout, first deposit), not only on the landing page.
- Check: CMA licence and Sharia approval visible on the deal page (`ComplianceBadge Type=CMA`, `Type=Shariah`, `ShariaDisclosure`).
- Check: guarantees and collateral shown with `Guarantees` / `GuaranteeBar`, with the source document linked.
- Check: real developer identity (`NewsCard / Developer Logo`, name), no stock photos posing as projects.
- Don't: trust badges as decoration with no link to evidence.
- Example: «مرخّصة من هيئة السوق المالية» + «اعرف المزيد عن الترخيص» on checkout.

## F2 Money clarity: amount, fee, net, date
Every money screen shows the gross amount, every fee, the net result and when it happens, in that order, before the user commits.
- Check: summary shows `KeyValue` rows: المبلغ، الرسوم، صافي المبلغ / صافي العائد المتوقع، التاريخ.
- Check: fees are named and quantified, never «قد تُطبّق رسوم».
- Check: returns show gross and net, and say if net is after fees (for example 100,000.00 ر.س for 16 months at 16% annual: صافي العائد المتوقع 18,333.33 ر.س, نسبة صافي العائد السنوي 13.75%).
- Check: percentage labels start with «نسبة» (نسبة العائد المتوقع); SAR amounts do not.
- Don't: show the gross return large and the fee in a collapsed accordion.

## F3 Reversibility and confirmation of money actions
Every action that moves or commits money has a review step and an explicit confirm; where the business allows, a cancellation window, stated in advance.
- Check: «استثمر» on a card never commits; it opens amount entry, then a summary (`Checkout`, `Sheet Content / Summary`), then «تأكيد الاستثمار ... ر.س» with the amount in the label.
- Check: cancellation rules visible before confirm («يمكنك إلغاء الحجز خلال 30 دقيقة»).
- Check: destructive non-money actions use `Dialog Tone=destructive` naming the object.
- Check: confirm actions fire on release (WCAG 2.5.2) and are protected from double submit (`Button State=loading`).
- Don't: auto-submit on the last OTP digit for a money action.

## F4 Transaction status visibility
Every transaction has a visible status from a fixed set, with timestamps and the next expected step.

| Status | AR label | Must show |
| --- | --- | --- |
| Pending | بانتظار الدفع | deadline and how to pay |
| Processing | قيد المعالجة | started at, typical duration |
| Settled | مكتمل | settled at, reference number (copyable) |
| Failed | فشل | reason in plain words, what to do, whether money was taken |
| Reversed / refunded | مسترد | amount, date, destination |

- Check: `StatusPill` with text and icon (`../accessibility/color-not-alone.md`), date and time «15/10/2026، 2:30 م» in Riyadh time.
- Check: payouts show the expected window (maturity plus the payout window) before the date, not only after.
- Check: push and in-app history agree.
- Don't: «جارٍ المعالجة» with no time estimate for days.

## F5 Disclosure at the decision point
Risk, Sharia structure, fees and lock-up are shown where the decision is made, in plain words, before commitment. Legal text is linked, not dumped.
- Check: risk summary (one or two sentences) on the summary step, with a link to the full offering document.
- Check: acknowledgements use an unticked `Checkbox` with a specific statement («قرأت ملخص المخاطر»), never pre-ticked.
- Check: lock-up and early exit terms visible next to duration.
- Don't: disclosures only in onboarding or a footer.

## F6 Honest scarcity and time
Funding progress, remaining amount, countdowns and "few left" messages reflect real data and real deadlines.
- Check: `ProgressBar` / funding percentage computed from real commitments; reservation timers (`ReservationTimer`, `Countdown`) reflect real holds.
- Check: when a deal closes, say so and offer alternatives, do not fake a waitlist.
- Don't: countdowns that reset, «بقي 3 مقاعد» without data, red urgency colours on neutral facts. See `dark-patterns.md`.

## F7 Numeric consistency
The same number appears in the same format everywhere: card, deal page, calculator, summary, receipt, statement, notification.
- Check: same decimals (SAR always 2), same grouping, same rounding rule, same unit labels.
- Check: the confirm amount equals the entered amount exactly; receipts match the summary to the halala.
- Check: percentages show the same precision on card and deal page (16% vs 16.00% is a finding).
- Check: Western digits everywhere, currency after the amount (`1,250.00 ر.س` / `SAR 1,250.00`).
- Don't: card says «عائد 16%», deal page «15.8%», calculator «16.2%» without explaining which is gross, net or annualised.

## F8 Error recovery for payments and KYC
Failures in payment, bank verification and KYC say what happened, whether money moved, and offer the next step without starting over.
- Check: payment failure states whether the account was debited, and when a refund arrives.
- Check: IBAN name mismatch offers both recovery paths (account in own name, IBAN certificate upload).
- Check: KYC rejection names the field and lets the user fix only that step (`KYCStep`).
- Check: support entry («تواصل معنا») on every failure screen, with the reference number prefilled.
- Don't: generic «حدث خطأ» and a return to home.

## F9 Progressive disclosure of complex terms
Show the decision essentials first; reveal mechanics (Murabaha, Ijara, IRR, distribution schedule) on demand.
- Check: first level: 3 to 4 decision metrics; second level: `Accordion` / `AccordionItem`, `Popover` or a `BottomSheet` explainer; third: full documents.
- Check: every technical term has a one-sentence plain explanation in place.
- Don't: hide fees or risks behind disclosure; progressive disclosure is for mechanics, never for costs (F2, F5).

## F10 Accessible financial data
Tables, charts and numbers are usable by screen readers, at large text, and without colour.
- Check: `Table / HeaderCell` exposes headers; payout schedules readable row by row.
- Check: every `Chart / *` has a text summary and a table alternative; gain or loss uses sign and arrow.
- Check: amounts labelled in words for the currency («ريال سعودي»); never truncated at 200% text.
- See `../accessibility/` (screen-readers, dynamic-type, color-not-alone).

## F11 Privacy of money on screen
Balances and personal financial data can be hidden and are masked by default where others may see them.
- Check: `BalanceToggle` on `PortfolioHeader` hides all amounts consistently (including notifications preview and app switcher snapshot).
- Check: IBAN, national ID and card numbers masked («ينتهي بـ 1234») with explicit reveal.
- Don't: show full balances in push notification text by default.

## F12 Time clarity
Dates and times are unambiguous: calendar, timezone, business days.
- Check: dates state the calendar when it matters (Gregorian by default; Hijri where the context expects it) and use the Riyadh timezone label for deadlines.
- Check: "business days" are explained («خلال يومي عمل، باستثناء الجمعة والسبت»).
- Check: relative times («بعد 3 أيام») are paired with an absolute date for money events.

## Quick scoring
For each screen, mark F1 to F12 as Pass, Finding (with severity) or N/A with a reason, in the summary table from `review-format.md`.


---

# Review: states

# Screen states checklist

Every Safqah screen is designed and built in all the states it can be in, not only the happy path. This file lists the states, when each applies, the Syntropy component that handles it, and what to check. Use when designing a screen, building it, or reviewing a hand-off.

## Rules
1. Each screen lists its applicable states and shows each one (design) or has a test or story for each one (build). A state marked N/A needs a one-line reason. Why: missing states are the most common production bug class in data-driven screens.
2. Use the Syntropy component named below for each state; component names are exact (`knowledge/components/index.json`). There is no component called "Loader": loading uses `Skeleton*`, `Spinner*` or `ProgressBar_Indeterminate`. Why: one look and behaviour across the app.
3. Keep layout stable between states: skeletons match the final layout; errors replace content in place. Why: layout jumps disorient and break screen-reader position.
4. Each state is accessible: loading announced once, errors announced, empty states have a heading and an action. Why: WCAG 4.1.3, 1.3.1.
5. Copy is minimal: title, at most one line of description, one action. Why: Safqah minimal copy rule.

## The states

| State | When | Syntropy component | Must have |
| --- | --- | --- | --- |
| Empty | no data yet or none exists (no investments, no deals open, no notifications) | `EmptyState` (`Tone=default`, `Size=Default` full screen or `Compact` in a section) with `Empty Illustration / default / *` | title that says what is empty and why; one action that helps («استكشف الفرص»); not mistaken for an error |
| Empty search / filter | search or filters return nothing | `EmptyState Tone=search` | the query echoed; «مسح الفلاتر» action |
| Loading, first load | content structure known | `SkeletonLine`, `SkeletonBlock`, `SkeletonCircle`, `SkeletonAvatar` | matches final layout; `aria-busy` / announced once «جارٍ التحميل»; static under reduced motion |
| Loading, action in progress | a button triggered work | `Button State=loading` (or `IconButton State=loading`) | button keeps width; double submit blocked; label in semantics «جارٍ المعالجة» |
| Loading, unknown structure or long task | upload, payment processing, report export | `SpinnerRing` (default spinner), `ProgressBar` (known progress), `ProgressBar_Indeterminate` | text next to the spinner saying what is happening; time estimate if over 5 seconds |
| Refreshing | user pulls to refresh | `Pull-to-refresh` | refresh also available without gesture (WCAG 2.5.4 equivalent action) |
| Partial | some data loaded, some failed or still loading (portfolio loads, payouts fail) | inline `Alert Tone=warning` or `Tone=error` (`Style=Plain` or `Outlined`) in the failed `Section`; `Skeleton*` for the pending part | rest of the screen usable; retry scoped to the failed part |
| Error, screen level | the main content failed | `EmptyState Tone=error` with `Empty Illustration / error / *`, «إعادة المحاولة» | plain cause; retry; support link with reference |
| Error, inline / field | validation | `Input State=error` + `Input Helper Text` / `Form Field Helper`; `Alert Tone=error` summary for long forms | formula: what is wrong + how to fix (`../accessibility/forms.md`) |
| Error, blocking decision | payment failed, session expired, action not allowed | `Dialog` (`Tone=destructive` only for destructive choices) or `BottomSheet` | what happened, whether money moved, one primary action |
| Offline | no connection | `Banner Tone=warning` at the top («لا يوجد اتصال بالإنترنت») plus cached content marked with its time | money actions disabled with a reason, not hidden; auto-recover when back online with a `Toast` |
| Success, inline | saved settings, copied IBAN | `Toast Tone=success` | announced (live region); not the only record for money events |
| Success, money event | investment confirmed, withdrawal requested | full success screen or `BottomSheet` with heading, amount, reference, next step | receipt values identical to summary (F7); «عرض التفاصيل» |
| Disabled | action not available yet | `Button State=disabled`, `Input State=disabled` | reason shown next to it («أكمل التحقق من الهوية لتتمكن من الاستثمار»); prefer enabled + explain on tap |
| First use | feature never used, onboarding to a section | `EmptyState` with a teaching description, `CardInfo`, or `Carousel` intro (no auto-advance) | one clear first action; skippable; not repeated after dismissal |
| Permission denied (OS) | notifications, camera for KYC, contacts | `BottomSheet` primer before the OS prompt; after denial, `Banner Tone=info` or `CardInfo` with «فتح الإعدادات» | explain the benefit; never block unrelated features |
| Not eligible / restricted | KYC incomplete, investor type limits, AML restriction | `Alert Tone=info` or `Tone=warning`, `KYCStep` link | what is restricted, why in one line, how to resolve |
| Closed / expired content | deal fully funded or closed, reservation expired | `StatusPill Tone=neutral` «مغلقة»; `EmptyState` with alternatives | no dead buttons; alternatives offered |
| Maintenance / degraded service | backend partial outage | `Banner Tone=warning` | which feature, until when |

Warnings use the warning tone; red (`Tone=error`) only for real failures or critical states.

## Per-screen checklist

Copy this into a review and fill it:

```markdown
| State | Applies? | Designed/built | Component | Notes |
| --- | --- | --- | --- | --- |
| Empty | yes/no | yes/no | EmptyState Tone=default | |
| Empty search | | | EmptyState Tone=search | |
| Loading first | | | SkeletonLine/Block | |
| Loading action | | | Button State=loading | |
| Partial | | | Alert (in section) | |
| Error screen | | | EmptyState Tone=error | |
| Error inline | | | Input State=error | |
| Offline | | | Banner Tone=warning | |
| Success | | | Toast / success screen | |
| Disabled | | | Button State=disabled + reason | |
| First use | | | EmptyState / CardInfo | |
| Permission denied | | | BottomSheet primer / Banner | |
```

## Data edge cases to test in every state
- Long Arabic deal names (2 lines plus), long developer names, English names inside Arabic.
- Very large amounts (`12,345,678.90 ر.س`), zero (`0.00 ر.س`), negative or loss values.
- One item vs many items vs hundreds (pagination with `Pagination`, or infinite scroll with a footer state).
- Text at 200% (`../accessibility/dynamic-type.md`), Dark mode, RTL and LTR.
- Slow network (3G) and timeout after 15 seconds.

## Examples
- Do: portfolio with payouts failing shows the portfolio and an inline `Alert Tone=error` «تعذّر تحميل التوزيعات» with «إعادة المحاولة» inside the Distributions `Section`. Don't: a full-screen error that hides the balances that did load.
- Do: no open deals shows `EmptyState` «لا توجد فرص متاحة حاليًا» with «نبّهني عند طرح فرصة جديدة». Don't: an empty list that looks like the app failed.


---

# Compliance: obligation map

Design guidance only. Confirm wording with Safqah Compliance before release.

# Compliance UX for Safqah

What a Safqah screen and its copy must do so that it respects the Saudi rules that govern an investment platform: CMA capital-market rules, SAMA consumer-protection rules at payment touchpoints, the Personal Data Protection Law (PDPL), and Sharia governance. Read this folder before you design, write copy for, or review any screen that shows a deal, takes money, collects personal data, or sends a notification.

This is design guidance, not legal advice. It tells you what the interface must make possible (show, ask, record, let the user undo). The exact legal wording, limits and periods are owned by Safqah Compliance and Legal and can change; the backend is the source of truth for every limit and rate.

## How the rules reach Safqah (scope, read once)

| Regime | Who it binds | What it means for the UI |
| --- | --- | --- |
| CMA, Rules on the Offer of Securities and Continuing Obligations (ROSCO), Article 6(a)(11): debt instruments offered through a securities crowdfunding platform by a capital market institution licensed for "arranging" | The platform (capital market institution) and the issuer | Offering document access, retail subscription limits, 48-hour cancellation, refund if the offering fails, issuance status and overdue disclosure. See [cma.md](cma.md). |
| CMA, Capital Market Institutions Regulations (CMI Regs) | The platform as a capital market institution | Clear, fair and not misleading communication, client classification (retail / qualified / institutional), know-your-client, understanding risk, suitability, fees disclosed in advance, complaints, advertisement content (Annex 5.1). |
| CMA, Instructions for Shariah Governance in Capital Market Institutions | Institutions that offer Sharia-compliant products | What "Sharia compliant" means (decisions of the institution's Sharia committee) and what is disclosed. See [sharia-disclosure.md](sharia-disclosure.md). |
| SAMA, Financial Consumer Protection Principles and Rules; Guide to Financial Institutions Services Fees; Rules for Advertising | SAMA-supervised institutions (banks, payment and finance companies). Safqah's payment partners are in scope; Safqah is a CMA-licensed institution | Use as the Saudi benchmark for fair treatment, fee consent, plain Arabic terms, complaint access and records. See [sama-consumer-protection.md](sama-consumer-protection.md). Which SAMA rules bind Safqah directly is a Compliance call. |
| PDPL (Royal Decree M/19, amended by M/148) and its implementing regulations | Safqah as a data controller | Purpose notice, privacy policy at collection, explicit consent that can be withdrawn, consent never a condition for unrelated service, marketing opt-in and opt-out. See [pdpl-consent.md](pdpl-consent.md). |
| CMA Investment Funds Regulations and Real Estate Investment Funds Regulations | Fund managers | Only if Safqah shows a fund product. Useful benchmark for performance and "no guaranteed profit" wording. |

## Obligation map: screen by screen

Each row lists what the screen must do. Follow the link for the rule, the copy and the components.

| Screen | Must do | Files |
| --- | --- | --- |
| Deal page | Offering summary, issuer identity, use of proceeds, term, payment schedule, guarantees (only if real), main risks visible before the CTA, link to the full offering document and valuation reports, Sharia and CMA statements with a working "Learn more", projected (not promised) return labelled net or gross, funded % as fact | [cma.md](cma.md), [risk-statements.md](risk-statements.md), [fees-returns.md](fees-returns.md), [sharia-disclosure.md](sharia-disclosure.md), [anti-pressure.md](anti-pressure.md) |
| Invest / reserve (amount, summary, confirm) | Show the user's remaining limit for their classification, fees before commitment, net projected result, risk line next to the confirm button, unticked acknowledgements for offering document and evaluation policy, the 48-hour cancellation right, honest reservation timer only when a real hold exists | [cma.md](cma.md), [fees-returns.md](fees-returns.md), [risk-statements.md](risk-statements.md), [anti-pressure.md](anti-pressure.md), [sama-consumer-protection.md](sama-consumer-protection.md) |
| Payment | Exact amount and every fee (with VAT) before the user authorises, no fee added after, receipt with reference number, failed-offering refund promise in plain words | [sama-consumer-protection.md](sama-consumer-protection.md), [fees-returns.md](fees-returns.md) |
| KYC and onboarding | Purpose notice before collecting each data group, privacy policy link at the point of collection, mandatory vs optional marked, separate consents, classification result explained (retail / qualified) and how to upgrade, refusal consequences stated | [pdpl-consent.md](pdpl-consent.md), [cma.md](cma.md) |
| Qualified-investor upgrade | Explain what changes (limits, products) and what protections change, evidence requested and why, no pressure to upgrade to invest more | [cma.md](cma.md), [anti-pressure.md](anti-pressure.md), [pdpl-consent.md](pdpl-consent.md) |
| Wallet and cash-out | Cash-out as easy as deposit, any cash-out fee shown before confirm, no confirmshaming or "are you sure" walls, timeline to the bank stated | [anti-pressure.md](anti-pressure.md), [sama-consumer-protection.md](sama-consumer-protection.md), [fees-returns.md](fees-returns.md) |
| Portfolio | Realised vs expected split, net of fees, statuses shown honestly (late, defaulted, in recovery) with the right tone, cancellation window visible on fresh subscriptions | [fees-returns.md](fees-returns.md), [risk-statements.md](risk-statements.md), [cma.md](cma.md) |
| Payouts | Actual amount received vs scheduled, fee line, late or partial payments named plainly, no "profit" wording on returned capital | [fees-returns.md](fees-returns.md), [risk-statements.md](risk-statements.md) |
| Notifications and permissions | Primer before the OS prompt, marketing separate from service messages, per-channel opt-out that is honoured, purpose of every OTP message | [pdpl-consent.md](pdpl-consent.md), [sama-consumer-protection.md](sama-consumer-protection.md), [anti-pressure.md](anti-pressure.md) |
| Marketing / landing | Name and regulatory status, no guaranteed returns, past performance only with source, period and the "past performance" warning, platform stats defined and dated, platform overdue rate, no fake scarcity | [cma.md](cma.md), [anti-pressure.md](anti-pressure.md), [risk-statements.md](risk-statements.md) |
| Complaints and help | Entry point reachable from every money screen, reference number on submission, escalation path to the regulator | [sama-consumer-protection.md](sama-consumer-protection.md) |
| Back-office | Show the evidence trail: classification record, consent log with timestamp and version, acceptance records, complaint reference and history; never let staff edit a user's consent on their behalf without a logged request | [pdpl-consent.md](pdpl-consent.md), [sama-consumer-protection.md](sama-consumer-protection.md), [cma.md](cma.md) |

## Rules

1. Every limit, rate, fee and period on screen comes from the backend for the signed-in user, never a hardcoded number in copy. Why: limits differ by client classification and change with regulation.
2. When a rule in this folder and a Compliance-approved string disagree, use the Compliance string and flag the difference. Why: Compliance owns the wording.
3. Run [review-checklist.md](review-checklist.md) on every money or data screen before handoff. Why: one pass catches most misses.
4. Do not invent article numbers, licence numbers, Sharia decision numbers or regulator names in copy. Use placeholders such as `{licence_no}` until Compliance supplies them. Why: a wrong citation is itself misleading.

## Files

| File | Covers |
| --- | --- |
| [cma.md](cma.md) | Offering disclosure, retail vs qualified limits, suitability, no guarantee language, projected vs realised, claims and stats |
| [sama-consumer-protection.md](sama-consumer-protection.md) | Fair treatment, fee disclosure and consent, plain Arabic terms, complaints, cancellation, records |
| [pdpl-consent.md](pdpl-consent.md) | Consent capture and withdrawal, purpose notice, privacy policy, data rights, notification preferences, permission primers |
| [sharia-disclosure.md](sharia-disclosure.md) | Sharia statement placement, `ComplianceBadge` and `ShariaDisclosure`, wording limits |
| [risk-statements.md](risk-statements.md) | Placement of risk, standard risk lines, defaulted and in-recovery states, tone rules |
| [fees-returns.md](fees-returns.md) | Net vs gross, projected vs realised, worked fee example, annualised vs total, rounding |
| [anti-pressure.md](anti-pressure.md) | Banned deceptive patterns mapped to deceptive.design types, safe alternatives |
| [review-checklist.md](review-checklist.md) | The checklist to run |


---

# Compliance: review checklist

Design guidance only. Confirm wording with Safqah Compliance before release.

# Compliance review checklist

Run this on any Safqah screen or flow that shows a deal, moves money, collects personal data, asks for consent or sends a message. Each item is pass / fail / not applicable. Any fail on a money or data screen blocks handoff until fixed or signed off by Compliance.

## How to run it
1. Identify the screen type from the map in [README.md](README.md).
2. Go through sections A (always) and every section that applies.
3. Record each fail with the item id, the screen, and the fix. Link the rule file.

## A. Always
- [ ] A1 No em dash, Western digits, currency after the amount (`1,250.00 ر.س`), Arabic first.
- [ ] A2 No hardcoded limit, rate, fee or period in copy; values come from the backend.
- [ ] A3 No invented licence numbers, Sharia decision references or article numbers; placeholders used where Compliance must supply them.
- [ ] A4 Components are real Syntropy components with exact names and variant values.
- [ ] A5 Copy is clear, fair and not misleading: nothing a reasonable user would read as a promise ([cma.md](cma.md)).
- [ ] A6 Help and complaints reachable in one tap from any money screen ([sama-consumer-protection.md](sama-consumer-protection.md)).

## B. Deal page
- [ ] B1 Offer summary visible: issuer, instrument, size, use of proceeds, term, schedule, minimum, close date.
- [ ] B2 Offering document and valuation reports reachable without starting an investment.
- [ ] B3 Issuer information section present.
- [ ] B4 Guarantee wording only for a Compliance-confirmed enforceable guarantee, with its terms.
- [ ] B5 «المخاطر» section with the deal's main risks; risk line near the CTA ([risk-statements.md](risk-statements.md)).
- [ ] B6 Rate labelled expected, annual, net or gross; «نسبة» on percentage labels.
- [ ] B7 One `ShariaDisclosure`; its «إعرف أكثر» opens the real decision ([sharia-disclosure.md](sharia-disclosure.md)).
- [ ] B8 Scarcity shown only as funded % and remaining amount; close date as text; no countdown ([anti-pressure.md](anti-pressure.md)).

## C. Invest, reserve, payment
- [ ] C1 User's remaining limit shown for their classification; over-limit error states the limit and one path forward.
- [ ] C2 Every fee, with basis and VAT, visible on the summary before the confirm button.
- [ ] C3 Headline profit and rate are net; gross only secondary; breakdown shows the derivation ([fees-returns.md](fees-returns.md)).
- [ ] C4 Money at 2 decimals, percentages at 1 decimal, computed from unrounded values.
- [ ] C5 Risk line directly above the confirm `Button`, same size and contrast as body text.
- [ ] C6 Acknowledgements (offering document, evaluation policy, unsuitability if flagged) are separate, unticked, each linked.
- [ ] C7 Confirm button names the commitment and amount.
- [ ] C8 Cancellation right and real deadline shown on success and on the portfolio row, with an in-app cancel action.
- [ ] C9 Any timer meets all six conditions in [anti-pressure.md](anti-pressure.md); otherwise removed.
- [ ] C10 Receipt with reference number, amount, date and next step; matching message sent.
- [ ] C11 No fee appears for the first time on the payment provider page or the receipt.

## D. KYC, onboarding, qualified upgrade
- [ ] D1 Purpose notice and «سياسة الخصوصية» link before each data group ([pdpl-consent.md](pdpl-consent.md)).
- [ ] D2 Mandatory and optional fields marked; consequence of not providing mandatory data stated.
- [ ] D3 Third-party recipients and any processing outside the Kingdom disclosed in the notice or policy.
- [ ] D4 ID images requested only where a law requires it; digital verification preferred.
- [ ] D5 Classification result explained; upgrade screen factual, states what changes and the added risk exposure.
- [ ] D6 Legal-basis processing (KYC, AML) explained, not presented as an optional consent.

## E. Consent, notifications, permissions
- [ ] E1 One consent per purpose; nothing pre-ticked; continue works without optional consents.
- [ ] E2 Every consent withdrawable in settings in no more steps than giving it; effect confirmed on screen.
- [ ] E3 Service messages separated from marketing, per channel; marketing preferences honoured across all campaigns.
- [ ] E4 Every marketing message has a one-tap stop route.
- [ ] E5 Primer before every OS permission prompt, at the moment of need, with equal «السماح» / «ليس الآن».
- [ ] E6 "Not now" is respected: no repeat in the session, at most one later re-ask.
- [ ] E7 OTP messages and screens state the purpose.
- [ ] E8 Consent and acceptance events logged with wording version and timestamp.

## F. Wallet, cash-out, portfolio, payouts
- [ ] F1 Cash-out takes no more steps than deposit; one neutral confirmation with amount, fee, arrival time.
- [ ] F2 No retention offers, shaming or extra walls on cash-out or cancel.
- [ ] F3 Realised and expected shown separately; capital separated from profit.
- [ ] F4 Late and partially repaid in warning tone; defaulted and written off in error tone; status words verbatim; never colour alone.
- [ ] F5 Late or defaulted deals show amount due vs received, the recovery step and its date; no original projection shown as expected profit.
- [ ] F6 Defaulted deals included in totals and stats.

## G. Marketing and landing
- [ ] G1 Safqah name and CMA authorisation line with licence number.
- [ ] G2 No "guaranteed", "fixed", "safe", «مضمون», «آمن» about returns.
- [ ] G3 Stats defined, dated, sourced, with method link; averages net and including defaults.
- [ ] G4 Past performance carries R4 and covers at least one year.
- [ ] G5 Platform 90-day overdue rate reachable with as-of date.
- [ ] G6 Promotions state start and end dates and how to benefit; "free" only when truly free, for whom.
- [ ] G7 No fake scarcity, fake social proof, disguised ads, or testimonials about returns.

## H. Terms, changes, complaints, records
- [ ] H1 Arabic terms in plain language; key terms summarised before acknowledgement; legal text one tap away; body text at least 14 px equivalent.
- [ ] H2 Terms changes announced at least 30 days ahead with what changed and how to object or exit.
- [ ] H3 Material offering-document changes notified with the right to cancel or amend.
- [ ] H4 Complaint submission returns a reference number and handling period; detail view shows status, history and escalation to the regulator.
- [ ] H5 "My data" entry points: view, download, correct, delete, manage consents; each request gets a reference and period.
- [ ] H6 Back-office shows classification record, consent log, acceptance records and complaint history read-only, with every staff change logged.

## Sign-off line
`Compliance review: {reviewer} · {date} · items failed: {ids} · approved strings version: {version}`


---

# Compliance: anti-pressure

Design guidance only. Confirm wording with Safqah Compliance before release.

# Anti-pressure: banned patterns and safe alternatives

Patterns that push people into investing, staying, sharing data or skipping information, mapped to the deceptive.design taxonomy, with the Safqah-safe way to meet the same goal. Read it before you add urgency, scarcity, social proof, defaults, reminders or exit friction to any screen.

## Why this is a compliance topic (verified)

| Source | Point |
| --- | --- |
| CMI Regs Art. 34(d) | Individuals seeking business must "avoid using any undue pressure or making any misleading statements". |
| CMI Regs Art. 5(b)(8), (9) | Communicate clearly, fairly and not misleadingly; treat clients fairly and pay due regard to their interests. |
| CMI Regs Annex 5.1 items 4, 9 | No false or misleading statements; past performance not selected to exaggerate. |
| SAMA Advertising Rules Art. 1, 4, 5.1 | Avoid "tempting, misleading or inaccurate methods", no exaggeration; promotions state the start and end of the offer; no false or misleading offers. |
| SAMA Fees Guide Art. 4; Rule 8 | Prior approval of all fees; no fee increase after contract. |
| PDPL Art. 5, 7, 25 | Explicit consent, withdrawable at any time; consent not a condition for unrelated service; clear stop mechanism for marketing. |
| ROSCO Art. 6(a)(11)(o) | Retail subscribers may cancel within 48 hours or until the offering ends. |
| deceptive.design/types | Taxonomy used below: Sneaking, Forced action, Hard to cancel, Preselection, Obstruction, Hidden subscription, Hidden costs, Trick wording, Visual interference, Fake social proof, Fake urgency, Nagging, Fake scarcity, Disguised ads, Confirmshaming, Comparison prevention, Addictive design, Currency confusion. |

## Banned patterns

| # | Banned on Safqah | deceptive.design type | Safqah-safe alternative |
| --- | --- | --- | --- |
| B1 | Countdown on a deal CTA or deal card that is not tied to a real, server-side close time | Fake urgency | Show the real close date as text: «يغلق الطرح 30 أكتوبر 2026». No ticking seconds. |
| B2 | Timer that resets on reload, or a "today only" rate | Fake urgency | Rates are fixed by the offering document; never time-boxed in UI. |
| B3 | "Only 3 units left", "selling fast", "12 people are viewing" unless computed live from real data | Fake scarcity, Fake social proof | Funded percentage from the backend: `ProgressBar` Label «نسبة التمويل» Value `78%`, plus remaining amount «المتبقي 440,000.00 ر.س». |
| B4 | Invented or unverifiable testimonials, investor counts or "X earned Y" tickers | Fake social proof | Defined, dated platform stats with method link ([cma.md](cma.md) rule 18). Testimonials only if real, consented, and Compliance approved; never about returns. |
| B5 | Decline buttons that shame: «لا، لا أريد زيادة أرباحي» | Confirmshaming | Neutral pair: «ليس الآن» / «السماح», «إلغاء» / «متابعة». |
| B6 | Pre-ticked consents, auto-enrolled auto-invest or auto-reinvest, default amount set to the user's maximum limit | Preselection, Hidden subscription | All optional boxes unticked; auto-invest only after an explicit opt-in screen; amount field empty or at the minimum. |
| B7 | A fee first shown at payment or after | Hidden costs, Sneaking | All fees on the summary before confirm ([fees-returns.md](fees-returns.md)). |
| B8 | Cash-out harder than deposit: extra screens, retention offers, "are you sure you want to lose your profit?" | Hard to cancel, Obstruction, Confirmshaming | Cash-out in as many steps as deposit; one neutral confirmation showing amount, fee and arrival time. |
| B9 | Cancelling a subscription only via chat or support | Hard to cancel | In-app «إلغاء الاكتتاب» until the 48-hour or offering-end deadline. |
| B10 | Repeated prompts to enable notifications, upgrade to qualified, or invest again after the user said no | Nagging | One re-ask after a meaningful event at most; the setting lives in settings. |
| B11 | Gross return large and bold, net small; risk in light grey; "Learn more" styled as plain text | Visual interference | Net is the headline; risk at body size and contrast ([risk-statements.md](risk-statements.md)). |
| B12 | Double negatives or ambiguous toggles («لا تمنعني من استلام العروض») | Trick wording | Positive, single-meaning labels: «أرغب في استلام العروض». |
| B13 | Upgrade to qualified framed as unlocking "bigger returns" or VIP status | Trick wording, undue pressure | Factual: what changes (limits, eligible products), what risk exposure increases. |
| B14 | Sponsored deal or partner promotion styled as a neutral recommendation | Disguised ads | Label promotions «إعلان» / «عرض ترويجي»; recommendations show why they match («يناسب المدة التي اخترتها»). |
| B15 | Hiding term, fee or risk so deals cannot be compared | Comparison prevention | Every deal card shows the same fields in the same order: rate (annual, net basis stated), term, minimum, funded %, status. |
| B16 | Streaks, confetti or gamified rewards for investing more often | Addictive design | Celebrate completion of a task (KYC done, payout received) quietly; no rewards for frequency. |
| B17 | Points, coins or "Safqah credits" that hide the SAR value | Currency confusion | Always show SAR amounts; any credit shows its SAR value beside it. |
| B18 | Forcing marketing consent, contacts access, or a referral to proceed | Forced action | Optional means optional; continue works without it (PDPL Art. 7). |

## When a timer is allowed

A countdown is allowed only when **all** of these hold. Otherwise use a plain date.

1. It shows a real hold that exists on the server (a reservation that releases units back to the pool, or a payment window that expires).
2. The end time comes from the backend and survives reload and device change.
3. The copy says what happens at zero, honestly: «تنتهي مهلة الدفع خلال 14:59. بعدها يُلغى الحجز ويعود المبلغ المتاح للصفقة». Nothing is lost except the hold.
4. The user can leave or cancel without penalty, and the cancel control is as visible as the pay control.
5. It uses the `Countdown` or `Timer` components from page 08b in a neutral or warning tone, never error red, and never animates the CTA itself.
6. There is no timer on the deal card, the deal list, or the "Invest" entry button.

## Real scarcity, stated as fact

| Do | Don't |
| --- | --- |
| `ProgressBar` «نسبة التمويل 78%» + «المتبقي 440,000.00 ر.س» | «سارع! الفرصة على وشك الانتهاء» |
| «يغلق الطرح 30 أكتوبر 2026» | A ticking `Countdown` on the deal card |
| «اكتمل التمويل» with `IssuanceStatusBadge (Investor)` Status=Fully Funded | «فاتتك الفرصة! لا تكررها» |
| "78% funded · 440,000.00 SAR remaining" | "Hurry, only a few spots left!" |
| "Payment window ends in 14:59. Your reservation will be released, nothing is charged." | "Pay now or lose your profit" |

## Neutral choices

| Do | Don't |
| --- | --- |
| «ليس الآن» / «السماح» | «لا، أفضّل تفويت الأرباح» |
| «إلغاء» / «تأكيد السحب» | «هل أنت متأكد أنك تريد خسارة أرباحك المستقبلية؟» |
| "Not now" / "Allow" | "No thanks, I don't like money" |


---

# Research: how to research

# Research before designing

How an AI agent researches a Safqah design question with the tools the team uses, then turns what it finds into a Syntropy design without copying anyone. Read this first; each tool has its own deep guide in this folder.

Safqah is a Saudi, Sharia-compliant real-estate investment platform: an Arabic RTL-first mobile app, a web app and a back-office. Every reference you collect must end as Syntropy components, Syntropy tokens, RTL layout and Safqah copy.

## Files in this folder

| File | What it gives you |
|---|---|
| `README.md` | This overview, the decision table and the workflow |
| `lazyweb.md` | Lazyweb MCP: screens, flows, A/B experiments, Agentic Search links, growth scores |
| `refero.md` | Refero MCP: screens, flows, visual styles, apps and sites |
| `mobbin.md` | Mobbin MCP: screens, flows and web sections with images |
| `screensdesign.md` | ScreensDesign: iOS onboarding and paywall flows with revenue context |
| `nicelydone.md` | Nicelydone: SaaS and web-app flows, best for back-office |
| `figma-mcp.md` | Reading Syntropy itself through the Figma MCP server |
| `streamline-lottie.md` | Icons (Syntropy Icons first, Streamline only to propose) and Lottie motion references |
| `browser-only.md` | Sites with no MCP: Page Flows, Growth.design, Baymard, GoodUI, SaaSFrame and more |
| `recipes.md` | 16 step-by-step research recipes for common Safqah tasks |
| `benchmarks.md` | Which apps to study per Safqah topic, Saudi and GCC first |
| `translate-to-syntropy.md` | Turning a reference into a Syntropy design, with 3 worked examples |
| `presenting.md` | How to show references to the person and how to save or share them |

The full link list lives in `knowledge/links/links.json` (categories `research-tools`, `mobile-patterns`, `web-inspiration`, `saudi-investing`, `saudi-banking`, `gcc-investing`, `real-estate-investing`, `global-investing`, `neobanks`, `finance-backoffice`, `arabic-rtl`, `ux-principles`, `regulation`).

## Rules

1. Check Syntropy before the outside world. Search `knowledge/components/index.json` and the Syntropy Figma file (see `figma-mcp.md`) for an existing component or pattern first.
   Why: most Safqah questions are already answered by a component; research is for the gap, not for the obvious.
2. Write the research question in one sentence before calling any tool.
   Why: a vague question returns a vague moodboard and burns quota.
3. Use at most 2 external tools per question.
   Why: a third library rarely adds a new pattern; it adds noise and cost.
4. Collect 5 to 10 references, never more than 12, from at least 3 different apps.
   Why: fewer than 5 is anecdote; more than 12 cannot be compared in one view.
5. Prefer finance and Saudi or GCC apps; take patterns from other industries only for mechanics (a stepper, an upload, a confirmation).
   Why: trust, regulation and Arabic expectations differ outside fintech.
6. Extract patterns, not pixels: name each pattern and say what problem it solves.
   Why: the output is a Syntropy design, not a copy of the reference.
7. Map every element you keep to a Syntropy component and token (see `translate-to-syntropy.md`).
   Why: anything that does not map is either a gap to log or a thing to drop.
8. Never copy logos, brand colors, illustrations, photography or exact copy from a reference.
   Why: legal risk, and it breaks the Safqah brand.
9. Cite every reference with app name, screen or flow link and the tool that found it.
   Why: the person must be able to open the source and judge it.
10. Never start a paid or long-running job (Lazyweb Growth Report, Growth Score generation) unless the person asked for it in their own words.
    Why: these cost credits and take minutes.
11. Never read, cite or describe any work-in-progress area of a Figma file (labs, playgrounds, drafts, pages outside the numbered design system pages).
    Why: only published design system pages are a source of truth for agents.

## Decision table: question to tool

| Your question | First tool | Second tool (optional) | Tool call |
|---|---|---|---|
| How do real apps lay out this one screen? | Mobbin | Refero | `mcp__mobbin__search_screens`, `mcp__refero__refero_search_screens` |
| What are the steps of this journey? | Refero flows | Mobbin flows | `refero_search_flows` then `refero_get_flow`; `mcp__mobbin__search_flows` |
| Which variant won an A/B test? | Lazyweb experiments | Browser: GoodUI | `lazyweb_search_experiments` via `lazyweb_execute` |
| What visual direction fits a marketing page? | Refero styles | Browser: Best Designs On X | `refero_search_styles` then `refero_get_style` |
| How do others build a dense admin table or settings page? | Nicelydone | Refero web screens | Nicelydone MCP; `refero_search_screens` with `platform: "web"` |
| How do onboarding and paywalls convert on iOS? | ScreensDesign | Lazyweb experiments | ScreensDesign MCP |
| Which Syntropy component or token do I use? | Figma MCP | `knowledge/` files | `search_design_system`, `get_design_context` |
| Is there an icon for this? | `knowledge/icons/icons.json` | Streamline (proposal only) | `mcp__claude_ai_Streamline__search_assets` |
| What does research say about forms or checkout? | Browser: Baymard | Browser: GOV.UK Design System | none, open in browser |
| Is this pattern a dark pattern? | Browser: Deceptive Design | NN/g heuristics | none |
| How does this look in Arabic RTL? | Benchmarks in `benchmarks.md` (Al Rajhi, Tamara, Thndr) | Material 3 RTL, Apple HIG RTL | Mobbin with the app name in the query |
| What does the regulator require on this screen? | `regulation` links (SAMA, CMA, PDPL) | Notion research pages | none |
| I have a screenshot and want similar ones | Lazyweb `lazyweb_compare_image` | Refero `refero_get_similar_screens` | see tool guides |

## The workflow

### 1. Frame the question (2 minutes)
Write three lines:
- Question: "How do investment apps confirm a purchase before money moves?"
- Surface and platform: mobile app, iOS first, Arabic RTL.
- Decision it feeds: "Choose between a review screen and a review BottomSheet for the invest flow."

### 2. Check Syntropy (2 minutes)
- Search `knowledge/components/index.json` for names (`BottomSheet`, `Sheet Content / Summary`, `KeyValue`, `Checkout`).
- If a component already fits, stop researching and design with it.

### 3. Pick 2 tools max (1 minute)
Use the decision table. Default pairs:
- Mobile screen: Mobbin + Refero.
- Mobile journey: Refero flows + Mobbin flows.
- Conversion question: Lazyweb experiments + Lazyweb screens.
- Back-office: Nicelydone + Refero web.
- Visual direction: Refero styles + Best Designs On X (browser).

### 4. Collect 5 to 10 references (5 to 10 minutes)
- Write concrete queries: what is literally on the screen ("investment order confirmation with amount summary and confirm button"), not adjectives ("clean fintech").
- Run 2 to 4 queries per tool, then stop.
- For every keeper note: app, link, the one thing it does well.

### 5. Extract patterns (5 minutes)
Group references by approach. For each approach write: pattern name, which apps use it, what problem it solves, risk for Safqah (regulation, RTL, trust).

### 6. Map to Syntropy (5 minutes)
Use `translate-to-syntropy.md`: element to component, color to token, layout flipped to RTL, copy rewritten in Safqah voice. List gaps (no component exists) separately.

### 7. Cite and present (3 minutes)
Use `presenting.md`. Every reference shows image, app, link, why it matters and the Syntropy components it maps to.

## Time-boxing

| Task size | Total research time | Tool calls |
|---|---|---|
| One component or state (an error, an empty state) | 10 minutes | 2 to 4 |
| One screen | 20 minutes | 4 to 8 |
| One flow (5 to 10 screens) | 45 minutes | 8 to 15 |
| New product area or redesign | Half a day, split into several questions | 15 to 25 per question set |

Stop when two new queries in a row return no new pattern.

## When NOT to research

- The answer is a Syntropy component with a documented usage (a `Button` variant, a `Tag` tone). Use it.
- The task is a pure copy fix with a rule in `knowledge/content/`.
- The task is token or spacing alignment inside an existing screen.
- The person gave a reference already and asked you to build from it.
- The person said "no research" or the change is a bug fix.
- Regulation dictates the answer (CMA disclosure text, Sharia statement): read the regulation and the Notion source, not galleries.

## Examples

Do: "Question: how do investing apps confirm a buy before money moves? Tools: Mobbin + Refero. Found 7 references from Acorns, Wise, Wealthfront, Revolut. Pattern A: review BottomSheet over the amount screen (Acorns, Revolut). Pattern B: full review screen with Change links (Wise). Maps to `BottomSheet` + `Sheet Content / Summary` + `KeyValue` + `Button`."

Don't: "I looked at some apps and made it like Revolut, dark with a big number and their keypad." (no question, no citations, copied brand look)


---

# Research: benchmarks

# Benchmarks per Safqah topic

Which real products to study for each Safqah topic, Saudi and GCC first, then global. "Study for" says what to look at; it is a starting hypothesis to verify in the live product or a library (Mobbin, Refero), not a claim that the product does it best. All links come from `knowledge/links/links.json`.

## Rules

1. Start every benchmark set with at least 2 Saudi or GCC products.
   Why: Safqah users compare Safqah with the Saudi apps on their phone, in Arabic.
2. Study the closest peer first: Stake (fractional real estate in KSA and Dubai).
   Why: same product shape, same regulator context.
3. Use global products for mechanics and polish, not for regulation, tone or trust signals.
   Why: disclosure rules, Sharia framing and Arabic voice differ.
4. When citing a benchmark, give the product, the screen or flow, the date you looked, and the link.
   Why: apps change often.
5. Never copy a benchmark's brand: logos, colors, illustrations, mascots, exact copy.
   Why: see `translate-to-syntropy.md`.

## How to look at a benchmark

| Method | When |
|---|---|
| Mobbin or Refero with the app name in the query (`"Revolut withdraw money"`) | The app is in the library (most global apps) |
| Public website and help center (browser) | Saudi and GCC apps, which are rarely in libraries |
| The person's own device screenshots | Logged-in Saudi app flows; ask, never guess |
| App Store and Google Play screenshots | Quick look at hero screens and positioning |

## Deal page and deal discovery
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Stake | https://getstake.com | Closest peer: fractional property cards, expected return, funding status, property details |
| KSA | Sukuk | https://sukuk.sa | Sukuk listing, term and return presentation |
| KSA | Manafa | https://manafa.sa | Debt crowdfunding opportunity pages |
| KSA | Raqamyah | https://raqamyah.sa | Investor-facing opportunity details and risk grades |
| KSA | Lendo | https://www.lendo.sa | SME financing opportunities and investor dashboards |
| Global | Fundrise | https://fundrise.com | Real estate investing UX and reporting |
| Global | Arrived | https://arrived.com | Fractional rental property detail pages |
| Global | CrowdStreet | https://crowdstreet.com | Commercial deals with disclosures and documents |
| Global | Masterworks | https://www.masterworks.com | Offering documents presented in-product |
| Global | Republic | https://republic.com | Crowdfunding deal pages, funding progress |
| Global | RealT | https://realt.co | Tokenized property detail and yield display |

## Invest and reserve flow
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Stake | https://getstake.com | Amount entry and confirmation for property shares |
| KSA | Tamara | https://tamara.co | Arabic checkout clarity, payment schedule display |
| GCC | Tabby | https://tabby.ai | Checkout summary and installment schedule |
| GCC | baraka | https://getbaraka.com | Order review for Arabic-speaking investors |
| GCC | Thndr | https://thndr.app | Arabic-first order flow |
| Global | Wise | https://wise.com | Review screen with per-section Change links, transparent fees |
| Global | Robinhood | https://robinhood.com | Minimal order review |
| Global | Trade Republic | https://traderepublic.com | Minimal confirmation UI |

## KYC and onboarding
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Al Rajhi Bank | https://www.alrajhibank.com.sa | National ID and Absher-based onboarding users already know |
| KSA | STC Bank | https://stcbank.com.sa | Mass-market digital onboarding in Arabic |
| KSA | D360 Bank | https://d360.com | Digital bank account opening |
| KSA | Derayah | https://www.derayah.com | Brokerage suitability questions |
| KSA | DGA Platforms Code | https://design.dga.gov.sa | Government identity patterns and form conventions |
| GCC | Sarwa | https://www.sarwa.co | Risk profile questionnaire |
| GCC | Wahed | https://www.wahed.com | Halal investing onboarding |
| Global | Revolut | https://www.revolut.com | Document capture and verification states |
| Global | Groww | https://groww.in | Mass-market investing onboarding |
| Global | Monzo | https://monzo.com | Friendly tone during verification |

## Wallet, top-up and cash-out
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | urpay | https://www.urpay.com.sa | Saudi wallet transfers |
| KSA | Barq | https://www.barq.com | Saudi wallet and transfers |
| KSA | Tweeq | https://tweeq.sa | Spending wallet top-up |
| KSA | STC Bank | https://stcbank.com.sa | IBAN transfers in Arabic |
| GCC | Ziina | https://ziina.com | UAE payments, simple money movement |
| Global | Wise | https://wise.com | Arrival estimates and transfer tracking |
| Global | Wealthfront (in Mobbin) | https://mobbin.com/explore/mobile/app-categories/finance | "Withdraw entire balance" shortcut, initiated status |
| Global | Cash App | https://cash.app | Simple money movement |

## Portfolio and returns
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Derayah | https://www.derayah.com | Saudi brokerage portfolio |
| KSA | Al Rajhi Capital | https://www.alrajhi-capital.sa | Islamic brokerage holdings |
| KSA | SNB Capital | https://snbcapital.com | Bank-owned brokerage |
| KSA | Sahm | https://www.sahmcapital.com | Saudi and US holdings in one app |
| KSA | Drahim | https://drahim.sa | Personal finance overview |
| GCC | Sarwa, baraka | https://www.sarwa.co, https://getbaraka.com | Portfolio summary for GCC investors |
| Global | Wealthsimple | https://www.wealthsimple.com | Calm, trust-led portfolio home |
| Global | M1 | https://m1.com | Portfolio breakdown visual |
| Global | Fundrise | https://fundrise.com | Real estate portfolio reporting |
| Global | Webull, Zerodha Kite | https://www.webull.com, https://kite.zerodha.com | Dense data (for web and back-office, not mobile home) |

## Payouts, distributions and reinvest
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Stake | https://getstake.com | Rental distributions |
| KSA | Manafa, Raqamyah, Lendo | see above | Repayment schedules for debt investors |
| GCC | Wahed | https://www.wahed.com | Halal returns language |
| Global | Fundrise, Arrived | see above | Distribution history and reinvest options |
| Global | Acorns | https://www.acorns.com | Automatic reinvest framing |

## Goals
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Drahim | https://drahim.sa | Saudi personal finance goals |
| Global | Betterment | https://www.betterment.com | Goal-based investing |
| Global | Qapital | https://www.qapital.com | Goal savings rules |
| Global | Acorns | https://www.acorns.com | Round-up and goal investing |
| Global | Stash | https://www.stash.com | Beginner guidance |

## Empty states and supply scarcity
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Stake | https://getstake.com | How a property platform handles "no open deals" |
| Global | Republic, Masterworks | see above | Waitlists and upcoming offerings |
| Global | Monzo | https://monzo.com | Friendly empty states |

## Notifications and alerts
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Al Rajhi Bank, STC Bank | see above | Transaction alerts in Arabic |
| Global | Monzo | https://monzo.com | Notification tone |
| Global | Revolut | https://www.revolut.com | Granular notification settings |

## Sharia, compliance and disclosure
| Region | Product | Link | Study for |
|---|---|---|---|
| KSA | Al Rajhi Capital | https://www.alrajhi-capital.sa | Sharia board and compliance presentation |
| KSA | Sukuk | https://sukuk.sa | CMA-regulated disclosure on listings |
| GCC | Wahed | https://www.wahed.com | Halal screening explained simply |
| Global | CrowdStreet, Masterworks | see above | Offering documents and risk sections |
| Rules | SAMA, CMA, PDPL | see `links.json` category `regulation` | The requirement itself |

## Back-office and admin
| Region | Product | Link | Study for |
|---|---|---|---|
| Global | Stripe | https://stripe.com | Payments dashboard, tables, detail pages |
| Global | Mercury | https://mercury.com | Business banking dashboard |
| Global | Ramp | https://ramp.com | Approvals and finance operations |
| Systems | Carbon, Ant Design, Polaris | see `links.json` category `design-systems` | Dense table and filter behaviour |

## Arabic voice and RTL polish
| Product | Link | Study for |
|---|---|---|
| Tamara | https://tamara.co | Strong Arabic UX and copy |
| Thndr | https://thndr.app | Arabic-first investing |
| Al Rajhi Bank | https://www.alrajhibank.com.sa | What the largest Saudi audience expects |
| Dubai Design System, UAE Design System | https://designsystem.dubai.ae/foundations, https://designsystem.gov.ae | Bilingual typography and scale |


---

# Pattern: README

# Screen patterns

How Safqah screens are assembled from Syntropy components. Read the universal recipe below first, then open the pattern file for the screen you are building. Every component name here is copied from `knowledge/components/index.json`; every token from `knowledge/tokens/resolved.json`.

## Pattern index

| # | Pattern | Job of the screen | Main components |
|---|---|---|---|
| 1 | [deal-page.md](deal-page.md) | Let an investor understand one deal and decide to invest | `Base card` (HeaderCard), `dealTags`, `Stat`, `KeyValue`, `DealTimeline`, `Guarantees`, `ComplianceBadge`, `ShariaDisclosure`, `Button` |
| 2 | [deal-list.md](deal-list.md) | Browse open, upcoming and closed deals; never look broken when supply is thin | `CardDeal`, `Carousel`, `Section`, `SegmentedControl_3`, `Tag`, `EmptyState` |
| 3 | [invest-and-reserve.md](invest-and-reserve.md) | Choose an amount, reserve honestly, confirm, see success | `Input Amount`, `Investment Calculator`, `QualifiedCalculator`, `Keypad / Amount input`, `Countdown`, `BottomSheet`, `Sheet Content / Summary` |
| 4 | [payment.md](payment.md) | Fund the investment or wallet and show the result of the payment | `Checkout`, `Payment-details`, `SelectionList`, `SelectRow`, `MadaLogo`, `KeyValue`, `Toast` |
| 5 | [kyc.md](kyc.md) | Verify identity and suitability (CMA KYC) with clear progress | `KYCChecklist`, `KYCTaskRow`, `KYCStep`, `Stepper`, `AbshirLogo`, `Upload Button`, `File Item with Progress` |
| 6 | [onboarding-and-sign-in.md](onboarding-and-sign-in.md) | Get a person into their account fast and safely | `Input Phone`, `OTP Input`, `AppBar`, `BottomSheet`, `Illustrations`, `Toast` |
| 7 | [wallet-and-cash-out.md](wallet-and-cash-out.md) | See balance, manage bank accounts, withdraw, fix name mismatch | `WalletChip`, `MoneyAmount`, `Input Amount`, `ActionList`, `ListItem`, `Reinvest / MaturityRecap`, `File Item with Progress` |
| 8 | [portfolio.md](portfolio.md) | Show what the investor owns, what it earned and what is next | `PortfolioHeader`, `SegmentedTabs`, `Issuance List`, `Issuance Row`, `CardDeal`, `Chart / Donut · Mobile` |
| 9 | [payouts.md](payouts.md) | Show every distribution, its state and its expected date | `Payouts cell`, `Distribution-schedule`, `DealTimeline`, `Section`, `Alert` |
| 10 | [goals.md](goals.md) | Set an investment goal and track progress without promising returns | `GoalActivate`, `GoalTracker`, `Goal / PhaseRow`, `Goal / Amount`, `ProgressBar` |
| 11 | [empty-states.md](empty-states.md) | Explain why a region is empty and give one next step | `EmptyState`, `Illustrations`, `Sheet Content / Empty`, `Chart / States` |
| 12 | [errors-and-recovery.md](errors-and-recovery.md) | Tell the user what went wrong and how to continue | `Input`, `Form Field Helper`, `Alert`, `Banner`, `Toast`, `Dialog`, `Button` |
| 13 | [forms.md](forms.md) | Collect structured data with the right control and validation timing | `Form Field`, `Input`, `Select`, `Combobox Field`, `Date Input`, `Checkbox Group`, `Radio Group` |
| 14 | [notifications-and-permissions.md](notifications-and-permissions.md) | Let users choose what we notify and ask for OS permission at the right moment | `ActionList`, `ListItem`, `Switch`, `Section`, `BottomSheet`, `Banner` |
| 15 | [settings-and-profile.md](settings-and-profile.md) | Let users see and edit their account, security and preferences | `AppBar`, `ActionList`, `ListItem`, `Section`, `Avatar`, `Dialog` |
| 16 | [backoffice-tables.md](backoffice-tables.md) | Let operators find, compare and act on many records on web | `Table / Cell`, `Table / HeaderCell`, `Table / ActionCell`, `Table / Toolbar`, `Pagination`, `Filter menu` |
| 17 | [charts-and-dashboards.md](charts-and-dashboards.md) | Show numbers over time or share of a whole, honestly | `Chart / ChartContainer`, `Chart / Line · Mobile`, `Chart / Legend`, `Chart / ChartTooltip`, `Chart / States`, `Stat` |

## Universal screen recipe (every Safqah screen)

Read top to bottom. RTL is the canonical layout: "start" means the right edge in Arabic.

| Slot | Component and props | Tokens |
|---|---|---|
| 1. Status bar | OS status bar (no Syntropy component) | sits on the screen background |
| 2. Top bar | `AppBar` with the `Type` that fits: `main screens` (tabs with wallet), `Inner screens` (back + title), `Small Title` (collapsed sticky), `Deal page` / `Deal page-collapsing` (deal detail), `Close Icon-Black` (modal flows), `Onboarding`. `Direction=RTL` for Arabic. Portfolio home may use `Header` (06a) instead | `bg/base`; `hasDivider` only when content scrolls under it |
| 3. Optional page message | At most one `Banner` (page level) or one `Alert` (inline) | gap `space/lg` below |
| 4. Content | Regions stacked vertically, each led by a `Section` (`Size=Lg` for page sections, `Md` for sub-sections) | content area `bg/base` on the `bg/surface` canvas; cards inside it `bg/elevated`; side padding `space/lg`; gap between regions `space/2xl`; gap inside a region `space/md` |
| 5. Primary action | One `Button` `Variant=primary` `Size=lg`, full width, in a sticky footer for task screens | footer padding `space/lg` sides and top, plus the device safe-area inset at the bottom; surface `bg/base` with a `Scroll shadow` `Position=bottom` when content scrolls under it |
| 6. Bottom navigation | `TabBar` (4 tabs) or `TabBar (3-tab)` on top-level screens only; never together with a sticky CTA | the bar already reserves the home-indicator inset |

### Surfaces
| Token | Use it for | Do not use it for |
|---|---|---|
| `bg/surface` | Least elevated: the canvas behind everything, the back layer of the elevation ladder (screen background, gutters around content, web page background) | Cards or content blocks (they would sink into the canvas) |
| `bg/base` | Mid elevation: the base content area where most page content sits (White in Light), including `AppBar`, content sections, sticky footers | Floating or overlaid elements |
| `bg/elevated` | Most elevated, off-white: the default surface whenever elevation is needed: cards (`ActionList` `Style=Grouped`, fact panels, `GoalTracker`, `KYCChecklist`), `BottomSheet`, `Dialog`, `Modal`, `Popover`, `Menu`, `Banner` `Style=Elevated`, with `border/subtle` and `radius/lg` | The page canvas or the whole content area |

Elevation ladder, back to front: `bg/surface` → `bg/base` → `bg/elevated`. Each layer sits on the one before it; never put a lower layer on top of a higher one. Values and descriptions: `knowledge/tokens/resolved.json`.
| `bg/overlay` | The scrim behind `BottomSheet`, `Dialog`, `Modal` | Anything else |

### Rules
1. One `Button` `Variant=primary` per screen. The escape action is `Variant=secondary` or `Variant=text`, same `Size`.
   Why: two primaries make the user read both labels; many pick neither.
2. Side padding is `space/lg`; sections are `space/2xl` apart; never hand-pick pixel values.
   Why: one rhythm across every screen; values live in `resolved.json`.
3. The sticky CTA sits above the safe-area inset and never covers the last content row: add bottom padding equal to the footer height to the scroll content.
   Why: the last fee or disclosure line must stay readable.
4. Every screen ships five states: loading (`SkeletonLine`, `SkeletonBlock`, `SkeletonAvatar` matching the real layout), empty (`EmptyState`), error, success, disabled. Show skeletons only after 200ms.
   Why: a missing state becomes a blank screen in production.
5. `Direction` on every directional component matches the locale (`RTL` / `rtl` exactly as the set spells it). Digits, phone numbers, IBANs and chart time axes never mirror.
   Why: `knowledge/ux/rtl.md` R1-R2.
6. Copy: label, control, at most one short hint. Arabic first, Western digits, currency after the amount (`1,250.50 ر.س` / `1,250.50 SAR`), percentage labels start with «نسبة». Never the em dash character.
   Why: `knowledge/content/voice-tone.md`, `numbers-currency.md`.
7. Warnings use `Tone=warning`; red `Tone=error` only for critical or defaulted states.
   Why: red must keep its meaning.
8. Hit areas are 48x48 in the app, 24x24 minimum on web.
   Why: `knowledge/ux/accessibility/touch-targets.md`.
9. Money decisions show the risk and the fee before the commit button, not after.
   Why: CMA disclosure duty and no hidden costs; confirm wording with Compliance.
10. No fake urgency. Timers count real deadlines only; no scarcity counts unless the number is live and true.
    Why: T6 and the deceptive-design list.

### Known system risks to respect
- Brand green is used as built: the primary `Button` (white on `bg/brand/primary`), green amounts, selected tiles and links appear exactly as the components build them, as in the investment calculator. Do not flag, recolour or enlarge them.
- `text/subtle` is large-text only. Never put decision information (fees, dates, risk) in it.
- `Base card` (HeaderCard) and several 08 components are not published; use them by name, and in another Figma file, copy it from the Syntropy file.

## Gaps found while writing these patterns
Components the patterns needed that the manifest does not contain. Compose from what exists and flag; never invent.

| Needed | Used instead | Pattern |
|---|---|---|
| Numeric keypad as a standalone component | `Sheet Content / Amount keypad`, `Keypad / *` molecules (08s) | invest-and-reserve, onboarding |
| Status bar / OS chrome, OS permission dialogs, biometric prompt | OS-native; not a Syntropy component | onboarding, notifications |
| Payment-method row with brand logo (Mada, Apple Pay) | `SelectRow` + `MadaLogo`; no Apple Pay mark in the manifest | payment |
| `RadialProgress` (referenced by the CardGoal guide as 08g) | `GoalTracker` composes it internally; no standalone set | goals |
| Range slider (min to max) | `Slider Field` single value, or two `Select` | deal-list, backoffice |
| Hijri calendar picker | `Date Calendar Picker` is Gregorian only | forms |
| Dedicated empty-state illustrations (empty box, no results, offline) | `Illustrations` concepts (`Think`, `Puzzle`, `Data info alert`) | empty-states |
| Notification-bell illustration | `Illustrations` `Info` or `Start` | notifications |
| Two sets share the name `Table / ActionCell` (3320:262 and 3351:197) | use 3320:262 and flag the duplicate | backoffice-tables |


---

# Pattern: backoffice-tables

# Back-office tables

Data tables for Safqah's internal back-office on web: finding, filtering, sorting, selecting and acting on many records (investors, deals, transactions, payouts, AML cases), in LTR and RTL. Read this before building any back-office list, queue or report table.

## Job of the screen
Let an operator get from "thousands of records" to "the right few" quickly, understand each row at a glance, act on one or many safely, and always know how many results there are and where they are in them.

## When to use
- Back-office queues and lists (web, desktop breakpoint, 1200px container).
- Not on the mobile app: on phones use the mobile table style or rows-as-cards (`ListItem`, `Payouts cell`), never a desktop table.
- For a handful of facts about one record use `KeyValue` in a detail panel.

## Flow steps
1. **Land** on the list: default sort (newest first or most urgent), default filters stated in chips.
2. **Search / filter**: toolbar search, filter menu, date range; active filters become removable chips; result count updates.
3. **Sort** by a column header.
4. **Open a row**: detail in a `Drawer` (keeps list context) or a detail page with `Breadcrumb`.
5. **Select rows**: toolbar switches to selection mode with bulk actions and the selected count.
6. **Bulk action**: confirm with a `Dialog` when destructive or financial; show progress and result.
7. **Paginate**: page size and range readout in the table footer.

## Layout recipe (top to bottom; RTL shown, LTR mirrors)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Shell | `NavigationRail` `Variant=Standard` `Mode=Expanded` `Direction=RTL` (or `AppSidebar (shadcn-style)`), with `NavRailItem` `State=active` for the current section | Sidebar on the start edge (right in RTL) |
| 2 | Page header | `Breadcrumb` `Type=full` + page title heading/24/semibold + one primary `Button` `Size=md` (for example «إضافة صفقة») at the end edge | Padding `space/2xl` |
| 3 | Toolbar | `Table / Toolbar` `Mode=Default` `Direction=RTL`: `Search Input` `Size=md`, filter trigger opening `Filter menu`, `Date Range Field` `Size=md`, `Sort menu` (optional), result count body/13 `text/muted` («1,248 نتيجة») | Gap `space/md` |
| 4 | Active filters | `Tag Group` `Layout=wrap` of `Tag Removable` `Tone=neutral` `Size=sm` + `Link` «مسح الكل» | Only when filters are active |
| 5 | Header row | `Table / HeaderCell` per column `Density=Default` `Direction=RTL`, `Sort=None/Asc/Desc` on sortable columns (numeric default `Desc`), first column `Has select-all=true` | Exactly one sorted column shows the arrow |
| 6 | Rows | `Table / Cell` per column with `Type` by data: `Text` (names, IDs), `Numeric` (amounts, end-aligned, tabular), `Avatar` (person), `Tag`, `Status` (use `IssuanceStatusBadge (Internal)` / `(Developer)` for lifecycle), `Select` (row checkbox), `Trend`, `Progress` (funding) | Zebra or plain via table surface: White · Subtle · Brown (caution, schedules) · Elevated |
| 7 | Row actions | `Table / ActionCell` `Has inline actions=false` with one `MenuTrigger` `Glyph=kebab` opening `Menu` of `MenuItem` (destructive items `State=destructive`, last) | One overflow menu per row; at most one inline action |
| 8 | Footer | `Pagination` `Type=table` `Direction=RTL` with page-size `Select` (10 · 25 · 50 · 100) and range «1-25 من 1,248» | Western digits |
| 9 | Selection mode | `Table / Toolbar` `Mode=Selection`: «تم تحديد 12» + bulk `Button`s (`Variant=secondary` `Size=sm`; destructive as `Variant=destructive`) + «إلغاء التحديد» | Replaces the default toolbar |
| 10 | Detail | `Drawer` `Side=left` in RTL (end edge) `showHeader` `showFooter`, `KeyValue` rows, `DealTimeline` / `TimelineRow`, actions in the footer | Or a full page with `Breadcrumb` |

Choose `Density=Compact` for dense operational queues; keep `Default` for review screens where reading matters. Two sets are named `Table / ActionCell` in the manifest (3320:262 and 3351:197): use 3320:262 and flag the duplicate.

Numbers: Western digits everywhere, including `Pagination` (the pagination guide mentions Arabic-Indic numerals for RTL; Safqah's numbers rule overrides it). Amounts end-aligned with currency after the amount, two decimals.

## Required states

| State | Treatment |
|---|---|
| Loading | Keep header and toolbar; 10 rows of `SkeletonLine` per cell (widths vary by column type: `Half` text, `Quarter` numeric). Sorting/paging: keep old rows dimmed with a `ProgressBar_Indeterminate` `Size=sm` above the table, not a full skeleton |
| Empty (no data yet) | `EmptyState` `Tone=default` `Size=Compact` inside the table body («لا توجد سجلات بعد») + primary action if creation is possible |
| Empty (filters) | `EmptyState` `Tone=search` `Size=Compact` «لا توجد سجلات تطابق الفلاتر» + «مسح الفلاتر» |
| Error | `EmptyState` `Tone=error` in the body + retry; filters and toolbar stay. Bulk action partial failure: `Alert` `Tone=warning` «تمت معالجة 10 من 12» with a link to the failed rows |
| Success | Single action: `Toast` `Tone=success` `Size=Small` naming the record. Bulk: `Toast` with the count; rows update in place |
| Disabled | Actions the operator lacks permission for are hidden from the menu, not shown disabled without reason; locked records show `MenuItem` `State=disabled` with a `Tooltip` reason |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Count | «1,248 نتيجة» | "1,248 results" |
| Range | «1-25 من 1,248» | "1-25 of 1,248" |
| Selected | «تم تحديد 12» | "12 selected" |
| Clear | «مسح الكل» / «إلغاء التحديد» | "Clear all" / "Clear selection" |
| Filter empty | «لا توجد سجلات تطابق الفلاتر» | "No records match these filters" |

Column headers: nouns, 1-2 words, units in the header only when the cell cannot carry them.

## Compliance notes
- Personal data: mask national ID and IBAN by default (show last 4), reveal on explicit action with audit logging (PDPL). Confirm with Compliance.
- Financial or irreversible bulk actions (approve payouts, reject KYC, freeze accounts) need a `Dialog` that states the count and amount and a reason field where policy requires; log the operator.
- AML / risk statuses are internal only (`IssuanceStatusBadge (Internal)`); never reuse internal wording in investor-facing screens.
- Exports respect the same masking and permission rules.

## Accessibility notes
- Use real table semantics (header cells, `aria-sort` on the sorted column, row checkboxes labelled with the row name).
- Back-office targets are at least 24x24 (WCAG 2.5.8); compact density still meets it with spacing.
- Keyboard: tab into the table, arrow keys within, Enter opens the row, Escape closes the drawer and returns focus to the row.
- Status cells pair colour with the label; selected rows have more than a tint (checkbox state).
- In RTL the reading order, sort arrows and pagination arrows mirror; numbers do not.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Stripe | Filter chips, result counts and row detail drawers on payment tables |
| Mercury | Clean financial tables with end-aligned amounts and bulk actions |
| Ramp | Approval queues with clear selection mode |
| Carbon / Salesforce Lightning | Data table, toolbar and pagination specs |

## Anti-patterns
- A desktop table squeezed onto a phone.
- Several inline icon buttons per row instead of one overflow menu.
- Pagination without a total or page size; current page as a link.
- Amounts start-aligned or with mixed decimals; Arabic-Indic digits in RTL.
- Bulk delete with no confirmation or count.
- Filters applied but not visible as chips.


---

# Pattern: charts-and-dashboards

# Charts and dashboards

How Safqah shows numbers over time, composition and comparison: picking a chart family, the semantic palette, time running left to right even in RTL, Western numerals, and text alternatives. Read this before adding any chart, KPI strip or dashboard to the app, web or back-office.

## Job of the screen
Make one quantitative point obvious and honest: the shape matches the data, the reader can get the exact number, and nothing decorative competes with it.

## When to use
- Portfolio allocation and returns over time (app), deal funding and repayment analytics (web), operational dashboards (back-office).
- Not for: a single number (use `Stat`), a lookup fact (use `KeyValue`), a categorical status (use `StatusPill` / `IssuanceStatusBadge (Investor)`).

## Picking the chart

| Question | Family (desktop / mobile) | Notes |
|---|---|---|
| How did a value change over time? | `Chart / Line` · `Chart / Line · Mobile` | Trend; one or a few series |
| How big is it over time, or cumulative? | `Chart / Area` · `Chart / Area · Mobile` | Magnitude, cumulative profit |
| Compare categories | `Chart / Bar` · `Chart / Bar · Mobile` | Sorted bars; horizontal for long Arabic labels |
| Composition per group | `Chart / Stacked` · `Chart / Stacked · Mobile` | Few segments |
| Share of a whole | `Chart / Donut` · `Chart / Donut · Mobile` | ≤6 slices; a labelled list beats the ring for exact values |
| Running total by contribution | `Chart / Waterfall` · `Chart / Waterfall · Mobile` | Invested → profit → fees → net |
| Gains and losses by period | `Chart / Bar-PnL` | Status colours for sign, plus the sign |
| Relationship between two measures | `Chart / Scatter` · `Chart / Scatter · Mobile` | Risk vs return (internal) |
| Two related series, one honest axis | `Chart / Combo` · `Chart / Combo · Mobile` | Never two y-axes that fake correlation |
| Headline numbers with tiny trends | `Chart / KPI strip` · `Chart / KPI list · Mobile`, `Chart / Sparkline` | Mobile becomes a single-column list |
| Minimal editorial chart | `Chart / Template-Tufte-Bar`, `Chart / Template-Tufte-Sparkline` | Reports and summaries |

## Flow steps
1. Region loads: `Chart / States` `State=loading`.
2. Data returns: render the family in `Chart / ChartContainer`; headline states the takeaway.
3. User touches or hovers a point: `State=Hover` with `Chart / ChartTooltip` `Mode=single`; a group: `State=Group hover` with `Mode=multi-series` `ShowTotal=true`.
4. User switches the range (1M / 6M / 1Y / All) with `SegmentedControl_4`.
5. No data or error: `Chart / States` `State=empty` / `State=error`.

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Title | `Section` `Size=Md` with the takeaway as the title («أرباحك المستلمة في 2026») and `Has description` for the unit/period | |
| 2 | Headline number (optional) | `Stat` `Size=md` (value + delta only if a real prior period exists) | Or `Chart / KPI strip` |
| 3 | Range control (optional) | `SegmentedControl_4` `Style=pill-thumb` `Size=sm` «شهر» · «6 أشهر» · «سنة» · «الكل» | Filters the same view |
| 4 | Chart | `Chart / ChartContainer` `Direction=RTL` `Density=comfortable` (app) / `compact` (back-office), `showGrid`, `showAxis`, `showLegend` only for 2+ series, `showTooltip`, `showDataLabels` for ≤6 bars; family inside (for example `Chart / Line · Mobile` `Direction=RTL` `State=Default`) | Container card `bg/elevated` (plot fill as built in `Chart / ChartContainer`); grid `border/subtle`; axis `border/default`; labels `text/muted` |
| 5 | Axes | `Chart / Axis` `Orientation=x` (time, always left to right) and `Orientation=y` (moves to the right side in RTL) `LabelBehavior=abbreviated` on mobile (three labels) | Western digits |
| 6 | Reference | `Chart / ReferenceLine` `Style=dashed` for a target or average, labelled | Only when it adds meaning |
| 7 | Legend | `Chart / Legend` `Orientation=horizontal` `Direction=RTL` under the chart | Direct labels preferred for ≤3 series |
| 8 | Text alternative | A `List` `Style=Description` (`List / DescriptionRow`) or a small table (`Table / Cell` rows) with the plotted values, collapsible under «عرض البيانات» (`AccordionItem`) | Required for every chart |

Dashboards (web, back-office): a 12-column grid inside the 1200px container; a top row of `Chart / KPI strip` or 3-4 `Stat` `Size=md`, on the `bg/base` content area, then charts in cards (`bg/elevated`, `border/subtle`, `radius/lg`, padding `space/lg`), gaps `space/2xl`. One question per card.

## Palette and encoding rules
1. Semantic tokens only; no primitives, no new variables. Series and sequential ramp = the brand-green steps from `bg/brand/lightest-hover` through `bg/brand/primary` to `bg/brand/darkest-pressed`.
   Why: one green-first visual language; tokens keep Light/Dark correct.
2. Status colours (`bg/success`, `bg/warning`, `bg/error`) only when the data is a status or sign (Bar-PnL, late vs on time), always paired with a sign or label.
   Why: V3, colour carries meaning; colour alone fails colour-blind users.
3. Time runs left to right in both languages; only the y-axis, legend and lists mirror in RTL.
   Why: `knowledge/ux/rtl.md`; a mirrored time axis inverts the trend.
4. Western digits, thousands comma, one decimal for percentages, currency after the amount; the Riyal symbol in tooltips and axes where the component renders it.
   Why: `numbers-currency.md`.
5. Bars start at zero; no 3D, no gradients on data marks, no dual axes that imply correlation.
   Why: honest shape (Tufte data-ink).
6. Projections are drawn differently from actuals (dashed line or lighter step) and labelled «متوقع».
   Why: expected is not earned.

## Required states

| State | Treatment |
|---|---|
| Loading | `Chart / States` `State=loading` at the final chart size (or `SkeletonBlock` `Radius=Large`) |
| Empty | `Chart / States` `State=empty` with one line («لا توجد بيانات لهذه الفترة»); no axes with nothing on them |
| Error | `Chart / States` `State=error` + retry link |
| Success | `State=Default`; hover/selection via `State=Hover` / `Group hover` |
| Disabled | Masked balance (portfolio): show shape without values, tooltips off |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Title as takeaway | «أرباحك المستلمة في 2026» | "Profit received in 2026" |
| Tooltip total | «الإجمالي» | "Total" |
| Projection label | «متوقع» | "Expected" |
| Empty | «لا توجد بيانات لهذه الفترة» | "No data for this period" |
| Data toggle | «عرض البيانات» | "Show data" |

Labels with a percentage start with «نسبة» («نسبة العائد»); SAR amounts do not.

## Compliance notes
- Past performance charts carry the required past-performance line where Compliance asks for it; projections are labelled expected, with the assumption. Confirm with Compliance.
- Do not chart other investors' data in the investor app; aggregate platform statistics must be accurate and dated.
- Back-office charts with personal data follow the same masking rules as tables.

## Accessibility notes
- Every chart has a text alternative: a one-sentence summary (accessible name) plus the data list or table.
- Tooltips are reachable by keyboard and touch (tap a point), not hover only; the selected point is announced.
- Series are distinguishable without colour (direct labels, markers or patterns); contrast of marks against the plot and card background (`bg/elevated`) at least 3:1 for meaningful lines and bars.
- Respect reduced motion: no animated draw-in.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Wealthsimple | Restrained single-series performance chart with range switch |
| Robinhood | Touch scrubbing with a value flag and time label |
| Stripe | Dashboard cards answering one question each |
| Groww | Mobile charts with few axis labels and clear tooltips |

## Anti-patterns
- Mirrored time axis in Arabic; Eastern Arabic digits on axes.
- A rainbow palette or primitive colours; red/green without signs.
- Donut with more than 6 slices; pie for things that are not parts of a whole.
- Dual y-axes, truncated bar baselines, 3D.
- A chart with no text alternative or no stated unit.
- A delta on a `Stat` with no prior period.


---

# Pattern: deal-list

# Deal list (Deals tab)

The screen where investors browse deals: open now, coming, and closed track record, with light filtering. Read this before building the Deals tab, a deals section on home, or any list of `CardDeal`.

## Job of the screen
Help an investor find a deal worth opening, and, when there is no open deal, show that the platform is alive and what happens next. Deal supply at Safqah is intentionally constrained: an empty open-deals list is the steady state, not a fault, and must never read as the app failing.

## When to use
- The Deals tab (most visited surface), a home "deals" region, search or filter results.
- Not for: one deal's details (`deal-page.md`), the investor's own holdings (`portfolio.md`).

## Flow steps
1. **Load**: skeleton cards.
2. **Default view**: the tab is four permanent regions, open deals being only one: (a) «صفقات متاحة الآن», (b) «قادم في الطريق», (c) «تنبيهاتي», (d) «من صفقاتنا الناجحة» (closed track record).
3. **Filter** (optional): pick a segment or open the filter sheet; results update in place with a count.
4. **Open a card**: go to `deal-page.md`.
5. **No open deals**: region (a) shows a neutral wait state with one action (create an alert), while regions (b) to (d) stay populated.
6. **Filter returns nothing**: a search-tone empty state with «مسح الفلاتر». Never the scarcity copy.
7. **Pull to refresh**: `Pull-to-refresh` `State=pulling` then `refreshing`.

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="main screens"` `Direction=RTL` (`showBalance`, `showEyeButton`, `showProfile`) | `bg/base` |
| 2 | Segment filter | `SegmentedControl_3` `Style=pill-thumb` `Size=md` `Direction=RTL`; segments «متاحة» · «قادمة» · «مغلقة» (first segment on the right) | Padding `space/lg`. A choice control, not navigation: do not use `TabBar` here |
| 3 | Attribute filters (optional) | `Tag Group` `Layout=overflow` of `Tag` `Style=subtle` `Size=md` (duration buckets, region); active filters as `Tag Removable` `Tone=brand`. «الفلاتر» opens `BottomSheet` with `Filter menu` or `ProvinceSelector` `Selection=Multi` | Horizontal scroll inside `ScrollContainer` `Axis=horizontal` `fadeEnd` true. Result count as body/13 `text/muted` |
| 4 | Region (a) open deals | `Section` `Size=Lg` «صفقات متاحة الآن» `Has action` («عرض الكل») only if more than shown. Featured: `Carousel` `Type=Cards` `Size=Md` of `CardDeal` `Layout=Hero` `State=Available` `Direction=RTL` + `PageIndicator` `Style=Dots`. Rest: vertical stack of `CardDeal` `Layout=Row` | Gap between cards `space/md`; sections `space/2xl` apart |
| 5 | Region (b) coming | `Section` `Size=Md` «قادم في الطريق» + `ListItem` rows (`Has leading`, `Has label` with `Tag` «قريباً», `Has chevron`) inside `ActionList` `Style=Grouped` | Shows real pipeline only; no dates unless confirmed |
| 6 | Region (c) alerts | `Section` `Size=Md` «تنبيهاتي» + `ActionPrompt` `Tone=Brand` («أنشئ تنبيهاً بالصفقات التي تناسب معاييرك») or a summary `ListItem` when an alert exists | One CTA |
| 7 | Region (d) track record | `Section` `Size=Md` «من صفقاتنا الناجحة» + `Carousel` of `CardDeal` `Layout=Hero` `State=Closed` (or `Row`), each with `dealTags` `Type=Closed` | Real outcomes only (repaid, on time) |
| 8 | Bottom navigation | `TabBar` `Active=` Deals tab `Direction=RTL` | Reserves safe area |

Qualified users: `CardDeal` `Qualified=true` shows the `dealTags` qualified badge; retail users never see it (`Qualified=false`). Reserved deals use `State=Reserved` and `Show status=true`.

## Required states

| State | Region (a) behaviour |
|---|---|
| Loading | One `SkeletonBlock` `Radius=Large` at Hero card size (358x316) + 3 Row skeletons (`SkeletonAvatar` `Shape=Square` `Size=M` + 2 `SkeletonLine`). Segments render immediately |
| Empty: no open deals (supply) | `EmptyState` `Tone=default` `Size=Compact` `showButton=true`: title «لا توجد صفقات مفتوحة حالياً», description «سنخبرك عند توفر صفقة جديدة.», button «أنشئ تنبيهاً». Neutral tone, no apology, no countdown unless ops gives a real estimate. Regions (b) to (d) stay visible below |
| Empty: filters match nothing | `EmptyState` `Tone=search` `Size=Compact`: «لا توجد صفقات بهذه الفلاتر» + button «مسح الفلاتر». Never reuse the supply copy |
| Empty: alert set but no match | `Alert` `Tone=warning` `Style=Outlined` «لا توجد صفقات تطابق تنبيهك» + link «تعديل التنبيه» (the only warning-tone empty) |
| Error | `EmptyState` `Tone=error` `Size=Default` «تعذر تحميل الصفقات» + «إعادة المحاولة»; offline adds `Toast` `Tone=warning` `Size=Small` «لا يوجد اتصال» |
| Success | After creating an alert: `Toast` `Tone=success` «تم إنشاء التنبيه» and region (c) shows the alert row |
| Disabled | Closed deals: `CardDeal` `State=Closed` (dimmed by design), still tappable to the track-record page. Sold out while viewing: card flips to `State=Closed` in place; no error |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Segments | «متاحة» · «قادمة» · «مغلقة» | "Open" · "Upcoming" · "Closed" |
| Card metric | «نسبة العائد المتوقع» `12%` · «المدة» `12 شهر` | "Expected return" `12%` · "Term" `12 months` |
| Supply empty | «لا توجد صفقات مفتوحة حالياً. سنخبرك عند توفر صفقة جديدة.» | "No open deals right now. We'll notify you when a new deal is available." |
| Filter empty | «لا توجد صفقات بهذه الفلاتر» / «مسح الفلاتر» | "No deals match these filters" / "Clear filters" |
| Track record | «من صفقاتنا الناجحة» | "From our completed deals" |

## Compliance notes
- Cards show expected return with «نسبة» and the real precision (`7.55%`). No "guaranteed".
- Track-record cards show actual results only; do not imply future deals will perform the same. Add a one-line past-performance note if Compliance requires. Confirm with Compliance.
- Pipeline (coming) items: disclose only what may be disclosed pre-launch; no commitment language that creates gharar. Confirm with Compliance.
- Ordering and badges must not say «الأفضل لك» or rank by suitability (CMA).

## Accessibility notes
- Each `CardDeal` is one button read as: name, expected return, term, status.
- `Carousel` offers next/previous actions and announces «صفقة 1 من 3»; never drag-only.
- Segment control uses radio semantics (one selected), `Size=md` or larger for 44pt/48dp.
- Result count updates are announced politely after filtering.
- Closed (dimmed) cards keep text at 4.5:1; dimming is the image, not the text.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Arrived | Open and sold-out properties side by side; sold-out reads as proof, not failure |
| Fundrise | Plain filters and counts; no gamified scarcity |
| Sukuk / Manafa (Saudi) | Arabic deal cards with return and term as the two key numbers |
| Wahed | Calm empty and waiting states in a Sharia-compliant investing app |

## Anti-patterns
- A blank list or a lone illustration when no deal is open (reads as the app being broken).
- The same copy for "no supply" and "no filter results".
- Stacking `CardDeal` `Layout=Hero` in a long list (use `Row`).
- `TabBar` used as the open/upcoming/closed switch.
- Fake urgency: invented countdowns to the next deal.
- Showing the qualified badge to retail users.


---

# Pattern: deal-page

# Deal page

The detail screen for one deal (صفقة): hero, headline numbers, facts, lifecycle, guarantees, compliance and a sticky invest action. Read this before building or reviewing any deal detail screen on the app or web.

## Job of the screen
Give an investor every fact they need to decide on one deal, in the order they ask: what is it, what does it return and for how long, how safe is it, what happens when, and is it allowed (Sharia, CMA). Then let them invest in one tap.

## When to use
- Opening a deal from `CardDeal`, a notification, a deep link or a recommendation.
- States: Available, Reserved (by this user), Invested, Closed (track record), Coming soon.
- Not for: lists of deals (use `deal-list.md`), the amount entry itself (use `invest-and-reserve.md`), updates feeds (use `NewsCard`).

## Flow steps
1. **Enter** from a card. Hero expanded, `Base card` `State=Expanded`. Skeleton while loading.
2. **Scroll**. Hero collapses into `AppBar` `Type="Deal page-collapsing"` (mobile) or `Base card` `Platform=Web` `State=Collapsed` (web sticky bar with title, Share, Save, Invest).
3. **Read numbers and facts**. Optional: tap a `KeyValue` info icon to open a `Tooltip` or a `BottomSheet` with `Sheet Content / Text`.
4. **Model the amount** inline (`Calculator / Amount card`, qualified) or skip.
5. **Tap the sticky CTA** `استثمر الآن`. Go to `invest-and-reserve.md` step 1.
6. **Return states**: Reserved shows `Collapsed-Reservation` above the CTA; Invested swaps the CTA for `عرض استثماري`; Closed hides the CTA and shows the outcome.

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Hero | `Base card` (page 07l HeaderCard) `Platform=Mobile` `State=Expanded` `Direction=RTL`, `Has Subtitle` (developer name), `Has Lable`, `Has meta`, `Has developer` all true. Photo carousel with page counter, back, share, favourite overlays | Full bleed, no side padding. Not published: in another Figma file, copy it from the Syntropy file |
| 2 | Eligibility / tier badge | `dealTags` inside the hero: `Type=Type7` (qualified only: «فرصة حصرية للمؤهلين») and at most one tier (`Premium` / `Basic`). On light surfaces use `Type=pros` | Max two tags. Show the qualified tag only to qualified investors |
| 3 | Status | `IssuanceStatusBadge (Investor)` `Status=` the live lifecycle state (`Fully Funded`, `Reserved`, `Active`, `Completed`) `Direction=RTL` | Locked copy and palette. Never a free `StatusPill` for lifecycle |
| 4 | Headline numbers | Row of 2-3 `Stat` `Size=md` `Layout=vertical` `HasDelta=false`: «نسبة العائد المتوقع» `8.5%`, «مدة الاستثمار» `12 شهر`, «الحد الأدنى» `1,000 ر.س`. One `Stat` may be `Size=lg` if it is the focal metric | Padding `space/lg`, gap `space/md`. `HasDelta=false` always (no prior period) |
| 5 | Funding progress | `ProgressBar` `Size=md` `Tone=brand` `showLabel` true, Label «نسبة التمويل», Value `72%` `Direction=RTL` | Fills from the right. Live value only |
| 6 | Facts | `Section` `Size=Md` «تفاصيل الصفقة», then a column of `KeyValue` `Layout=horizontal` `Size=md` `Emphasis=default` separated by `Divider` `Tone=subtle`. One row `Emphasis=strong` (the profit rate). Info icon (`HasIcon=true`) only where a `Tooltip` explains the value; copy icon on the deal reference | Container `bg/elevated`, `border/subtle`, `radius/lg`, inner padding `space/lg` |
| 7 | Calculator (optional) | Qualified: `Calculator / Duration picker`, `Calculator / Amount card` `Distributions=Closed`, `Calculator / Results card` `Indicators=Closed`. Retail: `Investment-amount` `User=Regular` | Values labelled «متوقع». Opens `invest-and-reserve.md` with the amount prefilled |
| 8 | Distributions | `Distribution-schedule` `Property 1=Less-list` (or `No-Schedule` for end-of-term payout) | Dates as `متوقع ~7 يناير 2027` (maturity + 15 days) |
| 9 | Lifecycle | `Section` `Size=Md` «مراحل الصفقة» + `DealTimeline` `Direction=RTL` | Exactly one stage active; amounts only on money moments |
| 10 | Guarantees | `Section` `Size=Md` «الضمانات» + `Guarantees` `Coverage=` real level `Direction=RTL`; below it a `List` `Style=Bulleted` naming all three guarantees (land pledge, company PN, personal PNs) | Never show the bar without its axis and title |
| 11 | Developer | `CardInfo` `Type=Avatar` `Tone=Neutral` (developer name, years, link to profile) | One card, whole card taps through |
| 12 | Updates | `NewsCard / Poster Carousel` `Direction=RTL` (or `NewsCard` `Style=Plain` list) | Only if updates exist; hide the region otherwise |
| 13 | Compliance | `ShariaDisclosure` `Direction=RTL` then a row of `ComplianceBadge` `Type=Shariah` and `Type=CMA` | Gap `space/2xl` above. «إعرف أكثر» opens the real document |
| 14 | FAQ (optional) | `Accordion` `Style=Plain` with `AccordionItem` `State=Collapsed` | Max 5 items |
| 15 | Risk line | `Alert` `Tone=neutral` `Style=Plain` with the risk statement | Above the footer, never hidden |
| 16 | Sticky footer | `Button` `Variant=primary` `Size=lg` full width «استثمر الآن». Reserved: `Collapsed-Reservation` `Direction=RTL` above it | `bg/base`, padding `space/lg` + safe area, `Scroll shadow` `Position=bottom` |

Web: same order, `Base card` `Platform=Web`; facts and calculator can sit in two columns (content 8 cols, calculator 4 cols, sticky) inside the 1200px container. Never a separate desktop design.

## Required states

| State | What changes |
|---|---|
| Loading | `SkeletonBlock` `Radius=None` for the hero (same height), `SkeletonLine` `Size=Large` `Width=3Q` for the title, three `SkeletonBlock` `Radius=Medium` for the `Stat` row, 5 `SkeletonLine` rows for facts. CTA hidden |
| Empty | Not applicable to the page. Empty regions (no updates, no distributions yet) are removed, not shown empty. Deal not found or unpublished: full `EmptyState` `Tone=default` «هذه الصفقة لم تعد متاحة» with `Button` «تصفح الصفقات» |
| Error | Load failed: `EmptyState` `Tone=error` `Size=Default` «تعذر تحميل الصفقة» + `Button` «إعادة المحاولة». Partial failure (calculator only): `Alert` `Tone=warning` `Style=Outlined` inside that region |
| Success | Returning after investing: one `Toast` `Tone=success` naming the deal and amount; status badge becomes `Confirmed`/`Reserved` |
| Disabled | Fully funded or closed: CTA becomes `Button` `State=disabled` with label «اكتمل التمويل», or is replaced by a `Variant=secondary` «نبهني بصفقات مشابهة». Qualified-only deal for a retail user: CTA disabled + one `Form Field Helper` `Tone=info` line «متاحة للمستثمرين المؤهلين» with a `Link` to the qualification route |

## Copy
| Slot | Arabic | English |
|---|---|---|
| CTA | «استثمر الآن» | "Invest now" |
| Return label | «نسبة العائد المتوقع» | "Expected return" |
| Term | «مدة الاستثمار» | "Term" |
| Minimum | «الحد الأدنى للاستثمار» `1,000 ر.س` | "Minimum investment" `1,000 SAR` |
| Payout date | «متوقع ~7 يناير 2027» | "Expected ~7 January 2027" |
| Closed | «مغلقة بنجاح» | "Closed successfully" |
| Risk line | «الاستثمار ينطوي على مخاطر، وقد تخسر جزءاً من رأس المال.» | "Investing carries risk; you may lose part of your capital." |

## Compliance notes
- Returns are expected («متوقع»), never guaranteed, and never rounded up: show the exact rate with one decimal. Confirm with Compliance.
- `ShariaDisclosure` and `ComplianceBadge` are legal claims: exact wording from Legal/Sharia, each «إعرف أكثر» wired to the real approval or licence. Never mock a seal.
- Fees: net return is the headline; state that the platform fee (with VAT) is taken from profit and show net next to gross before the CTA. Confirm wording with Compliance.
- Qualified-only deals: hide the qualified badge and qualified terms from retail users; do not market qualified-only deals to retail.
- Never say «مناسبة لك» / "recommended for you" (CMA). Use behavioural wording («لأنها تشبه استثمارك في ...»).
- Use «الربح» not «فائدة»; «المطور العقاري» not «المقترض»; list the three guarantees, never «ضمانات» alone.

## Accessibility notes
- Hero overlay buttons (back, share, favourite) need 48x48 hit areas and labels («رجوع», «مشاركة», «حفظ»). The photo carousel announces «صورة 1 من 5».
- Read `Stat` as one phrase: label then value («نسبة العائد المتوقع، 8.5 بالمئة»). Decorative icons hidden.
- `Guarantees` bar and `ProgressBar` need a text alternative with the number. `DealTimeline` reads each stage with its state («مكتملة», «جارية», «قادمة»).
- Sticky footer must not cover focused content; scroll the focused element above it.
- Brand green text (amounts, links, selected labels) uses `text/brand/primary` as built; never body paragraphs in green.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Fundrise | Facts grouped under plain headings, risk language near the CTA |
| Arrived | Property hero then numbers then timeline; one invest button that stays reachable |
| Manafa / Sukuk (Saudi) | Arabic term sheets with expected return, term and guarantee summary up front |
| CrowdStreet | Sponsor (developer) block as its own card with track record |

## Anti-patterns
- Six `Stat` tiles in a grid. Use 2-3 `Stat`, the rest `KeyValue`.
- A countdown or a scarcity count without a real deadline or live number.
- Compliance text at 9px at the very bottom after the footer.
- A different desktop layout (breadcrumbs, ghost buttons) instead of `Base card` `Platform=Web`.
- Showing the CTA as enabled for a deal the user cannot invest in.
- Lifecycle shown with a `StatusPill` instead of `IssuanceStatusBadge (Investor)`.
- `DealTimeline` with two active stages or amounts on every row.


---

# Pattern: empty-states

# Empty states

What a region shows after it has loaded and has nothing to display, by context: first use, no results, error, and the Safqah-specific "no open deals" wait. Read this before showing any zero-item list, tab, sheet or chart.

## Job of the screen
Explain in one line why the area is empty and give exactly one useful next step, so emptiness reads as an intentional state, never as a broken app.

## When to use
- After a load completes with zero items. During loading use `SkeletonLine` / `SkeletonBlock`; for transient feedback use `Toast`; for inline field problems use `Form Field Helper`.
- The three types, picked by cause:

| Type | Cause | `EmptyState` `Tone` | Primary action |
|---|---|---|---|
| First use | The user has not created or received anything yet | `default` | Start the first thing («تصفح الصفقات») |
| No results | A search or filter matched nothing | `search` | Broaden («مسح الفلاتر») |
| Error | Loading failed, no fallback content | `error` | Retry («إعادة المحاولة»), optional link «تواصل معنا» |
| Waiting (Safqah supply) | Nothing is available yet by design (no open deals) | `default` | Get notified («أنشئ تنبيهاً») |

## Flow steps
1. Region requests data; skeleton after 200ms.
2. Data returns empty: decide the type from the cause, not from looks.
3. Render `EmptyState` sized to the region.
4. The user takes the action: the empty state is replaced by content (it is never dismissed or closed).

## Layout recipe

| Slot | Component + key props | Tokens and notes |
|---|---|---|
| Container | The region itself (tab body, card, sheet content). Full-area: centred vertically. Inside a card or sheet: top-aligned with padding `space/2xl` | Same surface as the region |
| Empty state | `EmptyState` `Tone=default/search/error` `Size=Default` (fills a tab or page) or `Size=Compact` (inside a card, sheet, sidebar, or below filters) `Direction=RTL`; `showDescription=true`; `showButton=true` almost always; `showLink=true` only for a secondary help link | Title one short sentence; description one sentence |
| Illustration | Default per tone (`Empty Illustration / default / Default`, `/ search /`, `/ error /`, Compact twins), or swap to an `Illustrations` concept that fits the domain (table below) | Restrained, flat, no mascots |
| In a sheet | `Sheet Content / Empty` inside `BottomSheet` | |
| In a chart | `Chart / States` `State=empty` `Direction=RTL` | Keep the axes off; one line of text |
| In search | `Search Dropdown` `State=empty`; `Combobox Menu` `State="No results"` | Never a blank white box |

### Context table (Safqah)

| Context | Type | Size | Illustration (`Illustrations` `Property 1=`) | Arabic title / description | Action |
|---|---|---|---|---|---|
| Deals tab, no open deals | Waiting | `Compact` (other Deals regions stay visible) | `Scheduled` | «لا توجد صفقات مفتوحة حالياً» / «سنخبرك عند توفر صفقة جديدة.» | «أنشئ تنبيهاً» |
| Deals filtered to zero | No results | `Compact` | default search illustration | «لا توجد صفقات بهذه الفلاتر» | «مسح الفلاتر» |
| Portfolio, never invested | First use | `Default` | `Start` | «لم تستثمر بعد» / «ابدأ من 1,000 ر.س.» | «تصفح الصفقات» |
| Completed investments tab | First use | `Compact` | `Matured` | «لا توجد استثمارات مكتملة بعد» | none |
| Payouts list | First use | `Default` | `Scheduled` | «لا توجد توزيعات بعد» | «تصفح الصفقات» |
| Wallet activity | First use | `Compact` | `Bank` | «لا توجد عمليات بعد» | «إيداع» |
| Notifications inbox | First use | `Compact` | `Info` | «لا توجد إشعارات» | none |
| Saved deals | First use | `Compact` | `Hearts - Favorite` | «لم تحفظ أي صفقة بعد» | «تصفح الصفقات» |
| Search | No results | `Compact` | default search | «لا توجد نتائج لـ "الرياض"» | «مسح البحث» |
| Back-office table | No results | `Compact` | default search | «لا توجد سجلات تطابق الفلاتر» | «مسح الفلاتر» |
| Any region failed to load | Error | Region size | default error | «تعذر تحميل البيانات» | «إعادة المحاولة» |
| Offline | Error | `Default` | `Web - Globe` | «لا يوجد اتصال بالإنترنت» | «إعادة المحاولة» |
| Account under review | Waiting | `Compact` | `Data info alert` | «طلبك قيد المراجعة» | «تصفح الصفقات» |

## Required states
- **Loading**: never an empty state; use skeletons matching the real content.
- **Empty**: the table above.
- **Error**: `Tone=error` with retry; after a failed retry keep the same state and add `showLink` «تواصل معنا».
- **Success**: the action replaces the empty state with content; optionally one `Toast` `Tone=success` when the action created something (alert, goal).
- **Disabled**: if the action is unavailable (KYC incomplete), the button routes to the blocker («أكمل توثيق حسابك») instead of being disabled with no explanation.

## Copy rules
- Title: what the state is, one short sentence, no "Sorry", no "Oops".
- Description: what happens next or what to do, one sentence (5-20 words total).
- Name the thing («لا توجد توزيعات بعد», not «لا توجد بيانات»).
- Waiting states are neutral, not apologetic and not urgent.

| Do | Don't |
|---|---|
| «لا توجد صفقات مفتوحة حالياً. سنخبرك عند توفر صفقة جديدة.» | «عذراً! لا يوجد شيء هنا 😢» |
| «لا توجد صفقات بهذه الفلاتر» + «مسح الفلاتر» | The supply message after a filter |
| «تعذر تحميل الصفقات» + «إعادة المحاولة» | «حدث خطأ» with no action |

## Compliance notes
- An empty Deals tab must not use pressure wording or promise the next deal date without a real estimate. Confirm pre-launch disclosure with Compliance.
- First-use copy can state a concrete fact («يبدأ الاستثمار من 1,000 ر.س») but no return claims.

## Accessibility notes
- Illustrations are decorative (hidden from screen readers); the title is the accessible name of the region.
- Move focus to the empty-state title only when it replaces content the user was interacting with (after filtering); otherwise leave focus.
- Buttons meet the 48x48 target; title colour passes 4.5:1 per tone.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Arrived | Sold-out and waitlist states that read as demand, not failure |
| Monzo | One-line first-use states with a single action |
| Fundrise | Calm "nothing yet" portfolio with a clear first step |
| GOV.UK Design System | "No results" patterns that tell the user how to broaden |

## Anti-patterns
- Skeletons that never resolve because there is no data (empty is after load).
- One generic empty message for every cause.
- A dismiss (x) on an empty state.
- Two buttons of equal weight, or no action at all on a first-use state.
- An empty tab with only an illustration and no text.


---

# Pattern: errors-and-recovery

# Errors and recovery

How Safqah tells users something went wrong and how they continue: inline field errors, the choice between Alert, Banner, Toast and Dialog, network and offline, payment failure, and retry. Read this before writing any error state or choosing a feedback component.

## Job of the screen
Say what happened in plain words, keep everything the user already entered, and put the next action within one tap. Errors explain what to do, not what broke (T5).

## When to use
Any time an action or load fails, input is invalid, the device is offline, or a step is blocked. For "nothing to show" use `empty-states.md`.

## Choosing the component

| Situation | Component | Props | Why |
|---|---|---|---|
| One field is invalid | `Input` / `Input Amount` / `Select` `State=error` with helper text, or `Form Field` `State=error` (`Form Field Helper` `Tone=error`) | Helper names the fix | The error sits where the fix is |
| Several fields invalid after submit | Field errors as above + one `Alert` `Tone=error` `Style=Filled` at the top of the form («يوجد حقلان يحتاجان تعديلاً») | Focus moves to the first invalid field | Summary + location |
| A section of the screen failed (calculator, schedule) | `Alert` `Tone=warning` `Style=Outlined` or `Style=Plain` inside that section, `showButton` «إعادة المحاولة» | Rest of screen stays usable | Partial failure is not a page failure |
| Account-level or page-level issue that persists (KYC action needed, payment method failed, maintenance) | `Banner` `Tone=warning` / `error` / `neutral` `Style=Filled` at the top, `showButton` for the fix; `showClose=false` if it must persist | One banner per screen | Highest-attention persistent message |
| A background action failed and the user can ignore it | `Toast` `Tone=error` `Size=Small` | No actions in Toast | Transient, non-blocking |
| Connection lost / restored | `Toast` `Tone=warning` `Size=Small` «لا يوجد اتصال» / `Tone=info` «عاد الاتصال» | | Status change, not a task |
| Whole region failed to load | `EmptyState` `Tone=error` with retry | | The error is the content |
| Irreversible or financially significant confirmation | `Dialog` `Tone=destructive` (or `default`) `Size=sm` | Confirm label names the action | Strongest interruption; use sparingly |
| Step in a flow failed validation | `StepIndicator` `State=error` in the `Stepper` + inline errors | Block advancing | Shows where the problem is |
| Upload failed | `File Item with Progress` `State=error` with inline «إعادة المحاولة» | File kept | Contextual recovery |
| OTP wrong / expired | `OTP Input` `State=error` (digits kept) / `State=disabled` + resend | | |
| Submit button while the form is invalid | `Button` `Variant=error` (not `destructive`) or keep `Variant=primary` enabled and validate on tap | | "Something is wrong", not "this is dangerous" |

Never invent a success or warning `Dialog` tone; never put an action in a `Toast`.

## Validation timing
1. Validate a field on blur (when the user leaves it), not on every keystroke.
2. Once a field shows an error, re-validate on each keystroke so the error clears as soon as it is fixed.
3. Validate everything on submit; scroll and focus to the first error.
4. Format-only help (multiples of 1,000, starts with 05) is shown as the helper before any error.
5. Server errors map back to the field when possible; otherwise an `Alert` at the top.

## Flow steps: generic action failure
1. User taps the primary action: `Button` `State=loading`, inputs `State=disabled`.
2. Failure returns: button back to default, inputs re-enabled, values kept.
3. Show the error in the right component (table above) with one recovery action.
4. Retry repeats the same request (idempotent on the server for payments).
5. After a second failure, add a secondary route («تواصل معنا» `Link`).

## Payment failure (money moved or not)
| Outcome known? | Component | Copy |
|---|---|---|
| Declined, nothing charged | `Alert` `Tone=error` `Style=Filled` on the review sheet + `showButton` «إعادة المحاولة» | «لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ.» |
| Unknown (timeout) | `Alert` `Tone=warning` + polling spinner; retry hidden until resolved | «نتحقق من حالة الدفع. لا تكرر العملية.» |
| Charged but investment failed | `Banner` `Tone=error` on the wallet with what happens to the money | «تم إرجاع 5,000.00 ر.س إلى محفظتك» |

## Network and offline
| State | Treatment |
|---|---|
| Offline on load | Full-area `EmptyState` `Tone=error` with `Illustrations` `Web - Globe` and «إعادة المحاولة»; cached content shown if available with a `Banner` `Tone=neutral` «تعرض آخر بيانات محفوظة» |
| Offline mid-session | `Toast` `Tone=warning` `Size=Small` once; disable money actions (`Button` `State=disabled`) with a helper line |
| Back online | `Toast` `Tone=info` `Size=Small`; refresh stale regions silently |
| Pull to refresh fails | `Pull-to-refresh` returns to `idle`, `Toast` `Tone=error` `Size=Small` |
| Slow (over 10 s) | Keep the spinner and add one line «قد يستغرق ذلك وقتاً أطول» |

## Required states
- **Loading**: in-button loading for actions; skeletons for regions; never both.
- **Empty**: see `empty-states.md`.
- **Error**: the table above.
- **Success after recovery**: the normal success state; optionally `Toast` `Tone=success`.
- **Disabled**: actions that cannot work right now are disabled with one line saying why and how to unblock.

## Copy
| Situation | Arabic | English |
|---|---|---|
| Phone format | «رقم الجوال يجب أن يبدأ بـ 05» | "Mobile number must start with 05" |
| Amount | «المبلغ يجب أن يكون من مضاعفات 1,000» | "Amount must be a multiple of 1,000" |
| Load failed | «تعذر تحميل البيانات» / «إعادة المحاولة» | "Couldn't load this" / "Try again" |
| Offline | «لا يوجد اتصال بالإنترنت» | "No internet connection" |
| Locked | «تم إيقاف المحاولات مؤقتاً. حاول بعد 30 دقيقة.» | "Too many attempts. Try again in 30 minutes." |
| Generic server | «حدث خلل من جهتنا. حاول مرة أخرى.» | "Something went wrong on our side. Try again." |

Rules: no error codes in the title (put a reference in a `KeyValue` with copy icon if support needs it); no blame («أدخلت قيمة خاطئة»); no «خطأ:» prefix; warnings in warning tone, red only for real failures and defaulted states.

## Compliance notes
- When money is involved, say whether money moved and where it is now. Confirm wording with Compliance.
- Risk-check or AML holds use neutral "under review" wording and never reveal the reason. Confirm with Compliance.
- Do not use errors to push upsell or alternative products.

## Accessibility notes
- Field errors are linked to the field (`aria-describedby` / Flutter `errorText`) and announced; colour plus icon plus text.
- `Alert` and `Banner` errors are announced as alerts once; `Toast` politely.
- Focus moves to the first invalid field on submit, to the `Alert` for page-level errors.
- `Dialog` traps focus and returns it to the trigger; the confirm label names the action («سحب»), never «نعم».

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| GOV.UK Design System | Error summary at the top plus inline messages linked to fields |
| Wise | Payment failures that state whether money left the account |
| Monzo | Offline and degraded states that keep cached data visible |
| Baymard Institute | Inline validation timing research for forms |

## Anti-patterns
- Clearing the form or the amount after an error.
- A toast for a blocking error, or a dialog for a trivial one.
- Red for warnings (late payment, incomplete profile).
- "Error 500" or raw server text shown to users.
- Validating on every keystroke from the first character.
- Several banners stacked at the top.


---

# Pattern: forms

# Forms

How Safqah collects structured data: picking the right control, laying out labels and hints, validation timing, and Arabic labels. Read this before building any form (KYC steps, profile edit, bank details, filters, back-office forms).

## Job of the screen
Collect correct data on the first try with the least effort: the right control for each answer, one short hint where needed, and errors that point to the fix.

## When to use
Any screen with input. For amount entry see `invest-and-reserve.md`; for phone and OTP see `onboarding-and-sign-in.md`; for settings toggles see `notifications-and-permissions.md`.

## Choosing the control

| Answer type | Component | Key props | Not this |
|---|---|---|---|
| Free text (name, address, employer) | `Input` (bordered) | `Size=lg` (app), `Show Label=true`, `Label text`, `Show Helper` only when needed | `Select` |
| Long text (notes, reason) | `TextArea` | `Show Counter=true` when there is a limit | `Input` |
| Phone number | `Input Phone` | Country code `+966` | Plain `Input` |
| Money | `Input Amount` | `Size=lg` for the main amount | `Input` with "SAR" typed in |
| Fixed steps (quantity) | `NumericStepper` (or `Amount Stepper` with `Show Actions=true`) | `NumericStepper` `State=AtMin` / `State=AtMax` at bounds | Free typing |
| One of 2-5 options, all visible | `Radio Group` (with `Radio`) or `SelectionList` `Mode=Single` with `SelectRow` `Type=Radio` | | `Select` (hides options) |
| One of 2-4 options that switch a view | `SegmentedControl_2/_3/_4` | `Size=md` or `lg` | `Radio Group` |
| One of many, closed list (6-15) | `Select` + `Dropdown Menu` (`Dropdown Item`) | | `Combobox Field` |
| One of a long list (banks, cities, sectors, countries) | `Combobox Field` + `Combobox Menu` (`State=Results/No results`) | `allowFreeText` off for controlled lists | Scrolling `Select` |
| Several independent options | `Checkbox Group` (with `Checkbox`) or `SelectionList` `Mode=Multi` | Parent `State=indeterminate` for partial | `Switch` |
| Several values in a compact field (back-office) | `Multi-select field` `Value-display=chips/count` | | |
| Yes/no that applies on submit (consent, declaration) | `Checkbox` `Size=lg` | Unchecked by default | `Switch` |
| On/off that applies instantly | `Switch` in a `ListItem` | | `Checkbox` |
| Date (birth date, ID expiry) | `Date Input` → `Date Wheel Picker` `Mode=single-date` (mobile, in `BottomSheet`) / `Date Calendar Picker` `Mode=single` (web) | | Typed date with a format mask |
| Date range (filters) | `Date Range Field` | Each side opens its own picker | Two-month popover |
| Region | `ProvinceSelector` `Selection=Single/Multi` with `RegionChip` | | `Select` of 13 regions |
| File | `Upload Button` → `File Item with Progress` | Formats hint shown | |
| Search a list | `Search Input` + `Search Dropdown` | | |

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` with the form title | |
| 2 | Step progress (multi-step only) | `Stepper` `Orientation=horizontal` (3-5 steps) | Step 1 on the right |
| 3 | Group title | `Section` `Size=Md`, optional `Has description` (one line) | Gap `space/2xl` between groups |
| 4 | Fields | `Form Field` `Size=lg` `State=default` wrapping the control (label above, helper below), or the control's own label (`Input` `Show Label=true`). `Form Field Label` `Required=true` only when most fields are optional; `Tooltip=true` for regulatory definitions | Gap `space/lg` between fields; label to field `space/xs` (built in) |
| 5 | Form-level message | One `Alert` `Tone=error` (after submit) or `Tone=info` (rule) | Top of the form, under the title |
| 6 | Footer | `Button` `Variant=primary` `Size=lg` «حفظ» / «متابعة»; cancel as `Variant=secondary` or `text`, same size | Sticky with safe area; above the keyboard |

One field style per form: bordered `Input` family, or `Input Underline` / `Select Underline` for sign-in and dense settings. Never mix.

Conditional fields (UBO identity appears when «لا» is chosen): reveal directly under the triggering question; keep the value if hidden and re-shown.

## Validation timing
1. Show format hints before errors (helper text, `Tone=neutral`).
2. Validate on blur; once in error, re-validate on input so it clears immediately.
3. On submit, validate all, show the summary `Alert`, focus the first error.
4. Success helper (`Form Field Helper` `Tone=success`) only where confirmation matters (IBAN recognised: «بنك الراجحي»), not on every field.
5. Disabled submit is allowed only when the reason is visible (a required consent unchecked); otherwise keep the button enabled and validate on tap.

## Required states

| State | Treatment |
|---|---|
| Loading | Edit forms: field-shaped `SkeletonBlock` `Radius=Small` rows with `SkeletonLine` labels. Submitting: `Button` `State=loading`, fields `State=disabled` |
| Empty | Placeholders in `text/subtle` are examples only («مثال: شركة أرامكو»), never the label |
| Error | Field `State=error` + helper with the fix; `Dropdown Item` / `Combobox Menu` `State="No results"` for no matches |
| Success | Saved: `Toast` `Tone=success` «تم حفظ التغييرات» and return, or inline `Form Field Helper` `Tone=success` for a single field |
| Disabled | Government-sourced or locked fields `State=disabled` with value visible and one hint where to change it |

## Arabic labels and copy
- Labels are nouns, 1-3 words: «الاسم الكامل», «جهة العمل», «مدة الخدمة لدى جهة العمل», «فرع البنك».
- Optional fields say so in the label: «رقم جوال بديل (اختياري)».
- Helper: one sentence, 8-15 words, what to enter and why.
- Months in full Arabic names (يناير ... ديسمبر); picker apply button «تطبيق».
- Latin identifiers stay Latin (PDF, IBAN prefix SA).

| Field | Arabic label | English label | Helper (Arabic) |
|---|---|---|---|
| IBAN | «رقم الآيبان» | "IBAN" | «يبدأ بـ SA ويتكون من 24 خانة» |
| Income | «الدخل الشهري» | "Monthly income" | none (use range options) |
| Employer | «جهة العمل» | "Employer" | none |
| Board member | «عضو مجلس إدارة في شركة مدرجة» | "Board member of a listed company" | none (Radio yes/no) |

## Compliance notes
- KYC and suitability fields are regulated (CMA): keep every required field, use the approved option sets, never pre-select an answer. Confirm with Compliance.
- Consent and declarations: `Checkbox` unchecked, linked documents, one consent per purpose (PDPL). Confirm with Compliance.
- Collect only what the step needs; say why sensitive data is collected in one helper line.

## Accessibility notes
- Every control has a visible label (not placeholder-only); `Input` `Size=sm` and `Select` `Size=sm` are web/back-office only (below 48dp).
- Required state is conveyed in text, not only an asterisk colour.
- Errors are announced and linked to their field; focus order follows reading order (right to left in Arabic).
- `border/strong` field edges are under 3:1 in Light: keep the label above and the filled field shape (do not rely on the border alone).

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| GOV.UK Design System | One question per page for complex forms; error summary pattern |
| DGA Platforms Code (Saudi) | Arabic form labels, RTL field order and government-data prefill |
| Wise | Bank-details forms that recognise the bank from the IBAN |
| Baymard Institute | Inline validation and optional-field labelling research |

## Anti-patterns
- `Select` for two options; `Combobox Field` for three.
- `Switch` inside a form that has a submit button.
- Placeholder as label; helper, description and tooltip stacked on one field.
- Errors only as a toast.
- Pre-ticked consent or pre-selected suitability answers.
- Typed date fields with DD/MM/YYYY masks.


---

# Pattern: goals

# Goals

Setting an investment goal (an amount to put to work by a date) and tracking progress with milestones. Read this before building goal setup, the goal tracker card, or the goal hub.

## Job of the screen
Help a retail investor commit to a concrete plan (how much, by when, optionally what for) and see honest progress toward it, measured in money actually invested, never in projected returns.

## When to use
- Goal entry from the Deals or Portfolio header and from the goal hub («رحلتي»).
- Scope today: retail investors only. Qualified investors are served by relationship managers and see no goal entry. Confirm scope with Product before extending.
- Status: the CardGoal (07b) and GoalTracker (08f) pages are `wip` in the manifest. Use the 07b organisms (`GoalActivate`, `GoalTracker`); do not use the legacy 08f sets (`Goal-Card`, `GoalCard`, `Goal card`, `GoalPlan`, `GoalChart`) in new work.

## Flow steps
1. **No goal**: `GoalActivate` `Phase=Begining` invites setup.
2. **Setup** (at most three questions, one per screen): duration («شهري» · «سنوي» · «سنتين» · «5 سنوات»), amount for that duration, optional purpose (house, car, marriage, education, other).
3. **Plan preview**: the amount split into a monthly plan in whole thousands (for example 100,000 a year = 9,000 × 4 months + 8,000 × 8 months), with a monthly reminder offer.
4. **Setup unfinished**: `GoalActivate` `Phase=Started` shows progress through setup.
5. **Active goal**: `GoalTracker` `State=Early` → `Active` → `Complete` → `Overachieved`, phase rows per milestone, nearest milestone first.
6. **Month end**: reminder of the month's plan (real, not guilt-driven).
7. **Goal reached**: plain confirmation and «ابدأ هدفاً جديداً».

## Layout recipe: goal card on a hub or portfolio (RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Region title | `Section` `Size=Md` «هدفي الاستثماري» `Has action` «التفاصيل» | Gap `space/2xl` above |
| 2 | Before a goal | `GoalActivate` `Phase=Begining` `Direction=RTL` (headline, illustration, `Button`) | One CTA |
| 3 | Setup started | `GoalActivate` `Phase=Started` | Shows setup progress |
| 4 | Informational | `GoalActivate` `Phase=Static` | No CTA |
| 5 | Active | `GoalTracker` `State=Active` `Direction=RTL`: `Goal / Headline`, `Goal / Amount` (`Size=lg` `Tone=Brand`) invested so far, `Goal / Summary`, `Goal / PhaseRow` per milestone (`Percent="0%"` / `50%` / `100%` / `+100%`) | Card `bg/elevated`, `radius/lg`, padding `space/lg` |

## Layout recipe: setup step (RTL)

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Close Icon-Black"`, title «هدفك الاستثماري» | |
| 2 | Progress | `ProgressBar` `Size=sm` `Tone=brand` (step 1 of 3) or `Stepper` `Orientation=horizontal` | Fills from the right |
| 3 | Question | heading/22/bold, one line | |
| 4 | Control | Duration: `SelectionList` `Mode=Single` of `SelectRow` `Type=Radio`, or `SegmentedControl_4` `Size=lg`. Amount: `Input Amount` `Size=lg` with helper «بمضاعفات 1,000 ر.س». Purpose: `ActionTile` `Style=Vertical` grid (`State=Selected` on choice) with `Illustrations` icons; «أخرى» opens an icon picker | Optional step has «تخطي» as `Button` `Variant=text` |
| 5 | Plan preview | `List` `Style=Description` with `List / DescriptionRow` rows («9,000 ر.س شهرياً · 4 أشهر», «8,000 ر.س شهرياً · 8 أشهر») and `Emphasis=Total` «100,000 ر.س» | Whole numbers (projection, not a transaction) |
| 6 | Reminder | `ListItem` `Has toggle=true` «ذكّرني شهرياً» (`Switch`) | Default off unless the user opted in to notifications |
| 7 | Footer | `Button` primary «حفظ الهدف» | |

## Required states

| State | Treatment |
|---|---|
| Loading | `SkeletonBlock` `Radius=Large` the size of the `GoalTracker` card |
| Empty | No goal: `GoalActivate` `Phase=Begining` (this is the empty state; do not add an `EmptyState`) |
| Error | Save failed: `Alert` `Tone=error` on the setup screen, answers kept. Card load failed: hide the region and show a `Toast` `Tone=warning` `Size=Small` only if the user opened it |
| Success | Goal saved: return to the hub with `GoalTracker` `State=Early` and a `Toast` `Tone=success` «تم حفظ هدفك». Goal reached: `GoalTracker` `State=Complete`, plain copy, no confetti |
| Disabled | Amount above the retail limit: `Input Amount` `State=error` with the limit; plan rows recalculated to the cap |

Never render `GoalTracker` with zero milestones; fall back to `GoalActivate`.

## Copy
| Slot | Arabic | English |
|---|---|---|
| Entry | «حدد هدفك الاستثماري» | "Set your investment goal" |
| Duration | «شهري» · «سنوي» · «سنتين» · «5 سنوات» | "Monthly" · "Yearly" · "2 years" · "5 years" |
| Progress | «استثمرت 40,000 من 100,000 ر.س» | "Invested 40,000 of 100,000 SAR" |
| Next deal line | «الصفقة القادمة متوقعة في نوفمبر» | "Next deal expected in November" |
| Reached | «حققت هدفك: 100,000 ر.س مستثمرة» | "Goal reached: 100,000 SAR invested" |

## Compliance notes
- A goal is money put to work by a date. Do not project returns into the goal or imply a guaranteed outcome. Confirm with Compliance.
- Achievements and streaks celebrate actions the user controls (investing on plan), never returns, and carry the required regulatory line on achievement surfaces (CMA). Confirm the exact line with Compliance.
- "Next deal" statements are always «متوقع» and come from a real ops estimate; omit them if no estimate exists.
- Salary-deduction or auto-reserve features are optional and removable if Compliance objects; never default them on.
- Retail investment limits cap plan amounts; state the cap in the helper.

## Accessibility notes
- `Goal / PhaseRow` keeps the percentage and status text on every row; green vs grey is never the only signal.
- Read the tracker as «استثمرت 40 بالمئة من هدفك، 40,000 من 100,000 ريال».
- Purpose tiles: one radio group, each tile labelled; illustrations decorative.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Acorns | Goal setup in three short questions with a clear monthly plan |
| Qapital | Goals framed around user actions, not market returns |
| Wahed | Sharia-compliant goal language without return promises |
| Drahim (Saudi) | Arabic personal-finance goals and reminders |

## Anti-patterns
- A tracker that shows projected wealth instead of invested money.
- Odd monthly amounts (1,500, 8,334) instead of whole thousands.
- Guilt copy («لا تخسر سلسلتك!») or celebration emojis on financial events.
- Showing the goal entry to qualified investors.
- Using legacy 08f goal sets in new screens.


---

# Pattern: invest-and-reserve

# Invest and reserve

The flow from «استثمر الآن» to a confirmed investment or reservation: amount entry, honest reservation hold, confirmation summary, success. Read this before building any amount-entry, checkout summary or reservation screen.

## Job of the screen
Let the investor commit an exact amount they understand (what they pay, what fees apply, what they expect back, when) and confirm it once, with no surprises after the button.

## When to use
- Investing from a deal page (retail and qualified).
- Reserving a deal: qualified early access, or a retail hold while a bank transfer arrives.
- Not for: wallet top-up or withdrawal (`wallet-and-cash-out.md`), payment method choice (`payment.md`).

## Product rules that shape the UI
- All investments are paid from the wallet. If the wallet is short, the flow offers a top-up for the gap, then returns here.
- Amounts are in multiples of 1,000 and at most 500,000 per payment today. These limits come from the backend at runtime; never hardcode them in the UI (the numbers in this file are current examples). State the rule before the user hits it.
- The deal's remaining capacity is a ceiling: clamp or explain, never let the CTA stay enabled above it.

## Flow steps
1. **Amount entry** (full screen or `BottomSheet`). States: Empty, Valid, Not multiple, Snap, Above cap, Above remaining, Wallet shortfall.
2. **Optional reservation**: when the deal opens later or payment is by transfer, the user reserves; the hold and its real expiry are shown.
3. **Review** (`BottomSheet` summary): amount, fees, expected net profit, expected payout date, consent.
4. **Processing**: `Button` `State=loading`; sheet stays, inputs disabled.
5. **Success**: confirmation screen naming the deal and amount; next step (view investment).
6. **Failure**: stay on review with an inline `Alert`; amount kept (see `errors-and-recovery.md`).
7. **Reservation expiry**: the timer reaches 00:00, copy says the reservation was released and offers «احجز مجدداً» if possible.

## Layout recipe: amount entry (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Close Icon-Black"` `Direction=RTL`, title «مبلغ الاستثمار» | `bg/base` |
| 2 | Wallet context | `WalletChip` `Direction=RTL` (wallet label + `MoneyAmount` `Size=sm`) or `Keypad / Title row` | Shows what is available before typing |
| 3 | Amount | Qualified / keypad: `Keypad / Amount input` `State=` live state `Direction=RTL` (contains `Keypad / Amount hero`). Retail form: `Input Amount` `Size=lg` `State=focus` `Show Label` true, Label «المبلغ», Helper «بمضاعفات 1,000 ر.س». Fixed steps: `Amount Stepper` `Show Actions=true` or `NumericStepper` | Amount is the hero; never `Size=sm` |
| 4 | One context block | Exactly one of: `Keypad / Summary card` `Type=Projection` (expected profit), `Keypad / Presets` (quick amounts as `Tag`), `Keypad / Hint` `Tone=Warning` with a fix `Button` `Variant=secondary` `Size=sm` («اجعلها 5,000») | Hint text explains; colour never alone |
| 5 | Keypad | `Sheet Content / Amount keypad` (product keypad inside) | Digits never mirror |
| 6 | Footer CTA | `Button` `Variant=primary` `Size=lg`: «استثمر 5,000 ر.س» when valid; «أودع 2,000 ر.س وأكمل» when the wallet is short; «استثمر الآن» `State=disabled` otherwise | Safe area below |

Inline variant on the deal page: `Calculator / Amount card` + `Calculator / Results card` (qualified) or `Investment-amount` `User=Regular` (retail), then the CTA opens step 3 with the amount prefilled.

## Layout recipe: reservation

| Slot | Component + key props | Notes |
|---|---|---|
| Hold summary | `BottomSheet` `showHandle` `showHeader` `showFooter`; `SheetHeader` title «تم حجز 50,000 ر.س»; content `Sheet Content / Summary` | Names the deal and amount |
| Deadline | `Countdown` `Has Lable=true` `Direction=RTL` with a text line «ينتهي الحجز في 15 أكتوبر 2026، 18:00» | Always show the absolute time next to the timer |
| Persistent reminder | `Collapsed-Reservation` `Direction=RTL` (sticky on the deal page and portfolio); `Has Multi-deals ?` for several holds | Tap opens the hold |
| Inline chip | `Small Timer` `Property 1=Black` normally; `Yellow` in the last 24 hours | Never red unless the hold has failed |
| Transfer details (retail hold) | `KeyValue` rows with copy icon for IBAN and reference (see `payment.md`) | |

## Layout recipe: review sheet

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Shell | `BottomSheet` `showHandle=true` `showHeader=true` `showFooter=true` `Direction=RTL` over `bg/overlay` | One sheet at a time |
| 2 | Header | `SheetHeader` `showSubtitle=true` `showClose=true`: title «مراجعة الاستثمار», subtitle = deal name | |
| 3 | Summary | `Sheet Content / Summary`: `KeyValue` rows «المبلغ» `5,000.00 ر.س`, «رسوم المنصة» «تُخصم من الربح», «صافي الربح المتوقع» `612.50 ر.س`, «نسبة صافي العائد المتوقع» `12.3%`, «موعد السداد المتوقع» «متوقع ~7 يناير 2027», then `Divider`, then `List / DescriptionRow` `Emphasis=Total` «المبلغ المخصوم من المحفظة» `5,000.00 ر.س` | Transactional amounts with two decimals |
| 4 | Compliance | `ComplianceBadge` `Type=Shariah` (compact) + separate unticked `Checkbox` `Size=lg` rows, one per acknowledgement: «اطلعت على نشرة الإصدار» (with a `Link`), «أوافق على الشروط والأحكام» (with a `Link`), «أفهم مخاطر الاستثمار» | Each checkbox unchecked by default; never bundle acknowledgements into one (see syntropy-compliance-ux) |
| 5 | Footer | `SheetFooter` `Layout=Stacked` `showSecondary=true`: primary «تأكيد الاستثمار», secondary «تعديل المبلغ» | Primary disabled until consent |

Success screen: `AppBar` `Type="Close Icon-Black"`; `Illustrations` `Property 1=Chosen checkmark`; title heading/22/bold «تم استثمار 5,000.00 ر.س في الحجاز ريفيرا»; `KeyValue` rows (reference with copy icon, expected payout date); `Button` primary «عرض استثماري», `Button` `Variant=text` «العودة للصفقات». No confetti, no emoji.

## Required states

| State | Treatment |
|---|---|
| Loading | Opening the sheet: `SkeletonLine` rows in the summary while fees compute. Submitting: `Button` `State=loading`, `Input Amount` `State=disabled` |
| Empty | Amount empty: `Keypad / Amount input` `State=Empty`, CTA disabled; hint shows the rule («بمضاعفات 1,000 ر.س، حتى 500,000 ر.س») |
| Error | Validation: `Input Amount` `State=error` + helper with the fix; keypad states `Not multiple`, `Above cap`, `Above remaining` with a fix button. Submit failed: `Alert` `Tone=error` `Style=Filled` in the sheet, amount kept, CTA «إعادة المحاولة» |
| Success | Success screen above; `Toast` only when returning to a screen that already shows the result |
| Disabled | Deal filled during entry: CTA disabled, `Alert` `Tone=warning` «اكتمل تمويل الصفقة»; amount locked after confirm: `Input Amount` `State=disabled` |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Rule hint | «بمضاعفات 1,000 ر.س، حتى 500,000 ر.س للدفعة» | "In multiples of 1,000 SAR, up to 500,000 SAR per payment" |
| Not multiple | «المبلغ يجب أن يكون من مضاعفات 1,000» | "Amount must be a multiple of 1,000" |
| Above remaining | «المتبقي لإكمال تمويل الصفقة 300,000 ر.س» | "300,000 SAR left to fully fund this deal" |
| Shortfall CTA | «أودع 2,000 ر.س وأكمل» | "Deposit 2,000 SAR and continue" |
| Reservation expiry | «انتهى الحجز وأُعيد المبلغ إلى الصفقة.» | "Your reservation ended and the amount was released." |

## Compliance notes
- Projected figures are labelled «متوقع» with the assumption (term, rate); never "guaranteed". Net return is the headline figure; show gross, the fee (with VAT) and that it is taken from profit before the confirm button.
- Consent checkbox must be unchecked by default and link the real prospectus and terms. Confirm wording with Compliance.
- Reservation: the timer counts the real hold; no artificial urgency, no "others are viewing". At expiry, say what happened to the hold. Reservation terms (refundability, transfer deadlines) confirm with Compliance.
- Qualified limits and the per-payment cap are stated up front, not discovered by failure.
- Use «نسبة» on percentage labels («نسبة صافي العائد المتوقع»), not on SAR amounts.

## Accessibility notes
- Announce keypad hint changes (live region) whenever the tone changes; warning colour always has text.
- `Countdown` is not read every second: expose the absolute end time and announce at 1 hour and 5 minutes left. Respect reduced motion (no flip animation).
- The review sheet traps focus, returns focus to the CTA on close; the close button is labelled.
- `Checkbox` `Size=lg` (24dp box plus label hit area).

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Wise | Review screen listing every amount and fee before one confirm button |
| Robinhood | Amount-first keypad entry with a live summary and a single state-driven CTA |
| Derayah / Sahm (Saudi) | Arabic order tickets with Western digits and currency after the amount |
| Revolut | Bottom confirmation sheet that names the amount and recipient |

## Anti-patterns
- Resetting the amount to 0 on a validation error.
- A toast that warns about the remaining capacity while the CTA stays enabled.
- A preset chip for an amount the user can never pay (above the cap).
- A countdown in red from the first second, or a timer that silently freezes at 00:00.
- Fees revealed only on the success screen.
- Two primary buttons in the review sheet.


---

# Pattern: kyc

# KYC (identity and suitability verification)

The verification journey every investor completes before investing: identity through Absher/Nafath, personal and financial details required by the CMA, bank account, documents, review, and recovery when something is rejected. Read this before building any KYC step, the KYC hub, or a document upload.

## Job of the screen
Get the investor verified with the fewest steps and no guessing: they always know what is done, what is next, what is blocking, and how to fix a rejection without starting over.

## When to use
- First-time verification after sign-up, re-verification (expired ID, periodic CMA refresh), and fixing a rejected item.
- The settings "investment profile" screen is the read/edit surface for the same data (see `settings-and-profile.md`).

## Flow steps
1. **Hub**: `KYCChecklist` shows every requirement and its state; the first incomplete task is the CTA.
2. **Identity** (Absher / Nafath): explain once, hand off, return verified. Data from Absher is prefilled and read-only.
3. **Personal and employment details**: one topic per screen (`KYCStep`), including CMA fields: employer, employer address and phone, length of service, alternative phone (optional), board membership of a listed company and relation to a board member, ultimate beneficial owner (UBO) declaration and, when the answer is no, the UBO identity.
4. **Financial profile and suitability**: income range, net worth, investment experience, objectives, risk tolerance (`Radio Group` / `SelectionList`).
5. **Bank account**: IBAN entry with the name-match rule shown before submit; bank branch.
6. **Documents** (only when needed: proof of qualification, IBAN certificate, extra ID): upload with progress.
7. **Review and submit**: summary with edit links per section; declaration checkbox.
8. **Under review**: status screen with expected time; push when done.
9. **Result**: approved (success, go invest) or action needed (rejection recovery jumps straight to the failing task, other tasks keep their state).

## Layout recipe: hub (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` `Direction=RTL`, title «توثيق الحساب» | |
| 2 | Progress | `ProgressBar` `Size=sm` `Tone=brand` `showLabel=true`, Label «اكتمل 3 من 5» `Direction=RTL` | Fills from the right |
| 3 | Action needed (only when rejected) | `Alert` `Tone=warning` `Style=Filled` `showButton=true` «مطلوب تحديث شهادة الآيبان» / button «تحديث» | One alert, the specific item |
| 4 | Checklist | `KYCChecklist` `Direction=RTL` with one `KYCTaskRow` per requirement: `State=Completed` (done), `State=Current` (next), `State=Upcoming` | Container `bg/elevated`, `radius/lg`, padding `space/lg` |
| 5 | Absher row | Inside the identity task, leading `AbshirLogo` `Size=24` `Tone=Brand` | Only on Absher/Nafath tasks |
| 6 | Footer | `Button` `Variant=primary` `Size=lg` «متابعة» (opens the current task) | |

`KYCTaskRow` has no rejected state: show a rejected task as `State=Current` with its embedded `StatusPill` `Tone=warning` label «مطلوب إجراء», plus the `Alert` above. Flag the missing state to the DS team.

## Layout recipe: one step

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` with back | Back keeps entered data |
| 2 | Progress | `Stepper` `Orientation=horizontal` `Direction=RTL` (3-5 steps; `StepIndicator` `State=completed/current/upcoming/error`) | Step 1 on the right |
| 3 | Title | `Section` `Size=Lg` with `Has description` (one line why) | |
| 4 | Fields | `Form Field` / `Input` / `Select` / `Combobox Field` / `Date Input` / `Radio Group` per `forms.md`; Absher-prefilled fields `State=disabled` with value shown | Gap `space/lg` between fields |
| 5 | Inline rule | Bank step: `Alert` `Tone=info` `Style=Outlined` «يجب أن يكون الحساب باسمك كما في الهوية» before the IBAN field | Before submit, never only after |
| 6 | Footer | `ButtonGroup` `Orientation=horizontal` or single primary «متابعة»; back as `Variant=secondary` same size | |

`KYCStep` (organism) is the ready composition of rows 2-6 for the IBAN step; use it as the model for the others.

## Layout recipe: documents

| Slot | Component + key props | Notes |
|---|---|---|
| Trigger | `Upload Button` `State=default` `Show hint=true` «تدعم الصيغ التالية (PDF, JPEG, JPG, PNG)» | Formats and size limit shown before picking |
| Uploading | `File Item with Progress` `State=progress` (cancel available) | |
| Done | `File Item with Progress` `State=uploaded` with «عرض الملف» | Persistent state; `complete` is transient |
| Failed | `File Item with Progress` `State=error` with «إعادة المحاولة» inline | Keep the file; no toast |
| Inline file in a form | `File Item` `State=ready/error/uploaded` | |

## Required states

| State | Treatment |
|---|---|
| Loading | Hub: 5 `KYCTaskRow`-shaped skeletons (`SkeletonCircle` `Size=S` + 2 `SkeletonLine`). Absher hand-off return: `SpinnerRing` `Size=M` + «جارٍ التحقق من بياناتك» |
| Empty | New user: every task `Upcoming` except the first `Current`; progress «اكتمل 0 من 5» |
| Error | Field validation inline (`forms.md`). Absher failure: `Alert` `Tone=error` «تعذر التحقق عبر أبشر» + retry; locked after N attempts: `Banner` `Tone=warning` with when to retry. Rejection: see hub |
| Under review | `EmptyState` `Tone=default` `Size=Compact` with `Illustrations` `Property 1=Data info alert`, «طلبك قيد المراجعة», description with the expected time, `KeyValue` submitted date; `Button` «تصفح الصفقات» |
| Success | `Illustrations` `Chosen checkmark` + «تم توثيق حسابك» + primary «ابدأ الاستثمار». Also the moment for the notification primer (`notifications-and-permissions.md`) |
| Disabled | Submit disabled until required fields and the declaration checkbox are complete; prefilled government data disabled (not editable) with a hint where to change it |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Hub title | «توثيق الحساب» | "Verify your account" |
| Absher CTA | «التحقق عبر أبشر» | "Verify with Absher" |
| Name rule | «يجب أن يكون الحساب باسمك كما في الهوية» | "The account must be in your name, as on your ID" |
| UBO | «هل أنت المستفيد الحقيقي من الحساب؟» | "Are you the beneficial owner of this account?" |
| Review state | «طلبك قيد المراجعة» | "Your application is under review" |
| Rejection | «مطلوب تحديث شهادة الآيبان» | "Please update your IBAN certificate" |

## Compliance notes
- The CMA KYC field set (including board membership, relation to a board member, UBO declaration and identity, employer details, bank branch) is mandatory; do not drop or merge fields. Confirm the final list and wording with Compliance.
- Suitability answers decide eligibility (retail vs qualified limits); show the outcome plainly and never nudge answers toward a higher tier.
- Declaration checkbox unchecked by default; link the real terms. PDPL: say why data is collected (one line) and link the privacy notice.
- `AbshirLogo` only on genuine Absher/Nafath steps; never as a generic verified icon.

## Accessibility notes
- `Stepper` announces «الخطوة 2 من 5، بيانات العمل»; the hub reads each task with its state.
- Upload progress is announced at start, 100% and error; trash and paperclip icons need 48x48 hit areas.
- Prefilled disabled fields stay readable (value text at 4.5:1), not greyed out to illegibility.
- Errors move focus to the first invalid field on submit.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Wise | One document per screen with requirements before upload and a "check it's readable" review |
| Derayah / Al Rajhi Capital (Saudi) | Absher/Nafath identity hand-off and CMA suitability questions in Arabic |
| Revolut | Verification hub that shows what is blocking and resumes where the user left off |
| D360 Bank (Saudi) | Short Nafath onboarding with prefilled government data |

## Anti-patterns
- Every step marked "upcoming" after the user completed some (no visible progress).
- A rejection that sends the user back to step 1.
- Name-match rule revealed only as an error after submit.
- A long single-page KYC form; one topic per step.
- Error toasts for failed uploads instead of inline retry.


---

# Pattern: notifications-and-permissions

# Notifications and permissions

The notification settings screen (what we notify and on which channel), the permission primer shown before the OS prompt, the reminder sheet, and how a denied OS permission is reflected. Read this before building notification settings or asking for any OS permission (notifications, biometrics, camera for documents).

## Job of the screen
Let investors choose exactly which messages they get and where, and ask for OS permission only at a moment when the value is obvious, so the answer is an informed yes or no that we respect.

## When to use
- Settings › Notifications (single screen).
- First-time primer after KYC completes; reminder sheet after a meaningful event (investment confirmed, reservation received).
- Any OS permission: same primer logic (explain, then the OS dialog only after the user agrees).

## Rules from the notifications PRD
- Soft pre-prompt at KYC completion; the OS dialog is shown only after the user taps yes.
- Decline is a peer button, not a hidden link.
- Re-ask at most 2 times in 90 days, and only from inside the notification centre or settings, never as a pop-up on launch.
- If the OS permission is denied, show at most one banner per 30 days, and dim the toggles that depend on it.
- Preferences are honoured on the server: a channel switched off sends nothing on that channel (PDPL).

## Flow steps
1. **KYC completed** → full-screen primer: what we notify (2-4 items), reversibility line, «فعّل التنبيهات» / «ليس الآن».
2. **Yes** → OS dialog (native). **Not now** → continue; no OS dialog consumed.
3. **Later event** (investment confirmed) → reminder `BottomSheet` if still off and within the re-ask cap.
4. **Settings**: one screen with a global switch and grouped per-type, per-channel toggles; changes apply instantly.
5. **OS denied**: banner at the top of settings with «فتح الإعدادات» (deep link to OS settings); dependent toggles disabled-off.

## Layout recipe: settings screen (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` `Direction=RTL`, title «التنبيهات» | |
| 2 | OS denied (conditional) | `Banner` `Tone=info` `Style=Filled` `showClose=true` `showLink=true`: title «التنبيهات متوقفة», link «فتح الإعدادات» | At most once per 30 days |
| 3 | Global switch | `ListItem` `Has toggle=true` (`Switch` `Size=lg`) title «كل التنبيهات», one-line description under it | Off disables every switch below (`State=disabled-off`) |
| 4 | Groups | Per type, a `Section` `Size=Sm` title, then `ActionList` `Style=Grouped` `Has header=false` with one `ListItem` `Has toggle=true` per channel («إشعارات التطبيق», «رسائل SMS», «البريد الإلكتروني»). Groups: «الصفقات الجديدة», «أخبار المشاريع», «التوزيعات النقدية», «الهدف الاستثماري», «الزكاة», «التنبيهات العامة» | Gap `space/2xl` between groups; `ActionList` handles dividers |
| 5 | Mandatory messages | `ActionList` footer text or `ListItem` with `Switch` `State=disabled-on` + description «تنبيهات الأمان والعمليات لا يمكن إيقافها» | Transactional and security messages stay on |
| 6 | No footer CTA | Switches apply instantly | No save button |

## Layout recipe: primer (full screen)

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Illustration | A sample notification card (body/14 «تم توزيع أرباحك · 250.00 ر.س») or `Illustrations` `Property 1=Info` | Real example of value, not a mascot |
| 2 | Title | heading/24/bold «نبهك أول ما تتحرك فلوسك» | One line |
| 3 | What we send | `List` `Style=Bulleted` (or `Content` rows with icons) 2-4 items: new deals, payouts, project updates | |
| 4 | Reversibility | body/13 `text/muted` «يمكنك تغيير ذلك في أي وقت من الإعدادات» | One line |
| 5 | Actions | `ButtonGroup` `Orientation=vertical`: primary «فعّل التنبيهات», secondary «ليس الآن» (`Variant=secondary`, same size) | Decline is a peer |

## Layout recipe: reminder sheet

| Slot | Component + key props | Notes |
|---|---|---|
| Shell | `BottomSheet` `showHandle=true` `showHeader=true` `showFooter=true` over `bg/overlay` | Dismissible |
| Header | `SheetHeader` title tied to the event («تابع استثمارك في الحجاز ريفيرا») | Names the deal |
| Content | `Sheet Content / Text` (one line of value) | |
| Footer | `SheetFooter` `Layout=Stacked` `showSecondary=true`: «فعّل التنبيهات» / «ليس الآن» | |

## Required states

| State | Treatment |
|---|---|
| Loading | Settings: `SkeletonLine` rows with a `SkeletonBlock` `Radius=XLarge` switch-shaped placeholder at the trailing edge |
| Empty | Not applicable; every user has the full list. Notification inbox empty: see `empty-states.md` |
| Error | Toggle save failed: revert the switch and show `Toast` `Tone=error` `Size=Small` «تعذر حفظ التغيير». Never leave a switch showing a state the server did not save |
| Success | No toast per toggle (the switch is the feedback) |
| Disabled | Global off: all switches `State=disabled-off`. OS denied: push switches disabled-off with the banner; SMS/email still editable. Mandatory: `State=disabled-on` with reason |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Screen | «التنبيهات» | "Notifications" |
| Global | «كل التنبيهات» | "All notifications" |
| Primer title | «نبهك أول ما تتحرك فلوسك» | "Know the moment your money moves" |
| Accept / decline | «فعّل التنبيهات» / «ليس الآن» | "Turn on notifications" / "Not now" |
| Denied banner | «التنبيهات متوقفة» / «فتح الإعدادات» | "Notifications are off" / "Open settings" |
| Reversibility | «يمكنك تغيير ذلك في أي وقت من الإعدادات» | "You can change this anytime in settings" |

## Compliance notes
- PDPL: marketing messages need opt-in consent per channel; switching off is honoured immediately on the server; no pre-ticked marketing switches. Confirm channel defaults with Compliance.
- Transactional and security messages (payments, sign-in, regulatory notices) may be mandatory: show them as disabled-on with the reason, never hidden.
- Notification copy follows T6: no FOMO («الصفقة على وشك الانتهاء!!»), real deadlines only.
- Never call a deal alert «مناسبة لك» (CMA).

## Accessibility notes
- Each toggle row reads label, channel and state («إشعارات التطبيق، الصفقات الجديدة، مفعّل»); the whole row toggles.
- Disabled switches explain why (description text), not just reduced opacity.
- Thumb position does not mirror in RTL (on = thumb right in both directions).
- Primer buttons are equal height with 48dp targets.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Acorns | Value-first notification primer before the OS dialog |
| Monzo | Granular notification settings grouped by topic |
| Al Rajhi Bank (Saudi) | Arabic notification channels (push, SMS) with mandatory security alerts |
| Material 3 / Apple HIG | Permission request timing guidance |

## Anti-patterns
- Calling the OS permission dialog on first launch.
- «لا، شكراً لا أريد معرفة أرباحي» (confirmshaming) as the decline.
- A save button on an instant-apply switch screen.
- Re-asking on every launch, or a denied banner on every visit.
- Toggles that show "on" when the OS permission is denied.


---

# Pattern: onboarding-and-sign-in

# Onboarding and sign-in

Getting a person into Safqah: welcome, phone number, one-time code, passcode, the Face ID offer and re-prompt, and account recovery when the phone number is lost. Read this before building any entry, authentication or recovery screen.

## Job of the screen
Let a new user create an account, and a returning user get back in, in as few taps as possible, without weakening security or trapping anyone who lost their number.

## When to use
- First launch (welcome), sign-up, sign-in, re-authentication before sensitive actions, biometric enrolment, lost-number recovery.
- Not for: identity verification after sign-up (`kyc.md`).

## Flow steps
1. **Welcome** (first launch only): one value statement, sign-up and sign-in actions, language switch.
2. **Phone entry**: Saudi number with +966; validate format on blur and on submit.
3. **OTP**: 4-digit SMS code, auto-read where the OS allows; resend after a real cooldown.
4. **Passcode** (create on sign-up, enter on sign-in) with the product keypad.
5. **Face ID / fingerprint offer**: after first passcode creation, only on devices with biometrics enrolled.
6. **Home** (signed in).
7. **Re-prompt** for biometrics: 14 days after a skip, never after 3 skips, never on a money screen.
8. **Recovery** (lost number), from the phone or passcode screen: choose method → Absher ID and date of birth → Absher OTP (proves identity) → new number → OTP to the new number (proves possession) → signed in, prompt to secure the account. Outcomes return to the entry screen as a toast so the user retries in place.

## Layout recipe: phone entry (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type=Onboarding` (entry) with a language `Link` «English»; mid-steps use `Type="Inner screens"` with back | |
| 2 | Title | heading/22/bold «أدخل رقم جوالك» + body/14 `text/muted` one line | Padding `space/lg`, gap `space/sm` |
| 3 | Field | `Input Phone` `Size=lg` `State=focus` `Direction=RTL`, country code `+966` | Digits LTR inside the RTL field. Numeric keyboard |
| 4 | Secondary | `Button` `Variant=text` «فقدت رقم جوالي» (recovery entry) | |
| 5 | Footer | `Button` `Variant=primary` `Size=lg` «متابعة»; terms line body/12 `text/muted` with `Link`s on sign-up only | Sits above the keyboard |

Sign-in and registration may use `Input Underline` instead of the bordered `Input`; never mix the two styles in one flow.

## Layout recipe: OTP

| Slot | Component + key props | Notes |
|---|---|---|
| Title | heading/22/bold «أدخل رمز التحقق» + body/14 «أرسلنا رمزاً إلى 0541234567» with `Link` «تعديل» | Number as entered, never reversed |
| Code | `OTP Input` `Length=4` `Size=lg` `State=empty` → `partial` → `complete` `Direction=RTL` | First digit in the rightmost box |
| Resend | body/13 `text/muted` «إعادة الإرسال بعد 00:45», then `Link` «إعادة إرسال الرمز» | Real cooldown only |
| Verifying | `OTP Input` `State=disabled` + `SpinnerRing` `Size=S` inline | Prevents duplicate submits |

Auto-submit when complete; no extra button needed. If a button is shown, it is disabled until 4 digits.

## Layout recipe: biometric offer and re-prompt

| Slot | Component + key props | Notes |
|---|---|---|
| Shell | `BottomSheet` `showHandle=true` `showHeader=true` `showFooter=true` `Direction=RTL` | Re-prompt only; first offer can be a full screen with the same parts |
| Header | `SheetHeader` title «ادخل أسرع ببصمة الوجه», `showSubtitle` «بصمة الوجه غير مفعّلة في صفقة» | |
| Content | `Sheet Content / Media` or `Sheet Content / Text` with `Illustrations` `Property 1=Face ID standing` | Restrained; no mascot |
| Footer | `SheetFooter` `Layout=Stacked` `showSecondary=true`: «تفعيل بصمة الوجه» / «ليس الآن» | Decline is a real button, same weight row |
| OS prompt | Native Face ID / BiometricPrompt dialog (OS, not Syntropy) | Only after the user taps enable |

## Layout recipe: recovery outcomes
Outcomes appear on the phone-entry screen, not as dead-end pages:

| Outcome | Component | Copy |
|---|---|---|
| Recovered | `Toast` `Tone=success` `Size=Large` | «تم تحديث رقم جوالك» |
| Verification failed | `Toast` `Tone=error` | «تعذر التحقق من بياناتك. حاول مرة أخرى.» |
| Temporarily locked | `Toast` `Tone=warning` + field disabled | «تم إيقاف المحاولات مؤقتاً. حاول بعد 30 دقيقة.» |
| Risk review (account paused) | Full screen: `AppBar` `Type="Small Title"`, `EmptyState` `Tone=default` `Size=Compact` with `Illustrations` `Data info alert`, `KeyValue` reference, `Button` «تواصل معنا» | Warning tone wording, never red |

Recovery methods: Absher (ID number + date of birth via `Input` and `Date Input`) and verified email. Bank/IBAN is not an identity proof and is not offered.

## Required states

| State | Treatment |
|---|---|
| Loading | `Button` `State=loading` on «متابعة»; inputs `State=disabled` while the request runs |
| Empty | Fields empty with placeholders; CTA disabled until the phone number is complete |
| Error | Phone: `Input Phone` `State=error` + helper «رقم الجوال يجب أن يبدأ بـ 05». OTP: `OTP Input` `State=error`, digits kept, helper «الرمز غير صحيح، تبقّى محاولتان». Expired OTP: `State=disabled` + resend link. Network: `Toast` `Tone=warning` `Size=Small` |
| Success | Straight to the next step; no success screen for sign-in. Recovery success uses the toast above, then the "secure your account" step |
| Disabled | Locked after too many attempts: field and CTA disabled, helper with the unlock time |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Phone title | «أدخل رقم جوالك» | "Enter your mobile number" |
| Phone error | «رقم الجوال يجب أن يبدأ بـ 05» | "Mobile number must start with 05" |
| OTP title | «أدخل رمز التحقق» | "Enter the verification code" |
| Resend | «إعادة إرسال الرمز» | "Resend code" |
| Biometric | «ادخل أسرع ببصمة الوجه» / «ليس الآن» | "Sign in faster with Face ID" / "Not now" |
| Lost number | «فقدت رقم جوالي» | "I lost my number" |

## Compliance notes
- Terms and privacy acceptance on sign-up: links to the real documents; consent is an action, not a pre-ticked box. PDPL privacy notice linked. Confirm with Compliance.
- Biometrics stay on the device; say so in one line if asked. Never use biometrics as the only recovery path.
- Recovery via Absher: two OTPs by design (identity, then possession of the new number). Account-risk pauses must not disclose AML reasons; use neutral "under review" wording. Confirm with Compliance.
- Welcome screens: no return promises; any number shown is concrete and accurate («يبدأ الاستثمار من 1,000 ر.س»).

## Accessibility notes
- `OTP Input` exposes one text field with `oneTimeCode` autofill, not four separate fields to the screen reader.
- Announce the resend cooldown when it ends, not every second.
- `Input Phone` country code is read once; the field label is visible, not placeholder-only.
- Biometric decline has a 48x48 target and equal visual prominence row.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| STC Bank / Barq (Saudi) | Phone-first sign-up with +966 and a 4-digit SMS code in Arabic |
| Revolut | Verification-method switch as a bottom sheet over the code screen |
| Monzo | Calm biometric offer with a real "not now" |
| Wise | Short recovery paths that explain the next step |

## Anti-patterns
- Clearing all OTP boxes after a wrong code.
- A biometric prompt before the user has a passcode, or every launch after they declined.
- Dead-end failure screens in recovery instead of retry in place.
- A resend link that is active immediately (SMS flooding) or a fake cooldown.
- Marketing carousels longer than three slides before sign-up.


---

# Pattern: payment

# Payment

Funding money into Safqah: choosing a method (Mada card, Apple Pay, bank transfer), showing transfer details with the IBAN, processing, success and failure. Read this before building wallet top-up, a payment step inside investing, or any screen that shows an IBAN to pay into.

## Job of the screen
Move money from the investor's bank to their Safqah wallet with the method they prefer, show exactly what they pay (and any fee or limit) before they pay, and tell them clearly when it worked, when it is pending and when it failed.

## When to use
- Wallet top-up, and the "deposit the gap" step from `invest-and-reserve.md`.
- Bank-transfer instructions for a retail reservation hold.
- Not for: withdrawals to the investor's bank (`wallet-and-cash-out.md`).

## Product rules that shape the UI
- Investments are paid from the wallet; card, Apple Pay and bank transfer are top-up methods.
- Card top-ups above a threshold may be delayed and an annual top-up cap exists: state the limit on the method row before selection. Limit values come from the backend; never hardcode them.
- Bank transfer is not instant: it is a pending state, not a success.

## Flow steps
1. **Amount** (prefilled with the gap when coming from investing): `Input Amount` `Size=lg`.
2. **Method**: single-choice list. States per row: available, limited (hint), unavailable (disabled with reason).
3. **Review**: `Checkout` with the method, `Payment-details` summary, total.
4. **Processing**: card and Apple Pay hand off to the issuer (3-D Secure / wallet sheet), then return to a processing state.
5. **Result**: success (wallet credited), pending (transfer awaited), failed (retry or change method).
6. **Bank transfer branch**: instructions screen with IBAN, beneficiary name, reference; «تم التحويل» marks it as sent; the wallet updates when funds arrive.

## Layout recipe: method choice (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` `Direction=RTL`, title «إيداع في المحفظة» | |
| 2 | Amount | `Input Amount` `Size=lg` `Show Label=true` «المبلغ», helper with the limit for the selected method | Padding `space/lg` |
| 3 | Methods | `SelectionList` `Mode=Single` `Has header=true` («طريقة الدفع») `Direction=RTL` with one `SelectRow` `Type=Radio` per method: Mada card (leading `MadaLogo` `Size=24` `Tone=Brand`), Apple Pay, bank transfer. `Has value=true` for a short hint («فوري» / «1-2 يوم عمل») | Selected row = brand border + tint (plus radio dot; colour never alone). Gap `space/md` |
| 4 | Limit note (if any) | `Form Field Helper` `Tone=info` `Size=sm` under the affected row | One line |
| 5 | Footer | `Button` `Variant=primary` `Size=lg` «متابعة» | Disabled until a method is chosen |

`MadaLogo` keeps its own colours (`Tone=Brand` on light, `Tone=Inverse` on dark). No Apple Pay mark exists in the manifest: use the OS-provided Apple Pay button/mark per Apple's guidelines and flag it to the DS team.

## Layout recipe: review

| Slot | Component + key props | Notes |
|---|---|---|
| Method + summary | `Checkout` `Method=Credit-card` / `ApplePay` / `Bank-transfer` `Direction=RTL` | Card is shown with the Mada mark and last 4 digits |
| Breakdown | `Payment-details` (amount, fee if any, total) or `Sheet Content / Summary` with `KeyValue` rows and a `List / DescriptionRow` `Emphasis=Total` «الإجمالي» `5,000.00 ر.س` | Two decimals; currency after the amount |
| Promo (only if a campaign is live) | `Promo-code` `State=Not-added` / `Added` | Hide when no campaign; an empty promo field invites abandonment |
| CTA | `Button` primary «ادفع 5,000.00 ر.س» | Names the amount |

## Layout recipe: bank-transfer instructions

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Title | `Section` `Size=Lg` «حوّل إلى حسابك في صفقة» `Has description` («استخدم نفس الحساب البنكي المسجل باسمك») | |
| 2 | Details | `KeyValue` `Layout=stacked` `Size=lg` rows, each `HasIcon=true` with the copy icon: «اسم المستفيد», «الآيبان» `SA03 8000 0000 6080 1016 7519`, «البنك», «الرقم المرجعي». `Emphasis=strong` on the IBAN only | IBAN in groups of 4, LTR-isolated inside the RTL line, never reversed. Copy confirms with `Toast` `Tone=success` `Size=Small` «تم النسخ» |
| 3 | Amount | `KeyValue` «المبلغ» `50,000.00 ر.س` | |
| 4 | Deadline (reservation holds) | `Small Timer` + absolute time text | Real deadline only |
| 5 | Footer | `SheetFooter` or `ButtonGroup` `Orientation=vertical`: primary «تم التحويل», secondary «مشاركة التفاصيل» | |

## Required states

| State | Treatment |
|---|---|
| Loading | Methods: 3 `SelectRow`-sized skeletons (`SkeletonCircle` `Size=M` + `SkeletonLine`). Fees: `SkeletonLine` `Width=Quarter` in the value column |
| Processing | Card / Apple Pay return: centred `SpinnerRing` `Size=L` with one line «جارٍ تأكيد الدفع»; no back navigation that could double-charge. Over 10 seconds: add «قد يستغرق ذلك دقيقة» |
| Empty | No saved card: Mada row shows «إضافة بطاقة مدى»; never an empty list |
| Error | Card declined / 3DS failed: return to review with `Alert` `Tone=error` `Style=Filled` «لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ.» + `showButton` «إعادة المحاولة», and the method list one tap away. Unknown outcome (timeout): `Alert` `Tone=warning` «نتحقق من حالة الدفع» and poll; never tell the user to pay again until the outcome is known |
| Pending | Bank transfer marked sent: `EmptyState` `Tone=default` `Size=Compact` with `Illustrations` `Property 1=Bank`, «سنضيف المبلغ إلى محفظتك فور وصوله», `Button` «العودة للمحفظة» |
| Success | Wallet credited: success screen (`Illustrations` `Chosen checkmark`, «تم إيداع 5,000.00 ر.س في محفظتك», `KeyValue` reference) or, if returning to the invest flow, continue straight to the review sheet with a `Toast` `Tone=success` |
| Disabled | Method unavailable or over limit: `SelectRow` `State=Disabled` with the reason as value text («تجاوزت الحد السنوي») |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Method hints | «بطاقة مدى · فوري» · «تحويل بنكي · 1-2 يوم عمل» | "Mada card · instant" · "Bank transfer · 1-2 business days" |
| Pay CTA | «ادفع 5,000.00 ر.س» | "Pay 5,000.00 SAR" |
| Declined | «لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ.» | "Payment didn't go through. You weren't charged." |
| Pending | «سنضيف المبلغ إلى محفظتك فور وصوله» | "We'll add it to your wallet as soon as it arrives" |
| Copied | «تم النسخ» | "Copied" |

## Compliance notes
- Show every fee (with VAT) and the total before the pay button; no pre-ticked add-ons. SAMA consumer-protection principles apply. Confirm with Compliance.
- Transfers must come from an account in the investor's own name; say so on the instructions screen (name mismatch causes the IBAN-certificate problem in `wallet-and-cash-out.md`).
- Never store or display the full card number; last 4 digits only.
- Limits (annual top-up cap, card thresholds) are disclosed before selection.

## Accessibility notes
- `SelectRow` group uses radio semantics; each row reads method, hint, and limit.
- IBAN is read digit-group by digit-group; the copy button is labelled «نسخ الآيبان» with a 48x48 hit area.
- Processing state announces once («جارٍ تأكيد الدفع») and again on result; spinner respects reduced motion.
- Do not rely on the brand border alone for selection (`border/brand/primary` is under 3:1 in Light); the radio dot carries state.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Wise | Bank-transfer instructions with copy buttons per field and a clear "I've paid" step |
| STC Bank / urpay (Saudi) | Mada and Apple Pay as first-class methods in Arabic RTL |
| Tabby | Method rows that state limits up front |
| Revolut | Processing and declined states that say whether money moved |

## Anti-patterns
- "Payment failed, try again" when the outcome is unknown (risk of double payment).
- Showing a success screen for a bank transfer that has not arrived.
- Recolouring `MadaLogo` to brand green.
- An IBAN rendered as one unbroken string, or reversed inside Arabic text.
- A visible promo field when no promo exists.


---

# Pattern: payouts

# Payouts and distribution schedule

Every distribution an investor receives or expects: the payouts list grouped by year, per-deal distribution schedules, and the expected payout window at maturity. Read this before building the payouts list, a deal's «التوزيعات» section, or any screen that shows a payout date.

## Job of the screen
Tell the investor exactly how much comes back, from which deal, of which kind (periodic profit or capital), when, and what state it is in, with numbers that add up.

## When to use
- Payouts list from the portfolio header button.
- Distribution schedule on the deal page and inside the calculator.
- Wallet activity for received payouts.
- Not for: lifecycle of a deal (use `DealTimeline`, `deal-page.md`).

## The payout window rule
- Expected payout date = maturity date + 15 days, written as one approximate date with a tilde, never a range: «متوقع ~7 يناير 2027» / "Expected ~7 January 2027".
- Lateness counts from the end of the window: maturity + 16 days is day 1 late. The window never extends.
- Financial dates are Gregorian (`knowledge/ux/rtl.md` R5).

## Flow steps
1. **Open payouts list**: tabs for upcoming, received, all; grouped by year with a running total.
2. **Scan states** (Upcoming, Done, Early paid, Late, Defaulted, Partial).
3. **Expand a partial group** to see sub-payouts.
4. **Open a row** to the investment detail.
5. **On a deal page**: collapsed schedule summary («4 توزيعات · التفاصيل»), expand to the list with the final capital row.
6. **At maturity**: the final row shows the window date; when paid, the payout moment offers the reinvest or keep choice (`wallet-and-cash-out.md`).

## Layout recipe: payouts list (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` «جدول التوزيعات» | |
| 2 | Filter | `SegmentedControl_3` `Style=pill-thumb` `Size=md`: «القادمة» · «المستلمة» · «الكل» | Choice control |
| 3 | Summary (optional) | 2 `Stat` `Size=sm` `Layout=horizontal`: «المستلم» and «المتوقع» totals | `HasDelta=false` |
| 4 | Year group | `Section` `Size=Sm` title «2026» with the running total in `Has action` slot styled as value (or a `KeyValue` row) | Totals equal the sum of rows |
| 5 | Rows | `Payouts cell` `Direction=rtl` with `Property 1=` state; `Show Subtitle=true`; `Show alert=true` only for `Disabled Early paid` and partial groups that need an explanation. Rows separated by `Divider` `Tone=subtle` inside one container | One grouped list, never a card per row. Container `bg/elevated`, `radius/lg` |
| 6 | Bottom | nothing; no CTA on this screen | |

`Payouts cell` states and when to use them:

| `Property 1` | Use when | Copy suffix |
|---|---|---|
| `Upcoming` | Scheduled, not yet paid | «متوقع ~7 يناير 2027» |
| `Done - Payout` | Periodic profit received | «توزيعات دورية • تم الاستلام» |
| `Done - Captial` | Capital returned (value spelled as in the set) | «رأس المال • تم الاستلام» |
| `Early paid` | Paid ahead of schedule (both dates shown) | «سداد مبكر» |
| `Disabled Early paid` | Scheduled payout skipped because the deal was repaid early; `Show alert=true` explains | «تم التخطي • اكتمل الاستثمار مبكراً» |
| `Late` | Past the window end | «متأخر 5 أيام» (warning, not red) |
| `Defaulted` | In default | «متعثرة» (the only red state) |
| `Partially repaid` / `Partially repaid closed` | Instalment group, open or collapsed | «1 من 3 دفعات» |
| `Partial principal` | Capital repaid in parts | «سداد جزئي لرأس المال» |

## Layout recipe: distribution schedule on the deal page

| Slot | Component + key props | Notes |
|---|---|---|
| Collapsed | `Distribution-schedule` `Property 1=Less-list` (summary line «4 توزيعات · التفاصيل») | Count must equal the rows in the full list |
| Expanded | `Distribution-schedule` `Property 1=Full list`, or `Calculator / Distributions accordion` `State=Open` with `Calculator / Installment row` `Type=Profit` rows and one `Type=Final` row (capital + last profit) | Final row date = maturity + 15 days |
| No periodic payouts | `Distribution-schedule` `Property 1=No-Schedule` with «توزيع الأرباح: نهاية المدة» | |
| Timeline form (target design) | `TimelineRow` `HasAmount=true` `HasDate=true` per payout with `TimelineNode` `State=completed/active/upcoming`; capital as the last node | Expected vs confirmed dates distinguished in text |

## Required states

| State | Treatment |
|---|---|
| Loading | 2 year-header skeletons (`SkeletonLine` `Width=Quarter`) and 5 row skeletons (two lines on each side) |
| Empty | No investments: `EmptyState` `Tone=default` `Size=Default` «لا توجد توزيعات بعد» + «تصفح الصفقات». Received tab empty: `EmptyState` `Size=Compact` «ستظهر التوزيعات المستلمة هنا» |
| Error | `EmptyState` `Tone=error` + retry; deal-page schedule failure: `Alert` `Tone=warning` `Style=Plain` «تعذر تحميل جدول التوزيعات» inside the region |
| Success | Received payout: row moves to `Done - Payout`; push notification names amount and deal |
| Disabled | `Disabled Early paid` row (muted, struck) with its `Alert` |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Title | «جدول التوزيعات» | "Payouts schedule" |
| Expected date | «متوقع ~7 يناير 2027» | "Expected ~7 January 2027" |
| Periodic | «توزيعات دورية» | "Periodic distribution" |
| Capital | «رأس المال» | "Capital" |
| Late | «السداد متأخر. نتابع مع المطور.» | "Payment is late. We're following up with the developer." |
| Defaulted | «الصفقة متعثرة. بدأت إجراءات التحصيل.» | "This deal has defaulted. Recovery has started." |

## Compliance notes
- Upcoming amounts are expected, not guaranteed; label with «متوقع». Confirm with Compliance.
- Schedule maths must reconcile: the label count equals the rows, the sum of profit rows equals the stated profit, net vs gross is labelled, no past dates shown as upcoming. A schedule that does not add up is a disclosure error.
- Late and defaulted wording states facts and the action taken; no reassurance that recovery will succeed.

## Accessibility notes
- Each row reads amount, deal, type and state in one phrase; the state icon is redundant with the text.
- Partial groups expose expanded/collapsed state; the chevron mirrors in RTL.
- Struck-through `Disabled Early paid` text is also explained in words (the alert), not by the strike alone.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Fundrise | Distribution history grouped by period with totals |
| Lendo / Raqamyah (Saudi debt crowdfunding) | Arabic repayment schedules with late states |
| Arrived | Expected vs paid dividends clearly separated |
| Mercury | Clean grouped transaction lists with running totals |

## Anti-patterns
- A payout shown as a range («3 إلى 18 يناير») or without «متوقع».
- «4 توزيعات» above a list of 6 rows; totals that do not add up.
- A card around every payout row.
- Late in red; extending the window to avoid showing lateness.
- Colour alone for received vs pending.


---

# Pattern: portfolio

# Portfolio

The investor's home for what they own: greeting, wallet, total returns, holdings grouped by status, allocation, and the next money moment. Read this before building the Portfolio tab or any holdings summary.

## Job of the screen
Answer three questions at a glance: how much do I have and earn, where is my money (by deal and status), and what happens next (next payout, maturity, anything that needs me).

## When to use
- The Portfolio tab (top-level) and its sub-views (active, completed, a status group).
- Not for: the payout list itself (`payouts.md`), the wallet and withdrawals (`wallet-and-cash-out.md`).

## Flow steps
1. **Open the tab**: header with balance (maskable), returns, invested amount; one link to the payouts list.
2. **Scan holdings** grouped by status (Reserved, Confirmed, Funded, Active, Matured, Late, Defaulted, Completed). Each group shows count and total.
3. **Expand a group** to see its investments; tap one to open the investment detail (deal page in Invested state, `deal-page.md`).
4. **Switch view** Active vs Completed with `SegmentedTabs`.
5. **Optional analysis**: allocation and returns charts (`charts-and-dashboards.md`).
6. **Act on attention items**: Late/Defaulted rows lead to the explanation; Matured leads to the payout and reinvest choice.

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Header | `PortfolioHeader` `Direction=RTL` `Balance=Shown` (or `Masked`), `Show wallet=true`, `Show returns=true`, `Show payouts table=true`. Contains `UserGreeting` (`Show qualified badge` for qualified users, `Show eye`), `WalletChip`, `ReturnsDisplay` (returns label + `MoneyAmount` `Size=lg` `Tone=brand`, invested on the opposite side), payouts `Button` | Once per page, at the very top. Padding `space/lg` |
| 2 | Attention (only if needed) | One `Alert` `Tone=warning` `Style=Outlined` («تأخر سداد في صفقة واحدة») or `Banner` for a matured payout awaiting a choice | Never more than one |
| 3 | View switch | `SegmentedTabs` `Active=1` `Direction=RTL`: «استثماراتي النشطة» · «المكتملة» | Directly under the header |
| 4 | Holdings by status | `Section` `Size=Md` «حسب الحالة» + `Issuance List` `Direction=RTL` of `Issuance Row` (`Language=RTL`, props Status, Count, Amount; `State=Open` to expand); status icon from `Issuance Status Icon` | Only the icon carries status colour; label and amount stay neutral |
| 5 | Expanded rows | Inside an open row: `CardDeal` `Layout=Row` `State=Invested` per investment, with a secondary line by status (see table) | Gap `space/sm` |
| 6 | Allocation (optional) | `Section` `Size=Md` «توزيع استثماراتك» + `Chart / Donut · Mobile` `Direction=RTL` (≤6 slices) with `Chart / Legend` and a text list | Semantic palette only |
| 7 | Next money moment | `Section` `Size=Md` «الدفعة القادمة» + one `Payouts cell` `Property 1=Upcoming` | Links to `payouts.md` |
| 8 | Bottom nav | `TabBar` `Active=` Portfolio `Direction=RTL` | |

Alternative header for the top-level screen: `Header` (06a) `Show Qualified?` with `Header Info` `Show Payouts list?`; pick one header per screen, never both.

### Secondary line per status (CardDeal Row, from SAF-2937)
| Status (`IssuanceStatusBadge (Investor)`) | Arabic | English |
|---|---|---|
| Reserved | «متبقي 3 أيام» | "3 days left" |
| Confirmed / Funded | «يبدأ ~20 مايو 2026» | "Starts ~20 May 2026" |
| Active | «يستحق 3 يناير 2027» | "Matures 3 January 2027" |
| Matured | «متوقع ~18 يناير 2027» (maturity + 15 days) | "Expected ~18 January 2027" |
| Late | «متأخر 5 أيام» (counted from the window end) | "5 days late" |
| Defaulted | «متعثرة · بدأت إجراءات التحصيل» | "Defaulted · recovery started" |

## Required states

| State | Treatment |
|---|---|
| Loading | Header: `SkeletonLine` `Size=Large` `Width=Half` (greeting), `SkeletonBlock` `Radius=Medium` for wallet chip, `SkeletonLine` `Size=XLarge` for returns, `SkeletonBlock` for the button. Holdings: 4 `Issuance Row` skeletons (`SkeletonCircle` `Size=L` + 2 lines + amount line) |
| Empty | First-time investor: header with zeros, holdings region `EmptyState` `Tone=default` `Size=Default` «لم تستثمر بعد» + «تصفح الصفقات». Completed tab empty: `EmptyState` `Size=Compact` «لا توجد استثمارات مكتملة بعد» (no button) |
| Error | Header loads but holdings fail: `EmptyState` `Tone=error` `Size=Compact` in the holdings region + retry; header stays. Full failure: full-area `EmptyState` `Tone=error` |
| Success | After a new investment: the row appears in Reserved/Confirmed with no toast if the user came from the success screen |
| Disabled | Masked balance: amounts replaced by ••••• in header and rows; charts hide values (show shapes only) |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Returns label | «إجمالي العوائد والأرباح المتوقعة» | "Total returns and expected profit" |
| Invested | «المبلغ المستثمر» | "Amount invested" |
| Payouts button | «اطلع على جدول التوزيعات» | "View payouts list" |
| Tabs | «النشطة» · «المكتملة» | "Active" · "Completed" |
| Empty | «لم تستثمر بعد» | "You haven't invested yet" |

## Compliance notes
- Separate realised returns from expected profit in labels; expected is «متوقع» and never presented as earned. Confirm the label wording with Compliance.
- Late and Defaulted are stated plainly with what Safqah is doing; no softening that hides risk, no alarmism (warning for late, error only for defaulted).
- Allocation charts describe the user's own holdings; no suitability advice.

## Accessibility notes
- `BalanceToggle` labelled; masking applies to screen readers too.
- `Issuance Row` reads status, count and amount, and its expanded state («موسّع»).
- Donut has a text alternative: the legend list with percentages, and the chart is hidden from the reader if the list carries the same data.
- `ReturnsDisplay` large green amount passes contrast only at large size; keep it large.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Fundrise | Portfolio by status with plain-language next events |
| Wahed / Sarwa (GCC) | Calm returns header with invested vs value |
| Derayah (Saudi) | Arabic portfolio with Western digits and currency after the amount |
| Wealthsimple | Hide-balance toggle and restrained charts |

## Anti-patterns
- Several hero numbers competing in the header (one returns number, one invested).
- Colouring the amount or label per status (only the icon carries colour).
- A payout date shown as a range or without «متوقع».
- Late shown in red; defaulted shown in warning orange (swapped meanings).
- Charts with more than 6 donut slices or a mirrored time axis.


---

# Pattern: settings-and-profile

# Settings and profile

The account area: profile summary, personal and investment profile, bank accounts, security (passcode, biometrics), notifications, language and appearance, help, legal, sign out and account closure. Read this before building the settings tab or any of its sub-screens.

## Job of the screen
Let investors find and change anything about their account in two taps, see what is verified or needs action, and leave or close the account without tricks.

## When to use
- The settings / account tab and every list-of-rows screen below it.
- Investment profile edit (read/edit surface for KYC data; capture lives in `kyc.md`).
- Not for: notification toggles in detail (`notifications-and-permissions.md`), bank-account fixes (`wallet-and-cash-out.md`).

## Flow steps
1. **Settings home**: identity header, then grouped rows by topic.
2. **Row tap**: navigation rows open a sub-screen; toggle rows apply instantly; value rows show the current value.
3. **Edit a field**: sub-screen with one form (see `forms.md`), save, return with a toast.
4. **Action needed** (expired ID, KYC refresh): one `Banner` on settings home linking to the task.
5. **Sign out**: `Dialog` `Tone=default`. **Close account**: separate screen with consequences, then `Dialog` `Tone=destructive`.

## Layout recipe: settings home (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="main screens"` or `Inner screens` `Direction=RTL`, title «الإعدادات» | |
| 2 | Identity | `ListItem` `Has leading=true` (`Avatar` `Type=Initials` `Size=lg` `Shape=Circle`), title = full name, description = masked phone, `Has label=true` with `StatusPill` `Tone=success` «موثّق» (or `Tone=warning` «مطلوب إجراء»), `Has chevron=true` | Qualified investors: `dealTags` qualified badge or `StatusPill` `Tone=brand` «مستثمر مؤهل» |
| 3 | Action needed (conditional) | `Banner` `Tone=warning` `Style=Outlined` `showButton=true` «انتهت صلاحية الهوية» / «تحديث» | One banner |
| 4 | Relationship manager (qualified) | `CardInfo` `Type=Avatar` `Tone=Neutral` with the RM name and «تواصل» | Qualified only |
| 5 | Group: account | `Section` `Size=Sm` «الحساب» + `ActionList` `Style=Grouped`: «البيانات الشخصية», «الملف الاستثماري», «الحسابات البنكية», «المستندات» (`ListItem` `Has leading` icon, `Has chevron`) | Gap `space/2xl` between groups |
| 6 | Group: security | «رمز الدخول» (chevron), «الدخول ببصمة الوجه» (`Has toggle`), «الأجهزة المسجلة» (chevron) | |
| 7 | Group: preferences | «التنبيهات» (chevron), «اللغة» (`Has value` «العربية», chevron), «المظهر» (`Has value` «تلقائي»), «التقويم» (`Has value` «ميلادي») | Calendar default is a setting (R5) |
| 8 | Group: help and legal | «مركز المساعدة», «تواصل معنا», «الشروط والأحكام», «سياسة الخصوصية», «الإفصاحات الشرعية» | |
| 9 | Sign out | `Button` `Variant=text` `Size=lg` «تسجيل الخروج» | Not a list row styled red |
| 10 | Version | caption/12 `text/muted` «الإصدار 4.12.0» | |
| 11 | Bottom nav | `TabBar` `Active=` settings tab | Top level only |

Each `ListItem` has exactly one trailing affordance (chevron, toggle, value + chevron, or label). `ActionList` owns dividers and corners.

## Layout recipe: profile detail (read, then edit)

| Slot | Component + key props | Notes |
|---|---|---|
| Group titles | `Section` `Size=Sm` («بيانات العميل», «البيانات الوظيفية», «البيانات البنكية», «البيانات العامة») | Matches the KYC sections |
| Rows | `ListItem` `Has label=false` `Has value=true` showing label and current value; `Has action=true` with «تعديل» on editable rows | Government-sourced rows have no edit action; one hint says they update from Absher |
| Edit | Push a sub-screen with `Form Field`s, or a `BottomSheet` with `Sheet Content / Form` for a single field | Save returns with `Toast` `Tone=success` «تم حفظ التغييرات» |

## Layout recipe: close account

| Slot | Component + key props | Notes |
|---|---|---|
| Consequences | `Section` `Size=Lg` «إغلاق الحساب» + `List` `Style=Bulleted` (active investments continue to maturity, wallet balance must be withdrawn first, data retention period) | Facts, no guilt |
| Blocker | `Alert` `Tone=warning` if the wallet has a balance or investments are open, with the next step | |
| Action | `Button` `Variant=destructive` `Size=lg` «إغلاق الحساب» → `Dialog` `Tone=destructive` `Size=sm`, title «إغلاق حسابك؟», confirm «إغلاق الحساب», cancel «تراجع» | Confirm label names the action |

## Required states

| State | Treatment |
|---|---|
| Loading | Identity: `SkeletonAvatar` `Size=L` + 2 `SkeletonLine`. Groups: `SkeletonLine` rows inside grouped containers (4-6 rows) |
| Empty | No documents: `EmptyState` `Tone=default` `Size=Compact` «لا توجد مستندات». No secondary bank account: `ActionPrompt` «إضافة حساب بنكي» |
| Error | Sub-screen load fails: `EmptyState` `Tone=error` + retry. Save fails: `Alert` `Tone=error` on the form, values kept. Toggle fails: revert + `Toast` `Tone=error` `Size=Small` |
| Success | `Toast` `Tone=success` after saving; no toast for instant toggles |
| Disabled | `ListItem` `State=Disabled` for features unavailable to the user (with a description why); biometrics toggle disabled with «غير متاح على هذا الجهاز» |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Title | «الإعدادات» | "Settings" |
| Verified | «موثّق» | "Verified" |
| Edit | «تعديل» | "Edit" |
| Sign out | «تسجيل الخروج» | "Sign out" |
| Close | «إغلاق الحساب» / «تراجع» | "Close account" / "Keep account" |

## Compliance notes
- Legal pages (terms, privacy, Sharia disclosures, CMA licence) stay reachable from settings. Confirm the list with Compliance.
- PDPL: the user can view their data and request changes; closure explains retention periods required by regulation. Confirm wording with Compliance.
- KYC data edits that affect suitability may trigger re-assessment; say so in one line on save.

## Accessibility notes
- Each row reads title, value and state, and its role (link, switch).
- Status pills are read with the row («موثّق»); warning state has text, not just colour.
- Destructive `Dialog` focuses the safe action first; the destructive confirm is not the default focus.
- Avatar initials are decorative when the name is shown.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Monzo | Settings grouped by plain topics with clear security area |
| STC Bank / D360 Bank (Saudi) | Arabic account settings with Absher-sourced locked fields |
| Revolut | Verified status on the profile header |
| Apple HIG | Grouped list conventions and destructive actions |

## Anti-patterns
- Rows with two trailing controls (toggle and chevron).
- Hand-drawn dividers and per-row cards instead of `ActionList`.
- A hidden or multi-step-maze account closure; confirmshaming copy.
- Red "sign out" rows; sign out is not destructive.
- Editable-looking government data that silently cannot be changed.


---

# Pattern: wallet-and-cash-out

# Wallet and cash-out

The wallet: balance, activity, linked bank accounts, withdrawing to the bank, and recovering when the bank account name does not match the investor's identity (IBAN certificate). Read this before building the wallet screen, bank-account management, the withdraw flow or the name-mismatch fix.

## Job of the screen
Show what money is available and where it sits, let the investor move it to their own bank honestly and quickly, and get them unstuck when a bank account cannot be verified.

## When to use
- Wallet tab or wallet entry from `WalletChip` in the app bar.
- Withdraw after a payout, or any time.
- Adding, verifying, or replacing a bank account.
- Not for: top-ups (`payment.md`), holdings (`portfolio.md`).

## What research says (shapes the flow)
- The cash-out decision is made at the payout moment, not on the withdraw screen: about half of payouts are withdrawn within 30 days, most of those within 24 hours. Persuasion, if any, belongs at the payout (`Reinvest / MaturityRecap` with equal choices), never as friction on the withdraw screen.
- About 4% of bank-account adds hit a name mismatch and most stay stuck for weeks: the mismatch fix must be a guided, resumable task.

## Flow steps
1. **Wallet**: balance (maskable), available vs held amounts, activity list, linked bank account.
2. **Withdraw amount**: presets (full balance, half), free entry; shows what stays in the wallet.
3. **Review**: amount, destination account (masked IBAN), fee if any, arrival time; one confirm.
4. **Processing → submitted**: status «قيد المراجعة» / «قيد التحويل», never "completed" before it is.
5. **Done**: activity row updates; push when the bank transfer settles.
6. **Bank accounts**: list, add (IBAN + bank), verification states (verified, pending, name mismatch).
7. **Name mismatch recovery**: explain in one line, request an IBAN certificate (شهادة الآيبان) upload or a different account in the investor's name; track status; resume from a task row.

## Layout recipe: wallet (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` «المحفظة» | |
| 2 | Balance | `Stat` `Size=lg` `Layout=vertical` label «الرصيد المتاح» with the value from `MoneyAmount` `Size=lg` `Tone=default`; `BalanceToggle` `State=Show/Hide` beside it | Padding `space/lg`. Masked shows ••••• |
| 3 | Breakdown | `KeyValue` `Layout=horizontal` `Size=md`: «محجوز لاستثمارات قيد التنفيذ», «قيد التحويل إلى البنك» | Only rows with a value |
| 4 | Actions | `ButtonGroup` `Orientation=horizontal` `Spacing=default`: «سحب» (`Variant=secondary`) and «إيداع» (`Variant=primary`) | One primary |
| 5 | Bank account | `Section` `Size=Md` «الحساب البنكي» + `ActionList` `Style=Grouped` with one `ListItem` (`Has leading` bank icon, title = bank name, description = masked IBAN `SA•• •••• 7519`, `Has label` with `StatusPill` `Tone=success` «موثّق», `Has chevron`) | |
| 6 | Activity | `Section` `Size=Md` «العمليات» `Has action` «عرض الكل» + `List` `Style=Divided` of `ListItem` rows (title, date, `Has value` amount with sign: `+1,250.00 ر.س` / `-5,000.00 ر.س`) | Sign plus colour, never colour alone |

## Layout recipe: withdraw

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Close Icon-Black"` «سحب إلى البنك» | |
| 2 | Amount | `Input Amount` `Size=lg` `Show Label=true` «المبلغ», helper «المتاح 12,500.00 ر.س» (or `Keypad / Amount input` with `Keypad / Title row`) | |
| 3 | Presets | `Tag Group` `Layout=inline` of `Tag` `Style=subtle`: «كامل الرصيد», «النصف» | Computed from the balance |
| 4 | What stays | `KeyValue` «يبقى في المحفظة» `0.00 ر.س` | Live |
| 5 | One context line (optional) | `Form Field Helper` `Tone=info` «لديك صفقة مفتوحة تطابق استثمارك السابق» with `Link` | At most one line; no modal |
| 6 | Destination | `ListItem` (bank, masked IBAN, `Has chevron` to change) | |
| 7 | Footer | `Button` `Variant=primary` `Size=lg` «مراجعة السحب» | |

Review: `BottomSheet` with `Sheet Content / Summary` (`KeyValue` «المبلغ», «إلى», «الرسوم» (or «بدون رسوم»), «الوصول المتوقع» «1-2 يوم عمل», then `List / DescriptionRow` `Emphasis=Total` «يصلك» with the exact net amount) and `SheetFooter` primary «تأكيد السحب». If the platform supports cancelling within a window, the success state offers «إلغاء السحب».

## Layout recipe: name mismatch (IBAN certificate)

| Slot | Component + key props | Notes |
|---|---|---|
| Status on the account row | `ListItem` with `StatusPill` `Tone=warning` «مطلوب إجراء» | Warning, not error |
| Explanation | `Alert` `Tone=warning` `Style=Filled` «اسم صاحب الحساب لا يطابق اسمك في الهوية» + `showButton` «حل المشكلة» | One alert on the wallet screen |
| Fix screen | `Section` `Size=Lg` «أرفق شهادة الآيبان» `Has description`; `Upload Button` with formats hint; `File Item with Progress` states; `Divider`; `Button` `Variant=text` «استخدام حساب آخر باسمك» | Two real options |
| Waiting | `KYCTaskRow`-style status or `Alert` `Tone=info` «نراجع الشهادة خلال يومي عمل» | Resumable from the wallet |
| Rejected certificate | `File Item with Progress` `State=error` + helper with the exact reason («الشهادة لا تظهر اسم صاحب الحساب») | Keep the history |

## Required states

| State | Treatment |
|---|---|
| Loading | `SkeletonLine` `Size=XLarge` `Width=Half` for the balance, `SkeletonBlock` for buttons, 5 activity skeleton rows |
| Empty | Zero balance and no activity: balance shows `0.00 ر.س`; activity region `EmptyState` `Tone=default` `Size=Compact` «لا توجد عمليات بعد» + «إيداع». No bank account: `ActionPrompt` `Tone=Brand` «أضف حسابك البنكي» |
| Error | Load failed: `EmptyState` `Tone=error` + retry. Amount above available: `Input Amount` `State=error` «المبلغ أكبر من رصيدك المتاح». Withdraw failed: `Alert` `Tone=error` in the review sheet, amount kept |
| Success | Submitted: screen with `Illustrations` `Bank`, «تم طلب سحب 12,500.00 ر.س», status «قيد التحويل», expected arrival. Not "completed" |
| Disabled | Withdraw disabled while the bank account is unverified: `Button` `State=disabled` + one helper line linking to the fix. Held funds not withdrawable are shown as a separate row, not hidden |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Available | «الرصيد المتاح» | "Available balance" |
| Withdraw CTA | «مراجعة السحب» / «تأكيد السحب» | "Review withdrawal" / "Confirm withdrawal" |
| Arrival | «الوصول المتوقع: 1-2 يوم عمل» | "Expected arrival: 1-2 business days" |
| Mismatch | «اسم صاحب الحساب لا يطابق اسمك في الهوية» | "The account holder name doesn't match your ID" |
| Fix | «أرفق شهادة الآيبان» | "Upload your IBAN certificate" |

## Compliance notes
- Withdrawals go only to a verified account in the investor's own name; explain once, without legal paragraphs. Confirm with Compliance.
- Show the exact amount received; if no fee applies, the received amount equals the requested amount (no rounding or hidden deductions).
- No retention dark patterns: no "are you sure" modal, no hidden withdraw button, no guilt copy. Reinvest suggestions live at the payout moment with Keep as an equal choice.
- Never label a reinvest suggestion «مناسبة لك» (CMA).

## Accessibility notes
- `BalanceToggle` labelled «إظهار الرصيد» / «إخفاء الرصيد»; masked state is announced as hidden, not read as dots.
- Activity amounts read with their sign («مضاف 1,250 ريال»); colour is redundant.
- Masked IBAN read as «ينتهي بـ 7519».
- Upload and status changes announced; retry reachable without re-picking the file.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Wise | Withdraw review that shows exactly what arrives and when |
| Al Rajhi Bank / STC Bank (Saudi) | Beneficiary and IBAN management with verified states in Arabic |
| Monzo | Calm, light withdraw flow with no retention friction |
| Revolut | Presets for full or partial balance |

## Anti-patterns
- Showing 980 for a 1,000 withdrawal with no fee row.
- A success toast over a status that still says under review.
- An "are you sure you want to leave money idle" modal.
- Red error styling for name mismatch (it is a fixable task, warning tone).
- Dropping the user back to "add account" from scratch after a rejected certificate.


---

# Semantic tokens (all)

| Token | Light | Dark | Tag |
| --- | --- | --- | --- |
| `bg/surface` | "#f9faf9" | "#121614" | locked |
| `bg/base` | "#ffffff" | "#121614" | locked |
| `bg/elevated` | "#f4f6f2" | "#1c1d1c" | locked |
| `bg/inverse` | "#111312" | "#ffffff" | locked |
| `bg/overlay` | "#00000080" | "#ffffff4d" | locked |
| `bg/reverse-overlay` | "#ffffffb2" | "#00000080" | locked |
| `bg/brand/primary` | "#4daa57" | "#77c27f" | themable |
| `bg/brand/primary-hover` | "#469b4f" | "#aedab2" | themable |
| `bg/brand/primary-pressed` | "#387c3f" | "#469b4f" | themable |
| `bg/success` | "#34c759" | "#54d274" | locked |
| `bg/success-subtle` | "#eefbf1" | "#185a28" | locked |
| `bg/caution` | "#996c61" | "#ae8278" | locked |
| `bg/caution-subtle` | "#ebe0dc" | "#5c2e1f" | locked |
| `bg/warning` | "#ff9500" | "#ffa82e" | locked |
| `bg/warning-subtle` | "#fff5e8" | "#744400" | locked |
| `bg/error` | "#da002a" | "#ff5374" | locked |
| `bg/error-subtle` | "#ffecf0" | "#6d0015" | locked |
| `bg/info` | "#007aff" | "#2e92ff" | locked |
| `bg/info-subtle` | "#e8f3ff" | "#00438b" | locked |
| `bg/progress` | "#af52de" | "#be71e4" | locked |
| `bg/progress-subtle` | "#f8effc" | "#551674" | locked |
| `bg/disabled` | "#e1e4e3" | "#2b2d2c" | locked |
| `text/default` | "#111312" | "#edefee" | locked |
| `text/muted` | "#535d58" | "#b0b9b5" | locked |
| `text/subtle` | "#86938d" | "#86938d" | locked |
| `text/disabled` | "#c3c9c6" | "#535d58" | locked |
| `text/inverse` | "#ffffff" | "#111312" | locked |
| `text/brand/primary` | "#4daa57" | "#aedab2" | themable |
| `text/on-brand` | "#ffffff" | "#ffffff" | locked |
| `text/success` | "#217f39" | "#76db90" | locked |
| `text/caution` | "#704234" | "#c49890" | locked |
| `text/warning` | "#a25f00" | "#ffb246" | locked |
| `text/error` | "#da002a" | "#ffa0b2" | locked |
| `text/info` | "#0059b9" | "#8bc3ff" | locked |
| `text/progress` | "#af52de" | "#cc91ea" | locked |
| `border/default` | "#e1e4e3" | "#303230" | locked |
| `border/darkmode-divider` | "#ffffff" | "#303230" | locked |
| `border/subtle` | "#edefee" | "#2b2d2c" | locked |
| `border/strong` | "#b0b9b5" | "#86938d" | locked |
| `border/inverse` | "#ffffff" | "#111312" | locked |
| `border/disabled` | "#e1e4e3" | "#2b2d2c" | locked |
| `border/brand/primary` | "#4daa57" | "#77c27f" | themable |
| `border/focus` | "#111312" | "#edefee" | themable |
| `border/success` | "#34c759" | "#54d274" | locked |
| `border/success-subtle` | "#bbedc7" | "#185a28" | locked |
| `border/caution` | "#996c61" | "#ae8278" | locked |
| `border/caution-subtle` | "#e3d1cc" | "#5c2e1f" | locked |
| `border/warning` | "#ff9500" | "#ffa82e" | locked |
| `border/warning-subtle` | "#ffd8a2" | "#744400" | locked |
| `border/error` | "#ff2d55" | "#ff5374" | locked |
| `border/error-error` | "#ffc6d1" | "#a4001f" | locked |
| `border/info` | "#007aff" | "#2e92ff" | locked |
| `border/info-subtle` | "#b9dbff" | "#00438b" | locked |
| `icon/default` | "#111312" | "#edefee" | locked |
| `icon/muted` | "#535d58" | "#b0b9b5" | locked |
| `icon/subtle` | "#86938d" | "#86938d" | locked |
| `icon/disabled` | "#c3c9c6" | "#535d58" | locked |
| `icon/inverse` | "#ffffff" | "#111312" | locked |
| `icon/brand/primary` | "#469b4f" | "#aedab2" | themable |
| `icon/on-brand` | "#ffffff" | "#ffffff" | locked |
| `icon/success` | "#2ba349" | "#54d274" | locked |
| `icon/caution` | "#85574a" | "#ae8278" | locked |
| `icon/warning` | "#d17a00" | "#ffa82e" | locked |
| `icon/error` | "#f5002f" | "#ff5374" | locked |
| `icon/info` | "#006fe8" | "#2e92ff" | locked |
| `icon/progress` | "#9828d1" | "#be71e4" | locked |
| `radius/none` | 0 | 0 | locked |
| `radius/xs` | 2 | 2 | locked |
| `radius/sm` | 4 | 4 | locked |
| `radius/md` | 8 | 8 | locked |
| `radius/lg` | 12 | 12 | locked |
| `radius/xl` | 16 | 16 | locked |
| `radius/brand` | 20 | 20 | locked |
| `radius/2xl` | 24 | 24 | locked |
| `radius/3xl` | 32 | 32 | locked |
| `radius/full` | 9999 | 9999 | locked |
| `space/none` | 0 | 0 | locked |
| `space/2xs` | 2 | 2 | locked |
| `space/xs` | 4 | 4 | locked |
| `space/sm` | 8 | 8 | locked |
| `space/md` | 12 | 12 | locked |
| `space/lg` | 16 | 16 | locked |
| `space/xl` | 20 | 20 | locked |
| `space/2xl` | 24 | 24 | locked |
| `space/3xl` | 32 | 32 | locked |
| `space/4xl` | 48 | 48 | locked |
| `space/5xl` | 64 | 64 | locked |
| `font/family` | "IBM Plex Sans Arabic" | "IBM Plex Sans Arabic" | locked |
| `font/weight/regular` | 400 | 400 | locked |
| `font/weight/medium` | 500 | 500 | locked |
| `bg/brand/lightest` | "#d6edd9" | "#387c3f" | themable |
| `bg/brand/lightest-hover` | "#aedab2" | "#469b4f" | themable |
| `bg/brand/lightest-pressed` | "#77c27f" | "#4daa57" | themable |
| `bg/brand/darkest` | "#387c3f" | "#4daa57" | themable |
| `bg/brand/darkest-hover` | "#2a5d2f" | "#77c27f" | themable |
| `bg/brand/darkest-pressed` | "#1c3e20" | "#469b4f" | themable |
| `bg/brand/primary-subtle` | "#fafdfb" | "#1c3e20" | themable |
| `radius/default` | 20 | 20 | locked |
| `bg/brand/accent-50` | "#fafdfb" | "#1c3e20" | themable |
| `bg/brand/accent-100` | "#e4f3e5" | "#2a5d2f" | themable |
| `bg/brand/yellow` | "#fcee21" | "#fdf149" | themable |
| `bg/brand/yellow-subtle` | "#fffdeb" | "#333001" | themable |
| `border/brand/subtle` | "#d6edd9" | "#387c3f" | themable |
| `border/brand/muted` | "#aedab2" | "#469b4f" | themable |
| `border/brand/accent` | "#77c27f" | "#4daa57" | themable |
| `border/brand/darkest` | "#387c3f" | "#aedab2" | themable |
| `text/brand/darkest` | "#387c3f" | "#77c27f" | themable |
| `icon/brand/darkest` | "#387c3f" | "#77c27f" | themable |
| `border/progress` | "#af52de" | "#be71e4" | locked |
| `border/progress-subtle` | "#e9d0f6" | "#551674" | locked |
| `font/size/9` | 9 | 9 |  |
| `font/size/10` | 10 | 10 |  |
| `font/size/11` | 11 | 11 |  |
| `font/size/12` | 12 | 12 |  |
| `font/size/13` | 13 | 13 |  |
| `font/size/14` | 14 | 14 |  |
| `font/size/16` | 16 | 16 |  |
| `font/size/18` | 18 | 18 |  |
| `font/size/20` | 20 | 20 |  |
| `font/size/22` | 22 | 22 |  |
| `font/size/24` | 24 | 24 |  |
| `font/size/28` | 28 | 28 |  |
| `font/size/32` | 32 | 32 |  |
| `font/size/36` | 36 | 36 |  |
| `font/size/40` | 40 | 40 |  |
| `font/size/48` | 48 | 48 |  |
| `font/size/56` | 56 | 56 |  |
| `font/size/64` | 64 | 64 |  |
| `font/size/72` | 72 | 72 |  |
| `font/line-height/9` | 13.5 | 13.5 |  |
| `font/line-height/10` | 15 | 15 |  |
| `font/line-height/11` | 16.5 | 16.5 |  |
| `font/line-height/12` | 18 | 18 |  |
| `font/line-height/13` | 19.5 | 19.5 |  |
| `font/line-height/14` | 21 | 21 |  |
| `font/line-height/16` | 24 | 24 |  |
| `font/line-height/18` | 27 | 27 |  |
| `font/line-height/20` | 30 | 30 |  |
| `font/line-height/22` | 33 | 33 |  |
| `font/line-height/24` | 36 | 36 |  |
| `font/line-height/28` | 42 | 42 |  |
| `font/line-height/32` | 48 | 48 |  |
| `font/line-height/36` | 54 | 54 |  |
| `font/line-height/40` | 60 | 60 |  |
| `font/line-height/48` | 72 | 72 |  |
| `font/line-height/56` | 84 | 84 |  |
| `font/line-height/64` | 96 | 96 |  |
| `font/line-height/72` | 108 | 108 |  |
| `font/weight/semibold` | 600 | 600 |  |
| `font/weight/bold` | 700 | 700 |  |
