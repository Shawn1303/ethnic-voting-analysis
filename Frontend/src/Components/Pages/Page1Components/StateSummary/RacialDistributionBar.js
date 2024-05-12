import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'White',
//     Representative: 70,
//     Population: 2279,
//   },
//   {
//     name: 'Black/African American',
//     Representative: 25,
//     Population: 2,
//   },
//   {
//     name: 'Asian',
//     Representative: 3,
//     Population: 10,
//   },
//   {
//     name: 'Hispanic/Latino',
//     Representative: 2,
//     Population: 42,
//   }
// ];

export default function RacialDistributionBar(props){

    return (
      <ResponsiveContainer width="100%" height="93%">
        <BarChart
          width={50}
          height={100}
          data={props.stateSummary[1]}
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



