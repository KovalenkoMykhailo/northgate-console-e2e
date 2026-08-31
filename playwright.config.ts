import { defineConfig, devices } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { AUTH_FILE } from './utils/constants';

fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });

const LIVE = 'https://kovalenkomykhailo.github.io';
const localSut = path.resolve(process.env.SITE_ROOT ?? path.join(__dirname, '..', '..', 'site'));
const hasLocalSut = fs.existsSync(path.join(localSut, 'sandbox', 'index.html'));
const baseURL = process.env.BASE_URL ?? (hasLocalSut ? 'http://127.0.0.1:4173' : LIVE);

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 8_000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },
  webServer:
    process.env.BASE_URL || !hasLocalSut
      ? undefined
      : {
          command: 'python3 -m http.server 4173',
          cwd: localSut,
          url: 'http://127.0.0.1:4173/',
          reuseExistingServer: !process.env.CI,
          timeout: 15_000,
        },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'guest',
      testMatch: /auth\.spec\.ts|docs\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
      },
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts|auth\.spec\.ts|docs\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
      },
    },
  ],
});
