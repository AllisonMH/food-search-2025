/**
 * Database Connection Module
 *
 * Provides PostgreSQL connection pooling for Vercel serverless functions.
 * Uses environment variables for database configuration.
 */

import { Pool } from 'pg';

// Create connection pool
// Uses Vercel Postgres environment variables
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  // Connection pool settings optimized for serverless
  max: 10,                    // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,   // Close idle clients after 30 seconds
  connectionTimeoutMillis: 5000, // Return an error after 5 seconds if connection cannot be established
});

/**
 * Execute a SQL query
 * @param {string} text - SQL query text
 * @param {array} params - Query parameters
 * @returns {Promise<object>} Query result
 */
export async function query(text, params = []) {
  const start = Date.now();

  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    // Log query performance (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', {
        text: text.substring(0, 100) + '...',
        duration: `${duration}ms`,
        rows: res.rowCount
      });
    }

    return res;
  } catch (error) {
    console.error('Database query error:', {
      message: error.message,
      query: text.substring(0, 100) + '...',
      params
    });
    throw error;
  }
}

/**
 * Get a client from the pool for transaction support
 * @returns {Promise<object>} Database client
 */
export async function getClient() {
  const client = await pool.connect();
  const query = client.query.bind(client);
  const release = client.release.bind(client);

  // Set a timeout of 5 seconds for the transaction
  const timeout = setTimeout(() => {
    console.error('Transaction timeout, releasing client');
    client.release();
  }, 5000);

  // Monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query(...args);
  };

  // Monkey patch the release method to clear the timeout
  client.release = () => {
    clearTimeout(timeout);
    // Set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release();
  };

  return client;
}

/**
 * Test database connection
 * @returns {Promise<boolean>} True if connection successful
 */
export async function testConnection() {
  try {
    const result = await query('SELECT NOW() as current_time');
    console.log('Database connection successful:', result.rows[0].current_time);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
}

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Database pool has ended');
  });
});

export default pool;
