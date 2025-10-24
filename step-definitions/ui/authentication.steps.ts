import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';

// Type definitions for better type safety
interface LoginTestContext {
  page: Page;
}

let page: Page;
let loginPage: LoginPage;

Given('I open the AI SOC Portal', async function (this: LoginTestContext) {
  page = this.page;
  loginPage = new LoginPage(page);
  await loginPage.openPortal();
});

When('I click on the Microsoft Sign-in button', async function () {
  await loginPage.clickMicrosoftSignIn();
});

When('I fill in valid account email and password', async function () {
  const testEmail = 'test@example.com';
  const testPassword = 'testpassword123';
  
  await loginPage.login(testEmail, testPassword);
});

Then('I should be successfully logged in to the AI SOC Portal', async function () {
  await loginPage.verifyLoginSuccess();
});
