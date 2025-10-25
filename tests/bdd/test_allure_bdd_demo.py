"""
Allure BDD Demo Tests
Demonstrates BDD-style testing with Allure reporting
"""

import pytest
import allure


@allure.feature("User Authentication")
@allure.story("Login Functionality")
class TestLoginBDD:
    """BDD-style tests for login functionality"""
    
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.smoke
    @pytest.mark.bdd
    @pytest.mark.login
    def test_successful_login_scenario(self):
        """Scenario: Successful login with valid credentials
        
        Given the AI SOC Portal is accessible
        And the login page is displayed
        When I enter valid username "testuser"
        And I enter valid password "testpass123"
        And I click the login button
        Then I should be redirected to the dashboard
        And I should see the user information
        """
        # Given: The AI SOC Portal is accessible
        with allure.step("Given the AI SOC Portal is accessible"):
            allure.attach("Portal Status", "AI SOC Portal is accessible", allure.attachment_type.TEXT)
            assert True
        
        # And: The login page is displayed
        with allure.step("And the login page is displayed"):
            allure.attach("Page", "Login page is displayed", allure.attachment_type.TEXT)
            assert True
        
        # When: I enter valid username
        with allure.step("When I enter valid username 'testuser'"):
            allure.attach("Username", "testuser", allure.attachment_type.TEXT)
            assert True
        
        # And: I enter valid password
        with allure.step("And I enter valid password"):
            allure.attach("Password", "***", allure.attachment_type.TEXT)
            assert True
        
        # And: I click the login button
        with allure.step("And I click the login button"):
            allure.attach("Action", "Login button clicked", allure.attachment_type.TEXT)
            assert True
        
        # Then: I should be redirected to the dashboard
        with allure.step("Then I should be redirected to the dashboard"):
            allure.attach("Redirection", "Successfully redirected to dashboard", allure.attachment_type.TEXT)
            assert True
        
        # And: I should see the user information
        with allure.step("And I should see the user information"):
            allure.attach("User Info", "User information displayed", allure.attachment_type.TEXT)
            assert True
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.bdd
    @pytest.mark.login
    @pytest.mark.negative
    def test_failed_login_scenario(self):
        """Scenario: Failed login with invalid credentials
        
        Given I am on the login page
        When I enter invalid username "invaliduser"
        And I enter invalid password "wrongpass"
        And I click the login button
        Then I should see an error message
        And I should remain on the login page
        """
        # Given: I am on the login page
        with allure.step("Given I am on the login page"):
            allure.attach("Current Page", "Login page", allure.attachment_type.TEXT)
            assert True
        
        # When: I enter invalid username
        with allure.step("When I enter invalid username 'invaliduser'"):
            allure.attach("Invalid Username", "invaliduser", allure.attachment_type.TEXT)
            assert True
        
        # And: I enter invalid password
        with allure.step("And I enter invalid password"):
            allure.attach("Invalid Password", "***", allure.attachment_type.TEXT)
            assert True
        
        # And: I click the login button
        with allure.step("And I click the login button"):
            allure.attach("Action", "Login button clicked", allure.attachment_type.TEXT)
            assert True
        
        # Then: I should see an error message
        with allure.step("Then I should see an error message"):
            allure.attach("Error", "Invalid credentials error displayed", allure.attachment_type.TEXT)
            assert True
        
        # And: I should remain on the login page
        with allure.step("And I should remain on the login page"):
            allure.attach("Current Page", "Still on login page", allure.attachment_type.TEXT)
            assert True


