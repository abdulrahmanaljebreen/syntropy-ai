# WCAG 2.2 A and AA, mapped to Syntropy

Every Level A and AA success criterion (SC) that applies to the Safqah Flutter app, web and back-office, condensed to: what it means on a Safqah screen, the Syntropy way to meet it, and the fastest test. Use as the checklist for design, build and review. The full long-form version is `data/ux/accessibility/wcag22-aa.md`.

## Rules
1. All A and AA criteria are required, including the six new in 2.2 (2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8). Why: Safqah commits to WCAG 2.2 AA on every surface.
2. Test Arabic RTL first, then English LTR, each in Light and Dark. Why: most failures show in one direction or one theme only.
3. Mark a criterion N/A only with a reason ("no video on this screen"). Why: reviewers must see it was considered.
4. 4.1.1 Parsing is obsolete in 2.2 and not checked. Why: removed by W3C.
5. The core Safqah criterion is 3.3.4 (financial error prevention): every money action is reviewable and confirmed. Why: money mistakes are the costliest failures.

## Perceivable

| SC | Level | Safqah meaning | Syntropy way | Test |
| --- | --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | icons, deal photos, logos, charts have a text alternative or are hidden when decorative | `IconButton` always labelled; `Empty Illustration / *` decorative (`EmptyState` carries the title); `Chart / *` has a text summary; `AbshirLogo`, `MadaLogo`, `SafqahLogo` labelled when alone in a control | screen-reader swipe: no "image", no file names |
| 1.2.1 to 1.2.5 Media | A/AA | deal and learning videos | Arabic captions on by default for muted autoplay; transcript `Link` under media; text alternative for numbers shown only visually | play muted; read every figure |
| 1.3.1 Info and Relationships | A | headings, lists, tables, labels exposed as structure | `Section` title is a heading; `Table / HeaderCell` is `<th scope>`; `Form Field Label` bound to its input; `Radio Group`, `Checkbox Group` expose group label | headings rotor lists every `Section` |
| 1.3.2 Meaningful Sequence | A | Arabic reading order right to left, top to bottom; amount and currency stay together | `Directionality` from the locale; never reverse children by hand; `KeyValue` reads key then value | VoiceOver Arabic swipe order equals visual order |
| 1.3.3 Sensory Characteristics | A | copy never says "the green button" or "on the left" | refer by label: «اضغط على متابعة» | search copy for أخضر، يسار، يمين، الدائرة |
| 1.3.4 Orientation | AA | portrait and landscape, foldables, tablets | never lock orientation (KYC camera may suggest portrait) | rotate on every screen |
| 1.3.5 Identify Input Purpose | AA | name, phone, email, OTP autofill | Flutter `autofillHints`; web `autocomplete="tel"`, `one-time-code` on `Input`, `Input Phone`, `OTP Input` | autofill offers values |
| 1.4.1 Use of Color | A | status, gain or loss, errors, selection never colour-only | `StatusPill HasIcon=true` + label; `TrendBadge` sign and arrow; `SelectRow` border + check; `Input State=error` + text | grayscale screenshot |
| 1.4.2 Audio Control | A | no autoplay sound | mute control in the media frame | open screen: silence |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 body, 3:1 large, both modes | recommended pairs (`contrast.md`); known risks flagged | `scripts/contrast.mjs`; `textContrastGuideline`; axe `color-contrast` |
| 1.4.4 Resize Text | AA | 200% text, nothing lost | no fixed heights, no `TextScaler.noScaling` (`dynamic-type.md`) | iOS Larger Text max; web zoom 200% |
| 1.4.5 Images of Text | AA | amounts, returns, banners are live text | `NewsCard / Poster Caption` holds the text, not the image | select or scale the text |
| 1.4.10 Reflow | AA | web at 320 CSS px without two-way scroll (tables excepted) | `Table / *` scrolls inside `ScrollContainer`; `NavigationRail` collapses to `Drawer` | 1280px at 400% zoom |
| 1.4.11 Non-text Contrast | AA | control edges, focus, meaningful icons, chart lines 3:1 | `border/focus`; `icon/default`, `icon/muted`; `border/strong` never the only cue | `contrast.md` icon and border rows |
| 1.4.12 Text Spacing | AA | survives line 1.5, paragraph 2x, letter 0.12em, word 0.16em | Arabic styles already at line height 1.5; never clip text boxes | text-spacing bookmarklet |
| 1.4.13 Content on Hover or Focus | AA | `Tooltip`, `Popover` dismissible, hoverable, persistent | Esc closes; on mobile open on tap, never hover-only | hover, move onto it, Esc |

