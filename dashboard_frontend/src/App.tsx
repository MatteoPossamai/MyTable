// Global imports
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local imports
// Components
import MainPage from './components/main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<h1>Login</h1>} />
        <Route path="dashboard/:id" element={<MainPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
