// Global imports
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local imports
// Components
import HomePage from './components/homepage';
import Base from './components/base';
import InitialForm from './components/initialForm';
import FourOhFour from './components/404';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="mytable/:id" element={<InitialForm />} />
        <Route path="mytable/menu/:id" element={<Base />} />
        <Route path='*' element={<FourOhFour />} /> 
      </Routes>
    </Router>
  );
}

export default App;
