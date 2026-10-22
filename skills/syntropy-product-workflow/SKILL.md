---
name: syntropy-product-workflow
description: Guides a Safqah product owner, PM or engineer and their agent from an idea to a handed-off, measurable design, following Safqah's five-phase UX lifecycle (Discover, Define, Design, Deliver, Measure) and the Syntropy design system. Use after the /syntropy intake interview for anything bigger than a quick question, and when someone says "I want to add", "plan a new flow", "new feature", "redesign", "brief", "problem statement", "success metric", "what should we track", "Mixpanel events", "acceptance criteria", "ticket", "handoff", "design review", "usability test", "post-launch review", "open a PR". Sizes the process (Quick, Feature, Flow), never lets money or regulated flows skip Define, requires a success metric and Mixpanel events before design, reuses Syntropy components and patterns, designs every state RTL first, and ends in a handoff with Figma links, components and tokens, states, Arabic and English copy, events and acceptance criteria. Triggers: Safqah, Syntropy, صفقة, UX lifecycle, product workflow.
---

# Syntropy product workflow

## Purpose
Take a Safqah idea (a button, a screen, a whole journey) through the right amount of process so it ships as a Syntropy design that solves a stated problem and can be measured. Size the process to the task, produce each lifecycle artifact from the templates in `references/`, and call the specialist Syntropy skills at the step where each one is needed.

## Hard rules
1. **Size the process before doing anything.** Classify the request as Quick, Feature or Flow with the sizing table below, say which track you chose and why in one line, and run only that track's steps.
   Why: a copy fix with a research plan wastes a week; a new money flow without one ships the wrong thing beautifully.
2. **Never skip Define for money or regulated flows.** Anything that moves, shows or commits money (invest, reserve, pay, cash-out, reinvest, payouts, fees, returns, zakah amounts) or touches CMA, Sharia or PDPL obligations gets at least a problem statement, a primary metric, a guardrail and a compliance check, even on the Quick track.
   Why: Compliance rejecting a design in week 6, or a misleading return label, costs more than one hour of Define.
3. **Every Feature and Flow names its success metric and its Mixpanel events before design starts.** One primary metric, at least one guardrail, each with baseline and target (write `baseline: TBD, pull from Mixpanel` rather than inventing a number), and a draft event spec in `object_action` snake_case.
   Why: tracking specified after design is built wrong or not at all, and the Measure phase goes blind.
4. **Reuse Syntropy before inventing.** Start from a pattern (see syntropy-patterns), then existing components and variants (see syntropy-components). A new component is proposed only with the three answers in `references/options-memo.md` (what job, why no existing component or variant fits, who else needs it) and a design system backlog ticket.
   Why: one component, one purpose (P2); look-alikes never receive library updates.
5. **One primary action per screen.** One `Button` `Variant=primary`; the escape is `Variant=secondary` or `Variant=text` at the same `Size`.
   Why: two primaries make people read both labels and pick neither.
6. **Design all states.** Default, empty, loading (`Skeleton`), error, success, disabled, permission denied, offline, plus the money edge cases (zero balance, amount above limit, below minimum, fee present, partial or late payout).
   Why: the happy path alone is the most common handoff failure.
7. **RTL first.** Arabic RTL is the canonical layout; English LTR is designed in the same pass, never "mirrored later". Copy is Arabic first, Western digits, currency after the amount: `1,250.00 ر.س`, `1,250.00 SAR`.
   Why: Arabic is the primary experience; RTL bolted on at the end is where parity fails.
8. **Self-review before handoff.** Run the eight design-review lenses (`references/design-review.md`) with syntropy-ux-review, fix or log every finding, then run the handoff checklist.
   Why: catching your own normalised mistakes is cheaper than a review round.
9. **A handoff is complete only with all six parts:** Figma links (RTL and LTR frames, prototype), components and tokens list with exact names and variant values, states per screen, final Arabic and English copy, the Mixpanel event spec, and acceptance criteria in Given/When/Then. Missing any part means handoff waits.
   Why: engineers map names one to one to Widgetbook and test against the criteria.
