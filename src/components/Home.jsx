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

          <section className="home__section">
            <h2>How to Use This App</h2>
            <ol>
              <li>Click "Find Resources" below to see all available food assistance</li>
              <li>Filter by your zip code, county, or search by address</li>
              <li>View organization details including location, hours, and contact info</li>
              <li>Click the website link to learn more or call ahead to confirm hours</li>
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
