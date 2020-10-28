import React from "react";
import { render, cleanup } from "@testing-library/react";
import RocketDetailsButton from "../../components/RocketSummary";

afterEach(cleanup);
const currentId = 1;

it('has text content saying "Details"', () => {
  const { getByTestId } = render(<RocketDetailsButton launchId={currentId} />);
  expect(getByTestId("detailsBtnId-1").textContent).toBe("Details");
});
