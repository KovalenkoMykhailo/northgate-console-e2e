# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: planted.spec.ts >> Spec gaps @planted >> Client sort is by holder, not IBAN
- Location: tests/planted.spec.ts:49:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Array [
+   "Northgate Ops",
+   "Northgate Ops",
    "Ada Chen",
    "Bohdan Koval",
    "Clara West",
-   "Northgate Ops",
-   "Northgate Ops",
  ]
```

# Page snapshot

```yaml
- generic [ref=e1]:
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
    - generic [ref=e53]:
      - generic [ref=e54]:
        - strong [ref=e55]: Northgate Console
        - generic [ref=e56]: TEST
        - generic [ref=e57]: Ada Chen · Admin
        - button "Log out" [ref=e58] [cursor=pointer]
      - tablist "Northgate Console" [ref=e59]:
        - tab "Accounts" [selected] [ref=e60] [cursor=pointer]
        - tab "Transfers" [ref=e61] [cursor=pointer]
        - tab "Access" [ref=e62] [cursor=pointer]
        - tab "Audit" [ref=e63] [cursor=pointer]
        - tab "API" [ref=e64] [cursor=pointer]
      - generic [ref=e65]:
        - generic [ref=e66]:
          - article [ref=e67]:
            - paragraph [ref=e68]: Open accounts
            - paragraph [ref=e69]: "8"
          - article [ref=e70]:
            - paragraph [ref=e71]: Frozen
            - paragraph [ref=e72]: "1"
          - article [ref=e73]:
            - paragraph [ref=e74]: Pending transfers
            - paragraph [ref=e75]: "2"
        - generic [ref=e76]:
          - generic [ref=e77]:
            - generic [ref=e78]:
              - generic [ref=e79]: Client
              - textbox "Client" [ref=e80]:
                - /placeholder: Client name
            - generic [ref=e81]:
              - generic [ref=e82]: IBAN
              - textbox "IBAN" [ref=e83]
            - generic [ref=e84]:
              - generic [ref=e85]: Type
              - combobox "Type" [ref=e86]:
                - option "Current" [selected]
                - option "Operating"
                - option "Payroll"
                - option "Escrow"
            - generic [ref=e87]:
              - generic [ref=e88]: CCY
              - combobox "CCY" [ref=e89]:
                - option "EUR" [selected]
                - option "USD"
                - option "GBP"
          - generic [ref=e90]:
            - generic [ref=e91]:
              - generic [ref=e92]: Balance
              - spinbutton "Balance" [ref=e93]: "0"
            - generic [ref=e94]:
              - generic [ref=e95]: Status
              - combobox "Status" [ref=e96]:
                - option "Active" [selected]
                - option "Frozen"
                - option "Closed"
            - button "Add account" [ref=e98] [cursor=pointer]
        - generic [ref=e99]:
          - generic [ref=e100]:
            - generic [ref=e101]:
              - generic [ref=e102]: Search
              - searchbox "Search" [ref=e103]
            - generic [ref=e104]:
              - button "Apply filters" [ref=e105] [cursor=pointer]
              - button "Clear" [ref=e106] [cursor=pointer]
          - generic [ref=e107]:
            - generic [ref=e108]:
              - generic [ref=e109]: Status
              - combobox "Status" [ref=e110]:
                - option "All" [selected]
                - option "Active"
                - option "Frozen"
                - option "Closed"
            - generic [ref=e111]:
              - generic [ref=e112]: Currency
              - combobox "Currency" [ref=e113]:
                - option "All" [selected]
                - option "EUR"
                - option "USD"
                - option "GBP"
            - generic [ref=e114]:
              - generic [ref=e115]: Min balance
              - spinbutton "Min balance" [ref=e116]
            - generic [ref=e117]:
              - generic [ref=e118]: Max balance
              - spinbutton "Max balance" [ref=e119]
        - generic [ref=e120]:
          - paragraph [ref=e121]: 8 accounts · page 1 of 2 · GET 200
          - button "Export CSV" [ref=e122] [cursor=pointer]
        - table [ref=e124]:
          - rowgroup [ref=e125]:
            - row [ref=e126]:
              - columnheader "Client" [active] [ref=e127] [cursor=pointer]
              - columnheader "IBAN" [ref=e128]
              - columnheader "Type" [ref=e129]
              - columnheader "CCY" [ref=e130]
              - columnheader "Balance" [ref=e131]
              - columnheader "Status" [ref=e132]
              - columnheader "Actions" [ref=e133]
          - rowgroup [ref=e134]:
            - row [ref=e135] [cursor=pointer]:
              - cell "Northgate Ops" [ref=e136]
              - cell "NG00 1000 0000 0001" [ref=e137]
              - cell "Operating" [ref=e138]
              - cell "EUR" [ref=e139]
              - cell "125000.50" [ref=e140]
              - cell "Active" [ref=e141]
              - cell [ref=e143]:
                - button "Edit" [ref=e144]
                - button "Freeze" [ref=e145]
                - button "Delete" [ref=e146]
            - row [ref=e147] [cursor=pointer]:
              - cell "Northgate Ops" [ref=e148]
              - cell "NG00 1000 0000 0002" [ref=e149]
              - cell "Operating" [ref=e150]
              - cell "USD" [ref=e151]
              - cell "8800.00" [ref=e152]
              - cell "Active" [ref=e153]
              - cell [ref=e155]:
                - button "Edit" [ref=e156]
                - button "Freeze" [ref=e157]
                - button "Delete" [ref=e158]
            - row [ref=e159] [cursor=pointer]:
              - cell "Ada Chen" [ref=e160]
              - cell "NG00 1000 0000 0003" [ref=e161]
              - cell "Current" [ref=e162]
              - cell "EUR" [ref=e163]
              - cell "4200" [ref=e164]
              - cell "Active" [ref=e165]
              - cell [ref=e167]:
                - button "Edit" [ref=e168]
                - button "Freeze" [ref=e169]
                - button "Delete" [ref=e170]
            - row [ref=e171] [cursor=pointer]:
              - cell "Bohdan Koval" [ref=e172]
              - cell "NG00 1000 0000 0004" [ref=e173]
              - cell "Current" [ref=e174]
              - cell "EUR" [ref=e175]
              - cell "150.00" [ref=e176]
              - cell "Frozen" [ref=e177]
              - cell [ref=e179]:
                - button "Edit" [ref=e180]
                - button "Unfreeze" [ref=e181]
                - button "Delete" [ref=e182]
            - row [ref=e183] [cursor=pointer]:
              - cell "Clara West" [ref=e184]
              - cell "NG00 1000 0000 0005" [ref=e185]
              - cell "Current" [ref=e186]
              - cell "GBP" [ref=e187]
              - cell "0.00" [ref=e188]
              - cell "Active" [ref=e189]
              - cell [ref=e191]:
                - button "Edit" [ref=e192]
                - button "Freeze" [ref=e193]
                - button "Delete" [ref=e194]
        - generic [ref=e195]:
          - button "Previous" [disabled] [ref=e196]
          - button "Next" [ref=e197] [cursor=pointer]
  - contentinfo [ref=e198]:
    - generic [ref=e199]:
      - generic [ref=e200]: v1.3.0
      - generic [ref=e201]: ·
      - generic [ref=e202]: main@93c8941
      - generic [ref=e203]: ·
      - generic [ref=e204]: passing
      - generic [ref=e205]: ✓
    - paragraph [ref=e206]: Mykhailo Kovalenko · Senior General QA Engineer
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
> 57  |     expect(holders).toEqual(expected);
      |                     ^ Error: expect(received).toEqual(expected) // deep equality
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
  88  |     expect(res.status()).toBeGreaterThanOrEqual(400);
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