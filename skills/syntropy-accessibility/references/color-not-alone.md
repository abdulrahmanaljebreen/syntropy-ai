<!-- syntropy-lint-disable percent-label-nisba: TrendBadge and chart examples show raw % values -->
# Colour is never the only cue

Status, validation, selection, gain or loss and chart series in Safqah carry a second cue (icon, text, shape, pattern, position) so they work for colour-blind users (about 8% of men), in grayscale, in sunlight and with screen readers. Open whenever colour encodes meaning.

## Rules
1. Every coloured status has text. `StatusPill` and `Tag` always show a label; `Badge Dot` alone never carries status. Why: SC 1.4.1.
2. Statuses that warn or need action add an icon: `StatusPill HasIcon=true`; `Alert`, `Banner`, `Toast` always show their tone icon. Why: shape survives grayscale.
3. Gain or loss uses a sign and an arrow: `TrendBadge` «+4.2%» up, «−2.5%» down. Why: red and green is the most common confusion pair.
4. Errors use `border/error` + error icon + text (`Input State=error` with `Input Helper Text`). Why: SC 1.4.1, 3.3.1.
5. Selection uses border plus check or fill change plus semantics `selected` (`SelectRow`, `RegionChip`, `Calculator / Duration option`, `SegmentItem`). Why: `border/brand/primary` alone is under 3:1 in Light.
6. Links inside body text are underlined (or 3:1 against surrounding text plus a non-colour cue on hover and focus). Why: SC 1.4.1.
7. Charts separate series by position, direct labels, line style (solid, dashed) or marker shape, not hue alone; every chart has a text summary and a table or list alternative. Why: SC 1.4.1, 1.1.1.
8. Warnings use the warning tone (`bg/warning-subtle`, `text/warning`, `icon/warning`); red only for the extreme (defaulted, failed payment, critical). Why: Safqah colour rule; red everywhere stops meaning anything.
9. Status text meets 4.5:1 and status icons 3:1 on their background in both modes. Why: a faint second cue is no cue.

## Status mapping (deals and transactions)

| Status (AR / EN) | Component | Tone | Icon | Text always shown |
| --- | --- | --- | --- | --- |
| متاحة / Open | `StatusPill` | `brand` or `success` | none or play | «متاحة» |
| مكتملة التمويل / Fully funded | `StatusPill` | `info` | check-circle | «مكتملة التمويل» |
| قيد المعالجة / Processing | `StatusPill` | `info` | clock | «قيد المعالجة» + time |
| بانتظار الدفع / Awaiting payment | `StatusPill` | `warning` | clock | «بانتظار الدفع» + deadline |
| مكتمل / Settled | `StatusPill` | `success` | check | «مكتمل» + date |
| فشل / Failed | `StatusPill` | `error` | alert | «فشل» + reason link |
| متأخرة / Late | `StatusPill` | `warning` | alert-triangle | «متأخرة» + days |
| متعثرة / Defaulted | `StatusPill` | `error` | alert-octagon | «متعثرة» |
| مغلقة / Closed | `StatusPill` | `neutral` | lock | «مغلقة» |

Prefer `Variant=subtle`. `Variant=solid` puts `text/on-brand` on `bg/success` (2.22 / 1.94) or `bg/warning` (2.20 / 1.93): fails in both modes. In `Variant=subtle Tone=warning`, `icon/warning` on `bg/warning-subtle` is 3.00 in Light (just under), so the text label must carry the meaning.

## Charts checklist (`Chart / *`)
- Title states the takeaway: «العائد التراكمي ارتفع 12% منذ يناير».
- Direct labels at line ends; `Chart / Legend` still present for many series.
- Second encoding: dashed «متوقع» vs solid «فعلي»; hatched or lighter fill for expected payouts vs paid.
- `Chart / ChartTooltip` values reachable by tap and keyboard, not hover only.
- Text alternative: a `Semantics` summary on the container and «عرض كجدول» toggling a `Table` or `List / DescriptionRow` with the same numbers.
- Time runs left to right even in RTL, with Western digits.

## Quick test
1. Grayscale (iOS Color Filters, or desaturate a screenshot): every state readable.
2. Chrome DevTools > Rendering > emulate deuteranopia and protanopia.
3. Screen reader speaks the status text («قيد المعالجة»), never a colour.
4. Check the status tokens in `contrast.md`.

## Examples
- Do: `StatusPill Tone=warning Variant=subtle HasIcon=true` «بانتظار الدفع». Don't: an orange dot by the deal name.
- Do: `TrendBadge` «+4.2%» with up arrow. Don't: green «4.2%» with no sign.
- Do: «متأخرة» in the warning tone. Don't: red for a late payment (red is for «متعثرة»).

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#use-of-color
- https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast
- `data/ux/accessibility/color-not-alone.md`
