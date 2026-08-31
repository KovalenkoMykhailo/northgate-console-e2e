import { test, expect } from '../fixtures';

test.describe('Access', () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openConsole();
    await consolePage.tabAccess.click();
    await expect(consolePage.page.getByTestId('invite-form')).toBeVisible();
  });

  test('invite Viewer stays Viewer', async ({ accessPage }) => {
    const email = `qa.viewer.${Date.now()}@northgate.test`;
    const res = await accessPage.invite('QA Viewer', email, 'Viewer');
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.role).toBe('Viewer');
    expect(body.status).toBe('Invited');
    await expect(accessPage.member(email).getByTestId('member-role')).toHaveText('Viewer');
  });

  test('missing name is 400', async ({ accessPage }) => {
    const res = await accessPage.invite('', 'nobody@northgate.test', 'Member');
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: 'Name and email are required.' });
  });
});
