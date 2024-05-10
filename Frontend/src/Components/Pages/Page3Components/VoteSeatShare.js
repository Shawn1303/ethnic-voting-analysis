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
import data from "./gingles.json";
// import { VictoryChart, VictoryScatter, VictoryLine, VictoryTheme } from 'victory';

export default class VoteSeatShare extends PureComponent {
    calculateRegressionData() {
        const transformedData = data.map(item => [
            item["Percent Latino"], 
            item["Vote Share Cantwell"]
        ]);

        const result = regression.exponential(transformedData);
        const regressionData = Array.from({ length: 100 }, (_, x) => ({
            "Percent Latino": x + 1,
            redY: 100 - (result.equation[0]* Math.pow(result.equation[1]+1, x + 1)),  // Based on your commented calculation
            blueY: result.equation[0] * Math.pow(result.equation[1]+1, x + 1),
        }));

        return regressionData;
    }

    render() {
        const regressionData = this.calculateRegressionData();
        const newData = [...regressionData, ...data];
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

                    <XAxis dataKey="Percent Latino" type="number" label={{ value: 'Percent Latino', position: 'bottom', offset: 0 }} />
                    <YAxis type="number" label={{ value: 'Vote Share', angle: -90, position: 'insideLeft' }} />
                    <Scatter name="Baumgartner" dataKey="Vote Share Baumgartner" fill="red" fillOpacity='0.3'/>
                    <Scatter name="Cantwell" dataKey="Vote Share Cantwell" fill="blue" fillOpacity='0.3'/>
                    <Line type="monotone" dataKey="redY" stroke="red" dot={false}/>
                    <Line type="monotone" dataKey="blueY" stroke="blue" dot={false}/>
                </ComposedChart>
            </ResponsiveContainer>
        );
    }
}
