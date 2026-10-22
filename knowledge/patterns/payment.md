# Payment

Funding money into Safqah: choosing a method (Mada card, Apple Pay, bank transfer), showing transfer details with the IBAN, processing, success and failure. Read this before building wallet top-up, a payment step inside investing, or any screen that shows an IBAN to pay into.

## Job of the screen
Move money from the investor's bank to their Safqah wallet with the method they prefer, show exactly what they pay (and any fee or limit) before they pay, and tell them clearly when it worked, when it is pending and when it failed.

## When to use
- Wallet top-up, and the "deposit the gap" step from `invest-and-reserve.md`.
- Bank-transfer instructions for a retail reservation hold.
- Not for: withdrawals to the investor's bank (`wallet-and-cash-out.md`).

## Product rules that shape the UI
- Investments are paid from the wallet; card, Apple Pay and bank transfer are top-up methods.
- Card top-ups above a threshold may be delayed and an annual top-up cap exists: state the limit on the method row before selection. Limit values come from the backend; never hardcode them.
- Bank transfer is not instant: it is a pending state, not a success.

## Flow steps
1. **Amount** (prefilled with the gap when coming from investing): `Input Amount` `Size=lg`.
2. **Method**: single-choice list. States per row: available, limited (hint), unavailable (disabled with reason).
3. **Review**: `Checkout` with the method, `Payment-details` summary, total.
4. **Processing**: card and Apple Pay hand off to the issuer (3-D Secure / wallet sheet), then return to a processing state.
5. **Result**: success (wallet credited), pending (transfer awaited), failed (retry or change method).
6. **Bank transfer branch**: instructions screen with IBAN, beneficiary name, reference; «تم التحويل» marks it as sent; the wallet updates when funds arrive.

## Layout recipe: method choice (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` `Direction=RTL`, title «إيداع في المحفظة» | |
| 2 | Amount | `Input Amount` `Size=lg` `Show Label=true` «المبلغ», helper with the limit for the selected method | Padding `space/lg` |
| 3 | Methods | `SelectionList` `Mode=Single` `Has header=true` («طريقة الدفع») `Direction=RTL` with one `SelectRow` `Type=Radio` per method: Mada card (leading `MadaLogo` `Size=24` `Tone=Brand`), Apple Pay, bank transfer. `Has value=true` for a short hint («فوري» / «1-2 يوم عمل») | Selected row = brand border + tint (plus radio dot; colour never alone). Gap `space/md` |
| 4 | Limit note (if any) | `Form Field Helper` `Tone=info` `Size=sm` under the affected row | One line |
| 5 | Footer | `Button` `Variant=primary` `Size=lg` «متابعة» | Disabled until a method is chosen |

`MadaLogo` keeps its own colours (`Tone=Brand` on light, `Tone=Inverse` on dark). No Apple Pay mark exists in the manifest: use the OS-provided Apple Pay button/mark per Apple's guidelines and flag it to the DS team.

## Layout recipe: review

| Slot | Component + key props | Notes |
|---|---|---|
| Method + summary | `Checkout` `Method=Credit-card` / `ApplePay` / `Bank-transfer` `Direction=RTL` | Card is shown with the Mada mark and last 4 digits |
| Breakdown | `Payment-details` (amount, fee if any, total) or `Sheet Content / Summary` with `KeyValue` rows and a `List / DescriptionRow` `Emphasis=Total` «الإجمالي» `5,000.00 ر.س` | Two decimals; currency after the amount |
| Promo (only if a campaign is live) | `Promo-code` `State=Not-added` / `Added` | Hide when no campaign; an empty promo field invites abandonment |
| CTA | `Button` primary «ادفع 5,000.00 ر.س» | Names the amount |

## Layout recipe: bank-transfer instructions

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Title | `Section` `Size=Lg` «حوّل إلى حسابك في صفقة» `Has description` («استخدم نفس الحساب البنكي المسجل باسمك») | |
| 2 | Details | `KeyValue` `Layout=stacked` `Size=lg` rows, each `HasIcon=true` with the copy icon: «اسم المستفيد», «الآيبان» `SA03 8000 0000 6080 1016 7519`, «البنك», «الرقم المرجعي». `Emphasis=strong` on the IBAN only | IBAN in groups of 4, LTR-isolated inside the RTL line, never reversed. Copy confirms with `Toast` `Tone=success` `Size=Small` «تم النسخ» |
| 3 | Amount | `KeyValue` «المبلغ» `50,000.00 ر.س` | |
| 4 | Deadline (reservation holds) | `Small Timer` + absolute time text | Real deadline only |
| 5 | Footer | `SheetFooter` or `ButtonGroup` `Orientation=vertical`: primary «تم التحويل», secondary «مشاركة التفاصيل» | |

