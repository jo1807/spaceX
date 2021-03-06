import React from "react";

import BarChart from "./BarChart2";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

function Charts(props:any) {
  const width = window.innerWidth;
  return (
    <>
      <LineChart height={"400px"} width={width} statistics={props.statistics} />

      <BarChart height={"400px"} width={width} statistics={props.statistics} />

      <PieChart height={"400px"} width={width} statistics={props.statistics} />
    </>
  );
}

export default Charts;
