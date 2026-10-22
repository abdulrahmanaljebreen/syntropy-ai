# Template: Mixpanel event spec (Deliver, Measure)

Naming and structure standard for all Mixpanel tracking, plus the per-feature spec that every Deliver handoff must include. Read this before naming an event, adding a property, or verifying tracking before launch.

## Rules

1. Event names follow `[object]_[action]`.
   Why: one predictable pattern makes Lexicon searchable.
2. snake_case, all lowercase.
   Why: avoids duplicates like `dealViewed` beside `deal_viewed`.
3. Past tense for completed actions (`viewed`, `submitted`, `created`); present tense only for ongoing states (`session_active`).
   Why: the name says what happened.
4. No abbreviations unless universally understood (`kyc` is fine, `sgn_up` is not).
   Why: new team members must read events without a decoder.
5. No brand prefix: `safqah_` is forbidden.
   Why: every event is Safqah's.
6. Arabic concepts in English transliteration only (`murabaha_selected`).
   Why: ASCII event names across tools.
7. Specify tracking in Define, confirm at handoff, verify in Live View before launch.
   Why: broken tracking wastes the whole Measure phase.
8. Every new event gets a Lexicon description and a feature tag.
   Why: Lexicon rot makes Mixpanel untrustworthy within months.

## Template

```
# Event spec: [feature]

## Header
- Feature:
- Spec author: (usually UX or PM)
- Date:
- Status: Draft / Approved / Instrumented / Verified in Live View

## Events
### Event: [event_name]
- Description: (one sentence)
- When it fires: (precise trigger: user action, screen load, API response)
- Fires once per: (session / action / day / lifetime)
- Owner: (team)
Properties:
| Property | Type | Example | Required? | Notes |
|---|---|---|---|---|
| | string | | Yes | |
| | number | | No | |
| | boolean | | Yes | |
(Repeat per event.)

## Standard properties (sent with every event; confirm captured)
- user_id (or distinct_id for anonymous)
- session_id
- app_version
- os (iOS / Android)
- os_version
- device_model
- locale (ar-SA, en-SA, etc.)
- layout_direction (rtl / ltr)

## User properties (super-properties)
| Property | Updated when | Values |
|---|---|---|

## Funnels this feature is part of
- Funnel name, step position, link to report

## Success metrics this feature informs
(Link to the problem statement.)
- Primary metric:
- Guardrail metrics:
- Leading metrics:

## Verification checklist (before launch)
- [ ] All events instrumented in Flutter code
- [ ] All events visible in Mixpanel Live View with correct properties
- [ ] Property values match expected types and formats
- [ ] Events added to Lexicon with descriptions
- [ ] Events tagged with the feature name
- [ ] Funnels updated in Mixpanel

## Lexicon hygiene (at the next monthly audit)
- [ ] Events have descriptions in Lexicon
- [ ] No duplicates created (e.g. dealViewed beside deal_viewed)
- [ ] Events marked canonical / in use
```

### Monthly Lexicon audit (Measure)
First Monday of the month, 2-4 hours: deprecate unused events; add missing descriptions; flag duplicates and naming inconsistencies; rename off-convention events; review property cardinality.

## Examples
| Do | Don't |
|---|---|
| `deal_viewed` | `DealViewed`, `viewDeal`, `safqah_deal_view` |
| `investment_committed` | `invest_btn_click` |
| `kyc_step_completed` with `step_number` | `kyc_step3_done` |
| `account_created` | `sgn_up` |
| `murabaha_selected` | `مرابحة_selected` |
| `session_active` (ongoing state) | `session_activated` for an ongoing state |

## Sources
- Notion: TEMPLATE Mixpanel Event Spec, `3481a53e-1a6b-815d-b1ac-fe98054d0f39`.
- Notion: 05 Measure (Lexicon audit), `3481a53e-1a6b-81fb-8298-ea91f1948bbd`; 04 Deliver (tracking verification), `3481a53e-1a6b-8133-8d9a-c9a74ee1304c`.
