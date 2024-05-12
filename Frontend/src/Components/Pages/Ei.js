import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DensityChart } from "./Page2Components/DensityChart";
import data from './Page2Components/combined_data.json'

export default function Ei(props) {
    
	return(
		<Box margin={'10px 1%'}>
			{ props.state &&
				<>
				<Typography style={{ transform: [{ rotate: "90deg" }]}}>Probability Density</Typography>
				<Grid container spacing={1}>
					<Grid item xs={12} style={{height: '29vh', overflowY: 'auto'}}>
						<DensityChart width={1200} height={220} data={data[0]} />
					</Grid>
					<Grid item xs={12} style={{height: '29vh', overflowY: 'auto'}}>
						<DensityChart width={1200} height={220} data={data[2]} />
					</Grid>	
					<Grid item xs={12} style={{height: '29vh', overflowY: 'auto'}}>
						<DensityChart width={1200} height={220} data={data[5]} />
					</Grid>	
				</Grid></>
			}
		</Box>
	)
}

