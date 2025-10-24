/**
 * Database Manager for PostgreSQL Connection
 * Handles database connections, queries, and transactions
 */

import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { config } from '../../config/env.config';

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  connectionTimeoutMillis?: number;
  queryTimeoutMillis?: number;
  max?: number;
  idleTimeoutMillis?: number;
  ssl?: {
    rejectUnauthorized?: boolean;
  };
}

export class DatabaseManager {
  private static instance: DatabaseManager;
  private pool: Pool | null = null;
  private readonly config: DatabaseConfig;

  private constructor() {
    this.config = {
      host: config.database.host || 'localhost',
      port: config.database.port || 5432,
      database: config.database.database,
      user: config.database.username || '',
      password: config.database.password || '',
      connectionTimeoutMillis: config.database.connectionTimeout || 30000,
      queryTimeoutMillis: config.database.queryTimeout || 60000,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      ssl: {
        rejectUnauthorized: false // Allow self-signed certificates for development
      }
    };
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  /**
   * Initialize database connection pool
   */
  public async initialize(): Promise<void> {
    try {
      if (this.pool) {
        console.log('Database pool already initialized');
        return;
      }

      console.log('🔌 Creating database connection pool...');
      console.log('📋 Connection config:', {
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
        user: this.config.user,
        connectionTimeoutMillis: this.config.connectionTimeoutMillis
      });

      this.pool = new Pool(this.config);

      // Test the connection with retry logic
      await this.testConnectionWithRetry();

      console.log('✅ Database connection established successfully');
    } catch (error) {
      console.error('❌ Failed to initialize database connection:', error);
      throw error;
    }
  }

  /**
   * Test connection with retry logic
   */
  private async testConnectionWithRetry(maxRetries: number = 3): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Connection attempt ${attempt}/${maxRetries}...`);

        // Create a timeout promise
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Connection timeout')), 15000); // 15 second timeout per attempt
        });

        // Race between connection and timeout
        const client = await Promise.race([
          this.pool!.connect(),
          timeoutPromise
        ]);

        await client.query('SELECT 1');
        client.release();
        console.log(`✅ Connection successful on attempt ${attempt}`);
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`❌ Connection attempt ${attempt} failed:`, errorMessage);

        if (attempt < maxRetries) {
          const delay = attempt * 2000; // Exponential backoff
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error('Connection failed after all retry attempts');
  }

  /**
   * Get a client from the pool
   */
  public async getClient(): Promise<PoolClient> {
    if (!this.pool) {
      await this.initialize();
    }
    return this.pool!.connect();
  }

  /**
   * Execute a query with parameters
   */
  public async query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    const client = await this.getClient();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  /**
   * Execute a transaction
   */
  public async transaction<T>(
    callback: (client: PoolClient) => Promise<T>
  ): Promise<T> {
    const client = await this.getClient();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Execute multiple queries in a transaction
   */
  public async executeQueries(queries: Array<{ text: string; params?: any[] }>): Promise<QueryResult[]> {
    return this.transaction(async (client) => {
      const results: QueryResult[] = [];
      for (const query of queries) {
        const result = await client.query(query.text, query.params);
        results.push(result);
      }
      return results;
    });
  }

  /**
   * Check if database connection is healthy
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const result = await this.query('SELECT 1 as health_check');
      return result.rows[0]?.health_check === 1;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  /**
   * Get database information
   */
  public async getDatabaseInfo(): Promise<{
    version: string;
    currentDatabase: string;
    currentUser: string;
    serverTime: string;
  }> {
    const queries = [
      'SELECT version() as version',
      'SELECT current_database() as current_database',
      'SELECT current_user as current_user',
      'SELECT now() as server_time'
    ];

    const results = await Promise.all(
      queries.map(query => this.query(query))
    );

    return {
      version: results[0].rows[0].version,
      currentDatabase: results[1].rows[0].current_database,
      currentUser: results[2].rows[0].current_user,
      serverTime: results[3].rows[0].server_time
    };
  }

  /**
   * Close all connections in the pool
   */
  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.log('Database connections closed');
    }
  }

  /**
   * Get connection pool statistics
   */
  public getPoolStats(): {
    totalCount: number;
    idleCount: number;
    waitingCount: number;
  } {
    if (!this.pool) {
      return { totalCount: 0, idleCount: 0, waitingCount: 0 };
    }

    return {
      totalCount: this.pool.totalCount,
      idleCount: this.pool.idleCount,
      waitingCount: this.pool.waitingCount
    };
  }
}

// Export singleton instance
export const dbManager = DatabaseManager.getInstance();