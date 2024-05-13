import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Grid } from '@mui/material';
import StateMap from './Page1Components/Map/StateMap';
// import EnsembleSummary from './Page4Components/EnsembleSummary';
import data from './Page4Components/boxplot/box_whiskers_afampop.json';
import summary from './Page4Components/boxplot/10000planspostpro/ensemble_summary.json';
import { Boxplot } from './Page4Components/Boxplot';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import OppBarChart from './Page4Components/Opp_BarChart';
import barchartdata1 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_hisppop_50.json'
import barchartdata2 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_afampop_50.json'
import barchartdata3 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_seasianpop_50.json'
import barchartdata4 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_europeanpop_50.json'
import barchartdata5 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_hisppop_44.json'
import barchartdata6 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_afampop_44.json'
import barchartdata7 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_seasianpop_44.json'
import barchartdata8 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_europeanpop_44.json'
import barchartdata9 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_hisppop_37.json'
import barchartdata10 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_afampop_37.json'
import barchartdata11 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_seasianpop_37.json'
import barchartdata12 from './Page4Components/boxplot/10000planspostpro/oppdist_barchart_datas_europeanpop_37.json'

import bw1 from './Page4Components/boxplot/10000planspostpro/box_whiskers_afampop.json'
import bw2 from './Page4Components/boxplot/10000planspostpro/box_whiskers_europeanpop.json'
import bw3 from './Page4Components/boxplot/10000planspostpro/box_whiskers_hisppop.json'
import bw4 from './Page4Components/boxplot/10000planspostpro/box_whiskers_seasianpop.json'


