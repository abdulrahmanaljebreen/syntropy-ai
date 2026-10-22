# Lookup order

Where to find a fact (component, token, icon, pattern, guideline, link, rule) and what to do when a source is missing. Open this when you are about to state a name, value, limit or rule and are not certain of it.

## Rules
1. **Syntropy MCP first**, if connected. Why: it reads the live repo and re-reads files when they change.
2. **Skill references second**: the routed skill's `references/` and its `references/data/` copies. Why: they work offline and inside any agent.
3. **Ask the person third.** Never guess a component name, variant value, token, limit, fee, rate, deadline or regulated sentence. Why: a plausible guess is worse than a question.
4. Say which source you used when it matters ("from `get_component`", "from the CardDeal guide"). Why: lets the person verify.
5. If two sources disagree, follow the precedence in `known-issues.md` and flag the conflict in one line. Why: silent picks hide drift.

## Step 1. Detect the Syntropy MCP
- Claude Code: the tools appear as `mcp__syntropy__<tool>` (or under a plugin prefix). Load them with ToolSearch (`+syntropy`) if they are deferred.
- Other agents: look for tools named `start_intake`, `search_components` and so on.
- Never call a tool you have not seen in the tool list.

| Need | MCP tool | Example call |
|---|---|---|
| Start the interview | `start_intake` | request text; returns the next question and, at the end, the brief and next steps |
| Find a component | `search_components` | "deal card", "bottom sheet", "amount input" |
| Component detail | `get_component` | "CardDeal" (props, variants, Figma link, example images, guide) |
| Token by intent | `find_tokens` | "muted text", "card surface", "error border" |
| Icon by meaning | `search_icons` | "wallet", «محفظة», «رجوع» |
| Screen pattern | `get_pattern` | "payouts", "invest-and-reserve", or no argument for the list |
| Guideline section | `get_guideline` | "fees before confirmation", "touch targets", "Hijri dates" |
| Links | `find_links` | category "research", "regulators", region "saudi" |
| Research plan | `research_plan` | "KYC upload" |
| Lint | `lint_ui` | code, CSS or copy; returns findings with fixes |

## Step 2. Skill references
| Need | Skill | Where inside it |
|---|---|---|
| Components, props, decision trees | syntropy-components | its catalog and decision trees, `references/data/components/<page>.md` |
| Tokens and text styles | syntropy-foundations | `references/data/tokens-resolved.json`, `text-styles.json` |
| Patterns | syntropy-patterns | `references/data/patterns/<pattern>.md` |
| Copy, numbers, glossary | syntropy-content (and this skill) | `references/data/content/` |
| Contrast pairs, targets | syntropy-accessibility | `references/data/contrast-pairs.md` |
| Icons | syntropy-icons-illustration | `references/data/icons.json` |
| Links | this skill | `references/data/links.json` |
| Research tools | syntropy-inspiration | its `references/tools/` |
| Compliance | syntropy-compliance-ux | its risk, fees and consent references |

## Step 3. Ask the person
Ask one short question with your best candidate: "Syntropy has no stepper for amounts except `NumericStepper`; is that what you mean?" For limits, fees and regulated wording, do not ask for numbers to hardcode: use placeholders and note "to be confirmed by Product or Compliance".

## When a skill is not installed
1. Use the matching MCP tool from the table above.
2. If neither is available, tell the person in one line how to install, then continue with what this skill knows and mark the uncertain parts:
   - Claude Code plugin: `/plugin marketplace add abdulrahmanaljebreen/syntropy-ai` then `/plugin install syntropy@syntropy-ai`
   - Other agents (Cursor, Codex, Copilot, Gemini and others): `npx skills add abdulrahmanaljebreen/syntropy-ai`
   - Syntropy MCP server: `claude mcp add syntropy -- node /path/to/syntropy-ai/mcp/server.mjs` (other clients: see the repo's MCP README)
3. Never fill the gap from general design knowledge (Material, iOS defaults, Tailwind palettes). Why: they are not Syntropy.

## Examples
- Do: "`find_tokens('muted text')` returns `text/muted`." Then answer.
- Do: "The MCP is not connected and syntropy-components is not installed. Install with `npx skills add abdulrahmanaljebreen/syntropy-ai`. From what I know, `CardDeal` has `Layout` Hero and Row (unverified here)."
- Don't: "Use the `DealCard` component" (name guessed; the real one is `CardDeal`).
- Don't: "The retail limit is 100,000 SAR" typed into a design.

## Sources
- mcp/README.md (tool list)
- AGENTS.md (tools)
- .claude-plugin/marketplace.json (plugin and marketplace names)
