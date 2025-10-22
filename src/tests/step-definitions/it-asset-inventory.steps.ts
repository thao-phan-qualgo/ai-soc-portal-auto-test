import { Given, When, Then } from '@cucumber/cucumber';
import { BasePage } from '../../pages/BasePage';

let page: any;
let basePage: BasePage;

Given('I am logged in to the AI SOC Portal', async function () {
  page = this.page;
  basePage = new BasePage(page);
  console.log('User is logged in to AI SOC Portal (fixed steps)');
});

Given('I am on the IT Asset Inventory page', async function () {
  page = this.page;
  basePage = new BasePage(page);
  console.log('Navigating to IT Asset Inventory page (fixed steps)');
  await basePage.navigateAndPause('/it-asset-inventory', 3);
});

When('I navigate to the IT Asset Inventory page', async function () {
  page = this.page;
  basePage = new BasePage(page);
  console.log('Navigating to IT Asset Inventory page (fixed steps)');
  // Navigate to URL and pause for 2 seconds (default)
  await basePage.navigateAndPause('/it-asset-inventory');
});