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
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: timeout || config.timeout });
  }
  
  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout: timeout || config.timeout });
  }
  
  /**
   * Click on an element
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }
  
  /**
   * Fill input field
   */
  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }
  
  /**
   * Get text content of an element
   */
  async getTextContent(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() || '';
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
   * Check if element is enabled
   */
  async isElementEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }
  
  /**
   * Select option from dropdown
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }
  
  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
  
  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
  
  /**
   * Wait for page load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
  
  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `${config.screenshotsPath}/${name}.png`,
      fullPage: true 
    });
  }
  
  /**
   * Reload page
   */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }
  
  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }
  
  /**
   * Wait for specific time
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }
  
  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }
  
  /**
   * Get element count
   */
  async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }
  
  /**
   * Press keyboard key
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }
}

