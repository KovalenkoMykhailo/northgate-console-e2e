import { test, expect } from '../../fixtures';
import { uniqueIban } from '../../utils/api';
import { callApi, loginApi, ready } from '../../utils/http';
import { seed } from '../../utils/constants';

type Account = {
  id: string;
  holder: string;
  iban: string;
  currency: string;
  status: string;
  balance: number;
};

type List = { items: Account[]; total: number; page: number; pageSize: number };

test.describe('API accounts @api @regression', () => {
  let token: string;

  test.beforeEach(async ({ page }) => {
    await ready(page);
    token = await loginApi(page);
  });

  test('GET list default pageSize is 20 @smoke @regression', async ({ page }) => {
    const res = await callApi<List>(page, 'GET', 'accounts', { token });
    expect(res.status).toBe(200);
    expect(res.body.page).toBe(1);
    expect(res.body.pageSize).toBe(20);
    expect(res.body.total).toBeGreaterThanOrEqual(8);
    expect(res.body.items.length).toBe(res.body.total);
  });

  test('GET list page=2 pageSize=5 @regression', async ({ page }) => {
    const res = await callApi<List>(page, 'GET', 'accounts?page=2&pageSize=5', { token });
    expect(res.status).toBe(200);
    expect(res.body.page).toBe(2);
    expect(res.body.pageSize).toBe(5);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body.items.length).toBeLessThanOrEqual(5);
  });

  test('GET q=Ada Chen finds Ada @regression', async ({ page }) => {
    const res = await callApi<List>(page, 'GET', 'accounts?q=' + encodeURIComponent('Ada Chen'), {
      token,
    });
    expect(res.status).toBe(200);
    expect(res.body.items.some((row) => row.id === seed.adaChenId)).toBe(true);
  });

  test('GET status=Closed keeps only Closed @regression', async ({ page }) => {
    const res = await callApi<List>(page, 'GET', 'accounts?status=Closed', { token });
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body.items.every((row) => row.status === 'Closed')).toBe(true);
  });

  test('GET status=Frozen keeps Frozen @regression', async ({ page }) => {
    const res = await callApi<List>(page, 'GET', 'accounts?status=Frozen', { token });
    expect(res.status).toBe(200);
    expect(res.body.items.some((row) => row.id === seed.bohdanId)).toBe(true);
    expect(res.body.items.every((row) => row.status === 'Frozen')).toBe(true);
  });

  test('GET minBalance=50000 is inclusive @regression', async ({ page }) => {
    const res = await callApi<List>(page, 'GET', 'accounts?minBalance=50000', { token });
    expect(res.status).toBe(200);
    expect(res.body.items.every((row) => row.balance >= 50000)).toBe(true);
    expect(res.body.items.some((row) => row.id === 'acc-1')).toBe(true);
  });

  test('GET /accounts/:id 200 and 404 @regression', async ({ page }) => {
    const ok = await callApi<Account>(page, 'GET', 'accounts/' + seed.adaChenId, { token });
    expect(ok.status).toBe(200);
    expect(ok.body.id).toBe(seed.adaChenId);
    expect(ok.body.balance).toBe(4200.5);

    const missing = await callApi(page, 'GET', 'accounts/acc-missing', { token });
    expect(missing.status).toBe(404);
    expect(missing.body).toEqual({ error: 'Not found' });
  });

  test('POST create 201 then GET by id @regression', async ({ page }) => {
    const iban = uniqueIban();
    const created = await callApi<Account>(page, 'POST', 'accounts', {
      token,
      body: {
        holder: 'API Client',
        iban,
        type: 'Current',
        currency: 'EUR',
        balance: 25,
        status: 'Active',
      },
    });
    expect(created.status).toBe(201);
    expect(created.body.holder).toBe('API Client');
    expect(created.body.iban).toBe(iban);

    const got = await callApi<Account>(page, 'GET', 'accounts/' + created.body.id, { token });
    expect(got.status).toBe(200);
    expect(got.body.iban).toBe(iban);
  });

  test('POST missing holder is 400 @regression', async ({ page }) => {
    const res = await callApi(page, 'POST', 'accounts', {
      token,
      body: { holder: '', iban: uniqueIban() },
    });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Holder and IBAN are required.' });
  });

  test('POST invalid currency is 400 @regression', async ({ page }) => {
    const res = await callApi(page, 'POST', 'accounts', {
      token,
      body: { holder: 'Bad CCY', iban: uniqueIban(), currency: 'BTC' },
    });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid currency' });
  });

  test('PUT duplicate IBAN is 409 @regression', async ({ page }) => {
    const res = await callApi(page, 'PUT', 'accounts/acc-7', {
      token,
      body: {
        holder: 'Demo Viewer',
        iban: 'NG00 1000 0000 0001',
        type: 'Current',
        currency: 'USD',
        balance: 99.99,
        status: 'Active',
      },
    });
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ error: 'DUPLICATE_IBAN' });
  });

  test('DELETE unknown id is 404 @regression', async ({ page }) => {
    const res = await callApi(page, 'DELETE', 'accounts/acc-missing', { token });
    expect(res.status).toBe(404);
  });

  test('DELETE with pending transfer is 409 @regression', async ({ page }) => {
    const res = await callApi(page, 'DELETE', 'accounts/' + seed.pendingFrom, { token });
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ error: 'ACCOUNT_HAS_PENDING_TRANSFERS' });
  });
});
