/* hero-6 — Bento hero (31 Eki 2026, G8-A).
   Yer tutucular: h6stil h6kartlar h6ctalar — koşulsuz. Kartlar: json.data[] (dizi) ya da json.data.kartlar / desing.kartlar;
   {tur: gorsel|sayi|alinti|cta, …}. Tanınmayan tür atlanır. wmPickLang güvenli sarmal; yalnız var + klasik for. */
function h6Dil(v) {
  if (v == null) { return ""; }
  if (typeof v !== "object") { return String(v); }
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return v[json.lang] != null ? String(v[json.lang]) : (v.tr != null ? String(v.tr) : (v.en != null ? String(v.en) : ""));
}
function h6Esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function h6Url(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file):/i.test(s)) { return ""; }
  if (/^data:/i.test(s)) { return /^data:image\//i.test(s) ? s : ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function h6Href(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) { return s; }
  return wxLangInternalHref(s);
}
function h6Ikon(v, d) {
  var s = String(v == null ? "" : v).trim();
  return /^[a-z0-9_]{1,40}$/.test(s) ? s : d;
}

var h6Des = json.desing || {};
var h6Stil = String(h6Des.stil || "bento").trim();
if (h6Stil !== "bento" && h6Stil !== "mozaik" && h6Stil !== "duz") { h6Stil = "bento"; }

var h6Liste = [];
if (Array.isArray(json.data) && json.data.length) { h6Liste = json.data; }
else if (json.data && Array.isArray(json.data.kartlar)) { h6Liste = json.data.kartlar; }
else if (Array.isArray(h6Des.kartlar)) { h6Liste = h6Des.kartlar; }

var h6Kartlar = "";
for (var h6i = 0; h6i < h6Liste.length; h6i++) {
  var k = h6Liste[h6i] || {};
  var tur = String(k.tur || "").trim();
  if (tur === "gorsel") {
    var kImg = h6Url(k.img);
    var kAlt = h6Dil(k.alt);
    var kEtiket = h6Dil(k.etiket).trim();
    h6Kartlar += '<div class="modulex-h6-kart modulex-h6-kart--gorsel modulex-h6-in">' +
      (kImg
        ? '<img class="modulex-h6-img" src="' + h6Esc(kImg) + '" alt="' + h6Esc(kAlt) + '" width="1200" height="800" loading="eager" fetchpriority="high" decoding="async" />'
        : '<div class="modulex-h6-ph" role="img" aria-label="' + h6Esc(kAlt) + '"><span class="material-symbols-outlined" aria-hidden="true">image</span></div>') +
      (kEtiket ? '<span class="modulex-h6-etiket">' + h6Esc(kEtiket) + "</span>" : "") + "</div>";
  } else if (tur === "sayi") {
    var kDeger = h6Dil(k.deger).trim();
    if (!kDeger) { continue; }
    h6Kartlar += '<div class="modulex-h6-kart modulex-h6-kart--sayi modulex-h6-in">' +
      '<span class="material-symbols-outlined" aria-hidden="true">' + h6Ikon(k.icon, "insights") + "</span>" +
      '<span><bdi class="modulex-h6-deger">' + h6Esc(kDeger) + '</bdi><span class="modulex-h6-sayi-etiket">' + h6Esc(h6Dil(k.etiket)) + "</span></span></div>";
  } else if (tur === "alinti") {
    var kMetin = h6Dil(k.metin).trim();
    if (!kMetin) { continue; }
    var kKisi = h6Dil(k.kisi).trim();
    var kRol = h6Dil(k.rol).trim();
    h6Kartlar += '<figure class="modulex-h6-kart modulex-h6-kart--alinti modulex-h6-in" style="margin:0">' +
      '<span class="modulex-h6-tirnak" aria-hidden="true">&ldquo;</span>' +
      '<blockquote class="modulex-h6-alinti" style="margin:0">' + h6Esc(kMetin) + "</blockquote>" +
      (kKisi ? '<figcaption class="modulex-h6-kisi"><b>' + h6Esc(kKisi) + "</b>" + (kRol ? " &middot; " + h6Esc(kRol) : "") + "</figcaption>" : "") + "</figure>";
  } else if (tur === "cta") {
    var kBaslik = h6Dil(k.baslik).trim();
    var kCta = h6Dil(k.cta).trim();
    var kUrl = h6Href(k.url);
    if (!kBaslik) { continue; }
    h6Kartlar += '<div class="modulex-h6-kart modulex-h6-kart--cta modulex-h6-in">' +
      '<span class="material-symbols-outlined" aria-hidden="true">' + h6Ikon(k.icon, "arrow_outward") + "</span>" +
      "<h3>" + h6Esc(kBaslik) + "</h3>" +
      (h6Dil(k.metin).trim() ? "<p>" + h6Esc(h6Dil(k.metin)) + "</p>" : "") +
      (kCta && kUrl ? '<a class="modulex-h6-mini" href="' + h6Esc(kUrl) + '">' + h6Esc(kCta) + '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>' : "") +
      "</div>";
  }
}

var h6Ctalar = "";
var h6C1 = h6Dil(h6Des.cta1).trim();
var h6C1Url = h6Href(h6Des.cta1_url);
if (h6C1 && h6C1Url) {
  h6Ctalar += '<a class="modulex-h6-cta modulex-h6-cta--dolgu" href="' + h6Esc(h6C1Url) + '">' + h6Esc(h6C1) + '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>';
}
var h6C2 = h6Dil(h6Des.cta2).trim();
var h6C2Url = h6Href(h6Des.cta2_url);
if (h6C2 && h6C2Url) {
  h6Ctalar += '<a class="modulex-h6-cta modulex-h6-cta--cerceve" href="' + h6Esc(h6C2Url) + '">' + h6Esc(h6C2) + "</a>";
}

html = html
  .replace(/\{\{h6stil\}\}/g, function () { return h6Stil; })
  .replace(/\{\{h6kartlar\}\}/g, function () { return h6Kartlar; })
  .replace(/\{\{h6ctalar\}\}/g, function () { return h6Ctalar; });
