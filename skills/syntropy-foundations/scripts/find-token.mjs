// syntropy-lint-disable off-palette-color, no-raw-color: this script looks up and explains color values
#!/usr/bin/env node
// Search Syntropy tokens by intent. Zero dependencies, Node >= 20.
// Usage:
//   node scripts/find-token.mjs "muted text on card"
//   node scripts/find-token.mjs "error banner" -n 5
//   node scripts/find-token.mjs "green 500" --all      (include primitives)
//   node scripts/find-token.mjs "card background" --json
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const candidates = [
  join(here, "..", "references", "data", "tokens-resolved.json"),
  join(here, "..", "..", "..", "knowledge", "tokens", "resolved.json"),
];
const dataPath = candidates.find((p) => existsSync(p));
if (!dataPath) {
  console.error("Token data not found. Looked in:\n  " + candidates.join("\n  "));
  process.exit(1);
}
const tokens = JSON.parse(readFileSync(dataPath, "utf8")).tokens;

// ---- args
const args = process.argv.slice(2);
let limit = 8;
let includePrimitives = false;
let asJson = false;
const words = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "-n" || a === "--limit") limit = Number(args[++i]) || limit;
  else if (a === "--all") includePrimitives = true;
  else if (a === "--json") asJson = true;
  else if (a === "-h" || a === "--help") {
    console.log('Usage: node scripts/find-token.mjs "<intent words>" [-n 8] [--all] [--json]');
    process.exit(0);
  } else words.push(a);
}
const query = words.join(" ").trim().toLowerCase();
if (!query) {
  console.error('Give an intent, e.g. node scripts/find-token.mjs "muted text on card"');
  process.exit(1);
}

// ---- vocabulary
const STOP = new Set(["the", "a", "an", "on", "in", "of", "for", "to", "and", "with", "what", "which", "token", "color", "colour", "use", "i", "should", "is", "my", "mode"]);

// word -> extra words it implies (searched in token names and descriptions)
const SYNONYMS = {
  background: ["bg"], bg: ["background"], fill: ["bg"], surface: ["bg", "surface"],
  card: ["elevated"], tile: ["elevated"], modal: ["elevated", "overlay"], sheet: ["elevated"],
  popover: ["elevated"], menu: ["elevated"], dropdown: ["elevated"], page: ["surface"], canvas: ["surface"],
  screen: ["surface", "base"], scrim: ["overlay"], backdrop: ["overlay"], tooltip: ["inverse"],
  text: ["text"], copy: ["text"], label: ["text"], font: ["font"], typography: ["font"],
  secondary: ["muted"], helper: ["muted"], caption: ["muted"], description: ["muted"], grey: ["muted", "neutral"], gray: ["muted", "neutral"],
  muted: ["muted"], tertiary: ["subtle"], placeholder: ["subtle"], hint: ["muted"], meta: ["subtle", "muted"],
  primary: ["default", "primary"], body: ["default"], main: ["default"],
  divider: ["border", "subtle"], separator: ["border", "subtle"], line: ["border"], outline: ["border"], stroke: ["border"], border: ["border"],
  ring: ["focus"], focus: ["focus"], keyboard: ["focus"], selected: ["brand", "border"], active: ["brand"], selection: ["brand"],
  icon: ["icon"], glyph: ["icon"],
  brand: ["brand"], green: ["brand", "success"], cta: ["brand", "primary"], button: ["brand", "primary"],
  yellow: ["yellow"], accent: ["accent", "yellow"], highlight: ["accent", "subtle"], hero: ["darkest"], marketing: ["darkest"],
  hover: ["hover"], pressed: ["pressed"], tap: ["pressed"],
  error: ["error"], danger: ["error"], destructive: ["error"], failed: ["error"], failure: ["error"], invalid: ["error"], red: ["error"], defaulted: ["error"],
  warning: ["warning"], warn: ["warning"], late: ["warning"], pending: ["warning"], attention: ["warning"], orange: ["warning"],
  success: ["success"], done: ["success"], complete: ["success"], completed: ["success"], valid: ["success"], paid: ["success"],
  info: ["info"], information: ["info"], notice: ["info"], blue: ["info"],
  progress: ["progress"], loading: ["progress"], milestone: ["progress"], purple: ["progress"], ongoing: ["progress"],
  caution: ["caution"], brown: ["caution"], recovery: ["caution"],
  banner: ["subtle"], alert: ["subtle"], callout: ["subtle"], toast: ["subtle"], badge: ["subtle"],
  soft: ["subtle"], light: ["subtle", "lightest"], subtle: ["subtle"], strong: ["strong"], dark: ["darkest", "inverse"],
  disabled: ["disabled"], inactive: ["disabled"],
  inverse: ["inverse"], white: ["inverse", "on-brand"], onbrand: ["on-brand"],
  padding: ["space"], margin: ["space"], gap: ["space"], spacing: ["space"], space: ["space"],
  radius: ["radius"], corner: ["radius"], rounded: ["radius"], round: ["radius"], pill: ["full"], circle: ["full"], avatar: ["full"],
  size: ["size"], weight: ["weight"], bold: ["bold"], semibold: ["semibold"], lineheight: ["line-height"],
  shadow: ["shadow"], elevation: ["elevated", "shadow"],
};

