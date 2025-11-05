import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../src/data/foodResources.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('=== DATA ANALYSIS ===\n');
console.log('Total resources:', data.length);

// Check for all service types
const allServices = new Set();
data.forEach(r => r.services.forEach(s => allServices.add(s)));
console.log('\nAll service types found:');
[...allServices].sort().forEach(s => console.log('  -', s));

// Standard service types from documentation
const standardServices = [
  'Food Pantry',
  'Free Meals',
  'Mobile Pantry',
  'Emergency Assistance'
];

console.log('\nNon-standard service types:');
const nonStandard = [...allServices].filter(s => !standardServices.includes(s));
nonStandard.forEach(s => {
  const count = data.filter(r => r.services.includes(s)).length;
  console.log(`  - "${s}" (used in ${count} resources)`);
});

// Check for missing/invalid data
console.log('\n=== DATA QUALITY ISSUES ===');
let issues = 0;

data.forEach((r) => {
  const resourceIssues = [];

  if (!r.latitude || !r.longitude) {
    resourceIssues.push('Missing coordinates');
  }

  if (typeof r.latitude !== 'number' || typeof r.longitude !== 'number') {
    resourceIssues.push('Coordinates not numbers');
  }

  if (!r.phone.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
    resourceIssues.push(`Invalid phone format: ${r.phone}`);
  }

  if (r.website && !r.website.startsWith('https://') && !r.website.startsWith('http://')) {
    resourceIssues.push(`Invalid website URL: ${r.website}`);
  }

  if (!r.services || r.services.length === 0) {
    resourceIssues.push('No services listed');
  }

  if (resourceIssues.length > 0) {
    console.log(`\nResource ${r.id} (${r.name}):`);
    resourceIssues.forEach(issue => console.log(`  - ${issue}`));
    issues++;
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total resources with issues: ${issues}`);
console.log(`Non-standard service types: ${nonStandard.length}`);
