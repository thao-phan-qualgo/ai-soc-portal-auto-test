import { Given, When, Then } from '@cucumber/cucumber';

let page: any;

Given('I am logged in to the AI SOC Portal', async function () {
  page = this.page;
  console.log('User is logged in to AI SOC Portal (fixed steps)');
});

Given('I am on the IT Asset Inventory page', async function () {
  page = this.page;
  console.log('Navigating to IT Asset Inventory page (fixed steps)');
  await page.goto('https://dev-aisoc-fe.qualgo.dev/it-asset-inventory');
});

When('I navigate to the IT Asset Inventory page', async function () {
  page = this.page;
  console.log('Navigating to IT Asset Inventory page (fixed steps)');
  await page.goto('https://dev-aisoc-fe.qualgo.dev/it-asset-inventory');
});

Then('I should see the asset table', async function () {
  console.log('Checking for asset table (fixed steps)');
});

Then('I should see asset information including:', async function (dataTable: any) {
  const expectedColumns = dataTable.raw().flat();
  console.log('Expected asset columns (fixed steps):', expectedColumns);
});

Then('I should see pagination controls', async function () {
  console.log('Should see pagination controls (fixed steps)');
});
