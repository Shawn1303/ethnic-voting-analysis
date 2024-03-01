import React from 'react';
import {VictoryChart,VictoryBoxPlot,VictoryAxis, VictoryScatter, VictoryLegend} from 'victory';

const BoxWhiskerPlotsMCMC = () => {
  const generateRandomNumbers = (start) =>
  Array.from({ length: 10 }, (_, i) => Math.random() * 0.35 + start);

  const dataArray = Array.from({ length: 47 }, (_, i) => ({
    x: i + 1,
    y: generateRandomNumbers(Math.random() * 0.3 + i * 0.010),
  }));
  
  // Calculate quartiles for box plot data
  const q1 = dataArray.map(item => Math.min(...item.y));
  const q3 = dataArray.map(item => Math.max(...item.y));
  
  const randomEnactedData = Array.from({ length: 47 }, (_, i) => ({
    x: i + 1,
    y: Math.random() * (q3[i] - q1[i]) + q1[i],
  }));
  
  const randomPrincetonData = Array.from({ length: 47 }, (_, i) => ({
    x: i + 1,
    y: Math.random() * (q3[i] - q1[i]) + q1[i],
  }));
  
  const randomDemocraticData = Array.from({ length: 47 }, (_, i) => ({
    x: i + 1,
    y: Math.random() * (q3[i] - q1[i]) + q1[i],
  }));
    
    const legendData = [
      { name: 'Box Plot', symbol: { type: 'square', fill: 'black' } },
      { name: 'Enacted', symbol: { type: 'circle', fill: 'red' } },
      { name: 'Princeton', symbol: { type: 'circle', fill: 'orange' } },
      { name: 'Democratic', symbol: { type: 'circle', fill: 'blue' } },

    ];

  return (
    <div style={{ height: "50vh"}}>
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
          boxWidth={7}
          data = {dataArray}
          style={{
            min: { stroke: "black", strokeWidth: 0.5, fill: "white" },
            max: { stroke: "black", strokeWidth: 0.5 },
            q1: { stroke: "black", strokeWidth: 0.5, fill: "white" },
            q3: { stroke: "black",fill: "white", strokeWidth: 0.5},
            median: { stroke: "black", strokeWidth: 0.5 },
          }}
        />
        <VictoryScatter
          data={randomEnactedData}
          style={{ data: { fill: "red" } }}
          size={2}
        />
        <VictoryScatter
          data={randomPrincetonData}
          style={{ data: { fill: "orange" } }}
          size={2}
        />
        <VictoryScatter
          data={randomDemocraticData}
          style={{ data: { fill: "blue" } }}
          size={2}
        />

        <VictoryLegend
          x={750}
          y={10}
          orientation="horizontal"
          gutter={10}
          data={legendData}
        />
      </VictoryChart>
    </div>
  );
};

export default BoxWhiskerPlotsMCMC;