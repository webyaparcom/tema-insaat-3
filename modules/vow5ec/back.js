/* karsilastirma-tablo — sunucu tarafı: paket sütunları + özellik satırları; yer tutucular: ktclass kthead ktheadrow ktrows ktfoot.
   Veri: desing.paketler[] = [{id, ad{}, fiyat, fiyatNot{}, onerilen, ctaLabel{}?, url}]; json.data[] = [{ad{}, degerler[]}]
   deger: true/false → ✓/✗ (ekran okuyucu metni yesLabel/noLabel); sayı/metin/{tr,en,ar} → metin. */
var ktDes = json.desing || {};
var ktLang = json.lang || "tr";

function ktEsc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function ktPick(v) { return wmPickLang(v, ktLang); }
function ktHref(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s) || s.charAt(0) === "/") { return s; }
  return wxLangInternalHref(s);
}
function ktBool(v) { return !(v === false || v === "false" || v === 0 || v === "0" || v == null || v === ""); }

var ktStil = String(ktDes.stil || "cizgili");
if (ktStil !== "cizgili" && ktStil !== "kartli-sutun" && ktStil !== "sade") { ktStil = "cizgili"; }

var ktPaketler = Array.isArray(ktDes.paketler) ? ktDes.paketler.slice(0, 4) : [];
var ktRowsSrc = [];
if (Array.isArray(json.data) && json.data.length) { ktRowsSrc = json.data; }
else if (json.data && Array.isArray(json.data.satirlar)) { ktRowsSrc = json.data.satirlar; }
else if (Array.isArray(ktDes.satirlar)) { ktRowsSrc = ktDes.satirlar; }

var ktYes = ktPick(ktDes.yesLabel);
var ktNo = ktPick(ktDes.noLabel);
var ktOnerTxt = ktPick(ktDes.recommendedLabel);
var ktCtaDef = ktPick(ktDes.ctaLabel);
var ktOnerVar = false;
var kti;
for (kti = 0; kti < ktPaketler.length; kti++) { if (ktPaketler[kti] && ktBool(ktPaketler[kti].onerilen)) { ktOnerVar = true; } }

/* Başlık satırı */
var ktHeadRow = '<th scope="col" class="modulex-kt-ilk">' + ktEsc(ktPick(ktDes.featureHeader)) + "</th>";
for (kti = 0; kti < ktPaketler.length; kti++) {
  var p = ktPaketler[kti] || {};
  var oner = ktBool(p.onerilen);
  var fiyat = p.fiyat != null ? String(p.fiyat) : "";
  var fiyatNot = ktPick(p.fiyatNot);
  ktHeadRow += '<th scope="col" class="modulex-kt-paket' + (oner ? " modulex-kt-oner" : "") + '">' +
    (oner && ktOnerTxt ? '<span class="modulex-kt-rozet">' + ktEsc(ktOnerTxt) + "</span>" : (ktOnerVar ? '<span class="modulex-kt-rozet modulex-kt-rozet-bos" aria-hidden="true"></span>' : "")) +
    '<span class="modulex-kt-ad">' + ktEsc(ktPick(p.ad)) + "</span>" +
    (fiyat ? '<span class="modulex-kt-fiyat"><bdi dir="ltr">' + ktEsc(fiyat) + "</bdi></span>" : "") +
    (fiyatNot ? '<span class="modulex-kt-fiyat-not">' + ktEsc(fiyatNot) + "</span>" : "") +
    "</th>";
}

/* Hücre değeri */
function ktHucre(v) {
  if (v === true || v === "true") {
    return '<span class="modulex-kt-evet"><span class="material-symbols-outlined" aria-hidden="true">check</span><span class="modulex-kt-sr">' + ktEsc(ktYes) + "</span></span>";
  }
  if (v === false || v === "false" || v == null || v === "") {
    return '<span class="modulex-kt-hayir"><span class="material-symbols-outlined" aria-hidden="true">close</span><span class="modulex-kt-sr">' + ktEsc(ktNo) + "</span></span>";
  }
  if (typeof v === "object") { return ktEsc(ktPick(v)); }
  return ktEsc(String(v));
}

/* Özellik satırları */
var ktRows = "";
var ktr;
for (ktr = 0; ktr < ktRowsSrc.length; ktr++) {
  var row = ktRowsSrc[ktr] || {};
  var ad = ktPick(row.ad);
  if (!ad) { continue; }
  var degerler = Array.isArray(row.degerler) ? row.degerler : [];
  ktRows += '<tr><th scope="row" class="modulex-kt-ilk">' + ktEsc(ad) + "</th>";
  for (kti = 0; kti < ktPaketler.length; kti++) {
    var oner2 = ktBool((ktPaketler[kti] || {}).onerilen);
    ktRows += '<td class="' + (oner2 ? "modulex-kt-oner" : "") + '">' + ktHucre(degerler[kti]) + "</td>";
  }
  ktRows += "</tr>";
}

/* CTA satırı */
var ktFoot = '<td class="modulex-kt-ilk"></td>';
var ktFootVar = false;
for (kti = 0; kti < ktPaketler.length; kti++) {
  var p2 = ktPaketler[kti] || {};
  var url = ktHref(p2.url);
  var cta = ktPick(p2.ctaLabel) || ktCtaDef;
  var oner3 = ktBool(p2.onerilen);
  ktFoot += '<td class="' + (oner3 ? "modulex-kt-oner" : "") + '">' +
    (url && cta ? '<a class="modulex-kt-btn" href="' + ktEsc(url) + '">' + ktEsc(cta) + "</a>" : "") + "</td>";
  if (url && cta) { ktFootVar = true; }
}
if (!ktFootVar) { ktFoot = ""; }

var ktEyebrow = ktPick(ktDes.eyebrow);
var ktTitle = ktPick(ktDes.title);
var ktDesc = ktPick(ktDes.description);
var ktHead = "";
if (ktEyebrow || ktTitle || ktDesc) {
  ktHead = '<header class="modulex-kt-head">' +
    (ktEyebrow ? '<p class="modulex-kt-eyebrow">' + ktEsc(ktEyebrow) + "</p>" : "") +
    (ktTitle ? '<h2 class="modulex-kt-title">' + ktEsc(ktTitle) + "</h2>" : "") +
    (ktDesc ? '<p class="modulex-kt-desc">' + ktEsc(ktDesc) + "</p>" : "") + "</header>";
}

html = html.replace(/\{\{ktclass\}\}/g, function () { return " modulex-kt-" + ktStil; });
html = html.replace(/\{\{kthead\}\}/g, function () { return ktHead; });
html = html.replace(/\{\{ktheadrow\}\}/g, function () { return ktHeadRow; });
html = html.replace(/\{\{ktrows\}\}/g, function () { return ktRows; });
html = html.replace(/\{\{ktfoot\}\}/g, function () { return ktFoot; });
if (!ktFootVar) { html = html.replace(/<tfoot><tr><\/tr><\/tfoot>/, ""); }
