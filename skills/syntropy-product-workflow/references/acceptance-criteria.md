# Acceptance criteria and the Safqah ticket

How to write testable acceptance criteria in Given/When/Then and the exact ticket format used at Safqah. Open this when writing tickets for engineering, or when asked "write acceptance criteria for X".

## The Safqah ticket format
A ticket has exactly three sections, nothing else:

```
## Description
(1-3 sentences: what changes and why, for whom.)

## Figma
(Link to the RTL frame; LTR frame link on the next line if separate.)

## Acceptance criteria
- [ ] Given [context], when [action], then [observable result].
- [ ] ...
```

No PRD, no research dump, no design rationale in the ticket; link the handoff doc from the Figma frame or the PR instead.

## Rules
1. One behaviour per criterion, in Given/When/Then, written as a checkbox.
   Why: QA and the PM tick them one by one.
2. "Then" is observable: on screen, in copy, in an event, in an API call. No "works well", "is intuitive", "looks good".
   Why: unverifiable criteria cannot fail, so they cannot pass.
3. Cover, per screen: happy path, every designed state (empty, loading, error, success, disabled, offline, permission denied), money edge cases, RTL and LTR, accessibility, and tracking.
   Why: these are the parts most often missed in builds.
4. Quote the final copy, Arabic first, in the criterion when copy matters.
   Why: the copy is the spec.
5. Values that come from the backend (limits, fees, rates) are criteria about display, never hardcoded numbers the client computes.
   Why: the backend is the source of truth for every limit and rate.
6. Name components and tokens exactly when a criterion is about them.
   Why: maps to Widgetbook.
7. Tracking criteria name the event and its required properties.
   Why: Live View verification needs the exact name.

## Criterion patterns
| Area | Pattern |
|---|---|
| Happy path | Given [state], when [user action], then [result + next screen] |
| Validation | Given [input value], when [field loses focus / submit], then [inline message] and [button state] |
| Loading | Given [data is loading], when [screen opens], then `Skeleton` shows in place of [region] |
| Empty | Given [no data], when [screen opens], then `EmptyState` with [copy] and [one action] |
| Error | Given [API fails], when [action], then [message: what happened + what to do] and [retry] |
| Offline | Given [no connection], when [screen opens], then [cached data] + one `Banner` with [copy] |
| RTL | Given the app language is Arabic, when [screen opens], then [layout starts right; directional icons mirrored; digits not reversed] |
| Accessibility | Given a screen reader is on, when focus reaches [control], then it announces [label] |
| Tracking | Given [state], when [action], then `event_name` fires once with [properties] |

## Example 1: withdraw screen (سحب الأموال)
```
## Description
Investors can withdraw available wallet balance to their verified bank account. The screen shows the available balance, the backend-calculated fee before confirmation, and when the money arrives.

## Figma
[RTL frame link]
[LTR frame link]

## Acceptance criteria
- [ ] Given the wallet has an available balance, when the investor opens «سحب الأموال», then the available balance shows with two decimals and the currency after the amount (for example «الرصيد المتاح 12,500.00 ر.س» / "Available balance 12,500.00 SAR").
- [ ] Given the investor types an amount above the available balance, when the field loses focus, then the inline message «المبلغ أكبر من رصيدك المتاح.» / "Amount is more than your available balance." shows and the primary `Button` is disabled.
- [ ] Given the backend returns a cash-out fee for the amount, when the amount is valid, then a fee line and the net amount received show before the confirm action, with the values the backend returned.
- [ ] Given the backend returns no fee, when the amount is valid, then no fee line shows (no «0.00» fee row).
- [ ] Given a valid amount, when the investor taps «متابعة», then a `BottomSheet` summary shows amount, fee, net amount, destination bank and expected arrival time, with one primary `Button` «تأكيد السحب».
- [ ] Given the investor confirms, when the request succeeds, then a success state shows the reference number and expected arrival time.
- [ ] Given the request fails, when the investor confirms, then the message says what happened and what to do next, and the entered amount is kept.
- [ ] Given no bank account is verified, when the screen opens, then the amount field is disabled and one action leads to adding a bank account.
- [ ] Given the investor opens the withdraw screen, when it renders, then no reinvest prompt, "are you sure" wall or extra step blocks the withdrawal.
- [ ] Given the device is offline, when the screen opens, then the last known balance shows with one `Banner` in the warning tone «لا يوجد اتصال بالإنترنت.» and confirm is disabled.
- [ ] Given the app is in Arabic, when the screen renders, then the layout starts at the right, the back arrow points right, and IBAN digits read left to right.
- [ ] Given a screen reader is on, when focus reaches the amount field, then it announces its label and the available balance.
- [ ] Given the withdrawal is submitted, when the backend confirms, then `cashout_submitted` fires once with `amount`, `fee_amount`, `has_fee`, `layout_direction`.
```

## Example 2: reinvest suggestion after payout
```
## Description
After a payout lands, the payout detail screen suggests open deals so investors can reinvest the returned amount. Withdrawing stays one tap away.

## Figma
[RTL frame link]

## Acceptance criteria
- [ ] Given a payout was received and open deals exist, when the investor opens the payout detail, then a `Section` «استثمر مبلغك من جديد» shows up to 3 `Reinvest / RecommendationCard` items below the payout summary.
- [ ] Given no open deals exist, when the payout detail opens, then the section is hidden (no empty card) and the withdraw action remains.
- [ ] Given recommendations show, when they render, then each projected return is labelled «نسبة العائد المتوقع» with one decimal (for example 14.5%), never "guaranteed".
- [ ] Given recommendations are loading, when the screen opens, then `Skeleton` shows in their place and the payout summary is already visible.
- [ ] Given the investor taps a recommendation, when the deal page opens, then `reinvest_recommendation_tapped` fires once with `payout_id`, `deal_id`, `position`.
- [ ] Given the section is visible on screen, when it first appears, then `reinvest_prompt_viewed` fires once per payout detail view with `payout_id`, `recommendation_count`.
```

## Example 3: deal page, invest entry
```
- [ ] Given a deal in Raising status («جارٍ جمع الأموال»), when the investor opens it, then one primary `Button` «استثمر» shows in the sticky footer above the safe area.
- [ ] Given the investor is retail, when the footer renders, then the remaining limit returned by the backend shows next to the action.
- [ ] Given the deal page opens, when it renders, then the main risk line and the link to the offering document are visible before the invest action.
- [ ] Given the deal is Funded («مموّلة»), when the page opens, then the invest action is replaced by the funded state and no countdown shows.
```

## Don't
| Weak | Why | Better |
|---|---|---|
| "Withdraw works correctly." | Not observable | Split into the criteria above |
| "Show a 2% fee." | Client-side rule; the fee depends on how the money was deposited | "Show the fee the backend returns" |
| "Looks like Figma." | Not testable alone | Reference the parity checklist in design QA, and state specific behaviours |
| "Track clicks." | No event or properties | "`cashout_submitted` fires once with ..." |
| Acceptance criteria in a paragraph | Cannot be ticked | Checkboxes, one behaviour each |

## Sources
- Safqah ticket format (Description, Figma, Acceptance criteria) as used by the product team.
- Repo knowledge: `content/glossary.md` (Cashout, issuance statuses), `content/numbers-currency.md`, `ux/compliance/README.md` (wallet and cash-out, invest), `research/recipes.md` (reinvest at payout time).
