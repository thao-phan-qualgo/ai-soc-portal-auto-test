import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/config';

/**
 * Base Page Object
 * Contains common methods used across all page objects
 */
export class BasePage {
  protected page: Page;
  protected baseUrl: string;
  
  constructor(page: Page) {
    this.page = page;
    this.baseUrl = config.portalUrl;
  }
  
  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    console.log(`Navigating to: ${fullUrl}`);
    await this.page.goto(fullUrl, { waitUntil: 'domcontentloaded' });
  }
  
  
  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
  
  
  /**
   * Wait for page load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
  
}

