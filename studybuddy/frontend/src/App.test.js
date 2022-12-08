import { render, screen, waitForElement } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MyProfile from './MyProfile';
import FindABuddy from './FindABuddy';
import Browse from './BrowseCourses';
import '@testing-library/jest-dom'
import LearnMore from './LearnMore';



test('Homepage', () => {
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

  expect(screen.queryAllByText('CS 222'))

  const editButton = screen.queryAllByText('Edit Info ⮕')
  expect(editButton).toHaveLength(1)
});


test('FindABuddy', () => {
  render(<BrowserRouter><FindABuddy /></BrowserRouter>);

  const header = screen.getByText("FIND A BUDDY")
  expect(header).toBeInTheDocument();

  expect(screen.queryAllByText('Grainger Library 4th Floor'))

  expect(screen.queryAllByText("Hey, I'm looking to work on ... Anyone else?"))
});

test('Browse', () => {
  render(<BrowserRouter><Browse /></BrowserRouter>);

  const header = screen.getByText("BROWSE COURSES")
  expect(header).toBeInTheDocument();
  expect(screen.queryAllByText("Intro Asian American Studies"))

  expect(screen.queryAllByText("Zheng, Reanne"))

  expect(screen.queryAllByText("Link to Reddit Post"))

  expect(screen.queryAllByText("UIUC AAS 100 (Intro Asian American Studies) with Augosto Espiritu"))
});

test('LearnMore', () => {
  render(<BrowserRouter><LearnMore /></BrowserRouter>);

  const header = screen.getByText("LEARN MORE")
  expect(header).toBeInTheDocument();

  expect(screen.queryAllByText("Divya"))

  expect(screen.queryAllByText("Khushi"))

  expect(screen.queryAllByText("Zuhair"))

  expect(screen.queryAllByText("Viven"))
});

