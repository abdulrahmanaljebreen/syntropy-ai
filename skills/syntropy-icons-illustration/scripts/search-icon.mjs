#!/usr/bin/env node
// Search the Syntropy Icons library by meaning, in English or Arabic. Zero dependencies, Node >= 20.
// Usage:
//   node scripts/search-icon.mjs "wallet"
//   node scripts/search-icon.mjs "withdraw"
//   node scripts/search-icon.mjs "محفظة"
//   node scripts/search-icon.mjs "back" --published -n 5
//   node scripts/search-icon.mjs "bank" --json
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pick = (...paths) => paths.find((p) => existsSync(p));
const iconsPath = pick(
  join(here, "..", "references", "data", "icons.json"),
  join(here, "..", "..", "..", "knowledge", "icons", "icons.json"),
);
const illusPath = pick(
  join(here, "..", "references", "data", "illustrations.json"),
  join(here, "..", "..", "..", "knowledge", "icons", "illustrations.json"),
);
if (!iconsPath) {
  console.error("icons.json not found (looked in references/data and the repo knowledge folder).");
  process.exit(1);
}
const icons = JSON.parse(readFileSync(iconsPath, "utf8")).icons;
const illustrations = illusPath ? JSON.parse(readFileSync(illusPath, "utf8")).illustrations : [];

// ---- args
const args = process.argv.slice(2);
let limit = 10;
let publishedOnly = false;
let asJson = false;
const words = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "-n" || a === "--limit") limit = Number(args[++i]) || limit;
  else if (a === "--published") publishedOnly = true;
  else if (a === "--json") asJson = true;
  else if (a === "-h" || a === "--help") {
    console.log('Usage: node scripts/search-icon.mjs "<concept in English or Arabic>" [-n 10] [--published] [--json]');
    process.exit(0);
  } else words.push(a);
}
const rawQuery = words.join(" ").trim();
if (!rawQuery) {
  console.error('Give a concept, e.g. node scripts/search-icon.mjs "wallet" or "محفظة"');
  process.exit(1);
}

