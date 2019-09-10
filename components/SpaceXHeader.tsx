import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

import logo from "../images/spacex.png";

interface ISpaceXHeaderProps {
  handleShowStatisticsModal: Function;
}

const HeaderWrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "2fr 1fr"
});

const LogoWrapper = styled.div({
  marginLeft: "1em",
  display: "grid",
  height: "100px",
  "@media(min-width: 860px)": {
    "img:nth-child(1)": {
      margin: "0 5em 2em 0em",
      objectFit: "cover",
      width: "60%"
    }
  }
});

const GraphButton = styled.div({
  backgroundColor: "#FA3E3E",
  width: "50%",
  margin: "1.5em 2em 0em 0em",
  height: "65%",
  opacity: 0.8,
  justifySelf: "end",
  borderRadius: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr",
  alignItems: "center",
  justifyItems: "center",
  ":hover": {
    backgroundColor: "#E82C2C",
    cursor: "pointer"
  },
  "@media(max-width: 750px)": {
    width: "90%",
    marginRight: "1em"
  }
});

const SpaceXHeader: React.FC<ISpaceXHeaderProps> = ({
  handleShowStatisticsModal
}) => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img src={logo} height={"100px"} width={"100%"} />
      </LogoWrapper>
      <GraphButton onClick={() => handleShowStatisticsModal()}>
        <FontAwesomeIcon icon={faChartBar} size="2x" color="white" />
      </GraphButton>
    </HeaderWrapper>
  );
};

export default SpaceXHeader;
