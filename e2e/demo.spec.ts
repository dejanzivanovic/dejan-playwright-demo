import { test, expect } from '../fixtures/test-fixtures';
import testData from '../data/checkout.json';

test.describe('Demo Tests', () => {

  test('Purchase flow with three items', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.TEST_USER!, process.env.TEST_PASSWORD!);
    await expect(inventoryPage.title).toHaveText('Products');

    for (const product of testData.products.addToCart) {
      await inventoryPage.addToCart(product);
    }
    for (const product of testData.products.removeFromCart) {
      await inventoryPage.removeFromCart(product);
    }

    await inventoryPage.goToCart();

    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(
      testData.products.addToCart.length - testData.products.removeFromCart.length
    );

    await cartPage.checkout();
    await checkoutPage.fillCheckoutInformation(
      testData.customer.firstName,
      testData.customer.lastName,
      testData.customer.postalCode
    );
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

    await inventoryPage.logOut();
  });

});
