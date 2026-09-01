import { test, expect } from '../fixtures';
import { demoUser } from '../utils/constants';
import { shot } from '../utils/shot';

test.describe('Auth', () => {
  test('demo user signs in and sees the console @smoke @regression', async ({ loginPage, page }) => {
    await loginPage.open();
    await shot(page, 'login-form');
    await loginPage.signIn();
    await expect(loginPage.session).toHaveText(demoUser.session);
    await expect(page.getByTestId('env-badge')).toHaveText('TEST');
    await shot(page, 'console-after-login');
  });

  test('wrong password is 401 Unauthorized @planted', async ({ loginPage }) => {
    test.fail(true, 'Spec: failed login is 401. Planted gap returns 403.');
    await loginPage.open();
    const res = await loginPage.signInAndResponse('wrong-password');
    expect(res.status()).toBe(401);
    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).not.toContainText('403', { timeout: 2_000 });
    await expect(loginPage.form).toBeVisible();
    await shot(loginPage.page, 'failed-login');
  });

  test('logout ends the session after reload @planted', async ({ loginPage, page }) => {
    test.fail(true, 'Spec: logout removes the token. Reload must show login.');
    await loginPage.open();
    await loginPage.signIn();
    const logout = page.waitForResponse(
      (res) => res.request().method() === 'POST' && res.url().includes('/sandbox/api/v1/auth/logout')
    );
    await loginPage.logout.click();
    expect((await logout).status()).toBe(204);
    await expect(loginPage.backLogin).toBeVisible();
    await page.reload();
    await expect(loginPage.form).toBeVisible({ timeout: 2_000 });
  });
});
