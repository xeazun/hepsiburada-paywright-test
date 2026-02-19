import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000, // Timeout süresini de biraz arttıralım, işlemler yavaşlıyor
  use: {
    headless: false, // Ekranda görmek için headless: false
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 1000, /* Testleri izleyebilmek için her Playwright işlemine (tıklama, yazma vb.) 1000ms gecikme ekler */
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
