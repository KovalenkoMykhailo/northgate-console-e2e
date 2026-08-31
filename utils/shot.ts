import { test, type Page } from '@playwright/test';

/** Full-page PNG on the test (Playwright HTML + Allure both show attachments). */
export async function shot(page: Page, name: string): Promise<void> {
  const body = await page.screenshot({ type: 'png', fullPage: true });
  await test.info().attach(name, { body, contentType: 'image/png' });
}
