import { test, expect } from '../fixtures';
import { shot } from '../utils/shot';

test.describe('Challenge chrome / Docs @regression', () => {
  test('Docs and App are two separate buttons @smoke @regression', async ({ consolePage, page }) => {
    await page.goto('/sandbox/');
    await expect(consolePage.app).toBeVisible();
    await expect(consolePage.docs).toBeVisible();
    await expect(consolePage.tests).toBeVisible();
    await expect(consolePage.app).toHaveAttribute('aria-pressed', 'true');
    await expect(consolePage.docs).toHaveAttribute('aria-pressed', 'false');
    await expect(consolePage.tests).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByTestId('access-app')).toBeVisible();
    await shot(page, 'app-view');

    await consolePage.docs.click();
    await expect(page.getByTestId('console-docs-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Accounts/ })).toBeVisible();
    await expect(consolePage.docs).toHaveAttribute('aria-pressed', 'true');
    await expect(consolePage.app).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByTestId('access-app')).toBeHidden();
    await shot(page, 'docs-view');

    await consolePage.app.click();
    await expect(page.getByTestId('access-app')).toBeVisible();
    await expect(page.getByTestId('console-docs-page')).toBeHidden();
    await expect(consolePage.app).toHaveAttribute('aria-pressed', 'true');
  });

  test('Tests panel links the repo and embeds the report @regression', async ({ consolePage, page }) => {
    await page.goto('/sandbox/');
    await consolePage.tests.click();
    await expect(page.getByTestId('sandbox-tests')).toBeVisible();
    await expect(page.getByTestId('access-app')).toBeHidden();
    await expect(consolePage.tests).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('tests-repo')).toHaveAttribute(
      'href',
      'https://github.com/KovalenkoMykhailo/northgate-console-e2e'
    );
    await expect(page.getByTestId('tests-run')).toHaveCount(0);
    await expect(page.getByTestId('tests-actions')).toHaveAttribute(
      'href',
      'https://github.com/KovalenkoMykhailo/northgate-console-e2e/actions/workflows/e2e.yml'
    );
    await expect(page.getByTestId('tests-frame')).toHaveAttribute(
      'src',
      'https://kovalenkomykhailo.github.io/northgate-console-e2e/html/index.html'
    );
    await expect(page.getByTestId('tests-cmd')).toHaveText('npm test');
    await page.getByTestId('tests-suite-smoke').click();
    await expect(page.getByTestId('tests-cmd')).toHaveText('npm run test:smoke');
    await expect(page.getByTestId('tests-frame')).toHaveAttribute(
      'src',
      'https://kovalenkomykhailo.github.io/northgate-console-e2e/html/index.html#?q=%40smoke'
    );
  });

  test('Docs opens the Console spec @regression', async ({ consolePage, page }) => {
    await page.goto('/sandbox/');
    await expect(consolePage.score).toBeVisible();
    await expect(consolePage.hint).toBeVisible();
    await expect(consolePage.hunterList).toBeHidden();
    await expect(consolePage.reset).toBeVisible();
    await consolePage.docs.click();
    await expect(page.getByTestId('console-docs-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Accounts/ })).toBeVisible();
  });

  test('hint expands the planted-bug list @regression', async ({ page }) => {
    await page.goto('/sandbox/');
    const hint = page.getByTestId('hunter-hint');
    await expect(page.getByTestId('hunter-list')).toBeHidden();
    await hint.locator('summary').click();
    await expect(page.getByTestId('hunter-bug').first()).toBeVisible();
  });
});
