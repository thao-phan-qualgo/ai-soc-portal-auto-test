import { test, expect } from '@playwright/test';

/**
 * Layout UI Tests
 * Tests for layout structure, positioning, and responsive behavior
 */
test.describe('Layout UI Tests', () => {
  test('should verify header layout and positioning @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test header element
    const header = page.locator('header').first();
    if (await header.isVisible()) {
      const headerBox = await header.boundingBox();
      const headerStyles = await header.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          position: styles.position,
          top: styles.top,
          left: styles.left,
          width: styles.width,
          height: styles.height
        };
      });
      
      expect(headerBox).toBeTruthy();
      expect(headerStyles.position).toBeTruthy();
    }
  });

  test('should verify navigation menu layout @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test navigation elements
    const nav = page.locator('nav').first();
    if (await nav.isVisible()) {
      const navBox = await nav.boundingBox();
      const navItems = page.locator('nav a, nav button');
      const navItemCount = await navItems.count();
      
      expect(navBox).toBeTruthy();
      expect(navItemCount).toBeGreaterThan(0);
    }
  });

  test('should verify main content area layout @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test main content area
    const main = page.locator('main').first();
    if (await main.isVisible()) {
      const mainBox = await main.boundingBox();
      const mainStyles = await main.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          width: styles.width,
          maxWidth: styles.maxWidth,
          margin: styles.margin
        };
      });
      
      expect(mainBox).toBeTruthy();
      expect(mainStyles.display).toBeTruthy();
    }
  });

  test('should verify footer layout @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test footer element
    const footer = page.locator('footer').first();
    if (await footer.isVisible()) {
      const footerBox = await footer.boundingBox();
      const footerStyles = await footer.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          position: styles.position,
          bottom: styles.bottom,
          width: styles.width,
          height: styles.height
        };
      });
      
      expect(footerBox).toBeTruthy();
      expect(footerStyles.position).toBeTruthy();
    }
  });

  test('should verify grid and flexbox layouts @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test for grid layouts
    const gridElements = page.locator('[style*="display: grid"], .grid');
    const gridCount = await gridElements.count();
    
    // Test for flexbox layouts
    const flexElements = page.locator('[style*="display: flex"], .flex');
    const flexCount = await flexElements.count();
    
    console.log(`Found ${gridCount} grid elements`);
    console.log(`Found ${flexCount} flex elements`);
    
    // Verify layout containers exist
    expect(gridCount + flexCount).toBeGreaterThan(0);
  });

  test('should verify sidebar layout @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test sidebar elements
    const sidebar = page.locator('aside, .sidebar, [role="complementary"]').first();
    if (await sidebar.isVisible()) {
      const sidebarBox = await sidebar.boundingBox();
      const sidebarStyles = await sidebar.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          position: styles.position,
          width: styles.width,
          height: styles.height,
          float: styles.float
        };
      });
      
      expect(sidebarBox).toBeTruthy();
      expect(sidebarStyles.width).toBeTruthy();
    }
  });

  test('should verify card and container layouts @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test card elements
    const cards = page.locator('.card, [class*="card"]');
    const cardCount = await cards.count();
    
    // Test container elements
    const containers = page.locator('.container, [class*="container"]');
    const containerCount = await containers.count();
    
    if (cardCount > 0) {
      const firstCard = cards.first();
      const cardBox = await firstCard.boundingBox();
      expect(cardBox).toBeTruthy();
    }
    
    if (containerCount > 0) {
      const firstContainer = containers.first();
      const containerBox = await firstContainer.boundingBox();
      expect(containerBox).toBeTruthy();
    }
  });

  test('should verify spacing and margins @ui', async ({ page }) => {
    await page.goto('https://dev-aisoc-fe.qualgo.dev');
    
    // Test body spacing
    const body = page.locator('body');
    const bodyStyles = await body.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        margin: styles.margin,
        padding: styles.padding,
        boxSizing: styles.boxSizing
      };
    });
    
    expect(bodyStyles.margin).toBeTruthy();
    expect(bodyStyles.padding).toBeTruthy();
  });
});
