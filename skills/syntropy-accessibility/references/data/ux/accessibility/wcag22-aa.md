# WCAG 2.2 A and AA for Safqah

Every WCAG 2.2 Level A and AA success criterion (SC) that applies to the Safqah Flutter app, the web and the back-office, with what it means on a Safqah screen, the Syntropy way to meet it, and a quick test. Use it as the checklist for any design, build or review. Each heading links to the W3C quick reference: `https://www.w3.org/WAI/WCAG22/quickref/#<anchor>`.

## Rules
1. All A and AA criteria below are required. "New in 2.2" items are not optional. Why: Safqah commits to WCAG 2.2 AA (AGENTS.md rule 6).
2. Test in Arabic RTL first, then English LTR, each in Light and Dark. Why: most failures appear only in one direction or one theme.
3. A criterion marked N/A must be justified in the review (for example "no video on this screen"). Why: reviewers must see it was considered.
4. 4.1.1 Parsing is obsolete in 2.2 and is not checked. Why: removed by W3C.

Legend: **Safqah** = what it means here. **Syntropy** = tokens, components, patterns to meet it. **Test** = fastest reliable check.

## 1. Perceivable

### 1.1.1 Non-text Content (A) `#non-text-content`
- **Safqah**: deal photos, developer logos, illustrations, charts, icons and the Safqah, mada and Abshir marks have a text alternative or are hidden from assistive tech when decorative.
- **Syntropy**: `IconButton` always gets a label; `illustrations` and `Empty Illustration / *` are decorative (`ExcludeSemantics` / `alt=""`) because `EmptyState` carries the title. `Chart / *` needs a text summary (see `color-not-alone.md`). `AbshirLogo`, `MadaLogo`, `SafqahLogo` get their brand name as label when they are the only content of a control.
- **Test**: screen reader swipe through the screen; every focus stop says something meaningful, no "image" or file names.

### 1.2.1 Audio-only and Video-only, Prerecorded (A) `#audio-only-and-video-only-prerecorded`
- **Safqah**: deal walkthrough videos without speech, podcasts in learning content.
- **Syntropy**: provide a transcript link (`Link`) under the media; for silent video, a short text description.
- **Test**: every media item has a transcript or description reachable from the same screen.

### 1.2.2 Captions, Prerecorded (A) `#captions-prerecorded`
- **Safqah**: any video with speech (deal updates in `NewsCard`, learning videos) has Arabic captions; English captions for English audio.
- **Syntropy**: media player with caption track on by default for muted autoplay.
- **Test**: play with sound off; all speech is readable and in sync.

### 1.2.3 Audio Description or Media Alternative, Prerecorded (A) `#audio-description-or-media-alternative-prerecorded`
- **Safqah**: if a video shows numbers (returns, timeline) that are not spoken, provide description or a text alternative.
- **Syntropy**: text alternative in the same `NewsCard` or `Section` below the video.
- **Test**: listen with eyes closed; no key figure is lost.

### 1.2.4 Captions, Live (AA) `#captions-live`
- **Safqah**: live webinars or investor sessions embedded in the product.
- **Syntropy**: use a provider with live captions; otherwise link a recording with captions within 24 hours and say so.
- **Test**: start a live session; captions present.

### 1.2.5 Audio Description, Prerecorded (AA) `#audio-description-prerecorded`
- **Safqah**: marketing or deal videos where visuals carry information.
- **Syntropy**: described version or extended text alternative.
- **Test**: as 1.2.3, stricter: description must be synchronised or provided as an alternate track.

### 1.3.1 Info and Relationships (A) `#info-and-relationships`
- **Safqah**: headings, lists, tables (payout schedules, back-office tables), form labels and groupings are exposed as structure, not just looks.
- **Syntropy**: `Section` title = heading (`Semantics(header: true)`, `<h2>`); `Table / HeaderCell` = `<th scope>`; `ActionList` and `List` = list semantics; `Form Field` binds `Form Field Label` to its input; `Radio Group` and `Checkbox Group` expose the group label.
- **Test**: screen-reader headings rotor (VoiceOver) or headings navigation (TalkBack) lists every `Section`; tables announce row and column headers.

