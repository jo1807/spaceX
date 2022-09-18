import React from "react";

import BarChart from "./BarChart2";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

interface IChartsProps {
  statistics: object[]
}

function Charts({ statistics }:IChartsProps) {
  const width = window.innerWidth;
  const height = '400px';
  return (
    <>
      <LineChart height={height} width={width} statistics={statistics} />

      <BarChart height={height} width={width} statistics={statistics} />

      <PieChart height={height} width={width} statistics={statistics} />
    </>
  );
}

export default Charts;
