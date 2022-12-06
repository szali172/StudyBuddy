import queue


class PostsQueue(queue.PriorityQueue):
    def __init__(self):
        super().__init__()
        self.queue: queue.PriorityQueue = queue.PriorityQueue()
        
        
    def maintain_queue(self):
        """
        Front of queue is the oldest post
        Delete posts that are older than 3 days
        """
        while not self.queue.empty():
            print(self.queue.get())
            self.queue.task_done()
            

    def reset_queue(self):
        """
        Grabs every post in database and throws them in priority queue
        Run if queue is ever empty
            1) If server shuts down, local queue will be lost
            2) If no posts exist at all, do a sanity check on database
        """
        pass
    
    def __put__(self):
        print("test")
        try:
            self.queue.put_nowait()
        except queue.Full as e:
            print(e)