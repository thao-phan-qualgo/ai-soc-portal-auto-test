Feature: End-to-End User Flow
  As a security analyst using the AI SOC Portal
  I want to complete a full workflow from login to dashboard
  So that I can effectively manage security operations

  Background:
    Given the AI SOC Portal is fully operational
    And both UI and API services are running
    And I have valid user credentials

  @smoke @integration @e2e
  Scenario: Complete user authentication flow
    Given I am a security analyst
    When I navigate to the AI SOC Portal login page
    And I log in with valid credentials
    Then I should be authenticated successfully
    And I should be redirected to the dashboard
    And I should see my user profile information
    And I should have access to all navigation menus
