import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * IT Asset Inventory Page Object
 * Contains methods and locators for IT Asset Inventory page
 */
export class ITAssetInventoryPage extends BasePage {
  // Page URL
  private readonly pageUrl = '/it-asset-inventory';
  
  // Locators
  private readonly assetTable: Locator;
  
  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.assetTable = page.locator('[data-testid="asset-table"]');
  }
  
  /**
   * Navigate to IT Asset Inventory page
   */
  async navigateToITAssetInventory(): Promise<void> {
    console.log('Navigating to IT Asset Inventory page');
    await this.navigateTo(this.pageUrl);
    await this.waitForPageLoad();
  }
  
  /**
   * Check if asset table is visible
   */
  async isAssetTableVisible(): Promise<boolean> {
    return await this.isElementVisible(this.assetTable);
  }
}
