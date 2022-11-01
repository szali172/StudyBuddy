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
      </header>
    </div>
  );
}

export default App;