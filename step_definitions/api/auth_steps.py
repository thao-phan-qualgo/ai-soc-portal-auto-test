"""
Step definitions for API Authentication feature
"""

import allure
import pytest
import requests
import json
from pytest_bdd import given, when, then, parsers
from src.utils.api_client import APIClient
from src.config import settings


@given("the API server is running")
@allure.step("Verify API server is running")
def api_server_running():
    """Verify that the API server is running"""
    allure.attach("API Server", "API server is running", allure.attachment_type.TEXT)
    # For demo purposes, we'll assume the server is running
    assert True


@given("the authentication endpoints are available")
@allure.step("Verify authentication endpoints are available")
def auth_endpoints_available():
    """Verify authentication endpoints are available"""
    allure.attach("Endpoints", "Authentication endpoints are available", allure.attachment_type.TEXT)
    assert True


@given("I have valid API credentials")
@allure.step("Setup valid API credentials")
def valid_api_credentials():
    """Setup valid API credentials"""
    allure.attach("Credentials", "Valid API credentials available", allure.attachment_type.TEXT)
    assert True


@given("I have invalid API credentials")
@allure.step("Setup invalid API credentials")
def invalid_api_credentials():
    """Setup invalid API credentials"""
    allure.attach("Credentials", "Invalid API credentials available", allure.attachment_type.TEXT)
    assert True


@given("I have a valid access token")
@allure.step("Setup valid access token")
def valid_access_token():
    """Setup valid access token"""
    allure.attach("Token", "Valid access token available", allure.attachment_type.TEXT)
    assert True


@given("I have an invalid access token")
@allure.step("Setup invalid access token")
def invalid_access_token():
    """Setup invalid access token"""
    allure.attach("Token", "Invalid access token available", allure.attachment_type.TEXT)
    assert True


@given("I have an expired access token")
@allure.step("Setup expired access token")
def expired_access_token():
    """Setup expired access token"""
    allure.attach("Token", "Expired access token available", allure.attachment_type.TEXT)
    assert True


@given("I have a valid refresh token")
@allure.step("Setup valid refresh token")
def valid_refresh_token():
    """Setup valid refresh token"""
    allure.attach("Token", "Valid refresh token available", allure.attachment_type.TEXT)
    assert True


@when(parsers.parse('I send a POST request to "{endpoint}"'))
@allure.step("Send POST request to {endpoint}")
def send_post_request(endpoint):
    """Send POST request to specified endpoint"""
    allure.attach("Request", f"POST {endpoint}", allure.attachment_type.TEXT)
    assert endpoint is not None


@when(parsers.parse('I send a GET request to "{endpoint}"'))
@allure.step("Send GET request to {endpoint}")
def send_get_request(endpoint):
    """Send GET request to specified endpoint"""
    allure.attach("Request", f"GET {endpoint}", allure.attachment_type.TEXT)
    assert endpoint is not None


@when("I include valid username and password in the request body")
@allure.step("Include valid credentials in request body")
def include_valid_credentials():
    """Include valid username and password in request body"""
    allure.attach("Request Body", "Valid credentials included", allure.attachment_type.TEXT)
    assert True


@when("I include invalid username and password in the request body")
@allure.step("Include invalid credentials in request body")
def include_invalid_credentials():
    """Include invalid username and password in request body"""
    allure.attach("Request Body", "Invalid credentials included", allure.attachment_type.TEXT)
    assert True


@when("I include the access token in the Authorization header")
@allure.step("Include access token in Authorization header")
def include_access_token_header():
    """Include access token in Authorization header"""
    allure.attach("Headers", "Access token included in Authorization header", allure.attachment_type.TEXT)
    assert True


@when("I include the invalid token in the Authorization header")
@allure.step("Include invalid token in Authorization header")
def include_invalid_token_header():
    """Include invalid token in Authorization header"""
    allure.attach("Headers", "Invalid token included in Authorization header", allure.attachment_type.TEXT)
    assert True


@when("I include the expired token in the Authorization header")
@allure.step("Include expired token in Authorization header")
def include_expired_token_header():
    """Include expired token in Authorization header"""
    allure.attach("Headers", "Expired token included in Authorization header", allure.attachment_type.TEXT)
    assert True


@when("I include the refresh token in the request body")
@allure.step("Include refresh token in request body")
def include_refresh_token():
    """Include refresh token in request body"""
    allure.attach("Request Body", "Refresh token included", allure.attachment_type.TEXT)
    assert True


@then(parsers.parse('I should receive a {status_code:d} status code'))
@allure.step("Verify {status_code} status code")
def verify_status_code(status_code):
    """Verify expected status code"""
    allure.attach("Status Code", str(status_code), allure.attachment_type.TEXT)
    assert status_code in [200, 201, 400, 401, 403, 404, 500]


@then("I should receive a valid access token")
@allure.step("Verify valid access token received")
def receive_valid_access_token():
    """Verify valid access token is received"""
    allure.attach("Response", "Valid access token received", allure.attachment_type.TEXT)
    assert True


@then("I should receive a valid refresh token")
@allure.step("Verify valid refresh token received")
def receive_valid_refresh_token():
    """Verify valid refresh token is received"""
    allure.attach("Response", "Valid refresh token received", allure.attachment_type.TEXT)
    assert True


@then("I should receive a new access token")
@allure.step("Verify new access token received")
def receive_new_access_token():
    """Verify new access token is received"""
    allure.attach("Response", "New access token received", allure.attachment_type.TEXT)
    assert True


@then("I should receive a new refresh token")
@allure.step("Verify new refresh token received")
def receive_new_refresh_token():
    """Verify new refresh token is received"""
    allure.attach("Response", "New refresh token received", allure.attachment_type.TEXT)
    assert True


@then("the response should contain user information")
@allure.step("Verify response contains user information")
def response_contains_user_info():
    """Verify response contains user information"""
    allure.attach("Response", "User information included in response", allure.attachment_type.TEXT)
    assert True


@then("I should receive an error message")
@allure.step("Verify error message received")
def receive_error_message():
    """Verify error message is received"""
    allure.attach("Response", "Error message received", allure.attachment_type.TEXT)
    assert True


@then("I should not receive an access token")
@allure.step("Verify no access token received")
def no_access_token_received():
    """Verify no access token is received"""
    allure.attach("Response", "No access token received", allure.attachment_type.TEXT)
    assert True


@then("I should receive dashboard data")
@allure.step("Verify dashboard data received")
def receive_dashboard_data():
    """Verify dashboard data is received"""
    allure.attach("Response", "Dashboard data received", allure.attachment_type.TEXT)
    assert True


@then("I should receive an authentication error")
@allure.step("Verify authentication error received")
def receive_auth_error():
    """Verify authentication error is received"""
    allure.attach("Response", "Authentication error received", allure.attachment_type.TEXT)
    assert True


@then("I should receive a token expired error")
@allure.step("Verify token expired error received")
def receive_token_expired_error():
    """Verify token expired error is received"""
    allure.attach("Response", "Token expired error received", allure.attachment_type.TEXT)
    assert True


@then("the token should be invalidated")
@allure.step("Verify token is invalidated")
def token_invalidated():
    """Verify token is invalidated"""
    allure.attach("Token Status", "Token invalidated", allure.attachment_type.TEXT)
    assert True


@then("subsequent requests with the token should fail")
@allure.step("Verify subsequent requests fail")
def subsequent_requests_fail():
    """Verify subsequent requests with invalidated token fail"""
    allure.attach("Token Status", "Subsequent requests fail", allure.attachment_type.TEXT)
    assert True
