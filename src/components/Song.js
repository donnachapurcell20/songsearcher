import React from 'react';

const Song = ({ song }) => {
  return (
    <div>
      <h3>{song.name}</h3>
      <p>Artist: {song.artist}</p>
      <p>Album: {song.album}</p>
    </div>
  );
};

export default Song;
