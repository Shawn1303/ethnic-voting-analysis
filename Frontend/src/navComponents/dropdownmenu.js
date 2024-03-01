import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import DropdownItem from './dropdownitem';

// Libraries used: fontawesome setup
// CSSTransition library
// https://www.youtube.com/watch?v=IF6k0uZuypA&t=24s

// display all drop downs with transitions
export default function DropdownMenu(props) {
	const [activeMenu, setActiveMenu] = useState('main');
	const [prevMenu, setPrevMenu] = useState(null);
	const [menuHeight, setMenuHeight] = useState(null);
	const [mainMenu, setMainMenu] = useState(null);
	// const [data, setData] = useState(null);
	// const [updateData, setUpdateData] = useState(null);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	// function DropdownItem(props) {
	// 	const [data, setData] = useState(null);
	// 	const [updateData, setUpdateData] = useState(null);

	// 	let item;
	// 	if(props.checkbox) {
	// 		item =
	// 		<a href='#' className='menu-item'>
	// 			{/* put in props.label for each checkbox item */}
	// 			<input type='checkbox' 
	// 			// check={props.data.map[props.label]}
	// 			check={data.map[props.label]}
	// 			onChange={() => {
	// 				// props.setData(prevState => ({
	// 				updateData(prevState => ({
	// 					...prevState,
	// 					map: {
	// 						...prevState.map,
	// 						// [props.label]: !(props.data.map[props.label])
	// 						[props.label]: !(data.map[props.label])
	// 					}
	// 				}));
	// 			}}
	// 			/>
	// 			{props.children}
	// 		</a>
	// 	} else {
	// 		item = <a href='#' className='menu-item' onClick={() => {
	// 			if(props.goToMenu) props.setActiveMenu(props.goToMenu);
	// 			if(props.prevMenu) props.setPrevMenu(props.prevMenu);
	// 		}}>
	// 			<span className='icon-left'>{props.leftIcon}</span>
	// 			{props.children}
	// 			{/* <span className='icon-right'>{props.rightIcon}</span> */}
	// 		</a>;

	// 		if(props.prevMenu === 'main') {
	// 			setData(props.data);
	// 			setUpdateData(props.setData);
	// 		}
	// 	}
	// 	return(item);
	// }

	return (
		<div className='dropdown' style={{ height: menuHeight }}>
			{/* main menu first layer*/}
			<CSSTransition 
			in={activeMenu === 'main'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-primary"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="maryland"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
						// data={props.marylandData}
						// setData={props.setMarylandData}
						mainMenu="maryland"
						setMainMenu={setMainMenu}
					>Maryland</DropdownItem>
					<DropdownItem
						goToMenu="virginia"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
						// data={props.virginiaData}
						// setData={props.setVirginiaData}
						mainMenu="virginia"
						setMainMenu={setMainMenu}
					>Virginia</DropdownItem>
					<DropdownItem
						goToMenu="onestate"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Single State Analysis</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'onestate'} 
			unmountOnExit 
			timeout={500}
			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="main"
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						setShowOneState={props.setShowOneState}
						showOneState={props.showOneState}
						changeShowState={true}
					>Show one state only</DropdownItem>
					<span style={{color: 'gray'}}>Shows the map, gerrymandering analysis, ethnic distribution in districts, and ethnic distribution in state assembly of a single state.</span>
					<br/><br/>
					<span style={{color: 'white'}}>TO INTERACT:</span>
					<br/>
					<span style={{color: 'white'}}>Check the box below to view Maryland. Uncheck the box to view Virginia. The above box must be checked.</span>
					<DropdownItem
						setOneState={props.setOneState}
						oneState={props.oneState}
						changeOneState={true}
					>True for Maryland else Virginia</DropdownItem>
					<span style={{color: 'red'}}>Note that while single state analysis is turned on, changing the Virginia and Maryland tabs will not affect the display.</span>
				</div>
			</CSSTransition>

			{/* state menu second layer*/}
			{/* <CSSTransition 
			in={activeMenu === 'state'} 
			unmountOnExit 
			timeout={500}
			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="main"
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
					>Back</DropdownItem>
					<DropdownItem
						goToMenu="map"
						prevMenu={activeMenu}
					>Map</DropdownItem>
					<DropdownItem
						goToMenu="boxandwhiskers"
						prevMenu={activeMenu}
					>Box and Whiskers</DropdownItem>
					<DropdownItem
						goToMenu="barchart"
						prevMenu={activeMenu}
					>Bar Chart</DropdownItem>
				</div>
			</CSSTransition> */}

			<CSSTransition 
			in={activeMenu === 'maryland'} 
			unmountOnExit 
			timeout={500}
			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="main"
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						goToMenu="map"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Maryland Map</DropdownItem>
					<DropdownItem
						goToMenu="boxandwhiskers"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Gerrymandering Analysis</DropdownItem>
					<DropdownItem
						goToMenu="barplot"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Ethnic/Racial Distribution In Districts</DropdownItem>
					<DropdownItem
						goToMenu="table"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>State Assembly Representatives Info</DropdownItem>
					<DropdownItem
						goToMenu="pichart"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>State Assembly Ethnic/Racial Chart</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'virginia'} 
			unmountOnExit 
			timeout={500}
			classNames={prevMenu === 'main' ? 'menu-secondary-left' : 'menu-secondary-right'}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu="main"
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						goToMenu="map"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Virginia Map</DropdownItem>
					<DropdownItem
						goToMenu="boxandwhiskers"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Gerrymandering Analysis</DropdownItem>
					<DropdownItem
						goToMenu="barplot"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Ethnic/Racial Distribution In Districts</DropdownItem>
					<DropdownItem
						goToMenu="table"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>State Assembly Representatives Info</DropdownItem>
					<DropdownItem
						goToMenu="pichart"
						prevMenu={activeMenu}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>State Assembly Ethnic/Racial Chart</DropdownItem>
				</div>
			</CSSTransition>

			{/* all data menu third layer */}
			<CSSTransition 
			in={activeMenu === 'map'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-third"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu={prevMenu}
						prevMenu={activeMenu}
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<DropdownItem
						checkbox={true}
						// put label name e.g. show
						label={"show"}
						field={"map"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Show Map</DropdownItem>
					<DropdownItem
						checkbox={true}
						// put label name e.g. legislative
						label={"legislative"}
						field={"map"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Legislative Districts</DropdownItem>
					<DropdownItem
						checkbox={true}
						label={"precinct"}
						field={"map"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Precinct Grouping</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'boxandwhiskers'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-third"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu={prevMenu}
						prevMenu={activeMenu}
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<span style={{color: 'gray'}}>A graph of box and whisker plots for ethnicity group percentages using a 10,000-plan ensemble for each state. This is used for MCMC Analysis to demonstrate racial gerrymandering.</span>
					<DropdownItem
						checkbox={true}
						label={"show"}
						field={"boxandwhiskers"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Show Box and Whiskers Chart</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'barplot'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-third"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu={prevMenu}
						prevMenu={activeMenu}
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<span style={{color: 'gray'}}>A bar-plot showing the distributions of ethnicities within each individual district.</span>
					<br/><br/>
					<span style={{color: 'white'}}>TO INTERACT:</span>
					<br/>
					<span style={{color: 'white'}}>Hover over a section to see the exact values for distributions within a district.</span>
					<DropdownItem
						checkbox={true}
						label={"show"}
						field={"barplot"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Show Bar Plot</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'table'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-third"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu={prevMenu}
						prevMenu={activeMenu}
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<span style={{color: 'gray'}}>A table showing the demographics of the state assembly representatives.</span>
					<br/><br/>
					<span style={{color: 'white'}}>TO INTERACT:</span>
					<br/>
					<span style={{color: 'white'}}>Scroll vertically to view the different representatives. Scroll horizontally to view the different fields.</span>
					<br/><br/>
					<span style={{color: 'white'}}>Click on a field to change how representatives are sorted. Further filtering is possible by clicking the triple dots to the right of each field name.</span>
					<DropdownItem
						checkbox={true}
						label={"show"}
						field={"table"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Show Table</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition 
			in={activeMenu === 'pichart'} 
			unmountOnExit 
			timeout={500}
			classNames={"menu-third"}
			onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem
						goToMenu={prevMenu}
						prevMenu={activeMenu}
						leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
						setActiveMenu={setActiveMenu}
						setPrevMenu={setPrevMenu}
					>Back</DropdownItem>
					<span style={{color: 'gray'}}>A Pi-Chart that shows the distributions of ethnicities among the state assembly representatives.</span>
					<br/><br/>
					<span style={{color: 'white'}}>TO INTERACT:</span>
					<br/>
					<span style={{color: 'white'}}>Hover over a section to see the percentage of the corresponding ethnicity.</span>
					<DropdownItem
						checkbox={true}
						label={"show"}
						field={"pichart"}
						data={mainMenu === "maryland" ? props.marylandData : props.virginiaData}
						setData={mainMenu === "maryland" ? props.setMarylandData : props.setVirginiaData}
					>Show Pi Chart</DropdownItem>
				</div>
			</CSSTransition>
		</div>
	);
}