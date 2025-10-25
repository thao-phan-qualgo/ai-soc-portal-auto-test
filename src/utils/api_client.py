"""
API client for testing REST APIs
"""

import requests
from typing import Dict, Any, Optional
from ..config import settings


class APIClient:
    """API client for making HTTP requests"""
    
    def __init__(self, base_url: str = None, timeout: int = None):
        self.base_url = base_url or settings.API_BASE_URL
        self.timeout = timeout or settings.API_TIMEOUT
        self.session = requests.Session()
        
        # Set default headers
        self.session.headers.update({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
        
        # Add API key if provided
        if settings.API_KEY:
            self.session.headers.update({
                "Authorization": f"Bearer {settings.API_KEY}"
            })
    
    def _make_request(
        self, 
        method: str, 
        endpoint: str, 
        data: Dict[str, Any] = None,
        params: Dict[str, Any] = None,
        headers: Dict[str, str] = None
    ) -> requests.Response:
        """Make HTTP request"""
        url = f"{self.base_url.rstrip('/')}/{endpoint.lstrip('/')}"
        
        # Update headers if provided
        if headers:
            self.session.headers.update(headers)
        
        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data,
                params=params,
                timeout=self.timeout
            )
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            raise
    
    def get(self, endpoint: str, params: Dict[str, Any] = None, headers: Dict[str, str] = None) -> requests.Response:
        """Make GET request"""
        return self._make_request("GET", endpoint, params=params, headers=headers)
    
    def post(self, endpoint: str, data: Dict[str, Any] = None, headers: Dict[str, str] = None) -> requests.Response:
        """Make POST request"""
        return self._make_request("POST", endpoint, data=data, headers=headers)
    
    def put(self, endpoint: str, data: Dict[str, Any] = None, headers: Dict[str, str] = None) -> requests.Response:
        """Make PUT request"""
        return self._make_request("PUT", endpoint, data=data, headers=headers)
    
    def patch(self, endpoint: str, data: Dict[str, Any] = None, headers: Dict[str, str] = None) -> requests.Response:
        """Make PATCH request"""
        return self._make_request("PATCH", endpoint, data=data, headers=headers)
    
    def delete(self, endpoint: str, headers: Dict[str, str] = None) -> requests.Response:
        """Make DELETE request"""
        return self._make_request("DELETE", endpoint, headers=headers)
    
    def get_json(self, endpoint: str, params: Dict[str, Any] = None, headers: Dict[str, str] = None) -> Dict[str, Any]:
        """Make GET request and return JSON response"""
        response = self.get(endpoint, params=params, headers=headers)
        return response.json()
    
    def post_json(self, endpoint: str, data: Dict[str, Any] = None, headers: Dict[str, str] = None) -> Dict[str, Any]:
        """Make POST request and return JSON response"""
        response = self.post(endpoint, data=data, headers=headers)
        return response.json()
    
    def put_json(self, endpoint: str, data: Dict[str, Any] = None, headers: Dict[str, str] = None) -> Dict[str, Any]:
        """Make PUT request and return JSON response"""
        response = self.put(endpoint, data=data, headers=headers)
        return response.json()
    
    def patch_json(self, endpoint: str, data: Dict[str, Any] = None, headers: Dict[str, str] = None) -> Dict[str, Any]:
        """Make PATCH request and return JSON response"""
        response = self.patch(endpoint, data=data, headers=headers)
        return response.json()
    
    def set_auth_token(self, token: str) -> None:
        """Set authentication token"""
        self.session.headers.update({"Authorization": f"Bearer {token}"})
    
    def set_basic_auth(self, username: str, password: str) -> None:
        """Set basic authentication"""
        self.session.auth = (username, password)
    
    def clear_auth(self) -> None:
        """Clear authentication"""
        self.session.auth = None
        if "Authorization" in self.session.headers:
            del self.session.headers["Authorization"]
    
    def set_header(self, key: str, value: str) -> None:
        """Set a header"""
        self.session.headers[key] = value
    
    def remove_header(self, key: str) -> None:
        """Remove a header"""
        if key in self.session.headers:
            del self.session.headers[key]
    
    def get_status_code(self, endpoint: str, params: Dict[str, Any] = None) -> int:
        """Get status code for a GET request"""
        response = self.get(endpoint, params=params)
        return response.status_code
    
    def is_endpoint_available(self, endpoint: str) -> bool:
        """Check if endpoint is available"""
        try:
            response = self.get(endpoint)
            return response.status_code < 500
        except:
            return False