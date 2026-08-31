import { test, expect } from '../fixtures';

test.describe('Challenge chrome / Docs', () => {
  test('Docs opens the Console spec', async ({ consolePage, page }) => {
    await page.goto('/sandbox/');
    await expect(consolePage.score).toBeVisible();
    await expect(consolePage.hint).toBeVisible();
    await expect(consolePage.hunterList).toBeHidden();
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
