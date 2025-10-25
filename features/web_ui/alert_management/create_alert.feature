# features/web_ui/alert_management/create_alert.feature

Feature: Create Manual Alert
  As a security analyst
  I want to create manual security alerts
  So that I can track and manage security incidents

  Background:
    Given I am logged in as a security analyst
    And I am on the Alert Management dashboard

  @smoke @critical
  Scenario: Create alert with all required fields
    Given I click on "Add Alert" button
    When I fill in the alert form with:
      | Field       | Value                              |
      | Name        | Suspicious Network Activity        |
      | Description | Unusual traffic detected from IP   |
      | Severity    | Critical                          |
      | Status      | New                               |
    And I click "Submit" button
    Then the alert should be created successfully
    And I should see the alert in the alerts table
    And the alert ID should be auto-generated
    And the "Total Alerts" counter should increase by 1

  @smoke
  Scenario: Create alert with minimum required fields
    Given I click on "Add Alert" button
    When I fill in the alert form with:
      | Field    | Value                       |
      | Name     | Test Alert                  |
      | Severity | High                       |
    And I click "Submit" button
    Then the alert should be created successfully
    And the status should default to "New"

  @validation
  Scenario Outline: Validate severity selection
    Given I click on "Add Alert" button
    When I select "<Severity>" as severity level
    And I fill in the alert name as "Test Alert"
    And I submit the alert
    Then the alert should be created with severity "<Severity>"
    And the alert should appear in "<Severity>" section of the chart

    Examples:
      | Severity |
      | Critical |
      | High     |
      | Medium   |
      | Low      |

  @validation @negative
  Scenario: Attempt to create alert without required fields
    Given I click on "Add Alert" button
    When I leave the alert name empty
    And I click "Submit" button
    Then I should see validation error "Alert name is required"
    And the alert should not be created

  @tags
  Scenario: Create alert with multiple tags
    Given I click on "Add Alert" button
    When I fill in the alert name as "Tagged Alert"
    And I add tags:
      | Tag               |
      | network-security  |
      | high-priority     |
      | investigation     |
    And I submit the alert
    Then the alert should be created with 3 tags
    And I should see all tags displayed in the alert row

  @cancel
  Scenario: Cancel alert creation
    Given I click on "Add Alert" button
    When I fill in the alert name as "Test Alert"
    And I click "Cancel" button
    Then I should return to the Alert Management dashboard
    And the alert should not be created
    And the "Total Alerts" counter should remain unchanged