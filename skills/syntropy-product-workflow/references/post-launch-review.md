# Template: Post-launch review (Measure)

The write-up 2-4 weeks after launch: what happened against what Define predicted, one decision, and new questions for Discover. Book it at launch.

## Rules
1. Book the review at launch for 2-4 weeks later; pull numbers at the 2-week mark.
   Why: "it launched, we're good" is the most common failure.
2. Judge only against the metrics, baselines and targets in the problem statement.
   Why: "usage up 40%" means nothing without baseline, segment, period and target.
3. Check guardrails as hard as the primary; a hit primary with a broken guardrail is not a success.
   Why: on money flows, guardrails protect users.
4. Blameless: diagnose, don't assign fault.
   Why: blame kills honest reporting.
5. One decision (keep, iterate, roll back, wait) and a follow-up table with owners and dates.
   Why: a review without a decision is a status update.
6. Every new question goes back to the research intake.
   Why: closes the loop.
7. Pull real numbers with source and date; if the agent cannot query Mixpanel, leave `TBD` and list the exact queries to run.
   Why: never invent results.

## Template
```
# Post-launch review: [feature]
- Launch date / review date / attendees / author

## 1. Recap
- Problem (copied):
- What we built:
- Predicted (metrics and targets):

## 2. Results
### Primary
| Metric | Baseline | Target | Actual | Status (Hit / Partial / Missed) |
|---|---|---|---|---|
### Guardrails
| Metric | Before | After | Regression? |
|---|---|---|---|
### Leading
| Metric | Direction | Notes |
|---|---|---|
### Unexpected patterns (segments, funnel shifts)

## 3. Qualitative signals (tickets, feedback, team observations)
## 4. What worked
## 5. What didn't (blameless)
## 6. What we'd do differently (process, research, design, handoff, measurement)

## 7. Decision
- [ ] Keep as is
- [ ] Iterate (follow-ups below)
- [ ] Roll back or hide behind a flag
- [ ] Needs more time: reconvene on [date]
| # | Action | Owner | Due |
|---|---|---|---|

## 8. New questions for Discover
## 9. Tags: area / segment / theme / learning type
```

## Queries to list when numbers are not available
- Primary: funnel from trigger event to outcome event, window, segment split (retail vs qualified, new vs repeat), 2 weeks before vs 2 weeks after launch.
- Guardrails: same period comparison for the guardrail events and ticket counts.
- Instrumentation sanity: event volume per day since launch; property null rates.

## Examples
| Part | Good | Weak |
|---|---|---|
| Primary | "Reinvest within 7 days of payout: baseline (from report, date) to actual; target; Partial" | "Reinvest is better" |
| Guardrail | "Cash-out completion unchanged; cash-out tickets flat" | Missing |
| Decision | "Iterate: test the post-notification sheet (owner UX, due date)" | "Monitor" |

## Sources
- Notion: TEMPLATE Post-Launch Review `3481a53e-1a6b-81e5-8d79-d027c112dc2b`; 05 Measure `3481a53e-1a6b-81fb-8298-ea91f1948bbd`.
- Full copy: `references/data/ux/lifecycle/post-launch.md`.
