import { test, expect } from '../fixtures/test-fixtures';

test.describe('Demo Tests', () => {


  test('Purchase flow with three items', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.TEST_USER!, process.env.TEST_PASSWORD!);
    await expect(inventoryPage.title).toHaveText('Products');

    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Fleece Jacket');
    
    await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.removeFromCart('Sauce Labs Bolt T-Shirt');

    await inventoryPage.goToCart();

    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(3);

    await cartPage.checkout();
    await checkoutPage.fillCheckoutInformation('Dejan', 'Zivanovic', '11050');
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

    await inventoryPage.logOut();
  });

});