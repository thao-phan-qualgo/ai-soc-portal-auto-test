import { test, expect } from '@fixtures/page-fixtures';

/**
 * IT Asset Inventory Test Suite
 * Tests for IT Asset Inventory page functionality using real authentication
 */
test.describe('IT Asset Inventory Tests', () => {
  test('should navigate to IT Asset Inventory page with real authentication @smoke', async ({ 
    page, 
    loginHelper, 
    itAssetInventoryPage 
  }) => {
    // Get credentials from environment
    const email = process.env.MICROSOFT_EMAIL;
    const password = process.env.MICROSOFT_PASSWORD;
    
    if (!email || !password) {
      test.skip(true, 'MICROSOFT_EMAIL and MICROSOFT_PASSWORD environment variables are required');
    }
    
    // Use real authentication
    await loginHelper.login(email!, password!);
    
    // Navigate to IT Asset Inventory
    await itAssetInventoryPage.navigateToITAssetInventory();
    
    // Verify the page loads correctly
    const isTableVisible = await itAssetInventoryPage.isAssetTableVisible();
    expect(isTableVisible).toBeTruthy();
    
    // Verify we're not redirected to login
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/login');
    expect(currentUrl).not.toContain('/auth');
  });
});

/**
 * IT Asset Inventory Tests with Pre-authenticated Page
 * Uses the authenticatedPage fixture for faster test execution with real authentication
 */
test.describe('IT Asset Inventory Tests (Pre-authenticated)', () => {
  
  test('should access IT Asset Inventory with pre-authenticated page @smoke', async ({ authenticatedPage }) => {
    const { ITAssetInventoryPage } = await import('../src/pages/ITAssetInventoryPage');
    const itAssetInventoryPage = new ITAssetInventoryPage(authenticatedPage);
    
    // Navigate to IT Asset Inventory (authentication already handled by fixture)
    await itAssetInventoryPage.navigateToITAssetInventory();
    
    // Verify the page loads correctly
    const isTableVisible = await itAssetInventoryPage.isAssetTableVisible();
    expect(isTableVisible).toBeTruthy();
    
    // Verify we're not redirected to login
    const currentUrl = authenticatedPage.url();
    expect(currentUrl).not.toContain('/login');
    expect(currentUrl).not.toContain('/auth');
  });

  test('should maintain authentication state during IT Asset Inventory operations @smoke', async ({ 
    authenticatedPage, 
    loginHelper 
  }) => {
    const { ITAssetInventoryPage } = await import('../src/pages/ITAssetInventoryPage');
    const itAssetInventoryPage = new ITAssetInventoryPage(authenticatedPage);
    
    // Navigate to IT Asset Inventory
    await itAssetInventoryPage.navigateToITAssetInventory();
    
    // Perform some operations
    const isTableVisible = await itAssetInventoryPage.isAssetTableVisible();
    expect(isTableVisible).toBeTruthy();
    
    // Verify authentication is maintained
    const isLoggedIn = await loginHelper.isLoggedIn();
    expect(isLoggedIn).toBe(true);
    
    // Navigate to another page and back
    await authenticatedPage.goto('https://dev-aisoc-fe.qualgo.dev/dashboard');
    await authenticatedPage.waitForLoadState('networkidle');
    
    await itAssetInventoryPage.navigateToITAssetInventory();
    
    // Verify we can still access the page
    const isTableStillVisible = await itAssetInventoryPage.isAssetTableVisible();
    expect(isTableStillVisible).toBeTruthy();
  });
});

