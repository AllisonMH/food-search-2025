/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number|null} Distance in miles, rounded to 1 decimal place, or null if invalid
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  // Handle null/undefined coordinates
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return null;
  }

  // Validate coordinate types and ranges
  if (typeof lat1 !== 'number' || typeof lon1 !== 'number' ||
      typeof lat2 !== 'number' || typeof lon2 !== 'number') {
    return null;
  }

  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    return null;
  }

  // Validate coordinate ranges
  if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90 ||
      lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
    return null;
  }

  const R = 3958.8; // Earth's radius in miles

  // Convert degrees to radians
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Round to 1 decimal place
  return Math.round(distance * 10) / 10;
}

/**
 * Convert degrees to radians
 * @param {number} degrees
 * @returns {number} Radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Sort resources by distance from user location
 * Adds distance property to each resource
 * @param {Array} resources - Array of food resource objects
 * @param {number} userLat - User's latitude
 * @param {number} userLng - User's longitude
 * @returns {Array} Sorted array with distance property added (nearest first)
 */
export function sortByDistance(resources, userLat, userLng) {
  // Handle invalid user coordinates
  if (userLat == null || userLng == null) {
    return resources;
  }

  // Calculate distance for each resource
  const resourcesWithDistance = resources.map(resource => {
    const distance = calculateDistance(
      userLat,
      userLng,
      resource.latitude,
      resource.longitude
    );

    return {
      ...resource,
      distance
    };
  });

  // Sort by distance (null distances go to end)
  return resourcesWithDistance.sort((a, b) => {
    if (a.distance == null) return 1;
    if (b.distance == null) return -1;
    return a.distance - b.distance;
  });
}
