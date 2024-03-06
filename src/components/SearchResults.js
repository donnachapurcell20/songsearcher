import React from 'react';

function SearchResults({ spotifyResults, youtubeResults }) {
  return (
    <div className="search-results">
      {/* Spotify Results */}
      <div>
        {spotifyResults && spotifyResults.length > 0 ? (
          <div>
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
        {youtubeResults && youtubeResults.length > 0 ? (
          <div>
            {youtubeResults.map((video, index) => (
              <div key={index} className="result-item">
                <div className="result-card">
                  <h3 className="video-title">{video.snippet.title}</h3>
                  <img
                    src={video.snippet.thumbnails.default.url}
                    alt={`${video.snippet.title} Thumbnail`}
                    className="video-thumbnail"
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No YouTube results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
