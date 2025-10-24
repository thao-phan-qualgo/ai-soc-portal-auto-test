@api @overview
Feature: Overview widgets API integrity

  Scenario: Security posture numbers are returned
    When I GET "/api/overview/security-posture"
    Then response code is 200
    And criticalAssets >= 0
    And nonCompliantAssets >= 0
    And inactiveDevices >= 0
    And complianceCoverage is between 0 and 100

  Scenario: Devices by Protection schema
    When I GET "/api/overview/devices-protection"
    Then response code is 200
    And each item has fields "deviceName, criticality, score, antivirus, firewall"
