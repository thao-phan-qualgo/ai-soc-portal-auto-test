"""
Configuration settings for the AI SOC Portal automation tests.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()


# Root directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# URL application
BASE_URL = os.getenv('BASE_URL', 'http://localhost:3000')
API_URL = os.getenv('API_URL', 'http://localhost:8000')
CLIENT_ID = os.getenv('CLIENT_ID', '')
CLIENT_SECRET = os.getenv('CLIENT_SECRET', '')
USERNAME = os.getenv('USERNAME', '')
PASSWORD = os.getenv('PASSWORD', '')

ACCOUNT_ID = os.getenv('ACCOUNT_ID', '')
ORGANIZATION_ID = os.getenv('ORGANIZATION_ID', '')

# Browser configuration
BROWSER = os.getenv('BROWSER', 'chrome')
HEADLESS = os.getenv('HEADLESS', 'false').lower() == 'true'
IMPLICIT_WAIT = 10
EXPLICIT_WAIT = 20

# Reports directory
REPORTS_DIR = BASE_DIR / 'reports'
SCREENSHOTS_DIR = REPORTS_DIR / 'screenshots'
LOGS_DIR = BASE_DIR / 'logs'

# Create directory if it doesn't exist
REPORTS_DIR.mkdir(exist_ok=True)
SCREENSHOTS_DIR.mkdir(exist_ok=True)
LOGS_DIR.mkdir(exist_ok=True)