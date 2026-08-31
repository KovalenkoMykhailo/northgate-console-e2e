#!/usr/bin/env bash
set -euo pipefail

rm -rf public-report
mkdir -p public-report/html public-report/allure

if [[ -d previous-pages/allure/history ]]; then
  mkdir -p allure-results/history
  cp -R previous-pages/allure/history/. allure-results/history/
fi

npx allure generate allure-results -o allure-report --clean

cp -R playwright-report/. public-report/html/
cp -R allure-report/. public-report/allure/
cp scripts/report-index.html public-report/index.html
node scripts/write-status.mjs
