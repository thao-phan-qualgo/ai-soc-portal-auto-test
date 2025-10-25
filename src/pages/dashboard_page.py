"""
Dashboard page object
"""

from typing import Dict, Any
from ..utils.base_page import BasePage


class DashboardPage(BasePage):
    """Dashboard page object"""
    
    # Selectors
    USER_MENU = ".user-menu"
    LOGOUT_BUTTON = "a[href*='logout']"
    NAVIGATION_MENU = ".nav-menu"
    MAIN_CONTENT = ".main-content"
    SIDEBAR = ".sidebar"
    HEADER = ".header"
    FOOTER = ".footer"
    
    # Navigation links
    OVERVIEW_LINK = "a[href*='overview']"
    USERS_LINK = "a[href*='users']"
    DEVICES_LINK = "a[href*='devices']"
    ALERTS_LINK = "a[href*='alerts']"
    REPORTS_LINK = "a[href*='reports']"
    SETTINGS_LINK = "a[href*='settings']"
    
    def __init__(self, page):
        super().__init__(page)
        self.url = "/dashboard"
    
    def navigate_to_dashboard(self) -> None:
        """Navigate to dashboard"""
        self.navigate_to(self.url)
        self.wait_for_element(self.MAIN_CONTENT)
    
    def is_dashboard_loaded(self) -> bool:
        """Check if dashboard is loaded"""
        return (self.is_visible(self.MAIN_CONTENT) and 
                self.is_visible(self.NAVIGATION_MENU))
    
    def click_user_menu(self) -> None:
        """Click user menu"""
        self.click(self.USER_MENU)
    
    def logout(self) -> None:
        """Perform logout"""
        self.click_user_menu()
        self.click(self.LOGOUT_BUTTON)
    
    def navigate_to_overview(self) -> None:
        """Navigate to overview page"""
        self.click(self.OVERVIEW_LINK)
        self.wait_for_navigation()
    
    def navigate_to_users(self) -> None:
        """Navigate to users page"""
        self.click(self.USERS_LINK)
        self.wait_for_navigation()
    
    def navigate_to_devices(self) -> None:
        """Navigate to devices page"""
        self.click(self.DEVICES_LINK)
        self.wait_for_navigation()
    
    def navigate_to_alerts(self) -> None:
        """Navigate to alerts page"""
        self.click(self.ALERTS_LINK)
        self.wait_for_navigation()
    
    def navigate_to_reports(self) -> None:
        """Navigate to reports page"""
        self.click(self.REPORTS_LINK)
        self.wait_for_navigation()
    
    def navigate_to_settings(self) -> None:
        """Navigate to settings page"""
        self.click(self.SETTINGS_LINK)
        self.wait_for_navigation()
    
    def refresh_dashboard(self) -> None:
        """Refresh dashboard"""
        self.reload_page()
        self.wait_for_element(self.MAIN_CONTENT)
    
    def get_user_info(self) -> Dict[str, str]:
        """Get user information from user menu"""
        self.click_user_menu()
        user_info = {}
        
        # Try to get user name and email
        name_element = ".user-name"
        email_element = ".user-email"
        
        if self.is_visible(name_element):
            user_info["name"] = self.get_text(name_element)
        if self.is_visible(email_element):
            user_info["email"] = self.get_text(email_element)
        
        return user_info
    
    def wait_for_dashboard_load(self) -> None:
        """Wait for dashboard to fully load"""
        self.wait_for_element(self.MAIN_CONTENT)
        self.wait_for_element(self.NAVIGATION_MENU)
        # Wait for any loading indicators to disappear
        loading_indicators = ".loading, .spinner, [data-testid='loading']"
        if self.is_visible(loading_indicators):
            self.wait_for_element(loading_indicators, state="hidden")