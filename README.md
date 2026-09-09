# Atlanta Food Resources 🍎

A mobile-friendly web application helping people in the Atlanta metro area find local food assistance resources including food pantries, meal programs, and emergency food services.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AllisonMH/food-search-2025)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 🌟 Overview

Access to food should never be a challenge. This app makes it easy for anyone in the Atlanta area to quickly find nearby food resources on their mobile device. Whether someone is facing temporary hardship or needs ongoing support, this tool connects them with organizations ready to help.

## ✨ Features

### Core Features
- 📱 **Mobile-First Design** - Optimized for phones and tablets
- 🔍 **Smart Filtering** - Search by zip code, county, service type, or address
- 📍 **Comprehensive Directory** - 38 food resources across metro Atlanta including Clayton County
- 🏷️ **Service Tags** - Quickly identify food pantries, free meals, mobile pantries, and more
- ⚡ **Fast & Lightweight** - Built with modern web technologies
- 🌐 **No Installation Required** - Access directly from your web browser
- ♿ **Accessible** - Designed to be usable by everyone

### Enhanced Search Features (Phase 2)
- 🗺️ **Interactive Map View** - Visualize all resources on a map with custom markers
- 📍 **Geolocation Integration** - Enable your location to find the nearest resources
- 📏 **Distance Sorting** - See distances and sort by proximity to your location
- 🎯 **Service Type Filters** - Multi-select checkboxes to filter by specific services
- ❤️ **Save Favorites** - Bookmark resources for quick access on future visits

## 🚀 Quick Start

