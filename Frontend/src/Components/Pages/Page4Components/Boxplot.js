import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import { VerticalBox } from './VerticalBox';

const MARGIN = { top: 30, right: 30, bottom: 30, left: 50 };

export const Boxplot = ({ width, height, data }) => {
  // The bounds (= area inside the axis) is calculated by subtracting the margins from total width / height
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Compute everything derived from the dataset:
  const { chartMin, chartMax, buckets } = useMemo(() => {
    const values = data.flatMap(bucket => [bucket.min, bucket.q1, bucket.median, bucket.q3, bucket.max]);
    const chartMin = Math.min(...values);
    const chartMax = Math.max(...values);
    const buckets = data.map(bucket => ({
      ...bucket,
      district: bucket.district.toString() // Ensure district is treated as a categorical variable
    }));

    return { chartMin, chartMax, buckets };
  }, [data]);

  // Compute scales
  const yScale = d3
    .scaleLinear()
    .domain([chartMin, chartMax])
    .range([boundsHeight, 0]);

  const xScale = d3
    .scaleBand()
    .range([0, boundsWidth])
    .domain(buckets.map(d => d.district))
    .padding(0.25);

  // Build the box shapes
  const allShapes = buckets.map((bucket, i) => {
    const { min, q1, median, q3, max, district } = bucket;

    return (
      <g key={i} transform={`translate(${xScale(district)},0)`}>
        <VerticalBox
          width={xScale.bandwidth()}
          q1={yScale(q1)}
          median={yScale(median)}
          q3={yScale(q3)}
          min={yScale(min)}
          max={yScale(max)}
          stroke="black"
          fill={"#ead4f5"}
        />
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {allShapes}
          <AxisLeft yScale={yScale} pixelsPerTick={30} />
          {/* X axis uses an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom xScale={xScale} />
          </g>
        </g>
      </svg>
    </div>
  );
};