### 1.3.2 Meaningful Sequence (A) `#meaningful-sequence`
- **Safqah**: reading order in Arabic goes right to left, top to bottom, and matches the visual order; an amount and its currency stay together.
- **Syntropy**: build with `Directionality` from the locale; never reverse children manually; use `Row` with `textDirection` not `reverse: true` hacks. `KeyValue` reads key then value.
- **Test**: swipe through with VoiceOver in Arabic; order matches what a sighted Arabic reader would read.

### 1.3.3 Sensory Characteristics (A) `#sensory-characteristics`
- **Safqah**: copy never says "tap the green button" or "on the left".
- **Syntropy**: refer to controls by their label: «اضغط على متابعة».
- **Test**: search copy for colour, shape and side words (أخضر، يسار، يمين، الدائرة).

### 1.3.4 Orientation (AA) `#orientation`
- **Safqah**: app and web work in portrait and landscape, including foldables and tablets.
- **Syntropy**: never lock orientation except where essential (camera KYC capture may suggest portrait, not force it).
- **Test**: rotate device on every screen of the flow; nothing is blocked.

### 1.3.5 Identify Input Purpose (AA) `#identify-input-purpose`
- **Safqah**: name, phone, email, national ID fields support autofill.
- **Syntropy**: Flutter `autofillHints` (`AutofillHints.telephoneNumber`, `email`, `name`, `oneTimeCode`); web `autocomplete="tel"`, `email`, `one-time-code`. Applies to `Input`, `Input Phone`, `OTP Input`.
- **Test**: device autofill suggests values; inspect `autocomplete` attributes.

### 1.4.1 Use of Color (A) `#use-of-color`
- **Safqah**: deal status, gain or loss, errors, selected chips are never colour-only.
- **Syntropy**: `StatusPill` with `HasIcon=true` plus label; `TrendBadge` shows sign (+/−) and arrow; `SelectRow` selected = border plus check; `Input State=error` plus error text. See `color-not-alone.md`.
- **Test**: grayscale screenshot; every state is still distinguishable.

### 1.4.2 Audio Control (A) `#audio-control`
- **Safqah**: no autoplay sound. Film content in learning plays muted by default.
- **Syntropy**: mute control visible within the media frame.
- **Test**: open the screen; silence until the user acts.

### 1.4.3 Contrast, Minimum (AA) `#contrast-minimum`
- **Safqah**: body text 4.5:1, large text (24px regular or 18.66px bold) 3:1, in Light and Dark.
- **Syntropy**: choose from `contrast-pairs.md` recommended tables. Known failures: `text/subtle` (large-only), white on solid `bg/success` and `bg/warning`. Brand green as built (primary Button, brand green labels and selected states) is accepted by DS decision and not a failure to report.
- **Test**: `node scripts/contrast-pairs.mjs` for token pairs; Flutter `textContrastGuideline`; axe `color-contrast` on web.

### 1.4.4 Resize Text (AA) `#resize-text`
- **Safqah**: text scales to 200% with no loss of content or function.
- **Syntropy**: never fix heights on text containers; never set `textScaler: TextScaler.noScaling`; see `dynamic-type.md`.
- **Test**: iOS Larger Text max, Android font size max plus display size; web browser zoom 200%.

### 1.4.5 Images of Text (AA) `#images-of-text`
- **Safqah**: amounts, returns, campaign banners are live text, not baked into images.
- **Syntropy**: `NewsCard / Poster` puts caption text in `NewsCard / Poster Caption`, not in the image. Logos are exempt.
- **Test**: try to select or scale the text; screen reader reads it.

### 1.4.10 Reflow (AA) `#reflow`
- **Safqah**: web and back-office work at 320 CSS px width (400% zoom) without two-direction scrolling, except data tables and charts.
- **Syntropy**: back-office `Table / *` may scroll horizontally inside `ScrollContainer`; the page itself must not. Navigation collapses (`NavigationRail` to `Drawer`).
- **Test**: browser at 1280px, zoom 400%; only tables scroll sideways.

