import React, { useState, useEffect } from 'react';

function SearchResults({ artistName, songName, accessToken }) {
  const [spotifyResults, setSpotifyResults] = useState([]);
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artistName && songName) {
      setLoading(true);

      Promise.all([
        fetchSpotifyResults(artistName, songName, accessToken),
        fetchYoutubeResults(artistName, songName),
      ])
        .then(([spotifyData, youtubeData]) => {
          const spotifyTracks = spotifyData.tracks.items;
          const youtubeVideos = youtubeData.videos;
          setSpotifyResults(spotifyTracks);
          setYoutubeResults(youtubeVideos);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSpotifyResults([]);
      setYoutubeResults([]);
    }
  }, [artistName, songName, accessToken]);

  const fetchSpotifyResults = async (artistName, songName, accessToken) => {
    const API_URL = 'https://api.spotify.com/v1/search';
    const searchQuery = `artist:"${artistName}" track:"${songName}"`;
    const encodedQuery = encodeURIComponent(searchQuery);

    try {
      const response = await fetch(`${API_URL}?q=${encodedQuery}&type=track`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Error fetching Spotify results. Check your request.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Spotify results:', error);
      throw error;
    }
  };

  const fetchYoutubeResults = async (artistName, songName) => {
    try {
      const response = await fetch(`/api/youtube-search?artistName=${artistName}&songName=${songName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching YouTube results. Status: ${response.status}`);
      }
  
      try {
        const data = await response.json();
        return data;
      } catch (jsonError) {
        // If parsing as JSON fails, log the raw response and throw the error
        console.error('Error parsing YouTube response as JSON:', jsonError);
        const rawResponse = await response.text();
        console.error('Raw response:', rawResponse);
        throw jsonError;
      }
    } catch (error) {
      console.error('Error fetching YouTube results:', error);
      throw error;
    }
  };  
  
  
  return (
    <div className="search-results">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Spotify Results */}
          <div>
            {spotifyResults.length === 0 ? (
              <p>No Spotify results found.</p>
            ) : (
              <div>
                {spotifyResults.map((result, index) => (
                  <div key={index} className="result-item">
                    <div className="result-card">
                      <img
                        src={result.album.images[0].url} // Assuming the first image is the album cover
                        alt={`${result.name} Album Cover`}
                        className="album-cover"
                        style={{ width: '100px', height: '100px' }}
                      />
                      <div className="result-details">
                        <h3 className="song-title">{result.name}</h3>
                        <p className="artist-name">{result.artists[0].name}</p>
                        {/* You can add more details here */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* YouTube Results */}
          <div>
            {youtubeResults.length === 0 ? (
              <p>No YouTube results found.</p>
            ) : (
              <div>
                {youtubeResults.map((video, index) => (
                  <div key={index} className="result-item">
                    <div className="result-card">
                      {/* Display YouTube video details here */}
                      <h3 className="video-title">{video.snippet.title}</h3>
                      <p className="channel-title">{video.snippet.channelTitle}</p>
                      {/* You can add more details here */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
