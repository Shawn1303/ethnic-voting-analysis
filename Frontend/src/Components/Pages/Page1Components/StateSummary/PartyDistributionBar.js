import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function PartyDistributionBar(props){
  const barColors = ["#dc3545", "#007bff", "#fd7e14", "grey"]

  return (
    <ResponsiveContainer width="100%" height="93%">
      <BarChart
        width={300}
        height={300}
        data={props.stateSummary[3]}
        margin={{top: 5, right: 30, left: 30, bottom: 5}} 
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="party" />
        <YAxis stroke="#black" tickFormatter={(value)=> Intl.NumberFormat('en-US', { style: 'decimal' }).format(value)}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="votes"> 
        {
          props.stateSummary[3].map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
          ))
        }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}



