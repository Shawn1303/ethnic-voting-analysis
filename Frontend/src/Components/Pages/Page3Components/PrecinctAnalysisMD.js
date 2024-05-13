import React, { PureComponent, useState, useEffect } from 'react';
import axios from 'axios';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import regression from "regression";
import md from "./merged_precinct_data_scatter_plot_maryland.json";
import va from "./va_precinct_scatter_plot_data.json"

const raceMapping = {
    "demographicWhite": "eur",
    "demographicHispanicLatino": "hisp",
    "demographicBlack": "aa",
    "demographicAsian": "esa",
};

function calculateRegressionData(race, data) {
        const r = raceMapping[race];
        const transformedDataR = data.map(item => [
            item[0][r], 
            item[1].Dan_Cox
        ]);
    const transformedDataD = data.map(item => [
        item[0][r], 
        item[1].Wes_Moore
    ]);

    const resultR = regression.polynomial(transformedDataR);
    const resultD = regression.polynomial(transformedDataD);
    const regressionData = Array.from({ length: 100 }, (_, index) => {
        const x = index * 0.01;
        return {
            [raceMapping[race]]: x + 0.01,
            redY: (resultR.equation[0]* Math.pow(x, 2) + resultR.equation[1] * x + resultR.equation[2]),  
            blueY: (resultD.equation[0]* Math.pow(x, 2) + resultD.equation[1] * x + resultD.equation[2]), 
        }
    });
    const filteredRegressionData = regressionData.filter(n => (n.redY >= 0 && n.redY <= 1) && (n.blueY >= 0 && n.blueY <= 1))
    return filteredRegressionData;
}

export default function PrecinctAnalysis(props) {
    const [pData, setPData] = useState([]);
    
    // useEffect
    // if(props.state === 'md'){
    //     setPData(md);
    // }else if(props.state === 'va'){
    //     setPData(va)
    // }
    
    useEffect(() => {
        if(props.state === 'md'){
            setPData(md);
        }else if(props.state === 'va'){
            setPData(va)
        }
        }, [props.state, pData]);
    // const [newData, setNewData] = useState([]);

    // async function loadPrecinct(state) {
	// 	try {
	// 		const result = await axios.get(`http://localhost:8080/gingles?state=${state}`);
	// 		setPData(result.data);           
	// 	} catch(error) {
	// 		alert(`Error fetching GeoJSON:${error}`);
	// 	}
	// }

	// useEffect(() => {
	// 	if(!pData) {
	// 		loadPrecinct(props.state)();
	// 	} 
	// }, [props.state, pData]);
    
    const race = raceMapping[props.race];
    // if (pData) {
        const regressionData = calculateRegressionData(props.race, pData);
        const flattenedData = pData.map(entry => ({
            ...entry[0], // Check that each entry has at least two indices
            ...entry[1]
        }));
        const newData = [...regressionData, ...flattenedData];
    // }
    
    
    
    return (
        <ResponsiveContainer width="95%" height="90%">
            <h2>Maryland Governor's Race: 2022 Election</h2>
            <ComposedChart
                width={500}
                height={400}
                data={newData}
                margin={{ top: 50, right: 0, bottom: 20, left: 20 }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <Tooltip />
                <Legend verticalAlign="top" align="center" />

                <XAxis dataKey={race} type="number" label={{ value: "Percent", position: 'bottom', offset: 0 }} tickFormatter={(tick)=> `${tick*100}%`} />
                <YAxis type="number" label={{ value: 'Vote Share', angle: -90, position: 'insideLeft' }} 
                        ticks={[0, 0.25, 0.50, 0.75, 1]} domain={[0, 1]} scale={"auto"} tickFormatter={(tick)=> `${tick*100}%`}/>
                <Scatter name="Dan Cox" dataKey="Dan_Cox" fill="red" fillOpacity='0.1' isAnimationActive={false}/>
                <Scatter name="Wes Moore" dataKey="Wes_Moore" fill="blue" fillOpacity='0.1' isAnimationActive={false}/>
                <Line strokeWidth="5" type="monotone" dataKey="redY" stroke="red" dot={false} isAnimationActive={false}/>
                <Line strokeWidth="5" type="monotone" dataKey="blueY" stroke="blue" dot={false} isAnimationActive={false}/>
            </ComposedChart>
        </ResponsiveContainer>
    );
}
