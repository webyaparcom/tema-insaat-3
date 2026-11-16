/* zaman-ray — Yatay zaman/süreç rayı (15 Kas 2026, G4 · mcp:webmaker/20261115-202337-k60m · D17–D18).
   Yer tutucular: zrysinif zryust zrybaslik zrymetin zryadimlar zrykontrol zryetiket.
   data: [{ etiket (yıl/adım adı), baslik, metin?, ikon?, img? }] — metinler dil sözlüğü. etiket boşsa sıra numarası basılır (süreç kipi).
   Ray yatay kaydırılır (scroll-snap); önceki/sonraki düğmeleri (@previous@ @next@) + ilerleme çubuğu. RTL'de kaydırma yönü çevrilir.
   Veri yoksa blok basılmaz. */
const pick = (v) => {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return String(v[json.lang] ?? Object.values(v)[0] ?? "");
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const medyaUrl = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) return "";
  if (/^data:/i.test(s)) return /^data:(image|video|audio)\//i.test(s) ? s : "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `/img/${s}`;
};
const href = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|data):/i.test(s)) return "";
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) return s;
  return wxLangInternalHref(s);
};
const dogru = (v, d) => (v === undefined || v === null || v === "") ? d : !(v === false || v === "false" || v === 0 || v === "0");
const ikonAd = (v) => String(v ?? "").trim().replace(/[^a-z0-9_]/gi, "");
const satirlar = (s) => esc(s).replace(/\r?\n/g, "<br />");
const { desing: des = {} } = json;
const setting = webmakerdata?.setting ?? {};
const veri = Array.isArray(json.data) ? json.data : [];

const adimlar = veri
  .map((o) => ({ etiket: pick(o && o.etiket).trim(), baslik: pick(o && o.baslik).trim(), metin: pick(o && o.metin).trim(), ikon: ikonAd(o && o.ikon), img: medyaUrl(o && o.img) }))
  .filter((o) => o.baslik);

const zryAdimlar = adimlar.map((a, i) =>
  `<li class="modulex-zry-adim" style="--zry-sira:${i}">`
  + `<p class="modulex-zry-etiket">${esc(a.etiket || String(i + 1).padStart(2, "0"))}</p>`
  + '<span class="modulex-zry-nokta" aria-hidden="true">' + (a.ikon ? `<span class="material-symbols-outlined">${a.ikon}</span>` : "") + "</span>"
  + '<div class="modulex-zry-kart">'
  + (a.img ? `<img class="modulex-zry-gorsel" src="${esc(a.img)}" alt="" width="640" height="400" loading="lazy" decoding="async" />` : "")
  + `<h3 class="modulex-zry-adim-baslik">${esc(a.baslik)}</h3>`
  + (a.metin ? `<p class="modulex-zry-adim-metin">${satirlar(a.metin)}</p>` : "")
  + "</div></li>").join("");

const ust = pick(des.ust).trim();
const baslik = pick(des.baslik).trim();
const metin = pick(des.metin).trim();
const kontrolVar = adimlar.length > 2;
const zryKontrol = kontrolVar
  ? '<div class="modulex-zry-kontrol">'
    + '<button class="modulex-zry-dugme" type="button" data-yon="-1" aria-label="@previous@"><span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_back</span></button>'
    + '<button class="modulex-zry-dugme" type="button" data-yon="1" aria-label="@next@"><span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></button>'
    + "</div>"
  : "";

html = html
  .replaceAll("{{zrysinif}}", () => (ust || baslik || metin || kontrolVar ? "" : " modulex-zry--bassiz"))
  .replaceAll("{{zryust}}", () => (ust ? `<p class="modulex-zry-ust">${esc(ust)}</p>` : ""))
  .replaceAll("{{zrybaslik}}", () => (baslik ? `<h2 class="modulex-zry-baslik" id="zry-{{id}}-baslik">${esc(baslik)}</h2>` : ""))
  .replaceAll("{{zrymetin}}", () => (metin ? `<p class="modulex-zry-metin">${satirlar(metin)}</p>` : ""))
  .replaceAll("{{zryetiket}}", () => (baslik ? 'aria-labelledby="zry-{{id}}-baslik"' : ""))
  .replaceAll("{{zrykontrol}}", () => zryKontrol)
  .replaceAll("{{zryadimlar}}", () => zryAdimlar);
if (!adimlar.length) html = "";
