# Forms

How Safqah collects structured data: picking the right control, laying out labels and hints, validation timing, and Arabic labels. Read this before building any form (KYC steps, profile edit, bank details, filters, back-office forms).

## Job of the screen
Collect correct data on the first try with the least effort: the right control for each answer, one short hint where needed, and errors that point to the fix.

## When to use
Any screen with input. For amount entry see `invest-and-reserve.md`; for phone and OTP see `onboarding-and-sign-in.md`; for settings toggles see `notifications-and-permissions.md`.

## Choosing the control

| Answer type | Component | Key props | Not this |
|---|---|---|---|
| Free text (name, address, employer) | `Input` (bordered) | `Size=lg` (app), `Show Label=true`, `Label text`, `Show Helper` only when needed | `Select` |
| Long text (notes, reason) | `TextArea` | `Show Counter=true` when there is a limit | `Input` |
| Phone number | `Input Phone` | Country code `+966` | Plain `Input` |
| Money | `Input Amount` | `Size=lg` for the main amount | `Input` with "SAR" typed in |
| Fixed steps (quantity) | `NumericStepper` (or `Amount Stepper` with `Show Actions=true`) | `NumericStepper` `State=AtMin` / `State=AtMax` at bounds | Free typing |
| One of 2-5 options, all visible | `Radio Group` (with `Radio`) or `SelectionList` `Mode=Single` with `SelectRow` `Type=Radio` | | `Select` (hides options) |
| One of 2-4 options that switch a view | `SegmentedControl_2/_3/_4` | `Size=md` or `lg` | `Radio Group` |
| One of many, closed list (6-15) | `Select` + `Dropdown Menu` (`Dropdown Item`) | | `Combobox Field` |
| One of a long list (banks, cities, sectors, countries) | `Combobox Field` + `Combobox Menu` (`State=Results/No results`) | `allowFreeText` off for controlled lists | Scrolling `Select` |
| Several independent options | `Checkbox Group` (with `Checkbox`) or `SelectionList` `Mode=Multi` | Parent `State=indeterminate` for partial | `Switch` |
| Several values in a compact field (back-office) | `Multi-select field` `Value-display=chips/count` | | |
| Yes/no that applies on submit (consent, declaration) | `Checkbox` `Size=lg` | Unchecked by default | `Switch` |
| On/off that applies instantly | `Switch` in a `ListItem` | | `Checkbox` |
| Date (birth date, ID expiry) | `Date Input` → `Date Wheel Picker` `Mode=single-date` (mobile, in `BottomSheet`) / `Date Calendar Picker` `Mode=single` (web) | | Typed date with a format mask |
| Date range (filters) | `Date Range Field` | Each side opens its own picker | Two-month popover |
| Region | `ProvinceSelector` `Selection=Single/Multi` with `RegionChip` | | `Select` of 13 regions |
| File | `Upload Button` → `File Item with Progress` | Formats hint shown | |
| Search a list | `Search Input` + `Search Dropdown` | | |

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` with the form title | |
| 2 | Step progress (multi-step only) | `Stepper` `Orientation=horizontal` (3-5 steps) | Step 1 on the right |
| 3 | Group title | `Section` `Size=Md`, optional `Has description` (one line) | Gap `space/2xl` between groups |
| 4 | Fields | `Form Field` `Size=lg` `State=default` wrapping the control (label above, helper below), or the control's own label (`Input` `Show Label=true`). `Form Field Label` `Required=true` only when most fields are optional; `Tooltip=true` for regulatory definitions | Gap `space/lg` between fields; label to field `space/xs` (built in) |
| 5 | Form-level message | One `Alert` `Tone=error` (after submit) or `Tone=info` (rule) | Top of the form, under the title |
| 6 | Footer | `Button` `Variant=primary` `Size=lg` «حفظ» / «متابعة»; cancel as `Variant=secondary` or `text`, same size | Sticky with safe area; above the keyboard |

One field style per form: bordered `Input` family, or `Input Underline` / `Select Underline` for sign-in and dense settings. Never mix.

Conditional fields (UBO identity appears when «لا» is chosen): reveal directly under the triggering question; keep the value if hidden and re-shown.

## Validation timing
1. Show format hints before errors (helper text, `Tone=neutral`).
2. Validate on blur; once in error, re-validate on input so it clears immediately.
3. On submit, validate all, show the summary `Alert`, focus the first error.
4. Success helper (`Form Field Helper` `Tone=success`) only where confirmation matters (IBAN recognised: «بنك الراجحي»), not on every field.
5. Disabled submit is allowed only when the reason is visible (a required consent unchecked); otherwise keep the button enabled and validate on tap.

## Required states

| State | Treatment |
|---|---|
| Loading | Edit forms: field-shaped `SkeletonBlock` `Radius=Small` rows with `SkeletonLine` labels. Submitting: `Button` `State=loading`, fields `State=disabled` |
| Empty | Placeholders in `text/subtle` are examples only («مثال: شركة أرامكو»), never the label |
| Error | Field `State=error` + helper with the fix; `Dropdown Item` / `Combobox Menu` `State="No results"` for no matches |
| Success | Saved: `Toast` `Tone=success` «تم حفظ التغييرات» and return, or inline `Form Field Helper` `Tone=success` for a single field |
| Disabled | Government-sourced or locked fields `State=disabled` with value visible and one hint where to change it |

## Arabic labels and copy
- Labels are nouns, 1-3 words: «الاسم الكامل», «جهة العمل», «مدة الخدمة لدى جهة العمل», «فرع البنك».
- Optional fields say so in the label: «رقم جوال بديل (اختياري)».
- Helper: one sentence, 8-15 words, what to enter and why.
- Months in full Arabic names (يناير ... ديسمبر); picker apply button «تطبيق».
- Latin identifiers stay Latin (PDF, IBAN prefix SA).

| Field | Arabic label | English label | Helper (Arabic) |
|---|---|---|---|
| IBAN | «رقم الآيبان» | "IBAN" | «يبدأ بـ SA ويتكون من 24 خانة» |
| Income | «الدخل الشهري» | "Monthly income" | none (use range options) |
| Employer | «جهة العمل» | "Employer" | none |
| Board member | «عضو مجلس إدارة في شركة مدرجة» | "Board member of a listed company" | none (Radio yes/no) |

## Compliance notes
- KYC and suitability fields are regulated (CMA): keep every required field, use the approved option sets, never pre-select an answer. Confirm with Compliance.
- Consent and declarations: `Checkbox` unchecked, linked documents, one consent per purpose (PDPL). Confirm with Compliance.
- Collect only what the step needs; say why sensitive data is collected in one helper line.

## Accessibility notes
- Every control has a visible label (not placeholder-only); `Input` `Size=sm` and `Select` `Size=sm` are web/back-office only (below 48dp).
- Required state is conveyed in text, not only an asterisk colour.
- Errors are announced and linked to their field; focus order follows reading order (right to left in Arabic).
- `border/strong` field edges are under 3:1 in Light: keep the label above and the filled field shape (do not rely on the border alone).

## Benchmarks
| App (benchmarks, see syntropy-inspiration) | What to learn |
|---|---|
| GOV.UK Design System | One question per page for complex forms; error summary pattern |
| DGA Platforms Code (Saudi) | Arabic form labels, RTL field order and government-data prefill |
| Wise | Bank-details forms that recognise the bank from the IBAN |
| Baymard Institute | Inline validation and optional-field labelling research |

## Anti-patterns
- `Select` for two options; `Combobox Field` for three.
- `Switch` inside a form that has a submit button.
- Placeholder as label; helper, description and tooltip stacked on one field.
- Errors only as a toast.
- Pre-ticked consent or pre-selected suitability answers.
- Typed date fields with DD/MM/YYYY masks.

## Sources
- `knowledge/components/form-field.md` (1177:453), `input.md` (828:705), `select.md` (1024:183), `combobox.md` (3887:1126, 3888:1186), `date-picker-time-picker.md` (1217:63, 1219:87, 1228:321, 1230:801), `checkbox.md` (1043:93, Checkbox Group 3921:241732), `radio.md` (1086:177), `switch.md`, `text-area.md`, `numeric-stepper.md`, `province-selector.md`, `menu.md` (Multi-select field 3981:2871).
- CMA KYC field list: see `kyc.md`.
- Copy: `knowledge/content/copy-lengths.md`; RTL: `knowledge/ux/rtl.md`.
