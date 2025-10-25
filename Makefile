# AI SOC Portal Automation Test Framework Makefile

.PHONY: help install test test-ui test-api test-integration test-smoke clean setup lint format

# Default target
help:
	@echo "AI SOC Portal Automation Test Framework"
	@echo "======================================"
	@echo ""
	@echo "Available commands:"
	@echo "  install         Install dependencies"
	@echo "  setup           Setup project (install deps + browsers)"
	@echo "  test            Run all tests"
	@echo "  test-ui         Run UI tests only"
	@echo "  test-api        Run API tests only"
	@echo "  test-integration Run integration tests only"
	@echo "  test-smoke      Run smoke tests only"
	@echo "  test-ai         Run AI/ML tests only"
	@echo "  test-demo       Run demo tests to showcase framework"
	@echo "  test-bdd        Run BDD tests"
	@echo "  test-bdd-allure Run BDD tests with Allure reporting"
	@echo "  test-bdd-working Run working BDD tests (HTML report)"
	@echo "  test-headed     Run tests in headed mode"
	@echo "  test-parallel   Run tests in parallel"
	@echo "  test-report     Run tests with HTML report"
	@echo "  test-coverage   Run tests with coverage report"
	@echo "  test-allure     Run tests with Allure reporting"
	@echo "  allure-serve    Serve Allure report in browser"
	@echo "  allure-generate Generate static Allure report"
	@echo "  lint            Run code linting"
	@echo "  format          Format code"
	@echo "  clean           Clean test artifacts"
	@echo ""

# Installation
install:
	@echo "Creating virtual environment..."
	python3 -m venv .venv
	@echo "Installing Python dependencies..."
	.venv/bin/pip install -r requirements.txt

setup: install
	@echo "Installing Playwright browsers..."
	.venv/bin/python -m playwright install
	@echo "Creating necessary directories..."
	mkdir -p reports test-results/screenshots test-results/videos
	@echo "Setup completed!"

# Test execution
test:
	@echo "Running all tests..."
	.venv/bin/python -m pytest tests/ -v

test-ui:
	@echo "Running UI tests..."
	.venv/bin/python -m pytest tests/ui/ -v -m ui

test-api:
	@echo "Running API tests..."
	.venv/bin/python -m pytest tests/api/ -v -m api

test-integration:
	@echo "Running integration tests..."
	.venv/bin/python -m pytest tests/integration/ -v -m integration

test-smoke:
	@echo "Running smoke tests..."
	.venv/bin/python -m pytest tests/ -v -m smoke

test-ai:
	@echo "Running AI/ML tests..."
	.venv/bin/python -m pytest tests/ai_models/ -v

test-demo:
	@echo "Running demo tests..."
	.venv/bin/python -m pytest tests/demo/ -v --html=reports/demo_report.html --self-contained-html

test-bdd:
	@echo "Running BDD tests..."
	.venv/bin/python -m pytest tests/bdd/ -v --html=reports/bdd_report.html --self-contained-html

test-bdd-allure:
	@echo "Running BDD tests with Allure..."
	.venv/bin/python -m pytest tests/bdd/test_simple_bdd.py tests/bdd/test_allure_bdd_demo.py --alluredir=allure-results

test-bdd-working:
	@echo "Running working BDD tests..."
	.venv/bin/python -m pytest tests/bdd/test_simple_bdd.py tests/bdd/test_allure_bdd_demo.py -v --html=reports/bdd_working_report.html --self-contained-html

test-headed:
	@echo "Running tests in headed mode..."
	.venv/bin/python -m pytest tests/ -v --headed

test-parallel:
	@echo "Running tests in parallel..."
	.venv/bin/python -m pytest tests/ -v -n auto

test-report:
	@echo "Running tests with HTML report..."
	.venv/bin/python -m pytest tests/ -v --html=reports/report.html --self-contained-html

test-coverage:
	@echo "Running tests with coverage report..."
	.venv/bin/python -m pytest tests/ -v --cov=src --cov-report=html:reports/coverage --cov-report=term-missing

test-allure:
	@echo "Running tests with Allure reporting..."
	.venv/bin/python -m pytest tests/demo/ --alluredir=allure-results

allure-serve:
	@echo "Serving Allure report..."
	allure serve allure-results

allure-generate:
	@echo "Generating Allure report..."
	allure generate allure-results --clean -o allure-report

# Code quality
lint:
	@echo "Running code linting..."
	.venv/bin/flake8 src/ tests/
	.venv/bin/mypy src/

format:
	@echo "Formatting code..."
	.venv/bin/black src/ tests/
	.venv/bin/isort src/ tests/

# Cleanup
clean:
	@echo "Cleaning test artifacts..."
	rm -rf reports/
	rm -rf test-results/
	rm -rf .pytest_cache/
	rm -rf .coverage
	rm -rf htmlcov/
	rm -rf __pycache__/
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

# Development
dev-setup: setup
	@echo "Setting up development environment..."
	cp env.example .env
	@echo "Please edit .env file with your configuration"

# Quick test commands
quick-test:
	@echo "Running quick smoke tests..."
	.venv/bin/python -m pytest tests/ -v -m smoke --tb=short

debug-test:
	@echo "Running tests in debug mode..."
	.venv/bin/python -m pytest tests/ -v -s --headed --slow-mo=1000

# Browser specific tests
test-chrome:
	@echo "Running tests with Chrome..."
	.venv/bin/python -m pytest tests/ -v --browser chromium

test-firefox:
	@echo "Running tests with Firefox..."
	.venv/bin/python -m pytest tests/ -v --browser firefox

test-safari:
	@echo "Running tests with Safari..."
	.venv/bin/python -m pytest tests/ -v --browser webkit
