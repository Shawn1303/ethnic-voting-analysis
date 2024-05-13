import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import PrecinctAnalysisMD from './Page3Components/PrecinctAnalysisMD';
import PrecinctAnalysisVA from './Page3Components/PrecinctAnalysisVA';
import PrecinctAnalysisTable from './Page3Components/GinglesTable'

export default function Gingles(props) {
    
	return(
		<Box margin={'10px 1%'}>
			<Grid container spacing={1}>
				<Grid item xs={12} style={{minHeight: '85vh', overflowY: 'auto'}}>
					{props.state === 'va' && <PrecinctAnalysisVA state={props.state} race={props.race}/>}
					{props.state === 'md' && <PrecinctAnalysisMD state={props.state} race={props.race}/>}
				</Grid>
				{/* <Grid item xs={5} style={{minHeight: '85vh', overflowY: 'auto'}}>
					<PrecinctAnalysisTable state={props.state} race={props.race} precinct={props.precinct} setPrecinct={props.setPrecinct} page={props.page}/>
				</Grid>	 */}
			</Grid>
		</Box>
		
	)
}

