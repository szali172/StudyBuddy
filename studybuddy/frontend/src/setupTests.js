// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';


import { render, fireEvent, screen } from "@testing-library/react";
import MyProfile from './MyProfile';
import FindABuddy from './FindABuddy';
import BrowseCourses from './BrowseCourses';

//@TODO: make more descriptive comments for test cases


//myProfile test block
describe(MyProfile, () => {
  test("should get profile information right", () => {
    const spy = jest.fn();
    const { getByText } = makeSut({ onClick: spy });
    fireEvent.click(getByText("Click me"));
    expect(spy).toHaveBeenCalled();
    expect(getByText("John Smith")).toBeInTheDocument();
    expect(getByText("jsmith@illinois.edu")).toBeInTheDocument();
    expect(getByText("CS 222")).toBeInTheDocument();
    expect(getByText("CS 225")).toBeInTheDocument();

  });
});


//FindABuddy test block
describe(FindABuddy, () => {
  test("should get post information right", () => {
    const spy = jest.fn();
    const { getByText } = makeSut({ onClick: spy });
    fireEvent.click(getByText("Click me"));

    expect(spy).toHaveBeenCalled();
    expect(getByText("2022-10-12 16:39:39.596758")).toBeInTheDocument();
    expect(getByText("Grainger Library 4th Floor")).toBeInTheDocument();
    expect(getByText("Hey, I'm looking to work on ... Anyone else?")).toBeInTheDocument();
  });
});


//Browse test block
describe(BrowseCourses, () => {
  test("should get course information right", () => {
    const spy = jest.fn();
    const { getByText } = makeSut({ onClick: spy });
    fireEvent.click(getByText("Click me"));

    expect(spy).toHaveBeenCalled();
    expect(getByText("2021")).toBeInTheDocument();
    expect(getByText("Intro Asian American Studies")).toBeInTheDocument();
    expect(getByText("Zheng, Reanne")).toBeInTheDocument();
  });
});