# Template: Design review agenda (Design)

Structure for a design critique: the weekly standing review and ad-hoc reviews. Used twice per feature in the Design phase (first review on 2-3 concepts, final review before handoff). An agent can use the eight feedback lenses to self-review a design. Notion marks this template "we may not use it"; the lenses remain the review standard.

## Rules

1. Always bring specific asks. No asks means an unfocused critique.
   Why: reviewers need to know what kind of feedback helps.
2. Walkthrough first, feedback after; no interruptions during the walkthrough. Use the prototype on a real device when possible, especially for RTL.
   Why: reviewers see the flow as a user would.
3. Give feedback through the eight lenses, in order.
   Why: structured, complete, and fast.
4. End with decisions, open items, owners and the next review date.
   Why: a review without actions changes nothing.
5. Ground rules: critique the design, not the designer; lead with what works, then what doesn't, then suggestions; don't redesign in the room; "Have you considered X?" beats "You should do X"; no silent observers; time-box each voice.
   Why: keeps critique safe and useful.

## Template

```
# Design review: [project]

## Header
- Date:
- Project / feature:
- Designer presenting:
- Review type: Early concept / Mid-fi / Hi-fi / Pre-handoff
- Duration: 30 / 45 / 60 min
- Attendees: (required · optional)

## 1. Context (5 min)
- Problem statement:
- Decisions already made:
- What's been validated (research, data):
- Phase: exploration or near-final

## 2. Specific asks (2 min)
-

## 3. Walkthrough (15-25 min)
(Designer presents; others listen.)

## 4. Feedback (15-20 min), lenses in order
1. Does it solve the problem? (reference the problem statement)
2. Does it match the user's mental model? (based on research)
3. Is anything unclear, ambiguous or likely to be missed?
4. Are edge cases / states missing? (empty, loading, error, permission denied, offline)
5. RTL behaviour: anything broken?
6. Accessibility: contrast, touch targets, focus order, labels?
7. Design system: any drift from Syntropy (Design System v2)?
8. Technical feasibility: eng lead flags?

## 5. Decisions and action items (5 min)
- Decided:
- Still open:
- Owner of each follow-up:
- Next review (if needed):
```

## Examples
Specific asks that work:
- "I want to pressure-test the main flow concept, not the visuals yet."
- "The RTL version of this layout feels off but I can't name why. Help me diagnose."
- "Is this too many steps? Is there an obvious consolidation?"
- "Final polish check: catch anything I've normalised."

| Lens | Example finding |
|---|---|
| 4. States | "No offline state for the wallet balance" |
| 5. RTL | "Chevrons in the list point right in Arabic" |
| 7. Design system | "Custom card instead of `CardInfo`; one-off radius 10" |

## Sources
- Notion: TEMPLATE Design Review Agenda/Handover, `3481a53e-1a6b-8162-836b-c8ad0b2af766`.
- Notion: 03 Design (two reviews), `3481a53e-1a6b-8198-b225-d2b8958dabde`; UX Process & Lifecycle templates table, `3481a53e-1a6b-8111-9a92-c79e0ac0c3e2`.
