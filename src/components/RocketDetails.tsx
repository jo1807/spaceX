import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ICardWrapper {
  currentId: number;
  launchId: number;
}

interface IRocketDetailsProps {
  details: string;
  image: string;
  show: boolean;
  toggleShowModal: Function;
  currentId: number;
  launchId: number;
}

interface IRocketImage {
  src: string;
}

const RocketDetails: React.SFC<IRocketDetailsProps> = ({
  details,
  image,
  toggleShowModal,
  currentId,
  launchId
}) => {
  return (
    <CardWrapper currentId={currentId} launchId={launchId}>
      <CloseButtonWrapper onClick={() => toggleShowModal()}>
        <FontAwesomeIcon icon={faTimes} size="3x" color="white" />
      </CloseButtonWrapper>
      <ImageWrapper src={image} />
      <Details>{details}</Details>
    </CardWrapper>
  );
};

const CardWrapper = styled.div<ICardWrapper>(props => ({
  display: "grid",
  color: "black",
  height: "600px",
  backgroundColor: "white",
  borderRadius: "2.5em",
  transition: props.currentId === props.launchId ? "all 1s ease-out" : "",
  boxShadow:
    "0px 20px 25px -5px rgba(232,232,232,1), 0px 20px 20px -5px rgba(240,240,240,1)",
  opacity: props.currentId === props.launchId ? 1 : 0.7,
  transform: props.currentId === props.launchId ? "scale(0.9)" : "scale(0.8)"
}));

const ImageWrapper = styled.img({
  height: "300px",
  width: "100%",
  backgroundColor: "white",
  display: "grid",
  alignItems: "center",
  justifyItems: "center",
  borderRadius: "2.5em 2.5em 0 0 ",
  padding: "0"
});

const CloseButtonWrapper = styled.button({
  position: "absolute",
  border: "none",
  outline: "none",
  justifySelf: "end",
  background: "transparent",
  margin: "2em",
  ":hover": {
    cursor: "pointer"
  }
});

export const RocketImage = styled.img<IRocketImage>({
  width: "100%",
  height: "100%"
});

const Details = styled.p({
  height: "100%",
  overflow: "auto scroll",
  padding: "0em 3em",

  "@media(max-width: 500px)": {
    padding: "0em 1em"
  }
});

export default RocketDetails;