10. **Never invent evidence or sign-offs.** No made-up baselines, findings, quotes or approvals. Mark unknowns `TBD` with an owner. Sign-off boxes are ticked by people, not by the agent.
    Why: a fabricated baseline makes the post-launch verdict a lie.
11. **Never merge your own PR and never push to `main`.** Branch, open a small PR with the design checklist, request review (see `references/working-with-git.md`).
    Why: review is the last gate before production.
12. **Push back proportionately, then offer the fast path.** When someone asks to skip a gate, explain the one risk it creates in one or two sentences and offer the lightest version of that gate (for example a 30-minute Define-lite instead of a study).
    Why: refusing outright stalls the work; complying silently ships risk.
13. **Write to Safqah conventions.** No em dash character, exact token names (`bg/brand/primary`, `space/lg`), exact component names (`CardDeal`, `BottomSheet`), and never reference or link work-in-progress areas of the Figma file; only design system pages and the person's own linked files.
    Why: agents and people copy names verbatim.

## Sizing: pick the track

| Signal | Quick | Feature | Flow |
|---|---|---|---|
| Scope | Copy, one state, one variant swap, spacing or token fix on an existing screen | A new section, card, button, sheet or screen inside an existing journey | A new multi-screen journey, or a redesign of one |
| Screens touched | 1 | 1-3 | 4 or more |
| Money or regulated | No (if yes, add Define-lite) | Possibly | Usually |
| New component needed | No | Maybe (flag it) | Likely (flag it) |
| Changes a funnel step with a metric | No | Yes | Yes, several |
| Typical time | Hours to 2 days | 1-3 weeks | 3-8 weeks |
| Examples | Fix «نسبة صافي العائد» label; add a loading `Skeleton` to the wallet; dark mode contrast fix | Reinvest prompt after a payout; distributions section on the deal page; withdraw fee line | Zakah calculator; account recovery; first investment journey; goal center |

Escalation: if a Quick task turns out to touch money, regulated copy or a tracked funnel step, upgrade it (Quick becomes Quick plus Define-lite; Feature with a new journey becomes Flow) and say so.

## Workflow

### Step 0. Receive the intake
The /syntropy intake interview (one question per message) hands you six answers: what is being made (new screen, new flow, change to something live, review, explanation); who it is for (retail investor, qualified investor, developer or issuer, internal team); where it lives (app compact, app regular, web, back-office); the job and how we will know it worked (metric or Mixpanel event); what exists (Figma link, screenshot, ticket, nothing); and what is at stake (money movement, personal data, regulated disclosure, deadline, none). If an answer that matters is missing, ask for it, one question per message, then proceed. Restate the brief in five lines and get a confirmation. Restate the request as a problem, not a solution ("add a reinvest button" becomes "investors who receive a payout see no next step for that cash besides withdrawing"). "Money movement" or "regulated disclosure" at stake means rule 2 applies.

### Step 1. Size it
Use the sizing table. State the track. Open `references/lifecycle.md` for phase owners, time boxes and definition of done.

### Quick track: brief, design, review
1. **Mini brief** (`references/brief.md`, Quick section, 5-8 lines): problem in one sentence, screen, what changes, states affected, copy AR/EN, metric or event affected (or "none, cosmetic"). Money or regulated: add Define-lite (problem statement sentence, primary metric, guardrail, compliance check with syntropy-compliance-ux).
2. **Design**: reuse the existing screen's components; check tokens with syntropy-foundations, copy with syntropy-content, mirroring with syntropy-rtl-arabic. Build in Figma with syntropy-figma or in code with syntropy-code-adapters.
3. **Review**: self-review with syntropy-ux-review on the changed screen in RTL and LTR, Light and Dark; run the Syntropy lint on changed code or copy when available. Produce a ticket in the Safqah format (`references/acceptance-criteria.md`). If code changes, open a PR (`references/working-with-git.md`).

