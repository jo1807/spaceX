import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import RocketDetailsButton from "../../components/RocketSummary";
import RocketSummary from "../../components/RocketSummary";
import LaunchSlider from "../../components/LaunchSlider";
import { launches } from "../mockData";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<LaunchSlider launches={launches} />);
  expect(asFragment()).toMatchSnapshot();
});

it("correctly shows next card in slider on click of next button", () => {
  const { getByTestId, getByText, container } = render(
    <LaunchSlider launches={launches} />
  );
  // console.log(
  //   "console",
  //   container.firstChild.childNodes[1]
  //     .querySelector("div:nth-child(2)")
  //     .firstChild.querySelector("div:nth-child(1)")
  // );

  // fireEvent.click(getByTestId("next-btn"));
});
