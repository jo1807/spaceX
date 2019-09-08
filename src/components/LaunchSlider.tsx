import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

import LaunchCard from "./LaunchCard";
import { ISpaceXData } from "../api/App";

interface ILaunches {
  launches: any;
}

interface ICardWrapper {
  currentId: number;
  launchId: number;
}

interface ISliderButtonProps {
  disabled: boolean;
}

const LaunchSliderWrapper = styled.div({
  display: "grid",
  alignSelf: "center",
  justifySelf: "center",
  gridTemplateColumns: "0.5fr 3fr 0.5fr",
  height: "80vh"
});

const SliderButton = styled.button<ISliderButtonProps>(prop => ({
  backgroundColor: "#0E54D6",
  alignSelf: "center",
  justifySelf: "center",
  width: "6em",
  height: "6em",
  borderRadius: "5rem",
  transition: "0.3s",
  opacity: prop.disabled ? 0.5 : 0.8,
  border: "none",
  outline: "none",
  ":hover": {
    opacity: prop.disabled ? 0.5 : 1,
    cursor: prop.disabled ? "" : "pointer"
  },
  "@media(max-width: 500px)": {
    width: "4em",
    height: "4em",
    margin: "0 1em"
  }
}));

const CardWrapper = styled.div<ICardWrapper>(props => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  height: "100%",
  textAlign: "center",
  "div:nth-child(1)": {
    gridColumn: props.currentId === 1 ? 2 : 1
  },
  "@media(max-width: 1024px)": {
    gridTemplateColumns: "1fr",
    width: "70%",
    justifySelf: "center",
    "div:nth-child(1)": {
      display: props.currentId === 1 ? "grid" : "none",
      gridColumn: 1
    },
    "div:nth-child(2)": {
      display: props.currentId === 1 ? "none" : "grid"
    },
    "div:nth-child(3)": {
      display: "none"
    }
  },
  "@media(max-width: 600px)": {
    width: "100%"
  }
}));

const LaunchSlider: React.FC<ILaunches> = ({ launches }) => {
  const [allLaunches, setAllLaunches] = useState<ISpaceXData[]>(launches);
  const [currentId, setCurrentId] = useState<number>(1);

  useEffect(() => {
    setAllLaunches(launches);
  }, [launches]);

  const launchesInView = () => {
    if (currentId === 1) {
      return allLaunches.slice(0, 2);
    }
    if (currentId === allLaunches.length) {
      return allLaunches.slice(currentId - 2, currentId);
    }
    return allLaunches.slice(currentId - 2, currentId + 1);
  };

  const onPrevClick = () => {
    setCurrentId(currentId - 1);
  };

  const onNextClick = () => {
    setCurrentId(currentId + 1);
  };
  return (
    <LaunchSliderWrapper>
      <SliderButton onClick={onPrevClick} disabled={currentId === 1}>
        <FontAwesomeIcon icon={faChevronLeft} size="3x" color="white" />
      </SliderButton>
      <CardWrapper currentId={currentId} launchId={launches.id}>
        {launchesInView().map((launch: ISpaceXData, i: number) => {
          return (
            <LaunchCard key={launch.id} launch={launch} currentId={currentId} />
          );
        })}
      </CardWrapper>
      <SliderButton
        onClick={onNextClick}
        disabled={currentId === allLaunches.length}
      >
        <FontAwesomeIcon icon={faChevronRight} size="3x" color="white" />
      </SliderButton>
    </LaunchSliderWrapper>
  );
};

export default LaunchSlider;
