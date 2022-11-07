import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

  const [userData, setUserData] = useState(null)
  const [classData, setClassData] = useState(null)
  const [postData, setPostData] = useState(null)

  /*
  Retrieve user data given a key (i.e. name, email, id) and a value ("John Smith", "jsmith@illinois.edu", "12sd31S2P0")

  Stores the information in the userData variable
  */
  function getUserData(key,value) {
    axios({
      method: "GET",
      url:"http://127.0.0.1:5000/get/Users/"+key+"="+value,
    })
    .then((response) => {
      const res =response.data
      setUserData(({
        user_id: res["id"],
        user_name: res["name"],
        user_email: res["email"],
        user_courses: res["courses"],
        user_favorites: res["favorites"]
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}



  /*
  Retrieve course data given a key (i.e. subject, number, course title) and a value ("CS", "225", "Data Structures")
  
  Stores the information in the classData variable
  */
  function getClassData(key, value) {
    axios({
      method: "GET",
      url:"http://127.0.0.1:5000/get/classes/"+key+"="+value,
    })
    .then((response) => {
      const res =response.data
      console.log(res)
      setClassData(({
        year: res["Year"],
        tearm: res["Term"],
        year_term: res["YearTerm"],
        subject: res["Subject"],
        number: res["Number"],
        course_title: res["Course Title"],
        sched_type: res["Sched Type"],
        a_plus: res["A+"],
        a: res["A"],
        a_minus: res["A-"],
        b_plus: res["B+"],
        b: res["B"],
        b_minus: res["B-"],
        c_plus: res["C+"],
        c: res["C"],
        c_minus: res["C-"],
        d_plus: res["D+"],
        d: res["D"],
        d_minus: res["D-"],
        f: res["F"],
        w: res["W"],
        primary_instructor: res["Primary Instructor"]
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  /*
  Retrieve post data given a key (i.e. post id, Location, time) and a value ("h6Gw4320PMkq1e", "Grainger Library 4th Floor", "2022-10-12 16:39:39.596758")
  
  Stores the information in the postData variable
  */
  function getPostData(key, value) {
    axios({
      method: "GET",
      url:"http://127.0.0.1:5000/get/Posts/"+key+"="+value,
    })
    .then((response) => {
      const res =response.data
      console.log(res)
      setPostData(({
        post_id: res["post_id"],
        op_id: res["op_id"],
        ts: res["ts"],
        location: res["location"],
        content: res["content"],
        comments: res["comments"]
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}


    /*
     Inserts a user into the 'Users' collection of the database given arguments
      id: string, name: string, email: string, password: string, courses: array of strings, favorites: array of strings
    */

    function insertUserData(id, name, email, password, courses, favorites) {
      
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

     /*
     Inserts a post into the 'Posts' collection of the database given arguments
      post_id: string, op_id: string, ts: string, location: string, content: string comments: array of strings
    */

    function insertPostData(post_id, op_id, ts, location, content, comments) {
      
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>To get your profile details: </p><button onClick={() => getUserData('name', 'John%20Smith')}>Click me</button>
        {userData && <div>
              <p>Id: {userData.user_id}</p>
              <p>Name: {userData.user_name}</p>
              <p>Email: {userData.user_email}</p>
              <p>Courses: {userData.user_courses.map(app => (<li>{app}</li>))}</p>
              <p>Favorites: {userData.user_favorites.map(app => (<li>{app}</li>))}</p>
            </div>
        }

        <p>To get class details: </p><button onClick={() => getClassData('Primary%20Instructor', 'Zheng,%20Reanne')}>Click me</button>
        {classData && <div>
              <p>Year: {classData.year}</p>
              <p>Course Name: {classData.course_title}</p>
              <p>Number of A+: {classData.a_plus}</p>
              <p>Primary Instructor: {classData.primary_instructor}</p>
            </div>
        }

        <p>To get Post details: </p><button onClick={() => getPostData('post_id', 'h6Gw4320PMkq1e')}>Click me</button>
        {postData && <div>
              <p>Time: {postData.ts}</p>
              <p>Location: {postData.location}</p>
              <p>Content: {postData.content}</p>
            </div>
        }

        <p>Insert User Data: </p><button onClick={() => insertUserData("1685736281929", "Bob Smith", "bobsmith@illinois.edu", "bobby", ["CS 222", "CS 225"],["CS 222"])}>Click me</button>

        <p>Insert Post Data: </p><button onClick={() => insertPostData("4567898765639", "1685736281929", "2022-11-6 21:42:26.423489" , "Siebel CS", "Someone want to study for CS 361 with me?", [{"user_id":"12D32423kbJK11","ts":"2022-10-12 16:49:39.596765","content":"Yeah I'm down! What time?"},{"user_id":"9as7dfh23hkjWs","ts":"2022-10-12 16:54:39.596771","content":"Same here. Did you figure out how to do #4? I'm free to meet up at 7pm!"},{"user_id":"12D32423kbJKH9","ts":"2022-10-12 16:56:39.596775","content":"I did figure that one out! 7pm works with me if you guys are all free"}])}>Click me</button>
      </header>
    </div>
  );
}

export default App;