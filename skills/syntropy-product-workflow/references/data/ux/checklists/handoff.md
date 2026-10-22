# Handoff checklist (Deliver gate)

The gate between Design and engineering build. Nothing ships unless every item is checked or explicitly waived with a reason. Run it before the handoff meeting, then again before merge (pre-launch gates). Agents preparing a handoff should fill this file's checklist in the feature's handoff doc (template: `knowledge/ux/lifecycle/handoff-template.md`).

## Rules

1. Every item is checked or explicitly waived with an owner and reason. An unchecked, unwaived item means handoff waits.
   Why: "we'll fix it next sprint" erodes the design system contract.
2. The Mixpanel Event Spec is attached at handoff, not after launch.
   Why: tracking that is not specified by handoff is built wrong or not at all.
3. Built values are the reference: tokens from `knowledge/tokens/resolved.json`, components from `knowledge/components/index.json`, font IBM Plex Sans Arabic, `Light` and `Dark` modes only.
   Why: the Figma library is the source of truth.

## Checklist

### Project
- Feature:
- Designer:
- Engineering lead:
- PM:
- Target sprint:

### UX side: Figma
- [ ] Hi-fi screens complete for all in-scope flows.
- [ ] Both RTL and LTR versions published.
- [ ] All states covered: default, empty, loading, error, success, permission denied, offline.
- [ ] Interactive prototype linked and working.
- [ ] Annotations for anything non-obvious (animations, transitions, conditional logic).
- [ ] All components are Syntropy (Design System v2) library instances, not detached.
- [ ] New components (if any) flagged with their design system backlog ticket.

### UX side: tokens and specs
- [ ] Colours use semantic tokens (`bg/*`, `text/*`, `border/*`, `icon/*`), not hex values.
- [ ] Spacing uses `space/*` tokens (0, 2, 4, 8, 12, 16, 20, 24, 32, 48, 64).
- [ ] Typography uses the built text styles (`role / size / weight`).
- [ ] Radii use `radius/*` tokens.
- [ ] Icons are `Icon / <name>` from the Syntropy icon library.
- [ ] Both `Light` and `Dark` modes checked.

### UX side: accessibility
- [ ] Colour contrast checked (WCAG AA minimum; repo target WCAG 2.2 AA).
- [ ] Touch targets at least 44x44 pt.
- [ ] Screen reader labels specified for non-text elements.
- [ ] Focus order documented for keyboard navigation.
- [ ] Text scales to 200% without breaking layout.

### UX side: content
- [ ] Final Arabic copy (not placeholder).
- [ ] Final English copy (not placeholder).
- [ ] Copy reviewed by the content owner (if applicable) and passes `knowledge/content/quality-checklist.md`.
- [ ] Numbers, currency and dates follow `knowledge/content/numbers-currency.md`.

### UX side: tracking
- [ ] Mixpanel Event Spec completed and attached (`knowledge/ux/lifecycle/mixpanel-event-spec.md`).
- [ ] Event names follow the naming convention (`object_action`, snake_case).
- [ ] Properties defined for each event.
- [ ] PM and UX agree on success metrics (from the Define phase).

### UX side: handoff meeting
- [ ] Scheduled (45 min).
- [ ] Attendees confirmed (designer, PM, eng lead, assigned engineers).
- [ ] Figma, Design Brief and Event Spec links shared in advance.
- [ ] Prototype demo planned.

### Engineering side
- [ ] Sprint capacity confirmed.
- [ ] Questions raised in the handoff meeting answered.
- [ ] New Design System v2 components scoped.
- [ ] Widgetbook use cases planned for new or changed components.
- [ ] Mixpanel SDK instrumented for the new events.

### Pre-launch gates (before merge to main)
- [ ] Design QA session completed.
- [ ] Widgetbook Parity Checklist passed (`widgetbook-parity.md`).
- [ ] Accessibility audit on the built version.
- [ ] PM acceptance on the built feature.
- [ ] Mixpanel events verified firing in Live View with correct properties.
- [ ] QA (functional) sign-off.
- [ ] Launch date confirmed and logged (starts the Measure phase timer).

### Sign-off
- UX: [name], date:
- Eng Lead: [name], date:
- PM: [name], date:

### Handoff meeting agenda (what UX walks through)
1. The Figma file: hi-fi screens, prototype, annotations.
2. The Design Brief: constraints and edge cases.
3. Design System v2 components used, and any new ones needed.
4. RTL behaviours and edge cases.
5. Accessibility requirements.
6. The Mixpanel event spec.

## Examples
| Item | Pass | Fail |
|---|---|---|
| States | Empty, loading (`Skeleton`), error and offline frames exist for the deal list | Only the happy path |
| Tokens | Card fill `bg/surface`, padding `space/lg` | `#FFFFFF`, 15px |
| Copy | «لا توجد صفقات مفتوحة حالياً.» final in both languages | "Lorem ipsum" in the Arabic frame |
| Tracking | `deal_viewed` spec with `deal_id`, `layout_direction` | "We'll add events after launch" |

## Sources
- Notion: TEMPLATE Handoff Checklist, `3481a53e-1a6b-8104-8864-fe438f676aab`.
- Notion: 04 Deliver, `3481a53e-1a6b-8133-8d9a-c9a74ee1304c` (meeting agenda, failure modes).
- Repo: `AGENTS.md` (WCAG 2.2 AA target).
