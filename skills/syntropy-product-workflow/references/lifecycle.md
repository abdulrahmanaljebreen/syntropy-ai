# Safqah UX lifecycle: phases, owners, time boxes, definition of done

The five-phase loop every Safqah feature runs through, condensed for an agent: who owns each phase, how long it may take, what it produces, and the gate that ends it. Open this when sizing work or deciding whether a phase is finished.

```
DISCOVER  intake, desk research, primary research, findings
   |
DEFINE    problem statement, 1-3 metrics, design brief, event spec draft
   |
DESIGN    options, hi-fi RTL + LTR, prototype, reviews, usability test
   |
DELIVER   handoff, build, design QA, Live View check, launch
   |
MEASURE   post-launch review, decision, new questions
   |
   +----> back to DISCOVER
```

## Rules
1. A phase ends when its definition of done is fully checked, not when the calendar says so.
   Why: the DoD is the gate.
2. Tracks compress phases, they never reorder them. Quick runs a thin Define and Design; Feature runs all five lightly; Flow runs all five fully.
   Why: skipping order (design before Define) is the failure the lifecycle exists to stop.
3. Money or regulated work never drops Define, whatever the track.
   Why: constraints found late are the most expensive rework.
4. Tracking is specified in Define, confirmed at handoff, verified in Live View before launch.
   Why: broken tracking blinds Measure.
5. Arabic RTL and English LTR are designed together from the first wireframe.
   Why: RTL is not a filter applied at the end.
6. Reviews are blameless.
   Why: honest outcomes need it.

## Phases at a glance

| Phase | Owner | Participants | Time box | Output | Definition of done |
|---|---|---|---|---|---|
| Discover | UX | PM, Support/Success, users, eng lead (consulted) | 1 hour to 14 days | Intake decision, research plan, findings report, draft problem | Decision logged (done, deflected, parked, declined); findings archived if research ran; draft problem statement; segments identified |
| Define | UX + PM jointly | Eng lead (feasibility), Compliance (Sharia, regulatory) | About 3 hours to 7 days | Problem statement, 1-3 metrics, design brief, event spec draft | Statement agreed by UX, PM, eng lead; metrics with baseline and target, confirmed measurable; constraints in the brief; "success looks like" written |
| Design | UX | PM, eng lead, users (testing) | About 1 day to 4 weeks | Options memo, hi-fi RTL + LTR, prototype, test findings | Hi-fi RTL + LTR; Syntropy components only or flagged; prototype of critical path; usability test done or waived (trivial only); two design reviews; accessibility checklist; PM and eng lead approval |
| Deliver | Engineering, UX as active partner | Flutter/Angular engineers, UX, PM (acceptance), QA | 1-3 sprints | Handoff doc, acceptance criteria, event spec final, build | Handoff meeting held; built with Syntropy components; Widgetbook use cases updated; design QA passed; events verified in Live View; accessibility audit on the build; PM acceptance; launch date logged |
| Measure | UX + PM jointly | Eng lead, original Define participants | Review 2-4 weeks after launch; 2 weeks to document | Post-launch review, decision, new questions | Numbers pulled at 2 weeks; review held and documented; decision recorded; new questions in intake; monthly Lexicon audit done |

## Tracks mapped to phases

| Phase | Quick | Feature | Flow |
|---|---|---|---|
| Discover | Skip (reuse existing evidence) | Desk research only | Intake framing, research plan, desk + primary research, findings |
| Define | Mini brief; Define-lite if money or regulated | Problem statement, metrics, event spec draft | Locked problem statement, full design brief, constraints, event spec draft, definition review |
| Design | Edit the existing screen; self-review | Options memo, hi-fi, self-review, one design review | Options, first review, hi-fi, prototype, usability test, final review |
| Deliver | Ticket with acceptance criteria; PR if code | Handoff doc, acceptance criteria, final events | Full handoff meeting, design QA, parity checklist, Live View |
| Measure | Check the affected event still fires | Post-launch review booked | Post-launch review booked and run |

### Define-lite (Quick track on money or regulated screens, about 30-60 minutes)
1. One problem sentence in the standard shape.
2. One primary metric and one guardrail (support tickets, error rate, or cancellations), with baseline or `TBD`.
3. Compliance check of the changed copy or flow with syntropy-compliance-ux (return labels, fee lines, risk line, consent).
4. Note any affected Mixpanel event.

## Discover: methods and effort
| Method | When | Effort |
|---|---|---|
| Desk research | Always first: Mixpanel funnels, Metabase, support tickets, past findings, benchmarks | Hours to 2 days |
| Heuristic review | Fast feedback on an existing design | 2-4 days |
| Usability test, unmoderated (5) | Flows, comprehension | 1-2 weeks |
| Usability test, moderated (5) | Complex flows, deep exploration | 2-3 weeks |
| User interviews (5-8) | Motivations, mental models | 3-4 weeks |
| Survey | Quantitative validation at scale | 1-2 weeks deploy + 2-4 weeks responses |
| Diary study | Long-term behaviour | 4-6 weeks minimum |
Capacity: about 2 active research projects at a time (solo UX). Intake triage within 3 business days.

## Rituals
| Ritual | When | Length |
|---|---|---|
| Definition review (PM + UX + eng) | End of Define | 30 min |
| Design critique | Weekly | 60 min |
| Design review | Twice per feature (concept, pre-handoff) | 30-60 min |
| Handoff meeting | Start of Deliver | 45 min |
| Post-launch review | 2-4 weeks after launch | 45 min |
| Lexicon audit | First Monday of the month | 2-4 hours |

## Failure modes to call out
| Phase | Failure | What the agent says |
|---|---|---|
| Discover | Interviews before desk research | "Mixpanel and tickets may answer this in a day; start there." |
| Discover | Research to "validate" a decided solution | "What would we do differently if the result is negative?" |
| Define | Solution disguised as a problem | Rewrite in the problem shape |
| Define | Unmeasurable metric | Replace with an event-based rate |
| Design | Jumping to hi-fi | Options memo first |
| Design | LTR now, RTL later | Both directions in this pass |
| Deliver | Handoff without event spec | Handoff waits |
| Deliver | "We'll fix tokens next sprint" | Log as parity issue; Critical/High block merge |
| Measure | No review booked | Book it at launch |

## Examples
| Situation | Phase and next artifact |
|---|---|
| "Can you test the new design before launch?" | Discover: reframe (test what, to decide what?) with `research-plan.md` |
| Mixpanel shows a large drop at KYC step 3 | Discover: desk research, then findings |
| "We need a progress bar in KYC" | Define: rewrite as a problem statement first |
| Hi-fi done in Arabic only | Design: not done, LTR missing |
| Build merged without a Live View check | Deliver gate failed |
| Launched 3 weeks ago, no review | Measure: book `post-launch-review.md` now |

## Sources
- Notion: UX Process & Lifecycle `3481a53e-1a6b-8111-9a92-c79e0ac0c3e2`; phases 01 Discover `3481a53e-1a6b-8158-a32c-da3c83a5c8bb`, 02 Define `3481a53e-1a6b-8105-bfa7-e50b05e9525a`, 03 Design `3481a53e-1a6b-8198-b225-d2b8958dabde`, 04 Deliver `3481a53e-1a6b-8133-8d9a-c9a74ee1304c`, 05 Measure `3481a53e-1a6b-81fb-8298-ea91f1948bbd`.
- Full copy: `references/data/ux/lifecycle/README.md`.
