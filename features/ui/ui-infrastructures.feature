@ui @infrastructures
Feature: Infrastructures listing and Add Infrastructure

  Background:
    Given I am on "https://dev-aisoc-fe.qualgo.dev/account/01K4RR1KKGF35ZQN2ECXD8YCXJ/organization/01K4RRH3MGQKCE6EANT9AFB2H9/infrastructures"

  Scenario: Table renders with expected columns
    Then I should see columns "Infrastructure Name, Status, Type, Environment, Cloud Provider, Region, Resource Type, Instance Type, VPC, Security Groups, Action"

  Scenario: Open Add Infrastructure modal
    When I click "Add Infrastructure"
    Then I should see the modal "Add Infrastructure"
    And the modal contains sections "General Information, Environment and Deployment, Security & Compliance"

  Scenario: Validation on required fields
    Given I opened the "Add Infrastructure" modal
    When I click "Add"
    Then I should see validation messages for "Infrastructure Name, Type, Resource Type"

  Scenario: Create infrastructure successfully
    Given I opened the "Add Infrastructure" modal
    When I fill "Infrastructure Name" with "VPC-Prod-01"
    And I set "Status" = "Active"
    And I set "Type" = "On-Premises"
    And I set "Business Impact" = "Low"
    And I set "Criticality" = "Low"
    And I set "Environment" = "Development"
    And I enter "Cloud Provider" = "AWS"
    And I enter "Region" = "ap-southeast-1"
    And I select "Resource Type" = "Web-Servers"
    And I enter "Instance Type" = "t3.medium"
    And I enter "VPC" = "vpc-12345"
    And I enter "IAM Role Count" = "3"
    And I enter "Security Groups" = "sg-web, sg-db"
    And I enter "Access Log" = "enabled"
    And I enter "Audit Log" = "enabled"
    And I enter "Port Count" = "6"
    And I enter "Compliance Tags" = "pci,iso27001"
    And I click "Add"
    Then I should see a toast "Infrastructure added"
    And the table contains a row "VPC-Prod-01"
