"""
BDD tests for UI Login feature
"""

import pytest
from pytest_bdd import scenarios
import allure

# Import step definitions
from step_definitions.web_ui.login_steps import *

# Load scenarios from feature file
scenarios("../../features/web_ui/login.feature")


@allure.feature("User Authentication")
@allure.story("UI Login")
class TestUILogin:
    """BDD tests for UI Login functionality"""
    
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.smoke
    @pytest.mark.ui
    @pytest.mark.login
    def test_successful_login_with_valid_credentials(self):
        """Test successful login with valid credentials"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.ui
    @pytest.mark.login
    @pytest.mark.negative
    def test_failed_login_with_invalid_credentials(self):
        """Test failed login with invalid credentials"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.ui
    @pytest.mark.login
    @pytest.mark.validation
    def test_login_form_validation(self):
        """Test login form validation"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.ui
    @pytest.mark.login
    @pytest.mark.security
    def test_login_with_special_characters_in_credentials(self):
        """Test login with special characters in credentials"""
        pass
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.ui
    @pytest.mark.login
    @pytest.mark.performance
    def test_login_performance_test(self):
        """Test login performance"""
        pass
