import { test as base, Browser, Page } from '@playwright/test';
import { ITAssetInventoryPage } from '../pages/ITAssetInventoryPage';
import { AuthService } from '../services/auth-service';
import { LoginHelper } from '../utils/login-helper';

/**
 * Custom fixtures for page objects
 * Automatically initializes page objects for each test
 */
type PageFixtures = {
  itAssetInventoryPage: ITAssetInventoryPage;
  authService: AuthService;
  loginHelper: LoginHelper;
  authenticatedPage: Page; // Page with authentication already set up
};

export const test = base.extend<PageFixtures>({
  // IT Asset Inventory Page fixture
  itAssetInventoryPage: async ({ page }, use) => {
    const itAssetInventoryPage = new ITAssetInventoryPage(page);
    await use(itAssetInventoryPage);
  },

  // Auth Service fixture
  authService: async ({}, use) => {
    const authService = new AuthService();
    await use(authService);
  },

  // Login Helper fixture
  loginHelper: async ({ page }, use) => {
    const loginHelper = new LoginHelper(page);
    await use(loginHelper);
  },

  // Authenticated Page fixture - provides a page that's already logged in
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
      // Set up real authentication
      console.log('Setting up real authentication for authenticated page...');
      const loginHelper = new LoginHelper(page);
      const email = process.env.MICROSOFT_EMAIL;
      const password = process.env.MICROSOFT_PASSWORD;
      
      if (email && password) {
        await loginHelper.loginWithMicrosoft(email, password);
      } else {
        throw new Error('Real authentication requires MICROSOFT_EMAIL and MICROSOFT_PASSWORD environment variables');
      }
      
      console.log('Authenticated page setup completed');
      await use(page);
    } finally {
      await context.close();
    }
  },
});

export { expect } from '@playwright/test';

