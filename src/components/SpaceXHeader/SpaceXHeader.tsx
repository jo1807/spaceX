import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

import logo from "../../images/spacex.png";

export interface ISpaceXHeaderProps {
  handleShowStatisticsModal: () => void;
  hasStatistics: boolean;
}

const SpaceXHeader = ({hasStatistics, handleShowStatisticsModal }:ISpaceXHeaderProps) => 
  (
    <HeaderWrapper>
      <LogoWrapper>
        <img alt={"logo"} src={logo} height={"100px"} width={"100%"}/>
      </LogoWrapper>
      {hasStatistics && (
        <ChartButton onClick={() => handleShowStatisticsModal()}>
          <FontAwesomeIcon icon={faChartBar} size="2x" color="white" />
        </ChartButton>
      )} 
    </HeaderWrapper>
  );

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

const ChartButton = styled.button({
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
  border: 'none',
  focus: 'none',
  outline: 'none',
  ":hover": {
    backgroundColor: "#E82C2C",
    cursor: "pointer"
  },
  "@media(max-width: 750px)": {
    width: "90%",
    marginRight: "1em"
  }
});

export default SpaceXHeader;
