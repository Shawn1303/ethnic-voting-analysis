import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';

function createData(districtN, rep, party, race, vm, url) {
	return {districtN, rep, party, race, vm, url};
}

const rows = [
	createData('1', 'John Doe', 'REP', 'WHITE', 80, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Patrick-Hope.jpg'),
	createData('2', 'Jane Smith', 'DEM', 'HISPANIC', 75, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Patrick-Hope.jpg'),
	createData('3', 'Michael Johnson', 'REP', 'BLACK', 65, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Patrick-Hope.jpg'),
	createData('4', 'Emily Davis', 'IND', 'ASIAN', 90, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Patrick-Hope.jpg'),
	createData('5', 'Chris Brown', 'DEM', 'WHITE', 88, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Patrick-Hope.jpg'),
	createData('6', 'Patricia Taylor', 'REP', 'MIXED', 70, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alfonso_Lopez_20230523_085935.jpg'),
	createData('7', 'Robert Wilson', 'DEM', 'BLACK', 55, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alfonso_Lopez_20230523_085935.jpg'),
	createData('8', 'Linda Martinez', 'IND', 'HISPANIC', 95, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alfonso_Lopez_20230523_085935.jpg'),
	createData('9', 'David Anderson', 'REP', 'ASIAN', 60, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alfonso_Lopez_20230523_085935.jpg'),
	createData('10', 'Jessica Thomas', 'DEM', 'WHITE', 85, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Elizabeth_BennettParker_20230521_074946.jpg'),
	createData('11', 'Paul Moore', 'REP', 'BLACK', 78, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Elizabeth_BennettParker_20230521_074946.jpg'),
	createData('12', 'Sarah White', 'IND', 'MIXED', 82, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Elizabeth_BennettParker_20230521_074946.jpg'),
	createData('13', 'James Harris', 'DEM', 'WHITE', 75, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Elizabeth_BennettParker_20230521_074946.jpg'),
	createData('14', 'Laura Martin', 'REP', 'ASIAN', 69, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Elizabeth_BennettParker_20230521_074946.jpg'),
	createData('15', 'Ryan Garcia', 'DEM', 'HISPANIC', 74, 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Elizabeth_BennettParker_20230521_074946.jpg'),
];

export default function StateAssemblyTable(props) {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);	
	const columns = [
		{ id: 'districtN', label: 'District Number', minWidth: 80 },
		{
			id: 'rep',
			label: 'Representative',
			minWidth: 200,
			format: (value, row) => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Avatar alt={value} src={row.url} style={{ marginRight: 10 }} />
					{value}
				</div>
			)
		},
		{ id: 'party', label: 'Party', minWidth: 60 },
		{ id: 'race', label: 'Race', minWidth: 50 },
		{
		  id: 'vm',
		  label: 'Voting Margin',
		  minWidth: 170,
		  align: 'right',
		  format: (value) => `${value}%`,
		}
	];

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

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
				<Typography variant='h4' style={{flex:1, fontWeight: 'bold', textAlign: 'center'}}>State Assembly Table</Typography>
			</Box>
			
			<Collapse in={open} timeout='auto' unmountOnExit>
				{props.state === ''? (
					<p>No state selected</p> 
				):(
					<Paper sx={{ width: '100%', overflow: 'hidden' }}>
						<TableContainer sx={{ maxHeight: 300 }}>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}
											>
											{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{rows
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										return (
											<TableRow key={row.districtN} hover role="checkbox" tabIndex={-1}>
												{columns.map((column) => {
													const value = row[column.id];
													return (
														<TableCell key={column.id} align={column.align}>
															{column.format ? column.format(row[column.id], row) : row[column.id]}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
				)}
			</Collapse>
		</Container>
	);
}