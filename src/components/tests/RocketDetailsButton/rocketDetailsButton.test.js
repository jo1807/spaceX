import React from "react";
import { render, cleanup } from "@testing-library/react";
import RocketDetailsButton from "../../RocketSummary";

afterEach(cleanup);
const currentId = 1;
it("renders", () => {
  const { asFragment } = render(<RocketDetailsButton launchId={currentId} />);
  expect(asFragment()).toMatchSnapshot();
});

it('has text content saying "Details"', () => {
  const { getByTestId } = render(<RocketDetailsButton launchId={currentId} />);
  expect(getByTestId("detailsBtnId-1").textContent).toBe("Details");
});
