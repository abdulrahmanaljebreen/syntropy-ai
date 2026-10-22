# Accessibility testing

How to prove a Safqah screen meets WCAG 2.2 AA: automated checks in Flutter widget tests and web CI, token contrast checks, and manual VoiceOver and TalkBack scripts in Arabic. Use before every hand-off and in CI. Report results with `../review/review-format.md`.

## Rules
1. Automated checks are necessary, not sufficient. They catch roughly a third of issues; every flow also gets one manual screen-reader pass in Arabic. Why: order, pronunciation and meaning are not machine-checkable.
2. Run every check in Arabic RTL and English LTR, Light and Dark, at text scale 1.0 and 2.0. Why: most regressions are direction-, theme- or scale-specific.
3. A failing automated accessibility check blocks the merge. Why: the cost of fixing grows after release.
4. Token contrast is checked by `npm test` (`tests/contrast.test.mjs`); regenerate with `node scripts/contrast-pairs.mjs` when tokens change. Why: one source of truth for colour pairs.

## 1. Token contrast (this repo)

```bash
node scripts/contrast-pairs.mjs   # writes knowledge/ux/accessibility/contrast-pairs.{json,md}
npm test                          # includes tests/contrast.test.mjs
```

Look up any pair in `contrast-pairs.json` by `id` (`"text/muted on bg/elevated"`); use `verdict` and `modes.Light.ratio` / `modes.Dark.ratio` in reports.

## 2. Flutter widget tests

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  for (final locale in const [Locale('ar'), Locale('en')]) {
    for (final brightness in Brightness.values) {
      for (final scale in const [1.0, 2.0]) {
        testWidgets('Checkout a11y $locale $brightness x$scale', (tester) async {
          final handle = tester.ensureSemantics();
          await tester.pumpWidget(TestApp(
            locale: locale,
            brightness: brightness,
            textScaler: TextScaler.linear(scale),
            child: const CheckoutScreen(),
          ));
          await tester.pumpAndSettle();

          await expectLater(tester, meetsGuideline(androidTapTargetGuideline)); // 48x48
          await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));     // 44x44
          await expectLater(tester, meetsGuideline(labeledTapTargetGuideline)); // every tappable has a label
          await expectLater(tester, meetsGuideline(textContrastGuideline));     // 4.5 / 3.0 on rendered pixels
          expect(tester.takeException(), isNull); // no RenderFlex overflow at 2.0
          handle.dispose();
        });
      }
    }
  }
}
```

Notes:
- `textContrastGuideline` samples rendered pixels; it can miss text over images and gradients (check those manually) and may flag disabled text (exempt; document it).
- Add semantic assertions for key nodes:

```dart
expect(
  tester.getSemantics(find.byKey(const Key('confirm'))),
  matchesSemantics(label: 'تأكيد الاستثمار', isButton: true, hasTapAction: true, isEnabled: true, hasEnabledState: true),
);
expect(find.bySemanticsLabel(RegExp('ريال سعودي')), findsWidgets); // amounts labelled in words
```

- Reduced motion: pump with `MediaQueryData(disableAnimations: true)` and assert `tester.hasRunningAnimations` is false after settle (`motion.md`).
- Golden tests at scale 1.0, 1.3 and 2.0 for screens with money values (`dynamic-type.md`).

## 3. Web and back-office (axe-core)

Playwright + `@axe-core/playwright`:

```ts
import AxeBuilder from '@axe-core/playwright';

