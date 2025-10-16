# Test Structure

This directory contains organized test suites for different types of testing in the AI SOC Portal project.

> **Current Phase**: Testing focused on **Desktop Web Only** (1920x1080 viewport, Chromium browser)

## 📁 **Directory Structure**

```
tests/
├── data/                    # Database tests
│   └── database.spec.ts    # Database operations and integrity tests
├── e2e/                    # End-to-end tests
│   ├── it-asset-inventory.spec.ts  # IT Asset Inventory E2E tests
│   └── user-journey.spec.ts        # Complete user workflow tests
├── integration/            # Integration tests
│   └── api-integration.spec.ts     # API and service integration tests
├── unit/                   # Unit tests
│   └── component.spec.ts           # Component and function unit tests
├── api/                    # API endpoint tests
│   └── endpoints.spec.ts           # REST API endpoint tests
├── performance/            # Performance tests
│   └── load.spec.ts               # Load and performance tests
├── ui/                     # UI tests
│   ├── visual.spec.ts             # Visual styling and color tests
│   ├── accessibility.spec.ts      # Accessibility and ARIA tests
│   ├── layout.spec.ts             # Layout and positioning tests
│   └── component.spec.ts          # Component styling tests
├── test-configs.ts         # Test configuration definitions
└── README.md              # This file
```

## 🎯 **Test Categories**

### 1. **Data Tests** (`tests/data/`)
- **Purpose**: Database operations, data integrity, and data validation
- **Tags**: `@database`
- **Examples**: Connection tests, migration tests, constraint validation
- **Run**: `npm run test:data`

### 2. **End-to-End Tests** (`tests/e2e/`)
- **Purpose**: Complete user workflows from start to finish
- **Tags**: `@e2e`
- **Examples**: User registration, asset management, reporting workflows
- **Run**: `npm run test:e2e`

### 3. **Integration Tests** (`tests/integration/`)
- **Purpose**: API endpoints, third-party integrations, service communication
- **Tags**: `@integration`
- **Examples**: API integration, external service integration
- **Run**: `npm run test:integration`

### 4. **Unit Tests** (`tests/unit/`)
- **Purpose**: Individual components, functions, and modules
- **Tags**: `@unit`
- **Examples**: Utility functions, page object methods, selector management
- **Run**: `npm run test:unit`

### 5. **API Tests** (`tests/api/`)
- **Purpose**: REST API endpoints, request/response validation, API contracts
- **Tags**: `@api`
- **Examples**: CRUD operations, error handling, response validation
- **Run**: `npm run test:api`

### 6. **Performance Tests** (`tests/performance/`)
- **Purpose**: Load testing, performance benchmarks, scalability
- **Tags**: `@performance`
- **Examples**: Page load time, API response time, concurrent users
- **Run**: `npm run test:performance`

### 7. **UI Tests** (`tests/ui/`)
- **Purpose**: UI elements, colors, sizes, layouts, accessibility (Desktop Web Only)
- **Tags**: `@ui`
- **Examples**: Visual styling, color contrast, desktop layout, ARIA attributes
- **Run**: `npm run test:ui`

## 🚀 **Running Tests**

### Run All Tests
```bash
npm test
```

### Run Specific Test Types
```bash
# E2E tests
npm run test:e2e

# Integration tests
npm run test:integration

# API tests
npm run test:api

# Unit tests
npm run test:unit

# Performance tests
npm run test:performance

# Database tests
npm run test:data

# UI tests
npm run test:ui
```

### Run Tests by Tag
```bash
# Run all smoke tests
npm run test:smoke

# Run all E2E tests
npx playwright test --grep @e2e

# Run all API tests
npx playwright test --grep @api
```

### Run Specific Test Files
```bash
# Run IT Asset Inventory tests
npx playwright test tests/e2e/it-asset-inventory.spec.ts

# Run API endpoint tests
npx playwright test tests/api/endpoints.spec.ts
```

## ⚙️ **Test Configuration**

Each test type has its own configuration in `test-configs.ts`:

- **Timeout**: Maximum time for test execution
- **Retries**: Number of retry attempts on failure
- **Workers**: Number of parallel test workers
- **Projects**: Browser projects to run tests on
- **Grep**: Test tags to include

## 📝 **Writing Tests**

### Test File Naming
- Use descriptive names: `user-management.spec.ts`
- Include test type in directory structure
- Use consistent naming conventions

### Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should perform specific action @tag', async ({ page }) => {
    // Test implementation
  });
});
```

### Tags
- Use appropriate tags for test categorization
- `@smoke` - Critical functionality tests
- `@e2e` - End-to-end tests
- `@integration` - Integration tests
- `@api` - API tests
- `@unit` - Unit tests
- `@performance` - Performance tests
- `@database` - Database tests
- `@ui` - UI tests

## 🔧 **Best Practices**

### 1. **Test Organization**
- Group related tests in describe blocks
- Use descriptive test names
- Keep tests focused and atomic

### 2. **Test Data**
- Use test data that's realistic but not production data
- Clean up test data after tests
- Use data factories for consistent test data

### 3. **Assertions**
- Use specific assertions
- Test both positive and negative scenarios
- Verify expected behavior, not implementation details

### 4. **Test Isolation**
- Each test should be independent
- Clean up after each test
- Don't rely on test execution order

### 5. **Performance**
- Use appropriate timeouts
- Avoid unnecessary waits
- Use efficient selectors

## 🐛 **Debugging Tests**

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Generate Test Reports
```bash
npm run report
```

## 📊 **Test Reports**

- **HTML Report**: `npm run report`
- **Allure Report**: `npm run allure:generate && npm run allure:open`
- **JUnit Report**: Available in `test-results/junit.xml`

## 🤝 **Contributing**

When adding new tests:

1. Choose the appropriate test category
2. Follow the naming conventions
3. Use appropriate tags
4. Update this README if adding new test types
5. Ensure tests are properly isolated and clean up after themselves

## 📚 **Resources**

- [Playwright Documentation](https://playwright.dev/)
- [Test Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
