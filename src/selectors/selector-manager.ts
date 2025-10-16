/**
 * Selector Manager
 * Provides easy access to selectors with fallback strategies and logging
 */

import { Page, Locator } from '@playwright/test';
import { Selectors } from './selectors';
import { getSelectorConfig, SelectorConfig } from './selector-config';

export class SelectorManager {
  private page: Page;
  private config: SelectorConfig;

  constructor(page: Page) {
    this.page = page;
    this.config = getSelectorConfig();
  }

  /**
   * Get a locator using the best available selector
   */
  getLocator(selectors: string | string[]): Locator {
    const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
    const bestSelector = this.getBestSelector(selectorArray);
    
    if (this.config.enableLogging) {
      console.log(`Using selector: ${bestSelector}`);
    }
    
    return this.page.locator(bestSelector);
  }

  /**
   * Get the best selector from a list of selectors
   */
  private getBestSelector(selectors: string[]): string {
    if (!this.config.useFallback) {
      return selectors[0];
    }

    // Try to find the best selector based on priority
    for (const priority of this.config.priority) {
      const selector = selectors.find(s => this.matchesPriority(s, priority));
      if (selector) {
        return selector;
      }
    }

    // Fallback to first selector
    return selectors[0];
  }

  /**
   * Check if selector matches the given priority type
   */
  private matchesPriority(selector: string, priority: string): boolean {
    switch (priority) {
      case 'data-testid':
        return selector.includes('[data-testid=');
      case 'class':
        return selector.startsWith('.') || selector.includes('.');
      case 'id':
        return selector.startsWith('#') || selector.includes('#');
      case 'text':
        return selector.includes(':has-text(') || selector.includes('text=');
      case 'xpath':
        return selector.startsWith('xpath=') || selector.startsWith('//');
      default:
        return false;
    }
  }

  /**
   * Wait for element to be visible with timeout
   */
  async waitForElement(selectors: string | string[], timeout?: number): Promise<Locator> {
    const locator = this.getLocator(selectors);
    const waitTimeout = timeout || this.config.timeout;
    
    await locator.waitFor({ state: 'visible', timeout: waitTimeout });
    return locator;
  }

  /**
   * Check if element exists without waiting
   */
  async elementExists(selectors: string | string[]): Promise<boolean> {
    const locator = this.getLocator(selectors);
    try {
      await locator.waitFor({ state: 'attached', timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get element count
   */
  async getElementCount(selectors: string | string[]): Promise<number> {
    const locator = this.getLocator(selectors);
    return await locator.count();
  }

  /**
   * Get all matching elements
   */
  getAllElements(selectors: string | string[]): Locator {
    return this.getLocator(selectors);
  }

  /**
   * Get element by index
   */
  getElementByIndex(selectors: string | string[], index: number): Locator {
    const locator = this.getLocator(selectors);
    return locator.nth(index);
  }

  /**
   * Get element by text content
   */
  getElementByText(selectors: string | string[], text: string): Locator {
    const locator = this.getLocator(selectors);
    return locator.filter({ hasText: text });
  }

  /**
   * Get element by attribute value
   */
  getElementByAttribute(selectors: string | string[], attribute: string, value: string): Locator {
    const locator = this.getLocator(selectors);
    return locator.filter({ has: this.page.locator(`[${attribute}="${value}"]`) });
  }

  /**
   * Microsoft OAuth specific selectors
   */
  get microsoftOAuth() {
    return {
      emailInput: () => this.getLocator([
        Selectors.MicrosoftOAuth.emailInput,
        Selectors.Base.inputs.email,
        'input[name="loginfmt"]',
        '#i0116'
      ]),
      
      passwordInput: () => this.getLocator([
        Selectors.MicrosoftOAuth.passwordInput,
        Selectors.Base.inputs.password,
        'input[name="passwd"]',
        '#i0118'
      ]),
      
      nextButton: () => this.getLocator([
        Selectors.MicrosoftOAuth.nextButton,
        Selectors.Base.buttons.next,
        '#idSIButton9',
        'button:has-text("Next")'
      ]),
      
      signInButton: () => this.getLocator([
        Selectors.MicrosoftOAuth.signInButton,
        Selectors.Base.buttons.signIn,
        '#idSIButton9',
        'button:has-text("Sign in")'
      ]),
      
      personalAccountError: () => this.getLocator([
        Selectors.MicrosoftOAuth.personalAccountError,
        'text=You can\'t sign in here with a personal account'
      ]),
      
      signInOptions: () => this.getLocator([
        Selectors.MicrosoftOAuth.signInOptions,
        'button:has-text("Sign-in options")',
        'a:has-text("Sign-in options")'
      ]),
    };
  }

  /**
   * IT Asset Inventory specific selectors
   */
  get itAssetInventory() {
    return {
      table: () => this.getLocator([
        Selectors.ITAssetInventory.table.container,
        Selectors.Base.dataTestId.table,
        Selectors.Base.classes.table,
        'table'
      ]),
      
      searchInput: () => this.getLocator([
        Selectors.ITAssetInventory.filters.searchInput,
        Selectors.Base.dataTestId.searchInput,
        Selectors.Base.inputs.search,
        'input[type="search"]'
      ]),
      
      filterButton: () => this.getLocator([
        Selectors.ITAssetInventory.table.filterButton,
        Selectors.Base.dataTestId.filterButton,
        Selectors.Base.buttons.filter,
        'button:has-text("Filter")'
      ]),
      
      addAssetButton: () => this.getLocator([
        Selectors.ITAssetInventory.actions.addAsset,
        Selectors.Base.buttons.add,
        'button:has-text("Add Asset")',
        'button:has-text("Add")'
      ]),
    };
  }

  /**
   * Dashboard specific selectors
   */
  get dashboard() {
    return {
      summaryWidget: () => this.getLocator([
        Selectors.Dashboard.widgets.summary,
        '[data-testid="summary"]',
        '.summary-widget'
      ]),
      
      navigation: () => this.getLocator([
        Selectors.Dashboard.navigation.dashboard,
        'a:has-text("Dashboard")',
        'a:has-text("Home")'
      ]),
    };
  }

  /**
   * User Management specific selectors
   */
  get userManagement() {
    return {
      userTable: () => this.getLocator([
        Selectors.UserManagement.table.container,
        '[data-testid="user-table"]',
        '.user-table'
      ]),
      
      addUserButton: () => this.getLocator([
        Selectors.UserManagement.actions.addUser,
        Selectors.Base.buttons.add,
        'button:has-text("Add User")'
      ]),
    };
  }
}
