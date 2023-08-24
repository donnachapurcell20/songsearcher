from flask import Flask, jsonify, render_template, request
import os
import requests
from datetime import datetime, timedelta

app = Flask(__name__)

# Define your Spotify API credentials
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

# Token management variables
access_token = None
expiration_time = datetime.min

# Spotify API authorization helper function
def get_spotify_access_token():
    global access_token, expiration_time
    
    if expiration_time <= datetime.now():
        auth_response = requests.post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'client_credentials',
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
        })

        if auth_response.status_code != 200:
            print("Failed to obtain access token from Spotify API")
            print("Error response:", auth_response.text)  # Add this line to print the error response
            raise Exception("Failed to obtain access token from Spotify API")

        auth_data = auth_response.json()
        access_token = auth_data['access_token']
        expiration_seconds = auth_data['expires_in']
        expiration_time = datetime.now() + timedelta(seconds=expiration_seconds)

    return access_token

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
        access_token = get_spotify_access_token()

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
        access_token = get_spotify_access_token()

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
        access_token = get_spotify_access_token()

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
    # Initialize access token
    access_token = get_spotify_access_token()
    app.run(debug=True)
