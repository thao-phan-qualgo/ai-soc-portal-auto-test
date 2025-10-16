import { Page } from '@playwright/test';
import { AuthService } from '../services/auth-service';
import { getAuthConfig } from '../config/auth-config';
import { SelectorManager } from '../selectors';

/**
 * Login Helper
 * Provides authentication methods for real OAuth login
 */
export class LoginHelper {
  private page: Page;
  private authService: AuthService;
  private selectors: SelectorManager;

  constructor(page: Page) {
    this.page = page;
    this.authService = new AuthService();
    this.selectors = new SelectorManager(page);
  }

  /**
   * Login with Microsoft OAuth using provided credentials
   */
  async login(email: string, password: string): Promise<void> {
    console.log('Starting Microsoft OAuth authentication...');
    
    if (!email || !password) {
      throw new Error('Email and password are required for authentication');
    }
    
    await this.loginWithMicrosoft(email, password);
  }

  /**
   * Login using backend authentication (if available)
   */
  async loginWithBackendAuth(): Promise<void> {
    console.log('Starting backend authentication...');
    
    try {
      const isAvailable = await this.authService.isBackendAuthAvailable();
      if (!isAvailable) {
        throw new Error('Backend authentication is not available');
      }
      
      await this.authService.loginWithBackendCode(this.page);
      console.log('Backend authentication completed successfully');
    } catch (error) {
      console.error('Backend authentication failed:', error);
      throw new Error(`Backend authentication failed: ${error}`);
    }
  }

  /**
   * Login using Microsoft OAuth (real authentication)
   * This method handles the full Microsoft OAuth flow
   */
  async loginWithMicrosoft(email: string, password: string): Promise<void> {
    console.log('Starting Microsoft OAuth authentication...');
    
    try {
      // Navigate to the application
      await this.page.goto('https://dev-aisoc-fe.qualgo.dev');
      await this.page.waitForLoadState('networkidle');

      // Wait for login button or redirect to Microsoft OAuth
      await this.waitForLoginButton();

      // Handle Microsoft OAuth flow
      await this.handleMicrosoftOAuthFlow(email, password);

      // Verify authentication success
      await this.verifyAuthenticationSuccess();

      console.log('Microsoft OAuth authentication completed successfully');
    } catch (error) {
      console.error('Microsoft OAuth authentication failed:', error);
      throw new Error(`Microsoft OAuth authentication failed: ${error}`);
    }
  }

  /**
   * Wait for login button to appear
   */
  private async waitForLoginButton(): Promise<void> {
    console.log('Waiting for login button...');
    
    try {
      await this.selectors.waitForElement([
        'button:has-text("Sign in")',
        'button:has-text("Login")',
        'a:has-text("Sign in")',
        'a:has-text("Login")',
        '[data-testid="login-button"]',
        '.login-button',
        '#login-button'
      ], 5000);
      console.log('Found login button');
    } catch (error) {
      // If no login button found, check if we're already authenticated
      if (await this.isLoggedIn()) {
        console.log('Already authenticated, no login needed');
        return;
      }
      throw new Error('Login button not found');
    }
  }

  /**
   * Handle the Microsoft OAuth flow
   */
  private async handleMicrosoftOAuthFlow(email: string, password: string): Promise<void> {
    console.log('Handling Microsoft OAuth flow...');

    // Click login button
    await this.clickLoginButton();

    // Wait for Microsoft OAuth page
    await this.page.waitForURL('**/login.microsoftonline.com/**', { timeout: 30000 });

    // Handle the "personal account" error if it appears
    await this.handlePersonalAccountError();

    // Enter email
    await this.enterEmail(email);

    // Enter password
    await this.enterPassword(password);

    // Handle any additional prompts
    await this.handleAdditionalPrompts();

    // Wait for redirect back to application
    await this.page.waitForURL('**/dev-aisoc-fe.qualgo.dev/**', { timeout: 30000 });
  }

  /**
   * Click the login button
   */
  private async clickLoginButton(): Promise<void> {
    try {
      const loginButton = this.selectors.getLocator([
        'button:has-text("Sign in")',
        'button:has-text("Login")',
        'a:has-text("Sign in")',
        'a:has-text("Login")',
        '[data-testid="login-button"]',
        '.login-button',
        '#login-button'
      ]);
      
      await loginButton.click();
      console.log('Clicked login button');
    } catch (error) {
      throw new Error('Could not click login button');
    }
  }

