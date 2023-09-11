import requests
import base64
from datetime import datetime, timedelta

class SpotifyAPI:
    def __init__(self, client_id, client_secret):
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token = None
        self.expiration_time = datetime.min

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

            auth_data = auth_response.json()

            if 'access_token' in auth_data:
                # Update the access token and its expiration time
                self.access_token = auth_data['access_token']
                expiration_seconds = auth_data['expires_in']
                self.expiration_time = datetime.now() + timedelta(seconds=expiration_seconds)
            else:
                # Handle the case where obtaining an access token fails
                print(f"Failed to obtain access token from Spotify API: {auth_data}")
                raise Exception("Failed to obtain access token from Spotify API")

        return self.access_token
