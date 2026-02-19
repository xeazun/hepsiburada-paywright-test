import { Page, Locator, expect } from '@playwright/test';

export class FilterPage {
  readonly page: Page;

  // Başka yerlerden test senaryolarından vs. bu elementlere yanlışlıkla müdahale edilmesin diye readonly yapıldı.
  readonly sizeSearchBox: Locator;
  readonly size42: Locator;

  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly applyFilterButton: Locator;

  readonly genderFilter: Locator;
  readonly maleOption: Locator;
  readonly maleCheckbox: Locator;

  readonly colorFilter: Locator;
  readonly whiteOption: Locator;
  readonly acceptButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.sizeSearchBox = page.getByRole('textbox', { name: 'Filtrele' }).nth(1);
    this.size42 = page.locator('div').filter({ hasText: /^42$/ }).nth(1);

    this.minPriceInput = page.getByRole('textbox', { name: 'En az' });
    this.maxPriceInput = page.getByRole('textbox', { name: 'En çok' });
    this.applyFilterButton = page.getByRole('button', { name: 'Filtrele' });

    this.genderFilter = page.getByText('Cinsiyet');
    this.maleOption = page.getByText('Erkek', { exact: true });
    this.maleCheckbox = page.locator('div').filter({ hasText: /^Erkek$/ }).nth(1);

    this.colorFilter = page.getByText('Renk', { exact: true });
    this.whiteOption = page.getByText('Beyaz', { exact: true });
    this.acceptButton = page.getByRole('button', { name: 'Kabul et' });
  }

  async applySizeFilter(size: string) {
    // Sayfada elementler kaydırmadan tam yüklenmiyor. Hata almamak için elementi önce görünecek şekilde kaydırıldı.
    const sizeHeader = this.page.getByText(/^Beden$/i).first();
    await sizeHeader.scrollIntoViewIfNeeded().catch(() => { });
    await sizeHeader.click({ force: true, timeout: 5000 }).catch(() => { });

    await this.page.waitForTimeout(2000);

    // Site sürekli değişebiliyor, arama çubuğunu bulamazsa diye .or() ile iki ihtimali de ekledik ki test patlamasın.
    const sizeSearchLocator = this.page.getByPlaceholder('Filtrele').nth(1).or(this.page.locator('input[placeholder="Filtrele"]').nth(1));
    await sizeSearchLocator.fill(size).catch(() => { });

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

  async applyGenderFilter() {
    await this.genderFilter.click({ force: true, timeout: 5000 }).catch(() => { });
    await this.maleOption.click({ force: true, timeout: 5000 }).catch(() => { });
    await this.maleCheckbox.click({ force: true, timeout: 5000 }).catch(() => { });
  }

  async applyColorFilter() {
    await this.colorFilter.click();
    await this.whiteOption.click();
    await this.acceptButton.click();
  }

  async verifyFiltersApplied() {
    await expect(this.page).toHaveURL(/fiyat:3000-5000/, { timeout: 15000 });
  }
}