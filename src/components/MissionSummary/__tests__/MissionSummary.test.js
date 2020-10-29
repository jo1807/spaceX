import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import moment from 'moment';

import MissionSummary from "../MissionSummary";
import Rocket from '../../../images/rocket.jpg';

describe('renders', () => {
  const mockFn = jest.fn();
  const missionDate = moment('12-02-20').format(
    "MMMM Do YYYY"
  );

  it("should successfully render mission details ", () => {
    const { getByRole, getByText } = render(<MissionSummary 
      missionName={'DSCOVR'}
      flightNumber={16}
      rocketName={'Falcon 9'}
      missionDate={missionDate}
      currentId={0}
      launchId={12345}
      launchLogo={Rocket}
      setToggleShowModal={mockFn}
    />)

    expect(getByText(/DSCOVR/i)).toBeVisible();
    expect(getByText(/Flight Number: 16/i)).toBeVisible();
    expect(getByText(/Rocket Name: Falcon 9/i)).toBeVisible();
    expect(getByText(/December 2nd 2020/i)).toBeVisible();
    expect(getByText(/Details/i)).toBeVisible();
    expect(getByRole("img")).toBeVisible();
  });
});

describe('Details Buttons', () => {
  const mockFn = jest.fn();
  it("should call setToggleShowModal on click", () => {
     const { getByText } = render(<MissionSummary 
      missionName={'CRS-6'}
      flightNumber={15}
      rocketName={'Falcon 8'}
      missionDate={'13-04-20'}
      currentId={0} 
      launchId={14565}
      launchLogo={Rocket}
      setToggleShowModal={mockFn}
/>)

    fireEvent.click(getByText(/Details/i));
    expect(mockFn).toHaveBeenCalled();
  });
});