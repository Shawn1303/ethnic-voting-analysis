import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  {
    name: 'Representative',
    Republic: 70,
    Democratic: 30,
  },
  {
    name: 'Population',
    Republic: 51,
    Democratic: 49,
  }
];

export default class PartyDistributionBar extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="50%" height="93%">
        <BarChart
          width={300}
          height={300}
          data={data}
          margin={{top: 5, right: 30, left: 30, bottom: 5}} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis orientation="left" stroke="#black" tickFormatter={(value) => `${value}%`}/>
          <Tooltip />
          <Bar dataKey="Republic"> 
            {data.map((entry) => (
              <Cell fill={entry.Republic ? 'red' : 'blue'} />
            ))}
          </Bar>
          <Bar dataKey="Democratic"> 
            {data.map((entry) => (
              <Cell fill={entry.Democratic ? 'blue' : 'red'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}


