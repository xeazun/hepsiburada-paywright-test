// pages/SearchPage.ts

import { Page, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Adım 3: Listeleme sayfasının yüklendiğini doğrula
   */
  async verifyPageLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    
    // Filtre alanının görünür olduğunu kontrol et
    await expect(this.page.getByRole('textbox', { name: 'Filtrele' }).first()).toBeVisible({ timeout: 10000 });
    
    // En az 1 ürün var mı?
    await expect(this.page.locator('[data-test-id="product-card"]').first()).toBeVisible({ timeout: 10000 });
  }
}