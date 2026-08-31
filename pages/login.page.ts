import { expect } from '@playwright/test';
import { demoUser, routes } from '../utils/constants';
import { waitForApi } from '../utils/api';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly form = this.page.getByTestId('login-form');
  readonly email = this.page.getByTestId('login-email');
  readonly password = this.page.getByTestId('login-password');
  readonly submit = this.page.getByTestId('login-submit');
  readonly error = this.page.getByTestId('login-error');
  readonly shell = this.page.getByTestId('console-shell');
  readonly session = this.page.getByTestId('session-user');
  readonly logout = this.page.getByTestId('logout');
  readonly backLogin = this.page.getByTestId('back-login');

  async open(): Promise<void> {
    await this.page.goto(routes.sandbox);
    await expect(this.form).toBeVisible();
  }

  async signIn(password = demoUser.password): Promise<void> {
    await this.email.fill(demoUser.email);
    await this.password.fill(password);
    const login = waitForApi(this.page, 'POST', 'auth/login');
    await this.submit.click();
    const res = await login;
    if (res.status() === 200) {
      await expect(this.shell).toBeVisible();
      await expect(this.session).toHaveText(demoUser.session);
    }
  }

  async signInAndResponse(password: string) {
    await this.email.fill(demoUser.email);
    await this.password.fill(password);
    const login = waitForApi(this.page, 'POST', 'auth/login');
    await this.submit.click();
    return login;
  }
}
