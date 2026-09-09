import { describe, it, expect, afterEach, vi } from 'vitest';
import { fetchResources, fetchResourceById, fetchCounties, fetchServiceTypes } from './api.js';

function mockFetchOnce(status, body) {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      statusText: status === 200 ? 'OK' : 'Error',
      json: () => Promise.resolve(body),
    })
  );
}

describe('api client', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchResources', () => {
    it('returns the resources array on success', async () => {
      const resources = [{ id: 1, name: 'Test Pantry', services: ['Food Pantry'] }];
      mockFetchOnce(200, { success: true, data: { resources, total: 1, limit: 500, offset: 0 } });

      const result = await fetchResources();

      expect(result).toEqual(resources);
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/resources?limit=500');
    });

    it('throws when the HTTP response is not ok', async () => {
      mockFetchOnce(500, { success: false, error: 'Internal server error' });

      await expect(fetchResources()).rejects.toThrow(/500/);
    });

    it('throws when the API reports success: false', async () => {
      mockFetchOnce(200, { success: false, error: 'Database unreachable' });

      await expect(fetchResources()).rejects.toThrow('Database unreachable');
    });
  });

  describe('fetchResourceById', () => {
    it('requests the correct path and returns the resource', async () => {
      const resource = { id: 42, name: 'Specific Pantry' };
      mockFetchOnce(200, { success: true, data: resource });

      const result = await fetchResourceById(42);

      expect(result).toEqual(resource);
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/resources/42');
    });
  });

  describe('fetchCounties', () => {
    it('returns county data', async () => {
      const counties = [{ id: 1, name: 'Fulton', resourceCount: 34 }];
      mockFetchOnce(200, { success: true, data: counties });

      const result = await fetchCounties();

      expect(result).toEqual(counties);
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/counties');
    });
  });

  describe('fetchServiceTypes', () => {
    it('requests the flat list by default', async () => {
      mockFetchOnce(200, { success: true, data: [] });

      await fetchServiceTypes();

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/service-types');
    });

    it('requests the grouped list when grouped=true', async () => {
      mockFetchOnce(200, { success: true, data: [] });

      await fetchServiceTypes(true);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/service-types?grouped=true');
    });
  });
});
