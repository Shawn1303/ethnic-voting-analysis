import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'White',
    Representative: 70,
    Population: 2279,
  },
  {
    name: 'Black/African American',
    Representative: 25,
    Population: 2,
  },
  {
    name: 'Asian',
    Representative: 3,
    Population: 10,
  },
  {
    name: 'Hispanic/Latino',
    Representative: 2,
    Population: 42,
  }
];

export default class RacialDistributionBar extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="95%" height="93%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{top: 5, right: 30, left: 30, bottom: 5}} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="Representative" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar yAxisId="right" dataKey="Population" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}


