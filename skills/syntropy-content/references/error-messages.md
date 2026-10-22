# Error messages

How to write a Safqah error so the user can fix it on first read, plus 27 real examples in Arabic and English. Open this for any validation message, failed action, blocked limit, rejection or system failure.

## The formula
**What happened** (plain fact, no blame) + **what to do next** (one action) [+ **reassurance about money** only when it is true].

| Part | Arabic shape | English shape |
|---|---|---|
| What happened | «الرمز غير صحيح.» · «انتهت صلاحية الرمز.» · «تعذر تحميل الصفقة» | "Incorrect code." · "This code has expired." · "Couldn't load the deal" |
| What to do | Imperative or verbal noun: «اطلب رمزاً جديداً.» · «إعادة المحاولة» | "Request a new one." · "Try again" |
| Money reassurance | «لم يتم خصم أي مبلغ.» | "No amount was charged." |

## Rules
1. Lead with the fact, then the fix. One or two short sentences, 8-20 words.
   Why: T5; the next action must be obvious on first read.
2. No blame: describe the input, not the person. «رقم الجوال يجب أن يبدأ بـ 05», not «أدخلت رقماً خاطئاً».
   Why: blame raises anxiety and support load.
3. No apology filler, no humour, no emoji: never «عذراً»، «للأسف»، «أوه!»، "Oops", "Sorry", "Uh-oh".
   Why: filler delays the fix and trivialises money problems.
4. Never «خطأ» / "Error" alone, never «حدث خطأ ما» / "Something went wrong" without a next step, never a raw code ("ERR_502") as the message. A reference code may follow in small text for support.
   Why: a name is not an action.
5. State the limit or rule with the real number from the backend: «الحد المتاح 10,000.00 ر.س».
   Why: CMA fair treatment; a block without a reason is a dead end.
6. Say «لم يتم خصم أي مبلغ» / "No amount was charged" only when the system knows it is true. When the outcome is unknown, say so and tell the user not to pay again.
   Why: a false reassurance on money is worse than none.
7. Pick the surface by scope: field → inline helper; action → `Alert` in place; screen → `EmptyState` `Tone=error`; connectivity → `Toast` `Tone=warning`.
   Why: the message sits where the problem is.
8. Tone: blocking failures use `Tone=error`; recoverable "needs attention" states (rejected document, limit reached, deal filled) use `Tone=warning` unless the action is blocked and money is at risk.
   Why: red only for critical.
9. Keep what the user entered. Do not clear OTP boxes, amounts or uploaded files on failure.
   Why: the user can see and fix the one wrong part.
10. Upgrades are offered neutrally as information, never as the reward for hitting a limit.
    Why: CMA, no undue pressure to become qualified.

## Examples
Placeholders in `{braces}` are backend values.

### Verification and sign-in
| # | Trigger | Surface and tone | Arabic | English | Action |
|---|---|---|---|---|---|
| 1 | OTP wrong | `OTP Input` `State=error`, helper | «الرمز غير صحيح. أدخله مجدداً أو اطلب رمزاً جديداً.» | "Incorrect code. Enter it again or request a new one." | «إعادة إرسال الرمز» / "Resend code" |
| 2 | OTP expired | `OTP Input` `State=disabled`, helper | «انتهت صلاحية الرمز. اطلب رمزاً جديداً.» | "This code has expired. Request a new one." | «إرسال رمز جديد» / "Send new code" |
| 3 | Too many OTP attempts | `Banner` `Tone=warning` | «تجاوزت عدد المحاولات. يمكنك طلب رمز جديد عند {time}.» | "Too many attempts. You can request a new code at {time}." | none until then |
| 4 | Session expired | Full screen or `Dialog` | «انتهت الجلسة لحماية حسابك. سجّل الدخول مجدداً.» | "Your session ended to protect your account. Sign in again." | «تسجيل الدخول» / "Sign in" |
| 5 | Face ID not recognised | Inline under the prompt | «لم يتم التعرف على Face ID. أعد المحاولة أو أدخل رمز الدخول.» | "Face ID not recognised. Try again or enter your passcode." | «إدخال رمز الدخول» / "Enter passcode" |
| 6 | Nafath verification failed | `Alert` `Tone=error` | «تعذر التحقق عبر نفاذ. تأكد من الموافقة في تطبيق نفاذ ثم أعد المحاولة.» | "Couldn't verify with Nafath. Approve the request in the Nafath app, then try again." | «إعادة المحاولة» / "Try again" |
| 7 | Absher verification failed | `Alert` `Tone=error` | «تعذر التحقق عبر أبشر. أعد المحاولة بعد قليل.» | "Couldn't verify with Absher. Try again shortly." | «إعادة المحاولة» |

