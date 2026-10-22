<!-- syntropy-lint-disable percent-label-nisba: spoken-label tables show % on purpose -->
# Screen readers: Flutter Semantics, web ARIA, Arabic reading

How Safqah screens work with VoiceOver (iOS, macOS), TalkBack (Android) and NVDA in Arabic and English: Flutter `Semantics` in the app, native HTML plus ARIA (APG) on web and back-office, and how Arabic voices read money, dates, IBANs and mixed strings. Open when labelling widgets, announcing changes, or writing amounts and dates.

## Rules
1. Every interactive element has an accessible name in the current locale. Icon-only controls always get a label: `IconButton`, `BackButton`, `Tag Removable` close, `BalanceToggle`, icon-only `MenuTrigger`. Why: SC 4.1.2; an unlabelled button is read as «زر» and nothing else.
2. The name starts with the visible text; context goes after: «استثمر، الريم 46». Why: SC 2.5.3, voice control.
3. Role and state come from semantics flags, never from the label: `Semantics(toggled: true, label: 'إشعارات الصفقات')`, not «زر تبديل مفعل». Why: the reader adds role and state in the user's language.
4. Decorative content is excluded: illustrations, background media, dividers, icons that repeat adjacent text. Why: noise hides content.
5. One idea per focus stop. Merge a card into one stop (`CardDeal`, `ListItem`, `KeyValue`, `Payouts cell`); keep separate actions separate. Why: 12 stops for one card is unusable.
6. Changes without focus movement are announced once, politely (errors may be assertive). Why: SC 4.1.3.
7. Amounts are labelled with the currency in words: visible «1,250.00 ر.س», label «1,250.00 ريال سعودي». Why: «ر.س» is read letter by letter (راء، سين).
8. Mixed-direction strings are isolated (IBAN, phone, English names inside Arabic). Why: bidi reordering scrambles the visual and spoken order.
9. Modals block the content behind them for assistive tech. Why: users must not wander behind a `BottomSheet`.
10. Test with the real reader in Arabic before calling a screen done (`testing.md`). Why: emulated checks miss pronunciation and order.

## Flutter Semantics toolkit

| Need | Use | Syntropy example |
| --- | --- | --- |
| Name an icon-only button | `IconButton(tooltip:)` or `Semantics(label:, button: true)` | `BackButton` «رجوع» |
| Result of activating | `Semantics(hint:)`, short | «يفتح تفاصيل التوزيعات» |
| Current value | `Semantics(value:)` | `Slider` «12 شهر», `NumericStepper` «3» |
| Adjustable control | `increasedValue`, `decreasedValue`, `onIncrease`, `onDecrease` | `NumericStepper`, `Calculator / Duration picker` (also meets 2.5.7) |
| State | `checked`, `toggled`, `selected`, `expanded`, `enabled`, `inMutuallyExclusiveGroup` | `Checkbox`, `Switch`, `SelectRow`, `AccordionItem`, `Radio` |
| Heading | `Semantics(header: true)` | `Section` title, `AppBar` title |
| Hide decoration | `ExcludeSemantics` | `Empty Illustration / *` |
| One stop for a group | `MergeSemantics` | `KeyValue` «صافي العائد، 1,833.33 ريال سعودي» |
| Replace children's text | `Semantics(label:, excludeSemantics: true, child:)` | `MoneyAmount` with styled parts |
| Visual text differs from spoken | `Text('1,250.00 ر.س', semanticsLabel: '1,250.00 ريال سعودي')` | `MoneyAmount`, `Stat` |
| Live update | `Semantics(liveRegion: true)` or `SemanticsService.announce(msg, TextDirection.rtl)` | `Toast`, OTP timer milestones, filter counts |
| Block background | `BlockSemantics` / `ModalBarrier` (built into `showModalBottomSheet`, `showDialog`) | `BottomSheet`, `Dialog` |
| Custom order | `Semantics(sortKey: OrdinalSortKey(n))` in a `FocusTraversalGroup` | sticky CTA read after content |
| Extra actions | `customSemanticsActions` | swipe-to-delete row also offers «حذف» |

```dart
// CardDeal as one stop; inner texts replaced by one clear summary.
MergeSemantics(
  child: Semantics(
    button: true,
    label: 'الريم 46، نسبة العائد المتوقع 16 بالمئة سنويًا، مدة 12 شهر، نسبة التمويل 70 بالمئة',
    hint: 'يفتح تفاصيل الفرصة',
    child: CardDealView(deal: deal),
  ),
);

// BalanceToggle
Semantics(button: true, toggled: !hidden, label: hidden ? 'إظهار الرصيد' : 'إخفاء الرصيد', child: view);

SemanticsService.announce('تم حفظ التغييرات', TextDirection.rtl);
```

Label is what it is; hint is what happens. Never put «انقر مرتين» in a hint; the reader already says it.

## Web: native first, ARIA per the APG

