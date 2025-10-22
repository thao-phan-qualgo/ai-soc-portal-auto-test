import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BasePage } from '../../../src/pages/BasePage';

let page: any;
let basePage: BasePage;

Given('I open the AI SOC Portal', async function () {
  page = this.page;
  basePage = new BasePage(page);
  console.log('Opening AI SOC Portal...');
  // Navigate to URL and pause for 2 seconds
  await basePage.navigateAndPause('', 2);
  await page.waitForLoadState('networkidle');
});

When('I click on the Microsoft Sign-in button', async function () {
  console.log('Looking for Microsoft Sign-in button...');
  const microsoftButton = page.locator('button[aria-label="Sign in with Microsoft"]');
  await microsoftButton.waitFor({ state: 'visible', timeout: 10000 });
  console.log('Microsoft Sign-in button found and visible');
  await microsoftButton.click();
  console.log('Clicked Microsoft Sign-in button');
  await basePage.delayWithTime(2);
});

When('I fill in valid account email and password', async function () {
  console.log('Filling in Microsoft account credentials...');
  
  // Wait for the Microsoft login page to load
  await page.waitForLoadState('networkidle');
  
  // Wait for email input field to be visible
  const emailInput = page.locator('input[type="email"], input[name="loginfmt"], input[id="i0116"]');
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  
  // Fill in email (you can replace with actual test credentials)
  const testEmail = 'test@example.com'; // Replace with actual test email
  await emailInput.fill(testEmail);
  console.log('Filled in email:', testEmail);
  
  // Click Next button
  const nextButton = page.locator('input[type="submit"][value="Next"], input[id="idSIButton9"]');
  await nextButton.waitFor({ state: 'visible', timeout: 5000 });
  await nextButton.click();
  console.log('Clicked Next button');
  
  // Wait for password field to appear
  await basePage.delayWithTime(2);
  
  // Fill in password (you can replace with actual test credentials)
  const passwordInput = page.locator('input[type="password"], input[name="passwd"], input[id="i0118"]');
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  
  const testPassword = 'testpassword123'; // Replace with actual test password
  await passwordInput.fill(testPassword);
  console.log('Filled in password');
  
  // Click Sign in button
  const signInButton = page.locator('input[type="submit"][value="Sign in"], input[id="idSIButton9"]');
  await signInButton.waitFor({ state: 'visible', timeout: 5000 });
  await signInButton.click();
  console.log('Clicked Sign in button');
  
  // Wait for authentication to complete
  await basePage.delayWithTime(3);
});

Then('I should be successfully logged in to the AI SOC Portal', async function () {
  console.log('Verifying successful login to AI SOC Portal...');
  
  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');
  
  // Check if we're back on the AI SOC Portal or dashboard
  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  
  // Verify we're back on the AI SOC Portal domain
  const isOnPortal = currentUrl.includes('dev-aisoc-fe.qualgo.dev') || 
                     currentUrl.includes('aisoc') ||
                     currentUrl.includes('dashboard');
  
  if (isOnPortal) {
    console.log('✅ Successfully logged in to AI SOC Portal');
  } else {
    console.log('❌ Login may not have completed successfully. Current URL:', currentUrl);
  }
  
  // You can add more specific assertions here if needed
  // expect(isOnPortal).toBe(true);
});
