import React, { useState } from "react";
import styled from "@emotion/styled";

import SpaceXHeader from "./SpaceXHeader";
import LaunchSlider from "./LaunchSlider";
import Charts from "./Charts";

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
      <SpaceXHeader
        statistics={statistics}
        handleShowStatisticsModal={handleShowStatisticsModal}
      />
      {showStatistics ? (
        <Charts statistics={statistics} />
      ) : (
        <LaunchSlider launches={launches} />
      )}
    </Wrapper>
  );
};

export default Launches;
