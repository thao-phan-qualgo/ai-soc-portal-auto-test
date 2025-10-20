/**
 * Configuration Management
 * Centralized configuration for test execution
 */

export interface TestConfig {
  // Portal settings
  portalUrl: string;
  
  // Timeouts
  timeout: number;
  actionTimeout: number;
  navigationTimeout: number;
  
  // Paths
  screenshotsPath: string;
  reportsPath: string;
}

class ConfigManager {
  private static instance: ConfigManager;
  private config: TestConfig;
  
  private constructor() {
    this.config = {
      // Portal settings
      portalUrl: process.env.PORTAL_URL || 'https://dev-aisoc-fe.qualgo.dev',
      
      // Timeouts
      timeout: parseInt(process.env.TIMEOUT || '30000', 10),
      actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '30000', 10),
      navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000', 10),
      
      // Paths
      screenshotsPath: process.env.SCREENSHOTS_PATH || 'test-results/screenshots',
      reportsPath: process.env.REPORTS_PATH || 'test-results',
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

