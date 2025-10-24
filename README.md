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
├── src/
│   ├── config/
│   │   ├── env.config.ts            # Environment configuration
│   │   └── cucumber.config.js        # Cucumber configuration
│   │
│   ├── database/
│   │   ├── connection/
│   │   │   └── db.client.ts          # Database connection management
│   │   ├── queries/
│   │   │   └── base.queries.ts       # Base database queries
│   │   └── index.ts                  # Database module exports
│   │
│   ├── ui/
│   │   ├── pages/
│   │   │   ├── base/
│   │   │   │   └── BasePage.ts       # Base page object
│   │   │   └── inventory/
│   │   │       └── ITAssetInventoryPage.ts
│   │   ├── components/               # Reusable UI components
│   │   └── locators/                 # UI locators
│   │
│   ├── support/
│   │   ├── world.ts                  # Cucumber World (context)
│   │   ├── hooks.ts                  # Before/After hooks
│   │   ├── transformers.ts           # Parameter transformers
│   │   └── custom-types.ts           # Custom parameter types
│   │
│   ├── helpers/
│   │   ├── logger.ts                 # Logging utility
│   │   └── wait.helper.ts            # Wait and retry helpers
│   │
│   └── types/
│       ├── world.types.ts            # World type definitions
│       └── db.types.ts               # Database type definitions
│
├── features/                         # Gherkin feature files
│   ├── database/
│   │   └── data-integrity.feature    # Database tests
│   └── ui/
│       ├── user-authentication.feature
│       └── asset-inventory.feature
│
├── step-definitions/                 # Step implementations
│   ├── database/
│   │   ├── database.steps.ts         # Database operations
│   │   └── db-schema.steps.ts        # Schema validation
│   └── ui/
│       ├── common.steps.ts           # Common UI steps
│       ├── authentication.steps.ts   # Login steps
│       └── asset-inventory.steps.ts  # Asset management steps
│
├── test-data/
│   ├── fixtures/
│   │   ├── users.json                # Test user data
│   │   └── assets.json               # Test asset data
│   ├── schemas/                      # JSON schemas
│   └── examples/                     # Data for Examples tables
│
├── scripts/
│   └── ssh-tunnel.sh                 # SSH tunnel management
│
├── reports/                          # Test reports and artifacts
│   ├── cucumber-report.html
│   ├── screenshots/
│   └── videos/
│
├── cucumber.config.js                # Cucumber CLI configuration
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Dependencies and scripts
└── tsconfig.json                     # TypeScript configuration
```

---

## 🏗️ Architecture & Organization

### **Key Principles**

This project follows a **modular, layered architecture** with clear separation of concerns:

1. **`src/` - Source Code**
   - **config/** - Configuration management
   - **database/** - Database layer (connection, queries)
   - **ui/** - UI automation layer (pages, components, locators)
   - **support/** - Cucumber support files (world, hooks, transformers)
   - **helpers/** - Utility functions (logger, wait helpers)
   - **types/** - TypeScript type definitions

2. **`features/` - Test Scenarios**
   - Organized by test type (database, ui, api, integration)
   - Gherkin syntax for business-readable tests

3. **`step-definitions/` - Test Implementation**
   - Organized by layer (database, ui, api, shared)
   - Implements the Gherkin scenarios

4. **`test-data/` - Test Data**
   - **fixtures/** - Static test data (JSON)
   - **schemas/** - Data validation schemas
   - **examples/** - Data for Examples tables (CSV)

### **Benefits of This Structure**

✅ **Scalability** - Easy to add new features and tests  
✅ **Maintainability** - Clear organization makes code easy to find and update  
✅ **Reusability** - Shared components and helpers across tests  
✅ **Testability** - Separated layers make unit testing easier  
✅ **Collaboration** - Team members can work on different layers independently  

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

### 🥒 Writing Cucumber/Gherkin Tests

#### Example Feature File
```gherkin
Feature: Database Schema Validation
  @database @schema
  Scenario: Verify database structure
    Given the database is connected
    When I query the database for basic information
    Then I should see the database version
    And I should see at least 5 tables in the database
