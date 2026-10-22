# Focus and keyboard

How focus looks and moves in Safqah web, back-office and the Flutter app (hardware keyboards, switch access, screen-reader focus). Use when building any interactive screen, overlay or custom control.

## Rules
1. Focus indicator = 2px ring in `border/focus`, offset 2px outside the control, following the control's radius. Why: `border/focus` passes 3:1 against `bg/base`, `bg/surface` and `bg/elevated` in both modes (`contrast-pairs.md`); brand green does not.
2. Never use `border/brand/primary` as the focus ring. Why: it is under 3:1 on light surfaces in Light mode (2.68 to 2.92).
3. Use component focus states, do not draw your own: `Button State=focused`, `IconButton State=focused`, `Input State=focus`. Why: consistent and already reviewed.
4. Show the ring for keyboard focus only (`:focus-visible` on web, Flutter `FocusHighlightMode.traditional`). Do not show it on touch. Why: avoids noise for touch users while meeting 2.4.7.
5. Focus order follows reading order: in Arabic, start top-right, move right to left, then down. In English, top-left, left to right. Why: SC 2.4.3 and 1.3.2.
6. Never reorder focus with positive `tabindex` on web. In Flutter, use `FocusTraversalGroup` with `ReadingOrderTraversalPolicy` (default, direction aware) and `OrderedTraversalPolicy` only for a documented exception. Why: manual orders drift from layout and break in the other direction.
7. Overlays (`BottomSheet`, `Modal`, `Dialog`, `Drawer`, `Popover`, `Menu`) move focus into themselves on open (first focusable or the title), trap focus while open, close on Esc (web) or back gesture, and return focus to the trigger on close. Why: SC 2.1.2, 2.4.3.
8. The focused element is never fully hidden by sticky UI (`Header`, `TabBar`, `SheetFooter`, `Toast`, `Banner`). Why: SC 2.4.11 (new in 2.2).
9. Arrow keys move within composite widgets, Tab moves between them: `SegmentedControl_*`, `TabBar`, `Radio Group`, `Menu`, `Combobox Menu`, `Date Calendar Picker`. In RTL, Left arrow means "next" visually leftwards (APG: arrows follow visual direction). Why: APG patterns and user expectation.
10. Never move focus on a timer or on data refresh. Why: users lose their place (SC 3.2.1).

## Focus ring spec

| Property | Value |
| --- | --- |
| Colour | `border/focus` |
| Width | 2px |
| Offset | 2px outside (web `outline-offset: 2px`) |
| Radius | control radius + offset (`radius/default` controls get 22px) |
| On fills (`bg/brand/primary` Button) | same `border/focus` ring outside the fill; the ring sits on the page background so it keeps contrast |
| Inside a dark `bg/inverse` area | `border/inverse` ring |

Web:
```css
:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
/* Sticky header and CTA footer: keep focused items visible (2.4.11) */
html { scroll-padding-block-start: var(--header-h); scroll-padding-block-end: var(--footer-h); }
```

Flutter:
```dart
Focus(
  onFocusChange: (f) => setState(() => focused = f),
  child: AnimatedContainer(
    duration: reduceMotion ? Duration.zero : const Duration(milliseconds: 120),
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(radiusDefault + 2),
      border: focused && FocusManager.instance.highlightMode == FocusHighlightMode.traditional
          ? Border.all(color: tokens.borderFocus, width: 2)
          : null,
    ),
    padding: const EdgeInsets.all(2),
    child: child,
  ),
);
```

## Focus order in RTL

Example: deal page in Arabic.

| Step | Element | Why here |
| --- | --- | --- |
| 1 | `BackButton` (top right in RTL) | start of reading |
| 2 | Screen title in `AppBar` (heading) | context |
| 3 | `AppBar` trailing actions (share, help) on the left | end of the row |
| 4 | `HeaderCard` content | first content block |
| 5 | `Section` blocks top to bottom | reading order |
| 6 | sticky `SheetFooter` CTA «استثمر الآن» | last, though visually fixed |

Do not put the sticky CTA first in focus order just because it is always visible. Provide a heading or landmark so users can jump to it.

## Keyboard map (web and back-office)

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | next / previous focusable |
| Enter | activate `Button`, `Link`, `ListItem` with action |
| Space | activate `Button`, toggle `Checkbox`, `Switch` |
| Arrows | move inside `Radio Group`, `TabBar`, `SegmentedControl_*`, `Menu`, `Table` grid mode, `Slider` value |
| Home / End | first / last item; `Slider` min / max |
| Page Up / Down | `Slider` large step, calendar month |
| Esc | close overlay, clear `Combobox Field`, dismiss `Tooltip` |
| Ctrl/Cmd+K | `Command palette` (back-office) |

## Focus management after actions
- After submit with errors: focus moves to the error summary `Alert` (long forms) or the first invalid field (short forms).
- After a successful money action: focus moves to the success heading («تم الاستثمار بنجاح»), not to the top of the app.
- After deleting a list item: focus moves to the next item, or the previous one if it was last, or the `EmptyState` title.
- After closing a `Toast`: focus does not move (Toast never takes focus).
- After route change in Flutter: the new screen title is announced (the `AppBar` title is a header and first in order).

## Quick test
1. Web: Tab through the whole page in `dir="rtl"` and `dir="ltr"`; write down the order; compare with visual order.
2. Open and close every overlay with keyboard; check focus returns to the trigger.
3. Tab to the last field above the sticky footer; it is visible.
4. Flutter: connect a Bluetooth keyboard (or iOS Full Keyboard Access, Android Switch Access) and repeat.

## Examples
- Do: focus ring `border/focus` around a `Button Variant=primary`. Don't: a lighter green glow that disappears on white.
- Do: Esc closes the `Popover` and focus goes back to the info icon. Don't: Esc closes and focus jumps to the page top.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#focus-visible
- https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum
- https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- https://api.flutter.dev/flutter/widgets/FocusTraversalGroup-class.html
- knowledge/ux/accessibility/contrast-pairs.md
