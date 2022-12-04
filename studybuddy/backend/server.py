### Imports
from flask import Flask, request
from flask_cors import CORS
import threading, atexit, signal, sys

# Utilities
sys.path.append('../')
import utils.credentials as c
import utils.validate_entry as validate_entry

# Blueprints
from reddit import reddit
from studdy_buddy import studdy_buddy

server = Flask(__name__)
server.register_blueprint(reddit)
server.register_blueprint(studdy_buddy)
CORS(server)


### Routes
@server.route('/refresh_queue', methods=['GET'])
def refresh_posts_queue(sub, topic):
    """
    
    """
    pass


def start_server():
    server.run(port=5000, debug=False, threaded=True)
    

@atexit.register  
def shutdown_server():
    """
    Called when server exits (Ctrl+C signal and from /shutdown endpoint)
    """
    func = request.environ.get('werkzeug.server.shutdown')
    
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    
    func()
    print('Terminating Server...\n')


@server.route('/shutdown/token=<token>')
def shutdown(token):
    """
    Called to shutdown server manually.
    Token must match token credential
    """
    if token == c.token:
        shutdown_server()  
        
    return 'Incorrect token\n', 400


if __name__ == '__main__':
    
    print("Server starting...")
    server_thread = threading.Thread(target=start_server)
    server_thread.start()
    print("Server started!")
        
    # Ctrl+C signals server shutdown
    signal.signal(signal.SIGINT, shutdown_server)
    
    
    
    
    
    
# TODO: Implement a cache
# TODO: Implement a backup database for users (in case of user deletion)
# TODO: Hash endpoints for server security?
# TODO: Delete posts within 3 days


# curl -X GET http://localhost:5000/get/Posts/post_id=h6Gw4320PMkq1e
# curl -X GET http://localhost:5000/get/Users/email=jsmith@illinois.edu
# %20 represents space