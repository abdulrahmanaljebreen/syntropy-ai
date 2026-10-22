<!-- syntropy-lint-disable no-raw-spacing: focus ring offset is a stroke spec, not layout spacing -->
# Focus and keyboard

How focus looks and moves in Safqah web, back-office and the Flutter app (hardware keyboards, switch access, screen-reader focus). Open when building any interactive screen, overlay or custom control, or reviewing keyboard behaviour.

## Rules
1. Focus indicator: 2px ring in `border/focus`, offset 2px outside the control, following its radius. Why: `border/focus` passes 3:1 on `bg/base`, `bg/surface`, `bg/elevated` in both modes (14.64 to 18.65); brand green does not.
2. Never use `border/brand/primary` as the focus ring. Why: 2.68 to 2.92 in Light.
3. Use the component focus states, never draw your own: `Button State=focused`, `IconButton State=focused`, `Input State=focus`. Why: already reviewed and consistent.
4. Show the ring for keyboard focus only: web `:focus-visible`, Flutter `FocusHighlightMode.traditional`. Why: meets 2.4.7 without noise for touch users.
5. Focus order follows reading order: Arabic starts top-right and moves right to left, then down; English top-left, left to right. Why: SC 2.4.3, 1.3.2.
6. Never use positive `tabindex`. In Flutter use `FocusTraversalGroup` with `ReadingOrderTraversalPolicy` (direction aware); `OrderedTraversalPolicy` only for a documented exception. Why: manual orders drift and break in the other direction.
7. Overlays (`BottomSheet`, `Modal`, `Dialog`, `Drawer`, `Popover`, `Menu`) move focus in on open (first focusable or the title), trap it while open, close on Esc or back gesture, and return focus to the trigger. Why: SC 2.1.2, 2.4.3.
8. The focused element is never fully hidden by sticky UI (`Header`, `TabBar`, `SheetFooter`, `Toast`, `Banner`). Why: SC 2.4.11, new in 2.2.
9. Arrow keys move inside composite widgets, Tab moves between them: `SegmentedControl_*`, `TabBar`, `Radio Group`, `Menu`, `Combobox Menu`, `Date Calendar Picker`. Arrows follow visual direction in RTL (APG). Why: platform expectation.
10. Never move focus on a timer or on data refresh. Why: users lose their place (SC 3.2.1).

## Focus ring spec

| Property | Value |
| --- | --- |
| Colour | `border/focus` (`border/inverse` inside a `bg/inverse` area) |
| Width | 2px |
| Offset | 2px outside (web `outline-offset: 2px`) |
| Radius | control radius plus offset (`radius/default` controls get 22px) |
| On a filled primary Button | same ring outside the fill, on the page background |

```css
:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
html { scroll-padding-block-start: var(--header-h); scroll-padding-block-end: var(--footer-h); } /* 2.4.11 */
```

```dart
Focus(
  onFocusChange: (f) => setState(() => focused = f),
  child: AnimatedContainer(
    duration: reduceMotion ? Duration.zero : const Duration(milliseconds: 120),
    padding: const EdgeInsets.all(2),
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(radiusDefault + 2),
      border: focused && FocusManager.instance.highlightMode == FocusHighlightMode.traditional
          ? Border.all(color: tokens.borderFocus, width: 2)
          : null,
    ),
    child: child,
  ),
);
```

## Focus order example: deal page in Arabic

| Step | Element | Why |
| --- | --- | --- |
| 1 | `BackButton` (top right in RTL) | start of reading |
| 2 | screen title in `AppBar` (heading) | context |
| 3 | `AppBar` trailing actions (share, help) on the left | end of the row |
| 4 | `HeaderCard` | first content block |
| 5 | `Section` blocks top to bottom | reading order |
| 6 | sticky `SheetFooter` CTA «استثمر الآن» | last, even though always visible |

Give the CTA region a heading or landmark so users can jump to it; never put it first in focus order.

## Keyboard map (web and back-office)

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | next / previous focusable |
| Enter | activate `Button`, `Link`, actionable `ListItem` |
| Space | activate `Button`, toggle `Checkbox`, `Switch` |
| Arrows | move inside `Radio Group`, `TabBar`, `SegmentedControl_*`, `Menu`, `Table` grid mode, `Slider` value |
| Home / End | first / last item; `Slider` min / max |
| Page Up / Down | `Slider` large step, calendar month |
| Esc | close overlay, clear `Combobox Field`, dismiss `Tooltip` |
| Ctrl/Cmd+K | `Command palette` (back-office) |

## Focus after actions
- Submit with errors: focus to the `Alert Tone=error` summary (long forms) or the first invalid field (up to 4 fields).
- Successful money action: focus to the success heading «تم الاستثمار بنجاح», not the app top.
- Delete a list item: focus to the next item, else the previous, else the `EmptyState` title.
- `Toast`: never takes focus.
- Route change in Flutter: the new `AppBar` title is a header and first in order.

## Quick test
1. Tab through the page in `dir="rtl"` and `dir="ltr"`; write down the order; compare with visual order.
2. Open and close every overlay by keyboard; focus returns to the trigger.
3. Tab to the last field above a sticky footer; it stays visible.
4. Flutter: Bluetooth keyboard, iOS Full Keyboard Access or Android Switch Access; repeat.

## Examples
- Do: `border/focus` ring around `Button Variant=primary`. Don't: a pale green glow that vanishes on white.
- Do: Esc closes the `Popover` and focus returns to the info icon. Don't: focus jumps to the page top.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#focus-visible
- https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum
- https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- https://api.flutter.dev/flutter/widgets/FocusTraversalGroup-class.html
- `data/ux/accessibility/focus-keyboard.md`
