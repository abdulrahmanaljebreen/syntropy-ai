# Invest and reserve

The flow from «استثمر الآن» to a confirmed investment or reservation: amount entry, honest reservation hold, confirmation summary, success. Read this before building any amount-entry, checkout summary or reservation screen.

## Job of the screen
Let the investor commit an exact amount they understand (what they pay, what fees apply, what they expect back, when) and confirm it once, with no surprises after the button.

## When to use
- Investing from a deal page (retail and qualified).
- Reserving a deal: qualified early access, or a retail hold while a bank transfer arrives.
- Not for: wallet top-up or withdrawal (`wallet-and-cash-out.md`), payment method choice (`payment.md`).

## Product rules that shape the UI
- All investments are paid from the wallet. If the wallet is short, the flow offers a top-up for the gap, then returns here.
- Amounts are in multiples of 1,000 and at most 500,000 per payment today. These limits come from the backend at runtime; never hardcode them in the UI (the numbers in this file are current examples). State the rule before the user hits it.
- The deal's remaining capacity is a ceiling: clamp or explain, never let the CTA stay enabled above it.

## Flow steps
1. **Amount entry** (full screen or `BottomSheet`). States: Empty, Valid, Not multiple, Snap, Above cap, Above remaining, Wallet shortfall.
2. **Optional reservation**: when the deal opens later or payment is by transfer, the user reserves; the hold and its real expiry are shown.
3. **Review** (`BottomSheet` summary): amount, fees, expected net profit, expected payout date, consent.
4. **Processing**: `Button` `State=loading`; sheet stays, inputs disabled.
5. **Success**: confirmation screen naming the deal and amount; next step (view investment).
6. **Failure**: stay on review with an inline `Alert`; amount kept (see `errors-and-recovery.md`).
7. **Reservation expiry**: the timer reaches 00:00, copy says the reservation was released and offers «احجز مجدداً» if possible.

## Layout recipe: amount entry (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Close Icon-Black"` `Direction=RTL`, title «مبلغ الاستثمار» | `bg/base` |
| 2 | Wallet context | `WalletChip` `Direction=RTL` (wallet label + `MoneyAmount` `Size=sm`) or `Keypad / Title row` | Shows what is available before typing |
| 3 | Amount | Qualified / keypad: `Keypad / Amount input` `State=` live state `Direction=RTL` (contains `Keypad / Amount hero`). Retail form: `Input Amount` `Size=lg` `State=focus` `Show Label` true, Label «المبلغ», Helper «بمضاعفات 1,000 ر.س». Fixed steps: `Amount Stepper` `Show Actions=true` or `NumericStepper` | Amount is the hero; never `Size=sm` |
| 4 | One context block | Exactly one of: `Keypad / Summary card` `Type=Projection` (expected profit), `Keypad / Presets` (quick amounts as `Tag`), `Keypad / Hint` `Tone=Warning` with a fix `Button` `Variant=secondary` `Size=sm` («اجعلها 5,000») | Hint text explains; colour never alone |
| 5 | Keypad | `Sheet Content / Amount keypad` (product keypad inside) | Digits never mirror |
| 6 | Footer CTA | `Button` `Variant=primary` `Size=lg`: «استثمر 5,000 ر.س» when valid; «أودع 2,000 ر.س وأكمل» when the wallet is short; «استثمر الآن» `State=disabled` otherwise | Safe area below |

Inline variant on the deal page: `Calculator / Amount card` + `Calculator / Results card` (qualified) or `Investment-amount` `User=Regular` (retail), then the CTA opens step 3 with the amount prefilled.

## Layout recipe: reservation

| Slot | Component + key props | Notes |
|---|---|---|
| Hold summary | `BottomSheet` `showHandle` `showHeader` `showFooter`; `SheetHeader` title «تم حجز 50,000 ر.س»; content `Sheet Content / Summary` | Names the deal and amount |
| Deadline | `Countdown` `Has Lable=true` `Direction=RTL` with a text line «ينتهي الحجز في 15 أكتوبر 2026، 18:00» | Always show the absolute time next to the timer |
| Persistent reminder | `Collapsed-Reservation` `Direction=RTL` (sticky on the deal page and portfolio); `Has Multi-deals ?` for several holds | Tap opens the hold |
| Inline chip | `Small Timer` `Property 1=Black` normally; `Yellow` in the last 24 hours | Never red unless the hold has failed |
| Transfer details (retail hold) | `KeyValue` rows with copy icon for IBAN and reference (see `payment.md`) | |

## Layout recipe: review sheet

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Shell | `BottomSheet` `showHandle=true` `showHeader=true` `showFooter=true` `Direction=RTL` over `bg/overlay` | One sheet at a time |
| 2 | Header | `SheetHeader` `showSubtitle=true` `showClose=true`: title «مراجعة الاستثمار», subtitle = deal name | |
| 3 | Summary | `Sheet Content / Summary`: `KeyValue` rows «المبلغ» `5,000.00 ر.س`, «رسوم المنصة» «تُخصم من الربح», «صافي الربح المتوقع» `612.50 ر.س`, «نسبة صافي العائد المتوقع» `12.3%`, «موعد السداد المتوقع» «متوقع ~7 يناير 2027», then `Divider`, then `List / DescriptionRow` `Emphasis=Total` «المبلغ المخصوم من المحفظة» `5,000.00 ر.س` | Transactional amounts with two decimals |
| 4 | Compliance | `ComplianceBadge` `Type=Shariah` (compact) + separate unticked `Checkbox` `Size=lg` rows, one per acknowledgement: «اطلعت على نشرة الإصدار» (with a `Link`), «أوافق على الشروط والأحكام» (with a `Link`), «أفهم مخاطر الاستثمار» | Each checkbox unchecked by default; never bundle acknowledgements into one (see syntropy-compliance-ux) |
| 5 | Footer | `SheetFooter` `Layout=Stacked` `showSecondary=true`: primary «تأكيد الاستثمار», secondary «تعديل المبلغ» | Primary disabled until consent |

