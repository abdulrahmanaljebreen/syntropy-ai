# Widgetbook parity checklist (Design QA)

Checks that the built Flutter feature matches the Figma design, screen by screen. Run during Design QA in the Deliver phase, required on every feature before merge. Agents reviewing a build or screenshots against Figma should use this list and the mismatch log format below.

## Rules

1. Test on real devices (at least one iOS and one Android), with the Figma file side by side. Simulators only as a supplement.
   Why: fonts, sizes and Arabic rendering differ on real devices.
2. Work through every block for every screen, then log each mismatch: fix, waive or backlog.
   Why: unlogged drift becomes permanent.
3. Critical and High issues are resolved before merge; Medium are fixed or logged to the design system backlog; Low are logged.
   Why: severity decides urgency, not convenience.
4. Compare against built values: font IBM Plex Sans Arabic for both languages, semantic tokens, `Light` and `Dark` modes.
   Why: the Figma library is the reference.

## Checklist

### Header
- Feature:
- Designer doing QA:
- Date of review:
- Device(s) used:

### How to run
1. Open the built feature on a real device (iOS and Android ideally).
2. Open the Figma file side by side.
3. For each screen, work through the blocks below.
4. Log mismatches, then fix, waive or backlog.

### Layout and spacing
- [ ] Screen matches the Figma layout at the reference device size.
- [ ] Vertical spacing matches spec (`space/*` values).
- [ ] Horizontal padding matches spec.
- [ ] Safe area insets respected (top notch, bottom home indicator).
- [ ] Keyboard-avoiding behaviour matches spec when a field is focused.

### Typography
- [ ] Font family is IBM Plex Sans Arabic in both Arabic and English.
- [ ] Font size matches the text style.
- [ ] Font weight matches.
- [ ] Line height matches (built styles use a 1.5 ratio).
- [ ] Letter spacing matches (Arabic is always 0).
- Note: Notion said "Arabic: Noto Kufi or brand equivalent; Latin: brand equivalent". The built font is IBM Plex Sans Arabic for both.

### Colour
- [ ] Background colours match semantic tokens.
- [ ] Text colours match tokens.
- [ ] Icon colours match tokens.
- [ ] Border colours match tokens.
- [ ] Dark mode matches (`Dark` mode values).

### Iconography
- [ ] Icons come from the Syntropy icon set (`Icon / <name>`).
- [ ] Icon sizes match spec.
- [ ] Icon alignment matches spec.
- [ ] Directional icons (arrows, chevrons) mirror correctly in RTL.

### Components
- [ ] All components are Design System v2 components (no one-off styling).
- [ ] Variants match Figma (size, state).
- [ ] Button heights, corner radii and padding match.
- [ ] Form fields match (label position, error state, help text).

### States
- [ ] Default.
- [ ] Loading (skeletons, spinners).
- [ ] Empty.
- [ ] Error, including inline form errors.
- [ ] Success.
- [ ] Disabled.
- [ ] Hover / press / focus where applicable.

### RTL behaviour
- [ ] Full screen mirrors when the device language is Arabic.
- [ ] Text alignment switches (right-aligned in Arabic).
- [ ] Icons mirror where appropriate (chevrons, back arrows, progress indicators).
- [ ] Icons do not mirror where inappropriate (logos, clocks, media controls).
- [ ] Numbers use Western digits (0-9) in both languages, never reversed.
- [ ] Mixed-direction text (LTR inside RTL or the reverse) renders correctly.
- [ ] Animations and transitions mirror where appropriate.
- Note: Notion phrased the numeral check as "correct numeral system (Arabic-Indic vs. Western Arabic)". The rule is Western digits (`knowledge/content/numbers-currency.md`).

### Accessibility
- [ ] VoiceOver / TalkBack reads the screen correctly.
- [ ] Focus order is logical.
- [ ] All interactive elements have accessible labels.
- [ ] Colour contrast passes WCAG AA on device.
- [ ] Layout holds at 200% text scale.

### Motion and transitions
- [ ] Screen transitions match spec (direction, duration, easing).
- [ ] Component animations match spec (button press, loading, success).
- [ ] No unintended animations or layout shifts.

### Widgetbook parity
- [ ] New or modified components have Widgetbook use cases.
- [ ] Use cases cover all variants tested.
- [ ] Golden tests pass in CI (or are explicitly marked for update).

### Mismatch log
| # | Location | Expected (Figma) | Actual (Flutter) | Severity | Action |
|---|---|---|---|---|---|
| 1 | | | | Crit / High / Med / Low | Fix / Waive / Backlog |

### Outcome
- [ ] All Critical and High issues resolved before merge.
- [ ] Medium issues fixed or logged to the design system backlog.
- [ ] Low issues logged.
- [ ] Designer signs off for merge. Sign-off: [name], date:

## Examples
| Mismatch | Severity | Action |
|---|---|---|
| Arabic `BackButton` arrow points left | High | Fix |
| Card padding 14 instead of `space/lg` 16 | Medium | Fix or backlog with date |
| Amount shows `ر.س 1,250.50` (currency first) | High | Fix |
| Skeleton shimmer 50ms slower than spec | Low | Log |
| Common catches from Deliver: wrong spacing token, missing RTL behaviour, wrong text scale handling, unbuilt empty/loading/error states | | |

## Sources
- Notion: TEMPLATE Widgetbook Parity Checklist, `3481a53e-1a6b-811a-9239-c995381a31d2`.
- Notion: 04 Deliver, `3481a53e-1a6b-8133-8d9a-c9a74ee1304c` (Design QA, common catches, real-device rule).
- Built system: `knowledge/tokens/resolved.json` (`font/family`), `knowledge/tokens/text-styles.json`.
