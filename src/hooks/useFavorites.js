import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'atlantaFoodFavorites';

/**
 * Custom hook for managing user's favorite food resources
 * Uses localStorage for persistence across sessions
 * @returns {Object} Hook API with favorites array and toggle function
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
      // If parsing fails, clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  /**
   * Toggle a resource in favorites list
   * @param {number} resourceId - The ID of the resource to toggle
   */
  const toggleFavorite = useCallback((resourceId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(resourceId)) {
        // Remove from favorites
        return prevFavorites.filter(id => id !== resourceId);
      } else {
        // Add to favorites
        return [...prevFavorites, resourceId];
      }
    });
  }, []);

  /**
   * Check if a resource is favorited
   * @param {number} resourceId - The ID of the resource to check
   * @returns {boolean} True if the resource is favorited
   */
  const isFavorite = useCallback((resourceId) => {
    return favorites.includes(resourceId);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
