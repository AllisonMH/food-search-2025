import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useGeolocation from './useGeolocation.js';

describe('useGeolocation', () => {
  let mockGeolocation;
  let mockPermissions;

  beforeEach(() => {
    // Create mock geolocation
    mockGeolocation = {
      getCurrentPosition: vi.fn(),
      watchPosition: vi.fn(),
      clearWatch: vi.fn(),
    };
    Object.defineProperty(navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true,
      writable: true,
    });

    // Create mock permissions API
    mockPermissions = {
      query: vi.fn(() => 
        Promise.resolve({
          state: 'prompt',
          addEventListener: vi.fn(),
        })
      ),
    };
    Object.defineProperty(navigator, 'permissions', {
      value: mockPermissions,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should return initial state with null coords', () => {
      const { result } = renderHook(() => useGeolocation());

      expect(result.current.coords).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.permissionState).toBe('prompt');
    });

    it('should return hook structure with all properties', () => {
      const { result } = renderHook(() => useGeolocation());

      expect(result.current).toHaveProperty('coords');
      expect(result.current).toHaveProperty('loading');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('permissionState');
      expect(result.current).toHaveProperty('requestLocation');
      expect(typeof result.current.requestLocation).toBe('function');
    });
  });

  describe('requestLocation', () => {
    it('should set loading to true when requesting location', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      expect(result.current.loading).toBe(true);
    });

    it('should call navigator.geolocation.getCurrentPosition', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it('should pass correct options to getCurrentPosition', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      const callArgs = mockGeolocation.getCurrentPosition.mock.calls[0];
      const options = callArgs[2];

      expect(options).toHaveProperty('enableHighAccuracy', true);
      expect(options).toHaveProperty('timeout', 10000);
      expect(options).toHaveProperty('maximumAge', 300000);
    });

    it('should update coords on successful location fetch', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      const successCallback = mockGeolocation.getCurrentPosition.mock.calls[0][0];
      const mockPosition = {
        coords: {
          latitude: 33.7490,
          longitude: -84.3880,
        },
      };

      act(() => {
        successCallback(mockPosition);
      });

      expect(result.current.coords).toEqual({
        lat: 33.7490,
        lng: -84.3880,
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.permissionState).toBe('granted');
    });

    it('should handle PERMISSION_DENIED error', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      const errorCallback = mockGeolocation.getCurrentPosition.mock.calls[0][1];
      const mockError = {
        code: 1, // PERMISSION_DENIED
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      act(() => {
        errorCallback(mockError);
      });

      expect(result.current.error).toContain('permission denied');
      expect(result.current.loading).toBe(false);
      expect(result.current.permissionState).toBe('denied');
    });

    it('should handle POSITION_UNAVAILABLE error', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      const errorCallback = mockGeolocation.getCurrentPosition.mock.calls[0][1];
      const mockError = {
        code: 2, // POSITION_UNAVAILABLE
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      act(() => {
        errorCallback(mockError);
      });

      expect(result.current.error).toContain('unavailable');
      expect(result.current.loading).toBe(false);
    });

    it('should handle TIMEOUT error', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      const errorCallback = mockGeolocation.getCurrentPosition.mock.calls[0][1];
      const mockError = {
        code: 3, // TIMEOUT
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      act(() => {
        errorCallback(mockError);
      });

      expect(result.current.error).toContain('timed out');
      expect(result.current.loading).toBe(false);
    });

    it('should handle unknown error', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      const errorCallback = mockGeolocation.getCurrentPosition.mock.calls[0][1];
      const mockError = {
        code: 999, // Unknown code
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      act(() => {
        errorCallback(mockError);
      });

      expect(result.current.error).toContain('unknown error');
      expect(result.current.loading).toBe(false);
    });

    it('should set error when geolocation is not supported', () => {
      // Remove geolocation support
      Object.defineProperty(navigator, 'geolocation', {
        value: undefined,
        configurable: true,
        writable: true,
      });

      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.requestLocation();
      });

      expect(result.current.error).toContain('not supported');
    });

    it('should clear previous error when requesting location again', () => {
      const { result } = renderHook(() => useGeolocation());

      // First request with error
      act(() => {
        result.current.requestLocation();
      });

      const errorCallback = mockGeolocation.getCurrentPosition.mock.calls[0][1];
      act(() => {
        errorCallback({
          code: 3,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        });
      });

      expect(result.current.error).not.toBeNull();

      // Second request should clear error
      act(() => {
        result.current.requestLocation();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('permission state', () => {
    it('should query permission state on mount', async () => {
      renderHook(() => useGeolocation());

      // Wait for useEffect
      await vi.waitFor(() => {
        expect(mockPermissions.query).toHaveBeenCalledWith({ name: 'geolocation' });
      });
    });

    it('should handle permission state granted', async () => {
      mockPermissions.query = vi.fn(() =>
        Promise.resolve({
          state: 'granted',
          addEventListener: vi.fn(),
        })
      );

      const { result } = renderHook(() => useGeolocation());

      await vi.waitFor(() => {
        expect(result.current.permissionState).toBe('granted');
      });
    });

    it('should handle permission state denied', async () => {
      mockPermissions.query = vi.fn(() =>
        Promise.resolve({
          state: 'denied',
          addEventListener: vi.fn(),
        })
      );

      const { result } = renderHook(() => useGeolocation());

      await vi.waitFor(() => {
        expect(result.current.permissionState).toBe('denied');
      });
    });

    it('should handle permission API not available', async () => {
      Object.defineProperty(navigator, 'permissions', {
        value: undefined,
        configurable: true,
        writable: true,
      });

      const { result } = renderHook(() => useGeolocation());

      // Should default to 'prompt'
      expect(result.current.permissionState).toBe('prompt');
    });

    it('should handle permission query rejection', async () => {
      mockPermissions.query = vi.fn(() => Promise.reject(new Error('Permission query failed')));

      const { result } = renderHook(() => useGeolocation());

      // Should default to 'prompt' on error
      await vi.waitFor(() => {
        expect(result.current.permissionState).toBe('prompt');
      });
    });
  });
});