### Forms and KYC
| # | Trigger | Surface and tone | Arabic | English | Action |
|---|---|---|---|---|---|
| 8 | Phone format | Field helper `State=error` | «رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام» | "Phone number must start with 05 and have 10 digits" | fix in place |
| 9 | Required field empty | Field helper | «أدخل رقم الهوية» | "Enter your ID number" | fix in place |
| 10 | ID number format | Field helper | «رقم الهوية يتكون من 10 أرقام ويبدأ بـ 1 أو 2» | "ID number has 10 digits and starts with 1 or 2" | fix in place |
| 11 | IBAN format invalid | Field helper | «الآيبان يبدأ بـ SA ويتكون من 24 خانة. تحقق منه وأعد إدخاله.» | "An IBAN starts with SA and has 24 characters. Check it and enter it again." | fix in place |
| 12 | IBAN name mismatch | `Alert` `Tone=warning` on the bank step | «اسم صاحب الحساب لا يطابق اسمك في الهوية. ارفع شهادة آيبان باسمك أو أضف حساباً آخر.» | "The account holder name doesn't match your ID. Upload an IBAN certificate in your name or add another account." | «رفع الشهادة» / "Upload certificate" |
| 13 | KYC rejected: unclear document | KYC hub `Alert` `Tone=warning` | «صورة الهوية غير واضحة. ارفع صورة تظهر فيها جميع البيانات.» | "The ID photo isn't clear. Upload a photo that shows all details." | «تحديث» / "Update" |
| 14 | KYC rejected: reason from review | KYC hub `Alert` `Tone=warning` | «لم يكتمل توثيق حسابك: {reason}. حدّث البيانات المطلوبة وأعد الإرسال.» | "Your verification isn't complete: {reason}. Update the details and resubmit." | «تحديث» |
| 15 | File too large | `File Item with Progress` `State=error` | «حجم الملف أكبر من 10 ميجابايت. ارفع ملفاً أصغر.» | "The file is larger than 10 MB. Upload a smaller file." | «إعادة المحاولة» inline |
| 16 | File format unsupported | `File Item with Progress` `State=error` | «صيغة الملف غير مدعومة. استخدم PDF أو JPG أو PNG.» | "This file type isn't supported. Use PDF, JPG or PNG." | «إعادة المحاولة» inline |

### Amounts and limits
| # | Trigger | Surface and tone | Arabic | English | Action |
|---|---|---|---|---|---|
| 17 | Above the 500,000 SAR payment cap (non-qualified) | `Input Amount` `State=error` helper | «الحد الأعلى للدفعة الواحدة {cap} ر.س. خفّض المبلغ أو تعرّف على تصنيف المستثمر المؤهل.» (cap is 500,000 today) | "The maximum per payment is {cap} SAR. Lower the amount or learn about qualified investor status." | «ما هو المستثمر المؤهل؟» link |
| 18 | Above remaining personal limit | `Input Amount` `State=error` helper | «تجاوزت حدك الاستثماري لهذه الصفقة. الحد المتاح {available} ر.س» | "This exceeds your limit for this deal. Available: {available} SAR" | «استخدام الحد المتاح» / "Use available amount" |
| 19 | Below minimum | Field helper | «الحد الأدنى للاستثمار {min} ر.س» | "Minimum investment is {min} SAR" | fix in place |
| 20 | Not a multiple of 1,000 | Field helper | «المبلغ يجب أن يكون من مضاعفات 1,000» | "Amount must be a multiple of 1,000" | fix in place |
| 21 | Above what is left in the deal | Field helper `Tone=warning` | «المتبقي لإكمال تمويل الصفقة {left} ر.س. خفّض المبلغ إلى هذا الحد أو أقل.» | "{left} SAR left to fully fund this deal. Lower the amount to this or less." | «استخدام المبلغ المتبقي» |
| 22 | Wallet balance too low | Footer CTA changes | «رصيد المحفظة {balance} ر.س. أودع {gap} ر.س لإكمال الاستثمار.» | "Wallet balance {balance} SAR. Deposit {gap} SAR to complete the investment." | «أودع {gap} ر.س وأكمل» |
| 23 | Cash-out above balance | Field helper | «المبلغ أكبر من رصيدك المتاح {available} ر.س» | "The amount is more than your available balance of {available} SAR" | «سحب كامل الرصيد» / "Withdraw full balance" |
| 24 | Qualified-only deal, retail user | Disabled CTA + one line | «هذه الصفقة متاحة للمستثمرين المؤهلين فقط.» | "This deal is open to qualified investors only." | «ما هو المستثمر المؤهل؟» link |

