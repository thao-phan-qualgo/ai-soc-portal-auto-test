@ui @domains
Feature: Domains listing and Add Domain

  Background:
    Given I am on "https://dev-aisoc-fe.qualgo.dev/account/01K4RR1KKGF35ZQN2ECXD8YCXJ/organization/01K4RRH3MGQKCE6EANT9AFB2H9/domains"

  Scenario: Table shows columns
    Then I should see columns "Domain, IP Address, TLS Expiry Date, Status, Action"

  Scenario: Add Domain validation
    When I click "Add Domain"
    And I click "Add" in the modal
    Then I should see validation messages for "Domain Name"

  Scenario: Add Domain successfully
    When I click "Add Domain"
    And I fill "Domain Name" with "api.qualgo.dev"
    And I set "Status" = "Active"
    And I set "Valid" = "Yes"
    And I enter "Issuer" = "LetsEncrypt"
    And I pick "Expires" to a date 60 days from now
    And I enter "SAN" = "api.qualgo.dev"
    And I set "Type" = "Web"
    And I set "Business Impact" = "Low"
    And I enter "IP Address" = "18.139.45.67"
    And I enter "A Records" = "18.139.45.67"
    And I enter "CNAME Records" = ""
    And I enter "MX Records" = "mx.qualgo.dev"
    And I enter "TXT Records" = "v=spf1 include:_spf.google.com ~all"
    And I click "Add"
    Then I should see toast "Domain added"
    And the table contains a row "api.qualgo.dev"
