import pytest
from sys import path
import datetime

path.append('../')
from utils import heap_queue
from utils.validate_entry import DATETIME_FORMAT
from app.server import HOST, PORT

hq = heap_queue.HeapQueue(HOST, PORT)

# youngest timestamp
time_as_str1 = datetime.datetime.now().strftime(DATETIME_FORMAT)
time_as_dt1 = datetime.datetime.strptime(time_as_str1, DATETIME_FORMAT)
id1 = '7n3gfs1vqfs5swb2'

# middle-child timestamp
time_as_str2 = (datetime.datetime.now() - datetime.timedelta(hours=1)).strftime(DATETIME_FORMAT)
time_as_dt2 = datetime.datetime.strptime(time_as_str2, DATETIME_FORMAT)
id2 = '8djq82bbfibs9'

# oldest timestamp
time_as_str3 = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime(DATETIME_FORMAT)
time_as_dt3 = datetime.datetime.strptime(time_as_str3, DATETIME_FORMAT)
id3 = '7db3ucbw3q7j'


    
# Helpers
def insert_all():
    """
    Inserts all timestamps into hq
    """
    hq.insert(time_as_dt1, id1)
    hq.insert(time_as_dt2, id2)
    hq.insert(time_as_dt3, id3)
    
def empty_hq():
    hq.queue = []
### Tests
def test_heap_insert():
    # Insert single item
    hq.insert(time_as_dt2, id2)
    assert len(hq) == 1, "Single item couldn't be inserted"
    
    # Insert another item, this one is older than the first
    hq.insert(time_as_dt3, id3)
    assert hq[0][0] == time_as_dt3,  "time_as_dt3 is 1 day older, should be in the front of the heap_queue"
    
    # Insert a third item, youngest of them all
    hq.insert(time_as_dt1, id1)
    assert hq[2][0] == time_as_dt1, "time_as_dt1 is the youngest item, should be the last item"
    
    empty_hq()
    
    
def test_heap_remove():
    # Sanity checks
    assert len(hq) == 0, "empty_hq should have been called"
    insert_all()
    assert len(hq) == 3, "insert_all isn't working properly?"
    
    # Remove a single item manually (Called from /delete endpoint in studdybuddy.py)
    hq.remove(id2)
    assert len(hq) == 2, "id2 should have been removed from hq"
    assert hq[0][1] == id3, "id3 is the oldest and wasn't removed, should still be in the front of hq"
    assert hq[1][1] == id1, "id1 is the youngest, should still remain at the end"