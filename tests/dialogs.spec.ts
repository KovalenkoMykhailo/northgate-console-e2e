import { test, expect } from '../fixtures';
import { uniqueIban } from '../utils/api';

async function clickOverlay(page: import('@playwright/test').Page, testId: string): Promise<void> {
  await page.getByTestId(testId).evaluate((node) => {
    node.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
}

test.describe('Dialogs', () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openConsole();
  });

  test('overlay click on Confirm does not DELETE', async ({ accountsPage, page }) => {
    let deleted = false;
    page.on('request', (req) => {
      if (req.method() === 'DELETE' && req.url().includes('/accounts/')) deleted = true;
    });
    await accountsPage.search.fill('Vendor Holdings');
    await accountsPage.applyFilters();
    await accountsPage.deleteButton('acc-6').click();
    await expect(accountsPage.confirm).toBeVisible();
    await clickOverlay(page, 'confirm-modal');
    await expect(accountsPage.confirm).toBeHidden();
    expect(deleted).toBe(false);
    await expect(accountsPage.row('acc-6')).toBeVisible();
  });

  test('Escape on Confirm freeze does not PATCH and restores focus', async ({ accountsPage, page }) => {
    let patched = false;
    page.on('request', (req) => {
      if (req.method() === 'PATCH' && req.url().includes('/accounts/')) patched = true;
    });
    const freeze = accountsPage.freezeButton('acc-1');
    await freeze.click();
    await expect(accountsPage.confirm).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(accountsPage.confirm).toBeHidden();
    expect(patched).toBe(false);
    await expect(freeze).toBeFocused();
  });

  test('only one dialog at a time', async ({ accountsPage }) => {
    await accountsPage.openEdit('acc-1');
    await expect(accountsPage.editModal).toBeVisible();
    await accountsPage.freezeButton('acc-1').evaluate((node) => (node as HTMLElement).click());
    await expect(accountsPage.editModal).toHaveCount(0);
    await expect(accountsPage.confirm).toBeVisible();
  });

  test('overlay click on Edit does not PUT', async ({ accountsPage, page }) => {
    await accountsPage.search.fill('Demo Viewer');
    await accountsPage.applyFilters();
    await accountsPage.openEdit('acc-7');
    await accountsPage.editHolder.fill('Should Not Save');
    let put = false;
    page.on('request', (req) => {
      if (req.method() === 'PUT' && req.url().includes('/accounts/')) put = true;
    });
    await clickOverlay(page, 'account-edit-modal');
    await expect(accountsPage.editModal).toBeHidden();
    expect(put).toBe(false);
    await expect(accountsPage.row('acc-7')).toContainText('Demo Viewer');
  });
});

test.describe('Audit and API log', () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openConsole();
  });

  test('create account writes a CREATE audit row', async ({ accountsPage, consolePage, page }) => {
    const holder = 'Audit UI ' + Date.now();
    const res = await accountsPage.create({ holder, iban: uniqueIban() });
    expect(res.status()).toBe(201);
    await consolePage.tabAudit.click();
    await expect(page.getByTestId('audit-table')).toBeVisible();
    await expect(page.getByTestId('audit-row').first()).toContainText('CREATE');
  });

  test('API log shows a live POST after create', async ({ accountsPage, consolePage, page }) => {
    await consolePage.tabApi.click();
    await expect(page.getByTestId('api-log')).toBeVisible();
    await consolePage.tabAccounts.click();
    const res = await accountsPage.create({
      holder: 'Log UI ' + Date.now(),
      iban: uniqueIban(),
    });
    expect(res.status()).toBe(201);
    await consolePage.tabApi.click();
    await expect(page.getByTestId('api-log')).toContainText('POST');
    await expect(page.getByTestId('api-log')).toContainText('/accounts');
  });
});
