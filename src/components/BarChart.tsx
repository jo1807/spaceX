import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import { select, Selection } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";


interface IChartProps {
  statistics: Array<object>;
}

const GraphWrapper = styled.div({
  width: "100%",
  height: "500px",
  display: "grid",
  alignItems: "center",
  justifyItems: "center",
  paddingTop: "50px"
});

const BarChartWrapper = styled.div({
  width: "500px",
  maxHeight: "500px"
});

const BarChart: React.FC<IChartProps> = ({ statistics }) => {
  const [data, setTest] = useState([{ name: "", units: 0 }]);
  const dimensions = {
    width: 400,
    height: 600,
    marginLeft: 100,
    marginBottom: 100,
    chartHeight: 500,
    chartWidth: 300
  };
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const y = scaleLinear()
    .domain([0, max(data, d => d.units)!])
    .range([dimensions.chartHeight, 10]);

  const x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, dimensions.width - dimensions.marginLeft])
    .padding(0.1);

  const xAxis = axisBottom(x);
  const yAxis = axisLeft(y)
    .ticks(3)
    .tickFormat(d => `${d} launches`);

  const redraw = () => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      const xAxisGroup = selection
        .append("g")
        .attr(
          "transform",
          `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`
        )
        .call(xAxis);

      xAxisGroup
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .attr("text-anchor", "end")
        .attr("font-size", "15px");

      const yAxisGroup = selection
        .append("g")
        .attr("transform", `translate(${dimensions.marginLeft}, 0)`)
        .call(yAxis);

      const charts = selection
        .append("g")
        .attr("transform", `translate(${dimensions.marginLeft}, 0)`)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", x.bandwidth)
        .attr("height", d => dimensions.chartHeight - y(d.units))
        .attr("x", d => x(d.name)!)
        .attr("y", d => y(d.units))
        .attr("fill", "orange");
    }
  };
  useEffect(() => {
    redraw();
  }, [selection]);

  useEffect(() => {
    const graphData: any = [];
    const entries = Object.entries(statistics[0] || []);
    entries.forEach(entry => {
      graphData.push({ name: entry[0], units: entry[1] });
    });
    setTest(graphData);
  }, [statistics]);

  return (
    <GraphWrapper>
      <BarChartWrapper id={"barChart"}>
        <svg
          id={"graph1"}
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          color={"orange"}
        />
      </BarChartWrapper>
    </GraphWrapper>
  );
};

export default BarChart;
