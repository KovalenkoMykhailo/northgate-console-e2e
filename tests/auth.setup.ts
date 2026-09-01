import { test } from '../fixtures';
import { AUTH_FILE, demoUser } from '../utils/constants';

test('authenticate @regression', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.signIn(demoUser.password);
  await page.context().storageState({ path: AUTH_FILE });
});
