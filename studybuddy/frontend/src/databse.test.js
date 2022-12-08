// import React from 'react';
import axios from "axios";

const TESTgetUserData = function (key,value) {
  return axios({
    method: "GET",
    url:"http://127.0.0.1:5000/get/Users/"+key+"="+value,
  })
  .then((response) => {
    return response.data
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })}

test("get User Data", async () => {
  expect.assertions(1);
  const classes = [
    "CS 222",
    "CS 225",
    "MATH 241",
  ]
  const fav = [
    "CS 222",
    "CS 225",
    "MATH 241",
    "ECON 103",
  ]
  const user = {
    id: "12D32423kbJKH9",
    name: "John Smith",
    password: "1234",
    _id: "63339af0f5bbd2004b1da743",
    courses: classes ,
    email: "jsmith@illinois.edu",
    favorites: fav,
  };
  const payload = { data: user };
  axios.get = jest.fn().mockResolvedValue(payload);
  await expect(TESTgetUserData('id', '12D32423kbJKH9')).resolves.toEqual(user);
});

test("No User Available", async () => {
  expect.assertions(1);
  const payload = { data: undefined };
  axios.get = jest.fn().mockResolvedValue(payload);
  await expect(TESTgetUserData('id', 'a')).resolves.toEqual(undefined);
});


