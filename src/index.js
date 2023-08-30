import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Initial render
root.render(<App />);

// Later, you can update the app's content without completely recreating the root
// root.render(<UpdatedApp />);

reportWebVitals();
