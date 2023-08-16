// src/SearchResults.js

import React from 'react';

function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <h3>{result.title}</h3>
          {/* Display additional result information */}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