| Syntropy component | HTML / ARIA pattern |
| --- | --- |
| `Button`, `IconButton` | `<button>`; icon-only adds `aria-label` |
| `Link` | `<a href>`, never `<div onclick>` |
| `Switch` | `<button role="switch" aria-checked>` |
| `Checkbox`, `Checkbox Group` | `<input type="checkbox">` in `<fieldset><legend>` |
| `Radio Group` | `<fieldset>` + `<input type="radio">` |
| `SegmentedControl_*`, `SegmentedTabs`, `TabBar` (web) | APG Tabs when switching panels; Radio Group when setting a value |
| `AccordionItem`, `Accordion` | heading > `<button aria-expanded aria-controls>` |
| `Dialog`, `Modal`, `BottomSheet` (web) | `<dialog>` or `role="dialog" aria-modal="true" aria-labelledby` |
| `Menu`, `MenuTrigger` | APG Menu Button (`aria-haspopup="menu" aria-expanded`) |
| `Select`, `Combobox Field` + `Combobox Menu` | native `<select>` where possible; else APG Combobox |
| `Tooltip` | `aria-describedby`; opens on focus and hover; Esc closes |
| `Toast` | `role="status"`; error toasts `role="alert"` |
| `Alert`, `Banner` | static: no role; inserted later: `role="status"` / `role="alert"` |
| `Table / *` | `<table>`, `<caption>`, `<th scope="col">`, `aria-sort` on sortable headers |
| `Breadcrumb` | `<nav aria-label="مسار التنقل">` + `aria-current="page"` |
| `Pagination` | `<nav aria-label="الصفحات">` + `aria-current="page"` |
| `ProgressBar`, `MilestoneProgress` | `<progress>` or `role="progressbar"` with `aria-valuenow/min/max/valuetext` |
| `Slider` | `<input type="range" aria-valuetext="12 شهر">` |
| `SkeletonLine`, `SkeletonBlock` | container `aria-busy="true"`, skeleton `aria-hidden="true"` |
| `SpinnerRing` and other `Spinner*` | `role="status"` with visually hidden «جارٍ التحميل» |

First rule of ARIA: if a native element exists, use it. Bad ARIA is worse than none.

## Arabic reading of money, numbers and dates

| Content | Visible | Accessible label | Why |
| --- | --- | --- | --- |
| SAR amount | `1,250.00 ر.س` | `1,250.00 ريال سعودي` | abbreviation read as letters |
| Amount, English UI | `1,250.00 SAR` | `1,250.00 Saudi riyals` | same |
| Percentage | `16%` | `16 بالمئة` | some Arabic voices drop % |
| Loss | `−2.5%` + `TrendBadge` down arrow | `انخفاض 2.5 بالمئة` | minus is often skipped |
| Gain | `+4.2%` | `ارتفاع 4.2 بالمئة` | a sign alone is ambiguous |
| Date | `15/10/2026` | `15 أكتوبر 2026` | slashes read as fractions |
| Duration | `12 ش` | `12 شهر` | abbreviations |
| Compact number | `1.2M` | `1.2 مليون ريال سعودي` | letter suffixes read as letters |
| IBAN | `SA00 0000 0000 0000 0000 0000` | grouped, in an LTR isolate, `lang="en"` | read in groups, not one huge number |
| Masked value | `•••• 1234` | `ينتهي بـ 1234` | bullets read as «نقطة» repeatedly |
| Hidden balance | `••••••` | `الرصيد مخفي` | same |

- Western digits (0-9) are read as Arabic number words by Arabic VoiceOver and TalkBack voices. Keep them; never switch to Eastern Arabic digits "for the reader".
- Use the Arabic comma «،» in Arabic labels so pauses fall right.
- Build sentences with ICU placeholders, never by concatenating fragments around a number: «استثمرت 10,000.00 ريال سعودي في الريم 46».

## Mixed direction and locale
- Isolate LTR runs: Flutter `Directionality(textDirection: TextDirection.ltr, child: Text(iban))` for standalone values, Unicode isolates (LRI U+2066 ... PDI U+2069) inside a sentence; web `<bdi>` or `<span dir="ltr" lang="en">`.
- Phone numbers display LTR inside RTL: `+966 5X XXX XXXX`.
- Set `MaterialApp.locale` and `supportedLocales`; web `<html lang="ar" dir="rtl">`. The reader picks its voice from the locale.
- Mirrored icons keep their meaning label: `BackButton` is «رجوع», never «يمين».
- `SemanticsService.announce` takes a `TextDirection`: pass `TextDirection.rtl` for Arabic.

## Quick test
1. VoiceOver iOS in Arabic: swipe through; listen for bare «زر», letter-by-letter currency, wrong order.
2. TalkBack in Arabic: reading controls > headings jumps between `Section` titles.
3. Web: NVDA or macOS VoiceOver with `lang="ar"`: landmarks and headings lists.
4. Flutter: `labeledTapTargetGuideline` catches unlabelled tappables.

## Examples
- Do: share `IconButton` labelled «مشاركة الفرصة». Don't: unlabelled icon read as «زر».
- Do: `MoneyAmount` label «18,333.33 ريال سعودي». Don't: «18,333.33 راء سين».
- Do: `Toast` «تم نسخ رقم الآيبان» as a live region. Don't: a silent toast.

## Sources
- https://api.flutter.dev/flutter/widgets/Semantics-class.html
- https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility
- https://www.w3.org/WAI/ARIA/apg/patterns/
- https://www.w3.org/International/articles/inline-bidi-markup/
- `data/ux/accessibility/screen-readers.md`
