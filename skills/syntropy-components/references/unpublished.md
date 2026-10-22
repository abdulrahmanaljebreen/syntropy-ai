# Components not in the published library

64 component sets and 5 standalone components exist in the Syntropy file but are not published to the Figma library. Safqah works without publishing them: the repo reads the Syntropy file directly every night, so every one of them is fully known here (names, variants, tokens, guides, images). Publishing only decides whether a designer can insert a component from the Assets panel in another Figma file. Open this file whenever `published` is `false` and the output is a Figma file other than the Syntropy file.

## Where publishing matters
- **Code, specs, reviews, copy, research, explanations:** it does not. Use the component by its exact name and say nothing about publishing.
- **Inside the Syntropy Figma file** (`a7Z956YZy9n6f9uz5DK16Y`): it does not. Instance the local set by node id (see syntropy-figma).
- **In any other Figma file:** the component cannot be inserted from the Assets panel. Use the route in the table below.

## Rules
1. Recommend the right component by its exact name, whatever its library state.
   Why: the need does not change because a set is unpublished.
2. In another Figma file, take the published route when one gives the same result: a published parent that nests it, or the published atoms it is made of.
   Why: published parts receive library updates.
3. When there is no published route, the designer copies an instance from the Syntropy file and pastes it into their file. Give the exact link: `https://www.figma.com/design/a7Z956YZy9n6f9uz5DK16Y?node-id=<id with - instead of :>`. Never detach it.
   Why: a copied instance keeps the real component; a detached or redrawn copy drifts.
4. An agent building in another Figma file through the Figma MCP cannot copy across files. It places the published route, or, when none exists, an empty frame at the component's size named exactly `<Component> · <Variant=value, ...>`, and lists the copy links in the handoff so the designer swaps them in.
   Why: the placeholder is honest and takes seconds to replace; a look-alike is not.
5. Never rebuild an unpublished component as a look-alike. Never place hidden (`_`) or `wip` components in new work.
   Why: look-alikes never receive fixes; hidden and wip sets are internal or unstable.

## Actions and inputs (02, 03)
| Component | Id | Published route or action |
|---|---|---|
| `Link` | 516:2 | No published twin. In Figma outside the file: copy from the Syntropy file; do not swap in `Button` `Variant=text` for navigation. In code: Link |
| `SocialButton` | 805:249 | Copy from the Syntropy file. Never fake it with `Button` plus a logo |
| `Input` | 828:705 | Compose published atoms in order: `Input Label` + `Input Field` + `Input Helper Text`; also nested in `Sheet Content / Form` and `KYCStep` |
| `Input Underline` | 859:2214 | `Input Label` + `Input Underline Field` + `Input Helper Text` |
| `Input Phone` | 878:2355 | `Input Label` + `Input Phone Value` + `Input Helper Text` |
| `OTP Input` | 923:77 | No published twin: copy from the Syntropy file |
| `Input Amount` | 952:636 | `Input Label` + `Input Amount Value` + `Input Helper Text`; nested in `Sheet Content / Amount`; fixed steps `Amount Stepper` (published) |
| `Select` | 1024:183 | `Input Label` + `Select Value` + `Input Helper Text`, open state `Dropdown Menu` of `Dropdown Item`; long lists `Combobox Field` (published) |
| `Select Underline` | 1065:1128 | Same parts as `Select` with underline chrome; or copy from the Syntropy file |
| `Radio Group` | 1086:177 | `Input Label` + `Radio` items + `Input Helper Text`; rich rows `SelectionList` (published) |
| `Slider Field` | 1121:225 | `Input Label` + `Slider` + `Input Helper Text` |
| `Form Field Label` | 1169:63 | `Input Label` for simple labels; copy from the Syntropy file when the tooltip variant is needed |
| `Form Field` | 1177:453 | `Input Label` + control + `Form Field Helper` |
| `Search Input` | 1241:63 | Nested in `Search Dropdown`, `Table / Toolbar`, `AppSidebar (shadcn-style)`; header trigger `Compact Search Trigger` |
| `TextArea` | 1285:311 | `Input Label` + `TextArea Field` + `Input Helper Text` |

## Data display (04)
| Component | Id | Published route or action |
|---|---|---|
| `Tag` | 1306:63 | Nested in `Tag Group`, `CardDeal`, `Table / Cell` `Type=Tag`, `Keypad / Presets`. Standalone: copy from the Syntropy file. Never substitute `StatusPill` for a category |
| `Tag Removable` | 1311:63 | Nested in `Tag Group` and `Table / Toolbar` |
| `Badge Count` | 1324:63 | Nested in `TabBar` items and `NavRailItem` (`Show badge`); `Badge Dot` is published |

## Navigation (06)
| Component | Id | Published route or action |
|---|---|---|
| `AppBar` | 2447:2 | Home with returns: `Header Info` (published). Otherwise copy from the Syntropy file; parts `BackButton`, `IconButton` are published. Never build a custom bar |
| `Header` | 4844:107612 | Product source part; prefer `AppBar` `Type=main screens`, `Header Info` or `PortfolioHeader` |
| `NavigationRail` | 2855:175 | `AppSidebar (shadcn-style)` (published) |

