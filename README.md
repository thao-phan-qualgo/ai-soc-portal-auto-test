# AI SOC Portal Automation Test Framework

A comprehensive Python-based automation testing framework for the AI SOC Portal featuring advanced testing capabilities including UI automation, API testing, BDD testing, AI/ML model validation, and performance testing using modern tools like Playwright, pytest, Allure, and specialized AI testing libraries.

## 🚀 Features

### Core Testing Capabilities
- **🎭 UI Testing**: Playwright-based browser automation with cross-browser support
- **🔌 API Testing**: REST API testing with requests and httpx
- **📋 BDD Testing**: Behavior Driven Development with pytest-bdd and Gherkin
- **🏗️ Page Object Model**: Clean, maintainable test structure
- **⚙️ Configuration Management**: Environment-based configuration with dotenv
- **📊 Advanced Reporting**: HTML, coverage, and Allure reports with rich BDD visualization

### AI/ML Testing Capabilities
- **🤖 AI Model Testing**: ML model validation with deepeval and scikit-learn
- **📈 Data Quality Testing**: Data validation with Great Expectations
- **🔍 Model Performance**: MLflow integration for model tracking
- **📊 Statistical Testing**: NumPy and Pandas for data analysis

### Performance & Load Testing
- **⚡ Performance Testing**: Locust-based load testing
- **📏 Benchmarking**: pytest-benchmark for performance metrics
- **🔄 Parallel Execution**: Multi-threaded test execution

### Advanced Features
- **🌐 Cross-browser Testing**: Chrome, Firefox, Safari support
- **📱 Responsive Testing**: Mobile and desktop viewport testing
- **🎯 Smart Retry**: Tenacity-based retry mechanisms
- **📝 Rich Logging**: Structured logging with Loguru
- **🔒 Security Testing**: Authentication and authorization testing

## 📁 Project Structure

```
ai-soc-portal-auto-test/
├── .venv/                    # Virtual environment (Python 3.11+)
├── src/                      # Source code
│   ├── config/               # Configuration management
│   │   └── settings.py      # Environment settings
│   ├── pages/               # Page Object Model
│   │   ├── login_page.py    # Login page object
│   │   └── dashboard_page.py # Dashboard page object
│   └── utils/               # Utilities and base classes
│       ├── base_page.py     # Base page functionality
│       ├── api_client.py    # API testing client
│       └── helpers.py       # Test utilities
├── tests/                   # Test files
│   ├── ui/                  # UI tests
│   ├── api/                 # API tests
│   ├── integration/         # Integration tests
│   ├── bdd/                 # BDD tests (6 working tests)
│   └── demo/                # Demo tests (8 showcase tests)
├── features/                # Gherkin feature files
│   ├── web_ui/             # UI feature files
│   │   ├── login.feature    # Login scenarios
│   │   └── alert_management/ # Alert management features
│   ├── api/                 # API feature files
│   │   └── authentication.feature # API auth scenarios
│   └── e2e/                 # End-to-end feature files
│       └── user_flow.feature # User journey scenarios
├── step_definitions/        # BDD step definitions
│   ├── web_ui/              # UI step definitions
│   ├── api/                 # API step definitions
│   ├── e2e/                 # Integration step definitions
│   └── ai_models/           # AI/ML testing steps
├── test_data/               # Test data files
│   └── test_users.json      # User test data
├── secret-keys/             # SSH keys and secrets
├── reports/                 # Test reports (auto-generated)
├── allure-results/          # Allure test results
├── allure-report/           # Generated Allure reports
├── requirements.txt         # Python dependencies
├── pytest.ini              # Pytest configuration
├── Makefile                # Make commands
├── run_tests.py            # Test runner script
└── README.md               # This file
```

## 🛠️ Installation

### Prerequisites

