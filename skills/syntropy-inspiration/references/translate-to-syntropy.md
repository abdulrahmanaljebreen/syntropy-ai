# Translate a reference into Syntropy

How to turn a screen or flow from another product into a Safqah design built only from Syntropy components and semantic tokens, Arabic RTL first, in the Safqah voice, without copying the other brand. Open this after collecting references and before building anything.

## Rules
1. Name the pattern before touching the design ("review sheet over amount entry", "capture tips then camera").
   Why: you adopt a pattern, not a screen.
2. Map every kept element to a component from `data/components-index.json`, with exact names and variant values (`Button` `Variant=primary` `Size=lg`).
   Why: Syntropy is the only allowed building material.
3. If an element has no match, list it as a gap with the reason and the closest composition. Do not draw a custom one.
   Why: gaps go to the design system team; one-offs fragment the system.
4. Replace every color, size, radius and font with a semantic token (`bg/brand/primary`, `text/muted`, `border/subtle`, `space/lg`, `radius/default`) and a Syntropy text style (`heading / 22 / bold`, `caption / 12 / regular`).
   Why: tokens carry light and dark mode and the brand.
5. Keep the reference's token roles, not its values: its single CTA color becomes `bg/brand/primary`; its muted label becomes `text/muted`; its success green becomes `text/success`.
   Why: roles transfer; brand values do not.
6. Build RTL first: the Direction value the Arabic locale dictates, mirrored layout and directional icons, Western digits kept LTR, currency after the amount, chart time axes left to right.
   Why: Safqah is Arabic-first.
7. Rewrite all copy in the Safqah voice: Arabic first, plain, short; a label, the control, at most one hint. No em dash. Return percentages start with «نسبة». Two decimals for money, one for percentages.
   Why: copied copy is a brand and legal problem; long copy fails the minimal-copy rule.
8. Never copy logos, brand colors, illustrations, photography, mascots, custom icons, fonts or exact copy. Use `Illustrations`, `Empty Illustration / *` and Syntropy Icons.
   Why: other brands' assets are not ours.
9. Remove every dark pattern in the reference (fake urgency, pre-checked consent, hidden fees, confirm-shaming).
   Why: banned at Safqah and contrary to SAMA fair-treatment rules.
10. Check the result: token pairs meet WCAG 2.2 AA; risk sits next to the commitment action; fees (with VAT) before confirmation; 48 point touch targets in the app; one primary action per screen; empty, loading, error, success and disabled states exist.
    Why: accessibility, regulation and completeness.
11. Cite each reference under the design (product, link, tool, date).
    Why: reviewers must see where the idea came from.

## The mapping table (fill it for the recommended pattern)
| Reference element | Pattern role | Syntropy component and variant | Tokens | RTL note | Copy (Arabic first) |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

## Common element to component map
| You see in a reference | Use in Syntropy |
|---|---|
| Big primary button | `Button` `Variant=primary` `Size=lg` |
| Secondary or ghost button | `Button` `Variant=secondary` or `Variant=tertiary` |
| Text link ("Change", "Learn more") | `Link` (`Variant=primary` or `muted`) |
| Bottom drawer with handle | `BottomSheet` with a `Sheet Content / *` slot (`Summary`, `List`, ...) |
| Centered modal with two buttons | `Dialog` |
| Label and value row | `KeyValue` `Layout=horizontal` |
| Grouped settings or details card | `ActionList` with `ListItem` rows |
| Row with icon, label, chevron | `ListItem` with leading and chevron slots |
| Toggle row | `ListItem` with the toggle slot (uses `Switch`) |
| Big number with change | `Stat`, or `PortfolioHeader` parts (`MoneyAmount`, `ReturnsDisplay`) |
| Status chip ("Pending", "Paid") | `StatusPill` with a `Tone` (`neutral`, `info`, `success`, `warning`, `error`, `brand`) |
| Category or filter chip | `Tag` (static) or `Segment` and `SegmentedControl_*` (selectable) |
| Inline message box | `Alert` (in content) or `Banner` (page or top level) |
| Snackbar | `Toast` |
| Progress toward a target | `ProgressBar` or `MilestoneProgress` |
| Multi-step header | `Stepper` or `StepIndicator` |
| Empty screen with illustration | `EmptyState` (`Tone` default, search or error) |
| Amount entry | `Input Amount`, `Keypad / Amount hero`, `Investment-amount` |
| Quick amount chips | `Keypad / Presets` |
| Investment card | `CardDeal` (`Layout=Hero` or `Row`; `State=Available`, `Reserved`, `Invested`, `Closed`) |
| Info card with icon | `CardInfo` |
| Countdown | `Countdown`, `Timer` (only for a real deadline) |
| Data table | `Table / Cell`, `Table / HeaderCell`, `Table / ActionCell`, `Table / Toolbar`, `Pagination` |
| Chart | `Chart / *` (mobile variants end in `· Mobile`) |
| Loading placeholder | `SkeletonLine`, `SkeletonBlock`, `SkeletonCircle` |
| Sharia or CMA badge | `ComplianceBadge`, `ShariaDisclosure` |

