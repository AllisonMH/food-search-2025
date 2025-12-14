/**
 * GET /api/resources/:id
 *
 * Fetch a single food resource by ID
 *
 * Parameters:
 *   - id: Resource ID (integer)
 *
 * Example:
 *   GET /api/resources/1
 */

import { query } from '../../lib/db.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { id } = req.query;

    // Validate ID
    const resourceId = parseInt(id);
    if (isNaN(resourceId) || resourceId < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid resource ID'
      });
    }

    // Fetch resource with all related data
    const sql = `
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
            DISTINCT jsonb_build_object(
              'name', st.name,
              'category', st.category
            )
          ) FILTER (WHERE st.name IS NOT NULL),
          '[]'
        ) as services
      FROM food_resources r
      JOIN counties c ON r.county_id = c.id
      LEFT JOIN resource_services rs ON r.id = rs.resource_id
      LEFT JOIN service_types st ON rs.service_type_id = st.id
      WHERE r.id = $1
      GROUP BY r.id, c.name
    `;

    const result = await query(sql, [resourceId]);

    // Check if resource exists
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }

    const resource = result.rows[0];

    // Check if resource is active
    if (!resource.isActive) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found or inactive'
      });
    }

    return res.status(200).json({
      success: true,
      data: resource
    });

  } catch (error) {
    console.error('Error fetching resource:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
