import React from "react";
import styled from "styled-components";

interface ILaunchLogo {
  src: string;
}

interface ICardWrapper {
  currentId: number;
  launchId: number;
}

export interface IMissionSummaryProps {
  missionName: string;
  flightNumber: number;
  rocketName: string;
  missionDate: string;
  currentId: number;
  launchId: number;
  launchLogo: string;
  setToggleShowModal: () => void;
}

const MissionSummary: React.FC<IMissionSummaryProps> = ({
  missionName,
  flightNumber,
  rocketName,
  missionDate,
  currentId,
  launchId,
  launchLogo,
  setToggleShowModal,
}) => {
  //remove data-testid
  return (
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
  );
};

const CardWrapper = styled.div<ICardWrapper>((props) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "600px",
  justifyItems: "center",
  color: "white",
  backgroundColor: "black",
  borderRadius: "2.5em",
  transition: props.currentId === props.launchId ? "all 1s ease-out" : "",
  boxShadow:
    "0px 20px 25px -5px rgba(232,232,232,1), 0px 20px 20px -5px rgba(240,240,240,1)",
  opacity: props.currentId === props.launchId ? 1 : 0.7,
  transform: props.currentId === props.launchId ? "scale(0.9)" : "scale(0.8)",
}));

const ImageWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  margin: "2em",
});

const LaunchLogo = styled.img<ILaunchLogo>({
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

export default MissionSummary;
