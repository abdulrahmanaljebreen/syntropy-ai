# Template: Handoff doc (Deliver)

The document UX shares before the handoff meeting so engineering has every link, decision and edge case in one place. It wraps the gate checklist in `knowledge/ux/checklists/handoff.md` (which holds every check item) and the parity checklist in `knowledge/ux/checklists/widgetbook-parity.md`. Phase: Deliver.

## Rules

1. Send this doc, with Figma, Design Brief and Event Spec links, before the meeting.
   Why: the 45-minute meeting is for questions, not first reads.
2. Every item in `../checklists/handoff.md` is checked or waived with a reason before the meeting; otherwise handoff waits.
   Why: the checklist is the gate.
3. List every component by its exact Syntropy name and variant values; list new components with their DS backlog ticket.
   Why: engineers map names one to one to Widgetbook.
4. Write RTL behaviours and states explicitly; never "mirror as usual".
   Why: RTL edge cases are where parity fails.
5. Tracking is part of the handoff: attach the completed `mixpanel-event-spec.md`.
   Why: events are built during Deliver, not after launch.

## Template

```
# Handoff: [feature]

## Project
- Feature:
- Designer:
- Engineering lead:
- PM:
- Target sprint:
- Links: Figma file / prototype / Design Brief / Problem statement / Mixpanel Event Spec

## 1. What we're building
One paragraph from the problem statement and "success looks like".

## 2. Screens and flows
| Screen | Figma frame (RTL) | Figma frame (LTR) | Notes |
|---|---|---|---|

## 3. States per screen
| Screen | Default | Empty | Loading | Error | Success | Permission denied | Offline |
|---|---|---|---|---|---|---|---|

## 4. Components used
| Component | Variants / props used | Notes |
|---|---|---|
| (e.g. CardDeal) | (State=Closed, Direction=RTL) | |
New components / variants needed:
| Need | Why existing ones don't fit | DS backlog ticket |
|---|---|---|

## 5. Tokens and typography
- Colours: semantic tokens only (list any non-obvious ones)
- Spacing: space/* tokens
- Text styles used: (role / size / weight)
- Modes checked: Light, Dark

## 6. RTL behaviour
| Element | RTL | LTR |
|---|---|---|
(Arrows, progress direction, mixed-language strings, numbers.)

## 7. Accessibility
- Contrast pairs checked:
- Touch targets:
- Screen reader labels:
- Focus order:
- 200% text scale notes:

## 8. Content
- Final Arabic and English copy location:
- Numbers, currency and date formats confirmed against numbers-currency.md:

## 9. Interactions and motion
(Transitions, durations, conditional logic.)

## 10. Tracking
- Event spec link:
- Success metrics it feeds (primary / guardrail / leading):

## 11. Open questions
| Question | Owner | Due |
|---|---|---|

## 12. Gate
- [ ] ../checklists/handoff.md complete (UX side + engineering side)
- [ ] Pre-launch gates scheduled (design QA with widgetbook-parity.md, Live View check, QA sign-off)
- Sign-off: UX / Eng Lead / PM with dates
```

## Examples
| Section | Good | Weak |
|---|---|---|
| States | "Deal list Offline: cached cards + `Banner` `Tone=warning` «لا يوجد اتصال»" | "Handle offline" |
| RTL | "`ProgressBar` fills right to left in RTL; percentage label sits at the start (right)" | "Mirror" |
| Components | "`StatusPill` `Tone=warning`, `Variant=subtle`, `Size=sm` for Late" | "Yellow pill" |

## Sources
- Notion: TEMPLATE Handoff Checklist, `3481a53e-1a6b-8104-8864-fe438f676aab`.
- Notion: 04 Deliver, handoff meeting contents, `3481a53e-1a6b-8133-8d9a-c9a74ee1304c`.
- Note: Notion has no separate handoff document template; this file structures the Deliver-phase meeting contents around the checklist.
