import { test, expect } from '../fixtures';
import { uniqueIban, waitForApi } from '../utils/api';
import { seed } from '../utils/constants';
import { shot } from '../utils/shot';
import fs from 'node:fs';

test.describe('Accounts extras @regression', () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openConsole();
  });

  test('clear filters returns the full first page @regression', async ({ accountsPage }) => {
    await accountsPage.search.fill('Ada Chen');
    await accountsPage.applyFilters();
    await expect(accountsPage.row(seed.adaChenId)).toBeVisible();
    await expect(accountsPage.row('acc-1')).toHaveCount(0);

    await accountsPage.clear.click();
    await expect(accountsPage.search).toHaveValue('');
    await expect(accountsPage.row('acc-1')).toBeVisible();
    await expect(accountsPage.total).toContainText('page 1 of');
  });

  test('empty filter state shows the empty copy @regression', async ({ accountsPage }) => {
    await accountsPage.search.fill('zzzz-no-such-client');
    await accountsPage.applyFilters();
    await expect(accountsPage.empty).toBeVisible();
    await expect(accountsPage.empty).toHaveText('No accounts match these filters.');
  });

  test('row click opens the drawer @regression', async ({ accountsPage }) => {
    await accountsPage.row(seed.adaChenId).click();
    await expect(accountsPage.drawer).toBeVisible();
    await expect(accountsPage.drawer).toContainText('Ada Chen');
    await expect(accountsPage.drawer).toContainText(seed.adaChenId);
    await shot(accountsPage.page, 'account-drawer');
    await accountsPage.drawerClose.click();
    await expect(accountsPage.drawer).toHaveCount(0);
  });

  test('edit duplicate IBAN is 409 @regression', async ({ accountsPage }) => {
    await accountsPage.search.fill('Demo Viewer');
    await accountsPage.applyFilters();
    await accountsPage.openEdit('acc-7');
    await accountsPage.editIban.fill('NG00 1000 0000 0001');
    const res = await accountsPage.saveEdit();
    expect(res.status()).toBe(409);
    await expect(accountsPage.editError).toContainText('DUPLICATE_IBAN');
    await expect(accountsPage.editModal).toBeVisible();
  });

  test('Unfreeze sends PATCH 200 @regression', async ({ accountsPage }) => {
    await accountsPage.search.fill('Bohdan Koval');
    await accountsPage.applyFilters();
    const patch = await accountsPage.confirmFreeze(seed.bohdanId);
    expect(patch.status()).toBe(200);
    expect((await patch.json()).status).toBe('Active');
  });

  test('Export CSV downloads the seed file @regression', async ({ accountsPage, page }) => {
    const downloadPromise = page.waitForEvent('download');
    await accountsPage.exportCsv.click();
    const file = await downloadPromise;
    expect(file.suggestedFilename()).toBe('northgate-accounts.csv');
    const path = await file.path();
    expect(path).toBeTruthy();
    const csv = fs.readFileSync(path as string, 'utf8');
    expect(csv).toContain('id,holder,iban,type,currency,balance,status');
    expect(csv).toContain('Ada Chen');
  });

  test('create submit disables while POST is in flight @regression', async ({ accountsPage, page }) => {
    await accountsPage.holder.fill('Busy Client');
    await accountsPage.iban.fill(uniqueIban());
    const posts: string[] = [];
    page.on('request', (req) => {
      if (req.method() !== 'POST') return;
      const path = new URL(req.url()).pathname.replace(/\/+$/, '');
      if (path.endsWith('/accounts')) posts.push(path);
    });
    // SW POST is in-page and often finishes before Playwright's next expect.
    await accountsPage.createSubmit.evaluate((el) => {
      const btn = el as HTMLButtonElement;
      (window as Window & { __ngSawBusy?: Promise<boolean> }).__ngSawBusy = new Promise((resolve) => {
        if (btn.disabled) {
          resolve(true);
          return;
        }
        const obs = new MutationObserver(() => {
          if (btn.disabled) {
            obs.disconnect();
            resolve(true);
          }
        });
        obs.observe(btn, { attributes: true, attributeFilter: ['disabled'] });
      });
    });
    const created = waitForApi(page, 'POST', 'accounts');
    await accountsPage.createSubmit.click();
    expect(await page.evaluate(() => (window as Window & { __ngSawBusy?: Promise<boolean> }).__ngSawBusy)).toBe(
      true
    );
    expect((await created).status()).toBe(201);
    expect(posts.length).toBe(1);
  });
});
