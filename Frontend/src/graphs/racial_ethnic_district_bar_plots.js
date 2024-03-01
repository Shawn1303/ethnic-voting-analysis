import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RacialBarPlots(){
  // dummy date
  const data = [
    { name:'District 75', white: 0.44, asian: 0.22, hispanic: 0.1, black: 0.15, nativeAmerican: 0.05, other: 0.04 },
    { name:'District 18', white: 0.35, asian: 0.18, hispanic: 0.12, black: 0.2, nativeAmerican: 0.05, other: 0.1 },
    { name:'District 3', white: 0.25, asian: 0.15, hispanic: 0.18, black: 0.3, nativeAmerican: 0.02, other: 0.1 },
    // Add more entries as needed
  ];

  return (
    // note: responseive container requires an outside div wrapper with width and height 
    <div style={{ width: '100%', height: 500, display: "inline-block", float: "right" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="white" stackId="a" fill="#FFD700" barSize={20} />
        <Bar dataKey="asian" stackId="a" fill="#00BFFF" barSize={20} />
        <Bar dataKey="hispanic" stackId="a" fill="#32CD32" barSize={20} />
        <Bar dataKey="black" stackId="a" fill="#FF69B4" barSize={20} />
        <Bar dataKey="nativeAmerican" stackId="a" fill="#FFA07A" barSize={20} />
        <Bar dataKey="other" stackId="a" fill="#87CEEB" barSize={20} />
        </BarChart>

    </ResponsiveContainer>
    </div>

  )
}


