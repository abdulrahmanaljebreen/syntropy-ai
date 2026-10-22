---
name: syntropy-accessibility
description: Makes Safqah screens (Flutter app, web, back-office) meet WCAG 2.2 AA with Syntropy tokens and components, and proves it. Use whenever a Safqah or Syntropy screen, component, Figma frame, Flutter widget, CSS or copy needs an accessibility decision or check, or someone asks "is this accessible", "does this pass contrast", WCAG, a11y. Covers contrast from the 226 audited token pairs (Light and Dark) plus a contrast script, the known system contrast risks (primary Button label, brand green text, border/strong, yellow and warning in Dark), touch targets (48dp app, 24px web), focus and keyboard order in RTL, VoiceOver and TalkBack in Arabic (money, dates, IBAN), Flutter Semantics and web ARIA, forms and OTP, reduced motion, 200% text, colour-not-alone, and testing recipes (Flutter meetsGuideline, axe-core WCAG 2.2 tags, Arabic screen-reader scripts). Triggers: accessibility, contrast, screen reader, VoiceOver, TalkBack, Semantics, aria, focus, tap target, dynamic type, reduced motion, إمكانية الوصول.
---
<!-- syntropy-lint-disable percent-label-nisba: spoken-label tables show % on purpose -->

# Syntropy Accessibility

## Purpose
Make every Safqah surface (Flutter app, web, back-office) meet WCAG 2.2 Level A and AA in Arabic RTL and English LTR, in Light and Dark, using only Syntropy tokens and components. Give exact, testable answers (token pairs with both ratios, component states, Semantics code, test commands) and flag system-level issues honestly instead of patching them.

## Hard rules
1. The target is WCAG 2.2 A and AA on every surface, both directions, both themes, including the six criteria new in 2.2 (2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8).
   Why: Safqah is a regulated investment product; an AA failure is a defect, not polish.
2. Choose colour pairs only from the recommended tables in `references/data/contrast-pairs.md`, or check a new pair with `node scripts/contrast.mjs <fg> <bg>` and quote both ratios. Body text 4.5:1, large text 3:1, meaningful icons, control edges and focus 3:1, in Light **and** Dark.
   Why: the table is computed from the real token values; a pair that passes in one mode only still fails users.
3. Never fix a contrast failure by inventing a raw hex value, an opacity, a primitive token or a one-off override. Use a passing semantic pair, or flag a known system issue.
   Why: raw values break theming, drift from Figma and fail the Syntropy lint.
4. Brand green is used as built (decided 19 Oct 2026). White on `bg/brand/primary` (primary `Button`, FAB, filled badges, Timeline steps: 2.92 Light, 2.14 Dark) and `text/brand/primary`, `icon/brand/primary`, `border/brand/primary` on light surfaces (selected tiles, amounts, links: 2.36 to 2.92 Light) are accepted. Use the components exactly as built, as in the investment calculator. Never flag them, never recolour, darken or enlarge them.
   Why: it is the Safqah brand, and the DS owner decided to keep it.
5. Flag these known system risks as findings "pending a design decision" (owner `ds`), keep the component as built, and never present them as passing:
   - `text/on-brand` on `bg/success` (2.22 / 1.94) and on `bg/warning` (2.20 / 1.93): solid status chips.
   - `border/strong` in Light: 2.01 on `bg/base` (1.85 to 2.01 on neutrals).
   - `text/default` on `bg/brand/yellow` (1.02) and on `bg/warning` (1.67) in Dark.
   Why: these are token-level defects; local patches fork the system and hide the problem from the DS team.
6. For anything new, use the safe alternative: `StatusPill Variant=subtle`, `bg/brand/yellow-subtle` + `text/default`, `bg/warning-subtle` + `text/warning`, and a second cue (label, fill, check) wherever `border/strong` or `border/brand/primary` would be the only edge.
   Why: these pass in both modes today.
7. Every tappable element has a 48x48 dp hit area in the app (one number for iOS and Android) and at least 24x24 CSS px on web (44 on touch breakpoints). Grow the hit area, not the visual.
   Why: SC 2.5.8 and platform guidelines; mis-taps on money screens cost money.
