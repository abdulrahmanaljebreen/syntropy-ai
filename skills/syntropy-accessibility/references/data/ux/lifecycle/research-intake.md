# Template: Research intake (Discover)

The request form anyone (PM, engineer, stakeholder) uses to ask UX for research or a usability check. In Notion it is a live database (Research Requests), not a page template; this file gives its fields so an agent can draft a complete request or triage one. Phase: Discover.

## Rules

1. Answer the one question first: **what decision will this research inform, and what will you do differently depending on the outcome?** If it cannot be answered, the request is not ready; talk to UX first.
   Why: research that cannot change a decision is theatre.
2. A request names a question, not a method. "Interview 5 users about churn" is a method; "what makes investors stop after the first payout?" is a question.
   Why: UX picks the method after triage.
3. UX triages within 3 business days into one of four outcomes (below). Urgent (under 48h): ping UX on Slack before submitting.
   Why: predictable turnaround.
4. List what was already tried (Mixpanel, Metabase, support tickets, past research).
   Why: many requests are answered by desk research; that is a win.

## Template

### Requester fields
| Field | Type | What to write |
|---|---|---|
| Request | Title | One sentence: what you want to learn |
| Requester / Role / Team | Person / text / select (Product, Engineering, Growth, Compliance, Ops, Leadership, Support, Other) | Who is asking |
| Question | Text | What do you want to learn? |
| Decision Informed | Text | What decision will this inform? (the most important field) |
| Different Actions | Text | What will you do differently depending on the outcome? |
| Hypothesis | Text | Current assumption |
| Already Tried | Multi-select: Mixpanel Funnel, Metabase, Support Tickets, Past Research, Support/Success Team, None | What you checked |
| Already Tried Notes | Text | What you found, what is still missing |
| User Segment | Multi-select: Existing - Active, Existing - Dormant, New / First-time, Prospects, Non-users, Specific Segment | Who to learn about |
| Segment Notes | Text | Describe if Specific Segment |
| Language | Multi-select: Arabic, English, Either, Both (mix) | Participant language |
| Other Constraints | Text | Saudi-based only, age, Sharia-conscious, institutional vs retail |
| Participants Source | Select: Requester has them, UX to recruit, Unknown | |
| Ideal Deadline / Deadline Flexibility / Deadline Reason | Date / Hard, Flexible, Unknown / text | When and why |
| Output Format | Select: Full Report, Memo, Readout Meeting, Slack Summary, Other | How to deliver |
| Audience | Text | Who else needs the results |

### UX triage fields
| Field | Values |
|---|---|
| Status | Inbox, Triaging, Accepted, In Progress, Findings Ready, Completed, Deflected, Parked, Declined |
| Priority | P0 - Urgent, P1 - High, P2 - Medium, P3 - Low, TBD |
| Method | Heuristic Review, Usability Test - Unmoderated, Usability Test - Moderated, User Interviews, Survey, Diary Study, Desk Research Only, TBD |
| Assigned / Target Delivery | Person / date |
| Triage Notes | Reasoning for the outcome |
| Tags | Onboarding, KYC, Deal Browsing, Investment Flow, Portfolio, Notifications, Trust, Sharia/Compliance, Arabic/RTL, Performance |
| Findings Link | URL to the Findings Report |

### Triage outcomes
- **Accepted:** scheduled into the queue with a target date.
- **Deflected:** existing data answers it (Mixpanel, past research, tickets); UX shares findings instead.
- **Parked:** valid but blocked (feature not live, needs PM alignment), with a re-evaluation date.
- **Declined:** not a research question, or the decision is unclear; UX explains and suggests a reframe.

### Quarterly intake metrics
Total requests; Accepted / Deflected / Parked / Declined split; average time from request to findings; decisions actually made from research; requests per team.

## Examples

Strong requests:
- "We're deciding whether to add a two-step confirmation to the investment commit flow. I want to know if first-time investors feel confident committing without it, or if the extra step reduces abandonment. Hypothesis: two-step will hurt completion for experienced investors but help first-timers. Decision due by May 20 for sprint planning."
- "Compliance flagged that users don't seem to read the Sharia certification section. I want to know if investors notice it, understand it, and whether it affects trust. Decision: redesign that section in Q3 or deprioritise."
- "Mixpanel shows 40% drop-off at KYC step 3. I've checked the funnel and talked to support, but I don't know why. Decision: redesign the step or change the copy."

Weak requests and reframes:
| Weak | Reframe |
|---|---|
| "Can you do some research on our users?" | Too broad: which decision, what to learn? |
| "We should test the new design before launch." | Test what, against what (usability, comprehension, preference)? What changes based on the result? |
| "Leadership wants to know if users like the app." | "Like" is not actionable: satisfaction (NPS), retention, trust or task completion? |
| "Interview 5 users about churn." | That is a method. What do you want to learn about churn, and what will you do with it? |

## Sources
- Notion: TEMPLATE Research Intake Form, `3481a53e-1a6b-8163-9f9e-cea080dc18e2` (moved to database).
- Notion: Research Intake Form page, `3481a53e-1a6b-813d-9bfd-eec1cb71bc9b` (rules, examples, outcomes, metrics).
- Notion: Research Requests database, `collection://5de22691-123f-451c-9bf3-f8dd25aea3cf` (fields and options).
