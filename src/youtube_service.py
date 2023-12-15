from googleapiclient.discovery import build
from flask import jsonify
from decouple import config
import logging

# Initialize Flask Cache
from flask_caching import Cache
cache = Cache(config={'CACHE_TYPE': 'simple'})

# Get YouTube API key from environment variable
YOUTUBE_API_KEY = config('YOUTUBE_API_KEY')

# Cache the results for 10 minutes
@cache.memoize(timeout=600)
def youtube_search_function(request_args):
    try:
        # Extract parameters directly from request arguments
        artist_name = request_args.get('artistName')
        song_name = request_args.get('songName')

        if not artist_name or not song_name:
            raise ValueError('Missing artist name or song name')

        # Build YouTube API service
        youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

        # Construct the search query
        search_query = f'{artist_name} {song_name}'

        # Execute the YouTube API search
        response = youtube.search().list(
            q=search_query,
            type='video',
            part='snippet',
            maxResults=5
        ).execute()

        # Extract video items from the response
        videos = response.get('items', [])

        return videos

    except Exception as e:
        # Log and handle exceptions
        error_message = f'Error fetching from YouTube API: {str(e)}'
        logging.error(error_message, exc_info=True)
        raise ValueError(error_message)

# Format the YouTube API response
def format_youtube_response(request_args):
    try:
        # Call the youtube_search_function with request arguments
        videos = youtube_search_function(request_args)

        # Return a JSON response
        return jsonify(videos=videos), 200

    except ValueError as ve:
        # Handle the case where parameters are missing
        return jsonify(error=str(ve)), 400

    except Exception as e:
        # Log and handle other exceptions
        error_message = f'Error formatting YouTube API response: {str(e)}'
        logging.error(error_message, exc_info=True)
        return jsonify(error=error_message), 500
