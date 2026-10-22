# Errors and recovery

How Safqah tells users something went wrong and how they continue: inline field errors, the choice between Alert, Banner, Toast and Dialog, network and offline, payment failure, and retry. Read this before writing any error state or choosing a feedback component.

## Job of the screen
Say what happened in plain words, keep everything the user already entered, and put the next action within one tap. Errors explain what to do, not what broke (T5).

## When to use
Any time an action or load fails, input is invalid, the device is offline, or a step is blocked. For "nothing to show" use `empty-states.md`.

## Choosing the component

| Situation | Component | Props | Why |
|---|---|---|---|
| One field is invalid | `Input` / `Input Amount` / `Select` `State=error` with helper text, or `Form Field` `State=error` (`Form Field Helper` `Tone=error`) | Helper names the fix | The error sits where the fix is |
| Several fields invalid after submit | Field errors as above + one `Alert` `Tone=error` `Style=Filled` at the top of the form («يوجد حقلان يحتاجان تعديلاً») | Focus moves to the first invalid field | Summary + location |
| A section of the screen failed (calculator, schedule) | `Alert` `Tone=warning` `Style=Outlined` or `Style=Plain` inside that section, `showButton` «إعادة المحاولة» | Rest of screen stays usable | Partial failure is not a page failure |
| Account-level or page-level issue that persists (KYC action needed, payment method failed, maintenance) | `Banner` `Tone=warning` / `error` / `neutral` `Style=Filled` at the top, `showButton` for the fix; `showClose=false` if it must persist | One banner per screen | Highest-attention persistent message |
| A background action failed and the user can ignore it | `Toast` `Tone=error` `Size=Small` | No actions in Toast | Transient, non-blocking |
| Connection lost / restored | `Toast` `Tone=warning` `Size=Small` «لا يوجد اتصال» / `Tone=info` «عاد الاتصال» | | Status change, not a task |
| Whole region failed to load | `EmptyState` `Tone=error` with retry | | The error is the content |
| Irreversible or financially significant confirmation | `Dialog` `Tone=destructive` (or `default`) `Size=sm` | Confirm label names the action | Strongest interruption; use sparingly |
| Step in a flow failed validation | `StepIndicator` `State=error` in the `Stepper` + inline errors | Block advancing | Shows where the problem is |
| Upload failed | `File Item with Progress` `State=error` with inline «إعادة المحاولة» | File kept | Contextual recovery |
| OTP wrong / expired | `OTP Input` `State=error` (digits kept) / `State=disabled` + resend | | |
| Submit button while the form is invalid | `Button` `Variant=error` (not `destructive`) or keep `Variant=primary` enabled and validate on tap | | "Something is wrong", not "this is dangerous" |

Never invent a success or warning `Dialog` tone; never put an action in a `Toast`.

## Validation timing
1. Validate a field on blur (when the user leaves it), not on every keystroke.
2. Once a field shows an error, re-validate on each keystroke so the error clears as soon as it is fixed.
3. Validate everything on submit; scroll and focus to the first error.
4. Format-only help (multiples of 1,000, starts with 05) is shown as the helper before any error.
5. Server errors map back to the field when possible; otherwise an `Alert` at the top.

## Flow steps: generic action failure
1. User taps the primary action: `Button` `State=loading`, inputs `State=disabled`.
2. Failure returns: button back to default, inputs re-enabled, values kept.
3. Show the error in the right component (table above) with one recovery action.
4. Retry repeats the same request (idempotent on the server for payments).
5. After a second failure, add a secondary route («تواصل معنا» `Link`).

## Payment failure (money moved or not)
| Outcome known? | Component | Copy |
|---|---|---|
| Declined, nothing charged | `Alert` `Tone=error` `Style=Filled` on the review sheet + `showButton` «إعادة المحاولة» | «لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ.» |
| Unknown (timeout) | `Alert` `Tone=warning` + polling spinner; retry hidden until resolved | «نتحقق من حالة الدفع. لا تكرر العملية.» |
| Charged but investment failed | `Banner` `Tone=error` on the wallet with what happens to the money | «تم إرجاع 5,000.00 ر.س إلى محفظتك» |

