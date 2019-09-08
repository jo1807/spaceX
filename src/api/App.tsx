import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";

import Launches from "../components/Launches";
import { getLaunchStatistics, getLaunchDetails } from "./utils";
import img from "../images/night-sky.png";

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
  backgroundImage: `url(${img})`,
  height: "100vh"
});

const App: React.FC = () => {
  const [spaceXData, setSpaceXData] = useState<object[]>([]);
  const [statistics, setlaunchStatistics] = useState<object[]>([]);

  useEffect(() => {
    const ids = ["20", "21", "22", "35", "40", "42", "65"];
    const fetchData = async () => {
      let fetchedResult = await Promise.all(
        ids.map(id => axios(`https://api.spacexdata.com/v3/launches/${id}`))
      );
      setSpaceXData(getLaunchDetails(fetchedResult));
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function getUserAsync() {
      let response = await axios(`https://api.spacexdata.com/v3/launches`);
      let data = await response;
      return data;
    }
    getUserAsync().then(launches => {
      setlaunchStatistics(getLaunchStatistics(launches));
    });
  }, []);

  return (
    <Wrapper>
      <Launches launches={spaceXData} statistics={statistics} />
    </Wrapper>
  );
};

export default App;
