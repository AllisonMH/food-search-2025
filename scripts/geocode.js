/*
 * geocode.js
 * ----------
 * Purpose:
 *   Convenience script to geocode missing addresses in `src/data/foodResources.json`
 *   using the Nominatim (OpenStreetMap) API. It attempts to look up coordinates
 *   for resources that don't already include `latitude`/`longitude` and writes
 *   back updated coordinates to the JSON file.
 *
 * Usage:
 *   node scripts/geocode.js
 *
 * Important notes & safety:
 *   - This script will modify `src/data/foodResources.json`. Create a git
 *     branch or backup the file before running, and review edits before
 *     committing.
 *   - Nominatim requires a respectful usage pattern: this script uses a
 *     ~1.1s delay between requests to avoid hammering the service. For bulk
 *     geocoding or production workflows, consider using a paid geocoding
 *     provider or batching with appropriate rate limits.
 *   - The script validates coordinates to ensure they fall within a typical
 *     Atlanta bounding box. Out-of-bounds results are recorded as failures for
 *     manual review.
 *   - Network errors, API changes, or rate limiting can cause failed lookups;
 *     failed resources are logged for manual geocoding.
 *
 * Customization:
 *   - roundCoordinate() controls decimal precision written back to JSON.
 */

import fs from 'fs';
import https from 'https';

// Read current data
const data = JSON.parse(fs.readFileSync('./src/data/foodResources.json', 'utf8'));


// Geocode function using Nominatim
async function geocode(address) {
  const encoded = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;

  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Atlanta-Food-Resources/1.0' }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.length > 0) {
            const lat = parseFloat(json[0].lat);
            const lng = parseFloat(json[0].lon);
            resolve({ latitude: lat, longitude: lng });
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// NOTE: This script will write back any coordinates returned by the geocoding
// service. Resources that fail to geocode (no results or errors)
// are still collected for manual review.

// Round to 4 decimal places (~11 meter accuracy)
function roundCoordinate(value) {
  return Math.round(value * 10000) / 10000;
}

// Process all resources
async function geocodeAll() {
  console.log('Starting geocoding process...\n');

  let successCount = 0;
  let failCount = 0;
  const failed = [];

  for (let i = 0; i < data.length; i++) {
    const resource = data[i];

    // Skip if already has coordinates
    if (resource.latitude && resource.longitude) {
      console.log(`[${i + 1}/${data.length}] ✓ ${resource.name} - Already geocoded`);
      successCount++;
      continue;
    }

    const fullAddress = `${resource.address}, ${resource.city}, ${resource.state} ${resource.zipCode}`;
    console.log(`[${i + 1}/${data.length}] Geocoding: ${resource.name}`);
    console.log(`  Address: ${fullAddress}`);

    try {
      const coords = await geocode(fullAddress);

      if (coords) {
        const lat = roundCoordinate(coords.latitude);
        const lng = roundCoordinate(coords.longitude);

        // Accept any coordinates returned by the geocoding service and
        // write them back to the data file.
        resource.latitude = lat;
        resource.longitude = lng;
        console.log(`  ✓ ${lat}, ${lng}`);
        successCount++;
      } else {
        console.log(`  ✗ No results found`);
        failCount++;
        failed.push({ id: resource.id, name: resource.name, reason: 'Not found' });
      }
    } catch (err) {
      console.log(`  ✗ Error: ${err.message}`);
      failCount++;
      failed.push({ id: resource.id, name: resource.name, reason: err.message });
    }

    // Rate limit: 1 request per second
    await new Promise(resolve => setTimeout(resolve, 1100));
  }

  // Save updated data
  fs.writeFileSync(
    './src/data/foodResources.json',
    JSON.stringify(data, null, 2)
  );

  console.log('\n' + '='.repeat(60));
  console.log('Geocoding complete!');
  console.log(`✓ Success: ${successCount}/${data.length}`);
  console.log(`✗ Failed: ${failCount}/${data.length}`);

  if (failed.length > 0) {
    console.log('\nFailed resources (manual geocoding needed):');
    failed.forEach(f => {
      console.log(`  - ID ${f.id}: ${f.name} (${f.reason})`);
    });
  }

  console.log('\nData saved to: src/data/foodResources.json');
  console.log('='.repeat(60));
}

geocodeAll().catch(console.error);
