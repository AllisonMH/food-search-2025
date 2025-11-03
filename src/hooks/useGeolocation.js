import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for accessing browser geolocation
 * Returns user's current location with permission handling
 */
export default function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionState, setPermissionState] = useState('prompt'); // 'granted', 'denied', 'prompt'

  // Request user's location
  const requestLocation = useCallback(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 second timeout
      maximumAge: 300000 // Cache for 5 minutes
    };

    const onSuccess = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLoading(false);
      setPermissionState('granted');
    };

    const onError = (err) => {
      setLoading(false);

      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError('Location permission denied. Please enable location access in your browser settings.');
          setPermissionState('denied');
          break;
        case err.POSITION_UNAVAILABLE:
          setError('Location information unavailable. Please check your device settings.');
          break;
        case err.TIMEOUT:
          setError('Location request timed out. Please try again.');
          break;
        default:
          setError('An unknown error occurred while getting your location.');
      }
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  // Check permission state on mount
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((result) => {
          setPermissionState(result.state);

          // Listen for permission changes
          result.addEventListener('change', () => {
            setPermissionState(result.state);
          });
        })
        .catch(() => {
          // Permission API not fully supported, use default state
          setPermissionState('prompt');
        });
    }
  }, []);

  return {
    coords,
    loading,
    error,
    permissionState,
    requestLocation
  };
}
