import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults.js';

function InputForm() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get(`http://localhost:5000/api/youtube-search?artistName=${artist}&songName=${song}`);
      console.log(response.data);
      navigate(`/search-results?artist=${artist}&song=${song}`);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Artist name"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="text"
        placeholder="Song name"
        value={song}
        onChange={(e) => setSong(e.target.value)}
      />
      <button type="submit">Search</button>
      <SearchResults results={[]} />
    </form>
  );
}

export default InputForm;