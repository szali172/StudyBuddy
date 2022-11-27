import requests
import json

json_example = {"_id": "6123123123123", "id": "1125320340394", "name": "JJs", "email": "ss", "password": "123sssss4", "courses": ["CS 222"], "favorites": ["CS 222"]}
# requests.post('http://localhost:5000/insert/Users', json=json.dumps(json_example), headers={"Content-Type": "application/json"})

import pytz, datetime
# print(pytz.timezone('US/Central').localize(datetime.datetime.now()))
dt = datetime.datetime.now(tz=pytz.timezone('US/Central'))
print(dt.strftime('%a %b %d %Y %H:%M:%S GMT-0600 (Central Standard Time)'))