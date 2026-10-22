# Research before designing

How an AI agent researches a Safqah design question with the tools the team uses, then turns what it finds into a Syntropy design without copying anyone. Read this first; each tool has its own deep guide in this folder.

Safqah is a Saudi, Sharia-compliant real-estate investment platform: an Arabic RTL-first mobile app, a web app and a back-office. Every reference you collect must end as Syntropy components, Syntropy tokens, RTL layout and Safqah copy.

## Files in this folder

| File | What it gives you |
|---|---|
| `README.md` | This overview, the decision table and the workflow |
| `lazyweb.md` | Lazyweb MCP: screens, flows, A/B experiments, Agentic Search links, growth scores |
| `refero.md` | Refero MCP: screens, flows, visual styles, apps and sites |
| `mobbin.md` | Mobbin MCP: screens, flows and web sections with images |
| `screensdesign.md` | ScreensDesign: iOS onboarding and paywall flows with revenue context |
| `nicelydone.md` | Nicelydone: SaaS and web-app flows, best for back-office |
| `figma-mcp.md` | Reading Syntropy itself through the Figma MCP server |
| `streamline-lottie.md` | Icons (Syntropy Icons first, Streamline only to propose) and Lottie motion references |
| `browser-only.md` | Sites with no MCP: Page Flows, Growth.design, Baymard, GoodUI, SaaSFrame and more |
| `recipes.md` | 16 step-by-step research recipes for common Safqah tasks |
| `benchmarks.md` | Which apps to study per Safqah topic, Saudi and GCC first |
| `translate-to-syntropy.md` | Turning a reference into a Syntropy design, with 3 worked examples |
| `presenting.md` | How to show references to the person and how to save or share them |

The full link list lives in `knowledge/links/links.json` (categories `research-tools`, `mobile-patterns`, `web-inspiration`, `saudi-investing`, `saudi-banking`, `gcc-investing`, `real-estate-investing`, `global-investing`, `neobanks`, `finance-backoffice`, `arabic-rtl`, `ux-principles`, `regulation`).

## Rules

1. Check Syntropy before the outside world. Search `knowledge/components/index.json` and the Syntropy Figma file (see `figma-mcp.md`) for an existing component or pattern first.
   Why: most Safqah questions are already answered by a component; research is for the gap, not for the obvious.
2. Write the research question in one sentence before calling any tool.
   Why: a vague question returns a vague moodboard and burns quota.
3. Use at most 2 external tools per question.
   Why: a third library rarely adds a new pattern; it adds noise and cost.
4. Collect 5 to 10 references, never more than 12, from at least 3 different apps.
   Why: fewer than 5 is anecdote; more than 12 cannot be compared in one view.
5. Prefer finance and Saudi or GCC apps; take patterns from other industries only for mechanics (a stepper, an upload, a confirmation).
   Why: trust, regulation and Arabic expectations differ outside fintech.
6. Extract patterns, not pixels: name each pattern and say what problem it solves.
   Why: the output is a Syntropy design, not a copy of the reference.
7. Map every element you keep to a Syntropy component and token (see `translate-to-syntropy.md`).
   Why: anything that does not map is either a gap to log or a thing to drop.
8. Never copy logos, brand colors, illustrations, photography or exact copy from a reference.
   Why: legal risk, and it breaks the Safqah brand.
9. Cite every reference with app name, screen or flow link and the tool that found it.
   Why: the person must be able to open the source and judge it.
10. Never start a paid or long-running job (Lazyweb Growth Report, Growth Score generation) unless the person asked for it in their own words.
    Why: these cost credits and take minutes.
11. Never read, cite or describe any work-in-progress area of a Figma file (labs, playgrounds, drafts, pages outside the numbered design system pages).
    Why: only published design system pages are a source of truth for agents.

## Decision table: question to tool