  /**
   * Handle the "personal account" error by switching to work/school account
   */
  private async handlePersonalAccountError(): Promise<void> {
    console.log('Checking for personal account error...');

    try {
      // Look for the personal account error message
      const errorMessage = await this.page.waitForSelector(
        'text=You can\'t sign in here with a personal account. Use your work or school account instead.',
        { timeout: 5000 }
      );

      if (errorMessage) {
        console.log('Personal account error detected, attempting to switch to work/school account...');
        
        // Look for "Sign-in options" or similar button
        const signInOptionsSelectors = [
          'button:has-text("Sign-in options")',
          'button:has-text("Use a different account")',
          'button:has-text("Work or school account")',
          'a:has-text("Sign-in options")',
          'a:has-text("Use a different account")'
        ];

        for (const selector of signInOptionsSelectors) {
          try {
            await this.page.click(selector);
            console.log(`Clicked sign-in options: ${selector}`);
            await this.page.waitForTimeout(2000); // Wait for page to update
            return;
          } catch (error) {
            // Continue to next selector
            continue;
          }
        }

        // If no sign-in options button found, try to find work/school account option
        const workAccountSelectors = [
          'button:has-text("Work or school account")',
          'a:has-text("Work or school account")',
          'text=Work or school account'
        ];

        for (const selector of workAccountSelectors) {
          try {
            await this.page.click(selector);
            console.log(`Clicked work/school account option: ${selector}`);
            await this.page.waitForTimeout(2000);
            return;
          } catch (error) {
            // Continue to next selector
            continue;
          }
        }

        console.log('Could not find sign-in options, continuing with current flow...');
      }
    } catch (error) {
      // No personal account error found, continue normally
      console.log('No personal account error detected, continuing normally...');
    }
  }

  /**
   * Enter email in the Microsoft OAuth form
   */
  private async enterEmail(email: string): Promise<void> {
    console.log('Entering email...');

    const emailSelectors = [
      'input[type="email"]',
      'input[name="loginfmt"]',
      'input[placeholder*="email"]',
      'input[placeholder*="Email"]',
      '#i0116',
      '[data-testid="email-input"]'
    ];

    for (const selector of emailSelectors) {
      try {
        await this.page.waitForSelector(selector, { timeout: 5000 });
        await this.page.fill(selector, email);
        console.log(`Email entered using selector: ${selector}`);
        break;
      } catch (error) {
        // Continue to next selector
        continue;
      }
    }

    // Click Next button
    await this.clickNextButton();
  }

  /**
   * Enter password in the Microsoft OAuth form
   */
  private async enterPassword(password: string): Promise<void> {
    console.log('Entering password...');

    const passwordSelectors = [
      'input[type="password"]',
      'input[name="passwd"]',
      'input[placeholder*="password"]',
      'input[placeholder*="Password"]',
      '#i0118',
      '[data-testid="password-input"]'
    ];

    for (const selector of passwordSelectors) {
      try {
        await this.page.waitForSelector(selector, { timeout: 10000 });
        await this.page.fill(selector, password);
        console.log(`Password entered using selector: ${selector}`);
        break;
      } catch (error) {
        // Continue to next selector
        continue;
      }
    }

    // Click Sign in button
    await this.clickSignInButton();
  }

  /**
   * Click the Next button
   */
  private async clickNextButton(): Promise<void> {
    const nextSelectors = [
      'button:has-text("Next")',
      'input[type="submit"][value="Next"]',
      '#idSIButton9',
      '[data-testid="next-button"]'
    ];

    for (const selector of nextSelectors) {
      try {
        await this.page.click(selector);
        console.log(`Clicked Next button: ${selector}`);
        await this.page.waitForTimeout(2000);
        return;
      } catch (error) {
        // Continue to next selector
        continue;
      }
    }

    console.log('Next button not found, continuing...');
  }

  /**
   * Click the Sign in button
   */
  private async clickSignInButton(): Promise<void> {
    const signInSelectors = [
      'button:has-text("Sign in")',
      'input[type="submit"][value="Sign in"]',
      '#idSIButton9',
      '[data-testid="signin-button"]'
    ];

    for (const selector of signInSelectors) {
      try {
        await this.page.click(selector);
        console.log(`Clicked Sign in button: ${selector}`);
        await this.page.waitForTimeout(3000);
        return;
      } catch (error) {
        // Continue to next selector
        continue;
      }
    }

    console.log('Sign in button not found, continuing...');
  }