Success screen: `AppBar` `Type="Close Icon-Black"`; `Illustrations` `Property 1=Chosen checkmark`; title heading/22/bold «تم استثمار 5,000.00 ر.س في الحجاز ريفيرا»; `KeyValue` rows (reference with copy icon, expected payout date); `Button` primary «عرض استثماري», `Button` `Variant=text` «العودة للصفقات». No confetti, no emoji.

## Required states

| State | Treatment |
|---|---|
| Loading | Opening the sheet: `SkeletonLine` rows in the summary while fees compute. Submitting: `Button` `State=loading`, `Input Amount` `State=disabled` |
| Empty | Amount empty: `Keypad / Amount input` `State=Empty`, CTA disabled; hint shows the rule («بمضاعفات 1,000 ر.س، حتى 500,000 ر.س») |
| Error | Validation: `Input Amount` `State=error` + helper with the fix; keypad states `Not multiple`, `Above cap`, `Above remaining` with a fix button. Submit failed: `Alert` `Tone=error` `Style=Filled` in the sheet, amount kept, CTA «إعادة المحاولة» |
| Success | Success screen above; `Toast` only when returning to a screen that already shows the result |
| Disabled | Deal filled during entry: CTA disabled, `Alert` `Tone=warning` «اكتمل تمويل الصفقة»; amount locked after confirm: `Input Amount` `State=disabled` |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Rule hint | «بمضاعفات 1,000 ر.س، حتى 500,000 ر.س للدفعة» | "In multiples of 1,000 SAR, up to 500,000 SAR per payment" |
| Not multiple | «المبلغ يجب أن يكون من مضاعفات 1,000» | "Amount must be a multiple of 1,000" |
| Above remaining | «المتبقي لإكمال تمويل الصفقة 300,000 ر.س» | "300,000 SAR left to fully fund this deal" |
| Shortfall CTA | «أودع 2,000 ر.س وأكمل» | "Deposit 2,000 SAR and continue" |
| Reservation expiry | «انتهى الحجز وأُعيد المبلغ إلى الصفقة.» | "Your reservation ended and the amount was released." |

## Compliance notes
- Projected figures are labelled «متوقع» with the assumption (term, rate); never "guaranteed". Net return is the headline figure; show gross, the fee (with VAT) and that it is taken from profit before the confirm button.
- Consent checkbox must be unchecked by default and link the real prospectus and terms. Confirm wording with Compliance.
- Reservation: the timer counts the real hold; no artificial urgency, no "others are viewing". At expiry, say what happened to the hold. Reservation terms (refundability, transfer deadlines) confirm with Compliance.
- Qualified limits and the per-payment cap are stated up front, not discovered by failure.
- Use «نسبة» on percentage labels («نسبة صافي العائد المتوقع»), not on SAR amounts.

## Accessibility notes
- Announce keypad hint changes (live region) whenever the tone changes; warning colour always has text.
- `Countdown` is not read every second: expose the absolute end time and announce at 1 hour and 5 minutes left. Respect reduced motion (no flip animation).
- The review sheet traps focus, returns focus to the CTA on close; the close button is labelled.
- `Checkbox` `Size=lg` (24dp box plus label hit area).

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Wise | Review screen listing every amount and fee before one confirm button |
| Robinhood | Amount-first keypad entry with a live summary and a single state-driven CTA |
| Derayah / Sahm (Saudi) | Arabic order tickets with Western digits and currency after the amount |
| Revolut | Bottom confirmation sheet that names the amount and recipient |

## Anti-patterns
- Resetting the amount to 0 on a validation error.
- A toast that warns about the remaining capacity while the CTA stays enabled.
- A preset chip for an amount the user can never pay (above the cap).
- A countdown in red from the first second, or a timer that silently freezes at 00:00.
- Fees revealed only on the success screen.
- Two primary buttons in the review sheet.

## Sources
- `knowledge/components/amount-input.md` (952:636), `qualified-calculator.md` (3839:2910, Keypad molecules 6035-6036), `investment-calculator.md` (3442:5240, Calculator v2 5994-5998), `reservation-timer.md` (3481:3031, 3448:8514), `bottom-sheet.md` (2634:273, 2646:149), `checkbox.md`, `numeric-stepper.md`.
- Qualified calculator research: Notion `3e21a53e-1a6b-803d-a3a7-e0dd47357a25` (500,000 per-payment cap, wallet-funded payments, ceiling state).
- Goal centre research (reservation R2, transfer-aware hold): Notion `3881a53e-1a6b-8013-8e5e-f025d4a66007`.
- Reference search (Refero, Oct 2026): Wise transfer review and confirm screens.
