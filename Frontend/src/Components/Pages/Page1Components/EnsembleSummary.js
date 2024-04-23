import { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { Box, Container } from '@mui/material';


export default function EnsembleSummary(props) {
	const [open, setOpen] = useState(false);

	return (
		<Container style={{margin: '0 auto', border:'2px solid black', borderRadius: '5px'}}>
			<Box display="flex" justifyContent="space-between">
				<Typography variant='h4' style={{fontWeight: 'bold'}}>Ensemble Summary</Typography>
				<IconButton
					aria-label="expand row"
					size="large"
					onClick={() => setOpen(!open)}
				>
					{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
				</IconButton>
			</Box>
			
			<Collapse in={open} timeout="auto" unmountOnExit>
				{
					props.state === ''? (
						<p>No state selected</p> 
					):(
						<p>
							{props.state}
							<br />
							<b>Number of District Plans:</b> 10,000
						</p>
					)
				}
				
			</Collapse>
			
		</Container>
	);
}