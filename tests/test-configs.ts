/**
 * Test Configuration
 * Centralized configuration for different test types
 */

export const testConfigs = {
  // E2E Test Configuration - Desktop Web Only
  e2e: {
    timeout: 60000,
    retries: 2,
    workers: 1,
    projects: ['chromium'],
    grep: '@e2e',
    viewport: { width: 1920, height: 1080 },
  },

  // Integration Test Configuration
  integration: {
    timeout: 30000,
    retries: 1,
    workers: 2,
    projects: ['chromium'],
    grep: '@integration',
  },

  // API Test Configuration
  api: {
    timeout: 15000,
    retries: 1,
    workers: 4,
    projects: ['chromium'],
    grep: '@api',
  },

  // Unit Test Configuration
  unit: {
    timeout: 10000,
    retries: 0,
    workers: 4,
    projects: ['chromium'],
    grep: '@unit',
  },

  // Performance Test Configuration
  performance: {
    timeout: 120000,
    retries: 0,
    workers: 1,
    projects: ['chromium'],
    grep: '@performance',
  },

  // Database Test Configuration
  database: {
    timeout: 20000,
    retries: 1,
    workers: 1,
    projects: ['chromium'],
    grep: '@database',
  },

  // UI Test Configuration - Desktop Web Only
  ui: {
    timeout: 30000,
    retries: 1,
    workers: 2,
    projects: ['chromium'],
    grep: '@ui',
    viewport: { width: 1920, height: 1080 },
  },
} as const;

export type TestType = keyof typeof testConfigs;
