import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites.js';

describe('useFavorites', () => {
  // Create a proper localStorage mock
  let localStorageData = {};
  
  beforeEach(() => {
    // Clear localStorage data before each test
    localStorageData = {};
    
    // Mock localStorage methods
    Storage.prototype.getItem = vi.fn((key) => localStorageData[key] || null);
    Storage.prototype.setItem = vi.fn((key, value) => {
      localStorageData[key] = value;
    });
    Storage.prototype.removeItem = vi.fn((key) => {
      delete localStorageData[key];
    });
    Storage.prototype.clear = vi.fn(() => {
      localStorageData = {};
    });
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should return empty array when no localStorage data', () => {
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.favorites).toEqual([]);
    });

    it('should return hook structure with all functions', () => {
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current).toHaveProperty('favorites');
      expect(result.current).toHaveProperty('toggleFavorite');
      expect(result.current).toHaveProperty('isFavorite');
      expect(typeof result.current.toggleFavorite).toBe('function');
      expect(typeof result.current.isFavorite).toBe('function');
    });
  });

  describe('toggleFavorite', () => {
    it('should add ID to empty favorites', () => {
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite(1);
      });
      
      expect(result.current.favorites).toEqual([1]);
    });

    it('should add multiple IDs sequentially', () => {
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite(1);
        result.current.toggleFavorite(2);
        result.current.toggleFavorite(3);
      });
      
      expect(result.current.favorites).toEqual([1, 2, 3]);
    });

    it('should remove ID when already favorited', () => {
      const { result } = renderHook(() => useFavorites());
      
      // Add then remove
      act(() => {
        result.current.toggleFavorite(1);
      });
      
      expect(result.current.favorites).toEqual([1]);
      
      act(() => {
        result.current.toggleFavorite(1);
      });
      
      expect(result.current.favorites).toEqual([]);
    });

    it('should remove ID from middle of array', () => {
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite(1);
        result.current.toggleFavorite(2);
        result.current.toggleFavorite(3);
      });
      
      act(() => {
        result.current.toggleFavorite(2);
      });
      
      expect(result.current.favorites).toEqual([1, 3]);
    });

    it('should add back a previously removed ID', () => {
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite(1);
        result.current.toggleFavorite(1); // Remove
        result.current.toggleFavorite(1); // Add again
      });
      
      expect(result.current.favorites).toEqual([1]);
    });

  });

  describe('isFavorite', () => {
    it('should return false for empty favorites', () => {
      const { result } = renderHook(() => useFavorites());
      
      expect(result.current.isFavorite(1)).toBe(false);
    });

    it('should return true when ID is in favorites', () => {
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite(1);
      });
      
      expect(result.current.isFavorite(1)).toBe(true);
    });

    it('should return false when ID is not in favorites', () => {
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite(1);
      });
      
      expect(result.current.isFavorite(2)).toBe(false);
    });

    it('should return false after removing ID', () => {
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite(1);
      });
      
      expect(result.current.isFavorite(1)).toBe(true);
      
      act(() => {
        result.current.toggleFavorite(1);
      });
      
      expect(result.current.isFavorite(1)).toBe(false);
    });

    it('should handle checking multiple IDs', () => {
      const { result } = renderHook(() => useFavorites());
      
      act(() => {
        result.current.toggleFavorite(1);
        result.current.toggleFavorite(3);
        result.current.toggleFavorite(5);
      });
      
      expect(result.current.isFavorite(1)).toBe(true);
      expect(result.current.isFavorite(2)).toBe(false);
      expect(result.current.isFavorite(3)).toBe(true);
      expect(result.current.isFavorite(4)).toBe(false);
      expect(result.current.isFavorite(5)).toBe(true);
    });
  });
});
