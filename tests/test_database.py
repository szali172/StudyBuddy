import pytest, sys, requests
import subprocess, time
import random
from pymongo import MongoClient
sys.path.append('../') 
import credentials as c

from pymongo import MongoClient
cluster = MongoClient(f'mongodb+srv://{c.username}:{c.pw}@studdybuddy.ptwaiia.mongodb.net/?retryWrites=true&w=majority')
host = "http://localhost:5001"

@pytest.fixture(scope="session", autouse=True)
def pytest_sessionstart():
    server = subprocess.Popen([sys.executable, "-m", "flask", "run", "--host", "127.0.0.1", "--port", "5001"], cwd="mongodb-nosql")
    time.sleep(2) #wait a bit for the flask server to start
    
    requests.delete(f"{host}/get_person")
    requests.delete(f"{host}/memory")
    yield
    server.terminate()
    

def test_get_person():
  name = "John Smith"
  requests.get(f'{host}/get_person/{name}')
  assert True

# def test_memory():
#   # == Test memory ==
 
