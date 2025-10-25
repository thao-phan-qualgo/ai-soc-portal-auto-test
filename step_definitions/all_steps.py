"""
All step definitions for BDD tests
This file aggregates all step definitions for Cucumber AutoComplete
"""

# Import common steps
from .common_steps import *

# Try to import pytest-bdd steps if available
try:
    from .web_ui.login_steps import *
    from .api.auth_steps import *
    from .e2e.user_flow_steps import *
    print("All pytest-bdd step definitions imported successfully")
except ImportError as e:
    print(f"pytest-bdd step definitions not available: {e}")
    print("Using common step definitions only")

# Define step patterns for Cucumber AutoComplete
STEP_PATTERNS = [
    # UI Steps
    "Given the AI SOC Portal is accessible",
    "Given the login page is displayed", 
    "Given I am on the login page",
    "When I enter valid username \"{username}\"",
    "When I enter valid password \"{password}\"",
    "When I enter invalid username \"{username}\"",
    "When I enter invalid password \"{password}\"",
    "When I leave the username field empty",
    "When I leave the password field empty",
    "When I enter username with special characters \"{username}\"",
    "When I enter password with special characters \"{password}\"",
    "When I enter valid credentials",
    "When I click the login button",
    "Then I should be redirected to the dashboard",
    "Then I should see the user information",
    "Then I should see the navigation menu",
    "Then I should see an error message",
    "Then I should remain on the login page",
    "Then I should see validation errors",
    "Then the login button should be disabled",
    "Then the login should complete within 3 seconds",
    
    # API Steps
    "Given the API server is running",
    "Given the authentication endpoints are available",
    "Given I have valid API credentials",
    "Given I have invalid API credentials",
    "Given I have a valid access token",
    "Given I have an invalid access token",
    "Given I have an expired access token",
    "Given I have a valid refresh token",
    "When I send a POST request to \"{endpoint}\"",
    "When I send a GET request to \"{endpoint}\"",
    "When I include valid username and password in the request body",
    "When I include invalid username and password in the request body",
    "When I include the access token in the Authorization header",
    "When I include the invalid token in the Authorization header",
    "When I include the expired token in the Authorization header",
    "When I include the refresh token in the request body",
    "Then I should receive a {status_code} status code",
    "Then I should receive a valid access token",
    "Then I should receive a valid refresh token",
    "Then I should receive a new access token",
    "Then I should receive a new refresh token",
    "Then the response should contain user information",
    "Then I should receive an error message",
    "Then I should not receive an access token",
    "Then I should receive dashboard data",
    "Then I should receive an authentication error",
    "Then I should receive a token expired error",
    "Then the token should be invalidated",
    "Then subsequent requests with the token should fail",
    
    # Integration Steps
    "Given the AI SOC Portal is fully operational",
    "Given both UI and API services are running",
    "Given I have valid user credentials",
    "Given I am a security analyst",
    "Given I have successfully logged in to the portal",
    "Given I am logged in to the portal",
    "When I navigate to the AI SOC Portal login page",
    "When I log in with valid credentials",
    "When I navigate to different pages within the portal",
    "When I attempt to access protected resources",
    "When I navigate through the application",
    "When I encounter an error condition",
    "When I view data in the UI",
    "When I retrieve the same data via API",
    "Then I should be authenticated successfully",
    "Then I should be redirected to the dashboard",
    "Then I should see my user profile information",
    "Then I should have access to all navigation menus",
    "Then my session should remain active",
    "Then I should not be prompted to log in again",
    "Then my user context should be maintained",
    "Then my access should be validated",
    "Then I should only see resources I have permission to access",
    "Then security logs should be generated",
    "Then page load times should be acceptable",
    "Then API responses should be within expected time limits",
    "Then the user experience should be smooth",
    "Then I should receive appropriate error messages",
    "Then the application should remain stable",
    "Then I should be able to recover from the error",
    "Then the data should be consistent",
    "Then updates should be reflected in both interfaces",
    "Then data integrity should be maintained"
]

# Export step patterns for Cucumber AutoComplete
__all__ = ['STEP_PATTERNS'] + [name for name in globals() if not name.startswith('_')]
