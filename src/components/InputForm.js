import React, { useState } from 'react';

function InputForm({ onSearch }) {
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetchSearchResults(artistName, songName);
      const results = response.tracks.items;
      onSearch(artistName, songName, results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (artist, song) => {
    const API_URL = 'https://api.spotify.com/v1/search';
    const searchQuery = `${artist} ${song}`;
    const encodedQuery = encodeURIComponent(searchQuery);
    const searchUrl = `${API_URL}?q=${encodedQuery}&type=track`;

    const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with actual access token
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.json();
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