### Feature track: problem statement, research, options, design, review, handoff
1. **Problem statement** (`references/problem-statement.md`): the one sentence, 1-3 metrics with baseline and target, "success looks like", out of scope. Draft the event spec now (`references/mixpanel-event-spec.md`).
2. **Research, sized**: desk research first (`references/research-plan.md`, desk section): Mixpanel funnel for the step, support tickets, past findings, and references via syntropy-inspiration. Primary research only if desk research cannot answer.
3. **Options** (`references/options-memo.md`): 2-3 meaningfully different approaches, each built from a pattern (syntropy-patterns) and named components (syntropy-components), with metric hypothesis, compliance and RTL risk, and a recommendation.
4. **Design**: hi-fi of the chosen option, RTL and LTR, every state (rule 6). Tokens via syntropy-foundations, copy via syntropy-content, mirroring via syntropy-rtl-arabic, accessibility via syntropy-accessibility, disclosures via syntropy-compliance-ux. Build with syntropy-figma or syntropy-code-adapters.
5. **Review**: self-review with the eight lenses, then a design review with PM and eng lead (`references/design-review.md`).
6. **Handoff** (`references/handoff.md`) with acceptance criteria (`references/acceptance-criteria.md`) and the final event spec. Book the post-launch review (`references/post-launch-review.md`) for 2-4 weeks after launch.

### Flow track: full lifecycle with usability test plan
1. **Discover**: research intake framing (the decision this informs), research plan (`references/research-plan.md`), desk research, primary research if needed, findings (3-7, each with 2 data points).
2. **Define**: problem statement locked with UX, PM and eng lead sign-off boxes (left unticked by you); design brief (`references/brief.md`, full section) with constraints mapped: CMA/Sharia/PDPL (syntropy-compliance-ux), Flutter or Angular, business, accessibility (WCAG 2.2 AA, 48 pt targets in the app and never below 44x44 pt, 200% text), brand. Event spec drafted. Definition review (30 min).
3. **Design**: low-fi options memo (2-3 approaches), first design review (pressure test), hi-fi RTL and LTR with Syntropy only, clickable prototype of the critical path, usability test plan (`references/usability-test-plan.md`, 5 participants from the segment, Arabic RTL first), iterate on findings, final design review.
4. **Deliver**: handoff doc and checklist (`references/handoff.md`), acceptance criteria per screen, event spec final, PR or tickets (`references/working-with-git.md`), design QA with the Widgetbook parity checklist (`references/data/ux/checklists/widgetbook-parity.md`), events verified in Mixpanel Live View before launch.
5. **Measure**: post-launch review at 2 weeks of data (`references/post-launch-review.md`), decision (keep, iterate, roll back, wait), new questions back to Discover.

### Worked example: "I want to add a reinvest button after payout" (Feature)
1. Track: Feature, money flow, so Define is mandatory. Say so in one line.
2. Problem: «Investors who receive a payout are trying to decide what to do with the cash, but the payout screen shows no next step besides withdrawing, which matters to Safqah because returned capital that leaves the platform is lost investment volume.»
3. Metrics: primary = share of payout detail viewers who invest within 7 days (baseline `TBD, pull from Mixpanel`); guardrails = cash-out completion does not drop, cash-out tickets do not rise; leading = reinvest prompt tap rate.
4. Events (draft): `payout_detail_viewed`, `reinvest_prompt_viewed`, `reinvest_recommendation_tapped`, and `source=reinvest` on the existing investment event; check Lexicon first.
5. Desk research: payout to next-investment funnel, tickets about payouts, benchmarks via syntropy-inspiration.
6. Options: A suggestion on payout detail (`Section` + `Reinvest / RecommendationCard`), B `BottomSheet` after the payout notification, C wallet `Reinvest / RecommendationCarousel`. Recommend A. Never block or slow the cash-out screen.
7. Design A in RTL and LTR with every state (no open deals: hide the section; loading: `Skeleton`; offline), projected return labelled «نسبة العائد المتوقع».
8. Self-review, design review, handoff with acceptance criteria and the event spec, post-launch review booked.

