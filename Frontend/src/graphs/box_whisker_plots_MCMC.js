import React from 'react';
import {VictoryChart,VictoryBoxPlot,VictoryAxis} from 'victory';
const BoxWhiskerPlotsMCMC = () => {
  const generateRandomNumbers = () => Array.from({ length: 10 }, () => Math.random());
  const dataArray = Array.from({ length: 47 }, (_, i) => ({ x: i + 1, y: generateRandomNumbers() }));

  return (
    <div style={{ height: "50vh" }}>
      <VictoryChart height={300} width={1000} domainPadding={{ x: 10 }} title="Box Plot of Minority Group Percentages">
        <VictoryAxis // Horizontal (x) axis
          label="District" // Label for the x-axis
          scale={{ x: "ordinal" }}
          tickValues={dataArray.map(item => item.x)}
          tickFormat={dataArray.map(item => `${item.x}`)} // Customize the labels as needed
        />
        <VictoryAxis
          dependentAxis
          tickValues={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} // Add your desired tick values
          tickFormat={tick => `${tick.toFixed(1)}`} // Customize the tick format
        />
        <VictoryBoxPlot
          boxWidth={10}
          data = {dataArray}
          style={{
            min: { stroke: "blue", strokeWidth: 2, fill: "lightblue" },
            max: { stroke: "green", strokeWidth: 2, fill: "lightgreen" },
            q1: { fill: "orange" }, 
            q3: { fill: "purple" },
            median: { stroke: "red", strokeWidth: 2 }, 
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default BoxWhiskerPlotsMCMC;