const TESTgetPostData = function (key,value) {
  return axios({
    method: "GET",
    url:"http://127.0.0.1:5000/get/Posts/"+key+"="+value,
  })
  .then((response) => {
    return response.data
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })}

  test("get Post Data", async () => {
    expect.assertions(1);
    const comments = [
           {
             content: "Yeah I'm down! What time?",
             ts: "2022-10-12 16:49:39.596765",
             user_id: "12D32423kbJK11",
           },
           {
             content: "Same here. Did you figure out how to do #4? I'm free to meet up at 7pm!",
             ts: "2022-10-12 16:54:39.596771",
             user_id: "9as7dfh23hkjWs",
           },
           {
             content: "I did figure that one out! 7pm works with me if you guys are all free",
             ts: "2022-10-12 16:56:39.596775",
             user_id: "12D32423kbJKH9",
           },
           {
             content: "text",
             ts: "2022-10-12 16:49:39.596765",
            user_id: "1685736281929",
           },
           {
             content: "Lets study for 233!",
             ts: "Mon Nov 14 2022 23:47:21 GMT-0600 (Central Standard Time)",
             user_id: "1685736281929",
          },
           {
             content: "Lets study for 233!",
             ts: "Sun Dec 04 2022 13:01:59 GMT-0600 (Central Standard Time)",
             user_id: "1685736281929",
           },
            {
             content: "Lets study for 233!",
             ts: "Sun Dec 04 2022 13:49:06 GMT-0600 (Central Standard Time)",
             user_id: "1685736281929",
           },
      ]
    const post = {
      _id: "63472c72dfdba2b5cd359ad4",
      content: "Hey, I'm looking to work on ... Anyone else?",
      location: "Grainger Library 4th Floor",
      op_id: "12D32423kbJKH9",
      post_id: "h6Gw4320PMkq1e",
      ts: "2022-10-12 16:39:39.596758",
      comments: comments
    };
    const payload = { data: post };
    axios.get = jest.fn().mockResolvedValue(payload);
    await expect(TESTgetPostData('op_id', '12D32423kbJKH9')).resolves.toEqual(post);
  });

  function TESTinsertUserData(id, name, email, password, courses, favorites) {

    const data = `{"id":"${id}","name":"${name}","email":"${email}","password":"${password}","courses":"${courses}","favorites":"${favorites}"}`;

    axios.post("http://127.0.0.1:5000/insert/Users", data, {headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
    }}).catch((error) => {
        if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
        })
    }

  test("insert User Data", async () => {
      expect.assertions(1);
      TESTinsertUserData("udf87839ie", 'Joe Hark', 'jh@illinois.edu', 'pass', [],[])
      const user = {
        _id: "639104023b44ea6d8ad51c7c",
       courses: "",
       email: "jh@illinois.edu",
       favorites: "",
       id: "udf87839ie",
       name: "Joe Hark",
       password: "pass",
      };
      const payload = { data: user };
      axios.get = jest.fn().mockResolvedValue(payload);
      await expect(TESTgetUserData('id', 'udf87839ie')).resolves.toEqual(user);
    });
    


  function TESTinsertPostData(post_id, op_id, location, content, comments) {
    var ts = Date(Date.now()).toString()
    const data = `{"post_id":"${post_id}","op_id":"${op_id}","ts":"${ts}","location":"${location}","content":"${content}","comments":"${comments}"}`;

    axios.post("http://127.0.0.1:5000/insert/Posts", data, {headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
  }}).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
      })
  }

  test("insert Post Data", async () => {
    expect.assertions(1);
    TESTinsertPostData("98765678", '1685736281929', 'Grainger', 'Hello, lets study for CS 361!', [])
    const post = {
      _id: "638fd795f1b867de9a7ea1cc",
      comments: "",
      content: "Hello, lets study for CS 361!",
      location: "Grainger",
      op_id: "1685736281929",
      post_id: "98765678",
      ts: "Tue Dec 06 2022 18:00:21 GMT-0600 (Central Standard Time)",
    };
    const payload = { data: post };
    axios.get = jest.fn().mockResolvedValue(payload);
    await expect(TESTgetPostData('post_id', '98765678')).resolves.toEqual(post);
    
  });


  function TESTgetGPA(title) {
    var key = "Course%20Title"
    return axios({
      method: "GET",
      url:"http://127.0.0.1:5000/get/classes/"+key+"="+title,
    })
    .then((response) => {
      const res =response.data
      var total = (parseInt(res["A+"])* 4) + (parseInt(res["A"]) * 4) + (parseInt(res["A-"]) * 3.67) + (parseInt(res["B+"]) * 3.33) + (parseInt(res["B"]) * 3) + (parseInt(res["B-"]) * 2.67) + (parseInt(res["C+"]) * 2.33) + (parseInt(res["C"]) * 2) + (parseInt(res["C-"]) * 1.67) + (parseInt(res["D+"]) * 1.33) + (parseInt(res["D"] * 1)) + (parseInt(res["D-"]) * 0.67)
      var gpa = (total / (parseInt(res["A+"]) + parseInt(res["A"]) + parseInt(res["A-"]) + parseInt(res["B+"]) + parseInt(res["B"]) + parseInt(res["B-"]) + parseInt(res["C+"]) + parseInt(res["C"]) + parseInt(res["C-"]) + parseInt(res["D+"]) + parseInt(res["D"]) + parseInt(res["D-"]) + parseInt(res["F"]))).toFixed(2)
      return gpa
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}


    test("get GPA", async () => {
      expect.assertions(1);
      await expect(TESTgetGPA('Intro Asian American Studies')).resolves.toEqual("3.54");
    });


    function TESTgetRedditPost(sub, topic) {
      return axios({
        method: "GET",
        url:"http://127.0.0.1:5000//reddit_posts/"+sub+"/"+topic
      })
      .then((response) => {
        const res =response.data
        return res[0]
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}
  
      test("Reddit Post for CS222", async () => {
        expect.assertions(1);
        const reddit_post = {
          author: "AppropriateFly4951",
          date: "Fri Oct 14 2022 13:20:40 GMT-0600 (Central Standard Time)",
          id: "y41ahm",
          num_comments: 0,
          over_18: false,
          permalink: "/r/UIUC/comments/y41ahm/cs222_group_needing_members/",
          score: 0,
          spoiler: false,
          title: "CS222 Group needing members",
        };
        const payload = { data: reddit_post };
        axios.get = jest.fn().mockResolvedValue(payload);
        await expect(TESTgetRedditPost('UIUC', 'CS222')).resolves.toEqual(reddit_post);
        
      });