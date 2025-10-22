Feature: Database Schema Inspection and Validation

  Background:
    Given the database is connected

  @smoke @database
  Scenario: Verify database connection and basic schema
    When I query the database for basic information
    Then I should see the database version
    And I should see the current database name is "dev_aisoc"
    And I should see the current user is "dev_aisoc_usr_rw"
    