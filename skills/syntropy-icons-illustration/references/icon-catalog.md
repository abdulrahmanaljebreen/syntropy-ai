# Icon catalog

Every icon in the Syntropy Icons library, by category, generated from `data/icons.json` (636 icons, 292 published, 602 on the 24 px grid, 34 on the 12 px grid). Open this to browse what exists before choosing an icon; use `scripts/search-icon.mjs` to search by meaning in English or Arabic.

## How to read this file
- `slug`: the component is named `Icon / slug` (for example `Icon / wallet`).
- `slug` with `@12`: drawn on the 12 px grid (small Core UI glyphs).
- `○ slug`: exists in the icon file but is **not published** to the library. Use it freely; in another Figma file copy it from the Icons file instead of the Assets panel.
- Regenerate this file when `data/icons.json` changes; do not edit the lists by hand.

## Rules
1. Pick the best icon, published or not. Name the exact component (`Icon / money-out`).
   Why: the repo reads the Icons file directly; publishing only controls the Assets panel in other files.
2. If no icon in this catalog fits, say the concept is not in the library and propose the closest icon or a text label. Never pull from another icon family into the same screen.
   Why: mixed stroke styles break the Streamline Sharp Line look.

## Summary
| Category | Total | Published | Unpublished |
|---|---|---|---|
| Core UI | 62 | 39 | 23 |
| Status & Feedback | 32 | 21 | 11 |
| People & Identity | 21 | 15 | 6 |
| Navigation & Wayfinding | 27 | 17 | 10 |
| Time & Calendar | 17 | 15 | 2 |
| Files & Data | 29 | 16 | 13 |
| Visibility & Security | 25 | 13 | 12 |
| Financial / Fintech | 86 | 40 | 46 |
| Notifications & Social | 26 | 15 | 11 |
| Communication | 23 | 20 | 3 |
| Devices & Tech | 22 | 15 | 7 |
| Places & Travel | 59 | 15 | 44 |
| Media & Content | 37 | 17 | 20 |
| Commerce & Shopping | 29 | 16 | 13 |
| Misc Utility | 141 | 18 | 123 |

## Core UI
Published (39): `plus` @12, `minus` @12, `x` @12, `check` @12, `chevron-down` @12, `chevron-up` @12, `chevron-left` @12, `chevron-right` @12, `arrow-left` @12, `arrow-right` @12, `menu` @12, `search` @12, `filter` @12, `settings` @12, `more-horizontal` @12, `copy-paste` @12, `trash` @12, `delete-permanent` @12, `delete-sweep` @12, `highlighter` @12, `upload` @12, `upload-square` @12, `upload-tray` @12, `download` @12, `export` @12, `import` @12, `arrow-up` @12, `arrow-down` @12, `arrow-diagonal-up-right` @12, `arrow-diagonal-up-left` @12, `expand-vertical` @12, `expand-horizontal` @12, `sync` @12, `reload` @12, `target-check`, `settings-2`, `arrow-left-2`, `arrow-right-2`, `lab-flask`

Not published (23): ○ `grid-view`, ○ `list-view`, ○ `gallery-view`, ○ `sliders`, ○ `cog`, ○ `toggle`, ○ `power-button`, ○ `bookmark`, ○ `bookmark-add`, ○ `search-settings`, ○ `move-right`, ○ `move-left`, ○ `move-all`, ○ `sort-alpha`, ○ `reorder`, ○ `maximize`, ○ `expand`, ○ `compress`, ○ `zoom-out`, ○ `search-off`, ○ `zoom-in`, ○ `arrow-head-up`, ○ `arrow-head-down`

## Status & Feedback
Published (21): `check-circle`, `alert-triangle`, `info`, `defaulted`, `clock`, `help-circle`, `help-square`, `help-chat`, `faq`, `alert-circle`, `alert-square`, `shield-check`, `badge`, `loading-circle`, `loader-spinner`, `gauge`, `check-thick`, `user-verified`, `audit-checklist`, `dangerous`, `light-bulb`

Not published (11): ○ `check-double`, ○ `clipboard-check`, ○ `check-square`, ○ `medal`, ○ `trophy`, ○ `summit`, ○ `star-half`, ○ `loading-spinner`, ○ `ribbon`, ○ `crown`, ○ `lifebuoy`

