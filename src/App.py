from flask import Flask, jsonify, request
import os
import requests

app = Flask(__name__)

@app.route('/search-tracks', methods=['GET'])
def search_tracks():
    search_term = request.args.get('q')
    api_key = os.getenv('CLIENT_ID')
    
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    try:
        response = requests.get(
            f'https://api.spotify.com/v1/search?q={search_term}&type=track',
            headers=headers
        )
        response.raise_for_status()  # Raise an error for non-2xx responses
        response_data = response.json()
        tracks = response_data.get('tracks', {}).get('items', [])
        return jsonify(tracks)
    except requests.exceptions.RequestException as e:
        print('Error fetching from Spotify API:', e)
        return jsonify(error='Internal Server Error'), 500

# Other routes for get-track-details and get-track-audio-features

if __name__ == '__main__':
    app.run(debug=True)
