import React, { PureComponent } from 'react';
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
import data from "./merged_precinct_data_scatter_plot_maryland.json";

const raceMapping = {
    "demographicWhite": "eur",
    "demographicHispanicLatino": "hisp",
    "demographicBlack": "aa",
    "demographicAsian": "esa",
};

function calculateRegressionData(race) {
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
    console.log(resultR)
    const regressionData = Array.from({ length: 100 }, (_, index) => {
        const x = index * 0.01;
        return {
            [raceMapping[race]]: x + 0.01,
            redY: (resultR.equation[0]* Math.pow(x, 2) + resultR.equation[1] * x + resultR.equation[2]),  
            blueY: (resultD.equation[0]* Math.pow(x, 2) + resultD.equation[1] * x + resultD.equation[2]), 
        }
    });
    const filteredRegressionData = regressionData.filter(n => (n.redY >= 0 && n.redY <= 1) && (n.blueY >= 0 && n.blueY <= 1))
    // console.log(filteredRegressionData)
    return filteredRegressionData;
}

export default function PrecinctAnalysis(props) {
    // async function loadPrecinct(state) {
	// 	try {
	// 		const result = await axios.get(`http://localhost:8080/${mapOutline}?state=${state}`);
	// 		setDistrictplan(result.data);
	// 	} catch(error) {
	// 		alert(`Error fetching GeoJSON:${error}`);
	// 	}
	// }

	// useEffect(() => {
	// 	if(state && mapOutline) {
	// 		if(mapOutline !== "heatMapD") (async () => await loadDistrictPlan(state))();
	// 	} else {
	// 		setDistrictplan(null)
	// 	}
	// }, [state, mapOutline]);
    const regressionData = calculateRegressionData(props.race);
    const flattenedData = data.map(entry => ({
        ...entry[0], // Spread the demographic data
        ...entry[1] // Spread the voting data
    }));
    
    const newData = [...regressionData, ...flattenedData];
    const race = raceMapping[props.race];
    return (
        <ResponsiveContainer width="95%" height="90%">
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
