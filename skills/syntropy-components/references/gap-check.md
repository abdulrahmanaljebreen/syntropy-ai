# Gap check: when nothing fits

What to do when no Syntropy component matches a need, or when someone asks for a component that does not exist ("make a FancyCard", "add a Chip", "we need a Toggle"). It follows the contribution rules of the Syntropy library: check it does not exist, compose from atoms first, and only then propose something new to the design team.

## Rules
1. Never invent a component, a variant value or a property, and never describe a composition as if it were a library component.
   Why: an invented name has no Figma source and no Flutter widget; it spreads through specs and breaks the design to code contract.
2. Run the three questions in order and stop at the first one that resolves the need.
   Why: most "missing" components already exist under another name, or are a composition of existing parts.
3. Tell the person the result in plain words: what exists, what you composed, what is truly missing.
   Why: the person decides what to do next; they need the facts.
4. Propose new components only to the design team, with evidence; never add them to the library yourself.
   Why: Syntropy is a shared, published library and the design to Flutter contract; changes ripple to every screen.

## The three questions
### 1. Does it already exist?
- Search `references/catalog.md` (names and descriptions), then `references/data/components-descriptions.json` (`useWhen`) for the job, not the word. "Chip" finds `Tag`, `Tag Removable`, `RegionChip`, `StatusPill`, `Segment`. "Toggle" finds `Switch`, `SegmentedControl_2`. "Card" finds 10 or more card organisms.
- Check `references/confusables.md` for the family.
- Check variants: the need may be a value of an existing set (`Alert` `Style=Outlined`, `CardDeal` `State=Closed`, `AppBar` `Type=Close Icon-Black`, `EmptyState` `Tone=search`).
- Check booleans and slots: `BottomSheet` Content swap, `ListItem` `Has value`, `Content` `Show metadata`.
- Found → use it, with exact name and values. If it is unpublished → `unpublished.md`.

### 2. Can it be composed from existing atoms and molecules?
- List the parts the need is made of, bottom up (atoms → molecules → organism), and map each to an existing component.
- Use documented containers for layout: `ActionList`, `List`, `SelectionList`, `Section`, `Carousel`, `ScrollContainer`, `BottomSheet` Content, `Modal`, `Drawer`, `Form Field`, `ButtonGroup`, `Tag Group`.
- Present it as "a composition of X, Y, Z", never as a new named component.
- Every part must still respect its own Don't use when (a `StatusPill` cannot become a button because you composed it).
- Composed → answer with the slot list. Note: compositions are fine for one-off screens; repeated compositions are the signal for question 3.

### 3. Is it reusable on 3 or more screens?
- Count real screens or flows that need the same thing (not hypothetical ones).
- Fewer than 3 → keep it a composition on those screens, documented in the spec.
- 3 or more, and composition is awkward (needs states, both directions, a11y behaviour the parts do not provide) → propose a new component to the design team.

## How to propose a new component
Send this to the design team (Syntropy contribution process: Propose → Decompose → Build with tokens → Variants and properties → Add RTL → Move to its page → Document → Audit and publish):

```
Proposal: <PascalCase name, e.g. DealCompareCard>
Need (job): <one line, the user's job>
Why existing components do not fit: <the closest components and why each fails, citing their Don't use when>
Screens that need it (3 or more): <screen names or Figma links>
Decomposition: atoms <existing atoms reused> → molecules <...> → organism <name>
Variants and properties: <Variant / State / Size values in Title Case matching what renders; booleans; instance swaps>
Directions: LTR and RTL, mirrored (not flipped)
States: default, hover, pressed, focused, disabled, loading, empty, error as relevant
Tokens: semantic only (bg/*, text/*, border/*, icon/*, space/*, radius/*)
Accessibility: role, label, focus order, 48pt touch target in the app, contrast pairs
Compliance: any money, disclosure or urgency concerns
Family and page: <02 Actions ... 08 Safqah-Specific>
```

Until the component exists: use the composition from question 2, label it "composition, not a library component" in the spec, and do not give it a component-looking name in code (no `FancyCard` class pretending to be Syntropy).

## Copy from the Syntropy file
When a component exists but is unpublished (`unpublished.md`) and another Figma file needs it, give the copy link:
```
<exact name> (<variants>): copy an instance from https://www.figma.com/design/a7Z956YZy9n6f9uz5DK16Y?node-id=<id with - instead of :> and paste it here. Do not detach.
```

## Examples
| Request | Gap check result | Answer |
|---|---|---|
| «أبي FancyCard للصفقات» / "Create a FancyCard for deals" | Q1: `CardDeal` exists (`Layout=Hero` / `Row`, four States, booleans for media, status, highlights, ROI) | Use `CardDeal`. If something specific is missing (for example a comparison of two deals), say which part, compose it (`Reinvest / RecommendationCard` pattern, `KeyValue`, `Stat`), and offer the proposal template |
| "Add a Chip for sector" | Q1: `Tag` | `Tag` `Tone=neutral` `Style=subtle` (unpublished standalone; nested in `Tag Group`) |
| "We need a Toggle button group for Monthly / Yearly" | Q1: `SegmentedControl_2` | `SegmentedControl_2` `Style=pill-thumb` |
| "A rating with stars after support chat" | Q1: `RatingScale` is NPS 0 to 10 only, its guide says stars are the wrong use. Q2: no star atom exists. Q3: count screens | Tell the person there is no star rating in Syntropy; offer `RatingScale` if NPS fits, else a `SelectionList` or `Radio Group` of satisfaction levels as a composition; propose a component only with 3 or more screens |
| "A countdown that restarts every time the user opens the deal" | Not a gap: a compliance violation | Refuse the reset; `Countdown` only for a real server expiry |
| "A big hero with deal photo for the deal page" | Q1: `Base card` (HeaderCard page, unpublished) | Use `Base card`; in another Figma file copy it from the Syntropy file |

## Sources
- Syntropy Contributing guide (Figma page 69:877): golden rules, adding a new component, naming conventions, definition of done
- `references/data/components-descriptions.json`
