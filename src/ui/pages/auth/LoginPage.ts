import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Login Page Object
 * Contains methods and locators for login and Microsoft authentication
 */
export class LoginPage extends BasePage {
  // Locators
  private readonly microsoftSignInButton: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly nextButton: Locator;
  private readonly signInButton: Locator;
  
  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.microsoftSignInButton = page.locator('button[aria-label="Sign in with Microsoft"]');
    this.emailInput = page.locator('input[type="email"], input[name="loginfmt"], input[id="i0116"]');
    this.passwordInput = page.locator('input[type="password"], input[name="passwd"], input[id="i0118"]');
    this.nextButton = page.locator('input[type="submit"][value="Next"], input[id="idSIButton9"]');
    this.signInButton = page.locator('input[type="submit"][value="Sign in"], input[id="idSIButton9"]');
  }
  
  /**
   * Open the AI SOC Portal
   */
  async openPortal(): Promise<void> {
    console.log('Opening AI SOC Portal...');
    await this.navigateAndPause('', 2);
    await this.page.waitForLoadState('networkidle');
  }
  
  /**
   * Click on Microsoft Sign-in button
   */
  async clickMicrosoftSignIn(): Promise<void> {
    console.log('Looking for Microsoft Sign-in button...');
    await this.microsoftSignInButton.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Microsoft Sign-in button found and visible');
    await this.microsoftSignInButton.click();
    console.log('Clicked Microsoft Sign-in button');
    await this.delayWithTime(2);
  }
  
  /**
   * Enter email address
   * @param email - Email address to enter
   */
  async enterEmail(email: string): Promise<void> {
    console.log('Filling in email...');
    await this.page.waitForLoadState('networkidle');
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.fill(email);
    console.log('Filled in email:', email);
  }
  
  /**
   * Click Next button after entering email
   */
  async clickNextButton(): Promise<void> {
    console.log('Clicking Next button...');
    await this.nextButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.nextButton.click();
    console.log('Clicked Next button');
    await this.delayWithTime(2);
  }
  
  /**
   * Enter password
   * @param password - Password to enter
   */
  async enterPassword(password: string): Promise<void> {
    console.log('Filling in password...');
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.fill(password);
    console.log('Filled in password');
  }
  
  /**
   * Click Sign in button after entering password
   */
  async clickSignInButton(): Promise<void> {
    console.log('Clicking Sign in button...');
    await this.signInButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.signInButton.click();
    console.log('Clicked Sign in button');
    await this.delayWithTime(3);
  }
  
  /**
   * Complete login with email and password
   * @param email - Email address
   * @param password - Password
   */
  async login(email: string, password: string): Promise<void> {
    console.log('Logging in with Microsoft account...');
    await this.enterEmail(email);
    await this.clickNextButton();
    await this.enterPassword(password);
    await this.clickSignInButton();
  }
  
  /**
   * Verify successful login by checking URL
   */
  async verifyLoginSuccess(): Promise<boolean> {
    console.log('Verifying successful login...');
    await this.page.waitForLoadState('networkidle');
    
    const currentUrl = this.page.url();
    console.log('Current URL after login:', currentUrl);
    
    const isOnPortal = currentUrl.includes('dev-aisoc-fe.qualgo.dev') || 
                       currentUrl.includes('aisoc') ||
                       currentUrl.includes('dashboard');
    
    if (isOnPortal) {
      console.log('✅ Successfully logged in to AI SOC Portal');
    } else {
      console.log('❌ Login may not have completed successfully. Current URL:', currentUrl);
    }
    
    return isOnPortal;
  }
  
  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}

