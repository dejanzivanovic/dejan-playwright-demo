import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly menuButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async addToCart(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`).click();
  }

  async removeFromCart(productName: string) {
    await this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`).click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
  async logOut(){
    await this.menuButton.click();
    await this.page.locator('#logout_sidebar_link').click();
  }
}