import logging  # Import the logging module
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from spotify_api import SpotifyAPI
import requests

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # Set the log level to DEBUG

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def hello_world():
    return jsonify(message='Welcome to the Spotify API Server')

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

spotify_api = SpotifyAPI(CLIENT_ID, CLIENT_SECRET)

@app.route('/api/search-tracks')
def search_tracks():
    search_term = request.args.get('q')
    if not search_term:
        return jsonify(error='Missing search term'), 400

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

        # Log the response
        logging.debug('Spotify API Response:', response.text)

        return jsonify({'tracks': tracks})
    except Exception as e:
        logging.error('Error fetching from Spotify API:', exc_info=True)  # Log the error with traceback
        return jsonify(error='Error fetching from Spotify API'), 500

@app.route('/api/get-track-details/<track_id>')
def get_track_details(track_id):
    try:
        access_token = spotify_api.get_access_token()

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        response = requests.get(
            f'https://api.spotify.com/v1/tracks/{track_id}',
            headers=headers
        )

        track_details = response.json()
        return jsonify(track_details)
    except Exception as e:
        logging.error('Error fetching track details:', exc_info=True)
        return jsonify(error='Error fetching track details'), 500

@app.route('/api/get-track-audio-features/<track_id>')
def get_track_audio_features(track_id):
    try:
        access_token = spotify_api.get_access_token()

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        response = requests.get(
            f'https://api.spotify.com/v1/audio-features/{track_id}',
            headers=headers
        )

        audio_features = response.json()
        return jsonify(audio_features)
    except Exception as e:
        logging.error('Error fetching audio features:', exc_info=True)
        return jsonify(error='Error fetching audio features'), 500

if __name__ == '__main__':
    app.run(debug=True)
