# tema-insaat-3 · t9kuq0 — Menü 9 — Ortalı logo

## Nedir

tema-insaat-3 sitesinin matrix modülü. `Menü 9 — Ortalı logo` şablonu (header kökü,
sınıf `modulex-m9`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (5 KB) |
| `index.html` | Modül şablonu (render hedefi) (15 KB) |
| `index.jpeg` | Önizleme görseli (58 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `ince` |
| `logo` | `{{logo}}` |
| `logo_h` | `56px` |
| `max` | `1200px` |
| `bilgi_bandi` | `True` |
| `sticky` | `True` |
| `showlang` | `True` |
| `bg` | `var(--mx-site-bg, #ffffff)` |

- `name`: `Menü 9 — Ortalı logo`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **logo**, **logo_h**, **max**, **bilgi_bandi**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-m9`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-insaat-3 sitesinde `web/matrix/modules/t9kuq0/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Menü 9 — Ortalı logo",
    "en": "Menu 9 — Centered logo",
    "ar": "القائمة 9 — شعار في المنتصف"
  },
  "desing": {
    "stil": "ince",
    "logo": "{{logo}}",
    "logo_h": "56px",
    "max": "1200px",
    "bilgi_bandi": true,
    "sticky": true,
    "showlang": true,
    "bg": "var(--mx-site-bg, #ffffff)",
    "text": "var(--mx-site-text, #1b1b1b)",
    "muted": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 70%, var(--mx-site-bg, #ffffff))",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "border": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 14%, transparent)",
    "band_bg": "var(--mx-sit
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
