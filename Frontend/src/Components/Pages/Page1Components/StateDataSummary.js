import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { Box, Container, Grid } from '@mui/material';


export default function StateDataSummary(props) {
	const [open, setOpen] = useState(false);

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
			
			<Collapse in={open} timeout='auto' unmountOnExit>
				{
					props.state === ''? (
						<p>No state selected</p> 
					):(
						<Grid container spacing={2} justifyContent='space-around'>
                            <Grid item xs={5}>  
                                <b>State Population:</b> some number
                            </Grid>
                            <Grid item xs={7}>
                                <b>Population of Each Significant Racial/Ethnic Group:</b> a pie chart? <br/>
                            </Grid>
							<Grid item xs={12}>
                                <b>State Voter Distribution:</b> some graph? <br/>
                            </Grid>
                            <Grid item xs={12}>
                                <b>Summary of State Representatives:</b> two bar graphs(one party one racial) <br/>
                            </Grid>
						</Grid>
					)
				}
			</Collapse>
		</Container>
	);
}