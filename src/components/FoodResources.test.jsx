import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FoodResources from './FoodResources.jsx';
import staticFoodResources from '../data/foodResources.json';

// jsdom's navigator.permissions.query isn't a real promise-returning
// implementation; stub it the same way useGeolocation.test.js does so
// useGeolocation's permission-check effect doesn't throw on mount.
beforeEach(() => {
  Object.defineProperty(navigator, 'permissions', {
    value: {
      query: vi.fn(() =>
        Promise.resolve({ state: 'prompt', addEventListener: vi.fn() })
      ),
    },
    configurable: true,
    writable: true,
  });
});

function renderComponent() {
  return render(
    <MemoryRouter>
      <FoodResources />
    </MemoryRouter>
  );
}

function mockFetchOnce(status, body) {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      statusText: status === 200 ? 'OK' : 'Error',
      json: () => Promise.resolve(body),
    })
  );
}

describe('FoodResources API integration', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders using the bundled static data immediately, before the API responds', () => {
    // Fetch that never resolves during this test
    globalThis.fetch = vi.fn(() => new Promise(() => {}));

    renderComponent();

    expect(
      screen.getByText(new RegExp(`of ${staticFoodResources.length} resources? found`))
    ).toBeInTheDocument();
  });

  it('switches to live API data and shows the "Live data" indicator when the fetch succeeds', async () => {
    const liveResources = [
      {
        id: 999,
        name: 'Live API Test Pantry',
        address: '1 Live St',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30301',
        county: 'Fulton',
        latitude: 33.75,
        longitude: -84.39,
        phone: '(404) 555-0100',
        website: null,
        description: 'A resource that only exists in the mocked API response.',
        services: ['Food Pantry'],
        hours: 'Daily',
      },
    ];
    mockFetchOnce(200, {
      success: true,
      data: { resources: liveResources, total: 1, limit: 500, offset: 0 },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Live API Test Pantry')).toBeInTheDocument();
    });
    expect(screen.getByText('● Live data')).toBeInTheDocument();
    // Static fallback data should no longer be shown once live data has loaded
    expect(screen.queryByText(staticFoodResources[0].name)).not.toBeInTheDocument();
  });

  it('falls back to the bundled static data when the API request fails', async () => {
    mockFetchOnce(500, { success: false, error: 'Internal server error' });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    renderComponent();

    await waitFor(() => {
      expect(warnSpy).toHaveBeenCalled();
    });
    // Static data should remain in place — no "Live data" indicator
    expect(screen.queryByText('● Live data')).not.toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`of ${staticFoodResources.length} resources? found`))
    ).toBeInTheDocument();
  });

  it('falls back to the bundled static data when the API returns success: false', async () => {
    mockFetchOnce(200, { success: false, error: 'Database unreachable' });
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(`of ${staticFoodResources.length} resources? found`))
      ).toBeInTheDocument();
    });
    expect(screen.queryByText('● Live data')).not.toBeInTheDocument();
  });
});
