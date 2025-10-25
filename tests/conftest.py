"""
Pytest configuration and fixtures for AI SOC Portal tests
"""

import pytest
import os
import allure
from playwright.sync_api import sync_playwright, Browser, BrowserContext, Page
from typing import Generator
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


@pytest.fixture(scope="session")
def browser_type_launch_args():
    """Browser launch arguments"""
    return {
        "headless": os.getenv("HEADLESS", "true").lower() == "true",
        "slow_mo": int(os.getenv("SLOW_MO", "0")),
        "args": [
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--disable-web-security",
            "--allow-running-insecure-content"
        ]
    }


@pytest.fixture(scope="session")
def browser_context_args():
    """Browser context arguments"""
    return {
        "viewport": {"width": 1920, "height": 1080},
        "ignore_https_errors": True,
        "record_video_dir": "test-results/videos/",
        "record_video_size": {"width": 1920, "height": 1080}
    }


@pytest.fixture(scope="session")
def browser(browser_type_launch_args) -> Generator[Browser, None, None]:
    """Browser fixture"""
    with sync_playwright() as p:
        browser = p.chromium.launch(**browser_type_launch_args)
        yield browser
        browser.close()


@pytest.fixture(scope="function")
def context(browser: Browser, browser_context_args) -> Generator[BrowserContext, None, None]:
    """Browser context fixture"""
    context = browser.new_context(**browser_context_args)
    yield context
    context.close()


@pytest.fixture(scope="function")
def page(context: BrowserContext) -> Generator[Page, None, None]:
    """Page fixture"""
    page = context.new_page()
    
    # Set default timeout
    page.set_default_timeout(30000)
    page.set_default_navigation_timeout(30000)
    
    yield page
    page.close()


@pytest.fixture(scope="session")
def base_url():
    """Base URL for the application"""
    return os.getenv("BASE_URL", "http://localhost:3000")


@pytest.fixture(scope="session")
def api_base_url():
    """API base URL"""
    return os.getenv("API_BASE_URL", "http://localhost:8080/api")


@pytest.fixture(scope="session")
def test_user():
    """Test user credentials"""
    return {
        "username": os.getenv("TEST_USERNAME", "testuser"),
        "password": os.getenv("TEST_PASSWORD", "testpass"),
        "email": os.getenv("TEST_EMAIL", "test@example.com")
    }


@pytest.fixture(scope="session")
def admin_user():
    """Admin user credentials"""
    return {
        "username": os.getenv("ADMIN_USERNAME", "admin"),
        "password": os.getenv("ADMIN_PASSWORD", "adminpass"),
        "email": os.getenv("ADMIN_EMAIL", "admin@example.com")
    }


@pytest.fixture(autouse=True)
def setup_test_environment():
    """Setup test environment before each test"""
    # Create necessary directories
    os.makedirs("test-results/screenshots", exist_ok=True)
    os.makedirs("test-results/videos", exist_ok=True)
    os.makedirs("reports", exist_ok=True)
    
    yield
    
    # Cleanup after test if needed
    pass


def pytest_configure(config):
    """Configure pytest"""
    # Add custom markers
    config.addinivalue_line("markers", "smoke: Smoke tests")
    config.addinivalue_line("markers", "regression: Regression tests")
    config.addinivalue_line("markers", "api: API tests")
    config.addinivalue_line("markers", "web_ui: UI tests")
    config.addinivalue_line("markers", "slow: Slow tests")
    config.addinivalue_line("markers", "e2e: Integration tests")
    config.addinivalue_line("markers", "bdd: BDD tests")
    config.addinivalue_line("markers", "login: Login tests")
    config.addinivalue_line("markers", "auth: Authentication tests")
    config.addinivalue_line("markers", "negative: Negative test cases")
    config.addinivalue_line("markers", "validation: Validation tests")
    config.addinivalue_line("markers", "security: Security tests")
    config.addinivalue_line("markers", "performance: Performance tests")


def pytest_collection_modifyitems(config, items):
    """Modify test collection"""
    # Add markers based on test file location
    for item in items:
        if "api" in str(item.fspath):
            item.add_marker(pytest.mark.api)
        elif "web_ui" in str(item.fspath):
            item.add_marker(pytest.mark.ui)
        elif "e2e" in str(item.fspath):
            item.add_marker(pytest.mark.integration)
        elif "step_definitions" in str(item.fspath) or "features" in str(item.fspath):
            item.add_marker(pytest.mark.bdd)


# BDD tag application is handled by pytest-bdd plugin automatically


# BDD hooks are handled by pytest-bdd plugin automatically
