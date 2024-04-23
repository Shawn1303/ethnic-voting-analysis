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
		<Container style={{margin: '1% auto', border:'2px solid black', borderRadius: '5px'}}>
			<Box display="flex" justifyContent="space-between">
				<Typography variant='h4' style={{fontWeight: 'bold'}}>State Data Summary</Typography>
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
						<Grid container spacing={2} justifyContent="space-around">
                            <Grid xs={5}>  
                                <b>State Population:</b> some number <br/>
                                <b>State Total Population:</b> some number
                            </Grid>
                            <Grid xs={7}>
                                <b>Population of Each Significant Racial/Ethnic Group:</b> a pie chart? <br/>
                            </Grid>
							<Grid xs={12}>
                                <b>State Voter Distribution:</b> some graph? <br/>
                            </Grid>
                            <Grid xs={12}>
                                <b>Summary of State Representatives:</b> two bar graphs(one party one racial) <br/>
                            </Grid>
						</Grid>
					)
				}
			</Collapse>
			
		</Container>
	);
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// export default function BasicGrid() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={8}>
//           <Item>xs=8</Item>
//         </Grid>
//         <Grid item xs={4}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={4}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={8}>
//           <Item>xs=8</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }