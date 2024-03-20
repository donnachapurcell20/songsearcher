import requests
import base64
from datetime import datetime, timedelta

class SpotifyAPI:
    def __init__(self, CLIENT_ID, CLIENT_SECRET):
        self.client_id = CLIENT_ID
        self.client_secret = CLIENT_SECRET
        self.access_token = None
        self.expiration_time = datetime.min
        self.base_url = "https://api.spotify.com/v1"

    def get_access_token(self):
        # Check if the current token has expired
        if self.expiration_time <= datetime.now():
            # Create a string of client_id:client_secret and base64 encode it
            client_credentials = f"{self.client_id}:{self.client_secret}"
            base64_encoded_credentials = base64.b64encode(client_credentials.encode()).decode()

            headers = {
                'Authorization': f'Basic {base64_encoded_credentials}'
            }

            # Make a POST request to Spotify's token endpoint
            auth_response = requests.post('https://accounts.spotify.com/api/token', data={
                'grant_type': 'client_credentials'
            }, headers=headers)

            if auth_response.status_code == 200:
                auth_data = auth_response.json()

                if 'access_token' in auth_data:
                    # Update the access token and its expiration time
                    self.access_token = auth_data['access_token']
                    expiration_seconds = auth_data['expires_in']
                    self.expiration_time = datetime.now() + timedelta(seconds=expiration_seconds)
                    return self.access_token
                else:
                    raise Exception("Failed to obtain access token. No 'access_token' in the response.")
            else:
                raise Exception(f"Failed to obtain access token. Status code: {auth_response.status_code}")

        return self.access_token

    def make_request(self, endpoint, method, params=None, headers=None):
        if not headers:
            headers = {}

        if not params:
            params = {}

        # Add access token to headers if it's not expired
        if self.access_token and self.expiration_time > datetime.now():
            headers['Authorization'] = f'Bearer {self.access_token}'

        url = self.base_url + endpoint

        if method == 'GET':
            response = requests.get(url, params=params, headers=headers)
        elif method == 'POST':
            response = requests.post(url, json=params, headers=headers)
        else:
            raise Exception(f"Invalid request method: {method}")

        if response.status_code != 200 and response.status_code != 201:
            raise Exception(f"Request failed with status code: {response.status_code}")

        return response.json()

    def search_tracks(self, artist_name, song_name):
        search_term = f"artist:{artist_name} track:{song_name}"
        params = {"q": search_term, "type": "track"}
        response = self.make_request("/search", "GET", params=params)
        return response["tracks"]["items"]