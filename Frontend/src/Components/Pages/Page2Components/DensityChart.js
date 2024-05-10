import { useMemo } from "react";
import * as d3 from "d3";
import { AxisBottom } from "./AxisBottom";

const MARGIN = { top: 30, right: 10, bottom: 50, left: 10 };

export const DensityChart = ({ width, height, data }) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  console.log(data)
  const xScale = useMemo(() => {
    // Using a fixed domain for xScale as an example
    return d3.scaleLinear()
      .domain([0, 1000]) // Fixed domain
      .range([0, boundsWidth]);
  }, [width]);

  // Compute kernel density estimation
  const density = useMemo(() => {
    const kde = kernelDensityEstimator(kernelEpanechnikov(7), xScale.ticks(40));
    return kde(data);
  }, [xScale, data]);

  const yScale = useMemo(() => {
    const max = Math.max(...density.map(d => d[1]));
    return d3.scaleLinear()
      .range([boundsHeight, 0])
      .domain([0, max]);
  }, [density]);

  const path = useMemo(() => {
    const lineGenerator = d3.line()
      .x(d => {
        console.log('xScale input:', d[0], 'output:', xScale(d[0]));
        return xScale(d[0]);
      })
      .y(d => {
        console.log('yScale input:', d[1], 'output:', yScale(d[1]));
        return yScale(d[1]);
      })
      .curve(d3.curveBasis);
    return lineGenerator(density);
  }, [density, xScale, yScale]);

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
      >
        <path
          d={path}
          fill="#9a6fb0"
          opacity="0.4"
          stroke="black"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* X axis */}
        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottom xScale={xScale} pixelsPerTick={40} />
        </g>
      </g>
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
