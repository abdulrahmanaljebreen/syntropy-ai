<!-- syntropy-lint-disable percent-label-nisba: scale percentages, not return labels -->
# Dynamic type and text scaling

How Safqah screens behave at large text (iOS Larger Text, Android font and display size, browser zoom) up to 200% and beyond, with Arabic metrics and money values that are never cut. Open when choosing text styles, laying out cards and rows, or reviewing a dense screen.

## Rules
1. Text scales to at least 200% with no loss of content or function. Never disable scaling: no `TextScaler.noScaling`, no `textScaleFactor: 1.0`, no `maximum-scale=1` in the web viewport. Why: SC 1.4.4; about 1 in 4 iOS users change text size, and older investors rely on it.
2. Never clamp globally below 2.0. If one widget truly needs a cap (keypad keys), clamp only it with `MediaQuery.withClampedTextScaling(maxScaleFactor: 2.0)`. Why: global clamps hide problems.
3. Use Syntropy text styles; Arabic line height is 1.5 x size (`font/line-height/*`, for example size 16 with line height 24). Keep 1.5 for Arabic body text. Why: ascenders, descenders and تشكيل clip under tight leading.
4. Containers hug their text: no fixed heights on rows, cards, buttons, chips, `Tag`. Use min heights (48 for touch). Why: fixed heights clip at 130% already.
5. Money is never truncated, ellipsised or faded. Allowed: wrap, move the value below its label, or step down one text style at extreme scales (`FittedBox(fit: BoxFit.scaleDown)` only on a single-line hero amount, never below body size). Why: `1,250,0…` is a wrong amount.
6. Only non-essential secondary text may truncate (a deal subtitle), and then the full text is in semantics and on tap. Why: no loss of content.
7. Above 150% (`MediaQuery.textScalerOf(context).scale(16) > 24`), `KeyValue` and `ListItem` stack label above value. Why: side-by-side collides in RTL and LTR.
8. Inline icons scale with their text, up to a sensible cap. Why: tiny icons next to huge text lose meaning.
9. Every screen body scrolls; sticky footers (`SheetFooter`) keep content reachable. Why: fixed `Column`s overflow.
10. Web: `rem` for type and spacing that should scale; reflow at 320 CSS px (SC 1.4.10); allow user text spacing (SC 1.4.12). Why: browser zoom and user stylesheets.

## Components at 200%

| Component | Expected |
| --- | --- |
| `Button` | label wraps to 2 lines max, height grows; full width in `SheetFooter` |
| `CardDeal` | `CardDeal / Metric` items stack; image may shrink; numbers never truncated |
| `KeyValue`, `ListItem` | stack label over value above 150% |
| `PortfolioHeader`, `MoneyAmount` | hero amount wraps or steps down once; currency stays after the amount |
| `Tag`, `StatusPill` | wrap or grow; never cut text |
| `TabBar`, `BottomNavTabItem` | large-label preview on long press (iOS pattern); semantics labels kept |
| `Table / *` (web) | horizontal scroll inside `ScrollContainer`; cells wrap |
| `Chart / *` | axis labels thin out; table alternative available |
| `Input`, `Input Amount` | field grows; value may scroll inside the field; confirm step shows the full amount |
| `Dialog`, `BottomSheet` | content scrolls; actions reachable |

## Recipe

```dart
final stacked = MediaQuery.textScalerOf(context).scale(16) > 24; // above 150%
Widget keyValue(String k, String v) => stacked
    ? Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(k), Text(v, style: valueStyle)])
    : Row(children: [Expanded(child: Text(k)), Text(v, style: valueStyle)]);
// Never: MediaQuery(data: mq.copyWith(textScaler: TextScaler.noScaling), child: app)
```

`CrossAxisAlignment.start` follows `Directionality`: right-aligned in Arabic with no extra code.

## Quick test
1. iOS Larger Text at the maximum accessibility size; Android font size and display size at maximum.
2. Flutter: pump with `TextScaler.linear(2.0)` in Arabic and English; no `RenderFlex overflowed`; `expect(find.text('18,333.33 ر.س'), findsOneWidget)`.
3. Web: zoom 200% and 400% at 1280px; user text spacing (line 1.5, letter 0.12em, word 0.16em, paragraph 2em).
4. Golden tests at 1.0, 1.3, 2.0 for every screen with money.

## Examples
- Do: at 200%, «صافي العائد» on one line and `18,333.33 ر.س` below. Don't: «صافي العا…  18,333.…».
- Do: deal title wraps to 2 lines. Don't: fixed-height card that clips the title and pushes the CTA off screen.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#resize-text
- https://www.w3.org/WAI/WCAG22/quickref/#reflow
- https://www.w3.org/WAI/WCAG22/quickref/#text-spacing
- https://api.flutter.dev/flutter/widgets/MediaQuery/textScalerOf.html
- `data/ux/accessibility/dynamic-type.md`
