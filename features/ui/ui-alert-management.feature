@ui @soc @alerts
Feature: Alert Management dashboard

  Background:
    Given I am on Alert Managament Dashboard

  Scenario: Dashboard header and summary cards
    Then I should see title "Alert Management"
    And I should see summary cards "Total Alerts, Alerts by Severity, Alerts by Status, Avg. mean Time to Detection, Avg. mean Time to Response, False Positive Rate, MITRE ATT&CK Coverage"

  Scenario: Time range quick filters
    When I click the "30D" range
    Then the date range label shows a span of 30 days
    And the list refreshes

  Scenario: Search alerts by name
    When I type "Suspicious Network Activity" into Search by Name
    Then all visible rows contain "Suspicious Network Activity" in "Alerts Name"

  Scenario: Row actions visibility
    Then each row shows "More Info" and "View" icons in Action column
