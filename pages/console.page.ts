import { expect, type Locator } from '@playwright/test';
import { routes } from '../utils/constants';
import { BasePage } from './base.page';

export class ConsolePage extends BasePage {
  readonly shell = this.page.getByTestId('console-shell');
  readonly session = this.page.getByTestId('session-user');
  readonly logout = this.page.getByTestId('logout');
  readonly docs = this.page.getByTestId('sandbox-docs-btn');
  readonly app = this.page.getByTestId('sandbox-app-btn');
  readonly reset = this.page.getByTestId('sandbox-reset');
  readonly hint = this.page.getByTestId('hunter-hint');
  readonly hunterList = this.page.getByTestId('hunter-list');
  readonly score = this.page.getByTestId('hunter-score');
  readonly tabAccounts = this.page.getByTestId('tab-accounts');
  readonly tabTransfers = this.page.getByTestId('tab-transfers');
  readonly tabAccess = this.page.getByTestId('tab-access');
  readonly tabAudit = this.page.getByTestId('tab-audit');
  readonly tabApi = this.page.getByTestId('tab-api');

  async openConsole(): Promise<void> {
    await this.page.goto(routes.sandbox);
    await expect(this.shell).toBeVisible();
  }

  async openDocs(): Promise<void> {
    await this.page.goto(routes.sandbox);
    await this.docs.click();
    await expect(this.page.getByTestId('console-docs-page')).toBeVisible();
  }

  async openTab(tab: Locator): Promise<void> {
    await tab.click();
  }
}
