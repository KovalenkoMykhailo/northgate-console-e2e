import type { Page, Response } from '@playwright/test';

/** In-browser REST. Do not use Playwright request — Node HTTP never hits the Service Worker. */
export function waitForApi(page: Page, method: string, apiPath: string): Promise<Response> {
  const want = '/sandbox/api/v1/' + apiPath.replace(/^\/+/, '').replace(/\/+$/, '');
  return page.waitForResponse((res) => {
    if (res.request().method() !== method) return false;
    const pathname = new URL(res.url()).pathname.replace(/\/+$/, '');
    return pathname === want || pathname.startsWith(want + '/');
  });
}

export function uniqueIban(): string {
  const n = String(Date.now()).slice(-8);
  return `NG99 ${n.slice(0, 4)} ${n.slice(4)} 0001`;
}
