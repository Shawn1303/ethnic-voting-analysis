// import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import Map from './map';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
// import Navbar from './navComponents/navbar';
// import NavItem from './navComponents/navitems';
// import DropdownMenu from './navComponents/dropdownmenu';
// import StateMap from './map/StateMap';
// import HouseMemberTable from './graphs/house_member_table';
// import RacialBarPlots from './graphs/racial_ethnic_district_bar_plots';
// import BoxWhiskerPlotsMCMC from './graphs/box_whisker_plots_MCMC';
// import VotingPDensityPlots from './graphs/voting_probability_density_plots'
// import AstrosLogo from './image/astros_logo.png'
// import EthnicDistPieChart from './graphs/ethnic_distribution_pie_chart';
import axios from 'axios';

function App() {
	const [state, setState] = useState('');
	const [errorResp, setErrorResp] = useState(null);
	const [data, setData] = useState(null);

	const axiosInst = axios.create({
		baseURL: 'http://localhost:8080',
	})

	const handleChange = (event) => {
		setState(event.target.value);
		axiosInst
			.get("/marylandDistrictPlan")
			.then((response) => {
				setData(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
				setErrorResp(err);
			})
	};
	return (<>
		<Box sx={{ maxWidth:500 }}>
			<FormControl fullWidth>
				<InputLabel id='select-map-label'>Select a State</InputLabel>
				<Select
					labelId='select-map'
					id='select-map-dropdown'
					value={state}
					label="Select a state"
					onChange={handleChange}
				>
					<MenuItem value={'md'}>Maryland</MenuItem>
					<MenuItem value={'va'}>Virginia</MenuItem>
				</Select>
			</FormControl>

		</Box>
		
		<Map selectedState={state}></Map>
		<div>
			{data ? //If data returned properly show data
				<div>
					Server responded!
				</div>
				: errorResp ? //Else show error if it exists
				<div>Error: {errorResp.message}</div> : <div></div>
			}
		</div>
	</>);
}

export default App;

// function App() {
// 	const [isHoveredM, setIsHoveredM] = useState(false);
// 	const [isHoveredV, setIsHoveredV] = useState(false);

// 	const[marylandData, setMarylandData] = useState({
// 		map: {
// 			show: true,
// 			legislative: true,
// 			precinct: true
// 		},
// 		boxandwhiskers: {
// 			show: false
// 		},
// 		barplot: {
// 			show: false
// 		},
// 		table: {
// 			show: false
// 		},
// 		pichart: {
// 			show: false
// 		},
// 	});

// 	const[virginiaData, setVirginiaData] = useState({
// 		map: {
// 			show: true,
// 			legislative: true,
// 			precinct: true
// 		},
// 		boxandwhiskers: {
// 			show: false
// 		},
// 		barplot: {
// 			show: false
// 		},
// 		table: {
// 			show: false
// 		},
// 		pichart: {
// 			show: false
// 		},
// 	});

// 	const raceOptions = ["Select a race/ethnicity", "American Indian and Alaska Native", "Asian", "Black or African American", "Hispanic or Latino", "Native Hawaiian and Other Pacific Islander", "White", "Other Race"];
//   	const [selectedRace, setSelectedRace] = useState(raceOptions[0]);
// 	const [selectedRace2, setSelectedRace2] = useState(raceOptions[0]);
// 	const [showMar, setShowMar] = useState(false);
// 	const [showVir, setShowVir] = useState(false);
// 	const [showOneState, setShowOneState] = useState(false);
// 	const [oneState, setOneState] = useState(true);

// 	const allShowsFalse = (data) => {
// 		return Object.values(data).every(item => 
// 		  typeof item === 'object' && 'show' in item ? !item.show : true
// 		);
// 	};

// 	return (<>
// 		<Navbar>
// 			{/* 1 nav item: menu */}
// 			<NavItem icon={<FontAwesomeIcon icon={faBars} />}>
// 				{/* shows all dropdown */}
// 				<DropdownMenu
// 					marylandData={marylandData}
// 					setMarylandData={setMarylandData}
// 					virginiaData={virginiaData}
// 					setVirginiaData={setVirginiaData}
// 					setShowOneState={setShowOneState}
// 					showOneState={showOneState}
// 					setOneState={setOneState}
// 					oneState={oneState}
// 				></DropdownMenu>
// 			</NavItem>
// 			<div id='title'>Non-clearance state vs Pre-clearance state</div>
// 			<img id='astroslogo' src={AstrosLogo} />
// 		</Navbar>
// 		{!showOneState ? (
// 		<div id = 'display'>
// 			{!allShowsFalse(marylandData) && <div className='statesdata'>
// 				<div className='mapTitle'>
// 					<h2>Maryland (Non pre-clearance)</h2>
// 					{marylandData.map.show && <select
// 						onChange={(e) => setSelectedRace(e.target.value)}
// 						defaultValue={selectedRace}
// 					>
// 						{raceOptions.map((race, idx) => (
// 						<option key={idx}>{race}</option>
// 						))}
// 					</select>}
// 				</div>
// 				{marylandData.map.show && <StateMap selectedState = "maryland" mapOptions = {marylandData.map} selectedRace = {selectedRace}/>}
// 				<br/>
// 				{marylandData.map.show && <a href='#' onClick={() => {setShowMar(!showMar)}}>{showMar ? <p style={{color:'blue', border: '3px dotted darkblue', backgroundColor: '#e8f4f8'}}>Welcome!
// 				<br/><br/>
// 					Maryland’s voting districts are redrawn by different groups.
// 					<br/><br/>
// 					State Legislative Districts are decided by the Governor and a nine person advisory commission. These plans are then approved by the State Legislature. 
// 					If politicians can't agree on new state legislative lines within 45 days, the Governor's plan becomes law.
// 					<br/><br/>
// 					Explore the map to see how voting districts differ!
// 					<br/><br/>
// 					<span style={{ color: 'darkblue', fontWeight: isHoveredM ? 'bold' : 'normal' }}
// 							onMouseEnter={() => setIsHoveredM(true)}
// 							onMouseLeave={() => setIsHoveredM(false)}>Click to close</span>
// 					</p> :
// 					<span style={{ color: 'darkblue', border: '2px solid darkblue', backgroundColor: '#e8f4f8', fontWeight: isHoveredM ? 'bold' : 'normal' }}
// 							onMouseEnter={() => setIsHoveredM(true)}
// 							onMouseLeave={() => setIsHoveredM(false)}>Click to learn about Maryland's boundary decision process</span>}
// 					</a>}
// 				{marylandData.table.show && <HouseMemberTable/>}
// 				{marylandData.barplot.show && <RacialBarPlots />}
// 				{marylandData.boxandwhiskers.show && <BoxWhiskerPlotsMCMC num_district={1} />}
//         		{marylandData.pichart.show && <EthnicDistPieChart />}

// 			</div>}
// 			{!allShowsFalse(virginiaData) && <div className='statesdata'>
// 				<div className='mapTitle'>
// 					<h2>Virginia (Pre-clearance)</h2>
// 					{virginiaData.map.show && <select
// 						onChange={(e) => setSelectedRace2(e.target.value)}
// 						defaultValue={selectedRace2}
// 					>
// 						{raceOptions.map((race, idx) => (
// 						<option key={idx}>{race}</option>
// 						))}
// 					</select>}
					
// 				</div>
// 				{virginiaData.map.show && <StateMap selectedState = "virginia" mapOptions = {virginiaData.map} selectedRace = {selectedRace2}/>}
// 				<br/>
// 				{virginiaData.map.show && <a href='#' onClick={() => {setShowVir(!showVir)}}>{showVir ? <p style={{color:'blue', border: '3px dotted darkblue', backgroundColor: '#e8f4f8'}}>Welcome!
// <br/><br/>
// Virginia's voting districts were traditionally drawn by state politicians.
// However, as of November 3, 2020, Virginia residents voted to establish the Virginia Redistricting Commission for this task.
// <br/><br/>
// The Commission is currently developing maps for state legislative and U.S. House districts.
// Previously, the state legislature drew the maps, but now the Commission does so, subject to General Assembly approval.
// <br/><br/>
// If the Commission or the General Assembly fails to agree on redistricting plans, the Supreme Court of Virginia will establish the districts.
// <br/><br/>
// Explore the map to see how voting districts differ!
// <br/><br/>
// <span style={{ color: 'darkblue', fontWeight: isHoveredV ? 'bold' : 'normal' }}
//         onMouseEnter={() => setIsHoveredV(true)}
//         onMouseLeave={() => setIsHoveredV(false)}>Click to close</span>
// </p> :
// <span style={{ color: 'darkblue', border: '2px solid darkblue', backgroundColor: '#e8f4f8', fontWeight: isHoveredV ? 'bold' : 'normal' }}
//         onMouseEnter={() => setIsHoveredV(true)}
//         onMouseLeave={() => setIsHoveredV(false)}>Click to learn about Virginia's boundary decision process</span>}
// </a>}
// 				{virginiaData.table.show && <HouseMemberTable/>}
// 				{virginiaData.barplot.show && <RacialBarPlots />}
// 				{virginiaData.boxandwhiskers.show && <BoxWhiskerPlotsMCMC num_district={2}/>}
// 				{virginiaData.pichart.show && <EthnicDistPieChart />}
//         {/* <VotingPDensityPlots /> */}
// 			</div>
// 	}
// 	</div> ) :
// 	(
// 		(oneState ? (
// 			<div id="onestate">
// 				<div className='leftOneState'>
// 					<div className='mapTitle'>
// 						<h2>Maryland (Non pre-clearance)</h2>
// 						{marylandData.map.show && <select
// 							onChange={(e) => setSelectedRace(e.target.value)}
// 							defaultValue={selectedRace}
// 						>
// 							{raceOptions.map((race, idx) => (
// 							<option key={idx}>{race}</option>
// 							))}
// 						</select>}
// 					</div>
// 					<StateMap selectedState = "maryland" mapOptions = {marylandData.map} selectedRace = {selectedRace}/>
// 					{/* <RacialBarPlots /> */}
// 					<EthnicDistPieChart />
// 				</div>
// 				<div className='rightOneState'>
// 					<BoxWhiskerPlotsMCMC num_district={1}/>
// 					{/* <EthnicDistPieChart /> */}
// 					<RacialBarPlots />
// 				</div>
// 			</div>
// 			) : (
// 			<div id="onestate">
// 				<div className='leftOneState'>
// 					<div className='mapTitle'>
// 						<h2>Virginia (Pre-clearance)</h2>
// 						{virginiaData.map.show && <select
// 							onChange={(e) => setSelectedRace2(e.target.value)}
// 							defaultValue={selectedRace2}
// 						>
// 							{raceOptions.map((race, idx) => (
// 							<option key={idx}>{race}</option>
// 							))}
// 						</select>}
// 					</div>
// 					<StateMap selectedState = "virginia" mapOptions = {virginiaData.map} selectedRace = {selectedRace2}/>
// 					{/* <RacialBarPlots /> */}
// 					<EthnicDistPieChart />
// 				</div>
// 				<div className='rightOneState'>
// 					<BoxWhiskerPlotsMCMC num_district={2}/>
// 					{/* <EthnicDistPieChart /> */}
// 					<RacialBarPlots />
// 				</div>
// 			</div>
// 			))
// 	)}
// 	</>
// 	);
// }

// // function Navbar(props) {
// // 	return(
// // 		<nav className='navbar'>
// // 			<ul className='navbar-nav'>{ props.children }</ul>
// // 		</nav>
// // 	);
// // }

// // function NavItem(props) {
// // 	const [open, setOpen] = useState(false);

// // 	return(
// // 		<li className='nav-item'>
// // 			<a href='#' className='icon-button' onClick={() => setOpen(!open)}>
// // 				{ props.icon }
// // 				<span className='icon-label'> Menu </span>
// // 			</a>

// // 			{open && props.children}
// // 		</li>
// // 	);
// // }

// // function DropdownMenu(props) {
// // 	const [activeMenu, setActiveMenu] = useState('main');
// // 	const [prevMenu, setPrevMenu] = useState(null);
// // 	const [menuHeight, setMenuHeight] = useState(null);
// // 	// const [data, setData] = useState(null);
// // 	// const [updateData, setUpdateData] = useState(null);

// // 	function calcHeight(el) {
// // 		const height = el.offsetHeight;
// // 		setMenuHeight(height);
// // 	}

// // 	function DropdownItem(props) {
// // 		const [data, setData] = useState(null);
// // 		const [updateData, setUpdateData] = useState(null);

// // 		let item;
// // 		if(props.checkbox) {
// // 			item =
// // 			<a href='#' className='menu-item'>
// // 				{/* put in props.label for each checkbox item */}
// // 				<input type='checkbox' 
// // 				// check={props.data.map[props.label]}
// // 				check={data.map[props.label]}
// // 				onChange={() => {
// // 					// props.setData(prevState => ({
// // 					updateData(prevState => ({
// // 						...prevState,
// // 						map: {
// // 							...prevState.map,
// // 							// [props.label]: !(props.data.map[props.label])
// // 							[props.label]: !(data.map[props.label])
// // 						}
// // 					}));
// // 				}}
// // 				/>
// // 				{props.children}
// // 			</a>
// // 		} else {
// // 			item = <a href='#' className='menu-item' onClick={() => {
// // 				if(props.goToMenu) props.setActiveMenu(props.goToMenu);
// // 				if(props.prevMenu) props.setPrevMenu(props.prevMenu);
// // 			}}>
// // 				<span className='icon-left'>{props.leftIcon}</span>
// // 				{props.children}
// // 				{/* <span className='icon-right'>{props.rightIcon}</span> */}
// // 			</a>;

// // 			if(props.prevMenu === 'main') {
// // 				setData(props.data);
// // 				setUpdateData(props.setData);
// // 			}
// // 		}
// // 		return(item);
// // 	}

// // 	return (
// // 		<div className='dropdown' style={{ height: menuHeight }}>
// // 			{/* main menu first layer*/}
// // 			<CSSTransition 
// // 			in={activeMenu === 'main'} 
// // 			unmountOnExit 
// // 			timeout={500}
// // 			classNames={"menu-primary"}
// // 			onEnter={calcHeight}
// // 			>
// // 				<div className='menu'>
// // 					<DropdownItem
// // 						goToMenu="state"
// // 						prevMenu={activeMenu}
// // 						setActiveMenu={setActiveMenu}
// // 						setPrevMenu={setPrevMenu}
// // 						data={props.marylandData}
// // 						setData={props.setMarylandData}
// // 					>Maryland</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="state"
// // 						prevMenu={activeMenu}
// // 						data={props.virginiaData}
// // 						setData={props.setVirginiaData}
// // 					>Virginia</DropdownItem>
// // 				</div>
// // 			</CSSTransition>

// // 			{/* state menu second layer*/}
// // 			{/* <CSSTransition 
// // 			in={activeMenu === 'state'} 
// // 			unmountOnExit 
// // 			timeout={500}
// // 			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
// // 			onEnter={calcHeight}
// // 			>
// // 				<div className='menu'>
// // 					<DropdownItem
// // 						goToMenu="main"
// // 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// // 					>Back</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="map"
// // 						prevMenu={activeMenu}
// // 					>Map</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="boxandwhiskers"
// // 						prevMenu={activeMenu}
// // 					>Box and Whiskers</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="barchart"
// // 						prevMenu={activeMenu}
// // 					>Bar Chart</DropdownItem>
// // 				</div>
// // 			</CSSTransition> */}

// // 			<CSSTransition 
// // 			in={activeMenu === 'maryland'} 
// // 			unmountOnExit 
// // 			timeout={500}
// // 			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
// // 			onEnter={calcHeight}
// // 			>
// // 				<div className='menu'>
// // 					<DropdownItem
// // 						goToMenu="main"
// // 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// // 					>Back</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="map"
// // 						prevMenu={activeMenu}
// // 					>Map</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="boxandwhiskers"
// // 						prevMenu={activeMenu}
// // 					>Box and Whiskers</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="barchart"
// // 						prevMenu={activeMenu}
// // 					>Bar Chart</DropdownItem>
// // 				</div>
// // 			</CSSTransition>

// // 			<CSSTransition 
// // 			in={activeMenu === 'virginia'} 
// // 			unmountOnExit 
// // 			timeout={500}
// // 			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
// // 			onEnter={calcHeight}
// // 			>
// // 				<div className='menu'>
// // 					<DropdownItem
// // 						goToMenu="main"
// // 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// // 					>Back</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="map"
// // 						prevMenu={activeMenu}
// // 					>Map</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="boxandwhiskers"
// // 						prevMenu={activeMenu}
// // 					>Box and Whiskers</DropdownItem>
// // 					<DropdownItem
// // 						goToMenu="barchart"
// // 						prevMenu={activeMenu}
// // 					>Bar Chart</DropdownItem>
// // 				</div>
// // 			</CSSTransition>

// // 			{/* all data menu third layer */}
// // 			<CSSTransition 
// // 			in={activeMenu === 'map'} 
// // 			unmountOnExit 
// // 			timeout={500}
// // 			classNames={"menu-third"}
// // 			onEnter={calcHeight}
// // 			>
// // 				<div className='menu'>
// // 					<DropdownItem
// // 						goToMenu={prevMenu}
// // 						prevMenu={activeMenu}
// // 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// // 					>Back</DropdownItem>
// // 					<DropdownItem
// // 						checkbox={true}
// // 						// put label name e.g. show
// // 						label={"show"}
// // 						// data={props.}
// // 						// setData
// // 					>Show Map</DropdownItem>
// // 					<DropdownItem
// // 						checkbox={true}
// // 						// put label name e.g. legislative
// // 						label={"legislative"}
// // 					>Legislative Districts</DropdownItem>
// // 					<DropdownItem
// // 						checkbox={true}
// // 						label={"precinct"}
// // 					>Precinct Grouping</DropdownItem>
// // 				</div>
// // 			</CSSTransition>

// // 			<CSSTransition 
// // 			in={activeMenu === 'boxandwhiskers'} 
// // 			unmountOnExit 
// // 			timeout={500}
// // 			classNames={"menu-third"}
// // 			onEnter={calcHeight}
// // 			>
// // 				<div className='menu'>
// // 					<DropdownItem
// // 						goToMenu={prevMenu}
// // 						prevMenu={activeMenu}
// // 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// // 					>Back</DropdownItem>
// // 					<DropdownItem
// // 						checkbox={true}
// // 					>Show Box and Whiskers Chart</DropdownItem>
// // 				</div>
// // 			</CSSTransition>

// // 			<CSSTransition 
// // 			in={activeMenu === 'barchart'} 
// // 			unmountOnExit 
// // 			timeout={500}
// // 			classNames={"menu-third"}
// // 			onEnter={calcHeight}
// // 			>
// // 				<div className='menu'>
// // 					<DropdownItem
// // 						goToMenu={prevMenu}
// // 						prevMenu={activeMenu}
// // 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// // 					>Back</DropdownItem>
// // 					<DropdownItem
// // 						checkbox={true}
// // 					>Show Bar Chart</DropdownItem>
// // 				</div>
// // 			</CSSTransition>
// // 		</div>
// // 	);
// // }

// export default App;