### View the Live App
Visit: [https://food-search-2025.vercel.app/](https://food-search-2025.vercel.app/)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/AllisonMH/food-search-2025.git
cd food-search-2025

# Install dependencies
npm install

# Start the development server
npm run dev

# Open your browser to http://localhost:5173
```

## 🏗️ Technology Stack

### Frontend Technologies
- **React 19.1.1** - UI library for building interactive interfaces
- **Vite 7.1.7** - Next-generation frontend build tool
- **SCSS/Sass 1.93.2** - CSS preprocessor for maintainable stylesheets
- **React Router DOM 7.9.5** - Client-side routing
- **Leaflet 3.x + React Leaflet** - Interactive map visualization
- **Browser Geolocation API** - Location-aware features
- **localStorage** - Client-side data persistence for favorites

### Backend Technologies (Phase 2.5) 🚧
- **PostgreSQL** - Relational database for food resources
- **Express.js** - Web framework for RESTful API
- **node-postgres (pg)** - PostgreSQL client for Node.js
- **Vercel Serverless Functions** - Backend hosting
- **Vercel Postgres / Supabase** - Managed PostgreSQL database

### Why These Technologies?

**React + Vite**: Provides a fast, modern development experience with instant hot module replacement and optimized production builds.

**SCSS/Sass**: Enables maintainable, modular CSS with variables, nesting, mixins, and functions. The BEM (Block Element Modifier) naming convention makes styles easy to understand and modify.

**React Router**: Enables seamless navigation without page reloads, creating a smooth single-page application experience.

**Leaflet**: Open-source mapping library with excellent mobile support and no API keys required. React Leaflet provides clean React bindings for declarative map components.

**Browser APIs**: Leverages native geolocation and localStorage for zero-dependency features that work offline and respect user privacy.

## 📁 Project Structure

```
food-search-2025/
├── src/                     # Frontend source code
│   ├── components/          # React components
│   │   ├── Home.jsx        # Landing page with information
│   │   ├── FoodResources.jsx # Searchable resource directory
│   │   └── MapView.jsx     # Interactive map component
│   ├── data/               # Static data files
│   │   └── foodResources.json # Food resource database (125 resources)
│   ├── hooks/              # Custom React hooks
│   │   ├── useGeolocation.js # Browser geolocation hook
│   │   └── useFavorites.js   # LocalStorage favorites hook
│   ├── utils/              # Utility functions
│   │   └── distanceCalculator.js # Haversine distance formula
│   ├── styles/             # SCSS stylesheets
│   │   ├── global.scss     # Global styles and variables
│   │   ├── Home.scss       # Home component styles
│   │   ├── FoodResources.scss # FoodResources component styles
│   │   └── MapView.scss    # Map component styles
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── api/                    # Backend API (Phase 2.5) 🚧
│   ├── resources/
│   │   ├── index.js        # GET /api/resources
│   │   └── [id].js         # GET /api/resources/:id
│   ├── counties.js         # GET /api/counties
│   ├── service-types.js    # GET /api/service-types
│   └── admin/              # Admin endpoints (future)
├── lib/                    # Shared backend code 🚧
│   └── db.js               # PostgreSQL connection pool
├── migrations/             # Database migrations 🚧
│   ├── 001_initial_schema.sql
│   ├── 002_seed_counties.sql
│   ├── 003_seed_service_types.sql
│   └── 004_migrate_json_data.js
├── public/                 # Static assets
├── .github/                # GitHub configuration
├── BACKEND_MIGRATION.md    # Backend migration documentation 🚧
├── CONTRIBUTING.md         # Contribution guidelines
├── package.json            # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment configuration
└── README.md              # This file
```

## 🏛️ Software Architecture

### Component Architecture

```
App (Router)
├── Home Component
│   ├── Hero Section
│   ├── Information Section
│   └── Call-to-Action
└── FoodResources Component
    ├── Search & Filter Bar
    │   ├── Text Search
    │   ├── County Dropdown
    │   └── Zip Code Dropdown
    └── Resource List
        └── Resource Card (repeated)
            ├── Organization Details
            ├── Location Information
            ├── Contact Information
            └── Service Tags
```

### Data Flow

1. **Data Storage**: Food resources stored in `foodResources.json`
2. **Data Loading**: Imported directly into components (no backend required)
3. **Filtering**: Client-side filtering using React state and useMemo
4. **Rendering**: Dynamic rendering based on filter state
5. **Responsive Design**: SCSS with media queries handles all responsive layouts

### Key Design Decisions

**Static Data**: Using JSON instead of a database keeps the app simple, fast, and easy to contribute to. Anyone can add resources by editing a single file.

**Client-Side Filtering**: All filtering happens in the browser, making the app extremely fast and requiring no backend infrastructure.

**Mobile-First**: Starting with mobile design ensures the app works great on the devices most likely to be used by people seeking assistance.

**GitHub Pages Hosting**: Free, reliable hosting with automatic deployments from the repository.

## 📊 Data Structure

Each food resource contains:

```json
{
  "id": 1,
  "name": "Organization Name",
  "address": "Street Address",
  "city": "City",
  "state": "GA",
  "zipCode": "30303",
  "county": "County Name",
  "phone": "(404) 555-1234",
  "website": "https://example.org",
  "description": "Description of services",
  "latitude": "",
  "longitude": "",
  "services": ["Food Pantry", "Free Meals"],
  "hours": "Monday-Friday: 9:00 AM - 5:00 PM"
}
```

If you do not know the latitude and longitude just add the food resource entry to `src\data\foodResources.json` and run `npm run coordinates` it should fill out the coordinates for you.

## 🛣️ Roadmap & Future Enhancements

### Phase 1: Core Features ✅
- [x] Basic resource directory
- [x] Filtering by zip code and county
- [x] Mobile-responsive design
- [x] GitHub Pages deployment

### Phase 2: Enhanced Search ✅
- [x] Map view with geolocation
- [x] Distance-based sorting
- [x] Advanced search filters (by service type)
- [x] Save favorite locations

### Phase 2.5: Backend Migration (In Progress) 🚧
**Moving from Static JSON to PostgreSQL + Express API**

This phase introduces a dynamic backend to enable CRUD operations, user contributions, and admin management.

**Key Features:**
- [ ] PostgreSQL database with 125+ food resources
- [ ] RESTful API with Express.js on Vercel Serverless Functions
- [ ] CRUD operations for food resources
- [ ] Admin dashboard for content management
- [ ] API endpoints for third-party integrations
- [ ] Backward compatibility with static JSON fallback

**Technology Stack:**
- **Database**: PostgreSQL (Vercel Postgres / Supabase / Neon)
- **Backend**: Express.js on Vercel Serverless Functions
- **ORM**: node-postgres (pg)
- **API**: RESTful endpoints at `/api/*`

**API Endpoints** (Planned):
- `GET /api/resources` - Fetch all resources with filtering
- `GET /api/resources/:id` - Fetch single resource
- `GET /api/counties` - Get list of counties
- `GET /api/service-types` - Get service types
- `POST /api/admin/resources` - Create new resource (admin)
- `PUT /api/admin/resources/:id` - Update resource (admin)
- `DELETE /api/admin/resources/:id` - Soft delete resource (admin)

**Documentation**: See [BACKEND_MIGRATION.md](BACKEND_MIGRATION.md) for detailed migration plan, database schema, and implementation steps.

**Timeline**: 4 weeks (Database setup → API development → Frontend integration → Testing)

### Phase 3: Community Features (Planned)
- [ ] User reviews and ratings
- [ ] Real-time availability updates
- [ ] Multi-language support (Spanish, etc.)
- [ ] SMS/text message integration

### Phase 4: Data & Analytics (Planned)
- [ ] Usage analytics dashboard
- [ ] Resource utilization tracking
- [ ] Automated data validation
- [ ] API for third-party integrations

### Phase 5: Accessibility & Reach (Planned)
- [ ] Voice navigation support
- [ ] Offline PWA capabilities
- [ ] Print-friendly resource lists
- [ ] QR code generation for resources

## 🤝 Contributing

We welcome contributions from everyone! Whether you want to:
- Add or update food resource information
- Fix bugs or improve features
- Enhance documentation
- Suggest new features

Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contact for Contributions

Questions or want to discuss a contribution?
📧 Email: **info@kolorkodestudios.com**

## 🎯 Areas Where We Need Help

### 🔴 High Priority
- **Data Verification**: Confirming existing resource information is current
- **New Resources**: Adding food pantries and resources not yet listed
- **Mobile Testing**: Testing on various devices and browsers
- **Spanish Translation**: Translating the interface for Spanish speakers

### 🟡 Medium Priority
- **UI/UX Improvements**: Making the interface even more user-friendly
- **Accessibility**: #A11Y Improving screen reader 🧑‍🦯🦮 support and keyboard navigation

### 🟢 Nice to Have
- **Dark Mode**: Adding a dark theme option
- **Print Styles**: Making resource lists printer-friendly
- **Social Sharing**: Adding share buttons for resources

## 📱 Deployment

This app is configured for deployment on **Vercel**, a modern hosting platform optimized for frontend frameworks.

### Deploy to Vercel

Vercel offers zero-configuration deployment with automatic preview URLs for pull requests.

**Quick Deploy:**
1. Sign up at [vercel.com](https://vercel.com/signup) (free)
2. Import the GitHub repository
3. Deploy with one click!

**Vercel will automatically:**
- Detect the Vite framework
- Run the build command
- Deploy to a global CDN
- Set up HTTPS
- Create preview deployments for PRs

For detailed step-by-step instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

### Custom Domain (Optional)

1. Go to Project Settings → Domains in Vercel dashboard
2. Add your domain and follow DNS configuration instructions
3. HTTPS is automatically configured

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Manual Testing Checklist
- [ ] All resources display correctly
- [ ] Filtering by county works
- [ ] Filtering by zip code works
- [ ] Search functionality works
- [ ] Links open correctly
- [ ] Mobile responsive on various screen sizes
- [ ] Accessible via keyboard navigation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Food resource data compiled from:
  - Atlanta Community Food Bank
  - Georgia Department of Community Affairs
  - DeKalb County Public Library
  - YMCA of Metro Atlanta
  - Various community organizations

- Built with open-source technologies:
  - React
  - Vite
  - SCSS/Sass
  - React Router

## 📞 Support & Contact

### Need Help Using the App?
Call 211 for 24/7 information about food assistance and community resources in Georgia.

### For Developers & Contributors
- 📧 Email: info@kolorkodestudios.com
- 🐛 Report Issues: [GitHub Issues](https://github.com/AllisonMH/food-search-2025/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/AllisonMH/food-search-2025/discussions)

## 🌟 Star This Project

If you find this project helpful, please consider giving it a star on GitHub! It helps others discover this resource.

---

**Made with ❤️ for the Atlanta community**

*Helping connect people with the resources they need, one search at a time.*
