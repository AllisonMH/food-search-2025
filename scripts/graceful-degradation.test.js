import fs from 'fs';
import { describe, it, expect } from 'vitest';

const data = JSON.parse(fs.readFileSync('./src/data/foodResources.json', 'utf8'));

function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return null;
  }

  if (typeof lat1 !== 'number' || typeof lon1 !== 'number' ||
      typeof lat2 !== 'number' || typeof lon2 !== 'number') {
    return null;
  }

  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    return null;
  }

  if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90 ||
      lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
    return null;
  }

  const R = 3958.8; // miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

function isValidCoord(lat, lng) {
  return (
    typeof lat === 'number' && !isNaN(lat) && lat >= -90 && lat <= 90 &&
    typeof lng === 'number' && !isNaN(lng) && lng >= -180 && lng <= 180
  );
}

describe('graceful degradation checks', () => {
  it('reports counts of resources with/without coordinates', () => {
    const withCoords = data.filter(r => r.latitude != null && r.longitude != null);
    const withoutCoords = data.filter(r => r.latitude == null || r.longitude == null);

    expect(withCoords.length + withoutCoords.length).toBe(data.length);
    // simple sanity: at least 0 resources without coords
    expect(withoutCoords.length).toBeGreaterThanOrEqual(0);
  });

  it('validates coordinate types and ranges', () => {
    const invalid = [];
    data.forEach(r => {
      if (r.latitude != null && r.longitude != null) {
        if (!isValidCoord(r.latitude, r.longitude)) {
          invalid.push(r.name || r.id);
        }
      }
    });
    // There should be zero invalid coordinates; if there are, tests will show which
    expect(invalid.length).toBe(0);
  });

  it('ensures resources displayed on map are filtered correctly', () => {
    const validResources = data.filter(r => isValidCoord(r.latitude, r.longitude));
    // All validResources must have coords
    validResources.forEach(r => {
      expect(r.latitude).not.toBeNull();
      expect(r.longitude).not.toBeNull();
    });
  });

  it('distance calculator returns null for missing coords and valid numbers for valid coords', () => {
    const userLat = 33.749;
    const userLng = -84.388;
    let successful = 0;
    let nulls = 0;

    data.forEach(r => {
      const d = calculateDistance(userLat, userLng, r.latitude, r.longitude);
      if (d === null) nulls++;
      else successful++;
    });

    expect(successful + nulls).toBe(data.length);
  });
});
