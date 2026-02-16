// pages/FilterPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class FilterPage {
  readonly page: Page;
  
  // Beden filtreleri
  readonly bedenSearchBox: Locator;
  readonly beden42: Locator;
  
  // Fiyat filtreleri
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly applyFilterButton: Locator;
  
  // Cinsiyet filtreleri
  readonly cinsiyetFilter: Locator;
  readonly erkekOption: Locator;
  readonly erkekCheckbox: Locator;
  
  // Renk filtreleri
  readonly renkFilter: Locator;
  readonly beyazOption: Locator;
  readonly acceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Beden
    this.bedenSearchBox = page.getByRole('textbox', { name: 'Filtrele' }).nth(1);
    this.beden42 = page.locator('div').filter({ hasText: /^42$/ }).nth(1);
    
    // Fiyat
    this.minPriceInput = page.getByRole('textbox', { name: 'En az' });
    this.maxPriceInput = page.getByRole('textbox', { name: 'En çok' });
    this.applyFilterButton = page.getByRole('button', { name: 'Filtrele' });
    
    // Cinsiyet
    this.cinsiyetFilter = page.getByText('Cinsiyet');
    this.erkekOption = page.getByText('Erkek', { exact: true });
    this.erkekCheckbox = page.locator('div').filter({ hasText: /^Erkek$/ }).nth(1);
    
    // Renk
    this.renkFilter = page.getByText('Renk', { exact: true });
    this.beyazOption = page.getByText('Beyaz', { exact: true });
    this.acceptButton = page.getByRole('button', { name: 'Kabul et' });
  }

  /**
   * Adım 5: Beden filtresini uygula (42)
   */
  async applyBedenFilter(size: string) {
    await this.bedenSearchBox.click();
    await this.bedenSearchBox.fill(size);
    await this.beden42.click();
  }

  /**
   * Adım 5: Fiyat aralığı filtresini uygula (3000-5000)
   */
  async applyPriceFilter(minPrice: string, maxPrice: string) {
    await this.minPriceInput.click();
    await this.minPriceInput.fill(minPrice);
    await this.maxPriceInput.click();
    await this.maxPriceInput.fill(maxPrice);
    await this.applyFilterButton.click();
  }

  /**
   * Adım 5: Cinsiyet filtresini uygula (Erkek)
   */
  async applyCinsiyetFilter() {
    await this.cinsiyetFilter.click();
    await this.erkekOption.click();
    await this.erkekCheckbox.click();
  }

  /**
   * Adım 5: Renk filtresini uygula (Beyaz)
   */
  async applyRenkFilter() {
    await this.renkFilter.click();
    await this.beyazOption.click();
    await this.acceptButton.click();
  }

  /**
   * Adım 6: Filtrelerin uygulandığını doğrula
   */
  async verifyFiltersApplied() {
    // URL'de filtrelerin olduğunu kontrol et
    await expect(this.page).toHaveURL(/bedenler:42/, { timeout: 5000 });
    await expect(this.page).toHaveURL(/fiyat:3000-5000/);
    await expect(this.page).toHaveURL(/cinsiyet:Erkek/);
  }
}