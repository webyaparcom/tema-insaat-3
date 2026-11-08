/* menu-9 — Ortalı logo menü (31 Eki 2026, G8-A).
   Yer tutucular: m9stil m9sinif m9band m9bandmobil m9sol m9sag m9tum — koşulsuz. {{langbar}} moduleRender çözer.
   Öğeler: @home@ + pagesetting sayfaları (status play, category "") + json.data[] ek bağlantıları ({name{}, url}).
   Bölme: sol = floor(n/2), sağ = kalan (tek sayıda fazlası sağa). wmPickLang güvenli sarmal; yalnız var + klasik for. */
function m9Dil(v) {
  if (v == null) { return ""; }
  if (typeof v !== "object") { return String(v); }
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return v[json.lang] != null ? String(v[json.lang]) : (v.tr != null ? String(v.tr) : (v.en != null ? String(v.en) : ""));
}
function m9Esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function m9Href(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) { return s; }
  return wxLangInternalHref(s);
}
function m9Dogru(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}

var m9Des = json.desing || {};
var m9Setting = (webmakerdata && webmakerdata.setting) || {};
var m9Sayfa = page || {};

var m9Stil = String(m9Des.stil || "ince").trim();
if (m9Stil !== "ince" && m9Stil !== "cizgili" && m9Stil !== "kutulu") { m9Stil = "ince"; }

/* --- menü öğeleri --- */
var m9Ogeler = [];
var m9AnaAktif = !m9Sayfa.path || m9Sayfa.path === "";
m9Ogeler.push({ ad: "@home@", href: wxLangInternalHref(""), aktif: m9AnaAktif });
var m9Ps = (webmakerdata && webmakerdata.pagesetting && Array.isArray(webmakerdata.pagesetting.data))
  ? webmakerdata.pagesetting.data.find(function (it) { return it && it.modulestatus && it.modulestatus.page; })
  : null;
if (m9Ps && webmakerdata[m9Ps.path] && Array.isArray(webmakerdata[m9Ps.path].data)) {
  var m9Satirlar = webmakerdata[m9Ps.path].data;
  for (var m9i = 0; m9i < m9Satirlar.length; m9i++) {
    var m9R = m9Satirlar[m9i] || {};
    if (m9R.status !== "play" || (m9R.category || "") !== "") { continue; }
    var m9Ad = m9Dil(m9R.name).trim();
    if (!m9Ad) { continue; }
    var m9Yol = m9R.pathnext || m9R.path || "";
    m9Ogeler.push({ ad: m9Esc(m9Ad), href: wxLangInternalHref(m9Yol), aktif: !!m9Sayfa.path && m9Sayfa.path === m9R.path });
  }
}
var m9Ek = Array.isArray(json.data) ? json.data : [];
for (var m9j = 0; m9j < m9Ek.length; m9j++) {
  var m9E = m9Ek[m9j] || {};
  var m9EAd = m9Dil(m9E.name || m9E.text).trim();
  var m9EUrl = m9Href(m9E.url || m9E.href);
  if (m9EAd && m9EUrl) { m9Ogeler.push({ ad: m9Esc(m9EAd), href: m9EUrl, aktif: false }); }
}
function m9Li(o) {
  return '<li><a class="modulex-m9-oge" href="' + m9Esc(o.href) + '"' + (o.aktif ? ' aria-current="page"' : "") + ">" + o.ad + "</a></li>";
}
var m9Yarim = Math.floor(m9Ogeler.length / 2);
var m9Sol = "", m9Sag = "", m9Tum = "";
for (var m9k = 0; m9k < m9Ogeler.length; m9k++) {
  var m9Li1 = m9Li(m9Ogeler[m9k]);
  m9Tum += m9Li1;
  if (m9k < m9Yarim) { m9Sol += m9Li1; } else { m9Sag += m9Li1; }
}

/* --- bilgi bandı --- */
var m9Tel = m9Dil(m9Des.phone).trim() || (typeof m9Setting.phone === "string" ? m9Setting.phone.trim() : "");
var m9Posta = m9Dil(m9Des.email).trim() || (typeof m9Setting.email === "string" ? m9Setting.email.trim() : "");
var m9Saat = m9Dil(m9Des.hours).trim();
var m9BilgiLi = "";
if (m9Tel) { m9BilgiLi += '<li><span class="material-symbols-outlined" aria-hidden="true">call</span><a class="modulex-m9-bilgi-link" href="tel:' + m9Tel.replace(/[^+\d]/g, "") + '" dir="ltr">' + m9Esc(m9Tel) + "</a></li>"; }
if (m9Posta) { m9BilgiLi += '<li><span class="material-symbols-outlined" aria-hidden="true">mail</span><a class="modulex-m9-bilgi-link" href="mailto:' + m9Esc(m9Posta) + '">' + m9Esc(m9Posta) + "</a></li>"; }
if (m9Saat) { m9BilgiLi += '<li><span class="material-symbols-outlined" aria-hidden="true">schedule</span><span>' + m9Esc(m9Saat) + "</span></li>"; }
var m9Sosyal = "";
if (Array.isArray(m9Des.social)) {
  for (var m9s = 0; m9s < m9Des.social.length; m9s++) {
    var m9S = m9Des.social[m9s] || {};
    var m9SAd = m9Dil(m9S.ad || m9S.name).trim();
    var m9SUrl = typeof m9S.url === "string" ? m9S.url.trim() : "";
    if (m9SAd && m9SUrl && !/^\s*(javascript|vbscript|data):/i.test(m9SUrl)) {
      m9Sosyal += '<a class="modulex-m9-chip" href="' + m9Esc(m9SUrl) + '" target="_blank" rel="noopener noreferrer">' + m9Esc(m9SAd) + "</a>";
    }
  }
}
var m9BandAcik = m9Dogru(m9Des.bilgi_bandi, true) && (m9BilgiLi || m9Sosyal);
var m9Band = m9BandAcik
  ? '<div class="modulex-m9-band"><div class="modulex-m9-band-ic">' +
    (m9BilgiLi ? '<ul class="modulex-m9-bilgi">' + m9BilgiLi + "</ul>" : "<span></span>") +
    '<div class="modulex-m9-band-sag">' + (m9Sosyal ? '<div class="modulex-m9-sosyal">' + m9Sosyal + "</div>" : "") + "{{langbar}}</div></div></div>"
  : "";
var m9BandMobil = (m9BilgiLi || m9Sosyal)
  ? (m9BilgiLi ? '<ul class="modulex-m9-bilgi">' + m9BilgiLi + "</ul>" : "") + (m9Sosyal ? '<div class="modulex-m9-sosyal">' + m9Sosyal + "</div>" : "")
  : "";

var m9Sinif = (m9BandAcik ? " modulex-m9-bandli" : " modulex-m9-bandsiz") + (m9Dogru(m9Des.sticky, true) ? " modulex-m9-sticky" : "");

html = html
  .replace(/\{\{m9stil\}\}/g, function () { return m9Stil; })
  .replace(/\{\{m9sinif\}\}/g, function () { return m9Sinif; })
  .replace(/\{\{m9band\}\}/g, function () { return m9Band; })
  .replace(/\{\{m9bandmobil\}\}/g, function () { return m9BandMobil; })
  .replace(/\{\{m9sol\}\}/g, function () { return m9Sol; })
  .replace(/\{\{m9sag\}\}/g, function () { return m9Sag; })
  .replace(/\{\{m9tum\}\}/g, function () { return m9Tum; });
