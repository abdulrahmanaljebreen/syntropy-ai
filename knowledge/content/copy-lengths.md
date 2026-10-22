# Copy lengths by type

Length limits for each kind of UI copy, in Arabic and English. Read this when writing or reviewing a string, or when sizing a component slot for text. Limits are words unless stated. Arabic usually runs a little shorter in words but longer in width; size slots for the Arabic string first.

## Rules

1. Stay within the limit for the copy type below. If a message needs more, it is the wrong pattern (move it to a sheet, a help article or a `ShariaDisclosure`), not a longer string.
   Why: long strings break layouts in both directions and bury the action.
2. Default to the low end of each range. The upper bound is a ceiling, not a target.
   Why: minimal copy rule: a label, the control, at most one short hint.
3. One hint per field. Do not stack helper text and a description and a tooltip on the same control.
   Why: one short hint is enough; more is noise.
4. Measure the Arabic string. The same limits apply to both languages; when the Arabic version breaks the limit, shorten the Arabic, then re-translate.
   Why: Arabic is canonical.
5. Never truncate financial values, deal names in confirmations, or disclosures with an ellipsis. Truncate only secondary labels in lists, and only at the end of the line (the left edge in RTL).
   Why: a cut number or disclosure misleads.

## Limits

| Copy type | Arabic limit | English limit | Shape | Typical component |
|---|---|---|---|---|
| Labels and buttons | 1-3 words | 1-3 words | Verb first for actions; one noun for destinations; no «اضغط هنا» / "Click here" | `Button`, `TabBar`, `Tag`, `FormField` label |
| Helper text (hint) | 8-15 words | 8-15 words | What to enter and why; one sentence | `FormField`, `Input` |
| Error messages | 8-20 words | 8-20 words | The next action, not the error name | `FormField` error, `Alert` |
| Success copy | 5-15 words | 5-15 words | Confirms the action and names the thing; no emoji | `Toast`, success screen |
| Compliance and disclosure | 2-4 sentences | 2-4 sentences | Explains the structure and names the risk | `ShariaDisclosure`, `ComplianceBadge` |
| Empty states | 5-20 words | 5-20 words | What the state is + what happens next; no apology | `EmptyState` |
| Onboarding and education | 1-2 sentences per step | 1-2 sentences per step | Concrete value, a specific number | `Carousel`, `CardInfo` |
| Toast title (built default shape) | about 2-5 words | about 2-5 words | Title plus optional one-line description | `Toast` |
| Alert / Banner title | about 2-6 words | about 2-6 words | Title, optional description of one sentence | `Alert`, `Banner` |

Rows "Toast title" and "Alert / Banner title" are derived from the built component slots (`title` + optional `description`) and the minimal copy rule; the other rows are verbatim from Notion.

## Examples

| Type | Do (Arabic / English) | Don't |
|---|---|---|
| Button | «استثمر الآن» / "Invest now" | «اضغط هنا للاستثمار في هذه الصفقة» / "Click here to invest in this deal" |
| Helper | «يرجى إدخال رقم الجوال السعودي المسجل لديك» / "Enter your registered Saudi phone number" (6-7 words) | A three-sentence paragraph explaining why phone numbers matter |
| Error | «كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل رقماً» / "Password must be at least 8 characters and include a number" | «خطأ» / "Error" |
| Success | «تم استثمارك بنجاح في صفقة [اسم الصفقة]» / "Your investment in [Deal Name] has been confirmed" | «تم!» / "Done!" with confetti |
| Empty | «لا توجد صفقات مفتوحة حالياً. سنخبرك عند توفر صفقة جديدة.» / "No open deals right now. We'll notify you when a new deal is available." | «عذراً! لا يوجد شيء هنا 😔» / "Sorry! Nothing here 😔" |
| Disclosure | Two sentences: structure + risk (see `voice-tone.md`) | One sentence that omits the risk, or a legal page |

## Sources
- Notion: Stage 1-3 Principles, section "Copy types, what good looks like", `3501a53e-1a6b-802c-92b6-c0b2381d4215` and `3501a53e-1a6b-8190-ba9e-ce891190bef9`.
- Built components: `Toast` (1964:142), `Alert` (1950:212), `Banner` (1993:212) text props in `knowledge/components/index.json`.
