/**
 * GET /api/counties
 *
 * Fetch all counties with resource counts
 *
 * Example:
 *   GET /api/counties
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
    const sql = `
      SELECT
        c.id,
        c.name,
        COUNT(r.id) as "resourceCount"
      FROM counties c
      LEFT JOIN food_resources r ON c.id = r.county_id AND r.is_active = true
      GROUP BY c.id, c.name
      ORDER BY c.name ASC
    `;

    const result = await query(sql);

    return res.status(200).json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching counties:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
