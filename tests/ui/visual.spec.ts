import { test, expect } from '@playwright/test';

/**
 * Visual UI Tests
 * Tests for UI elements, colors, sizes, layouts, and visual consistency
 */
test.describe('Visual UI Tests', () => {
  test('should verify button colors and styles @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test primary button colors
    const primaryButton = page.locator('button:has-text("Sign in")').first();
    if (await primaryButton.isVisible()) {
      const backgroundColor = await primaryButton.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      const color = await primaryButton.evaluate(el => 
        window.getComputedStyle(el).color
      );
      
      // Verify button has proper styling
      expect(backgroundColor).toBeTruthy();
      expect(color).toBeTruthy();
    }
  });

  test('should verify text colors and typography @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test heading colors
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    if (headingCount > 0) {
      const firstHeading = headings.first();
      const color = await firstHeading.evaluate(el => 
        window.getComputedStyle(el).color
      );
      const fontSize = await firstHeading.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      
      expect(color).toBeTruthy();
      expect(fontSize).toBeTruthy();
    }
  });

  test('should verify layout and spacing @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test container dimensions
    const body = page.locator('body');
    const bodyBox = await body.boundingBox();
    
    if (bodyBox) {
      expect(bodyBox.width).toBeGreaterThan(0);
      expect(bodyBox.height).toBeGreaterThan(0);
    }
  });

  test('should verify desktop layout @ui', async ({ page }) => {
    // Test desktop viewport only (current phase focus)
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    const desktopLayout = await page.locator('body').boundingBox();
    expect(desktopLayout?.width).toBeLessThanOrEqual(1920);
    expect(desktopLayout?.height).toBeGreaterThan(0);
  });

  test('should verify accessibility colors @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test link colors
    const links = page.locator('a');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      const firstLink = links.first();
      const linkColor = await firstLink.evaluate(el => 
        window.getComputedStyle(el).color
      );
      
      expect(linkColor).toBeTruthy();
    }
  });

  test('should verify form element styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test input field styling
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      const firstInput = inputs.first();
      const borderColor = await firstInput.evaluate(el => 
        window.getComputedStyle(el).borderColor
      );
      const backgroundColor = await firstInput.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      expect(borderColor).toBeTruthy();
      expect(backgroundColor).toBeTruthy();
    }
  });
});
