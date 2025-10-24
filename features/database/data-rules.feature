@data
Feature: Data rules and UI consistency

  Scenario: MAC and IP must be unique within organization
    Given two payloads with the same MAC "00:14:22:01:23:61"
    When I try to create both devices
    Then the second creation is rejected with conflict 409

  Scenario: Device must reference valid organization
    When I POST "/api/devices" with organizationId not existing
    Then response code is 400 or 404

  Scenario Outline: Criticality badge color consistency
    Given a device has criticality "<crit>"
    When I open Endpoint Devices
    Then the row shows badge color "<color>"
  Examples:
    | crit     | color  |
    | Critical | red    |
    | High     | orange |
    | Medium   | yellow |
    | Low      | green  |

  Scenario: TLS expiry highlight <= 30 days
    Given a domain with tlsExpiryDate within 30 days from today
    When I open Overview > Domains list
    Then the TLS Expiry cell is highlighted as warning
