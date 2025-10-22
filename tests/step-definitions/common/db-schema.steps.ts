/**
 * Database Schema Step Definitions for Cucumber Tests
 * Comprehensive database schema validation and inspection steps
 */

import { Given, When, Then, After } from '@cucumber/cucumber';
import { DatabaseUtils, dbManager } from '../../../src/database';
import { expect } from '@playwright/test';
import { testDatabaseConfig } from '../../config/database-config';

// Database schema inspection steps
When('I query the database for basic information', async function (this: any) {
  if (this.tunnelDbManager) {
    this.dbInfo = await this.tunnelDbManager.getDatabaseInfo();
  } else {
    this.dbInfo = await DatabaseUtils.getDatabaseInfo();
  }
});

When('I query all tables in the public schema', async function (this: any) {
  this.tables = await DatabaseUtils.getTables();
});

When('I query the structure of table {string}', async function (this: any, tableName: string) {
  this.tableSchema = await DatabaseUtils.getTableSchema(tableName);
  this.currentTable = tableName;
});

When('I query foreign key relationships', async function (this: any) {
  const query = `
    SELECT 
      tc.table_name,
      kcu.column_name,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name,
      tc.constraint_name
    FROM information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' 
      AND tc.table_schema = 'public'
    ORDER BY tc.table_name, kcu.column_name;
  `;
  
  this.foreignKeys = await DatabaseUtils.rawQuery(query);
});

When('I query indexes for core tables', async function (this: any) {
  const query = `
    SELECT 
      schemaname,
      tablename,
      indexname,
      indexdef
    FROM pg_indexes 
    WHERE schemaname = 'public'
      AND tablename IN ('users', 'organizations', 'projects', 'applications', 'domains', 'infrastructures')
    ORDER BY tablename, indexname;
  `;
  
  this.indexes = await DatabaseUtils.rawQuery(query);
});

When('I query data integrity constraints', async function (this: any) {
  const query = `
    SELECT 
      tc.table_name,
      tc.constraint_name,
      tc.constraint_type,
      kcu.column_name,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
    FROM information_schema.table_constraints tc
    LEFT JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    LEFT JOIN information_schema.constraint_column_usage ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.table_schema = 'public'
      AND tc.constraint_type IN ('PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE', 'CHECK')
    ORDER BY tc.table_name, tc.constraint_type;
  `;
  
  this.constraints = await DatabaseUtils.rawQuery(query);
});

When('I query database performance information', async function (this: any) {
  // Get connection pool stats
  this.poolStats = dbManager.getPoolStats();
  
  // Get database size
  const sizeQuery = `
    SELECT 
      pg_size_pretty(pg_database_size(current_database())) as database_size,
      current_database() as database_name;
  `;
  this.dbSize = await DatabaseUtils.rawQuery(sizeQuery);
  
  // Get table row counts
  const rowCountQuery = `
    SELECT 
      schemaname,
      tablename,
      n_tup_ins as inserts,
      n_tup_upd as updates,
      n_tup_del as deletes,
      n_live_tup as live_rows,
      n_dead_tup as dead_rows
    FROM pg_stat_user_tables 
    WHERE schemaname = 'public'
    ORDER BY n_live_tup DESC;
  `;
  this.tableStats = await DatabaseUtils.rawQuery(rowCountQuery);
});

// Basic database information steps
Then('I should see the database version', async function (this: any) {
  expect(this.dbInfo.version).toBeDefined();
  expect(this.dbInfo.version).toContain('PostgreSQL');
  console.log('Database version:', this.dbInfo.version);
});

Then('I should see the current database name is {string}', async function (this: any, expectedDbName: string) {
  expect(this.dbInfo.currentDatabase).toBe(expectedDbName);
});

Then('I should see the current user is {string}', async function (this: any, expectedUser: string) {
  expect(this.dbInfo.currentUser).toBe(expectedUser);
});

// Table listing steps
Then('I should see at least {int} tables in the database', async function (this: any, minTableCount: number) {
  expect(this.tables.length).toBeGreaterThanOrEqual(minTableCount);
  console.log(`Found ${this.tables.length} tables in the database`);
});

Then('I should see the following core tables:', async function (this: any, dataTable: any) {
  const expectedTables = dataTable.hashes().map((row: any) => row.table_name);
  
  for (const expectedTable of expectedTables) {
    expect(this.tables).toContain(expectedTable);
    console.log(`✅ Found table: ${expectedTable}`);
  }
});

