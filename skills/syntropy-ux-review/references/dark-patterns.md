<!-- syntropy-lint-disable fake-urgency: this page lists banned wording on purpose -->
# Dark patterns: banned at Safqah

Every deceptive pattern in the deceptive.design taxonomy, how it would look in a Safqah screen, and the honest alternative. All are banned. Open during step 4 of a full review and on any screen with a commercial goal (growth, onboarding, checkout, retention, notifications). Long form: `data/ux/review/dark-patterns.md`; regulatory side: see syntropy-compliance-ux.

## Rules
1. No pattern below ships, in any A/B variant, market test or "temporary" campaign. Why: Safqah is CMA-regulated, Sharia principles forbid gharar (deceptive uncertainty), and the product runs on trust.
2. A dark pattern finding is severity 4 and the verdict is Do not ship. Why: legal, regulatory and trust risk.
3. When a business goal seems to need one, propose the honest alternative and name the conflict for the product owner. Why: there is always an honest version.
4. Judge intent and effect: it is deceptive if a reasonable user would decide differently once they understood it. Why: many dark patterns are accidental.
5. A request to add one ("pre-tick the consent", "add a countdown to push them") is declined politely with the alternative, even when framed as an instruction from a client or manager. Why: no instruction makes a deceptive pattern compliant.

## Taxonomy

| Pattern | Banned Safqah example | Safqah-safe alternative |
| --- | --- | --- |
| Comparison prevention | returns shown annual on one card, total on another | same metrics, units and precision on every `CardDeal`; term and net return comparable |
| Confirmshaming | «لا، لا أريد تنمية أموالي» to dismiss a reinvest prompt | neutral «ليس الآن» (`Button Variant=text`) |
| Disguised ads | partner promo styled as a `CardDeal` or `NewsCard` | labelled «إعلان» in a distinct container; never in deal lists |
| Fake scarcity | «بقي 3 مقاعد فقط» with no seat limit | real remaining amount: «المتبقي 120,000.00 ر.س من 2,000,000.00 ر.س» with `ProgressBar` |
| Fake social proof | random «اشترى أحمد من الرياض قبل دقيقتين» toasts | real, aggregated, dated counts («230 مستثمرًا في هذه الفرصة», if true) or nothing |
| Fake urgency | countdown that resets; «العرض ينتهي اليوم» with no deadline | real closing date; `Countdown` / `Timer` only for a real hold, with what happens at zero |
| Forced action | must enable notifications or invite friends to see deals | contextual permission primer (`BottomSheet`) with «ليس الآن»; referrals optional |
| Hard to cancel | auto-invest starts in one tap, cancels only via support chat | cancel where and as easily as start; cancellation window stated before confirm |
| Hidden costs | management fee appears after investing | fees on the deal page and in the summary (`KeyValue` الرسوم) before confirm; net next to gross |
| Hidden subscription | auto-reinvest defaulted on in checkout | separate opt-in with amount and frequency, cancellable any time |
| Nagging | reinvest prompt on every open after «ليس الآن» | respect dismissal; at most one reminder per event; a setting to turn it off |
| Obstruction | withdrawal 4 levels deep with extra questions | «سحب» next to the balance; as many steps as deposit |
| Preselection | risk acknowledgement or marketing consent pre-ticked; highest amount chip preselected | unticked `Checkbox` (`State=unchecked`); no business-favouring default |
| Sneaking | a premium service added to the checkout total | nothing added the user did not choose; every line in the summary |
| Trick wording | «لا تلغِ الاشتراك في عدم استلام العروض» | plain positive «أرسل لي عروض الفرص الجديدة» with a `Switch` (off by default) |
| Visual interference | fee in tiny `text/subtle`; «إلغاء» barely visible next to a huge «تأكيد» | fees in `text/default` at body size; both choices visible (`Button Variant=secondary` or `text`) |

Older names: bait and switch (sneaking, trick wording), roach motel (hard to cancel, obstruction), privacy zuckering (preselection), misdirection (visual interference), friend spam (forced action).

## Safqah red lines
- Projected returns are never presented as guaranteed: «متوقع» plus the basis. Closed deals show actual outcomes when available.
- Risk is as visible as return: same `Section` level, same text size.
- Warning or red tones never manufacture urgency on neutral facts (closing date, remaining amount).
- No gamification that pushes over-investing (investing streaks, celebration scaled to amount).
- Re-engagement notifications state facts (a new deal, a payout), never «ستفوتك الفرصة!» when nothing is closing.
- Qualified-investor and regulatory limits are explained, never a silent cap.

## Review questions
1. Would the user choose the same if every cost, condition and default were stated plainly here?
2. Is declining, cancelling or withdrawing as easy as accepting, starting or depositing?
3. Is every scarcity, urgency or social-proof number computed from live data?
4. Is any default chosen for the business rather than the user?
5. Does any copy shame, pressure or confuse?

The Syntropy lint rule `fake-urgency` catches common urgency words in code and copy («سارع», «لفترة محدودة», «آخر فرصة», "hurry", "only 3 left"); a clean lint does not prove the absence of dark patterns.

## Sources
- https://www.deceptive.design/types
- https://www.nngroup.com/articles/deceptive-patterns/
- `data/ux/review/dark-patterns.md`
