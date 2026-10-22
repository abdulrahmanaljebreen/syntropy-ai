# Colour is never the only cue

Status, validation, selection, gain or loss and chart series in Safqah must carry a second cue (icon, text, shape, pattern or position) so they work for colour-blind users (about 8% of men), in grayscale, in sunlight and with screen readers. Use whenever colour encodes meaning.

## Rules
1. Every coloured status has text. `StatusPill` and `Tag` always show a label; a dot alone (`Badge Dot`) never carries status meaning by itself. Why: SC 1.4.1.
2. Add an icon for states that need action or warn: `StatusPill HasIcon=true` for warning, error, success; `Alert`, `Banner`, `Toast` always show their tone icon. Why: shape is read before colour and survives grayscale.
3. Gain or loss uses a sign and an arrow, not just green or red: `TrendBadge` with `+4.2%` and up arrow, `−2.5%` and down arrow. Why: red/green is the most common confusion pair.
4. Errors use red border plus error icon plus text (`Input State=error` with `Input Helper Text`). Why: SC 1.4.1, 3.3.1.
5. Selection uses border plus check or fill change plus semantics `selected` (`SelectRow`, `RegionChip`, `Calculator / Duration option`, `SegmentItem`). Why: `border/brand/primary` alone is under 3:1 in Light.
6. Links inside body text are underlined (or have 3:1 against surrounding text plus a non-colour cue on hover and focus). Why: SC 1.4.1 for links.
7. Charts: series are distinguishable by position, direct labels, line style (solid, dashed) or marker shape, not only hue; every chart has a text summary and a data table or list alternative. Why: SC 1.4.1, 1.1.1.
8. Warnings use the DS warning tone (`bg/warning-subtle`, `text/warning`, `icon/warning`); red is only for the extreme (defaulted, failed payment, critical). Why: Safqah colour rule; red everywhere stops meaning anything.
9. Required status text colours meet 4.5:1 and status icons 3:1 on their background in both modes (`contrast-pairs.md`). Why: colour cues that are too faint fail even as the second cue.

## Status mapping (Safqah deals and transactions)

| Status (AR / EN) | Component | Tone | Icon | Text always shown |
| --- | --- | --- | --- | --- |
| متاحة / Open | `StatusPill` | `Tone=brand` or `success` | none or play | «متاحة» |
| مكتملة التمويل / Fully funded | `StatusPill` | `Tone=info` | check-circle | «مكتملة التمويل» |
| قيد المعالجة / Processing | `StatusPill` | `Tone=info` | clock or spinner | «قيد المعالجة» + time |
| بانتظار الدفع / Awaiting payment | `StatusPill` | `Tone=warning` | clock | «بانتظار الدفع» + deadline |
| مكتمل / Settled | `StatusPill` | `Tone=success` | check | «مكتمل» + date |
| فشل / Failed | `StatusPill` | `Tone=error` | alert | «فشل» + reason link |
| متأخرة / Late | `StatusPill` | `Tone=warning` | alert-triangle | «متأخرة» + days |
| متعثرة / Defaulted | `StatusPill` | `Tone=error` | alert-octagon | «متعثرة» |
| مغلقة / Closed | `StatusPill` | `Tone=neutral` | lock | «مغلقة» |

Prefer `Variant=subtle` for status pills. `Variant=solid` with `text/on-brand` fails contrast on `bg/success` and `bg/warning` in both modes (see `contrast-pairs.md`). In `Variant=subtle Tone=warning`, `icon/warning` on `bg/warning-subtle` sits just under 3:1 in Light, so the text label is the cue that must carry the meaning.

## Charts checklist (`Chart / *`)
- Title states the takeaway: «العائد التراكمي ارتفع 12% منذ يناير».
- Direct labels at line ends instead of a colour-only legend (`Chart / Legend` still present for many series).
- Second encoding: dashed line for projected vs solid for actual; hatched or lighter fill for expected payouts vs paid.
- `Chart / ChartTooltip` values available by tap and keyboard, not hover only.
- Text alternative: a `Semantics` summary label on the chart container, plus a «عرض كجدول» toggle that shows a `Table` or `List / DescriptionRow` with the same numbers.
- Time runs left to right even in RTL (Syntropy chart gate), with Western digits.

## Quick test
1. Grayscale: iOS Settings > Accessibility > Display > Color Filters > Grayscale, or desaturate a screenshot. Every state still readable.
2. Simulate deuteranopia and protanopia (Chrome DevTools > Rendering > Emulate vision deficiencies).
3. Screen reader: status is spoken as text («قيد المعالجة»), not «أخضر».
4. Check `contrast-pairs.md` rows for the status text and icon tokens used.

## Examples
- Do: `StatusPill Tone=warning Variant=subtle HasIcon=true` «بانتظار الدفع». Don't: an orange dot next to the deal name.
- Do: `TrendBadge` «+4.2%» with up arrow. Don't: green «4.2%» with no sign.
- Do: line chart with «فعلي» solid and «متوقع» dashed, labelled at the line end. Don't: two greens distinguished by shade.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#use-of-color
- https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast
- knowledge/components/index.json (`StatusPill`, `Tag`, `TrendBadge`, `Chart / *`)
- knowledge/ux/accessibility/contrast-pairs.md
