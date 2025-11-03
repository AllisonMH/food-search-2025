import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapView.scss';

// Custom marker icons
const resourceIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23400B6E">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%232196F3">
      <circle cx="12" cy="12" r="8" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="white"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

export default function MapView({ resources, userLocation, onMarkerClick }) {
  // Filter resources to only those with valid coordinates
  const validResources = useMemo(() => {
    return resources.filter(resource =>
      typeof resource.latitude === 'number' &&
      !isNaN(resource.latitude) &&
      typeof resource.longitude === 'number' &&
      !isNaN(resource.longitude) &&
      resource.latitude >= -90 && resource.latitude <= 90 &&
      resource.longitude >= -180 && resource.longitude <= 180
    );
  }, [resources]);

  // Calculate map center based on valid resources or default to Atlanta
  const mapCenter = useMemo(() => {
    if (validResources.length === 0) {
      return [33.749, -84.388]; // Downtown Atlanta
    }

    const avgLat = validResources.reduce((sum, r) => sum + r.latitude, 0) / validResources.length;
    const avgLng = validResources.reduce((sum, r) => sum + r.longitude, 0) / validResources.length;
    return [avgLat, avgLng];
  }, [validResources]);

  // Calculate appropriate zoom level based on resource spread
  const zoomLevel = useMemo(() => {
    if (validResources.length <= 1) return 12;

    // Calculate bounds
    const lats = validResources.map(r => r.latitude);
    const lngs = validResources.map(r => r.longitude);
    const latSpread = Math.max(...lats) - Math.min(...lats);
    const lngSpread = Math.max(...lngs) - Math.min(...lngs);
    const maxSpread = Math.max(latSpread, lngSpread);

    // Adjust zoom based on spread
    if (maxSpread > 1) return 8;
    if (maxSpread > 0.5) return 9;
    if (maxSpread > 0.2) return 10;
    return 11;
  }, [validResources]);

  return (
    <div className="map-view">
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        className="map-view__container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Resource markers - only valid coordinates */}
        {validResources.map(resource => (
          <Marker
            key={resource.id}
            position={[resource.latitude, resource.longitude]}
            icon={resourceIcon}
            eventHandlers={{
              click: () => onMarkerClick?.(resource)
            }}
          >
            <Popup>
              <div className="map-view__popup">
                <h3 className="map-view__popup-title">{resource.name}</h3>
                <p className="map-view__popup-address">
                  {resource.address}<br />
                  {resource.city}, {resource.state} {resource.zipCode}
                </p>
                <p className="map-view__popup-phone">
                  <a href={`tel:${resource.phone}`}>{resource.phone}</a>
                </p>
                {resource.distance != null && (
                  <p className="map-view__popup-distance">
                    {resource.distance} mi away
                  </p>
                )}
                <div className="map-view__popup-services">
                  {resource.services.slice(0, 3).map((service, idx) => (
                    <span key={idx} className="map-view__popup-service-tag">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>
              <div className="map-view__popup">
                <h3 className="map-view__popup-title">Your Location</h3>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
