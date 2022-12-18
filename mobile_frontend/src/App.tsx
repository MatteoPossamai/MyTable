// Global imports
import React, {lazy, Suspense} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local imports
// Components
import Base from './components/base';
import MiddlePage from './components/middlePage';
import Loader from './components/loader';

const HomePage = lazy(() => import('./components/homepage'));
const InitialForm = lazy(() => import('./components/initialForm'));
const FourOhFour = lazy(() => import('./components/404'));


function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="initial/:id" element={<MiddlePage />} />
          <Route path="mytable/:id" element={<InitialForm />} />
          <Route path="mytable/menu/:id" element={<Base />} />
          <Route path='*' element={<FourOhFour />} /> 
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
