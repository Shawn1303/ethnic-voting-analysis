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
// import Legend from './map/Legend';
// import legendItems from './map/LegendItems';

function App() {
	const[marylandData, setMarylandData] = useState({
		map: {
			show: true,
			legislative: false,
			precinct: true
		},
		boxandwhiskers: {
			show: false
		},
		barchart: {
			show: false
		}
	});

	const[virginiaData, setVirginiaData] = useState({
		map: {
			show: true,
			legislative: true,
			precinct: true
		},
		boxandwhiskers: {
			show: false
		},
		barchart: {
			show: false
		}
	});

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
		</Navbar>
		<div id = 'display'>
			<StateMap/>
			{/* <Legend legendItems={legendItems}/> */}
			<HouseMemberTable/>
			<RacialBarPlots />
			<BoxWhiskerPlotsMCMC/>
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
