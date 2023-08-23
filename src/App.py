from flask import Flask, jsonify, request
import os
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to my Flask-React app!"

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
        return jsonify(error='Error fetching from Spotify API'), 500
    except Exception as e:
        print('Other error:', e)
        return jsonify(error='Internal Server Error'), 500

@app.route('/get-track-details/<track_id>', methods=['GET'])
def get_track_details(track_id):
    api_key = os.getenv('CLIENT_ID')
    
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    try:
        response = requests.get(
            f'https://api.spotify.com/v1/tracks/{track_id}',
            headers=headers
        )
        response.raise_for_status()  
        track_details = response.json()
        return jsonify(track_details)
    except requests.exceptions.RequestException as e:
        print('Error fetching track details:', e)
        return jsonify(error='Error fetching track details'), 500
    except Exception as e:
        print('Other error:', e)
        return jsonify(error='Internal Server Error'), 500

@app.route('/get-track-audio-features/<track_id>', methods=['GET'])
def get_track_audio_features(track_id):
    api_key = os.getenv('CLIENT_ID')
    
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    try:
        response = requests.get(
            f'https://api.spotify.com/v1/audio-features/{track_id}',
            headers=headers
        )
        response.raise_for_status()  # Raise an error for non-2xx responses
        audio_features = response.json()
        return jsonify(audio_features)
    except requests.exceptions.RequestException as e:
        print('Error fetching audio features:', e)
        return jsonify(error='Error fetching audio features'), 500
    except Exception as e:
        print('Other error:', e)
        return jsonify(error='Internal Server Error'), 500

if __name__ == '__main__':
    app.run(debug=True)
