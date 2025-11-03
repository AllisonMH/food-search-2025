# Copilot Instructions - Atlanta Food Resources

## Project Overview
This is a **mobile-first React SPA** helping Atlanta residents find food assistance. The app uses **static JSON data** (no backend) with **client-side filtering** for zero-latency search. Deployed to **GitHub Pages** with automated deployments via `gh-pages` npm package.

## Architecture & Key Design Decisions

### Component Structure
- **`App.jsx`**: Root router with `basename` set from `import.meta.env.BASE_URL` (critical for GitHub Pages subdirectory routing)
- **`Home.jsx`**: Landing page with mission info, feature callouts, and CTA to resources
- **`FoodResources.jsx`**: Main feature - searchable resource directory with multiple filter types (text, county, zip, service, favorites) and view modes (list/map)
- **`MapView.jsx`**: Leaflet map component displaying resource locations and user position with interactive markers

### Data Flow Pattern
1. Data source: `src/data/foodResources.json` - imported directly into components
2. Filtering: Client-side using React `useState` + `useMemo` for performance
3. Filter extraction: `useMemo` generates unique counties/zips from data (sorted alphabetically)
4. Multi-criteria filtering: All filters applied simultaneously with AND logic

### Styling Architecture - BEM + Brand Colors
- **SCSS with BEM naming**: `.component__element--modifier` pattern throughout
- **Brand colors**: Kolor Kode Studios purple palette (`$brand-primary: #400B6E`) defined in `global.scss`
- **Shared variables**: All colors, breakpoints, shadows in `global.scss` - import with `@use './global.scss' as *`
- **Mobile-first**: Start with mobile styles, add `@media (min-width: $breakpoint-md)` for larger screens

## Critical Developer Workflows

### Local Development
```bash
npm run dev      # Vite dev server on localhost:5173
npm run build    # Production build to dist/
npm run preview  # Test production build locally
```

### Deployment
```bash
npm run deploy   # Runs predeploy (build) + gh-pages publish
```
**Important**: `vite.config.js` sets `base: '/food-search-2025/'` for GitHub Pages subdirectory. Local dev ignores this.

### Code Quality
```bash
npm run lint     # ESLint check (flat config with React hooks rules)
```

### JSON Data Validation
Validate `foodResources.json` before committing:
```bash
# Comprehensive validation with detailed error/warning reporting
npm run validate
```

**Schema rules enforced by `scripts/validate-data.js`**:
- All fields required: `id`, `name`, `address`, `city`, `state`, `zipCode`, `county`, `phone`, `website`, `description`, `services`, `hours`
- `id`: Sequential number (no duplicates)
- `zipCode`: String type (preserves leading zeros)
- `phone`: Format `(XXX) XXX-XXXX`
- `website`: Must start with `https://` or `http://`
- `services`: Array from allowed values (see `scripts/validate-data.js` for full list)
- `latitude`/`longitude`: Optional but recommended - must be valid numbers in correct ranges if present

## Project-Specific Conventions

### Adding New Food Resources
1. Edit `src/data/foodResources.json` - **append to end** with next sequential `id`
2. **Required fields**: All fields mandatory except `hours` can vary by location
3. **Optional but recommended**: `latitude` and `longitude` for map display
4. **Format standards**:
   - Phone: `(XXX) XXX-XXXX`
   - Website: Full URL with `https://` or `http://`
   - Zip code: String (not number) for leading zeros
  - Services: Array from allowed values (see `scripts/validate-data.js` for full list)
   - Latitude/Longitude: Numbers with 6 decimal places, range -90 to 90 (lat), -180 to 180 (lng)
5. **Geocoding new resources**: Use `scripts/geocode.js` script with Nominatim API or manually add coordinates from Google Maps (right-click > "What's here?")
6. **Validate before committing**: Run `npm run validate` to check data integrity

