# Northgate Console — Playwright E2E

[![e2e](https://github.com/KovalenkoMykhailo/northgate-console-e2e/actions/workflows/e2e.yml/badge.svg?branch=main)](https://github.com/KovalenkoMykhailo/northgate-console-e2e/actions/workflows/e2e.yml)

Pet project. Playwright + TypeScript tests for a fake B2B admin I built: [Northgate Console](https://kovalenkomykhailo.github.io/sandbox/).

Not a job. Clone **this repo only** — you do not need the site sources to run the tests.

**SUT:** https://kovalenkomykhailo.github.io/sandbox/  
**Demo login:** `ada.chen@northgate.test` / `Access123!`

REST is an in-browser Service Worker on the live Pages app. UI tests use `page.waitForResponse`. API tests call `fetch` **inside the page** (`utils/http.ts`) against that same SUT. Playwright `request` is Node HTTP — GitHub Pages has no backend, so those calls get a static 404.

## Stack

- Playwright + TypeScript
- Page objects + fixtures
- `storageState` login for UI
- Separate **API** project: login via POST, then GET/POST/PUT/PATCH/DELETE with Bearer (in-page `fetch`)
- `data-testid` locators
- GitHub Actions CI against the live SUT
- Playwright HTML + Allure reports (screenshots on UI tests)

## Run

```bash
git clone https://github.com/KovalenkoMykhailo/northgate-console-e2e.git
cd northgate-console-e2e
npm ci
npx playwright install chromium
npm test
```

Without a local copy of the site, tests hit the live Pages URL.

Local layout:

```
git/cv/
  site/                          # SUT (GitHub Pages)
  test/northgate-console-e2e/    # this repo
```

If `../../site` exists, Playwright starts a local `python3 -m http.server 4173` there.

```bash
SITE_ROOT=/path/to/site npm test
BASE_URL=https://kovalenkomykhailo.github.io npm test
npm run test:smoke         # @smoke only
npm run test:regression    # everything except @planted
npm run test:planted
npm run test:api
npm run test:viewport      # Pixel 5 viewport — not a real device
npm run test:green         # alias of test:regression
npm run typecheck
npx playwright show-report
npm run allure:generate && npm run allure:open
```

Tags in titles: `@smoke` `@planted` `@api` `@viewport`. CI **Run workflow** has the same suite list.

## Layout

| Path | Role |
| --- | --- |
| `pages/` | POM |
| `fixtures/` | page objects on `test` |
| `utils/http.ts` | in-page REST client against the live/local SUT |
| `utils/shot.ts` | full-page PNG attached to HTML + Allure |
| `tests/auth.setup.ts` | writes `playwright/.auth/user.json` |
| `tests/*.spec.ts` | UI specs |
| `tests/api/*.spec.ts` | API specs (no form clicks) |
| `tests/planted.spec.ts` | UI spec-gaps; `test.fail` while planted bugs stay |
| `tests/api/spec-gaps.spec.ts` | same gaps on GET/PATCH/POST |

The SUT has planted bugs on purpose. `@planted` tests assert the spec and are expected to fail until those gaps stay. Do not “fix” the console to make them pass.

## CI

GitHub Actions runs the full suite against the live SUT:

- pull request into `main`
- push / merge to `main`
- manual **Run workflow**
- **Run tests** on the Console Tests tab (`workflow_dispatch`, or a prefilled `[e2e] <suite>` issue)

`CI=true` turns on `forbidOnly`, 2 retries, and 1 worker (shared demo data). Every run uploads Playwright HTML, Allure, and traces. Push / merge to `main` also publishes:

https://kovalenkomykhailo.github.io/northgate-console-e2e/

(`index.html` · `/html/` · `/allure/`). Enable GitHub Pages on this repo: source **gh-pages** / root. `@planted` cases stay `test.fail` — unexpected pass means a planted bug was removed.

UI tests take a full-page shot at the end (`screenshot: 'on'` + `full-page` attach). Named shots sit in the key flows (login, Docs/App, drawer, dialogs). API project stays `screenshot: only-on-failure`.
