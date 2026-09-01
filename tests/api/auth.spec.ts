import { test, expect } from '../../fixtures';
import { callApi, loginApi, ready } from '../../utils/http';
import { demoUser } from '../../utils/constants';

test.describe('API auth @api @regression', () => {
  test.beforeEach(async ({ page }) => {
    await ready(page);
  });

  test('POST login 200 returns token and user @smoke @regression', async ({ page }) => {
    const res = await callApi<{ token: string; user: { email: string; role: string } }>(
      page,
      'POST',
      'auth/login',
      { body: { email: demoUser.email, password: demoUser.password } }
    );
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.email).toBe(demoUser.email);
    expect(res.body.user.role).toBe('Admin');
  });

  test('GET /me without token is 401 @regression', async ({ page }) => {
    const res = await callApi(page, 'GET', 'me');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Unauthorized' });
  });

  test('GET /me with Bearer is 200 @smoke @regression', async ({ page }) => {
    const token = await loginApi(page);
    const res = await callApi<{ email: string; name: string; role: string }>(page, 'GET', 'me', {
      token,
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      email: demoUser.email,
      name: 'Ada Chen',
      role: 'Admin',
    });
  });

  test('unknown path without token is 401 @regression', async ({ page }) => {
    const res = await callApi(page, 'GET', 'no-such-route');
    expect(res.status).toBe(401);
  });

  test('unknown path with token is 404 @regression', async ({ page }) => {
    const token = await loginApi(page);
    const res = await callApi(page, 'GET', 'no-such-route', { token });
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: 'No route', method: 'GET' });
  });
});
