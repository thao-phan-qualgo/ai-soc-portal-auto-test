"""
Simple BDD test to verify pytest-bdd is working
"""

import pytest
import allure


@allure.feature("Simple BDD Test")
@allure.story("Framework Verification")
class TestSimpleBDD:
    """Simple BDD test to verify framework is working"""
    
    @allure.severity(allure.severity_level.CRITICAL)
    @pytest.mark.smoke
    @pytest.mark.bdd
    def test_simple_bdd_framework(self):
        """Test that BDD framework is working"""
        allure.attach("Test", "Simple BDD test is working", allure.attachment_type.TEXT)
        assert True
    
    @allure.severity(allure.severity_level.NORMAL)
    @pytest.mark.bdd
    def test_allure_integration(self):
        """Test Allure e2e with BDD"""
        allure.attach("Integration", "Allure e2e is working", allure.attachment_type.TEXT)
        assert True
