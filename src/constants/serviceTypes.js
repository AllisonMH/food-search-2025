/**
 * Service Types Constants
 *
 * Comprehensive list of all service types offered by food resources.
 * Organized by category for better maintainability.
 *
 * Usage:
 *   import { PRIMARY_FOOD_SERVICES, ALL_SERVICE_TYPES } from './constants/serviceTypes';
 */

// Primary food-related services
export const PRIMARY_FOOD_SERVICES = {
  FOOD_PANTRY: 'Food Pantry',
  FREE_MEALS: 'Free Meals',
  MOBILE_PANTRY: 'Mobile Pantry',
  EMERGENCY_FOOD: 'Emergency Food',
  MEAL_DELIVERY: 'Meal Delivery',
  FOOD_DISTRIBUTION: 'Food Distribution',
};

// Emergency and financial support services
export const SUPPORT_SERVICES = {
  EMERGENCY_ASSISTANCE: 'Emergency Assistance',
  EMERGENCY_SERVICES: 'Emergency Services',
  FINANCIAL_ASSISTANCE: 'Financial Assistance',
  CASE_MANAGEMENT: 'Case Management',
};

// Shelter and housing services
export const HOUSING_SERVICES = {
  SHELTER: 'Shelter',
  HOUSING_SUPPORT: 'Housing Support',
};

// Specialized food programs
export const SPECIALIZED_FOOD_SERVICES = {
  FRESH_PRODUCE: 'Fresh Produce',
  GROCERY_DELIVERY: 'Grocery Delivery',
  GROCERY_PROGRAMS: 'Grocery Programs',
  HOLIDAY_MEALS: 'Holiday Meals',
  NUTRITION_SUPPORT: 'Nutrition Support',
};

// Healthcare services
export const HEALTH_SERVICES = {
  HEALTHCARE: 'Healthcare',
  PHARMACY: 'Pharmacy',
};

// Age-specific programs
export const AGE_SPECIFIC_SERVICES = {
  SENIOR_PROGRAMS: 'Senior Programs',
  SENIOR_SERVICES: 'Senior Services',
  YOUTH_PROGRAMS: 'Youth Programs',
  AFTER_SCHOOL_PROGRAMS: 'After School Programs',
  CHILDCARE: 'Childcare',
};

// Educational and employment services
export const EDUCATION_SERVICES = {
  EDUCATION: 'Education',
  ENGLISH_CLASSES: 'English Classes',
};

// Material assistance services
export const MATERIAL_SERVICES = {
  CLOTHING: 'Clothing',
  FURNITURE_BANK: 'Furniture Bank',
  THRIFT_STORE: 'Thrift Store',
};

// Community and family support
export const COMMUNITY_SERVICES = {
  COMMUNITY_RESOURCES: 'Community Resources',
  COMMUNITY_SUPPORT: 'Community Support',
  COMMUNITY_PROGRAMS: 'Community Programs',
  COMMUNITY_PARTNERSHIPS: 'Community Partnerships',
  COMMUNITY_POPUPS: 'Community Popups',
  FAMILY_RESOURCES: 'Family Resources',
  FAMILY_SUPPORT: 'Family Support',
  HOME_VISITS: 'Home Visits',
  STUDENT_SUPPORT: 'Student Support',
};

// Partnership and network services
export const NETWORK_SERVICES = {
  PARTNER_NETWORK: 'Partner Network',
  PARTNER_AGENCY_NETWORK: 'Partner Agency Network',
};

/**
 * All service types in a flat array for validation
 */
export const ALL_SERVICE_TYPES = [
  ...Object.values(PRIMARY_FOOD_SERVICES),
  ...Object.values(SUPPORT_SERVICES),
  ...Object.values(HOUSING_SERVICES),
  ...Object.values(SPECIALIZED_FOOD_SERVICES),
  ...Object.values(HEALTH_SERVICES),
  ...Object.values(AGE_SPECIFIC_SERVICES),
  ...Object.values(EDUCATION_SERVICES),
  ...Object.values(MATERIAL_SERVICES),
  ...Object.values(COMMUNITY_SERVICES),
  ...Object.values(NETWORK_SERVICES),
];

/**
 * Service categories for grouping in UI (optional future enhancement)
 */
export const SERVICE_CATEGORIES = {
  FOOD: 'Food Services',
  SUPPORT: 'Support Services',
  HOUSING: 'Housing Services',
  HEALTH: 'Health Services',
  AGE_SPECIFIC: 'Age-Specific Programs',
  EDUCATION: 'Education Services',
  MATERIAL: 'Material Assistance',
  COMMUNITY: 'Community Services',
  NETWORK: 'Partnership Services',
};

/**
 * Map service types to their categories
 */
export const SERVICE_TO_CATEGORY = {
  ...Object.fromEntries(Object.values(PRIMARY_FOOD_SERVICES).map(s => [s, SERVICE_CATEGORIES.FOOD])),
  ...Object.fromEntries(Object.values(SPECIALIZED_FOOD_SERVICES).map(s => [s, SERVICE_CATEGORIES.FOOD])),
  ...Object.fromEntries(Object.values(SUPPORT_SERVICES).map(s => [s, SERVICE_CATEGORIES.SUPPORT])),
  ...Object.fromEntries(Object.values(HOUSING_SERVICES).map(s => [s, SERVICE_CATEGORIES.HOUSING])),
  ...Object.fromEntries(Object.values(HEALTH_SERVICES).map(s => [s, SERVICE_CATEGORIES.HEALTH])),
  ...Object.fromEntries(Object.values(AGE_SPECIFIC_SERVICES).map(s => [s, SERVICE_CATEGORIES.AGE_SPECIFIC])),
  ...Object.fromEntries(Object.values(EDUCATION_SERVICES).map(s => [s, SERVICE_CATEGORIES.EDUCATION])),
  ...Object.fromEntries(Object.values(MATERIAL_SERVICES).map(s => [s, SERVICE_CATEGORIES.MATERIAL])),
  ...Object.fromEntries(Object.values(COMMUNITY_SERVICES).map(s => [s, SERVICE_CATEGORIES.COMMUNITY])),
  ...Object.fromEntries(Object.values(NETWORK_SERVICES).map(s => [s, SERVICE_CATEGORIES.NETWORK])),
};

/**
 * Helper function to validate if a service type is valid
 */
export function isValidServiceType(serviceType) {
  return ALL_SERVICE_TYPES.includes(serviceType);
}

/**
 * Helper function to get category for a service type
 */
export function getServiceCategory(serviceType) {
  return SERVICE_TO_CATEGORY[serviceType] || null;
}

/**
 * Get services grouped by category
 * @param {Array} serviceTypes - Array of service type strings to group
 * @returns {Array} Array of { category, services } objects
 */
export function getServicesByCategory(serviceTypes) {
  const grouped = {};

  // Initialize all categories
  Object.values(SERVICE_CATEGORIES).forEach(category => {
    grouped[category] = [];
  });

  // Group services by category
  serviceTypes.forEach(service => {
    const category = SERVICE_TO_CATEGORY[service];
    if (category && grouped[category]) {
      grouped[category].push(service);
    }
  });

  // Convert to array and filter out empty categories
  return Object.entries(grouped)
    .filter(([, services]) => services.length > 0)
    .map(([category, services]) => ({ category, services }));
}
