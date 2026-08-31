import { type Locator } from '@playwright/test';
import { waitForApi } from '../utils/api';
import { BasePage } from './base.page';

export class AccessPage extends BasePage {
  readonly form = this.page.getByTestId('invite-form');
  readonly name = this.page.getByTestId('invite-name');
  readonly email = this.page.getByTestId('invite-email');
  readonly role = this.page.getByTestId('invite-role');
  readonly submit = this.page.getByTestId('invite-submit');
  readonly table = this.page.getByTestId('member-table');

  member(email: string): Locator {
    return this.page.locator(`[data-testid="member-row"][data-email="${email}"]`);
  }

  async invite(name: string, email: string, role: string) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.role.selectOption(role);
    const res = waitForApi(this.page, 'POST', 'members');
    await this.submit.click();
    return res;
  }
}
