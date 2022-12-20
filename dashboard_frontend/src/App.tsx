// Global imports
import React, {lazy} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local imports
// Components
import MainPage from './components/main';
import LoginPage from './components/login';
import FourOhFour from './components/404';

let Help = lazy(() => import('./components/help'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard/:id" element={<MainPage />}/>
        <Route path="help" element={<Help />} />
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </Router>
  );
}

export default App;