### 1.4.11 Non-text Contrast (AA) `#non-text-contrast`
- **Safqah**: control edges, focus rings, meaningful icons, chart lines and status dots need 3:1 against neighbours.
- **Syntropy**: focus uses `border/focus` (passes in both modes). `border/strong`, `border/brand/primary`, `border/success`, `border/warning` are under 3:1 in Light; never the only cue. Meaningful icons use `icon/default` or `icon/muted`.
- **Test**: `contrast-pairs.md` border and icon rows; spot-check custom shapes with a contrast picker.

### 1.4.12 Text Spacing (AA) `#text-spacing`
- **Safqah**: content survives line height 1.5, paragraph spacing 2x, letter spacing 0.12em, word spacing 0.16em (web).
- **Syntropy**: Arabic text styles already use line height 1.5 (`font/line-height/*` = size x 1.5). Do not clip text boxes. Arabic letter spacing stays 0 in tokens; the test still must not break layout.
- **Test**: web bookmarklet "text spacing" or injected CSS; nothing overlaps or clips.

### 1.4.13 Content on Hover or Focus (AA) `#content-on-hover-or-focus`
- **Safqah**: `Tooltip` and `Popover` on web are dismissible (Esc), hoverable (pointer can move onto them), persistent until dismissed.
- **Syntropy**: on mobile, info tooltips open on tap and close on tap outside or a close control; never hover-only.
- **Test**: hover, move onto the tooltip, press Esc.

## 2. Operable

### 2.1.1 Keyboard (A) `#keyboard`
- **Safqah**: web, back-office, and the app with hardware keyboard or switch access: every action works by keyboard.
- **Syntropy**: use native buttons and `Focus`/`FocusableActionDetector`; never `GestureDetector` alone on a control. Swipe-only actions in `Carousel` have arrow buttons too (`Calculator / Swipe arrow`).
- **Test**: unplug the mouse; complete the flow with Tab, Shift+Tab, Enter, Space, arrows.

### 2.1.2 No Keyboard Trap (A) `#no-keyboard-trap`
- **Safqah**: focus can leave every component; `BottomSheet`, `Modal`, `Dialog`, `Drawer` trap focus only while open and release it on close.
- **Syntropy**: Esc and the close control close overlays; focus returns to the trigger.
- **Test**: Tab through an open sheet, close it, confirm focus is back on the trigger.

### 2.1.4 Character Key Shortcuts (A) `#character-key-shortcuts`
- **Safqah**: back-office single-key shortcuts (for example "/" for search) can be turned off or remapped, or only work on focus.
- **Syntropy**: `Command palette` uses a modifier (Ctrl/Cmd+K).
- **Test**: type in a field; no shortcut fires.

### 2.2.1 Timing Adjustable (A) `#timing-adjustable`
- **Safqah**: reservation hold (`ReservationTimer`, `Countdown`), OTP expiry and session timeout warn and allow extension, unless the limit is a real-time event (a deal closing) or over 20 hours.
- **Syntropy**: warn at least 20 seconds before expiry with `BottomSheet` or `Dialog` and a «تمديد» action; OTP resend is always available.
- **Test**: let the timer run; a warning appears with a way to extend; screen reader announces it.

### 2.2.2 Pause, Stop, Hide (A) `#pause-stop-hide`
- **Safqah**: auto-advancing `Carousel`, `NewsCard / Poster Carousel`, live tickers and looping `Spinner*` beyond 5 seconds of non-essential motion can be paused.
- **Syntropy**: auto-advance off by default; if on, pause on focus, touch and screen-reader use, and a pause control.
- **Test**: wait 5 seconds; anything still moving has a pause or stops on its own.

### 2.3.1 Three Flashes or Below Threshold (A) `#three-flashes-or-below-threshold`
- **Safqah**: no flashing success effects, confetti strobes or blinking countdown digits.
- **Syntropy**: see `motion.md`.
- **Test**: record the screen; nothing flashes more than 3 times per second.

