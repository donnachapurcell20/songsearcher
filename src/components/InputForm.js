import React, { useState } from 'react';
import SearchResults from './SearchResults';

function InputForm({ onSearch }) {
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const encodedArtistName = encodeURIComponent(artistName);
      const encodedSongName = encodeURIComponent(songName);
      const searchTerm = `${encodedArtistName} ${encodedSongName}`;

      const response = await fetch(`/api/search-tracks?q=${searchTerm}`);
      const data = await response.json();

      setResults(data.tracks);
      onSearch(searchTerm, data.tracks);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Artist Name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Song Name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      <SearchResults artistName={artistName} songName={songName} results={results} />
    </div>
  );
}

export default InputForm;
