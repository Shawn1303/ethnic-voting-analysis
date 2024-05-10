import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import VoteSeatShare from './Page3Components/VoteSeatShare';


export default function StateSummary(props) {
    
	return(
		<Box margin={'10px 1%'}>
			<Grid container spacing={1}>
				<Grid item xs={9} style={{minHeight: '85vh', overflowY: 'auto'}}>
					<VoteSeatShare />
				</Grid>
				<Grid item xs={3} style={{minHeight: '85vh', overflowY: 'auto'}}>
					<p>help</p>
				</Grid>	
			</Grid>
		</Box>
		
	)
}

