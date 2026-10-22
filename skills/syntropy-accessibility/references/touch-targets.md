<!-- syntropy-lint-disable no-raw-spacing: hit-area insets are target sizes, not layout spacing -->
# Touch and pointer targets

Minimum sizes and spacing for anything a user taps or clicks in Safqah: Flutter app (iOS, Android), web and back-office. Open when sizing controls, laying out icon rows, keypads, chips, tables, or reviewing dense screens.

## Minimums

| Platform | Minimum | Source | Check |
| --- | --- | --- | --- |
| Flutter app (both platforms) | **48 x 48 dp** (one Safqah number; satisfies iOS 44) | Material 3, Apple HIG | `androidTapTargetGuideline`, `iOSTapTargetGuideline` |
| Web, back-office | **24 x 24 CSS px**, or spacing so a 24px circle on each target does not overlap another | WCAG 2.5.8 AA | axe `target-size` |
| Responsive web below 768px or `pointer: coarse` | 44 x 44 CSS px (recommended) | WCAG 2.5.5 AAA, Apple | manual |

## Rules
1. Every tappable element in the app has a 48x48 dp hit area, even when it draws smaller. Why: thumbs, tremor, one-handed use on large phones.
2. Grow the hit area, not the visual: padding, `SizedBox(48, 48)` with the visual centred, `BoxConstraints(minWidth: 48, minHeight: 48)`; web `::before` hit area. Why: keeps the Syntropy look.
3. Neighbouring targets keep at least `space/sm` between hit areas; `space/md` between a destructive and a non-destructive action. Why: prevents mis-taps on «إلغاء» next to «تأكيد».
4. Inline links inside a paragraph are exempt; standalone `Link` rows («اعرف المزيد») are not. Why: the WCAG inline exception covers text flow only.
5. A control and its label are one target: `Checkbox`, `Radio`, `Switch`, `SelectRow`, `ListItem`. Why: bigger target, platform behaviour.
6. Frequent actions stay out of the edge gesture zones (at least `space/lg` from the edge) and never under the iOS home indicator; use `SafeArea`. Why: system gestures steal taps.
7. The money confirm button (`Button Size=lg`, full width in `SheetFooter`) is the largest, least ambiguous target on the screen. Why: the primary money action must be easiest to hit.
8. Never set `MaterialTapTargetSize.shrinkWrap` in the app. Why: it silently removes the padded 48dp target.

## Components that need attention

| Component | Risk | Fix |
| --- | --- | --- |
| `IconButton Size=sm` | visual under 48 | 48x48 hit area; `space/sm` between neighbours |
| `Button Size=sm` | height under 44/48 | web and back-office only, or pad to 48 in the app |
| `Tag Removable` | tiny close glyph | close hit area 48x48; label «إزالة الرياض»; removable via screen-reader action |
| `Badge Dot`, `Badge Count` | not a target | never tappable alone; the parent is the target |
| `PaginationItem`, `PaginationArrow` | dense row | 24x24 on web with `space/xs`; 48 on mobile web |
| `Table / ActionCell` | icon clusters | 24x24 each with spacing; prefer one `MenuTrigger` opening `Menu` |
| `PageIndicator` | dots are not targets | swipe plus arrow buttons or screen-reader increment |
| Keypad keys (`QualifiedCalculator`, amount keypads) | must be large | each key at least 48x48, `space/sm` gaps |
| `Calculator / Duration option`, `RegionChip`, `RatingCell` | chip rows | 48 tall in the app; wrap rows, never shrink |
| `DragHandle` | small grab bar | whole sheet header draggable plus a close button (2.5.7) |
| `BackButton` | top corner | 48x48 hit area, mirrored in RTL (points right in Arabic) |
| `Switch` | thin track | whole row including label is the target |

## Recipes

```dart
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
ThemeData(materialTapTargetSize: MaterialTapTargetSize.padded); // default, keep it
```

```css
.icon-btn { position: relative; inline-size: 16px; block-size: 16px; }
.icon-btn::before { content: ""; position: absolute; inset: -4px; }          /* 24px */
@media (pointer: coarse) { .icon-btn::before { inset: -14px; } }             /* 44px */
```

Use logical properties (`inset-inline-start`, `padding-inline`) so RTL mirrors for free.

## Quick test
- Flutter: `meetsGuideline(androidTapTargetGuideline)` and `iOSTapTargetGuideline` (see `testing.md`).
- Web: axe `target-size` with tag `wcag22aa`.
- Manual: Android "Show layout bounds" or Flutter Inspector "Show guidelines": any tappable box under 48 is a finding.

## Examples
- Do: `Tag Removable` with a 48x48 close area labelled «إزالة الرياض». Don't: a 16px × as the only target.
- Do: back-office row with one `MenuTrigger` «إجراءات» opening `Menu`. Don't: four 16px icons with 4px gaps.
- Do: «إلغاء» and «تأكيد» separated by `space/md`, confirm full width. Don't: two equal small buttons touching.

## Sources
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- https://developer.apple.com/design/human-interface-guidelines/accessibility
- https://m3.material.io/foundations/designing/structure
- https://api.flutter.dev/flutter/flutter_test/androidTapTargetGuideline-constant.html
- `data/ux/accessibility/touch-targets.md`
