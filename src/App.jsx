import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FoodResources from './components/FoodResources';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<FoodResources />} />
      </Routes>
    </Router>
  );
}

export default App;
