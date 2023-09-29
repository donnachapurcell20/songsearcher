import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

function InputForm({ onSearch }) {
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  const handleError = (error) => {
    console.error('Error:', error);
    setLoading(false);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-access-token', {
          headers: {
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
          console.log('Access Token:', data.accessToken);
        } else {
          handleError('Error fetching access token:', response.status);
        }
      } catch (error) {
        handleError('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const encodedArtistName = encodeURIComponent(artistName);
      const encodedSongName = encodeURIComponent(songName);
      const searchTerm = `${encodedArtistName} ${encodedSongName}`;

      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };

      const response = await fetch(`/api/search-tracks?q=${searchTerm}`, {
        method: 'GET',
        headers: headers
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.tracks);
        onSearch(searchTerm, data.tracks);
      } else {
        handleError('Error fetching search results:', response.status);
      }
    } catch (error) {
      handleError('Error fetching search results:', error);
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

      {/* Pass the accessToken as a prop to SearchResults */}
      <SearchResults artistName={artistName} songName={songName} accessToken={accessToken} results={results} />
    </div>
  );
}

export default InputForm;
