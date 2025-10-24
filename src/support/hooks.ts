import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';

let browser: any;
let context: any;
let page: any;

BeforeAll(async function () {
  console.log('🚀 Starting Cucumber tests (fixed hooks)...');
  browser = await chromium.launch({
    headless: false,
    channel: 'chrome'
  });
});

Before(async function () {
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  page = await context.newPage();

  // Make page available to step definitions
  this.page = page;

  console.log('📄 New page created for test (fixed hooks)');
});

After(async function () {
  if (context) {
    await context.close();
    console.log('📄 Page context closed (fixed hooks)');
  }
});

AfterAll({ timeout: 10000 }, async function () {
  try {
    if (browser) {
      console.log('🔚 Closing browser...');
      await browser.close();
      console.log('🔚 Browser closed - All tests completed (fixed hooks)');
    }
  } catch (error) {
    console.error('❌ Error closing browser:', (error as Error).message);
  }
});
