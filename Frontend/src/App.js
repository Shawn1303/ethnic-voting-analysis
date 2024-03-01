import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Navbar from './navComponents/navbar';
import NavItem from './navComponents/navitems';
import DropdownMenu from './navComponents/dropdownmenu';
import StateMap from './map/StateMap';
import HouseMemberTable from './graphs/house_member_table';
import RacialBarPlots from './graphs/racial_ethnic_district_bar_plots';
import BoxWhiskerPlotsMCMC from './graphs/box_whisker_plots_MCMC';
import VotingPDensityPlots from './graphs/voting_probability_density_plots'
import AstrosLogo from './image/astros_logo.png'


function App() {
	const[marylandData, setMarylandData] = useState({
		map: {
			show: true,
			legislative: false,
			precinct: false
		},
		boxandwhiskers: {
			show: true
		},
		barplot: {
			show: true
		},
		table: {
			show: true
		}
	});

	const[virginiaData, setVirginiaData] = useState({
		map: {
			show: false,
			legislative: false,
			precinct: false
		},
		boxandwhiskers: {
			show: false
		},
		barplot: {
			show: false
		},
		table: {
			show: false
		}
	});

	const raceOptions = ["", "American Indian and Alaska Native", "Asian", "Black or African American", "Hispanic or Latino", "Native Hawaiian and Other Pacific Islander", "White", "Other Race"];
  	const [selectedRace, setSelectedRace] = useState(raceOptions[0]);
	const [selectedRace2, setSelectedRace2] = useState(raceOptions[0]);

	const allShowsFalse = (data) => {
		return Object.values(data).every(item => 
		  typeof item === 'object' && 'show' in item ? !item.show : true
		);
	};

	return (<>
		<Navbar>
			{/* 1 nav item: menu */}
			<NavItem icon={<FontAwesomeIcon icon={faBars} />}>
				{/* shows all dropdown */}
				<DropdownMenu
					marylandData={marylandData}
					setMarylandData={setMarylandData}
					virginiaData={virginiaData}
					setVirginiaData={setVirginiaData}
				></DropdownMenu>
			</NavItem>
			<div id='title'>Pre-clearance state vs Non pre-clearance state</div>
			<img id='astroslogo' src={AstrosLogo} />
		</Navbar>
		<div id = 'display' style={{display: (allShowsFalse(marylandData) && allShowsFalse(virginiaData)) ? 'flex' : 'block'}}>
			{!allShowsFalse(marylandData) && <div className='statesdata' 
				style={{width: (allShowsFalse(marylandData) && allShowsFalse(virginiaData)) ? ' calc(50% - 20px)' : '100%',
						flexDirection: (allShowsFalse(marylandData) && allShowsFalse(virginiaData)) ? 'column' : 'row'
					}}>
				<div className='mapTitle' style={{display: (allShowsFalse(marylandData) && allShowsFalse(virginiaData)) ? 'flex' : 'inline-block'}}>
					<h2>Maryland</h2>
					{marylandData.map.show && <select
						onChange={(e) => setSelectedRace(e.target.value)}
						defaultValue={selectedRace}
					>
						{raceOptions.map((race, idx) => (
						<option key={idx}>{race}</option>
						))}
					</select>}
					{marylandData.map.show && <StateMap selectedState = "maryland" mapOptions = {marylandData.map} selectedRace = {selectedRace}/>}

					
				</div>
				<div style={{display: (allShowsFalse(marylandData) && allShowsFalse(virginiaData)) ? 'flex' : 'inline-block'}}>
					{marylandData.table.show && <HouseMemberTable/>}
					{marylandData.barplot.show && <RacialBarPlots />}
					{marylandData.boxandwhiskers.show && <BoxWhiskerPlotsMCMC num_district={1} />}
				</div>
			
				
			</div>}
			{!allShowsFalse(virginiaData) && <div className='statesdata'>
				<div className='mapTitle'>
					<h2>Virginia</h2>
					{virginiaData.map.show && <select
						onChange={(e) => setSelectedRace2(e.target.value)}
						defaultValue={selectedRace2}
					>
						{raceOptions.map((race, idx) => (
						<option key={idx}>{race}</option>
						))}
					</select>}
					
				</div>
				{virginiaData.map.show && <StateMap selectedState = "virginia" mapOptions = {virginiaData.map} selectedRace = {selectedRace2}/>}
				{virginiaData.table.show && <HouseMemberTable/>}
				{virginiaData.barplot.show && <RacialBarPlots />}
				{virginiaData.boxandwhiskers.show && <BoxWhiskerPlotsMCMC num_district={2}/>}
        		<VotingPDensityPlots />
			</div>}
		</div>
	</>);
}

