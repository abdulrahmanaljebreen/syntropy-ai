# Empty states

What a region shows after it has loaded and has nothing to display, by context: first use, no results, error, and the Safqah-specific "no open deals" wait. Read this before showing any zero-item list, tab, sheet or chart.

## Job of the screen
Explain in one line why the area is empty and give exactly one useful next step, so emptiness reads as an intentional state, never as a broken app.

## When to use
- After a load completes with zero items. During loading use `SkeletonLine` / `SkeletonBlock`; for transient feedback use `Toast`; for inline field problems use `Form Field Helper`.
- The three types, picked by cause:

| Type | Cause | `EmptyState` `Tone` | Primary action |
|---|---|---|---|
| First use | The user has not created or received anything yet | `default` | Start the first thing («تصفح الصفقات») |
| No results | A search or filter matched nothing | `search` | Broaden («مسح الفلاتر») |
| Error | Loading failed, no fallback content | `error` | Retry («إعادة المحاولة»), optional link «تواصل معنا» |
| Waiting (Safqah supply) | Nothing is available yet by design (no open deals) | `default` | Get notified («أنشئ تنبيهاً») |

## Flow steps
1. Region requests data; skeleton after 200ms.
2. Data returns empty: decide the type from the cause, not from looks.
3. Render `EmptyState` sized to the region.
4. The user takes the action: the empty state is replaced by content (it is never dismissed or closed).

## Layout recipe

| Slot | Component + key props | Tokens and notes |
|---|---|---|
| Container | The region itself (tab body, card, sheet content). Full-area: centred vertically. Inside a card or sheet: top-aligned with padding `space/2xl` | Same surface as the region |
| Empty state | `EmptyState` `Tone=default/search/error` `Size=Default` (fills a tab or page) or `Size=Compact` (inside a card, sheet, sidebar, or below filters) `Direction=RTL`; `showDescription=true`; `showButton=true` almost always; `showLink=true` only for a secondary help link | Title one short sentence; description one sentence |
| Illustration | Default per tone (`Empty Illustration / default / Default`, `/ search /`, `/ error /`, Compact twins), or swap to an `Illustrations` concept that fits the domain (table below) | Restrained, flat, no mascots |
| In a sheet | `Sheet Content / Empty` inside `BottomSheet` | |
| In a chart | `Chart / States` `State=empty` `Direction=RTL` | Keep the axes off; one line of text |
| In search | `Search Dropdown` `State=empty`; `Combobox Menu` `State="No results"` | Never a blank white box |

### Context table (Safqah)

| Context | Type | Size | Illustration (`Illustrations` `Property 1=`) | Arabic title / description | Action |
|---|---|---|---|---|---|
| Deals tab, no open deals | Waiting | `Compact` (other Deals regions stay visible) | `Scheduled` | «لا توجد صفقات مفتوحة حالياً» / «سنخبرك عند توفر صفقة جديدة.» | «أنشئ تنبيهاً» |
| Deals filtered to zero | No results | `Compact` | default search illustration | «لا توجد صفقات بهذه الفلاتر» | «مسح الفلاتر» |
| Portfolio, never invested | First use | `Default` | `Start` | «لم تستثمر بعد» / «ابدأ من 1,000 ر.س.» | «تصفح الصفقات» |
| Completed investments tab | First use | `Compact` | `Matured` | «لا توجد استثمارات مكتملة بعد» | none |
| Payouts list | First use | `Default` | `Scheduled` | «لا توجد توزيعات بعد» | «تصفح الصفقات» |
| Wallet activity | First use | `Compact` | `Bank` | «لا توجد عمليات بعد» | «إيداع» |
| Notifications inbox | First use | `Compact` | `Info` | «لا توجد إشعارات» | none |
| Saved deals | First use | `Compact` | `Hearts - Favorite` | «لم تحفظ أي صفقة بعد» | «تصفح الصفقات» |
| Search | No results | `Compact` | default search | «لا توجد نتائج لـ "الرياض"» | «مسح البحث» |
| Back-office table | No results | `Compact` | default search | «لا توجد سجلات تطابق الفلاتر» | «مسح الفلاتر» |
| Any region failed to load | Error | Region size | default error | «تعذر تحميل البيانات» | «إعادة المحاولة» |
| Offline | Error | `Default` | `Web - Globe` | «لا يوجد اتصال بالإنترنت» | «إعادة المحاولة» |
| Account under review | Waiting | `Compact` | `Data info alert` | «طلبك قيد المراجعة» | «تصفح الصفقات» |

## Required states
- **Loading**: never an empty state; use skeletons matching the real content.
- **Empty**: the table above.
- **Error**: `Tone=error` with retry; after a failed retry keep the same state and add `showLink` «تواصل معنا».
- **Success**: the action replaces the empty state with content; optionally one `Toast` `Tone=success` when the action created something (alert, goal).
- **Disabled**: if the action is unavailable (KYC incomplete), the button routes to the blocker («أكمل توثيق حسابك») instead of being disabled with no explanation.

## Copy rules
- Title: what the state is, one short sentence, no "Sorry", no "Oops".
- Description: what happens next or what to do, one sentence (5-20 words total).
- Name the thing («لا توجد توزيعات بعد», not «لا توجد بيانات»).
- Waiting states are neutral, not apologetic and not urgent.

| Do | Don't |
|---|---|
| «لا توجد صفقات مفتوحة حالياً. سنخبرك عند توفر صفقة جديدة.» | «عذراً! لا يوجد شيء هنا 😢» |
| «لا توجد صفقات بهذه الفلاتر» + «مسح الفلاتر» | The supply message after a filter |
| «تعذر تحميل الصفقات» + «إعادة المحاولة» | «حدث خطأ» with no action |

## Compliance notes
- An empty Deals tab must not use pressure wording or promise the next deal date without a real estimate. Confirm pre-launch disclosure with Compliance.
- First-use copy can state a concrete fact («يبدأ الاستثمار من 1,000 ر.س») but no return claims.

## Accessibility notes
- Illustrations are decorative (hidden from screen readers); the title is the accessible name of the region.
- Move focus to the empty-state title only when it replaces content the user was interacting with (after filtering); otherwise leave focus.
- Buttons meet the 48x48 target; title colour passes 4.5:1 per tone.

## Benchmarks
| App (benchmarks, see syntropy-inspiration) | What to learn |
|---|---|
| Arrived | Sold-out and waitlist states that read as demand, not failure |
| Monzo | One-line first-use states with a single action |
| Fundrise | Calm "nothing yet" portfolio with a clear first step |
| GOV.UK Design System | "No results" patterns that tell the user how to broaden |

## Anti-patterns
- Skeletons that never resolve because there is no data (empty is after load).
- One generic empty message for every cause.
- A dismiss (x) on an empty state.
- Two buttons of equal weight, or no action at all on a first-use state.
- An empty tab with only an illustration and no text.

## Sources
- `knowledge/components/empty-state.md` (EmptyState 2066:434, Empty Illustration 2083:647-712, Illustrations 2071:38797), `skeleton.md`, `bottom-sheet.md` (Sheet Content / Empty 2650:293), `chart.md` (Chart / States 4107:1314), `search.md`, `combobox.md`.
- Images: `knowledge/examples/components/empty-state/reference.png`, `illustrations.png`.
- Empty-state research: Notion `3571a53e1a6b80d298f1c258fe12ac88` (supply scarcity, filter-empty rule).
- Illustration concepts: `knowledge/icons/illustrations.json`.
