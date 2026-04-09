/* eslint-env node */
/**
 * validate-data-lib.js
 * -------------------
 * This library provides pure functions for validating food resource data.
 */

// Required fields for each resource
export const requiredFields = [
  'id', 'name', 'address', 'city', 'state', 'zipCode',
  'county', 'phone', 'website', 'description', 'services', 'hours'
];

// Allowed service values
// Note: This list is kept in sync with src/constants/serviceTypes.js
// If you add a new service type, update both files and run: npm run validate
export const allowedServices = [
  // Primary food services
  'Food Pantry',
  'Free Meals',
  'Mobile Pantry',
  'Emergency Food',
  'Meal Delivery',
  'Food Distribution',
  // Support services
  'Emergency Assistance',
  'Emergency Services',
  'Financial Assistance',
  'Case Management',
  // Housing services
  'Shelter',
  'Housing Support',
  // Specialized food services
  'Fresh Produce',
  'Grocery Delivery',
  'Grocery Programs',
  'Holiday Meals',
  'Nutrition Support',
  // Healthcare services
  'Healthcare',
  'Pharmacy',
  // Age-specific services
  'Senior Programs',
  'Senior Services',
  'Youth Programs',
  'After School Programs',
  'Childcare',
  // Education services
  'Education',
  'English Classes',
  // Material assistance services
  'Clothing',
  'Furniture Bank',
  'Thrift Store',
  // Community and family support
  'Community Resources',
  'Community Support',
  'Community Programs',
  'Community Partnerships',
  'Community Popups',
  'Family Resources',
  'Family Support',
  'Home Visits',
  'Student Support',
  // Partnership services
  'Partner Network',
  'Partner Agency Network'
];

// Allowed county values
// Note: This list is kept in sync with src/constants/counties.js
// If you add a new county, update both files and run: npm run validate
export const allowedCounties = [
  // Core Metro Atlanta Counties
  'Fulton',
  'DeKalb',
  'Cobb',
  'Gwinnett',
  'Clayton',
  'Cherokee',
  'Paulding',
  'Henry',
  'Douglas'
];

/**
 * Check for duplicate IDs in the resources array
 * @param {Array} resources - Array of resource objects
 * @returns {Array} Array of duplicate ID values
 */
export function checkDuplicateIds(resources) {
  const ids = resources.map(r => r.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  return [...new Set(duplicates)]; // Remove duplicates from duplicates list
}

/**
 * Validate required fields are present
 * @param {Object} resource - Resource object to validate
 * @returns {Array} Array of missing field names
 */
export function checkRequiredFields(resource) {
  return requiredFields.filter(field => !resource[field]);
}

/**
 * Check if ID is sequential (matches expected index)
 * @param {Object} resource - Resource object
 * @param {number} expectedId - Expected ID value (1-based index)
 * @returns {boolean} True if ID matches expected value
 */
export function isIdSequential(resource, expectedId) {
  return resource.id === expectedId;
}

/**
 * Validate zipCode is a string type
 * @param {*} zipCode - Value to validate
 * @returns {boolean} True if zipCode is a string
 */
export function isZipCodeValid(zipCode) {
  return typeof zipCode === 'string';
}

/**
 * Validate phone format: (XXX) XXX-XXXX
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone matches format
 */
export function isPhoneFormatValid(phone) {
  if (!phone) return false;
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
}

/**
 * Validate website starts with http:// or https://
 * @param {string} website - Website URL to validate
 * @returns {boolean} True if website has valid protocol
 */
export function isWebsiteFormatValid(website) {
  if (!website) return false;
  return website.startsWith('http://') || website.startsWith('https://');
}

/**
 * Validate services array contains only allowed values
 * @param {Array} services - Array of service strings
 * @returns {Array} Array of invalid service values
 */
export function checkInvalidServices(services) {
  if (!Array.isArray(services)) return [];
  return services.filter(s => !allowedServices.includes(s));
}

/**
 * Check if services field is an array
 * @param {*} services - Value to check
 * @returns {boolean} True if services is an array
 */
export function isServicesArray(services) {
  return Array.isArray(services);
}

/**
 * Validate county is in allowed list
 * @param {string} county - County name to validate
 * @returns {boolean} True if county is in allowed list
 */
export function isCountyValid(county) {
  if (!county) return false;
  return allowedCounties.includes(county);
}

/**
 * Validate coordinate presence (both or neither)
 * @param {Object} resource - Resource object
 * @returns {Object} { valid: boolean, hasLat: boolean, hasLng: boolean, error: string|null }
 */
export function validateCoordinatePresence(resource) {
  const hasLat = resource.latitude != null;
  const hasLng = resource.longitude != null;

  if (hasLat !== hasLng) {
    return {
      valid: false,
      hasLat,
      hasLng,
      error: `has only ${hasLat ? 'latitude' : 'longitude'} - both required`
    };
  }

  if (!hasLat && !hasLng) {
    return {
      valid: true,
      hasLat,
      hasLng,
      warning: 'missing latitude/longitude - will not appear on map'
    };
  }

  return { valid: true, hasLat, hasLng, error: null };
}

/**
 * Validate coordinate types are numbers
 * @param {number} latitude - Latitude value
 * @param {number} longitude - Longitude value
 * @returns {Object} { valid: boolean, error: string|null }
 */
export function validateCoordinateTypes(latitude, longitude) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return { valid: false, error: 'coordinates must be numbers' };
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    return { valid: false, error: 'has NaN coordinates' };
  }
  return { valid: true, error: null };
}

