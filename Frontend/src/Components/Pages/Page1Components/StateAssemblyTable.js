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


export default function StateAssemblyTable(props) {
	const [open, setOpen] = useState(false);

	return (
		<TableContainer component={Paper} style={{margin: '1% auto', border:'2px solid black', borderRadius: '5px'}}>
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
		</TableContainer>
	);
}
