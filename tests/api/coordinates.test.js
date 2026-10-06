// @vitest-environment node
/**
 * node-postgres returns DECIMAL/NUMERIC columns as strings, but the frontend
 * (FoodResources.jsx, MapView.jsx, distanceCalculator.js) only accepts
 * numeric coordinates. The resource endpoints must cast latitude/longitude
 * in SQL so the API returns numbers.
 *
 * Lives outside /api so Vercel doesn't deploy it as a serverless function.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../lib/db.js', () => ({
  query: vi.fn(),
}));

import { query } from '../../lib/db.js';
import listHandler from '../../api/resources/index.js';
import detailHandler from '../../api/resources/[id].js';

function mockRes() {
  const res = {
    setHeader: vi.fn(),
    status: vi.fn(() => res),
    json: vi.fn(() => res),
    end: vi.fn(() => res),
  };
  return res;
}

const CASTS = [
  /r\.latitude::float8\s+AS\s+latitude/i,
  /r\.longitude::float8\s+AS\s+longitude/i,
];

describe('resource endpoints return numeric coordinates', () => {
  beforeEach(() => {
    query.mockReset();
  });

  it('GET /api/resources casts latitude and longitude to float8', async () => {
    query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ total: '0' }] });

    await listHandler({ method: 'GET', query: {} }, mockRes());

    const sql = query.mock.calls[0][0];
    CASTS.forEach((pattern) => expect(sql).toMatch(pattern));
  });

  it('GET /api/resources/:id casts latitude and longitude to float8', async () => {
    query.mockResolvedValue({ rows: [] });

    await detailHandler({ method: 'GET', query: { id: '1' } }, mockRes());

    const sql = query.mock.calls[0][0];
    CASTS.forEach((pattern) => expect(sql).toMatch(pattern));
  });
});
