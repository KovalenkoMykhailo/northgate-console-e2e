import { test as base } from '@playwright/test';
import { AccessPage } from '../pages/access.page';
import { AccountsPage } from '../pages/accounts.page';
import { ConsolePage } from '../pages/console.page';
import { LoginPage } from '../pages/login.page';
import { TransfersPage } from '../pages/transfers.page';

type AppFixtures = {
  loginPage: LoginPage;
  consolePage: ConsolePage;
  accountsPage: AccountsPage;
  transfersPage: TransfersPage;
  accessPage: AccessPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  consolePage: async ({ page }, use) => {
    await use(new ConsolePage(page));
  },
  accountsPage: async ({ page }, use) => {
    await use(new AccountsPage(page));
  },
  transfersPage: async ({ page }, use) => {
    await use(new TransfersPage(page));
  },
  accessPage: async ({ page }, use) => {
    await use(new AccessPage(page));
  },
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.project.name === 'api' || testInfo.project.name === 'setup') return;
  if (page.isClosed()) return;
  try {
    const body = await page.screenshot({ type: 'png', fullPage: true });
    await testInfo.attach('full-page', { body, contentType: 'image/png' });
  } catch {
    /* page already gone */
  }
});

export { expect } from '@playwright/test';
