import React from "react";
import { render, cleanup } from "@testing-library/react";
import RocketDetailsButton from "../../RocketSummary";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<RocketDetailsButton />);
  expect(asFragment()).toMatchSnapshot();
});

it('has text content saying "Details"', () => {
  const { getByTestId } = render(<RocketDetailsButton />);
  expect(getByTestId("detailsBtnId").textContent).toBe("Details");
});

//check for onClick
