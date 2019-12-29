import React, { useEffect } from "react";
import * as d3 from "d3";

function PieChart(props) {
  useEffect(() => {
    drawChart();
    window.addEventListener("resize", redraw);
    return () => {
      window.removeEventListener("resize", redraw);
    };
  });

  const redraw = () => {
    d3.select("#pie-chart")
      .selectAll("g > *")
      .remove();
    drawChart();
  };

  const drawChart = () => {
    // const data1 = [
    //   { value: 60, name: "red" },
    //   { value: 50, name: "blue" },
    //   { value: 10, name: "green" }
    // ];

    console.log(props.statistics[4]);
    let data = [props.statistics[4]];
    //  console.log(data);
    data = Object.entries(data[0]).map((key, value) => {
      return { value: key[1], name: key[0] };
    });

    const innerW = window.innerWidth - 50;
    const margin = 100;
    const size = innerW - margin;
    const fourth = size / 4;
    const half = size / 2;
    const labelOffset = fourth * 1.4;
    const total = data.reduce((acc, cur) => acc + cur.value, 0);

    const chart = d3
      .select("#pie-chart")
      .select("svg")
      .style("width", "100%")
      .style("margin", "30")
      .attr("height", 1000)
      .attr("width", 1000);

    const plotArea = chart
      .append("g")
      .attr("transform", `translate(${half}, ${half})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.value))
      .range(d3.schemeCategory10);

    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.value);

    const arcs = pie(data);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(fourth);

    const arcLabel = d3
      .arc()
      .innerRadius(labelOffset)
      .outerRadius(labelOffset);

    plotArea
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      //.attr("stroke", "white")
      .attr("d", arc)
      .attr("fill", "black")
      .transition()
      .delay(function(d, i) {
        return i * 800;
      })
      .duration(500)
      .attrTween("d", function(d) {
        var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        };
      })
      .attr("fill", d => color(d.data.value));

    const labels = plotArea
      .selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .style("text-anchor", "middle")
      .style("alignment-baseline", "middle")
      .style("font-size", "0.5em")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`);

    labels
      .append("tspan")
      // .attr("margin-left", "10em")
      .attr("y", "-0.6em")
      .attr("x", "8em")
      .style("font-weight", "bold")
      .style("font-size", "0.6rem")
      .style("fill", "white")
      .text(d => `${d.data.name}`);

    labels
      .append("tspan")
      .attr("y", "0.6em")
      .attr("x", "8em")
      .style("fill", "white")
      .style("font-size", "0.7rem")
      .text(
        d => `${d.data.value} (${Math.round((d.data.value / total) * 100)}%)`
      );
  };

  return (
    <div id="pie-chart">
      <svg width={props.width} height={props.height} />
    </div>
  );
}

export default PieChart;
