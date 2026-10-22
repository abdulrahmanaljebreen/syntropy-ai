# Template: Research findings report (Discover, Measure)

The structured output after research or a usability test completes. Lives in the Research Findings archive. Used in Discover and Measure, and as the write-up for usability tests run in Design.

## Rules

1. Every research activity ends in a written report. Research that is not written up did not happen.
   Why: otherwise participants' and your time is wasted.
2. 3-7 findings. More usually means weak synthesis.
   Why: forces prioritisation.
3. Each finding has at least 2 supporting data points (quotes, behaviours, numbers).
   Why: one anecdote is not a finding.
4. TL;DR is three sentences max: question asked, what we found, what to do.
   Why: the busy-exec read.
5. No PII in the appendix; demographics as a summary only.
   Why: privacy and PDPL.
6. Do not repeat objectives or product overview already in the brief or FigJam board; link them.
   Why: avoids drift between documents.

## Template

```
# Findings: [project]

## Header
- Project name:
- Method used:
- Sample size:
- Dates of fieldwork:
- Conducted by:
- Date published:
- Related to: (problem statement, feature or intake request)
- FigJam synthesis link:

## TL;DR
(Three sentences max: what we asked, what we found, what we should do.)

## 1. Research question
Restated from the brief.

## 2. Method
One paragraph: what we did, with whom, limitations (small sample, single segment).

## 3. Findings
### Finding 1: [short descriptive headline]
- What we observed: (concrete, evidence-based)
- Severity: Critical / High / Medium / Low
- Evidence: (at least 2 data points: quotes, behaviours, numbers)
- Implication: (what it means for the product)
- Recommendation: (what UX suggests)
(Repeat; 3-7 findings total.)

## 4. What surprised us

## 5. What we still don't know
(Honest gaps; candidates for new Discover items.)

## 6. Recommended next steps (by priority)
1.
2.
3.

## 7. Appendix
- Raw notes:
- Recordings (if consent given):
- Test artifacts (prototype, survey, discussion guide):
- Participant demographics summary (no PII):

## Tags
- Feature: (KYC, deal page, onboarding)
- User segment: (first-time investors)
- Theme: (trust, comprehension, friction)
- Decision status: Informed decision X / Pending / Deprioritized
```

## Examples
| Part | Good | Weak |
|---|---|---|
| Headline | "Investors read the projected range as a promised return" | "Users confused" |
| Evidence | "4 of 6 participants said 'I will get 16%'; Mixpanel shows 0 views of the disclosure sheet" | "People seemed unsure" |
| Recommendation | "Show the realised outcome for closed deals beside the projection" | "Improve clarity" |

## Sources
- Notion: TEMPLATE Research Findings Report, `3481a53e-1a6b-81ec-8b61-c081425660b7`.
- Notion: 01 Discover (synthesis), `3481a53e-1a6b-8158-a32c-da3c83a5c8bb`; TEMPLATE Usability Test Plan section 7, `3481a53e-1a6b-811a-9692-cfcacf9c1c79`.
