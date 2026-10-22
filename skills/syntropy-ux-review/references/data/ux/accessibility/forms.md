# Forms

Accessible forms for Safqah: sign-up, KYC, bank account (IBAN), investment amount, OTP, withdrawal, back-office edits. Covers labels, hints, errors, OTP, amount inputs and not asking twice. Use with `wcag22-aa.md` (3.3.x) and `screen-readers.md`.

## Rules
1. Every field has a visible, persistent label above it (`Form Field Label`, `Input Label`, `Show Label=true`). Placeholder is never the label. Why: SC 3.3.2; placeholders vanish on typing and use `text/subtle` (large-only contrast).
2. Label, hint and error are programmatically tied to the input. Flutter: `InputDecoration(labelText:, helperText:, errorText:)` or one `Semantics` with label, hint and the error in `value`/`hint`. Web: `<label for>`, `aria-describedby` pointing to hint and error ids, `aria-invalid="true"`. Why: SC 1.3.1, 4.1.2.
3. Show at most one short hint per field, only when the format is not obvious (IBAN, national ID, date). Why: minimal copy rule; hints that restate the label are noise.
4. Validate on submit and on blur, never on every keystroke for format errors. Clear the error as soon as the value becomes valid. Why: errors that fire while typing are announced repeatedly and feel hostile.
5. Error state = `Input State=error` (red border, `border/error`) + error text in `text/error` + error icon. Never colour alone. Why: SC 1.4.1, 3.3.1.
6. Error text follows the formula: **what is wrong + how to fix it**, in one sentence, without blame. Why: SC 3.3.3.
7. On submit with errors: short forms (up to 4 fields) focus the first invalid field; longer forms show an `Alert Tone=error` summary at the top listing each error as a link to its field, and move focus to it. Why: users of screen readers and magnifiers find all errors.
8. Never clear user input after an error (except the OTP after expiry, and password fields if security requires). Why: re-typing an IBAN is how mistakes happen.
9. Required fields: mark optional ones with «(اختياري)» instead of starring required ones, since most Safqah fields are required. Why: fewer symbols, clearer meaning, and asterisks are read as «نجمة».
10. Do not ask for data already given in this process (Redundant Entry, SC 3.3.7). Prefill from KYC or earlier steps and show it with «تعديل». Why: new in 2.2; also reduces abandonment.
11. Set input purpose and keyboard: `autofillHints` / `autocomplete`, `keyboardType` (`TextInputType.number`, `phone`, `emailAddress`). Why: SC 1.3.5; faster, fewer typos.
12. Group related controls with a group label (`Radio Group`, `Checkbox Group`, `<fieldset><legend>`). Why: "نعم/لا" without its question is meaningless to a screen reader.
13. Disabled submit buttons are avoided; let the user submit and show what is missing. If a Button must be `State=disabled`, explain why next to it. Why: disabled buttons are skipped or unexplained, and `text/disabled` has no contrast requirement.

## Error text formula

`<what is wrong> + <how to fix>`. Arabic first.

| Situation | Do | Don't |
| --- | --- | --- |
| Empty required | «أدخل رقم الهوية الوطنية» | «هذا الحقل مطلوب» |
| IBAN format | «رقم الآيبان يبدأ بـ SA ويتكون من 24 خانة» | «آيبان غير صالح» |
| IBAN name mismatch | «اسم صاحب الحساب لا يطابق اسمك المسجل. أضف حسابًا باسمك أو ارفع شهادة الآيبان» | «خطأ في التحقق» |
| Amount below minimum | «أقل مبلغ للاستثمار 1,000.00 ر.س» | «المبلغ غير صحيح» |
| Amount above balance | «المبلغ أعلى من رصيدك المتاح 4,250.00 ر.س» | «رصيد غير كافٍ» alone |
| Amount above qualified cap | «الحد الأعلى لهذا الاستثمار 500,000.00 ر.س» | silent clamp |
| Date out of range | «اختر تاريخًا بعد 15/10/2026» | «تاريخ خاطئ» |
| OTP wrong | «الرمز غير صحيح. تبقّت محاولتان» | «خطأ» |
| OTP expired | «انتهت صلاحية الرمز. اطلب رمزًا جديدًا» | expired code still accepted for input |
| Network on submit | «تعذّر الإرسال. تحقّق من الاتصال ثم أعد المحاولة» (keep inputs) | form reset |

English pattern: "Enter an IBAN that starts with SA and has 24 characters."

