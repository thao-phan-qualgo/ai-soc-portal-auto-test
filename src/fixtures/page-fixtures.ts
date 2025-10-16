import { test as base, Browser, Page } from '@playwright/test';
import { ITAssetInventoryPage } from '../pages/ITAssetInventoryPage';

/**
 * Custom fixtures for page objects
 * Automatically initializes page objects for each test
 */
type PageFixtures = {
  itAssetInventoryPage: ITAssetInventoryPage;
};

export const test = base.extend<PageFixtures>({
  // IT Asset Inventory Page fixture
  itAssetInventoryPage: async ({ page }, use) => {
    const itAssetInventoryPage = new ITAssetInventoryPage(page);
    await use(itAssetInventoryPage);
  },
});

export { expect } from '@playwright/test';

