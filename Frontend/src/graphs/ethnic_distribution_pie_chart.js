import { faBold } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, Label } from 'recharts';

export default function EthnicDistPieChart() {
	const data = [
		{ name: 'Asian', value: 0.1 },
		{ name: 'Black', value: 0.2 },
		{ name: 'Hispanic', value: 0.25 },
		{ name: 'White', value: 0.45 },
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
          value="Racial/Ethnic Distribution Within State Assembly"
          position='center'
          fill="brown"
          fontSize={12}
        />
      </Pie>
      <Tooltip />
      <Legend width={700} style={{width: 400}}/>
    </PieChart>
	</div>
	);
}
