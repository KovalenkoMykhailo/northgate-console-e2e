import path from 'node:path';

export const AUTH_FILE = path.join(__dirname, '..', 'playwright', '.auth', 'user.json');

export const routes = {
  sandbox: '/sandbox/',
  docs: '/sandbox/#docs',
} as const;

export const demoUser = {
  email: 'ada.chen@northgate.test',
  password: 'Access123!',
  session: 'Ada Chen · Admin',
} as const;

export const seed = {
  adaChenId: 'acc-3',
  adaChenBalanceApi: '4200.50',
  bohdanId: 'acc-4',
  bohdanBalance: '150.00',
  pendingFrom: 'acc-1',
  closedNoPending: 'acc-6',
  openAccountsSpec: 6,
} as const;
