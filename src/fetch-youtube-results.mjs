import fetch from 'node-fetch';

const fetchYoutubeResults = async (artistName, songName) => {
  const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
  const searchQuery = `${artistName} ${songName}`;
  const encodedQuery = encodeURIComponent(searchQuery);

  try {
    const response = await fetch(`${YOUTUBE_API_URL}?q=${encodedQuery}&type=video&part=snippet&maxResults=5`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching YouTube results. Status: ${response.status}`);
    }

    try {
      const data = await response.json();
      return data;
    } catch (jsonError) {
      // If parsing as JSON fails, log the raw response and throw the error
      console.error('Error parsing YouTube response as JSON:', jsonError);
      const rawResponse = await response.text();
      console.error('Raw response:', rawResponse);
      throw jsonError;
    }
  } catch (error) {
    console.error('Error fetching YouTube results:', error);
    console.error('Request headers:', JSON.stringify(new Headers(fetch.headers)));
    console.error('Request query:', `?q=${encodedQuery}&type=video&part=snippet&maxResults=5`);
    throw error;
  }
};

fetchYoutubeResults('Packy', 'Wobbin')
  .then(data => console.log('YouTube Data:', data))
  .catch(error => console.error('Error fetching YouTube data:', error));