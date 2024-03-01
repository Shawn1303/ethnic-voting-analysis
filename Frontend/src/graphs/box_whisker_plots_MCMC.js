import React, { useEffect, useState} from 'react';
import {VictoryChart,VictoryBoxPlot,VictoryAxis, VictoryScatter, VictoryLegend, VictoryLabel} from 'victory';

const BoxWhiskerPlotsMCMC = ({num_district}) => {
  const [data,setData] = useState(null)
  const [enaScatterData,setEnaScatterData] = useState(null)
  const [princetonScatterData,setPrincetonScatterData] = useState(null)
  const [democraticScatterData, setDemocraticScatterData] = useState(null)
  // assume input is sorted by median of y lists
  useEffect(()=> {
    if (num_district == 1){
      setData([
        { x: 1, y: [ 0.1, 0.2, 0.3, 0.5 ] },
        { x: 2, y: [ 0.3, 0.2, 0.8, 0.1 ] },
        { x: 3, y: [ 0.1, 0.3, 0.2, 0.4 ] },
        { x: 4, y: [ 0.3, 0.5, 0.5, 0.2 ] },
        { x: 5, y: [ 0.5, 0.3, 0.4, 0.7 ] },
        { x: 6, y: [ 0.2, 0.8, 0.6, 0.5 ] }
      ])
      setEnaScatterData([{x: 1, y: 0.1},{x: 2, y: 0.3},{x: 3, y: 0.29},{x: 4, y: 0.6},{x: 5, y: 0.55},{x: 6, y:  0.78}])
      setPrincetonScatterData([{x:1, y: 0.3},{x:2,y:0.4},{x:3,y:0.34},{x:4,y:0.4},{x:5,y:0.31},{x:6,y:0.5}])
      setDemocraticScatterData([{x: 1,y: 0.2},{x: 2,y: 0.3},{x: 3,y: 0.30},{x: 4,y: 0.5},{x: 5,y: 0.49},{x: 6,y:0.7}])
    } else {
      setData([  
        { x: 1, y: [ 0.25, 0.22, 0.1, 0.8 ] },
        { x: 2, y: [ 0.2, 0.15, 0.35, 0.57 ] },
        { x: 3, y: [ 0.6, 0.1, 0.22, 0.35 ] },
        { x: 4, y: [ 0.1, 0.4, 0.5, 0.3 ] },
        { x: 5, y: [ 0.3, 0.4, 0.5, 0.1 ] },
        { x: 6, y: [ 0.5, 0.6, 0.7, 0.55 ] }
      ])
      setEnaScatterData([{x: 1, y: 0.3},{x: 2, y: 0.1},{x: 3, y: 0.4},{x: 4, y: 0.5},{x: 5, y: 0.6},{x: 6, y:  0.9}])
      setPrincetonScatterData([{x:1,y:0.2},{x:2,y:0.15},{x:3,y:0.3},{x:4,y:0.55},{x:5,y:0.7},{x:6,y:0.3}])
      setDemocraticScatterData([{x: 1,y: 0.23},{x: 2,y: 0.3},{x: 3,y: 0.40},{x: 4,y: 0.57},{x: 5,y: 0.7},{x: 6,y: 0.6}])
    }
  },[num_district])

  const legendData = [
    // { name: 'Box Plot', symbol: { fill: 'blue' } },
    { name: 'Enacted', symbol: { fill: 'red' } },
    {name: 'Princeton', symbol: { fill: 'yellow'}},
    {name: "Democratic", symbol: {fill:"blue"}}
  ];

  return (
    <div style={{ width: '100%' }}>
      <VictoryChart title="Box Plot of Minority Group Percentages" >
        <VictoryLabel
          text="ReCom Ensemble"
          x={250} y={20} textAnchor="middle" style={{ fontSize: 18 }}
        />
        <VictoryAxis label="District" tickValues={data ? data.map((entry, index) => index + 1) : []}/>
        <VictoryAxis dependentAxis orientation="left" />
        <VictoryBoxPlot data={data} domain={{ x: [0, data?.length ? data.length + 1 : 1], y: [0, 1] }}/>
        {enaScatterData && (
          <VictoryScatter
            data={enaScatterData}
            style={{ data: { fill: 'red' } }} // Customize the style as needed
          />
        )}
        {princetonScatterData && (
          <VictoryScatter
            data = {princetonScatterData}
            style = {{data: { fill: 'yellow'}}}
          />
        )}
        {democraticScatterData && (
          <VictoryScatter
            data = {democraticScatterData}
            style = {{data: {fill: 'blue'}}}
          />
        )}
        <VictoryLegend
          x={100} // Adjust the x-coordinate for better positioning
          y={25} // Adjust the y-coordinate for better positioning
          orientation="horizontal"
          data={legendData}
          border={{ stroke: 'black', strokeWidth: 1 }} // Add border to the legend
        />
      </VictoryChart>
    </div>
  );
};

export default BoxWhiskerPlotsMCMC;