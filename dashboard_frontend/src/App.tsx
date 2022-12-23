// Global imports
import React, {lazy, Suspense} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local imports
// Components
import MainPage from './components/main';
import LoginPage from './components/login';
import FourOhFour from './components/404';
import Loader from './components/loader';

let Help = lazy(() => import('./components/help'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard/:id" element={<MainPage />}/>
          <Route path="help" element={<Help />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
