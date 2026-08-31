import { test, expect } from '../fixtures';

test.describe('Transfers', () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openConsole();
    await consolePage.tabTransfers.click();
    await expect(consolePage.page.getByTestId('transfer-form')).toBeVisible();
  });

  test('valid book-to-book transfer is 201 Pending', async ({ transfersPage }) => {
    const res = await transfersPage.create('acc-1', 'acc-8', '10');
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.status).toBe('Pending');
    expect(body.currency).toBe('EUR');
    await expect(transfersPage.table.getByTestId('transfer-row').filter({ hasText: body.ref })).toBeVisible();
  });

  test('different currencies are 409', async ({ transfersPage }) => {
    const res = await transfersPage.create('acc-1', 'acc-2', '10');
    expect(res.status()).toBe(409);
    expect(await res.json()).toEqual({ error: 'CURRENCY_MISMATCH' });
  });
});
