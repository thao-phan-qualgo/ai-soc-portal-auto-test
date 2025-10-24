@ui @endpoints
Feature: Endpoint Devices listing and CRUD behavior

  Background:
    Given I am on "https://dev-aisoc-fe.qualgo.dev/account/01K4RR1KKGF35ZQN2ECXD8YCXJ/organization/01K4RRH3MGQKCE6EANT9AFB2H9/endpoint-devices"

  Scenario: Default table columns visible
    Then I should see columns "Device Name, Status, Criticality, Ownership, Type, Sub Type, MAC Addresses, IP Addresses, Action"

  Scenario: Sort by Status ascending then descending
    When I click the sort icon on "Status"
    Then the first page should be sorted ascending by Status
    When I click the sort icon on "Status" again
    Then the first page should be sorted descending by Status

  Scenario Outline: Filter by Criticality and Status
    When I open filter panel
    And I select criticality "<criticality>"
    And I select status "<status>"
    Then every visible row shows Criticality "<criticality>" and Status "<status>"
  Examples:
    | criticality | status  |
    | Critical    | Active  |
    | Low         | Inactive|

  Scenario: Search by Name
    When I enter "MacBook-Pro-17" in the search box
    Then all rows contain "MacBook-Pro-17" in Device Name

  Scenario: Pagination works
    When I click "Next" page
    Then the page index increases by 1
    And table renders a new set of rows

  # Create
  @create
  Scenario: Validation errors on empty required fields
    When I click "Add Device" then "Add Manually"
    And I click "Add"
    Then I should see validation messages for "Device Name, Type, Sub Type, Ownership"

  @create
  Scenario: Create device successfully
    When I click "Add Device" then "Add Manually"
    And I fill "Device Name" with "MAC-Admin-2022"
    And I select "Type" = "computer" and "Sub Type" = "laptop"
    And I select "Ownership" = "organization"
    And I set "Status" = "Active" and "Criticality" = "High"
    And I enter "MAC Addresses" = "00:14:22:01:23:60"
    And I enter "IP Addresses" = "10.10.60.120"
    And I click "Add"
    Then I should see a toast "Endpoint device added."
    And the table should contain a row "MAC-Admin-2022"

  Scenario: Duplicate MAC shows error
    When I click "Add Device" then "Add Manually"
    And I fill the form with MAC "00:14:22:01:23:60" already used
    And I click "Add"
    Then I should see an error message containing "MAC already exists"

  # Edit / Delete
  @edit
  Scenario: Edit device criticality
    Given the device "Hung-Desktop-01" exists
    When I click the "Edit" icon on that row
    And I change "Criticality" to "Medium"
    And I save
    Then the row shows Criticality "Medium"

  Scenario: Delete device with confirmation
    Given the device "Temp-For-Delete" exists
    When I click the "Delete" icon
    And I confirm
    Then the row for "Temp-For-Delete" is not visible
