import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

   // new line start
  const [userData, setUserData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/Users/name/John%20Smith",
    })
    .then((response) => {
      const res =response.data
      setUserData(({
        user_id: res.id,
        user_name: res.name,
        user_email: res.email,
        user_courses: res.courses,
        user_favorites: res.favorites
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
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {userData && <div>
              <p>Id: {userData.user_id}</p>
              <p>Name: {userData.user_name}</p>
              <p>Email: {userData.user_email}</p>
              <p>Courses: {userData.user_courses.map(app => (<li>{app}</li>))}</p>
              <p>Favorites: {userData.user_favorites.map(app => (<li>{app}</li>))}</p>
            </div>
        }
      </header>
    </div>
  );
}

export default App;