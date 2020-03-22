import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import RocketSummary from "../../RocketSummary";
import { LaunchLogo } from "../../RocketSummary";
import { launches } from "../mockData";
import moment from "moment";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<RocketSummary />);
  expect(asFragment()).toMatchSnapshot();
});

it("calls correct function on click", () => {
  const onClick = jest.fn();
  const { getByText } = render(<RocketSummary setToggleShowModal={onClick} />);
  fireEvent.click(getByText("Details"));
  expect(onClick).toHaveBeenCalled();
});

it("render logo image on initial render", () => {
  const { queryByTestId } = render(
    <LaunchLogo data-testid="logoId" src={launches[0].images.mission_image} />
  );
  expect(queryByTestId("logoId")).toBeTruthy();
});

it("render prop launches data correctly", () => {
  const missionDate = moment(launches[0].launch_date_local).format(
    "MMMM Do YYYY"
  );
  const { getByTestId } = render(
    <RocketSummary
      missionName={launches[0].mission_name}
      flightNumber={launches[0].flight_number}
      rocketName={launches[0].rocket.rocket_name}
      missionDate={missionDate}
      currentId={launches[0].current_id}
      launchId={launches[0].launch_id}
      launchLogo={launches[0].images.mission_image}
    />
  );
  expect(getByTestId("mission-name").textContent).toBe("DSCOVR");

  expect(getByTestId("flight-number").textContent).toBe("Flight Number: 20");

  expect(getByTestId("rocket-name").textContent).toBe("Rocket Name: Falcon 9");

  expect(getByTestId("mission-date").textContent).toBe("February 11th 2015");
});
