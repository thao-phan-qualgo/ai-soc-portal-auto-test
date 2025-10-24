@ui @applications
Feature: Applications listing and Add Application

  Background:
    Given I am on "https://dev-aisoc-fe.qualgo.dev/account/01K4RR1KKGF35ZQN2ECXD8YCXJ/organization/01K4RRH3MGQKCE6EANT9AFB2H9/applications"

  Scenario: Table renders columns
    Then I should see columns "Application Name, Status, Criticality, Type, Business Impact, Ownership, Action"

  Scenario: Add Application validation
    When I click "Add Application"
    And I click "Add" in the modal
    Then I should see validation messages for "Application Name"

  Scenario: Add Application successfully
    When I click "Add Application"
    And I fill "Application Name" with "Customer Portal"
    And I set "Status" = "Active"
    And I set "Criticality" = "Low"
    And I set "Type" = "Web"
    And I set "Business Impact" = "Low"
    And I click "Add"
    Then I should see toast "Application added"
    And the table contains a row "Customer Portal"
