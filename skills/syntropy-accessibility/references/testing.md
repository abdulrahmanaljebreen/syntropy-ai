# Accessibility testing recipes

How to prove a Safqah screen meets WCAG 2.2 AA: token contrast checks, Flutter widget tests with `meetsGuideline`, axe-core on web with the WCAG 2.2 AA tags, keyboard runs, and manual VoiceOver and TalkBack scripts in Arabic. Open before every hand-off, in CI, and when someone asks "is this accessible?".

## Rules
1. Automated checks are necessary, not sufficient: they catch roughly a third of issues. Every flow also gets one manual screen-reader pass in Arabic. Why: order, pronunciation and meaning are not machine-checkable.
2. Run every check in Arabic RTL and English LTR, Light and Dark, at text scale 1.0 and 2.0. Why: regressions are direction-, theme- or scale-specific.
3. A failing automated accessibility check blocks the merge. Why: fixes get costlier after release.
4. Never claim "accessible" or "passes WCAG" without naming what was run and its result. If you could not run something, say so under "Not checked". Why: an unchecked claim is worth nothing.
5. Report every failure as a review finding (WCAG SC, severity, evidence, fix, owner). Why: findings must be actionable (see syntropy-ux-review for the format).

## Test matrix

| Dimension | Values |
| --- | --- |
| Locale | `ar` (RTL) first, `en` (LTR) |
| Theme | Light, Dark |
| Text scale | 1.0, 2.0 (plus 1.3 goldens for money screens) |
| Motion | default, reduced |
| Input | touch, keyboard, screen reader, voice control |

## 1. Token contrast

