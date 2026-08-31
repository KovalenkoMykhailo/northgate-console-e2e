import { type Page } from '@playwright/test';
import { demoUser, routes } from './constants';

export type ApiResult<T = unknown> = { status: number; body: T };

type CallOptions = {
  token?: string;
  body?: unknown;
};

/**
 * REST lives in the page Service Worker. Open the live/local sandbox, then fetch.
 * Playwright `request` (Node HTTP) hits GitHub Pages files and gets 404.
 */
export async function ready(page: Page): Promise<void> {
  await page.goto(routes.sandbox);
  await page.getByTestId('login-form').waitFor();
  await page.evaluate(async () => {
    const boot = (window as unknown as { __ngApiReady?: Promise<unknown> }).__ngApiReady;
    if (boot) await boot;
  });
}

export async function callApi<T = unknown>(
  page: Page,
  method: string,
  apiPath: string,
  options: CallOptions = {}
): Promise<ApiResult<T>> {
  return page.evaluate(
    async ({ method, apiPath, token, body }) => {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = 'Bearer ' + token;
      const res = await fetch('/sandbox/api/v1/' + apiPath.replace(/^\/+/, ''), {
        method,
        headers,
        body: body === null || body === undefined ? undefined : JSON.stringify(body),
      });
      const text = await res.text();
      let parsed: unknown = null;
      if (text) {
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }
      }
      return { status: res.status, body: parsed as T };
    },
    {
      method,
      apiPath,
      token: options.token ?? '',
      body: options.body ?? null,
    }
  );
}

export async function loginApi(page: Page): Promise<string> {
  const res = await callApi<{ token: string }>(page, 'POST', 'auth/login', {
    body: { email: demoUser.email, password: demoUser.password },
  });
  if (res.status !== 200 || !res.body?.token) {
    throw new Error('API login failed: ' + res.status);
  }
  return res.body.token;
}
