# Notifications and permissions

The notification settings screen (what we notify and on which channel), the permission primer shown before the OS prompt, the reminder sheet, and how a denied OS permission is reflected. Read this before building notification settings or asking for any OS permission (notifications, biometrics, camera for documents).

## Job of the screen
Let investors choose exactly which messages they get and where, and ask for OS permission only at a moment when the value is obvious, so the answer is an informed yes or no that we respect.

## When to use
- Settings › Notifications (single screen).
- First-time primer after KYC completes; reminder sheet after a meaningful event (investment confirmed, reservation received).
- Any OS permission: same primer logic (explain, then the OS dialog only after the user agrees).

## Rules from the notifications PRD
- Soft pre-prompt at KYC completion; the OS dialog is shown only after the user taps yes.
- Decline is a peer button, not a hidden link.
- Re-ask at most 2 times in 90 days, and only from inside the notification centre or settings, never as a pop-up on launch.
- If the OS permission is denied, show at most one banner per 30 days, and dim the toggles that depend on it.
- Preferences are honoured on the server: a channel switched off sends nothing on that channel (PDPL).

## Flow steps
1. **KYC completed** → full-screen primer: what we notify (2-4 items), reversibility line, «فعّل التنبيهات» / «ليس الآن».
2. **Yes** → OS dialog (native). **Not now** → continue; no OS dialog consumed.
3. **Later event** (investment confirmed) → reminder `BottomSheet` if still off and within the re-ask cap.
4. **Settings**: one screen with a global switch and grouped per-type, per-channel toggles; changes apply instantly.
5. **OS denied**: banner at the top of settings with «فتح الإعدادات» (deep link to OS settings); dependent toggles disabled-off.

## Layout recipe: settings screen (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Inner screens"` `Direction=RTL`, title «التنبيهات» | |
| 2 | OS denied (conditional) | `Banner` `Tone=info` `Style=Filled` `showClose=true` `showLink=true`: title «التنبيهات متوقفة», link «فتح الإعدادات» | At most once per 30 days |
| 3 | Global switch | `ListItem` `Has toggle=true` (`Switch` `Size=lg`) title «كل التنبيهات», one-line description under it | Off disables every switch below (`State=disabled-off`) |
| 4 | Groups | Per type, a `Section` `Size=Sm` title, then `ActionList` `Style=Grouped` `Has header=false` with one `ListItem` `Has toggle=true` per channel («إشعارات التطبيق», «رسائل SMS», «البريد الإلكتروني»). Groups: «الصفقات الجديدة», «أخبار المشاريع», «التوزيعات النقدية», «الهدف الاستثماري», «الزكاة», «التنبيهات العامة» | Gap `space/2xl` between groups; `ActionList` handles dividers |
| 5 | Mandatory messages | `ActionList` footer text or `ListItem` with `Switch` `State=disabled-on` + description «تنبيهات الأمان والعمليات لا يمكن إيقافها» | Transactional and security messages stay on |
| 6 | No footer CTA | Switches apply instantly | No save button |

## Layout recipe: primer (full screen)

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Illustration | A sample notification card (body/14 «تم توزيع أرباحك · 250.00 ر.س») or `Illustrations` `Property 1=Info` | Real example of value, not a mascot |
| 2 | Title | heading/24/bold «نبهك أول ما تتحرك فلوسك» | One line |
| 3 | What we send | `List` `Style=Bulleted` (or `Content` rows with icons) 2-4 items: new deals, payouts, project updates | |
| 4 | Reversibility | body/13 `text/muted` «يمكنك تغيير ذلك في أي وقت من الإعدادات» | One line |
| 5 | Actions | `ButtonGroup` `Orientation=vertical`: primary «فعّل التنبيهات», secondary «ليس الآن» (`Variant=secondary`, same size) | Decline is a peer |

## Layout recipe: reminder sheet

