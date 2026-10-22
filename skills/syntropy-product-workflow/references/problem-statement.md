# Template: Problem statement and success metrics (Define)

The one-pager that ends Define. Every Feature and Flow has one, and Quick work on money or regulated screens has the Define-lite version. Fill it before design starts.

## Rules
1. One sentence in this exact shape: **"[User segment] is trying to [goal], but [obstacle], which matters to Safqah because [business impact]."**
   Why: forces a user, a goal, an obstacle and a reason.
2. It names a problem, not a solution.
   Why: a solution statement closes options before design.
3. 1-3 metrics, each measurable (in Mixpanel or Metabase, or instrumented before launch), directional, and scoped to the flow.
   Why: unmeasurable metrics make Measure impossible.
4. One primary and at least one guardrail; leading optional. Each has a baseline and a target. Unknown baseline: write `TBD, pull from Mixpanel (owner)`; never invent one.
   Why: no baseline, no honest verdict.
5. Sign-off boxes (UX, PM, eng lead) are ticked by those people; after all three the doc is locked.
   Why: it is the reference for Design and Measure.

## Template
```
# Problem statement: [project]
- Date:
- Track: Quick (Define-lite) / Feature / Flow
- Status: Draft / Approved / Locked for Design / Revised
- Approvers: UX [ ] · PM [ ] · Eng Lead [ ]

## Problem
> [User segment] is trying to [goal], but [obstacle], which matters to Safqah because [business impact].

## Why now
(2-3 sentences.)

## Success metrics
| Metric | Type | Baseline | Target | Source (event / report) |
|---|---|---|---|---|
| | Primary | | | |
| | Guardrail | | | |
| | Leading | | | |

## Success looks like
(2-3 sentences, the end state for the user. A vision, not a design.)

## Out of scope
-

## Evidence
(Links to findings, Mixpanel reports, tickets.)

## Events needed (draft, detail in the event spec)
-

## Compliance touchpoints (money or regulated only)
- CMA / Sharia / SAMA benchmark / PDPL items this touches:

## Sign-off (ticked by people)
- UX:      date:
- PM:      date:
- Eng Lead: date:
```

## Metric recipes for Safqah flows
| Flow | Primary | Guardrail | Leading |
|---|---|---|---|
| Reinvest after payout | Share of payouts followed by a new investment within 7 days | Cash-out complaints or tickets per 100 payouts (no increase); cash-out completion (no decrease) | Reinvest prompt tap rate |
| Zakah calculator | Share of starters who reach a calculated result | Calculator support tickets; error rate on amount inputs | Share who open the "how we calculate" explainer |
| Withdraw (cash-out) | Cash-out completion rate from screen view | Failed cash-outs per 100; fee-related tickets | Time from screen view to submit |
| Deal page | Invest start rate from deal view | Cancellations within the 48-hour window | Offering document opens per deal view |
| KYC | KYC completion rate for first-time investors | Tickets per 100 KYC attempts | Time from KYC start to submission |

A guardrail on money flows protects the user, not just the business: a reinvest prompt that lowers cash-out completion or raises complaints is a dark pattern, whatever it does to the primary.

## Examples
Good:
> "Investors who receive a payout are trying to decide what to do with the cash, but the payout screen shows no next step besides withdrawing, which matters to Safqah because returned capital that leaves the platform is the main source of lost investment volume."

> "Investors who pay zakah are trying to know how much zakah they owe on their Safqah holdings, but nothing in the app tells them which amounts count or on which Hijri date, which matters to Safqah because zakah questions are a recurring support topic and a trust signal for a Sharia-compliant platform."

| Weak | Why it fails | Fix |
|---|---|---|
| "Add a reinvest button after payout." | Solution | Use the first good example |
| "Users feel more confident." (metric) | Not measurable | "Share who complete the flow without contacting support" |
| "Increase MAU." | Not scoped | Scope to the flow's step |
| "Baseline: 30%" with no source | Invented | `TBD, pull from Mixpanel (PM)` |

## Sources
- Notion: TEMPLATE Problem Statement & Success Metrics `3481a53e-1a6b-816c-893f-f7323fe592c2`; 02 Define `3481a53e-1a6b-8105-bfa7-e50b05e9525a`.
- Full copy: `references/data/ux/lifecycle/problem-statement.md`.
