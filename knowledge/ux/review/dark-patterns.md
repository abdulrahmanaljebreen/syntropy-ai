# Dark patterns: banned at Safqah

Every deceptive pattern in the deceptive.design taxonomy, what it would look like in an investment app, and the Safqah-safe alternative. All of them are banned (AGENTS.md rule 7). Use when designing growth, onboarding, checkout, retention or notification work, and when reviewing any screen with a commercial goal.

## Rules
1. No pattern below may ship, in any market test, A/B variant or "temporary" campaign. Why: Safqah is regulated by the CMA, operates under Sharia principles that forbid gharar (deceptive uncertainty), and depends on investor trust.
2. A finding of a dark pattern is severity 4 in a review (`review-format.md`). Why: legal, regulatory and trust risk.
3. When a business goal seems to need one of these, use the alternative column and report the conflict to the product owner. Why: there is always an honest version; it is the designer's job to find it.
4. Test for intent and effect: a pattern is deceptive if a reasonable user would decide differently once they understood it. Why: dark patterns are often accidental.

## Taxonomy (deceptive.design)

| Pattern | What it is | Banned Safqah example | Safqah-safe alternative |
| --- | --- | --- | --- |
| Comparison prevention | making options hard to compare | deals show returns in different units (annual on one card, total on another) | same metrics, same units and precision on every `CardDeal`; comparison of term and net return in one table |
| Confirmshaming | guilt-tripping wording on the decline option | «لا، لا أريد تنمية أموالي» to dismiss a reinvest prompt | neutral decline: «ليس الآن» (`Button Variant=text`) |
| Disguised ads | ads styled as content or navigation | partner promotion styled as a `CardDeal` or a `NewsCard` update | label sponsored content «إعلان» and use a distinct container; never in deal lists |
| Fake scarcity | false claims of low stock or limited availability | «بقي 3 مقاعد فقط» when there is no seat limit | real remaining amount from funding data: «المتبقي 120,000.00 ر.س من 2,000,000.00 ر.س» with `ProgressBar` |
| Fake social proof | invented reviews, counts or activity | «اشترى أحمد من الرياض قبل دقيقتين» toasts generated randomly | real, aggregated, dated counts («230 مستثمرًا في هذه الفرصة» if true), or nothing |
| Fake urgency | false time pressure | countdown that resets on reload; «العرض ينتهي اليوم» with no real deadline | real closing date and real reservation hold (`ReservationTimer`) with a clear explanation of what happens at zero |
| Forced action | requiring an unrelated action to proceed | must enable notifications or share contacts to see deals; must invite friends to unlock a deal | ask for permissions in context with a primer (`BottomSheet`), allow «ليس الآن»; referrals optional |
| Hard to cancel (roach motel) | easy to start, hard to stop | auto-invest or a reservation can be started in one tap but cancelled only via support chat | cancel in the same place and with the same effort as start; cancellation window stated before confirm |
| Hidden costs (drip pricing) | costs revealed late | management fee appears only on the final screen or after investing | fees on the deal page and in the summary (`KeyValue` الرسوم) before confirm; net return shown next to gross |
| Hidden subscription | recurring charge disguised as one-off | "auto-reinvest" defaulted on in checkout, recurring without clear consent | recurring options are separate, opt-in, explained with amount and frequency, cancellable any time |
| Nagging | repeated interruptions for something the user declined | reinvest prompt on every app open after «ليس الآن» | respect dismissals; at most one reminder per event (for example per payout), and a setting to turn it off |
| Obstruction | making a task harder than necessary to discourage it | withdrawal hidden 4 levels deep, with extra questions and delays | «سحب» next to the balance; same number of steps as deposit |
| Preselection | default chosen in the business's favour | risk acknowledgement pre-ticked; highest amount chip preselected; marketing consent checked | unticked `Checkbox` for acknowledgements and consent; no preselected amount or a neutral default the user chose before |
| Sneaking | adding items or changing terms without clear consent | adding an insurance or premium service to the checkout total | nothing added that the user did not choose; summary shows every line |
| Trick wording | ambiguous or double-negative copy | «لا تلغِ الاشتراك في عدم استلام العروض» | plain positive statements: «أرسل لي عروض الفرص الجديدة» with a `Switch` |
| Visual interference | design that hides or distracts from important info | fee shown in `text/subtle` tiny text; «إلغاء» styled as plain text next to a huge green «تأكيد» in a money-loss decision | fees in `text/default` at body size; both choices clearly visible; destructive or exit actions readable (`Button Variant=secondary` or `text` with sufficient contrast) |

### Older names you may meet (map to the above)
| Older name | Maps to |
| --- | --- |
| Bait and switch | Sneaking, Trick wording |
| Roach motel | Hard to cancel, Obstruction |
| Privacy zuckering | Preselection, Trick wording (data sharing defaults) |
| Misdirection | Visual interference |
| Price comparison prevention | Comparison prevention |
| Friend spam | Forced action (contact upload, auto-invites) |
| Disguised ads | Disguised ads |

## Safqah-specific red lines
- Projected returns are never presented as guaranteed. Use «متوقع» and state the basis. Closed deals show actual outcomes when available, not the original projection.
- Risk and loss scenarios are as visible as returns (same `Section` level, same text size).
- Never use red or warning tones to manufacture urgency on neutral facts (closing date, remaining amount). Warning tone only for real warnings.
- Do not gamify investing in ways that encourage over-investing (streaks for investing, confetti tied to amount size).
- Notifications that bring users back to invest are useful (a new deal, a payout), never manipulative («ستفوتك الفرصة!» when nothing is closing).
- Qualified-investor and regulatory limits are explained, not hidden behind a silent cap.

## Review questions
1. Would the user make the same choice if every cost, condition and default were stated plainly on this screen?
2. Is declining, cancelling or withdrawing as easy as accepting, starting or depositing?
3. Is every number of scarcity, urgency or social proof computed from live data?
4. Is any default chosen for the business rather than the user?
5. Does copy shame, pressure or confuse?

## Sources
- https://www.deceptive.design/types
- https://www.deceptive.design/
- https://www.nngroup.com/articles/deceptive-patterns/
- AGENTS.md rule 7
