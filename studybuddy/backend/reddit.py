### Imports
from flask import Blueprint
from flask_cors import CORS
import datetime, json, sys

# Utilities
sys.path.append('../')
import utils.credentials as c
import utils.validate_entry as validate_entry

Reddit = Blueprint('reddit', __name__)
CORS(Reddit)

""" Connect to Reddit API """
import praw
reddit = praw.Reddit(client_id=c.praw_client_id, client_secret=c.praw_client_secret, user_agent=c.praw_user_agent)
    
    
### Routes
@Reddit.route('/reddit_posts/<sub>/<topic>', methods=['GET'])
def get_reddit_posts(sub, topic):
    """
    Retrieve the top posts given a subreddit and search topic
    """    
    subreddit = reddit.subreddit(sub)
    
    posts = []
    for i, post in enumerate(subreddit.search(topic, limit=10)):
        date = datetime.datetime.fromtimestamp(post.created_utc).strftime(validate_entry.DATETIME_FORMAT)
        post_properties = {"author": str(post.author),
                           "date": date,
                           "id": post.id,
                           "num_comments": post.num_comments,
                           "over_18": post.over_18,
                           "permalink": post.permalink,
                           "score": post.score,
                           "spoiler": post.spoiler,
                           "title": post.title}
        posts.append(post_properties)
                
    return json.dumps(posts, default=str), 200