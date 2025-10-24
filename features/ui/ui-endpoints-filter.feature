@ui @endpoints @filter
Feature: Endpoint Devices - filter panel interactions

  Background:
    Given I am on "https://dev-aisoc-fe.qualgo.dev/account/01K4RR1KKGF35ZQN2ECXD8YCXJ/organization/01K4RRH3MGQKCE6EANT9AFB2H9/endpoint-devices"

  Scenario: Open filter panel and select Status filter
    When I click "Add Filter"
    And I tick "Status"
    Then the active filter chip "Status | Is |" is visible

  Scenario Outline: Apply Status filter
    Given the filter "Status" is active
    When I choose operator "Is"
    And I choose value "<status>"
    Then every visible row shows Status "<status>"
  Examples:
    | status  |
    | Active  |
    | Inactive|
