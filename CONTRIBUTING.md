# Contributing to Atlanta Food Resources

Thank you for your interest in contributing to the Atlanta Food Resources app! This project helps connect people in need with local food assistance, and your contributions make a real difference in the community.

## Table of Contents
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Adding Food Resources](#adding-food-resources)
- [Code Contributions](#code-contributions)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)
- [Contact](#contact)

## Ways to Contribute

You can contribute to this project in several ways:

1. **Add or Update Food Resources** - Know of a food pantry or resource not listed? Help us keep the data current!
2. **Report Issues** - Found a bug or incorrect information? Let us know!
3. **Improve Documentation** - Help make the project easier to understand
4. **Code Enhancements** - Add features or improve existing functionality
5. **Design Improvements** - Enhance the user interface and experience
6. **Translation** - Help make the app accessible to non-English speakers

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Git
- A GitHub account

### Setup Instructions

1. **Fork the Repository**
   - Visit https://github.com/AllisonMH/food-search-2025
   - Click the "Fork" button in the top-right corner

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/food-search-2025.git
   cd food-search-2025
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

5. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   Use descriptive branch names like:
   - `feature/add-new-pantry-data`
   - `fix/filter-bug`
   - `docs/update-readme`

## Adding Food Resources

The easiest way to contribute is by adding or updating food resource information!

### Data Format

Food resources are stored in `src/data/foodResources.json`. Each entry follows this structure:

```json
{
  "id": 1,
  "name": "Organization Name",
  "address": "123 Main St",
  "city": "Atlanta",
  "state": "GA",
  "zipCode": "30303",
  "county": "Fulton",
  "phone": "(404) 555-1234",
  "website": "https://www.example.org",
  "description": "Brief description of services provided",
  "services": ["Food Pantry", "Free Meals", "Mobile Pantry"],
  "hours": "Monday-Friday: 9:00 AM - 5:00 PM"
}
```

### Required Fields
- `id` - Unique number (use the next available number)
- `name` - Organization name
- `address` - Street address
- `city` - City name
- `state` - State abbreviation (GA)
- `zipCode` - 5-digit zip code as a string
- `county` - County name (Fulton, DeKalb, Cobb, Gwinnett, etc.)
- `phone` - Phone number in format: (XXX) XXX-XXXX
- `website` - Full URL with https://
- `description` - Clear description of what they offer
- `services` - Array of service types
- `hours` - Operating hours

Note: `latitude` and `longitude` are optional but strongly recommended for map features. If one coordinate is provided the other must be present as well — the project's validation script treats single-coordinate entries as an error. When present, coordinates must be numbers within valid ranges (latitude: -90 to 90, longitude: -180 to 180).

### Steps to Add a Resource

1. Open `src/data/foodResources.json`
2. Add a new entry at the end of the array (before the closing `]`)
3. Ensure all required fields are included
4. Verify the JSON is properly formatted (use a JSON validator)
5. Save the file

Optional: If you don't have coordinates, you can run the project's geocoding helper after adding the entry (see the "Geocoding / Coordinates" section below).

### Verifying Information

Before adding a resource, please:
- ✅ Verify the address and phone number are correct
- ✅ Check the website URL works
- ✅ Confirm the organization is currently operating
- ✅ Include accurate hours of operation

### Geocoding / Coordinates

If you don't have latitude/longitude for a new resource you can use the included geocoding helper which attempts to fill missing coordinates based on the address. Run:

```bash
npm run coordinates
```

Review and verify any coordinates the script adds before committing. The repository includes a validation script that will flag missing or invalid coordinates as errors (single-coordinate entries are treated as errors; fully missing coordinates are warned but encouraged to be filled for production).

## Code Contributions

### Code Style
- Use functional React components with hooks
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable

### Styling Guidelines
- **Use SCSS/Sass** for all styles
- **Follow BEM naming convention** (Block__Element--Modifier)
  - Example: `.food-resources__card`, `.home__cta-button`
- **Use the global variables** defined in `src/styles/global.scss`
  - Colors: `$primary-color`, `$text-secondary`, etc.
  - Breakpoints: `$breakpoint-md`, `$breakpoint-lg`, etc.
- **Create component-specific SCSS files** (e.g., `ComponentName.scss`)
- **Import styles at the top of each component**
  - Example: `import '../styles/Home.scss';`

### Project Structure
```
food-search-2025/
├── src/
│   ├── components/      # React components
│   │   ├── Home.jsx
│   │   └── FoodResources.jsx
│   ├── data/           # JSON data files
│   │   └── foodResources.json
│   ├── styles/         # SCSS stylesheets
│   │   ├── global.scss # Global variables and styles
│   │   ├── Home.scss   # Home component styles
│   │   ├── FoodResources.scss # FoodResources styles
|   |   └── MapView.scss # Map View styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── CONTRIBUTING.md     # This file
└── README.md          # Project documentation
```

### Testing Your Changes

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Test all functionality:
   - Navigate between pages
   - Try all filter options
   - Test on mobile viewport
   - Verify new data appears correctly

3. Build the production version:
   ```bash
   npm run build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   ```

## Submitting a Pull Request

### Before You Submit

1. **Test thoroughly** - Ensure your changes work as expected
2. **Update documentation** - If you added features, update the README
3. **Check formatting** - Ensure code follows the existing style
4. **Commit your changes** with clear messages:
   ```bash
   git add .
   git commit -m "Add [specific change]"
   ```
   Example commit messages:
   - "Add 5 new food pantries in DeKalb County"
   - "Fix zip code filter not working on mobile"
   - "Update README with setup instructions"

### Submit Your PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**:
   - Go to your fork on GitHub
   - Click "Pull requests" → "New pull request"
   - Select your branch
   - Click "Create pull request"

3. **Fill out the PR template**:
   - **Title**: Clear, concise description (e.g., "Add 3 new food pantries in Cobb County")
   - **Description**: Explain what you changed and why
   - **Screenshots**: Include screenshots for UI changes
   - **Testing**: Describe how you tested your changes

4. **Wait for review**:
   - The maintainers will review your PR
   - They may request changes or ask questions
   - Make any requested updates
   - Once approved, your PR will be merged!

### PR Example Template

```markdown
## Description
Added 5 new food pantries in the Gwinnett County area.

## Type of Change
- [x] New food resources added
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing Done
- Verified all addresses and phone numbers
- Tested that resources appear in the list
- Confirmed filtering by Gwinnett County works
- Tested on mobile and desktop viewports

## Screenshots
[If applicable, add screenshots here]
```

## Reporting Issues

Found a problem? Please let us know!

1. **Check existing issues** first to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Detailed description of the problem
   - Steps to reproduce (if applicable)
   - Screenshots or screen recordings (if helpful)
   - Your browser and device information

### Issue Templates

**Bug Report:**
```markdown
**Description**: Brief description of the bug

**Steps to Reproduce**:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**: What should happen

**Actual Behavior**: What actually happens

**Screenshots**: If applicable

**Device/Browser**:
- Device: [e.g. iPhone 12, Desktop]
- Browser: [e.g. Chrome 91, Safari 14]
```

**Data Update Request:**
```markdown
**Resource Name**: Name of the food pantry/resource

**Issue**: [Incorrect hours / Wrong phone number / Closed permanently / etc.]

**Correct Information**:
[Provide the correct details]

**Source**: [How you verified this information]
```

## Contact

### Questions?
- Open an issue on GitHub for general questions
- Email us at: **info@kolorkodestudios.com**

### Stay Updated
- Watch the repository to get notified of updates
- Star the project to show your support!

## Code of Conduct

### Our Standards
- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discriminatory language
- Personal attacks
- Publishing others' private information
- Other conduct that's inappropriate in a professional setting

## Recognition

All contributors will be recognized in our README! Your contributions help people in need access vital food resources.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## Quick Reference

### Common Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run the data validator
npm run validate

# Attempt to fill coordinates from addresses (geocode helper)
npm run coordinates

# Run the linter
npm run lint

# Deploy to GitHub Pages (maintainers only)
npm run deploy
```

### Need Help?
Don't hesitate to ask for help! You can:
- Open an issue with the "question" label
- Email us at info@kolorkodestudios.com
- Comment on an existing issue or PR

Thank you for making Atlanta Food Resources better for everyone! 🎉
