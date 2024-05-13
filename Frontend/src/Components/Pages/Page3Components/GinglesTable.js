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
// import data from "./gingles.json";

export default function PrecinctAnalysisTable(props) {

	async function loadDistrictPlan(state, mapOutline) {
		try {
			const result = await axios.get(`http://localhost:8080/${mapOutline}?state=${state}`);
			props.setPrecinct(result.data);
			
		} catch(error) {
			alert(`Error fetching GeoJSON:${error}`);
		}
	}

	useEffect(() => {
        if (!props.precinct && props.page === "ginglesTests") {
            loadDistrictPlan(props.state, "heatMapP");
        }
    }, [props.page, props.precinct, props.state, props.setPrecinct]);

	

	const raceFormatter = (value) => {
		const raceMap = {
			demographicWhite: 'White',
			demographicAsian: 'Asian',
			demographicBlack: 'Black/African American',
			demographicHispanicLatino: 'Hispanic/Latino'
		};
		return raceMap[value];
	};

	const columns = [
		{ id: 'precinctID', label: 'Precinct ID', minWidth: 40 },
		{ 
			id: 'demographicTotal', 
			label: 'Total Population', 
			align: 'right',
			minWidth: 80,
			format: (value)=> Intl.NumberFormat('en-US', { style: 'decimal' }).format(value)
		},
        { 
			id: [props.race], 
			label: 'Minority Population', 
			align: 'right',
			minWidth: 80,
			format:(value)=> Intl.NumberFormat('en-US', { style: 'decimal' }).format(value)
		},
		{
			id: 'republicanVotes',
			label: 'Republican Votes',
			minWidth: 80,
			align: 'right',
			format: (value) => Intl.NumberFormat('en-US', { style: 'decimal' }).format(value),
		},
		{
			id: 'democraticVotes',
			label: 'Democratic Votes',
			minWidth: 80,
			align: 'right',
			format: (value) => Intl.NumberFormat('en-US', { style: 'decimal' }).format(value),
		}
	];

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
							{props.precinct?.features.map((feature) => (
                                <StyledTableRow key={feature.properties.precinctID}>
                                    {columns.map((column) => (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.format ? column.format(feature.properties[column.id]) : feature.properties[column.id]}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
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