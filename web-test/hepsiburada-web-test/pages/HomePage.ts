// pages/HomePage.ts

import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly cookiePopup: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.cookiePopup = page.locator('.initialComponent-hk7c_9tvgJ8ELzRuGJwC');
    this.searchBox = page.locator('[data-test-id="search-bar-input"]');
  }

  /**
   * Adım 1: Ana sayfaya git
   */
  async goto() {
    await this.page.goto('https://www.hepsiburada.com/');
  }

  /**
   * Cookie popup'ı kapat
   */
  async closeCookiePopup() {
    try {
      await this.cookiePopup.click({ timeout: 5000 });
    } catch {
      // Popup yoksa devam et
    }
  }

  /**
   * Adım 2: Arama yap
   */
  async search(searchTerm: string) {
    await this.searchBox.fill(searchTerm);
    await this.searchBox.press('Enter');
  }
}