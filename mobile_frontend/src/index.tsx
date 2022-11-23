// Global imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Local imports
// Components
import App from './App';
// Styles
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

