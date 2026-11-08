# tema-insaat-3 · g3ft01 — Footer 3

## Nedir

tema-insaat-3 sitesinin matrix modülü. `Footer 3` şablonu (footer kökü,
sınıf `footer`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (1 KB) |
| `index.html` | Modül şablonu (render hedefi) (3 KB) |
| `index.jpeg` | Önizleme görseli (15 KB) |
| `index.json` | Veri + tema token'ları (0 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `showlang` | `True` |
| `bgcolor` | `#333` |
| `color` | `#fff` |
| `bordercolor` | `#000` |
| `minimal_design` | `True` |
| `social_media` | `False` |
| `logo_maxh` | `60px` |
| `logo_plate` | `False` |

- `name`: `Footer 3`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `category`, `description`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **showlang**, **bgcolor**, **color**, **bordercolor**, **minimal_design**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`footer`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-insaat-3 sitesinde `web/matrix/modules/g3ft01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Footer 3",
  "desing": {
    "showlang": true,
    "bgcolor": "#333",
    "color": "#fff",
    "bordercolor": "#000",
    "minimal_design": true,
    "social_media": false,
    "logo_maxh": "60px",
    "logo_plate": false,
    "contact_line": "auto"
  },
  "data": []
}
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
