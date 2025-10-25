"""
UI tests for login functionality
"""

import pytest
from src.pages.login_page import LoginPage


class TestLogin:
    """Test class for login functionality"""
    
    @pytest.mark.ui
    @pytest.mark.smoke
    def test_successful_login(self, page, test_user):
        """Test successful login with valid credentials"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Verify login form is visible
        assert login_page.is_login_form_visible(), "Login form should be visible"
        
        # Perform login
        login_page.login(test_user["username"], test_user["password"])
        
        # Verify successful login (redirect to dashboard)
        login_page.wait_for_login_success()
        assert "/dashboard" in login_page.get_current_url(), "Should redirect to dashboard"
    
    @pytest.mark.ui
    @pytest.mark.smoke
    def test_admin_login(self, page, admin_user):
        """Test admin login"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Perform admin login
        login_page.login_as_admin()
        
        # Verify successful login
        login_page.wait_for_login_success()
        assert "/dashboard" in login_page.get_current_url(), "Should redirect to dashboard"
    
    @pytest.mark.ui
    def test_login_with_invalid_username(self, page):
        """Test login with invalid username"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Attempt login with invalid username
        login_page.login("invalid_user", "password")
        
        # Verify error message appears
        login_page.wait_for_login_failure()
        assert login_page.is_error_visible(), "Error message should be visible"
        assert "invalid" in login_page.get_error_message().lower(), "Error message should indicate invalid credentials"
    
    @pytest.mark.ui
    def test_login_with_invalid_password(self, page, test_user):
        """Test login with invalid password"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Attempt login with invalid password
        login_page.login(test_user["username"], "wrong_password")
        
        # Verify error message appears
        login_page.wait_for_login_failure()
        assert login_page.is_error_visible(), "Error message should be visible"
    
    @pytest.mark.ui
    def test_login_with_empty_credentials(self, page):
        """Test login with empty credentials"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Attempt login with empty credentials
        login_page.login("", "")
        
        # Verify error message appears
        login_page.wait_for_login_failure()
        assert login_page.is_error_visible(), "Error message should be visible"
    
    @pytest.mark.ui
    def test_login_form_validation(self, page):
        """Test login form validation"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Test empty username
        login_page.enter_password("password")
        login_page.click_login_button()
        assert login_page.is_error_visible(), "Should show error for empty username"
        
        # Test empty password
        login_page.clear_form()
        login_page.enter_username("username")
        login_page.click_login_button()
        assert login_page.is_error_visible(), "Should show error for empty password"
    
    @pytest.mark.ui
    def test_remember_me_functionality(self, page, test_user):
        """Test remember me checkbox functionality"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Check remember me
        login_page.check_remember_me()
        assert login_page.is_remember_me_checked(), "Remember me should be checked"
        
        # Uncheck remember me
        login_page.uncheck_remember_me()
        assert not login_page.is_remember_me_checked(), "Remember me should be unchecked"
    
    @pytest.mark.ui
    def test_forgot_password_link(self, page):
        """Test forgot password link"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Click forgot password link
        login_page.click_forgot_password()
        
        # Verify navigation to forgot password page
        assert "forgot-password" in login_page.get_current_url(), "Should navigate to forgot password page"
    
    @pytest.mark.ui
    def test_login_button_state(self, page):
        """Test login button state"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Initially button should be enabled
        assert login_page.is_login_button_enabled(), "Login button should be enabled"
        
        # Fill form and button should remain enabled
        login_page.enter_username("test")
        login_page.enter_password("test")
        assert login_page.is_login_button_enabled(), "Login button should remain enabled"
    
    @pytest.mark.ui
    def test_form_field_values(self, page):
        """Test form field values"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Test username field
        test_username = "test_user"
        login_page.enter_username(test_username)
        assert login_page.get_username_value() == test_username, "Username field should contain entered value"
        
        # Test password field
        test_password = "test_password"
        login_page.enter_password(test_password)
        assert login_page.get_password_value() == test_password, "Password field should contain entered value"
        
        # Test clearing fields
        login_page.clear_form()
        assert login_page.get_username_value() == "", "Username field should be empty"
        assert login_page.get_password_value() == "", "Password field should be empty"
    
    @pytest.mark.ui
    @pytest.mark.slow
    def test_multiple_login_attempts(self, page):
        """Test multiple failed login attempts"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Attempt multiple failed logins
        for i in range(3):
            login_page.login(f"invalid_user_{i}", "wrong_password")
            login_page.wait_for_login_failure()
            assert login_page.is_error_visible(), f"Error should be visible after attempt {i+1}"
            
            # Clear form for next attempt
            login_page.clear_form()
    
    @pytest.mark.ui
    def test_login_page_elements_visibility(self, page):
        """Test that all login page elements are visible"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Verify all form elements are visible
        assert login_page.is_visible(login_page.USERNAME_INPUT), "Username input should be visible"
        assert login_page.is_visible(login_page.PASSWORD_INPUT), "Password input should be visible"
        assert login_page.is_visible(login_page.LOGIN_BUTTON), "Login button should be visible"
        assert login_page.is_visible(login_page.REMEMBER_ME_CHECKBOX), "Remember me checkbox should be visible"
        assert login_page.is_visible(login_page.FORGOT_PASSWORD_LINK), "Forgot password link should be visible"
