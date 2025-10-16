# AI SOC Portal Automated Testing Framework

## 🚀 TypeScript + Playwright Test Automation Framework

A modern, robust test automation framework for the AI SOC Portal using **TypeScript** and **Playwright**.

---

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Writing Tests](#writing-tests)
- [Reporting](#reporting)
- [CI/CD Integration](#cicd-integration)

---

## ✨ Features

- ✅ **TypeScript** - Type-safe test code
- ✅ **Playwright** - Fast, reliable browser automation
- ✅ **Page Object Model** - Maintainable test architecture
- ✅ **Multiple Browsers** - Chrome, Firefox, WebKit support
- ✅ **Parallel Execution** - Fast test execution
- ✅ **Allure Reports** - Beautiful, detailed test reports
- ✅ **HTML Reports** - Built-in Playwright HTML reports
- ✅ **Screenshots & Videos** - Automatic capture on failure
- ✅ **Trace Viewer** - Debug failed tests with trace viewer
- ✅ **Test Fixtures** - Reusable test setup
- ✅ **CI/CD Ready** - Easy integration with any CI/CD pipeline

---

## 📦 Prerequisites

- **Node.js** 18+ and npm
- **Git**

---

## 🔧 Installation

### 1. Clone the repository
```bash
cd /Users/macbook/Documents/Sources/ai-soc-portal-auto-test
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npm run install:browsers
```

### 4. Set up environment variables (optional)
```bash
# Create .env file (optional - defaults are provided)
PORTAL_URL=https://dev-aisoc-fe.qualgo.dev
HEADLESS=false
```

---

## 📁 Project Structure

```
ai-soc-portal-auto-test/
├── tests/
│   ├── config/
│   │   └── config.ts                 # Configuration management
│   ├── fixtures/
│   │   └── page-fixtures.ts          # Test fixtures
│   ├── pages/
│   │   ├── BasePage.ts               # Base page object
│   │   └── ITAssetInventoryPage.ts   # IT Asset Inventory page
│   ├── utils/
│   │   └── helpers.ts                # Utility functions
│   └── it-asset-inventory.spec.ts    # Test specifications
├── test-results/                      # Test results and artifacts
├── allure-results/                    # Allure report data
├── playwright.config.ts               # Playwright configuration
├── package.json                       # Dependencies and scripts
└── tsconfig.json                      # TypeScript configuration
```

---

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests with visible browser (headed mode)
```bash
npm run test:headed
```

### Run smoke tests only
```bash
npm run test:smoke
```

### Run tests in specific browser
```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# WebKit (Safari)
npm run test:webkit
```

### Run tests in all browsers
```bash
npm run test:all-browsers
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Debug tests
```bash
npm run test:debug
```

### Generate code (codegen)
```bash
npm run codegen
```

---

## ⚙️ Configuration

Configuration is managed through multiple sources (in order of priority):

1. **Environment variables** (.env file)
2. **playwright.config.ts** (main configuration)
3. **tests/config/config.ts** (test-specific config)

### Key Configuration Options

| Setting | Environment Variable | Default | Description |
|---------|---------------------|---------|-------------|
| Portal URL | `PORTAL_URL` | `https://dev-aisoc-fe.qualgo.dev` | Base URL for tests |
| Headless | `HEADLESS` | `false` | Run browser in headless mode |
| Slow Motion | `SLOW_MO` | `0` | Slow down actions (ms) |
| Timeout | `TIMEOUT` | `30000` | Default timeout (ms) |
| Retry Count | `RETRY_COUNT` | `2` | Number of retries on failure |

---

## 📝 Writing Tests

### Example Test

```typescript
import { test, expect } from './fixtures/page-fixtures';

test.describe('My Test Suite', () => {
  test('should do something @smoke', async ({ itAssetInventoryPage }) => {
    // Navigate
    await itAssetInventoryPage.navigateToITAssetInventory();
    
    // Perform actions
    await itAssetInventoryPage.searchAssets('laptop');
    
    // Assertions
    const isVisible = await itAssetInventoryPage.isAssetTableVisible();
    expect(isVisible).toBeTruthy();
  });
});
```

### Test Tags

Use tags to organize and filter tests:

- `@smoke` - Critical functionality tests
- `@ui` - UI interaction tests
- `@regression` - Regression test suite
- `@performance` - Performance tests
- `@slow` - Slower running tests

Run tests by tag:
```bash
npx playwright test --grep @smoke
```

---

## 📊 Reporting

### View HTML Report
```bash
npm run report
```

### Generate Allure Report
```bash
# Generate report
npm run allure:generate

# Open report
npm run allure:open
```

### Reports Location

- **HTML Report**: `test-results/html-report/index.html`
- **Allure Report**: `allure-report/index.html`
- **Screenshots**: `test-results/screenshots/`
- **Videos**: `test-results/videos/`
- **Traces**: `test-results/traces/`

---

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: test-results/
          retention-days: 30
```

---

## 🎯 Current Sprint: IT Asset Inventory

This sprint focuses on **IT Asset Inventory** functionality only:

### Available Tests (12 total)

1. ✅ Navigate to IT Asset Inventory page (smoke)
2. ✅ Search assets (ui)
3. ✅ Filter by type (ui)
4. ✅ Filter by status (ui)
5. ✅ View asset details (ui)
6. ✅ Pagination (ui)
7. ✅ Change page size (ui)
8. ✅ Export assets (ui)
9. ✅ Refresh table (ui)
10. ✅ Sort by column (ui)
11. ✅ Multiple filters (regression)
12. ✅ Large dataset handling (performance, slow)

---

## 🐛 Troubleshooting

### Browser doesn't open
```bash
# Reinstall browsers
npm run install:browsers
```

### Tests are slow
```bash
# Run in headless mode
npm test

# Or set environment variable
HEADLESS=true npm test
```

### Port already in use
```bash
# Kill process on port
lsof -ti:PORT | xargs kill -9
```

---

## 📚 Documentation

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Allure Documentation](https://docs.qameta.io/allure/)

---

## 🤝 Contributing

1. Create a feature branch
2. Write tests following the Page Object Model
3. Ensure all tests pass
4. Submit a pull request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🎉 Quick Start Commands

```bash
# Install everything
npm install && npm run install:browsers

# Run smoke tests with visible browser
npm run test:smoke -- --headed

# Run all tests in Chrome
npm run test:chrome

# Debug a specific test
npm run test:debug tests/it-asset-inventory.spec.ts

# View last test report
npm run report
```

---

**Portal URL:** https://dev-aisoc-fe.qualgo.dev  
**Framework Version:** 1.0.0  
**Last Updated:** October 2025