## Cards (07)
| Component | Id | Published route or action |
|---|---|---|
| `Base card` (HeaderCard) | 3384:9012 | No published twin for the deal page hero: copy it from the Syntropy file. Never use `CardDeal` as a page hero |
| `NewsCard / Poster` | 5293:963 | `NewsCard` `Style=Media` (published) for a photo update |
| `NewsCard / Poster Carousel` | 5293:1456 | `NewsCard` list, or copy from the Syntropy file |
| `NewsCard / Poster Caption` | 5292:822 | Part of Poster |
| `NewsCard / Poster Actions` | 5292:170000 | Part of Poster |
| `NewsCard / Developer Logo` (standalone) | 5291:746 | Part of Poster Caption |
| `NewsCard / Poster Media` (standalone) | 5291:786 | Part of Poster |

## Safqah-specific (08)
| Component | Id | Published route or action |
|---|---|---|
| `_ROI` (hidden) | 3442:5756 | Internal part of the legacy calculator: never place. Use `Investment Calculator` or `MoneyAmount` |
| `_Gross-profit` (hidden) | 3442:6279 | Same: internal |
| `_Net-profit` (hidden) | 3442:6600 | Same: internal |
| `Calculator / Info label` | 5994:5888 | Calculator v2 part |
| `Calculator / Stat tile` | 5994:5949 | Calculator v2 part |
| `Calculator / Duration option` | 5994:5976 | Calculator v2 part |
| `Calculator / Swipe arrow` | 5994:6001 | Calculator v2 part |
| `Calculator / Funded label` | 5994:6008 | Calculator v2 part; elsewhere funded share is `ProgressBar` |
| `Calculator / Disclosure toggle` | 5994:6041 | Calculator v2 part |
| `Calculator / Date tile` | 5994:6048 | Calculator v2 part |
| `Calculator / Metric row` | 5996:5988 | Calculator v2 part; generic rows `KeyValue` |
| `Calculator / Stat strip` | 5996:6083 | Calculator v2 part |
| `Calculator / Duration carousel` | 5996:6300 | Calculator v2 part |
| `Calculator / Amount display` | 5996:6364 | Calculator v2 part |
| `Calculator / Installment row` | 5996:6441 | Calculator v2 part |
| `Calculator / Distributions header` | 5996:6558 | Calculator v2 part |
| `Calculator / Distributions accordion` | 5996:6893 | Calculator v2 part |
| `Calculator / Duration picker` | 5998:6718 | Calculator v2 step 1. Published fallback for retail: `Investment Calculator` |
| `Calculator / Amount card` | 5998:7155 | Calculator v2 step 2 |
| `Calculator / Results card` | 5998:7821 | Calculator v2 step 3 |
| `Calculator / Underline option` | 6102:9914 | Underline picker part |
| `Calculator / Underline carousel` | 6102:10044 | Underline picker part |
| `Calculator / Duration picker · Underline` | 6102:10234 | Underline step 1 |
| `UserGreeting` | 4241:1280 | Nested in `PortfolioHeader` (published) |
| `QualifiedCalculator` | 3839:2910 | Header part `QualifiedCalculator Header` is published; newer flow `Keypad / Amount input` is also unpublished: copy from the Syntropy file |
| `Sheet Content / Amount keypad` (standalone) | 5548:94341 | Keypad inside a `BottomSheet`; published alternative `Sheet Content / Amount` |
| `Keypad / Hint` | 6035:901 | Keypad part |
| `Keypad / Title row` | 6035:976 | Keypad part (`WalletChip` inside is published) |
| `Keypad / Summary row` | 6035:1065 | Keypad part |
| `Keypad / Summary card` | 6035:1171 | Keypad part |
| `Keypad / Presets` | 6035:1189 | Keypad part |
| `Keypad / Quick action` | 6035:1289 | Keypad part |
| `Keypad / Amount hero` | 6035:1605 | Keypad part |
| `Keypad / Amount input` | 6036:3480 | Full qualified keypad screen |
| `Reinvest / MatchStat` (standalone) | 6049:3 | Nested in `Reinvest / RecommendationCarousel` (published) |
| `Reinvest / Illustration · Orbit` (standalone) | 5922:245709 | Part of MaturityRecap |
| `Reinvest / RecommendationRow` | 6049:298 | Nested in `Reinvest / RecommendationList` (published) |
| `Reinvest / RecommendationCard` | 6049:299 | Nested in `Reinvest / RecommendationCarousel` (published) |
| `Reinvest / MaturityRecap` | 6054:1667 | No published twin: copy from the Syntropy file |
| `Reinvest / ComparedTo` | 6255:7960 | Nested in `Reinvest / RecommendationList` (published) |
| `Goal-Card` (wip) | 3488:48634 | wip page: not for new work |

## How to say it
- «`Input Amount` (غير منشور في مكتبة Syntropy بعد): داخل ملف Syntropy استخدمه مباشرة؛ في الملفات الأخرى ركّب `Input Label` و`Input Amount Value` و`Input Helper Text` أو اطلب نشره من فريق التصميم.»
- "`Base card` (3384:9012). In your product file, copy an instance from https://www.figma.com/design/a7Z956YZy9n6f9uz5DK16Y?node-id=3384-9012 and paste it. Do not detach or rebuild it."

## Sources
- `references/data/components-index.json` (`published`, `hidden`, `status`), page guides in `references/data/components/`
