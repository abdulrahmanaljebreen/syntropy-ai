# Forms

Accessible forms for Safqah: sign-up, KYC, bank account (IBAN), investment amount, OTP, withdrawal, back-office edits. Labels, hints, errors, OTP, amount inputs and never asking twice. Open with `wcag22-aa.md` (3.3.x) and `screen-readers.md`.

## Rules
1. Every field has a visible, persistent label above it (`Form Field Label`, `Input Label`, `Show Label=true`). The placeholder is never the label. Why: SC 3.3.2; placeholders vanish and use `text/subtle` (large-only contrast).
2. Label, hint and error are tied to the input. Flutter: `InputDecoration(labelText:, helperText:, errorText:)`. Web: `<label for>`, `aria-describedby` to hint and error ids, `aria-invalid="true"`. Why: SC 1.3.1, 4.1.2.
3. At most one short hint per field, only when the format is not obvious (IBAN, national ID, date). Why: Safqah minimal copy; hints that restate the label are noise.
4. Validate on submit and on blur, never per keystroke for format errors; clear the error as soon as the value is valid. Why: errors firing while typing are announced repeatedly.
5. Error state = `Input State=error` (`border/error`) + text in `text/error` + error icon. Never colour alone. Why: SC 1.4.1, 3.3.1.
6. Error text = **what is wrong + how to fix it**, one sentence, no blame. Why: SC 3.3.3.
7. On submit with errors: up to 4 fields, focus the first invalid field; longer forms show an `Alert Tone=error` summary at the top with links to each field, and focus it. Why: screen-reader and magnifier users find every error.
8. Never clear input after an error (exceptions: OTP after expiry; password if security requires). Why: re-typing an IBAN causes mistakes.
9. Mark optional fields «(اختياري)» instead of starring required ones. Why: most Safqah fields are required; asterisks are read as «نجمة».
10. Never ask for data already given in the process; prefill from KYC and show it with «تعديل». Why: SC 3.3.7 Redundant Entry.
11. Set input purpose and keyboard: `autofillHints` / `autocomplete`, `keyboardType`. Why: SC 1.3.5; fewer typos.
12. Group related controls with a group label (`Radio Group`, `Checkbox Group`, `<fieldset><legend>`). Why: «نعم / لا» without its question is meaningless.
13. Avoid disabled submit buttons; let the user submit and show what is missing. If `Button State=disabled` is unavoidable, explain why next to it. Why: disabled buttons are skipped and unexplained.
14. Acknowledgement and consent checkboxes start unticked. Why: preselection is a dark pattern and invalid consent (see syntropy-compliance-ux).

## Error text formula (Arabic first)

| Situation | Do | Don't |
| --- | --- | --- |
| Empty required | «أدخل رقم الهوية الوطنية» | «هذا الحقل مطلوب» |
| IBAN format | «رقم الآيبان يبدأ بـ SA ويتكون من 24 خانة» | «آيبان غير صالح» |
| IBAN name mismatch | «اسم صاحب الحساب لا يطابق اسمك المسجل. أضف حسابًا باسمك أو ارفع شهادة الآيبان» | «خطأ في التحقق» |
| Below minimum | «أقل مبلغ للاستثمار 1,000.00 ر.س» | «المبلغ غير صحيح» |
| Above balance | «المبلغ أعلى من رصيدك المتاح 4,250.00 ر.س» | «رصيد غير كافٍ» alone |
| Above a limit | «الحد الأعلى لهذا الاستثمار 500,000.00 ر.س» | silent clamp |
| Date out of range | «اختر تاريخًا بعد 15/10/2026» | «تاريخ خاطئ» |
| OTP wrong | «الرمز غير صحيح. تبقّت محاولتان» | «خطأ» |
| OTP expired | «انتهت صلاحية الرمز. اطلب رمزًا جديدًا» | expired code still accepted |
| Network on submit | «تعذّر الإرسال. تحقّق من الاتصال ثم أعد المحاولة» (inputs kept) | form reset |

