const { google } = require('googleapis');

// Initialize the YouTube API with the provided API key
const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

// Function to search for a YouTube video
const searchYouTube = async (artistName, songName) => {
  try {
    const response = await youtube.search.list({
      q: `${artistName} - ${songName}`,
      type: 'video',
      part: 'snippet',
    });

    if (response.data.items && response.data.items.length > 0) {
      const video = response.data.items[0];
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const artist = video.snippet.channelTitle;
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      return {
        id: videoId,
        name: title,
        artist: artist,
        url: url,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to get information about a YouTube video using its ID
const getVideoInfo = async (videoId) => {
  try {
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoId,
    });

    if (response.data.items && response.data.items.length > 0) {
      const video = response.data.items[0];
      const title = video.snippet.title;
      const artist = video.snippet.channelTitle;
      const image = video.snippet.thumbnails.default.url;

      return {
        artist: artist,
        song: title,
        image: image,
        videoId: videoId,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { searchYouTube, getVideoInfo };
