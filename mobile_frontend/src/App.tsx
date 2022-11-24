// Global imports
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local imports
// Components
import Base from './components/base';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<Base />} />
      </Routes>
    </Router>
  );
}

export default App;
