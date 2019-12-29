import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function LineChart(props) {
  useEffect(() => {
    drawChart();
    window.addEventListener("resize", redraw);
    return () => {
      window.removeEventListener("resize", redraw);
    };
  });

  const redraw = () => {
    d3.select("#line-chart")
      .selectAll("g > *")
      .remove();
    drawChart();
  };

  const drawChart = () => {
    // const data1 = [
    //   { engine: "monday", number: 10 },
    //   { engine: "tuesday", number: 50 },
    //   { engine: "wednesday", number: 3 },
    //   { engine: "thursday", number: 22 },
    //   { engine: "friday", number: 60 }
    // ];
    console.log(props.statistics);
    let data = [props.statistics[2]];
    //  console.log(data);
    data = Object.entries(data[0]).map((key, value) => {
      return { engine: key[0], number: key[1] };
    });
    //  console.log(data);

    const svgWidth = window.innerWidth - 50;
    const svgHeight = 400;
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };

    const width = svgWidth - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#line-chart").select("svg");

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var max = d3.max(data, function(d) {
      return d.number;
    });

    const x = d3
      .scalePoint()
      .domain(
        data.map(function(d) {
          return d.engine;
        })
      )
      .range([0, width - 100]);
    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([height, 0]);

    x.domain(
      data.map(function(d) {
        return d.engine;
      })
    );

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("stroke", "white")
      .style("fill", "white")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("stroke", "white")
      .style("fill", "white")
      .call(d3.axisLeft(y))

      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-3.5em")
      .attr("text-anchor", "end")
      .attr("stroke", "white")
      .attr("fill", "white")
      .text("Rocket Engine Type");

    const myLine = d3
      .line()
      .x(d => x(d.engine))
      .y(d => y(d.number));

    // svg
    var path = g
      .append("g")
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "#ffa474")
      .attr("transform", "translate(0," + 0 + ")");

    var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(4000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  };

  return (
    <div id="line-chart">
      <svg width={props.width} height={props.height} />
    </div>
  );
}

export default LineChart;
