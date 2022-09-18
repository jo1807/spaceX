import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { Launches } from "../components/Launches";
import { getLaunchStatistics, getLaunchDetails } from "./utils";
import nightSkyImage from "../images/night-sky.png";
import { ISpaceXData } from "../types";

const App: React.FC = () => {
  const [spaceXData, setSpaceXData] = useState<ISpaceXData[]>([]);
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
      setlaunchStatistics(getLaunchStatistics(response.data));
    };
    fetchAllLaunches();
  }, []);

  return (
    <Wrapper data-testid="space-x-data-wrapper">
    {spaceXData.length ? (
        <Launches
          data-testid="launchesId"
          launches={spaceXData}
          statistics={statistics}
        />
      ) : ( 
        <TextWrapper>
          <Text>Loading...</Text>
        </TextWrapper>
    )}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  backgroundImage: `url(${nightSkyImage})`,
  height: "100vh",
});

const TextWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
});

const Text = styled.h1({
  color: "white",
});

export default App;
