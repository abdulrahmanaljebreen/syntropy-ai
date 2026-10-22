# Browser-only sources playbook

Sources with no MCP server for agents. Open them with `WebFetch` (public text pages and `llms.txt`), Claude in Chrome (pages that need the person's login; load the `claude-in-chrome` skill first), the built-in browser, or ask the person to open them and paste screenshots. Use them when an MCP library cannot answer: recorded end-to-end flows, research-backed form guidance, A/B-tested patterns, psychology teardowns, visual trend scans, Saudi and GCC products, regulation, and as the fallback when no MCP is connected.

## Rules
1. Prefer an MCP library first (Mobbin, Refero, Lazyweb); go to the browser for research findings, teardown reasoning, Saudi products or sources the libraries lack.
   Why: MCP results are structured and citable in one call.
2. Respect each site's terms: no bulk scraping, no bypassing paywalls or logins. Paid sites (Page Flows, Baymard full research) need the person's own account.
   Why: legal and account safety.
3. Quote findings, not pages: the claim, the source URL and the date read.
   Why: guidance changes; citations must be checkable.
4. For sites with `llms.txt` (Land-book, Awwwards, Baymard, Laws of UX, Carbon, Atlassian, Ant Design, shadcn/ui, LottieFiles, Lucide, Motion), `WebFetch` `<site>/llms.txt` first.
   Why: faster and cleaner than parsing HTML.
5. Browser sources count toward the 2-tool limit like any other tool (one site family = one tool).
   Why: the limit is about noise, not about the transport.

## Recorded flows and teardowns
| Source | URL | Access | Best for at Safqah | How to use |
|---|---|---|---|---|
| Page Flows | https://pageflows.com | Paid, no agent access | Video recordings of onboarding, KYC, checkout, cancellation | The person searches "KYC", "bank onboarding", "withdraw"; you analyse their screenshots or notes |
| Growth.design case studies | https://growth.design/case-studies | Free | Psychology teardowns of onboarding, pricing, trust | Extract the named biases and fixes; check each against the no-dark-patterns rule |
| Pttrns | https://pttrns.com | Freemium | Mobile patterns by category | Quick scan when Mobbin is unavailable |
| Collect UI | https://collectui.com | Free | Daily UI shots by component | Component ideas only; often concept work |
| UI Coach | https://www.uicoach.io | Free | Practice prompts and pattern examples | Rarely needed |
| Savee | https://savee.com | Freemium, no agent access | Moodboards | The person builds boards; you summarise direction |

## Research-backed guidance
| Source | URL | Access | Best for |
|---|---|---|---|
| Baymard Institute | https://baymard.com | Paid (some free articles), `llms.txt` | Forms, checkout, error messages, input fields, mobile form UX |
| GoodUI | https://goodui.org | Freemium | A/B-tested patterns with measured effects (fallback for Lazyweb experiments) |
| NN/g 10 usability heuristics | https://www.nngroup.com/articles/ten-usability-heuristics/ | Free | Heuristic review of a flow |
| Laws of UX | https://lawsofux.com | Free, `llms.txt` | Naming the principle (Hick, Fitts, Jakob, Goal-gradient) |
| Deceptive Design | https://deceptive.design/types | Free | Checking a reference for dark patterns (all banned at Safqah) |
| Checklist Design | https://www.checklist.design | Free | Per-page and per-component checklists |
| GOV.UK Design System | https://design-system.service.gov.uk | Free | Accessible forms, error summaries, plain language |
| Inclusive Components | https://inclusive-components.design | Free | Accessible component behaviour |

## Back-office and SaaS
| Source | URL | Access | Best for |
|---|---|---|---|
| SaaSFrame | https://www.saasframe.io | Freemium, no agent access | SaaS screens: tables, settings, dashboards (fallback for Nicelydone) |
| Stripe, Mercury, Ramp | https://stripe.com, https://mercury.com, https://ramp.com | Free public pages | Finance dashboards and approval flows |
| Component Gallery | https://component.gallery | Free | One component compared across design systems |
| Carbon, Polaris, Atlassian, Ant Design | see `references/data/links.json` category `design-systems` | Free | Dense data UI, table rules, empty states |

## Visual inspiration (web)
| Source | URL | Best for |
|---|---|---|
| Best Designs On X | https://bestdesignsonx.com | Fresh UI and brand work, updated hourly |
| Recent (formerly Godly) | https://recent.design | High-end web direction |
| Land-book | https://land-book.com | Landing pages, filterable (`llms.txt`) |
| Lapa Ninja | https://www.lapa.ninja | Landing pages by category, including finance |
| SaaS Landing Page, Landingfolio | https://saaslandingpage.com, https://www.landingfolio.com | Landing sections broken down |
| Awwwards, CSS Design Awards, Siteinspire, Minimal Gallery, One Page Love, Httpster | `references/data/links.json` category `web-inspiration` | Trend scans |
| Navbar Gallery, Footer Design, Dark Mode Design | `references/data/links.json` | One section type at a time |

## Saudi and GCC products (rarely in libraries)
Read the public site, help center and App Store or Google Play screenshots; for logged-in flows ask the person for screenshots from their own phone. Never guess. Product list per topic: `../benchmarks.md`.

## Arabic, RTL and regulation
| Source | Use |
|---|---|
| DGA Platforms Code design system, https://design.dga.gov.sa | Saudi government UI conventions users already know |
| Material 3 bidirectionality, Apple HIG right to left | Mirroring rules for icons, layout, numbers |
| RTL Styling, https://rtlstyling.com/posts/rtl-styling | CSS logical properties for web |
| W3C inline bidi markup | Mixed Arabic and Latin strings (IBANs, amounts) |
| Dubai Design System, UAE Design System | Bilingual typography and scale |
| SAMA consumer protection, https://rulebook.sama.gov.sa/en/entiresection/1375 | Fair treatment, disclosure |
| CMA regulations library, https://cma.gov.sa/en/RulesRegulations/Regulations/Pages/default.aspx | Offers, crowdfunding, disclosure |
| PDPL official text, https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1 | Consent and personal data UX |

Regulated wording always comes from the regulation and Safqah Compliance, never from a gallery.

## Tool discovery
Toolfolio (https://toolfolio.com), TOOOLS.design (https://www.toools.design), UX Tools (https://www.uxtools.co), Design Resources (https://designresourc.es), UIUX Showcase (https://uiuxshowcase.com), Figma Community (https://www.figma.com/community; never import a kit into Syntropy), Product Hunt (https://www.producthunt.com).

## Engineer-facing MCPs (never the Safqah look)
shadcn/ui MCP (https://ui.shadcn.com/docs/mcp) and Ant Design MCP (https://ant.design/docs/react/mcp) explain component behaviour for engineers. They are never a visual reference; the look is Syntropy.

## Example queries for Safqah
| Topic | Source | What to search or read |
|---|---|---|
| Deal page | Lapa Ninja, finance | How investing and real-estate sites present returns and risk |
| Invest flow | Baymard | "order review step", "payment confirmation" |
| Reserve flow | Growth.design | Urgency cases, to recognise and avoid false urgency |
| KYC | Page Flows | "identity verification", "bank onboarding" (person's account) |
| KYC forms | GOV.UK Design System | Date input, address, error summary |
| Wallet and cash-out | Baymard + Wise public help pages | Fee transparency, arrival estimates |
| Portfolio | Component Gallery | "stat", "data table", "card" |
| Payouts | Carbon | Data table and status indicator guidance |
| Goals | Laws of UX | Goal-gradient effect, then design progress honestly |
| Empty states | Carbon, Atlassian | Empty state content rules |
| Notifications | GoodUI | Permission and opt-in tests |
| Back-office tables | SaaSFrame | "table", "filters", "bulk actions" |
| Marketing direction | Best Designs On X, Recent | Trends, translated to Syntropy tokens only |

## Watch-outs
- Galleries show concept work that never shipped; prefer real products for behaviour.
- Teardowns are opinions with evidence; check the claim against Safqah data (Mixpanel, Notion research) before acting.
- Award sites favour motion-heavy, low-contrast work; Safqah needs WCAG 2.2 AA.

## Sources
- Team link list categories `mobile-patterns`, `web-inspiration`, `tool-directories`, `ux-principles`, `design-systems`, `arabic-rtl`, `regulation`, `finance-backoffice` (checked 2026-10-15)
