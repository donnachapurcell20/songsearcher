import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InputForm() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Make request to Spotify API
      const spotifyResponse = await axios.get(`http://localhost:5000/api/search-tracks?artistName=${artist}&songName=${song}`);

      // Make request to YouTube API
      const youtubeResponse = await axios.get(`http://localhost:5000/api/youtube-search?artistName=${artist}&songName=${song}`);

      // Navigate to search results page with query params
      navigate(`/search-results?artist=${artist}&song=${song}`, {
        state: {
          spotifyResults: spotifyResponse.data.tracks,
          youtubeResults: youtubeResponse.data.videos
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
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
    </form>
  );
}

export default InputForm;
