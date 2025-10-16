import { test, expect } from '../../src/fixtures/page-fixtures';

/**
 * IT Asset Inventory Test Suite
 * Tests for IT Asset Inventory page functionality
 */
test.describe('IT Asset Inventory Tests', () => {
  test('should navigate to IT Asset Inventory page @smoke', async ({ 
    page, 
    itAssetInventoryPage 
  }) => {
    // Navigate to IT Asset Inventory
    await itAssetInventoryPage.navigateToITAssetInventory();
    
    // Verify the page loads correctly
    const isTableVisible = await itAssetInventoryPage.isAssetTableVisible();
    expect(isTableVisible).toBeTruthy();
    
    // Verify we're on the correct page
    const currentUrl = page.url();
    expect(currentUrl).toContain('it-asset-inventory');
  });
});

