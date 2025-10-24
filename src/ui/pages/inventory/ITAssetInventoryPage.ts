import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * IT Asset Inventory Page Object
 * Contains methods and locators for IT Asset Inventory page
 */
export class ITAssetInventoryPage extends BasePage {
  // Page URL
  private readonly pageUrl = '/it-asset-inventory';
  
  // Locators
  private readonly assetTable: Locator;
  private readonly pageHeader: Locator;
  private readonly searchInput: Locator;
  private readonly addAssetButton: Locator;
  
  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.assetTable = page.locator('[data-testid="asset-table"]');
    this.pageHeader = page.locator('h1, h2').first();
    this.searchInput = page.locator('input[type="search"], input[placeholder*="Search"]');
    this.addAssetButton = page.locator('button:has-text("Add"), button:has-text("New")');
  }
  
  /**
   * Navigate to IT Asset Inventory page
   */
  async navigateToPage(): Promise<void> {
    console.log('Navigating to IT Asset Inventory page');
    await this.navigateAndPause(this.pageUrl, 3);
  }
  
  /**
   * Navigate to IT Asset Inventory page (alternative method)
   */
  async navigateToITAssetInventory(): Promise<void> {
    await this.navigateToPage();
  }
  
  /**
   * Check if on IT Asset Inventory page
   */
  async isOnITAssetInventoryPage(): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes(this.pageUrl);
  }
  
  /**
   * Wait for page to load completely
   */
  async waitForPageToLoad(): Promise<void> {
    await this.waitForPageLoad();
    await this.delayWithTime(2);
  }
  
  /**
   * Check if asset table is visible
   */
  async isAssetTableVisible(): Promise<boolean> {
    return await this.isElementVisible(this.assetTable);
  }
  
  /**
   * Get page header text
   */
  async getPageHeaderText(): Promise<string> {
    return await this.pageHeader.textContent() || '';
  }
  
  /**
   * Search for assets
   * @param searchTerm - Term to search for
   */
  async searchAssets(searchTerm: string): Promise<void> {
    console.log(`Searching for assets: ${searchTerm}`);
    await this.searchInput.fill(searchTerm);
    await this.delayWithTime(1);
  }
  
  /**
   * Click Add Asset button
   */
  async clickAddAsset(): Promise<void> {
    console.log('Clicking Add Asset button');
    await this.addAssetButton.click();
  }
}
