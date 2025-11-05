/**
 * Counties Constants
 *
 * List of all counties served in the Atlanta metro area.
 *
 * Usage:
 *   import { COUNTIES, ALL_COUNTIES } from './constants/counties';
 */

export const COUNTIES = {
  FULTON: 'Fulton',
  DEKALB: 'DeKalb',
  COBB: 'Cobb',
  GWINNETT: 'Gwinnett',
  CLAYTON: 'Clayton',
};

/**
 * All counties in a flat array for validation
 */
export const ALL_COUNTIES = Object.values(COUNTIES);

/**
 * Helper function to validate if a county is valid
 */
export function isValidCounty(county) {
  return ALL_COUNTIES.includes(county);
}