## Operable

| SC | Level | Safqah meaning | Syntropy way | Test |
| --- | --- | --- | --- | --- |
| 2.1.1 Keyboard | A | web, back-office, app with hardware keyboard or switch access | native buttons, `FocusableActionDetector`; never `GestureDetector` alone; swipe-only `Carousel` gets arrow buttons | unplug the mouse, finish the flow |
| 2.1.2 No Keyboard Trap | A | overlays trap only while open | `BottomSheet`, `Modal`, `Dialog`, `Drawer`: Esc and close control; focus returns to trigger | open, Tab, close |
| 2.1.4 Character Key Shortcuts | A | back-office single-key shortcuts | `Command palette` on Ctrl/Cmd+K; single keys only on focus or remappable | type in a field: nothing fires |
| 2.2.1 Timing Adjustable | A | `ReservationTimer`, `Countdown`, OTP expiry, session timeout | warn at least 20 s before expiry with «تمديد»; OTP resend always available | let the timer run |
| 2.2.2 Pause, Stop, Hide | A | auto-advancing `Carousel`, `NewsCard / Poster Carousel`, tickers | auto-advance off by default; pause on touch, focus, screen reader; pause control | wait 5 s |
| 2.3.1 Three Flashes | A | no flashing success effects, blinking digits | `motion.md` | frame-step a recording |
| 2.4.1 Bypass Blocks | A | web skip link and landmarks | `<header>`, `<nav>` (`NavigationRail`), `<main>`; «تخطي إلى المحتوى» | Tab once on load |
| 2.4.2 Page Titled | A | every page and route titled: «تفاصيل الفرصة · صفقة» | web `<title>`; Flutter `AppBar`/`Header` title announced on route change | tab title; VoiceOver on navigation |
| 2.4.3 Focus Order | A | logical RTL order; overlays focused first | `focus-keyboard.md` | Tab in Arabic and English |
| 2.4.4 Link Purpose | A | «اعرف المزيد» alone is ambiguous | «اعرف المزيد عن الإفصاح الشرعي» (`ComplianceBadge` Learn more) | links list makes sense |
| 2.4.5 Multiple Ways | AA | web pages reachable by nav and search | `Search Input`, `Command palette`, `Breadcrumb` | reach a deep page two ways |
| 2.4.6 Headings and Labels | AA | descriptive `Section` titles («التوزيعات», not «تفاصيل») | `Form Field Label`; `Section Size=Lg/Md/Sm` maps to heading levels | read only headings |
| 2.4.7 Focus Visible | AA | keyboard focus always visible | `Button State=focused`, `IconButton State=focused`, `Input State=focus`; ring `border/focus` | Tab through |
| 2.4.11 Focus Not Obscured (Min) | AA, new | focus not hidden by sticky `Header`, `TabBar`, `SheetFooter`, `Toast`, `Banner` | `Scrollable.ensureVisible` with sticky padding; web `scroll-padding` | Tab to last field above a sticky footer |
| 2.5.1 Pointer Gestures | A | pinch or multi-finger has single-tap alternative | `Chart / *` range via `SegmentedControl_*`; `Carousel` arrows | single taps only |
| 2.5.2 Pointer Cancellation | A | actions fire on release; critical for «استثمر الآن» | `onTap` not `onTapDown`; web `click` not `mousedown` | press, drag off, release |
| 2.5.3 Label in Name | A | accessible name starts with visible label | «استثمر» → «استثمر في الريم 46» | Voice Control: say the label |
| 2.5.4 Motion Actuation | A | no shake or tilt only | `Pull-to-refresh` also has a refresh action | task without moving the device |
| 2.5.7 Dragging Movements | AA, new | every drag has a non-drag way | `Slider` + `NumericStepper` or `Input Amount`; `DragHandle` sheets close by button or scrim; wheel pickers tap and increment | finish every drag task with taps |
| 2.5.8 Target Size (Min) | AA, new | web 24x24 CSS px; app 44 pt iOS, 48 dp Android | `touch-targets.md` | `androidTapTargetGuideline`, `iOSTapTargetGuideline`; axe `target-size` |

