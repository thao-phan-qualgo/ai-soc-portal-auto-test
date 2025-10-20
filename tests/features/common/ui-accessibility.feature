Feature: UI Accessibility and Visual Design
  As a user with accessibility needs
  I want the AI SOC Portal to be accessible and visually consistent
  So that I can use the system effectively regardless of my abilities

  Background:
    Given the AI SOC Portal is accessible
    And I am using a desktop browser

  @ui @visual
  Scenario: Verify consistent button styling
    When I view buttons throughout the application
    Then all primary buttons should have consistent styling:
      | Property     | Value                    |
      | Background   | Primary brand color      |
      | Text Color   | White or high contrast   |

  