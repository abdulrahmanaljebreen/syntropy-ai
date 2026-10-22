# Deal list (Deals tab)

The screen where investors browse deals: open now, coming, and closed track record, with light filtering. Read this before building the Deals tab, a deals section on home, or any list of `CardDeal`.

## Job of the screen
Help an investor find a deal worth opening, and, when there is no open deal, show that the platform is alive and what happens next. Deal supply at Safqah is intentionally constrained: an empty open-deals list is the steady state, not a fault, and must never read as the app failing.

## When to use
- The Deals tab (most visited surface), a home "deals" region, search or filter results.
- Not for: one deal's details (`deal-page.md`), the investor's own holdings (`portfolio.md`).

## Flow steps
1. **Load**: skeleton cards.
2. **Default view**: the tab is four permanent regions, open deals being only one: (a) «صفقات متاحة الآن», (b) «قادم في الطريق», (c) «تنبيهاتي», (d) «من صفقاتنا الناجحة» (closed track record).
3. **Filter** (optional): pick a segment or open the filter sheet; results update in place with a count.
4. **Open a card**: go to `deal-page.md`.
5. **No open deals**: region (a) shows a neutral wait state with one action (create an alert), while regions (b) to (d) stay populated.
6. **Filter returns nothing**: a search-tone empty state with «مسح الفلاتر». Never the scarcity copy.
7. **Pull to refresh**: `Pull-to-refresh` `State=pulling` then `refreshing`.

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="main screens"` `Direction=RTL` (`showBalance`, `showEyeButton`, `showProfile`) | `bg/base` |
| 2 | Segment filter | `SegmentedControl_3` `Style=pill-thumb` `Size=md` `Direction=RTL`; segments «متاحة» · «قادمة» · «مغلقة» (first segment on the right) | Padding `space/lg`. A choice control, not navigation: do not use `TabBar` here |
| 3 | Attribute filters (optional) | `Tag Group` `Layout=overflow` of `Tag` `Style=subtle` `Size=md` (duration buckets, region); active filters as `Tag Removable` `Tone=brand`. «الفلاتر» opens `BottomSheet` with `Filter menu` or `ProvinceSelector` `Selection=Multi` | Horizontal scroll inside `ScrollContainer` `Axis=horizontal` `fadeEnd` true. Result count as body/13 `text/muted` |
| 4 | Region (a) open deals | `Section` `Size=Lg` «صفقات متاحة الآن» `Has action` («عرض الكل») only if more than shown. Featured: `Carousel` `Type=Cards` `Size=Md` of `CardDeal` `Layout=Hero` `State=Available` `Direction=RTL` + `PageIndicator` `Style=Dots`. Rest: vertical stack of `CardDeal` `Layout=Row` | Gap between cards `space/md`; sections `space/2xl` apart |
| 5 | Region (b) coming | `Section` `Size=Md` «قادم في الطريق» + `ListItem` rows (`Has leading`, `Has label` with `Tag` «قريباً», `Has chevron`) inside `ActionList` `Style=Grouped` | Shows real pipeline only; no dates unless confirmed |
| 6 | Region (c) alerts | `Section` `Size=Md` «تنبيهاتي» + `ActionPrompt` `Tone=Brand` («أنشئ تنبيهاً بالصفقات التي تناسب معاييرك») or a summary `ListItem` when an alert exists | One CTA |
| 7 | Region (d) track record | `Section` `Size=Md` «من صفقاتنا الناجحة» + `Carousel` of `CardDeal` `Layout=Hero` `State=Closed` (or `Row`), each with `dealTags` `Type=Closed` | Real outcomes only (repaid, on time) |
| 8 | Bottom navigation | `TabBar` `Active=` Deals tab `Direction=RTL` | Reserves safe area |

Qualified users: `CardDeal` `Qualified=true` shows the `dealTags` qualified badge; retail users never see it (`Qualified=false`). Reserved deals use `State=Reserved` and `Show status=true`.

## Required states

| State | Region (a) behaviour |
|---|---|
| Loading | One `SkeletonBlock` `Radius=Large` at Hero card size (358x316) + 3 Row skeletons (`SkeletonAvatar` `Shape=Square` `Size=M` + 2 `SkeletonLine`). Segments render immediately |
| Empty: no open deals (supply) | `EmptyState` `Tone=default` `Size=Compact` `showButton=true`: title «لا توجد صفقات مفتوحة حالياً», description «سنخبرك عند توفر صفقة جديدة.», button «أنشئ تنبيهاً». Neutral tone, no apology, no countdown unless ops gives a real estimate. Regions (b) to (d) stay visible below |
| Empty: filters match nothing | `EmptyState` `Tone=search` `Size=Compact`: «لا توجد صفقات بهذه الفلاتر» + button «مسح الفلاتر». Never reuse the supply copy |
| Empty: alert set but no match | `Alert` `Tone=warning` `Style=Outlined` «لا توجد صفقات تطابق تنبيهك» + link «تعديل التنبيه» (the only warning-tone empty) |
| Error | `EmptyState` `Tone=error` `Size=Default` «تعذر تحميل الصفقات» + «إعادة المحاولة»; offline adds `Toast` `Tone=warning` `Size=Small` «لا يوجد اتصال» |
| Success | After creating an alert: `Toast` `Tone=success` «تم إنشاء التنبيه» and region (c) shows the alert row |
| Disabled | Closed deals: `CardDeal` `State=Closed` (dimmed by design), still tappable to the track-record page. Sold out while viewing: card flips to `State=Closed` in place; no error |

## Copy
| Slot | Arabic | English |
|---|---|---|
| Segments | «متاحة» · «قادمة» · «مغلقة» | "Open" · "Upcoming" · "Closed" |
| Card metric | «نسبة العائد المتوقع» `12%` · «المدة» `12 شهر` | "Expected return" `12%` · "Term" `12 months` |
| Supply empty | «لا توجد صفقات مفتوحة حالياً. سنخبرك عند توفر صفقة جديدة.» | "No open deals right now. We'll notify you when a new deal is available." |
| Filter empty | «لا توجد صفقات بهذه الفلاتر» / «مسح الفلاتر» | "No deals match these filters" / "Clear filters" |
| Track record | «من صفقاتنا الناجحة» | "From our completed deals" |

## Compliance notes
- Cards show expected return with «نسبة» and the real precision (`7.55%`). No "guaranteed".
- Track-record cards show actual results only; do not imply future deals will perform the same. Add a one-line past-performance note if Compliance requires. Confirm with Compliance.
- Pipeline (coming) items: disclose only what may be disclosed pre-launch; no commitment language that creates gharar. Confirm with Compliance.
- Ordering and badges must not say «الأفضل لك» or rank by suitability (CMA).

## Accessibility notes
- Each `CardDeal` is one button read as: name, expected return, term, status.
- `Carousel` offers next/previous actions and announces «صفقة 1 من 3»; never drag-only.
- Segment control uses radio semantics (one selected), `Size=md` or larger for 44pt/48dp.
- Result count updates are announced politely after filtering.
- Closed (dimmed) cards keep text at 4.5:1; dimming is the image, not the text.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Arrived | Open and sold-out properties side by side; sold-out reads as proof, not failure |
| Fundrise | Plain filters and counts; no gamified scarcity |
| Sukuk / Manafa (Saudi) | Arabic deal cards with return and term as the two key numbers |
| Wahed | Calm empty and waiting states in a Sharia-compliant investing app |

## Anti-patterns
- A blank list or a lone illustration when no deal is open (reads as the app being broken).
- The same copy for "no supply" and "no filter results".
- Stacking `CardDeal` `Layout=Hero` in a long list (use `Row`).
- `TabBar` used as the open/upcoming/closed switch.
- Fake urgency: invented countdowns to the next deal.
- Showing the qualified badge to retail users.

## Sources
- `knowledge/components/card-deal.md` (3013:95390), `segmented-control.md` (4258:1461), `tag.md`, `empty-state.md` (2066:434), `carousel.md`, `section.md`, `menu.md` (Filter menu 3970:2937), `province-selector.md`, `scroll-container.md`.
- Image: `knowledge/examples/components/card-deal/card-deal.png`.
- Empty-state research: Notion «Empty state solution» `3571a53e1a6b80d298f1c258fe12ac88` (supply scarcity, four-module Deals tab, filter-empty must not borrow scarcity copy).
- Reference search (Refero, Oct 2026): property listing and investing dashboards (Airbnb listing status pill, Copilot real-estate asset sheet).
