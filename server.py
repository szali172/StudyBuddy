from flask import Flask, render_template, request, jsonify
import requests, datetime, json
from bson.objectid import ObjectId
import credentials as c


app = Flask(__name__)

""" Connect to Mongo DB """
from pymongo import MongoClient
cluster = MongoClient(f'mongodb+srv://{c.username}:{c.pw}@studdybuddy.ptwaiia.mongodb.net/?retryWrites=true&w=majority')
database = cluster["buddies"]

""" Connect to Reddit API """
import praw
reddit = praw.Reddit(client_id=c.praw_client_id, client_secret=c.praw_client_secret, user_agent=c.praw_user_agent)


"""
Find a person entry in the database given a key (i.e. 'name', 'email', etc.) and a value ('John Smith') OR
Find, insert, or delete a post from the db
"""
@app.route('/<coll>/<key>/<value>', methods=['PUT', 'GET', 'DELETE'])
def get_person(coll, key, value):
    
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    if request.method == 'GET':    
        cursor = collection.find_one({key: value})
        
        if cursor:
        return json.dumps(cursor, default=str), 200
        
    # Put request
    elif request.method == 'PUT':     
        collection.insert_one(json_obj)
        return f"Successfully inserted document into '{coll}' in DB", 200
       
    elif request.method == 'DELETE':  
        print("heyyyyyyy")
        return 'DELETE worked', 200
    
    else:
        return 'Error', 405
    
    
    # curl -X GET http://localhost:5000/buddies/Users/name
    # curl -X GET http://localhost:5000/buddies/Users/email/jsmith@illinois.edu
    # %20 represents space



"""
Insert an op's post as a json into the db
"""
@app.route('/insert_post/<coll>/', methods=['PUT'])
def insert_post(coll, json_obj):
    
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    collection.insert_one(json_obj)
    return f"Successfully inserted document into '{coll}' in DB", 200
   

"""
Called when a user writes a comment to a post
@param post_id: unique ID of the post
**JSON**: contains comment in a dictionary format, i.e.
          {"user_id":"12D32423kbJK11","ts":"2022-10-12 16:49:39.596765","content":"text"}
"""
@app.route('/add_comment/<post_id>', methods=['PUT']) 
def add_comment(post_id):
    
    # Search for post
    collection = database['Posts']
    cursor = collection.find_one({"post_id": post_id})
    
    if cursor:
        obj_id = cursor["_id"]
        comment = json.loads(request.json)
        
        # Validate JSON fields
        for requiredKey in ['user_id', 'ts', 'content']:
            if requiredKey not in comment:
                return f'Key "{requiredKey}" missing', 400
            
        # Validate user exists
        users_coll = database['Users']
        user_doc = users_coll.find_one({'id': comment['user_id']})
        if user_doc:
            pass
        else:
            return f"User with id \'{comment['user_id']}\' not found. Check user_id", 400
            
        # Validate timestamp format
        try:
            ts = datetime.datetime.strptime(comment['ts'], "%Y-%m-%d %H:%M:%S.%f")
        except:
            return f"Date format \"{comment['ts']}\" is incorrect\nCorrect format is \"2022-10-12 16:49:39.596765\"", 400
        
        collection.update_one({'_id': obj_id}, {'$push': {"comments": comment}})
        return f'Successfully added comment to post {post_id}', 200
    
    else:
        return f'Post with id \"{post_id}\' not found. Check post_id', 400
    
    
"""
Retrieve the top posts given a subreddit and search topic
"""
@app.routed('/reddit_posts/<sub>/<topic>', methods=['GET'])
def get_reddit_posts(sub, topic):
    subreddit = reddit.subreddit(sub)
    
    for i, post in enumerate(subreddit.search(topic, limit=10)):
        print(post.title)
        
    return '', 200

# TODO: add endpoint to update user info, post location?