8. Every interactive element has an accessible name in Arabic and English; icon-only controls (`IconButton`, `BackButton`, `Tag Removable`, `BalanceToggle`, icon-only `MenuTrigger`) always carry a label that starts with any visible text.
   Why: SC 4.1.2 and 2.5.3; an unlabelled button is read as «زر».
9. Amounts are spoken with the currency in words («1,250.00 ريال سعودي»), percentages as «بالمئة», dates as «15 أكتوبر 2026», IBANs in an LTR isolate, masked values as «ينتهي بـ 1234». Visible copy keeps Western digits and the currency after the amount.
   Why: Arabic voices read «ر.س» and slashes literally.
10. Focus uses `border/focus` (2px, 2px offset) and the component focus states (`Button State=focused`, `IconButton State=focused`, `Input State=focus`); never `border/brand/primary`. Focus order follows RTL reading order; overlays trap and return focus.
   Why: `border/focus` passes in both modes; green rings vanish on white.
11. Colour is never the only cue: status has text (and an icon when it warns), gain or loss has a sign and an arrow, errors have text and an icon, selection has a check or fill. Warnings use the warning tone; red only for critical or defaulted.
    Why: SC 1.4.1; about 8% of men are colour-blind.
12. Text scales to 200% with nothing lost; never disable or globally clamp scaling; money is never truncated or ellipsised.
    Why: SC 1.4.4; a truncated amount is a wrong amount.
13. Respect reduced motion; nothing flashes over 3 times per second; auto-advance is off by default; countdowns never blink and announce milestones only.
    Why: SC 2.2.2, 2.3.1; vestibular and seizure safety.
14. Never skip accessibility because a surface is "internal" (back-office is in scope), "a prototype going to production", or "for later". Never declare a screen accessible without naming the checks run and their results.
    Why: Safqah's commitment covers all surfaces; unchecked claims are worthless.
15. Never use the em dash character; never describe or link work-in-progress areas of the Figma file; cross-skill pointers by skill name only.
    Why: repo writing rules.

## Workflow
1. **Scope.** Identify surface (app compact, app regular, web, back-office), locale (Arabic first), themes, and the task: choose, build, or check. Open `references/wcag22-aa.md` for the criteria that apply; mark the rest N/A with a reason.
2. **Colour.** For each text, icon and border element, name its role and surface, then pick from `references/data/contrast-pairs.md` (recommended section). Use `references/contrast.md` for the fast-answer table and the risk list. For any pair not listed, a requested hex, or a translucent layer, run `node scripts/contrast.mjs <fg> <bg> [--over <backdrop>] [--large]` and quote the Light and Dark ratios.
3. **Known risks.** Brand green as built is accepted (rule 4). If the design uses a risk pair (rule 5), keep it, write a finding (severity 3, owner `ds`, evidence = both ratios), and use the safe alternative for anything you add.
4. **Targets.** Size every tappable element with `references/touch-targets.md`; check the "components that need attention" table (`IconButton Size=sm`, `Tag Removable`, `Table / ActionCell`, keypads, chips).
5. **Names, roles, states.** Label every control and merge cards into one stop with `references/screen-readers.md` (Flutter `Semantics` toolkit, web APG table, Arabic money and date labels).
6. **Focus and keyboard.** Define focus order in RTL, overlay behaviour and sticky-UI padding with `references/focus-keyboard.md`.
7. **Forms.** For any input, OTP or amount, apply `references/forms.md` (persistent label, one hint, error formula, no redundant entry, unticked consent).
8. **Colour-not-alone, scale, motion.** Check status and charts with `references/color-not-alone.md`, layouts at 200% with `references/dynamic-type.md`, animation with `references/motion.md`.
9. **Prove it.** Run or specify the tests in `references/testing.md`: `scripts/contrast.mjs` for tokens, Flutter `meetsGuideline` (tap targets, labels, text contrast) across `ar`/`en`, Light/Dark, scale 1.0/2.0, axe-core with `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`, and one Arabic VoiceOver or TalkBack pass.
10. **Report.** List passes, findings (WCAG SC, severity 0 to 4, evidence, exact fix as component, variant, token or code, owner) and "not checked" items. In a full review, hand the findings to syntropy-ux-review for the scored report.

