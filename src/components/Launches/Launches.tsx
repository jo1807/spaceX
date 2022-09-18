import React, { useState, lazy, Suspense } from "react";
import styled from "styled-components";

import { SpaceXHeader } from "../SpaceXHeader";
import { Charts } from "../Charts";
import { ISpaceXData } from "../../types";

const LaunchSlider = lazy(() => import("../LaunchSlider"));

interface ILaunches {
  launches: ISpaceXData[];
  statistics: object[];
}

const Launches: React.FC<ILaunches> = ({ launches, statistics }) => {
  const [showStatistics, setshowStatisticsModal] = useState<boolean>(false);

  const handleShowStatisticsModal = () => {
    setshowStatisticsModal(!showStatistics);
  };
  
  return (
    <Wrapper>
      <SpaceXHeader
        hasStatistics={statistics ? true : false}
        handleShowStatisticsModal={handleShowStatisticsModal}
      />
      {showStatistics ? (
        <Charts statistics={statistics} />
      ) : (
        <Suspense fallback={<Text>Loading...</Text>}>
          <LaunchSlider launches={launches} />
        </Suspense>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  diplay: "grid",
  alignItems: "center",
  justifyItems: "center",
  gridTemplateRows: "1fr 1fr",
});

const Text = styled.p({
  color: "white",
});

export default Launches;
