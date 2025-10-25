"""
BDD tests for API Authentication feature
"""

import pytest
from pytest_bdd import scenarios
import allure

# Import step definitions
from step_definitions.api.auth_steps import *

# Load scenarios from feature file
scenarios("../../features/api/authentication.feature")


@allure.feature("API Authentication")
@allure.story("API Auth")
class TestAPIAuthentication:
    """BDD tests for API Authentication functionality"""
    
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.smoke
    @pytest.mark.api
    @pytest.mark.auth
    def test_successful_api_authentication(self):
        """Test successful API authentication"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.api
    @pytest.mark.auth
    @pytest.mark.negative
    def test_failed_api_authentication_with_invalid_credentials(self):
        """Test failed API authentication with invalid credentials"""
        pass
    
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.api
    @pytest.mark.auth
    @pytest.mark.token
    def test_access_protected_endpoint_with_valid_token(self):
        """Test access protected endpoint with valid token"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.api
    @pytest.mark.auth
    @pytest.mark.token
    @pytest.mark.negative
    def test_access_protected_endpoint_with_invalid_token(self):
        """Test access protected endpoint with invalid token"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.api
    @pytest.mark.auth
    @pytest.mark.token
    @pytest.mark.expired
    def test_access_protected_endpoint_with_expired_token(self):
        """Test access protected endpoint with expired token"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.api
    @pytest.mark.auth
    @pytest.mark.refresh
    def test_refresh_access_token(self):
        """Test refresh access token"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.api
    @pytest.mark.auth
    @pytest.mark.logout
    def test_logout_and_invalidate_token(self):
        """Test logout and invalidate token"""
        pass