## People & Identity
Published (15): `user`, `users-group`, `user-team`, `users-group-solo`, `user-switch`, `user-single`, `user-square`, `user-circle`, `user-male`, `user-head-side`, `user-profile-focus`, `id-card`, `users-circle`, `supervisor`, `team-collaborate`

Not published (6): ○ `passport`, ○ `face-id`, ○ `user-add`, ○ `user-info`, ○ `profile-circle`, ○ `graduation-cap`

## Navigation & Wayfinding
Published (17): `home`, `home-smile`, `home-menu`, `home-window`, `dashboard`, `dashboard-3`, `dashboard-square-three`, `dashboard-circle`, `dashboard-split-h`, `dashboard-split-v`, `sidebar-right`, `bottom-panel`, `top-bar`, `sidebar-left`, `new-window`, `forward`, `step-forward`

Not published (10): ○ `enter`, ○ `arrow-square-right`, ○ `page-first`, ○ `chevrons-right`, ○ `chevrons-left`, ○ `arrow-up-right`, ○ `arrow-down-right`, ○ `arrow-down-left`, ○ `arrow-up-left`, ○ `compass`

## Time & Calendar
Published (15): `calendar`, `hourglass`, `clock-important`, `timer-auto`, `alarm-clock`, `calendar-event`, `notepad-add`, `notepad-remove`, `time-zones`, `stopwatch`, `timer-pause`, `calendar-add`, `calendar-check`, `calendar-schedule`, `calendar-edit`

Not published (2): ○ `loading`, ○ `calendar-star`

## Files & Data
Published (16): `files-and-folders`, `file-folder`, `mac-folder`, `open-folder`, `pdf-add`, `pdf-compress`, `pdf-rotate`, `archive-box`, `local-storage`, `file-report`, `text-file`, `file-doc`, `file-remove`, `file-bookmark`, `multiple-files`, `header-footer`

Not published (13): ○ `pivot-table`, ○ `folder-upload`, ○ `file-cloud-backup`, ○ `cloud-sync`, ○ `doc-history`, ○ `notepad-list`, ○ `folder-copy`, ○ `file-check`, ○ `certificate`, ○ `fill-sign`, ○ `passport-book`, ○ `diploma`, ○ `floppy-disk`

## Visibility & Security
Published (13): `eye`, `lock`, `padlock-shield`, `padlock-square`, `padlock-circle`, `keyhole-lock`, `fingerprint`, `key`, `correct-password`, `face-scan`, `shield-security`, `eye-off`, `private-mode`

Not published (12): ○ `key-access`, ○ `padlock-square-2`, ○ `file-lock`, ○ `db-encryption`, ○ `passkey`, ○ `search-verified`, ○ `fingerprint-scan`, ○ `padlock-key`, ○ `smart-key`, ○ `lock-off`, ○ `keyhole-shield`, ○ `lock-shield`

## Financial / Fintech
Published (40): `wallet`, `credit-card`, `trending-up`, `trending-down`, `building`, `percent`, `file-dollar`, `bag-dollar`, `briefcase-dollar`, `share-money-dollar`, `bill-stack`, `bill`, `transaction-recurring`, `transaction-refund`, `cash-network`, `cashing-check`, `chart-analytics`, `chart-area`, `chart-monitoring`, `calculator`, `cash-money`, `coin`, `coins-stack`, `dollar-coin`, `deposit-box`, `share-coin`, `graph-line`, `donut-graph`, `credit-card-3`, `analytics-graph-net`, `contract-sign`, `license-doc`, `signature`, `bank`, `money-in`, `money-out`, `swap`, `riyal`, `safqah-deal`, `wallet-2`

Not published (46): ○ `financial-statement`, ○ `mobile-payment`, ○ `receipt-2`, ○ `pie-chart-investment`, ○ `pie-chart`, ○ `portfolio`, ○ `payment-history`, ○ `bar-chart`, ○ `bar-chart-horizontal`, ○ `scatter-plot`, ○ `nda-contract`, ○ `investing-banking`, ○ `money-transfer`, ○ `subscription`, ○ `safe-vault`, ○ `wallet-cards`, ○ `graph-decrease`, ○ `analytics-board`, ○ `crypto-wallet`, ○ `card-cvv`, ○ `card-alert`, ○ `payment-methods`, ○ `file-invoice`, ○ `coin-percent`, ○ `handshake`, ○ `briefcase-money`, ○ `contracts`, ○ `chart-up`, ○ `chart-rocket`, ○ `coin-give`, ○ `coin-hand`, ○ `money-bag-share`, ○ `percent-tag`, ○ `percent-circle`, ○ `cash`, ○ `swap-off`, ○ `wallet-add`, ○ `wallet-remove`, ○ `card-add`, ○ `property-mortgage`, ○ `transaction-history`, ○ `diamond`, ○ `gold-bar`, ○ `treasure-chest`, ○ `insurance-umbrella`, ○ `ring`

