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
  private readonly overviewTab: Locator;
  private readonly filterTab: Locator;
  private readonly assetTable: Locator;
  private readonly searchInput: Locator;
  private readonly filterDropdown: Locator;
  private readonly addAssetButton: Locator;
  private readonly exportButton: Locator;
  private readonly refreshButton: Locator;
  
  // Table columns
  private readonly assetNameColumn: Locator;
  private readonly assetTypeColumn: Locator;
  private readonly statusColumn: Locator;
  private readonly locationColumn: Locator;
  private readonly lastUpdatedColumn: Locator;
  
  // Filter options
  private readonly filterByType: Locator;
  private readonly filterByStatus: Locator;
  private readonly filterByLocation: Locator;
  private readonly clearFiltersButton: Locator;
  
  // Pagination
  private readonly paginationContainer: Locator;
  private readonly nextPageButton: Locator;
  private readonly previousPageButton: Locator;
  private readonly pageSizeSelector: Locator;
  
  // Asset details modal
  private readonly assetDetailsModal: Locator;
  private readonly modalCloseButton: Locator;
  private readonly editAssetButton: Locator;
  private readonly deleteAssetButton: Locator;
  
  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.overviewTab = page.locator('[data-testid="overview-tab"]');
    this.filterTab = page.locator('[data-testid="filter-tab"]');
    this.assetTable = page.locator('[data-testid="asset-table"]');
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.filterDropdown = page.locator('[data-testid="filter-dropdown"]');
    this.addAssetButton = page.locator('[data-testid="add-asset-button"]');
    this.exportButton = page.locator('[data-testid="export-button"]');
    this.refreshButton = page.locator('[data-testid="refresh-button"]');
    
    // Table columns
    this.assetNameColumn = page.locator('[data-testid="asset-name-column"]');
    this.assetTypeColumn = page.locator('[data-testid="asset-type-column"]');
    this.statusColumn = page.locator('[data-testid="status-column"]');
    this.locationColumn = page.locator('[data-testid="location-column"]');
    this.lastUpdatedColumn = page.locator('[data-testid="last-updated-column"]');
    
    // Filter options
    this.filterByType = page.locator('[data-testid="filter-by-type"]');
    this.filterByStatus = page.locator('[data-testid="filter-by-status"]');
    this.filterByLocation = page.locator('[data-testid="filter-by-location"]');
    this.clearFiltersButton = page.locator('[data-testid="clear-filters-button"]');
    
    // Pagination
    this.paginationContainer = page.locator('[data-testid="pagination-container"]');
    this.nextPageButton = page.locator('[data-testid="next-page-button"]');
    this.previousPageButton = page.locator('[data-testid="previous-page-button"]');
    this.pageSizeSelector = page.locator('[data-testid="page-size-selector"]');
    
    // Asset details modal
    this.assetDetailsModal = page.locator('[data-testid="asset-details-modal"]');
    this.modalCloseButton = page.locator('[data-testid="modal-close-button"]');
    this.editAssetButton = page.locator('[data-testid="edit-asset-button"]');
    this.deleteAssetButton = page.locator('[data-testid="delete-asset-button"]');
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
  
  /**
   * Check if overview tab is active
   */
  async isOverviewTabActive(): Promise<boolean> {
    const className = await this.overviewTab.getAttribute('class');
    return className?.includes('active') || false;
  }
  
  /**
   * Search for assets
   */
  async searchAssets(searchTerm: string): Promise<void> {
    console.log(`Searching for: ${searchTerm}`);
    await this.fillInput(this.searchInput, searchTerm);
    await this.wait(1000); // Wait for search results
  }
  
  /**
   * Filter assets by type
   */
  async filterByAssetType(type: string): Promise<void> {
    console.log(`Filtering by type: ${type}`);
    await this.clickElement(this.filterByType);
    await this.page.locator(`text="${type}"`).click();
  }
  
  /**
   * Filter assets by status
   */
  async filterByAssetStatus(status: string): Promise<void> {
    console.log(`Filtering by status: ${status}`);
    await this.clickElement(this.filterByStatus);
    await this.page.locator(`text="${status}"`).click();
  }
  
  /**
   * Clear all filters
   */
  async clearFilters(): Promise<void> {
    console.log('Clearing all filters');
    await this.clickElement(this.clearFiltersButton);
  }
  
  /**
   * Get table row count
   */
  async getTableRowCount(): Promise<number> {
    return await this.getElementCount(this.page.locator('[data-testid="asset-table"] tbody tr'));
  }
  
  /**
   * Click on asset row by index
   */
  async clickAssetRow(index: number): Promise<void> {
    const row = this.page.locator(`[data-testid="asset-table"] tbody tr`).nth(index);
    await this.clickElement(row);
  }
  
  /**
   * Check if asset details modal is visible
   */
  async isAssetDetailsModalVisible(): Promise<boolean> {
    return await this.isElementVisible(this.assetDetailsModal);
  }
  
  /**
   * Close asset details modal
   */
  async closeAssetDetailsModal(): Promise<void> {
    await this.clickElement(this.modalCloseButton);
  }
  
  /**
   * Click export button
   */
  async clickExport(): Promise<void> {
    console.log('Clicking export button');
    await this.clickElement(this.exportButton);
  }
  
  /**
   * Click refresh button
   */
  async clickRefresh(): Promise<void> {
    console.log('Clicking refresh button');
    await this.clickElement(this.refreshButton);
  }
  
  /**
   * Go to next page
   */
  async goToNextPage(): Promise<void> {
    await this.clickElement(this.nextPageButton);
    await this.wait(1000);
  }
  
  /**
   * Go to previous page
   */
  async goToPreviousPage(): Promise<void> {
    await this.clickElement(this.previousPageButton);
    await this.wait(1000);
  }
  
  /**
   * Change page size
   */
  async changePageSize(size: number): Promise<void> {
    console.log(`Changing page size to: ${size}`);
    await this.selectOption(this.pageSizeSelector, size.toString());
    await this.wait(1000);
  }
  
  /**
   * Check if pagination is visible
   */
  async isPaginationVisible(): Promise<boolean> {
    return await this.isElementVisible(this.paginationContainer);
  }
  
  /**
   * Sort table by column
   */
  async sortByColumn(columnName: string): Promise<void> {
    console.log(`Sorting by column: ${columnName}`);
    const columnHeader = this.page.locator(`[data-testid="${columnName}-column"]`);
    await this.clickElement(columnHeader);
    await this.wait(1000);
  }
  
  /**
   * Get asset names from table
   */
  async getAssetNames(): Promise<string[]> {
    const names = await this.assetNameColumn.allTextContents();
    return names.filter(name => name.trim() !== '');
  }
}

