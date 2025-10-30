import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import foodResourcesData from '../data/foodResources.json';
import '../styles/FoodResources.scss';

export default function FoodResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedZip, setSelectedZip] = useState('');

  // Get unique counties and zip codes for filters
  const counties = useMemo(() => {
    const uniqueCounties = [...new Set(foodResourcesData.map(resource => resource.county))];
    return uniqueCounties.sort();
  }, []);

  const zipCodes = useMemo(() => {
    const uniqueZips = [...new Set(foodResourcesData.map(resource => resource.zipCode))];
    return uniqueZips.sort();
  }, []);

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return foodResourcesData.filter(resource => {
      const matchesSearch = searchTerm === '' ||
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCounty = selectedCounty === '' || resource.county === selectedCounty;
      const matchesZip = selectedZip === '' || resource.zipCode === selectedZip;

      return matchesSearch && matchesCounty && matchesZip;
    });
  }, [searchTerm, selectedCounty, selectedZip]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCounty('');
    setSelectedZip('');
  };

  return (
    <div className="food-resources">
      <div className="food-resources__container">
        {/* Header */}
        <div className="food-resources__header">
          <div className="food-resources__header-content">
            <h1>Food Resources</h1>
            <p>
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <Link to="/" className="food-resources__back-link">
            ← Back to Home
          </Link>
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
                {counties.map(county => (
                  <option key={county} value={county}>{county}</option>
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
                {zipCodes.map(zip => (
                  <option key={zip} value={zip}>{zip}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || selectedCounty || selectedZip) && (
            <button
              onClick={clearFilters}
              className="food-resources__clear-filters"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Resources List */}
        {filteredResources.length === 0 ? (
          <div className="food-resources__no-results">
            <p>No resources found matching your filters.</p>
            <button onClick={clearFilters}>
              Clear filters and try again
            </button>
          </div>
        ) : (
          <div className="food-resources__list">
            {filteredResources.map(resource => (
              <div key={resource.id} className="food-resources__card">
                <div className="food-resources__card-header">
                  <div className="food-resources__card-title">
                    <h3>{resource.name}</h3>
                    <p>{resource.description}</p>
                  </div>
                </div>

                <div className="food-resources__card-details">
                  {/* Location */}
                  <div className="food-resources__detail-section">
                    <h4>Location</h4>
                    <p>
                      {resource.address}<br />
                      {resource.city}, {resource.state} {resource.zipCode}<br />
                      {resource.county} County
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="food-resources__detail-section">
                    <h4>Contact</h4>
                    <p>
                      <a href={`tel:${resource.phone}`}>
                        {resource.phone}
                      </a>
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
                        <span key={index} className="food-resources__service-tag">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Help Text */}
        <div className="food-resources__help-text">
          <p>
            <strong>Before visiting:</strong> We recommend calling ahead to confirm hours and availability.
            Some locations may require proof of residency or have specific eligibility requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
