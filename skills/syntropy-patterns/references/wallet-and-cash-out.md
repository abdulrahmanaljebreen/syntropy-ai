# Wallet and cash-out

The wallet: balance, activity, linked bank accounts, withdrawing to the bank, and recovering when the bank account name does not match the investor's identity (IBAN certificate). Read this before building the wallet screen, bank-account management, the withdraw flow or the name-mismatch fix.

## Job of the screen
Show what money is available and where it sits, let the investor move it to their own bank honestly and quickly, and get them unstuck when a bank account cannot be verified.

## When to use
- Wallet tab or wallet entry from `WalletChip` in the app bar.
- Withdraw after a payout, or any time.
- Adding, verifying, or replacing a bank account.
- Not for: top-ups (`payment.md`), holdings (`portfolio.md`).

## What research says (shapes the flow)
- The cash-out decision is made at the payout moment, not on the withdraw screen: about half of payouts are withdrawn within 30 days, most of those within 24 hours. Persuasion, if any, belongs at the payout (`Reinvest / MaturityRecap` with equal choices), never as friction on the withdraw screen.
- About 4% of bank-account adds hit a name mismatch and most stay stuck for weeks: the mismatch fix must be a guided, resumable task.

## Flow steps
1. **Wallet**: balance (maskable), available vs held amounts, activity list, linked bank account.
2. **Withdraw amount**: presets (full balance, half), free entry; shows what stays in the wallet.
3. **Review**: amount, destination account (masked IBAN), fee if any, arrival time; one confirm.
4. **Processing → submitted**: status «قيد المراجعة» / «قيد التحويل», never "completed" before it is.
5. **Done**: activity row updates; push when the bank transfer settles.
6. **Bank accounts**: list, add (IBAN + bank), verification states (verified, pending, name mismatch).
7. **Name mismatch recovery**: explain in one line, request an IBAN certificate (شهادة الآيبان) upload or a different account in the investor's name; track status; resume from a task row.

## Layout recipe: wallet (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` «المحفظة» | |
| 2 | Balance | `Stat` `Size=lg` `Layout=vertical` label «الرصيد المتاح» with the value from `MoneyAmount` `Size=lg` `Tone=default`; `BalanceToggle` `State=Show/Hide` beside it | Padding `space/lg`. Masked shows ••••• |
| 3 | Breakdown | `KeyValue` `Layout=horizontal` `Size=md`: «محجوز لاستثمارات قيد التنفيذ», «قيد التحويل إلى البنك» | Only rows with a value |
| 4 | Actions | `ButtonGroup` `Orientation=horizontal` `Spacing=default`: «سحب» (`Variant=secondary`) and «إيداع» (`Variant=primary`) | One primary |
| 5 | Bank account | `Section` `Size=Md` «الحساب البنكي» + `ActionList` `Style=Grouped` with one `ListItem` (`Has leading` bank icon, title = bank name, description = masked IBAN `SA•• •••• 7519`, `Has label` with `StatusPill` `Tone=success` «موثّق», `Has chevron`) | |
| 6 | Activity | `Section` `Size=Md` «العمليات» `Has action` «عرض الكل» + `List` `Style=Divided` of `ListItem` rows (title, date, `Has value` amount with sign: `+1,250.00 ر.س` / `-5,000.00 ر.س`) | Sign plus colour, never colour alone |

## Layout recipe: withdraw

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Close Icon-Black"` «سحب إلى البنك» | |
| 2 | Amount | `Input Amount` `Size=lg` `Show Label=true` «المبلغ», helper «المتاح 12,500.00 ر.س» (or `Keypad / Amount input` with `Keypad / Title row`) | |
| 3 | Presets | `Tag Group` `Layout=inline` of `Tag` `Style=subtle`: «كامل الرصيد», «النصف» | Computed from the balance |
| 4 | What stays | `KeyValue` «يبقى في المحفظة» `0.00 ر.س` | Live |
| 5 | One context line (optional) | `Form Field Helper` `Tone=info` «لديك صفقة مفتوحة تطابق استثمارك السابق» with `Link` | At most one line; no modal |
| 6 | Destination | `ListItem` (bank, masked IBAN, `Has chevron` to change) | |
| 7 | Footer | `Button` `Variant=primary` `Size=lg` «مراجعة السحب» | |

Review: `BottomSheet` with `Sheet Content / Summary` (`KeyValue` «المبلغ», «إلى», «الرسوم» (or «بدون رسوم»), «الوصول المتوقع» «1-2 يوم عمل», then `List / DescriptionRow` `Emphasis=Total` «يصلك» with the exact net amount) and `SheetFooter` primary «تأكيد السحب». If the platform supports cancelling within a window, the success state offers «إلغاء السحب».

## Layout recipe: name mismatch (IBAN certificate)

