// pages/ProductListPage.ts

import { Page, expect } from '@playwright/test';

export class ProductListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Adım 7: Listelenen ürünlerin filtre kriterlerine uygun olduğunu kontrol et
   */
  async verifyProductsMatchFilters() {
    // Adidas ürünlerinin olduğunu doğrula
    await expect(this.page.getByText('Adidas').first()).toBeVisible();
    
    // Fiyat bilgisinin göründüğünü doğrula
    await expect(this.page.getByText('TL').first()).toBeVisible();
    
    // Erkek ürünü var mı?
    await expect(this.page.getByText(/Erkek/i).first()).toBeVisible();
  }

  /**
   * Adım 8: İlk ürünü seç (yeni popup açılır)
   */
  async selectFirstProduct() {
    // Popup beklemeye hazır ol
    const pagePromise = this.page.waitForEvent('popup');
    
    // Ürüne tıkla
    await this.page.getByRole('link', { name: /Adidas Strutter Erkek Günlük Spor/ }).click();
    
    // Yeni popup'ı döndür
    return await pagePromise;
  }
}