/**
 * Validate coordinate ranges (-90 to 90 for lat, -180 to 180 for lng)
 * @param {number} latitude - Latitude value
 * @param {number} longitude - Longitude value
 * @returns {Object} { valid: boolean, errors: Array }
 */
export function validateCoordinateRanges(latitude, longitude) {
  const errors = [];

  if (latitude < -90 || latitude > 90) {
    errors.push(`latitude out of range: ${latitude}`);
  }
  if (longitude < -180 || longitude > 180) {
    errors.push(`longitude out of range: ${longitude}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate a single resource completely
 * @param {Object} resource - Resource object to validate
 * @param {number} index - Array index (0-based)
 * @returns {Object} { errors: Array, warnings: Array }
 */
export function validateResource(resource, index) {
  const errors = [];
  const warnings = [];
  const resourceNum = index + 1;

  // Check required fields
  const missingFields = checkRequiredFields(resource);
  if (missingFields.length > 0) {
    errors.push(`missing required fields: ${missingFields.join(', ')}`);
  }

  // Check ID is sequential
  if (!isIdSequential(resource, resourceNum)) {
    warnings.push(`has ID ${resource.id} (expected ${resourceNum})`);
  }

  // Check zipCode is a string
  if (resource.zipCode && !isZipCodeValid(resource.zipCode)) {
    errors.push(`zipCode must be string, got ${typeof resource.zipCode}`);
  }

  // Check phone format
  if (resource.phone && !isPhoneFormatValid(resource.phone)) {
    warnings.push(`phone format should be (XXX) XXX-XXXX, got: ${resource.phone}`);
  }

  // Check website format
  if (resource.website && !isWebsiteFormatValid(resource.website)) {
    errors.push(`website must start with http:// or https://, got: ${resource.website}`);
  }

  // Check county
  if (resource.county && !isCountyValid(resource.county)) {
    errors.push(`county must be one of allowed counties, got: ${resource.county}`);
  }

  // Check services
  if (resource.services) {
    if (!isServicesArray(resource.services)) {
      errors.push('services must be an array');
    } else {
      const invalidServices = checkInvalidServices(resource.services);
      if (invalidServices.length > 0) {
        warnings.push(`has non-standard services: ${invalidServices.join(', ')}`);
      }
    }
  }

  // Check coordinates
  const coordPresence = validateCoordinatePresence(resource);
  if (!coordPresence.valid) {
    errors.push(coordPresence.error);
  } else if (coordPresence.warning) {
    warnings.push(coordPresence.warning);
  } else if (coordPresence.hasLat && coordPresence.hasLng) {
    // Validate types
    const typeCheck = validateCoordinateTypes(resource.latitude, resource.longitude);
    if (!typeCheck.valid) {
      errors.push(typeCheck.error);
    } else {
      // Validate ranges
      const rangeCheck = validateCoordinateRanges(resource.latitude, resource.longitude);
      if (!rangeCheck.valid) {
        errors.push(...rangeCheck.errors);
      }
    }
  }

  return { errors, warnings };
}
