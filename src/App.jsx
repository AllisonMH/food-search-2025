import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FoodResources from './components/FoodResources';
import MonthlyDrive from './components/MonthlyDrive';
import ThankYou from './components/ThankYou';

function App() {
  // Use the base path from Vite config for GitHub Pages, empty for local dev
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<FoodResources />} />
        <Route path="/drives" element={<MonthlyDrive />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