## Understandable

| SC | Level | Safqah meaning | Syntropy way | Test |
| --- | --- | --- | --- | --- |
| 3.1.1 Language of Page | A | `<html lang="ar" dir="rtl">`; Flutter `MaterialApp.locale` | locale drives `Directionality` | Arabic voice used |
| 3.1.2 Language of Parts | AA | English words in Arabic (IBAN, mada) and the reverse | `<span lang="en">IBAN</span>`; Flutter `attributedLabel` with `LocaleStringAttribute` | embedded word pronounced right |
| 3.2.1 On Focus | A | focusing never submits, navigates or opens a sheet | `Select`, `Combobox Field` open on activation | Tab through fields |
| 3.2.2 On Input | A | changing a control never navigates or submits unexpectedly | filters update in place and announce the count | change every control |
| 3.2.3 Consistent Navigation | AA | `TabBar`, `NavigationRail`, `AppBar` actions same order everywhere | one navigation definition | compare 3 screens |
| 3.2.4 Consistent Identification | AA | same function, same label and icon («المحفظة» is never also «الرصيد») | content glossary (see syntropy-content); one icon per meaning | list labels per action |
| 3.2.6 Consistent Help | A, new | help (chat, «تواصل معنا», FAQ) in the same place | `AppBar` trailing action or fixed `ActionList` row | open 3 screens |
| 3.3.1 Error Identification | A | errors name the field and problem in text | `Input State=error` + `Input Helper Text` / `Form Field Helper`; `Alert Tone=error` summary for long forms | submit empty |
| 3.3.2 Labels or Instructions | A | visible label always; format hints for IBAN, ID, dates | `Form Field Label`, `Show Label=true`; placeholder never the label | type: label stays |
| 3.3.3 Error Suggestion | AA | say how to fix: «أدخل رقم آيبان يبدأ بـ SA ويتكون من 24 خانة» | error formula in `forms.md` | every error has a fix |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | invest, withdraw, change bank, cancel reservation: reversible, checked or confirmed | summary step (`Sheet Content / Summary`, `Checkout`) with amount, fee, net, date before «تأكيد»; `Dialog Tone=destructive` | every money action has a review step and a back path |
| 3.3.7 Redundant Entry | A, new | never ask twice for IBAN, name, ID, amount in one process | prefill from KYC; `KeyValue` + «تعديل» | count repeated questions: 0 |
| 3.3.8 Accessible Authentication (Min) | AA, new | login, OTP, re-auth without memorising or transcribing | `OTP Input` paste and SMS autofill; password managers; Face ID; no puzzle CAPTCHA; Nafath hand-off allowed | paste a code; password manager fills |

## Robust

| SC | Level | Safqah meaning | Syntropy way | Test |
| --- | --- | --- | --- | --- |
| 4.1.2 Name, Role, Value | A | every control exposes name, role, state | Flutter `Semantics(button:, toggled:, checked:, selected:, expanded:, value:)`; web native first, ARIA per APG (`screen-readers.md`) | role and state change announced |
| 4.1.3 Status Messages | AA | «تم الاستثمار», «جارٍ المعالجة», filter counts, `Toast` announced without moving focus | `Semantics(liveRegion: true)` or `SemanticsService.announce`; web `role="status"` (errors `role="alert"`) | spoken once, focus stays |

## Examples
- Do: duration `Slider` plus `NumericStepper` labelled «مدة الاستثمار (أشهر)». Don't: slider only (fails 2.5.7).
- Do: OTP that pastes and autofills. Don't: six boxes that block paste (fails 3.3.8).
- Do: «تأكيد استثمار 10,000.00 ر.س» on a summary screen. Don't: invest on first tap from a card (fails 3.3.4).

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/
- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- `data/ux/accessibility/wcag22-aa.md`
