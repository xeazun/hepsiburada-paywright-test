// pages/ProductDetailPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly goToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.addToCartButton = page.locator('[data-test-id="addToCart"]');
    this.goToCartButton = page.getByRole('button', { name: 'Sepete git' });
  }

  /**
   * Adım 7 (devam): Ürün detayında filtre kriterlerini kontrol et
   */
  async verifyProductDetails() {
    // Adidas markası var mı?
    await expect(this.page.getByText('Adidas')).toBeVisible();
    
    // Fiyat görünüyor mu?
    await expect(this.page.getByText('TL')).toBeVisible();
    
    // Erkek bilgisi var mı?
    await expect(this.page.getByText(/Erkek/i)).toBeVisible();
    
    // Beyaz renk var mı?
    await expect(this.page.getByText(/Beyaz/i)).toBeVisible();
  }

  /**
   * Adım 9: Sepete ekle
   */
  async addToCart() {
    await this.addToCartButton.click();
  }

  /**
   * Sepete git
   */
  async goToCart() {
    await this.goToCartButton.click();
  }
}