// curated intents: if all keys appear in the query, boost these tokens
const INTENTS = [
  [["card", "background"], ["bg/elevated"]],
  [["card"], ["bg/elevated", "border/subtle", "radius/default"]],
  [["page", "background"], ["bg/surface"]],
  [["app", "background"], ["bg/surface"]],
  [["content", "background"], ["bg/base"]],
  [["list", "background"], ["bg/base"]],
  [["modal", "scrim"], ["bg/overlay"]],
  [["overlay"], ["bg/overlay", "bg/reverse-overlay"]],
  [["tooltip"], ["bg/inverse", "text/inverse"]],
  [["muted", "text"], ["text/muted"]],
  [["secondary", "text"], ["text/muted"]],
  [["helper"], ["text/muted"]],
  [["placeholder"], ["text/subtle"]],
  [["body", "text"], ["text/default"]],
  [["primary", "text"], ["text/default"]],
  [["disabled", "text"], ["text/disabled"]],
  [["disabled", "button"], ["bg/disabled", "text/disabled"]],
  [["disabled"], ["bg/disabled", "text/disabled", "border/disabled", "icon/disabled"]],
  [["divider"], ["border/subtle", "border/default"]],
  [["separator"], ["border/subtle"]],
  [["input", "border"], ["border/default", "border/strong", "border/error"]],
  [["focus"], ["border/focus"]],
  [["selected"], ["border/brand/primary", "bg/brand/accent-50", "bg/brand/lightest"]],
  [["brand", "button"], ["bg/brand/primary", "text/on-brand"]],
  [["primary", "button"], ["bg/brand/primary", "text/on-brand"]],
  [["cta"], ["bg/brand/primary", "bg/brand/primary-hover", "bg/brand/primary-pressed", "text/on-brand"]],
  [["green", "text"], ["text/brand/darkest", "text/brand/primary"]],
  [["link"], ["text/brand/primary", "text/default"]],
  [["brand"], ["bg/brand/primary", "text/brand/darkest", "border/brand/primary", "icon/brand/primary"]],
  [["yellow"], ["bg/brand/yellow", "bg/brand/yellow-subtle"]],
  [["hero"], ["bg/brand/darkest", "text/on-brand"]],
  [["error", "text"], ["text/error"]],
  [["error", "message"], ["text/error", "bg/error-subtle", "icon/error"]],
  [["error", "banner"], ["bg/error-subtle", "text/error", "icon/error", "border/error-error"]],
  [["error", "border"], ["border/error", "border/error-error"]],
  [["error"], ["text/error", "bg/error-subtle", "icon/error", "border/error"]],
  [["warning"], ["bg/warning-subtle", "text/warning", "icon/warning", "border/warning-subtle"]],
  [["late"], ["bg/warning-subtle", "text/warning", "icon/warning"]],
  [["success"], ["bg/success-subtle", "text/success", "icon/success", "border/success-subtle"]],
  [["info"], ["bg/info-subtle", "text/info", "icon/info", "border/info-subtle"]],
  [["progress"], ["bg/progress-subtle", "text/progress", "icon/progress", "border/progress-subtle"]],
  [["caution"], ["bg/caution-subtle", "text/caution", "icon/caution", "border/caution-subtle"]],
  [["on", "brand"], ["text/on-brand", "icon/on-brand"]],
  [["white", "text"], ["text/on-brand", "text/inverse"]],
  [["icon"], ["icon/default", "icon/muted"]],
  [["card", "padding"], ["space/xl"]],
  [["list", "padding"], ["space/md"]],
  [["icon", "label"], ["space/xs"]],
  [["section", "gap"], ["space/2xl"]],
  [["screen", "margin"], ["space/lg"]],
  [["chip"], ["space/sm", "radius/sm"]],
  [["input", "radius"], ["radius/md"]],
  [["button", "radius"], ["radius/lg"]],
  [["card", "radius"], ["radius/default", "radius/lg"]],
  [["avatar"], ["radius/full"]],
  [["font"], ["font/family"]],
];

