import { test, expect } from '../fixtures';

test.describe('Mobile smoke', () => {
  test('login and Docs / App fit on a phone viewport', async ({ page, consolePage }) => {
    await page.goto('/sandbox/');
    await expect(page.getByTestId('login-form')).toBeVisible();
    await expect(consolePage.docs).toBeVisible();
    await expect(consolePage.app).toBeVisible();
    await expect(consolePage.app).toHaveAttribute('aria-pressed', 'true');
    await consolePage.docs.click();
    await expect(page.getByTestId('console-docs-page')).toBeVisible();
  });
});