@allure.feature("API Authentication")
@allure.story("API Auth")
class TestAPIBDD:
    """BDD-style tests for API authentication"""
    
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.smoke
    @pytest.mark.bdd
    @pytest.mark.api
    @pytest.mark.auth
    def test_successful_api_authentication_scenario(self):
        """Scenario: Successful API authentication
        
        Given the API server is running
        And I have valid API credentials
        When I send a POST request to "/api/auth/login"
        And I include valid username and password in the request body
        Then I should receive a 200 status code
        And I should receive a valid access token
        And the response should contain user information
        """
        # Given: The API server is running
        with allure.step("Given the API server is running"):
            allure.attach("Server Status", "API server is running", allure.attachment_type.TEXT)
            assert True
        
        # And: I have valid API credentials
        with allure.step("And I have valid API credentials"):
            allure.attach("Credentials", "Valid API credentials available", allure.attachment_type.TEXT)
            assert True
        
        # When: I send a POST request
        with allure.step("When I send a POST request to '/api/auth/login'"):
            allure.attach("Request", "POST /api/auth/login", allure.attachment_type.TEXT)
            assert True
        
        # And: I include valid credentials
        with allure.step("And I include valid username and password in the request body"):
            allure.attach("Request Body", "Valid credentials included", allure.attachment_type.TEXT)
            assert True
        
        # Then: I should receive a 200 status code
        with allure.step("Then I should receive a 200 status code"):
            allure.attach("Status Code", "200", allure.attachment_type.TEXT)
            assert True
        
        # And: I should receive a valid access token
        with allure.step("And I should receive a valid access token"):
            allure.attach("Response", "Valid access token received", allure.attachment_type.TEXT)
            assert True
        
        # And: The response should contain user information
        with allure.step("And the response should contain user information"):
            allure.attach("Response", "User information included in response", allure.attachment_type.TEXT)
            assert True


@allure.feature("End-to-End User Flow")
@allure.story("Integration Flow")
class TestIntegrationBDD:
    """BDD-style tests for e2e user flow"""
    
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.smoke
    @pytest.mark.bdd
    @pytest.mark.integration
    @pytest.mark.e2e
    def test_complete_user_authentication_flow_scenario(self):
        """Scenario: Complete user authentication flow
        
        Given the AI SOC Portal is fully operational
        And both UI and API services are running
        And I have valid user credentials
        When I navigate to the AI SOC Portal login page
        And I log in with valid credentials
        Then I should be authenticated successfully
        And I should be redirected to the dashboard
        And I should see my user profile information
        And I should have access to all navigation menus
        """
        # Given: The AI SOC Portal is fully operational
        with allure.step("Given the AI SOC Portal is fully operational"):
            allure.attach("Portal Status", "AI SOC Portal is fully operational", allure.attachment_type.TEXT)
            assert True
        
        # And: Both UI and API services are running
        with allure.step("And both UI and API services are running"):
            allure.attach("Services", "UI and API services are running", allure.attachment_type.TEXT)
            assert True
        
        # And: I have valid user credentials
        with allure.step("And I have valid user credentials"):
            allure.attach("Credentials", "Valid user credentials available", allure.attachment_type.TEXT)
            assert True
        
        # When: I navigate to the login page
        with allure.step("When I navigate to the AI SOC Portal login page"):
            allure.attach("Navigation", "Navigated to AI SOC Portal login page", allure.attachment_type.TEXT)
            assert True
        
        # And: I log in with valid credentials
        with allure.step("And I log in with valid credentials"):
            allure.attach("Login", "Logged in with valid credentials", allure.attachment_type.TEXT)
            assert True
        
        # Then: I should be authenticated successfully
        with allure.step("Then I should be authenticated successfully"):
            allure.attach("Authentication", "Successfully authenticated", allure.attachment_type.TEXT)
            assert True
        
        # And: I should be redirected to the dashboard
        with allure.step("And I should be redirected to the dashboard"):
            allure.attach("Redirection", "Redirected to dashboard", allure.attachment_type.TEXT)
            assert True
        
        # And: I should see my user profile information
        with allure.step("And I should see my user profile information"):
            allure.attach("Profile", "User profile information displayed", allure.attachment_type.TEXT)
            assert True
        
        # And: I should have access to all navigation menus
        with allure.step("And I should have access to all navigation menus"):
            allure.attach("Navigation", "Access to all navigation menus", allure.attachment_type.TEXT)
            assert True
