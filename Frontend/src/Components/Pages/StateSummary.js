import React, { useState } from 'react';
import StateMap from './Page1Components/Map/StateMap';
import StateAssemblyTable from './Page1Components/StateAssemblyTable';
import StateDataSummary from './Page1Components/StateSummary/StateDataSummary';
import EnsembleSummary from './Page1Components/EnsembleSummary';
import { Box, Grid } from '@mui/material';


export default function StateSummary(props) {
	const [district, setDistrict] = useState('');
	// console.log(district);
	return(
		<Box margin={'10px 1%'}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<StateMap 
						height = '85vh'
						state = {props.state} 
						districtplan={props.districtplan} 
						mapOutline={props.mapOutline} 
						race={props.race} 
						district={district} 
						setDistrict={setDistrict}
					/>
				</Grid>
				<Grid item xs={6} style={{maxHeight: '85vh', overflowY: 'auto'}}>
					<StateDataSummary state = {props.state}></StateDataSummary>
					<StateAssemblyTable state = {props.state} district={district} setDistrict={setDistrict}/>
					<EnsembleSummary state = {props.state}></EnsembleSummary>
				</Grid>	
			</Grid>
		</Box>
		
	)
}