// function Navbar(props) {
// 	return(
// 		<nav className='navbar'>
// 			<ul className='navbar-nav'>{ props.children }</ul>
// 		</nav>
// 	);
// }

// function NavItem(props) {
// 	const [open, setOpen] = useState(false);

// 	return(
// 		<li className='nav-item'>
// 			<a href='#' className='icon-button' onClick={() => setOpen(!open)}>
// 				{ props.icon }
// 				<span className='icon-label'> Menu </span>
// 			</a>

// 			{open && props.children}
// 		</li>
// 	);
// }

// function DropdownMenu(props) {
// 	const [activeMenu, setActiveMenu] = useState('main');
// 	const [prevMenu, setPrevMenu] = useState(null);
// 	const [menuHeight, setMenuHeight] = useState(null);
// 	// const [data, setData] = useState(null);
// 	// const [updateData, setUpdateData] = useState(null);

// 	function calcHeight(el) {
// 		const height = el.offsetHeight;
// 		setMenuHeight(height);
// 	}

// 	function DropdownItem(props) {
// 		const [data, setData] = useState(null);
// 		const [updateData, setUpdateData] = useState(null);

// 		let item;
// 		if(props.checkbox) {
// 			item =
// 			<a href='#' className='menu-item'>
// 				{/* put in props.label for each checkbox item */}
// 				<input type='checkbox' 
// 				// check={props.data.map[props.label]}
// 				check={data.map[props.label]}
// 				onChange={() => {
// 					// props.setData(prevState => ({
// 					updateData(prevState => ({
// 						...prevState,
// 						map: {
// 							...prevState.map,
// 							// [props.label]: !(props.data.map[props.label])
// 							[props.label]: !(data.map[props.label])
// 						}
// 					}));
// 				}}
// 				/>
// 				{props.children}
// 			</a>
// 		} else {
// 			item = <a href='#' className='menu-item' onClick={() => {
// 				if(props.goToMenu) props.setActiveMenu(props.goToMenu);
// 				if(props.prevMenu) props.setPrevMenu(props.prevMenu);
// 			}}>
// 				<span className='icon-left'>{props.leftIcon}</span>
// 				{props.children}
// 				{/* <span className='icon-right'>{props.rightIcon}</span> */}
// 			</a>;

// 			if(props.prevMenu === 'main') {
// 				setData(props.data);
// 				setUpdateData(props.setData);
// 			}
// 		}
// 		return(item);
// 	}

// 	return (
// 		<div className='dropdown' style={{ height: menuHeight }}>
// 			{/* main menu first layer*/}
// 			<CSSTransition 
// 			in={activeMenu === 'main'} 
// 			unmountOnExit 
// 			timeout={500}
// 			classNames={"menu-primary"}
// 			onEnter={calcHeight}
// 			>
// 				<div className='menu'>
// 					<DropdownItem
// 						goToMenu="state"
// 						prevMenu={activeMenu}
// 						setActiveMenu={setActiveMenu}
// 						setPrevMenu={setPrevMenu}
// 						data={props.marylandData}
// 						setData={props.setMarylandData}
// 					>Maryland</DropdownItem>
// 					<DropdownItem
// 						goToMenu="state"
// 						prevMenu={activeMenu}
// 						data={props.virginiaData}
// 						setData={props.setVirginiaData}
// 					>Virginia</DropdownItem>
// 				</div>
// 			</CSSTransition>

// 			{/* state menu second layer*/}
// 			{/* <CSSTransition 
// 			in={activeMenu === 'state'} 
// 			unmountOnExit 
// 			timeout={500}
// 			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
// 			onEnter={calcHeight}
// 			>
// 				<div className='menu'>
// 					<DropdownItem
// 						goToMenu="main"
// 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// 					>Back</DropdownItem>
// 					<DropdownItem
// 						goToMenu="map"
// 						prevMenu={activeMenu}
// 					>Map</DropdownItem>
// 					<DropdownItem
// 						goToMenu="boxandwhiskers"
// 						prevMenu={activeMenu}
// 					>Box and Whiskers</DropdownItem>
// 					<DropdownItem
// 						goToMenu="barchart"
// 						prevMenu={activeMenu}
// 					>Bar Chart</DropdownItem>
// 				</div>
// 			</CSSTransition> */}

