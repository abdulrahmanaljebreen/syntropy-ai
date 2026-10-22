# KYC (identity and suitability verification)

The verification journey every investor completes before investing: identity through Absher/Nafath, personal and financial details required by the CMA, bank account, documents, review, and recovery when something is rejected. Read this before building any KYC step, the KYC hub, or a document upload.

## Job of the screen
Get the investor verified with the fewest steps and no guessing: they always know what is done, what is next, what is blocking, and how to fix a rejection without starting over.

## When to use
- First-time verification after sign-up, re-verification (expired ID, periodic CMA refresh), and fixing a rejected item.
- The settings "investment profile" screen is the read/edit surface for the same data (see `settings-and-profile.md`).

## Flow steps
1. **Hub**: `KYCChecklist` shows every requirement and its state; the first incomplete task is the CTA.
2. **Identity** (Absher / Nafath): explain once, hand off, return verified. Data from Absher is prefilled and read-only.
3. **Personal and employment details**: one topic per screen (`KYCStep`), including CMA fields: employer, employer address and phone, length of service, alternative phone (optional), board membership of a listed company and relation to a board member, ultimate beneficial owner (UBO) declaration and, when the answer is no, the UBO identity.
4. **Financial profile and suitability**: income range, net worth, investment experience, objectives, risk tolerance (`Radio Group` / `SelectionList`).
5. **Bank account**: IBAN entry with the name-match rule shown before submit; bank branch.
6. **Documents** (only when needed: proof of qualification, IBAN certificate, extra ID): upload with progress.
7. **Review and submit**: summary with edit links per section; declaration checkbox.
8. **Under review**: status screen with expected time; push when done.
9. **Result**: approved (success, go invest) or action needed (rejection recovery jumps straight to the failing task, other tasks keep their state).

## Layout recipe: hub (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` `Direction=RTL`, title «توثيق الحساب» | |
| 2 | Progress | `ProgressBar` `Size=sm` `Tone=brand` `showLabel=true`, Label «اكتمل 3 من 5» `Direction=RTL` | Fills from the right |
| 3 | Action needed (only when rejected) | `Alert` `Tone=warning` `Style=Filled` `showButton=true` «مطلوب تحديث شهادة الآيبان» / button «تحديث» | One alert, the specific item |
| 4 | Checklist | `KYCChecklist` `Direction=RTL` with one `KYCTaskRow` per requirement: `State=Completed` (done), `State=Current` (next), `State=Upcoming` | Container `bg/elevated`, `radius/lg`, padding `space/lg` |
| 5 | Absher row | Inside the identity task, leading `AbshirLogo` `Size=24` `Tone=Brand` | Only on Absher/Nafath tasks |
| 6 | Footer | `Button` `Variant=primary` `Size=lg` «متابعة» (opens the current task) | |

`KYCTaskRow` has no rejected state: show a rejected task as `State=Current` with its embedded `StatusPill` `Tone=warning` label «مطلوب إجراء», plus the `Alert` above. Flag the missing state to the DS team.

