import pytest
from sys import path
import requests, json, subprocess

path.append('../')
from app import server
from app import studdy_buddy

URL_PREFIX = f'{server.HOST}:{server.PORT}'

# Run flask server in a separate subprocess
subprocess.Popen(['python', '../app', 'server.py'])

def test_insert():
    # Insert a user into the Users collection
    user_example = {"id": "7dhnc7hb2lKH9", "name": "JJs", "email": "ss", "password": "123sssss4", "courses": ["CS 222"], "favorites": ["CS 222"]}
    resp = requests.put(f'{URL_PREFIX}/insert/test_users', json=json.dumps(user_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 200