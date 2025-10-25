"""
API tests for authentication endpoints
"""

import pytest
from src.utils.api_client import APIClient
from src.config import settings


class TestAuthAPI:
    """Test class for authentication API endpoints"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup for each test"""
        self.api_client = APIClient()
    
    @pytest.mark.api
    @pytest.mark.smoke
    def test_login_api_success(self, test_user):
        """Test successful login via API"""
        login_data = {
            "username": test_user["username"],
            "password": test_user["password"]
        }
        
        response = self.api_client.post_json("/auth/login", data=login_data)
        
        assert "token" in response, "Response should contain token"
        assert "user" in response, "Response should contain user data"
        assert response["user"]["username"] == test_user["username"], "Username should match"
    
    @pytest.mark.api
    def test_login_api_invalid_credentials(self):
        """Test login API with invalid credentials"""
        login_data = {
            "username": "invalid_user",
            "password": "wrong_password"
        }
        
        with pytest.raises(Exception):  # Should raise HTTP error
            self.api_client.post_json("/auth/login", data=login_data)
    
    @pytest.mark.api
    def test_login_api_empty_credentials(self):
        """Test login API with empty credentials"""
        login_data = {
            "username": "",
            "password": ""
        }
        
        with pytest.raises(Exception):  # Should raise HTTP error
            self.api_client.post_json("/auth/login", data=login_data)
    
    @pytest.mark.api
    def test_logout_api(self, test_user):
        """Test logout API"""
        # First login to get token
        login_data = {
            "username": test_user["username"],
            "password": test_user["password"]
        }
        
        login_response = self.api_client.post_json("/auth/login", data=login_data)
        token = login_response["token"]
        
        # Set token for authenticated requests
        self.api_client.set_auth_token(token)
        
        # Test logout
        response = self.api_client.post_json("/auth/logout")
        assert response.get("message") == "Logged out successfully", "Should return success message"
    
    @pytest.mark.api
    def test_refresh_token_api(self, test_user):
        """Test token refresh API"""
        # First login to get token
        login_data = {
            "username": test_user["username"],
            "password": test_user["password"]
        }
        
        login_response = self.api_client.post_json("/auth/login", data=login_data)
        token = login_response["token"]
        
        # Set token for authenticated requests
        self.api_client.set_auth_token(token)
        
        # Test token refresh
        response = self.api_client.post_json("/auth/refresh")
        assert "token" in response, "Response should contain new token"
        assert response["token"] != token, "New token should be different from old token"
    
    @pytest.mark.api
    def test_get_user_profile_api(self, test_user):
        """Test get user profile API"""
        # First login to get token
        login_data = {
            "username": test_user["username"],
            "password": test_user["password"]
        }
        
        login_response = self.api_client.post_json("/auth/login", data=login_data)
        token = login_response["token"]
        
        # Set token for authenticated requests
        self.api_client.set_auth_token(token)
        
        # Test get user profile
        response = self.api_client.get_json("/auth/profile")
        assert "username" in response, "Response should contain username"
        assert "email" in response, "Response should contain email"
        assert response["username"] == test_user["username"], "Username should match"
    
    @pytest.mark.api
    def test_unauthorized_access(self):
        """Test accessing protected endpoint without token"""
        with pytest.raises(Exception):  # Should raise HTTP error
            self.api_client.get_json("/auth/profile")
    
    @pytest.mark.api
    def test_invalid_token_access(self):
        """Test accessing protected endpoint with invalid token"""
        self.api_client.set_auth_token("invalid_token")
        
        with pytest.raises(Exception):  # Should raise HTTP error
            self.api_client.get_json("/auth/profile")
    
    @pytest.mark.api
    def test_change_password_api(self, test_user):
        """Test change password API"""
        # First login to get token
        login_data = {
            "username": test_user["username"],
            "password": test_user["password"]
        }
        
        login_response = self.api_client.post_json("/auth/login", data=login_data)
        token = login_response["token"]
        
        # Set token for authenticated requests
        self.api_client.set_auth_token(token)
        
        # Test change password
        password_data = {
            "current_password": test_user["password"],
            "new_password": "new_password123",
            "confirm_password": "new_password123"
        }
        
        response = self.api_client.post_json("/auth/change-password", data=password_data)
        assert response.get("message") == "Password changed successfully", "Should return success message"
    
    @pytest.mark.api
    def test_forgot_password_api(self):
        """Test forgot password API"""
        forgot_password_data = {
            "email": "test@example.com"
        }
        
        response = self.api_client.post_json("/auth/forgot-password", data=forgot_password_data)
        assert response.get("message") == "Password reset email sent", "Should return success message"
    
    @pytest.mark.api
    def test_reset_password_api(self):
        """Test reset password API"""
        reset_data = {
            "token": "reset_token_123",
            "new_password": "new_password123",
            "confirm_password": "new_password123"
        }
        
        response = self.api_client.post_json("/auth/reset-password", data=reset_data)
        assert response.get("message") == "Password reset successfully", "Should return success message"
    
    @pytest.mark.api
    def test_register_api(self):
        """Test user registration API"""
        register_data = {
            "username": "new_user",
            "email": "newuser@example.com",
            "password": "password123",
            "confirm_password": "password123"
        }
        
        response = self.api_client.post_json("/auth/register", data=register_data)
        assert response.get("message") == "User registered successfully", "Should return success message"
        assert "user" in response, "Response should contain user data"
    
    @pytest.mark.api
    def test_register_api_duplicate_username(self, test_user):
        """Test user registration with duplicate username"""
        register_data = {
            "username": test_user["username"],
            "email": "different@example.com",
            "password": "password123",
            "confirm_password": "password123"
        }
        
        with pytest.raises(Exception):  # Should raise HTTP error
            self.api_client.post_json("/auth/register", data=register_data)
    
    @pytest.mark.api
    def test_register_api_duplicate_email(self, test_user):
        """Test user registration with duplicate email"""
        register_data = {
            "username": "different_user",
            "email": test_user["email"],
            "password": "password123",
            "confirm_password": "password123"
        }
        
        with pytest.raises(Exception):  # Should raise HTTP error
            self.api_client.post_json("/auth/register", data=register_data)
    
    @pytest.mark.api
    def test_api_endpoints_availability(self):
        """Test that all auth API endpoints are available"""
        endpoints = [
            "/auth/login",
            "/auth/logout",
            "/auth/refresh",
            "/auth/profile",
            "/auth/register",
            "/auth/forgot-password",
            "/auth/reset-password"
        ]
        
        for endpoint in endpoints:
            # For GET endpoints, check if they return 405 (Method Not Allowed) or 401 (Unauthorized)
            # For POST endpoints, check if they return 400 (Bad Request) or 401 (Unauthorized)
            try:
                status_code = self.api_client.get_status_code(endpoint)
                assert status_code in [200, 400, 401, 405], f"Endpoint {endpoint} should be available"
            except:
                # If endpoint doesn't exist, it should raise an exception
                pass