| Slot | Component + key props | Notes |
|---|---|---|
| Status on the account row | `ListItem` with `StatusPill` `Tone=warning` «مطلوب إجراء» | Warning, not error |
| Explanation | `Alert` `Tone=warning` `Style=Filled` «اسم صاحب الحساب لا يطابق اسمك في الهوية» + `showButton` «حل المشكلة» | One alert on the wallet screen |
| Fix screen | `Section` `Size=Lg` «أرفق شهادة الآيبان» `Has description`; `Upload Button` with formats hint; `File Item with Progress` states; `Divider`; `Button` `Variant=text` «استخدام حساب آخر باسمك» | Two real options |
| Waiting | `KYCTaskRow`-style status or `Alert` `Tone=info` «نراجع الشهادة خلال يومي عمل» | Resumable from the wallet |
| Rejected certificate | `File Item with Progress` `State=error` + helper with the exact reason («الشهادة لا تظهر اسم صاحب الحساب») | Keep the history |

## Required states

| State | Treatment |
|---|---|
| Loading | `SkeletonLine` `Size=XLarge` `Width=Half` for the balance, `SkeletonBlock` for buttons, 5 activity skeleton rows |
| Empty | Zero balance and no activity: balance shows `0.00 ر.س`; activity region `EmptyState` `Tone=default` `Size=Compact` «لا توجد عمليات بعد» + «إيداع». No bank account: `ActionPrompt` `Tone=Brand` «أضف حسابك البنكي» |
| Error | Load failed: `EmptyState` `Tone=error` + retry. Amount above available: `Input Amount` `State=error` «المبلغ أكبر من رصيدك المتاح». Withdraw failed: `Alert` `Tone=error` in the review sheet, amount kept |
| Success | Submitted: screen with `Illustrations` `Bank`, «تم طلب سحب 12,500.00 ر.س», status «قيد التحويل», expected arrival. Not "completed" |
| Disabled | Withdraw disabled while the bank account is unverified: `Button` `State=disabled` + one helper line linking to the fix. Held funds not withdrawable are shown as a separate row, not hidden |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Available | «الرصيد المتاح» | "Available balance" |
| Withdraw CTA | «مراجعة السحب» / «تأكيد السحب» | "Review withdrawal" / "Confirm withdrawal" |
| Arrival | «الوصول المتوقع: 1-2 يوم عمل» | "Expected arrival: 1-2 business days" |
| Mismatch | «اسم صاحب الحساب لا يطابق اسمك في الهوية» | "The account holder name doesn't match your ID" |
| Fix | «أرفق شهادة الآيبان» | "Upload your IBAN certificate" |

## Compliance notes
- Withdrawals go only to a verified account in the investor's own name; explain once, without legal paragraphs. Confirm with Compliance.
- Show the exact amount received; if no fee applies, the received amount equals the requested amount (no rounding or hidden deductions).
- No retention dark patterns: no "are you sure" modal, no hidden withdraw button, no guilt copy. Reinvest suggestions live at the payout moment with Keep as an equal choice.
- Never label a reinvest suggestion «مناسبة لك» (CMA).

## Accessibility notes
- `BalanceToggle` labelled «إظهار الرصيد» / «إخفاء الرصيد»; masked state is announced as hidden, not read as dots.
- Activity amounts read with their sign («مضاف 1,250 ريال»); colour is redundant.
- Masked IBAN read as «ينتهي بـ 7519».
- Upload and status changes announced; retry reachable without re-picking the file.

## Benchmarks
| App (benchmarks, see syntropy-inspiration) | What to learn |
|---|---|
| Wise | Withdraw review that shows exactly what arrives and when |
| Al Rajhi Bank / STC Bank (Saudi) | Beneficiary and IBAN management with verified states in Arabic |
| Monzo | Calm, light withdraw flow with no retention friction |
| Revolut | Presets for full or partial balance |

## Anti-patterns
- Showing 980 for a 1,000 withdrawal with no fee row.
- A success toast over a status that still says under review.
- An "are you sure you want to leave money idle" modal.
- Red error styling for name mismatch (it is a fixable task, warning tone).
- Dropping the user back to "add account" from scratch after a rejected certificate.

## Sources
- `knowledge/components/portfolio-header.md` (MoneyAmount 4240:1642, BalanceToggle 4235:1681, WalletChip 4241:1317), `amount-input.md`, `qualified-calculator.md` (Keypad), `action-list.md`, `list-item.md`, `reinvest.md` (MaturityRecap 6054:1667), `file-upload.md`, `alert.md`.
- Cash-out research: Notion `3fa1a53e-1a6b-8118-8264-efddef405d2f` (decision at payout; 50.5% cash out vs 20.4% reinvest within 30 days; no "are you sure" modal; no-fee display bug).
- IBAN certificate research: Notion `3831a53e1a6b806dab2ed79311804f9d`.
- Capital recycling: `knowledge/components/reinvest.md`.
- Reference search (Refero, Oct 2026): Wise bank verification and transfer review.
