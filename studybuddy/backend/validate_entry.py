import datetime

USER_FIELDS = ['id', 'name', 'email', 'password', 'courses', 'favorites']
POST_FIELDS = ['post_id', 'op_id', 'ts', 'location', 'content', 'comments']
COMMENT_FIELDS = ['user_id', 'ts', 'content']

"""
Validates a user entry passed in from the front-end before inserting/updating a database entry
"""
def validate_user_entry(database, user, method):

    # Validate JSON fields
    response, status = json_fields(user, USER_FIELDS, method)
    if status != 200:
        return response, status
    
    return "User valid", 200


"""
Validates a post entry passed in from the front-end before inserting/updating a database entry
"""
def validate_post_entry(database, post, method):
    
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


"""
Validates a comment entry passed in from the front-end before inserting/updating a database entry
"""
def validate_comment_entry(database, comment, method):
    
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



"""
Helper to validate json fields used in every entry validation method
"""
def json_fields(entry, ENTRY_FIELDS, method):
    
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


"""
Helper to check if a user exists in a database before inserting post/comment (entry_type)
"""
def user_exists(database, entry, entry_type):
    
    if entry_type == 'post':
        id = 'op_id'
    elif entry_type == 'comment':
        id = 'user_id'
    else:
        return "Bad entry type \'{entry_type}\' when validating entry", 500
    
    users_coll = database['Users']
    user_entry = users_coll.find_one({'id': entry[id]})
    
    if not user_entry:
        return f"User with id \'{entry[id]}\' not found. Check user_id", 400


"""
Helper to check if a timestamp is valid for a post/comment
"""
def timestamp(entry):
    try:
        ts = datetime.datetime.strptime(entry['ts'], "%Y-%m-%d %H:%M:%S.%f")
    except:
        return f"Date format \"{entry['ts']}\" is incorrect\nCorrect format is \"2022-10-12 16:49:39.596765\"", 400
    


# TODO: implement a validate_course_entry and iterate through the users list of course to make sure they are okay, similar to comments within validate_post
# TODO: If user DNE, check with deleted db collection to see if they exist there, otherwise, the user id is incorrect
