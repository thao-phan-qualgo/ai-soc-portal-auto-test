Feature: Database Schema Inspection and Validation


  Background:
    Given the database is connected

  @database
  Scenario: Verify table on database
    Given I query the database for basic information
    Then I should see at least 5 tables in the database