### 2.4.1 Bypass Blocks (A) `#bypass-blocks`
- **Safqah**: web and back-office have a skip link to main content and landmarks.
- **Syntropy**: `<header>`, `<nav>` (`AppSidebar (shadcn-style)`, `NavigationRail`), `<main>`; first focusable is «تخطي إلى المحتوى».
- **Test**: press Tab once on page load.

### 2.4.2 Page Titled (A) `#page-titled`
- **Safqah**: each web page and each Flutter route has a descriptive title: «تفاصيل الفرصة · صفقة».
- **Syntropy**: web `<title>`; Flutter `Title` widget for web builds and the `AppBar`/`Header` title announced on route change.
- **Test**: check tab title; VoiceOver announces the screen name on navigation.

### 2.4.3 Focus Order (A) `#focus-order`
- **Safqah**: focus moves in logical RTL order; opened overlays receive focus first.
- **Syntropy**: see `focus-keyboard.md`; use `FocusTraversalGroup` with `OrderedTraversalPolicy` only when visual order differs from widget order.
- **Test**: Tab through in Arabic and English.

### 2.4.4 Link Purpose, In Context (A) `#link-purpose-in-context`
- **Safqah**: «اعرف المزيد» alone is ambiguous next to several deals.
- **Syntropy**: `Link` text or its semantics label includes the object: «اعرف المزيد عن الإفصاح الشرعي» (`ComplianceBadge` Learn more).
- **Test**: list links with the screen reader; each makes sense out of context or within its card.

### 2.4.5 Multiple Ways (AA) `#multiple-ways`
- **Safqah**: web and back-office pages are reachable by navigation and search (or a sitemap).
- **Syntropy**: `Search Input`, `Command palette`, `Breadcrumb`.
- **Test**: reach a deep page two different ways.

### 2.4.6 Headings and Labels (AA) `#headings-and-labels`
- **Safqah**: `Section` titles describe the content («التوزيعات», not «تفاصيل»); field labels describe the input.
- **Syntropy**: `Form Field Label`, `Section` `Size=Lg/Md/Sm` maps to heading levels.
- **Test**: read only the headings and labels; the screen is understandable.

### 2.4.7 Focus Visible (AA) `#focus-visible`
- **Safqah**: keyboard focus is always visible.
- **Syntropy**: components with `State=focused` (Button, IconButton) and `Input State=focus`; ring colour `border/focus`. Never remove outlines without replacing them.
- **Test**: Tab through; each stop is obvious.

### 2.4.11 Focus Not Obscured, Minimum (AA, new in 2.2) `#focus-not-obscured-minimum`
- **Safqah**: the focused element is not fully hidden by a sticky `Header`, `TabBar`, sticky CTA footer (`SheetFooter`), `Toast`, `Banner` or cookie bar.
- **Syntropy**: Flutter `Scrollable.ensureVisible` on focus with padding equal to sticky heights; web `scroll-padding-top/bottom` equal to sticky header/footer heights. `Toast` never covers the focused control; place it away from the primary CTA.
- **Test**: Tab to the last field above a sticky "متابعة" footer; it must be at least partly visible (fully visible is better).

### 2.5.1 Pointer Gestures (A) `#pointer-gestures`
- **Safqah**: pinch-zoom on charts, two-finger swipes or path gestures have a single-tap alternative.
- **Syntropy**: `Chart / *` offers range buttons (`SegmentedControl_*`); `Carousel` has `PageIndicator` taps or arrows.
- **Test**: complete the task with single taps only.

### 2.5.2 Pointer Cancellation (A) `#pointer-cancellation`
- **Safqah**: actions fire on release (up event), and sliding off cancels. Critical for «استثمر الآن».
- **Syntropy**: use `onTap` (fires on up) not `onTapDown` for actions; web `click`, not `mousedown`.
- **Test**: press a button, drag off, release; nothing happens.

### 2.5.3 Label in Name (A) `#label-in-name`
- **Safqah**: the accessible name starts with the visible label so voice users can say it.
- **Syntropy**: Button `Label` «استثمر» → semantics label «استثمر في الريم 46», not «زر الشراء».
- **Test**: Voice Control: say the visible label; the control activates.

