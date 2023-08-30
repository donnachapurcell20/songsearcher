import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
    <div>
      <Header />
      <p>This is a paragraph before the InputForm.</p>

      {/* Adding the "Hello, World!" message */}
      
      <InputForm onSearch={handleSearch} />
      <SearchResults
        artistName={searchParams.artistName}
        songName={searchParams.songName}
        results={searchResults}
      />

      <Footer />
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
