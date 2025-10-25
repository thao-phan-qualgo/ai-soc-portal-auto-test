Feature: API Authentication
  As a developer using the AI SOC Portal API
  I want to authenticate and access protected endpoints
  So that I can manage security operations programmatically

  Background:
    Given the API server is running
    And the authentication endpoints are available

  @smoke @api @auth
  Scenario: Successful API authentication
    Given I have valid API credentials
    When I send a POST request to "/api/auth/login"
    And I include valid username and password in the request body
    Then I should receive a 200 status code
    And I should receive a valid access token
    And the response should contain user information

  @api @auth @negative
  Scenario: Failed API authentication with invalid credentials
    Given I have invalid API credentials
    When I send a POST request to "/api/auth/login"
    And I include invalid username and password in the request body
    Then I should receive a 401 status code
    And I should receive an error message
    And I should not receive an access token

  @api @auth @token
  Scenario: Access protected endpoint with valid token
    Given I have a valid access token
    When I send a GET request to "/api/dashboard"
    And I include the access token in the Authorization header
    Then I should receive a 200 status code
    And I should receive dashboard data

  @api @auth @token @negative
  Scenario: Access protected endpoint with invalid token
    Given I have an invalid access token
    When I send a GET request to "/api/dashboard"
    And I include the invalid token in the Authorization header
    Then I should receive a 401 status code
    And I should receive an authentication error

  @api @auth @token @expired
  Scenario: Access protected endpoint with expired token
    Given I have an expired access token
    When I send a GET request to "/api/dashboard"
    And I include the expired token in the Authorization header
    Then I should receive a 401 status code
    And I should receive a token expired error

  @api @auth @refresh
  Scenario: Refresh access token
    Given I have a valid refresh token
    When I send a POST request to "/api/auth/refresh"
    And I include the refresh token in the request body
    Then I should receive a 200 status code
    And I should receive a new access token
    And I should receive a new refresh token

  @api @auth @logout
  Scenario: Logout and invalidate token
    Given I have a valid access token
    When I send a POST request to "/api/auth/logout"
    And I include the access token in the Authorization header
    Then I should receive a 200 status code
    And the token should be invalidated
    And subsequent requests with the token should fail