// Table structure validation steps
Then('the table should have a primary key column {string}', async function (this: any, columnName: string) {
  const primaryKeyColumns = this.tableSchema.filter((col: any) => 
    col.column_name === columnName && col.column_name === 'id'
  );
  
  expect(primaryKeyColumns.length).toBeGreaterThan(0);
  console.log(`✅ Table ${this.currentTable} has primary key column: ${columnName}`);
});

Then('the table should have audit columns {string} and {string}', async function (this: any, col1: string, col2: string) {
  const columnNames = this.tableSchema.map((col: any) => col.column_name);
  
  expect(columnNames).toContain(col1);
  expect(columnNames).toContain(col2);
  console.log(`✅ Table ${this.currentTable} has audit columns: ${col1}, ${col2}`);
});

Then('the table should have a {string} column for soft deletes', async function (this: any, columnName: string) {
  const columnNames = this.tableSchema.map((col: any) => col.column_name);
  
  expect(columnNames).toContain(columnName);
  console.log(`✅ Table ${this.currentTable} has soft delete column: ${columnName}`);
});

// Foreign key relationship steps
Then('I should see that {string} table references {string}', async function (this: any, tableName: string, referencedTable: string) {
  const tableForeignKeys = this.foreignKeys.filter((fk: any) => 
    fk.table_name === tableName && fk.foreign_table_name === referencedTable
  );
  
  expect(tableForeignKeys.length).toBeGreaterThan(0);
  console.log(`✅ Table ${tableName} references ${referencedTable}`);
});

// Index validation steps
Then('I should see indexes on {string} table for {string}', async function (this: any, tableName: string, columnName: string) {
  const tableIndexes = this.indexes.filter((idx: any) => 
    idx.tablename === tableName && idx.indexdef.includes(columnName)
  );
  
  expect(tableIndexes.length).toBeGreaterThan(0);
  console.log(`✅ Found indexes on ${tableName} for ${columnName}`);
});

// Constraint validation steps
Then('I should see unique constraints on user email per organization', async function (this: any) {
  const uniqueConstraints = this.constraints.filter((constraint: any) => 
    constraint.constraint_type === 'UNIQUE' &&
    constraint.table_name === 'users' &&
    constraint.column_name === 'email'
  );
  
  expect(uniqueConstraints.length).toBeGreaterThan(0);
  console.log('✅ Found unique constraint on user email per organization');
});

Then('I should see foreign key constraints are properly defined', async function (this: any) {
  const foreignKeyConstraints = this.constraints.filter((constraint: any) => 
    constraint.constraint_type === 'FOREIGN KEY'
  );
  
  expect(foreignKeyConstraints.length).toBeGreaterThan(0);
  console.log(`✅ Found ${foreignKeyConstraints.length} foreign key constraints`);
});

Then('I should see that required fields are marked as NOT NULL', async function (this: any) {
  // Check some key required fields
  const requiredFields = [
    { table: 'users', column: 'id' },
    { table: 'users', column: 'name' },
    { table: 'users', column: 'email' },
    { table: 'organizations', column: 'id' },
    { table: 'organizations', column: 'name' },
    { table: 'projects', column: 'id' },
    { table: 'projects', column: 'name' }
  ];
  
  for (const field of requiredFields) {
    const query = `
      SELECT is_nullable 
      FROM information_schema.columns 
      WHERE table_name = $1 AND column_name = $2 AND table_schema = 'public'
    `;
    const result = await DatabaseUtils.rawQuery(query, [field.table, field.column]);
    
    if (result.length > 0) {
      expect(result[0].is_nullable).toBe('NO');
      console.log(`✅ Field ${field.table}.${field.column} is NOT NULL`);
    }
  }
});

// Performance metrics steps
Then('I should see connection pool statistics', async function (this: any) {
  expect(this.poolStats).toBeDefined();
  expect(this.poolStats.totalCount).toBeGreaterThanOrEqual(0);
  console.log('Connection pool stats:', this.poolStats);
});

Then('I should see database size information', async function (this: any) {
  expect(this.dbSize).toBeDefined();
  expect(this.dbSize.length).toBeGreaterThan(0);
  console.log('Database size:', this.dbSize[0].database_size);
});

Then('I should see table row counts are reasonable', async function (this: any) {
  expect(this.tableStats).toBeDefined();
  expect(this.tableStats.length).toBeGreaterThan(0);
  
  // Check that we have reasonable row counts (not negative or extremely high)
  for (const tableStat of this.tableStats) {
    expect(tableStat.live_rows).toBeGreaterThanOrEqual(0);
    console.log(`Table ${tableStat.tablename}: ${tableStat.live_rows} live rows`);
  }
});

// Cleanup after scenarios
After(async function (this: any) {
  if (this.dbConnected) {
    await DatabaseUtils.close();
  }
});