## Required states

| State | Treatment |
|---|---|
| Loading | Methods: 3 `SelectRow`-sized skeletons (`SkeletonCircle` `Size=M` + `SkeletonLine`). Fees: `SkeletonLine` `Width=Quarter` in the value column |
| Processing | Card / Apple Pay return: centred `SpinnerRing` `Size=L` with one line «جارٍ تأكيد الدفع»; no back navigation that could double-charge. Over 10 seconds: add «قد يستغرق ذلك دقيقة» |
| Empty | No saved card: Mada row shows «إضافة بطاقة مدى»; never an empty list |
| Error | Card declined / 3DS failed: return to review with `Alert` `Tone=error` `Style=Filled` «لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ.» + `showButton` «إعادة المحاولة», and the method list one tap away. Unknown outcome (timeout): `Alert` `Tone=warning` «نتحقق من حالة الدفع» and poll; never tell the user to pay again until the outcome is known |
| Pending | Bank transfer marked sent: `EmptyState` `Tone=default` `Size=Compact` with `Illustrations` `Property 1=Bank`, «سنضيف المبلغ إلى محفظتك فور وصوله», `Button` «العودة للمحفظة» |
| Success | Wallet credited: success screen (`Illustrations` `Chosen checkmark`, «تم إيداع 5,000.00 ر.س في محفظتك», `KeyValue` reference) or, if returning to the invest flow, continue straight to the review sheet with a `Toast` `Tone=success` |
| Disabled | Method unavailable or over limit: `SelectRow` `State=Disabled` with the reason as value text («تجاوزت الحد السنوي») |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Method hints | «بطاقة مدى · فوري» · «تحويل بنكي · 1-2 يوم عمل» | "Mada card · instant" · "Bank transfer · 1-2 business days" |
| Pay CTA | «ادفع 5,000.00 ر.س» | "Pay 5,000.00 SAR" |
| Declined | «لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ.» | "Payment didn't go through. You weren't charged." |
| Pending | «سنضيف المبلغ إلى محفظتك فور وصوله» | "We'll add it to your wallet as soon as it arrives" |
| Copied | «تم النسخ» | "Copied" |

## Compliance notes
- Show every fee (with VAT) and the total before the pay button; no pre-ticked add-ons. SAMA consumer-protection principles apply. Confirm with Compliance.
- Transfers must come from an account in the investor's own name; say so on the instructions screen (name mismatch causes the IBAN-certificate problem in `wallet-and-cash-out.md`).
- Never store or display the full card number; last 4 digits only.
- Limits (annual top-up cap, card thresholds) are disclosed before selection.

## Accessibility notes
- `SelectRow` group uses radio semantics; each row reads method, hint, and limit.
- IBAN is read digit-group by digit-group; the copy button is labelled «نسخ الآيبان» with a 48x48 hit area.
- Processing state announces once («جارٍ تأكيد الدفع») and again on result; spinner respects reduced motion.
- Do not rely on the brand border alone for selection (`border/brand/primary` is under 3:1 in Light); the radio dot carries state.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Wise | Bank-transfer instructions with copy buttons per field and a clear "I've paid" step |
| STC Bank / urpay (Saudi) | Mada and Apple Pay as first-class methods in Arabic RTL |
| Tabby | Method rows that state limits up front |
| Revolut | Processing and declined states that say whether money moved |

## Anti-patterns
- "Payment failed, try again" when the outcome is unknown (risk of double payment).
- Showing a success screen for a bank transfer that has not arrived.
- Recolouring `MadaLogo` to brand green.
- An IBAN rendered as one unbroken string, or reversed inside Arabic text.
- A visible promo field when no promo exists.

## Sources
- `knowledge/components/investment-calculator.md` (Checkout 3442:6812, Payment-details 3448:7619, Promo-code 3442:6739), `mada-logo.md` (3822:332), `list.md` (SelectionList 3242:866, SelectRow 3241:876), `key-value.md`, `loader.md`, `alert.md`.
- Qualified calculator research: Notion `3e21a53e-1a6b-803d-a3a7-e0dd47357a25` (wallet-funded payments, card top-up delays, annual cap).
- Numbers: `knowledge/content/numbers-currency.md` (IBAN never reverses).
- Reference search (Refero, Oct 2026): Wise wire-transfer instructions and review screens.
- Regulation: SAMA consumer protection (links.json `regulation`).
