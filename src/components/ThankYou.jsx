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

            <div className="thank-you__contributor-categories">
              <div className="thank-you__category">
                <h3>Development Team</h3>
                <p>Building and maintaining the application</p>
                {/* Contributors will be added here */}
              </div>

              <div className="thank-you__category">
                <h3>Data Contributors</h3>
                <p>Researching and verifying food resource information</p>
                {/* Contributors will be added here */}
              </div>

              <div className="thank-you__category">
                <h3>Community Support</h3>
                <p>Testing, feedback, and spreading the word</p>
                {/* Contributors will be added here */}
              </div>
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
