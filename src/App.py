import logging
from flask import Flask, jsonify, request, Response  # Import Response from Flask
from flask_cors import CORS
import requests
from spotify_api import SpotifyAPI  # Import your SpotifyAPI class
from decouple import config  # Import config from python-decouple

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # Set the log level to DEBUG

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def hello_world():
    return jsonify(message='Welcome to the Spotify API Server')

# Use config to read the client credentials from the .env file
CLIENT_ID = config('CLIENT_ID')
CLIENT_SECRET = config('CLIENT_SECRET')

spotify_api = SpotifyAPI(CLIENT_ID, CLIENT_SECRET)

# New route to get the access token
@app.route('/api/get-access-token')
def get_access_token():
    try:
        # Create an instance of your SpotifyAPI class and get the access token
        access_token = spotify_api.get_access_token()

        # Return the access token as a JSON response with content type specified
        return jsonify({'accessToken': access_token}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        # Handle any errors that occur during access token retrieval
        return jsonify(error='Error fetching access token'), 500, {'Content-Type': 'application/json'}

@app.route('/api/search-tracks')
def search_tracks():
    search_term = request.args.get('q')
    if not search_term:
        return jsonify(error='Missing search term'), 400, {'Content-Type': 'application/json'}

    try:
        access_token = spotify_api.get_access_token()

        # Log the access token
        logging.debug('Access Token:', access_token)

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        # Modify the API endpoint URL to search for the user's input
        response = requests.get(
            f'https://api.spotify.com/v1/search?q={search_term}&type=track',
            headers=headers
        )

        response_data = response.json()
        tracks = response_data.get('tracks', {}).get('items', [])

        # Log the response
        logging.debug('Spotify API Response:', response.status_code, response.headers, response.text)

        # Return the tracks as a JSON response with content type specified
        return jsonify({'tracks': tracks}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        # Log any errors that occur during the token retrieval or API request
        logging.error('Error fetching from Spotify API:', exc_info=True)
        return jsonify(error='Error fetching from Spotify API'), 500, {'Content-Type': 'application/json'}

if __name__ == '__main__':
    app.run(debug=True)
