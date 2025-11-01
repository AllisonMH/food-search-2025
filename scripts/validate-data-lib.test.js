/* eslint-env node */
import { describe, it, expect } from 'vitest';
import {
  requiredFields,
  allowedServices,
  checkDuplicateIds,
  checkRequiredFields,
  isIdSequential,
  isZipCodeValid,
  isPhoneFormatValid,
  isWebsiteFormatValid,
  checkInvalidServices,
  isServicesArray,
  validateCoordinatePresence,
  validateCoordinateTypes,
  validateCoordinateRanges,
  validateResource
} from './validate-data-lib.js';

describe('validate-data-lib', () => {
  describe('checkDuplicateIds', () => {
    it('should return empty array when no duplicates', () => {
      const resources = [
        { id: 1, name: 'Resource 1' },
        { id: 2, name: 'Resource 2' },
        { id: 3, name: 'Resource 3' }
      ];
      expect(checkDuplicateIds(resources)).toEqual([]);
    });

    it('should return duplicate IDs when found', () => {
      const resources = [
        { id: 1, name: 'Resource 1' },
        { id: 2, name: 'Resource 2' },
        { id: 1, name: 'Resource 3' }
      ];
      expect(checkDuplicateIds(resources)).toEqual([1]);
    });

    it('should handle multiple duplicates', () => {
      const resources = [
        { id: 1, name: 'Resource 1' },
        { id: 2, name: 'Resource 2' },
        { id: 1, name: 'Resource 3' },
        { id: 2, name: 'Resource 4' }
      ];
      expect(checkDuplicateIds(resources)).toEqual([1, 2]);
    });

    it('should handle empty array', () => {
      expect(checkDuplicateIds([])).toEqual([]);
    });
  });

  describe('checkRequiredFields', () => {
    it('should return empty array when all fields present', () => {
      const resource = {
        id: 1,
        name: 'Test Resource',
        address: '123 Main St',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30303',
        county: 'Fulton',
        phone: '(404) 555-1234',
        website: 'https://example.com',
        description: 'Test description',
        services: ['Food Pantry'],
        hours: 'Mon-Fri 9-5'
      };
      expect(checkRequiredFields(resource)).toEqual([]);
    });

    it('should return missing field names', () => {
      const resource = {
        id: 1,
        name: 'Test Resource'
      };
      const missing = checkRequiredFields(resource);
      expect(missing).toContain('address');
      expect(missing).toContain('city');
      expect(missing).toContain('phone');
      expect(missing.length).toBe(10);
    });

    it('should detect falsy values as missing', () => {
      const resource = {
        id: 1,
        name: '',
        address: null,
        city: undefined,
        state: 'GA',
        zipCode: '30303',
        county: 'Fulton',
        phone: '(404) 555-1234',
        website: 'https://example.com',
        description: 'Test',
        services: ['Food Pantry'],
        hours: 'Mon-Fri 9-5'
      };
      const missing = checkRequiredFields(resource);
      expect(missing).toContain('name');
      expect(missing).toContain('address');
      expect(missing).toContain('city');
    });
  });

  describe('isIdSequential', () => {
    it('should return true when ID matches expected value', () => {
      const resource = { id: 5, name: 'Test' };
      expect(isIdSequential(resource, 5)).toBe(true);
    });

    it('should return false when ID does not match', () => {
      const resource = { id: 3, name: 'Test' };
      expect(isIdSequential(resource, 5)).toBe(false);
    });

    it('should handle first resource (ID 1)', () => {
      const resource = { id: 1, name: 'Test' };
      expect(isIdSequential(resource, 1)).toBe(true);
    });
  });

  describe('isZipCodeValid', () => {
    it('should return true for string zipCode', () => {
      expect(isZipCodeValid('30303')).toBe(true);
    });

    it('should return true for string with leading zero', () => {
      expect(isZipCodeValid('01234')).toBe(true);
    });

    it('should return false for number zipCode', () => {
      expect(isZipCodeValid(30303)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isZipCodeValid(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isZipCodeValid(undefined)).toBe(false);
    });
  });

  describe('isPhoneFormatValid', () => {
    it('should return true for valid format', () => {
      expect(isPhoneFormatValid('(404) 555-1234')).toBe(true);
    });

    it('should return false for missing parentheses', () => {
      expect(isPhoneFormatValid('404-555-1234')).toBe(false);
    });

    it('should return false for wrong spacing', () => {
      expect(isPhoneFormatValid('(404)555-1234')).toBe(false);
    });

    it('should return false for missing dash', () => {
      expect(isPhoneFormatValid('(404) 5551234')).toBe(false);
    });

    it('should return false for extra digits', () => {
      expect(isPhoneFormatValid('(404) 555-12345')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isPhoneFormatValid(null)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isPhoneFormatValid('')).toBe(false);
    });
  });

  describe('isWebsiteFormatValid', () => {
    it('should return true for https URL', () => {
      expect(isWebsiteFormatValid('https://example.com')).toBe(true);
    });

    it('should return true for http URL', () => {
      expect(isWebsiteFormatValid('http://example.com')).toBe(true);
    });

    it('should return false for missing protocol', () => {
      expect(isWebsiteFormatValid('example.com')).toBe(false);
    });

    it('should return false for wrong protocol', () => {
      expect(isWebsiteFormatValid('ftp://example.com')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isWebsiteFormatValid(null)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isWebsiteFormatValid('')).toBe(false);
    });
  });

  describe('isServicesArray', () => {
    it('should return true for array', () => {
      expect(isServicesArray(['Food Pantry'])).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(isServicesArray([])).toBe(true);
    });

    it('should return false for string', () => {
      expect(isServicesArray('Food Pantry')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isServicesArray(null)).toBe(false);
    });

    it('should return false for object', () => {
      expect(isServicesArray({ service: 'Food Pantry' })).toBe(false);
    });
  });

  describe('checkInvalidServices', () => {
    it('should return empty array for all valid services', () => {
      const services = ['Food Pantry', 'Free Meals', 'Emergency Assistance'];
      expect(checkInvalidServices(services)).toEqual([]);
    });

    it('should return invalid service names', () => {
      const services = ['Food Pantry', 'Invalid Service', 'Another Invalid'];
      const invalid = checkInvalidServices(services);
      expect(invalid).toEqual(['Invalid Service', 'Another Invalid']);
    });

    it('should return empty array for empty array', () => {
      expect(checkInvalidServices([])).toEqual([]);
    });

    it('should return empty array for non-array', () => {
      expect(checkInvalidServices('Food Pantry')).toEqual([]);
    });

    it('should validate all allowed services', () => {
      // Test that all allowed services are recognized
      allowedServices.forEach(service => {
        expect(checkInvalidServices([service])).toEqual([]);
      });
    });
  });

  describe('validateCoordinatePresence', () => {
    it('should return valid when both coordinates present', () => {
      const resource = { latitude: 33.7490, longitude: -84.3880 };
      const result = validateCoordinatePresence(resource);
      expect(result.valid).toBe(true);
      expect(result.hasLat).toBe(true);
      expect(result.hasLng).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return warning when both coordinates missing', () => {
      const resource = {};
      const result = validateCoordinatePresence(resource);
      expect(result.valid).toBe(true);
      expect(result.hasLat).toBe(false);
      expect(result.hasLng).toBe(false);
      expect(result.warning).toBe('missing latitude/longitude - will not appear on map');
    });

    it('should return error when only latitude present', () => {
      const resource = { latitude: 33.7490 };
      const result = validateCoordinatePresence(resource);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('has only latitude - both required');
    });

    it('should return error when only longitude present', () => {
      const resource = { longitude: -84.3880 };
      const result = validateCoordinatePresence(resource);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('has only longitude - both required');
    });

    it('should handle null values as missing', () => {
      const resource = { latitude: null, longitude: null };
      const result = validateCoordinatePresence(resource);
      expect(result.valid).toBe(true);
      expect(result.hasLat).toBe(false);
      expect(result.hasLng).toBe(false);
    });
  });

  describe('validateCoordinateTypes', () => {
    it('should return valid for number coordinates', () => {
      const result = validateCoordinateTypes(33.7490, -84.3880);
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return error for string latitude', () => {
      const result = validateCoordinateTypes('33.7490', -84.3880);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('coordinates must be numbers');
    });

    it('should return error for string longitude', () => {
      const result = validateCoordinateTypes(33.7490, '-84.3880');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('coordinates must be numbers');
    });

    it('should return error for NaN latitude', () => {
      const result = validateCoordinateTypes(NaN, -84.3880);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('has NaN coordinates');
    });

    it('should return error for NaN longitude', () => {
      const result = validateCoordinateTypes(33.7490, NaN);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('has NaN coordinates');
    });

    it('should return error for both NaN', () => {
      const result = validateCoordinateTypes(NaN, NaN);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('has NaN coordinates');
    });
  });

  describe('validateCoordinateRanges', () => {
    it('should return valid for coordinates in range', () => {
      const result = validateCoordinateRanges(33.7490, -84.3880);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should return error for latitude > 90', () => {
      const result = validateCoordinateRanges(95, -84.3880);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('latitude out of range: 95');
    });

    it('should return error for latitude < -90', () => {
      const result = validateCoordinateRanges(-95, -84.3880);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('latitude out of range: -95');
    });

    it('should return error for longitude > 180', () => {
      const result = validateCoordinateRanges(33.7490, 185);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('longitude out of range: 185');
    });

    it('should return error for longitude < -180', () => {
      const result = validateCoordinateRanges(33.7490, -185);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('longitude out of range: -185');
    });

    it('should return multiple errors for both out of range', () => {
      const result = validateCoordinateRanges(95, 185);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(2);
    });

    it('should accept boundary values', () => {
      const result1 = validateCoordinateRanges(90, 180);
      expect(result1.valid).toBe(true);
      const result2 = validateCoordinateRanges(-90, -180);
      expect(result2.valid).toBe(true);
    });
  });

  describe('validateResource', () => {
    const validResource = {
      id: 1,
      name: 'Test Resource',
      address: '123 Main St',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30303',
      county: 'Fulton',
      phone: '(404) 555-1234',
      website: 'https://example.com',
      description: 'Test description',
      services: ['Food Pantry'],
      hours: 'Mon-Fri 9-5',
      latitude: 33.7490,
      longitude: -84.3880
    };

    it('should return no errors or warnings for valid resource', () => {
      const result = validateResource(validResource, 0);
      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([]);
    });

    it('should detect missing required fields', () => {
      const resource = { id: 1, name: 'Test' };
      const result = validateResource(resource, 0);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('missing required fields');
    });

    it('should warn about non-sequential ID', () => {
      const resource = { ...validResource, id: 5 };
      const result = validateResource(resource, 0);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0]).toContain('has ID 5 (expected 1)');
    });

    it('should error on non-string zipCode', () => {
      const resource = { ...validResource, zipCode: 30303 };
      const result = validateResource(resource, 0);
      expect(result.errors.some(e => e.includes('zipCode must be string'))).toBe(true);
    });

    it('should warn about invalid phone format', () => {
      const resource = { ...validResource, phone: '404-555-1234' };
      const result = validateResource(resource, 0);
      expect(result.warnings.some(w => w.includes('phone format'))).toBe(true);
    });

    it('should error on invalid website format', () => {
      const resource = { ...validResource, website: 'example.com' };
      const result = validateResource(resource, 0);
      expect(result.errors.some(e => e.includes('website must start with'))).toBe(true);
    });

    it('should error on non-array services', () => {
      const resource = { ...validResource, services: 'Food Pantry' };
      const result = validateResource(resource, 0);
      expect(result.errors.some(e => e.includes('services must be an array'))).toBe(true);
    });

    it('should warn about invalid services', () => {
      const resource = { ...validResource, services: ['Invalid Service'] };
      const result = validateResource(resource, 0);
      expect(result.warnings.some(w => w.includes('non-standard services'))).toBe(true);
    });

    it('should warn about missing coordinates', () => {
      const resource = { ...validResource };
      delete resource.latitude;
      delete resource.longitude;
      const result = validateResource(resource, 0);
      expect(result.warnings.some(w => w.includes('missing latitude/longitude'))).toBe(true);
    });

    it('should error when only latitude present', () => {
      const resource = { ...validResource };
      delete resource.longitude;
      const result = validateResource(resource, 0);
      expect(result.errors.some(e => e.includes('has only latitude'))).toBe(true);
    });

    it('should error on non-number coordinates', () => {
      const resource = { ...validResource, latitude: '33.7490' };
      const result = validateResource(resource, 0);
      expect(result.errors.some(e => e.includes('coordinates must be numbers'))).toBe(true);
    });

    it('should error on out-of-range latitude', () => {
      const resource = { ...validResource, latitude: 95 };
      const result = validateResource(resource, 0);
      expect(result.errors.some(e => e.includes('latitude out of range'))).toBe(true);
    });

    it('should handle multiple errors and warnings', () => {
      const resource = {
        ...validResource,
        id: 10,
        phone: '404-555-1234',
        services: ['Invalid Service'],
        zipCode: 30303
      };
      const result = validateResource(resource, 0);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('constants', () => {
    it('should export requiredFields array with 12 fields', () => {
      expect(Array.isArray(requiredFields)).toBe(true);
      expect(requiredFields.length).toBe(12);
      expect(requiredFields).toContain('id');
      expect(requiredFields).toContain('name');
      expect(requiredFields).toContain('services');
    });

    it('should export allowedServices array with expected values', () => {
      expect(Array.isArray(allowedServices)).toBe(true);
      expect(allowedServices.length).toBeGreaterThan(30);
      expect(allowedServices).toContain('Food Pantry');
      expect(allowedServices).toContain('Free Meals');
      expect(allowedServices).toContain('Emergency Assistance');
    });
  });
});
