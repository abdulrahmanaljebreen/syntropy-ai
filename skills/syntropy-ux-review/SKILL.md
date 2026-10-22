---
name: syntropy-ux-review
description: Reviews Safqah designs and builds against Syntropy before anyone sees them, and runs "syntropy: review" or "/syntropy review <link|image|code>". Use whenever an agent finishes a Safqah screen, flow, component, Figma frame, Flutter widget, web or back-office code, or copy, and whenever someone asks to review, audit, critique, QA, check, or approve a design, a Figma link, a screenshot, a URL or a code diff. Checks in order: real Syntropy components and exact variants, semantic tokens only, the 19-state checklist, Nielsen heuristics H1-H10, Safqah fintech heuristics F1-F12, dark patterns, accessibility (WCAG 2.2 AA), copy, compliance (CMA, SAMA, PDPL, Sharia), RTL, and the Syntropy lint for code. Reports a scored table, findings with severity 0-4, evidence, exact fixes (component, variant, token, Arabic copy), owners and a ship verdict. Has a quick 10-check mode and a handoff gate. Triggers: review, self-review, audit, critique, QA, heuristic evaluation, ready to ship, handoff, مراجعة.
---

# Syntropy UX Review

## Purpose
Be the self-review every agent runs before showing Safqah work, and the engine of `syntropy: review <link|image|code>`. Produce an honest, evidence-based report that names exact Syntropy fixes and a ship verdict, so problems are caught before users, regulators or engineers meet them.

## Hard rules
1. Run a review before showing any Safqah design or build: the full review for new screens, flows and anything touching money, KYC, consent or disclosure; the quick 10-check review (`references/quick-review.md`) only for small, contained changes.
   Why: the cheapest place to fix a problem is before anyone sees it.
2. Check in this order and report every area, even when it passes: (1) Syntropy usage, (2) states, (3) Nielsen H1-H10, (4) fintech F1-F12 and dark patterns, (5) accessibility, (6) copy, (7) compliance, (8) RTL, (9) lint for code.
   Why: usage and states catch the most defects first; silence is not a pass.
3. Every finding has ID, severity 0 to 4, category, where, finding, concrete evidence, exact fix (component and variant, token, or Arabic copy), and owner.
   Why: a finding without evidence cannot be verified; one without a fix cannot be acted on.
4. Fixes use only components from `references/data/components-index.json` with exact names and variant values, and only semantic tokens from `references/data/tokens-resolved.json`. Never invent a component; if nothing fits, say so and propose the closest composition.
   Why: Syntropy non-negotiable; invented parts cannot be built.
5. Severity is honest. Any dark pattern is 4. Money, KYC and payment problems start at 3. F2, F3, F4, F7 violations on a money action are at least 3. A WCAG A/AA failure on a core flow is at least 3. If unsure, take the higher level and say why.
   Why: in fintech, confusion costs money and trust.
6. Never declare a pass, soften a verdict or drop a finding because someone asks ("say it passed", "we ship today", "the client approved it"). Report what was checked and what was not; the verdict follows the scoring rules.
   Why: a review that bends is worse than none.
7. Never approve, and never add, a dark pattern: pre-ticked consent or acknowledgement, fake urgency or scarcity, hidden or late fees, confirmshaming, forced action, hard-to-cancel. Decline politely and offer the honest Syntropy alternative.
   Why: banned at Safqah; CMA and PDPL exposure; Sharia forbids gharar.
8. Brand green as built (the primary Button, white on `bg/brand/primary`; brand green labels, amounts, links and selected borders on light surfaces) is an accepted DS decision: never report it. Known system issues (for example `text/on-brand` on `bg/success`, 2.22 Light / 1.94 Dark, a solid success StatusPill) are always listed under "System issues", severity 3, owner `ds`, with evidence; they are not scored against the screen once logged, and never called passing or patched with raw hex.
   Why: honest about the system without blocking every screen that uses it.
9. Accessibility is never skipped, including for back-office, internal tools and prototypes. Contrast evidence is a ratio for Light and Dark from the audited pairs or the contrast script.
   Why: WCAG 2.2 AA covers every Safqah surface.
