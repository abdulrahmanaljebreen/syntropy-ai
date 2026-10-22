# Deal page

The detail screen for one deal (صفقة): hero, headline numbers, facts, lifecycle, guarantees, compliance and a sticky invest action. Read this before building or reviewing any deal detail screen on the app or web.

## Job of the screen
Give an investor every fact they need to decide on one deal, in the order they ask: what is it, what does it return and for how long, how safe is it, what happens when, and is it allowed (Sharia, CMA). Then let them invest in one tap.

## When to use
- Opening a deal from `CardDeal`, a notification, a deep link or a recommendation.
- States: Available, Reserved (by this user), Invested, Closed (track record), Coming soon.
- Not for: lists of deals (use `deal-list.md`), the amount entry itself (use `invest-and-reserve.md`), updates feeds (use `NewsCard`).

## Flow steps
1. **Enter** from a card. Hero expanded, `Base card` `State=Expanded`. Skeleton while loading.
2. **Scroll**. Hero collapses into `AppBar` `Type="Deal page-collapsing"` (mobile) or `Base card` `Platform=Web` `State=Collapsed` (web sticky bar with title, Share, Save, Invest).
3. **Read numbers and facts**. Optional: tap a `KeyValue` info icon to open a `Tooltip` or a `BottomSheet` with `Sheet Content / Text`.
4. **Model the amount** inline (`Calculator / Amount card`, qualified) or skip.
5. **Tap the sticky CTA** `استثمر الآن`. Go to `invest-and-reserve.md` step 1.
6. **Return states**: Reserved shows `Collapsed-Reservation` above the CTA; Invested swaps the CTA for `عرض استثماري`; Closed hides the CTA and shows the outcome.

## Layout recipe (top to bottom, RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Hero | `Base card` (page 07l HeaderCard) `Platform=Mobile` `State=Expanded` `Direction=RTL`, `Has Subtitle` (developer name), `Has Lable`, `Has meta`, `Has developer` all true. Photo carousel with page counter, back, share, favourite overlays | Full bleed, no side padding. Not published: in another Figma file, copy it from the Syntropy file |
| 2 | Eligibility / tier badge | `dealTags` inside the hero: `Type=Type7` (qualified only: «فرصة حصرية للمؤهلين») and at most one tier (`Premium` / `Basic`). On light surfaces use `Type=pros` | Max two tags. Show the qualified tag only to qualified investors |
| 3 | Status | `IssuanceStatusBadge (Investor)` `Status=` the live lifecycle state (`Fully Funded`, `Reserved`, `Active`, `Completed`) `Direction=RTL` | Locked copy and palette. Never a free `StatusPill` for lifecycle |
| 4 | Headline numbers | Row of 2-3 `Stat` `Size=md` `Layout=vertical` `HasDelta=false`: «نسبة العائد المتوقع» `8.5%`, «مدة الاستثمار» `12 شهر`, «الحد الأدنى» `1,000 ر.س`. One `Stat` may be `Size=lg` if it is the focal metric | Padding `space/lg`, gap `space/md`. `HasDelta=false` always (no prior period) |
| 5 | Funding progress | `ProgressBar` `Size=md` `Tone=brand` `showLabel` true, Label «نسبة التمويل», Value `72%` `Direction=RTL` | Fills from the right. Live value only |
| 6 | Facts | `Section` `Size=Md` «تفاصيل الصفقة», then a column of `KeyValue` `Layout=horizontal` `Size=md` `Emphasis=default` separated by `Divider` `Tone=subtle`. One row `Emphasis=strong` (the profit rate). Info icon (`HasIcon=true`) only where a `Tooltip` explains the value; copy icon on the deal reference | Container `bg/elevated`, `border/subtle`, `radius/lg`, inner padding `space/lg` |
| 7 | Calculator (optional) | Qualified: `Calculator / Duration picker`, `Calculator / Amount card` `Distributions=Closed`, `Calculator / Results card` `Indicators=Closed`. Retail: `Investment-amount` `User=Regular` | Values labelled «متوقع». Opens `invest-and-reserve.md` with the amount prefilled |
| 8 | Distributions | `Distribution-schedule` `Property 1=Less-list` (or `No-Schedule` for end-of-term payout) | Dates as `متوقع ~7 يناير 2027` (maturity + 15 days) |
| 9 | Lifecycle | `Section` `Size=Md` «مراحل الصفقة» + `DealTimeline` `Direction=RTL` | Exactly one stage active; amounts only on money moments |
| 10 | Guarantees | `Section` `Size=Md` «الضمانات» + `Guarantees` `Coverage=` real level `Direction=RTL`; below it a `List` `Style=Bulleted` naming all three guarantees (land pledge, company PN, personal PNs) | Never show the bar without its axis and title |
| 11 | Developer | `CardInfo` `Type=Avatar` `Tone=Neutral` (developer name, years, link to profile) | One card, whole card taps through |
| 12 | Updates | `NewsCard / Poster Carousel` `Direction=RTL` (or `NewsCard` `Style=Plain` list) | Only if updates exist; hide the region otherwise |
| 13 | Compliance | `ShariaDisclosure` `Direction=RTL` then a row of `ComplianceBadge` `Type=Shariah` and `Type=CMA` | Gap `space/2xl` above. «إعرف أكثر» opens the real document |
| 14 | FAQ (optional) | `Accordion` `Style=Plain` with `AccordionItem` `State=Collapsed` | Max 5 items |
| 15 | Risk line | `Alert` `Tone=neutral` `Style=Plain` with the risk statement | Above the footer, never hidden |
| 16 | Sticky footer | `Button` `Variant=primary` `Size=lg` full width «استثمر الآن». Reserved: `Collapsed-Reservation` `Direction=RTL` above it | `bg/base`, padding `space/lg` + safe area, `Scroll shadow` `Position=bottom` |

