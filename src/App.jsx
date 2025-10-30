import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FoodResources from './components/FoodResources';

function App() {
  // Use the base path from Vite config for GitHub Pages, empty for local dev
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<FoodResources />} />
      </Routes>
    </Router>
  );
}

export default App;