| Your question | First tool | Second tool (optional) | Tool call |
|---|---|---|---|
| How do real apps lay out this one screen? | Mobbin | Refero | `mcp__mobbin__search_screens`, `mcp__refero__refero_search_screens` |
| What are the steps of this journey? | Refero flows | Mobbin flows | `refero_search_flows` then `refero_get_flow`; `mcp__mobbin__search_flows` |
| Which variant won an A/B test? | Lazyweb experiments | Browser: GoodUI | `lazyweb_search_experiments` via `lazyweb_execute` |
| What visual direction fits a marketing page? | Refero styles | Browser: Best Designs On X | `refero_search_styles` then `refero_get_style` |
| How do others build a dense admin table or settings page? | Nicelydone | Refero web screens | Nicelydone MCP; `refero_search_screens` with `platform: "web"` |
| How do onboarding and paywalls convert on iOS? | ScreensDesign | Lazyweb experiments | ScreensDesign MCP |
| Which Syntropy component or token do I use? | Figma MCP | `knowledge/` files | `search_design_system`, `get_design_context` |
| Is there an icon for this? | `knowledge/icons/icons.json` | Streamline (proposal only) | `mcp__claude_ai_Streamline__search_assets` |
| What does research say about forms or checkout? | Browser: Baymard | Browser: GOV.UK Design System | none, open in browser |
| Is this pattern a dark pattern? | Browser: Deceptive Design | NN/g heuristics | none |
| How does this look in Arabic RTL? | Benchmarks in `benchmarks.md` (Al Rajhi, Tamara, Thndr) | Material 3 RTL, Apple HIG RTL | Mobbin with the app name in the query |
| What does the regulator require on this screen? | `regulation` links (SAMA, CMA, PDPL) | Notion research pages | none |
| I have a screenshot and want similar ones | Lazyweb `lazyweb_compare_image` | Refero `refero_get_similar_screens` | see tool guides |

## The workflow

### 1. Frame the question (2 minutes)
Write three lines:
- Question: "How do investment apps confirm a purchase before money moves?"
- Surface and platform: mobile app, iOS first, Arabic RTL.
- Decision it feeds: "Choose between a review screen and a review BottomSheet for the invest flow."

### 2. Check Syntropy (2 minutes)
- Search `knowledge/components/index.json` for names (`BottomSheet`, `Sheet Content / Summary`, `KeyValue`, `Checkout`).
- If a component already fits, stop researching and design with it.

### 3. Pick 2 tools max (1 minute)
Use the decision table. Default pairs:
- Mobile screen: Mobbin + Refero.
- Mobile journey: Refero flows + Mobbin flows.
- Conversion question: Lazyweb experiments + Lazyweb screens.
- Back-office: Nicelydone + Refero web.
- Visual direction: Refero styles + Best Designs On X (browser).

### 4. Collect 5 to 10 references (5 to 10 minutes)
- Write concrete queries: what is literally on the screen ("investment order confirmation with amount summary and confirm button"), not adjectives ("clean fintech").
- Run 2 to 4 queries per tool, then stop.
- For every keeper note: app, link, the one thing it does well.

### 5. Extract patterns (5 minutes)
Group references by approach. For each approach write: pattern name, which apps use it, what problem it solves, risk for Safqah (regulation, RTL, trust).

### 6. Map to Syntropy (5 minutes)
Use `translate-to-syntropy.md`: element to component, color to token, layout flipped to RTL, copy rewritten in Safqah voice. List gaps (no component exists) separately.

### 7. Cite and present (3 minutes)
Use `presenting.md`. Every reference shows image, app, link, why it matters and the Syntropy components it maps to.

## Time-boxing

| Task size | Total research time | Tool calls |
|---|---|---|
| One component or state (an error, an empty state) | 10 minutes | 2 to 4 |
| One screen | 20 minutes | 4 to 8 |
| One flow (5 to 10 screens) | 45 minutes | 8 to 15 |
| New product area or redesign | Half a day, split into several questions | 15 to 25 per question set |

Stop when two new queries in a row return no new pattern.

## When NOT to research

- The answer is a Syntropy component with a documented usage (a `Button` variant, a `Tag` tone). Use it.
- The task is a pure copy fix with a rule in `knowledge/content/`.
- The task is token or spacing alignment inside an existing screen.
- The person gave a reference already and asked you to build from it.
- The person said "no research" or the change is a bug fix.
- Regulation dictates the answer (CMA disclosure text, Sharia statement): read the regulation and the Notion source, not galleries.

## Examples

Do: "Question: how do investing apps confirm a buy before money moves? Tools: Mobbin + Refero. Found 7 references from Acorns, Wise, Wealthfront, Revolut. Pattern A: review BottomSheet over the amount screen (Acorns, Revolut). Pattern B: full review screen with Change links (Wise). Maps to `BottomSheet` + `Sheet Content / Summary` + `KeyValue` + `Button`."

Don't: "I looked at some apps and made it like Revolut, dark with a big number and their keypad." (no question, no citations, copied brand look)

## Sources
- `knowledge/links/links.json` (checked 2026-10-15)
- `knowledge/components/index.json`
- Live MCP schemas loaded on 2026-10-15: Refero, Mobbin, Lazyweb, Figma, Streamline
