### Imports
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import requests, datetime, json, sys

# Utilities
sys.path.append('../')
import utils.credentials as c
import utils.validate_entry as validate_entry

StuddyBuddy = Blueprint('studdy_buddy', __name__)
CORS(StuddyBuddy)

    
# Connect to Mongo DB
from pymongo import MongoClient
cluster = MongoClient(f'mongodb+srv://{c.username}:{c.pw}@studdybuddy.ptwaiia.mongodb.net/?retryWrites=true&w=majority')
database = cluster["buddies"]


### Routes
@StuddyBuddy.route('/get/<coll>/<key>=<value>', methods=['GET'])
def get(coll, key, value):
    """
    Retrieve a document from either the 'Posts', 'Users' or 'classes' collection
        given a key (i.e. name, email, id) and a value ("John Smith", "jsmith@illinois.edu", "12sd31S2P0")\n
        
    Returns a json object containing all fields of the DB entry
    """
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    cursor = collection.find_one({key: value})
    
    if cursor:
        return json.dumps(cursor, default=str), 200
    else:
        return '''Could not find any document with field 
                  {\'%s\' : \'%s\'} in the %s collection'''.format(key, 
                                                                   value, 
                                                                   coll), 400
    
    
    
@StuddyBuddy.route('/get_all/<coll>', defaults={'heapq': False}, methods=['GET'])
@StuddyBuddy.route('/get_all/<coll>/heapq=<heapq>', methods=['GET'])
def get_all(coll, heapq):
    """
    Retrieve every document from collection, either 'Posts', 'Users', 'classes'\n
    AlsoCalled when the heapq must be reset. Returns every document in Posts collection as a JSON array of tuples
    """
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    # Gather all documents from collection
    cursor = collection.find({})
    entries = []
    
    # Collection is empty
    if cursor:
        # Create a tuple for every post and add it to list
        for document in cursor:
            
            if coll == 'Posts':
                # Incoming call from heapq
                if heapq:
                    entries.append((document['ts'], document['post_id']))
                    continue
                
            entries.append(document)
            
        return json.dumps(entries, default=str), 200
    
    else:
        return print("collection is empty"), 204 # No Content

    
    
@StuddyBuddy.route('/delete/<coll>/id=<value>', defaults={'stale_post': False})
@StuddyBuddy.route('/delete/<coll>/id=<value>/stale_post=<stale_post>')
def delete(coll, value, stale_post):
    """
    Delete a document from either the 'Posts' or 'Users' collection 
        given an ONLY an id key and a value. Cannot delete by name, email, or any other field besides id
    """
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400
    
    # Ensure field passed is an id
    if coll == 'Users':
        id = 'id'
    elif coll == 'Posts':
        id = 'post_id'
    else:
        return f'''Please pass a valid collection name (either \'Posts\' or \'Users\'). 
                   {coll} is not valid for posting data''', 400
    
    cursor = collection.find_one({id: value})
    
    if cursor:
        collection.delete_one({id: value})
        if coll == 'Posts':
            
            if stale_post:
                # Remove post from queue
                from server import hq
                hq.remove(cursor['post_id'])
                
            return f'Successfully deleted post \'{value}\' from \'{coll}\'', 200
        else:
            return f'Successfully deleted user \'{value}\' from \'{coll}\'', 200
    else:
        return '''Could not find any document with field 
                  {\'id\' : \'%s\'} in the %s collection'''.format(value,
                                                                   coll), 400
    
    

@StuddyBuddy.route('/insert/<coll>', methods=['POST'])
def insert(coll):
    """
    Inserts a document into either the 'Posts' or 'Users' collection
        with a given JSON encoded into the HTTP request
    **JSON**: contains post or user in a dictionary format. MUST contain all fields 
                (comments array for post may be empty, courses and favorites for user may be empty)
    """
    # Check to see if collection exists
    try:
        collection = database[coll] # either users or posts
    except:
        return f'Could not access {coll}\n', 400

    # JSON manipulation
    json_field = request.json
    if isinstance(json_field, str):
        entry = json.loads(json_field)
    elif isinstance(json_field, dict):
        entry = json_field
    else:
        return 'Bad JSON value. Please check again', 422 # Unprocessable Entity
    
    # Handle entry separately depending on collection specified
    if coll == 'Posts':
        response, status = validate_entry.validate_post_entry(database, entry, 'insert')
    elif coll == 'Users':
        response, status = validate_entry.validate_user_entry(database, entry, 'insert')
    else:
        return f'''Please pass a valid collection name (either \'Posts\' or \'Users\'). 
                   {coll} is not valid for posting data''', 404
                   
    # Entry is valid
    if status == 200:     
        collection.insert_one(entry)
        
        if coll == 'Posts': 
            # Insert post into posts queue
            from server import hq
            hq.insert(entry['ts'], entry['post_id'])
            return f'Successfully inserted post \'{entry["post_id"]}\' into \'{coll}\'', 200
        else: 
            return f'Successfully inserted user \'{entry["id"]}\' into \'{coll}\'', 200  
           
    else:
        return response, status



@StuddyBuddy.route('/insert_comment/post_id=<post_id>', methods=['PUT']) 
def insert_comment(post_id):
    """
    Inserts a comment to a post given a unique ID of the post (post_id)
    **JSON**: contains comment in a dictionary format, i.e.
            {"user_id":"12D32423kbJK11","ts":"Wed Nov 16 2022 12:35:56 GMT-0600 (Central Standard Time)","content":"text"}
    """
    # Search for post
    collection = database['Posts']
    cursor = collection.find_one({"post_id": post_id})
    
    if cursor:
        comment = json.loads(json.dumps(request.json))
        
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
    


@StuddyBuddy.route('/update/<coll>/<search_key>=<search_value>', methods=['PUT']) 
def update(coll, search_key, search_value):
    """
    Updates an entry given a collection ('Users' or 'Posts')
        and a search_key and search_value, which the entry to be updated will be initially found with
    **JSON**: an array of fields with for a user or post, i.e.
            {"name":"Johnny Smith"} or {"name":"Johnny Smith", "email":"jsmith92@illinois.edu"} , etc...
    """
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
            return f'''Please pass a valid collection name (either \'Posts\' or \'Users\'). 
                   {coll} is not valid for posting data''', 400
                   
        if status == 200:
            collection.update_one({search_key: search_value}, {'$set': entry})
            return f'Successfully updated {search_value} to {entry[search_value]}', 200
        elif status == 500:
            return f'Internal server error: {response}', status
        else:
            return response, status
    else:
        return '''Could not find any document with field 
                  {\'%s\' : \'%s\'} in the %s collection'''.format(search_key, 
                                                                   search_value, 
                                                                   coll), 400
