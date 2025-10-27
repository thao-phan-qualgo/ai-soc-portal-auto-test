# ai-soc-portal-auto-test


## Setup
Environment
```markdown
# Tạo virtual environment
python -m venv venv

#  Active Virtual Environment
source venv/bin/activate
    
# Exit
deactivate
```

Reinstall libs
```markdown
pip install -r requirements.txt --force-reinstall

# or

pip install -r requirements.txt
```

View log details when running
```markdown
# Behave
behave -v --no-capture
    
# Pytest
pytest -v -s
```


## Structure 

```markdown
test-automation-framework/
│
├── 📁 features/                              # All Gherkin feature files
│   │
│   ├── 📁 ui/                               # UI test features
│   │   ├── authentication/
│   │   │   ├── login.feature
│   │   │   ├── registration.feature
│   │   │   └── password_reset.feature
│   │   │
│   │   ├── user/
│   │   │   ├── dashboard.feature
│   │   │   ├── profile.feature
│   │   │   └── settings.feature
│   │   │
│   │   └── shopping/
│   │       ├── product_catalog.feature
│   │       ├── shopping_cart.feature
│   │       └── wishlist.feature
│   │
│   ├── 📁 e2e/                              # End-to-end flow features
│   │   ├── checkout_flow.feature
│   │   ├── user_journey.feature
│   │   ├── order_fulfillment.feature
│   │   └── payment_flow.feature
│   │
│   ├── 📁 api/                              # API test features
│   │   ├── authentication/
│   │   │   ├── login_api.feature
│   │   │   └── token_management.feature
│   │   │
│   │   ├── users/
│   │   │   ├── users_crud.feature
│   │   │   └── users_validation.feature
│   │   │
│   │   ├── products/
│   │   │   ├── products_crud.feature
│   │   │   └── products_search.feature
│   │   │
│   │   └── orders/
│   │       ├── orders_crud.feature
│   │       └── orders_workflow.feature
│   │
│   ├── 📁 data/                             # Data validation features
│   │   ├── integrity/
│   │   │   ├── referential_integrity.feature
│   │   │   └── data_consistency.feature
│   │   │
│   │   ├── migration/
│   │   │   ├── data_migration.feature
│   │   │   └── schema_validation.feature
│   │   │
│   │   └── sync/
│   │       ├── cache_sync.feature
│   │       └── cross_system_sync.feature
│   │
│   ├── 📁 performance/                      # Performance test features
│   │   ├── load/
│   │   │   ├── baseline_load.feature
│   │   │   └── sustained_load.feature
│   │   │
│   │   ├── stress/
│   │   │   ├── stress_testing.feature
│   │   │   └── spike_testing.feature
│   │   │
│   │   └── endurance/
│   │       └── endurance_testing.feature
│   │
│   ├── 📁 steps/                            # Step definitions (ORGANIZED BY DOMAIN)
│   │   ├── __init__.py
│   │   │
│   │   ├── 📁 common/                      # Shared steps across all tests
│   │   │   ├── __init__.py
│   │   │   ├── navigation_steps.py         # Navigation actions
│   │   │   ├── assertion_steps.py          # Common assertions
│   │   │   ├── wait_steps.py              # Wait/timing steps
│   │   │   ├── form_steps.py              # Generic form interactions
│   │   │   └── data_setup_steps.py        # Test data setup
│   │   │
│   │   ├── 📁 ui/                          # UI-specific steps by feature
│   │   │   ├── __init__.py
│   │   │   │
│   │   │   ├── authentication/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── login_steps.py
│   │   │   │   ├── registration_steps.py
│   │   │   │   └── password_steps.py
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── dashboard_steps.py
│   │   │   │   ├── profile_steps.py
│   │   │   │   └── settings_steps.py
│   │   │   │
│   │   │   └── shopping/
│   │   │       ├── __init__.py
│   │   │       ├── product_steps.py
│   │   │       ├── cart_steps.py
│   │   │       └── checkout_steps.py
│   │   │
│   │   ├── 📁 api/                         # API steps by resource
│   │   │   ├── __init__.py
│   │   │   │
│   │   │   ├── authentication/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth_steps.py
│   │   │   │   └── token_steps.py
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── users_crud_steps.py
│   │   │   │   └── users_validation_steps.py
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── products_crud_steps.py
│   │   │   │   └── products_search_steps.py
│   │   │   │
│   │   │   └── orders/
│   │   │       ├── __init__.py
│   │   │       ├── orders_crud_steps.py
│   │   │       └── orders_workflow_steps.py
│   │   │
│   │   ├── 📁 data/                        # Data validation steps
│   │   │   ├── __init__.py
│   │   │   ├── database_steps.py           # Database operations
│   │   │   ├── validation_steps.py         # Data validation
│   │   │   ├── migration_steps.py          # Migration steps
│   │   │   └── sync_steps.py              # Sync validation
│   │   │
│   │   └── 📁 performance/                 # Performance test steps
│   │       ├── __init__.py
│   │       ├── load_steps.py              # Load testing
│   │       ├── stress_steps.py            # Stress testing
│   │       └── monitoring_steps.py        # Metrics & monitoring
│   │
│   └── hooks.py                            # Setup/teardown hooks (renamed from environment.py)
│
├── 📁 pages/                                # Page Object Model
│   ├── __init__.py
│   ├── base_page.py                        # Base page class
│   │
│   ├── authentication/
│   │   ├── __init__.py
│   │   ├── login_page.py
│   │   ├── registration_page.py
│   │   └── reset_password_page.py
│   │
│   ├── user/
│   │   ├── __init__.py
│   │   ├── dashboard_page.py
│   │   ├── profile_page.py
│   │   └── settings_page.py
│   │
│   └── shopping/
│       ├── __init__.py
│       ├── product_page.py
│       ├── cart_page.py
│       └── checkout_page.py
│
├── 📁 api/                                  # API clients
│   ├── __init__.py
│   ├── base_client.py                      # Base API client
│   │
│   ├── clients/
│   │   ├── __init__.py
│   │   ├── auth_client.py
│   │   ├── users_client.py
│   │   ├── products_client.py
│   │   └── orders_client.py
│   │
│   └── schemas/                            # JSON schemas for validation
│       ├── __init__.py
│       ├── user_schema.py
│       ├── product_schema.py
│       └── order_schema.py
│
├── 📁 database/                             # Database utilities
│   ├── __init__.py
│   ├── db_connection.py                    # Connection management
│   ├── db_queries.py                       # Common queries
│   ├── db_fixtures.py                      # Test data fixtures
│   └── db_validators.py                    # Data validators
│
├── 📁 utils/                                # Utility functions
│   ├── __init__.py
│   ├── logger.py                           # Logging configuration
│   ├── config.py                           # Configuration management
│   ├── data_generator.py                   # Test data generation
│   ├── helpers.py                          # Helper functions
│   ├── assertions.py                       # Custom assertions
│   ├── file_handler.py                     # File operations
│   └── screenshot.py                       # Screenshot utilities
│
├── 📁 test_data/                            # Test data files
│   ├── json/
│   │   ├── users.json
│   │   ├── products.json
│   │   └── orders.json
│   │
│   ├── csv/
│   │   ├── test_users.csv
│   │   └── test_products.csv
│   │
│   ├── yaml/
│   │   ├── test_config.yaml
│   │   └── environments.yaml
│   │
│   └── fixtures/                           # Database fixtures
│       ├── users_fixtures.sql
│       └── products_fixtures.sql
│
├── 📁 performance/                          # Performance testing
│   ├── __init__.py
│   ├── locustfile.py                       # Locust load tests
│   ├── load_profiles.py                    # Load profiles
│   └── performance_monitor.py              # Performance monitoring
│
├── 📁 config/                               # Configuration files
│   ├── __init__.py
│   ├── settings.py                         # Base settings
│   ├── environments/
│   │   ├── __init__.py
│   │   ├── dev.py
│   │   ├── staging.py
│   │   ├── prod.py
│   │   └── local.py
│   │
│   └── credentials/                        # Credentials (gitignored)
│       ├── .gitkeep
│       └── README.md
│
├── 📁 reports/                              # Test reports
│   ├── html/
│   ├── json/
│   ├── allure-results/
│   ├── allure-report/
│   ├── screenshots/
│   └── videos/
│
├── 📁 logs/                                 # Log files
│   ├── test_execution.log
│   ├── api_requests.log
│   └── errors.log
│
├── 📁 .github/                              # CI/CD workflows
│   └── workflows/
│       ├── ui-tests.yml
│       ├── api-tests.yml
│       ├── e2e-tests.yml
│       ├── data-tests.yml
│       ├── performance-tests.yml
│       └── full-regression.yml
│
├── 📁 docker/                               # Docker files
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── docker-compose.dev.yml
│   └── .dockerignore
│
├── 📁 docs/                                 # Documentation
│   ├── README.md
│   ├── SETUP.md
│   ├── CONTRIBUTING.md
│   ├── ARCHITECTURE.md
│   └── TROUBLESHOOTING.md
│
├── 📁 scripts/                              # Utility scripts
│   ├── setup.sh
│   ├── run_tests.sh
│   ├── cleanup.sh
│   └── generate_report.sh
│
├── behave.ini                               # Behave configuration
├── pytest.ini                               # Pytest configuration (if using pytest-bdd)
├── requirements.txt                         # Python dependencies
├── requirements-dev.txt                     # Development dependencies
├── .env.example                             # Environment variables template
├── .env                                     # Environment variables (gitignored)
├── .gitignore                               # Git ignore rules
├── Makefile                                 # Quick commands
└── README.md                                # Project documentation    
```