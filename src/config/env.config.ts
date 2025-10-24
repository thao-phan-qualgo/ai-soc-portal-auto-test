/**
 * Configuration Management
 * Centralized configuration for test execution
 */

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

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

  // Database settings
  database: {
    type: 'mysql' | 'postgresql' | 'sqlite';
    host?: string;
    port?: number;
    database: string;
    username?: string;
    password?: string;
    connectionTimeout?: number;
    queryTimeout?: number;
  };

  // Test data settings
  testData: {
    schemasPath: string;
    fixturesPath: string;
    validationEnabled: boolean;
  };
}

class ConfigManager {
  private static instance: ConfigManager;
  private readonly config: TestConfig;

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

      // Database settings
      database: {
        type: (process.env.DB_TYPE as 'mysql' | 'postgresql' | 'sqlite') || 'postgresql',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5433,
        database: process.env.DB_NAME || 'dev_aisoc',
        username: process.env.DB_USERNAME || 'dev_aisoc_usr_rw',
        password: process.env.DB_PASSWORD || 'EkhOC4iIpMTxiS21pj',
        connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000', 10),
        queryTimeout: parseInt(process.env.DB_QUERY_TIMEOUT || '60000', 10),
      },

      // Test data settings
      testData: {
        schemasPath: process.env.SCHEMAS_PATH || 'src/test-data/schemas',
        fixturesPath: process.env.FIXTURES_PATH || 'src/test-data/fixtures',
        validationEnabled: process.env.VALIDATION_ENABLED !== 'false',
      },
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

