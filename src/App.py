from flask import Flask, jsonify, render_template, request
import os
import requests

app = Flask(__name__)

# Define your Spotify API credentials
CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')

# Endpoint for serving your React app
@app.route('/')
def serve_react_app():
    return render_template('index.html')

# Spotify API authorization helper function
def get_spotify_access_token():
    auth_response = requests.post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    })

    auth_data = auth_response.json()
    access_token = auth_data['access_token']
    return access_token

# API route for searching tracks on Spotify
@app.route('/api/search-tracks')
def search_tracks():
    search_term = request.args.get('q')
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

# API route for getting track details from Spotify
@app.route('/api/get-track-details/<track_id>')
def get_track_details(track_id):
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

# API route for getting track audio features from Spotify
@app.route('/api/get-track-audio-features/<track_id>')
def get_track_audio_features(track_id):
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

if __name__ == '__main__':
    app.run(debug=True)
