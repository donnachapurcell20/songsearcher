import React, { useState } from 'react';
import SearchResults from './SearchResults';

function InputForm({ onSearch }) {
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const encodedArtistName = encodeURIComponent(artistName);
      const encodedSongName = encodeURIComponent(songName);
      console.log(`Fetch URL: /api/search-tracks?q=artist:"${encodedArtistName}" track:"${encodedSongName}"`);
      const response = await fetch(`/api/search-tracks?q=artist:"${encodedArtistName}" track:"${encodedSongName}"`);
      console.log('Response:', response);
      const results = await response.json();
      console.log('Results:', results);

      onSearch(artistName, songName, results);

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
        onChange={e => setArtistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Song Name"
        value={songName}
        onChange={e => setSongName(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      <SearchResults artistName={artistName} songName={songName} />
    </div>
  );
}

export default InputForm;
