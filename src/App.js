import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import InputForm from './components/InputForm';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';

function App() {
  const [searchParams, setSearchParams] = useState({
    artistName: '',
    songName: '',
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (artistName, songName, results) => {
    setSearchParams({ artistName, songName });
    setSearchResults(results);
  };

  return (
    <Router>
      <div>
        <Header />
        <p>This is a paragraph before the InputForm.</p>

        <Switch>
          <Route path="/search-tracks">
            <InputForm onSearch={handleSearch} />
            <SearchResults
              artistName={searchParams.artistName}
              songName={searchParams.songName}
              results={searchResults}
            />
          </Route>
          {/* Add more Route components for other pages */}
          <Route path="/">
            {/* Home component */}
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
