import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { BasePage } from '../../src/ui/pages/base/BasePage';

let page: Page;
let basePage: BasePage;

Given('the AI SOC Portal is accessible', async function () {
  page = this.page;
  basePage = new BasePage(page);
  await basePage.navigateAndPause('', 2);
});

Given('I am using a desktop browser', async function () {
  page = this.page;
  await page.setViewportSize({ width: 1920, height: 1080 });
});

When('I view buttons throughout the application', async function () {
  console.log('Viewing buttons throughout the application');
});

Then('all primary buttons should have consistent styling:', async function (dataTable) {
  const stylingRules = dataTable.raw();
  console.log('Primary button styling rules:', stylingRules);
});
