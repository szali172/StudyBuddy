from flask import Flask, render_template, request, jsonify
import requests
import credentials as c
app = Flask(__name__)

from pymongo import MongoClient
cluster = MongoClient(f'mongodb+srv://{c.username}:{c.pw}@studdybuddy.ptwaiia.mongodb.net/?retryWrites=true&w=majority')


@app.route('/<db>/<coll>/<entry>', methods=['PUT', 'GET', 'DELETE'])
def get_name(db, coll, entry):
    
    # Check to see if db and collection exist
    print('b')
    try:
        database = cluster[db] # archives
        collection = database[coll] # tuscola, 404, etc.
    except:
        return f'Could not access {db} or {coll}\n', 400
    print('a')
    if request.method == 'GET':    
        print("hi")
        return 'GET worked', 200
    elif request.method == 'PUT':     
        print("hey")
        return 'PUT worked', 200
    elif request.method == 'DELETE':  
        print("heyyyyyyy")
        return 'DELETE worked', 200
    else:
        return 'Error', 405
    
    
    # curl -X GET https://localhost:5000/buddies/Users/name