import requests
import json

HOST = 'http://localhost'
PORT = '5000'

# user_example = {"_id": "6123123123123", "id": "7dhnc7hb2lKH9", "name": "JJs", "email": "ss", "password": "123sssss4", "courses": ["CS 222"], "favorites": ["CS 222"]}
# resp = requests.post('http://localhost:5000/insert/Users', json=json.dumps(user_example), headers={"Content-Type": "application/json"})
# print(resp.text, ", ", resp.status_code)

# post_example = {"_id":"63jwmnsudjdbf9wjkoaad4","post_id":"23jdidubd7cb2x","op_id":"12D32423kbJKH9","ts":"Wed Nov 30 2022 17:36:56 GMT-0600 (Central Standard Time)","location":"Chem lib","content":"Trying out comment insertions","comments":[]}
# resp = requests.post('http://localhost:5000/insert/Posts', json=json.dumps(post_example), headers={"Content-Type": "application/json"})
# print(resp.text, ", ", resp.status_code)

# comment_example = {"user_id": "7dhnc7hb2lKH9", "ts": "Wed Nov 30 2022 18:29:31 GMT-0600 (Central Standard Time)", "content": "third^^"}
# resp = requests.put('http://localhost:5000/insert_comment/post_id=23jdidubd7cb2x', json=json.dumps(comment_example), headers={"Content-Type": "application/json"})
# print(resp.text, ", ", resp.status_code)

# resp = requests.delete(f'{HOST}:{PORT}/delete/Posts/id=23jdidubd7cb2x')
# print(resp.text, resp.status_code)

resp = requests.get(f'{HOST}:{PORT}/get_all/Posts')
print(resp.text, resp.status_code)