Feature: User Authentication
  As a user of the AI SOC Portal
  I want to be able to log in to the system
  So that I can access the dashboard and manage security operations

  Background:
    Given the AI SOC Portal is accessible
    And the login page is displayed

  @smoke @ui @login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username "testuser"
    And I enter valid password "testpass123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see the user information
    And I should see the navigation menu

  @ui @login @negative
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid username "invaliduser"
    And I enter invalid password "wrongpass"
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @ui @login @validation
  Scenario: Login form validation
    Given I am on the login page
    When I leave the username field empty
    And I leave the password field empty
    And I click the login button
    Then I should see validation errors
    And the login button should be disabled

  @ui @login @security
  Scenario: Login with special characters in credentials
    Given I am on the login page
    When I enter username with special characters "test@user#123"
    And I enter password with special characters "pass@word#123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see the user information

  @ui @login @performance
  Scenario: Login performance test
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then the login should complete within 3 seconds
    And I should be redirected to the dashboard
