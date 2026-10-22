# Onboarding and sign-in

Getting a person into Safqah: welcome, phone number, one-time code, passcode, the Face ID offer and re-prompt, and account recovery when the phone number is lost. Read this before building any entry, authentication or recovery screen.

## Job of the screen
Let a new user create an account, and a returning user get back in, in as few taps as possible, without weakening security or trapping anyone who lost their number.

## When to use
- First launch (welcome), sign-up, sign-in, re-authentication before sensitive actions, biometric enrolment, lost-number recovery.
- Not for: identity verification after sign-up (`kyc.md`).

## Flow steps
1. **Welcome** (first launch only): one value statement, sign-up and sign-in actions, language switch.
2. **Phone entry**: Saudi number with +966; validate format on blur and on submit.
3. **OTP**: 4-digit SMS code, auto-read where the OS allows; resend after a real cooldown.
4. **Passcode** (create on sign-up, enter on sign-in) with the product keypad.
5. **Face ID / fingerprint offer**: after first passcode creation, only on devices with biometrics enrolled.
6. **Home** (signed in).
7. **Re-prompt** for biometrics: 14 days after a skip, never after 3 skips, never on a money screen.
8. **Recovery** (lost number), from the phone or passcode screen: choose method → Absher ID and date of birth → Absher OTP (proves identity) → new number → OTP to the new number (proves possession) → signed in, prompt to secure the account. Outcomes return to the entry screen as a toast so the user retries in place.

## Layout recipe: phone entry (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type=Onboarding` (entry) with a language `Link` «English»; mid-steps use `Type="Inner screens"` with back | |
| 2 | Title | heading/22/bold «أدخل رقم جوالك» + body/14 `text/muted` one line | Padding `space/lg`, gap `space/sm` |
| 3 | Field | `Input Phone` `Size=lg` `State=focus` `Direction=RTL`, country code `+966` | Digits LTR inside the RTL field. Numeric keyboard |
| 4 | Secondary | `Button` `Variant=text` «فقدت رقم جوالي» (recovery entry) | |
| 5 | Footer | `Button` `Variant=primary` `Size=lg` «متابعة»; terms line body/12 `text/muted` with `Link`s on sign-up only | Sits above the keyboard |

Sign-in and registration may use `Input Underline` instead of the bordered `Input`; never mix the two styles in one flow.

## Layout recipe: OTP

| Slot | Component + key props | Notes |
|---|---|---|
| Title | heading/22/bold «أدخل رمز التحقق» + body/14 «أرسلنا رمزاً إلى 0541234567» with `Link` «تعديل» | Number as entered, never reversed |
| Code | `OTP Input` `Length=4` `Size=lg` `State=empty` → `partial` → `complete` `Direction=RTL` | First digit in the rightmost box |
| Resend | body/13 `text/muted` «إعادة الإرسال بعد 00:45», then `Link` «إعادة إرسال الرمز» | Real cooldown only |
| Verifying | `OTP Input` `State=disabled` + `SpinnerRing` `Size=S` inline | Prevents duplicate submits |

Auto-submit when complete; no extra button needed. If a button is shown, it is disabled until 4 digits.

## Layout recipe: biometric offer and re-prompt

| Slot | Component + key props | Notes |
|---|---|---|
| Shell | `BottomSheet` `showHandle=true` `showHeader=true` `showFooter=true` `Direction=RTL` | Re-prompt only; first offer can be a full screen with the same parts |
| Header | `SheetHeader` title «ادخل أسرع ببصمة الوجه», `showSubtitle` «بصمة الوجه غير مفعّلة في صفقة» | |
| Content | `Sheet Content / Media` or `Sheet Content / Text` with `Illustrations` `Property 1=Face ID standing` | Restrained; no mascot |
| Footer | `SheetFooter` `Layout=Stacked` `showSecondary=true`: «تفعيل بصمة الوجه» / «ليس الآن» | Decline is a real button, same weight row |
| OS prompt | Native Face ID / BiometricPrompt dialog (OS, not Syntropy) | Only after the user taps enable |

## Layout recipe: recovery outcomes
Outcomes appear on the phone-entry screen, not as dead-end pages:

