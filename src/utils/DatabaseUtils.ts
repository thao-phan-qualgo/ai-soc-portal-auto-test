/**
 * Database Utility Functions
 * Common database operations and helpers
 */

import { dbManager } from './DatabaseManager';
import { QueryResult, QueryResultRow } from 'pg';

export class DatabaseUtils {
  /**
   * Initialize database connection
   */
  public static async initialize(): Promise<void> {
    await dbManager.initialize();
  }

  /**
   * Execute a simple SELECT query
   */
  public static async select<T extends QueryResultRow = any>(
    table: string, 
    columns: string = '*', 
    whereClause?: string, 
    params?: any[]
  ): Promise<T[]> {
    let query = `SELECT ${columns} FROM ${table}`;
    if (whereClause) {
      query += ` WHERE ${whereClause}`;
    }
    
    const result = await dbManager.query<T>(query, params);
    return result.rows;
  }

  /**
   * Execute an INSERT query
   */
  public static async insert(
    table: string, 
    data: Record<string, any>
  ): Promise<QueryResult> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    
    const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    return await dbManager.query(query, values);
  }

  /**
   * Execute an UPDATE query
   */
  public static async update(
    table: string, 
    data: Record<string, any>, 
    whereClause: string, 
    whereParams?: any[]
  ): Promise<QueryResult> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
    
    let query = `UPDATE ${table} SET ${setClause}`;
    const params = [...values];
    
    if (whereClause) {
      query += ` WHERE ${whereClause}`;
      if (whereParams) {
        params.push(...whereParams);
      }
    }
    
    return await dbManager.query(query, params);
  }

  /**
   * Execute a DELETE query
   */
  public static async delete(
    table: string, 
    whereClause: string, 
    params?: any[]
  ): Promise<QueryResult> {
    const query = `DELETE FROM ${table} WHERE ${whereClause}`;
    return await dbManager.query(query, params);
  }

  /**
   * Check if a record exists
   */
  public static async exists(
    table: string, 
    whereClause: string, 
    params?: any[]
  ): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM ${table} WHERE ${whereClause})`;
    const result = await dbManager.query(query, params);
    return result.rows[0].exists;
  }

  /**
   * Count records in a table
   */
  public static async count(
    table: string, 
    whereClause?: string, 
    params?: any[]
  ): Promise<number> {
    let query = `SELECT COUNT(*) as count FROM ${table}`;
    if (whereClause) {
      query += ` WHERE ${whereClause}`;
    }
    
    const result = await dbManager.query(query, params);
    return parseInt(result.rows[0].count);
  }

  /**
   * Execute a raw SQL query
   */
  public static async rawQuery<T extends QueryResultRow = any>(
    query: string, 
    params?: any[]
  ): Promise<T[]> {
    const result = await dbManager.query<T>(query, params);
    return result.rows;
  }

  /**
   * Get table schema information
   */
  public static async getTableSchema(tableName: string): Promise<any[]> {
    const query = `
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default,
        character_maximum_length
      FROM information_schema.columns 
      WHERE table_name = $1 
      ORDER BY ordinal_position
    `;
    
    return await this.rawQuery(query, [tableName]);
  }

  /**
   * Get all tables in the database
   */
  public static async getTables(): Promise<string[]> {
    const query = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    const result = await this.rawQuery<{ table_name: string }>(query);
    return result.map(row => row.table_name);
  }

  /**
   * Clean up test data
   */
  public static async cleanupTestData(tableName: string, testId?: string): Promise<void> {
    if (testId) {
      await this.delete(tableName, 'test_id = $1', [testId]);
    } else {
      // Clean up all test data (be careful with this in production!)
      await this.delete(tableName, 'created_at < NOW() - INTERVAL \'1 hour\'');
    }
  }

  /**
   * Close database connection
   */
  public static async close(): Promise<void> {
    await dbManager.close();
  }

  /**
   * Health check
   */
  public static async healthCheck(): Promise<boolean> {
    return await dbManager.healthCheck();
  }

  /**
   * Get database info
   */
  public static async getDatabaseInfo(): Promise<{
    version: string;
    currentDatabase: string;
    currentUser: string;
    serverTime: string;
  }> {
    return await dbManager.getDatabaseInfo();
  }

  /**
   * Get a client from the pool
   */
  public static async getClient() {
    return await dbManager.getClient();
  }

  /**
   * Execute a query with parameters
   */
  public static async query<T extends QueryResultRow = any>(
    text: string, 
    params?: any[]
  ) {
    return await dbManager.query<T>(text, params);
  }

  /**
   * Execute a transaction
   */
  public static async transaction<T>(
    callback: (client: any) => Promise<T>
  ): Promise<T> {
    return await dbManager.transaction(callback);
  }

  /**
   * Execute multiple queries in a transaction
   */
  public static async executeQueries(queries: Array<{ text: string; params?: any[] }>) {
    return await dbManager.executeQueries(queries);
  }

  /**
   * Get connection pool statistics
   */
  public static getPoolStats(): {
    totalCount: number;
    idleCount: number;
    waitingCount: number;
  } {
    return dbManager.getPoolStats();
  }
}

export default DatabaseUtils;
