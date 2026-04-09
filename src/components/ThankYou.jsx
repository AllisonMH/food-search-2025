import { Link } from 'react-router-dom';
import '../styles/ThankYou.scss';

export default function ThankYou() {
  return (
    <div className="thank-you">
      <div className="thank-you__container">
        {/* Header */}
        <header className="thank-you__header">
          <h1 className="thank-you__title">
            Thank You to Our Contributors
          </h1>
          <p className="thank-you__subtitle">
            This project wouldn't be possible without the dedication of our amazing community
          </p>
        </header>

        {/* Main Content */}
        <div className="thank-you__content">
          <section className="thank-you__section">
            <h2>Our Mission</h2>
            <p>
              The Atlanta Food Resources app exists to help connect people in need with
              local food assistance. Every contribution, whether it's code, data, design,
              or ideas, helps us serve our community better.
            </p>
          </section>

          <section className="thank-you__section">
            <h2>Contributors</h2>
            <p>
              We're grateful to everyone who has contributed to this project. Your time,
              expertise, and passion make a real difference in people's lives.
            </p>

            <div className="thank-you__contributors-list">
              <a
                href="https://www.linkedin.com/in/soufiancarson/"
                target="_blank"
                rel="noopener noreferrer"
                className="thank-you__contributor-card"
              >
                <div className="thank-you__contributor-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </div>
                <div className="thank-you__contributor-info">
                  <h4>Soufian C</h4>
                  <p>View LinkedIn Profile</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/aishaajackson/"
                target="_blank"
                rel="noopener noreferrer"
                className="thank-you__contributor-card"
              >
                <div className="thank-you__contributor-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </div>
                <div className="thank-you__contributor-info">
                  <h4>Aisha J</h4>
                  <p>View LinkedIn Profile</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/ward-corey/"
                target="_blank"
                rel="noopener noreferrer"
                className="thank-you__contributor-card"
              >
                <div className="thank-you__contributor-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </div>
                <div className="thank-you__contributor-info">
                  <h4>Corey W</h4>
                  <p>View LinkedIn Profile</p>
                </div>
              </a>
            </div>
          </section>

          <section className="thank-you__section">
            <h2>Want to Contribute?</h2>
            <p>
              We're always looking for help! Whether you're a developer, designer, researcher,
              or someone who wants to help verify food resource data, there's a place for you
              in this project.
            </p>
            <p>
              Check out our{' '}
              <a
                href="https://github.com/AllisonMH/food-search-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="thank-you__link"
              >
                GitHub repository
              </a>{' '}
              to get started or learn more about contributing.
            </p>
          </section>

          <div className="thank-you__cta">
            <Link to="/" className="thank-you__cta-button">
              Back to Home
            </Link>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="thank-you__footer">
          <p>
            Created with 💜 by Kolor Koded Studios. Find us at{' '}
            <a
              href="https://www.kolorkodedstudios.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              kolorkodedstudios.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
