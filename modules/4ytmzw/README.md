# tema-insaat-3 · 4ytmzw — Hero 6 — Bento

## Nedir

tema-insaat-3 sitesinin matrix modülü. `Hero 6 — Bento` şablonu (section kökü,
sınıf `modulex-h6`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (5 KB) |
| `index.html` | Modül şablonu (render hedefi) (13 KB) |
| `index.jpeg` | Önizleme görseli (48 KB) |
| `index.json` | Veri + tema token'ları (5 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `bento` |
| `max` | `1200px` |
| `bg` | `var(--mx-site-bg, #ffffff)` |
| `surface` | `var(--mx-site-surface, #f6f6f4)` |
| `surface2` | `var(--mx-site-surface-2, #ececea)` |
| `text` | `var(--mx-site-text, #1b1b1b)` |
| `muted` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))` |
| `accent` | `var(--mx-site-primary, #2563eb)` |

- `name`: `Hero 6 — Bento`
- `data`: 4 kayıt. Örnek: `{"tur": "gorsel", "img": "", "alt": {"tr": "Atölyede üretim anı", "en": "Production moment in the workshop", "ar": "لحظة إنتاج في الورشة"},…`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **max**, **bg**, **surface**, **surface2**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-h6`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-insaat-3 sitesinde `web/matrix/modules/4ytmzw/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Hero 6 — Bento",
    "en": "Hero 6 — Bento",
    "ar": "هيرو 6 — بينتو"
  },
  "desing": {
    "stil": "bento",
    "max": "1200px",
    "bg": "var(--mx-site-bg, #ffffff)",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "surface2": "var(--mx-site-surface-2, #ececea)",
    "text": "var(--mx-site-text, #1b1b1b)",
    "muted": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "border": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 12%, transparent)",
    "radius": "20px",
    "eyebrow": {
      "tr": "Tasarım + ür
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
