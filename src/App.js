import React, { useState } from 'react';
import Header from './components/Header'; // Adjust the path based on your project structure
import InputForm from './components/InputForm'; // Adjust the path based on your project structure
import SearchResults from './components/SearchResults'; // Adjust the path based on your project structure
import axios from 'axios'; // Import axios
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
        {
          headers: {
            Authorization: 'b35ab11f052a491c9a2b4a95d8d60c9f',
          },
        }
      );

      const tracks = response.data.tracks.items;
      setSearchResults(tracks);
    } catch (error) {
      console.error('Error fetching from Spotify API:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <InputForm onSearch={handleSearch} />
        <SearchResults results={searchResults} />
      </main>
    </div>
  );
}

export default App;
