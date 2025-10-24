@ui @users @add
Feature: Users page - Add User modal

  Background:
    Given I am on "https://dev-aisoc-fe.qualgo.dev/account/01K4RR1KKGF35ZQN2ECXD8YCXJ/organization/01K4RRH3MGQKCE6EANT9AFB2H9/users"

  Scenario: Open Add User modal and validate
    When I click "Add User"
    Then I should see the modal "Add User"
    When I click "Add"
    Then I should see validation messages for "Document Name, Email, Title"

  Scenario: Create user successfully
    When I click "Add User"
    And I fill "Document Name" with "Nguyen Van A"
    And I fill "Email" with "qa.auto+uva@qualgo.dev"
    And I fill "Department" with "Security"
    And I fill "Title" with "Analyst"
    And I fill "Employee Level" with "L2"
    And I fill "Phone Number" with "0900000000"
    And I fill "Office Location" with "HCM"
    And I set "Hire Date" to "2025-09-01"
    And I set "Privileged User" to "Yes"
    And I set "Status" to "Active"
    And I click "Add"
    Then I should see toast "User added"
    And the table contains a row with email "qa.auto+uva@qualgo.dev"
