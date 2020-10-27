import React, { Suspense } from "react";
import styled from "styled-components";

import { CardWrapper } from "./LaunchCard";

interface ILaunchLogo {
  src: string;
}

interface IRocketSummaryProps {
  missionName: string;
  flightNumber: number;
  rocketName: string;
  missionDate: string;
  currentId: number;
  launchId: number;
  launchLogo: string;
  setToggleShowModal: () => void;
}

export const ImageWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  margin: "2em",
});

export const LaunchLogo = styled.img<ILaunchLogo>({
  display: "grid",
  width: "10em",
  height: "11em",
  alignItems: "center",
  justifyItems: "center",
  "@media(max-width: 500px)": {
    width: "60%",
    height: "60%",
  },
});

const RocketDetailsButton = styled.button({
  marginTop: "1em",
  backgroundColor: "black",
  color: "white",
  height: "12em",
  width: "10em",
  fontWeight: "bold",
  fontSize: "15px",
  border: "3px solid grey",
  outline: "none",
  ":hover": {
    background: "linear-gradient(white, grey)",
    color: "white",
    cursor: "pointer",
  },
  "@media(max-width: 1024px)": {
    width: "10em",
    height: "5em",
  },
});

const Title = styled.p({
  paddingTop: "2em",
  fontWeight: "bold",
});

const RocketSummary: React.FC<IRocketSummaryProps> = ({
  missionName,
  flightNumber,
  rocketName,
  missionDate,
  currentId,
  launchId,
  launchLogo,
  setToggleShowModal,
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardWrapper
        data-testid={`rocket-summary-${launchId}-id`}
        currentId={currentId}
        launchId={launchId}
      >
        <Title data-testid={`mission-name-${launchId}`}>{missionName}</Title>
        <p data-testid={`flight-number-${launchId}`}>
          Flight Number: {flightNumber}
        </p>
        <p data-testid={`rocket-name-${launchId}`}>Rocket Name: {rocketName}</p>
        <p data-testid={`mission-date-${launchId}`}>{missionDate}</p>
        <RocketDetailsButton
          data-testid={`detailsBtnId-${launchId}`}
          onClick={setToggleShowModal}
        >
          Details
        </RocketDetailsButton>
        <ImageWrapper>
          <LaunchLogo data-testid={`logoId-${launchId}`} src={launchLogo} />
        </ImageWrapper>
      </CardWrapper>
    </Suspense>
  );
};

export default RocketSummary;
