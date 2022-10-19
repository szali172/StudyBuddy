import React from 'react';
import './App.css';
import Navbar from './Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MyProfile from './MyProfile';
import FindABuddy from './FindABuddy';
import BrowseCourses from './BrowseCourses';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
          <Route path='/findabuddy' element={<FindABuddy/>} />
          <Route path='/profile' element={<MyProfile/>} />
          <Route path='/browse' element={<BrowseCourses/>} />
      </Routes>
      </Router>
    </div>
  );
}
export default App;