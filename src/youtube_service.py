from googleapiclient.discovery import build
from flask_caching import Cache
from flask import jsonify
from decouple import config
import logging


cache = Cache(config={'CACHE_TYPE': 'simple'})

YOUTUBE_API_KEY = config('YOUTUBE_API_KEY')  # Add YouTube API key to .env file

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

def format_youtube_response(artist_name, song_name):
    try:
        videos = youtube_search_function(artist_name, song_name)
        return jsonify(videos=videos), 200
    except Exception as e:
        error_message = f'Error fetching from YouTube API: {str(e)}'
        logging.error(error_message, exc_info=True)
        return jsonify(error=error_message), 500
