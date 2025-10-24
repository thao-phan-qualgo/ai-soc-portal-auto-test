@api @auth
Feature: Authentication and authorization

  Scenario: Obtain access token
    When I POST "/auth/login" with valid credentials
    Then response code is 200
    And body contains "access_token" and "expires_in"

  Scenario: Access protected endpoint without token
    When I GET "/api/devices"
    Then response code is 401

  Scenario: Role cannot delete device
    Given I have a token for role "Viewer"
    When I DELETE "/api/devices/{id}"
    Then response code is 403
