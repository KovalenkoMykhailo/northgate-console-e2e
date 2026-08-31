import { waitForApi } from '../utils/api';
import { BasePage } from './base.page';

export class TransfersPage extends BasePage {
  readonly form = this.page.getByTestId('transfer-form');
  readonly from = this.page.getByTestId('transfer-from');
  readonly to = this.page.getByTestId('transfer-to');
  readonly amount = this.page.getByTestId('transfer-amount');
  readonly submit = this.page.getByTestId('transfer-submit');
  readonly error = this.page.getByTestId('transfer-error');
  readonly table = this.page.getByTestId('transfer-table');

  async create(fromId: string, toId: string, amount: string) {
    await this.from.selectOption(fromId);
    await this.to.selectOption(toId);
    await this.amount.fill(amount);
    const res = waitForApi(this.page, 'POST', 'transfers');
    await this.submit.click();
    return res;
  }
}
