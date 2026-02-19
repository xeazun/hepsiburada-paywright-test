# Hepsiburada Playwright Web Test Otomasyonu

Hepsiburada web uygulamaları için Playwright ve TypeScript kullanılarak geliştirilmiş, profesyonel test otomasyon paketi.

## 🚀 Kullanılan Teknolojiler

- **Framework:** [Playwright](https://playwright.dev/)
- **Dil:** TypeScript
- **Desen:** Page Object Model (POM)

## 📁 Proje Yapısı

- `web-test/hepsiburada-web-test/tests/` - Test senaryoları
- `web-test/hepsiburada-web-test/pages/` - Sayfa Nesne Modeli (POM) sınıfları
- `web-test/hepsiburada-web-test/playwright.config.ts` - Playwright yapılandırması

## 🛠️ Başlangıç

### Ön Gereksinimler
- Node.js (v18+)
- npm

### Kurulum
```bash
cd web-test/hepsiburada-web-test
npm install
npx playwright install
```

### Testleri Çalıştırma
```bash
# Tüm testleri çalıştır
npm test

# Testleri arayüzlü (headed) modda çalıştır
npm run test:headed
```

## 📊 Raporlar
Test sonuçları `test-results/` dizininde oluşturulur (Git tarafından yoksayılır).
