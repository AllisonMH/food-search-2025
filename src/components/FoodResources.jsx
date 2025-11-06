import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import foodResourcesData from "../data/foodResources.json";
import {
  ALL_SERVICE_TYPES,
  getServicesByCategory,
} from "../constants/serviceTypes";
import { ALL_COUNTIES } from "../constants/counties";
import MapView from "./MapView";
import useGeolocation from "../hooks/useGeolocation";
import { useFavorites } from "../hooks/useFavorites";
import { sortByDistance } from "../utils/distanceCalculator";
import "../styles/FoodResources.scss";

const RESOURCES_PER_PAGE = 10;

export default function FoodResources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedZip, setSelectedZip] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'
  const [sortBy, setSortBy] = useState("name"); // 'name' or 'distance'
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceFiltersOpen, setServiceFiltersOpen] = useState(false);
  const [categoryExpansion, setCategoryExpansion] = useState({});
  const pageTopRef = useRef(null);
  const hasPaginationScrolled = useRef(false);

  // Geolocation hook for user's location
  const {
    coords: userLocation,
    loading: locationLoading,
    error: locationError,
    requestLocation,
  } = useGeolocation();

  // Favorites hook for managing saved resources
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Get unique counties, zip codes, and services for filters
  // Counties: Use constants for consistency
  const allCounties = useMemo(() => ALL_COUNTIES, []);

  // Zip codes: Still extract from data since they're location-specific
  const allZipCodes = useMemo(() => {
    const uniqueZips = [
      ...new Set(
        foodResourcesData.map((resource) => resource.zipCode).filter(Boolean)
      ),
    ];
    return uniqueZips.sort();
  }, []);

  // Services: Use constants but filter to only show services actually present in data
  const services = useMemo(() => {
    const servicesInData = new Set(
      foodResourcesData.flatMap((resource) => resource.services)
    );
    return ALL_SERVICE_TYPES.filter((service) => servicesInData.has(service));
  }, []);

  // Group services by category for better UI organization
  const servicesByCategory = useMemo(() => {
    return getServicesByCategory(services);
  }, [services]);

  useEffect(() => {
    setCategoryExpansion((prev) => {
      const nextState = { ...prev };
      servicesByCategory.forEach(({ category }) => {
        if (nextState[category] == null) {
          nextState[category] = true;
        }
      });
      return nextState;
    });
  }, [servicesByCategory]);

  const availableZipCodes = useMemo(() => {
    if (!selectedCounty) {
      return allZipCodes;
    }

    const zips = new Set();
    foodResourcesData.forEach((resource) => {
      if (resource.county === selectedCounty && resource.zipCode) {
        zips.add(resource.zipCode);
      }
    });
    const filtered = Array.from(zips).sort();
    return filtered;
  }, [selectedCounty, allZipCodes]);

  const availableCounties = useMemo(() => {
    if (!selectedZip) {
      return allCounties;
    }

    const countiesForZip = new Set();
    foodResourcesData.forEach((resource) => {
      if (resource.zipCode === selectedZip && resource.county) {
        countiesForZip.add(resource.county);
      }
    });

    const filtered = allCounties.filter((county) =>
      countiesForZip.has(county)
    );

    return filtered.length > 0 ? filtered : allCounties;
  }, [selectedZip, allCounties]);

  // Filter and sort resources based on search, filters, and sort preference
  const filteredResources = useMemo(() => {
    // First, filter resources
    let filtered = foodResourcesData.filter((resource) => {
      const matchesSearch =
        searchTerm === "" ||
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCounty =
        selectedCounty === "" || resource.county === selectedCounty;
      const matchesZip = selectedZip === "" || resource.zipCode === selectedZip;

      // Service filter: OR logic - resource must have at least one selected service
      const matchesService =
        selectedServices.length === 0 ||
        selectedServices.some((service) => resource.services.includes(service));

      // Favorites filter: if enabled, only show favorited resources
      const matchesFavorites =
        !showFavoritesOnly || favorites.includes(resource.id);

      return (
        matchesSearch &&
        matchesCounty &&
        matchesZip &&
        matchesService &&
        matchesFavorites
      );
    });

    // Then, sort based on sortBy preference
    if (sortBy === "distance" && userLocation) {
      filtered = sortByDistance(filtered, userLocation.lat, userLocation.lng);
    } else {
      // Sort alphabetically by name
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [
    searchTerm,
    selectedCounty,
    selectedZip,
    selectedServices,
    sortBy,
    userLocation,
    showFavoritesOnly,
    favorites,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCounty,
    selectedZip,
    selectedServices,
    showFavoritesOnly,
    sortBy,
  ]);

  useEffect(() => {
    if (
      selectedZip &&
      !availableZipCodes.includes(selectedZip)
    ) {
      setSelectedZip("");
    }
  }, [selectedZip, availableZipCodes]);

  useEffect(() => {
    if (
      selectedCounty &&
      !availableCounties.includes(selectedCounty)
    ) {
      setSelectedCounty("");
    }
  }, [selectedCounty, availableCounties]);

  const scrollToPageTop = useCallback(() => {
    if (pageTopRef.current && pageTopRef.current.scrollIntoView) {
      pageTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToPageTop();
  }, [scrollToPageTop]);

  const totalPages = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(filteredResources.length / RESOURCES_PER_PAGE)
    );
  }, [filteredResources.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!hasPaginationScrolled.current) {
      hasPaginationScrolled.current = true;
      return;
    }

    scrollToPageTop();
  }, [currentPage, scrollToPageTop]);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * RESOURCES_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + RESOURCES_PER_PAGE);
  }, [filteredResources, currentPage]);

  const paginationRange = useMemo(() => {
    if (filteredResources.length === 0) {
      return { start: 0, end: 0 };
    }
    const start = (currentPage - 1) * RESOURCES_PER_PAGE + 1;
    const end = Math.min(
      filteredResources.length,
      currentPage * RESOURCES_PER_PAGE
    );
    return { start, end };
  }, [filteredResources.length, currentPage]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCounty("");
    setSelectedZip("");
    setSelectedServices([]);
    setShowFavoritesOnly(false);
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="food-resources" ref={pageTopRef}>
      <div className="food-resources__container">
        {/* Header */}
        <div className="food-resources__header">
          <div className="food-resources__header-content">
            <h1>Food Resources</h1>
            <p>
              {filteredResources.length === 0
                ? "0 resources found"
                : viewMode === "map"
                ? `${filteredResources.length} resource${
                    filteredResources.length !== 1 ? "s" : ""
                  } found`
                : `Showing ${paginationRange.start}-${paginationRange.end} of ${
                    filteredResources.length
                  } resource${filteredResources.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
          <div className="food-resources__header-actions">
            <div className="food-resources__view-toggle">
              <button
                onClick={() => setViewMode("list")}
                className={`food-resources__view-btn ${
                  viewMode === "list" ? "food-resources__view-btn--active" : ""
                }`}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`food-resources__view-btn ${
                  viewMode === "map" ? "food-resources__view-btn--active" : ""
                }`}
                aria-label="Map view"
                aria-pressed={viewMode === "map"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                <span>Map</span>
              </button>
            </div>
            <Link to="/" className="food-resources__back-link">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="food-resources__filters">
          <h2>Search & Filter</h2>

          <div className="food-resources__filter-grid">
            {/* Search Input */}
            <div className="food-resources__filter-group">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Name, address, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* County Filter */}
            <div className="food-resources__filter-group">
              <label htmlFor="county">County</label>
              <select
                id="county"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
              >
                <option value="">All Counties</option>
                {availableCounties.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
            </div>

            {/* Zip Code Filter */}
            <div className="food-resources__filter-group">
              <label htmlFor="zipCode">Zip Code</label>
              <select
                id="zipCode"
                value={selectedZip}
                onChange={(e) => setSelectedZip(e.target.value)}
              >
                <option value="">All Zip Codes</option>
                {availableZipCodes.map((zip) => (
                  <option key={zip} value={zip}>
                    {zip}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="food-resources__filter-group">
              <label htmlFor="sortBy">Sort By</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                disabled={sortBy === "distance" && !userLocation}
              >
                <option value="name">Name (A-Z)</option>
                <option value="distance" disabled={!userLocation}>
                  Distance {!userLocation ? "(Enable location)" : "(Nearest)"}
                </option>
              </select>
              {sortBy === "distance" && !userLocation && !locationLoading && (
                <button
                  onClick={requestLocation}
                  className="food-resources__location-btn"
                  type="button"
                >
                  📍 Enable Location
                </button>
              )}
              {locationError && (
                <p className="food-resources__location-error">
                  {locationError}
                </p>
              )}
            </div>
          </div>

          {/* Service Type Filters - Categorized */}
          <div className="food-resources__service-filters">
            <div className="food-resources__service-filters-header">
              <h3>Service Types</h3>
              <button
                type="button"
                className="food-resources__collapse-btn"
                onClick={() => setServiceFiltersOpen((prev) => !prev)}
                aria-expanded={serviceFiltersOpen}
                aria-controls="service-type-filters"
              >
                {serviceFiltersOpen ? "Hide" : "Show"}
              </button>
            </div>
            {serviceFiltersOpen && (
              <div id="service-type-filters">
                {servicesByCategory.map(
                  ({ category, services: categoryServices }) => (
                    <div
                      key={category}
                      className="food-resources__service-category"
                    >
                      <button
                        type="button"
                        className="food-resources__category-toggle"
                        onClick={() =>
                          setCategoryExpansion((prev) => ({
                            ...prev,
                            [category]: !prev[category],
                          }))
                        }
                        aria-expanded={categoryExpansion[category] ?? true}
                      >
                        <span className="food-resources__category-title">
                          {category}
                        </span>
                        <span className="food-resources__category-icon">
                          {categoryExpansion[category] === false ? "+" : "−"}
                        </span>
                      </button>
                      {(categoryExpansion[category] ?? true) && (
                        <div className="food-resources__service-checkboxes">
                          {categoryServices.map((service) => (
                            <label
                              key={service}
                              className="food-resources__checkbox-label"
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(service)}
                                onChange={() => toggleService(service)}
                                className="food-resources__checkbox"
                              />
                              <span>{service}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* My Favorites Toggle */}
          <div className="food-resources__favorites-toggle">
            <label className="food-resources__checkbox-label food-resources__checkbox-label--favorites">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="food-resources__checkbox"
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Show My Favorites Only{" "}
                {favorites.length > 0 && `(${favorites.length})`}
              </span>
            </label>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm ||
            selectedCounty ||
            selectedZip ||
            selectedServices.length > 0 ||
            showFavoritesOnly) && (
            <button
              onClick={clearFilters}
              className="food-resources__clear-filters"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Content: Map or List View */}
        {filteredResources.length === 0 ? (
          <div className="food-resources__no-results">
            <p>No resources found matching your filters.</p>
            <button onClick={clearFilters}>Clear filters and try again</button>
          </div>
        ) : viewMode === "map" ? (
          <MapView resources={filteredResources} userLocation={userLocation} />
        ) : (
          <div className="food-resources__list">
            {paginatedResources.map((resource) => (
              <div key={resource.id} className="food-resources__card">
                <div className="food-resources__card-header">
                  <div className="food-resources__card-title">
                    <h3>
                      {resource.name}
                      {resource.distance != null && (
                        <span className="food-resources__distance-badge">
                          {resource.distance} mi
                        </span>
                      )}
                    </h3>
                    <p>{resource.description}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(resource.id)}
                    className={`food-resources__favorite-btn ${
                      isFavorite(resource.id)
                        ? "food-resources__favorite-btn--active"
                        : ""
                    }`}
                    aria-label={
                      isFavorite(resource.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    title={
                      isFavorite(resource.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={isFavorite(resource.id) ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>

                <div className="food-resources__card-details">
                  {/* Location */}
                  <div className="food-resources__detail-section">
                    <h4>Location</h4>
                    <p>
                      {resource.address}
                      <br />
                      {resource.city}, {resource.state} {resource.zipCode}
                      <br />
                      {resource.county} County
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="food-resources__detail-section">
                    <h4>Contact</h4>
                    <p>
                      <a href={`tel:${resource.phone}`}>{resource.phone}</a>
                    </p>
                    {resource.website && (
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>

                {/* Hours */}
                {resource.hours && (
                  <div className="food-resources__hours">
                    <h4>Hours</h4>
                    <p>{resource.hours}</p>
                  </div>
                )}

                {/* Services */}
                {resource.services && resource.services.length > 0 && (
                  <div className="food-resources__services">
                    <h4>Services</h4>
                    <div className="food-resources__service-tags">
                      {resource.services.map((service, index) => (
                        <span
                          key={index}
                          className="food-resources__service-tag"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Warning for missing coordinates */}
                {(resource.latitude == null ||
                  resource.longitude == null ||
                  typeof resource.latitude !== "number" ||
                  typeof resource.longitude !== "number") && (
                  <div className="food-resources__location-warning">
                    <span>📍 Map location unavailable</span>
                  </div>
                )}
              </div>
            ))}
            {totalPages > 1 && (
              <div className="food-resources__pagination">
                <button
                  type="button"
                  className="food-resources__page-btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  ← Prev
                </button>
                <span className="food-resources__page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  className="food-resources__page-btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Help Text */}
        <div className="food-resources__help-text">
          <p>
            <strong>Before visiting:</strong> We recommend calling ahead to
            confirm hours and availability. Some locations may require proof of
            residency or have specific eligibility requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
