import React from 'react';

const Result = ({ result }) => {
  const { artist, song, image, videoId } = result;

  return (
    <div>
      <h3>{artist}</h3>
      <h4>{song}</h4>
      <img
        src={image}
        alt={`${artist} - ${song} Album Cover`}
        className="album-cover"
        style={{ width: '100px', height: '100px' }}
      />
      {videoId && (
        <iframe
          title={`${artist} - ${song} video`}
          src={`https://www.youtube.com/embed/${videoId}`}
          width="300"
          height="200"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default Result;
