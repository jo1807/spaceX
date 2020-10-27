import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import styled from "styled-components";

import { getLaunchStatistics, getLaunchDetails } from "./utils";
import nightSkyImage from "../images/night-sky.png";


const Launches = lazy(() => import("../components/Launches"));

export interface ISpaceXData {
  id: number;
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_local: string;
  details: string;
  launch_success: string;
  rocket: IRocketData;
  images: IImagesData;
}

interface IRocketData {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

interface IImagesData {
  mission_image: string;
  flickr_images: string;
}

const Wrapper = styled.div({
  backgroundImage: `url(${nightSkyImage})`,
  height: "100vh",
});

const App: React.FC = () => {
  const [spaceXData, setSpaceXData] = useState<object[]>([]);
  const [statistics, setlaunchStatistics] = useState<object[]>([]);

  useEffect(() => {
    const ids = ["20", "21", "22", "35", "40", "42", "65"];
    const fetchLaunchById = async () => {
      const response = await Promise.all(
        ids.map((id) => axios(`https://api.spacexdata.com/v3/launches/${id}`))
      );
      setSpaceXData(getLaunchDetails(response));
    };
    fetchLaunchById();
  }, []);

  useEffect(() => {
    const fetchAllLaunches = async () => {
      const response = await axios(`https://api.spacexdata.com/v3/launches`);
      setlaunchStatistics(getLaunchStatistics(response));
    };
    fetchAllLaunches();
  }, []);

  return (
    <Wrapper data-testid="wrapperId">
      {/* {spaceXData ? (
        <div>
          <Text>Loading...</Text>
        </div>
      ) : ( */}
      <Suspense fallback={<div>Loading...</div>}>
        <Launches
          data-testid="launchesId"
          launches={spaceXData}
          statistics={statistics}
        />
      </Suspense>
      {/* )} */}
    </Wrapper>
  );
};

// const Text = styled.p({
//   color: "white",
// });

export default App;