// ---- English synonyms: concept word -> slugs (all slugs exist in icons.json)
const EN = {
  withdraw: ["money-out", "bank", "wallet", "cash-money"], withdrawal: ["money-out", "bank", "wallet"], cashout: ["money-out", "cash-money", "bank"],
  deposit: ["money-in", "deposit-box", "wallet"], topup: ["money-in", "wallet-add"], fund: ["money-in", "wallet"],
  transfer: ["swap", "money-transfer", "share-money-dollar"], send: ["mail-send", "money-out", "comment-send"], receive: ["money-in", "incoming-call"],
  payout: ["share-money-dollar", "money-in", "coins-stack", "cash-money"], distribution: ["share-money-dollar", "coins-stack", "money-in"], dividend: ["share-money-dollar", "coins-stack"],
  invest: ["safqah-deal", "chart-up", "trending-up", "pie-chart-investment", "portfolio"], investment: ["safqah-deal", "pie-chart-investment", "portfolio", "trending-up"],
  deal: ["safqah-deal", "handshake", "contract-sign"], opportunity: ["safqah-deal", "light-bulb"],
  return: ["percent", "trending-up", "chart-up"], yield: ["percent", "trending-up"], roi: ["percent", "trending-up"], profit: ["trending-up", "coins-stack", "chart-up"], loss: ["trending-down", "graph-decrease"],
  balance: ["wallet", "wallet-2", "cash-money"], money: ["cash-money", "bill-stack", "coin"], cash: ["cash-money", "cash", "bill-stack"], coin: ["coin", "coins-stack", "dollar-coin"],
  currency: ["riyal", "dollar-coin"], sar: ["riyal"], riyal: ["riyal"],
  card: ["credit-card", "credit-card-3", "card-add"], payment: ["credit-card", "payment-methods", "mobile-payment", "bill"], pay: ["credit-card", "mobile-payment"],
  bank: ["bank", "financial-statement"], iban: ["bank"], account: ["bank", "user-circle"], statement: ["financial-statement", "file-report", "bill"],
  invoice: ["bill", "receipt", "file-invoice"], receipt: ["receipt", "receipt-2"], fee: ["percent", "bill"], vat: ["percent", "receipt"], tax: ["percent", "receipt"],
  zakah: ["calculator", "coin-percent", "percent"], zakat: ["calculator", "coin-percent", "percent"], calculator: ["calculator"],
  portfolio: ["portfolio", "pie-chart", "donut-graph", "briefcase-dollar"], history: ["transaction-history", "payment-history", "doc-history", "clock"], transaction: ["transaction-recurring", "transaction-history", "swap"],
  recurring: ["transaction-recurring", "sync"], refund: ["transaction-refund"], reinvest: ["transaction-recurring", "sync", "share-coin"],
  property: ["building", "real-estate", "house-family", "office-building"], realestate: ["building", "real-estate", "house-key"], building: ["building", "office-building", "building-2"], house: ["house-family", "house-key", "home"],
  contract: ["contract-sign", "contracts", "nda-contract", "license-doc"], sign: ["signature", "contract-sign", "fill-sign"], signature: ["signature"],
  guarantee: ["shield-check", "insurance-umbrella"], collateral: ["shield-check", "deposit-box", "safe-vault"], risk: ["gauge", "alert-triangle"], sukuk: ["certificate", "license-doc"],
  back: ["arrow-right-2", "arrow-left-2", "chevron-right", "chevron-left", "arrow-right", "arrow-left"], previous: ["arrow-left-2", "arrow-right-2", "chevron-left", "chevron-right"],
  next: ["arrow-left-2", "arrow-right-2", "chevron-left", "chevron-right"], forward: ["forward", "step-forward", "arrow-right-2"], arrow: ["arrow-left-2", "arrow-right-2", "arrow-up", "arrow-down"],
  close: ["x"], dismiss: ["x"], cancel: ["x"], add: ["plus", "wallet-add", "card-add"], new: ["plus", "tag-new"], create: ["plus"],
  delete: ["trash", "delete-permanent"], remove: ["trash", "minus"], edit: ["pencil-edit", "pencil-square", "highlighter"], copy: ["copy-paste"], paste: ["copy-paste"],
  share: ["share", "share-circle"], download: ["download"], upload: ["upload", "upload-tray"], export: ["export"], import: ["import"],
  search: ["search"], find: ["search"], filter: ["filter", "sliders"], sort: ["sort-alpha", "reorder"], refresh: ["reload", "sync"], reload: ["reload"], sync: ["sync"],
  menu: ["menu"], more: ["more-horizontal"], options: ["more-horizontal", "settings"], settings: ["settings", "settings-2", "cog"], preferences: ["settings", "sliders"],
  home: ["home"], dashboard: ["dashboard", "dashboard-square-three"], notification: ["bell", "bell-ringing"], notifications: ["bell", "bell-ringing"], alert: ["bell", "alert-triangle"], reminder: ["bell", "alarm-clock"],
  user: ["user", "user-circle"], profile: ["user-circle", "user-profile-focus", "profile-circle"], people: ["users-group", "user-team"], team: ["user-team", "team-collaborate"],
  identity: ["id-card", "user-verified"], kyc: ["id-card", "user-verified", "audit-checklist"], verify: ["user-verified", "shield-check", "check-circle"], verified: ["user-verified", "shield-check"],
  security: ["shield-security", "padlock-shield", "lock"], secure: ["shield-security", "lock"], lock: ["lock", "padlock-square"], unlock: ["lock-off", "key"], password: ["correct-password", "key"], pin: ["correct-password", "keyhole-lock"],
  fingerprint: ["fingerprint"], biometric: ["fingerprint", "face-scan"], faceid: ["face-scan", "face-id"], face: ["face-scan", "face-id"],
  show: ["eye"], visible: ["eye"], view: ["eye"], hide: ["eye-off"], hidden: ["eye-off", "private-mode"], privacy: ["private-mode", "eye-off"],
  help: ["help-circle", "faq", "help-chat"], support: ["headset", "support-agent", "help-chat"], faq: ["faq"], info: ["info"], information: ["info"], tip: ["light-bulb"], learn: ["light-bulb", "graduation-cap"],
  warning: ["alert-triangle"], caution: ["alert-triangle", "alert-square"], error: ["alert-circle", "dangerous"], danger: ["dangerous", "alert-circle"], success: ["check-circle", "check-thick"], done: ["check", "check-circle"], check: ["check", "check-circle"],
  defaulted: ["defaulted"], late: ["clock-important", "alert-triangle"], pending: ["hourglass", "clock"], loading: ["loader-spinner", "loading-circle"],
  time: ["clock"], clock: ["clock"], timer: ["timer-auto", "stopwatch", "hourglass"], countdown: ["hourglass", "timer-auto"], date: ["calendar"], calendar: ["calendar", "calendar-event"], schedule: ["calendar-schedule", "calendar-check"], maturity: ["calendar-check", "hourglass"],
  document: ["file-doc", "text-file", "multiple-files"], file: ["file-doc", "text-file"], pdf: ["pdf-add"], report: ["file-report", "analytics-board"], certificate: ["certificate", "license-doc"], folder: ["file-folder", "open-folder"],
  chart: ["chart-analytics", "graph-line", "bar-chart", "donut-graph"], graph: ["graph-line", "chart-area"], analytics: ["chart-analytics", "analytics-graph-net"], growth: ["trending-up", "chart-up"],
  location: ["location-pin", "map-location"], map: ["map-location"], city: ["office-building", "city-hall"],
  phone: ["phone", "mobile-phone"], call: ["phone-call"], mobile: ["mobile-phone"], email: ["mail-solo", "mail-send"], mail: ["mail-solo"], chat: ["chat-bubble-text", "chat-bubble-typing"], message: ["chat-bubble-text", "mail-solo"],
  language: ["globe", "translate"], translate: ["translate"], web: ["globe"], link: ["link-chain"], qr: ["qr-code"], scan: ["barcode-scanner", "qr-code", "face-scan"],
  darkmode: ["light-dark-mode"], dark: ["light-dark-mode"], theme: ["light-dark-mode"],
  favorite: ["heart", "star", "bookmark-star"], favourite: ["heart", "star", "bookmark-star"], watchlist: ["bookmark-star", "bookmark-heart", "heart"], save: ["bookmark", "bookmark-star"], bookmark: ["bookmark-star", "bookmark-heart"],
  rating: ["star", "rating"], star: ["star"], like: ["heart", "thumbs-up"], gift: ["gift-card"], reward: ["gift-card", "medal", "trophy"], referral: ["users-group", "gift-card", "share"],
  goal: ["target-check", "summit", "trophy"], target: ["target-check"], camera: ["camera-square"], photo: ["landscape-frame", "image-circle"], image: ["landscape-frame"],
  play: ["play-pause", "play"], pause: ["button-pause", "pause"], video: ["video-subtitles"], logout: ["power-button", "enter"], login: ["enter", "key-access"],
  gold: ["gold-bar"], vault: ["safe-vault", "deposit-box"], insurance: ["insurance-umbrella"], wallet: ["wallet", "wallet-2", "wallet-cards"],
};

