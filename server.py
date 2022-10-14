from flask import Flask, render_template, request, jsonify
import requests
import credentials as c

import json

app = Flask(__name__)

from pymongo import MongoClient
cluster = MongoClient(f'mongodb+srv://{c.username}:{c.pw}@studdybuddy.ptwaiia.mongodb.net/?retryWrites=true&w=majority')


"""
Find a person entry in the database given a key (i.e. 'name', 'email', etc.) and a value ('John Smith')
"""
@app.route('/<db>/<coll>/<key>/<value>', methods=['PUT', 'GET', 'DELETE'])
def get_person(db, coll, key, value):
    
    # Check to see if db and collection exist
    try:
        database = cluster[db] 
        collection = database[coll]
    except:
        return f'Could not access {db} or {coll}\n', 400
    
    # Get request
    if request.method == 'GET':    
        cursor = collection.find_one({key: value})
        
        # Returns the persons email
        if cursor:
            return json.dumps(cursor, default=str), 200
    # Put request
    elif request.method == 'PUT':     
        # def put_key(key):
        # value = request.data.decode("utf-8") # content ex) date
        # version_num = db.key.count_documents({'key' : key})
        # db.key.insert_one({'version' : version_num+1, 'value' : value, 'key' : key})
        # return 'HTTP/', 200

        return 'PUT worked', 200

    # delete request
    elif request.method == 'DELETE':  
        # try:
        #     db.key.delete_many({'key' : key})
        #     return 'HTTP/', 200
        # except: 
        #     return 'Key does not exist', 400
        return 'DELETE worked', 200
    else:
        return 'Error', 405
    
# curl -X GET http://localhost:5000/buddies/Users/name/John%20Smith