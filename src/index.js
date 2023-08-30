import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Initial render
root.render(<App />);

// Later, you can update the app's content without completely recreating the root
// root.render(<UpdatedApp />);

reportWebVitals();
