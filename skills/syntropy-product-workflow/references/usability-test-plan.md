# Template: Usability test plan (Design)

The plan for testing a prototype with real users. Expected on every Flow (default 5 participants from the target segment); waived only for trivial changes with a written rationale. Findings go into the findings report (`research-plan.md`, section 4).

## Rules
1. Participants match the segment in the problem statement. Coworkers are not participants.
   Why: a PM is not a first-time investor.
2. Tasks are user goals, not UI instructions.
   Why: instructions test reading, not usability.
3. Write success, failure and ambiguous criteria before testing.
   Why: prevents post-hoc rationalisation.
4. Test the Arabic RTL version with Arabic participants; let participants choose when unsure.
   Why: Arabic is the primary experience.
5. 3-5 tasks for a 45-minute session, on a mobile device.
   Why: realistic scope and context.
6. Use realistic Safqah data: real-looking deal names, amounts with two decimals, Western digits, currency after the amount.
   Why: placeholder numbers hide comprehension problems.
7. A test not written up did not happen.
   Why: same rule as all research.

## Template
```
# Usability test plan: [project]
- Type: Moderated / Unmoderated · Sample: 5 · Dates · Moderator

## 1. What we're testing
- Prototype link:
- What we want to learn: (tied to the research question)
- Hypotheses:

## 2. Participants
- Segment:
- Screener: must have / must not have
- Recruitment source / incentive
- Language: Arabic / English / participant chooses

## 3. Setup
- Tool / device (iOS, Android) / orientation / network / recording with consent

## 4. Guide
### Warm-up (3 min): intro, consent, 1-2 context questions
### Tasks (3-5)
Task N: [goal in the user's words, AR then EN]
- Success:
- Observe:
- Follow-up:
### Post-task: overall impression, SEQ or SUS, "anything you'd change?"

## 5. Criteria (written before testing)
- Clear success:
- Clear failure:
- Ambiguous:

## 6. Logistics
- [ ] Prototype works on the target device
- [ ] RTL version tested
- [ ] Screener deployed / participants scheduled
- [ ] Incentives / consent form / recording tool / note-taker

## 7. After: findings report (3-7 findings with severity)
```

## Example: zakah calculator (Flow)
- Segment: investors with at least one active investment who say they pay zakah; Saudi residents; Arabic-speaking.
- Screener: must have an active investment; must not work at Safqah or a competitor.

| Task | Success | Failure |
|---|---|---|
| «تريد معرفة مقدار الزكاة المستحقة على استثماراتك في صفقة. احسبها.» / "You want to know how much zakah you owe on your Safqah investments. Work it out." | Reaches a result and can say which amounts were counted | Abandons, or cannot say what the number is based on |
| «تريد أن تعرف متى يحين موعد زكاتك.» / "Find out when your zakah is due." | States the Hijri due date shown | Reads a Gregorian payout date as the zakah date |
| «تريد التأكد من أن طريقة الحساب موافقة للشريعة.» / "Check that the calculation method is Sharia-compliant." | Finds the method explanation and who approved it | Cannot find it |

| Part | Good | Weak |
|---|---|---|
| Task | «تريد استثمار 5,000 ر.س في صفقة توزيعاتها شهرية. ابحث عنها.» | "Tap the Deals tab, then filter" |
| Screener | "Completed KYC, no investment yet, Saudi resident" | "Any user" |
| Failure | "Cannot state the net return after viewing the deal page" | Written after the sessions |

## Sources
- Notion: TEMPLATE Usability Test Plan `3481a53e-1a6b-811a-9692-cfcacf9c1c79`; 03 Design `3481a53e-1a6b-8198-b225-d2b8958dabde`.
- Full copy: `references/data/ux/lifecycle/usability-test.md`.
