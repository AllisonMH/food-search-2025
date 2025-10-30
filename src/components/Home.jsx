import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Atlanta Food Resources
          </h1>
          <p className="text-xl text-gray-700">
            Finding food assistance when you need it most
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Finding food assistance shouldn't be difficult. This app helps connect people
              in the Atlanta metro area with local food pantries, meal programs, and emergency
              food resources.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're facing temporary hardship or need ongoing support, there are
              organizations ready to help. All services listed are free and available to
              those in need.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              What You'll Find
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Food Pantries:</strong> Regular distributions of groceries and household items
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Free Meals:</strong> Soup kitchens and meal programs serving hot meals
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Mobile Pantries:</strong> Food distribution on wheels coming to your neighborhood
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Emergency Assistance:</strong> Quick help when you need it most
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How to Use This App
            </h2>
            <ol className="space-y-3 list-decimal list-inside text-gray-700">
              <li>Click "Find Resources" below to see all available food assistance</li>
              <li>Filter by your zip code, county, or search by address</li>
              <li>View organization details including location, hours, and contact info</li>
              <li>Click the website link to learn more or call ahead to confirm hours</li>
            </ol>
          </section>

          <div className="text-center mt-8">
            <Link
              to="/resources"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors duration-200"
            >
              Find Food Resources
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Help Us Improve
          </h3>
          <p className="text-gray-700 mb-4">
            This is an open-source community project. Know of a food resource we're missing?
            Want to help improve the app?
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Contribute on GitHub
          </a>
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Need immediate assistance?</strong> Call 211 for 24/7 information about
            food assistance, shelter, and other community resources.
          </p>
        </div>
      </div>
    </div>
  );
}
