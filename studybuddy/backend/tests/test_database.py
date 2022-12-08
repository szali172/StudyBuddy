import pytest
from sys import path
import requests, json
from threading import Thread
from time import sleep
import datetime

path.append('../')
from app import server
from app import studdy_buddy
from utils import credentials as c
from utils.validate_entry import DATETIME_FORMAT

URL_PREFIX = f'{server.HOST}:{server.PORT}'
current_time = datetime.datetime.now().strftime(DATETIME_FORMAT)


""" Run flask server in a separate thread"""
try:
    flask_thread = Thread(target=server.start_server, daemon=True).start()
except:
    print(f'Server is already running on port {server.PORT}')

# Allow the server some time to start
sleep(5)



def test_insert_user():
    # Clear the test_users collection
    resp = requests.delete(f'{URL_PREFIX}/delete_all/test_users')
    assert resp.status_code == 200, f'{resp.text}'
    
    # Insert a user into the Users collection
    user_example = {"id": "7dhnc7hb2lKH9", "name": "TestUser1", "email": "test@illinois.edu", "password": "123", "courses": ["CS 222"], "favorites": ["CS 222"]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_users', json=json.dumps(user_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 200, f'{resp.text}'
    
    # Insert a second user into the Users collection
    user_example = {"id": "28dn39fn20nd", "name": "Jane Doe", "email": "jdoe2@illinois.edu", "password": "qwerty", "courses": ["CS 440", "STAT 440", "CS 421"], "favorites": ["CS 222"]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_users', json=json.dumps(user_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 200, f'{resp.text}'
    
    # Try to insert new user with same id as an existing one
    # Will fail because validate_entry will catch an existing user
    user_example = {"id": "7dhnc7hb2lKH9", "name": "Test3", "email": "test3@illinois.edu", "password": "point_break", "courses": ["MATH 241"], "favorites": ["IB 150", "CWL 251"]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_users', json=json.dumps(user_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 400, f'{resp.text}'
    
    # Try to insert a user with a bad json value
    # Will fail because validate_entry will check all json fields - "password" was changed to "pw"
    user_example = {"id": "thisIsAnOkID", "name": "Test4", "email": "test3@illinois.edu", "pw": "point_break", "courses": [], "favorites": []}
    resp = requests.post(f'{URL_PREFIX}/insert/test_users', json=json.dumps(user_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 400, f'{resp.text}'
    
    # Try to insert a user with a missing json value
    # Will fail because validate_entry will check all json fields - "id" was removed
    user_example = {"name": "John Smith", "email": "jsmith@illinois.edu", "password": "testing", "courses": ["MATH 441"], "favorites": ["CS 222"]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_users', json=json.dumps(user_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 400, f'{resp.text}'
    
    
    
def test_insert_post():
    # Clear the test_posts collection
    resp = requests.delete(f'{URL_PREFIX}/delete_all/test_posts')
    assert resp.status_code == 200, f'{resp.text}'
    
    # Insert a post into the Posts collection
    # TestUser1 is adding a post
    post_example = {"post_id":"9dn10nskc83nc","op_id":"7dhnc7hb2lKH9","ts":current_time,"location":"Grainger Library","content":"post one","comments":[]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_posts', json=json.dumps(post_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 200, f'{resp.text}'
    
    # Insert a second post by the same user
    post_example = {"post_id":"82nd9qmshc01k","op_id":"7dhnc7hb2lKH9","ts":current_time,"location":"Chem lib","content":"this a second post!","comments":[]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_posts', json=json.dumps(post_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 200, f'{resp.text}'
    
    # Insert a post by a nonexistent user
    # Will fail because validate_entry will catch a non-existent user
    post_example = {"post_id":"sb71bsdhcn2df","op_id":"nvuenf9wnsdhfp","ts":current_time,"location":"Illini Union","content":"I do not exist!","comments":[]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_posts', json=json.dumps(post_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 400, f'{resp.text}'
    
    # Insert a post with a bad json value
    # Will fail because validate_entry will check all json fields - "ts" changed to "timestamp"
    post_example = {"post_id":"11ss8e39cnakld","op_id":"nvuenf9wnsdhfp","timestamp":current_time,"location":"Illini Union","content":"I do not exist!","comments":[]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_posts', json=json.dumps(post_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 400, f'{resp.text}'
    
    # Insert a post with a missing json value
    # Will fail because validate_entry will check all json fields - "location was removed"
    post_example = {"post_id":"11ss8e39cnakld","op_id":"nvuenf9wnsdhfp","timestamp":current_time,"content":"I do not exist!","comments":[]}
    resp = requests.post(f'{URL_PREFIX}/insert/test_posts', json=json.dumps(post_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 400, f'{resp.text}'
    
    

def test_insert_comment():
    # Insert a comment from one user onto another user's post
    comment_example = {"user_id":"28dn39fn20nd","ts":current_time,"content":"Lets study for 233!"}
    resp = requests.put(f'{URL_PREFIX}/insert_comment/post_id=82nd9qmshc01k/True', json=json.dumps(comment_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 200, f'{resp.text}'
    
    # Check to see if comment is actually in json file of post it was appended to
    post = requests.get(f'{URL_PREFIX}/get/test_posts/post_id=82nd9qmshc01k')
    entry = post.json()
    assert len(entry['comments']) > 0, "Comment was not inserted properly"
    
    # Insert a comment from a nonexistent user
    # Will fail because validate_entry will check if user exists, even for comments
    comment_example = {"user_id":"92jd92nqs0000","ts":current_time,"content":"I'm down to join your 222 project"}
    resp = requests.put(f'{URL_PREFIX}/insert_comment/post_id=82nd9qmshc01k/True', json=json.dumps(comment_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 400, f'{resp.text}'
    
    # Insert a comment with a bad timestamp
    # Will fail as validate_entry will check ts format
    comment_example = {"user_id":"28dn39fn20nd","ts":"12-7-2022 13:47:09","content":"Lets study for 233!"}
    resp = requests.put(f'{URL_PREFIX}/insert_comment/post_id=82nd9qmshc01k/True', json=json.dumps(comment_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 400, f'{resp.text}'
    
    

def test_update():
    # Update the name of an existing user - updates two values
    update_example = {"name":"ChangedName", "password":"ThisIsMyNewPassWord"}
    resp = requests.put(f'{URL_PREFIX}/update/test_users/name=TestUser1', json=json.dumps(update_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 200, f'{resp.text}'
    
    # Check to see if user's name changed
    resp = requests.get(f"{URL_PREFIX}/get/test_users/id=7dhnc7hb2lKH9")
    updated_user = resp.json()
    assert updated_user['name'] == update_example['name'], f'Name did not update to {update_example}'
    assert updated_user['password'] == update_example['password'], 'passwords do not match. Did not update properly'
    
    # Update post location - updates one value
    update_example = {"location":"Main Library"}
    resp = requests.put(f'{URL_PREFIX}/update/test_posts/post_id=9dn10nskc83nc', json=json.dumps(update_example), headers={"Content-Type": "application/json"})
    assert resp.status_code == 200, f'{resp.text}'
    
    # Check to see if post's location changed
    resp = requests.get(f"{URL_PREFIX}/get/test_posts/post_id=9dn10nskc83nc")
    updated_post = resp.json()
    assert updated_post['location'] == update_example['location'], f'Name did not update to {update_example}'
    
    
    
def test_get_and_delete_user():
    # Using the users inserted above, retrieve and delete their entries
    
    # Get an existing user
    resp = requests.get(f"{URL_PREFIX}/get/test_users/id=7dhnc7hb2lKH9")
    assert resp.status_code == 200, f'{resp.text}'
    
    # Delete this user
    resp = requests.delete(f'{URL_PREFIX}/delete/test_users/id=7dhnc7hb2lKH9')
    assert resp.status_code == 200, f'{resp.text}'
    
    # Make another GET request to now deleted user
    # Will fail because user does not exist
    resp = requests.get(f"{URL_PREFIX}/get/test_users/id=7dhnc7hb2lKH9")
    assert resp.status_code == 400, f'{resp.text}'
    


def test_get_and_delete_post():
    # Using the posts inserted above, retrieve and delete their entries
    
    # Get an existing post
    resp = requests.get(f"{URL_PREFIX}/get/test_posts/post_id=9dn10nskc83nc")
    assert resp.status_code == 200, f'{resp.text}'
    
    # Delete post
    resp = requests.delete(f"{URL_PREFIX}/delete/test_posts/id=9dn10nskc83nc")
    assert resp.status_code == 200, f'{resp.text}'
    
    # Make another GET request to now deleted user
    # Will fail because user does not exist
    resp = requests.get(f"{URL_PREFIX}/get/test_posts/post_id=9dn10nskc83nc")
    assert resp.status_code == 400, f'{resp.text}'
    
   
   
# NOTE : Last two test cases clear 'test_users' and 'test_posts' collection entirely 

def test_get_all_delete_all_users():
    # Get all users
    resp = requests.get(f"{URL_PREFIX}/get_all/test_users")
    assert resp.status_code == 200, f'{resp.text}'
    users = resp.json()
    
    # There is now 1 user in test_users, there should only be this many entries
    assert len(users) == 1, "Length of users json does not match how many should be in there"
    
    # Delete all users
    resp = requests.delete(f"{URL_PREFIX}/delete_all/test_users")
    assert resp.status_code == 200, f'{resp.text}'
    
    
    
def test_get_all_delete_all_posts():
    # Get all posts
    resp = requests.get(f"{URL_PREFIX}/get_all/test_posts")
    assert resp.status_code == 200, f'{resp.text}'
    users = resp.json()
    
    # There is now 1 user in test_posts, there should only be this many entries
    assert len(users) == 1, "Length of users json does not match how many should be in there"
    
    # Delete all posts
    resp = requests.delete(f"{URL_PREFIX}/delete_all/test_posts")
    assert resp.status_code == 200, f'{resp.text}'
