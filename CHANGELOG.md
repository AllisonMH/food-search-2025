# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-01-XX

### Added

- **Interactive Map View** with Leaflet integration displaying all 38 food resources
  - OpenStreetMap tiles with custom purple markers for resources
  - Blue marker for user's current location when geolocation is enabled
  - Interactive popups showing resource name, address, and services
  - Automatic map centering and zoom calculation based on resource locations
  - Touch-friendly controls with pinch-to-zoom on mobile devices
- **Geolocation Integration** using browser Geolocation API
  - Permission request flow with user-friendly prompts
  - Error handling for denied permissions, timeouts, and unavailable location
  - Manual location request button when permissions not granted
  - Privacy-focused: no coordinates stored or transmitted to servers
- **Distance-Based Sorting** using Haversine formula
  - Calculate distances from user location to each resource in miles
  - Sort resources by proximity (nearest first)
  - Distance badges displayed on resource cards when sorted by distance
  - Accuracy note: distances are "as the crow flies" not driving distance
- **View Toggle** between list and map views
  - Toggle buttons in header with clear visual indicators
  - Active state styling for selected view
  - SVG icons for list and map views
  - View state preserved when applying filters
  - Fully keyboard accessible
- **Service Type Filters** with multi-select checkboxes
  - Filter by Food Pantry, Free Meals, Mobile Pantry, or Emergency Assistance
  - OR logic: show resources with ANY selected service type
  - Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
  - Touch-friendly 44px minimum height for accessibility
  - Clear visual feedback for selected filters
- **Favorites System** with localStorage persistence
  - Heart icon toggle button on each resource card
  - Visual feedback with filled heart for favorited resources
  - "Show My Favorites Only" filter toggle in filter panel
  - Favorites count display showing number of saved resources
  - Data persists across browser sessions and page refreshes
  - Graceful error handling for corrupted localStorage data
- **Enhanced Home Page** with Phase 2 feature callouts
  - "New Features" section with 4 feature cards
  - Visual icons for Map View, Distance Sorting, Service Filters, and Favorites
  - Hover effects for improved interactivity
  - Updated "How to Use This App" instructions
  - Responsive 2-column grid layout on desktop
- **Geocoding Data** - All 38 resources now include latitude and longitude
  - Automated geocoding script using Nominatim API
  - Manual verification for non-standard addresses
  - Coordinates validated for Atlanta metro area bounds
- **Custom React Hooks**
  - `useGeolocation` - Manages browser geolocation with permission states
  - `useFavorites` - Handles favorites with localStorage persistence
- **Utility Functions**
  - `distanceCalculator.js` - Haversine formula for coordinate distance calculations
  - `scripts/geocode.js` - Development script for batch geocoding addresses
  - `scripts/validate-data` - CI and pre-deploy validation utility that checks `src/data/foodResources.json` for required fields
- **New Components**
  - `MapView.jsx` - Leaflet map component with custom markers and popups
  - `MapView.scss` - Responsive styling for map container

### Changed

- **FoodResources Component** - Enhanced with multiple filter types and view modes
  - Added view mode state management (list/map)
  - Added sorting state (name A-Z / distance nearest)
  - Added service filter state with array of selected services
  - Added favorites-only filter toggle
  - Updated filter logic to include all new filter types with AND logic
  - Modified clear filters function to reset all new filters
- **FoodResources Styling** - Updated card layout for favorite button integration
  - Changed card header to always use horizontal flex layout (was responsive column→row)
  - Added `flex: 1` to card title for proper space distribution
  - Added styles for view toggle buttons with active states
  - Added styles for service filter checkboxes with responsive grid
  - Added styles for favorites toggle with special styling
  - Added styles for favorite heart button with hover and active states
  - Added styles for distance badges with brand color background
  - Added styles for location enable button and error messages
- **Home Component** - Added Phase 2 features section
  - Updated "How to Use This App" instructions with new features
  - Added feature cards with icons and descriptions
- **Home Styling** - New section for feature callouts
  - Added `&__section--features` variant with light purple background
  - Added `&__new-features` grid layout (1 col mobile, 2 cols desktop)
  - Added `&__feature-card` with hover animation effects
  - Added `&__feature-icon` styling for SVG icons
- **README.md** - Updated to reflect Phase 2 completion
  - Marked Phase 2 as complete in roadmap
  - Added "Enhanced Search Features" section to features list
  - Updated technology stack with Leaflet, React Leaflet, and browser APIs
  - Added version numbers for all dependencies
