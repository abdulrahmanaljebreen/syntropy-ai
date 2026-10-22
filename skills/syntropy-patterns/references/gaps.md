# Gaps and workarounds

Components and variants the Safqah patterns need that Syntropy does not contain (or contains with a quirk). Open this whenever a screen needs something you cannot find in `references/data/components-index.json`. Compose from what exists, never invent a component, and tell the person about the gap in your answer.

## Rules
1. Never invent a component, variant or prop value. If the manifest does not have it, use the workaround below or the closest composition of real components.
   Why: an invented name cannot be built, linted or handed off; engineers will guess.
2. Always tell the person about the gap in a visible "Gaps" line: what was missing, what you used instead, and that the design-system team should be told.
   Why: silent workarounds become permanent forks.
3. Use quirky names verbatim (`Done - Captial`, `Has Lable`, `Begining`, `Has Multi-deals ?`). Do not "fix" the spelling in a spec.
   Why: the spec must match the Figma property exactly or the instance will not resolve.
4. OS-native UI (status bar, permission dialogs, biometric prompt, Apple Pay sheet) is drawn by the OS. Show where it appears in the flow; do not redraw it as a Syntropy component.
   Why: platform rules, and the OS renders it anyway.

## Missing components

| Needed | Use instead | Pattern |
|---|---|---|
| Numeric keypad as a standalone component | `Sheet Content / Amount keypad`, `Keypad / *` molecules (08s), such as `Keypad / Amount input`, `Keypad / Title row`, `Keypad / Presets`, `Keypad / Hint`, `Keypad / Summary card` | invest-and-reserve, onboarding (passcode) |
| Status bar / OS chrome, OS permission dialogs, biometric prompt | OS-native; not a Syntropy component | onboarding-and-sign-in, notifications-and-permissions |
| Payment-method row with brand logo (Mada, Apple Pay) | `SelectRow` `Type=Radio` + `MadaLogo` `Size=24` `Tone=Brand` as the leading element | payment |
| Apple Pay mark | No Apple Pay mark in the manifest: use the OS-provided Apple Pay button or mark per Apple's guidelines and flag it | payment |
| `RadialProgress` (referenced by the CardGoal guide as 08g) | `GoalTracker` composes it internally; no standalone set. Elsewhere use `ProgressBar` | goals |
| Range slider (min to max) | `Slider Field` single value, or two `Select` (from, to) | deal-list, backoffice-tables |
| Hijri calendar picker | `Date Calendar Picker` is Gregorian only; financial dates are Gregorian anyway. If Hijri is shown, show it as text next to the Gregorian date | forms |
| Dedicated empty-state illustrations (empty box, no results, offline) | `Illustrations` concepts (`Think`, `Puzzle`, `Data info alert`, `Web - Globe`) or the `Empty Illustration` default per tone | empty-states |
| Notification-bell illustration | `Illustrations` `Property 1=Info` or `Start`, or a sample notification card drawn with real text | notifications-and-permissions |

## Missing variants and states

| Needed | Use instead | Pattern |
|---|---|---|
| Rejected state on `KYCTaskRow` | `KYCTaskRow` `State=Current` with its embedded `StatusPill` `Tone=warning` «مطلوب إجراء», plus one `Alert` `Tone=warning` `Style=Filled` naming the item above the checklist | kyc |
| Success or warning tone on `Dialog` | Not available: `Dialog` has `Tone=default` / `destructive` only. Success goes to a success screen or `Toast`; warnings go to `Alert` / `Banner` | errors-and-recovery |
| Actions inside a `Toast` | Not allowed. If the user must act, use `Alert` with `showButton` or a `Banner` | errors-and-recovery |
| Western digits in RTL `Pagination` | The pagination guide mentions Arabic-Indic numerals for RTL; Safqah's numbers rule overrides it: Western digits everywhere | backoffice-tables |
| A modern goal card from the 08f page | Use the CardGoal (07b) organisms `GoalActivate` and `GoalTracker`; do not use legacy `Goal-Card`, `GoalCard`, `Goal card`, `GoalPlan`, `GoalChart` | goals |

## Duplicates and publishing quirks

| Quirk | What to do | Pattern |
|---|---|---|
| Two sets share the name `Table / ActionCell` (3320:262 and 3351:197) | Use 3320:262 and flag the duplicate | backoffice-tables |
| `Base card` (HeaderCard, page 07l) is not in the published library yet | Use it by name; in another Figma file, copy it from the Syntropy file; do not rebuild the hero from frames | deal-page |
| Several 08 Safqah-specific components are not published yet | Same: use them by name; in another Figma file, copy it from the Syntropy file | deal-page, portfolio, payouts |
| Spelling inside property values (`Done - Captial`, `Has Lable`, `Phase=Begining`, `Has Multi-deals ?`) | Write them exactly as the set spells them | payouts, deal-page, goals, invest-and-reserve |
| `Direction` spelled `RTL` on most sets, `rtl` on some (`Payouts cell` `Direction=rtl`), `Language=RTL` on `Issuance Row` | Copy the spelling from the set; do not normalise | payouts, portfolio |

## How to tell the person
Add one line per gap at the end of the screen spec, Arabic product terms where they help:

> Gaps: Syntropy has no rejected state on `KYCTaskRow`; I used `State=Current` with `StatusPill` `Tone=warning` «مطلوب إجراء» and one `Alert` above the checklist. Worth raising with the design-system team.

> Gaps: there is no Apple Pay mark in Syntropy; the Apple Pay row uses the OS-provided Apple Pay button per Apple's guidelines. Flag to the DS team.

Do / Don't:

| Do | Don't |
|---|---|
| "No range slider in Syntropy; I used two `Select` fields (من / إلى). Flag to the DS team." | Spec a `RangeSlider` component that does not exist |
| Use `Illustrations` `Property 1=Scheduled` for the no-open-deals wait | Draw a custom empty-box illustration |
| Show the native permission dialog as a labelled placeholder in the flow | Redraw the iOS alert with Syntropy `Dialog` |

## Sources
- Pattern README gaps table: `knowledge/patterns/README.md`.
- `knowledge/patterns/kyc.md`, `payment.md`, `goals.md`, `backoffice-tables.md`, `deal-page.md`, `payouts.md`, `errors-and-recovery.md`.
- Manifest: `knowledge/components/index.json`.
