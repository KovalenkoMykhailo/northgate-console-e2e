import fs from 'node:fs';
import path from 'node:path';

const resultsPath = path.resolve('test-results/results.json');
const outDir = path.resolve('public-report');

function walk(suite, acc) {
  for (const child of suite.suites || []) walk(child, acc);
  for (const spec of suite.specs || []) {
    const tests = spec.tests || [];
    const skipped = tests.every(
      (t) => t.status === 'skipped' || (t.results || []).every((r) => r.status === 'skipped')
    );
    if (skipped && tests.length) acc.skipped += 1;
    else if (spec.ok) acc.passed += 1;
    else acc.failed += 1;
  }
}

const acc = { passed: 0, failed: 0, skipped: 0 };
if (fs.existsSync(resultsPath)) {
  const raw = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  for (const suite of raw.suites || []) walk(suite, acc);
}

const status = {
  passed: acc.passed,
  failed: acc.failed,
  skipped: acc.skipped,
  total: acc.passed + acc.failed + acc.skipped,
  sha: process.env.GITHUB_SHA || '',
  at: new Date().toISOString(),
  html: './html/index.html',
  allure: './allure/index.html',
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'status.json'), JSON.stringify(status, null, 2) + '\n');

if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    [
      '## Northgate Console e2e',
      '',
      `| Passed | Failed | Skipped | Total |`,
      `| ---: | ---: | ---: | ---: |`,
      `| ${status.passed} | ${status.failed} | ${status.skipped} | ${status.total} |`,
      '',
      `- Playwright HTML: ${status.html}`,
      `- Allure: ${status.allure}`,
      '',
    ].join('\n')
  );
}

process.stdout.write(JSON.stringify(status) + '\n');
