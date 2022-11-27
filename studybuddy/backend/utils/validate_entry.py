import datetime, pytz

USER_FIELDS = ['id', 'name', 'email', 'password', 'courses', 'favorites']
POST_FIELDS = ['post_id', 'op_id', 'ts', 'location', 'content', 'comments']
COMMENT_FIELDS = ['user_id', 'ts', 'content']
DATETIME_FORMAT = '%a %b %d %Y %H:%M:%S GMT-0600 (Central Standard Time)'


def validate_user_entry(database, user, method):
    """
    Validates a user entry passed in from the front-end before inserting/updating a database entry
    """

    # Validate JSON fields
    response, status = json_fields(user, USER_FIELDS, method)
    if status != 200:
        return response, status
    
    response, status = user_exists(database, user, 'user')
    if status == 200 and method == 'insert':
        return f'User \"{user["name"]}\" already exists. This user can only be updated or deleted, not re-inserted', 400
    
    return "User valid", 200



def validate_post_entry(database, post, method):
    """
    Validates a post entry passed in from the front-end before inserting/updating a database entry
    """
    
    # Validate JSON fields
    response, status = json_fields(post, POST_FIELDS, method)
    if status != 200:
        return response, status
    
    # Validate User exists
    response, status = user_exists(database, post, 'post')
    if status != 200:
        return response, status
    
    # Validate timestamp format
    response, status = timestamp(post)
    if status != 200:
        return response, status
    
    return 'Post valid', 200



def validate_comment_entry(database, comment, method):
    """
    Validates a comment entry passed in from the front-end before inserting/updating a database entry
    """
    
    # Validate server-side function call
    if method != 'insert' or method != 'update':
        return f"Bad method name \'{method}\' when validating entry", 500
        
    # Validate JSON fields
    response, status = json_fields(comment, COMMENT_FIELDS, method)
    if status != 200:
        return response, status
        
    # Validate user exists
    response, status = user_exists(database, comment, 'comment')
    if status != 200:
        return response, status
    
    # Validate timestamp format
    response, status = timestamp(comment)
    if status != 200:
        return response, status
    
    return 'Comment valid', 200




def json_fields(entry, ENTRY_FIELDS, method):
    """
    Check if json fields used in every entry validation method
    """
    
    # ALL keys must exist in entry
    if method == 'insert':
        for required_key in ENTRY_FIELDS:
            if required_key not in entry:
                return f'Key "{required_key}" missing', 400
            
    # NOT ALL keys must exist in entry
    else:
        for update_key in entry.keys():
            if update_key not in ENTRY_FIELDS:
                return f'Invalid key "{required_key}" for entry', 400
            
    return "JSON fields valid", 200



def user_exists(database, entry, entry_type):
    """
    Check if a user exists in a database before inserting post/comment (entry_type)
    """
    
    if entry_type == 'user':
        pass
    elif entry_type == 'post':
        id = 'op_id'
    elif entry_type == 'comment':
        id = 'user_id'
    else:
        return "Bad entry type \'{entry_type}\' when validating entry", 500
    
    users_coll = database['Users']
    user_entry = users_coll.find_one({'id': entry[id]})
    
    if not user_entry:
        return f"User with id \'{entry[id]}\' not found. Check user_id", 400
    
    return f'User found', 200



def timestamp(entry):
    """
    Check if a timestamp is valid for a post/comment
    """
    
    try:
        ts = datetime.datetime.strptime(entry['ts'], DATETIME_FORMAT)
    except:
        return f"Date format \"{entry['ts']}\" is incorrect\nCorrect format is \"Wed Nov 16 2022 12:35:56 GMT-0600 (Central Standard Time)\"", 400


# TODO: implement a validate_course_entry and iterate through the users list of course to make sure they are okay, similar to comments within validate_post
# TODO: If user DNE, check with deleted db collection to see if they exist there, otherwise, the user id is incorrect
