import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const { spotifyResults, youtubeResults } = location.state || {};

  return (
    <div className="search-results">
      {/* Spotify Results */}
      <div>
        {spotifyResults && spotifyResults.length > 0 ? (
          <div>
            <h2>Spotify Results</h2>
            {spotifyResults.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-card">
                  <img
                    src={result.album.images[0].url} 
                    alt={`${result.name} Album Cover`}
                    className="album-cover"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div className="result-details">
                    <h3 className="song-title">{result.name}</h3>
                    <p className="artist-name">{result.artists[0].name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Spotify results found.</p>
        )}
      </div>

      {/* YouTube Results */}
      <div>
        {youtubeResults ? (
          <div>
            <h2>YouTube Results</h2>
            <div className="result-item">
              <div className="result-card">
                <h3 className="video-title">{youtubeResults.title}</h3>
                <img
                  src={youtubeResults.thumbnail}
                  alt={`${youtubeResults.title} Thumbnail`}
                  className="video-thumbnail"
                  style={{ width: '100px', height: '100px' }}
                />
                <a href={youtubeResults.url} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
              </div>
            </div>
          </div>
        ) : (
          <p>No YouTube results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;