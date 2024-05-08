import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'WHITE',
    rep: 70,
    pop: 2279,
  },
  {
    name: 'BLACK',
    rep: 25,
    pop: 2,
  },
  {
    name: 'ASIAN',
    rep: 3,
    pop: 10,
  },
  {
    name: 'HISPANICLATINO',
    rep: 2,
    pop: 42,
  }
];

export default class RacialDistributionBar extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="100%" height="95%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="rep" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar yAxisId="right" dataKey="pop" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}


