from googleapiclient.discovery import build
from flask_caching import Cache
from decouple import config
from google.auth import exceptions


cache = Cache(config={'CACHE_TYPE': 'simple'})

YOUTUBE_API_KEY = config('YOUTUBE_API_KEY')  # Add your YouTube API key to your .env file

@cache.memoize(timeout=600)  # Cache the results for 10 minutes
def youtube_search_function(artist_name, song_name):
    youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

    search_query = f'{artist_name} {song_name}'
    response = youtube.search().list(
        q=search_query,
        type='video',
        part='snippet',
        maxResults=5  # You can adjust the number of results as needed
    ).execute()

    videos = response.get('items', [])
    return videos

from google.auth import exceptions

try:
    youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
except exceptions.RefreshError:
    # Handle token refresh errors here
    print("Error refreshing YouTube API token.")
    raise
