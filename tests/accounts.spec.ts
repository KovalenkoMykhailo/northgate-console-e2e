import { test, expect } from '../fixtures';
import { uniqueIban } from '../utils/api';
import { seed } from '../utils/constants';
import { shot } from '../utils/shot';

test.describe('Accounts CRUD', () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openConsole();
  });

  test('create account lands on page 1 and persists after reload @smoke', async ({ accountsPage, page }) => {
    const holder = 'Playwright Client';
    const iban = uniqueIban();

    await test.step('POST 201', async () => {
      const res = await accountsPage.create({ holder, iban, balance: '10' });
      expect(res.status()).toBe(201);
      const body = await res.json();
      expect(body.holder).toBe(holder);
      expect(body.iban).toBe(iban);
    });

    await expect(accountsPage.rowByHolder(holder)).toBeVisible();
    await shot(page, 'account-created');

    await page.reload();
    await expect(accountsPage.rowByHolder(holder)).toBeVisible();
  });

  test('empty holder hits API 400', async ({ accountsPage }) => {
    const res = await accountsPage.create({ holder: '', iban: uniqueIban() });
    expect(res.status()).toBe(400);
    await expect(accountsPage.createError).toBeVisible();
    await expect(accountsPage.createError).toContainText('Holder and IBAN are required');
  });

  test('duplicate IBAN is 409', async ({ accountsPage }) => {
    const res = await accountsPage.create({
      holder: 'Dup Client',
      iban: 'NG00 1000 0000 0007',
    });
    expect(res.status()).toBe(409);
    await expect(accountsPage.createError).toContainText('DUPLICATE_IBAN');
  });

  test('edit persists via PUT', async ({ accountsPage, page }) => {
    await accountsPage.search.fill('Demo Viewer');
    await accountsPage.applyFilters();
    await accountsPage.openEdit('acc-7');
    await shot(page, 'edit-modal');
    await accountsPage.editBalance.fill('150');
    const res = await accountsPage.saveEdit();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe('acc-7');
    expect(body.balance).toBe(150);
    await expect(accountsPage.editModal).toBeHidden();
    await page.reload();
    await accountsPage.search.fill('Demo Viewer');
    await accountsPage.applyFilters();
    await expect(accountsPage.row('acc-7').getByTestId('account-balance')).toHaveText('150.00');
  });

  test('cancel and Escape do not call PUT', async ({ accountsPage, page }) => {
    await accountsPage.search.fill('Demo Viewer');
    await accountsPage.applyFilters();
    await accountsPage.openEdit('acc-7');
    await accountsPage.editHolder.fill('Should Not Save');
    await accountsPage.editCancel.click();
    await expect(accountsPage.editModal).toBeHidden();
    await expect(accountsPage.row('acc-7')).toContainText('Demo Viewer');

    await accountsPage.openEdit('acc-7');
    let putCalled = false;
    page.on('request', (req) => {
      if (req.method() === 'PUT' && req.url().includes('/accounts/')) putCalled = true;
    });
    await page.keyboard.press('Escape');
    await expect(accountsPage.editModal).toBeHidden();
    expect(putCalled).toBe(false);
  });

  test('delete Closed account without pending transfers', async ({ accountsPage }) => {
    await accountsPage.search.fill('Vendor Holdings');
    await accountsPage.applyFilters();
    const res = await accountsPage.confirmDelete(seed.closedNoPending);
    expect(res.status()).toBe(204);
    await expect(accountsPage.row(seed.closedNoPending)).toHaveCount(0);
  });

  test('delete with pending transfer is 409', async ({ accountsPage }) => {
    const res = await accountsPage.confirmDelete(seed.pendingFrom);
    expect(res.status()).toBe(409);
    expect(await res.json()).toEqual({ error: 'ACCOUNT_HAS_PENDING_TRANSFERS' });
    await expect(accountsPage.row(seed.pendingFrom)).toBeVisible();
  });

  test('pager moves between pages', async ({ accountsPage }) => {
    await expect(accountsPage.prev).toBeDisabled();
    await accountsPage.next.click();
    await expect(accountsPage.total).toContainText('page 2 of');
    await expect(accountsPage.next).toBeDisabled();
    await accountsPage.prev.click();
    await expect(accountsPage.total).toContainText('page 1 of');
  });
});
