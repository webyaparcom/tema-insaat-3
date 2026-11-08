# tema-insaat-3 · vow5ec — Karşılaştırma / Paket Tablosu

## Nedir

tema-insaat-3 sitesinin matrix modülü. `Karşılaştırma / Paket Tablosu` şablonu (section kökü,
sınıf `modulex-kt{{ktclass}}`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (5 KB) |
| `index.html` | Modül şablonu (render hedefi) (9 KB) |
| `index.jpeg` | Önizleme görseli (54 KB) |
| `index.json` | Veri + tema token'ları (5 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `cizgili` |
| `max` | `1200px` |
| `bgcolor` | `var(--mx-site-bg, #ffffff)` |
| `textcolor` | `var(--mx-site-text, #1b1b1b)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))` |
| `surface` | `var(--mx-site-surface, #f6f6f4)` |
| `surface2` | `var(--mx-site-surface-2, #ececea)` |
| `accent` | `var(--mx-site-primary, #2563eb)` |

- `name`: `Karşılaştırma / Paket Tablosu`
- `data`: 6 kayıt. Örnek: `{"ad": {"tr": "Sayfa sayısı", "en": "Number of pages", "ar": "عدد الصفحات"}, "degerler": [{"tr": "5'e kadar", "en": "Up to 5", "ar": "حتى 5…`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **max**, **bgcolor**, **textcolor**, **mutedcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-kt{{ktclass}}`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-insaat-3 sitesinde `web/matrix/modules/vow5ec/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Karşılaştırma / Paket Tablosu",
  "desing": {
    "stil": "cizgili",
    "max": "1200px",
    "bgcolor": "var(--mx-site-bg, #ffffff)",
    "textcolor": "var(--mx-site-text, #1b1b1b)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "surface2": "var(--mx-site-surface-2, #ececea)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 16%, transparent)",
    "radius": "16px",
    "eyebrow": {
      "tr": "Paketler",
      "en": "Plans",
      "ar": "ال
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
