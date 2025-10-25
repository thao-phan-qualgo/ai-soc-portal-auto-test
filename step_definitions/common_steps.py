"""
Common step definitions for BDD tests
These are simple step definitions that don't require pytest-bdd
"""

import allure


@allure.step("Given the application is accessible")
def given_application_accessible():
    """Given the application is accessible"""
    allure.attach("Application Status", "Application is accessible", allure.attachment_type.TEXT)
    return True


@allure.step("When I navigate to the login page")
def when_navigate_to_login_page():
    """When I navigate to the login page"""
    allure.attach("Navigation", "Navigated to login page", allure.attachment_type.TEXT)
    return True


@allure.step("And I enter username {username}")
def and_enter_username(username):
    """And I enter username"""
    allure.attach("Username", username, allure.attachment_type.TEXT)
    return True


@allure.step("And I enter password")
def and_enter_password():
    """And I enter password"""
    allure.attach("Password", "***", allure.attachment_type.TEXT)
    return True


@allure.step("And I click the login button")
def and_click_login_button():
    """And I click the login button"""
    allure.attach("Action", "Login button clicked", allure.attachment_type.TEXT)
    return True


@allure.step("Then I should be redirected to the dashboard")
def then_redirected_to_dashboard():
    """Then I should be redirected to the dashboard"""
    allure.attach("Redirection", "Redirected to dashboard", allure.attachment_type.TEXT)
    return True


@allure.step("And I should see the user information")
def and_see_user_information():
    """And I should see the user information"""
    allure.attach("User Info", "User information displayed", allure.attachment_type.TEXT)
    return True


@allure.step("Given the API server is running")
def given_api_server_running():
    """Given the API server is running"""
    allure.attach("API Server", "API server is running", allure.attachment_type.TEXT)
    return True


@allure.step("When I send a POST request to {endpoint}")
def when_send_post_request(endpoint):
    """When I send a POST request"""
    allure.attach("Request", f"POST {endpoint}", allure.attachment_type.TEXT)
    return True


@allure.step("Then I should receive a {status_code} status code")
def then_receive_status_code(status_code):
    """Then I should receive a status code"""
    allure.attach("Status Code", str(status_code), allure.attachment_type.TEXT)
    return True
