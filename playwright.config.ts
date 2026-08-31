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
  workers: process.env.CI ? 1 : undefined,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['allure-playwright', { resultsDir: 'allure-results', detail: true, suiteTitle: true }],
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'on',
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
      testMatch: /tests\/(auth|docs)\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
      },
    },
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
        screenshot: 'only-on-failure',
      },
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts$|tests\/(auth|docs)\.spec\.ts$|tests\/api\/|mobile\.smoke/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'mobile',
      testMatch: /mobile\.smoke\.spec\.ts$/,
      use: {
        ...devices['Pixel 5'],
        storageState: { cookies: [], origins: [] },
      },
    },
  ],
});
