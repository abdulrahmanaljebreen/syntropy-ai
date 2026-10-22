<!-- syntropy-lint-disable no-raw-spacing: negative inset example -->
# Touch and pointer targets

Minimum sizes and spacing for anything a user taps or clicks in Safqah: the Flutter app (iOS and Android), web and back-office. Use when sizing controls, laying out rows of icons, or reviewing dense screens such as tables and calculators.

## Minimums

| Platform | Minimum target | Source | Notes |
| --- | --- | --- | --- |
| iOS (Flutter on iOS) | 44 x 44 pt | Apple HIG | Flutter `iOSTapTargetGuideline` checks 44x44 |
| Android (Flutter on Android) | 48 x 48 dp | Material 3 | Flutter `androidTapTargetGuideline` checks 48x48; `MaterialTapTargetSize.padded` |
| Web, back-office (WCAG 2.5.8 AA) | 24 x 24 CSS px | WCAG 2.2 | or spacing so a 24px circle on each target does not overlap another target |
| Web touch layouts (recommended) | 44 x 44 CSS px | WCAG 2.5.5 AAA, Apple | use on responsive web below 768px |

Safqah rule: the Flutter app uses **48 x 48** as one number for both platforms (it satisfies 44 too). Web uses **24 x 24** as the floor and 44 on touch breakpoints.

## Rules
1. Every tappable element has a hit area of at least 48x48 dp in the app, even when it draws smaller. Why: thumbs, tremor and one-handed use on large phones.
2. Expand the hit area, not the visual. Wrap small visuals in padding or `SizedBox(48,48)` with the visual centred; on web use padding or a `::before` hit area. Why: keeps the Syntropy look while meeting the rule.
3. Adjacent targets have at least `space/sm` between hit areas, `space/md` for destructive next to non-destructive actions. Why: prevents mis-taps on «إلغاء» versus «تأكيد».
4. Inline text links in a paragraph are exempt from 2.5.8, but standalone `Link` rows (for example «اعرف المزيد») follow the minimum. Why: the WCAG inline exception covers text flow only.
5. A visual element and its label form one target (`Checkbox`, `Radio`, `Switch`, `SelectRow`, `ListItem`). Tapping the label toggles the control. Why: larger target, matches platform behaviour.
6. Never place a target within 16 px (`space/lg`) of the screen edge gesture zone when it is a frequent action, and never under the iOS home indicator. Use `SafeArea`. Why: system gestures steal taps.
7. Money confirm buttons (Button `Size=lg`, full width in `SheetFooter`) are the largest target on the screen. Why: the primary money action must be the easiest to hit and the least ambiguous.

## Syntropy components that need attention

| Component | Risk | Fix |
| --- | --- | --- |
| `IconButton` `Size=sm` | visual may be under 48 | wrap in a 48x48 hit area; keep `space/sm` between neighbours |
| `Button` `Size=sm` | height may be under 44/48 | use in web and back-office only, or add vertical padding to reach 48 in the app |
| `Tag Removable` | close glyph is tiny | the close hit area is 48x48 (overlapping tag padding is fine); label also removable via screen-reader action |
| `Badge Dot`, `Badge Count` | not a target | never make a badge tappable on its own; the parent is the target |
| `PaginationItem`, `PaginationArrow` | dense row | at least 24x24 on web with `space/xs` gaps; 48 on mobile web |
| `Table / ActionCell` | icon clusters | at least 24x24 each on web with spacing; prefer one `Menu` trigger (`MenuTrigger`) over 3 icons |
| `PageIndicator` | dots are not reliable targets | dots are indicators; navigation via swipe plus arrow buttons or screen-reader increment |
| `Keypad / *` (`QualifiedCalculator`, `Sheet Content / Amount keypad`) | keys must be large | each key at least 48x48 with `space/sm` gaps |
| `Calculator / Duration option`, `RegionChip`, `RatingCell` | chip rows | 48 tall in the app; wrap rows rather than shrink |
| `DragHandle` | small grab bar | the whole sheet header is draggable; close button provided (2.5.7) |
| `BackButton` | top corner | 48x48 hit area, mirrored in RTL (points right in Arabic) |
| `Switch` | thin track | whole `Switch` row incl. label is the target |

## Flutter recipes

```dart
// Expand a small icon to a 48x48 hit area without changing the look.
SizedBox(
  width: 48, height: 48,
  child: IconButton(
    onPressed: onRemove,
    tooltip: 'إزالة الوسم', // also the semantics label
    icon: const Icon(SyntropyIcons.close, size: 16),
    padding: EdgeInsets.zero,
    constraints: const BoxConstraints(minWidth: 48, minHeight: 48),
  ),
);

// Keep Material's padded tap target (default). Never set shrinkWrap in the app.
ThemeData(materialTapTargetSize: MaterialTapTargetSize.padded);
```

## Web recipe

```css
/* Visual 16px, target 24px minimum (44 on touch). */
.icon-btn { position: relative; inline-size: 16px; block-size: 16px; }
.icon-btn::before { content: ""; position: absolute; inset: -4px; }
@media (pointer: coarse) { .icon-btn::before { inset: -14px; } }
```

Use logical properties (`inset-inline-start`, `padding-inline`) so RTL mirrors without extra rules.

## Quick test
- Flutter: `await expectLater(tester, meetsGuideline(androidTapTargetGuideline));` and `iOSTapTargetGuideline` (see `testing.md`).
- Web: axe rule `target-size` (WCAG 2.2 tag `wcag22aa`).
- Manual: enable Android "Show layout bounds" or Flutter Inspector "Show guidelines"; any tappable box under 48 is a finding.

## Examples
- Do: `Tag Removable` with a 48x48 close hit area and semantics label «إزالة الرياض». Don't: a 16px × glyph as the only target.
- Do: back-office row with one `MenuTrigger` («إجراءات») opening `Menu`. Don't: four 16px icons side by side with 4px gaps.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- https://developer.apple.com/design/human-interface-guidelines/accessibility
- https://m3.material.io/foundations/designing/structure (touch targets)
- https://api.flutter.dev/flutter/flutter_test/androidTapTargetGuideline-constant.html