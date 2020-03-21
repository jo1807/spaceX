import React from "react";
import styled from "@emotion/styled";

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
  setToggleShowModal: Function;
}

export const ImageWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  margin: "2em"
});

export const LaunchLogo = styled.img<ILaunchLogo>({
  display: "grid",
  width: "10em",
  height: "11em",
  alignItems: "center",
  justifyItems: "center",
  "@media(max-width: 500px)": {
    width: "60%",
    height: "60%"
  }
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
    cursor: "pointer"
  },
  "@media(max-width: 1024px)": {
    width: "10em",
    height: "5em"
  }
});

const Title = styled.p({
  paddingTop: "2em",
  fontWeight: "bold"
});

const RocketSummary: React.FC<IRocketSummaryProps> = ({
  missionName,
  flightNumber,
  rocketName,
  missionDate,
  currentId,
  launchId,
  launchLogo,
  setToggleShowModal
}) => {
  return (
    <CardWrapper currentId={currentId} launchId={launchId}>
      <Title>{missionName}</Title>
      <p>Flight Number: {flightNumber}</p>
      <p>Rocket Name: {rocketName}</p>
      <p>{missionDate}</p>
      <RocketDetailsButton
        data-testid="detailsBtnId"
        onClick={() => setToggleShowModal()}
      >
        Details
      </RocketDetailsButton>
      <ImageWrapper>
        <LaunchLogo src={launchLogo} />
      </ImageWrapper>
    </CardWrapper>
  );
};

export default RocketSummary;
