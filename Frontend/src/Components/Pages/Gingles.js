import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import VoteSeatShare from './Page3Components/VoteSeatShare';
import GinglesTable from './Page3Components/GinglesTable'

export default function StateSummary(props) {
    
	return(
		<Box margin={'10px 1%'}>
			<Grid container spacing={1}>
				<Grid item xs={7} style={{minHeight: '85vh', overflowY: 'auto'}}>
					<VoteSeatShare />
				</Grid>
				<Grid item xs={5} style={{minHeight: '85vh', overflowY: 'auto'}}>
					<GinglesTable state={props.state}/>
				</Grid>	
			</Grid>
		</Box>
		
	)
}

