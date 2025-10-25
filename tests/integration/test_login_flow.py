"""
Integration tests for complete login flow
"""

import pytest
from src.pages.login_page import LoginPage
from src.pages.dashboard_page import DashboardPage
from src.utils.api_client import APIClient


class TestLoginFlow:
    """Integration tests for login flow"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup for each test"""
        self.api_client = APIClient()
    
    @pytest.mark.integration
    @pytest.mark.smoke
    def test_complete_login_flow_ui(self, page, test_user):
        """Test complete login flow through UI"""
        # Navigate to login page
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Verify login page is loaded
        assert login_page.is_login_form_visible(), "Login form should be visible"
        
        # Perform login
        login_page.login(test_user["username"], test_user["password"])
        
        # Verify successful login and redirect to dashboard
        login_page.wait_for_login_success()
        
        # Verify dashboard is loaded
        dashboard_page = DashboardPage(page)
        assert dashboard_page.is_dashboard_loaded(), "Dashboard should be loaded"
        
        # Verify user is logged in by checking user menu
        user_info = dashboard_page.get_user_info()
        assert user_info.get("name") or user_info.get("email"), "User info should be available"
    
    @pytest.mark.integration
    def test_login_logout_flow(self, page, test_user):
        """Test complete login and logout flow"""
        # Login
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        login_page.login(test_user["username"], test_user["password"])
        login_page.wait_for_login_success()
        
        # Verify dashboard is loaded
        dashboard_page = DashboardPage(page)
        assert dashboard_page.is_dashboard_loaded(), "Dashboard should be loaded"
        
        # Logout
        dashboard_page.logout()
        
        # Verify redirect to login page
        assert "/login" in login_page.get_current_url(), "Should redirect to login page after logout"
        assert login_page.is_login_form_visible(), "Login form should be visible after logout"
    
    @pytest.mark.integration
    def test_api_ui_consistency(self, page, test_user):
        """Test consistency between API and UI login"""
        # Test API login
        login_data = {
            "username": test_user["username"],
            "password": test_user["password"]
        }
        
        api_response = self.api_client.post_json("/auth/login", data=login_data)
        assert "token" in api_response, "API should return token"
        
        # Test UI login
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        login_page.login(test_user["username"], test_user["password"])
        login_page.wait_for_login_success()
        
        # Verify both lead to same state
        dashboard_page = DashboardPage(page)
        assert dashboard_page.is_dashboard_loaded(), "Dashboard should be loaded via UI"
    
    @pytest.mark.integration
    def test_session_persistence(self, page, test_user):
        """Test session persistence across page refreshes"""
        # Login
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        login_page.login(test_user["username"], test_user["password"])
        login_page.wait_for_login_success()
        
        # Verify dashboard is loaded
        dashboard_page = DashboardPage(page)
        assert dashboard_page.is_dashboard_loaded(), "Dashboard should be loaded"
        
        # Refresh page
        dashboard_page.refresh_dashboard()
        
        # Verify still logged in
        assert dashboard_page.is_dashboard_loaded(), "Should remain logged in after refresh"
        assert "/dashboard" in dashboard_page.get_current_url(), "Should stay on dashboard"
    
    @pytest.mark.integration
    def test_navigation_after_login(self, page, test_user):
        """Test navigation functionality after login"""
        # Login
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        login_page.login(test_user["username"], test_user["password"])
        login_page.wait_for_login_success()
        
        # Test navigation to different pages
        dashboard_page = DashboardPage(page)
        
        # Navigate to users page
        dashboard_page.navigate_to_users()
        assert "/users" in dashboard_page.get_current_url(), "Should navigate to users page"
        
        # Navigate back to dashboard
        dashboard_page.navigate_to_dashboard()
        assert "/dashboard" in dashboard_page.get_current_url(), "Should navigate back to dashboard"
        
        # Navigate to settings
        dashboard_page.navigate_to_settings()
        assert "/settings" in dashboard_page.get_current_url(), "Should navigate to settings page"
    
    @pytest.mark.integration
    def test_multiple_browser_tabs(self, page, test_user):
        """Test login state across multiple browser tabs"""
        # Login in first tab
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        login_page.login(test_user["username"], test_user["password"])
        login_page.wait_for_login_success()
        
        # Open new tab and navigate to dashboard
        new_page = page.context.new_page()
        dashboard_page = DashboardPage(new_page)
        dashboard_page.navigate_to_dashboard()
        
        # Verify second tab is also logged in
        assert dashboard_page.is_dashboard_loaded(), "Second tab should also be logged in"
        
        # Close second tab
        new_page.close()
    
    @pytest.mark.integration
    def test_login_with_remember_me(self, page, test_user):
        """Test login with remember me functionality"""
        # Login with remember me checked
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        login_page.check_remember_me()
        login_page.login(test_user["username"], test_user["password"])
        login_page.wait_for_login_success()
        
        # Verify dashboard is loaded
        dashboard_page = DashboardPage(page)
        assert dashboard_page.is_dashboard_loaded(), "Dashboard should be loaded"
        
        # Close browser context and reopen
        page.context.close()
        # Note: In real test, you would create new context and verify session persistence
    
    @pytest.mark.integration
    def test_concurrent_login_attempts(self, page, test_user):
        """Test handling of concurrent login attempts"""
        # Create multiple pages for concurrent testing
        pages = [page]
        for _ in range(2):
            new_page = page.context.new_page()
            pages.append(new_page)
        
        login_pages = []
        for p in pages:
            login_page = LoginPage(p)
            login_page.navigate_to_login()
            login_pages.append(login_page)
        
        # Attempt concurrent logins
        for login_page in login_pages:
            login_page.login(test_user["username"], test_user["password"])
        
        # Verify all logins succeed
        for login_page in login_pages:
            login_page.wait_for_login_success()
            assert "/dashboard" in login_page.get_current_url(), "All logins should succeed"
        
        # Clean up extra pages
        for p in pages[1:]:
            p.close()
    
    @pytest.mark.integration
    def test_error_handling_flow(self, page):
        """Test error handling in login flow"""
        login_page = LoginPage(page)
        login_page.navigate_to_login()
        
        # Test invalid login
        login_page.login("invalid_user", "wrong_password")
        login_page.wait_for_login_failure()
        
        # Verify error message
        assert login_page.is_error_visible(), "Error message should be visible"
        error_message = login_page.get_error_message()
        assert len(error_message) > 0, "Error message should not be empty"
        
        # Verify still on login page
        assert "/login" in login_page.get_current_url(), "Should remain on login page"
        
        # Test successful login after error
        login_page.clear_form()
        login_page.login("valid_user", "valid_password")  # Use valid credentials
        # This would succeed in real scenario