### Worked example: "Plan a new zakah calculator flow" (Flow)
Discover: frame the decision, desk research (tickets about zakah, benchmarks), interviews only if the method question is open. Define: problem statement, primary metric (starters reaching a result), guardrails (tickets, input errors), constraints (Sharia method approved and explained, Hijri due dates per R5, Gregorian for payouts, amounts with two decimals, no PII in events), design brief. Design: options memo, hi-fi RTL and LTR, prototype, usability test plan with 5 Arabic-speaking investors who pay zakah, two reviews. Deliver: handoff, tickets per screen, event spec (`zakah_calculator_opened`, `zakah_calculated`, `zakah_method_viewed`). Measure: review at 2 weeks of data.

## Which skill at which step

| Step | Call | For |
|---|---|---|
| Research, references, competitors | syntropy-inspiration | Benchmarks, Mobbin/Refero/Lazyweb searches, translating references into Syntropy |
| Choosing the screen structure | syntropy-patterns | The universal screen recipe and the pattern for the job (deal page, invest and reserve, wallet and cash-out, payouts, goals, empty states, errors, forms) |
| Picking components and variants | syntropy-components | Exact names, variant values, booleans, when to use which |
| Colour, type, space, radius, shadow, dark mode | syntropy-foundations | Semantic tokens and text styles |
| Copy, labels, errors, numbers, currency | syntropy-content | Voice and tone, glossary, «نسبة» rule, copy lengths |
| Mirroring, bidi, Hijri vs Gregorian | syntropy-rtl-arabic | R1-R5, directional icons, mixed strings |
| Contrast, targets, screen readers, focus | syntropy-accessibility | WCAG 2.2 AA checks |
| Disclosures, fees, risk, consent, anti-pressure | syntropy-compliance-ux | CMA, Sharia, SAMA benchmark, PDPL |
| Self-review and design review | syntropy-ux-review | Heuristics, fintech heuristics, dark patterns, states, review format |
| Building in Figma | syntropy-figma | Instancing, binding, paint audit |
| Building in code (Flutter, Angular, web) | syntropy-code-adapters | Token and component mapping in code |

## Decision tables

### Need X, use Y, not Z
| Need | Use | Not |
|---|---|---|
| Idea arrives as a solution ("add a progress bar") | Rewrite as a problem statement first | Designing the progress bar |
| Do we need research? | Desk research first (Mixpanel, tickets, past findings, benchmarks) | Interviews by default |
| Validate a non-trivial flow | Usability test, 5 participants from the segment, Arabic RTL | Testing with coworkers |
| A success metric | Scoped, measurable, directional, with baseline and target ("reinvest rate within 7 days of payout") | "Users feel confident", "increase MAU" |
| Name an event | `object_action`, past tense, snake_case (`payout_received`, `reinvest_started`) | `ReinvestClick`, `safqah_reinvest`, `btn_tap_3` |
| A card for a deal | `CardDeal` with its `State` and `Layout` variants | A new custom card |
| A reinvest suggestion | `Reinvest / RecommendationCard` or `Reinvest / RecommendationList` at payout time | A blocker or "are you sure" wall on the cash-out screen |
| A page-level message | One `Banner` or one inline `Alert` | Several alerts and toasts stacked |
| Loading | `Skeleton` | A spinning brand logo |
| A confirm step for money | `BottomSheet` with `Sheet Content / Summary` and one primary `Button` | A `Dialog` with two primaries |
| A time limit on reserving | `ReservationTimer` or `Countdown` only when a real hold exists | A fake countdown to push investing |
| A ticket for engineering | `## Description` + `## Figma` + `## Acceptance criteria` (Given/When/Then checkboxes) | A long PRD pasted into the ticket |
| Shipping code from a PO's agent | Branch `feat/<area>-<thing>`, small draft PR, reviewer assigned | Pushing to `main` or merging your own PR |

