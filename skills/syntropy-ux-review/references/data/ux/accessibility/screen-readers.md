# Screen readers

How to make Safqah screens work with VoiceOver (iOS, macOS) and TalkBack (Android) in Arabic and English, using Flutter `Semantics` in the app and native HTML plus ARIA (per the APG) on web and back-office. Use when labelling widgets, announcing changes, or writing amounts, dates and mixed Arabic/English strings.

## Rules
1. Every interactive element has an accessible name in the current locale. Icon-only controls (`IconButton`, `BackButton`, `Tag Removable` close, `BalanceToggle`, `MenuTrigger` with icon only) always get a label. Why: SC 4.1.2; an unlabeled button is read as «زر» and nothing else.
2. The name starts with the visible text (Label in Name, SC 2.5.3); add context after it: «استثمر، الريم 46». Why: voice control users say what they see.
3. Expose role and state with semantics flags, never in the label: not «زر تبديل مفعل», but `Semantics(toggled: true, label: 'إشعارات الصفقات')`. Why: the reader adds role and state in the user's language and verbosity.
4. Decorative content is excluded: illustrations, background media, divider lines, duplicate icons next to text. Why: noise slows users and hides content.
5. One idea per focus stop. Merge a card's parts into one stop when they are read together (`CardDeal`, `ListItem`, `KeyValue`, `Payouts cell`); keep separate stops for separate actions inside. Why: 12 stops for one card is unusable.
6. Changes that happen without focus moving are announced (live region), once, politely. Errors may be assertive. Why: SC 4.1.3.
7. Amounts are labelled in full words for the currency: label «1,250.00 ريال سعودي», visible «1,250.00 ر.س». Why: «ر.س» is often read letter by letter (راء، سين).
8. Mixed-direction strings are isolated so their parts keep order (IBAN, phone, English names inside Arabic). Why: bidi reordering scrambles both the visual and the spoken order.
9. Modals block the content behind them for assistive tech. Why: users must not wander behind a `BottomSheet`.
10. Test with the real reader in Arabic before calling a screen done (scripts in `testing.md`). Why: emulated checks miss pronunciation and order problems.

## Flutter Semantics toolkit

| Need | Use | Syntropy example |
| --- | --- | --- |
| Name an icon-only button | `IconButton(tooltip: ...)` or `Semantics(label:, button: true)` | `BackButton` → «رجوع» |
| Describe the result of activating | `Semantics(hint: ...)` (short; read after a pause) | «يفتح تفاصيل التوزيعات» |
| Current value of a control | `Semantics(value: ...)` | `Slider` value «12 شهر»; `NumericStepper` «3» |
| Adjustable control | `Semantics(increasedValue:, decreasedValue:, onIncrease:, onDecrease:)` | `NumericStepper`, `Calculator / Duration picker` (meets 2.5.7) |
| State | `checked`, `toggled`, `selected`, `expanded`, `enabled`, `inMutuallyExclusiveGroup` | `Checkbox`, `Switch`, `SelectRow`, `AccordionItem`, `Radio` |
| Heading | `Semantics(header: true)` | `Section` title, `AppBar` title |
| Hide decoration | `ExcludeSemantics` or `excludeSemantics: true` on a parent | `Empty Illustration / *`, `Reinvest / Illustration · Orbit` |
| One stop for a group | `MergeSemantics` | `KeyValue` («صافي العائد، 1,833.33 ريال سعودي»), `ListItem` |
| Replace children's text | `Semantics(label:, excludeSemantics: true, child:)` | `MoneyAmount` with styled parts |
| Live update | `Semantics(liveRegion: true)` or `SemanticsService.announce(msg, TextDirection.rtl)` | `Toast`, OTP resend timer at milestones, filter result counts |
| Block background | `BlockSemantics` / `ModalBarrier` (built into `showModalBottomSheet`, `showDialog`) | `BottomSheet`, `Dialog` |
| Custom order | `Semantics(sortKey: OrdinalSortKey(n))` inside a `FocusTraversalGroup` | sticky CTA read after content |
| Extra actions | `Semantics(customSemanticsActions: {...})` | swipe-to-delete row also offers «حذف» action |
| Text label differs from visual | `Text('1,250.00 ر.س', semanticsLabel: '1,250.00 ريال سعودي')` | `MoneyAmount`, `Stat` |

