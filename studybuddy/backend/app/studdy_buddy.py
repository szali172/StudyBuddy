### Imports
from flask import Blueprint, request
from flask_cors import CORS
import requests, datetime, json, sys

# Utilities
sys.path.append('../')
import utils.credentials as c
import utils.validate_entry as validate_entry


studdy_buddy = Blueprint('studdy_buddy', __name__)
CORS(studdy_buddy)

    
""" Connect to Mongo DB """
from pymongo import MongoClient
cluster = MongoClient(f'mongodb+srv://{c.username}:{c.pw}@studdybuddy.ptwaiia.mongodb.net/?retryWrites=true&w=majority')
database = cluster["buddies"]


### Routes
@studdy_buddy.route('/get/<coll>/<key>=<value>')
def get(coll, key, value):
    """
    Retrieve a document from either the 'Posts' or 'Users' collection 
        given a key (i.e. name, email, id) and a value ("John Smith", "jsmith@illinois.edu", "12sd31S2P0")
        
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
        return 'Could not find any document with field {\'%s\' : \'%s\'} in the %s collection'.format(key, value, coll), 400   
    
    

@studdy_buddy.route('/delete/<coll>/id=<value>')
def delete(coll, value):
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
        cursor = collection.find_one({'id': value})
    else:
        cursor = collection.find_one({'post_id': value})
    
    if cursor:
        
        if coll == 'Users': 
            collection.delete_one({'id': value}) 
            return f'Successfully deleted user \'{value}\' from \'{coll}\'', 200
        else:
            collection.delete_one({'post_id': value})
            return f'Successfully deleted post \'{value}\' from \'{coll}\'', 200
            
    else:
        return 'Could not find any document with field {\'id\' : \'%s\'} in the %s collection'.format(value, coll), 400
    
    


@studdy_buddy.route('/insert/<coll>', methods=['POST'])
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



@studdy_buddy.route('/insert_comment/post_id=<post_id>', methods=['PUT']) 
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
        print(status)
        print("1")
        if status == 200:
            print("2")
            collection.update_one({"post_id": post_id}, {'$push': {"comments": comment}})
            print("3")
            return f'Successfully added comment to post {post_id}', status
        elif status == 500:
            return f'Internal server error: {response}', status
        else:
            return response, status
    else:
        return f'Post with id \"{post_id}\' not found. Check post_id', 400
    


@studdy_buddy.route('/update/<coll>/<search_key>=<search_value>', methods=['PUT']) 
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
