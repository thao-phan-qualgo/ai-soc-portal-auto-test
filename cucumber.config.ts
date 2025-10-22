import { IConfiguration } from '@cucumber/cucumber';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Use consistent report path
const reportsPath = process.env.REPORTS_PATH || 'test-results';

const config: IConfiguration = {
  default: {
    paths: ['tests/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'tests/step-definitions/**/*.steps.ts',
      'tests/config/hooks.ts'
    ],
    format: [
      'progress-bar',
      `html:${reportsPath}/cucumber-report.html`,
      `json:${reportsPath}/cucumber-report.json`,
      `junit:${reportsPath}/cucumber-report.xml`
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    strict: true,
    worldParameters: {
      baseUrl: process.env.PORTAL_URL || 'https://dev-aisoc-fe.qualgo.dev'
    }
  }
};

export default config;
