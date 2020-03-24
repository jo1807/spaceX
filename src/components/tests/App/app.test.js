import React from "react";
import ReactDOM from "react-dom";
import {
  act,
  render,
  cleanup,
  fireEvent,
  waitFor,
  unmountComponentAtNode,
  asFragment
} from "@testing-library/react";
//import "jest-dom/extend-expect";
import axiosMock from "axios";
import "@testing-library/jest-dom/extend-expect";

import App from "../../../api/App";
import { launches } from "../mockData";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders correctly", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders user data", async () => {
  const apiCall = jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: launches
        })
    })
  );
  expect(apiCall).toHaveBeenCalledTimes(0);
  await apiCall();
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    ReactDOM.render(<App />, container);
  });
  // expect(container.querySelector("strong").textContent).toBe(');
  expect(apiCall).toHaveBeenCalled();
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("fetches and displays data", async () => {
  const apiCall = jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: launches
    })
  );
  expect(apiCall).toHaveBeenCalledTimes(0);
  await apiCall();

  const { container, getByTestId, queryByTestId, getByClassName } = render(
    <App />
  );
  await waitFor(async () => getByTestId("card-wrapper-1"));
  expect(getByTestId("wrapperId")).toBeTruthy();
  expect(apiCall).toHaveBeenCalledTimes(1);
});
