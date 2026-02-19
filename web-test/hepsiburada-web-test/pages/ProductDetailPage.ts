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

  async verifyProductDetails() {
    await expect(this.page.getByText(/Adidas/i).first()).toBeVisible({ timeout: 10000 });
    await expect(this.page.getByText('TL').first()).toBeVisible();
    await expect(this.page.getByText(/Erkek/i).first()).toBeVisible();
    await expect(this.page.getByText(/Beyaz/i).first()).toBeVisible();
  }

  async addToCart() {
    // Butonun üzerine bazen reklam falan binebiliyor, force: true ile buna takılmadan zorla tıklattık.
    await this.addToCartButton.click({ force: true });
  }

  async goToCart() {
    // "Sepete Git" popup'ı bazen ekranda çok kısa duruyor veya hemen kapanabiliyor. 
    // İşi sağlama almak için popup ile uğraşmayıp direkt sepetin URL'sine gidildi.
    await this.page.goto('https://checkout.hepsiburada.com/', { waitUntil: 'domcontentloaded' });
  }
}