Web: same order, `Base card` `Platform=Web`; facts and calculator can sit in two columns (content 8 cols, calculator 4 cols, sticky) inside the 1200px container. Never a separate desktop design.

## Required states

| State | What changes |
|---|---|
| Loading | `SkeletonBlock` `Radius=None` for the hero (same height), `SkeletonLine` `Size=Large` `Width=3Q` for the title, three `SkeletonBlock` `Radius=Medium` for the `Stat` row, 5 `SkeletonLine` rows for facts. CTA hidden |
| Empty | Not applicable to the page. Empty regions (no updates, no distributions yet) are removed, not shown empty. Deal not found or unpublished: full `EmptyState` `Tone=default` «هذه الصفقة لم تعد متاحة» with `Button` «تصفح الصفقات» |
| Error | Load failed: `EmptyState` `Tone=error` `Size=Default` «تعذر تحميل الصفقة» + `Button` «إعادة المحاولة». Partial failure (calculator only): `Alert` `Tone=warning` `Style=Outlined` inside that region |
| Success | Returning after investing: one `Toast` `Tone=success` naming the deal and amount; status badge becomes `Confirmed`/`Reserved` |
| Disabled | Fully funded or closed: CTA becomes `Button` `State=disabled` with label «اكتمل التمويل», or is replaced by a `Variant=secondary` «نبهني بصفقات مشابهة». Qualified-only deal for a retail user: CTA disabled + one `Form Field Helper` `Tone=info` line «متاحة للمستثمرين المؤهلين» with a `Link` to the qualification route |

## Copy
| Slot | Arabic | English |
|---|---|---|
| CTA | «استثمر الآن» | "Invest now" |
| Return label | «نسبة العائد المتوقع» | "Expected return" |
| Term | «مدة الاستثمار» | "Term" |
| Minimum | «الحد الأدنى للاستثمار» `1,000 ر.س` | "Minimum investment" `1,000 SAR` |
| Payout date | «متوقع ~7 يناير 2027» | "Expected ~7 January 2027" |
| Closed | «مغلقة بنجاح» | "Closed successfully" |
| Risk line | «الاستثمار ينطوي على مخاطر، وقد تخسر جزءاً من رأس المال.» | "Investing carries risk; you may lose part of your capital." |

## Compliance notes
- Returns are expected («متوقع»), never guaranteed, and never rounded up: show the exact rate with one decimal. Confirm with Compliance.
- `ShariaDisclosure` and `ComplianceBadge` are legal claims: exact wording from Legal/Sharia, each «إعرف أكثر» wired to the real approval or licence. Never mock a seal.
- Fees: net return is the headline; state that the platform fee (with VAT) is taken from profit and show net next to gross before the CTA. Confirm wording with Compliance.
- Qualified-only deals: hide the qualified badge and qualified terms from retail users; do not market qualified-only deals to retail.
- Never say «مناسبة لك» / "recommended for you" (CMA). Use behavioural wording («لأنها تشبه استثمارك في ...»).
- Use «الربح» not «فائدة»; «المطور العقاري» not «المقترض»; list the three guarantees, never «ضمانات» alone.

## Accessibility notes
- Hero overlay buttons (back, share, favourite) need 48x48 hit areas and labels («رجوع», «مشاركة», «حفظ»). The photo carousel announces «صورة 1 من 5».
- Read `Stat` as one phrase: label then value («نسبة العائد المتوقع، 8.5 بالمئة»). Decorative icons hidden.
- `Guarantees` bar and `ProgressBar` need a text alternative with the number. `DealTimeline` reads each stage with its state («مكتملة», «جارية», «قادمة»).
- Sticky footer must not cover focused content; scroll the focused element above it.
- Brand green text (amounts, links, selected labels) uses `text/brand/primary` as built; never body paragraphs in green.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Fundrise | Facts grouped under plain headings, risk language near the CTA |
| Arrived | Property hero then numbers then timeline; one invest button that stays reachable |
| Manafa / Sukuk (Saudi) | Arabic term sheets with expected return, term and guarantee summary up front |
| CrowdStreet | Sponsor (developer) block as its own card with track record |

## Anti-patterns
- Six `Stat` tiles in a grid. Use 2-3 `Stat`, the rest `KeyValue`.
- A countdown or a scarcity count without a real deadline or live number.
- Compliance text at 9px at the very bottom after the footer.
- A different desktop layout (breadcrumbs, ghost buttons) instead of `Base card` `Platform=Web`.
- Showing the CTA as enabled for a deal the user cannot invest in.
- Lifecycle shown with a `StatusPill` instead of `IssuanceStatusBadge (Investor)`.
- `DealTimeline` with two active stages or amounts on every row.

## Sources
- `knowledge/components/header-card.md` (Base card 3384:9012), `tier-badge.md` (dealTags 3023:39526), `stat.md`, `key-value.md`, `deal-timeline.md` (3663:2618), `guarantees.md` (3861:1216), `sharia-cma-disclosure.md` (3673:2408, 3681:2658), `investment-calculator.md`, `status-issuance-badge.md`, `progress-bar.md`, `news-card.md`.
- Image: `knowledge/examples/components/header-card/reference.png`.
- Payout window rule: Linear SAF-2937 (maturity + 15 days, single approximate date).
- Distribution schedule study: Notion `3e81a53e-1a6b-814d-8f0c-e5ff69fd730b`.
- Copy rules: `knowledge/content/voice-tone.md`, `numbers-currency.md`.
