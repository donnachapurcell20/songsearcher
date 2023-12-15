import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);

reportWebVitals();