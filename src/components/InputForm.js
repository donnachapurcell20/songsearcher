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
      const spotifyResponse = await axios.get(`http://localhost:5000/api/search-tracks?artistName=${artist}&songName=${song}`);
      const youtubeResponse = await axios.get(`http://localhost:5000/api/youtube-search?artistName=${artist}&songName=${song}`);
      
      // Extract data from responses
      const spotifyTracks = spotifyResponse.data.tracks;
      const youtubeVideos = youtubeResponse.data.videos;

      // Navigate to search results page with both Spotify and YouTube results
      navigate(`/search-results`, { state: { spotifyResults: spotifyTracks, youtubeResults: youtubeVideos } });
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
