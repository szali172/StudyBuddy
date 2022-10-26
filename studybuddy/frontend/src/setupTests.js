// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';


import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "../components/Counter";

//test block
describe("<Button />", () => {
    test("Should render label correctly", () => {
      const { getByText } = makeSut({ label: "My Button" });
  
      expect(getByText(/My Button/)).toBeInTheDocument();
    });
  
    test("Should call onClick successfully", () => {
      const spy = jest.fn();
  
      const { getByText } = makeSut({ onClick: spy });
  
      fireEvent.click(getByText(/label/));
  
      expect(spy).toHaveBeenCalled();
    });
  });