const tokenize = (s) =>
  s.toLowerCase().replace(/[^a-z0-9/\-\s]/g, " ").split(/[\s/\-]+/).filter(Boolean);

const qWords = tokenize(query).filter((w) => !STOP.has(w));
const qAll = new Set(tokenize(query)); // keep stop words for intent matching ("on brand")
const expanded = new Map(); // word -> weight
for (const w of qWords) {
  expanded.set(w, Math.max(expanded.get(w) || 0, 3));
  for (const s of SYNONYMS[w] || []) for (const t of tokenize(s)) expanded.set(t, Math.max(expanded.get(t) || 0, 2));
}

const intentBoost = new Map();
for (const [keys, list] of INTENTS) {
  if (keys.every((k) => qAll.has(k))) {
    list.forEach((name, i) => intentBoost.set(name, Math.max(intentBoost.get(name) || 0, 12 * keys.length - i)));
  }
}

const hexMatch = query.match(/#?\b[0-9a-f]{6}\b/);
const hexQuery = hexMatch ? "#" + hexMatch[0].replace("#", "") : null;
const WRONG_GREENS = { "#02ad4c": "logo Pigment Green, not a UI colour", "#0e849e": "outdated document colour" };

const results = [];
for (const [name, t] of Object.entries(tokens)) {
  const isSemantic = t.collection === "Semantic";
  if (!includePrimitives && !isSemantic) continue;
  const nameWords = tokenize(name);
  const descWords = new Set(tokenize(t.description || ""));
  let score = intentBoost.get(name) || 0;
  for (const [w, weight] of expanded) {
    if (nameWords.includes(w)) score += weight * 2;
    else if (nameWords.some((n) => n.startsWith(w) && w.length >= 3)) score += weight;
    else if (nameWords.some((n) => n.includes(w) && w.length >= 4)) score += weight * 0.75;
    if (descWords.has(w)) score += weight * 0.5;
  }
  // hex lookup: "#4daa57"
  if (hexQuery) {
    const vals = Object.entries(t.value);
    for (const [mode, v] of vals) {
      if (String(v).toLowerCase().startsWith(hexQuery)) score += mode === "Dark" ? 8 : 20;
    }
  }
  if (score <= 0) continue;
  if (isSemantic) score += 0.5;
  results.push({ name, score, collection: t.collection, type: t.type, tag: t.tag || "", value: t.value, description: t.description || "" });
}
results.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
const top = results.slice(0, limit);

if (asJson) {
  console.log(JSON.stringify(top, null, 2));
  process.exit(0);
}
if (hexQuery && WRONG_GREENS[hexQuery]) {
  console.log(`Note: ${hexQuery} is wrong for product UI (${WRONG_GREENS[hexQuery]}). Brand green is bg/brand/primary (#4daa57).\n`);
}
if (!top.length) {
  console.log(`No token matches "${query}". Try role words: background, text, border, icon, error, warning, brand, space, radius.`);
  process.exit(0);
}
if (qWords.some((w) => ["heading", "title", "caption", "display", "typography", "style", "lineheight"].includes(w))) {
  console.log("Tip: text is set with named text styles (body / 14 / regular, heading / 20 / semibold). See references/typography.md.\n");
}
const fmt = (v) => Object.entries(v).map(([m, x]) => `${m} ${x}`).join(" | ");
console.log(`Top ${top.length} for "${query}" (data: ${dataPath.includes("references") ? "references/data" : "repo knowledge"})\n`);
for (const r of top) {
  const tag = r.tag ? `[${r.tag[0].toUpperCase()}${r.tag.slice(1)}]` : r.collection === "Semantic" ? "" : `[${r.collection}: never use in product UI]`;
  console.log(`${r.name}  ${tag}`.trimEnd());
  console.log(`  ${fmt(r.value)}`);
  if (r.description) console.log(`  ${r.description.length > 150 ? r.description.slice(0, 147) + "..." : r.description}`);
}
