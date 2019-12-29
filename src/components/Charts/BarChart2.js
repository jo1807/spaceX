import React, { useEffect } from "react";
import * as d3 from "d3";

function BarChart(props) {
  useEffect(() => {
    drawChart();
    window.addEventListener("resize", redraw);
    return () => {
      window.removeEventListener("resize", redraw);
    };
  });

  const redraw = () => {
    d3.select("#bar-chart")
      .selectAll("g > *")
      .remove();
    drawChart();
  };

  const drawChart = () => {
    let data = [props.statistics[0]];

    //console.log("data1", data);
    data = Object.entries(data[0]).map((key, value) => {
      return { year: key[0], value: key[1] };
    });
    console.log(data);

    const svg = d3.select("#bar-chart").select("svg"),
      innerW = window.innerWidth,
      margin = 150,
      width = innerW - margin,
      height = 400 - margin;
    const defs = svg.append("defs");

    let linearGradient = defs
      .append("linearGradient")
      .attr("id", "linear-gradient");

    linearGradient
      .attr("x1", "30%")
      .attr("y1", "30%")
      .attr("x2", "70%")
      .attr("y2", "70%");

    linearGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ffa474");

    //Set the color for the end (100%)
    linearGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8b0000");

    svg
      .append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-size", "24px")
      .attr("fill", "white");
    // .text("Number of Launches Per Year");

    var xScale = d3
        .scaleBand()
        .range([0, width])
        .padding(0.4),
      yScale = d3.scaleLinear().range([height, 0]);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    xScale.domain(
      data.map(function(d) {
        return d.year;
      })
    );
    yScale.domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      })
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("stroke", "white")
      .style("fill", "white")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", height - 250)
      .attr("x", width - 100)
      .attr("text-anchor", "end")
      .attr("stroke", "white");
    // .text("Year");

    g.append("g")
      .attr("stroke", "white")
      .style("fill", "white")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(function(d) {
            return d;
          })
          .ticks(10)
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "white")
      .attr("fill", "white")
      .text("Number of Launches");

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")

      .attr("x", function(d) {
        return xScale(d.year);
      })

      .attr("y", function(d) {
        return yScale(d.value);
      })
      .attr("width", xScale.bandwidth())
      .attr("y", yScale(0))
      .attr("height", 0)
      .transition()
      .ease(d3.easeBounce)
      .duration(1000)
      .delay(500)
      .attr("y", function(d) {
        return yScale(d.value);
      })
      .attr("height", function(d) {
        return height - yScale(d.value);
      })
      .style("fill", "url(#linear-gradient)");
  };

  return (
    <div id="bar-chart">
      <svg width={props.width} height={400} />
    </div>
  );
}

export default BarChart;
