// Import necessary modules
import React from 'react';
import ReactDOM from 'react-dom/client'; // for React 18
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';

// Using createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app, wrapped with BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