### Graceful Degradation for Missing Coordinates
The app handles missing latitude/longitude gracefully:
- **MapView**: Filters out resources without valid coordinates (won't crash)
- **List View**: Shows "📍 Map location unavailable" badge on affected resources
- **Distance sorting**: Resources without coordinates sort to end, distance shows as null
- **User experience**: No crashes or errors, users can still access all resource info via list view
- **Deployment**: Validation required before deployment - all resources should have coordinates in production

### Custom Hooks & Utilities
- **`useGeolocation.js`**: Custom hook for browser geolocation with permission handling, error states, and manual request trigger
- **`useFavorites.js`**: Custom hook for localStorage-persisted favorites with toggle and check functions
- **`distanceCalculator.js`**: Haversine formula for calculating distances between coordinates, returns miles rounded to 1 decimal or null for invalid coords
  - Validates coordinate types, ranges, and NaN values
  - Returns null gracefully for missing/invalid data (no errors thrown)

### Component Patterns
- **No prop drilling**: Components import data directly (static JSON enables this)
- **useMemo for derived state**: Always memoize filtered/sorted data from `foodResourcesData`
- **Conditional rendering**: Show "Clear filters" button only when filters active
- **Custom hook usage**: Hooks manage their own state internally - components just use returned values/functions
- **localStorage patterns**: Read on mount, write on change, handle JSON parse/stringify errors gracefully

### Styling Patterns
- **Component-scoped SCSS**: Each component has matching `.scss` file
- **BEM element nesting**: `.food-resources { &__header { ... } }` generates `.food-resources__header`
- **Responsive grid**: Use `grid-template-columns: 1fr` mobile → `1fr 1fr 1fr` desktop
- **Color usage**: Never use hex directly - reference `$primary-color`, `$text-secondary`, etc.

### Accessibility (WCAG 2.1 AA Compliance)
**Required patterns when adding/modifying components**:
- **Semantic HTML**: Use `<button>` for actions, `<a>` for navigation, `<label>` for form inputs
- **Form labels**: All inputs must have associated `<label>` with `htmlFor` attribute (see `FoodResources.jsx` lines 70-78)
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for UI components (brand colors pre-tested)
- **Focus states**: All interactive elements must show visible focus (`:focus` styles in global.scss)
- **Keyboard navigation**: Test Tab/Shift+Tab through all interactive elements
- **Alt text**: All images require descriptive `alt` attributes (currently using inline SVGs with semantic structure)
- **ARIA labels**: Add `aria-label` when link/button text isn't descriptive (example: back links use visible "← Back to Home")

**Testing checklist**:
1. Navigate entire app using only keyboard
2. Test with browser zoom at 200%
3. Verify color contrast with browser DevTools
4. Check form field labels are properly associated

### Router Configuration
- **BrowserRouter basename**: Must match Vite `base` config for GitHub Pages
- **Link components**: Use `<Link to="/path">` from `react-router-dom`, not `<a href>`
- **Route structure**: Keep flat - only 2 routes (`/` and `/resources`)

## Tech Stack Context
- **React 19.1.1**: Using latest hooks API
- **React Router 7.9.5**: BrowserRouter for SPA navigation
- **Vite 7.1.7**: Fast HMR, uses `import.meta.env` for environment vars
- **Sass 1.93.2**: Modern SCSS with `@use` (not deprecated `@import`)
- **Leaflet 3.x + React Leaflet**: Interactive maps with OpenStreetMap tiles (no API keys required)
- **Browser APIs**: Geolocation API for location features, localStorage for favorites persistence

## Common Tasks

### Adding a New Page
1. Create component in `src/components/NewPage.jsx`
2. Create styles in `src/styles/NewPage.scss`
3. Import styles with `import '../styles/NewPage.scss'`
4. Add route in `App.jsx`: `<Route path="/new" element={<NewPage />} />`

### Modifying Filters
Location: `FoodResources.jsx` lines 23-38
- Filter logic uses `.toLowerCase().includes()` for case-insensitive search
- Multiple fields searchable: name, address, city, description
- Add new filter: Create state → Add to `useMemo` dependencies → Update filter logic

### Changing Brand Colors
Location: `src/styles/global.scss` lines 4-7
- Update `$brand-*` variables
- Derived colors (hover states, shadows) auto-calculate using Sass `color.adjust()`

## Gotchas & Constraints
- **GitHub Pages base path**: Changing repo name requires updating `vite.config.js` base AND `package.json` homepage
- **JSON data size**: Keep under 100KB - client downloads full dataset on page load
- **No backend validation**: Filter dropdowns populated from data, so malformed JSON breaks filters
- **Mobile viewport**: Test at 375px width - this is the primary use case
- **Internationalization (i18n)**: Not currently implemented; all strings are hardcoded English. Future feature planned - avoid adding string concatenation that would complicate translation