### 2.5.4 Motion Actuation (A) `#motion-actuation`
- **Safqah**: no shake-to-undo or tilt-to-refresh without a button alternative and a way to disable.
- **Syntropy**: `Pull-to-refresh` also has a refresh action reachable by assistive tech (refresh in `AppBar` or screen-reader custom action).
- **Test**: perform the task without moving the device.

### 2.5.7 Dragging Movements (AA, new in 2.2) `#dragging-movements`
- **Safqah**: `Slider`, `Slider Field`, `Calculator / Duration picker`, `Date Wheel Picker`, `BottomSheet` drag handle, reorder lists: each has a non-drag way.
- **Syntropy**: `Amount Stepper` or `NumericStepper` beside sliders; amount editable in `Input Amount`; `DragHandle` sheets also close via close button or scrim tap; wheel pickers support tap on an item and increment semantics.
- **Test**: complete every drag task with taps only.

### 2.5.8 Target Size, Minimum (AA, new in 2.2) `#target-size-minimum`
- **Safqah**: web targets at least 24x24 CSS px or spaced so a 24px circle does not overlap another target. Platform rule is stricter: 44x44 pt iOS, 48x48 dp Android.
- **Syntropy**: see `touch-targets.md`. `IconButton Size=sm`, `Tag Removable` close, `Badge Dot`, `PaginationItem`, `Table / ActionCell` icons need expanded hit areas.
- **Test**: Flutter `androidTapTargetGuideline`, `iOSTapTargetGuideline`; axe `target-size`.

## 3. Understandable

### 3.1.1 Language of Page (A) `#language-of-page`
- **Safqah**: web `<html lang="ar" dir="rtl">` or `lang="en" dir="ltr"`; Flutter `MaterialApp.locale` set so screen readers use the right voice.
- **Syntropy**: locale drives `Directionality`; never hardcode.
- **Test**: screen reader pronounces Arabic with the Arabic voice.

### 3.1.2 Language of Parts (AA) `#language-of-parts`
- **Safqah**: English brand or product names inside Arabic copy (IBAN, mada, Sukuk) and Arabic names in English UI.
- **Syntropy**: web `<span lang="en">IBAN</span>`; Flutter `Semantics` with `attributedLabel` and `LocaleStringAttribute` where supported. Keep mixed strings short.
- **Test**: listen; the embedded word is pronounced in its language.

### 3.2.1 On Focus (A) `#on-focus`
- **Safqah**: focusing a field never submits, navigates or opens a sheet.
- **Syntropy**: `Select` and `Combobox Field` open on activation, not focus.
- **Test**: Tab through all fields; nothing changes context.

### 3.2.2 On Input (A) `#on-input`
- **Safqah**: changing a `Select`, `Radio`, `Switch` or `SegmentedControl_*` does not navigate or submit unless the user was told.
- **Syntropy**: filters may update a list in place (announce result count, 4.1.3); payment method change never submits.
- **Test**: change every control; no unexpected navigation.

### 3.2.3 Consistent Navigation (AA) `#consistent-navigation`
- **Safqah**: `TabBar` order, `NavigationRail` order and `AppBar` actions are the same on every screen.
- **Syntropy**: one navigation definition reused; never reorder per screen.
- **Test**: compare navigation across 3 screens.

### 3.2.4 Consistent Identification (AA) `#consistent-identification`
- **Safqah**: the same function has the same label and icon everywhere («المحفظة» is never also «الرصيد» for the same thing).
- **Syntropy**: copy from `knowledge/content/`; icons from the Syntropy icon set with one meaning each.
- **Test**: list labels for the same action across screens.

### 3.2.6 Consistent Help (A, new in 2.2) `#consistent-help`
- **Safqah**: help (Intercom chat, «تواصل معنا», FAQ) sits in the same relative place on every screen that offers it.
- **Syntropy**: help entry in `AppBar` trailing action or a fixed `ActionList` row in settings; same order relative to other content.
- **Test**: open 3 screens of a flow; help is in the same place.

