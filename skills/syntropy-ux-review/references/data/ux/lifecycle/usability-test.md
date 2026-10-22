# Template: Usability test plan (Design)

The plan for testing a prototype or live product with real users. Expected for every non-trivial feature in the Design phase (default 5 participants from the target segment). Findings go into `findings-report.md`.

## Rules

1. Participants match the user segment in the problem statement. Coworkers are not participants.
   Why: a PM is not a first-time investor; a mismatched test is theatre.
2. Tasks are phrased as user goals, not UI instructions ("You want to put 5,000 into a deal that pays monthly", not "click Invest").
   Why: instructions test reading, not usability.
3. Write success, failure and ambiguous criteria before testing.
   Why: prevents post-hoc rationalisation.
4. Test the RTL version with Arabic participants; let participants choose language when unsure.
   Why: Arabic is the primary experience.
5. 3-5 tasks for a 45-min session. Mobile device required.
   Why: realistic scope and context.
6. A test that is not written up did not happen.
   Why: same rule as all research.

## Template

```
# Usability test plan: [project]

## Header
- Project:
- Test type: Moderated / Unmoderated
- Sample size: (default 5)
- Test dates:
- Moderator (if moderated):

## 1. What we're testing
- The thing being tested: (prototype link, feature URL, flow)
- What we want to learn: (tie to the Discover research question)
- Key hypotheses: (what we expect, or fear, to see)

## 2. Participants
- Target segment:
- Screener criteria: (must have X, must not have Y)
- Recruitment source:
- Incentive:
- Language: Arabic / English / Let participant choose

## 3. Setup
- Tool: (Maze, Useberry, Lookback, Zoom, in person)
- Device: mobile required; iOS / Android / both
- Orientation: Portrait / Landscape / Both
- Network: Normal / Throttled
- Recordings: screen + audio (with consent)

## 4. Discussion guide (moderated) or task list (unmoderated)
### Warm-up (3 min)
- Moderator intro
- Recording consent
- 1-2 context questions ("Tell me about the last time you invested in something")
### Tasks
Task 1: [user goal, phrased as the user thinks of it]
- Success criteria:
- Observe: (hesitation, what they say, what they miss)
- Follow-up questions:
(3-5 tasks for 45 min.)
### Post-task
- 1-2 open questions on overall impression
- SUS or SEQ if relevant
- "Anything you'd change?"

## 5. What we're looking for (write before testing)
- Clear success:
- Clear failure:
- Ambiguous (needs more data):

## 6. Logistics checklist
- [ ] Prototype tested and working on target device
- [ ] RTL version tested if Arabic participants
- [ ] Screener deployed
- [ ] Participants scheduled (moderated) or test distributed (unmoderated)
- [ ] Incentives arranged
- [ ] Consent form prepared
- [ ] Recording tool tested
- [ ] Note-taker assigned (moderated)

## 7. After the test
Write findings with the findings report template (findings-report.md).
```

## Examples
| Part | Good | Weak |
|---|---|---|
| Task | «تريد استثمار 5,000 ر.س في صفقة توزيعاتها شهرية. ابحث عنها.» / "You want to invest 5,000 SAR in a deal with monthly payouts. Find one." | "Tap the Deals tab, then filter" |
| Screener | "Has completed KYC, no investment yet, Saudi resident" | "Any user" |
| Failure criterion | "Participant cannot state the expected net return after viewing the deal page" | Written after the sessions |

## Sources
- Notion: TEMPLATE Usability Test Plan, `3481a53e-1a6b-811a-9692-cfcacf9c1c79` (one embedded external object could not be read).
- Notion: 03 Design, usability test step and failure modes, `3481a53e-1a6b-8198-b225-d2b8958dabde`.
