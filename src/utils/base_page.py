"""
Base page class for Playwright page objects
"""

import os
from typing import Optional, List
from playwright.sync_api import Page, Locator, expect
from ..config import settings


class BasePage:
    """Base page class with common functionality"""
    
    def __init__(self, page: Page):
        self.page = page
        self.base_url = settings.BASE_URL
    
    def navigate_to(self, url: str = "") -> None:
        """Navigate to a URL"""
        full_url = f"{self.base_url}/{url.lstrip('/')}" if url else self.base_url
        self.page.goto(full_url)
        self.page.wait_for_load_state("networkidle")
    
    def click(self, selector: str, timeout: int = None) -> None:
        """Click an element"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.click(selector, timeout=timeout)
    
    def fill(self, selector: str, value: str, timeout: int = None) -> None:
        """Fill an input field"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.fill(selector, value, timeout=timeout)
    
    def get_text(self, selector: str, timeout: int = None) -> str:
        """Get text content of an element"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        return self.page.text_content(selector, timeout=timeout)
    
    def get_attribute(self, selector: str, attribute: str, timeout: int = None) -> Optional[str]:
        """Get attribute value of an element"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        return self.page.get_attribute(selector, attribute, timeout=timeout)
    
    def is_visible(self, selector: str, timeout: int = None) -> bool:
        """Check if element is visible"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        try:
            self.page.wait_for_selector(selector, state="visible", timeout=timeout)
            return True
        except:
            return False
    
    def is_hidden(self, selector: str, timeout: int = None) -> bool:
        """Check if element is hidden"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        try:
            self.page.wait_for_selector(selector, state="hidden", timeout=timeout)
            return True
        except:
            return False
    
    def wait_for_element(self, selector: str, state: str = "visible", timeout: int = None) -> Locator:
        """Wait for element to be in specified state"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        return self.page.wait_for_selector(selector, state=state, timeout=timeout)
    
    def wait_for_text(self, text: str, timeout: int = None) -> None:
        """Wait for text to appear on page"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.wait_for_selector(f"text={text}", timeout=timeout)
    
    def select_option(self, selector: str, value: str, timeout: int = None) -> None:
        """Select option from dropdown"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.select_option(selector, value, timeout=timeout)
    
    def check_checkbox(self, selector: str, timeout: int = None) -> None:
        """Check a checkbox"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.check(selector, timeout=timeout)
    
    def uncheck_checkbox(self, selector: str, timeout: int = None) -> None:
        """Uncheck a checkbox"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.uncheck(selector, timeout=timeout)
    
    def hover(self, selector: str, timeout: int = None) -> None:
        """Hover over an element"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.hover(selector, timeout=timeout)
    
    def double_click(self, selector: str, timeout: int = None) -> None:
        """Double click an element"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.dblclick(selector, timeout=timeout)
    
    def right_click(self, selector: str, timeout: int = None) -> None:
        """Right click an element"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        self.page.click(selector, button="right", timeout=timeout)
    
    def press_key(self, key: str) -> None:
        """Press a key"""
        self.page.keyboard.press(key)
    
    def type_text(self, text: str, delay: int = 0) -> None:
        """Type text with optional delay"""
        self.page.keyboard.type(text, delay=delay)
    
    def take_screenshot(self, name: str = None, full_page: bool = True) -> str:
        """Take screenshot"""
        if not name:
            name = f"screenshot_{self.page.url.split('/')[-1]}.png"
        
        screenshot_path = os.path.join(settings.SCREENSHOTS_DIR, name)
        os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)
        
        self.page.screenshot(path=screenshot_path, full_page=full_page)
        return screenshot_path
    
    def get_page_title(self) -> str:
        """Get page title"""
        return self.page.title()
    
    def get_current_url(self) -> str:
        """Get current URL"""
        return self.page.url
    
    def reload_page(self) -> None:
        """Reload the page"""
        self.page.reload()
        self.page.wait_for_load_state("networkidle")
    
    def go_back(self) -> None:
        """Go back in browser history"""
        self.page.go_back()
        self.page.wait_for_load_state("networkidle")
    
    def go_forward(self) -> None:
        """Go forward in browser history"""
        self.page.go_forward()
        self.page.wait_for_load_state("networkidle")
    
    def wait_for_navigation(self, timeout: int = None) -> None:
        """Wait for navigation to complete"""
        timeout = timeout or settings.NAVIGATION_TIMEOUT
        self.page.wait_for_load_state("networkidle", timeout=timeout)
    
    def get_all_text(self, selector: str) -> List[str]:
        """Get all text content from multiple elements"""
        elements = self.page.query_selector_all(selector)
        return [element.text_content() for element in elements if element.text_content()]
    
    def get_all_attributes(self, selector: str, attribute: str) -> List[str]:
        """Get all attribute values from multiple elements"""
        elements = self.page.query_selector_all(selector)
        return [element.get_attribute(attribute) for element in elements if element.get_attribute(attribute)]
    
    def expect_element_to_be_visible(self, selector: str, timeout: int = None) -> None:
        """Expect element to be visible"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        expect(self.page.locator(selector)).to_be_visible(timeout=timeout)
    
    def expect_element_to_be_hidden(self, selector: str, timeout: int = None) -> None:
        """Expect element to be hidden"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        expect(self.page.locator(selector)).to_be_hidden(timeout=timeout)
    
    def expect_text_to_be_present(self, text: str, timeout: int = None) -> None:
        """Expect text to be present on page"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        expect(self.page.locator(f"text={text}")).to_be_visible(timeout=timeout)
    
    def expect_url_to_contain(self, url_part: str, timeout: int = None) -> None:
        """Expect URL to contain specific part"""
        timeout = timeout or settings.DEFAULT_TIMEOUT
        expect(self.page).to_have_url(f"*{url_part}*", timeout=timeout)