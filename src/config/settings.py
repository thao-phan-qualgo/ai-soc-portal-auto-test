"""
Configuration settings for AI SOC Portal tests
"""

import os
from typing import Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Settings:
    """Application settings"""
    
    # Application URLs
    BASE_URL: str = os.getenv("BASE_URL", "http://localhost:3000")
    API_BASE_URL: str = os.getenv("API_BASE_URL", "http://localhost:8080/api")
    
    # Browser settings
    HEADLESS: bool = os.getenv("HEADLESS", "true").lower() == "true"
    SLOW_MO: int = int(os.getenv("SLOW_MO", "0"))
    BROWSER: str = os.getenv("BROWSER", "chromium")
    VIEWPORT_WIDTH: int = int(os.getenv("VIEWPORT_WIDTH", "1920"))
    VIEWPORT_HEIGHT: int = int(os.getenv("VIEWPORT_HEIGHT", "1080"))
    
    # Timeouts
    DEFAULT_TIMEOUT: int = int(os.getenv("DEFAULT_TIMEOUT", "30000"))
    NAVIGATION_TIMEOUT: int = int(os.getenv("NAVIGATION_TIMEOUT", "30000"))
    
    # Test data
    TEST_USERNAME: str = os.getenv("TEST_USERNAME", "testuser")
    TEST_PASSWORD: str = os.getenv("TEST_PASSWORD", "testpass")
    TEST_EMAIL: str = os.getenv("TEST_EMAIL", "test@example.com")
    
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "adminpass")
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "admin@example.com")
    
    # Database settings
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: int = int(os.getenv("DB_PORT", "5432"))
    DB_NAME: str = os.getenv("DB_NAME", "test_db")
    DB_USER: str = os.getenv("DB_USER", "test_user")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "test_pass")
    
    # API settings
    API_TIMEOUT: int = int(os.getenv("API_TIMEOUT", "30"))
    API_KEY: str = os.getenv("API_KEY", "")
    
    # Reporting
    REPORTS_DIR: str = os.getenv("REPORTS_DIR", "reports")
    SCREENSHOTS_DIR: str = os.getenv("SCREENSHOTS_DIR", "test-results/screenshots")
    VIDEOS_DIR: str = os.getenv("VIDEOS_DIR", "test-results/videos")
    
    # Test execution
    PARALLEL_WORKERS: int = int(os.getenv("PARALLEL_WORKERS", "1"))
    RERUN_FAILURES: int = int(os.getenv("RERUN_FAILURES", "0"))
    
    @classmethod
    def get_browser_config(cls) -> Dict[str, Any]:
        """Get browser configuration"""
        return {
            "headless": cls.HEADLESS,
            "slow_mo": cls.SLOW_MO,
            "args": [
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--disable-web-security",
                "--allow-running-insecure-content"
            ]
        }
    
    @classmethod
    def get_context_config(cls) -> Dict[str, Any]:
        """Get browser context configuration"""
        return {
            "viewport": {"width": cls.VIEWPORT_WIDTH, "height": cls.VIEWPORT_HEIGHT},
            "ignore_https_errors": True,
            "record_video_dir": cls.VIDEOS_DIR,
            "record_video_size": {"width": cls.VIEWPORT_WIDTH, "height": cls.VIEWPORT_HEIGHT}
        }
    
    @classmethod
    def get_database_url(cls) -> str:
        """Get database connection URL"""
        return f"postgresql://{cls.DB_USER}:{cls.DB_PASSWORD}@{cls.DB_HOST}:{cls.DB_PORT}/{cls.DB_NAME}"


# Global settings instance
settings = Settings()