## Decision tables

### Colour: need X, use Y, not Z
| Need | Use | Not |
| --- | --- | --- |
| Body text | `text/default` | primitives, raw hex |
| Secondary, helper, caption | `text/muted` | `text/subtle` |
| Placeholder | `text/subtle` with a persistent label | placeholder as label; light grey hex |
| Link or green text | `text/brand/darkest` or `text/default` underlined | `text/brand/primary` at body size |
| Status label | `StatusPill Variant=subtle` (+ `HasIcon=true` when it warns) | `Variant=solid` on success or warning |
| Warning surface | `bg/warning-subtle` + `text/warning` | `text/default` on `bg/warning` |
| Yellow highlight | `bg/brand/yellow-subtle` + `text/default` | `text/default` on `bg/brand/yellow` |
| Meaningful icon | `icon/default`, `icon/muted` | `icon/subtle` |
| Focus ring | `border/focus` | `border/brand/primary` |
| Input or checkbox edge | component as built + label + `State=focus` ring; flag `border/strong` | thicker hand-drawn border in a new hex |
| Primary CTA | `Button Variant=primary` as built, flagged as known risk | a custom darker green button |
| Text over a photo | solid surface or `bg/overlay` scrim; large text only on the scrim in Light | white body text straight on the image |

### Common requests
| Request | Answer |
| --- | --- |
| "Use #ccc (or any light grey) for placeholder or hint text" | Decline politely. Run the script (`#cccccc` on `bg/base` is 1.61 in Light). Offer `text/muted` for hints, `text/subtle` for placeholder only, with a persistent label. |
| "Make the primary button text pass by darkening the green" | Do not patch. Keep `Button Variant=primary`, file the known system issue to the DS team with 2.92 / 2.14 as evidence. |
| "It's internal, skip accessibility" | Back-office is in scope (WCAG 2.2 AA). Offer the fast path: tokens from the table, 24px targets, labels, keyboard, axe run. |
| "Just say it passes" | Only report what was checked, with results; list unchecked items. |
| "Icon only, no label, it's obvious" | Visible icon is fine; the accessible label is mandatory («مشاركة الفرصة»). |
| "Lock text size so the layout doesn't break" | No. Stack `KeyValue` above 150%, let containers hug, wrap amounts. |
| "Add a blinking red countdown" | No blinking, no red urgency; milestones announced; see syntropy-compliance-ux for honest timers. |
| "Hide the focus outline, it's ugly" | Keep `:focus-visible` with `border/focus`; it shows for keyboard only. |
| "Six OTP boxes, no paste" | One logical field, paste and SMS autofill (SC 3.3.8). |

### Targets
| Element | App | Web |
| --- | --- | --- |
| Any tappable | 48x48 dp hit area | 24x24 CSS px (44 at coarse pointer) |
| Neighbouring targets | `space/sm` gap; `space/md` beside destructive | same |
| Money confirm | `Button Size=lg`, full width in `SheetFooter` | same |
| Icon clusters in tables | one `MenuTrigger` + `Menu` | 24x24 each or a menu |

### Announcements
| Event | Flutter | Web |
| --- | --- | --- |
| Toast, saved, copied | `Semantics(liveRegion: true)` | `role="status"` |
| Error after submit | focus first invalid field or `Alert Tone=error` summary | same + `aria-invalid` |
| Processing money | `Button State=loading` + «جارٍ المعالجة» | `aria-busy`, `role="status"` |
| Success of money action | focus success heading | same |
| Timer milestones | `SemanticsService.announce(..., TextDirection.rtl)` at 5 min, 1 min | polite live region |

### Speaking numbers (Arabic)
| Visible | Label |
| --- | --- |
| `1,250.00 ر.س` | `1,250.00 ريال سعودي` |
| `16%` | `16 بالمئة` |
| `−2.5%` | `انخفاض 2.5 بالمئة` |
| `15/10/2026` | `15 أكتوبر 2026` |
| `•••• 1234` | `ينتهي بـ 1234` |

