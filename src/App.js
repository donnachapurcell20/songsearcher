import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import InputForm from './components/InputForm'; // Import InputForm component
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <p>This is a paragraph before the InputForm.</p>

      <Routes>
        <Route
          path="/"
          element={ // Initial content from index.js
            <div>
              <h2>Search Tracks</h2>
              <InputForm /> {/* Include the InputForm component */}
            </div>
          }
        />
        {/* Remove the Route for /search-tracks */}
        {/* Add more Route components for other pages */}
      </Routes>

      <Footer />
    </div>
  );
}
export default App;