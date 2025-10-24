@login
Feature: Login to AI SOC Portal
  As a user
  I want to login to the AI SOC Portal
  So that I can access the system features

  @smoke
  Scenario: Login with Microsoft account
    Given I open the AI SOC Portal
    When I click on the Microsoft Sign-in button
    And I fill in valid account email and password
    Then I should be successfully logged in to the AI SOC Portal
