### Imports
import requests, datetime
from time import sleep
from sys import path
import heapq


class HeapQueue():
    def __init__(self, HOST, PORT):
        """
        Manual implementation of a heapq
        """
        super().__init__()
        self.queue = []
        self.server_closed = False
        self.HOST = HOST
        self.PORT = PORT
    
    def reset_queue(self):
        """
        Read all posts into a list. Use heapify() to convert list to heap in linear time
        """
        resp = requests.get(f'{self.HOST}:{self.PORT}/get_all_posts')
        posts = resp.json()
        self.queue = heapq.heapify(posts) # linear time
        
    def insert(self, timestamp, id):
        """
        Inserts a post into the queue, with older timestamps given priority
        """
        heapq.heappush(self.queue, (timestamp, id))
    
    def remove(self, id):
        """
        Called whenever a post is manually deleted
        """
        try:
            self.queue.remove(id)
        except:
            pass
        
    def is_empty(self):
        """
        Return true if empty
        """
        return len(self.queue) == 0
        
        
    
    
# TODO: May need to use a max heap if front of heap is the newest post
    
     
def initialize():
    global hq
    hq = HeapQueue()
    


def maintain_queue(hq):    
    # Loop forever until server closes
    while not hq.server_closed:
        
        # Sleep for one hour
        sleep(60 * 60 * 60)
        
        # Reevaluate after waking up
        if hq.server_closed == True:
            break
        
        # If empty, sanity check and reset queue
        if hq.is_empty():
            hq.reset_queue()    
        
        three_days = datetime.datetime.now() - datetime.timedelta(days=3)
        print(three_days)
        
        # Check queue (after repopulating)
        while not hq.is_empty():
        
            # Pop front of queue if time is longer than three days
            # Send a request to delete post from db
            if hq.queue[0][0] >= three_days:
                heapq.heappop(hq.queue)
                requests.get(f'{HOST}:{PORT}/delete/Posts/id={hq[0][1]}')
            
             
if __name__ == '__main__':
    maintain_queue()