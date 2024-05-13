import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import StateMap from './Page1Components/Map/StateMap';
// import EnsembleSummary from './Page4Components/EnsembleSummary';
import data from './Page4Components/boxplot/box_whiskers_afampop.json';
import { Boxplot } from './Page4Components/Boxplot';



export default function Ensemble(props) {
	
	// async function getBoxPlot(state, race, ensemblePlan) {
	// 	try {
	// 		const result = await axios.get(`http://localhost:8080/ep?${ensemblePlan}race=${race}&state=${state}`);
	// 		setEnsemblePlan(result.data);
	// 	} catch(error) {
	// 		alert(`Error fetching GeoJSON:${error}`);
	// 	}
	// }
	// useEffect(() => {
	// 	if(props.state && props.race && selectEP) {
	// 		(async () => await getBoxPlot(props.state, props.race, selectEP))();
	// 		setEnsemblePlan(stateSum)
	// 	} else {
	// 		setEnsemblePlan(null)
	// 	}
	// }, [props.state, props.race, selectEP]);
    
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
                    {/* <EnsembleSummary state = {props.state}/>
                    <EnsembleSummary state = {props.state}/> */}
				</Grid>	
                <Grid item xs={12} style={{height: '40vh', overflowY: 'auto'}}>
                    <Boxplot data={data.buckets} width={1500} height={300} />
				</Grid>	
			</Grid>
		</Box>
		
	)
}
