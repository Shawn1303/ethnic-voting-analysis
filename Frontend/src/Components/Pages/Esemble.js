import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import StateMap from './Page1Components/Map/StateMap';
import EnsembleSummary from './Page4Components/EnsembleSummary';
import { data } from './Page4Components/data';
import { Boxplot } from './Page4Components/Boxplot';
export default function Ensemble(props) {
    
	return(
		<Box margin={'10px 1%'}>
			<Grid container spacing={1}>
				<Grid item xs={6} style={{height: '40vh', overflowY: 'auto'}}>
					<StateMap 
                        height='39vh'
                        state = {props.state} 
						districtplan={props.districtplan} 
						mapOutline={props.mapOutline} 
                    />
				</Grid>
				<Grid item xs={6} style={{height: '40vh', overflowY: 'auto'}}>
                    <EnsembleSummary state = {props.state}/>
                    <EnsembleSummary state = {props.state}/>
				</Grid>	
                <Grid item xs={12} style={{height: '40vh', overflowY: 'auto'}}>
                    <Boxplot data={data} width={700} height={400} />
				</Grid>	
			</Grid>
		</Box>
		
	)
}
