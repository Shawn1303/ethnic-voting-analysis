import React, { useState, useEffect } from 'react';
import StateMap from './Page1Components/StateMap';
import SelectState from './Page1Components/SelectState';
import SelectOutline from './Page1Components/SelectOutline';
import EnsembleSummary from './Page1Components/EnsembleSummary';
import StateAssemblyTable from './Page1Components/StateAssemblyTable';
import StateDataSummary from './Page1Components/StateDataSummary';


export default function Gingles1(props) {
	return(<>
		<div style={{width: '49%', display: 'inline-block', border:'2px solid black', borderRadius: '5px', padding: '5px', margin: '5px'}}>
			<SelectState state = {props.state} setState = {props.setState} setMapOutline = {props.setMapOutline}/>
			{props.state && 
				<div style={{width: '40%'}}>
					<SelectOutline mapOutline = {props.mapOutline} setMapOutline = {props.setMapOutline}/>
				</div>
			}
			<StateMap state = {props.state} districtplan={props.districtplan}/>
		</div>
		
		<div style={{width: '48%', display: 'inline-block', verticalAlign: 'top', padding: '5px', margin: '0 5px'}}>
			<EnsembleSummary state = {props.state}></EnsembleSummary>
			<StateDataSummary state = {props.state}></StateDataSummary>
			<StateAssemblyTable state = {props.state}></StateAssemblyTable>
		</div>	
	</>)
}

