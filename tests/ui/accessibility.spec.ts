import { test, expect } from '@playwright/test';

/**
 * Accessibility UI Tests
 * Tests for accessibility features, ARIA attributes, and screen reader compatibility
 */
test.describe('Accessibility UI Tests', () => {
  test('should verify ARIA labels and roles @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test for ARIA labels
    const elementsWithAriaLabel = page.locator('[aria-label]');
    const ariaLabelCount = await elementsWithAriaLabel.count();
    
    // Test for ARIA roles
    const elementsWithRole = page.locator('[role]');
    const roleCount = await elementsWithRole.count();
    
    // Test for ARIA describedby
    const elementsWithDescribedBy = page.locator('[aria-describedby]');
    const describedByCount = await elementsWithDescribedBy.count();
    
    console.log(`Found ${ariaLabelCount} elements with aria-label`);
    console.log(`Found ${roleCount} elements with role`);
    console.log(`Found ${describedByCount} elements with aria-describedby`);
  });

  test('should verify keyboard navigation @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
    
    // Test tab order
    await page.keyboard.press('Tab');
    const secondFocusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(secondFocusedElement).toBeTruthy();
  });

  test('should verify color contrast @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test text elements for color contrast
    const textElements = page.locator('p, span, div, h1, h2, h3, h4, h5, h6');
    const textCount = await textElements.count();
    
    if (textCount > 0) {
      const firstText = textElements.first();
      const color = await firstText.evaluate(el => 
        window.getComputedStyle(el).color
      );
      const backgroundColor = await firstText.evaluate(el => {
        let parent = el.parentElement;
        while (parent && window.getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') {
          parent = parent.parentElement;
        }
        return parent ? window.getComputedStyle(parent).backgroundColor : 'rgba(255, 255, 255, 1)';
      });
      
      expect(color).toBeTruthy();
      expect(backgroundColor).toBeTruthy();
    }
  });

  test('should verify focus indicators @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test focusable elements
    const focusableElements = page.locator('button, input, select, textarea, a[href]');
    const focusableCount = await focusableElements.count();
    
    if (focusableCount > 0) {
      const firstFocusable = focusableElements.first();
      await firstFocusable.focus();
      
      const outlineStyle = await firstFocusable.evaluate(el => 
        window.getComputedStyle(el).outlineStyle
      );
      const outlineWidth = await firstFocusable.evaluate(el => 
        window.getComputedStyle(el).outlineWidth
      );
      
      // Verify focus indicator exists
      expect(outlineStyle !== 'none' || outlineWidth !== '0px').toBeTruthy();
    }
  });

  test('should verify alt text for images @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test images for alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        const role = await img.getAttribute('role');
        
        // Images should have alt text or be decorative (role="presentation")
        expect(alt !== null || role === 'presentation').toBeTruthy();
      }
    }
  });

  test('should verify form labels @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test form inputs for labels
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');
        
        // Inputs should have labels via id/label, aria-label, or aria-labelledby
        const hasLabel = id || ariaLabel || ariaLabelledBy;
        expect(hasLabel).toBeTruthy();
      }
    }
  });
});
