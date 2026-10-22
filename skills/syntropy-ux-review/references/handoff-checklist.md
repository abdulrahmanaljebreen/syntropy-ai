# Handoff checklist (Deliver gate)

The gate between design and engineering build, used as the last part of a review when the work is about to be handed off, and again before merge. Every item is checked or explicitly waived with an owner and reason. Long form: `data/ux/checklists/handoff.md`.

## Rules
1. Every item is checked, or waived with an owner and a reason. An unchecked, unwaived item means handoff waits. Why: "next sprint" erodes the design system contract.
2. The Mixpanel event spec is attached at handoff, not after launch. Why: tracking specified late is built wrong or not at all.
3. Built values are the reference: tokens from the resolved token file, components from the component index, IBM Plex Sans Arabic, `Light` and `Dark` modes only. Why: the Figma library is the source of truth.
4. A review verdict of "Do not ship" blocks handoff; "Fix then ship" hands off only with each open finding assigned and dated. Why: the gate is only real if it can stop work.

## Design (Figma)
- [ ] Hi-fi screens for every in-scope flow, RTL and LTR.
- [ ] All applicable states from the 19-state checklist (at minimum default, empty, loading, error, success, disabled, offline, permission denied).
- [ ] Prototype linked and working.
- [ ] Annotations for non-obvious behaviour (motion, conditional logic, focus order).
- [ ] Every component is a Syntropy library instance, not detached; new components flagged with a DS backlog ticket.

## Tokens and specs
- [ ] Colours are semantic tokens (`bg/*`, `text/*`, `border/*`, `icon/*`), no hex.
- [ ] Spacing uses `space/*` (0, 2, 4, 8, 12, 16, 20, 24, 32, 48, 64).
- [ ] Typography uses built text styles (`role / size / weight`).
- [ ] Radii use `radius/*`; icons are `Icon / <name>` from the Syntropy library.
- [ ] Light and Dark both checked.

## Accessibility
- [ ] Contrast checked in both modes (pairs from the audited table; known system issues listed).
- [ ] Touch targets 48dp in the app (44pt iOS minimum), 24px on web.
- [ ] Screen-reader labels specified for non-text and icon-only elements, Arabic and English.
- [ ] Focus order documented (RTL and LTR).
- [ ] Text scales to 200% without loss; money never truncated.

## Content
- [ ] Final Arabic copy and final English copy (no placeholders).
- [ ] Passes the content quality checklist (product UI group).
- [ ] Numbers, currency and dates follow Safqah format.
- [ ] Regulated wording (risk, Sharia, CMA, consent) confirmed by Compliance.

## Tracking
- [ ] Mixpanel event spec attached; names `object_action` in snake_case; properties defined.
- [ ] Success metric agreed by PM and UX.

## Engineering and pre-launch
- [ ] Capacity confirmed; handoff questions answered.
- [ ] New DS components scoped; Widgetbook use cases planned for new or changed components.
- [ ] Design QA done on the build; Widgetbook parity checked.
- [ ] Accessibility audit on the built version (Flutter guideline tests, axe for web, one Arabic screen-reader pass).
- [ ] Lint clean on the changed files.
- [ ] Events verified in Mixpanel Live View; QA sign-off; launch date logged.

## Handoff meeting agenda
1. Figma: screens, prototype, annotations.
2. Brief: constraints and edge cases.
3. Syntropy components used, and any new ones needed.
4. RTL behaviours and edge cases.
5. Accessibility requirements.
6. Event spec.

## Examples
| Item | Pass | Fail |
| --- | --- | --- |
| States | Empty, loading (`SkeletonBlock`), error and offline frames for the deal list | happy path only |
| Tokens | card fill `bg/elevated`, padding `space/lg` | `#FFFFFF`, 15px |
| Copy | «لا توجد صفقات مفتوحة حاليًا» final in both languages | Lorem ipsum in the Arabic frame |
| Tracking | `deal_viewed` with `deal_id`, `layout_direction` | "we'll add events after launch" |

## Sources
- Notion: TEMPLATE Handoff Checklist `3481a53e-1a6b-8104-8864-fe438f676aab`
- Notion: 04 Deliver `3481a53e-1a6b-8133-8d9a-c9a74ee1304c`
- `data/ux/checklists/handoff.md`
