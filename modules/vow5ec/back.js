/* karsilastirma-tablo-3 — Karşılaştırma — Yapışkan Başlıklı Tablo (1 Kas 2026, T1-B varyant).
   Yer tutucular: kt3basl kt3headrow kt3body. Veri: desing.paketler[] (en çok 5) + json.data[] = [{grup{}?, ad{}, degerler[]}]; tüm paketlerde aynı satır modulex-kt3-ayni sınıfı alır.
   Ortak yardımcılar: esc t guvenliHref gorselYol evet sayi metinleriYaz (desing metinleri kaçışlı). */
var D = json.desing || {};
var L = json.lang || "tr";

/* HTML kaçışı — html'e giden her değer bundan geçer */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/* Dil seçimi: aktif dil → tr → en → ilk anahtar (motorun wmPickLang'i) */
function t(v) { return wmPickLang(v, L); }
/* Bağlantı: dış/mailto/tel/# aynen; iç sayfa adı → dil önekli yol; javascript: vb. reddedilir */
function guvenliHref(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s) || s.charAt(0) === "/") { return s; }
  return wxLangInternalHref(s);
}
/* Görsel yolu: "/" ve http(s) aynen; yalın ad → /img/<ad>; tehlikeli şema → "" */
function gorselYol(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function evet(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}
function sayi(v, d, mn, mx) {
  var n = parseInt(v, 10);
  if (!isFinite(n)) { n = d; }
  return Math.min(mx, Math.max(mn, n));
}
/* desing'deki düz metin / {tr,en,ar} değerlerini {{anahtar}} yerine KAÇIŞLI yazar.
   Motor aynı yer tutucuyu ham yazardı; back.js önce davrandığı için kaçışsız değer html'e ulaşmaz. */
function metinleriYaz() {
  var k;
  for (k in D) {
    if (!Object.prototype.hasOwnProperty.call(D, k)) { continue; }
    var v = D[k];
    if (v == null) { continue; }
    var dilli = typeof v === "object" && !Array.isArray(v) && (typeof v.tr === "string" || typeof v.en === "string");
    if (typeof v === "object" && !dilli) { continue; }
    var deger = esc(t(v));
    var desen = new RegExp("\\{\\{" + String(k).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\}\\}", "g");
    html = html.replace(desen, function () { return deger; });
  }
}

var kt3Paket = Array.isArray(D.paketler) ? D.paketler.slice(0, 5) : [];
var kt3Src = Array.isArray(json.data) ? json.data : [];
var kt3Yes = t(D.yesLabel);
var kt3No = t(D.noLabel);
var kt3Oner = t(D.recommendedLabel);
var kt3CtaDef = t(D.ctaLabel);
var kt3Cols = kt3Paket.length + 1;
function kt3Bool(v) { return !(v === false || v === "false" || v === 0 || v === "0" || v == null || v === ""); }
/* hücre karşılaştırma anahtarı: aynı mı? */
function kt3Anahtar(v) {
  if (v === true || v === "true") { return "1"; }
  if (v === false || v === "false" || v == null || v === "") { return "0"; }
  return "s:" + (typeof v === "object" ? t(v) : String(v));
}
function kt3Hucre(v) {
  if (v === true || v === "true") {
    return '<span class="modulex-kt3-evet"><span class="material-symbols-outlined" aria-hidden="true">check</span><span class="modulex-kt3-sr">' + esc(kt3Yes) + "</span></span>";
  }
  if (v === false || v === "false" || v == null || v === "") {
    return '<span class="modulex-kt3-hayir"><span class="material-symbols-outlined" aria-hidden="true">remove</span><span class="modulex-kt3-sr">' + esc(kt3No) + "</span></span>";
  }
  return esc(typeof v === "object" ? t(v) : String(v));
}

var kt3Head = '<th scope="col" class="modulex-kt3-ilk">' + esc(t(D.featureHeader)) + "</th>";
var kt3i;
for (kt3i = 0; kt3i < kt3Paket.length; kt3i++) {
  var p = kt3Paket[kt3i] || {};
  var oner = kt3Bool(p.onerilen);
  var url = guvenliHref(p.url);
  var cta = t(p.ctaLabel) || kt3CtaDef;
  kt3Head += '<th scope="col" class="modulex-kt3-paket' + (oner ? " modulex-kt3-oner" : "") + '">' +
    (oner && kt3Oner ? '<span class="modulex-kt3-rozet">' + esc(kt3Oner) + "</span>" : "") +
    '<span class="modulex-kt3-ad">' + esc(t(p.ad)) + "</span>" +
    (p.fiyat ? '<span class="modulex-kt3-fiyat"><bdi dir="ltr">' + esc(String(p.fiyat)) + "</bdi></span>" : "") +
    (url && cta ? '<a class="modulex-kt3-btn" href="' + esc(url) + '">' + esc(cta) + "</a>" : "") + "</th>";
}

var kt3Body = "";
var kt3Acik = false;
var kt3r;
for (kt3r = 0; kt3r < kt3Src.length; kt3r++) {
  var row = kt3Src[kt3r] || {};
  var ad = t(row.ad);
  if (!ad) { continue; }
  var grup = t(row.grup);
  if (grup || !kt3Acik) {
    kt3Body += (kt3Acik ? "</tbody>" : "") + "<tbody>";
    kt3Acik = true;
    if (grup) { kt3Body += '<tr class="modulex-kt3-grup"><th scope="colgroup" colspan="' + kt3Cols + '">' + esc(grup) + "</th></tr>"; }
  }
  var degerler = Array.isArray(row.degerler) ? row.degerler : [];
  var ilkAnahtar = kt3Anahtar(degerler[0]);
  var ayni = kt3Paket.length > 1;
  var hucreler = "";
  for (kt3i = 0; kt3i < kt3Paket.length; kt3i++) {
    if (kt3Anahtar(degerler[kt3i]) !== ilkAnahtar) { ayni = false; }
    hucreler += '<td class="' + (kt3Bool((kt3Paket[kt3i] || {}).onerilen) ? "modulex-kt3-oner" : "") + '">' + kt3Hucre(degerler[kt3i]) + "</td>";
  }
  kt3Body += '<tr class="modulex-kt3-satir' + (ayni ? " modulex-kt3-ayni" : "") + '"><th scope="row" class="modulex-kt3-ilk">' + esc(ad) + "</th>" + hucreler + "</tr>";
}
if (kt3Acik) { kt3Body += "</tbody>"; }

var kt3Basl = (t(D.title) || t(D.description))
  ? '<header class="modulex-kt3-head">' + (t(D.title) ? '<h2 class="modulex-kt3-title">' + esc(t(D.title)) + "</h2>" : "") +
    (t(D.description) ? '<p class="modulex-kt3-desc">' + esc(t(D.description)) + "</p>" : "") + "</header>"
  : "";

html = html.replace(/\{\{kt3basl\}\}/g, function () { return kt3Basl; });
html = html.replace(/\{\{kt3headrow\}\}/g, function () { return kt3Head; });
html = html.replace(/\{\{kt3body\}\}/g, function () { return kt3Body; });
metinleriYaz();
