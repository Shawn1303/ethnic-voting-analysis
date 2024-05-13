import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RacialDistributionBar(props){
  const filteredData = props.stateSummary[1].filter(item => item.Representative !== 0 && item.Population !== 0);
    return (
      <ResponsiveContainer width="100%" height="93%">
        <BarChart
          width={50}
          height={100}
          data={filteredData}
          margin={{top: 5, bottom: 5}} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="race" />
          <YAxis yAxisId="left" orientation="left" stroke="#F4911E" tickFormatter={(value)=> Intl.NumberFormat('en-US', { style: 'decimal' }).format(value)}/>
          <YAxis yAxisId="right" orientation="right" stroke="#002D62" tickFormatter={(value)=> Intl.NumberFormat('en-US', { style: 'decimal' }).format(value)}/>
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="Representative" fill="#F4911E"/>
          <Bar yAxisId="right" dataKey="Population" fill="#002D62 "/>
        </BarChart>
      </ResponsiveContainer>
    );
}



