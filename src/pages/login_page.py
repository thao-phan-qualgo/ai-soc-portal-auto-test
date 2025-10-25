"""
Login page object
"""

from typing import Dict, Any
from ..utils.base_page import BasePage
from ..config import settings


class LoginPage(BasePage):
    """Login page object"""
    
    # Selectors
    USERNAME_INPUT = "input[name='username']"
    PASSWORD_INPUT = "input[name='password']"
    LOGIN_BUTTON = "button[type='submit']"
    ERROR_MESSAGE = ".error-message"
    FORGOT_PASSWORD_LINK = "a[href*='forgot-password']"
    REMEMBER_ME_CHECKBOX = "input[name='remember']"
    
    def __init__(self, page):
        super().__init__(page)
        self.url = "/login"
    
    def navigate_to_login(self) -> None:
        """Navigate to login page"""
        self.navigate_to(self.url)
        self.wait_for_element(self.USERNAME_INPUT)
    
    def enter_username(self, username: str) -> None:
        """Enter username"""
        self.fill(self.USERNAME_INPUT, username)
    
    def enter_password(self, password: str) -> None:
        """Enter password"""
        self.fill(self.PASSWORD_INPUT, password)
    
    def click_login_button(self) -> None:
        """Click login button"""
        self.click(self.LOGIN_BUTTON)
    
    def login(self, username: str = None, password: str = None) -> None:
        """Perform login with credentials"""
        username = username or settings.TEST_USERNAME
        password = password or settings.TEST_PASSWORD
        
        self.enter_username(username)
        self.enter_password(password)
        self.click_login_button()
    
    def login_as_admin(self) -> None:
        """Login as admin user"""
        self.login(settings.ADMIN_USERNAME, settings.ADMIN_PASSWORD)
    
    def get_error_message(self) -> str:
        """Get error message text"""
        if self.is_visible(self.ERROR_MESSAGE):
            return self.get_text(self.ERROR_MESSAGE)
        return ""
    
    def is_error_visible(self) -> bool:
        """Check if error message is visible"""
        return self.is_visible(self.ERROR_MESSAGE)
    
    def click_forgot_password(self) -> None:
        """Click forgot password link"""
        self.click(self.FORGOT_PASSWORD_LINK)
    
    def check_remember_me(self) -> None:
        """Check remember me checkbox"""
        self.check_checkbox(self.REMEMBER_ME_CHECKBOX)
    
    def uncheck_remember_me(self) -> None:
        """Uncheck remember me checkbox"""
        self.uncheck_checkbox(self.REMEMBER_ME_CHECKBOX)
    
    def is_remember_me_checked(self) -> bool:
        """Check if remember me is checked"""
        return self.get_attribute(self.REMEMBER_ME_CHECKBOX, "checked") == "true"
    
    def is_login_form_visible(self) -> bool:
        """Check if login form is visible"""
        return (self.is_visible(self.USERNAME_INPUT) and 
                self.is_visible(self.PASSWORD_INPUT) and 
                self.is_visible(self.LOGIN_BUTTON))
    
    def clear_username(self) -> None:
        """Clear username field"""
        self.fill(self.USERNAME_INPUT, "")
    
    def clear_password(self) -> None:
        """Clear password field"""
        self.fill(self.PASSWORD_INPUT, "")
    
    def clear_form(self) -> None:
        """Clear all form fields"""
        self.clear_username()
        self.clear_password()
    
    def get_username_value(self) -> str:
        """Get username field value"""
        return self.get_attribute(self.USERNAME_INPUT, "value")
    
    def get_password_value(self) -> str:
        """Get password field value"""
        return self.get_attribute(self.PASSWORD_INPUT, "value")
    
    def is_login_button_enabled(self) -> bool:
        """Check if login button is enabled"""
        return self.get_attribute(self.LOGIN_BUTTON, "disabled") is None
    
    def wait_for_login_success(self) -> None:
        """Wait for successful login (redirect to dashboard)"""
        self.expect_url_to_contain("/dashboard")
    
    def wait_for_login_failure(self) -> None:
        """Wait for login failure (error message appears)"""
        self.wait_for_element(self.ERROR_MESSAGE)