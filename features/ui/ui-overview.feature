@ui @overview
Feature: Overview dashboard shows correct widgets and navigation

  Background:
    Given I am logged in as a valid user
    And I open "https://dev-aisoc-fe.qualgo.dev/account/01K4RR1KKGF35ZQN2ECXD8YCXJ/organization/01K4RRH3MGQKCE6EANT9AFB2H9/overview"

  Scenario: Load all overview widgets successfully
    When the page finishes loading
    Then I should see "Security Posture Overview"
    And I should see a card "Critical Assets" with a numeric value
    And I should see a donut chart "Devices by Criticality"
    And I should see a bar chart "Top 5 OS System"
    And I should see a table "Devices by Protection" with columns "Device Name, Criticality, Score, Antivirus, Firewall"

  Scenario: Navigate to Endpoint Devices from Devices by Protection row
    When I click a device link in "Devices by Protection"
    Then I should be navigated to the "Endpoint Devices" page
    And the device row should be visible in the table
