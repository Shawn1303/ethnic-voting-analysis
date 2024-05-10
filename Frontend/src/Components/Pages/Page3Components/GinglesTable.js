import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import data from "./gingles.json";

export default function StateAssemblyTable(props) {
   
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
		{ id: 'precinctID', label: 'Precinct ID', minWidth: 40 },
		{ 
			id: 'race', 
			label: 'Race', 
			minWidth: 80,
			format: raceFormatter
		},
        { 
			id: 'popPerc', 
			label: 'Percentage', 
			minWidth: 80,
			format: (value) => `${value}%`,
		},
		{
			id: 'trump',
			label: 'Trump',
			minWidth: 80,
			align: 'right',
			format: (value) => `${value}%`,
		},
		{
			id: 'biden',
			label: 'Biden',
			minWidth: 80,
			align: 'right',
			format: (value) => `${value}%`,
		}
	];

	// async function getStateAssemblyData(state) {
	// 	try {
	// 		const result = await axios.get(`http://localhost:8080/stateAssemblyTable?state=${state}`);
	// 		// console.log(result.data)
	// 		setStateAssemblyData(result.data);
	// 	} catch(error) {
	// 		alert(`Error fetching GeoJSON:${error}`);
	// 	}
	// }

	// useEffect(() => {
	// 	if(props.state) {
	// 		(async () => await getStateAssemblyData(props.state))();
	// 	} else {
	// 		setStateAssemblyData(null)
	// 	}
	// }, [props.state]);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: "#cedce9",
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }));

	return (
		<Container className='data-container'>
			<Box display='flex' justifyContent='space-between'>
				<Typography variant='h4' style={{flex:1, fontWeight: 'bold', textAlign: 'center', margin: 10}}>Gingles 2/3</Typography>
			</Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: "75vh" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((precinct) => {
                                return (
                                    <StyledTableRow 
                                        key={precinct.precinctID} 
                                        tabIndex={-1}
                                        >
                                        {columns.map((column) => {
                                            const value = precinct[column.id];
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.format ? column.format(precinct[column.id], precinct) : precinct[column.id]}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
			
			{/* <Collapse in={open} timeout='auto' unmountOnExit> */}
				{/* {props.state ? ( */}
					
				{/* ):(
					<p>No state selected</p>  */}
				{/* )} */}
			{/* </Collapse> */}
		</Container>
	);
}