import { test, expect } from '../../fixtures';
import { uniqueIban } from '../../utils/api';
import { callApi, loginApi, ready } from '../../utils/http';

test.describe('API catalog', () => {
  let token: string;

  test.beforeEach(async ({ page }) => {
    await ready(page);
    token = await loginApi(page);
  });

  test('GET /stats has KPI keys', async ({ page }) => {
    const res = await callApi<{ open: number; frozen: number; closed: number; pending: number }>(
      page,
      'GET',
      'stats',
      { token }
    );
    expect(res.status).toBe(200);
    expect(res.body.frozen).toBeGreaterThanOrEqual(1);
    expect(res.body.closed).toBeGreaterThanOrEqual(1);
    expect(res.body.pending).toBeGreaterThanOrEqual(2);
    expect(typeof res.body.open).toBe('number');
  });

  test('GET /transfers returns items', async ({ page }) => {
    const res = await callApi<{ items: { status: string }[]; total: number }>(
      page,
      'GET',
      'transfers',
      { token }
    );
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(res.body.items.length);
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  test('GET /transfers?status=Pending', async ({ page }) => {
    const res = await callApi<{ items: { status: string }[] }>(
      page,
      'GET',
      'transfers?status=Pending',
      { token }
    );
    expect(res.status).toBe(200);
    expect(res.body.items.every((row) => row.status === 'Pending')).toBe(true);
  });

  test('POST transfer currency mismatch is 409', async ({ page }) => {
    const res = await callApi(page, 'POST', 'transfers', {
      token,
      body: { from: 'acc-1', to: 'acc-2', amount: 10 },
    });
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ error: 'CURRENCY_MISMATCH' });
  });

  test('GET /members returns items', async ({ page }) => {
    const res = await callApi<{ items: unknown[]; total: number }>(page, 'GET', 'members', {
      token,
    });
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(res.body.items.length);
  });

  test('GET /audit includes CREATE after POST account', async ({ page }) => {
    const created = await callApi<{ id: string }>(page, 'POST', 'accounts', {
      token,
      body: { holder: 'Audit API', iban: uniqueIban(), balance: 1 },
    });
    expect(created.status).toBe(201);

    const audit = await callApi<{ items: { action: string; target: string }[] }>(
      page,
      'GET',
      'audit',
      { token }
    );
    expect(audit.status).toBe(200);
    expect(
      audit.body.items.some((row) => row.action === 'CREATE' && row.target === created.body.id)
    ).toBe(true);
  });
});