```dart
// CardDeal as one stop with a clear summary, action kept separate.
MergeSemantics(
  child: Semantics(
    button: true,
    label: 'الريم 46، عائد متوقع 16 بالمئة سنويًا، مدة 12 شهر، مكتمل 70 بالمئة',
    hint: 'يفتح تفاصيل الفرصة',
    child: CardDealView(deal: deal), // inner texts excluded by the explicit label
  ),
);

// Hidden balance (BalanceToggle)
Semantics(
  button: true,
  toggled: !hidden,
  label: hidden ? 'إظهار الرصيد' : 'إخفاء الرصيد',
  child: BalanceToggleView(hidden: hidden),
);

// Announce a status without moving focus
SemanticsService.announce('تم حفظ التغييرات', TextDirection.rtl);
```

`hint` vs `label`: label = what it is, hint = what happens (optional, short). Never put instructions like «انقر مرتين» in a hint; the reader already says that.

## Web: native first, ARIA per the APG

| Syntropy component | HTML / ARIA pattern (APG) |
| --- | --- |
| `Button`, `IconButton` | `<button>`; icon-only adds `aria-label` |
| `Link` | `<a href>`; never a `<div onclick>` |
| `Switch` | `<button role="switch" aria-checked>` (APG Switch) |
| `Checkbox`, `Checkbox Group` | `<input type="checkbox">` in `<fieldset><legend>` |
| `Radio Group` | `<fieldset>` + `<input type="radio">`, or APG Radio Group |
| `SegmentedControl_*`, `SegmentedTabs`, `TabBar` (web) | APG Tabs (`role="tablist"`, `tab`, `tabpanel`) when they switch panels; Radio Group when they set a value |
| `AccordionItem`, `Accordion` | APG Accordion (`<button aria-expanded aria-controls>` inside a heading) |
| `Dialog`, `Modal`, `BottomSheet` (web) | `<dialog>` or APG Dialog (`role="dialog" aria-modal="true" aria-labelledby`) |
| `Menu`, `MenuTrigger` | APG Menu Button (`aria-haspopup="menu" aria-expanded`) |
| `Select`, `Combobox Field` + `Combobox Menu` | native `<select>` where possible; else APG Combobox (`role="combobox"`, `aria-activedescendant`, `listbox`) |
| `Tooltip` | APG Tooltip (`aria-describedby`), opens on focus and hover, Esc closes |
| `Toast` | `role="status"` (polite); error toasts `role="alert"` |
| `Alert`, `Banner` | static: no role; dynamic insertion: `role="status"` or `role="alert"` for errors |
| `Table / *` | `<table>`, `<th scope="col">`, `<caption>`; sortable header `aria-sort` |
| `Breadcrumb` | `<nav aria-label="مسار التنقل">` + `aria-current="page"` |
| `Pagination` | `<nav aria-label="الصفحات">`, current page `aria-current="page"` |
| `ProgressBar`, `MilestoneProgress` | `<progress>` or `role="progressbar" aria-valuenow aria-valuemin aria-valuemax aria-valuetext` |
| `Slider` | `<input type="range">` with `aria-valuetext="12 شهر"` |
| `SkeletonLine`, `SkeletonBlock` | container `aria-busy="true"`; skeleton itself `aria-hidden="true"` |
| `SpinnerRing` and other `Spinner*` | `role="status"` with visually hidden «جارٍ التحميل» |

First rule of ARIA: if a native element exists, use it. Bad ARIA is worse than none.

## Arabic screen-reader notes

