import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import foodResourcesData from '../data/foodResources.json';

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Food Resources</h1>
            <p className="text-gray-600">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <Link
            to="/"
            className="mt-4 md:mt-0 inline-block text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Search & Filter</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Name, address, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* County Filter */}
            <div>
              <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-1">
                County
              </label>
              <select
                id="county"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Counties</option>
                {counties.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>

            {/* Zip Code Filter */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <select
                id="zipCode"
                value={selectedZip}
                onChange={(e) => setSelectedZip(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Resources List */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No resources found matching your filters.</p>
            <button
              onClick={clearFilters}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Clear filters and try again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {resource.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Location */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Location</h4>
                    <p className="text-gray-600 text-sm">
                      {resource.address}<br />
                      {resource.city}, {resource.state} {resource.zipCode}<br />
                      {resource.county} County
                    </p>
                  </div>

                  {/* Contact */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Contact</h4>
                    <p className="text-gray-600 text-sm mb-1">
                      <a href={`tel:${resource.phone}`} className="text-blue-600 hover:underline">
                        {resource.phone}
                      </a>
                    </p>
                    {resource.website && (
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>

                {/* Hours */}
                {resource.hours && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Hours</h4>
                    <p className="text-gray-600 text-sm">{resource.hours}</p>
                  </div>
                )}

                {/* Services */}
                {resource.services && resource.services.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {resource.services.map((service, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
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
        <div className="mt-8 bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-700">
            <strong>Before visiting:</strong> We recommend calling ahead to confirm hours and availability.
            Some locations may require proof of residency or have specific eligibility requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
