/**
 * Utils Module Exports
 * Central export point for all utility functionality including database operations
 */

export { DatabaseManager, dbManager } from './DatabaseManager';
export { DatabaseUtils } from './DatabaseUtils';
export type { DatabaseConfig } from './DatabaseManager';

// Export utility functions for easier access
import { DatabaseUtils } from './DatabaseUtils';

export const {
  initialize,
  select,
  insert,
  update,
  delete: deleteRecord,
  exists,
  count,
  rawQuery,
  getTableSchema,
  getTables,
  cleanupTestData,
  close,
  healthCheck,
  getDatabaseInfo,
  getClient,
  query,
  transaction,
  executeQueries,
  getPoolStats
} = DatabaseUtils;