### Edge cases
| Case | Rule |
| --- | --- |
| Passes in Light, fails in Dark (or the reverse) | It fails. Pick a pair that passes in both. |
| Text over photos, gradients, video (`NewsCard / Poster`, `HeaderCard` media) | Check the worst area by hand; automated checks miss it. Use a solid surface or the `bg/overlay` scrim; on the scrim, body text is large-only in Light (4.00). |
| Disabled controls | Exempt from ratios, but never the only place needed information appears; explain why next to a disabled `Button`. |
| Decorative dividers (`border/default`, `border/subtle`) | No ratio needed, unless the divider is the only edge of a control. |
| Back-office tables | `<th scope>`, `<caption>`, 24px targets, horizontal scroll inside `ScrollContainer` only. |
| Charts | Text summary, table alternative, second encoding; time left to right even in RTL. |
| Brand marks (`SafqahLogo`, `MadaLogo`, `AbshirLogo`) | Logos are exempt from contrast; they need a label when they are the only content of a control. |

### Do and Don't
- Do: «الحد الأدنى 1,000.00 ر.س» helper in `text/muted` on `bg/elevated` (6.28 Light / 8.42 Dark). Don't: `text/subtle` (2.94 Light).
- Do: `StatusPill Tone=warning Variant=subtle HasIcon=true` «بانتظار الدفع». Don't: white text on `bg/warning`.
- Do: `IconButton` share labelled «مشاركة الفرصة», 48x48 hit area. Don't: a 24px unlabelled icon.
- Do: ship `Button Variant=primary` exactly as built, with no contrast finding (brand green as built). Don't: a hand-made `#2a5d2f` button or a bigger, bolder label.

## Self-check before answering
- [ ] Every colour I named is a semantic token, and every pair is from the recommended table or has both script ratios quoted.
- [ ] No raw hex, opacity hack or primitive is proposed as a fix; hex appears only when evaluating a request.
- [ ] Any known-risk pair in the work is flagged (severity, evidence, owner `ds`), not called passing.
- [ ] Targets: 48dp app, 24px web; icon-only controls labelled in Arabic and English.
- [ ] Amounts, percentages, dates and masked values have spoken labels; visible copy uses Western digits and currency after the amount.
- [ ] Focus: `border/focus`, RTL order, overlays trap and return focus, sticky UI does not cover focus.
- [ ] Status, errors, selection and charts have a non-colour cue; warnings use warning tone.
- [ ] 200% text, reduced motion and forms rules considered; N/A items have a reason.
- [ ] I said what was tested and what was not; I did not claim "accessible" without evidence.
- [ ] No em dash character; no work-in-progress Figma areas mentioned.

## References
| File | Open when |
| --- | --- |
| `references/wcag22-aa.md` | You need the full A/AA criteria list with the Syntropy way and a test for each |
| `references/contrast.md` | Choosing any colour pair, judging a requested colour, the known risk list, reading the pair data, using the script |
| `references/touch-targets.md` | Sizing taps and clicks, dense rows, keypads, table actions |
| `references/focus-keyboard.md` | Focus ring, focus order in RTL, overlays, keyboard map, focus after actions |
| `references/screen-readers.md` | Flutter Semantics, web ARIA (APG), Arabic reading of money, dates, IBAN, mixed direction |
| `references/forms.md` | Labels, hints, error formula, OTP, amount inputs, redundant entry, KYC |
| `references/motion.md` | Animation, spinners, carousels, countdowns, number roll-ups, reduced motion |
| `references/dynamic-type.md` | Text scaling to 200%, Arabic line height, stacking layouts, never truncating money |
| `references/color-not-alone.md` | Status mapping, gain or loss, selection, links, charts |
| `references/testing.md` | Flutter `meetsGuideline` tests, axe-core with WCAG 2.2 tags, keyboard runs, VoiceOver and TalkBack Arabic scripts, reporting |
| `scripts/contrast.mjs` | Ratio for any two tokens or hex values in Light and Dark, with alpha compositing |
| `references/data/contrast-pairs.md` | Generated: the 226 audited pairs, recommended and failing |
| `references/data/tokens-resolved.json` | Generated: every token with Light and Dark values (read by the script) |
| `references/data/ux/accessibility/*` | Generated: the full long-form accessibility knowledge files and `contrast-pairs.json` |
