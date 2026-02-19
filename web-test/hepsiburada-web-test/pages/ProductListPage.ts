import { Page, expect } from '@playwright/test';

export class ProductListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductsMatchFilters() {
    await expect(this.page.getByText('Adidas').first()).toBeVisible();
    await expect(this.page.getByText('TL').first()).toBeVisible();
    await expect(this.page.getByText(/Erkek/i).first()).toBeVisible();
  }

  async selectFirstProduct() {
    // Yeni sekmede açılan detay sayfasını kaçırmamak için önce popup event'ini yakalaması beklenir.
    const pagePromise = this.page.waitForEvent('popup');

    // Stoklar her an değişebiliyor, o yüzden sabit bir isim aramak yerine direkt listedeki ilk ürüne tıklama yaklaşımı izlenir.
    const firstProductLink = this.page.locator('[data-test-id="product-card"] a').first().or(this.page.locator('li[class*="productListContent"] a').first());
    await firstProductLink.click();
    return await pagePromise;
  }
}