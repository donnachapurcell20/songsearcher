// src/SearchResults.js

import React, { useState, useEffect } from 'react';

function SearchResults({ artistName, songName }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Define your Spotify API credentials or access token here
    const API_URL = 'https://api.spotify.com/v1/search';
    const ACCESS_TOKEN = 'your_access_token_here';

    // Construct the API request URL
    const searchQuery = `${artistName} ${songName}`;
    const encodedQuery = encodeURIComponent(searchQuery);
    const searchUrl = `${API_URL}?q=${encodedQuery}&type=track`;

    // Make the API request
    fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const tracks = data.tracks.items;
        setResults(tracks);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  }, [artistName, songName]);

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
