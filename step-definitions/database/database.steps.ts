/**
 * Database Step Definitions for Cucumber Tests
 * Common database operations for test automation
 */

import { Given, When, Then, After } from '@cucumber/cucumber';
import { DatabaseUtils, dbManager } from '../../src/database/index';
import { expect } from '@playwright/test';

// Type definitions for better type safety
interface TestContext {
  dbConnected?: boolean;
  lastInsertedId?: number;
  queryResult?: any[];
}

interface DataTable {
  hashes(): Record<string, any>[];
}

interface Operation {
  type: string;
  table: string;
  data: string;
  where: string;
}

// Database connection management
Given('the database is connected', { timeout: 45000 }, async function (this: TestContext) {
  // Check if we should skip database tests
  if (process.env.SKIP_DB_TESTS === 'true') {
    console.log('⏭️  Skipping database connection (SKIP_DB_TESTS=true)');
    return 'skipped';
  }

  try {
    console.log('🔌 Initializing database connection...');
    await DatabaseUtils.initialize();
    console.log('✅ Database initialized, checking health...');
    const isHealthy = await DatabaseUtils.healthCheck();
    expect(isHealthy).toBe(true);
    this.dbConnected = true;
    console.log('✅ Database connection established and healthy');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Database connection failed:', errorMessage);

    // Provide helpful troubleshooting info
    if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('timeout')) {
      console.error('\n💡 Database Connection Troubleshooting:');
      console.error('   1. Check SSH tunnel: ./ssh-tunnel.sh status');
      console.error('   2. Restart tunnel: ./ssh-tunnel.sh restart');
      console.error('   3. Skip DB tests: SKIP_DB_TESTS=true npm run test:gherkin:db');
      console.error('   4. Run non-DB tests: npm run test:gherkin:login\n');
    }

    throw error;
  }
});

Given('the database connection is established', { timeout: 30000 }, async function (this: TestContext) {
  try {
    console.log('🔌 Establishing database connection...');
    await DatabaseUtils.initialize();
    this.dbConnected = true;
    console.log('✅ Database connection established');
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Database connection failed:', (error as Error).message);
    } else {
      console.error('❌ Database connection failed:', error);
    }
    throw error;
  }
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
When('I create a test record in the {string} table with:', async function (this: TestContext, tableName: string, dataTable: DataTable) {
  const data = dataTable.hashes()[0];
  const result = await DatabaseUtils.insert(tableName, data);
  this.lastInsertedId = result.rows[0]?.id;
});

When('I insert test data into the {string} table:', async function (tableName: string, dataTable: DataTable) {
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

// Custom query steps
When('I execute the SQL query:', async function (this: TestContext, query: string) {
  this.queryResult = await DatabaseUtils.rawQuery(query);
});

Then('the query should return {int} rows', async function (this: TestContext, expectedRowCount: number) {
  expect(this.queryResult?.length).toBe(expectedRowCount);
});

Then('the query result should contain:', async function (this: TestContext, dataTable: DataTable) {
  const expectedData = dataTable.hashes();
  expect(this.queryResult?.length).toBeGreaterThanOrEqual(expectedData.length);

  for (const expectedRow of expectedData) {
    const found = this.queryResult?.some((actualRow: Record<string, any>) => {
      return Object.keys(expectedRow).every(key =>
        actualRow[key] === expectedRow[key]
      );
    });
    expect(found).toBe(true);
  }
});

// Transaction steps
When('I execute the following operations in a transaction:', async function (dataTable: DataTable) {
  const operations = dataTable.hashes() as Operation[];

  await dbManager.transaction(async (client: any) => {
    for (const operation of operations) {
      const { type, table, data, where } = operation;

      switch (type.toLowerCase()) {
        case 'insert': {
          const insertData = JSON.parse(data);
          await client.query(
            `INSERT INTO ${table} (${Object.keys(insertData).join(', ')}) VALUES (${Object.keys(insertData).map((_, i) => `$${i + 1}`).join(', ')})`,
            Object.values(insertData)
          );
          break;
        }

        case 'update': {
          const updateData = JSON.parse(data);
          const updateColumns = Object.keys(updateData);
          const updateValues = Object.values(updateData);
          const setClause = updateColumns.map((col, i) => `${col} = $${i + 1}`).join(', ');
          await client.query(
            `UPDATE ${table} SET ${setClause} WHERE ${where}`,
            updateValues
          );
          break;
        }

        case 'delete':
          await client.query(`DELETE FROM ${table} WHERE ${where}`);
          break;

        default:
          throw new Error(`Unsupported operation type: ${type}`);
      }
    }
  });
});

// Cleanup after scenarios
After(async function (this: TestContext) {
  if (this.dbConnected) {
    await DatabaseUtils.close();
  }
});
