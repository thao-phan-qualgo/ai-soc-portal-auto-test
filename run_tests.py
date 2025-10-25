#!/usr/bin/env python3
"""
Test runner script for AI SOC Portal Automation Tests
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path


def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n{'='*50}")
    print(f"Running: {description}")
    print(f"Command: {command}")
    print(f"{'='*50}")
    
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=False)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed with exit code {e.returncode}")
        return False


def main():
    parser = argparse.ArgumentParser(description="AI SOC Portal Test Runner")
    parser.add_argument("--type", choices=["web_ui", "api", "e2e", "smoke", "all"],
                       default="all", help="Type of tests to run")
    parser.add_argument("--browser", choices=["chromium", "firefox", "webkit"], 
                       default="chromium", help="Browser to use for UI tests")
    parser.add_argument("--headed", action="store_true", help="Run browser in headed mode")
    parser.add_argument("--slow-mo", type=int, default=0, help="Slow down operations (ms)")
    parser.add_argument("--parallel", type=int, default=1, help="Number of parallel workers")
    parser.add_argument("--html-report", action="store_true", help="Generate HTML report")
    parser.add_argument("--coverage", action="store_true", help="Generate coverage report")
    parser.add_argument("--verbose", "-v", action="store_true", help="Verbose output")
    
    args = parser.parse_args()
    
    # Create necessary directories
    os.makedirs("reports", exist_ok=True)
    os.makedirs("test-results", exist_ok=True)
    
    # Build pytest command
    cmd_parts = [".venv/bin/python", "-m", "pytest"]
    
    # Add test selection
    if args.type == "all":
        cmd_parts.append("tests/")
    else:
        cmd_parts.extend(["-m", args.type])
    
    # Add browser option
    if args.type in ["web_ui", "e2e", "all"]:
        cmd_parts.extend(["--browser", args.browser])
    
    # Add headed mode
    if args.headed:
        cmd_parts.append("--headed")
    
    # Add slow mo
    if args.slow_mo > 0:
        cmd_parts.extend(["--slow-mo", str(args.slow_mo)])
    
    # Add parallel execution
    if args.parallel > 1:
        cmd_parts.extend(["-n", str(args.parallel)])
    
    # Add HTML report
    if args.html_report:
        cmd_parts.extend([
            "--html=reports/report.html",
            "--self-contained-html"
        ])
    
    # Add coverage report
    if args.coverage:
        cmd_parts.extend([
            "--cov=src",
            "--cov-report=html:reports/coverage",
            "--cov-report=term-missing"
        ])
    
    # Add verbose output
    if args.verbose:
        cmd_parts.append("-v")
    
    # Add additional options
    cmd_parts.extend([
        "--tb=short",
        "--strict-markers",
        "--strict-config"
    ])
    
    command = " ".join(cmd_parts)
    
    # Run the tests
    success = run_command(command, f"Running {args.type} tests")
    
    if success:
        print(f"\n🎉 All {args.type} tests completed successfully!")
        if args.html_report:
            print(f"📊 HTML report generated: reports/report.html")
        if args.coverage:
            print(f"📈 Coverage report generated: reports/coverage/index.html")
    else:
        print(f"\n💥 Some {args.type} tests failed!")
        sys.exit(1)


if __name__ == "__main__":
    main()
