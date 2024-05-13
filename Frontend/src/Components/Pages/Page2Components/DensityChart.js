import { useMemo } from "react";
import * as d3 from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

const Legend = ({ colorScale, names, position }) => {
  const legendItemSize = 20; // size of the legend color box
  const spacing = 30; // spacing between legend items

  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      {names.map((name, index) => (
        <g transform={`translate(0, ${index * spacing})`}>
          <rect width={legendItemSize} height={legendItemSize} fill={colorScale(name)} />
          <text x={legendItemSize + 5} y={legendItemSize / 2} alignmentBaseline="middle" style={{ fontSize: '0.8em' }}>
            {name}
          </text>
        </g>
      ))}
    </g>
  );
};

const MARGIN = { top: 10, right: 10, bottom: 50, left: 60 };
const COLORS = ['#e0ac2b', '#e85252', '#6689c6', '#9a6fb0', '#a53253', 'green'];


export const DensityChart = ({ width, height, data }) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allGroupRace = data.data.map((group) => group.race);
  // console.log(allGroupRace)
  const colorScale = d3.scaleOrdinal().domain(allGroupRace).range(COLORS);
  // console.log(data)
  const xScale = useMemo(() => {
    // Using a fixed domain for xScale as an example
    return d3.scaleLinear()
      .domain([0, 1]) // Fixed domain
      .range([0, boundsWidth]);
  }, [width]);

  const densityGenerator = kernelDensityEstimator(kernelEpanechnikov(0.005), xScale.ticks(100));
  const densityData = data.data.map(group => ({
    name: group.race,
    density: densityGenerator(group.value),
  }));

  // const yScale = useMemo(() => {
  //   const max = Math.max(...density.map(d => d[1]));
  //   return d3.scaleLinear()
  //     .range([boundsHeight, 0])
  //     .domain([0, max]);
  // }, [densityData]);
  const yMax = Math.max(...densityData.flatMap(group => group.density.map(d => d[1])));
  const yScale = useMemo(() => d3.scaleLinear().domain([0, yMax]).range([boundsHeight, 0]), [yMax]);
  // const path = useMemo(() => {
  //   const lineGenerator = d3.line()
  //     .x(d => {
  //       console.log('xScale input:', d[0], 'output:', xScale(d[0]));
  //       return xScale(d[0]);
  //     })
  //     .y(d => {
  //       console.log('yScale input:', d[1], 'output:', yScale(d[1]));
  //       return yScale(d[1]);
  //     })
  //     .curve(d3.curveBasis);
  //   return lineGenerator(density);
  // }, [density, xScale, yScale]);
  const pathGenerator = d3.line().x(d => xScale(d[0])).y(d => yScale(d[1])).curve(d3.curveBasis);
  const allShapes = densityData.map((group, i) => (
    <path key={i} d={pathGenerator(group.density)} fill={colorScale(group.name)} opacity={0.4} stroke="black" strokeWidth={1} strokeLinejoin="round" />
  ));

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {allShapes}
        <AxisLeft yScale={yScale} pixelsPerTick={30} />
        
        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottom xScale={xScale} pixelsPerTick={40} />
          
        </g>
      </g>
      <Legend
          colorScale={colorScale}
          names={data.data.map(group => group.race)}
          position={{ x: boundsWidth + 20, y: 0 }}
        />
    </svg>
  );
};

// Kernel density estimator function
function kernelDensityEstimator(kernel, X) {
  return function (V) {
    return X.map(x => [x, d3.mean(V, v => kernel(x - v))]);
  };
}

// Epanechnikov kernel function
function kernelEpanechnikov(k) {
  return function (v) {
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
  };
}
