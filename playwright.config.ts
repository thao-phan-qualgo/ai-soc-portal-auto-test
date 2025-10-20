import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { config } from './src/config/config';

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
  
  /* Shared settings for all the projects below */
  use: {
    baseURL: config.portalUrl,
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on failure */
    video: 'retain-on-failure',
    
    /* Default timeout for each action */
    actionTimeout: config.actionTimeout,
    
    /* Default navigation timeout */
    navigationTimeout: config.navigationTimeout,
  },
  
  /* Global timeout for each test */
  timeout: 60000,
  
  /* Global timeout for expect() calls */
  expect: {
    timeout: 10000,
  },
  
  /* Configure projects for major browsers - Only Chromium enabled */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome', // Use system Chrome instead of Chromium
        viewport: { width: 1920, height: 1080 },
      },
    },
    
  ],
  
});

