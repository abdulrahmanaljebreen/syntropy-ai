# Settings and profile

The account area: profile summary, personal and investment profile, bank accounts, security (passcode, biometrics), notifications, language and appearance, help, legal, sign out and account closure. Read this before building the settings tab or any of its sub-screens.

## Job of the screen
Let investors find and change anything about their account in two taps, see what is verified or needs action, and leave or close the account without tricks.

## When to use
- The settings / account tab and every list-of-rows screen below it.
- Investment profile edit (read/edit surface for KYC data; capture lives in `kyc.md`).
- Not for: notification toggles in detail (`notifications-and-permissions.md`), bank-account fixes (`wallet-and-cash-out.md`).

## Flow steps
1. **Settings home**: identity header, then grouped rows by topic.
2. **Row tap**: navigation rows open a sub-screen; toggle rows apply instantly; value rows show the current value.
3. **Edit a field**: sub-screen with one form (see `forms.md`), save, return with a toast.
4. **Action needed** (expired ID, KYC refresh): one `Banner` on settings home linking to the task.
5. **Sign out**: `Dialog` `Tone=default`. **Close account**: separate screen with consequences, then `Dialog` `Tone=destructive`.

## Layout recipe: settings home (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="main screens"` or `Inner screens` `Direction=RTL`, title «الإعدادات» | |
| 2 | Identity | `ListItem` `Has leading=true` (`Avatar` `Type=Initials` `Size=lg` `Shape=Circle`), title = full name, description = masked phone, `Has label=true` with `StatusPill` `Tone=success` «موثّق» (or `Tone=warning` «مطلوب إجراء»), `Has chevron=true` | Qualified investors: `dealTags` qualified badge or `StatusPill` `Tone=brand` «مستثمر مؤهل» |
| 3 | Action needed (conditional) | `Banner` `Tone=warning` `Style=Outlined` `showButton=true` «انتهت صلاحية الهوية» / «تحديث» | One banner |
| 4 | Relationship manager (qualified) | `CardInfo` `Type=Avatar` `Tone=Neutral` with the RM name and «تواصل» | Qualified only |
| 5 | Group: account | `Section` `Size=Sm` «الحساب» + `ActionList` `Style=Grouped`: «البيانات الشخصية», «الملف الاستثماري», «الحسابات البنكية», «المستندات» (`ListItem` `Has leading` icon, `Has chevron`) | Gap `space/2xl` between groups |
| 6 | Group: security | «رمز الدخول» (chevron), «الدخول ببصمة الوجه» (`Has toggle`), «الأجهزة المسجلة» (chevron) | |
| 7 | Group: preferences | «التنبيهات» (chevron), «اللغة» (`Has value` «العربية», chevron), «المظهر» (`Has value` «تلقائي»), «التقويم» (`Has value` «ميلادي») | Calendar default is a setting (R5) |
| 8 | Group: help and legal | «مركز المساعدة», «تواصل معنا», «الشروط والأحكام», «سياسة الخصوصية», «الإفصاحات الشرعية» | |
| 9 | Sign out | `Button` `Variant=text` `Size=lg` «تسجيل الخروج» | Not a list row styled red |
| 10 | Version | caption/12 `text/muted` «الإصدار 4.12.0» | |
| 11 | Bottom nav | `TabBar` `Active=` settings tab | Top level only |

Each `ListItem` has exactly one trailing affordance (chevron, toggle, value + chevron, or label). `ActionList` owns dividers and corners.

## Layout recipe: profile detail (read, then edit)

| Slot | Component + key props | Notes |
|---|---|---|
| Group titles | `Section` `Size=Sm` («بيانات العميل», «البيانات الوظيفية», «البيانات البنكية», «البيانات العامة») | Matches the KYC sections |
| Rows | `ListItem` `Has label=false` `Has value=true` showing label and current value; `Has action=true` with «تعديل» on editable rows | Government-sourced rows have no edit action; one hint says they update from Absher |
| Edit | Push a sub-screen with `Form Field`s, or a `BottomSheet` with `Sheet Content / Form` for a single field | Save returns with `Toast` `Tone=success` «تم حفظ التغييرات» |

