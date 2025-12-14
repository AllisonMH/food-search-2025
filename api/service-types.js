/**
 * GET /api/service-types
 *
 * Fetch all service types, optionally grouped by category
 *
 * Query Parameters:
 *   - grouped: If "true", return services grouped by category
 *
 * Example:
 *   GET /api/service-types
 *   GET /api/service-types?grouped=true
 */

import { query } from '../lib/db.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

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
    const { grouped } = req.query;

    if (grouped === 'true') {
      // Return services grouped by category
      const sql = `
        SELECT
          st.category,
          json_agg(
            json_build_object(
              'id', st.id,
              'name', st.name
            )
            ORDER BY st.name
          ) as services
        FROM service_types st
        GROUP BY st.category
        ORDER BY st.category
      `;

      const result = await query(sql);

      return res.status(200).json({
        success: true,
        data: result.rows
      });
    } else {
      // Return flat list of services
      const sql = `
        SELECT
          id,
          name,
          category
        FROM service_types
        ORDER BY name ASC
      `;

      const result = await query(sql);

      return res.status(200).json({
        success: true,
        data: result.rows
      });
    }

  } catch (error) {
    console.error('Error fetching service types:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
