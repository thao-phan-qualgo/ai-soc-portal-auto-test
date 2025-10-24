import { Given, When } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { ITAssetInventoryPage } from '../../src/ui/pages/inventory/ITAssetInventoryPage';

let page: Page;
let assetInventoryPage: ITAssetInventoryPage;

Given('I am logged in to the AI SOC Portal', async function () {
  page = this.page;
  console.log('User is logged in to AI SOC Portal');
  // Assume user is already logged in - just initialize the page objects
});

Given('I am on the IT Asset Inventory page', async function () {
  page = this.page;
  assetInventoryPage = new ITAssetInventoryPage(page);
  await assetInventoryPage.navigateToPage();
});

When('I navigate to the IT Asset Inventory page', async function () {
  page = this.page;
  assetInventoryPage = new ITAssetInventoryPage(page);
  await assetInventoryPage.navigateToITAssetInventory();
});