## Layout recipe: close account

| Slot | Component + key props | Notes |
|---|---|---|
| Consequences | `Section` `Size=Lg` «إغلاق الحساب» + `List` `Style=Bulleted` (active investments continue to maturity, wallet balance must be withdrawn first, data retention period) | Facts, no guilt |
| Blocker | `Alert` `Tone=warning` if the wallet has a balance or investments are open, with the next step | |
| Action | `Button` `Variant=destructive` `Size=lg` «إغلاق الحساب» → `Dialog` `Tone=destructive` `Size=sm`, title «إغلاق حسابك؟», confirm «إغلاق الحساب», cancel «تراجع» | Confirm label names the action |

## Required states

| State | Treatment |
|---|---|
| Loading | Identity: `SkeletonAvatar` `Size=L` + 2 `SkeletonLine`. Groups: `SkeletonLine` rows inside grouped containers (4-6 rows) |
| Empty | No documents: `EmptyState` `Tone=default` `Size=Compact` «لا توجد مستندات». No secondary bank account: `ActionPrompt` «إضافة حساب بنكي» |
| Error | Sub-screen load fails: `EmptyState` `Tone=error` + retry. Save fails: `Alert` `Tone=error` on the form, values kept. Toggle fails: revert + `Toast` `Tone=error` `Size=Small` |
| Success | `Toast` `Tone=success` after saving; no toast for instant toggles |
| Disabled | `ListItem` `State=Disabled` for features unavailable to the user (with a description why); biometrics toggle disabled with «غير متاح على هذا الجهاز» |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Title | «الإعدادات» | "Settings" |
| Verified | «موثّق» | "Verified" |
| Edit | «تعديل» | "Edit" |
| Sign out | «تسجيل الخروج» | "Sign out" |
| Close | «إغلاق الحساب» / «تراجع» | "Close account" / "Keep account" |

## Compliance notes
- Legal pages (terms, privacy, Sharia disclosures, CMA licence) stay reachable from settings. Confirm the list with Compliance.
- PDPL: the user can view their data and request changes; closure explains retention periods required by regulation. Confirm wording with Compliance.
- KYC data edits that affect suitability may trigger re-assessment; say so in one line on save.

## Accessibility notes
- Each row reads title, value and state, and its role (link, switch).
- Status pills are read with the row («موثّق»); warning state has text, not just colour.
- Destructive `Dialog` focuses the safe action first; the destructive confirm is not the default focus.
- Avatar initials are decorative when the name is shown.

## Benchmarks
| App (benchmarks, see syntropy-inspiration) | What to learn |
|---|---|
| Monzo | Settings grouped by plain topics with clear security area |
| STC Bank / D360 Bank (Saudi) | Arabic account settings with Absher-sourced locked fields |
| Revolut | Verified status on the profile header |
| Apple HIG | Grouped list conventions and destructive actions |

## Anti-patterns
- Rows with two trailing controls (toggle and chevron).
- Hand-drawn dividers and per-row cards instead of `ActionList`.
- A hidden or multi-step-maze account closure; confirmshaming copy.
- Red "sign out" rows; sign out is not destructive.
- Editable-looking government data that silently cannot be changed.

## Sources
- `knowledge/components/action-list.md` (3222:1092), `list-item.md` (3212:1071, Content 3210:738), `section.md` (3262:834), `avatar.md` (1372:2), `card-info.md` (3200:1066), `dialog.md` (2359:2), `status-pill.md`, `banner.md`, `app-bar.md`.
- CMA KYC fields on the investment profile: see `kyc.md`.
- RTL calendar setting: `knowledge/ux/rtl.md` R5.
