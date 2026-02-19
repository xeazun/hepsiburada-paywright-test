import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { FilterPage } from '../pages/FilterPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';

test.describe('Hepsiburada Web Otomasyonu', () => {

  test('Adidas ayakkabı arama, filtreleme ve sepete ekleme akışı', async ({ page }) => {

    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const filterPage = new FilterPage(page);
    const productListPage = new ProductListPage(page);

    await homePage.goto();
    await homePage.closeCookiePopup();

    await searchPage.search('adidas ayakkabi');
    await searchPage.verifyPageLoaded();

    await filterPage.applyBedenFilter('42');
    await filterPage.applyPriceFilter('3000', '5000');
    await filterPage.applyCinsiyetFilter();
    await filterPage.applyRenkFilter();

    await filterPage.verifyFiltersApplied();
    await productListPage.verifyProductsMatchFilters();

    const newPage = await productListPage.selectFirstProduct();
    const detailPage = new ProductDetailPage(newPage);

    await detailPage.verifyProductDetails();
    await detailPage.addToCart();
    await detailPage.goToCart();

    const cartPage = new CartPage(newPage);
    await cartPage.verifyCart();
  });
});