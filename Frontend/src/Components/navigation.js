import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SelectState from './Pages/Page1Components/Selection/SelectState';
import SelectOutline from './Pages/Page1Components/Selection/SelectOutline';
import SelectRace from './Pages/Page1Components/Selection/SelectRace';

export default function Navigation(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		if(anchorEl != null) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};
	const handleClose = (page) => {
		setAnchorEl(null);
		if(page){
			props.setPage(page);
		}
	};
  
	return (
		<div className='navbar'>
			<Button
				id="menu-button"
				aria-controls={open ? 'menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				Dashboard
			</Button>
			<Menu
				id="menu"
				anchorEl={anchorEl}
				open={open}
				onClose={() => handleClose(props.page)}
				MenuListProps={{
					'aria-labelledby': 'menu-button',
				}}
			>
				<MenuItem onClick={() => handleClose("stateSummary")}>State Summary</MenuItem>
				<MenuItem onClick={() => handleClose("ginglesTests")}>Gingles Tests</MenuItem>
				<MenuItem onClick={() => handleClose("ei")}>Ecological Inference</MenuItem>
				<MenuItem onClick={() => handleClose("ensemble")}>Ensemble </MenuItem>
				<MenuItem onClick={() => handleClose("compare")}>Compare States</MenuItem>
			</Menu>
			<SelectState state = {props.state} setState = {props.setState} setMapOutline = {props.setMapOutline}/>
			{
				props.state && <SelectOutline mapOutline = {props.mapOutline} setMapOutline = {props.setMapOutline} setRace = {props.setRace}/>
			}
			{
				props.mapOutline !== 'districtPlan' ? <SelectRace race = {props.race} setRace = {props.setRace}/> : null
			}
			
		</div>
	);
  }