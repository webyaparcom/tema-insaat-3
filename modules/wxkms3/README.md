# tema-insaat-3 · wxkms3 — İletişim 7 — Bölünmüş panel

## Nedir

tema-insaat-3 sitesinin matrix modülü. `İletişim 7 — Bölünmüş panel` şablonu (section kökü,
sınıf `modulex-c7`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (6 KB) |
| `index.html` | Modül şablonu (render hedefi) (21 KB) |
| `index.jpeg` | Önizleme görseli (60 KB) |
| `index.json` | Veri + tema token'ları (8 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `stil` | `bolunmus` |
| `gonderim` | `mailto` |
| `bgcolor` | `var(--mx-site-bg, #ffffff)` |
| `textcolor` | `var(--mx-site-text, #1b1b1b)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))` |
| `surface` | `var(--mx-site-surface, #f6f6f4)` |
| `bordercolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 18%, transparent)` |

- `name`: `İletişim 7 — Bölünmüş panel`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **stil**, **gonderim**, **bgcolor**, **textcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-c7`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-insaat-3 sitesinde `web/matrix/modules/wxkms3/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "İletişim 7 — Bölünmüş panel",
    "en": "Contact 7 — Split panel",
    "ar": "اتصال 7 — لوحة مقسّمة"
  },
  "desing": {
    "max": "1200px",
    "stil": "bolunmus",
    "gonderim": "mailto",
    "bgcolor": "var(--mx-site-bg, #ffffff)",
    "textcolor": "var(--mx-site-text, #1b1b1b)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 18%, transparent)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "panelbg": "color-mix(in srgb, #0f1
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