- Python 3.11 or higher
- pip (Python package installer)
- Allure command line tool (for BDD reporting)
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-soc-portal-auto-test
   ```

2. **Setup project (automated)**
   ```bash
   make setup
   ```
   This command will:
   - Create virtual environment (`.venv`)
   - Install all dependencies
   - Install Playwright browsers
   - Setup test data

3. **Manual setup (if needed)**
   ```bash
   # Create virtual environment
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   # Install dependencies
   .venv/bin/pip install -r requirements.txt
   
   # Install Playwright browsers
   .venv/bin/playwright install
   ```

4. **Install Allure (for BDD reporting)**
   ```bash
   # macOS
   brew install allure
   
   # Or download from https://github.com/allure-framework/allure2/releases
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Application URLs
BASE_URL=https://your-ai-soc-portal.com
API_BASE_URL=https://api.your-ai-soc-portal.com

# Test Credentials
TEST_USERNAME=testuser
TEST_PASSWORD=testpass123
ADMIN_USERNAME=admin
ADMIN_PASSWORD=adminpass123

# Browser Settings
HEADLESS=true
SLOW_MO=0
BROWSER=chromium

# AI/ML Settings
MLFLOW_TRACKING_URI=http://localhost:5000
MODEL_REGISTRY_URI=http://localhost:5000
```

### Test Configuration

The `pytest.ini` file contains comprehensive test configuration:

- **Test Discovery**: Automatic test discovery patterns
- **Markers**: Custom test markers for categorization
- **Playwright Settings**: Browser configuration
- **Coverage**: Code coverage settings
- **Logging**: Structured logging configuration

## 🧪 Running Tests

### Quick Start Commands

```bash
# Setup project (first time only)
make setup

# Run demo tests (recommended for first run)
make test-demo

# Run BDD tests with Allure reporting
make test-bdd-allure

# Serve Allure report in browser
make allure-serve
```

### Test Categories

```bash
# Run all tests
make test

# Run specific test types
make test-ui          # UI tests only
make test-api         # API tests only
make test-integration # Integration tests only
make test-smoke       # Smoke tests only

# Run BDD tests
make test-bdd         # BDD tests with HTML report
make test-bdd-allure  # BDD tests with Allure reporting

# Run demo tests (showcase framework)
make test-demo
```

### Advanced Test Execution

```bash
# Run with different browsers
make test --browser chromium
make test --browser firefox
make test --browser webkit

# Run in headed mode (see browser)
make test-headed

# Run with performance metrics
make test-coverage

# Run with parallel execution
make test-parallel

# Run with HTML reporting
make test-report
```

### Direct pytest Commands

```bash
# Activate virtual environment first
source .venv/bin/activate

# Run specific test files
pytest tests/ui/test_login.py
pytest tests/api/test_auth_api.py
pytest tests/bdd/test_simple_bdd.py

# Run with markers
pytest -m smoke          # Smoke tests
pytest -m regression     # Regression tests
pytest -m ui             # UI tests
pytest -m api            # API tests
pytest -m bdd            # BDD tests
pytest -m integration    # Integration tests

# Run with specific browser
pytest --browser chromium
pytest --browser firefox
pytest --browser webkit

# Run in headed mode
pytest --headed

