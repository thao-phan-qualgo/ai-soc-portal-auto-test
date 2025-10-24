@api @devices
Feature: Devices CRUD API

  Scenario Outline: Create device happy path
    When I POST "/api/devices" with payload:
      """
      {
        "name": "<name>",
        "type": "computer",
        "subType": "laptop",
        "ownership": "organization",
        "status": "Active",
        "criticality": "High",
        "macAddresses": ["<mac>"],
        "ipAddresses": ["<ip>"]
      }
      """
    Then response code is 201
    And body.id is not null
  Examples:
    | name        | mac               | ip           |
    | API-Mac-001 | 00:14:22:01:23:61 | 10.10.60.121 |

  Scenario: Duplicate MAC rejected
    Given a device exists with mac "00:14:22:01:23:61"
    When I POST "/api/devices" with the same mac
    Then response code is 409
    And body.message contains "MAC already exists"

  Scenario: List devices paginated and sortable
    When I GET "/api/devices?page=2&pageSize=10&sort=status,asc"
    Then response code is 200
    And body.items length is 10
    And body.page equals 2
    And body.sort contains "status,asc"

  Scenario: Filter by criticality and status
    When I GET "/api/devices?criticality=Critical&status=Active"
    Then response code is 200
    And every item in body.items has criticality "Critical" and status "Active"

  Scenario: Update device
    Given a device with id "{id}"
    When I PATCH "/api/devices/{id}" with payload {"criticality":"Medium"}
    Then response code is 200
    And body.criticality equals "Medium"

  Scenario: Delete device
    Given a device with id "{id}"
    When I DELETE "/api/devices/{id}"
    Then response code is 204
