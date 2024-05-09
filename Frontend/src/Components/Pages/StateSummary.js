import React from 'react';
import StateMap from './Page1Components/StateMap';
import EnsembleSummary from './Page1Components/EnsembleSummary';
import StateAssemblyTable from './Page1Components/StateAssemblyTable';
import StateDataSummary from './Page1Components/StateSummary/StateDataSummary';
import { Box, Grid } from '@mui/material';


export default function StateSummary(props) {
	return(
		<Box margin={'10px 1%'}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<StateMap state = {props.state} districtplan={props.districtplan} mapOutline={props.mapOutline} race={props.race}/>
				</Grid>
				<Grid item xs={6} style={{maxHeight: '85vh', overflowY: 'auto'}}>
					<StateDataSummary state = {props.state}></StateDataSummary>
					<StateAssemblyTable state = {props.state}></StateAssemblyTable>
					<EnsembleSummary state = {props.state}></EnsembleSummary>
				</Grid>	
			</Grid>
		</Box>
		
	)
}

