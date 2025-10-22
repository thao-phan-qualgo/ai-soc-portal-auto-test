/**
 * Database Step Definitions for Cucumber Tests
 * Common database operations for test automation
 */

import { Given, When, Then, After } from '@cucumber/cucumber';
import { DatabaseUtils, dbManager, DatabaseManager } from '../../../src/database';
import { expect } from '@playwright/test';
import { testDatabaseConfig } from '../../config/database-config';

// Database connection management
Given('the database is connected', async function (this: any) {
  // Create a new database manager instance with tunnel config
  const tunnelDbManager = new (DatabaseManager as any)();
  
  // Override the config for this instance - need to map the config properly
  (tunnelDbManager as any).config = {
    host: testDatabaseConfig.database.host,
    port: testDatabaseConfig.database.port,
    database: testDatabaseConfig.database.database,
    user: testDatabaseConfig.database.username, // Note: 'user' not 'username' for pg
    password: testDatabaseConfig.database.password,
    connectionTimeoutMillis: testDatabaseConfig.database.connectionTimeout,
    queryTimeoutMillis: testDatabaseConfig.database.queryTimeout,
    max: 20,
    idleTimeoutMillis: 30000,
  };
  
  // Initialize with tunnel config
  await tunnelDbManager.initialize();
  const isHealthy = await tunnelDbManager.healthCheck();
  expect(isHealthy).toBe(true);
  this.dbConnected = true;
  this.tunnelDbManager = tunnelDbManager;
});

Given('the database connection is established', async function (this: any) {
  await DatabaseUtils.initialize();
  this.dbConnected = true;
});

// Data verification steps
Then('I should see {int} records in the {string} table', async function (expectedCount: number, tableName: string) {
  const actualCount = await DatabaseUtils.count(tableName);
  expect(actualCount).toBe(expectedCount);
});

Then('I should see a record in the {string} table with {string} = {string}', async function (tableName: string, column: string, value: string) {
  const records = await DatabaseUtils.select(tableName, '*', `${column} = $1`, [value]);
  expect(records.length).toBeGreaterThan(0);
});

Then('I should not see a record in the {string} table with {string} = {string}', async function (tableName: string, column: string, value: string) {
  const exists = await DatabaseUtils.exists(tableName, `${column} = $1`, [value]);
  expect(exists).toBe(false);
});

// Data creation steps
When('I create a test record in the {string} table with:', async function (this: any, tableName: string, dataTable: any) {
  const data = dataTable.hashes()[0];
  const result = await DatabaseUtils.insert(tableName, data);
  this.lastInsertedId = result.rows[0]?.id;
});

When('I insert test data into the {string} table:', async function (tableName: string, dataTable: any) {
  const dataRows = dataTable.hashes();
  for (const row of dataRows) {
    await DatabaseUtils.insert(tableName, row);
  }
});

// Data cleanup steps
When('I clean up test data from the {string} table', async function (tableName: string) {
  await DatabaseUtils.cleanupTestData(tableName);
});

When('I delete records from the {string} table where {string} = {string}', async function (tableName: string, column: string, value: string) {
  await DatabaseUtils.delete(tableName, `${column} = $1`, [value]);
});

// Data update steps
When('I update the {string} table set {string} = {string} where {string} = {string}', async function (tableName: string, updateColumn: string, updateValue: string, whereColumn: string, whereValue: string) {
  const updateData = { [updateColumn]: updateValue };
  await DatabaseUtils.update(tableName, updateData, `${whereColumn} = $1`, [whereValue]);
});

// Database info steps - moved to db-schema.steps.ts to avoid conflicts

// Custom query steps
When('I execute the SQL query:', async function (this: any, query: string) {
  this.queryResult = await DatabaseUtils.rawQuery(query);
});

Then('the query should return {int} rows', async function (this: any, expectedRowCount: number) {
  expect(this.queryResult.length).toBe(expectedRowCount);
});

Then('the query result should contain:', async function (this: any, dataTable: any) {
  const expectedData = dataTable.hashes();
  expect(this.queryResult.length).toBeGreaterThanOrEqual(expectedData.length);
  
  for (const expectedRow of expectedData) {
    const found = this.queryResult.some((actualRow: any) => {
      return Object.keys(expectedRow).every(key => 
        actualRow[key] === expectedRow[key]
      );
    });
    expect(found).toBe(true);
  }
});

// Transaction steps
When('I execute the following operations in a transaction:', async function (dataTable: any) {
  const operations = dataTable.hashes();
  
  await dbManager.transaction(async (client) => {
    for (const operation of operations) {
      const { type, table, data, where } = operation;
      
      switch (type.toLowerCase()) {
        case 'insert':
          const insertData = JSON.parse(data);
          await client.query(
            `INSERT INTO ${table} (${Object.keys(insertData).join(', ')}) VALUES (${Object.keys(insertData).map((_, i) => `$${i + 1}`).join(', ')})`,
            Object.values(insertData)
          );
          break;
          
        case 'update':
          const updateData = JSON.parse(data);
          const updateColumns = Object.keys(updateData);
          const updateValues = Object.values(updateData);
          const setClause = updateColumns.map((col, i) => `${col} = $${i + 1}`).join(', ');
          await client.query(
            `UPDATE ${table} SET ${setClause} WHERE ${where}`,
            updateValues
          );
          break;
          
        case 'delete':
          await client.query(`DELETE FROM ${table} WHERE ${where}`);
          break;
      }
    }
  });
});

// Cleanup after scenarios
After(async function (this: any) {
  if (this.tunnelDbManager) {
    await this.tunnelDbManager.close();
  } else if (this.dbConnected) {
    await DatabaseUtils.close();
  }
});