# Run with slow motion
pytest --slow-mo=1000
```

## 🏷️ Test Markers

The framework includes comprehensive test markers for categorization:

- `@pytest.mark.smoke`: Quick validation tests
- `@pytest.mark.regression`: Comprehensive tests
- `@pytest.mark.ui`: UI tests
- `@pytest.mark.api`: API tests
- `@pytest.mark.integration`: Integration tests
- `@pytest.mark.bdd`: BDD tests
- `@pytest.mark.login`: Login tests
- `@pytest.mark.auth`: Authentication tests
- `@pytest.mark.negative`: Negative test cases
- `@pytest.mark.validation`: Validation tests
- `@pytest.mark.security`: Security tests
- `@pytest.mark.performance`: Performance tests
- `@pytest.mark.e2e`: End-to-end tests
- `@pytest.mark.slow`: Slow running tests

## 🏗️ Page Objects

### BasePage
Common functionality for all page objects:
- Navigation and element interactions
- Screenshot and video capture
- Smart waiting strategies
- Error handling and retries

### LoginPage
Login page functionality:
- Username/password input handling
- Login button interactions
- Error message validation
- Remember me functionality

### DashboardPage
Dashboard page functionality:
- Navigation menu interactions
- User menu operations
- Widget interactions
- Logout functionality

## 🔌 API Testing

### APIClient
Comprehensive REST API testing client:
- HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Authentication handling (Bearer, Basic, API Key)
- JSON/XML response parsing
- Error handling and retries
- Request/response logging

### Example API Test
```python
def test_login_api(self, test_user):
    login_data = {
        "username": test_user["username"],
        "password": test_user["password"]
    }
    
    response = self.api_client.post_json("/auth/login", data=login_data)
    assert response.status_code == 200
    assert "token" in response.json()
    assert response.json()["user"]["username"] == test_user["username"]
```

## 🤖 AI/ML Testing


## 📋 BDD Testing

### Feature Files (Gherkin)
The framework includes comprehensive BDD scenarios:

- **UI Login Features**: `features/web_ui/login.feature`
- **API Authentication Features**: `features/api/authentication.feature`
- **Integration User Flow Features**: `features/e2e/user_flow.feature`
- **Alert Management Features**: `features/web_ui/alert_management/create_alert.feature`

### Step Definitions
Step definitions with Allure annotations:

- **UI Steps**: `step_definitions/web_ui/login_steps.py`
- **API Steps**: `step_definitions/api/auth_steps.py`
- **Integration Steps**: `step_definitions/e2e/user_flow_steps.py`
- **AI/ML Steps**: `step_definitions/ai_models/`

### BDD Test Examples

#### UI Login Scenario
```gherkin
Feature: User Authentication
  Scenario: Successful login with valid credentials
    Given the AI SOC Portal is accessible
    And the login page is displayed
    When I enter valid username "testuser"
    And I enter valid password "testpass123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see the user information
    And I should see the navigation menu
```

#### API Authentication Scenario
```gherkin
Feature: API Authentication
  Scenario: Successful API authentication
    Given the API server is running
    And I have valid API credentials
    When I send a POST request to "/api/auth/login"
    And I include valid username and password in the request body
    Then I should receive a 200 status code
    And I should receive a valid access token
    And the response should contain user information
```

## 📊 Reporting

### HTML Reports
```bash
# Standard HTML report
make test-report

# Demo tests HTML report
make test-demo

# BDD tests HTML report
make test-bdd
```

### Coverage Reports
```bash
# Generate coverage report
make test-coverage

# View coverage report
open reports/coverage/index.html
```

### Allure Reports
```bash
# Generate Allure results
make test-allure

# Serve Allure report (opens in browser)
make allure-serve

