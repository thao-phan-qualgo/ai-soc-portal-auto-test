import { test, expect } from '@playwright/test';

/**
 * Component UI Tests
 * Tests for specific UI components, their styling, and behavior
 */
test.describe('Component UI Tests', () => {
  test('should verify button component styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test button components
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      const buttonStyles = await firstButton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          border: styles.border,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          cursor: styles.cursor
        };
      });
      
      expect(buttonStyles.backgroundColor).toBeTruthy();
      expect(buttonStyles.color).toBeTruthy();
      expect(buttonStyles.cursor).toBe('pointer');
    }
  });

  test('should verify input component styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test input components
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      const firstInput = inputs.first();
      const inputStyles = await firstInput.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          border: styles.border,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          fontSize: styles.fontSize,
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      });
      
      expect(inputStyles.border).toBeTruthy();
      expect(inputStyles.padding).toBeTruthy();
    }
  });

  test('should verify modal component styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test modal components
    const modals = page.locator('.modal, [role="dialog"], [class*="modal"]');
    const modalCount = await modals.count();
    
    if (modalCount > 0) {
      const firstModal = modals.first();
      const modalStyles = await firstModal.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          position: styles.position,
          zIndex: styles.zIndex,
          backgroundColor: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadow
        };
      });
      
      expect(modalStyles.position).toBeTruthy();
      expect(modalStyles.zIndex).toBeTruthy();
    }
  });

  test('should verify table component styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test table components
    const tables = page.locator('table');
    const tableCount = await tables.count();
    
    if (tableCount > 0) {
      const firstTable = tables.first();
      const tableStyles = await firstTable.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          borderCollapse: styles.borderCollapse,
          width: styles.width,
          border: styles.border
        };
      });
      
      // Test table headers
      const headers = firstTable.locator('th');
      const headerCount = await headers.count();
      
      // Test table cells
      const cells = firstTable.locator('td');
      const cellCount = await cells.count();
      
      expect(tableStyles.borderCollapse).toBeTruthy();
      expect(headerCount + cellCount).toBeGreaterThan(0);
    }
  });

  test('should verify dropdown component styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test dropdown components
    const dropdowns = page.locator('select, .dropdown, [class*="dropdown"]');
    const dropdownCount = await dropdowns.count();
    
    if (dropdownCount > 0) {
      const firstDropdown = dropdowns.first();
      const dropdownStyles = await firstDropdown.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          border: styles.border,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          backgroundColor: styles.backgroundColor,
          cursor: styles.cursor
        };
      });
      
      expect(dropdownStyles.border).toBeTruthy();
      expect(dropdownStyles.cursor).toBeTruthy();
    }
  });

  test('should verify card component styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test card components
    const cards = page.locator('.card, [class*="card"]');
    const cardCount = await cards.count();
    
    if (cardCount > 0) {
      const firstCard = cards.first();
      const cardStyles = await firstCard.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          border: styles.border,
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadow,
          padding: styles.padding,
          backgroundColor: styles.backgroundColor
        };
      });
      
      expect(cardStyles.border).toBeTruthy();
      expect(cardStyles.padding).toBeTruthy();
    }
  });

  test('should verify navigation component styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test navigation components
    const navs = page.locator('nav, .nav, [class*="nav"]');
    const navCount = await navs.count();
    
    if (navCount > 0) {
      const firstNav = navs.first();
      const navStyles = await firstNav.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          backgroundColor: styles.backgroundColor,
          padding: styles.padding,
          borderBottom: styles.borderBottom
        };
      });
      
      // Test navigation links
      const navLinks = firstNav.locator('a, button');
      const linkCount = await navLinks.count();
      
      expect(navStyles.display).toBeTruthy();
      expect(linkCount).toBeGreaterThan(0);
    }
  });

  test('should verify badge and label component styling @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test badge components
    const badges = page.locator('.badge, [class*="badge"], .label, [class*="label"]');
    const badgeCount = await badges.count();
    
    if (badgeCount > 0) {
      const firstBadge = badges.first();
      const badgeStyles = await firstBadge.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight
        };
      });
      
      expect(badgeStyles.backgroundColor).toBeTruthy();
      expect(badgeStyles.color).toBeTruthy();
    }
  });
});
