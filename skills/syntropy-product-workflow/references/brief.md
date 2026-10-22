# Template: Brief (Quick mini brief and full design brief)

The input for Design: problem, users, scope, constraints, content and references. Quick work uses the mini brief; Feature uses the full brief lightly; Flow fills every section.

## Rules
1. Copy the problem statement and metrics verbatim from the problem statement; do not reword.
   Why: one source of truth.
2. Map constraints before design: regulatory and Sharia, technical (Flutter, Angular, backend), business, accessibility, brand.
   Why: a design Compliance rejects in week 6 wastes three weeks.
3. Both languages are in scope by default: Arabic RTL first, English LTR in the same pass.
   Why: RTL is designed in.
4. Name the Syntropy pattern you start from (see syntropy-patterns).
   Why: reuse before inventing.
5. Accessibility and brand baselines below are defaults, not options.
   Why: they apply to every Safqah feature.

## Quick mini brief (5-8 lines)
```
# Mini brief: [change]
- Problem (one sentence):
- Screen and platform: (e.g. Investor App, deal page, Flutter)
- What changes: (copy / state / variant / token)
- States affected: (default, loading, empty, error, offline...)
- Copy AR / EN:
- Metric or event affected: (or "none, cosmetic")
- Money or regulated? yes/no. If yes: Define-lite done (link)
```

Example:
```
# Mini brief: return label on CardDeal
- Problem: the card labels its percentage value «العائد», which reads as money, not a ratio.
- Screen: Investor App, deal list, CardDeal metric.
- Change: label copy only.
- States: default (open, closed deals).
- Copy: «نسبة العائد المتوقع» / "Expected return"
- Event affected: none.
- Money or regulated: yes (return label). Define-lite: compliance check passed, guardrail = deal-page tickets about returns.
```

## Full design brief
```
# Design brief: [project]
- Designer / PM / Eng lead:
- Start date / target design complete:
- Track: Feature / Flow

## 1. Problem
(Problem statement and metrics, copied.)

## 2. Users
- Primary segment:
- Edge users: (qualified vs retail, first-time vs repeat, dormant, low balance, Arabic-only, screen reader)
- Discover insights: (links)

## 3. Scope
- In scope: (screens, flows, interactions)
- Out of scope:
- Dependencies: (APIs, backend fields, content, other features)

## 4. Constraints
### Regulatory / Sharia (see syntropy-compliance-ux)
- Disclosures required, wording owner, CMA rules, PDPL consent
### Technical
- Flutter (Investor App) / Angular (Developer Portal, Back-Office); data available from APIs
### Business
-
### Accessibility (defaults)
- WCAG 2.2 AA; touch targets 44x44 pt; text to 200% without breaking; screen reader labels; focus order
### Brand (defaults)
- Semantic tokens only; IBM Plex Sans Arabic; brand green via bg/brand/primary; Syntropy components wherever available

## 5. Content
- Copy owner:
- Languages: Arabic (RTL) + English (LTR)
- Glossary terms to align with (see syntropy-content):

## 6. Reference
- Starting pattern (syntropy-patterns):
- Benchmarks (syntropy-inspiration):
- Past research:

## 7. Risks and unknowns
-

## 8. Success criteria for the Design phase
- [ ] Hi-fi for all in-scope flows, RTL + LTR
- [ ] Prototype of the critical path (Flow)
- [ ] Usability test results or waiver rationale (Flow)
- [ ] Accessibility checklist completed
- [ ] Design system gaps documented with backlog tickets
- [ ] Two design reviews (Flow) / one (Feature)
```

## Examples
| Section | Good | Weak |
|---|---|---|
| Regulatory | "Show the risk line and `ShariaDisclosure` before the confirm button; fee line from the backend before submit" | "Follow compliance" |
| Scope | "In: payout detail screen reinvest suggestion. Out: auto-reinvest settings" | "Payouts" |
| Technical | "Recommendation list comes from the deals API filtered by open status; no personalised ranking yet" | Empty |
| Pattern | "Payouts pattern + `Reinvest / RecommendationCard`" | "Something like Acorns" |

## Sources
- Notion: TEMPLATE Design Brief `3481a53e-1a6b-81a5-9bb9-f2e296521323`.
- Full copy: `references/data/ux/lifecycle/brief.md`.
