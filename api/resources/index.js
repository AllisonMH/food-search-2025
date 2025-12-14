/**
 * GET /api/resources
 *
 * Fetch all active food resources with optional filtering
 *
 * Query Parameters:
 *   - county: Filter by county name (e.g., "Fulton")
 *   - zip: Filter by zip code (e.g., "30318")
 *   - services: Filter by service types (comma-separated, e.g., "Food Pantry,Free Meals")
 *   - search: Full-text search across name, description, address
 *   - limit: Number of results per page (default: 100, max: 500)
 *   - offset: Pagination offset (default: 0)
 *
 * Example:
 *   GET /api/resources?county=Fulton&services=Food%20Pantry&limit=20
 */

import { query } from '../../lib/db.js';

export default async function handler(req, res) {
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Parse and validate query parameters
    const {
      county,
      zip,
      services,
      search,
      limit = 100,
      offset = 0
    } = req.query;

    // Validate limit and offset
    const parsedLimit = Math.min(parseInt(limit) || 100, 500);
    const parsedOffset = parseInt(offset) || 0;

    // Build SQL query dynamically
    let sql = `
      SELECT
        r.id,
        r.name,
        r.address,
        r.city,
        r.state,
        r.zip_code as "zipCode",
        c.name as county,
        r.latitude,
        r.longitude,
        r.phone,
        r.website,
        r.description,
        r.hours,
        r.is_active as "isActive",
        r.created_at as "createdAt",
        r.updated_at as "updatedAt",
        COALESCE(
          json_agg(
            DISTINCT st.name
          ) FILTER (WHERE st.name IS NOT NULL),
          '[]'
        ) as services
      FROM food_resources r
      JOIN counties c ON r.county_id = c.id
      LEFT JOIN resource_services rs ON r.id = rs.resource_id
      LEFT JOIN service_types st ON rs.service_type_id = st.id
      WHERE r.is_active = true
    `;

    const params = [];
    let paramIndex = 1;

    // Add county filter
    if (county) {
      sql += ` AND c.name = $${paramIndex++}`;
      params.push(county);
    }

    // Add zip code filter
    if (zip) {
      sql += ` AND r.zip_code = $${paramIndex++}`;
      params.push(zip);
    }

    // Add full-text search
    if (search) {
      sql += ` AND (
        r.name ILIKE $${paramIndex} OR
        r.description ILIKE $${paramIndex} OR
        r.address ILIKE $${paramIndex}
      )`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Group by resource
    sql += `
      GROUP BY r.id, c.name
    `;

    // Add service type filter (after GROUP BY)
    if (services) {
      const serviceList = services.split(',').map(s => s.trim());
      sql += ` HAVING bool_or(st.name = ANY($${paramIndex++}))`;
      params.push(serviceList);
    }

    // Add ordering and pagination
    sql += `
      ORDER BY r.name ASC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;

    params.push(parsedLimit, parsedOffset);

    // Execute query
    const result = await query(sql, params);

    // Get total count (for pagination)
    let countSql = `
      SELECT COUNT(DISTINCT r.id) as total
      FROM food_resources r
      JOIN counties c ON r.county_id = c.id
      LEFT JOIN resource_services rs ON r.id = rs.resource_id
      LEFT JOIN service_types st ON rs.service_type_id = st.id
      WHERE r.is_active = true
    `;

    const countParams = [];
    let countParamIndex = 1;

    if (county) {
      countSql += ` AND c.name = $${countParamIndex++}`;
      countParams.push(county);
    }

    if (zip) {
      countSql += ` AND r.zip_code = $${countParamIndex++}`;
      countParams.push(zip);
    }

    if (search) {
      countSql += ` AND (
        r.name ILIKE $${countParamIndex} OR
        r.description ILIKE $${countParamIndex} OR
        r.address ILIKE $${countParamIndex}
      )`;
      countParams.push(`%${search}%`);
      countParamIndex++;
    }

    if (services) {
      const serviceList = services.split(',').map(s => s.trim());
      countSql += ` AND st.name = ANY($${countParamIndex++})`;
      countParams.push(serviceList);
    }

    const countResult = await query(countSql, countParams);

    // Return response
    return res.status(200).json({
      success: true,
      data: {
        resources: result.rows,
        total: parseInt(countResult.rows[0].total),
        limit: parsedLimit,
        offset: parsedOffset,
        hasMore: parsedOffset + parsedLimit < parseInt(countResult.rows[0].total)
      }
    });

  } catch (error) {
    console.error('Error fetching resources:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