### 3.3.1 Error Identification (A) `#error-identification`
- **Safqah**: errors name the field and the problem in text.
- **Syntropy**: `Input State=error` plus `Input Helper Text` / `Form Field Helper` message; summary `Alert Tone=error` on submit for long forms. See `forms.md`.
- **Test**: submit empty; each error is announced and visible as text.

### 3.3.2 Labels or Instructions (A) `#labels-or-instructions`
- **Safqah**: every input has a visible label; format hints for IBAN, national ID, dates.
- **Syntropy**: `Form Field Label` always shown (`Show Label=true`); placeholder is never the label.
- **Test**: type into a field; the label is still visible.

### 3.3.3 Error Suggestion (AA) `#error-suggestion`
- **Safqah**: tell the user how to fix it: «أدخل رقم آيبان يبدأ بـ SA ويتكون من 24 خانة».
- **Syntropy**: error formula in `forms.md`.
- **Test**: every error message contains a fix.

### 3.3.4 Error Prevention, Legal, Financial, Data (AA) `#error-prevention-legal-financial-data`
- **Safqah**: investing, withdrawing, changing bank account, cancelling a reservation: reversible, or checked, or confirmed. This is the core Safqah criterion.
- **Syntropy**: review step with `Sheet Content / Summary` or `Checkout` showing amount, fee, net, date before «تأكيد»; `Dialog Tone=destructive` for cancellation; undo window where the business allows. See `../review/fintech-heuristics.md`.
- **Test**: every money action has a review step that shows the final numbers and an edit or back path.

### 3.3.7 Redundant Entry (A, new in 2.2) `#redundant-entry`
- **Safqah**: do not ask again for IBAN, name, national ID or amount already given in the same process.
- **Syntropy**: prefill from KYC, show already-entered values in `KeyValue` with «تعديل»; `Checkbox` «نفس العنوان» style options.
- **Test**: walk the flow; count repeated questions (must be 0 unless for security re-confirmation).

### 3.3.8 Accessible Authentication, Minimum (AA, new in 2.2) `#accessible-authentication-minimum`
- **Safqah**: login, OTP and re-auth do not require memorising or transcribing without help.
- **Syntropy**: `OTP Input` supports paste and SMS autofill (`AutofillHints.oneTimeCode`, `autocomplete="one-time-code"`); password fields allow paste and password managers; Face ID / fingerprint offered; no CAPTCHA puzzles without an alternative; Nafath/Abshir hand-off is acceptable (object recognition of a number shown is allowed if the number is displayed, not recalled).
- **Test**: paste a code; password manager fills; biometrics work.

## 4. Robust

### 4.1.2 Name, Role, Value (A) `#name-role-value`
- **Safqah**: every custom control exposes name, role, state: `Switch` on/off, `Checkbox` checked, `SelectRow` selected, `AccordionItem` expanded, `SegmentItem` selected, `BalanceToggle` hidden/shown.
- **Syntropy**: Flutter `Semantics(button:, toggled:, checked:, selected:, expanded:, value:)`; web native elements first, ARIA per APG second. See `screen-readers.md`.
- **Test**: screen reader announces role and state change on every toggle.

### 4.1.3 Status Messages (AA) `#status-messages`
- **Safqah**: "تم الاستثمار", "جارٍ المعالجة", filter result counts, `Toast` messages, inline save confirmations are announced without moving focus.
- **Syntropy**: `Toast`, inline `Alert`: Flutter `Semantics(liveRegion: true)` or `SemanticsService.announce`; web `role="status"` (polite) or `role="alert"` (errors only).
- **Test**: trigger the message with screen reader on; it is spoken once, focus stays put.

## Examples
- Do: `Slider` for investment duration plus `NumericStepper` with label «مدة الاستثمار (أشهر)». Don't: slider only (fails 2.5.7).
- Do: OTP that pastes and autofills. Don't: six separate boxes that block paste (fails 3.3.8).
- Do: «تأكيد استثمار 10,000.00 ر.س» on a summary screen. Don't: invest on first tap from a card (fails 3.3.4).

## Sources
- https://www.w3.org/WAI/WCAG22/quickref/
- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- knowledge/components/index.json, knowledge/tokens/resolved.json