### Track by example
| Request | Track | Why |
|---|---|---|
| "Change «العائد» to «نسبة العائد المتوقع» on the deal card" | Quick plus Define-lite | Return label on a money screen: compliance check, no research |
| "Add a reinvest button after payout" | Feature | New action in the payout journey; money; needs metric, events, options |
| "Plan a new zakah calculator flow" | Flow | New multi-screen journey with money amounts and Hijri dates |
| "Write acceptance criteria for the withdraw screen" | Deliver step only | Use the ticket format; confirm states and fee rules exist first |
| "What events should we track for the deal page?" | Define step only | Event spec against the deal page metrics |
| "The empty wallet looks broken" | Quick (or Feature if new copy and illustration logic) | One state on one screen |

## Self-check before answering
- [ ] I stated the track (Quick, Feature, Flow) and why, in one line.
- [ ] The problem is written as a problem, not a solution.
- [ ] Money or regulated: Define (or Define-lite) is present with primary metric, guardrail and compliance check.
- [ ] Feature or Flow: success metrics have baseline and target (or `TBD` with owner), and a draft event spec exists before design.
- [ ] Every component and token name is exact (checked with syntropy-components and syntropy-foundations, or the patterns in `references/data/patterns/`); direction follows the locale and is never set by hand; any new component is flagged with the three answers.
- [ ] One primary action per screen.
- [ ] All states listed: default, empty, loading, error, success, disabled, permission denied, offline, plus money edge cases.
- [ ] RTL and LTR both covered; Arabic copy first, Western digits, currency after the amount.
- [ ] Handoff (if reached) has all six parts: Figma links, components and tokens, states, AR/EN copy, events, acceptance criteria.
- [ ] No invented baselines, findings or sign-offs; unknowns marked `TBD`.
- [ ] No em dash character; no reference to work-in-progress Figma areas.
- [ ] If asked to skip a gate or merge a PR, I pushed back in one or two sentences and offered the light version.

## References

| File | Open when |
|---|---|
| `references/lifecycle.md` | Sizing the work; phase owners, time boxes, gates and definition of done |
| `references/brief.md` | Writing a Quick mini brief or a full design brief |
| `references/problem-statement.md` | Framing the problem and success metrics (Define) |
| `references/research-plan.md` | Planning desk or primary research and writing findings (Discover) |
| `references/options-memo.md` | Comparing 2-3 approaches, or justifying a new component |
| `references/design-review.md` | Self-review and design review with the eight lenses |
| `references/usability-test-plan.md` | Planning a usability test for a Flow |
| `references/handoff.md` | Preparing the handoff doc and running the handoff checklist |
| `references/acceptance-criteria.md` | Writing Given/When/Then criteria and the Safqah ticket |
| `references/mixpanel-event-spec.md` | Naming events and properties; the per-feature spec and Live View verification |
| `references/post-launch-review.md` | The Measure write-up 2-4 weeks after launch |
| `references/working-with-git.md` | Branching, committing and opening a PR as a PO's agent |
| `references/data/ux/lifecycle/*.md` | Full source templates (generated copies) when the condensed version is not enough |
| `references/data/ux/checklists/handoff.md` | The full handoff gate checklist (generated copy) |
| `references/data/ux/checklists/widgetbook-parity.md` | Design QA of the build against Figma (generated copy) |
| `references/data/ux/principles.md` | Design principles P1-P7, V1-V6, M1-M6 when choosing between options or adding a component |
| `references/data/patterns/README.md` | Universal screen recipe and pattern index (generated copy) |

## Sources
- Notion: UX Process & Lifecycle, `3481a53e-1a6b-8111-9a92-c79e0ac0c3e2`, and its phase pages and templates (ids in each reference file).
- Repo knowledge: `ux/lifecycle/`, `ux/checklists/`, `ux/principles.md`, `patterns/README.md`, `content/numbers-currency.md`, `content/glossary.md`, `ux/compliance/README.md`.