## OTP (`OTP Input`)
- One logical field for assistive tech: label «رمز التحقق»; value read as digits; boxes are visual only. Flutter: a single `TextField` with `maxLength` drawn as boxes, `autofillHints: [AutofillHints.oneTimeCode]`, `keyboardType: TextInputType.number`. Web: one `<input inputmode="numeric" autocomplete="one-time-code" maxlength="6">`.
- Paste works anywhere in the field (SC 3.3.8).
- Auto-submit on the last digit is allowed only if the result is announced and the user can still correct; never auto-submit a money action.
- Resend: `Button Variant=text` «إعادة إرسال الرمز» with countdown «بعد 0:45». Announce when it becomes available, not every second.
- Show where the code was sent: «أرسلنا الرمز إلى ‎+966 5X XXX XX12» (number in an LTR isolate).
- Expiry follows SC 2.2.1: warn, allow a new code, keep the rest of the form.

## Amount inputs (`Input Amount`, `Amount Stepper`, `Keypad / Amount input`, `Calculator / Amount card`)
- Label names the purpose and currency: «مبلغ الاستثمار (ر.س)». Semantics label uses «ريال سعودي».
- Numeric keyboard with decimal (`TextInputType.numberWithOptions(decimal: true)`); Western digits only; accept pasted Eastern Arabic digits and normalise them.
- Format with grouping as the user types without moving the cursor unexpectedly; announce the formatted value on blur, not on each key.
- Show min, max and available balance as one hint line: «الحد الأدنى 1,000.00 ر.س · المتاح 4,250.00 ر.س».
- Never silently clamp or round. If the value exceeds a limit, keep what was typed and show the error.
- Quick-amount chips (`Keypad / Presets`) are buttons with full labels «5,000 ريال سعودي».
- Sliders always have an editable field or stepper twin (SC 2.5.7).
- The amount on the confirm step is identical in value and format to the input (see `../review/fintech-heuristics.md`, numeric consistency).
- Never truncate an amount with ellipsis; scale or wrap (`dynamic-type.md`).

## Redundant entry checklist (SC 3.3.7)
- Name, national ID, date of birth: from Nafath/KYC, read-only with a way to report an error.
- IBAN: entered once in the bank step; later shown masked in `KeyValue` («ينتهي بـ 1234») with «تعديل».
- Investment amount: carried from `Investment Calculator` to `Checkout` and `Payment-details`.
- Address: «نفس العنوان الوطني» `Checkbox` instead of retyping.
- Allowed repeats: password confirmation is discouraged (use show/hide instead); re-auth for security (Face ID, OTP) is allowed by the SC.

## KYC specifics
- `KYCStep` / `KYCChecklist`: each step announces progress «الخطوة 2 من 5».
- Document capture: provide manual upload (`Upload Button`, `File Item`) as an alternative to live camera; describe the required document in text, not only an illustration.
- Long questionnaires: save progress automatically; allow leaving and resuming.
- Regulatory questions (investor suitability) use `Radio Group` with full-sentence options; never pre-select an answer.

## Flutter recipe

```dart
TextFormField(
  controller: ibanCtrl,
  autofillHints: const [],
  textDirection: TextDirection.ltr, // IBAN is LTR inside RTL UI
  keyboardType: TextInputType.text,
  decoration: InputDecoration(
    labelText: 'رقم الآيبان',
    helperText: 'يبدأ بـ SA ويتكون من 24 خانة',
    errorText: ibanError, // null when valid; announced by the framework
  ),
  validator: validateIban,
  autovalidateMode: AutovalidateMode.onUserInteraction, // after first blur/submit
);
```

## Web recipe

```html
<label for="amount">مبلغ الاستثمار (ر.س)</label>
<input id="amount" inputmode="decimal" aria-describedby="amount-hint amount-err" aria-invalid="true">
<p id="amount-hint">الحد الأدنى 1,000.00 ر.س</p>
<p id="amount-err">أقل مبلغ للاستثمار 1,000.00 ر.س</p>
```

## Quick test
1. Submit the empty form with a screen reader on: errors are announced, focus lands correctly.
2. Every error passes the formula (what + fix).
3. Paste into OTP and IBAN works; autofill offers phone and code.
4. Walk the whole flow and count repeated questions: 0.
5. Grayscale screenshot of an error state: still clear.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#error-identification
- https://www.w3.org/WAI/WCAG22/quickref/#redundant-entry
- https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-minimum
- https://www.w3.org/WAI/tutorials/forms/
- https://api.flutter.dev/flutter/material/InputDecoration-class.html
