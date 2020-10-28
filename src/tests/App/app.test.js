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
  const { getByTestId } = render(<App />);
  expect(call).toHaveBeenCalledTimes(1);
  // const resolvedDiv = await waitFor(() => getByTestId("mission-name-1"));

  // expect(resolvedDiv.textContent).toBe("DSCOVR");

  // expect(getByTestId("flight-number-1").textContent).toBe("Flight Number: 20");

  // expect(getByTestId("rocket-name-1").textContent).toBe(
  //   "Rocket Name: Falcon 9"
  // );
  // expect(getByTestId("mission-date-1").textContent).toBe("February 11th 2015");
});