## Notifications & Social
Published (15): `bell`, `heart`, `heart-circle`, `heart-square`, `double-heart`, `bookmark-heart`, `bookmark-star`, `dislike-circle`, `dislike-square`, `bell-ringing`, `share`, `share-circle`, `star`, `star-circle`, `star-square`

Not published (11): ○ `reply`, ○ `thread`, ○ `comment-send`, ○ `mention-at`, ○ `hashtag`, ○ `bell-badge`, ○ `bell-edit`, ○ `bell-snooze`, ○ `bell-timer`, ○ `thumbs-up`, ○ `thumbs-down`

## Communication
Published (20): `phone`, `phone-call`, `phone-circle`, `phone-ringing`, `voice-mail`, `outgoing-call`, `incoming-call`, `missed-call`, `remove-call`, `call-alert`, `mail-send`, `mail-solo`, `mail-add`, `inbox-favorite`, `chat-bubble-square`, `chat-bubble-typing`, `chat-bubble-text`, `chat-bubble-add`, `chat-bubble-delete`, `reply-typing`

Not published (3): ○ `support-agent`, ○ `call-pause`, ○ `mail-reply`

## Devices & Tech
Published (15): `hard-drive`, `computer-pc`, `desktop`, `desktop-warning`, `desktop-share`, `desktop-settings`, `screen`, `ipad-tablet`, `screensaver`, `light-dark-mode`, `mobile-phone`, `phone-lock`, `printer`, `headphones`, `headset`

Not published (7): ○ `smartwatch`, ○ `multi-device`, ○ `mouse`, ○ `hard-disk-2`, ○ `wifi`, ○ `watch`, ○ `router`

## Places & Travel
Published (15): `house-family`, `location-pin`, `location-pin-2`, `location-pin-disabled`, `location-pin-favorite`, `location-pin-share`, `sync-location`, `map-location`, `navigation-arrow`, `pins-distance`, `pin-area`, `location-circle`, `car`, `plane`, `bus`

Not published (44): ○ `office-building`, ○ `city-hall`, ○ `building-2`, ○ `house-key`, ○ `building-3`, ○ `truck-delivery`, ○ `car-electric`, ○ `real-estate`, ○ `building-office`, ○ `factory`, ○ `retail-mall`, ○ `hospital`, ○ `greenhouse`, ○ `school`, ○ `shipping-container`, ○ `hotel-bed`, ○ `serving-dome`, ○ `stadium`, ○ `ferris-wheel`, ○ `ambulance`, ○ `motorcycle`, ○ `airplane`, ○ `helicopter`, ○ `ship`, ○ `hot-air-balloon`, ○ `palm-tree`, ○ `tent`, ○ `beach`, ○ `suitcase`, ○ `train`, ○ `taxi`, ○ `police-car`, ○ `capitol`, ○ `beach-umbrella`, ○ `mine-cart`, ○ `lighthouse`, ○ `anchor`, ○ `sail-ship`, ○ `bridge`, ○ `water-fountain`, ○ `warehouse`, ○ `camping-tent`, ○ `scooter`, ○ `airship`

## Media & Content
Published (17): `landscape-frame`, `orientation-landscape`, `orientation-portrait`, `landscape-nft`, `portrait-view`, `image-circle`, `landscape`, `edit-image`, `landscape-view`, `play-pause`, `button-pause`, `play-disable`, `auto-stop`, `landscape-lock`, `painting-board`, `camera-square`, `video-subtitles`

Not published (20): ○ `music-note`, ○ `text-bold`, ○ `text-underline`, ○ `translate`, ○ `repeat`, ○ `play`, ○ `pause`, ○ `skip-next`, ○ `soccer-ball`, ○ `guitar`, ○ `basketball-hoop`, ○ `tennis`, ○ `football`, ○ `piano-keys`, ○ `drum`, ○ `paint-palette`, ○ `balloon`, ○ `lyre`, ○ `typewriter`, ○ `feather-pen`

