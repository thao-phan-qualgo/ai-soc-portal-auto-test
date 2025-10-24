import { Page, Locator } from '@playwright/test';
import { config } from '../../../config/env.config';

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

  /**
   * Delay execution for specified number of seconds
   * @param seconds - Number of seconds to delay
   */
  async delayWithTime(seconds: number): Promise<void> {
    const milliseconds = seconds * 1000;
    console.log(`Waiting for ${seconds} seconds...`);
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Navigate to URL and pause for specified seconds
   * @param url - URL to navigate to
   * @param pauseSeconds - Number of seconds to pause after navigation
   */
  async navigateAndPause(url: string, pauseSeconds: number = 2): Promise<void> {
    await this.navigateTo(url);
    await this.delayWithTime(pauseSeconds);
  }
  
}

