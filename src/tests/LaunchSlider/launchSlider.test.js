import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  act
} from "@testing-library/react";
import LaunchSlider from "../../components/LaunchSlider";
import { launches } from "../mockData";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<LaunchSlider launches={launches} />);
  expect(asFragment()).toMatchSnapshot();
});

it("correctly shows next card in slider on click of next button", async () => {
  const { getByTestId, container } = render(
    <LaunchSlider launches={launches} />
  );
  const centerCardInLaunchSlider = container.firstChild.childNodes[1].querySelector(
    "div:nth-child(2)"
  );
  const nextBtn = getByTestId("next-btn");

  expect(centerCardInLaunchSlider.firstChild.textContent).toBe("TEST2");
  expect(centerCardInLaunchSlider.childNodes[1].textContent).toBe(
    "Flight Number: 21"
  );
  expect(centerCardInLaunchSlider.childNodes[2].textContent).toBe(
    "Rocket Name: Falcon Q"
  );

  act(() => {
    fireEvent.click(nextBtn);
  });

  fireEvent.click(nextBtn);

  await waitFor(() => getByTestId("card-wrapper-3"));

  const centerCardAfterNextBtnClick = getByTestId(
    "card-wrapper-3"
  ).querySelector("div:nth-child(2)");

  expect(centerCardAfterNextBtnClick.firstChild.textContent).toBe("TEST3");
  expect(centerCardAfterNextBtnClick.childNodes[1].textContent).toBe(
    "Flight Number: 23"
  );
});

it("disabled button to click next when it reached the last card", () => {
  const { getByTestId } = render(<LaunchSlider launches={launches} />);

  const nextBtn = getByTestId("next-btn");
  expect(getByTestId("next-btn").disabled).toEqual(false);
  act(() => {
    fireEvent.click(nextBtn);
  });

  fireEvent.click(nextBtn);

  expect(getByTestId("next-btn").disabled).toBe(true);
});

it("back button is disabled on initial render", () => {
  const { getByTestId } = render(<LaunchSlider launches={launches} />);
  const backBtn = getByTestId("back-btn");

  expect(backBtn.disabled).toEqual(true);
});
