# Page Object Model (POM) Architecture

## Overview

This directory contains all Page Object classes following the **Page Object Model** design pattern. Each page in the application has its own class that encapsulates all locators and methods for interacting with that page.

## Architecture Pattern

```
Step Definitions (step-definitions/)
        ↓
    calls methods
        ↓
Page Objects (src/ui/pages/)
        ↓
    uses locators & actions
        ↓
    Playwright API
```

## Principles

### ✅ DO:
- **Step definitions should ONLY call Page Object methods**
- Keep step definitions thin - just call page methods
- Define all locators in Page Object constructors
- Create meaningful method names (e.g., `enterEmail()`, `clickSignInButton()`)
- All page interactions go through Page Object methods

### ❌ DON'T:
- Write Playwright code directly in step definitions
- Access page locators directly in steps
- Include test logic in Page Objects (keep them generic)
- Duplicate locators across multiple files

## Example

### ❌ Bad Practice (Logic in Steps)
```typescript
// step-definitions/ui/authentication.steps.ts
When('I fill in email', async function () {
  const emailInput = page.locator('input[type="email"]');
  await emailInput.waitFor({ state: 'visible' });
  await emailInput.fill('test@example.com');
});
```

### ✅ Good Practice (Call Page Object Methods)
```typescript
// src/ui/pages/auth/LoginPage.ts
class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
  }
}

// step-definitions/ui/authentication.steps.ts
When('I fill in email', async function () {
  await loginPage.enterEmail('test@example.com');
});
```

## Directory Structure

```
src/ui/pages/
├── base/
│   └── BasePage.ts              # Base class with common methods
├── auth/
│   └── LoginPage.ts             # Login & authentication methods
├── inventory/
│   └── ITAssetInventoryPage.ts  # Asset inventory methods
└── index.ts                     # Central exports
```

## Page Object Template

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class YourPage extends BasePage {
  // Define page URL
  private readonly pageUrl = '/your-page';
  
  // Define all locators
  private readonly yourElement: Locator;
  
  constructor(page: Page) {
    super(page);
    
    // Initialize locators in constructor
    this.yourElement = page.locator('[data-testid="your-element"]');
  }
  
  // Create methods for page interactions
  async clickYourElement(): Promise<void> {
    await this.yourElement.click();
  }
  
  async enterText(text: string): Promise<void> {
    await this.yourElement.fill(text);
  }
  
  async isElementVisible(): Promise<boolean> {
    return await this.isElementVisible(this.yourElement);
  }
}
```

## Available Page Objects

### BasePage
Base class with common methods used across all pages:
- `navigateTo(url)` - Navigate to a URL
- `navigateAndPause(url, seconds)` - Navigate and wait
- `delayWithTime(seconds)` - Wait for specified time
- `waitForPageLoad()` - Wait for page to load
- `isElementVisible(locator)` - Check element visibility

### LoginPage
Authentication and login functionality:
- `openPortal()` - Open the AI SOC Portal
- `clickMicrosoftSignIn()` - Click Microsoft sign-in button
- `enterEmail(email)` - Enter email address
- `enterPassword(password)` - Enter password
- `clickNextButton()` - Click next after email
- `clickSignInButton()` - Click sign-in button
- `login(email, password)` - Complete login flow
- `verifyLoginSuccess()` - Verify successful login

### ITAssetInventoryPage
IT Asset Inventory page functionality:
- `navigateToPage()` - Navigate to asset inventory
- `isOnITAssetInventoryPage()` - Check if on correct page
- `isAssetTableVisible()` - Check if table is visible
- `getPageHeaderText()` - Get page header text
- `searchAssets(term)` - Search for assets
- `clickAddAsset()` - Click add asset button

## Usage in Step Definitions

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';

let loginPage: LoginPage;

Given('I open the portal', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.openPortal();
});

When('I login with {string} and {string}', async function (email, password) {
  await loginPage.enterEmail(email);
  await loginPage.clickNextButton();
  await loginPage.enterPassword(password);
  await loginPage.clickSignInButton();
});

Then('I should be logged in', async function () {
  const isLoggedIn = await loginPage.verifyLoginSuccess();
  expect(isLoggedIn).toBe(true);
});
```

## Benefits

1. **Maintainability** - Locator changes only need updates in one place
2. **Reusability** - Methods can be reused across multiple tests
3. **Readability** - Step definitions are clean and easy to understand
4. **Testability** - Page Objects can be unit tested independently
5. **Separation of Concerns** - Test logic separate from page interactions

## Adding New Pages

1. Create new page class in appropriate directory
2. Extend `BasePage`
3. Define locators in constructor
4. Create interaction methods
5. Export from `index.ts`
6. Use in step definitions

Example:
```typescript
// 1. Create: src/ui/pages/dashboard/DashboardPage.ts
export class DashboardPage extends BasePage { ... }

// 2. Export: src/ui/pages/index.ts
export { DashboardPage } from './dashboard/DashboardPage';

// 3. Use: step-definitions/ui/dashboard.steps.ts
import { DashboardPage } from '../../src/ui/pages';
```

