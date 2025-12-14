/**
 * Migration Script: JSON to PostgreSQL
 *
 * Migrates existing foodResources.json data to PostgreSQL database
 *
 * Usage:
 *   node migrations/004_migrate_json_data.js
 *
 * Requirements:
 *   - POSTGRES_URL environment variable set
 *   - Database schema already created (run migrations 001-003 first)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Read JSON data
const jsonPath = path.join(__dirname, '../src/data/foodResources.json');
const foodResources = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

console.log(`Found ${foodResources.length} resources to migrate`);

async function migrateData() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let successCount = 0;
    let errorCount = 0;

    for (const resource of foodResources) {
      try {
        // Get county ID
        const countyResult = await client.query(
          'SELECT id FROM counties WHERE name = $1',
          [resource.county]
        );

        if (countyResult.rows.length === 0) {
          console.warn(`County not found: ${resource.county} for resource ${resource.id}`);
          errorCount++;
          continue;
        }

        const countyId = countyResult.rows[0].id;

        // Insert resource
        const insertResult = await client.query(
          `INSERT INTO food_resources (
            name, address, city, state, zip_code, county_id,
            latitude, longitude, phone, website, description, hours
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING id`,
          [
            resource.name,
            resource.address,
            resource.city,
            resource.state || 'GA',
            resource.zipCode,
            countyId,
            resource.latitude || null,
            resource.longitude || null,
            resource.phone,
            resource.website || null,
            resource.description,
            resource.hours
          ]
        );

        const resourceId = insertResult.rows[0].id;

        // Insert service associations
        if (resource.services && Array.isArray(resource.services)) {
          for (const serviceName of resource.services) {
            // Get service type ID
            const serviceResult = await client.query(
              'SELECT id FROM service_types WHERE name = $1',
              [serviceName]
            );

            if (serviceResult.rows.length > 0) {
              const serviceTypeId = serviceResult.rows[0].id;

              // Insert resource-service relationship
              await client.query(
                `INSERT INTO resource_services (resource_id, service_type_id)
                 VALUES ($1, $2)
                 ON CONFLICT (resource_id, service_type_id) DO NOTHING`,
                [resourceId, serviceTypeId]
              );
            } else {
              console.warn(`Service type not found: ${serviceName} for resource ${resource.name}`);
            }
          }
        }

        successCount++;
        console.log(`✓ Migrated: ${resource.name} (ID: ${resourceId})`);

      } catch (error) {
        console.error(`✗ Error migrating resource ${resource.id} (${resource.name}):`, error.message);
        errorCount++;
      }
    }

    await client.query('COMMIT');

    console.log('\n=== Migration Complete ===');
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Total: ${foodResources.length}`);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migration
migrateData()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
