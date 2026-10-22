# Template: Options memo (Design, low fidelity)

A one-page comparison of 2-3 meaningfully different approaches before hi-fi, each assembled from Syntropy patterns and components. Also the place to justify a new component. Feature and Flow tracks.

## Rules
1. 2-3 options that differ in approach (where, when, how), not in colour or copy.
   Why: three versions of the same idea is one option.
2. Each option starts from a Syntropy pattern (see syntropy-patterns) and lists components by exact name and variant values (see syntropy-components).
   Why: reuse before inventing; the memo becomes the handoff component list.
3. Each option states its metric hypothesis against the primary and guardrail metrics.
   Why: options are compared on the problem, not on taste.
4. Each option lists compliance, RTL, accessibility and effort risks.
   Why: the cheapest time to kill a risky option is now.
5. End with one recommendation and why; the person decides.
   Why: a memo without a recommendation pushes the work back.
6. A new component needs the three answers (below) and a design system backlog ticket. Without them, use an existing component or a variant.
   Why: P2 and M1, one component, one purpose.

## Template
```
# Options: [project]
- Problem (copied):
- Primary / guardrail metrics (copied):
- Starting pattern:

## Option A: [name]
- What: (one paragraph, where and when it appears)
- Components: (exact names, variants)
- Metric hypothesis: (why primary moves, why guardrail holds)
- Risks: compliance / RTL / accessibility / effort
- Sketch: (link)

## Option B: [name]
...

## Option C: [name] (optional)
...

## Comparison
| | A | B | C |
|---|---|---|---|
| Solves the problem | | | |
| Reuses Syntropy | | | |
| Guardrail risk | | | |
| Compliance risk | | | |
| Effort | | | |

## Recommendation
(Which, why, what we would test.)

## New component request (only if needed)
1. What job does it do that nothing else does?
2. Why does no existing component or variant fit? (name the ones checked)
3. Who else will use it? (at least one other screen)
- DS backlog ticket:
```

## Example: reinvest after payout
- Pattern: payouts (see syntropy-patterns), plus wallet and cash-out.
- Safqah rule: suggest reinvesting at payout time, never as a blocker or "are you sure" wall on the cash-out screen.

| | A: payout detail suggestion | B: sheet after payout notification | C: wallet section |
|---|---|---|---|
| What | Under the payout summary, a `Section` «استثمر مبلغك من جديد» with `Reinvest / RecommendationCard` | Opening the payout notification shows a `BottomSheet` with `Reinvest / MaturityRecap` and `Reinvest / RecommendationList` | Wallet home shows a `Section` with `Reinvest / RecommendationCarousel` while returned cash sits in the wallet |
| Primary action | `Button` `Variant=primary` «استثمر الآن»; withdrawing stays one tap away | Primary «عرض الفرص», secondary «لاحقًا» | Card tap opens the deal page |
| Guardrail risk | Low | Medium (interrupts; must close easily) | Low |
| Compliance | Projected return labelled «نسبة العائد المتوقع», risk line on the deal page | Same, plus no urgency copy | Same |
| Effort | Low | Medium | Low |
| Recommendation | Start with A; test B only if A's tap rate is low | | Keep as follow-up |

Anti-example: a new "ReinvestHeroCard" component that looks like `CardDeal`. Fails the three answers: `CardDeal` and the `Reinvest / *` family already do the job.

## Sources
- Notion: 03 Design (2-3 approaches, flag new components) `3481a53e-1a6b-8198-b225-d2b8958dabde`.
- Repo knowledge: `ux/principles.md` (P2, M1), `research/recipes.md` (reinvest at payout time), `patterns/README.md`.
