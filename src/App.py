from flask import Flask, request, jsonify, make_response
import os
import logging
import requests
from spotify_api import SpotifyAPI
from youtube_service import youtube_search_function
from dotenv import load_dotenv
from flask_caching import Cache
from flask_cors import CORS
import datetime
import base64
from datetime import timedelta

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
        # Instantiate the SpotifyAPI class with client credentials
        spotify_api = SpotifyAPI(CLIENT_ID, CLIENT_SECRET)
        
        # Call the get_access_token method
        access_token = spotify_api.get_access_token()
        
        # Return the access token
        return jsonify({'accessToken': access_token}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        return jsonify(error='Error fetching access token'), 500, {'Content-Type': 'application/json'}

@app.route('/api/search-tracks', methods=['GET'])
def search_tracks():
    artist_name = request.args.get('artistName')
    song_name = request.args.get('songName')

    if not artist_name or not song_name:
        return jsonify(error='Missing artistName or songName parameters'), 400, {'Content-Type': 'application/json'}

    try:
        logging.info(f"Searching Spotify for artist: {artist_name}, song: {song_name}")

        # Get access token
        access_token = spotify_api.get_access_token()
        logging.info(f"Access token obtained: {access_token}")

        # Construct search term
        search_term = f"artist:{artist_name} track:{song_name}"
        logging.info(f"Search term: {search_term}")

        # Make request to Spotify API
        response = spotify_api.make_request("/search", "GET", params={"q": search_term, "type": "track"})
        tracks = response["tracks"]["items"]

        logging.info(f"Spotify search successful. Found {len(tracks)} tracks.")
        logging.info(f"Spotify response: {tracks}")  # Log the Spotify response

        return jsonify({'tracks': tracks}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        logging.error('Error fetching from Spotify API:', exc_info=True)
        if isinstance(e, requests.exceptions.RequestException):
            return jsonify(error=f"Error fetching from Spotify API: {e}"), 500, {'Content-Type': 'application/json'}
        elif isinstance(e, Exception):
            return jsonify(error=f"Error fetching from Spotify API: {e}"), 500, {'Content-Type': 'application/json'}




# Endpoint for YouTube search
@app.route('/api/youtube-search', methods=['GET'])
def youtube_search():
    artist_name = request.args.get('artistName')
    song_name = request.args.get('songName')

    if not artist_name or not song_name:
        return jsonify(error='Missing artistName or songName parameters'), 400, {'Content-Type': 'application/json'}

    try:
        videos = youtube_search_function(artist_name, song_name)
        return jsonify({'videos': videos}), 200, {'Content-Type': 'application/json'}

    except ValueError as ve:
        return jsonify(error=str(ve)), 400, {'Content-Type': 'application/json'}

    except Exception as e:
        return jsonify(error='Error fetching from YouTube API'), 500, {'Content-Type': 'application/json'}

if __name__ == '__main__':
    app.add_url_rule('/', endpoint='index', view_func=lambda: 'Hello, World!')
    app.run(debug=True)
