import requests
from flask import jsonify
import logging
from urllib.parse import urlencode

def youtube_search_function(artist_name, song_name):
    base_url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        'part': 'snippet',
        'type': 'video',
        'q': f"{artist_name} {song_name}",
        'maxResults': 5,
        'key': 'YOUTUBE_API_KEY'
    }

    response = requests.get(base_url, params=params)

    if response.status_code != 200:
        raise ValueError('Error fetching from YouTube API')

    data = response.json()
    videos = data['items']

    return format_youtube_response(videos)

def format_youtube_response(videos):
    formatted_videos = []

    for video in videos:
        video_data = {
            'title': video['snippet']['title'],
            'thumbnail': video['snippet']['thumbnails']['default']['url'],
            'url': f'https://www.youtube.com/watch?v={video["id"]["videoId"]}'
        }

        formatted_videos.append(video_data)

    return jsonify(videos=formatted_videos), 200, {'Content-Type': 'application/json'}