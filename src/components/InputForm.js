import React, { useState } from 'react';

function InputForm({ onSearch }) {
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/search-tracks?q=${artistName} ${songName}`);
      const results = await response.json();
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
    </div>
  );
}

export default InputForm;
