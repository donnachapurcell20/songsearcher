from flask import Flask, request, jsonify, make_response
import os
import logging
import requests
from spotipy import SpotifyAPI
from youtube_service import youtube_search_function
from dotenv import load_dotenv
from flask_caching import Cache
from flask_cors import CORS
from spotipy import Spotify




# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)

# Initialize Flask Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Configure CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Use config to read the client credentials from the .env file
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')

spotify_api = SpotifyAPI(CLIENT_ID, CLIENT_SECRET)

# New route to get the access token
@app.route('/api/get-access-token')
def get_access_token():
    try:
        access_token = spotify_api.get_access_token()
        return jsonify({'accessToken': access_token}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        return jsonify(error='Error fetching access token'), 500, {'Content-Type': 'application/json'}

@app.route('/api/search-tracks')
def search_tracks():
    search_term = request.args.get('q')
    if not search_term:
        return jsonify(error='Missing search term'), 400, {'Content-Type': 'application/json'}

    try:
        access_token = spotify_api.get_access_token()
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.get(
            f'https://api.spotify.com/v1/search?q={search_term}&type=track',
            headers=headers
        )
        response_data = response.json()
        tracks = response_data.get('tracks', {}).get('items', [])
        return jsonify({'tracks': tracks}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        logging.error('Error fetching from Spotify API:', exc_info=True)
        return jsonify(error='Error fetching from Spotify API'), 500, {'Content-Type': 'application/json'}

# Endpoint for YouTube search
@app.route('/api/youtube-search', methods=['GET'])
def youtube_search():
    artist_name = request.args.get('artistName')
    song_name = request.args.get('songName')

    try:
        if not artist_name or not song_name:
            raise ValueError('Missing artistName or songName parameters')

        videos = youtube_search_function(artist_name, song_name, YOUTUBE_API_KEY)
        return format_youtube_response(videos)

    except ValueError as ve:
        return jsonify(error=str(ve)), 400, {'Content-Type': 'application/json'}

    except Exception as e:
        logging.error('Error fetching from YouTube API:', exc_info=True)
        return jsonify(error='Error fetching from YouTube API'), 500, {'Content-Type': 'application/json'}

def format_youtube_response(videos):
    formatted_videos = [
        {
            'id': video['id']['videoId'],
            'title': video['snippet']['title'],
            'thumbnail': video['snippet']['thumbnails']['default']['url']
        } for video in videos
    ]
    return jsonify({'videos': formatted_videos}), 200, {'Content-Type': 'application/json'}
    
if __name__ == '__main__':
    app.run(debug=True)