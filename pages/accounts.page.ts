import { expect, type Locator } from '@playwright/test';
import { waitForApi } from '../utils/api';
import { BasePage } from './base.page';

export type AccountInput = {
  holder: string;
  iban: string;
  type?: string;
  currency?: string;
  balance?: string;
  status?: string;
};

export class AccountsPage extends BasePage {
  readonly table = this.page.getByTestId('account-table');
  readonly createForm = this.page.getByTestId('account-create');
  readonly holder = this.page.getByTestId('account-holder');
  readonly iban = this.page.getByTestId('account-iban');
  readonly type = this.page.getByTestId('account-type');
  readonly ccy = this.page.getByTestId('account-ccy');
  readonly balanceIn = this.page.getByTestId('account-balance-in');
  readonly newStatus = this.page.getByTestId('account-new-status');
  readonly createSubmit = this.page.getByTestId('account-create-submit');
  readonly createError = this.page.getByTestId('account-create-error');
  readonly search = this.page.getByTestId('account-search');
  readonly status = this.page.getByTestId('account-status');
  readonly currency = this.page.getByTestId('account-currency');
  readonly min = this.page.getByTestId('account-min');
  readonly max = this.page.getByTestId('account-max');
  readonly apply = this.page.getByTestId('account-apply');
  readonly clear = this.page.getByTestId('account-clear');
  readonly empty = this.page.getByTestId('account-empty');
  readonly total = this.page.getByTestId('account-total');
  readonly prev = this.page.getByTestId('account-prev');
  readonly next = this.page.getByTestId('account-next');
  readonly sortHolder = this.page.getByTestId('sort-holder');
  readonly kpiOpen = this.page.getByTestId('kpi-open');
  readonly editModal = this.page.getByTestId('account-edit-modal');
  readonly editHolder = this.page.getByTestId('account-edit-holder');
  readonly editIban = this.page.getByTestId('account-edit-iban');
  readonly editBalance = this.page.getByTestId('account-edit-balance');
  readonly editSubmit = this.page.getByTestId('account-edit-submit');
  readonly editCancel = this.page.getByTestId('account-edit-cancel');
  readonly confirm = this.page.getByTestId('confirm-modal');
  readonly confirmOk = this.page.getByTestId('confirm-ok');
  readonly confirmCancel = this.page.getByTestId('confirm-cancel');
  readonly drawer = this.page.getByTestId('account-drawer');

  row(id: string): Locator {
    return this.page.locator(`[data-testid="account-row"][data-id="${id}"]`);
  }

  rowByHolder(name: string): Locator {
    return this.page.getByTestId('account-row').filter({ hasText: name });
  }

  async create(data: AccountInput) {
    await this.holder.fill(data.holder);
    await this.iban.fill(data.iban);
    if (data.type) await this.type.selectOption(data.type);
    if (data.currency) await this.ccy.selectOption(data.currency);
    if (data.balance !== undefined) await this.balanceIn.fill(data.balance);
    if (data.status) await this.newStatus.selectOption(data.status);
    const created = waitForApi(this.page, 'POST', 'accounts');
    await this.createSubmit.click();
    return created;
  }

  async applyFilters(): Promise<void> {
    const list = waitForApi(this.page, 'GET', 'accounts');
    await this.apply.click();
    await list;
  }

  async openEdit(id: string): Promise<void> {
    await this.row(id).getByTestId('account-edit').click();
    await expect(this.editModal).toBeVisible();
  }

  async saveEdit() {
    const put = waitForApi(this.page, 'PUT', 'accounts/');
    await this.editSubmit.click();
    return put;
  }

  async confirmDelete(id: string) {
    await this.row(id).getByTestId('account-delete').click();
    await expect(this.confirm).toBeVisible();
    const del = waitForApi(this.page, 'DELETE', 'accounts/' + id);
    await this.confirmOk.click();
    return del;
  }

  async confirmFreeze(id: string) {
    await this.row(id).getByTestId('account-freeze').click();
    await expect(this.confirm).toBeVisible();
    const patch = waitForApi(this.page, 'PATCH', 'accounts/' + id);
    await this.confirmOk.click();
    return patch;
  }
}
