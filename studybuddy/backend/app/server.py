### Imports
from flask import Flask, request
from flask_cors import CORS
import threading, multiprocessing, atexit, signal, sys, datetime, time, requests, heapq

# App
Server = Flask(__name__)
CORS(Server)

# Blueprints
from reddit import Reddit
from studdy_buddy import StuddyBuddy

Server.register_blueprint(Reddit)
Server.register_blueprint(StuddyBuddy)

# Utilities
sys.path.append('../')
import utils.credentials as c
import utils.validate_entry as validate_entry
from utils.heap_queue import HeapQueue

HOST = 'http://localhost'
PORT = '5000'
processes = []
hq = HeapQueue(HOST, PORT)


### Routes
def start_server():
    Server.run(port=5000, debug=False, threaded=True)


@atexit.register  
def shutdown_server():
    """
    Called when server exits (Ctrl+C signal and from /shutdown endpoint)
    """
    # Terminate all running subprocesses
    for process in processes:
        process.terminate()
        
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    
    return 'Terminating Server...\n', 200


@Server.route('/shutdown/token=<token>')
def shutdown(token):
    """
    Called to shutdown server manually.
    Token must match token credential
    """
    if token == c.token:
        resp, status = shutdown_server()
        return resp, status
        
    return 'Incorrect token\n', 403 # Forbidden



def maintain_queue(hq: HeapQueue):
    """
    Runs forever until server is closed
    """
    while True:
        
        # Sleep for one hour
        time.sleep(60 * 60 * 60)
        
        # Reevaluate after waking up
        if hq.server_closed == True:       # TODO: Remove this if threading is the final
            break
        
        # If empty, sanity check and reset queue
        if hq.is_empty():
            hq.reset_queue()
            
            # If collection is just empty, go back to sleep, get some coffee, check again later
            if hq.is_empty():
                continue
        
        three_days = datetime.datetime.now() - datetime.timedelta(days=3)
        print(three_days)
        
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
    
    # Start server
    print('Server starting...')
    # server_thread = threading.Thread(target=start_server)
    server_thread = multiprocessing.Process(target=start_server)
    server_thread.start()
    print('Server started!')
    
    # # Start Posts queue
    # print('Booting up Posts queue...')
    # hq.initialize()
    # queue_proc = subprocess.Popen(['python', 'heap_queue.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    # out, err = queue_proc.communicate()
    # print('Queue live!')
    
    # Add subprocesses to list of running daemon tasks
    # processes.append(queue_proc)
        
    print("Opening posts queue...")
    # queue_thread = threading.Thread(target=maintain_queue, args=(hq))
    queue_thread = multiprocessing.Process(target=(lambda:maintain_queue(hq)))
    queue_thread.start()
    print("Queue open!")
    
    # Ctrl+C signals server shutdown
    signal.signal(signal.SIGINT, shutdown_server)
    
    
    
    
    
    
# TODO: Implement a cache
# TODO: Implement a backup database for users (in case of user deletion)
# TODO: Hash endpoints for server security?
# TODO: Delete posts within 3 days


# curl -X GET http://localhost:5000/get/Posts/post_id=h6Gw4320PMkq1e
# curl -X GET http://localhost:5000/get/Users/email=jsmith@illinois.edu
# %20 represents space