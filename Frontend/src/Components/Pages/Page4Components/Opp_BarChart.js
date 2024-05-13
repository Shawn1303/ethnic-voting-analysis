import React from 'react';
import { BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function OppBarChart(props){
  const barColors = ["#dc3545", "#007bff", "#fd7e14", "grey"]
//   console.log(Object.entries(props.data.opp_dist_freq).map(([key, val]) => ({
// 	key, val
// })))
//   console.log(props.data)
  const data = Object.entries(props.data.opp_dist_freq).map(([key, val]) => ({
	key, val
}))
  const race_names = {
	'afampop': 'African American',
	'hisppop': 'Hispanic',
	'seasianpop': 'Asian'
  }
//   console.log(data)
// race_names[props.data.race]
  return (
	<div>
		<h2 style={{ textAlign: 'center' }}>{race_names[props.data.race]}</h2>
		<ResponsiveContainer width="100%" height={200}>
		<BarChart
			width={300}
			height={300}
			data={data}
			margin={{top: 5, right: 30, left: 30, bottom: 20}} 
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="key" label={{ value: 'Number of Opportunity Distrists', dy: 20 }}/>
			<YAxis stroke="#black" tickFormatter={(value)=> Intl.NumberFormat('en-US', { style: 'decimal' }).format(value)}
			label={{ value: 'Frequency', angle: -90, dx: -25 }}/>
			<Tooltip />
			<Bar dataKey="val"> 
			{
			data.map((entry, index) => (
				<Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
			))
			}
			</Bar>
		</BarChart>
		</ResponsiveContainer>
	</div>
  );
}