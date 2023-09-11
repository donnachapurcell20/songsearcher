import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from spotify_api import SpotifyAPI  # Ensure your SpotifyAPI class is imported
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
        access_token = spotify_api.get_access_token()  # Updated method name

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        # Modify the API endpoint URL to search for both artist and track name
        response = requests.get(
            f'https://api.spotify.com/v1/search?q=artist:"{search_term}"%20OR%20track:"{search_term}"&type=track',
            headers=headers
        )

        response_data = response.json()
        tracks = response_data.get('tracks', {}).get('items', [])

        # Log the response
        logging.debug('Spotify API Response:', response.text)

        return jsonify({'tracks': tracks})
    except Exception as e:
        logging.error('Error fetching from Spotify API:', exc_info=True)
        return jsonify(error='Error fetching from Spotify API'), 500

if __name__ == '__main__':
    app.run(debug=True)
