@ui @users
Feature: Users management

  Background:
    Given I open "https://dev-aisoc-fe.qualgo.dev/account/01K4RR1KKGF35ZQN2ECXD8YCXJ/organization/01K4RRH3MGQKCE6EANT9AFB2H9/users"

  Scenario: Table renders with roles
    Then I should see columns "Name, Email, Role, Status, Actions"

  Scenario: Invite user validation
    When I click "Invite User"
    And I input email "invalid@"
    And I click "Send"
    Then I should see "Invalid email" error

  Scenario: Invite user successfully
    When I click "Invite User"
    And I input email "qa.auto+invited@qualgo.dev"
    And I select role "Viewer"
    And I click "Send"
    Then I should see toast "Invitation sent"
