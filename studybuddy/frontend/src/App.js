import React from 'react';
import './App.css';
import Navbar from './Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MyProfile from './MyProfile';
import FindABuddy from './FindABuddy';
import BrowseCourses from './BrowseCourses';
import LearnMore from './LearnMore';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/findabuddy' element={<FindABuddy/>} />
          <Route path='/profile' element={<MyProfile/>} />
          <Route path='/browse' element={<BrowseCourses/>} />
          <Route path='/learnmore' element={<LearnMore/>} />
      </Routes>
      </Router>
    </div>
  );
}
export default App;