Before using any name, confirm it in `data/components-index.json` and copy variant values verbatim, including the exact Direction spelling of that component.

## Worked example 1: invest confirmation (from Acorns and Wise)
References (Refero, 2026-10-15): Acorns `e93df1d8-5791-47c5-91ec-b3d65ca6747c` (amount screen with review sheet), Wise `2ffb15d4-b589-4310-81ad-be313716cd21` (review screen with Change links), Acorns `e442af68-0dff-4f47-8bd5-fa940bf3e48a` (success with arrival date).

Pattern: "review sheet over amount entry, then success with the next date".

| Reference element | Syntropy | Tokens | RTL and copy |
|---|---|---|---|
| Large green amount | `Keypad / Amount hero` | `display / 40 / bold`, `text/default` (the amount is data, not a CTA, so not green) | `5,000.00 ر.س` |
| Bank dropdown under amount | `WalletChip` | `bg/surface`, `border/subtle` | «المحفظة» |
| Review bottom sheet | `BottomSheet` with handle, header and footer, `Sheet Content / Summary` | `bg/elevated`, `radius/default` top corners | Title «مراجعة الاستثمار» |
| Detail rows | `KeyValue` `Layout=horizontal` `Size=md`, last row `Emphasis=strong` | `text/muted` labels, `text/default` values, `space/md` between rows | «المبلغ», «الرسوم شاملة الضريبة», «نسبة العائد المتوقع», «الإجمالي» |
| Wise "Change" link per section | `Link` `Variant=primary` `Size=sm` | `text/brand/primary` | «تعديل» |
| Full-width invest button | `Button` `Variant=primary` `Size=lg` | `bg/brand/primary`, `text/on-brand` | «تأكيد الاستثمار» |
| Success check and next date | `EmptyState` layout with `Illustrations` success art, `KeyValue`, `Button` | `text/success` only on the icon | «تم استثمارك», «أول توزيع متوقع: 15/01/2027» |

Dropped: Acorns green, its illustration style, "estimated arrival" wording. Added: fee row with VAT, CMA risk line in `caption / 12 / regular` `text/muted` right above the button.

