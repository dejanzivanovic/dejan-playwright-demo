import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly menuButton: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText('Products', { exact: true });
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.cartButton = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addToCart(productName: string) {
    await this.page.getByTestId(`add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}`).click();
  }

  async removeFromCart(productName: string) {
    await this.page.getByTestId(`remove-${productName.toLowerCase().replace(/\s+/g, '-')}`).click();
  }

  async goToCart() {
    await this.cartButton.click();
  }

  async logOut() {
    await this.menuButton.click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
