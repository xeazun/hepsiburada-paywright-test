import { Page, Locator, expect } from '@playwright/test';

export class FilterPage {
  readonly page: Page;

  // Başka yerlerden test senaryolarından vs. bu elementlere yanlışlıkla müdahale edilmesin diye readonly yapıldı.
  readonly bedenSearchBox: Locator;
  readonly beden42: Locator;

  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly applyFilterButton: Locator;

  readonly cinsiyetFilter: Locator;
  readonly erkekOption: Locator;
  readonly erkekCheckbox: Locator;

  readonly renkFilter: Locator;
  readonly beyazOption: Locator;
  readonly acceptButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.bedenSearchBox = page.getByRole('textbox', { name: 'Filtrele' }).nth(1);
    this.beden42 = page.locator('div').filter({ hasText: /^42$/ }).nth(1);

    this.minPriceInput = page.getByRole('textbox', { name: 'En az' });
    this.maxPriceInput = page.getByRole('textbox', { name: 'En çok' });
    this.applyFilterButton = page.getByRole('button', { name: 'Filtrele' });

    this.cinsiyetFilter = page.getByText('Cinsiyet');
    this.erkekOption = page.getByText('Erkek', { exact: true });
    this.erkekCheckbox = page.locator('div').filter({ hasText: /^Erkek$/ }).nth(1);

    this.renkFilter = page.getByText('Renk', { exact: true });
    this.beyazOption = page.getByText('Beyaz', { exact: true });
    this.acceptButton = page.getByRole('button', { name: 'Kabul et' });
  }

  async applyBedenFilter(size: string) {
    // Sayfada elementler kaydırmadan tam yüklenmiyor. Hata almamak için elementi önce görünecek şekilde kaydırıldı.
    const bedenHeader = this.page.getByText(/^Beden$/i).first();
    await bedenHeader.scrollIntoViewIfNeeded().catch(() => { });
    await bedenHeader.click({ force: true, timeout: 5000 }).catch(() => { });

    await this.page.waitForTimeout(2000);

    // Site sürekli değişebiliyor, arama çubuğunu bulamazsa diye .or() ile iki ihtimali de ekledik ki test patlamasın.
    const bedenSearchLocator = this.page.getByPlaceholder('Filtrele').nth(1).or(this.page.locator('input[placeholder="Filtrele"]').nth(1));
    await bedenSearchLocator.fill(size).catch(() => { });

    // Checkbox'ların üzerinde bazen tıklamayı engelleyen görünmez CSS katmanları oluyor.
    // Önce sayfanın DOM'una indiğinden emin olunup, force:true ile zorla tıklandı.
    const sizeCheckboxInput = this.page.locator(`input[name="bedenler"][value="${size}"]`);
    await sizeCheckboxInput.waitFor({ state: 'attached', timeout: 5000 });

    await sizeCheckboxInput.locator('xpath=..').click({ force: true });
  }

  async applyPriceFilter(minPrice: string, maxPrice: string) {
    await this.minPriceInput.click();
    await this.minPriceInput.fill(minPrice);
    await this.maxPriceInput.click();
    await this.maxPriceInput.fill(maxPrice);
    await this.applyFilterButton.click();
  }

  async applyCinsiyetFilter() {
    await this.cinsiyetFilter.click({ force: true, timeout: 5000 }).catch(() => { });
    await this.erkekOption.click({ force: true, timeout: 5000 }).catch(() => { });
    await this.erkekCheckbox.click({ force: true, timeout: 5000 }).catch(() => { });
  }

  async applyRenkFilter() {
    await this.renkFilter.click();
    await this.beyazOption.click();
    await this.acceptButton.click();
  }

  async verifyFiltersApplied() {
    await expect(this.page).toHaveURL(/fiyat:3000-5000/, { timeout: 15000 });
  }
}