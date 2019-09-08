import React, { useState } from "react";
import styled from "@emotion/styled";

import SpaceXHeader from "./SpaceXHeader";
import LaunchSlider from "./LaunchSlider";
import BarChart from "./BarChart";

interface ILaunches {
  launches: object[];
  statistics: object[];
}

const Wrapper = styled.div({
  diplay: "grid",
  alignItems: "center",
  justifyItems: "center",
  gridTemplateRows: "1fr 1fr"
});

const Launches: React.FC<ILaunches> = ({ launches, statistics }) => {
  const [showStatistics, setshowStatisticsModal] = useState<boolean>(false);

  const handleShowStatisticsModal = () => {
    setshowStatisticsModal(!showStatistics);
  };

  return (
    <Wrapper>
      <SpaceXHeader handleShowStatisticsModal={handleShowStatisticsModal} />
      {showStatistics ? (
        <BarChart statistics={statistics} />
      ) : (
        <LaunchSlider launches={launches} />
      )}
    </Wrapper>
  );
};

export default Launches;
