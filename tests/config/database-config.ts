/**
 * Database Configuration for Tests
 * Overrides the default database configuration to use SSH tunnel
 */

import dotenv from 'dotenv';
import { config } from '../../src/config/config';

// Load environment variables from .env file
dotenv.config();

// Override database configuration for tests to use SSH tunnel
export const testDatabaseConfig = {
  ...config,
  database: {
    ...config.database,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5433, // Local port forwarded through SSH tunnel
    database: process.env.DB_NAME || 'dev_aisoc',
    username: process.env.DB_USERNAME || 'dev_aisoc_usr_rw',
    password: process.env.DB_PASSWORD || 'EkhOC4iIpMTxiS21pj',
  }
};

export default testDatabaseConfig;
