hepsiburada-web-test
===================

Basit Playwright TypeScript proje iskeleti. Aşağıdaki klasörler ve dosyalar oluşturuldu:

- `tests/search-test.spec.ts` — Ana test senaryosu
- `pages/` — POM dosyaları (`HomePage.ts`, `SearchPage.ts`, `FilterPage.ts`, `ProductListPage.ts`, `ProductDetailPage.ts`, `CartPage.ts`)
- `playwright.config.ts` — Playwright konfigürasyonu
- `package.json` — Temel script'ler

Başlamak için:

```bash
cd hepsiburada-web-test
npm install
npx playwright install
npm test
```

Dosyalar ihtiyaçlarınıza göre güncelleyebilirsiniz.
