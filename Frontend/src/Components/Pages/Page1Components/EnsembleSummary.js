import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { Box, Container } from '@mui/material';


export default function EnsembleSummary(props) {
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
				<Typography variant='h4' style={{flex:1, fontWeight: 'bold', textAlign: 'center'}}>Ensemble Summary</Typography>
			</Box>
			
			<Collapse in={open} timeout='auto' unmountOnExit>
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