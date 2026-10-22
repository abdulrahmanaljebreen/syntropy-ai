# Dynamic type and text scaling

How Safqah screens behave when users enlarge text (iOS Larger Text, Android font size and display size, browser zoom) up to 200% and beyond, with Arabic metrics and money values that must never be cut. Use when choosing text styles, laying out cards and rows, or reviewing a dense screen.

## Rules
1. Text scales to at least 200% with no loss of content or function (SC 1.4.4). Never disable scaling (`TextScaler.noScaling`, `textScaleFactor: 1.0`, `maximum-scale=1` in the web viewport). Why: about 1 in 4 iOS users change text size; older investors rely on it.
2. Do not clamp the scale below 2.0. If a specific component (for example `Keypad / *` keys) needs a cap, clamp that widget only with `MediaQuery.withClampedTextScaling(maxScaleFactor: 2.0)` and keep labels readable. Why: global clamps hide the problem.
3. Use Syntropy text styles; their Arabic line height is 1.5 x size (`font/line-height/*`, for example `font/size/16` with `font/line-height/16` = 24). Keep it 1.5 for Arabic body text when scaling; English styles use about 1.43. Why: Arabic ascenders, descenders and diacritics (تشكيل) clip under tight line heights.
4. Containers hug their text: no fixed heights on rows, cards, buttons, chips or `Tag`. Use min heights (48 for touch) and let height grow. Why: fixed heights clip the second line at 130% already.
5. Money values are never truncated, ellipsised or faded. Allowed: wrap to the next line, move the value below its label, or reduce to the next smaller text style at extreme scales (`FittedBox(fit: BoxFit.scaleDown)` only for a single-line hero amount, never below the body size). Why: a truncated amount (`1,250,0…`) is a wrong amount.
6. Labels may wrap; truncate with ellipsis only non-essential secondary text (deal subtitle), and then expose the full text in semantics and on tap. Why: SC 1.4.4 allows no loss of content.
7. At large scales, horizontal layouts reflow to vertical: `KeyValue` and `ListItem` stack label above value when `MediaQuery.textScalerOf(context).scale(16) > 24` (that is, above 150%). Why: side-by-side label and value collide in RTL and LTR.
8. Icons that sit inline with text scale with it (size relative to the text style), up to a sensible cap. Why: tiny icons next to huge text lose meaning.
9. Keep screens scrollable. Every screen body sits in a scroll view; sticky footers (`SheetFooter`) shrink in height priority so content stays reachable. Why: fixed `Column`s overflow at large sizes.
10. Web: use `rem` for type and spacing that should scale; support 400% zoom reflow at 320 CSS px (SC 1.4.10); allow user text spacing overrides (SC 1.4.12). Why: browser zoom and user stylesheets.

## Component behaviour at 200%

| Component | Expected behaviour |
| --- | --- |
| `Button` | label wraps to 2 lines max, height grows; full-width in `SheetFooter` |
| `CardDeal` | metrics (`CardDeal / Metric`) stack vertically; image ratio may shrink; numbers never truncated |
| `KeyValue`, `ListItem` | stack label over value above 150% |
| `PortfolioHeader` / `MoneyAmount` | hero amount wraps or scales down one step; currency stays after the amount on the same line where possible |
| `Tag`, `StatusPill` | wrap the pill or grow height; never cut text |
| `TabBar`, `BottomNavTabItem` | labels may be replaced by a long-press large-label preview (iOS pattern) but keep semantics labels |
| `Table / *` (web) | horizontal scroll inside `ScrollContainer`; cells wrap |
| `Chart / *` | axis labels thin out; data table alternative stays available |
| `Input`, `Input Amount` | field height grows; value scrolls horizontally inside the field, but the confirm step shows the full amount |
| `Dialog`, `BottomSheet` | content scrolls; actions stay reachable |

## Flutter recipe

```dart
final scaler = MediaQuery.textScalerOf(context);
final stacked = scaler.scale(16) > 24; // more than 150%

Widget keyValue(String k, String v) => stacked
    ? Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(k), Text(v, style: valueStyle)])
    : Row(children: [Expanded(child: Text(k)), Text(v, style: valueStyle)]);

// Never:
// MediaQuery(data: mq.copyWith(textScaler: TextScaler.noScaling), child: app)
```

`CrossAxisAlignment.start` follows `Directionality`, so it is right-aligned in Arabic without extra code.

## Quick test
1. iOS: Settings > Accessibility > Display & Text Size > Larger Text, slider to the maximum of the accessibility sizes. Android: Font size max plus Display size max.
2. Flutter widget test: pump with `MediaQueryData(textScaler: TextScaler.linear(2.0))` in Arabic and English; assert no `RenderFlex overflowed` errors and key amounts are fully found: `expect(find.text('18,333.33 ر.س'), findsOneWidget)`.
3. Web: browser zoom 200% and 400% at 1280px wide; set user text spacing (line 1.5, letter 0.12em, word 0.16em, paragraph 2em).
4. Golden tests at 1.0, 1.3, 2.0 for every screen with money values.

## Examples
- Do: at 200%, `KeyValue` «صافي العائد» on one line and `18,333.33 ر.س` on the next. Don't: «صافي العا…  18,333.…».
- Do: deal title wraps to 2 lines. Don't: fixed-height card that clips the title and pushes the CTA off-screen.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#resize-text
- https://www.w3.org/WAI/WCAG22/quickref/#reflow
- https://www.w3.org/WAI/WCAG22/quickref/#text-spacing
- https://api.flutter.dev/flutter/widgets/MediaQuery/textScalerOf.html
- knowledge/tokens/resolved.json (`font/size/*`, `font/line-height/*`)
