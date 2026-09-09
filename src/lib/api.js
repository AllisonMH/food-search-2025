/**
 * API Client
 *
 * Thin wrapper around the backend REST API (see /api). Every function
 * throws on failure so callers can decide how to fall back (e.g. to the
 * bundled static JSON) — see FoodResources.jsx for the primary consumer.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Highest limit /api/resources accepts; comfortably above the current
// dataset size so a single request returns everything the client-side
// filtering in FoodResources.jsx expects to work with.
const MAX_RESOURCES_LIMIT = 500;

async function getJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const body = await response.json();

  if (!body.success) {
    throw new Error(body.error || 'API request was not successful');
  }

  return body.data;
}

/**
 * Fetch all active food resources.
 * @returns {Promise<Array>} Resources in the same shape as the static
 *   foodResources.json (id, name, address, ..., services: string[]).
 */
export async function fetchResources() {
  const data = await getJson(`/resources?limit=${MAX_RESOURCES_LIMIT}`);
  return data.resources;
}

/**
 * Fetch a single food resource by ID.
 * @param {number|string} id
 */
export async function fetchResourceById(id) {
  return getJson(`/resources/${id}`);
}

/**
 * Fetch the list of counties (with resource counts).
 */
export async function fetchCounties() {
  return getJson('/counties');
}

/**
 * Fetch service types, optionally grouped by category.
 * @param {boolean} grouped
 */
export async function fetchServiceTypes(grouped = false) {
  return getJson(`/service-types${grouped ? '?grouped=true' : ''}`);
}
