import { describe, it, expect } from 'vitest';
import { calculateDistance, sortByDistance } from './distanceCalculator.js';

describe('distanceCalculator', () => {
  describe('calculateDistance', () => {
    describe('valid coordinate calculations', () => {
      it('should calculate distance between Atlanta and Decatur', () => {
        // Atlanta downtown coordinates
        const atlantaLat = 33.7490;
        const atlantaLng = -84.3880;
        
        // Decatur coordinates
        const decaturLat = 33.7748;
        const decaturLng = -84.2963;
        
        const distance = calculateDistance(atlantaLat, atlantaLng, decaturLat, decaturLng);
        
        // Expected ~6 miles
        expect(distance).toBeGreaterThan(5);
        expect(distance).toBeLessThan(7);
      });

      it('should return 0.0 for same location', () => {
        const lat = 33.7490;
        const lng = -84.3880;
        
        const distance = calculateDistance(lat, lng, lat, lng);
        
        expect(distance).toBe(0.0);
      });

      it('should round result to 1 decimal place', () => {
        const lat1 = 33.7490;
        const lng1 = -84.3880;
        const lat2 = 33.7491;
        const lng2 = -84.3881;
        
        const distance = calculateDistance(lat1, lng1, lat2, lng2);
        
        // Check that result has at most 1 decimal place
        expect(distance.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(1);
      });

      it('should calculate long distances accurately', () => {
        // Atlanta to New York (approximately 750 miles)
        const atlantaLat = 33.7490;
        const atlantaLng = -84.3880;
        const nyLat = 40.7128;
        const nyLng = -74.0060;
        
        const distance = calculateDistance(atlantaLat, atlantaLng, nyLat, nyLng);
        
        expect(distance).toBeGreaterThan(740);
        expect(distance).toBeLessThan(760);
      });

      it('should handle coordinates at equator', () => {
        const distance = calculateDistance(0, 0, 0, 1);
        
        expect(distance).toBeGreaterThan(0);
        expect(typeof distance).toBe('number');
      });
    });

    describe('null and undefined handling', () => {
      it('should return null when lat1 is null', () => {
        const result = calculateDistance(null, -84.3880, 33.7490, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when lon1 is null', () => {
        const result = calculateDistance(33.7490, null, 33.7490, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when lat2 is undefined', () => {
        const result = calculateDistance(33.7490, -84.3880, undefined, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when lon2 is undefined', () => {
        const result = calculateDistance(33.7490, -84.3880, 33.7490, undefined);
        expect(result).toBeNull();
      });

      it('should return null when all coordinates are null', () => {
        const result = calculateDistance(null, null, null, null);
        expect(result).toBeNull();
      });
    });

    describe('type validation', () => {
      it('should return null when lat1 is a string', () => {
        const result = calculateDistance('33.7490', -84.3880, 33.7490, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when coordinates are strings', () => {
        const result = calculateDistance('33.7490', '-84.3880', '33.7490', '-84.3880');
        expect(result).toBeNull();
      });

      it('should return null when coordinates are booleans', () => {
        const result = calculateDistance(true, false, true, false);
        expect(result).toBeNull();
      });

      it('should return null when lat1 is NaN', () => {
        const result = calculateDistance(NaN, -84.3880, 33.7490, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when any coordinate is NaN', () => {
        const result = calculateDistance(33.7490, NaN, NaN, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when coordinates are objects', () => {
        const result = calculateDistance({}, {}, {}, {});
        expect(result).toBeNull();
      });
    });

    describe('range validation', () => {
      it('should return null when lat1 exceeds 90', () => {
        const result = calculateDistance(91, -84.3880, 33.7490, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when lat1 is less than -90', () => {
        const result = calculateDistance(-91, -84.3880, 33.7490, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when lat2 exceeds 90', () => {
        const result = calculateDistance(33.7490, -84.3880, 91, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when lon1 exceeds 180', () => {
        const result = calculateDistance(33.7490, 181, 33.7490, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when lon1 is less than -180', () => {
        const result = calculateDistance(33.7490, -181, 33.7490, -84.3880);
        expect(result).toBeNull();
      });

      it('should return null when lon2 exceeds 180', () => {
        const result = calculateDistance(33.7490, -84.3880, 33.7490, 181);
        expect(result).toBeNull();
      });

      it('should accept boundary values (90, -90, 180, -180)', () => {
        // Exactly 90, -90, 180, -180 should be valid
        const result = calculateDistance(90, -180, -90, 180);
        expect(result).not.toBeNull();
        expect(typeof result).toBe('number');
      });

      it('should accept latitude at exactly 90 degrees', () => {
        const result = calculateDistance(90, 0, 89, 0);
        expect(result).not.toBeNull();
      });

      it('should accept longitude at exactly 180 degrees', () => {
        const result = calculateDistance(0, 180, 0, 179);
        expect(result).not.toBeNull();
      });
    });
  });

  describe('sortByDistance', () => {
    it('should sort resources by distance from nearest to farthest', () => {
      const userLat = 33.7490;
      const userLng = -84.3880;
      
      const resources = [
        { id: 1, name: 'Far', latitude: 34.0, longitude: -84.0 },
        { id: 2, name: 'Near', latitude: 33.75, longitude: -84.39 },
        { id: 3, name: 'Medium', latitude: 33.85, longitude: -84.35 }
      ];
      
      const sorted = sortByDistance(resources, userLat, userLng);
      
      // Verify order (Near < Medium < Far)
      expect(sorted[0].name).toBe('Near');
      expect(sorted[0].distance).toBeLessThan(sorted[1].distance);
      expect(sorted[1].distance).toBeLessThan(sorted[2].distance);
    });

    it('should add distance property to each resource', () => {
      const userLat = 33.7490;
      const userLng = -84.3880;
      
      const resources = [
        { id: 1, name: 'Test', latitude: 33.75, longitude: -84.39 }
      ];
      
      const sorted = sortByDistance(resources, userLat, userLng);
      
      expect(sorted[0]).toHaveProperty('distance');
      expect(typeof sorted[0].distance).toBe('number');
    });

    it('should preserve original properties', () => {
      const userLat = 33.7490;
      const userLng = -84.3880;
      
      const resources = [
        { id: 1, name: 'Test', county: 'Fulton', latitude: 33.75, longitude: -84.39 }
      ];
      
      const sorted = sortByDistance(resources, userLat, userLng);
      
      expect(sorted[0].id).toBe(1);
      expect(sorted[0].name).toBe('Test');
      expect(sorted[0].county).toBe('Fulton');
    });

    it('should return original array when user coords are null', () => {
      const resources = [
        { id: 1, name: 'Test', latitude: 33.75, longitude: -84.39 }
      ];
      
      const sorted = sortByDistance(resources, null, null);
      
      expect(sorted).toEqual(resources);
      expect(sorted[0]).not.toHaveProperty('distance');
    });

    it('should return original array when userLat is null', () => {
      const resources = [
        { id: 1, name: 'Test', latitude: 33.75, longitude: -84.39 }
      ];
      
      const sorted = sortByDistance(resources, null, -84.3880);
      
      expect(sorted).toEqual(resources);
    });

    it('should assign null distance to resources missing coordinates', () => {
      const userLat = 33.7490;
      const userLng = -84.3880;
      
      const resources = [
        { id: 1, name: 'No Coords', latitude: null, longitude: null },
        { id: 2, name: 'Has Coords', latitude: 33.75, longitude: -84.39 }
      ];
      
      const sorted = sortByDistance(resources, userLat, userLng);
      
      expect(sorted[0].distance).not.toBeNull(); // Has coords comes first
      expect(sorted[1].distance).toBeNull();     // No coords comes last
    });

    it('should sort resources with null distances to end', () => {
      const userLat = 33.7490;
      const userLng = -84.3880;
      
      const resources = [
        { id: 1, name: 'No Coords 1', latitude: null, longitude: null },
        { id: 2, name: 'Has Coords', latitude: 33.75, longitude: -84.39 },
        { id: 3, name: 'No Coords 2', latitude: undefined, longitude: -84.39 }
      ];
      
      const sorted = sortByDistance(resources, userLat, userLng);
      
      expect(sorted[0].name).toBe('Has Coords');
      expect(sorted[1].name).toContain('No Coords');
      expect(sorted[2].name).toContain('No Coords');
    });

    it('should handle empty resources array', () => {
      const sorted = sortByDistance([], 33.7490, -84.3880);
      
      expect(sorted).toEqual([]);
    });

    it('should handle single resource', () => {
      const userLat = 33.7490;
      const userLng = -84.3880;
      
      const resources = [
        { id: 1, name: 'Only One', latitude: 33.75, longitude: -84.39 }
      ];
      
      const sorted = sortByDistance(resources, userLat, userLng);
      
      expect(sorted).toHaveLength(1);
      expect(sorted[0]).toHaveProperty('distance');
    });

    it('should not mutate the original array', () => {
      const userLat = 33.7490;
      const userLng = -84.3880;
      
      const resources = [
        { id: 1, name: 'Test', latitude: 33.75, longitude: -84.39 }
      ];
      
      const sorted = sortByDistance(resources, userLat, userLng);
      
      // Original should not have distance property
      expect(resources[0]).not.toHaveProperty('distance');
      expect(sorted[0]).toHaveProperty('distance');
    });
  });
});
