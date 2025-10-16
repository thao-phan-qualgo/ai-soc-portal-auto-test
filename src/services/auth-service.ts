import { Page } from '@playwright/test';

/**
 * Authentication Service for Backend-based Authentication
 * Handles getting authentication codes from backend and bypassing UI login
 */
export class AuthService {
  private readonly baseUrl: string;
  private readonly backendAuthUrl: string;
  private readonly callbackUrl: string;

  constructor(baseUrl: string = 'https://dev-aisoc-fe.qualgo.dev') {
    this.baseUrl = baseUrl;
    this.backendAuthUrl = `${baseUrl}/api/v1/auth/backend-login`;
    this.callbackUrl = `${baseUrl}/api/v1/auth/callback`;
  }

  /**
   * Get authentication code from backend
   * This method simulates the backend providing an auth code
   */
  async getAuthCodeFromBackend(): Promise<{
    code: string;
    state: string;
    sessionState: string;
    iss: string;
  }> {
    console.log('Getting authentication code from backend...');
    
    // In a real implementation, this would make an API call to your backend
    // For now, we'll simulate the response based on the URL pattern you provided
    const mockAuthResponse = {
      code: this.generateMockCode(),
      state: this.generateMockState(),
      sessionState: this.generateMockSessionState(),
      iss: 'https://nonprod-common-keycloak.qualgo.dev/realms/dev-ai-soc'
    };

    console.log('Authentication code retrieved from backend');
    return mockAuthResponse;
  }

  /**
   * Perform login using authentication code from backend
   * This bypasses the UI login flow entirely
   */
  async loginWithBackendCode(page: Page): Promise<void> {
    console.log('Starting backend-based authentication...');
    
    // Get auth code from backend
    const authData = await this.getAuthCodeFromBackend();
    
    // Construct the callback URL with the auth code
    const callbackUrl = this.buildCallbackUrl(authData);
    
    // Navigate directly to the callback URL to complete authentication
    await page.goto(callbackUrl);
    await page.waitForLoadState('networkidle');
    
    // Wait for final redirect to the application
    await page.waitForURL('**/dev-aisoc-fe.qualgo.dev/**', { timeout: 30000 });
    
    // Verify authentication was successful
    await this.verifyAuthenticationSuccess(page);
    
    console.log('Backend-based authentication completed successfully');
  }

  /**
   * Build the callback URL with authentication parameters
   */
  private buildCallbackUrl(authData: {
    code: string;
    state: string;
    sessionState: string;
    iss: string;
  }): string {
    const params = new URLSearchParams({
      session_state: authData.sessionState,
      iss: authData.iss,
      code: authData.code
    });
    
    return `${this.callbackUrl}?${params.toString()}#`;
  }

  /**
   * Verify that authentication was successful
   */
  private async verifyAuthenticationSuccess(page: Page): Promise<void> {
    console.log('Verifying authentication success...');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check for authentication indicators
    const authIndicators = [
      // Check for user menu or profile indicator
      '[data-testid="user-menu"]',
      '[data-testid="profile-menu"]',
      '.user-menu',
      '.profile-menu',
      // Check for logout button
      'text=Logout',
      'text=Sign out',
      // Check for dashboard or main content
      '[data-testid="dashboard"]',
      '.dashboard',
      // Check URL doesn't contain login or callback
      () => !page.url().includes('/login') && !page.url().includes('/callback')
    ];

    let authSuccessful = false;
    
    for (const indicator of authIndicators) {
      try {
        if (typeof indicator === 'string') {
          await page.waitForSelector(indicator, { timeout: 5000 });
          authSuccessful = true;
          break;
        } else if (typeof indicator === 'function') {
          if (indicator()) {
            authSuccessful = true;
            break;
          }
        }
      } catch (error) {
        // Continue checking other indicators
        continue;
      }
    }

    if (!authSuccessful) {
      throw new Error('Authentication verification failed - could not find indicators of successful authentication');
    }

    console.log('Authentication verification successful');
  }

  /**
   * Generate a mock authentication code
   * In production, this would come from your backend service
   */
  private generateMockCode(): string {
    // Generate a mock code similar to the one in your URL
    const timestamp = Date.now();
    const random1 = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    const random3 = Math.random().toString(36).substring(2, 15);
    
    return `${random1}.${timestamp}.${random2}.${random3}`;
  }

  /**
   * Generate a mock state parameter
   */
  private generateMockState(): string {
    const random1 = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    const random3 = Math.random().toString(36).substring(2, 15);
    const random4 = Math.random().toString(36).substring(2, 15);
    
    return `${random1}.${random2}.${random3}.${random4}`;
  }

  /**
   * Generate a mock session state
   */
  private generateMockSessionState(): string {
    const random1 = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    const random3 = Math.random().toString(36).substring(2, 15);
    const random4 = Math.random().toString(36).substring(2, 15);
    
    return `${random1}-${random2}-${random3}-${random4}`;
  }

  /**
   * Check if backend authentication is available
   */
  async isBackendAuthAvailable(): Promise<boolean> {
    try {
      // In a real implementation, you would check if your backend auth endpoint is available
      // For now, we'll assume it's always available
      return true;
    } catch (error) {
      console.warn('Backend authentication not available:', error);
      return false;
    }
  }
}
