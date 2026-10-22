# Motion

Animation in Safqah without harming people with vestibular disorders, epilepsy or attention difficulties: reduced motion, no flashing, pause controls, honest numbers. Open when adding transitions, `Spinner*`, `Carousel`, countdowns, animated charts or success screens.

## Rules
1. Respect the OS reduced-motion setting everywhere. Flutter `MediaQuery.disableAnimationsOf(context)`; web `@media (prefers-reduced-motion: reduce)`. Why: SC 2.3.3 practice; 2.2.2 and 2.3.1 are required.
2. Under reduced motion, replace movement (slide, scale, parallax, spring, number roll) with an instant change or an opacity fade of at most 150ms. Why: fades do not trigger vestibular symptoms.
3. Nothing flashes more than 3 times per second; no red flashes at all. Why: SC 2.3.1, seizure risk.
4. Anything moving, blinking or auto-updating for more than 5 seconds that is not essential can be paused, stopped or hidden. Why: SC 2.2.2.
5. Auto-advancing carousels (`Carousel`, `NewsCard / Poster Carousel`, `Reinvest / RecommendationCarousel`) are off by default; if on, pause on touch, focus, hover and when a screen reader runs (`MediaQuery.accessibleNavigationOf`), plus a visible pause control. Why: nobody can read a moving card.
6. Loading: `SkeletonLine` / `SkeletonBlock` shimmer stops under reduced motion; `SpinnerRing` may keep turning (essential); `SpinnerPulseRings`, `SpinnerBouncingDots`, `SpinnerSafqahBrand` fall back to `SpinnerRing` or `ProgressBar_Indeterminate`. Why: progress is essential, bounce is not.
7. Number animations (`ReturnsDisplay`, `MoneyAmount`, `Stat` count-ups) show the final value instantly under reduced motion, and semantics always carries the final value. Why: a screen reader must never read an intermediate amount.
8. Countdowns (`ReservationTimer`, `Countdown`, `Timer`, `Small Timer`) never blink, do not flip-animate under reduced motion, and announce milestones (5 minutes, 1 minute), not every second. Why: SC 2.2.1, 2.3.1, 4.1.3.
9. No tilt or shake triggers without a button alternative. Why: SC 2.5.4.
10. Durations: micro feedback 100 to 150ms, transitions 200 to 300ms, never over 500ms; standard easing, no bounce on money values. No confetti or celebration on financial actions. Why: Syntropy motion is functional (state change, spatial relation, status), never decorative.

## What counts as essential

| Motion | Essential | Under reduced motion |
| --- | --- | --- |
| `SpinnerRing` while a payment processes | yes | keep, with text «جارٍ المعالجة» |
| `ProgressBar` during upload | yes | step without easing |
| `BottomSheet` slide-in | no | fade or instant |
| Skeleton shimmer | no | static `bg/elevated` blocks |
| Success celebration | no (and avoided on money) | static check icon and heading |
| Chart line drawing in | no | draw instantly |
| Parallax on `HeaderCard` media | no | none |
| `Pull-to-refresh` spinner | yes while loading | keep spinner, no stretch bounce |

## Recipes

```dart
final reduce = MediaQuery.disableAnimationsOf(context);
final d = reduce ? Duration.zero : const Duration(milliseconds: 250);
AnimatedSwitcher(
  duration: d,
  transitionBuilder: (child, anim) => reduce
      ? child
      : FadeTransition(opacity: anim, child: SlideTransition(
          position: Tween(begin: const Offset(0, .05), end: Offset.zero).animate(anim), child: child)),
  child: content,
);
```

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .spinner-ring { animation-duration: 1s !important; animation-iteration-count: infinite !important; }
}
```

Lottie or Rive: render the last frame statically when reduced motion is on.

## Quick test
1. iOS Reduce Motion on; Android "Remove animations" on. Walk the flow: no slide, zoom, parallax or number roll.
2. Web: DevTools > Rendering > emulate `prefers-reduced-motion: reduce`.
3. Record 10 s of any animated screen and step frames for flashes.
4. Wait 5 s on carousels and tickers: a pause exists or motion stopped.
5. Flutter: pump with `MediaQueryData(disableAnimations: true)`, settle, `expect(tester.hasRunningAnimations, isFalse)`.

## Examples
- Do: success shows a static check and «تم الاستثمار بنجاح». Don't: 2 seconds of confetti before the receipt.
- Do: `ReturnsDisplay` shows `18,333.33 ر.س` at once. Don't: count up from 0 while VoiceOver reads «12,004».
- Do: `ReservationTimer` announces «تبقّت دقيقة واحدة» once. Don't: blinking red digits every second.

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide
- https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- https://api.flutter.dev/flutter/widgets/MediaQuery/disableAnimationsOf.html
- `data/ux/accessibility/motion.md`
