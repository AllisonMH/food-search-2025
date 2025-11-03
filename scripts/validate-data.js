/* eslint-env node */
/*
 * validate-data.js
 * ----------------
 * Purpose:
 *   Small validation utility used during CI and pre-deploy steps to ensure
 *   `src/data/foodResources.json` conforms to the project's expected schema
 *   and data quality rules. This script is intentionally permissive locally
 *   (it prints warnings) but exits with a non-zero code when hard errors are
 *   detected so that automated deployments (GitHub Actions) are blocked until
 *   issues are fixed.
 *
 * Behavior & exit codes:
 *   - Exit 0: No errors found (warnings may be present). Safe to proceed.
 *   - Exit 1: One or more validation errors found. CI/deploy should fail.
 *
 * What it validates:
 *   - Required fields exist (id, name, address, city, state, zipCode, county,
 *     phone, website, description, services, hours)
 *   - ID uniqueness and sequential ordering (warns on mismatches)
 *   - zipCode is a string (preserve leading zeros)
 *   - phone format: (XXX) XXX-XXXX (warns if non-standard)
 *   - website starts with http:// or https://
 *   - services is an array and contains allowed service names (warns on
 *     non-standard service labels)
 *   - latitude/longitude presence and numeric validity; coordinates must be
 *     within valid ranges. If only one of latitude/longitude is present, it's
 *     treated as an error. Missing coords produce warnings (they will not
 *     appear on the map during development), but production deployments are
 *     expected to include coordinates for all resources.
 *
 * Usage:
 *   node scripts/validate-data.js
 *
 * Notes:
 *   - The allowed services list is intentionally broad; review `allowedServices`
 *     in this file when adding new service types.
 *   - This script is used in `.github/workflows/deploy.yml` to block deploys
 *     when validation errors are present.
 */

import fs from 'fs';
import {
  checkDuplicateIds,
  validateResource
} from './validate-data-lib.js';

// Read the JSON data
const data = JSON.parse(fs.readFileSync('./src/data/foodResources.json', 'utf8'));

let errors = 0;
let warnings = 0;

console.log('\n🔍 Validating foodResources.json...\n');

// Check for duplicate IDs
const duplicateIds = checkDuplicateIds(data);
if (duplicateIds.length > 0) {
  console.error(`❌ ERROR: Duplicate IDs found: ${duplicateIds.join(', ')}`);
  errors++;
}

// Validate each resource
data.forEach((resource, index) => {
  const resourceNum = index + 1;
  const resourceName = resource.name || `Unnamed (index ${index})`;

  const result = validateResource(resource, index);

  // Log errors
  result.errors.forEach(error => {
    console.error(`❌ ERROR: Resource ${resourceNum} (${resourceName}) ${error}`);
    errors++;
  });

  // Log warnings
  result.warnings.forEach(warning => {
    console.warn(`⚠️  WARNING: Resource ${resourceNum} (${resourceName}) ${warning}`);
    warnings++;
  });
});

// Summary
console.log('\n' + '='.repeat(60));
console.log(`\nValidation complete: ${data.length} resources checked`);
console.log(`❌ Errors: ${errors}`);
console.log(`⚠️  Warnings: ${warnings}`);

if (errors === 0 && warnings === 0) {
  console.log('\n✅ All checks passed! Data is valid.\n');
  process.exit(0);
} else if (errors === 0) {
  console.log('\n✅ No errors found, but there are warnings to review.\n');
  process.exit(0);
} else {
  console.log('\n❌ Validation failed. Please fix errors before deployment.\n');
  process.exit(1);
}
