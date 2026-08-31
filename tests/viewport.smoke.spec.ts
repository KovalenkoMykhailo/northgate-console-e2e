import { test, expect } from '../fixtures';
import { shot } from '../utils/shot';

/** Responsive Chrome viewport — not a real device, not Appium. */
test.describe('Viewport smoke @viewport', () => {
  test('login and Docs / App / Tests fit on a phone viewport @smoke', async ({
    page,
    consolePage,
  }) => {
    await page.goto('/sandbox/');
    await expect(page.getByTestId('login-form')).toBeVisible();
    await shot(page, 'viewport-login');
    await expect(consolePage.docs).toBeVisible();
    await expect(consolePage.app).toBeVisible();
    await expect(consolePage.tests).toBeVisible();
    await expect(consolePage.app).toHaveAttribute('aria-pressed', 'true');
    await consolePage.docs.click();
    await expect(page.getByTestId('console-docs-page')).toBeVisible();
    await shot(page, 'viewport-docs');
  });
});