```bash
node scripts/contrast.mjs text/muted bg/elevated      # one pair, both modes, exit 1 on fail
node scripts/contrast.mjs icon/warning bg/warning-subtle
node scripts/contrast.mjs text/on-brand bg/overlay --over bg/base
```
Look up audited pairs in `data/contrast-pairs.md` or `data/ux/accessibility/contrast-pairs.json` (`modes.Light.ratio`, `modes.Dark.ratio`, `verdict`). In the Syntropy repo, the pair table is regenerated after token changes by the contrast-pairs generator and covered by `npm test`.

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
          await expectLater(tester, meetsGuideline(labeledTapTargetGuideline)); // every tappable labelled
          await expectLater(tester, meetsGuideline(textContrastGuideline));     // 4.5 / 3 on rendered pixels
          expect(tester.takeException(), isNull); // no RenderFlex overflow at 2.0
          handle.dispose();
        });
      }
    }
  }
}
```

Semantic assertions for key nodes:

```dart
expect(
  tester.getSemantics(find.byKey(const Key('confirm'))),
  matchesSemantics(label: 'تأكيد الاستثمار', isButton: true, hasTapAction: true, isEnabled: true, hasEnabledState: true),
);
expect(find.bySemanticsLabel(RegExp('ريال سعودي')), findsWidgets); // amounts labelled in words
```

Notes:
- `textContrastGuideline` samples rendered pixels: it can miss text over images and gradients (check those by hand) and may flag disabled text (exempt; document it).
- Reduced motion: pump with `MediaQueryData(disableAnimations: true)`, settle, `expect(tester.hasRunningAnimations, isFalse)`.
- Goldens at 1.0, 1.3, 2.0 for screens with money values.

## 3. Web and back-office: axe-core

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const lang of ['ar', 'en']) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`dashboard a11y ${lang} ${colorScheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
      await page.goto(`/${lang}/dashboard`);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
```

- Rules to watch: `color-contrast`, `target-size` (2.5.8), `label`, `button-name`, `link-name`, `aria-*`, `landmark-*`, `region`, `html-has-lang`, `valid-lang`, `scrollable-region-focusable`.
- Keyboard run: press Tab in sequence, record `document.activeElement`, assert order and a visible outline.
- Reflow: viewport 320px wide (SC 1.4.10).
- Lint the source too: `node lint/cli.mjs <files>` in the Syntropy repo (or MCP `lint_ui`) catches raw colours and failing `color`/`background` pairs in CSS (`contrast` rule).

## 4. Manual checks (every flow)

| # | Check | Pass when |
| --- | --- | --- |
| 1 | Grayscale | all states readable without colour |
| 2 | Text 200% | nothing clipped; money never truncated |
| 3 | Reduced motion | no slide, zoom, parallax, number roll; spinner allowed |
| 4 | Keyboard (web; app with Bluetooth keyboard) | everything reachable, focus visible, logical, no trap |
| 5 | Dark mode | contrast holds; no invisible borders or icons |
| 6 | Rotation | portrait and landscape work |
| 7 | Screen reader in Arabic (scripts below) | announcements match |
| 8 | Voice Control (iOS) | saying the visible label activates the control |

## 5. VoiceOver script (iOS, Arabic): investment checkout

Setup: Settings > Accessibility > VoiceOver > Speech > add Arabic voice (Majed); device and app language Arabic. Triple-click the side button toggles VoiceOver.

| Step | Gesture | Expected (approximately) | Fail if |
| --- | --- | --- | --- |
| 1 | open deal page | «تفاصيل الفرصة، عنوان» | no title, or English voice |
| 2 | swipe right | «رجوع، زر» | bare «زر» |
| 3 | rotor > العناوين, swipe down | each `Section` «التوزيعات، عنوان» | sections not headings |
| 4 | swipe to metrics | «نسبة العائد المتوقع، 16 بالمئة سنويًا» | «16 علامة نسبة», or 3 stops |
| 5 | swipe to minimum | «الحد الأدنى للاستثمار، 1,000 ريال سعودي» | «راء سين» |
| 6 | double tap «استثمر الآن» | sheet opens; focus on «مبلغ الاستثمار، حقل نص» | focus stays behind the sheet |
| 7 | enter amount below minimum | «أقل مبلغ للاستثمار 1,000 ريال سعودي» | silent error |
| 8 | swipe up/down on duration | «12 شهر، قابل للتعديل» | drag only |
| 9 | reach summary | amount, fee, net, date each read once with labels | numbers without labels |
| 10 | double tap «تأكيد» | «جارٍ المعالجة», then «تم الاستثمار بنجاح، عنوان» | no announcement; focus to top |
| 11 | two-finger Z scrub on the sheet | sheet closes; focus back on «استثمر الآن» | focus jumps to start |

## 6. TalkBack script (Android, Arabic): add bank account (IBAN)

Setup: TalkBack on; Google TTS with Arabic installed; device language Arabic.

| Step | Gesture | Expected | Fail if |
| --- | --- | --- | --- |
| 1 | open «الحسابات البنكية» | screen title announced | none |
| 2 | swipe through list | «البنك الأهلي، ينتهي بـ 1234، مفعل» as one stop | 4 stops per card, bullets read |
| 3 | double tap «إضافة حساب» | «رقم الآيبان، حقل تعديل، يبدأ بـ SA ويتكون من 24 خانة» | hint missing |
| 4 | paste a valid IBAN | read in LTR groups | scrambled |
| 5 | submit with a name mismatch | error with fix «اسم صاحب الحساب لا يطابق...» | red border only |
| 6 | reading controls > العناوين | moves between section titles | no headings |
| 7 | open help | «تواصل معنا» in the same place as other screens | moves per screen (3.2.6) |
| 8 | success toast | «تمت إضافة الحساب» once, focus stays | silent |

## 7. Web screen reader (back-office)
- NVDA with Firefox or Chrome (Windows), VoiceOver with Safari (macOS), `lang="ar"`.
- Check landmarks (header, nav, main), headings list, table navigation (NVDA Ctrl+Alt+arrows reads headers), `aria-live` filter counts («تم العثور على 24 مستثمرًا»).

## Reporting line
`R-07 · 3 · WCAG 4.1.2 · BalanceToggle` · Evidence: VoiceOver AR reads «زر» only (step 2). Fix: `Semantics(button: true, toggled: !hidden, label: 'إخفاء الرصيد')`. Owner: flutter.

## Sources
- https://api.flutter.dev/flutter/flutter_test/meetsGuideline.html
- https://api.flutter.dev/flutter/flutter_test/textContrastGuideline-constant.html
- https://api.flutter.dev/flutter/flutter_test/labeledTapTargetGuideline-constant.html
- https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#axe-core-tags
- https://www.npmjs.com/package/@axe-core/playwright
- https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios
- https://support.google.com/accessibility/android/answer/6283677
- `data/ux/accessibility/testing.md`
