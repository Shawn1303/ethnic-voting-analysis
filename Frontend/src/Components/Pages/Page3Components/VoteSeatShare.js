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
// import { VictoryChart, VictoryScatter, VictoryLine, VictoryTheme } from 'victory';

export default class VoteSeatShare extends PureComponent {
    calculateRegressionData() {
        const transformedData = data.map(item => [
            item[0].eur, 
            item[1].Dan_Cox
        ]);

        const result = regression.polynomial(transformedData);
        const regressionData = Array.from({ length: 100 }, (_, index) => {
            const x = index * 0.01;
            return {
                "eur": x + 0.01,
                redY: (result.equation[0]* Math.pow(x, 2) + result.equation[1] * x + result.equation[2]),  // Based on your commented calculation
            }// blueY: result.equation[0] * Math.pow(result.equation[1]+1, x + 1),
        });
        return regressionData;
    }
    

    render() {
        const flattenedData = data.map(entry => ({
            ...entry[0], // Spread the demographic data
            ...entry[1] // Spread the voting data
        }));
        const regressionData = this.calculateRegressionData();
        const newData = [...regressionData, ...flattenedData];
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

                    <XAxis dataKey="eur" type="number" label={{ value: 'white', position: 'bottom', offset: 0 }} />
                    <YAxis type="number" label={{ value: 'Vote Share', angle: -90, position: 'insideLeft' }} />
                    <Scatter name="Dan Cox" dataKey="Dan_Cox" fill="red" fillOpacity='0.3'/>
                    {/* <Scatter name="Cantwell" dataKey="Vote Share Cantwell" fill="blue" fillOpacity='0.3'/> */}
                    <Line type="monotone" dataKey="redY" stroke="red" dot={false}/>
                    {/* <Line type="monotone" dataKey="blueY" stroke="blue" dot={false}/> */}
                </ComposedChart>
            </ResponsiveContainer>
        );
    }
}
