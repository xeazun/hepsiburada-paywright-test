import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Hepsiburada'da ekranlar bazen farklılık gösterebiliyor, hata almamak için her ihtimale karşı fallback locator kullandık.
    this.searchBox = page.locator('input:not([type="hidden"])').filter({ hasText: '' }).first();
    this.searchButton = page.locator('.SearchBoxOld-buttonContainer');
  }

  async search(searchTerm: string) {
    const input = this.page.locator('.desktopOldAutosuggestTheme-input').or(this.page.locator('[data-test-id="search-bar-input"]')).first();
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(searchTerm);
    await input.press('Enter');
  }

  async verifyPageLoaded() {
    // Sayfanın yüklenmesini 'sleep' atıp beklemek yerine DOM'un inmesini izliyoruz, böylece test boşuna yavaşlamıyor.
    await this.page.waitForLoadState('domcontentloaded');

    await expect(this.page.getByPlaceholder('Filtrele').first().or(this.page.getByRole('textbox', { name: 'Filtrele' }).first())).toBeVisible({ timeout: 15000 });

    const productCard = this.page.locator('[data-test-id="product-card"]').first().or(this.page.locator('li[class*="productListContent"]').first());
    await productCard.waitFor({ state: 'visible', timeout: 15000 });
  }
}