/**
 * Authentication Configuration
 * Configuration for real OAuth login
 */

export interface AuthConfig {
  realAuthCredentials: {
    email: string;
    password: string;
  };
}

/**
 * Get authentication configuration from environment variables
 */
export function getAuthConfig(): AuthConfig {
  return {
    realAuthCredentials: {
      email: process.env.MICROSOFT_EMAIL || '',
      password: process.env.MICROSOFT_PASSWORD || ''
    }
  };
}
