"""
Helper functions and utilities for automation testing
"""

import os
import time
from typing import Callable, Any


def wait_for_condition(condition_func: Callable, timeout: int = 30, interval: float = 0.5) -> bool:
    """Wait for a condition to be true"""
    start_time = time.time()
    while time.time() - start_time < timeout:
        if condition_func():
            return True
        time.sleep(interval)
    return False


def retry_on_failure(max_retries: int = 3, delay: float = 1.0):
    """Decorator to retry function on failure"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise e
                    print(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay} seconds...")
                    time.sleep(delay)
            return None
        return wrapper
    return decorator


def ensure_directory_exists(directory_path: str) -> None:
    """Ensure directory exists, create if it doesn't"""
    os.makedirs(directory_path, exist_ok=True)


def get_environment_variable(key: str, default: str = None) -> str:
    """Get environment variable with default value"""
    return os.getenv(key, default)