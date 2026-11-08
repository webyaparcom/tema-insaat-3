# tema-insaat-3 · g3pr01 — Fiyatlandırma 1

## Nedir

tema-insaat-3 sitesinin matrix modülü. `Fiyatlandırma 1` şablonu (section kökü,
sınıf `modulex-pricing`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (2 KB) |
| `index.html` | Modül şablonu (render hedefi) (4 KB) |
| `index.jpeg` | Önizleme görseli (60 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `bgcolor` | `#f8fafc` |
| `cardbg` | `#ffffff` |
| `bordercolor` | `#e2e8f0` |
| `titlecolor` | `#1e293b` |
| `textcolor` | `#475569` |
| `accent` | `#DE6D26` |
| `accentText` | `#ffffff` |

- `name`: `Fiyatlandırma 1`
- `data`: 3 kayıt. Örnek: `{"plan": {"tr": "Başlangıç", "en": "Starter"}, "price": "₺4.900", "period": {"tr": "/ proje", "en": "/ project"}, "note": {"tr": "Küçük işl…`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **bgcolor**, **cardbg**, **bordercolor**, **titlecolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-pricing`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-insaat-3 sitesinde `web/matrix/modules/g3pr01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Fiyatlandırma 1",
  "desing": {
    "max": "1200px",
    "bgcolor": "#f8fafc",
    "cardbg": "#ffffff",
    "bordercolor": "#e2e8f0",
    "titlecolor": "#1e293b",
    "textcolor": "#475569",
    "accent": "#DE6D26",
    "accentText": "#ffffff",
    "badge": {
      "tr": "Fiyatlandırma",
      "en": "Pricing"
    },
    "title": {
      "tr": "Size Uygun Paketi Seçin",
      "en": "Choose the Right Plan"
    },
    "description": {
      "tr": "İhtiyacınıza göre esnek paket seçenekleri. Dilediğiniz zaman yükseltebilirsiniz.",
      "en": "Flexible plans for your needs. Upgrade anytime."
    }
  },
  "data": [
    {
      "plan": {
        "tr": "Başlangıç",
        "en": "Starte
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