  /**
   * Handle additional prompts (like "Stay signed in")
   */
  private async handleAdditionalPrompts(): Promise<void> {
    console.log('Handling additional prompts...');

    try {
      // Look for "Stay signed in" prompt
      const staySignedInSelectors = [
        'button:has-text("Yes")',
        'button:has-text("Stay signed in")',
        'input[type="submit"][value="Yes"]',
        '#idSIButton9'
      ];

      for (const selector of staySignedInSelectors) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          await this.page.click(selector);
          console.log(`Handled additional prompt: ${selector}`);
          await this.page.waitForTimeout(2000);
          return;
        } catch (error) {
          // Continue to next selector
          continue;
        }
      }
    } catch (error) {
      // No additional prompts found, continue
      console.log('No additional prompts found, continuing...');
    }
  }

  /**
   * Verify that authentication was successful
   */
  private async verifyAuthenticationSuccess(): Promise<void> {
    console.log('Verifying authentication success...');

    // Wait for the page to load completely
    await this.page.waitForLoadState('networkidle');

    // Check for authentication indicators
    const authIndicators = [
      '[data-testid="user-menu"]',
      '[data-testid="profile-menu"]',
      '.user-menu',
      '.profile-menu',
      'text=Logout',
      'text=Sign out',
      '[data-testid="dashboard"]',
      '.dashboard'
    ];

    let authSuccessful = false;

    for (const indicator of authIndicators) {
      try {
        await this.page.waitForSelector(indicator, { timeout: 5000 });
        authSuccessful = true;
        console.log(`Authentication verified with indicator: ${indicator}`);
        break;
      } catch (error) {
        // Continue checking other indicators
        continue;
      }
    }

    // Also check URL doesn't contain login or auth
    const currentUrl = this.page.url();
    if (!currentUrl.includes('/login') && !currentUrl.includes('/auth')) {
      authSuccessful = true;
      console.log('Authentication verified by URL check');
    }

    if (!authSuccessful) {
      throw new Error('Authentication verification failed - could not find indicators of successful authentication');
    }

    console.log('Authentication verification successful');
  }

  /**
   * Check if user is currently logged in
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      // Check localStorage for authentication state
      const isAuthenticated = await this.page.evaluate(`
        localStorage.getItem('is_authenticated') === 'true' ||
        sessionStorage.getItem('is_authenticated') === 'true';
      `);

      if (isAuthenticated) {
        return true;
      }

      // Check for authentication indicators on the page
      const authIndicators = [
        '[data-testid="user-menu"]',
        '[data-testid="profile-menu"]',
        '.user-menu',
        '.profile-menu',
        'text=Logout',
        'text=Sign out'
      ];

      for (const indicator of authIndicators) {
        try {
          await this.page.waitForSelector(indicator, { timeout: 2000 });
          return true;
        } catch (error) {
          // Continue checking other indicators
          continue;
        }
      }

      // Check URL doesn't contain login or auth
      const currentUrl = this.page.url();
      return !currentUrl.includes('/login') && !currentUrl.includes('/auth');
    } catch (error) {
      console.log('Error checking login status:', error);
      return false;
    }
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    console.log('Logging out...');

    try {
      // Look for logout button
      const logoutSelectors = [
        'button:has-text("Logout")',
        'button:has-text("Sign out")',
        'a:has-text("Logout")',
        'a:has-text("Sign out")',
        '[data-testid="logout-button"]',
        '[data-testid="signout-button"]'
      ];

      for (const selector of logoutSelectors) {
        try {
          await this.page.click(selector);
          console.log(`Clicked logout button: ${selector}`);
          await this.page.waitForTimeout(2000);
          break;
        } catch (error) {
          // Continue to next selector
          continue;
        }
      }

      // Clear authentication state
      await this.page.evaluate(`
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('is_authenticated');
        localStorage.removeItem('auth_timestamp');
        
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user_info');
        sessionStorage.removeItem('is_authenticated');
      `);

      // Clear cookies
      await this.page.context().clearCookies();

      console.log('Logout completed');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }
}