## Commerce & Shopping
Published (16): `shopping-basket`, `shopping-basket-add`, `shopping-basket-remove`, `shopping-basket-check`, `shopping-cart`, `shopping-cart-check`, `shopping-cart-cross`, `shopping-cart-heavy`, `store`, `store-2`, `store-computer`, `tag-new`, `tag-free`, `tag-label`, `discount-square`, `receipt`

Not published (13): ○ `gift-card`, ○ `coupon`, ○ `ticket`, ○ `cart-check`, ○ `cart-add`, ○ `barcode`, ○ `necklace`, ○ `cashier-machine`, ○ `shirt`, ○ `dress`, ○ `backpack`, ○ `sneakers`, ○ `cap`

## Misc Utility
Published (18): `wifi-checked`, `wifi-disconnect`, `signal-5g`, `signal-4g`, `sun-cloud`, `moon-cloud`, `cloud`, `wind-cloud`, `snow-cloud`, `fog-cloud`, `rating`, `qr-code`, `barcode-scanner`, `link-chain`, `link-broken`, `paperclip`, `globe`, `stamp`

Not published (123): ○ `pencil-edit`, ○ `pencil-square`, ○ `paintbrush`, ○ `color-swatches`, ○ `partly-cloudy`, ○ `solar-panel`, ○ `power-bolt`, ○ `heart-rate`, ○ `forklift`, ○ `signal-tower`, ○ `satellite-dish`, ○ `crane`, ○ `water-tap`, ○ `hydro-energy`, ○ `gas-station`, ○ `wind-turbine`, ○ `hammer`, ○ `screwdriver`, ○ `tree`, ○ `potted-plant`, ○ `flower`, ○ `chair`, ○ `sofa`, ○ `desk`, ○ `burger`, ○ `coffee-mug`, ○ `pizza`, ○ `pill`, ○ `stethoscope`, ○ `medicine-bottle`, ○ `rain-cloud`, ○ `umbrella`, ○ `lightning-cloud`, ○ `test-tube`, ○ `microscope`, ○ `dna`, ○ `flask`, ○ `dog`, ○ `cat`, ○ `binoculars`, ○ `power-drill`, ○ `toolbox`, ○ `wrench`, ○ `dumbbell`, ○ `volcano`, ○ `desert`, ○ `egg`, ○ `soft-drink-can`, ○ `fork-knife`, ○ `teapot`, ○ `knife`, ○ `paint-bucket`, ○ `ladder`, ○ `paint-roller`, ○ `wheelchair`, ○ `bandage`, ○ `walker`, ○ `satellite`, ○ `planet`, ○ `telescope`, ○ `rocket`, ○ `tidal-wave`, ○ `pipeline`, ○ `conveyor-belt`, ○ `propane-tank`, ○ `stroller`, ○ `cake-slice`, ○ `hurricane`, ○ `snowflake`, ○ `rainbow-cloud`, ○ `dam`, ○ `windmill`, ○ `wind-energy`, ○ `grape`, ○ `banana`, ○ `carrot`, ○ `sandwich`, ○ `magnet`, ○ `candle`, ○ `skull`, ○ `ghost`, ○ `cake`, ○ `rabbit`, ○ `bird`, ○ `tooth`, ○ `brain`, ○ `clover`, ○ `rose`, ○ `scissors`, ○ `liquid-glue`, ○ `measuring-tape`, ○ `petri-dish`, ○ `erlenmeyer-flask`, ○ `microwave`, ○ `blender`, ○ `toaster`, ○ `oven`, ○ `heater`, ○ `flashlight`, ○ `golf`, ○ `baseball`, ○ `comet`, ○ `astronaut`, ○ `galaxy`, ○ `broom`, ○ `gas-canister`, ○ `popcorn`, ○ `ice-cream`, ○ `cupcake`, ○ `rice-bowl`, ○ `candy`, ○ `table-lamp`, ○ `dressing-table`, ○ `workspace-desk`, ○ `hiking`, ○ `snowboarding`, ○ `card-game-diamond`, ○ `clubs-symbol`, ○ `dice`, ○ `watchtower-castle`, ○ `spades-symbol`, ○ `hearts-symbol`, ○ `poker-chip`

## Sources
- `data/icons.json` (Syntropy Icons Figma file DDI9ObV7rOP82XQ3OJzogv, last modified 2026-10-05).