| Slot | Component + key props | Notes |
|---|---|---|
| Shell | `BottomSheet` `showHandle=true` `showHeader=true` `showFooter=true` over `bg/overlay` | Dismissible |
| Header | `SheetHeader` title tied to the event («تابع استثمارك في الحجاز ريفيرا») | Names the deal |
| Content | `Sheet Content / Text` (one line of value) | |
| Footer | `SheetFooter` `Layout=Stacked` `showSecondary=true`: «فعّل التنبيهات» / «ليس الآن» | |

## Required states

| State | Treatment |
|---|---|
| Loading | Settings: `SkeletonLine` rows with a `SkeletonBlock` `Radius=XLarge` switch-shaped placeholder at the trailing edge |
| Empty | Not applicable; every user has the full list. Notification inbox empty: see `empty-states.md` |
| Error | Toggle save failed: revert the switch and show `Toast` `Tone=error` `Size=Small` «تعذر حفظ التغيير». Never leave a switch showing a state the server did not save |
| Success | No toast per toggle (the switch is the feedback) |
| Disabled | Global off: all switches `State=disabled-off`. OS denied: push switches disabled-off with the banner; SMS/email still editable. Mandatory: `State=disabled-on` with reason |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Screen | «التنبيهات» | "Notifications" |
| Global | «كل التنبيهات» | "All notifications" |
| Primer title | «نبهك أول ما تتحرك فلوسك» | "Know the moment your money moves" |
| Accept / decline | «فعّل التنبيهات» / «ليس الآن» | "Turn on notifications" / "Not now" |
| Denied banner | «التنبيهات متوقفة» / «فتح الإعدادات» | "Notifications are off" / "Open settings" |
| Reversibility | «يمكنك تغيير ذلك في أي وقت من الإعدادات» | "You can change this anytime in settings" |

## Compliance notes
- PDPL: marketing messages need opt-in consent per channel; switching off is honoured immediately on the server; no pre-ticked marketing switches. Confirm channel defaults with Compliance.
- Transactional and security messages (payments, sign-in, regulatory notices) may be mandatory: show them as disabled-on with the reason, never hidden.
- Notification copy follows T6: no FOMO («الصفقة على وشك الانتهاء!!»), real deadlines only.
- Never call a deal alert «مناسبة لك» (CMA).

## Accessibility notes
- Each toggle row reads label, channel and state («إشعارات التطبيق، الصفقات الجديدة، مفعّل»); the whole row toggles.
- Disabled switches explain why (description text), not just reduced opacity.
- Thumb position does not mirror in RTL (on = thumb right in both directions).
- Primer buttons are equal height with 48dp targets.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Acorns | Value-first notification primer before the OS dialog |
| Monzo | Granular notification settings grouped by topic |
| Al Rajhi Bank (Saudi) | Arabic notification channels (push, SMS) with mandatory security alerts |
| Material 3 / Apple HIG | Permission request timing guidance |

## Anti-patterns
- Calling the OS permission dialog on first launch.
- «لا، شكراً لا أريد معرفة أرباحي» (confirmshaming) as the decline.
- A save button on an instant-apply switch screen.
- Re-asking on every launch, or a denied banner on every visit.
- Toggles that show "on" when the OS permission is denied.

## Sources
- `knowledge/components/action-list.md` (3222:1092), `list-item.md` (3212:1071), `switch.md` (1101:105), `section.md` (3262:834), `banner.md`, `bottom-sheet.md`, `button-group.md`.
- Notifications PRD: Notion `3aa1a53e1a6b81c09ba7e2a67d33a8ce` (§4.3 primer at KYC completion, OS dialog after yes, decline as peer, re-ask cap 2 per 90 days, denied banner at most 1 per 30 days, dim dependent toggles).
- Linear SAF-2941 (reconcile in-app toggles with the OS permission).
- Reference search (Refero, Oct 2026): SeatGeek and Luma notification primers.
- Regulation: PDPL (links.json `regulation`).
