# Reference images

How to see what a Syntropy component looks like before you choose it or describe it. Names such as `Base card`, `Header`, `illustrations` or `Content` do not describe the visual; look first when the look matters or you are unsure.

## Rules
1. Open the page reference image before recommending a component whose look you cannot describe from its guide.
   Why: a wrong mental picture produces a wrong pick (for example `ActionTile` vs `CardInfo`).
2. Treat images as the visual truth and the index as the naming truth: read variant values from `references/data/components-index.json`, never from text in a screenshot.
   Why: labels in reference frames are for humans and can be shortened.
3. Never paste or trace an image into a design; instance the component.
   Why: an image of a component is not the component.

## What ships with this skill
- One labelled matrix per page: `references/data/examples/<page-slug>/reference.png` (every variant of the page, labelled). The slug is in `references/catalog.md` (for example `button`, `card-info`, `bottom-sheet`, `issuance-row`).
- Open it with the Read tool (it renders PNGs): `references/data/examples/card-info/reference.png`.
- 72 of 85 pages have one. These 13 pages have no page reference image: `amount-input`, `card-deal`, `card-goal`, `chart`, `date-picker-time-picker`, `goal-tracker`, `payouts-list`, `portfolio-header`, `search`, `sharia-cma-disclosure`, `switch`, `tag`, `text-area`.

## Per-component images
- Each page guide (`references/data/components/<page>.md`) has a table "Components on this page" with an "Example image" column, for example `knowledge/examples/components/card-deal/card-deal.png`.
- Those per-component PNGs live in the full Syntropy for AI knowledge base, not inside this skill. When that repository is available, open the path as written. When it is not, use the Figma route below.

## Figma route (any component, always current)
- File key `a7Z956YZy9n6f9uz5DK16Y` (the Syntropy design system file). Read design system pages only.
- With the Figma MCP, call `get_screenshot` on:
  - the component or set id (`id` in the index, for example `3013:95390` for `CardDeal`), or
  - `frames.reference` (labelled matrix) or `frames.container` from the index entry (for example `CardDeal` container `3034:48946`).
- URL form for a person: `https://www.figma.com/design/a7Z956YZy9n6f9uz5DK16Y?node-id=3013-95390` (replace `:` with `-`).
- Load the Figma skills the server requires before calling its tools (see syntropy-figma).

## Reading a reference matrix
- Rows and columns are labelled with the variant property and value (`State=Reserved`, `Direction=RTL`).
- RTL variants mirror layout and icons; numbers stay Western and charts keep time left to right.
- Look for the part you need (status pill, chevron, divider) and confirm in the guide which boolean shows it.

## Sources
- Generated examples: `references/data/examples/*/reference.png` (from the Syntropy knowledge base examples index)
- Component index `frames` field: `references/data/components-index.json`
