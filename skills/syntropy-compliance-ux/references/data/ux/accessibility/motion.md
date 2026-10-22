# Motion

How Safqah uses animation without harming people with vestibular disorders, epilepsy or attention difficulties: reduced motion, no flashing, pause controls. Use when adding transitions, `Spinner*`, `Carousel`, `Countdown`, charts that animate, success celebrations or canvas films inside the product.

## Rules
1. Respect the OS reduced-motion setting everywhere. Flutter: `MediaQuery.disableAnimationsOf(context)` (iOS Reduce Motion, Android "Remove animations"). Web: `@media (prefers-reduced-motion: reduce)`. Why: SC 2.3.3 (AAA) is the target practice; 2.2.2 and 2.3.1 are AA/A requirements.
2. Under reduced motion: replace movement (slide, scale, parallax, spring, number roll) with an instant change or a short opacity fade (at most 150ms). Why: fades do not trigger vestibular symptoms; position changes do.
3. Nothing flashes more than 3 times in any 1 second. No red flashes at all. Why: SC 2.3.1; seizure risk.
4. Anything that moves, blinks or auto-updates for more than 5 seconds and is not essential can be paused, stopped or hidden. Why: SC 2.2.2.
5. Auto-advancing carousels (`Carousel`, `NewsCard / Poster Carousel`, `Reinvest / RecommendationCarousel`) are off by default. If turned on: pause on touch, focus, hover and when a screen reader is running (`MediaQuery.accessibleNavigationOf(context)`), plus a visible pause control. Why: SC 2.2.2; users cannot read a moving card.
6. Loading motion: `SkeletonLine` / `SkeletonBlock` shimmer stops under reduced motion (static `bg/elevated` blocks). `SpinnerRing` may keep rotating (essential progress feedback) but `SpinnerPulseRings`, `SpinnerBouncingDots`, `SpinnerSafqahBrand` fall back to `SpinnerRing` or a static `ProgressBar_Indeterminate` alternative under reduced motion. Why: progress feedback is essential; decorative bounce is not.
7. Number animations (count-up of returns in `ReturnsDisplay`, `MoneyAmount`, `Stat`) show the final value instantly under reduced motion, and the semantics value is always the final number. Why: screen readers must never read an intermediate value; a rolling number is not the truth.
8. Countdown and flip digits (`ReservationTimer`, `Countdown`, `Timer`, `Small Timer`) do not flip-animate under reduced motion and never blink. Announce milestones (for example 5 minutes, 1 minute) as live region updates, not every second. Why: SC 2.2.1, 2.3.1, 4.1.3.
9. No motion triggered by device tilt or shake without a button alternative (SC 2.5.4).
10. Durations: micro feedback 100 to 150ms, transitions 200 to 300ms, never above 500ms for UI. Easing standard, no bounce on money values. Why: long or springy animations delay the user and make figures feel unstable.

## Flutter recipe

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

// Page transitions: use a fade-only PageTransitionsTheme when reduce is true.
```

Lottie or Rive celebrations: render the last frame statically when `reduce` is true.

## Web recipe

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .skeleton { animation: none; }
}
```

Keep spinners that convey progress by exempting them explicitly (`.spinner-ring { animation-duration: 1s !important; animation-iteration-count: infinite !important; }`).

## What counts as essential motion
| Motion | Essential? | Under reduced motion |
| --- | --- | --- |
| `SpinnerRing` while a payment processes | yes | keep, plus text «جارٍ المعالجة» |
| `ProgressBar` filling during upload | yes (it shows progress) | step without easing |
| Sheet slide-in (`BottomSheet`) | no | fade or instant |
| Shimmer on skeletons | no | static |
| Confetti on investment success | no | static check icon and heading |
| Chart line drawing in | no | draw instantly |
| Parallax on `HeaderCard` media | no | none |
| `Pull-to-refresh` spinner | yes while loading | keep spinner, no stretch bounce |

## Quick test
1. iOS: Settings > Accessibility > Motion > Reduce Motion on. Android: Developer options or Accessibility > Remove animations. Walk the flow; no slides, zooms, parallax or number rolls.
2. Web: DevTools > Rendering > Emulate `prefers-reduced-motion: reduce`.
3. Record 10 seconds of any animated screen; step frame by frame for flashes (or use PEAT for video content).
4. Wait 5 seconds on screens with carousels or tickers; confirm pause exists or motion stopped.
5. Flutter test: pump with `MediaQueryData(disableAnimations: true)` and assert no running tickers: `expect(tester.hasRunningAnimations, isFalse)` after the first frame.

## Examples
- Do: success screen shows a static check icon and «تم الاستثمار بنجاح» when Reduce Motion is on. Don't: 2 seconds of confetti before the receipt appears.
- Do: `ReturnsDisplay` shows `18,333.33 ر.س` immediately; semantics reads the final value. Don't: count up from 0 and let VoiceOver read «12,004».

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide
- https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- https://api.flutter.dev/flutter/widgets/MediaQuery/disableAnimationsOf.html
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
