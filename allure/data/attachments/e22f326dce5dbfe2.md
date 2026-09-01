# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: planted.spec.ts >> Spec gaps @planted >> insufficient funds is 4xx
- Location: tests/planted.spec.ts:84:7

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 400
Received:    200
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "MK" [ref=e5] [cursor=pointer]:
        - /url: ../
      - navigation "Main" [ref=e6]:
        - generic "On this page" [ref=e7]:
          - link "CV" [ref=e8] [cursor=pointer]:
            - /url: ../
          - link "Experience" [ref=e9] [cursor=pointer]:
            - /url: ../#experience
          - link "Skills" [ref=e10] [cursor=pointer]:
            - /url: ../#skills
          - link "Contact" [ref=e11] [cursor=pointer]:
            - /url: ../#contact
          - link "JD fit" [ref=e12] [cursor=pointer]:
            - /url: ../#fit
        - generic "Pages" [ref=e14]:
          - link "Notes" [ref=e16] [cursor=pointer]:
            - /url: ../notes/
          - link "Q&A" [ref=e17] [cursor=pointer]:
            - /url: ../qa/
          - link "Learn" [ref=e18] [cursor=pointer]:
            - /url: ../learn/
      - generic [ref=e19]:
        - link "Try yourself as a QA" [ref=e20] [cursor=pointer]:
          - /url: ./
        - button "Search Ctrl+K" [ref=e22] [cursor=pointer]:
          - generic [ref=e23]: Search
          - generic [ref=e24]: Ctrl+K
        - link "Download CV" [ref=e25] [cursor=pointer]:
          - /url: ../cv/Kovalenko_Mykhailo_Senior_General_QA_Engineer.pdf
        - button "Light or dark theme" [ref=e26] [cursor=pointer]
        - group "Language" [ref=e29]:
          - button "UA" [ref=e30] [cursor=pointer]
          - button "EN" [pressed] [ref=e31] [cursor=pointer]
  - main [ref=e32]:
    - generic [ref=e33]:
      - paragraph [ref=e34]: Fake B2B admin · not a live bank
      - 'heading "QA challenge: Northgate Console" [level=1] [ref=e35]'
      - paragraph [ref=e36]: "A small banking back-office: login, corporate accounts (full CRUD), transfers, Access & Identity, and audit. Same area I tested at work — users, roles, account structures — not payment-provider rails. I planted bugs in the UI and in the REST API. Compare the table with Chrome Network / the API log and with the Console docs spec. Locators have data-testid for Playwright UI + API checks."
      - paragraph [ref=e37]: "Docs is the spec: auth, accounts CRUD, transfers, Access, REST, seed data, locators. Product UI is English on purpose."
      - generic [ref=e38]:
        - paragraph [ref=e39]:
          - generic [ref=e40]: Bugs found
          - generic [ref=e41]: 3 / 12
        - group [ref=e44]:
          - 'generic "Hint: which bugs are planted" [ref=e45] [cursor=pointer]'
        - button "Start over" [ref=e46] [cursor=pointer]
      - group "Docs / App / Tests" [ref=e47]:
        - button "Docs" [ref=e48] [cursor=pointer]
        - button "App" [pressed] [ref=e49] [cursor=pointer]
        - button "Tests" [ref=e50] [cursor=pointer]
    - generic [ref=e52]:
      - generic [ref=e53]:
        - generic [ref=e54]:
          - strong [ref=e55]: Northgate Console
          - generic [ref=e56]: TEST
          - generic [ref=e57]: Ada Chen · Admin
          - button "Log out" [ref=e58] [cursor=pointer]
        - tablist "Northgate Console" [ref=e59]:
          - tab "Accounts" [ref=e60] [cursor=pointer]
          - tab "Transfers" [selected] [ref=e61] [cursor=pointer]
          - tab "Access" [ref=e62] [cursor=pointer]
          - tab "Audit" [ref=e63] [cursor=pointer]
          - tab "API" [ref=e64] [cursor=pointer]
        - generic [ref=e65]:
          - generic [ref=e66]:
            - generic [ref=e67]:
              - generic [ref=e68]:
                - generic [ref=e69]: From
                - combobox "From" [ref=e70]:
                  - option "Northgate Ops · EUR · 125000.50"
                  - option "Northgate Ops · USD · 8800.00"
                  - option "Ada Chen · EUR · 4200.50"
                  - option "Clara West · GBP · 0.00"
                  - option "Demo Viewer · USD · 99.99" [selected]
                  - option "Baltic Payroll · EUR · 50200.00"
              - generic [ref=e71]:
                - generic [ref=e72]: To
                - combobox "To" [ref=e73]:
                  - option "Northgate Ops · EUR · 125000.50"
                  - option "Northgate Ops · USD · 8800.00" [selected]
                  - option "Ada Chen · EUR · 4200.50"
                  - option "Clara West · GBP · 0.00"
                  - option "Demo Viewer · USD · 99.99"
                  - option "Baltic Payroll · EUR · 50200.00"
              - generic [ref=e74]:
                - generic [ref=e75]: Amount
                - spinbutton "Amount" [ref=e76]: "99999"
              - button "Create transfer" [ref=e78] [cursor=pointer]
            - paragraph [ref=e79]: 200 · INSUFFICIENT_FUNDS
          - generic [ref=e81]:
            - generic [ref=e82]:
              - generic [ref=e83]: Status
              - combobox "Status" [ref=e84]:
                - option "All" [selected]
                - option "Pending"
                - option "Settled"
                - option "Failed"
            - generic [ref=e85]:
              - generic [ref=e86]: Min amount
              - spinbutton "Min amount" [ref=e87]
            - generic [ref=e88]:
              - generic [ref=e89]: Max amount
              - spinbutton "Max amount" [ref=e90]
            - button "Apply filters" [ref=e92] [cursor=pointer]
          - table [ref=e94]:
            - rowgroup [ref=e95]:
              - row [ref=e96]:
                - columnheader "Date" [ref=e97]
                - columnheader "Ref" [ref=e98]
                - columnheader "From" [ref=e99]
                - columnheader "To" [ref=e100]
                - columnheader "Amount" [ref=e101]
                - columnheader "CCY" [ref=e102]
                - columnheader "Status" [ref=e103]
            - rowgroup [ref=e104]:
              - row [ref=e105]:
                - cell "2026-08-28" [ref=e106]
                - cell "NG-TX-1001" [ref=e107]
                - cell "Northgate Ops" [ref=e108]
                - cell "Baltic Payroll" [ref=e109]
                - cell "2500.00" [ref=e110]
                - cell "EUR" [ref=e111]
                - cell "Settled" [ref=e112]
              - row [ref=e114]:
                - cell "2026-08-30" [ref=e115]
                - cell "NG-TX-1002" [ref=e116]
                - cell "Northgate Ops" [ref=e117]
                - cell "Ada Chen" [ref=e118]
                - cell "120.00" [ref=e119]
                - cell "EUR" [ref=e120]
                - cell "Pending" [ref=e121]
              - row [ref=e123]:
                - cell "2026-08-29" [ref=e124]
                - cell "NG-TX-1003" [ref=e125]
                - cell "Northgate Ops" [ref=e126]
                - cell "Demo Viewer" [ref=e127]
                - cell "40.00" [ref=e128]
                - cell "USD" [ref=e129]
                - cell "Failed" [ref=e130]
              - row [ref=e132]:
                - cell "2026-08-20" [ref=e133]
                - cell "NG-TX-1004" [ref=e134]
                - cell "Baltic Payroll" [ref=e135]
                - cell "Bohdan Koval" [ref=e136]
                - cell "15.00" [ref=e137]
                - cell "EUR" [ref=e138]
                - cell "Settled" [ref=e139]
              - row [ref=e141]:
                - cell "2026-08-31" [ref=e142]
                - cell "NG-TX-1005" [ref=e143]
                - cell "Northgate Ops" [ref=e144]
                - cell "Clara West" [ref=e145]
                - cell "300.00" [ref=e146]
                - cell "EUR" [ref=e147]
                - cell "Pending" [ref=e148]
      - generic: INSUFFICIENT_FUNDS
  - contentinfo [ref=e150]:
    - generic [ref=e151]:
      - generic [ref=e152]: v1.3.0
      - generic [ref=e153]: ·
      - generic [ref=e154]: main@93c8941
      - generic [ref=e155]: ·
      - generic [ref=e156]: passing
      - generic [ref=e157]: ✓
    - paragraph [ref=e158]: Mykhailo Kovalenko · Senior General QA Engineer
