import { useMemo } from "react";
import * as d3 from "d3";

const TICK_LENGTH = 6;

export const AxisLeft = ({ yScale, pixelsPerTick }) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map(value => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale, pixelsPerTick]);

  return (
    <>
      {/* Main vertical line */}
      <path
        d={`M 0 ${range[0]} L 0 ${range[1]}`}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2={-TICK_LENGTH} stroke="currentColor" />
          <text
            style={{
              fontSize: "10px",
              textAnchor: "end",
              transform: "translateX(-10px)"
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};
