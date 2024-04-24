import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { Container } from '@mui/material';


export default function StateAssemblyTable(props) {
	const [open, setOpen] = useState(false);

	return (
		<Container style={{margin: '0 auto 1%', border:'2px solid black', borderRadius: '5px'}}>
			<Box display="flex" justifyContent="space-between">
				<Typography variant='h4' style={{fontWeight: 'bold'}}>State Assembly Table</Typography>
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
							<b>hahaaaa</b>
						</p>
					)
				}
			</Collapse>
		</Container>
	);
}

{/* <TableContainer component={Paper} style={{margin: '1% auto', border:'2px solid black', borderRadius: '5px'}}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell>
							<IconButton
								aria-label="expand row"
								size="large"
								onClick={() => setOpen(!open)}
							>
								{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
							</IconButton>
						</TableCell>
						<TableCell><Typography variant='h4'>State Assembly Table</Typography></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<Collapse in={open} timeout="auto" unmountOnExit>
					{props.state === ''? <p>No state selected</p> : props.state}
					</Collapse>
				</TableBody>
			</Table>
		</TableContainer> */}