### Payments, network and system
| # | Trigger | Surface and tone | Arabic | English | Action |
|---|---|---|---|---|---|
| 25 | Card declined or 3DS failed | `Alert` `Tone=error` `Style=Filled` on review | «لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ.» | "Payment didn't go through. No amount was charged." | «إعادة المحاولة» / "Try again" |
| 26 | Payment outcome unknown (timeout) | Status screen, `Tone=warning` | «لم يصلنا تأكيد الدفع بعد. لا تُعد الدفع، سنحدّث حالة العملية خلال دقائق.» | "We haven't received payment confirmation yet. Don't pay again; we'll update the status within minutes." | «العودة للمحفظة» / "Back to wallet" |
| 27 | Network offline | `Toast` `Tone=warning` `Size=Small` | «لا يوجد اتصال. تحقق من الاتصال وأعد المحاولة.» | "No connection. Check your connection and try again." | auto-dismiss; retry in place |

More patterns from the same formula:
| Trigger | Arabic | English |
|---|---|---|
| Deal failed to load | «تعذر تحميل الصفقة» + «إعادة المحاولة» | "Couldn't load the deal" + "Try again" |
| Deals list failed | «تعذر تحميل الصفقات» + «إعادة المحاولة» | "Couldn't load deals" + "Try again" |
| Deal filled during entry | `Tone=warning` «اكتمل تمويل الصفقة. لم يتم خصم أي مبلغ.» + «تصفح الصفقات» | "This deal is now fully funded. No amount was charged." + "Browse deals" |
| Reservation expired | «انتهى الحجز وأُعيد المبلغ إلى الصفقة.» + «احجز مجدداً» when possible | "Your reservation ended and the amount was released." + "Reserve again" |
| Cancellation window passed | «انتهت مهلة إلغاء الاكتتاب في {deadline}.» | "The cancellation window ended on {deadline}." |
| Server error during submit | «تعذر إتمام العملية الآن. أعد المحاولة بعد قليل.» (+ «لم يتم خصم أي مبلغ» only if known) | "Couldn't complete this now. Try again shortly." |
| Annual method limit reached | Disabled `SelectRow` value «تجاوزت الحد السنوي» | "Annual limit reached" |
| Password rule | «كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل رقماً» | "Password must be at least 8 characters and include a number" |

## Don't
| Don't | Why | Do |
|---|---|---|
| «خطأ» / "Error" | Name, not action | «أدخل رقم الهوية» |
| «حدث خطأ ما، يرجى المحاولة لاحقاً» | Vague, no reason | «تعذر تحميل الصفقة» + «إعادة المحاولة» |
| «عذراً! أدخلت رمزاً خاطئاً 😕» | Apology, blame, emoji | «الرمز غير صحيح. أدخله مجدداً أو اطلب رمزاً جديداً.» |
| «لا يمكن إتمام العملية» on a limit | Dead end, no reason | Example 18 |
| «ارفع مستواك الآن لتحصل على عوائد أكبر!» on the cap | Upgrade as reward, pressure | Example 17 |
| "ERR_IBAN_403" | Code as message | Example 12, with the code in small support text if needed |
| Red `Tone=error` for a rejected document | Alarm on a recoverable state | `Tone=warning` with the specific item |

## Sources
- `references/data/content/voice-tone.md` (T5), `references/data/content/copy-lengths.md` (error 8-20 words).
- `references/data/components/otp-input.md`, `file-upload.md`, `amount-input.md`, `alert.md`, `toast.md`, `kyc-step.md`.
- Syntropy patterns: invest and reserve, payment, KYC, deal list. Compliance guidance: CMA rules 7 and 8 (limits, 500,000 SAR product cap for non-qualified investors), SAMA (OTP purpose).
