import React, { useState, useEffect } from 'react';

function SearchResults({ artistName, songName, accessToken }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artistName && songName) {
      setLoading(true);

      fetchSearchResults(artistName, songName, accessToken)
        .then(data => {
          const tracks = data.tracks.items;
          setResults(tracks);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [artistName, songName, accessToken]);

  const fetchSearchResults = async (artistName, songName, accessToken) => {
    const API_URL = 'https://api.spotify.com/v1/search';
    const searchQuery = `${artistName} ${songName}`;
    const encodedQuery = encodeURIComponent(searchQuery);
  
    try {
      const response = await fetch(`${API_URL}?q=${encodedQuery}&type=track`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      // Log the request URL and headers
      console.log('Request URL:', `${API_URL}?q=${encodedQuery}&type=track`);
      console.log('Request Headers:', {
        'Authorization': `Bearer ${accessToken}`
      });
  
      if (!response.ok) {
        throw new Error('Error fetching search results. Check your request.');
      }
  
      const data = await response.json();
      console.log('Response Data:', data); // Log the response data
      return data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  };
  

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
