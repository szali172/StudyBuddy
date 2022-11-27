test_db = {
    "Users": {
        "_id":"63339af0f5bbd2004b1da743", # Mongo's BSON ObjectID as a string
        "id":"12D32423kbJKH9",
        "name":"John Smith",
        "email":"jsmith@illinois.edu",
        "password":"1234",
        "courses":["CS 222","CS 225","MATH 241"],
        "favorites":["CS 222","CS 225","MATH 241","ECON 103"]
    },
    "Posts": {
        "_id":"63472c72dfdba2b5cd359ad4",
        "post_id":"h6Gw4320PMkq1e",
        "op_id":"12D32423kbJKH9",
        "ts":"2022-10-12 16:39:39.596758",
        "location":"Grainger Library 4th Floor",
        "content":"Hey, I'm looking to work on ... Anyone else?",
        "comments":
        [
            {"user_id":"12D32423kbJK11",
            "ts":"2022-10-12 16:49:39.596765",
            "content":"Yeah I'm down! What time?"
            },
            {"user_id":"9as7dfh23hkjWs",
            "ts":"2022-10-12 16:54:39.596771",
            "content":"Same here. Did you figure out how to do #4? I'm free to meet up at 7pm!"
            },
            {"user_id":"12D32423kbJKH9",
            "ts":"2022-10-12 16:56:39.596775",
            "content":"I did figure that one out! 7pm works with me if you guys are all free"
            }
        ]
    }
}

# Example print
# print(test_db["Posts"]["comments"][0]["user_id"])