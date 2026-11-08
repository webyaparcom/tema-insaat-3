/* onceki-sonra - sunucu tarafi: cift/kare verisini dile cozer, kaydirici isaretlemesini ve istemci verisini uretir.
   Yer tutucular: osvars osclass oshead osstage osriza osnav ostools osempty osveri.
   Veri: json.data (yoksa desing.pairs) = [{before, after, title{}, note{}, date?}].
   mode "karsilastir": her cift bir karsilastirma; mode "ilerleme": kareler (after||before) sirali zaman seridi.
   Riza: desing.rizaAlindi true degilse gorsel yolu hic basilmaz (HTML + istemci verisi), notr yer tutucu kalir; desing.riza ibaresi her durumda gosterilir. */
var osDes = json.desing || {};
var osLang = json.lang || "tr";

function osEsc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function osBool(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}

function osPick(v) {
  return wmPickLang(v, osLang);
}

function osImg(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file):/i.test(s)) { return ""; }
  if (/^data:/i.test(s)) { return /^data:image\//i.test(s) ? s : ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}

var osPairs = json.data && json.data.length ? json.data : (Array.isArray(osDes.pairs) ? osDes.pairs : []);
var osProg = String(osDes.mode || "karsilastir") === "ilerleme";
var osVert = String(osDes.orientation || "h") === "v";
var osLightbox = osBool(osDes.lightbox, true);
var osRizaVar = osBool(osDes.rizaAlindi, false);
var osStart = parseInt(osDes.start, 10);
if (!isFinite(osStart)) { osStart = 50; }
osStart = Math.min(100, Math.max(0, osStart));
var osPlayMs = parseInt(osDes.playMs, 10);
if (!isFinite(osPlayMs)) { osPlayMs = 1500; }
osPlayMs = Math.min(8000, Math.max(600, osPlayMs));

var osRatioM = /^(\d{1,2}):(\d{1,2})$/.exec(String(osDes.ratio || "16:9"));
var osVars = "--os-ar:" + (osRatioM && Number(osRatioM[1]) > 0 && Number(osRatioM[2]) > 0 ? osRatioM[1] + " / " + osRatioM[2] : "16 / 9") + ";";
var osClass = (osProg ? " modulex-os-prog" : (" modulex-os-cmp" + (osVert ? " modulex-os-v" : " modulex-os-h")));

var osLabels = osDes.labels || {};
var osLabBefore = osPick(osLabels.before);
var osLabAfter = osPick(osLabels.after);
var osSlider = osPick(osDes.sliderLabel);
var osN = osPairs.length;

/* Gorsel katmani: gorsel varsa <img>, yoksa notr yer tutucu (etiket + ikon) */
function osLayer(src, alt, cls, phIcon, phText, tone, sty) {
  var st = sty ? ' style="' + sty + '"' : "";
  if (src) {
    return '<div class="modulex-os-layer ' + cls + '"' + st + '><img class="modulex-os-img" src="' + osEsc(src) + '" alt="' + osEsc(alt) +
      '" loading="lazy" decoding="async" /></div>';
  }
  return '<div class="modulex-os-layer ' + cls + '"' + st + '><span class="modulex-os-ph' + (tone ? " " + tone : "") + '" role="img" aria-label="' + osEsc(alt) + '">' +
    '<span class="material-symbols-outlined" aria-hidden="true">' + phIcon + "</span>" +
    (phText ? '<span class="modulex-os-ph-t">' + osEsc(phText) + "</span>" : "") + "</span></div>";
}

var osStage = "";
var osCaps = "";
var osTicks = "";
var osClient = [];
var osi;
for (osi = 0; osi < osN; osi++) {
  var p = osPairs[osi] || {};
  var title = osPick(p.title);
  var note = osPick(p.note);
  var date = osPick(p.date);
  var before = osRizaVar ? osImg(p.before) : "";
  var after = osRizaVar ? osImg(p.after) : "";
  osClient.push({ before: before, after: after, title: title, date: date });

  var capHtml = '<figcaption class="modulex-os-cap">' +
    (title ? '<strong class="modulex-os-cap-t">' + osEsc(title) + "</strong>" : "") +
    (date ? ' <bdi class="modulex-os-cap-d">' + osEsc(date) + "</bdi>" : "") +
    (note ? '<span class="modulex-os-cap-n">' + osEsc(note) + "</span>" : "") + "</figcaption>";

  if (osProg) {
    var frameSrc = after || before;
    var frameTxt = date || title;
    osStage += osLayer(frameSrc, (title || frameTxt) + (date ? " - " + date : ""), "modulex-os-fr" + (osi === 0 ? " modulex-os-on" : ""),
      "construction", frameTxt, "modulex-os-tone", "--os-t:" + (osN > 1 ? Math.round(osi / (osN - 1) * 60) : 0));
    osCaps += '<div class="modulex-os-capwrap" data-os-i="' + osi + '"' + (osi === 0 ? "" : " hidden") + ">" + capHtml + "</div>";
    osTicks += '<button type="button" class="modulex-os-tick" data-os-i="' + osi + '"' + (osi === 0 ? ' aria-current="true"' : "") + ">" +
      '<bdi>' + osEsc(date || title || String(osi + 1)) + "</bdi></button>";
  } else {
    var hasImg = before || after;
    osStage += '<figure class="modulex-os-pair" data-os-i="' + osi + '"' + (osi === 0 ? "" : " hidden") + ">" +
      '<div class="modulex-os-frame" data-os-frame style="--os-pos:' + osStart + '">' +
      osLayer(after, (title ? title + " - " : "") + osLabAfter, "modulex-os-after", "auto_awesome", osLabAfter, "modulex-os-tone-a") +
      osLayer(before, (title ? title + " - " : "") + osLabBefore, "modulex-os-before", "history", osLabBefore, "modulex-os-tone-b") +
      '<span class="modulex-os-tag modulex-os-tag-b" aria-hidden="true">' + osEsc(osLabBefore) + "</span>" +
      '<span class="modulex-os-tag modulex-os-tag-a" aria-hidden="true">' + osEsc(osLabAfter) + "</span>" +
      '<input class="modulex-os-range" type="range" min="0" max="100" step="1" value="' + osStart + '" aria-label="' +
      osEsc((title ? title + " - " : "") + osSlider) + '" />' +
      '<span class="modulex-os-handle" aria-hidden="true"><span class="modulex-os-line"></span><span class="modulex-os-knob">' +
      '<span class="material-symbols-outlined">' + (osVert ? "swap_vert" : "swap_horiz") + "</span></span></span>" +
      (osLightbox && hasImg ? '<button type="button" class="modulex-os-zoom" data-os-zoom aria-haspopup="dialog" aria-label="' +
        osEsc(osPick(osDes.enlargeLabel)) + '"><span class="material-symbols-outlined" aria-hidden="true">open_in_full</span></button>' : "") +
      "</div>" + capHtml + "</figure>";
  }
}

/* Ilerleme kipi: sahne + tarih rozeti + oynat + kaydirici + sekmeler */
var osToolsHtml = "";
var osStageHtml = "";
var osNavHtml = "";
if (osN) {
  if (osProg) {
    var hasAny = false;
    for (osi = 0; osi < osN; osi++) { if (osClient[osi].before || osClient[osi].after) { hasAny = true; } }
    osStageHtml = '<div class="modulex-os-frame modulex-os-pframe" data-os-frame>' + osStage +
      '<span class="modulex-os-date" role="status" aria-live="polite" aria-atomic="true">' + osEsc(osClient[0].date || osClient[0].title) + "</span>" +
      (osLightbox && hasAny ? '<button type="button" class="modulex-os-zoom" data-os-zoom aria-haspopup="dialog" aria-label="' +
        osEsc(osPick(osDes.enlargeLabel)) + '"><span class="material-symbols-outlined" aria-hidden="true">open_in_full</span></button>' : "") +
      "</div>" + osCaps;
    osToolsHtml = '<div class="modulex-os-prog-bar">' +
      '<button type="button" class="modulex-os-play" data-os-play aria-label="' + osEsc(osPick(osDes.playLabel)) + '"' + (osN < 2 ? " disabled" : "") + ">" +
      '<span class="material-symbols-outlined" aria-hidden="true">play_arrow</span></button>' +
      '<input class="modulex-os-prange" type="range" min="0" max="' + Math.max(0, osN - 1) + '" step="1" value="0" aria-label="' +
      osEsc(osPick(osDes.progressLabel)) + '"' + (osN < 2 ? " disabled" : "") + " /></div>" +
      '<div class="modulex-os-ticks" role="group" aria-label="' + osEsc(osPick(osDes.timelineLabel)) + '">' + osTicks + "</div>";
  } else {
    osStageHtml = osStage;
    if (osN > 1) {
      osNavHtml = '<div class="modulex-os-nav">' +
        '<button type="button" class="modulex-os-navbtn" data-os-nav="-1" aria-label="' + osEsc(osPick(osDes.prevLabel)) + '">' +
        '<span class="material-symbols-outlined mx-flip" aria-hidden="true">chevron_left</span></button>' +
        '<span class="modulex-os-count" role="status" aria-live="polite" aria-atomic="true">' +
        osEsc(String(osPick(osDes.counterText)).replace("{i}", "1").replace("{n}", String(osN))) + "</span>" +
        '<button type="button" class="modulex-os-navbtn" data-os-nav="1" aria-label="' + osEsc(osPick(osDes.nextLabel)) + '">' +
        '<span class="material-symbols-outlined mx-flip" aria-hidden="true">chevron_right</span></button></div>';
    }
  }
}

var osTitle = osPick(osDes.title);
var osDesc = osPick(osDes.description);
var osHead = "";
if (osTitle || osDesc) {
  osHead = '<header class="modulex-os-head">' +
    (osTitle ? '<h2 class="modulex-os-title">' + osEsc(osTitle) + "</h2>" : "") +
    (osDesc ? '<p class="modulex-os-desc">' + osEsc(osDesc) + "</p>" : "") + "</header>";
}
var osRizaTxt = osPick(osDes.riza);
var osRiza = osN && osRizaTxt ? '<p class="modulex-os-riza" role="note"><span class="material-symbols-outlined" aria-hidden="true">verified_user</span><span>' + osEsc(osRizaTxt) + "</span></p>" : "";
var osEmpty = osN ? "" : '<p class="modulex-os-empty">' + osEsc(osPick(osDes.emptyText)) + "</p>";

var osLbLabels = {};
var osLbSrc = osDes.lightboxLabels || {};
var osLk;
for (osLk in osLbSrc) {
  if (Object.prototype.hasOwnProperty.call(osLbSrc, osLk)) { osLbLabels[osLk] = osPick(osLbSrc[osLk]); }
}

var osVeri = JSON.stringify({
  lang: osLang,
  prog: osProg,
  vert: osVert,
  n: osN,
  lightbox: osLightbox,
  playMs: osPlayMs,
  labels: { before: osLabBefore, after: osLabAfter },
  text: {
    value: osPick(osDes.valueText),
    frame: osPick(osDes.frameText),
    counter: osPick(osDes.counterText),
    play: osPick(osDes.playLabel),
    pause: osPick(osDes.pauseLabel)
  },
  lb: osLbLabels,
  pairs: osClient
}).replace(/</g, "\\u003c");

html = html.replace(/\{\{osvars\}\}/g, function () { return osVars; });
html = html.replace(/\{\{osclass\}\}/g, function () { return osClass; });
html = html.replace(/\{\{oshead\}\}/g, function () { return osHead; });
html = html.replace(/\{\{osstage\}\}/g, function () { return osStageHtml; });
html = html.replace(/\{\{osnav\}\}/g, function () { return osNavHtml; });
html = html.replace(/\{\{osriza\}\}/g, function () { return osRiza; });
html = html.replace(/\{\{ostools\}\}/g, function () { return osToolsHtml; });
html = html.replace(/\{\{osempty\}\}/g, function () { return osEmpty; });
html = html.replace(/\{\{osveri\}\}/g, function () { return osVeri; });
