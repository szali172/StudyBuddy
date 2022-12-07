import { render, screen, waitForElement } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MyProfile from './MyProfile';
import FindABuddy from './FindABuddy';
import Browse from './BrowseCourses';
import '@testing-library/jest-dom'
import LearnMore from './LearnMore';
import axios from "axios";



test('renders homepage', () => {
  render(<App />);
  const header = screen.getByText("STUDY BUDDY");
  expect(header).toBeInTheDocument();
  const user = screen.getByText("John Smith");
  expect(user).toBeInTheDocument();
});

test('myProfile', () => {
  render(<BrowserRouter><MyProfile /></BrowserRouter>);
  const header = screen.getByText("MY PROFILE")
  expect(header).toBeInTheDocument();

  const my_info_header = screen.queryByText('My Information')
  expect(my_info_header).toBeInTheDocument();

  const name = screen.queryByText('My Courses')
  expect(name).toBeInTheDocument();

  // const cs222course = screen.queryByText('CS 222')
  expect(screen.queryAllByText('CS 222'))

  // const cs225course = screen.queryByText('CS 225')
  // waitFor(() => expect(getByText('CS 225')).toBeInTheDocument());

  const editButton = screen.queryAllByText('Edit Info ⮕')
  expect(editButton).toHaveLength(1)
  
});


test('FindABuddy', () => {
  render(<BrowserRouter><FindABuddy /></BrowserRouter>);
  const header = screen.getByText("FIND A BUDDY")
  expect(header).toBeInTheDocument();

  // const post = screen.queryByText("Hey, I'm looking to work on ... Anyone else?")
  // expect(post).toBeInTheDocument();

  // expect(screen.getByText('Grainger')).toBeInTheDocument()

});

test('Browse', () => {
  render(<BrowserRouter><Browse /></BrowserRouter>);
  const header = screen.getByText("BROWSE COURSES")
  expect(header).toBeInTheDocument();
});

test('LearnMore', () => {
  render(<BrowserRouter><LearnMore /></BrowserRouter>);
  const header = screen.getByText("LEARN MORE")
  expect(header).toBeInTheDocument();
});

