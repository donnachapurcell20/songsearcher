import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import InputForm from './components/InputForm';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer'; // Import the Footer component

function App() {
  const [searchParams, setSearchParams] = useState({
    artistName: '',
    songName: '',
  });

  const handleSearch = (artistName, songName) => {
    setSearchParams({ artistName, songName });
  };

  return (
    <Router>
      <div>
        <Header />
        <p>This is a paragraph before the InputForm.</p>
        <Routes>
          <Route
            path="/"
            element={<InputForm onSearch={handleSearch} />}
          />
          <Route
            path="/search-tracks"
            element={<SearchResults
                        artistName={searchParams.artistName}
                        songName={searchParams.songName}
                      />}
          />
          {/* Add more routes/components as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