// ---- Arabic concept map (normalised Arabic -> slugs)
const AR_RAW = {
  "محفظة": ["wallet", "wallet-2"], "رصيد": ["wallet", "cash-money"], "سحب": ["money-out", "bank"], "إيداع": ["money-in", "deposit-box"], "شحن": ["money-in", "wallet-add"],
  "تحويل": ["swap", "money-transfer"], "إرسال": ["mail-send", "money-out"], "استلام": ["money-in"], "توزيعات": ["share-money-dollar", "coins-stack"], "توزيع": ["share-money-dollar", "coins-stack"], "أرباح": ["coins-stack", "trending-up"],
  "عائد": ["percent", "trending-up"], "نسبة": ["percent"], "استثمار": ["safqah-deal", "pie-chart-investment", "trending-up"], "صفقة": ["safqah-deal", "handshake"], "فرصة": ["safqah-deal", "light-bulb"], "فرص": ["safqah-deal"],
  "محفظة استثمارية": ["portfolio", "pie-chart"], "ربح": ["trending-up", "coins-stack"], "خسارة": ["trending-down"], "نقد": ["cash-money", "cash"], "مال": ["cash-money", "bill-stack"], "عملة": ["coin", "riyal"], "ريال": ["riyal"],
  "بطاقة": ["credit-card", "card-add"], "دفع": ["credit-card", "mobile-payment", "payment-methods"], "بنك": ["bank"], "حساب بنكي": ["bank"], "آيبان": ["bank"], "كشف حساب": ["financial-statement", "file-report"],
  "فاتورة": ["bill", "file-invoice"], "إيصال": ["receipt", "receipt-2"], "رسوم": ["percent", "bill"], "ضريبة": ["percent", "receipt"], "زكاة": ["calculator", "coin-percent"], "حاسبة": ["calculator"],
  "سجل": ["transaction-history", "payment-history", "clock"], "عمليات": ["transaction-history", "swap"], "إعادة استثمار": ["transaction-recurring", "sync"], "استرداد": ["transaction-refund"],
  "عقار": ["building", "real-estate", "house-family"], "مبنى": ["building", "office-building"], "منزل": ["house-family", "home"], "عقد": ["contract-sign", "contracts"], "توقيع": ["signature", "contract-sign"],
  "ضمان": ["shield-check", "insurance-umbrella"], "ضمانات": ["shield-check", "safe-vault"], "مخاطر": ["gauge", "alert-triangle"], "صكوك": ["certificate", "license-doc"],
  "رجوع": ["arrow-right-2", "chevron-right", "arrow-left-2"], "عودة": ["arrow-right-2", "chevron-right"], "التالي": ["arrow-left-2", "chevron-left", "arrow-right-2"], "السابق": ["arrow-right-2", "chevron-right"],
  "إغلاق": ["x"], "إلغاء": ["x"], "إضافة": ["plus"], "جديد": ["plus", "tag-new"], "حذف": ["trash", "delete-permanent"], "تعديل": ["pencil-edit", "pencil-square"], "نسخ": ["copy-paste"], "مشاركة": ["share", "share-circle"],
  "تنزيل": ["download"], "تحميل": ["download", "loader-spinner"], "رفع": ["upload", "upload-tray"], "بحث": ["search"], "تصفية": ["filter", "sliders"], "فلتر": ["filter"], "ترتيب": ["sort-alpha", "reorder"], "تحديث": ["reload", "sync"],
  "قائمة": ["menu", "list-view"], "المزيد": ["more-horizontal"], "إعدادات": ["settings", "settings-2"], "الرئيسية": ["home"], "لوحة": ["dashboard"], "إشعار": ["bell", "bell-ringing"], "إشعارات": ["bell", "bell-ringing"], "تنبيه": ["bell", "alert-triangle"], "تذكير": ["bell", "alarm-clock"],
  "مستخدم": ["user", "user-circle"], "ملف شخصي": ["user-circle", "user-profile-focus"], "حسابي": ["user-circle"], "هوية": ["id-card", "user-verified"], "تحقق": ["user-verified", "shield-check"], "توثيق": ["user-verified", "audit-checklist"], "نفاذ": ["id-card", "user-verified"],
  "أمان": ["shield-security", "padlock-shield"], "قفل": ["lock"], "كلمة المرور": ["correct-password", "key"], "رمز": ["correct-password", "keyhole-lock"], "بصمة": ["fingerprint"], "بصمة الوجه": ["face-scan", "face-id"], "وجه": ["face-scan"],
  "إظهار": ["eye"], "عرض": ["eye"], "إخفاء": ["eye-off"], "خصوصية": ["private-mode", "eye-off"],
  "مساعدة": ["help-circle", "faq"], "دعم": ["headset", "support-agent", "help-chat"], "أسئلة": ["faq", "help-circle"], "معلومات": ["info"], "نصيحة": ["light-bulb"], "تعلم": ["light-bulb", "graduation-cap"],
  "تحذير": ["alert-triangle"], "خطأ": ["alert-circle", "dangerous"], "نجاح": ["check-circle", "check-thick"], "تم": ["check", "check-circle"], "متعثر": ["defaulted"], "تعثر": ["defaulted"], "متأخر": ["clock-important", "alert-triangle"], "قيد": ["hourglass", "clock"],
  "وقت": ["clock"], "ساعة": ["clock"], "مؤقت": ["timer-auto", "stopwatch", "hourglass"], "تاريخ": ["calendar"], "تقويم": ["calendar", "calendar-event"], "جدول": ["calendar-schedule"], "موعد": ["calendar-check", "calendar-event"], "استحقاق": ["calendar-check", "hourglass"],
  "مستند": ["file-doc", "text-file"], "ملف": ["file-doc", "file-folder"], "تقرير": ["file-report", "analytics-board"], "شهادة": ["certificate", "license-doc"],
  "رسم بياني": ["chart-analytics", "graph-line", "bar-chart"], "إحصائيات": ["chart-analytics", "analytics-graph-net"], "نمو": ["trending-up", "chart-up"],
  "موقع": ["location-pin", "map-location"], "خريطة": ["map-location"], "مدينة": ["office-building", "city-hall"],
  "هاتف": ["phone", "mobile-phone"], "جوال": ["mobile-phone"], "اتصال": ["phone-call"], "بريد": ["mail-solo", "mail-send"], "رسالة": ["chat-bubble-text", "mail-solo"], "محادثة": ["chat-bubble-text", "help-chat"],
  "لغة": ["globe", "translate"], "رابط": ["link-chain"], "باركود": ["qr-code", "barcode-scanner"], "مسح": ["barcode-scanner", "qr-code"], "الوضع الليلي": ["light-dark-mode"],
  "مفضلة": ["heart", "bookmark-star"], "قائمة المتابعة": ["bookmark-star", "bookmark-heart"], "حفظ": ["bookmark", "bookmark-star"], "تقييم": ["star", "rating"], "هدية": ["gift-card"], "مكافأة": ["gift-card", "medal"], "دعوة": ["users-group", "share"],
  "هدف": ["target-check", "summit"], "أهداف": ["target-check", "summit"], "كاميرا": ["camera-square"], "صورة": ["landscape-frame", "image-circle"], "تشغيل": ["play-pause"], "إيقاف": ["button-pause"], "خروج": ["power-button", "enter"], "دخول": ["enter", "key-access"],
  "ذهب": ["gold-bar"], "خزنة": ["safe-vault", "deposit-box"], "تأمين": ["insurance-umbrella"],
};
const normAr = (s) =>
  s.normalize("NFC")
    .replace(/[ً-ٰٟـ]/g, "") // diacritics, tatweel
    .replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
    .trim();