## Worked example 2: KYC document capture (from Lloyds, Cash App, Fly Delta)
References (Mobbin, 2026-10-15): [Lloyds](https://mobbin.com/screens/8c68fd6e-e333-4626-9899-c996c2d1e0f8), [Cash App](https://mobbin.com/screens/3a43e2de-8bd1-448b-b547-d80ebea051c0), [Fly Delta](https://mobbin.com/screens/863dac0b-3b71-44c2-9eb7-0968c4d9f0c3).

Pattern: "tips before capture, an exit for users without the document, reassurance at capture".

| Reference element | Syntropy | Tokens | RTL and copy |
|---|---|---|---|
| Lloyds ID icon and title | `Illustrations` (Syntropy isometric art) + `heading / 22 / bold` | `text/default` | «صوّر هويتك الوطنية» |
| Two checklist tips | `List` with `List / TextItem` and a Syntropy check icon | `icon/success`, `text/muted` | «مكان مضاء جيداً», «تظهر كل البيانات بوضوح» |
| "Open camera" primary | `Button` `Variant=primary` `Size=lg` | `bg/brand/primary` | «فتح الكاميرا» |
| "I don't have my ID with me" | `Link` `Variant=muted` | `text/muted` | «ليست معي الآن» (progress saved in `KYCChecklist`) |
| Cash App "All photos are encrypted" | one `caption / 12 / regular` line with a Syntropy lock icon | `text/muted`, `icon/muted` | «بياناتك مشفرة» |
| Fly Delta tips sheet over camera | `BottomSheet` with `Sheet Content / List` | `bg/elevated` | Title «نصائح التصوير» |
| Progress across KYC | `KYCStep` with `KYCTaskRow` (`Completed`, `Current`, `Upcoming`) | | Steps ordered right to left |

Gap logged: no camera-frame overlay component; proposed to the design system team instead of drawing one.

## Worked example 3: cash-out (from Wealthfront and Revolut)
References (Mobbin flows, 2026-10-15): [Wealthfront withdrawing funds](https://mobbin.com/flows/c5c946f8-13cf-4a74-a131-966f4534b381), [Revolut withdrawing money](https://mobbin.com/flows/5eea58ab-e05d-4905-9280-9c6fd3b38734).

Pattern: "from and to visible with the amount, withdraw-all shortcut, status after submit".

| Reference element | Syntropy | Tokens | RTL and copy |
|---|---|---|---|
| From account row | `ListItem` with leading and value | `text/default`, `text/muted` | «من: المحفظة», `12,400.00 ر.س` |
| To bank row with Edit | `ListItem` with leading and action | | «إلى: حسابك البنكي», IBAN LTR and masked `SA•• •••• 4821` |
| Amount field | `Input Amount` | `border/default`, focus `border/focus` | Label «المبلغ» |
| "Withdraw entire balance" | `Link` `Variant=primary` | `text/brand/primary` | «سحب كامل الرصيد» |
| Revolut quick amounts | `Keypad / Presets` | `bg/surface` | `500`, `1,000`, `5,000` |
| Review button | `Button` `Variant=primary` `Size=lg` | | «مراجعة السحب» |
| "Initiated" chip on success | `StatusPill` `Tone=info` `Variant=subtle` | `bg/info-subtle`, `text/info` | «قيد التنفيذ» |
| Arrival estimate | `KeyValue` | | «يصل خلال يومي عمل» |

Dropped: Revolut dark theme and flag icons, Wealthfront purple. Safqah rule applied: reinvesting is suggested at payout time, never as a blocker on this screen.

## Red flags: stop and push back
| Request | Answer |
|---|---|
| "Make it look exactly like Revolut / use their purple" | Decline the brand copy; offer the pattern with `bg/brand/primary` as the single accent and Syntropy surfaces |
| "Take the Wise screen and put our logo on it" | Decline the reskin; rebuild the pattern (review with Change links) from `ActionList`, `KeyValue`, `Link`, `Button` with Safqah copy |
| "Use their illustration / icon / font" | Use `Illustrations`, Syntropy Icons and the Syntropy text styles; propose a gap if truly missing |
| "Add their countdown so people hurry" | Use `Countdown` only for a real reservation deadline, never as pressure |
| "Copy their wording" | Rewrite in Arabic first, minimal, see syntropy-content |

## Checklist before hand-off
- [ ] Pattern named; references cited with links and dates.
- [ ] Every element maps to a component and variant, or is listed as a gap.
- [ ] No raw hex, pixel or font values; only tokens and Syntropy text styles.
- [ ] RTL Direction as the locale dictates, directional icons mirrored, Western digits, currency after the amount.
- [ ] Copy rewritten Arabic first, minimal, no em dash.
- [ ] No logo, brand color, illustration, icon, font or copy from any reference.
- [ ] No dark patterns; fees and risk visible.
- [ ] Contrast checked (WCAG 2.2 AA); all states designed.

## Sources
- Syntropy component index and text styles
- Refero screens and Mobbin screens and flows cited above, queried 2026-10-15
