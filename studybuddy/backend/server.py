from flask import Flask, render_template, request, jsonify
import requests, datetime, json
import credentials as c
import validate_entry
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

""" Connect to Mongo DB """
from pymongo import MongoClient
cluster = MongoClient(f'mongodb+srv://{c.username}:{c.pw}@studdybuddy.ptwaiia.mongodb.net/?retryWrites=true&w=majority')
database = cluster["buddies"]

""" Connect to Reddit API """
import praw
reddit = praw.Reddit(client_id=c.praw_client_id, client_secret=c.praw_client_secret, user_agent=c.praw_user_agent)



"""
Retrieve a document from either the 'Posts' or 'Users' collection 
    given a key (i.e. name, email, id) and a value ("John Smith", "jsmith@illinois.edu", "12sd31S2P0")
    
Returns a json object containing all fields of the DB entry
"""
@app.route('/get/<coll>/<key>=<value>')
def get(coll, key, value):
    
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    cursor = collection.find_one({key: value})
    
    if cursor:
        return json.dumps(cursor, default=str), 200
    else:
        return 'Could not find any document with field {\'%s\' : \'%s\'} in the %s collection'.format(key, value, coll), 400   
    
    
    
"""
Delete a document from either the 'Posts' or 'Users' collection 
    given an ONLY an id key and a value. Cannot delete by name, email, or any other field besides id
"""
@app.route('/delete/<coll>/id=<value>')
def delete(coll, value):
    
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    # Ensure field passed is an id
    cursor = collection.find_one({'id': value})
    
    if cursor:
        collection.delete_one({'id': value})
        if coll == 'Posts': return f'Successfully deleted post \'{value}\' from \'{coll}\'', 200
        else: return f'Successfully deleted user \'{value}\' from \'{coll}\'', 200
    else:
        return 'Could not find any document with field {\'id\' : \'%s\'} in the %s collection'.format(value, coll), 400
    
    

"""
Inserts a document into either the 'Posts' or 'Users' collection
    with a given JSON encoded into the HTTP request
**JSON**: contains post or user in a dictionary format. MUST contain all fields 
            (comments array for post may be empty, courses and favorites for user may be empty)
"""
@app.route('/insert/<coll>', methods=['POST'])
def insert(coll):
    
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    entry = json.loads(request.json)
    
    # Handle entry separately depending on collection specified
    if coll == 'Posts':
        response, status = validate_entry.validate_post_entry(database, entry, 'insert')
    elif coll == 'Users':
        response, status = validate_entry.validate_user_entry(database, entry, 'insert')
    else:
        return f'Please pass a valid collection name (either \'Posts\' or \'Users\'). {coll} is not valid for posting data', 400
    
    # Entry is valid
    if status == 200:     
        collection.insert_one(entry)
        if coll == 'Posts': return f'Successfully inserted post \'{entry["post_id"]}\' into \'{coll}\'', 200
        else: return f'Successfully inserted user \'{entry["id"]}\' into \'{coll}\'', 200     
    else:
        return response, status



"""
Inserts a comment to a post given a unique ID of the post (post_id)
**JSON**: contains comment in a dictionary format, i.e.
          {"user_id":"12D32423kbJK11","ts":"2022-10-12 16:49:39.596765","content":"text"}
"""
@app.route('/insert_comment/post_id=<post_id>', methods=['PUT']) 
def insert_comment(post_id):
    
    # Search for post
    collection = database['Posts']
    cursor = collection.find_one({"post_id": post_id})
    
    if cursor:
        comment = json.loads(request.json)
        
        response, status = validate_entry.validate_comment_entry(database, comment, "insert")
        
        if status == 200:
            collection.update_one({"post_id": post_id}, {'$push': {"comments": comment}})
            return f'Successfully added comment to post {post_id}', status
        elif status == 500:
            return f'Internal server error: {response}', status
        else:
            return response, status
    else:
        return f'Post with id \"{post_id}\' not found. Check post_id', 400
    


### TODO: implement an update route, url should accept a coll, search_key=search_value to lookup item, and a key=value to update the found item
    ### may need to allow update route to take a json so that multiple fields can be updated at once
"""
Updates an entry given a collection ('Users' or 'Posts')
    and a search_key and search_value, which the entry to be updated will be initially found with
**JSON**: an array of fields with for a user or post, i.e.
          {"name":"Johnny Smith"} or {"name":"Johnny Smith", "email":"jsmith92@illinois.edu"} , etc...
"""
@app.route('/update/<coll>/<search_key>=<search_value>', methods=['PUT']) 
def update(coll, search_key, search_value):
    
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    # Search for filter query
    cursor = collection.find_one({search_key: search_value})
    
    if cursor:
        entry = json.loads(request.json)
        
        if coll == 'Users':
            response, status = validate_entry.validate_user_entry(database, entry, 'update')
        elif coll == 'Posts':
            response, status = validate_entry.validate_post_entry(database, entry, 'update')
        else:
            return f'Please pass a valid collection name (either \'Posts\' or \'Users\'). {coll} is not valid for posting data', 400
        
        if status == 200:
            collection.update_one({search_key: search_value}, {'$set': entry})
            return f'Successfully updated {search_value} to {entry[search_value]}', 200
        else:
            return response, status
    else:
        return 'Could not find any document with field {\'%s\' : \'%s\'} in the %s collection'.format(search_key, 
                                                                                                      search_value, 
                                                                                                      coll), 400
    
    
    
"""
Retrieve the top posts given a subreddit and search topic
"""
@app.route('/reddit_posts/<sub>/<topic>', methods=['GET'])
def get_reddit_posts(sub, topic):
    subreddit = reddit.subreddit(sub)
    
    for i, post in enumerate(subreddit.search(topic, limit=10)):
        print(post.title)
        
    return '', 200



# TODO: Implement a cache
# TODO: Implement a backup database for users (in case of user deletion)



# curl -X GET http://localhost:5000/get/Posts/post_id=h6Gw4320PMkq1e
# curl -X GET http://localhost:5000/get/Users/email=jsmith@illinois.edu
# %20 represents space