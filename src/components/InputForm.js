// src/InputForm.js

import React, { useState } from 'react';

function InputForm({ onSearch }) {
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(artistName, songName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter artist name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default InputForm;
