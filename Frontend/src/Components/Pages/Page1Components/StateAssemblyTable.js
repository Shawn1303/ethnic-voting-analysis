import { useState, useEffect, Image } from 'react';
import axios from 'axios';
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
import Modal from '@mui/material/Modal';

export default function StateAssemblyTable(props) {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);	
	const [stateAssemblyData, setStateAssemblyData] = useState(null);

	const [openModal, setOpenModal] = useState(false);
	const [selectedImageUrl, setSelectedImageUrl] = useState('');
	const handleOpenModal = (imageUrl) => {
		setSelectedImageUrl(imageUrl);
		setOpenModal(true);
	};
	  
	const handleCloseModal = () => {
		setOpenModal(false);
		setSelectedImageUrl('');
	};
	

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	  };
	
	const raceFormatter = (value) => {
		const raceMap = {
		  WHITE: 'White',
		  ASIAN: 'Asian',
		  BLACK: 'Black/African American',
		  HISPANICLATINO: 'Hispanic/Latino'
		};
		return raceMap[value] || value;
	};

	const columns = [
		{ id: 'districtID', label: 'District ID', minWidth: 80 },
		{
			id: 'name',
			label: 'Representative',
			minWidth: 120,
		},
		{ 
			id: 'party', 
			label: 'Party', 
			minWidth: 60 ,
			format: (value) => value === 'REP' ? 'Republic' : 'Democratic'
		},
		{ 
			id: 'race', 
			label: 'Race', 
			minWidth: 50 ,
			format: raceFormatter
		},
		{
			id: 'voteMargin',
			label: 'Voting Margin',
			minWidth: 80,
			align: 'right',
			format: (value) => `${value}%`,
		},
		{
			id: 'image',
			label: 'Image',
			minWidth: 15,
			format: (value, row) => (
				<a href='#' onClick={()=>handleOpenModal(row.url)}>Image</a>
			)
		  }
	];

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	async function getStateAssemblyData(state) {
		try {
			const result = await axios.get(`http://localhost:8080/stateAssemblyTable?state=${state}`);
			// console.log(result.data)
			setStateAssemblyData(result.data);
		} catch(error) {
			alert(`Error fetching GeoJSON:${error}`);
		}
	}

	useEffect(() => {
		if(props.state) {
			(async () => await getStateAssemblyData(props.state))();
		} else {
			setStateAssemblyData(null)
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
				<Typography variant='h4' style={{flex:1, fontWeight: 'bold', textAlign: 'center'}}>State Assembly Table</Typography>
			</Box>
			
			<Collapse in={open} timeout='auto' unmountOnExit>
				{stateAssemblyData ? (
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
									{stateAssemblyData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((district) => {
										return (
											<TableRow key={district.districtN} hover role="checkbox" tabIndex={-1}>
												{columns.map((column) => {
													const value = district[column.id];
													return (
														<TableCell key={column.id} align={column.align}>
															{column.format ? column.format(district[column.id], district) : district[column.id]}
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
							count={stateAssemblyData.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
						<Modal
							open={openModal}
							onClose={handleCloseModal}
						>
							<img src={selectedImageUrl}/>
						</Modal>
					</Paper>
					
				):(
					<p>No state selected</p> 
				)}
			</Collapse>
		</Container>
	);
}