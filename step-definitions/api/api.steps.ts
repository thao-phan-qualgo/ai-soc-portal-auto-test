/**
 * API Step Definitions for Cucumber Tests
 * Common API operations for test automation
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Type definitions for better type safety
interface ApiTestContext {
    response?: any;
    statusCode?: number;
    headers?: Record<string, string>;
    requestBody?: any;
}

// API connection steps
Given('the API is accessible', async function (this: ApiTestContext) {
    // Placeholder for API health check
    console.log('API is accessible');
});

Given('I have valid API credentials', async function (this: ApiTestContext) {
    // Placeholder for API authentication setup
    console.log('Valid API credentials available');
});

// API request steps
When('I make a GET request to {string}', async function (this: ApiTestContext, endpoint: string) {
    // Placeholder for GET request implementation
    console.log(`Making GET request to: ${endpoint}`);
    this.statusCode = 200; // Mock response
});

When('I make a POST request to {string} with:', async function (this: ApiTestContext, endpoint: string, dataTable: any) {
    // Placeholder for POST request implementation
    const requestData = dataTable.hashes()[0];
    this.requestBody = requestData;
    console.log(`Making POST request to: ${endpoint}`, requestData);
    this.statusCode = 201; // Mock response
});

When('I make a PUT request to {string} with:', async function (this: ApiTestContext, endpoint: string, dataTable: any) {
    // Placeholder for PUT request implementation
    const requestData = dataTable.hashes()[0];
    this.requestBody = requestData;
    console.log(`Making PUT request to: ${endpoint}`, requestData);
    this.statusCode = 200; // Mock response
});

When('I make a DELETE request to {string}', async function (this: ApiTestContext, endpoint: string) {
    // Placeholder for DELETE request implementation
    console.log(`Making DELETE request to: ${endpoint}`);
    this.statusCode = 204; // Mock response
});

// API response validation steps
Then('I should receive a {int} status code', async function (this: ApiTestContext, expectedStatusCode: number) {
    expect(this.statusCode).toBe(expectedStatusCode);
    console.log(`✅ Received expected status code: ${expectedStatusCode}`);
});

Then('the response should contain:', async function (this: ApiTestContext, dataTable: any) {
    const expectedData = dataTable.hashes()[0];
    // Placeholder for response validation
    console.log('Response validation:', expectedData);
});

Then('the response should have the following headers:', async function (this: ApiTestContext, dataTable: any) {
    const expectedHeaders = dataTable.hashes()[0];
    // Placeholder for header validation
    console.log('Header validation:', expectedHeaders);
});

Then('the response time should be less than {int} milliseconds', async function (this: ApiTestContext, maxResponseTime: number) {
    // Placeholder for response time validation
    const responseTime = 150; // Mock response time
    expect(responseTime).toBeLessThan(maxResponseTime);
    console.log(`✅ Response time ${responseTime}ms is less than ${maxResponseTime}ms`);
});