```

#### Example Step Definition
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { DatabaseUtils } from '../../utils';

Given('the database is connected', async function () {
  await DatabaseUtils.initialize();
  const isHealthy = await DatabaseUtils.healthCheck();
  expect(isHealthy).toBeTruthy();
});
```

### 🎭 Writing Playwright Tests

#### Example Test
```typescript
import { test, expect } from '@playwright/test';

test.describe('IT Asset Inventory', () => {
  test('should navigate to asset page @smoke', async ({ page }) => {
    await page.goto('/it-asset-inventory');
    await expect(page.locator('h1')).toContainText('IT Asset Inventory');
  });
});
```

### 🗄️ Using Database Utilities

#### Available Utility Functions
```typescript
import { 
  query, 
  select, 
  insert, 
  update, 
  deleteRecord,
  exists,
  count,
  getTableSchema,
  getTables,
  healthCheck
} from '../../utils';

// Execute raw query
const result = await query('SELECT * FROM users WHERE active = $1', [true]);

// Select with conditions
const users = await select('users', '*', 'active = $1', [true]);

// Insert new record
await insert('users', { name: 'John', email: 'john@example.com' });

// Check if record exists
const userExists = await exists('users', 'email = $1', ['john@example.com']);

// Get table schema
const schema = await getTableSchema('users');
```

### 🏷️ Test Tags

Use tags to organize and filter tests:

#### Cucumber Tags
- `@smoke` - Critical functionality tests
- `@ui` - UI interaction tests
- `@database` - Database-related tests
- `@schema` - Database schema validation
- `@login` - Authentication tests
- `@slow` - Long-running tests

#### Playwright Tags
- `@smoke` - Critical functionality tests
- `@ui` - UI interaction tests
- `@regression` - Regression test suite
- `@performance` - Performance tests
- `@slow` - Slower running tests

#### Running Tests by Tag
```bash
# Cucumber
npx cucumber-js --tags @smoke
npx cucumber-js --tags "@database and @schema"

# Playwright
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

## 🎯 Available Test Suites

### 🥒 Cucumber/Gherkin Tests

#### Database Tests
- **Database Schema Validation** (`@database @schema`)
  - Schema structure verification
  - Table and column validation
  - Foreign key and constraint checks
  - Index and performance analysis

#### UI Tests
- **Login Functionality** (`@login`)
  - User authentication
  - Login form validation
  - Session management

- **Overview Page** (`@ui`)
  - Page navigation
  - UI element validation
  - Accessibility checks

- **IT Asset Inventory** (`@ui`)
  - Asset management interface
  - Search and filtering
  - Data display validation

### 🎭 Playwright Tests
- **Browser Automation** (when implemented)
  - Cross-browser testing
  - UI interaction testing
  - Performance monitoring

### 🏷️ Test Categories
- `@smoke` - Critical functionality tests
- `@ui` - User interface tests
- `@database` - Database-related tests
- `@schema` - Database schema validation
- `@login` - Authentication tests
- `@slow` - Long-running tests

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

### 🚀 Get Started in 3 Steps
```bash
# 1. Install dependencies and browsers
npm install && npm run install:browsers

# 2. Start database tunnel (for database tests)
npm run tunnel:start

# 3. Run your first test
npm run test:gherkin:smoke
```

### 🎯 Common Test Scenarios

#### Run All Tests
```bash
# Run all Playwright tests
npm test

# Run all Cucumber tests
npm run test:gherkin
```

#### Run Specific Test Types
```bash
# Run login tests
npm run test:gherkin:login

# Run database schema tests
npm run test:gherkin:db:schema

# Run smoke tests with visible browser
npm run test:smoke -- --headed
```

#### Debug and Development
```bash
# Debug a specific test
npm run test:debug

# Generate test code
npm run codegen

# Check database tunnel status
npm run tunnel:status
```

#### View Results
```bash
# View test reports
npm run report
npm run allure:open
```

### 🔧 Troubleshooting Commands
```bash
# Check tunnel status
npm run tunnel:status

# Restart tunnel
npm run tunnel:restart

# Reinstall browsers
npm run install:browsers

# Run linting
npm run lint
```

---

**Portal URL:** https://dev-aisoc-fe.qualgo.dev  
**Framework Version:** 1.0.0  
**Last Updated:** October 2025
