import { test, expect } from '../fixtures';
import { waitForApi } from '../utils/api';
import { seed } from '../utils/constants';

/**
 * These tests assert the Console docs spec.
 * They are expected to fail while planted gaps stay in the SUT.
 * If one starts passing, a planted bug was removed — that is the signal.
 */
test.describe('Spec gaps @planted', () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openConsole();
  });

  const soon = { timeout: 2_000 };

  test('search is case-insensitive', async ({ accountsPage }) => {
    test.fail(true, 'Spec: q matches holder without case. Lowercase search currently returns empty.');
    await accountsPage.search.fill('ada chen');
    await accountsPage.applyFilters();
    await expect(accountsPage.row(seed.adaChenId)).toBeVisible(soon);
  });

  test('Active filter hides Frozen', async ({ accountsPage }) => {
    test.fail(true, 'Spec: status=Active hides Frozen.');
    await accountsPage.status.selectOption('Active');
    await accountsPage.applyFilters();
    await expect(accountsPage.row(seed.bohdanId)).toHaveCount(0, soon);
  });

  test('currency filter keeps only that currency', async ({ accountsPage }) => {
    test.fail(true, 'Spec: currency=EUR drops USD and GBP.');
    await accountsPage.currency.selectOption('EUR');
    await accountsPage.applyFilters();
    const rows = accountsPage.page.getByTestId('account-row');
    const count = await rows.count();
    for (let i = 0; i < count; i += 1) {
      await expect(rows.nth(i)).toHaveAttribute('data-currency', 'EUR', soon);
    }
  });

  test('max balance is inclusive', async ({ accountsPage }) => {
    test.fail(true, 'Spec: balance 150 stays when max=150.');
    await accountsPage.max.fill('150');
    await accountsPage.applyFilters();
    await expect(accountsPage.row(seed.bohdanId)).toBeVisible(soon);
  });

  test('Client sort is by holder, not IBAN', async ({ accountsPage, page }) => {
    test.fail(true, 'Spec: sort=holder orders by client name.');
    const sorted = waitForApi(page, 'GET', 'accounts');
    await accountsPage.sortHolder.click();
    const res = await sorted;
    const body = await res.json();
    const holders = body.items.map((row: { holder: string }) => row.holder);
    const expected = [...holders].sort((a, b) => a.localeCompare(b));
    expect(holders).toEqual(expected);
  });

  test('Open accounts KPI equals Active rows', async ({ accountsPage }) => {
    test.fail(true, 'Spec: open KPI is the Active count (6 on seed).');
    await expect(accountsPage.kpiOpen).toContainText(String(seed.openAccountsSpec), soon);
  });

  test('Ada Chen table balance matches GET /accounts', async ({ accountsPage, page }) => {
    test.fail(true, 'Spec: table balance equals API (4200.50, not 4200).');
    const res = waitForApi(page, 'GET', 'accounts/acc-3');
    await accountsPage.row(seed.adaChenId).click();
    expect((await res).status()).toBe(200);
    await expect(accountsPage.row(seed.adaChenId).getByTestId('account-balance')).toHaveText(
      seed.adaChenBalanceApi,
      soon
    );
  });

  test('freeze persists on next GET and reload', async ({ accountsPage, page }) => {
    test.fail(true, 'Spec: PATCH status must persist. Edit/PUT is a different contract.');
    const patch = await accountsPage.confirmFreeze('acc-1');
    expect(patch.status()).toBe(200);
    await page.reload();
    await expect(accountsPage.row('acc-1')).toHaveAttribute('data-status', 'Frozen', soon);
  });

  test('insufficient funds is 4xx', async ({ consolePage, transfersPage }) => {
    test.fail(true, 'Spec: amount above balance is not 200.');
    await consolePage.tabTransfers.click();
    const res = await transfersPage.create('acc-7', 'acc-2', '99999');
    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

  test('Admin invite stays Admin', async ({ consolePage, accessPage }) => {
    test.fail(true, 'Spec: invited role equals the role sent.');
    await consolePage.tabAccess.click();
    const email = `qa.admin.${Date.now()}@northgate.test`;
    const res = await accessPage.invite('QA Admin', email, 'Admin');
    expect(res.status()).toBe(201);
    expect((await res.json()).role).toBe('Admin');
    await expect(accessPage.member(email).getByTestId('member-role')).toHaveText('Admin', soon);
  });
});
