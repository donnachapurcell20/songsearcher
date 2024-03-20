import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def youtube_search_function(artist_name, song_name):
    base_url = "https://www.googleapis.com/youtube/v3/search"
    youtube_api_key = os.getenv('YOUTUBE_API_KEY')

    params = {
        'part': 'snippet',
        'type': 'video',
        'q': f"{artist_name} {song_name}",
        'maxResults': 5,  # Increase maxResults to get more videos
        'key': youtube_api_key
    }

    response = requests.get(base_url, params=params)

    if response.status_code != 200:
        raise ValueError('Error fetching from YouTube API')

    data = response.json()
    videos = data.get('items', [])

    formatted_videos = []
    for video in videos:
        video_data = {
            'title': video['snippet']['title'],
            'thumbnail': video['snippet']['thumbnails']['default']['url'],
            'url': f'https://www.youtube.com/watch?v={video["id"]["videoId"]}'
        }
        formatted_videos.append(video_data)

    return formatted_videos