# Generate static Allure report
make allure-generate
```

### Allure BDD Features
- **Behaviors Section**: Features/Stories organization
- **Step-by-Step Execution**: Given-When-Then details
- **Rich Attachments**: Text, screenshots, logs, videos
- **Test Categorization**: Tags, severity, status
- **Performance Metrics**: Execution time tracking
- **AI/ML Metrics**: Model performance tracking

## 🎯 Best Practices

### Test Organization
- Group tests by functionality and feature
- Use descriptive test names and documentation
- Keep tests independent and atomic
- Use appropriate markers for categorization

### BDD Testing
- Write clear, business-focused scenarios
- Use Given-When-Then structure consistently
- Keep steps atomic and reusable
- Add Allure attachments for clarity

### Page Objects
- One page object per page/component
- Encapsulate page elements and interactions
- Provide meaningful method names
- Handle dynamic content and loading states

### Data Management
- Use test data files and fixtures
- Avoid hardcoded values
- Use environment variables for configuration
- Clean up test data after execution

### AI/ML Testing
- Validate model accuracy and performance
- Test data quality and integrity
- Monitor model drift and degradation
- Use appropriate metrics and thresholds

### Error Handling
- Use appropriate assertions and validations
- Handle expected failures gracefully
- Provide meaningful error messages
- Use retry mechanisms for flaky tests

### Allure Integration
- Use `@allure.step` for step documentation
- Add attachments for important data
- Use dynamic feature/story annotations
- Organize tests with proper severity levels

## 🔧 Troubleshooting

### Common Issues

1. **Virtual environment not found**
   ```bash
   # Ensure you're using .venv (not venv)
   source .venv/bin/activate
   ```

2. **Browser not found**
   ```bash
   .venv/bin/playwright install
   ```

3. **Allure command not found**
   ```bash
   # macOS
   brew install allure
   
   # Or download from https://github.com/allure-framework/allure2/releases
   ```

4. **Import errors**
   ```bash
   # Reinstall dependencies
   .venv/bin/pip install -r requirements.txt
   ```

5. **BDD tests not collecting**
   ```bash
   # Run working BDD tests only
   make test-bdd-working
   ```

6. **Permission errors**
   ```bash
   chmod +x scripts/*.sh
   ```

### Debug Mode
```bash
# Run with debug information
pytest --headed --slow-mo=1000 -v -s

# Run specific test with debug
pytest tests/ui/test_login.py::test_valid_login --headed -v -s
```

### Performance Issues
```bash
# Run with performance profiling
pytest --benchmark-only

# Run load tests
locust -f tests/performance/load_test.py
```

## 📈 Framework Status

### ✅ Completed Features
- **UI Testing**: Playwright-based browser automation
- **API Testing**: REST API testing with requests/httpx
- **BDD Testing**: Behavior Driven Development with pytest-bdd
- **Page Object Model**: Clean, maintainable test structure
- **Allure Reporting**: Beautiful HTML and BDD reports
- **Configuration Management**: Environment-based configuration
- **AI/ML Testing**: Model validation and data quality testing
- **Performance Testing**: Load testing with Locust
- **Demo Tests**: 8 showcase tests demonstrating framework capabilities
- **BDD Tests**: 6 working BDD tests with step-by-step execution

### 📊 Test Coverage
- **UI Tests**: Comprehensive browser automation
- **API Tests**: REST API validation
- **Integration Tests**: End-to-end user flows
- **BDD Tests**: 6 working tests (15+ scenarios implemented)
- **Demo Tests**: 8 showcase tests
- **AI/ML Tests**: Model validation and data quality
- **Performance Tests**: Load and stress testing

### 🎯 Advanced Features
- **Cross-browser Testing**: Chrome, Firefox, Safari
- **Mobile Testing**: Responsive design validation
- **AI/ML Integration**: Model performance monitoring
- **Data Quality**: Great Expectations integration
- **Performance Monitoring**: Benchmarking and profiling
- **Rich Reporting**: Allure with BDD visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`make test`)
5. Run code formatting (`make format`)
6. Run linting (`make lint`)
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions and support:
- Create an issue in the repository
- Contact the development team
- Check the documentation
- Review the demo tests: `make test-demo`
- Explore BDD tests: `make test-bdd-working`
- Check Allure reports: `make allure-serve`

## 🔗 Related Projects

- [Playwright](https://playwright.dev/) - Browser automation
- [pytest](https://pytest.org/) - Testing framework
- [Allure](https://allure.qameta.io/) - Test reporting
- [pytest-bdd](https://pytest-bdd.readthedocs.io/) - BDD testing
- [Locust](https://locust.io/) - Load testing
- [Great Expectations](https://greatexpectations.io/) - Data quality
- [MLflow](https://mlflow.org/) - ML lifecycle management