import React from "react";
import { act, cleanup, waitFor, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "../../api/App";
import { launches } from "../mockData";

afterEach(cleanup);

it("it makes api call for data that is correctly rendered", async () => {
  const call = jest.fn().mockResolvedValue({ launches });

  act(() => {
    call();
  });

  const { getByText } = render(<App />);

  expect(call).toHaveBeenCalledTimes(1);

  await waitFor(() => {
      expect(getByText("DSCOVR")).toBeVisible();
      expect(getByText("Flight Number: 20")).toBeVisible();
      expect(getByText("February 11th 2015")).toBeVisible();
  });
});
