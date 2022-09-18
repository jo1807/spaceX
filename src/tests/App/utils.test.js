import { getLaunchStatistics } from "../../api/utils";
import { launches } from "../mockData";

const expectedStatistics = [
  {
    "2011": 2,
    "2015": 1
  },
  { "Falcon 9": 1, "Falcon Q": 2 },
  { "v1.1": 1, "v1.3": 2 },
  { true: 3 },
  {
    launch_site_1: 1,
    launch_site_2: 2
  }
];

describe("Util functions return correct output", () => {
  it("getLaunchStatistics return correct array of objects", () => {
    expect(getLaunchStatistics(launches)).toEqual(expectedStatistics);
  });
});
