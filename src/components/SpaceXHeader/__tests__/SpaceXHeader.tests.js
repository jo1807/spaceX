import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SpaceXHeader from "../SpaceXHeader";

describe('renders', () => {
  const mockFn = jest.fn();
  it("should render spaceX logo", () => {
    const { getByRole } = render(<SpaceXHeader handleShowStatisticsModal={mockFn} hasStatistics={false} />);
    expect(getByRole("img")).toBeVisible();
  });

  it("should render button when hasStatistics is true", () => {
    const { getByRole } = render(<SpaceXHeader handleShowStatisticsModal={mockFn} hasStatistics={true} />);
    expect(getByRole("button")).toBeVisible();
  });

  it("should render not button when hasStatistics is false", () => {
    const { queryByRole } = render(<SpaceXHeader handleShowStatisticsModal={() => {}} hasStatistics={false} />);
    expect(queryByRole("button")).toBeNull();
  });
});

describe('ChartButton', () => {
  const mockFn = jest.fn();
  it("should call handleShowStatisticsModal on click", () => {
    const { getByRole } = render(<SpaceXHeader handleShowStatisticsModal={mockFn} hasStatistics={true} />);

    fireEvent.click(getByRole("button"));
    expect(mockFn).toHaveBeenCalled();
  });
});