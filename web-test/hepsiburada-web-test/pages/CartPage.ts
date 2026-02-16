// pages/CartPage.ts

import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Adım 11: Sepet sayfası doğrulamaları
   */
  async verifyCart() {
    // Sepet sayfasında mıyız?
    await expect(this.page).toHaveURL(/sepet/, { timeout: 10000 });
    
    // Adidas ürünü sepette var mı?
    await expect(this.page.getByText('Adidas')).toBeVisible();
    
    // Fiyat bilgisi var mı?
    await expect(this.page.getByText('TL')).toBeVisible();
    
    // Ürün adı görünür mü?
    await expect(this.page.getByText(/Strutter/i)).toBeVisible();
  }
}