```

# Test source

```ts
  1   | import { test, expect } from '../fixtures';
  2   | import { waitForApi } from '../utils/api';
  3   | import { seed } from '../utils/constants';
  4   | 
  5   | /**
  6   |  * These tests assert the Console docs spec.
  7   |  * They are expected to fail while planted gaps stay in the SUT.
  8   |  * If one starts passing, a planted bug was removed — that is the signal.
  9   |  */
  10  | test.describe('Spec gaps @planted', () => {
  11  |   test.beforeEach(async ({ consolePage }) => {
  12  |     await consolePage.openConsole();
  13  |   });
  14  | 
  15  |   const soon = { timeout: 2_000 };
  16  | 
  17  |   test('search is case-insensitive', async ({ accountsPage }) => {
  18  |     test.fail(true, 'Spec: q matches holder without case. Lowercase search currently returns empty.');
  19  |     await accountsPage.search.fill('ada chen');
  20  |     await accountsPage.applyFilters();
  21  |     await expect(accountsPage.row(seed.adaChenId)).toBeVisible(soon);
  22  |   });
  23  | 
  24  |   test('Active filter hides Frozen', async ({ accountsPage }) => {
  25  |     test.fail(true, 'Spec: status=Active hides Frozen.');
  26  |     await accountsPage.status.selectOption('Active');
  27  |     await accountsPage.applyFilters();
  28  |     await expect(accountsPage.row(seed.bohdanId)).toHaveCount(0, soon);
  29  |   });
  30  | 
  31  |   test('currency filter keeps only that currency', async ({ accountsPage }) => {
  32  |     test.fail(true, 'Spec: currency=EUR drops USD and GBP.');
  33  |     await accountsPage.currency.selectOption('EUR');
  34  |     await accountsPage.applyFilters();
  35  |     const rows = accountsPage.page.getByTestId('account-row');
  36  |     const count = await rows.count();
  37  |     for (let i = 0; i < count; i += 1) {
  38  |       await expect(rows.nth(i)).toHaveAttribute('data-currency', 'EUR', soon);
  39  |     }
  40  |   });
  41  | 
  42  |   test('max balance is inclusive', async ({ accountsPage }) => {
  43  |     test.fail(true, 'Spec: balance 150 stays when max=150.');
  44  |     await accountsPage.max.fill('150');
  45  |     await accountsPage.applyFilters();
  46  |     await expect(accountsPage.row(seed.bohdanId)).toBeVisible(soon);
  47  |   });
  48  | 
  49  |   test('Client sort is by holder, not IBAN', async ({ accountsPage, page }) => {
  50  |     test.fail(true, 'Spec: sort=holder orders by client name.');
  51  |     const sorted = waitForApi(page, 'GET', 'accounts');
  52  |     await accountsPage.sortHolder.click();
  53  |     const res = await sorted;
  54  |     const body = await res.json();
  55  |     const holders = body.items.map((row: { holder: string }) => row.holder);
  56  |     const expected = [...holders].sort((a, b) => a.localeCompare(b));
  57  |     expect(holders).toEqual(expected);
  58  |   });
  59  | 
  60  |   test('Open accounts KPI equals Active rows', async ({ accountsPage }) => {
  61  |     test.fail(true, 'Spec: open KPI is the Active count (6 on seed).');
  62  |     await expect(accountsPage.kpiOpen).toContainText(String(seed.openAccountsSpec), soon);
  63  |   });
  64  | 
  65  |   test('Ada Chen table balance matches GET /accounts', async ({ accountsPage, page }) => {
  66  |     test.fail(true, 'Spec: table balance equals API (4200.50, not 4200).');
  67  |     const res = waitForApi(page, 'GET', 'accounts/acc-3');
  68  |     await accountsPage.row(seed.adaChenId).click();
  69  |     expect((await res).status()).toBe(200);
  70  |     await expect(accountsPage.row(seed.adaChenId).getByTestId('account-balance')).toHaveText(
  71  |       seed.adaChenBalanceApi,
  72  |       soon
  73  |     );
  74  |   });
  75  | 
  76  |   test('freeze persists on next GET and reload', async ({ accountsPage, page }) => {
  77  |     test.fail(true, 'Spec: PATCH status must persist. Edit/PUT is a different contract.');
  78  |     const patch = await accountsPage.confirmFreeze('acc-1');
  79  |     expect(patch.status()).toBe(200);
  80  |     await page.reload();
  81  |     await expect(accountsPage.row('acc-1')).toHaveAttribute('data-status', 'Frozen', soon);
  82  |   });
  83  | 
  84  |   test('insufficient funds is 4xx', async ({ consolePage, transfersPage }) => {
  85  |     test.fail(true, 'Spec: amount above balance is not 200.');
  86  |     await consolePage.tabTransfers.click();
  87  |     const res = await transfersPage.create('acc-7', 'acc-2', '99999');
> 88  |     expect(res.status()).toBeGreaterThanOrEqual(400);
      |                          ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  89  |   });
  90  | 
  91  |   test('Admin invite stays Admin', async ({ consolePage, accessPage }) => {
  92  |     test.fail(true, 'Spec: invited role equals the role sent.');
  93  |     await consolePage.tabAccess.click();
  94  |     const email = `qa.admin.${Date.now()}@northgate.test`;
  95  |     const res = await accessPage.invite('QA Admin', email, 'Admin');
  96  |     expect(res.status()).toBe(201);
  97  |     expect((await res.json()).role).toBe('Admin');
  98  |     await expect(accessPage.member(email).getByTestId('member-role')).toHaveText('Admin', soon);
  99  |   });
  100 | });
  101 | 
```