### Numbers and currency
| Content | Visible | Semantics label | Why |
| --- | --- | --- | --- |
| SAR amount | `1,250.00 ر.س` | `1,250.00 ريال سعودي` | abbreviation read as letters |
| Amount, English UI | `SAR 1,250.00` | `1,250.00 Saudi riyals` | same |
| Percentage | `16%` | `16 بالمئة` | some voices drop % in Arabic |
| Negative change | `−2.5%` (with `TrendBadge` arrow) | `انخفاض 2.5 بالمئة` | minus signs are often skipped |
| Positive change | `+4.2%` | `ارتفاع 4.2 بالمئة` | sign alone is ambiguous |
| Date | `15/10/2026` | `15 أكتوبر 2026` | slash dates are read as fractions or numbers |
| Duration | `12 ش` | `12 شهر` | abbreviations |
| Large compact numbers | `1.2M` | `1.2 مليون ريال سعودي` | letter suffixes read as letters |
| IBAN | `SA00 0000 0000 0000 0000 0000` | grouped, with `lang="en"` / LTR isolate | read in groups, not as one huge number |
| Masked values | `•••• 1234` | `ينتهي بـ 1234` | bullets read as «نقطة» repeatedly |
| Hidden balance | `••••••` | `الرصيد مخفي` | same |

Western digits (0-9) are read correctly by Arabic VoiceOver and TalkBack voices as Arabic number words; keep them (CONVENTIONS rule). Never use Eastern Arabic digits to "help" the reader.

### Mixed-direction strings
- Wrap embedded LTR runs (IBAN, phone, email, English product names) in an LTR isolate. Flutter: `Directionality(textDirection: TextDirection.ltr, child: Text(iban))` for a standalone value, or `Bidi`/Unicode isolates (`⁦` LRI ... `⁩` PDI) inside a sentence. Web: `<bdi>` or `<span dir="ltr" lang="en">`.
- Phone numbers in Arabic UI: `+966 5X XXX XXXX` displayed LTR inside RTL layout.
- Never build a sentence by concatenating translated fragments around a number; use ICU messages with placeholders so the reader gets one natural sentence: «استثمرت 10,000.00 ريال سعودي في الريم 46».
- Punctuation: use Arabic comma «،» in Arabic labels so pauses fall right.

### Direction and locale
- Set `MaterialApp.locale` and `supportedLocales`; the reader picks the voice from the app locale. Web: `<html lang="ar" dir="rtl">`.
- Use `Directionality` from the locale, never per component. Mirrored icons (`BackButton`, chevrons) still keep the same label («رجوع», not «يمين»).
- `SemanticsService.announce` takes a `TextDirection`; pass `TextDirection.rtl` for Arabic messages.

### Avoid icon-only buttons without labels
- Share, filter, help, close, more (`Icon / more-horizontal`), eye toggle: each needs a label in both languages.
- Prefer a visible text label next to unfamiliar icons (Safqah minimal copy still allows one word).

## Quick test
1. VoiceOver (iOS): Settings > Accessibility > VoiceOver; language Arabic; swipe right through the screen; listen for unlabeled «زر», letter-by-letter currency, wrong order.
2. TalkBack (Android): same with Arabic TTS; use reading controls > headings to jump between `Section` titles.
3. Web: NVDA or VoiceOver for macOS with `lang="ar"`; check landmarks and headings lists.
4. Flutter: `labeledTapTargetGuideline` in widget tests catches unlabeled tappables (`testing.md`).

## Examples
- Do: `IconButton` share with label «مشاركة الفرصة». Don't: unlabeled icon read as «زر».
- Do: `MoneyAmount` label «18,333.33 ريال سعودي». Don't: «18,333.33 راء سين».
- Do: `Toast` «تم نسخ رقم الآيبان» as a live region. Don't: a silent toast.

## Sources
- https://api.flutter.dev/flutter/widgets/Semantics-class.html
- https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility
- https://www.w3.org/WAI/ARIA/apg/patterns/
- https://www.w3.org/WAI/WCAG22/quickref/#name-role-value
- https://www.w3.org/International/articles/inline-bidi-markup/
- knowledge/content/numbers-currency.md (locale rule for amounts)
