import React, { useState } from "react";
import moment from "moment";
import styled from "@emotion/styled";

import { ISpaceXData } from "../api/App";
import RocketDetails from "./RocketDetails";
import RocketSummary from "./RocketSummary";

interface ILaunch {
  launch: ISpaceXData;
  currentId: number;
  key: number;
}

interface ICardWrapper {
  currentId: number;
  launchId: number;
}

interface ILaunchLogo {
  src: string;
}

export const CardWrapper = styled.div<ICardWrapper>(props => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyItems: "center",
  color: "white",
  backgroundColor: "black",
  borderRadius: "2.5em",
  transition: props.currentId === props.launchId ? "all 1s ease-out" : "",
  boxShadow:
    "0px 20px 25px -5px rgba(232,232,232,1), 0px 20px 20px -5px rgba(240,240,240,1)",
  opacity: props.currentId === props.launchId ? 1 : 0.7,
  transform: props.currentId === props.launchId ? "scale(0.9)" : "scale(0.8)"
}));

export const ImageWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50%"
});

export const LaunchLogo = styled.img<ILaunchLogo>({
  objectFit: "cover",
  display: "grid",
  maxWidth: "200px",
  alignItems: "center",
  justifyItems: "center"
});

const LaunchCard: React.FC<ILaunch> = ({ launch, currentId }) => {
  const missionDate = moment(launch.launch_date_local).format("MMMM Do YYYY");
  const [showModal, toggleShowModal] = useState(false);

  const setToggleShowModal = () => {
    if (launch.id === currentId) {
      toggleShowModal(!showModal);
    }
  };

  return showModal ? (
    <RocketDetails
      currentId={currentId}
      launchId={launch.id}
      details={launch.details}
      image={launch.images.flickr_images}
      show={showModal}
      toggleShowModal={toggleShowModal}
    />
  ) : (
    <RocketSummary
      currentId={currentId}
      launchId={launch.id}
      missionName={launch.mission_name}
      flightNumber={launch.flight_number}
      rocketName={launch.rocket.rocket_name}
      missionDate={missionDate}
      launchLogo={launch.images.mission_image}
      setToggleShowModal={setToggleShowModal}
    />
  );
};

export default LaunchCard;
