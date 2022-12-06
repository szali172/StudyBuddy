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
            post = self.find(id)
            self.queue.remove(post)
        except Exception as e:
            print(e)
        
    def find(self, id):
        """
        Finds a specific tuple with matching id
        """
        for item in self.queue:
            if item[1] == id:
                return item

        # Could not find id
        raise ValueError(f'post with id: {id}, does not exist in heap_queue')
        
        
    def is_empty(self):
        """
        Return true if empty
        """
        return len(self.queue) == 0

    def __len__(self):
        return len(self.queue)
    
    def __getitem__(self, key):
        return self.queue[key]
