import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { spotifyResults, youtubeResults } = location.state || {};

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="search-results">
      {/* Spotify Results */}
      <div>
        <h2>Spotify Results</h2>
        {spotifyResults && spotifyResults.length > 0 ? (
          spotifyResults.map((result, index) => (
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
          ))
        ) : (
          <p>No Spotify results found.</p>
        )}
      </div>

      {/* YouTube Results */}
      <div>
        <h2>YouTube Results</h2>
        {youtubeResults && youtubeResults.length > 0 ? (
          youtubeResults.map((video, index) => (
            <div key={index} className="result-item">
              <div className="result-card">
                <h3 className="video-title">{video.title}</h3>
                <img
                  src={video.thumbnail}
                  alt={`${video.title} Thumbnail`}
                  className="video-thumbnail"
                  style={{ width: '100px', height: '100px' }}
                />
                <a href={video.url} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
              </div>
            </div>
          ))
        ) : (
          <p>No YouTube results found.</p>
        )}
      </div>

      {/* Back Button */}
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default SearchResults;
