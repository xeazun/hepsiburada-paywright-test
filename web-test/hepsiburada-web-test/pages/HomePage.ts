import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly cookiePopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookiePopup = page.locator('.initialComponent-hk7c_9tvgJ8ELzRuGJwC');
  }

  async goto() {
    await this.page.goto('https://www.hepsiburada.com/');
  }

  async closeCookiePopup() {
    try {
      await this.cookiePopup.click({ timeout: 5000 });
    } catch {
      // Popup yoksa devam et
    }
  }
}