const stripAl = (w) => (w.startsWith("ال") && w.length > 3 ? w.slice(2) : w);
const AR = new Map();
for (const [k, v] of Object.entries(AR_RAW)) {
  const n = normAr(k);
  AR.set(n, v);
  AR.set(n.split(/\s+/).map(stripAl).join(" "), v);
}

// ---- illustration concept hints (EN + AR -> concept)
const ILLUS = {
  empty: ["Scheduled"], favorite: ["Hearts - Favorite"], favourite: ["Hearts - Favorite"], watchlist: ["Hearts - Favorite"], bank: ["Bank"], card: ["Cards"],
  success: ["Chosen checkmark"], done: ["Chosen checkmark"], error: ["Defaulted"], defaulted: ["Defaulted"], recovery: ["In recovery"], matured: ["Matured"], raising: ["Raising"], preparing: ["Preparing"],
  active: ["Active"], scheduled: ["Scheduled"], repayment: ["Repayment due"], partial: ["Partial"], settings: ["Settings"], start: ["Start"], onboarding: ["Start", "Stairs"], tip: ["Light bulb", "Think"],
  learn: ["Light bulb", "Think"], faceid: ["Face ID standing", "Face ID flat"], face: ["Face ID standing"], delete: ["Garbage - Delete"], recommendation: ["Recommendation"], reinvest: ["Recommendation · Cycle"],
  info: ["Info", "Data info alert"], language: ["Web - Globe", "Arabic badge"], community: ["Group", "Group hug"], referral: ["Group hug"],
};

