# Template: Mixpanel event spec (Define, Deliver, Measure)

Naming conventions and the per-feature spec. Draft it in Define (before design), finalise it at handoff, verify it in Live View before launch. Open this whenever you name an event or a property.

## Naming rules
1. Event names are `object_action`: `deal_viewed`, `investment_committed`, `kyc_step_completed`.
   Why: one predictable pattern keeps Lexicon searchable.
2. snake_case, all lowercase, for events and properties.
   Why: avoids `dealViewed` beside `deal_viewed`.
3. Past tense for completed actions (`viewed`, `submitted`, `started`, `completed`); present tense only for ongoing states (`session_active`).
   Why: the name says what happened.
4. No abbreviations unless universal (`kyc`, `iban` are fine; `sgn_up`, `btn` are not).
   Why: readable without a decoder.
5. No brand prefix (`safqah_` is forbidden); no screen numbers or step numbers in the name (use a property).
   Why: every event is Safqah's; `kyc_step3_done` breaks when steps change.
6. Arabic concepts in English transliteration only (`murabaha_selected`, `zakah_calculated`).
   Why: ASCII names across tools.
7. Search Lexicon before creating an event; reuse and extend with properties instead of adding a near-duplicate.
   Why: duplicates split the data.
8. Every event gets a Lexicon description and a feature tag; properties have a type and an example.
   Why: Lexicon rot makes Mixpanel untrustworthy.
9. Never send PII (names, national ID, IBAN, phone, email) as event properties; use ids.
   Why: PDPL and data minimisation.
10. Each success metric in the problem statement maps to at least one event (or a Metabase source) in this spec.
    Why: otherwise the metric cannot be measured.

## Property conventions
| Kind | Convention | Examples |
|---|---|---|
| Ids | `<object>_id`, string | `deal_id`, `payout_id` |
| Money | number in SAR, two decimals, name says what it is | `amount`, `fee_amount`, `net_amount` |
| Booleans | `is_` / `has_` prefix | `is_qualified`, `has_fee` |
| Enums | lowercase snake values, list them | `source`: `deal_list`, `notification`, `payout_detail` |
| Position | integer from 1 | `position` |
| Direction | `layout_direction`: `rtl` / `ltr` | standard property |

## Template
```
# Event spec: [feature]
- Spec author / date
- Status: Draft / Approved / Instrumented / Verified in Live View

## Metrics this spec feeds (from the problem statement)
- Primary: [metric] = [event A] then [event B] within [window]
- Guardrail:
- Leading:

## Events
### [event_name]
- Description: (one sentence)
- Fires when: (precise trigger: tap, screen shown, API success)
- Fires once per: session / action / view / lifetime
- New or existing in Lexicon:
| Property | Type | Example | Required | Notes |
|---|---|---|---|---|

## Standard properties (confirm captured on every event)
user_id (or distinct_id), session_id, app_version, os, os_version, device_model, locale (ar-SA, en-SA), layout_direction (rtl, ltr)

## User properties
| Property | Updated when | Values |
|---|---|---|

## Funnels
- Name, step positions, report link

## Verification (before launch)
- [ ] Instrumented in code
- [ ] Visible in Live View with correct properties and types
- [ ] Lexicon descriptions and feature tag added
- [ ] Funnels updated
```

## Example: deal page
Metrics: primary invest start rate from deal view; guardrail cancellations within 48 hours; leading offering document opens per view.

| Event | Fires when | Key properties |
|---|---|---|
| `deal_viewed` | Deal page shown | `deal_id`, `deal_status`, `source` (`deal_list`, `notification`, `deep_link`, `reinvest`), `is_qualified` |
| `deal_section_viewed` | A section scrolls into view, once per view | `deal_id`, `section` (`returns`, `distributions`, `guarantees`, `timeline`, `sharia`) |
| `offering_document_opened` | Offering document link tapped | `deal_id`, `document_type` |
| `investment_calculator_used` | Amount changed in the calculator, once per view | `deal_id`, `amount` |
| `invest_started` | Primary invest action tapped | `deal_id`, `deal_status`, `remaining_limit` |
| `deal_shared` | Share action completed | `deal_id`, `channel` |

## Example: reinvest after payout
| Event | Fires when | Key properties |
|---|---|---|
| `payout_detail_viewed` | Payout detail shown | `payout_id`, `payout_amount`, `source` |
| `reinvest_prompt_viewed` | Reinvest section first visible | `payout_id`, `recommendation_count` |
| `reinvest_recommendation_tapped` | A recommendation tapped | `payout_id`, `deal_id`, `position` |
| `investment_committed` (existing, add property) | Investment confirmed | add `source` = `reinvest` and `payout_id` |
Primary metric: share of `payout_detail_viewed` users with `investment_committed` within 7 days. Guardrail: `cashout_submitted` completion rate does not drop.

## Example: zakah calculator
`zakah_calculator_opened` (`source`), `zakah_calculated` (`holdings_count`, `has_cash_balance`), `zakah_method_viewed`, `zakah_result_shared`. Never send the calculated zakah amount with identity; amounts as numbers only.

| Do | Don't |
|---|---|
| `deal_viewed` | `DealViewed`, `viewDeal`, `safqah_deal_view` |
| `investment_committed` | `invest_btn_click` |
| `kyc_step_completed` + `step_number` | `kyc_step3_done` |
| `murabaha_selected` | `مرابحة_selected` |
| `cashout_submitted` + `amount` | `cashout_submitted` + `iban` |

## Monthly Lexicon audit
First Monday, 2-4 hours: deprecate unused events, add missing descriptions, flag duplicates, rename off-convention events, check property cardinality.

## Sources
- Notion: TEMPLATE Mixpanel Event Spec `3481a53e-1a6b-815d-b1ac-fe98054d0f39`; 05 Measure `3481a53e-1a6b-81fb-8298-ea91f1948bbd`; 04 Deliver `3481a53e-1a6b-8133-8d9a-c9a74ee1304c`.
- Full copy: `references/data/ux/lifecycle/mixpanel-event-spec.md`. Example event names are proposals: check Lexicon for existing names first.
