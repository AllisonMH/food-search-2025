import { Link } from 'react-router-dom';
import '../styles/Home.scss';

export default function Home() {
  return (
    <div className="home">
      <div className="home__container">
        {/* Header */}
        <header className="home__header">
          <h1 className="home__title">
            Atlanta Food Resources
          </h1>
          <p className="home__subtitle">
            Finding food assistance when you need it most
          </p>
        </header>

        {/* Main Content */}
        <div className="home__content">
          <section className="home__section">
            <h2>Welcome</h2>
            <p>
              Finding food assistance shouldn't be difficult. This app helps connect people
              in the Atlanta metro area with local food pantries, meal programs, and emergency
              food resources.
            </p>
            <p>
              Whether you're facing temporary hardship or need ongoing support, there are
              organizations ready to help. All services listed are free and available to
              those in need.
            </p>
          </section>

          <section className="home__section">
            <h2>What You'll Find</h2>
            <ul className="home__feature-list">
              <li>
                <svg className="home__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="home__feature-text">
                  <strong>Food Pantries:</strong> Regular distributions of groceries and household items
                </span>
              </li>
              <li>
                <svg className="home__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="home__feature-text">
                  <strong>Free Meals:</strong> Soup kitchens and meal programs serving hot meals
                </span>
              </li>
              <li>
                <svg className="home__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="home__feature-text">
                  <strong>Mobile Pantries:</strong> Food distribution on wheels coming to your neighborhood
                </span>
              </li>
              <li>
                <svg className="home__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="home__feature-text">
                  <strong>Emergency Assistance:</strong> Quick help when you need it most
                </span>
              </li>
            </ul>
          </section>

          <section className="home__section home__section--features">
            <h2>New Features</h2>
            <div className="home__new-features">
              <div className="home__feature-card">
                <div className="home__feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                  </svg>
                </div>
                <h3>Map View</h3>
                <p>Visualize all food resources on an interactive map to find locations near you</p>
              </div>
              <div className="home__feature-card">
                <div className="home__feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path>
                  </svg>
                </div>
                <h3>Distance Sorting</h3>
                <p>Sort resources by distance from your location to find the nearest help</p>
              </div>
              <div className="home__feature-card">
                <div className="home__feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </div>
                <h3>Service Filters</h3>
                <p>Filter by service type: Food Pantry, Free Meals, Mobile Pantry, or Emergency Assistance</p>
              </div>
              <div className="home__feature-card">
                <div className="home__feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3>Save Favorites</h3>
                <p>Bookmark resources you use frequently for quick access on your next visit</p>
              </div>
            </div>
          </section>

          <section className="home__section">
            <h2>How to Use This App</h2>
            <ol>
              <li>Click "Find Resources" below to see all available food assistance</li>
              <li>Use the map view or list view to browse resources</li>
              <li>Filter by zip code, county, service type, or search by name</li>
              <li>Sort by distance to find the nearest locations</li>
              <li>Save your favorites for easy access</li>
              <li>Click resource cards for details including hours and contact info</li>
            </ol>
          </section>

          <div className="home__cta">
            <Link to="/resources" className="home__cta-button">
              Find Food Resources
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="home__footer">
          <h3>Help Us Improve</h3>
          <p>
            This is an open-source community project. Know of a food resource we're missing?
            Want to help improve the app?
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute on GitHub
          </a>
          <p className="home__footer-credit">
            Created with 💜 by Kolor Koded Studios. Find us at kolorkodedstudios.com
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="home__emergency">
          <p>
            <strong>Need immediate assistance?</strong> Call 211 for 24/7 information about
            food assistance, shelter, and other community resources.
          </p>
        </div>
      </div>
    </div>
  );
}