// 			<CSSTransition 
// 			in={activeMenu === 'maryland'} 
// 			unmountOnExit 
// 			timeout={500}
// 			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
// 			onEnter={calcHeight}
// 			>
// 				<div className='menu'>
// 					<DropdownItem
// 						goToMenu="main"
// 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// 					>Back</DropdownItem>
// 					<DropdownItem
// 						goToMenu="map"
// 						prevMenu={activeMenu}
// 					>Map</DropdownItem>
// 					<DropdownItem
// 						goToMenu="boxandwhiskers"
// 						prevMenu={activeMenu}
// 					>Box and Whiskers</DropdownItem>
// 					<DropdownItem
// 						goToMenu="barchart"
// 						prevMenu={activeMenu}
// 					>Bar Chart</DropdownItem>
// 				</div>
// 			</CSSTransition>

// 			<CSSTransition 
// 			in={activeMenu === 'virginia'} 
// 			unmountOnExit 
// 			timeout={500}
// 			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
// 			onEnter={calcHeight}
// 			>
// 				<div className='menu'>
// 					<DropdownItem
// 						goToMenu="main"
// 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// 					>Back</DropdownItem>
// 					<DropdownItem
// 						goToMenu="map"
// 						prevMenu={activeMenu}
// 					>Map</DropdownItem>
// 					<DropdownItem
// 						goToMenu="boxandwhiskers"
// 						prevMenu={activeMenu}
// 					>Box and Whiskers</DropdownItem>
// 					<DropdownItem
// 						goToMenu="barchart"
// 						prevMenu={activeMenu}
// 					>Bar Chart</DropdownItem>
// 				</div>
// 			</CSSTransition>

// 			{/* all data menu third layer */}
// 			<CSSTransition 
// 			in={activeMenu === 'map'} 
// 			unmountOnExit 
// 			timeout={500}
// 			classNames={"menu-third"}
// 			onEnter={calcHeight}
// 			>
// 				<div className='menu'>
// 					<DropdownItem
// 						goToMenu={prevMenu}
// 						prevMenu={activeMenu}
// 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// 					>Back</DropdownItem>
// 					<DropdownItem
// 						checkbox={true}
// 						// put label name e.g. show
// 						label={"show"}
// 						// data={props.}
// 						// setData
// 					>Show Map</DropdownItem>
// 					<DropdownItem
// 						checkbox={true}
// 						// put label name e.g. legislative
// 						label={"legislative"}
// 					>Legislative Districts</DropdownItem>
// 					<DropdownItem
// 						checkbox={true}
// 						label={"precinct"}
// 					>Precinct Grouping</DropdownItem>
// 				</div>
// 			</CSSTransition>

// 			<CSSTransition 
// 			in={activeMenu === 'boxandwhiskers'} 
// 			unmountOnExit 
// 			timeout={500}
// 			classNames={"menu-third"}
// 			onEnter={calcHeight}
// 			>
// 				<div className='menu'>
// 					<DropdownItem
// 						goToMenu={prevMenu}
// 						prevMenu={activeMenu}
// 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// 					>Back</DropdownItem>
// 					<DropdownItem
// 						checkbox={true}
// 					>Show Box and Whiskers Chart</DropdownItem>
// 				</div>
// 			</CSSTransition>

// 			<CSSTransition 
// 			in={activeMenu === 'barchart'} 
// 			unmountOnExit 
// 			timeout={500}
// 			classNames={"menu-third"}
// 			onEnter={calcHeight}
// 			>
// 				<div className='menu'>
// 					<DropdownItem
// 						goToMenu={prevMenu}
// 						prevMenu={activeMenu}
// 						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
// 					>Back</DropdownItem>
// 					<DropdownItem
// 						checkbox={true}
// 					>Show Bar Chart</DropdownItem>
// 				</div>
// 			</CSSTransition>
// 		</div>
// 	);
// }

export default App;
