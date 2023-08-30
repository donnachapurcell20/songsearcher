import React, { useState, useEffect } from 'react';

function fetchSearchResults(artistName, songName, accessToken) {
  const API_URL = 'https://api.spotify.com/v1/search';

  const searchQuery = `${artistName} ${songName}`;
  const encodedQuery = encodeURIComponent(searchQuery);
  const searchUrl = `${API_URL}?q=${encodedQuery}&type=track`;

  return fetch(searchUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .catch(error => {
    console.error('Error fetching search results:', error);
    throw error;
  });
}

function SearchResults({ artistName, songName, accessToken }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading to false initially

  useEffect(() => {
    if (artistName && songName) { //Check if both artistName and songName are present will want to change this to and/or
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
    } else {
      setResults([]);
    }
  }, [artistName, songName, accessToken]);

  return (
    <div className="search-results">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {results.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div>
              {results.map((result, index) => (
                <div key={index} className="result-item">
                  <h3>{result.name}</h3>
                  {/* Display additional result information */}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
