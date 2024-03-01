import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, Label } from 'recharts';

export default function EthnicDistPieChart() {
	const data = [
		{ name: 'Category A', value: 400 },
		{ name: 'Category B', value: 300 },
		{ name: 'Category C', value: 300 },
		{ name: 'Category D', value: 200 },
	];

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Define an array of colors

	
	return (
		<div style={{ height: 500, width: '100%' }}>
		<PieChart width={400} height={400} style={{ height: 400, width: '100%' }}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
      >
        {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))
        }
		<Label
          value="Test"
          position='center'
          fill="#ff1d24"
          fontSize={20}
        />
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
	</div>
	);
}
