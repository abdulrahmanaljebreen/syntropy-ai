# Template: Problem statement and success metrics (Define)

The one-pager that captures the output of the Define phase. Every feature must have one, signed by UX, PM and eng lead, before design work starts.

## Rules

1. One sentence, in this exact shape: **"[User segment] is trying to [goal], but [obstacle], which matters to Safqah because [business impact]."** If the room cannot write it, go back to Discover.
   Why: forces a user, a goal, an obstacle and a reason.
2. It names a problem, not a solution. "Add a progress bar to KYC" is a solution; "users don't know where they are in KYC or how long it takes" is the problem.
   Why: a solution statement closes options before design.
3. 1-3 success metrics, each: **measurable** (exists in Mixpanel/Metabase or instrumented before launch), **directional** (clear whether up or down is better), **scoped** (tied to the flow, not MAU).
   Why: unmeasurable metrics make the Measure phase impossible.
4. One primary, at least one guardrail; leading optional. Every metric has a baseline and a target.
   Why: without a baseline and target there is no honest verdict.
5. After all three sign-offs the doc is locked; changes need a new sign-off.
   Why: it is the reference point for Design and Measure.

## Template

```
# Problem statement: [project]

## Header
- Project name:
- Date:
- Status: Draft / Approved / Locked for Design / Revised
- Approvers: UX [ ] · PM [ ] · Eng Lead [ ]

## Problem statement
Template: "[User segment] is trying to [goal], but [obstacle], which matters to Safqah because [business impact]."
Our problem:
> [one sentence]

## Why this matters now
2-3 sentences: why this problem, why this quarter.

## Success metrics
| Metric | Type | Baseline | Target | Source |
|---|---|---|---|---|
| | Primary | | | Mixpanel / Metabase |
| | Guardrail | | | |
| | Leading | | | |
- Primary: the one metric that says "it worked".
- Guardrail: must not get worse (support tickets, error rate).
- Leading: an earlier signal the primary will move.

## Success looks like
2-3 sentences describing the end state for the user. A vision, not a design.

## Out of scope
-
-

## Evidence this is the right problem
Links to Discover findings:
-
-

## Sign-off
Locked once all three approve. Changes after lock need a new sign-off.
- UX: [name], date:
- PM: [name], date:
- Eng Lead: [name], date:
```

## Examples

Problem statement:
> "First-time investors are trying to complete their first investment, but they abandon at the KYC step because the document upload is confusing, which matters to Safqah because these users represent 60% of monthly signups and only 22% convert to first investment."

Metrics for it:
| Metric | Type | Baseline | Target |
|---|---|---|---|
| KYC completion rate for first-time investors | Primary | 22% | 40% |
| Support tickets per 100 KYC attempts | Guardrail | current | no increase |
| Time from KYC start to submission | Leading | current | decrease |

Success looks like: "After this ships, a first-time investor completes KYC in under 4 minutes without contacting support, and feels confident that their documents are secure."

| Weak | Why it fails |
|---|---|
| "We need to add a progress bar to KYC." | Solution, not problem |
| "Users feel more confident." (as a metric) | Not measurable; use "NPS in the KYC post-flow survey" |
| "Increase MAU." | Not scoped to the flow |

## Sources
- Notion: TEMPLATE Problem Statement & Success Metrics, `3481a53e-1a6b-816c-893f-f7323fe592c2`.
- Notion: 02 Define, `3481a53e-1a6b-8105-bfa7-e50b05e9525a` (workshop, metric criteria, KYC example, failure modes).