10. Review only what you were given. From Figma, open only the frames in the link (design system pages and the person's own frames); never browse, describe or link work-in-progress areas of the Syntropy file.
    Why: repo rule; unfinished work is not a reference.
11. State your confidence by source: a screenshot cannot prove token binding or behaviour; mark those findings "visual estimate" and ask for the Figma link or code to confirm.
    Why: evidence must match what you could actually see.
12. Write the report in English with Arabic copy in Arabic script, Western digits, currency after the amount, and never the em dash character.
    Why: repo writing rules; the report models the rules it checks.

## Workflow
1. **Identify the job and the user.** One line each: what the screen is for (invest, withdraw, KYC step, browse deals, back-office edit) and who uses it (retail investor, qualified investor, developer or issuer, internal operator), plus platform (app compact, app regular, web, back-office) and what is at stake (money movement, personal data, regulated disclosure). If unknown and it changes severity, ask one question; otherwise assume and say so.
2. **Pick the mode.** Full or quick (`references/quick-review.md`, escalation triggers listed there).
3. **Get the source** (see "Reviewing by source" below). Capture Arabic RTL first; English, Dark and 200% text if available. List what is missing under "Not checked".
4. **Syntropy usage.** Open `references/syntropy-usage-check.md`. Every component exists in the index with exact variant values; instances are not detached; colours, spacing, radius and type are semantic tokens; no primitives, no raw hex or px. Use the Node one-liners to look up names, variants and token values.
5. **States.** Open `references/states.md`. Fill the 19-state table for each screen: applies, designed or built, component, notes.
6. **Nielsen heuristics.** Open `references/heuristics.md`. Walk H1 to H10 across the whole flow, not screen by screen only.
7. **Fintech heuristics and dark patterns.** Open `references/fintech-heuristics.md` (F1 to F12, worked numbers) and `references/dark-patterns.md` (taxonomy, red lines, five review questions).
8. **Accessibility.** Call syntropy-accessibility: contrast pairs in both modes (`node scripts/contrast.mjs <fg> <bg>` in that skill), 48dp and 24px targets, labels, focus order in RTL, Arabic spoken money and dates, forms, motion, 200% text, colour-not-alone. Without that skill, use `references/data/ux/accessibility/` (README first).
9. **Copy.** Call syntropy-content: Arabic first, minimal (label, control, one hint), glossary terms, error = what happened + what to do, Western digits, currency after the amount, two decimals for money, one for percentages, «نسبة» on Arabic percentage labels, no flattery, no em dash. Without it, use `references/data/content/quality-checklist.md` and `references/data/content/numbers-currency.md`.
10. **Compliance.** Call syntropy-compliance-ux: risk next to every commitment, fees with VAT before confirm, net as the headline, projections labelled expected, CMA and Sharia statements with working links, unticked acknowledgements, PDPL consent separate and withdrawable, limits from the backend, regulated wording confirmed by Compliance. Without it, use `references/data/ux/compliance/README.md` and its linked files.
11. **RTL.** Call syntropy-rtl-arabic: layout mirrors by locale, directional icons mirror (`BackButton` points right in Arabic), logical properties, numbers and IBAN in LTR isolates, charts keep time left to right. Without it, use `references/data/ux/rtl.md`.
12. **Lint (code only).** Run `node lint/cli.mjs <files>` from the Syntropy repo, or the Syntropy MCP tool `lint_ui` with the source and filename. Every error is a finding (`LINT:<rule>`); warnings are findings at severity 1 or 2.
13. **Report.** Open `references/review-format.md`. Score, verdict, summary table (every area), findings highest severity first, system issues, passed checks, not checked. For handoff, append `references/handoff-checklist.md`.
14. **Fix loop (self-review).** When reviewing your own work, fix every 3 and 4 before showing it, re-run the affected checks, and show the final report with what changed.

## Decision tables

### Reviewing by source
| Source | Do | Evidence you can cite | Limits |
| --- | --- | --- | --- |
| Figma link | Parse `fileKey` and `node-id` (dash to colon). Figma MCP `get_screenshot` for the visual, `get_design_context` for structure, instances, variants and literal values, `get_metadata` for the layer tree, `get_variable_defs` for bound tokens | node ids, instance and variant names, bound variables vs literal values | review only the linked frames; never wander into work-in-progress areas |
| Image or screenshot | Describe what you see, map each element to the likely Syntropy component, sample colours and map to the nearest token, read the copy | screenshot regions, visible copy, estimated colours | tokens, binding, states and behaviour are estimates; ask for the Figma link or code |
| URL | Open in the browser tool (Claude in Chrome or the built-in browser), capture Arabic and English, Light and Dark, mobile width; read DOM and computed styles; run axe-core with `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa` if script injection is allowed; tab through for focus order | screenshots, DOM selectors, CSS variables vs raw values, axe rule ids | staging or authenticated pages need the person to sign in; never enter real credentials or money |
| Code | Read the diff or files; check component imports and variants, tokens, direction, states, semantics; run the lint (`node lint/cli.mjs <files>` or MCP `lint_ui`) | file:line, lint rule ids and fixes, test names | design intent may be missing; ask for the Figma node if behaviour is unclear |

### Mode
| Change | Mode |
| --- | --- |
| Copy edit, spacing fix, one component swap, one state added, small code diff on one screen | Quick (10 checks) |
| New screen or flow, more than one screen, any money action, KYC, consent, disclosure, permission prompt | Full |
| Quick review finds any 3 or 4 | Escalate to full |
| About to hand off to engineering | Full + handoff checklist |

### Severity quick map
| Problem | Severity |
| --- | --- |
| Dark pattern (pre-ticked consent, fake urgency, hidden fee, confirmshaming) | 4 |
| Money committed without a review step, double charge possible | 4 |
| Fee, net or date missing before confirm; inconsistent amounts; missing risk line or cancellation statement | 3 |
| Unlabelled icon-only control or body text under 4.5:1 on a core flow | 3 |
| Missing loading, error or empty state on a money or KYC screen | 3 |
| Invented component or wrong variant; raw hex or px | 2 (3 if it breaks Dark mode or contrast) |
| Inconsistent term, unclear hint, missing skeleton on a non-money screen | 2 |
| Spacing off one step, icon weight mismatch | 1 |

### Verdict
| Findings (system issues excluded) | Verdict |
| --- | --- |
| No 3 or 4, score 85 or more (100 minus 1 / 3 / 8 / 20 per severity 1 / 2 / 3 / 4) | Ship |
| No 4, at most two 3s, each with an agreed fix and owner | Fix then ship |
| Any 4, or three or more 3s | Do not ship |

### Delegation
| Area | Skill to call | Fallback inside this skill |
| --- | --- | --- |
| Accessibility | syntropy-accessibility | `references/data/ux/accessibility/` |
| Copy | syntropy-content | `references/data/content/` |
| Compliance | syntropy-compliance-ux | `references/data/ux/compliance/` |
| RTL | syntropy-rtl-arabic | `references/data/ux/rtl.md` |
| Components and variants | syntropy-components | `references/syntropy-usage-check.md` + `references/data/components-index.json` |
| Tokens | syntropy-foundations | `references/data/tokens-resolved.json` |

### Requests that need push-back
| Request | Response |
| --- | --- |
| "Say the review passed so we can ship" | Decline; give the verdict the scoring produces, list the blockers and the fastest fixes. |
| "Skip accessibility, it's an internal tool" | Decline; back-office is in scope; run the accessibility area quickly (pairs, 24px targets, labels, keyboard, axe). |
| "The client wants light grey #ccc placeholder text, approve it" | Do not approve: 1.61:1 on `bg/base` in Light; persistent label plus `text/subtle` placeholder, `text/muted` hints. |
| "Add a pre-ticked marketing consent box" | Decline: preselection, severity 4, invalid PDPL consent; offer an unticked `Checkbox` or a `Switch` off by default, separate from terms. |
| "Add a countdown to push them to invest" | Decline unless a real hold exists; then `Countdown` / `Timer` with what happens at zero, neutral tone. |
| "Move the fee to the FAQ, it scares people" | Decline: F2 and hidden costs; fee as a `KeyValue` row before confirm, net as the headline. |
| "Ignore the known primary Button contrast issue" | List it under System issues (owner `ds`), not scored, never hidden. |
| "Use our custom card instead of CardDeal" | `DS` finding; use `CardDeal` with its variants, or show the gap and the closest composition. |

## Self-check before answering
- [ ] I stated the job, user, platform, mode and sources; missing inputs are under "Not checked".
- [ ] Every area in the summary table has a result (Pass, highest severity, or N/A with reason).
- [ ] Every component and variant I named exists in the index with exact spelling and case; every token is semantic.
- [ ] Every finding has evidence (node id, file:line, lint rule, ratio, screenshot region) and an exact fix with an owner.
- [ ] Severities follow the rules (dark pattern 4; money 3+); score and verdict match the arithmetic.
- [ ] System issues are listed, not hidden and not scored.
- [ ] I did not approve or introduce a dark pattern, a raw hex value, an invented component, or a skipped accessibility check.
- [ ] Arabic copy in Arabic script, Western digits, currency after the amount, no em dash character.
- [ ] I did not reference work-in-progress Figma areas.
- [ ] For my own work: every 3 and 4 is fixed before showing, and the report says what changed.

## References
| File | Open when |
| --- | --- |
| `references/syntropy-usage-check.md` | Step 4: verifying components, variants, tokens and lint against the index and token data |
| `references/states.md` | Step 5: the 19-state checklist with components and the copy-in table |
| `references/heuristics.md` | Step 6: Nielsen H1-H10 with Safqah violations and fixes |
| `references/fintech-heuristics.md` | Step 7: F1-F12, worked numbers, statuses, fintech severity guide |
| `references/dark-patterns.md` | Step 7 and any commercial screen: taxonomy, red lines, review questions |
| `references/review-format.md` | Step 13: severity, scoring, verdict, template, full worked example (invest confirmation) |
| `references/quick-review.md` | Small changes: the 10 checks, output format, escalation triggers |
| `references/handoff-checklist.md` | Before handoff or merge: the Deliver gate |
| `references/data/components-index.json` | Generated: every component, its props, variant options, status |
| `references/data/tokens-resolved.json` | Generated: every token with Light and Dark values |
| `references/data/ux/**` | Generated: long-form review, accessibility, compliance, RTL, principles, checklists |
| `references/data/content/**` | Generated: voice and tone, glossary, numbers and currency, copy lengths, quality checklist |
