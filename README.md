# Northgate Console — Playwright E2E

Pet project. Playwright + TypeScript tests for a fake B2B admin I built: [Northgate Console](https://kovalenkomykhailo.github.io/sandbox/).

Not a job. Clone **this repo only** — you do not need the site sources to run the tests.

**SUT:** https://kovalenkomykhailo.github.io/sandbox/  
**Demo login:** `ada.chen@northgate.test` / `Access123!`

REST is an in-browser Service Worker. Tests use `page.waitForResponse`. Playwright `request` (Node HTTP) does not hit this API.

## Stack

- Playwright + TypeScript
- Page objects + fixtures
- `storageState` login
- `data-testid` locators
- GitHub Actions CI against the live SUT

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
npm run test:green    # skip @planted spec-gap tests
npm run typecheck
```

## Layout

| Path | Role |
| --- | --- |
| `pages/` | POM |
| `fixtures/` | page objects on `test` |
| `tests/auth.setup.ts` | writes `playwright/.auth/user.json` |
| `tests/*.spec.ts` | specs |
| `tests/planted.spec.ts` | Console docs spec; `test.fail` while planted gaps stay |

The SUT has planted bugs on purpose. `@planted` tests assert the spec and are expected to fail until those gaps stay. Do not “fix” the console to make them pass.