## Network and offline
| State | Treatment |
|---|---|
| Offline on load | Full-area `EmptyState` `Tone=error` with `Illustrations` `Web - Globe` and «إعادة المحاولة»; cached content shown if available with a `Banner` `Tone=neutral` «تعرض آخر بيانات محفوظة» |
| Offline mid-session | `Toast` `Tone=warning` `Size=Small` once; disable money actions (`Button` `State=disabled`) with a helper line |
| Back online | `Toast` `Tone=info` `Size=Small`; refresh stale regions silently |
| Pull to refresh fails | `Pull-to-refresh` returns to `idle`, `Toast` `Tone=error` `Size=Small` |
| Slow (over 10 s) | Keep the spinner and add one line «قد يستغرق ذلك وقتاً أطول» |

## Required states
- **Loading**: in-button loading for actions; skeletons for regions; never both.
- **Empty**: see `empty-states.md`.
- **Error**: the table above.
- **Success after recovery**: the normal success state; optionally `Toast` `Tone=success`.
- **Disabled**: actions that cannot work right now are disabled with one line saying why and how to unblock.

## Copy
| Situation | Arabic | English |
|---|---|---|
| Phone format | «رقم الجوال يجب أن يبدأ بـ 05» | "Mobile number must start with 05" |
| Amount | «المبلغ يجب أن يكون من مضاعفات 1,000» | "Amount must be a multiple of 1,000" |
| Load failed | «تعذر تحميل البيانات» / «إعادة المحاولة» | "Couldn't load this" / "Try again" |
| Offline | «لا يوجد اتصال بالإنترنت» | "No internet connection" |
| Locked | «تم إيقاف المحاولات مؤقتاً. حاول بعد 30 دقيقة.» | "Too many attempts. Try again in 30 minutes." |
| Generic server | «حدث خلل من جهتنا. حاول مرة أخرى.» | "Something went wrong on our side. Try again." |

Rules: no error codes in the title (put a reference in a `KeyValue` with copy icon if support needs it); no blame («أدخلت قيمة خاطئة»); no «خطأ:» prefix; warnings in warning tone, red only for real failures and defaulted states.

## Compliance notes
- When money is involved, say whether money moved and where it is now. Confirm wording with Compliance.
- Risk-check or AML holds use neutral "under review" wording and never reveal the reason. Confirm with Compliance.
- Do not use errors to push upsell or alternative products.

## Accessibility notes
- Field errors are linked to the field (`aria-describedby` / Flutter `errorText`) and announced; colour plus icon plus text.
- `Alert` and `Banner` errors are announced as alerts once; `Toast` politely.
- Focus moves to the first invalid field on submit, to the `Alert` for page-level errors.
- `Dialog` traps focus and returns it to the trigger; the confirm label names the action («سحب»), never «نعم».

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| GOV.UK Design System | Error summary at the top plus inline messages linked to fields |
| Wise | Payment failures that state whether money left the account |
| Monzo | Offline and degraded states that keep cached data visible |
| Baymard Institute | Inline validation timing research for forms |

## Anti-patterns
- Clearing the form or the amount after an error.
- A toast for a blocking error, or a dialog for a trivial one.
- Red for warnings (late payment, incomplete profile).
- "Error 500" or raw server text shown to users.
- Validating on every keystroke from the first character.
- Several banners stacked at the top.

## Sources
- `knowledge/components/alert.md` (1950:212), `banner.md` (1993:212), `toast.md` (1964:142), `dialog.md` (2359:2), `input.md`, `form-field.md`, `stepper.md`, `file-upload.md`, `otp-input.md`, `button.md`, `scroll-container.md` (Pull-to-refresh 4014:201382), `empty-state.md`.
- Voice: `knowledge/content/voice-tone.md` (T5, warning vs error), `copy-lengths.md`.
