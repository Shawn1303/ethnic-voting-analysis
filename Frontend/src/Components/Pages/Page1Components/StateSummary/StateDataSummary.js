import { useState, useEffect } from 'react';
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { Box, Container, Grid } from '@mui/material';
import RacialDistributionBar from './RacialDistributionBar';
import PartyDistributionBar from './PartyDistributionBar';
import RacialDistributionTable from './RacialDistributionTable';
import stateSum from '../va_aggregated_data1.json'

export default function StateDataSummary(props) {
	const [open, setOpen] = useState(true);
	const [stateSummary, setStateSummary] = useState("null");

	async function getStateSummaryData(state) {
		try {
			const result = await axios.get(`http://localhost:8080/stateSummary?state=${state}`);
			setStateSummary(result.data);
		} catch(error) {
			alert(`Error fetching GeoJSON:${error}`);
		}
	}
	useEffect(() => {
		if(props.state) {
			(async () => await getStateSummaryData(props.state))();
		} else {
			setStateSummary(stateSum)
		}
	}, [props.state]);


	return (
		<Container className='data-container'>
			<Box display='flex' justifyContent='space-between'>
				<IconButton
					aria-label='expand row'
					size='large'
					onClick={() => setOpen(!open)}
				>
					{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
				</IconButton>
				<Typography variant='h4' style={{flex:1, fontWeight: 'bold', textAlign: 'center'}}>State Data Summary</Typography>
			</Box>
			
			<Collapse in={open} timeout='auto' unmountOnExit style={{maxHeight: '75vh', overflowY: 'auto'}}>
				{
					props.state === ''? (
						<p>Select a state</p> 
					):stateSummary === null ? ( 
						<p>No data found</p>
					):(
						<Grid container spacing={2} >
                            <Grid item xs={4}>  
                                <b>State Population:</b> {Intl.NumberFormat('en-US', { style: 'decimal' }).format(stateSummary[0][0].registered_voters_total)}
                            </Grid>
                            <Grid item xs={12}>
                                <b>Population of Each Significant Racial/Ethnic Group:</b>
								<RacialDistributionBar stateSummary={stateSummary}/>
                            </Grid>
							<Grid item xs={4}>
								<RacialDistributionTable stateSummary={stateSummary}/>
                            </Grid>
							<Grid item xs={8}>
                                <b>State Voter Distribution:</b>
								<PartyDistributionBar stateSummary={stateSummary}/>
                            </Grid>
						</Grid>
					)
				}
			</Collapse>
		</Container>
	);
}