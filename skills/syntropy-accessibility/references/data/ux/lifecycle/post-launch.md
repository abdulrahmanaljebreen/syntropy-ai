# Template: Post-launch review (Measure)

The write-up 2-4 weeks after launch: what actually happened versus what Define predicted, a decision (keep, iterate, roll back, wait), and new questions for Discover. Phase: Measure.

## Rules

1. Book the review at the launch meeting, for 2-4 weeks after launch. Pull numbers at the 2-week mark.
   Why: "it launched, we're good" is the most common and most damaging failure.
2. Judge only against the metrics, baselines and targets in the problem statement.
   Why: "usage is up 40%" means nothing without baseline, segment, period and target.
3. Reviews are blameless: diagnose, don't assign fault.
   Why: blame kills honest reporting.
4. Every review ends in one decision and a follow-up table with owners and due dates.
   Why: a review without a decision is a status update.
5. Every new question goes into the research intake queue.
   Why: closes the loop back to Discover.

## Template

```
# Post-launch review: [feature]

## Header
- Feature:
- Launch date:
- Review date:
- Attendees: (UX, PM, eng lead, Define participants)
- Reviewer (author):

## 1. Recap
- Problem we set out to solve: (copy from the problem statement)
- What we built: (1-2 sentences)
- What we predicted: (success metrics with targets)

## 2. Results
### Primary metric
| | Baseline | Target | Actual | Status |
|---|---|---|---|---|
| Metric name | | | | Hit / Partial / Missed |
### Guardrail metrics
| Metric | Before | After | Regression? |
|---|---|---|---|
### Leading metrics
| Metric | Direction | Notes |
|---|---|---|
### Unexpected patterns
(Funnel shifts, segment differences, unpredicted usage.)

## 3. Qualitative signals
- Support tickets for this flow: up / down / flat, themes
- User feedback:
- Internal observations: (team, sales, success)

## 4. What worked
-
## 5. What didn't (blameless)
-
## 6. What we'd do differently
(Process, research, design, handoff, measurement.)
-

## 7. Decision
- [ ] Shipped successfully: keep as is, move on
- [ ] Ship with iteration: follow-ups planned
- [ ] Roll back or hide behind a flag: not working
- [ ] Needs more time: reconvene on [date]
### Follow-up actions
| # | Action | Owner | Due |
|---|---|---|---|

## 8. Questions this raised
(Each is a candidate for the Discover intake.)
-

## 9. Tags
- Feature area:
- User segment most affected:
- Theme: (conversion, retention, trust, friction, comprehension)
- Learning type: Process / Design / Technical / User behavior
```

### Review meeting (45 min) agenda
Predicted vs happened; what worked and what didn't; what we'd do differently; decision (ship as is, iterate, roll back); findings that become new Discover questions.

## Examples
| Part | Good | Weak |
|---|---|---|
| Primary result | "KYC completion 22% to 34%; target 40%; Partial" | "KYC is better" |
| Guardrail | "Support tickets per 100 attempts 6.1 to 5.8; no regression" | Missing |
| Decision | "Ship with iteration: simplify document step (owner UX, due 30 Nov)" | "Monitor" |

## Sources
- Notion: TEMPLATE Post-Launch Review, `3481a53e-1a6b-81e5-8d79-d027c112dc2b`.
- Notion: 05 Measure, `3481a53e-1a6b-81fb-8298-ea91f1948bbd`.