for (const lang of ['ar', 'en']) {
  test(`dashboard a11y ${lang}`, async ({ page }) => {
    await page.goto(`/${lang}/dashboard`);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
```

- Run also with `page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })`.
- Rules to watch: `color-contrast`, `target-size` (2.5.8), `label`, `button-name`, `link-name`, `aria-*`, `landmark-*`, `region`, `html-has-lang`, `valid-lang`, `scrollable-region-focusable`.
- Keyboard pass: Playwright `page.keyboard.press('Tab')` sequence; assert `document.activeElement` order and that a visible outline exists.
- Zoom: set viewport 320px wide to check reflow (SC 1.4.10).

## 4. Manual checks (every flow)

| # | Check | Pass when |
| --- | --- | --- |
| 1 | Grayscale | all states readable without colour |
| 2 | Text 200% (iOS Larger Text max, Android font + display size max) | nothing clipped, money never truncated |
| 3 | Reduced motion on | no slide, zoom, parallax, number roll; spinner allowed |
| 4 | Keyboard (web; app with Bluetooth keyboard) | everything reachable, focus visible, order logical, no trap |
| 5 | Dark mode | contrast holds, no invisible borders or icons |
| 6 | Rotation | portrait and landscape both work |
| 7 | Screen reader Arabic (scripts below) | expected announcements match |
| 8 | Voice Control (iOS) | saying the visible label activates the control |

## 5. VoiceOver script (iOS, Arabic): investment checkout

Setup: Settings > Accessibility > VoiceOver > Speech > add Arabic (Maged or Majed voice); device language Arabic; app language Arabic. Triple-click side button toggles VoiceOver.

| Step | Gesture | Expected announcement (approximately) | Fail if |
| --- | --- | --- | --- |
| 1 | open deal page | «تفاصيل الفرصة، عنوان» | no screen title, or English voice |
| 2 | swipe right | «رجوع، زر» | «زر» without name |
| 3 | rotor > العناوين, swipe down | each `Section`: «التوزيعات، عنوان» ... | sections not headings |
| 4 | swipe to the metric row | «العائد المتوقع، 16 بالمئة سنويًا» | «16 علامة نسبة» or split into 3 stops |
| 5 | swipe to amount | «الحد الأدنى للاستثمار، 1,000 ريال سعودي» | «راء سين» |
| 6 | double tap «استثمر الآن» | sheet opens, focus on «مبلغ الاستثمار، حقل نص» | focus stays behind the sheet |
| 7 | type amount below minimum, swipe on | error read: «أقل مبلغ للاستثمار 1,000 ريال سعودي» | silent error |
| 8 | adjust duration (swipe up/down on the picker) | «12 شهر، قابل للتعديل» | needs drag only |
| 9 | reach summary | amount, fee, net and date each read once with labels | numbers without labels |
| 10 | double tap «تأكيد» | «جارٍ المعالجة» announced, then «تم الاستثمار بنجاح، عنوان» | no announcement; focus lost to top |
| 11 | scrub (two-finger Z) | sheet closes, focus back on «استثمر الآن» | focus jumps to start |

## 6. TalkBack script (Android, Arabic): add bank account (IBAN)

Setup: Settings > Accessibility > TalkBack on; Text-to-speech > Google, Arabic installed; device language Arabic.

| Step | Gesture | Expected | Fail if |
| --- | --- | --- | --- |
| 1 | open «الحسابات البنكية» | «الحسابات البنكية» screen title | none |
| 2 | swipe right through list | each account: «البنك الأهلي، ينتهي بـ 1234، مفعل» as one stop | 4 stops per card, bullets read |
| 3 | double tap «إضافة حساب» | focus on «رقم الآيبان، حقل تعديل، يبدأ بـ SA ويتكون من 24 خانة» | hint missing |
| 4 | paste a valid IBAN | value read in LTR groups | scrambled order |
| 5 | submit with a name mismatch | error announced with fix: «اسم صاحب الحساب لا يطابق...» | only red border |
| 6 | reading controls > العناوين | navigates between section titles | no headings |
| 7 | open the help action | «تواصل معنا» in the same place as other screens (3.2.6) | moves per screen |
| 8 | Toast after success | «تمت إضافة الحساب» spoken once, focus stays | silent |

## 7. Web screen reader (back-office)
- NVDA + Firefox or Chrome (Windows), VoiceOver + Safari (macOS), with `lang="ar"`.
- Check: landmarks list (header, nav, main), headings list, table navigation (Ctrl+Alt+arrows in NVDA reads headers), `aria-live` for filter counts («تم العثور على 24 مستثمرًا»).

## Reporting
Each failed check becomes a finding in `../review/review-format.md` with the WCAG SC number, severity, evidence (test name, screenshot, recording) and fix.

## Sources
- https://api.flutter.dev/flutter/flutter_test/meetsGuideline.html
- https://api.flutter.dev/flutter/flutter_test/textContrastGuideline-constant.html
- https://api.flutter.dev/flutter/flutter_test/labeledTapTargetGuideline-constant.html
- https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#axe-core-tags
- https://www.npmjs.com/package/@axe-core/playwright
- https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios
- https://support.google.com/accessibility/android/answer/6283677
