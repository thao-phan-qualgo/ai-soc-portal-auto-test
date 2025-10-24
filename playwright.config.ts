import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { config } from './src/config/env.config';

// Load environment variables
dotenv.config();

/**
 * Playwright Test Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: `${config.reportsPath}/html-report`, open: 'never' }],
    ['json', { outputFile: `${config.reportsPath}/results.json` }],
    ['junit', { outputFile: `${config.reportsPath}/junit.xml` }],
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    baseURL: config.portalUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: config.actionTimeout,
    navigationTimeout: config.navigationTimeout,
  },

  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  
  /* Configure projects for major browsers - Only Chromium enabled */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
      },
    },
    
  ],
  
});

