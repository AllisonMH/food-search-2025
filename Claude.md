# Claude Project Context - Atlanta Food Resources

> **For Claude AI Assistant Users**: Add this file to your Claude Projects knowledge base or reference it when working on this codebase to maintain context about architecture, conventions, and best practices.

## Project Overview

This is a **mobile-first React SPA** helping Atlanta residents find food assistance. The app uses **static JSON data** (no backend) with **client-side filtering** for zero-latency search. Deployed to **GitHub Pages** with automated deployments via `gh-pages` npm package.

**Live URL**: https://allisonmh.github.io/food-search-2025/
**Repository**: https://github.com/AllisonMH/food-search-2025

## Architecture & Key Design Decisions

### Component Structure

- **`App.jsx`**: Root router with `basename` set from `import.meta.env.BASE_URL` (critical for GitHub Pages subdirectory routing)
- **`Home.jsx`**: Landing page with mission info, feature callouts, and CTA to resources
- **`FoodResources.jsx`**: Main feature - searchable resource directory with multiple filter types (text, county, zip, service, favorites) and view modes (list/map)
- **`MapView.jsx`**: Leaflet map component displaying resource locations and user position with interactive markers

### Data Flow Pattern

1. **Data source**: `src/data/foodResources.json` - imported directly into components
2. **Filtering**: Client-side using React `useState` + `useMemo` for performance
3. **Filter extraction**: `useMemo` generates unique counties/zips from data (sorted alphabetically)
4. **Multi-criteria filtering**: All filters applied simultaneously with AND logic

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
# Quick validation - check if JSON parses
node -e "JSON.parse(require('fs').readFileSync('src/data/foodResources.json'))" && echo "Valid JSON"

# Detailed validation - verify all required fields
node -e "const data = JSON.parse(require('fs').readFileSync('src/data/foodResources.json')); const required = ['id', 'name', 'address', 'city', 'state', 'zipCode', 'county', 'phone', 'website', 'description', 'services', 'hours']; data.forEach((r, i) => { const missing = required.filter(f => !r[f]); if (missing.length) console.log(\`Resource \${i+1} (${r.name || 'unnamed'}) missing: \${missing.join(', ')}\`); }); console.log('Validation complete');"
```

**Schema rules enforced**:

- All fields required (except `hours` may vary by location)
- `id`: Sequential number (no duplicates)
- `zipCode`: String type (preserves leading zeros)
- `phone`: Format `(XXX) XXX-XXXX`
- `website`: Must start with `https://`
- `services`: Array from allowed values: `["Food Pantry", "Free Meals", "Mobile Pantry", "Emergency Assistance"]`

## Project-Specific Conventions

### Adding New Food Resources

1. Edit `src/data/foodResources.json` - **append to end** with next sequential `id`
2. **Required fields**: All fields mandatory except `hours` can vary by location
3. **Format standards**:
   - Phone: `(XXX) XXX-XXXX`
   - Website: Full URL with `https://`
   - Zip code: String (not number) for leading zeros
   - Services: Array from: `["Food Pantry", "Free Meals", "Mobile Pantry", "Emergency Assistance"]`
   - Latitude/Longitude: Numbers with 6 decimal places for map accuracy (use geocoding tools or Google Maps)
4. **Geocoding new resources**: Use `scripts/geocode.js` script with Nominatim API or manually add coordinates from Google Maps (right-click > "What's here?")

### Custom Hooks & Utilities

- **`useGeolocation.js`**: Custom hook for browser geolocation with permission handling, error states, and manual request trigger
- **`useFavorites.js`**: Custom hook for localStorage-persisted favorites with toggle and check functions
- **`distanceCalculator.js`**: Haversine formula for calculating distances between coordinates, returns miles rounded to 1 decimal

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

## Working with Claude

### How to Use This Document

When starting a conversation with Claude about this project:

1. **Upload this file** to your conversation or add it to a Claude Project
2. **Reference specific sections** when asking questions (e.g., "Following the Component Patterns section, add a new filter...")
3. **Mention file paths** so Claude can locate the relevant code
4. **Ask for validation** against the conventions documented here

### Best Practices for AI-Assisted Development

- **Always request file reading first**: Ask Claude to read relevant files before making changes
- **Validate against conventions**: Remind Claude to check this document for styling patterns, naming conventions, etc.
- **Request explanations**: Ask Claude to explain changes in context of the architecture
- **Test incrementally**: Make changes in small batches and test between iterations
- **Review generated code**: Ensure BEM naming, accessibility patterns, and mobile-first approach are followed

### Example Prompts

```
"Read FoodResources.jsx and add a new filter for 'hours of operation' following 
the patterns in the Modifying Filters section of Claude.md"

"Following the Styling Patterns in Claude.md, create a new component for displaying 
resource details with BEM naming and mobile-first responsive design"

"Validate the attached JSON data against the schema rules in Claude.md and identify 
any issues"
```

## File Structure Reference

```
food-search-2025/
├── .github/
│   └── copilot-instructions.md     # GitHub Copilot configuration
├── public/
│   └── 404.html                     # GitHub Pages 404 handler
├── src/
│   ├── App.jsx                      # Root component with routing
│   ├── main.jsx                     # React entry point
│   ├── components/
│   │   ├── FoodResources.jsx        # Main resource directory
│   │   ├── Home.jsx                 # Landing page
│   │   └── MapView.jsx              # Leaflet map component
│   ├── data/
│   │   └── foodResources.json       # Static resource data
│   ├── hooks/
│   │   ├── useFavorites.js          # localStorage favorites hook
│   │   └── useGeolocation.js        # Browser geolocation hook
│   ├── styles/
│   │   ├── global.scss              # Shared variables & utilities
│   │   ├── FoodResources.scss       # Resource directory styles
│   │   ├── Home.scss                # Landing page styles
│   │   └── MapView.scss             # Map component styles
│   └── utils/
│       └── distanceCalculator.js    # Haversine distance formula
├── Claude.md                        # This file - Claude context
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite configuration
└── eslint.config.js                 # ESLint flat config
```

## Contributing Guidelines

When making contributions (with or without Claude):

1. **Follow BEM naming** for all CSS classes
2. **Maintain mobile-first** approach in styling
3. **Preserve accessibility** standards (WCAG 2.1 AA)
4. **Validate JSON** before committing data changes
5. **Test all filters** when modifying `FoodResources.jsx`
6. **Update this file** if you change architecture or add new patterns

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Leaflet Documentation](https://leafletjs.com/)
- [BEM Methodology](https://getbem.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: November 2025
**Maintained By**: Project contributors
**Related Files**: `.github/copilot-instructions.md` (GitHub Copilot version)
