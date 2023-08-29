import React, { useState, useEffect } from 'react';

function fetchSearchResults(artistName, songName, accessToken) {
  const API_URL = 'https://api.spotify.com/v1/search';

  const searchQuery = `${artistName} ${songName}`;
  const encodedQuery = encodeURIComponent(searchQuery);
  const searchUrl = `${API_URL}?q=${encodedQuery}&type=track`;

  console.log('Sending request to:', searchUrl); // Debugging

  return fetch(searchUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .catch(error => {
    console.error('Error fetching search results:', error);
    throw error; // Rethrow the error to be caught in the component
  });
}

function SearchResults({ artistName, songName, accessToken }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSearchResults(artistName, songName, accessToken)
      .then(data => {
        const tracks = data.tracks.items;
        setResults(tracks);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  }, [artistName, songName, accessToken]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="search-results">
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <h3>{result.name}</h3>
          {/* Display additional result information */}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
