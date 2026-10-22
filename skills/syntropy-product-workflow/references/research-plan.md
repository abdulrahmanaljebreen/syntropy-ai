# Template: Research plan and findings (Discover)

How to frame, plan and write up research, sized to the question. Combines the research intake (the question), the research brief (the plan) and the findings report (the output). Desk research is always first.

## Rules
1. Answer one question before planning: **what decision will this research inform, and what will we do differently depending on the outcome?** No answer, no research.
   Why: research that cannot change a decision is theatre.
2. A request names a question, not a method ("what makes investors stop after their first payout?", not "interview 5 users").
   Why: the method follows the question.
3. Desk research first: Mixpanel funnels and events, Metabase, support tickets, past findings, benchmarks (see syntropy-inspiration). Primary research only if desk research cannot answer.
   Why: many questions are answered in a day.
4. Participants match the segment; coworkers are not participants. Consent and recording handling are decided in the plan (PDPL).
   Why: a mismatched sample is theatre; consent is not improvised.
5. Every research activity ends in a written findings report: 3-7 findings, each with at least 2 data points.
   Why: research not written up did not happen; one anecdote is not a finding.
6. Never fabricate quotes, numbers or findings. If you (the agent) only did desk research, say so and label every number with its source and date.
   Why: invented evidence poisons every later decision.

## 1. Framing (intake)
```
- Question: what do we want to learn?
- Decision informed:
- Different actions by outcome: if A we do X, if B we do Y
- Hypothesis:
- Already tried: Mixpanel funnel / Metabase / tickets / past research / none (what was found)
- Segment: Existing active / dormant / new / prospects / specific (describe)
- Language: Arabic / English / both
- Deadline and why:
- Output: full report / memo / readout / Slack summary
```

## 2. Desk research plan (Feature and Flow)
| Source | What to pull | Example for "reinvest after payout" |
|---|---|---|
| Mixpanel | Funnel from the trigger to the outcome, by segment | Payout received to next investment within 7 days, retail vs qualified |
| Mixpanel Lexicon | Which events already exist, which are missing | Is there an event for payout detail viewed? |
| Metabase | Business numbers not in Mixpanel | Share of returned capital withdrawn vs reinvested |
| Support tickets / Intercom | Themes and counts for the flow | Questions about when payouts arrive and what to do next |
| Past findings | Earlier reports on the area | Prior payout or cash-out studies |
| Benchmarks (syntropy-inspiration) | How others handle the moment | Reinvest options at distribution time in other investment apps |

Gaps that desk research cannot fill become the primary research question.

## 3. Primary research plan (Flow, or when desk research is not enough)
```
# Research plan: [project]
- Method: heuristic review / usability test (un)moderated / interviews / survey / diary study
- Why this method:
- Participants: segment, screener (must have X, must not have Y), count
- Recruitment source / incentive:
- Tools:
- Consent and recordings: how collected, where stored, retention
- Timeline: plan approved / recruitment done / fieldwork start / end / readout / report published
- Deliverables: findings report, readout, raw notes location, tags (feature, segment, theme)
- Risks and assumptions:
- Sign-off before fieldwork: UX [ ] Requester [ ] PM notified [ ] Participants recruited [ ]
```
| Method | When | Effort |
|---|---|---|
| Heuristic review | Fast feedback on an existing design | 2-4 days |
| Usability test, unmoderated (5) | Flows, comprehension | 1-2 weeks |
| Usability test, moderated (5) | Complex flows | 2-3 weeks |
| Interviews (5-8) | Motivations, mental models | 3-4 weeks |
| Survey | Quantitative validation | 3-6 weeks total |
| Diary study | Long-term behaviour | 4-6 weeks minimum |

## 4. Findings report
```
# Findings: [project]
- Method / sample / fieldwork dates / author / published / related problem statement

## TL;DR (3 sentences max: asked, found, do)

## Research question
## Method (one paragraph, with limitations)

## Findings (3-7)
### Finding 1: [descriptive headline]
- Observed:
- Severity: Critical / High / Medium / Low
- Evidence: (2+ data points with source and date)
- Implication:
- Recommendation:

## What surprised us
## What we still don't know
## Next steps (by priority)
## Appendix (raw notes, artifacts, demographics summary, no PII)
## Tags: feature / segment / theme / decision status
```

## Examples
| Part | Good | Weak |
|---|---|---|
| Question | "Do first-time investors understand that the projected return is not promised?" | "Research the deal page" |
| Headline | "Investors read the projected range as a promised return" | "Users confused" |
| Evidence | "4 of 6 participants said 'I will get 16%'; disclosure sheet opens are near zero in Mixpanel (report link, date)" | "People seemed unsure" |
| Recommendation | "Show realised outcomes for closed deals beside the projection" | "Improve clarity" |

## Sources
- Notion: Research Intake Form `3481a53e-1a6b-813d-9bfd-eec1cb71bc9b`; TEMPLATE Research Brief `3481a53e-1a6b-8176-a5de-cbaefcca82e7`; TEMPLATE Research Findings Report `3481a53e-1a6b-81ec-8b61-c081425660b7`.
- Full copies: `references/data/ux/lifecycle/research-intake.md`, `research-brief.md`, `findings-report.md`.