export default function Ensemble(props) {
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [features, setFeatures] = useState(null);

	useEffect(() => {
		if(props.districtplan) {
			setFeatures(props.districtplan.features);
			// console.log(props.districtplan.features)
		}
	}, [props.districtplan])

	const barcharts = {
		'demographicWhite': barchartdata4,
		'demographicBlack': barchartdata2,
		'demographicAsian': barchartdata3,
		'demographicHispanicLatino': barchartdata1
	}

	const boxandwhiskers = {
		'demographicWhite': bw2,
		'demographicBlack': bw1,
		'demographicAsian': bw4,
		'demographicHispanicLatino': bw3
	}

	console.log(data.race)
	console.log(props.race)

	
	const rowsSplit = [
		{freq: 'Values'},
		...Object.entries(summary.splits).map(([key, value]) => ({freq: value}))]

	const columnsSplit = [
		{name: 'Splits'},
		...Object.entries(summary.splits).map(([key, value]) => ({name: key}))]

	const rowsOppDist = [
		[
			{freq: 'Total'},
		...Object.entries(summary.race_opp_dist).map(([key, value]) => ({freq: value}))
		],
		[
			{freq: 'Average'},
		...Object.entries(summary.race_opp_dist).map(([key, value]) => ({freq: (value / summary.district_plans).toFixed(3)}))
		]
	]

	const columnsOppDist = [
		{name: 'Race'},
		...['European', 'African American', 'Asian', 'Hispanic'].map((key) => ({name: key}))]
	// console.log(columns)
	// async function getBoxPlot(state, race, ensemblePlan) {
	// 	try {
	// 		const result = await axios.get(`http://localhost:8080/ep?${ensemblePlan}race=${race}&state=${state}`);
	// 		setEnsemblePlan(result.data);
	// 	} catch(error) {
	// 		alert(`Error fetching GeoJSON:${error}`);
	// 	}
	// }
	// useEffect(() => {
	// 	if(props.state && props.race && selectEP) {
	// 		(async () => await getBoxPlot(props.state, props.race, selectEP))();
	// 		setEnsemblePlan(stateSum)
	// 	} else {
	// 		setEnsemblePlan(null)
	// 	}
	// }, [props.state, props.race, selectEP]);
	// useEffect(() => {

	// }, [])
    
	return(
		<Box margin={'10px 1%'}>
			<Grid container spacing={1}>
				<Grid item xs={6} style={{height: '40vh', overflowY: 'auto'}}>
					<StateMap 
                        height='39vh'
                        state = {props.state} 
						districtplan={props.districtplan} 
						mapOutline={props.mapOutline} 
                    />
				</Grid>
				<Grid item xs={6} style={{height: '40vh', overflowY: 'auto'}}>
					<Container className='data-container'>
						<Box display='flex' justifyContent='space-between'>
							<IconButton
								aria-label='expand row'
								size='large'
								onClick={() => setOpen1(!open1)}
							>
								{open1 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
							</IconButton>
							<Typography variant='h4' style={{flex:1, fontWeight: 'bold', textAlign: 'center'}}>Ensemble Summary</Typography>
						</Box>
						<Collapse in={open1} timeout='auto' unmountOnExit style={{maxHeight: '75vh', overflowY: 'auto'}}>
							{props.state !== 'va' ? (
								<p>Select a state</p> 
							): <Grid container spacing={2} >
									<Grid item xs={12}>
										<b>Total Plans: </b>
										{Intl.NumberFormat('en-US', { style: 'decimal' }).format(summary.district_plans)}
									</Grid>
									<Grid item xs={12}>
										<b>Democratic and Repubican Splits</b>
										<TableContainer component={Paper}>
											<Table sx={{ minWidth: 150 }} aria-label="simple table">
												<TableHead>
												<TableRow>
													{columnsSplit.map((column, index) => {
														return (<TableCell
															key={column.name}
															style={{ minWidth: 40 }}
															align='center'
															sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
														>
															{column.name}
														</TableCell>);
													})}
												</TableRow>
												</TableHead>
												<TableBody>
													<TableRow
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
													>
														{rowsSplit.map((row, index) => {
															return <TableCell 
															key={row.freq}
															align='center'
															sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
															>
																{row.freq}
															</TableCell>
														})}
													</TableRow>
												</TableBody>
											</Table>
										</TableContainer>
									</Grid>
									<Grid item xs={12}>
										<b>Opportunity Districts</b>
										<TableContainer component={Paper}>
											<Table sx={{ minWidth: 150 }} aria-label="simple table">
												<TableHead>
												<TableRow>
													{columnsOppDist.map((column, index) => {
														return (<TableCell
															key={column.name}
															style={{ minWidth: 40 }}
															align='center'
															sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
														>
															{column.name}
														</TableCell>);
													})}
												</TableRow>
												</TableHead>
												<TableBody>
													{rowsOppDist.map((row, rowindex) => {
														return (<TableRow
														sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
														key={rowindex}
														>
															{row.map((rowElement, index) => {
																return <TableCell 
																key={index}
																align='center'
																sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
																>
																	{rowElement.freq}
																</TableCell>
															})}
														</TableRow>)
														})
													}
												</TableBody>
											</Table>
										</TableContainer>
									</Grid>	
								</Grid>}
						</Collapse>
					</Container>
					<Container className='data-container'>
						<Box display='flex' justifyContent='space-between'>
							<IconButton
								aria-label='expand row'
								size='large'
								onClick={() => setOpen2(!open2)}
							>
								{open2 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
							</IconButton>
							<Typography variant='h4' style={{flex:1, fontWeight: 'bold', textAlign: 'center'}}>Opportunity Districts</Typography>
						</Box>
						<Collapse in={open2} timeout='auto' unmountOnExit style={{maxHeight: '75vh', overflowY: 'auto'}}>
							{props.state !== 'va' ? (
								<p>Select a state</p> 
							): <OppBarChart
								data={barcharts[props.race]}
								>
								</OppBarChart>}
						</Collapse>
					</Container>
				</Grid>	
                <Grid item xs={12} style={{height: '45vh', overflowY: 'auto'}}>
                    {props.state === 'va' && features ? (
					<Boxplot race={props.race} data={boxandwhiskers[props.race].buckets} features={features} width={1500} height={300} />
					): <></>}
				</Grid>
			</Grid>
		</Box>
		
	)
}
