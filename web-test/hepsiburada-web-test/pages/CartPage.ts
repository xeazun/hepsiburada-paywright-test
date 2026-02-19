// pages/CartPage.ts

import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCart() {
    // Sitede yanlış sayfaya düşüp boşuna beklememek için önce URL'den doğru yerde miyiz diye kontrol edildi.
    await expect(this.page).toHaveURL(/checkout\.hepsiburada\.com/i, { timeout: 15000 });

    // Ürün adı sürekli değişebilir (stok biter vs.), test patlamasın diye direkt Adidas ve TL yazısı var mı ona bakıldı.
    await expect(this.page.getByText(/Adidas/i).first()).toBeVisible({ timeout: 10000 });
    await expect(this.page.getByText('TL').first()).toBeVisible();
  }
}