- **Copilot Instructions** - Created
  - Added MapView component to architecture section
  - Added custom hooks documentation
  - Added geocoding workflow instructions
  - Updated component patterns with new hook usage guidelines
  - Updated tech stack with new dependencies
- **Claude.md** - Created

### Fixed

- Corrected SASS variable references
  - Changed `$bg-white` to `$bg-primary` in favorites toggle styling
  - Previous fixes: `$background-alt` to `$bg-secondary` in MapView

### Dependencies

- Added `leaflet@^3.0.0` - Core mapping library for interactive maps
- Added `react-leaflet@^5.0.0` - React bindings for Leaflet
- Added `@types/leaflet@^1.9.8` (dev) - TypeScript type definitions for IDE support

### Performance

- Production build size: 418.72 kB JavaScript (127.81 kB gzipped)
- Production build size: 29.19 kB CSS (8.93 kB gzipped)
- Build time: ~4 seconds
- 95 modules transformed successfully

### Documentation

- All documentation follows project standards and best practices

## [1.0.0] - 2024-11-01

### Added

- Initial release of Atlanta Food Resources web application
- **Core Features**
  - Mobile-first responsive design optimized for phones and tablets
  - Comprehensive directory of 38 food resources across Atlanta metro area
  - Search functionality by name, address, or city
  - Filter by county (8 counties supported)
  - Filter by zip code
  - Resource cards with detailed information (location, contact, hours, services)
  - Service tags for quick identification (Food Pantry, Free Meals, Mobile Pantry, Emergency Assistance)
- **Components**
  - `App.jsx` - Root router with GitHub Pages basename configuration
  - `Home.jsx` - Landing page with mission and call-to-action
  - `FoodResources.jsx` - Main resource directory with search and filters
- **Styling**
  - SCSS with BEM naming convention throughout
  - Kolor Kode Studios purple brand palette
  - Global variables for colors, breakpoints, and shadows
  - Mobile-first responsive design with breakpoints at 768px and 1024px
- **Data**
  - `foodResources.json` with 38 verified food assistance locations
  - Coverage: Fulton, DeKalb, Cobb, Gwinnett, Clayton, Forsyth, Cherokee, Rockdale counties
- **Infrastructure**
  - Vite build system for fast development and optimized production builds
  - React Router for client-side navigation
  - GitHub Pages deployment via `gh-pages` package
  - ESLint configuration with React hooks rules
- **Documentation**
  - Comprehensive README.md with setup instructions
  - CONTRIBUTING.md with contribution guidelines
  - Copilot instructions for AI-assisted development
  - MIT License

### Technical Stack

- React 19.1.1
- Vite 7.1.7
- React Router DOM 7.9.5
- Sass 1.93.2
- ESLint 9.18.0

### Accessibility

- WCAG 2.1 AA compliant color contrast
- Semantic HTML throughout
- Keyboard navigation support
- Form labels properly associated
- Focus states on all interactive elements

---

## Version History Summary

- **v2.0.0** - Phase 2: Enhanced Search Features (Map view, geolocation, distance sorting, service filters, favorites)
- **v1.0.0** - Phase 1: Core Features (Basic directory, search, county/zip filters, mobile-responsive)

## Links

- [Repository](https://github.com/AllisonMH/food-search-2025)
- [Live Demo](https://allisonmh.github.io/food-search-2025/)
- [Issues](https://github.com/AllisonMH/food-search-2025/issues)

## Upgrade Guide

### Upgrading from 1.0.0 to 2.0.0

No breaking changes for end users. All Phase 1 features remain functional.

**For Developers:**

1. Run `npm install` to install new dependencies (leaflet, react-leaflet, @types/leaflet)
2. Build: `npm run build` - Build size increased by ~220 kB (Leaflet library)
3. New localStorage key used: `atlantaFoodFavorites` - will not conflict with existing data
4. Geolocation requires HTTPS or localhost (browser security requirement)
5. Review `TESTING_REPORT.md` for comprehensive testing checklist

**New Data Fields:**

- `latitude` (number) - Added to all 38 resources
- `longitude` (number) - Added to all 38 resources

**Browser Requirements:**

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ (for geolocation and modern JavaScript)
- IE11 not supported

---

[Unreleased]: https://github.com/AllisonMH/food-search-2025/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/AllisonMH/food-search-2025/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/AllisonMH/food-search-2025/releases/tag/v1.0.0
