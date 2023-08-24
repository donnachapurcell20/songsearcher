from flask import Flask, jsonify, render_template, request
import os
from datetime import datetime
from spotify_api import SpotifyAPI
import requests

app = Flask(__name__)

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

spotify_api = SpotifyAPI(CLIENT_ID, CLIENT_SECRET)

# Endpoint for serving your React app
@app.route('/')
def serve_react_app():
    return render_template('index.html')

# API route for searching tracks on Spotify
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
        return jsonify(tracks)
    except Exception as e:
        return jsonify(error='Error fetching from Spotify API'), 500

# API route for getting track details from Spotify
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
        return jsonify(error='Error fetching track details'), 500

# API route for getting track audio features from Spotify
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
        return jsonify(error='Error fetching audio features'), 500

if __name__ == '__main__':
    app.run(debug=True)