// ---- scoring
const qLower = rawQuery.toLowerCase();
const isArabic = /[؀-ۿ]/.test(rawQuery);
const tokens = isArabic
  ? normAr(rawQuery).split(/\s+/).filter(Boolean)
  : qLower.replace(/[^a-z0-9\s-]/g, " ").split(/[\s-]+/).filter(Boolean);
const joined = tokens.join("");

const slugBoost = new Map();
const addBoost = (slug, w) => slugBoost.set(slug, (slugBoost.get(slug) || 0) + w);
const conceptHits = new Set();

if (isArabic) {
  const nq = normAr(rawQuery);
  const variants = new Set([nq, nq.split(/\s+/).map(stripAl).join(" ")]);
  for (const v of variants) (AR.get(v) || []).forEach((s, i) => addBoost(s, 20 - i));
  for (const t of tokens) for (const v of [t, stripAl(t)]) (AR.get(v) || []).forEach((s, i) => addBoost(s, 10 - i));
} else {
  for (const t of [...tokens, joined]) {
    const key = t.replace(/s$/, "") in EN ? t.replace(/s$/, "") : t;
    (EN[key] || []).forEach((s, i) => addBoost(s, 10 - i));
    (ILLUS[key] || []).forEach((c) => conceptHits.add(c));
  }
}