## Layout recipe: one step

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` with back | Back keeps entered data |
| 2 | Progress | `Stepper` `Orientation=horizontal` `Direction=RTL` (3-5 steps; `StepIndicator` `State=completed/current/upcoming/error`) | Step 1 on the right |
| 3 | Title | `Section` `Size=Lg` with `Has description` (one line why) | |
| 4 | Fields | `Form Field` / `Input` / `Select` / `Combobox Field` / `Date Input` / `Radio Group` per `forms.md`; Absher-prefilled fields `State=disabled` with value shown | Gap `space/lg` between fields |
| 5 | Inline rule | Bank step: `Alert` `Tone=info` `Style=Outlined` «يجب أن يكون الحساب باسمك كما في الهوية» before the IBAN field | Before submit, never only after |
| 6 | Footer | `ButtonGroup` `Orientation=horizontal` or single primary «متابعة»; back as `Variant=secondary` same size | |

`KYCStep` (organism) is the ready composition of rows 2-6 for the IBAN step; use it as the model for the others.

## Layout recipe: documents

| Slot | Component + key props | Notes |
|---|---|---|
| Trigger | `Upload Button` `State=default` `Show hint=true` «تدعم الصيغ التالية (PDF, JPEG, JPG, PNG)» | Formats and size limit shown before picking |
| Uploading | `File Item with Progress` `State=progress` (cancel available) | |
| Done | `File Item with Progress` `State=uploaded` with «عرض الملف» | Persistent state; `complete` is transient |
| Failed | `File Item with Progress` `State=error` with «إعادة المحاولة» inline | Keep the file; no toast |
| Inline file in a form | `File Item` `State=ready/error/uploaded` | |

## Required states

| State | Treatment |
|---|---|
| Loading | Hub: 5 `KYCTaskRow`-shaped skeletons (`SkeletonCircle` `Size=S` + 2 `SkeletonLine`). Absher hand-off return: `SpinnerRing` `Size=M` + «جارٍ التحقق من بياناتك» |
| Empty | New user: every task `Upcoming` except the first `Current`; progress «اكتمل 0 من 5» |
| Error | Field validation inline (`forms.md`). Absher failure: `Alert` `Tone=error` «تعذر التحقق عبر أبشر» + retry; locked after N attempts: `Banner` `Tone=warning` with when to retry. Rejection: see hub |
| Under review | `EmptyState` `Tone=default` `Size=Compact` with `Illustrations` `Property 1=Data info alert`, «طلبك قيد المراجعة», description with the expected time, `KeyValue` submitted date; `Button` «تصفح الصفقات» |
| Success | `Illustrations` `Chosen checkmark` + «تم توثيق حسابك» + primary «ابدأ الاستثمار». Also the moment for the notification primer (`notifications-and-permissions.md`) |
| Disabled | Submit disabled until required fields and the declaration checkbox are complete; prefilled government data disabled (not editable) with a hint where to change it |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Hub title | «توثيق الحساب» | "Verify your account" |
| Absher CTA | «التحقق عبر أبشر» | "Verify with Absher" |
| Name rule | «يجب أن يكون الحساب باسمك كما في الهوية» | "The account must be in your name, as on your ID" |
| UBO | «هل أنت المستفيد الحقيقي من الحساب؟» | "Are you the beneficial owner of this account?" |
| Review state | «طلبك قيد المراجعة» | "Your application is under review" |
| Rejection | «مطلوب تحديث شهادة الآيبان» | "Please update your IBAN certificate" |

## Compliance notes
- The CMA KYC field set (including board membership, relation to a board member, UBO declaration and identity, employer details, bank branch) is mandatory; do not drop or merge fields. Confirm the final list and wording with Compliance.
- Suitability answers decide eligibility (retail vs qualified limits); show the outcome plainly and never nudge answers toward a higher tier.
- Declaration checkbox unchecked by default; link the real terms. PDPL: say why data is collected (one line) and link the privacy notice.
- `AbshirLogo` only on genuine Absher/Nafath steps; never as a generic verified icon.

## Accessibility notes
- `Stepper` announces «الخطوة 2 من 5، بيانات العمل»; the hub reads each task with its state.
- Upload progress is announced at start, 100% and error; trash and paperclip icons need 48x48 hit areas.
- Prefilled disabled fields stay readable (value text at 4.5:1), not greyed out to illegibility.
- Errors move focus to the first invalid field on submit.

## Benchmarks
| App (benchmarks, see syntropy-inspiration) | What to learn |
|---|---|
| Wise | One document per screen with requirements before upload and a "check it's readable" review |
| Derayah / Al Rajhi Capital (Saudi) | Absher/Nafath identity hand-off and CMA suitability questions in Arabic |
| Revolut | Verification hub that shows what is blocking and resumes where the user left off |
| D360 Bank (Saudi) | Short Nafath onboarding with prefilled government data |

## Anti-patterns
- Every step marked "upcoming" after the user completed some (no visible progress).
- A rejection that sends the user back to step 1.
- Name-match rule revealed only as an error after submit.
- A long single-page KYC form; one topic per step.
- Error toasts for failed uploads instead of inline retry.

## Sources
- `knowledge/components/kyc-step.md` (KYCTaskRow 3786:470, KYCChecklist 3796:551, KYCStep 3789:363), `abshir-logo.md` (3809:377), `file-upload.md` (1138:63, 1141:63, 1147:63), `stepper.md` (2752:66), `form-field.md`, `progress-bar.md`.
- CMA KYC missing-fields gap table (nine fields), Safqah product team, Sep 2026.
- IBAN certificate research: Notion `3831a53e1a6b806dab2ed79311804f9d` (3.8% of bank-account adds hit name mismatch; 62% stuck after 30 days).
- Account recovery research: Notion `3b91a53e-1a6b-8116-8377-d6085a9dbee6`.
- Reference search (Refero, Oct 2026): Coinbase verification checklist, Wise ID upload.
