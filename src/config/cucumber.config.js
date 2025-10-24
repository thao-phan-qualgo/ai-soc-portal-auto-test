// Use consistent report path
const reportsPath = process.env.REPORTS_PATH || 'reports';

module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'step-definitions/**/*.steps.ts',
      'src/support/hooks.ts',
      'src/support/transformers.ts',
      'src/support/custom-types.ts'
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
