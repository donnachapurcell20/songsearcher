import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (artistName, songName, results) => {
    setSearchResults(results);
  };

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
              {/* Your textboxes and search button */}
            </div>
          }
        />
        <Route
          path="/search-tracks"
          element={
            <SearchResults
              artistName=""
              songName=""
              results={searchResults}
            />
          }
        />
        {/* Add more Route components for other pages */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