const results = [];
for (const icon of icons) {
  if (publishedOnly && !icon.published) continue;
  let score = slugBoost.get(icon.slug) || 0;
  if (!isArabic) {
    if (icon.slug === tokens.join("-")) score += 25;
    for (const t of tokens) {
      if (icon.words.includes(t)) score += 8;
      else if (t.length >= 3 && icon.words.some((w) => w.startsWith(t) || t.startsWith(w) && w.length >= 4)) score += 3;
      if (icon.category.toLowerCase().includes(t) && t.length >= 4) score += 1;
    }
  }
  if (score <= 0) continue;
  if (icon.published) score += 2;
  results.push({ ...icon, score });
}
results.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
const top = results.slice(0, limit);

const illusMatches = illustrations.filter((il) => {
  const c = il.concept.toLowerCase();
  const cWords = c.split(/[^a-z]+/).filter(Boolean);
  return conceptHits.has(il.concept) || (!isArabic && tokens.some((t) => t.length >= 4 && cWords.includes(t)));
});

if (asJson) {
  console.log(JSON.stringify({ query: rawQuery, icons: top, illustrations: illusMatches.map((i) => i.concept) }, null, 2));
  process.exit(0);
}

const src = iconsPath.includes("references") ? "references/data" : "repo knowledge";
if (!top.length) {
  console.log(`No icon in the Syntropy library matches "${rawQuery}" (data: ${src}).`);
  console.log("Say the concept is not in the library; offer a text label or the closest published icon, and request the Streamline Sharp Line icon from the DS maintainer. Never mix another icon family.");
} else {
  console.log(`Icons for "${rawQuery}" (data: ${src})\n`);
  const pad = (s, n) => (s + " ".repeat(n)).slice(0, n);
  console.log(pad("Component", 34) + pad("Category", 26) + pad("Grid", 7) + "Published");
  for (const r of top) {
    console.log(pad(r.name, 34) + pad(r.category, 26) + pad(r.size + "px", 7) + (r.published ? "yes" : "NO (not in library yet)"));
  }
  if (!top.some((r) => r.published)) {
    console.log("\nNone of the matches is published. Tell the person it exists in the icon file but is not in the library yet, and suggest publishing it or a published alternative.");
  }
}
const DIRECTIONAL = /^(arrow-(left|right)(-2)?|chevron-(left|right)|arrow-diagonal-up-(left|right)|forward|step-forward|mail-send|reply-typing)$/;
if (top.some((r) => DIRECTIONAL.test(r.slug))) {
  console.log("\nRTL: directional icons in these results mirror in Arabic (back points right: arrow-right-2 / chevron-right; next points left). Swap to the counterpart when one exists, otherwise flip that icon only, never the whole row.");
}
const CULTURE = ["piggy", "pig", "dice", "casino", "poker", "gamble", "gambling", "lottery", "wine", "beer", "alcohol"];
if (!isArabic && tokens.some((t) => CULTURE.includes(t))) {
  console.log("\nCulture check: avoid piggy banks, gambling and alcohol imagery for a Saudi, Sharia-compliant audience. For savings use wallet, safe-vault, deposit-box or coins-stack.");
}
if (illusMatches.length) {
  console.log(`\nIllustration concepts (Illustrations set, Property 1, Alignment Left/Right): ${illusMatches.map((i) => i.concept).join(", ")}`);
}
