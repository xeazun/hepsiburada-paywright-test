// tests/search-test.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { FilterPage } from '../pages/FilterPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';

// ==============================================================================
// TEST: Hepsiburada - Ürün Arama, Filtreleme ve Sepete Ekleme
// ==============================================================================
// Adım 1: Ana sayfa açılır
// Adım 2: "Adidas ayakkabı" araması yapılır
// Adım 3: Ürün listeleme sayfasının başarılı şekilde açıldığı doğrulanır
// Adım 4-5: Filtreler uygulanır (Beden:42, Fiyat:3000-5000, Cinsiyet:Erkek, Renk:Beyaz)
// Adım 6: Filtrelerin doğru şekilde uygulandığı doğrulanır
// Adım 7: Listelenen ürünlerin filtre kriterlerine uygun olduğu kontrol edilir
// Adım 8: Listeden bir ürün seçilir
// Adım 9: Ürün detay sayfasında "Sepete Ekle" butonuna tıklanır
// Adım 10: Kullanıcı sepete yönlendirilir
// Adım 11: Sepet sayfasında ürün bilgileri doğrulanır
// ==============================================================================

test.describe('Hepsiburada Web Otomasyonu', () => {
  
  test('Adidas ayakkabı arama, filtreleme ve sepete ekleme akışı', async ({ page }) => {
    
    // Page Object'leri oluştur
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const filterPage = new FilterPage(page);
    const productListPage = new ProductListPage(page);
    
    // ADIM 1: Ana sayfaya git
    await homePage.goto();
    await homePage.closeCookiePopup();
    
    // ADIM 2: "Adidas ayakkabi" ara
    await homePage.search('adidas ayakkabi');
    
    // ADIM 3: Listeleme sayfasının yüklendiğini doğrula
    await searchPage.verifyPageLoaded();
    
    // ADIM 4-5: Filtreleri uygula
    await filterPage.applyBedenFilter('42');
    await filterPage.applyPriceFilter('3000', '5000');
    await filterPage.applyCinsiyetFilter();
    await filterPage.applyRenkFilter();
    
    // ADIM 6: Filtrelerin uygulandığını doğrula
    await filterPage.verifyFiltersApplied();
    
    // ADIM 7: Ürün listesinin filtre kriterlerine uygun olduğunu kontrol et
    await productListPage.verifyProductsMatchFilters();
    
    // ADIM 8: İlk ürünü seç (yeni popup açılır)
    const newPage = await productListPage.selectFirstProduct();
    const detailPage = new ProductDetailPage(newPage);
    
    // ADIM 7 (devam): Ürün detayında filtre kriterlerini kontrol et
    await detailPage.verifyProductDetails();
    
    // ADIM 9: Sepete ekle
    await detailPage.addToCart();
    await detailPage.goToCart();
    
    // ADIM 10-11: Sepet doğrulaması
    const cartPage = new CartPage(newPage);
    await cartPage.verifyCart();
  });
});