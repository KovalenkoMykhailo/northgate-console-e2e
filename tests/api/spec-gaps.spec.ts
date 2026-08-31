import { test, expect } from '../../fixtures';
import { callApi, loginApi, ready } from '../../utils/http';
import { seed } from '../../utils/constants';

type Account = { id: string; holder: string; currency: string; status: string; balance: number };
type List = { items: Account[] };

/**
 * Same planted gaps as the UI suite, asserted on GET /accounts (no clicks).
 * Unexpected pass = someone removed a planted bug.
 */
test.describe('API spec gaps @api @planted', () => {
  let token: string;

  test.beforeEach(async ({ page }) => {
    await ready(page);
    token = await loginApi(page);
  });

  test('q is case-insensitive', async ({ page }) => {
    test.fail(true, 'Spec: q matches holder without case. Lowercase search currently returns empty.');
    const res = await callApi<List>(page, 'GET', 'accounts?q=' + encodeURIComponent('ada chen'), {
      token,
    });
    expect(res.status).toBe(200);
    expect(res.body.items.some((row) => row.id === seed.adaChenId)).toBe(true);
  });

  test('status=Active hides Frozen', async ({ page }) => {
    test.fail(true, 'Spec: status=Active hides Frozen.');
    const res = await callApi<List>(page, 'GET', 'accounts?status=Active', { token });
    expect(res.status).toBe(200);
    expect(res.body.items.every((row) => row.status === 'Active')).toBe(true);
  });

  test('currency=EUR drops other currencies', async ({ page }) => {
    test.fail(true, 'Spec: currency=EUR keeps only EUR.');
    const res = await callApi<List>(page, 'GET', 'accounts?currency=EUR', { token });
    expect(res.status).toBe(200);
    expect(res.body.items.every((row) => row.currency === 'EUR')).toBe(true);
  });

  test('maxBalance=150 is inclusive', async ({ page }) => {
    test.fail(true, 'Spec: balance 150 stays when max=150.');
    const res = await callApi<List>(page, 'GET', 'accounts?maxBalance=150', { token });
    expect(res.status).toBe(200);
    expect(res.body.items.some((row) => row.id === seed.bohdanId)).toBe(true);
  });

  test('sort=holder orders by client name', async ({ page }) => {
    test.fail(true, 'Spec: sort=holder orders by holder, not IBAN.');
    const res = await callApi<List>(page, 'GET', 'accounts?sort=holder&pageSize=100', { token });
    expect(res.status).toBe(200);
    const holders = res.body.items.map((row) => row.holder);
    expect(holders).toEqual([...holders].sort((a, b) => a.localeCompare(b)));
  });

  test('GET /stats open equals Active count', async ({ page }) => {
    test.fail(true, 'Spec: open KPI is the Active count (6 on seed).');
    const res = await callApi<{ open: number }>(page, 'GET', 'stats', { token });
    expect(res.status).toBe(200);
    expect(res.body.open).toBe(seed.openAccountsSpec);
  });

  test('PATCH freeze persists on next GET', async ({ page }) => {
    test.fail(true, 'Spec: PATCH status must persist.');
    const patch = await callApi<{ status: string }>(page, 'PATCH', 'accounts/acc-1', {
      token,
      body: { status: 'Frozen' },
    });
    expect(patch.status).toBe(200);
    expect(patch.body.status).toBe('Frozen');
    const got = await callApi<{ status: string }>(page, 'GET', 'accounts/acc-1', { token });
    expect(got.body.status).toBe('Frozen');
  });

  test('insufficient funds is 4xx', async ({ page }) => {
    test.fail(true, 'Spec: amount above balance is not 200.');
    const res = await callApi(page, 'POST', 'transfers', {
      token,
      body: { from: 'acc-7', to: 'acc-2', amount: 99999 },
    });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
