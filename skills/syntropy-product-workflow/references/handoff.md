# Template: Handoff doc and checklist (Deliver)

The document shared before the handoff meeting so engineering has every link, decision and edge case in one place, plus the gate checklist. Handoff waits until all six parts exist: Figma links, components and tokens, states, Arabic and English copy, events, acceptance criteria.

## Rules
1. Send the doc with Figma, brief and event spec links before the 45-minute meeting.
   Why: the meeting is for questions, not first reads.
2. Every checklist item is checked or waived with an owner and reason; otherwise handoff waits.
   Why: "we'll fix it next sprint" erodes the design system contract.
3. Components by exact Syntropy name and variant values; new components with their backlog ticket.
   Why: engineers map names one to one to Widgetbook.
4. RTL behaviour written explicitly per element; never "mirror as usual". Direction follows the locale, never a hand-set parameter in code.
   Why: RTL edge cases are where parity fails.
5. The completed Mixpanel event spec is attached.
   Why: events are built during Deliver, not after launch.
6. Link only the person's feature file and design system pages; never work-in-progress areas of the Syntropy file.
   Why: engineers build from published, stable sources.

## Template
```
# Handoff: [feature]
- Designer / Eng lead / PM / target sprint
- Links: Figma file · prototype · brief · problem statement · event spec · ticket

## 1. What we're building
(One paragraph from the problem statement and "success looks like".)

## 2. Screens and flows
| Screen | Figma frame (RTL) | Figma frame (LTR) | Notes |
|---|---|---|---|

## 3. States per screen
| Screen | Default | Empty | Loading | Error | Success | Disabled | Permission denied | Offline |
|---|---|---|---|---|---|---|---|---|
(Add money edge cases: zero balance, above limit, below minimum, fee present, partial/late payout.)

## 4. Components
| Component | Variants / props | Where | Notes |
|---|---|---|---|
New components or variants:
| Need | Why existing ones don't fit | DS backlog ticket |
|---|---|---|

## 5. Tokens and typography
- Surfaces and colours (semantic only):
- Spacing (space/*), radius (radius/*):
- Text styles (role / size / weight):
- Modes checked: Light, Dark

## 6. RTL behaviour
| Element | RTL | LTR |
|---|---|---|

## 7. Accessibility
- Contrast pairs / touch targets (48 pt in the app, 44x44 pt minimum) / screen reader labels / focus order / 200% text

## 8. Copy (final, AR first)
| Key | Arabic | English | Max length / notes |
|---|---|---|---|

## 9. Interactions and motion

## 10. Tracking
- Event spec link; metrics fed (primary / guardrail / leading)

## 11. Acceptance criteria
(Link to tickets, or paste Given/When/Then; see acceptance-criteria.md.)

## 12. Open questions
| Question | Owner | Due |
|---|---|---|

## 13. Gate: checklist below complete; sign-off UX / Eng lead / PM (ticked by people)
```

## Handoff checklist
### Figma
- [ ] Hi-fi for all in-scope flows, RTL and LTR published
- [ ] All states: default, empty, loading, error, success, disabled, permission denied, offline (plus money edge cases)
- [ ] Prototype linked and working (Flow)
- [ ] Annotations for non-obvious logic, transitions, conditions
- [ ] Every component a Syntropy library instance, not detached
- [ ] New components flagged with backlog ticket

### Tokens and specs
- [ ] Colours: semantic tokens (`bg/*`, `text/*`, `border/*`, `icon/*`), no hex
- [ ] Spacing `space/*`, radii `radius/*`
- [ ] Built text styles; IBM Plex Sans Arabic
- [ ] Icons are `Icon / <name>` from Syntropy Icons
- [ ] Light and Dark checked

### Accessibility
- [ ] Contrast WCAG 2.2 AA with passing token pairs
- [ ] Touch targets 48 pt in the app (never below 44x44 pt)
- [ ] Screen reader labels for non-text elements and icon-only controls
- [ ] Focus order documented
- [ ] Text at 200% does not break layout

### Content
- [ ] Final Arabic copy (no placeholder)
- [ ] Final English copy
- [ ] Glossary terms, «نسبة» on percentage labels, Western digits, currency after amount, two decimals for money (see syntropy-content)
- [ ] Regulated wording confirmed with Compliance (money or regulated)

### Tracking
- [ ] Event spec attached; names `object_action` snake_case; properties typed
- [ ] Success metrics agreed (from Define)

### Compliance (money or regulated)
- [ ] Risk line next to the commitment action
- [ ] Fees (with VAT) before confirmation; net figures as headline; projections labelled expected
- [ ] Limits from the backend, not hardcoded
- [ ] No countdown as pressure, no pre-ticked consent, no confirmshaming

### Meeting
- [ ] 45 min scheduled; designer, PM, eng lead, engineers invited; links shared in advance

### Engineering side
- [ ] Capacity confirmed; questions answered; new DS components scoped; Widgetbook use cases planned; Mixpanel SDK events planned

### Pre-launch gates (before merge to main)
- [ ] Design QA on real iOS and Android devices with the Widgetbook parity checklist (`references/data/ux/checklists/widgetbook-parity.md`)
- [ ] Accessibility audit on the build
- [ ] Events verified in Mixpanel Live View with correct properties
- [ ] PM acceptance against the acceptance criteria; QA sign-off
- [ ] Launch date logged; post-launch review booked for 2-4 weeks after

### Meeting agenda
1. Figma: hi-fi, prototype, annotations. 2. Brief: constraints and edge cases. 3. Components used and new. 4. RTL behaviours. 5. Accessibility. 6. Event spec. 7. Acceptance criteria.

## Examples
| Section | Good | Weak |
|---|---|---|
| States | "Wallet Offline: cached balance + one `Banner` warning tone «لا يوجد اتصال بالإنترنت.»" | "Handle offline" |
| RTL | "`ProgressBar` fills right to left in Arabic; label at the start (right)" | "Mirror" |
| Components | "`StatusPill` warning tone for «متأخرة» (Late); error tone only for «متعثرة» (Defaulted)" | "Yellow pill" |
| Tokens | "Card `bg/surface`, `border/subtle`, `radius/lg`, padding `space/lg`" | "#FFFFFF, 15px" |
| Copy | «لا توجد صفقات مفتوحة حالياً.» / "No open deals right now." | Lorem ipsum in the Arabic frame |
| Tracking | "`deal_viewed` with `deal_id`, `deal_status`, `source`, `layout_direction`" | "Events after launch" |

## Sources
- Notion: TEMPLATE Handoff Checklist `3481a53e-1a6b-8104-8864-fe438f676aab`; 04 Deliver `3481a53e-1a6b-8133-8d9a-c9a74ee1304c`.
- Full copies: `references/data/ux/lifecycle/handoff-template.md`, `references/data/ux/checklists/handoff.md`, `references/data/ux/checklists/widgetbook-parity.md`.
