---
name: syntropy
description: Entry point and router for Syntropy, the Safqah (صفقة) design system, and the one command to remember, /syntropy in Claude Code or a message starting with "syntropy:" in other agents. Use for any Safqah or Syntropy design, UI, UX, screen, flow, component, token, icon, copy, RTL Arabic layout, accessibility, research or review request, even if no skill is named. Four modes from the first word. A bare call or a request runs the intake interview (six questions, one per message, skipping answered ones), then brief, research, options, design, self-review and handoff. "research <topic>" runs reference research. "review <link, image or code>" runs a UX review. "explain <component, token, pattern or rule>" gives a short exact answer. Quick questions get a direct answer. Holds the 15 non-negotiables (Syntropy components and semantic tokens only, brand green bg/brand/primary, RTL first, Western digits, minimal copy, AA contrast, one primary action, disclosure, no dark patterns) and routes to every syntropy skill.
---

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
