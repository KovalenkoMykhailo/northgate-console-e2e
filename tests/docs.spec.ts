import { test, expect } from '../fixtures';

test.describe('Challenge chrome / Docs', () => {
  test('Docs and App are two separate buttons', async ({ consolePage, page }) => {
    await page.goto('/sandbox/');
    await expect(consolePage.app).toBeVisible();
    await expect(consolePage.docs).toBeVisible();
    await expect(consolePage.app).toHaveAttribute('aria-pressed', 'true');
    await expect(consolePage.docs).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByTestId('access-app')).toBeVisible();

    await consolePage.docs.click();
    await expect(page.getByTestId('console-docs-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Accounts/ })).toBeVisible();
    await expect(consolePage.docs).toHaveAttribute('aria-pressed', 'true');
    await expect(consolePage.app).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByTestId('access-app')).toBeHidden();

    await consolePage.app.click();
    await expect(page.getByTestId('access-app')).toBeVisible();
    await expect(page.getByTestId('console-docs-page')).toBeHidden();
    await expect(consolePage.app).toHaveAttribute('aria-pressed', 'true');
  });

  test('Docs opens the Console spec', async ({ consolePage, page }) => {
    await page.goto('/sandbox/');
    await expect(consolePage.score).toBeVisible();
    await expect(consolePage.hint).toBeVisible();
    await expect(consolePage.hunterList).toBeHidden();
    await expect(consolePage.reset).toBeVisible();
    await consolePage.docs.click();
    await expect(page.getByTestId('console-docs-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Accounts/ })).toBeVisible();
  });

  test('hint expands the planted-bug list', async ({ page }) => {
    await page.goto('/sandbox/');
    const hint = page.getByTestId('hunter-hint');
    await expect(page.getByTestId('hunter-list')).toBeHidden();
    await hint.locator('summary').click();
    await expect(page.getByTestId('hunter-bug').first()).toBeVisible();
  });
});
