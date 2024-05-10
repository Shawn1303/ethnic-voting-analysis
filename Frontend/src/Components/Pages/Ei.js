import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { DensityChart } from "./Page2Components/DensityChart";
import {data} from './Page2Components/data';

// const data = [
// 	75.0,
// 	104.0,
// 	369.0,
// 	300.0,
// 	92.0
// ]
export default function Ei(props) {
    
	return(
		<Box margin={'10px 1%'}>
			<Grid container spacing={1}>
				<Grid item xs={12} style={{height: '40vh', overflowY: 'auto'}}>
                    <DensityChart width={1200} height={300} data={data} />
				</Grid>
				<Grid item xs={12} style={{height: '40vh', overflowY: 'auto'}}>
					<DensityChart width={1200} height={300} data={data} />
				</Grid>	
			</Grid>
		</Box>
	)
}

