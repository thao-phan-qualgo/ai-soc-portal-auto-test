/**
 * Configuration Management
 * Centralized configuration for test execution
 */

export interface TestConfig {
  // Portal settings
  portalUrl: string;
  
  // Browser settings
  headless: boolean;
  slowMo: number;
  
  // Timeouts
  timeout: number;
  navigationTimeout: number;
  actionTimeout: number;
  
  // Test settings
  retryCount: number;
  workers: number;
  
  // Authentication
  testUsername: string;
  testPassword: string;
  adminUsername: string;
  adminPassword: string;
  
  // Paths
  screenshotsPath: string;
  videosPath: string;
  reportsPath: string;
}

class ConfigManager {
  private static instance: ConfigManager;
  private config: TestConfig;
  
  private constructor() {
    this.config = {
      // Portal settings
      portalUrl: process.env.PORTAL_URL || 'https://dev-aisoc-fe.qualgo.dev',
      
      // Browser settings
      headless: process.env.HEADLESS === 'true',
      slowMo: parseInt(process.env.SLOW_MO || '0', 10),
      
      // Timeouts
      timeout: parseInt(process.env.TIMEOUT || '30000', 10),
      navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000', 10),
      actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '10000', 10),
      
      // Test settings
      retryCount: parseInt(process.env.RETRY_COUNT || '2', 10),
      workers: parseInt(process.env.WORKERS || '4', 10),
      
      // Authentication
      testUsername: process.env.TEST_USERNAME || 'test@example.com',
      testPassword: process.env.TEST_PASSWORD || 'testpassword',
      adminUsername: process.env.ADMIN_USERNAME || 'admin@example.com',
      adminPassword: process.env.ADMIN_PASSWORD || 'adminpassword',
      
      // Paths
      screenshotsPath: process.env.SCREENSHOTS_PATH || 'test-results/screenshots',
      videosPath: process.env.VIDEOS_PATH || 'test-results/videos',
      reportsPath: process.env.REPORTS_PATH || 'test-results/reports',
    };
  }
  
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
  
  public getConfig(): TestConfig {
    return this.config;
  }
  
  public get<K extends keyof TestConfig>(key: K): TestConfig[K] {
    return this.config[key];
  }
}

export const config = ConfigManager.getInstance().getConfig();
export default ConfigManager;