English pattern: "Enter an IBAN that starts with SA and has 24 characters."
Limits shown in copy come from the backend for the signed-in user, never hardcoded.

## OTP (`OTP Input`)
- One logical field for assistive tech, label «رمز التحقق»; boxes are visual only. Flutter: one `TextField` drawn as boxes, `autofillHints: [AutofillHints.oneTimeCode]`, `keyboardType: TextInputType.number`. Web: one `<input inputmode="numeric" autocomplete="one-time-code" maxlength="6">`.
- Paste works anywhere (SC 3.3.8).
- Auto-submit on the last digit only if announced and correctable; never for a money action.
- Resend: `Button Variant=text` «إعادة إرسال الرمز» with «بعد 0:45»; announce when available, not every second.
- Say where the code went: «أرسلنا الرمز إلى ‎+966 5X XXX XX12» (number in an LTR isolate).
- Expiry follows SC 2.2.1: warn, offer a new code, keep the rest of the form.

## Amount inputs (`Input Amount`, `Amount Stepper`, keypads, `Calculator / Amount card`)
- Label names purpose and currency: «مبلغ الاستثمار (ر.س)»; semantics uses «ريال سعودي».
- `TextInputType.numberWithOptions(decimal: true)`; Western digits; normalise pasted Eastern Arabic digits.
- Group digits as the user types without jumping the cursor; announce the formatted value on blur.
- One hint line: «الحد الأدنى 1,000.00 ر.س · المتاح 4,250.00 ر.س».
- Never silently clamp or round; keep what was typed and show the error.
- Quick-amount chips are buttons with full labels «5,000 ريال سعودي»; none preselected for the business's benefit.
- A slider always has an editable field or stepper twin (SC 2.5.7).
- The confirm step shows the identical amount and format; never truncate an amount (`dynamic-type.md`).

## Redundant entry (SC 3.3.7)
- Name, national ID, date of birth: from Nafath/KYC, read-only with a way to report an error.
- IBAN: entered once; later masked in `KeyValue` («ينتهي بـ 1234») with «تعديل».
- Amount: carried from the calculator to the summary and payment.
- Address: «نفس العنوان الوطني» `Checkbox` instead of retyping.
- Allowed: security re-auth (Face ID, OTP). Avoid password confirmation fields; offer show/hide.

## KYC specifics
- `KYCStep` / `KYCChecklist` announce progress «الخطوة 2 من 5».
- Camera capture has a manual upload alternative (`Upload Button`, `File Item`); required documents described in text.
- Long questionnaires auto-save and resume.
- Suitability questions use `Radio Group` with full-sentence options; never pre-select.

## Recipes

```dart
TextFormField(
  controller: ibanCtrl,
  textDirection: TextDirection.ltr, // IBAN is LTR inside RTL UI
  decoration: InputDecoration(
    labelText: 'رقم الآيبان',
    helperText: 'يبدأ بـ SA ويتكون من 24 خانة',
    errorText: ibanError, // null when valid; announced by the framework
  ),
  validator: validateIban,
  autovalidateMode: AutovalidateMode.onUserInteraction,
);
```

```html
<label for="amount">مبلغ الاستثمار (ر.س)</label>
<input id="amount" inputmode="decimal" aria-describedby="amount-hint amount-err" aria-invalid="true">
<p id="amount-hint">الحد الأدنى 1,000.00 ر.س</p>
<p id="amount-err">أقل مبلغ للاستثمار 1,000.00 ر.س</p>
```

## Quick test
1. Submit empty with a screen reader on: errors announced, focus lands right.
2. Every error passes the formula (what + fix).
3. Paste into OTP and IBAN; autofill offers phone and code.
4. Walk the flow; repeated questions: 0.
5. Grayscale screenshot of the error state: still clear.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#error-identification
- https://www.w3.org/WAI/WCAG22/quickref/#redundant-entry
- https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-minimum
- https://www.w3.org/WAI/tutorials/forms/
- `data/ux/accessibility/forms.md`
