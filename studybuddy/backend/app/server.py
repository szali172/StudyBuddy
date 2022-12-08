### Imports
from flask import Flask, request
from flask_cors import CORS
import threading, multiprocessing, atexit, signal, sys, datetime, time, requests, heapq

# App
Server = Flask(__name__)
CORS(Server)

# Blueprints
try:
    from reddit import Reddit
    from studdy_buddy import StuddyBuddy
except ModuleNotFoundError:
    from .reddit import Reddit
    from .studdy_buddy import StuddyBuddy

Server.register_blueprint(Reddit)
Server.register_blueprint(StuddyBuddy)

# Utilities
sys.path.append('../')
import utils.credentials as c
import utils.validate_entry as validate_entry
from utils.heap_queue import HeapQueue

HOST = 'http://localhost'
PORT = '5000'
hq = HeapQueue(HOST, PORT)


### Routes
def start_server():
    print('Server started!')
    Server.run(port=PORT, debug=False)



@Server.route('/shutdown/token=<token>')
def shutdown(token):
    """
    Called to shutdown server manually.
    Token must match token credential
    """
    if token == c.token:
        print('\nTerminating Server...\n')
        func = request.environ.get('werkzeug.server.shutdown')
        if func is None:
            raise RuntimeError('Not running with the Werkzeug Server')
        func()
            
    return 'Incorrect token\n', 403 # Forbidden



def maintain_queue(hq: HeapQueue):
    """
    Runs forever until server is closed
    """
    while True:
        
        # Sleep for one hour
        time.sleep(60 * 60 * 60)
        
        # Reevaluate after waking up
        if hq.server_closed == True:
            break
        
        # If empty, sanity check and reset queue
        if hq.is_empty():
            hq.reset_queue()
            
            # If collection is just empty, go back to sleep, get some coffee, check again later
            if hq.is_empty():
                continue
        
        three_days = datetime.datetime.now() - datetime.timedelta(days=3)
        
        # Check queue (after repopulating)
        while not hq.is_empty():
        
            # Pop front of queue if time is longer than three days
            # Send a request to delete post from db
            if hq[0][0] >= three_days:
                heapq.heappop(hq.queue)
                requests.get(f'{HOST}:{PORT}/delete/Posts/id={hq[0][1]}/stale_post={True}')
            else:
                break



if __name__ == '__main__':
    
    # Run posts heap queue
    print("Opening posts queue...")
    queue_thread = multiprocessing.Process( target=maintain_queue, args=(hq,), daemon=True)
    queue_thread.start()
    print("Queue open!")
    
    # Start server
    print('Server starting...')
    start_server()
