# Motion

How Syntropy uses motion: functional only, short, and off when the user asks for reduced motion. Syntropy has no motion tokens yet; the durations below come from documented component behaviour and are the values to use until tokens exist.

## Rules
1. Motion must explain something: where an element came from, what changed, or that work is happening. No decorative or attention-grabbing animation.
   Why: in a money product, movement that does not inform reads as gimmick or pressure.
2. Keep it short: micro feedback 100 to 150 ms, state changes about 200 ms, larger surfaces (sheets, carousel slides) about 300 ms. Nothing in product UI over 500 ms except indeterminate loaders.
   Why: slow transitions feel laggy and delay the task.
3. Ease out for things entering or settling (`ease-out`), ease in-out for loops; linear only for continuous rotation (spinners).
   Why: ease-out feels responsive.
4. Respect reduced motion (`MediaQuery.disableAnimations` in Flutter, `prefers-reduced-motion` on web): durations go to zero, spinners and shimmers stop and show a static state or a text label («جار التحميل»).
   Why: WCAG 2.3.3 and motion sensitivity.
5. Nothing flashes more than 3 times per second. Auto-advancing or looping content over 5 seconds must have a pause control; never auto-advance important content.
   Why: WCAG 2.3.1 and 2.2.2.
6. No countdowns, pulsing badges or shaking buttons to push an investment decision.
   Why: fake urgency is a dark pattern; Safqah discloses, it does not pressure.
7. Motion mirrors in RTL where it has direction: push transitions enter from the left in Arabic, segmented thumbs and carousels move in reading direction. Charts animate along the time axis left to right in both languages.
   Why: motion direction follows reading direction, except time axes.
8. Do not show a loader or skeleton for work under 200 ms; show it only if the result has not arrived after 200 ms.
   Why: a flash of loader causes more anxiety than nothing.

## Durations in use
| Interaction | Duration / easing | Source |
|---|---|---|
| Focus ring appear | 120 ms (0 with reduced motion) | Focus and keyboard guidance |
| SegmentedControl thumb | about 200 ms, ease-out, Smart Animate | SegmentedControl |
| Recommendation carousel snap | 300 ms Smart Animate | Reinvest RecommendationCarousel |
| Tooltip hover delay | 500 ms (keyboard focus shows immediately) | Tooltip |
| Search debounce | 200 to 300 ms before filtering or fetching | Search |
| Show loader / skeleton | only after 200 ms of waiting | Loader, Skeleton |
| Spinner `Ring` | 0.8 s linear infinite | Loader |
| Spinner `DotOrbit` | 1 s linear | Loader |
| `WaveBars` | 0.6 s ease-in-out per bar, 80 ms stagger | Loader |
| `BouncingDots` | 0.8 s ease-in-out per dot, 200 ms stagger | Loader |
| `PulseRings` | 1.4 s ease-out per ring, 333 ms stagger | Loader |

Suggested scale until tokens exist (name them this way in code comments so they can be swapped later): fast 120 ms, standard 200 ms, emphasised 300 ms.

## What to animate
| Do | Don't |
|---|---|
| BottomSheet slides up 300 ms ease-out with scrim fade | Sheet bounces |
| Toast fades and slides in 200 ms | Toast shakes to get attention |
| Number count-up only when it explains a change the user just made, and never for amounts they must read precisely while it moves | Portfolio total spinning through digits on every open |
| Skeleton shimmer after 200 ms, static under reduced motion | Skeleton fading in and out on top of the shimmer |
| Static `ReservationTimer` showing the real reservation window | Red pulsing countdown "Only 2 minutes left, invest now" for a non-binding window |

## Sources
- Component docs: Loader (05f), Skeleton (05e), SegmentedControl (06l), Tooltip, Search, Reinvest, Carousel (Figma file a7Z956YZy9n6f9uz5DK16Y).
- Accessibility guidance: WCAG 2.2 AA notes and focus-keyboard guidance (motion, reduced motion, pause controls).