| Outcome | Component | Copy |
|---|---|---|
| Recovered | `Toast` `Tone=success` `Size=Large` | «تم تحديث رقم جوالك» |
| Verification failed | `Toast` `Tone=error` | «تعذر التحقق من بياناتك. حاول مرة أخرى.» |
| Temporarily locked | `Toast` `Tone=warning` + field disabled | «تم إيقاف المحاولات مؤقتاً. حاول بعد 30 دقيقة.» |
| Risk review (account paused) | Full screen: `AppBar` `Type="Small Title"`, `EmptyState` `Tone=default` `Size=Compact` with `Illustrations` `Data info alert`, `KeyValue` reference, `Button` «تواصل معنا» | Warning tone wording, never red |

Recovery methods: Absher (ID number + date of birth via `Input` and `Date Input`) and verified email. Bank/IBAN is not an identity proof and is not offered.

## Required states

| State | Treatment |
|---|---|
| Loading | `Button` `State=loading` on «متابعة»; inputs `State=disabled` while the request runs |
| Empty | Fields empty with placeholders; CTA disabled until the phone number is complete |
| Error | Phone: `Input Phone` `State=error` + helper «رقم الجوال يجب أن يبدأ بـ 05». OTP: `OTP Input` `State=error`, digits kept, helper «الرمز غير صحيح، تبقّى محاولتان». Expired OTP: `State=disabled` + resend link. Network: `Toast` `Tone=warning` `Size=Small` |
| Success | Straight to the next step; no success screen for sign-in. Recovery success uses the toast above, then the "secure your account" step |
| Disabled | Locked after too many attempts: field and CTA disabled, helper with the unlock time |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Phone title | «أدخل رقم جوالك» | "Enter your mobile number" |
| Phone error | «رقم الجوال يجب أن يبدأ بـ 05» | "Mobile number must start with 05" |
| OTP title | «أدخل رمز التحقق» | "Enter the verification code" |
| Resend | «إعادة إرسال الرمز» | "Resend code" |
| Biometric | «ادخل أسرع ببصمة الوجه» / «ليس الآن» | "Sign in faster with Face ID" / "Not now" |
| Lost number | «فقدت رقم جوالي» | "I lost my number" |

## Compliance notes
- Terms and privacy acceptance on sign-up: links to the real documents; consent is an action, not a pre-ticked box. PDPL privacy notice linked. Confirm with Compliance.
- Biometrics stay on the device; say so in one line if asked. Never use biometrics as the only recovery path.
- Recovery via Absher: two OTPs by design (identity, then possession of the new number). Account-risk pauses must not disclose AML reasons; use neutral "under review" wording. Confirm with Compliance.
- Welcome screens: no return promises; any number shown is concrete and accurate («يبدأ الاستثمار من 1,000 ر.س»).

## Accessibility notes
- `OTP Input` exposes one text field with `oneTimeCode` autofill, not four separate fields to the screen reader.
- Announce the resend cooldown when it ends, not every second.
- `Input Phone` country code is read once; the field label is visible, not placeholder-only.
- Biometric decline has a 48x48 target and equal visual prominence row.

## Benchmarks
| App (benchmarks, see syntropy-inspiration) | What to learn |
|---|---|
| STC Bank / Barq (Saudi) | Phone-first sign-up with +966 and a 4-digit SMS code in Arabic |
| Revolut | Verification-method switch as a bottom sheet over the code screen |
| Monzo | Calm biometric offer with a real "not now" |
| Wise | Short recovery paths that explain the next step |

## Anti-patterns
- Clearing all OTP boxes after a wrong code.
- A biometric prompt before the user has a passcode, or every launch after they declined.
- Dead-end failure screens in recovery instead of retry in place.
- A resend link that is active immediately (SMS flooding) or a fake cooldown.
- Marketing carousels longer than three slides before sign-up.

## Sources
- `knowledge/components/input.md` (Input Phone 878:2355, Input Underline 859:2214), `otp-input.md` (923:77), `app-bar.md` (2447:2), `bottom-sheet.md` (2634:273), `empty-state.md` (Illustrations 2071:38797), `toast.md` (1964:142).
- Face ID re-prompt rules: Linear SAF-2942 (offer only with biometrics enrolled; re-ask after 14 days; never after 3 skips).
- Account recovery: Notion `3b91a53e-1a6b-8116-8377-d6085a9dbee6`; Linear SAF-2735.
- Reference search (Refero, Oct 2026): Revolut verification-method sheet.
