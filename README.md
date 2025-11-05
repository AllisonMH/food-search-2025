# Atlanta Food Resources 🍎

A mobile-friendly web application helping people in the Atlanta metro area find local food assistance resources including food pantries, meal programs, and emergency food services.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://allisonmh.github.io/food-search-2025/)
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
Visit: [https://allisonmh.github.io/food-search-2025/](https://allisonmh.github.io/food-search-2025/)

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

### Core Technologies
- **React 19.1.1** - UI library for building interactive interfaces
- **Vite 7.1.7** - Next-generation frontend build tool
- **SCSS/Sass 1.93.2** - CSS preprocessor for maintainable stylesheets
- **React Router DOM 7.9.5** - Client-side routing
- **Leaflet 3.x + React Leaflet** - Interactive map visualization
- **Browser Geolocation API** - Location-aware features
- **localStorage** - Client-side data persistence for favorites

### Why These Technologies?

**React + Vite**: Provides a fast, modern development experience with instant hot module replacement and optimized production builds.

**SCSS/Sass**: Enables maintainable, modular CSS with variables, nesting, mixins, and functions. The BEM (Block Element Modifier) naming convention makes styles easy to understand and modify.

**React Router**: Enables seamless navigation without page reloads, creating a smooth single-page application experience.

**Leaflet**: Open-source mapping library with excellent mobile support and no API keys required. React Leaflet provides clean React bindings for declarative map components.

**Browser APIs**: Leverages native geolocation and localStorage for zero-dependency features that work offline and respect user privacy.

## 📁 Project Structure

```
food-search-2025/
├── src/
│   ├── components/           # React components
│   │   ├── Home.jsx         # Landing page with information
│   │   └── FoodResources.jsx # Searchable resource directory
│   ├── data/                # Data files
│   │   └── foodResources.json # Food resource database
│   ├── styles/              # SCSS stylesheets
│   │   ├── global.scss      # Global styles and variables
│   │   ├── Home.scss        # Home component styles
│   │   └── FoodResources.scss # FoodResources component styles
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── .github/                 # GitHub configuration
├── CONTRIBUTING.md          # Contribution guidelines
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
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

### GitHub Pages

The app is automatically deployed to GitHub Pages on every push to the main branch.

Manual deployment:
```bash
npm run deploy
```

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub repository settings

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
