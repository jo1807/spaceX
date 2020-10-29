import React, { useState } from "react";
import moment from "moment";

import { ISpaceXData } from "../api/App";
import RocketDetails from "./RocketDetails";
import { MissionSummary } from "./MissionSummary";

interface ILaunch {
  launch: ISpaceXData;
  currentId: number;
  key: number;
}

const LaunchCard: React.FC<ILaunch> = ({ launch, currentId }) => {

  const [showModal, toggleShowModal] = useState(false);

  const missionDate = moment(launch.launch_date_local).format("MMMM Do YYYY");

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
    <MissionSummary
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
